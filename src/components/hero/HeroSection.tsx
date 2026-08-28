import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ *
 * Agent session — driven, not looped. Prompts and diff lines are typed
 * a character at a time, thinking beats count real elapsed milliseconds
 * before they resolve, tool calls sit pending until their result lands,
 * and sub-agents flip from [running] to [done] on their own clocks.
 * The transcript scrolls because it is actually growing.
 * ------------------------------------------------------------------ */

type Tone = "add" | "del" | "ctx";

type Step =
  | { k: "prompt"; text: string }
  | { k: "think"; secs: number }
  | { k: "tool"; name: string; arg: string; out: string; ms: number }
  | { k: "tasks"; items: { title: string; agent: string; ms: number }[] }
  | { k: "edit"; file: string }
  | { k: "diff"; n: string; code: string; d?: Tone };

const SCRIPT: Step[] = [
  { k: "prompt", text: "Wire Helleious into the MCP gateway." },
  { k: "think", secs: 2.6 },
  { k: "tool", name: "grep", arg: '"mcp.connect" src/helleious/', out: "3 matches", ms: 620 },
  { k: "tool", name: "read_file", arg: "src/helleious/gateway.ts", out: "214 lines", ms: 460 },
  { k: "tasks", items: [{ title: "Map legacy API surface", agent: "explore", ms: 1500 }] },
  { k: "edit", file: "src/helleious/gateway.ts" },
  { k: "diff", n: "22", code: "export async function connect(ctx) {" },
  { k: "diff", n: "23", code: "  await hsm.attest(ctx.tenant, key);", d: "add" },
  { k: "diff", n: "41", code: "  return legacy.proxy(ctx.request);", d: "del" },
  { k: "diff", n: "41", code: "  return mcp.open(ctx, { retain: 0 });", d: "add" },

  { k: "prompt", text: "Hold swarm latency under 15 ms." },
  { k: "think", secs: 3.4 },
  { k: "tool", name: "read_file", arg: "src/orarqlow/mesh.ts", out: "186 lines", ms: 520 },
  { k: "tool", name: "bash", arg: '"pnpm bench mesh"', out: "p99 14.2ms", ms: 1550 },
  {
    k: "tasks",
    items: [
      { title: "Rebalance mesh topology", agent: "general", ms: 2600 },
      { title: "Trace consensus hops", agent: "explore", ms: 1700 },
      { title: "Prune dead agent nodes", agent: "general", ms: 3300 },
    ],
  },
  { k: "edit", file: "src/orarqlow/mesh.ts" },
  { k: "diff", n: "58", code: "export class SwarmMesh extends Node {" },
  { k: "diff", n: "59", code: "  const peers = this.rebalance(1024);", d: "add" },
  { k: "diff", n: "60", code: "  return consensus.settle(peers, 15);", d: "add" },
  { k: "diff", n: "63", code: "  await Promise.all(peers.map(ping));", d: "del" },

  { k: "prompt", text: "Review this PR and patch the leaks." },
  { k: "think", secs: 1.7 },
  { k: "tool", name: "grep", arg: '"useEffect(" src/codehoomer/', out: "12 matches", ms: 560 },
  { k: "tool", name: "read_file", arg: "src/codehoomer/review.ts", out: "97 lines", ms: 430 },
  { k: "tasks", items: [{ title: "Walk the AST for leaks", agent: "explore", ms: 1900 }] },
  { k: "edit", file: "src/codehoomer/review.ts" },
  { k: "diff", n: "07", code: "export function review(patch: Diff) {" },
  { k: "diff", n: "08", code: "  const ast = parse(patch, deep);", d: "add" },
  { k: "diff", n: "09", code: "  return ast.leaks().map(autofix);", d: "add" },
];

/* Live rows the driver mutates in place as the session runs. */
type Row =
  | { k: "prompt"; text: string; typed: number }
  | { k: "think"; ms: number; total: number }
  | { k: "tool"; name: string; arg: string; out: string; ready: boolean }
  | { k: "task"; title: string; agent: string; done: boolean }
  | { k: "edit"; file: string }
  | { k: "diff"; n: string; code: string; d: Tone; typed: number };

const SETTLED: Row[] = SCRIPT.flatMap<Row>((s) => {
  switch (s.k) {
    case "prompt":
      return [{ k: "prompt", text: s.text, typed: s.text.length }];
    case "think":
      return [{ k: "think", ms: s.secs * 1000, total: s.secs * 1000 }];
    case "tool":
      return [{ k: "tool", name: s.name, arg: s.arg, out: s.out, ready: true }];
    case "tasks":
      return s.items.map((t) => ({
        k: "task" as const,
        title: t.title,
        agent: t.agent,
        done: true,
      }));
    case "edit":
      return [{ k: "edit", file: s.file }];
    case "diff":
      return [{ k: "diff", n: s.n, code: s.code, d: s.d ?? "ctx", typed: s.code.length }];
  }
});

const PROMPT_MS = 17; // per character, prompt line
const CODE_MS = 12; // per character, diff line

const FEED_MASK =
  "linear-gradient(to bottom, transparent 0, #000 16px, #000 100%)";

const SESSION_CSS = `
@keyframes amx-caret { 0%, 45% { opacity: 1; } 55%, 100% { opacity: 0; } }
.amx-caret {
  display: inline-block;
  width: 7px;
  height: 13px;
  margin-left: 1px;
  vertical-align: -2px;
  background: #e8e8e8;
  animation: amx-caret 1s steps(1) infinite;
}
.amx-view { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  .amx-caret { animation: none; opacity: 0; }
  .amx-view { scroll-behavior: auto; }
}
`;

/* Gutter + row tints sampled straight from the reference capture. */
const DIFF_NUM: Record<Tone, string> = {
  add: "text-[#4ade80]",
  del: "text-[#f87171]",
  ctx: "text-[#71717a]",
};

const DIFF_ROW: Record<Tone, string> = {
  add: "bg-[#202916] text-[#e8e8e8]",
  del: "bg-[#301719] text-[#fca5a5]",
  ctx: "text-[#d4d4d8]",
};

const Caret: React.FC = () => <span className="amx-caret" />;

const FeedRow: React.FC<{ item: Row }> = ({ item }) => {
  switch (item.k) {
    case "prompt": {
      const typing = item.typed < item.text.length;
      return (
        <div className="-mx-5 md:-mx-6 px-5 md:px-6 my-1 py-1 bg-gray-100 dark:bg-[#1f1f1f] flex items-baseline gap-2 min-w-0">
          <span className="text-[#2563eb] dark:text-[#3b82f6] shrink-0">&rsaquo;</span>
          <span className="text-gray-900 dark:text-white font-semibold truncate">
            {item.text.slice(0, item.typed)}
            {typing && <Caret />}
          </span>
        </div>
      );
    }

    case "think": {
      if (item.ms < item.total) {
        const dots = ".".repeat(1 + (Math.floor(item.ms / 300) % 3));
        return (
          <div className="flex items-center gap-2 text-gray-500 dark:text-[#8b8b93]">
            <span className="text-purple-600 dark:text-[#a78bfa]">&#8942;</span>
            <span>
              Thinking{dots}
              <span className="text-gray-400 dark:text-[#5b5b63] tabular-nums">
                {" "}
                {(item.ms / 1000).toFixed(1)}s
              </span>
            </span>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-2 text-gray-500 dark:text-[#a1a1aa]">
          <span className="text-purple-600 dark:text-[#a78bfa] text-[10px]">&#9670;</span>
          <span>Thought for {(item.total / 1000).toFixed(1)}s</span>
        </div>
      );
    }

    case "tool":
      return (
        <div className="flex items-baseline gap-2 min-w-0">
          <span
            className={`text-teal-600 dark:text-[#2dd4bf]/70 text-[10px] shrink-0 ${
              item.ready ? "" : "animate-pulse"
            }`}
          >
            &#9656;
          </span>
          <span className="text-teal-700 dark:text-[#2dd4bf] font-semibold shrink-0">{item.name}</span>
          <span className="text-gray-700 dark:text-[#d4d4d8] truncate">{item.arg}</span>
          <span className="text-gray-400 dark:text-[#6b7280] shrink-0">
            {item.ready ? item.out : <span className="animate-pulse">&#8230;</span>}
          </span>
        </div>
      );

    case "task":
      return (
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`w-[2px] h-[14px] shrink-0 ${
              item.done ? "bg-emerald-500 dark:bg-[#22c55e]" : "bg-blue-500 dark:bg-[#3b82f6] animate-pulse"
            }`}
          />
          <span className="text-gray-700 dark:text-[#d4d4d8] truncate">{item.title}</span>
          <span className="text-gray-400 dark:text-[#6b7280] truncate">{item.agent}</span>
          <span
            className={`ml-auto pl-2 shrink-0 ${
              item.done ? "text-emerald-600 dark:text-[#4ade80]" : "text-blue-600 dark:text-[#60a5fa] animate-pulse"
            }`}
          >
            {item.done ? "[done]" : "[running]"}
          </span>
        </div>
      );

    case "edit":
      return (
        <div className="flex items-baseline gap-2 mt-1.5 min-w-0">
          <span className="text-purple-600 dark:text-[#a78bfa] text-[10px] shrink-0">&#9670;</span>
          <span className="text-gray-900 dark:text-white font-semibold shrink-0">Edit</span>
          <span className="text-emerald-600 dark:text-[#86efac] truncate">{item.file}</span>
        </div>
      );

    case "diff": {
      const typing = item.typed < item.code.length;
      return (
        <div className="flex">
          <span className={`w-[20px] shrink-0 text-right tabular-nums ${DIFF_NUM[item.d]}`}>
            {item.n}
          </span>
          <span
            className={`flex-1 min-w-0 pl-2.5 whitespace-pre overflow-hidden ${DIFF_ROW[item.d]}`}
          >
            {item.code.slice(0, item.typed)}
            {typing && <Caret />}
          </span>
        </div>
      );
    }
  }
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
};

const AgentSession: React.FC = () => {
  const [rows, setRows] = React.useState<Row[]>([]);
  const [step, setStep] = React.useState(0);
  const view = React.useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reduced) {
      setRows(SETTLED);
      setStep(SCRIPT.length);
      return;
    }

    let alive = true;
    let count = 0;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const push = (row: Row) => {
      count += 1;
      setRows((prev) => [...prev, row]);
    };
    const patch = (i: number, f: (r: Row) => Row) =>
      setRows((prev) => prev.map((r, j) => (j === i ? f(r) : r)));

    const run = async () => {
      while (alive) {
        setRows([]);
        setStep(0);
        count = 0;
        await wait(600);

        for (let s = 0; s < SCRIPT.length && alive; s += 1) {
          const it = SCRIPT[s];
          setStep(s + 1);

          if (it.k === "prompt") {
            const at = count;
            push({ k: "prompt", text: it.text, typed: 0 });
            for (let c = 1; c <= it.text.length && alive; c += 1) {
              await wait(PROMPT_MS);
              patch(at, (r) => (r.k === "prompt" ? { ...r, typed: c } : r));
            }
            await wait(340);
          } else if (it.k === "think") {
            const at = count;
            const total = Math.round(it.secs * 1000);
            push({ k: "think", ms: 0, total });
            for (let t = 100; t <= total && alive; t += 100) {
              await wait(100);
              patch(at, (r) => (r.k === "think" ? { ...r, ms: t } : r));
            }
            await wait(240);
          } else if (it.k === "tool") {
            const at = count;
            push({ k: "tool", name: it.name, arg: it.arg, out: it.out, ready: false });
            await wait(it.ms);
            patch(at, (r) => (r.k === "tool" ? { ...r, ready: true } : r));
            await wait(260);
          } else if (it.k === "tasks") {
            const base = count;
            it.items.forEach((t) =>
              push({ k: "task", title: t.title, agent: t.agent, done: false })
            );
            let longest = 0;
            it.items.forEach((t, i) => {
              longest = Math.max(longest, t.ms);
              setTimeout(() => {
                if (alive) patch(base + i, (r) => (r.k === "task" ? { ...r, done: true } : r));
              }, t.ms);
            });
            await wait(longest + 300);
          } else if (it.k === "edit") {
            push({ k: "edit", file: it.file });
            await wait(360);
          } else {
            const at = count;
            push({ k: "diff", n: it.n, code: it.code, d: it.d ?? "ctx", typed: 0 });
            for (let c = 1; c <= it.code.length && alive; c += 1) {
              await wait(CODE_MS);
              patch(at, (r) => (r.k === "diff" ? { ...r, typed: c } : r));
            }
            await wait(110);
          }
        }

        await wait(1800);
      }
    };

    void run();
    return () => {
      alive = false;
    };
  }, [reduced]);

  /* Keep the newest line pinned to the bottom, terminal-style. */
  React.useEffect(() => {
    const el = view.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [rows]);

  const pct = (step / SCRIPT.length) * 100;

  return (
    <div className="space-y-1.5 overflow-hidden">
      <style>{SESSION_CSS}</style>
      <div className="flex items-center justify-between border-b border-gray-200/50 dark:border-white/10 pb-2 text-[11px] text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex items-center gap-1 shrink-0">
            <span className="w-[7px] h-[7px] rounded-full bg-[#fd5f57] inline-block" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#febc30] inline-block" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#28c840] inline-block" />
          </span>
          <span className="text-gray-600 dark:text-[#a1a1aa] font-medium text-xs truncate">
            amthromax/neural-core
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-gray-300 dark:text-[#4b4b52]">|</span>
          <span className="w-7 h-[5px] rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden inline-block">
            <span
              className="block h-full rounded-full bg-gray-600 dark:bg-white/60 transition-[width] duration-500 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </span>
          <span className="text-[10px] text-gray-600 dark:text-[#d4d4d8] font-mono tabular-nums">
            {pct.toFixed(1)}%
          </span>
        </div>
      </div>

      <div
        ref={view}
        className="amx-view relative h-[134px] overflow-hidden select-none -mx-5 md:-mx-6 px-5 md:px-6 font-mono font-medium text-[13px] leading-[19px]"
        style={{ maskImage: FEED_MASK, WebkitMaskImage: FEED_MASK }}
      >
        <div className="min-h-full flex flex-col justify-end">
          {rows.map((item, i) => (
            <FeedRow key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};


/* ------------------------------------------------------------------ *
 * Swarm chat — an operator working the mesh in real time. The swarm
 * reasons out loud a line at a time, named agents pick up their own
 * sub-task and spin while they work, replies stream character by
 * character, counters tick to their real value and verdict panels
 * reveal one check per beat. Every step is timer-driven, so the
 * transcript really grows and scrolls.
 * ------------------------------------------------------------------ */

type ChatStep =
  | { k: "user"; text: string }
  | { k: "bot"; text: string }
  | { k: "event"; label: string; name: string }
  | { k: "count"; label: string; to: number; suffix?: string }
  | {
      k: "result";
      title: string;
      items: { key: string; text: string; note: string }[];
    }
  | { k: "trace"; lines: string[] }
  | { k: "agents"; items: { name: string; task: string }[] }
  | { k: "think"; label: string; ms: number };

const CHAT: ChatStep[] = [
  { k: "user", text: "spin up the mesh for tonight's batch." },
  {
    k: "trace",
    lines: [
      "412k tasks — too wide for one pass",
      "shard it, quorum 3-of-5",
      "hold two regions in reserve",
    ],
  },
  {
    k: "bot",
    text: "sharding the run across 1,024 micro-agents, consensus held at 3-of-5.",
  },
  { k: "event", label: "Deployed swarm", name: "Nightly mesh sweep" },
  { k: "count", label: "Agents online", to: 1024 },
  {
    k: "agents",
    items: [
      { name: "planner", task: "cutting the task graph" },
      { name: "dispatch", task: "placing shards, 6 regions" },
      { name: "sentinel", task: "watching quorum" },
    ],
  },
  {
    k: "result",
    title: "Mesh report",
    items: [
      {
        key: "Agents",
        text: "1,024 online across 6 regions",
        note: "512 in us-east, 256 in eu-west, the rest spread over four fallback zones",
      },
      {
        key: "Consensus",
        text: "3-of-5 quorum at 0.2ms",
        note: "every write is acknowledged by a majority before it is committed",
      },
      {
        key: "Shards",
        text: "4,096 placed, none orphaned",
        note: "each one replicated three times, so losing a node costs nothing",
      },
      {
        key: "Flagged",
        text: "2 shards, node-17 dropped twice",
        note: "both replicas are healthy, so nothing is at risk yet",
      },
    ],
  },

  { k: "user", text: "how is throughput holding up?" },
  { k: "think", label: "Sampling", ms: 1300 },
  {
    k: "bot",
    text: "84k inferences a second, p99 at 41ms. comfortably inside budget.",
  },
  { k: "count", label: "Tasks settled", to: 96400 },
  { k: "think", label: "Verifying", ms: 1500 },
  {
    k: "bot",
    text: "one snag: node-17 keeps dropping under load. re-pin its shards, or let it drain?",
  },

  { k: "user", text: "let it drain, keep the quorum." },
  {
    k: "trace",
    lines: [
      "node-17 holds 96 shards, all replicated",
      "quorum survives on the other five",
    ],
  },
  { k: "event", label: "Rebalanced", name: "96 shards moved" },
  {
    k: "bot",
    text: "quorum never broke and nothing was dropped in the handoff.",
  },

  { k: "user", text: "run the zero-knowledge audit before you close out." },
  {
    k: "agents",
    items: [
      { name: "prover", task: "building 1,024 proofs" },
      { name: "verifier", task: "checking every proof" },
      { name: "notary", task: "signing the attestation" },
    ],
  },
  {
    k: "result",
    title: "Audit report",
    items: [
      {
        key: "Proofs",
        text: "1,024 verified, none rejected",
        note: "one zero-knowledge proof per agent, all checked in 3.4 seconds",
      },
      {
        key: "Attestation",
        text: "signed and archived",
        note: "notarised to the ledger and retained for seven years",
      },
      {
        key: "Drift",
        text: "none across 6 regions",
        note: "model weights and policy hashes match the release build exactly",
      },
      {
        key: "Cost",
        text: "$41.20 for the whole sweep",
        note: "18 percent under last night, most of it saved on the early drain",
      },
    ],
  },
  {
    k: "bot",
    text: "mesh is clean. batch closes in 12 minutes, i'll hold the swarm warm.",
  },
];

type ChatRow =
  | { k: "user"; text: string }
  | { k: "bot"; text: string; typed: number }
  | { k: "event"; label: string; name: string }
  | { k: "count"; label: string; value: number; to: number; suffix?: string }
  | {
      k: "result";
      title: string;
      items: { key: string; text: string; note: string }[];
      shown: number;
    }
  | { k: "trace"; lines: string[]; shown: number; typed: number }
  | {
      k: "agents";
      items: { name: string; task: string }[];
      at: number;
      done: number;
    }
  | { k: "think"; label: string };

const CHAT_SETTLED: ChatRow[] = CHAT.flatMap<ChatRow>((s) => {
  if (s.k === "bot") return [{ k: "bot", text: s.text, typed: s.text.length }];
  if (s.k === "count")
    return [
      { k: "count", label: s.label, value: s.to, to: s.to, suffix: s.suffix },
    ];
  if (s.k === "result")
    return [
      { k: "result", title: s.title, items: s.items, shown: s.items.length },
    ];
  if (s.k === "trace")
    return [
      {
        k: "trace",
        lines: s.lines,
        shown: s.lines.length,
        typed: s.lines[s.lines.length - 1].length,
      },
    ];
  if (s.k === "agents")
    return [{ k: "agents", items: s.items, at: -1, done: s.items.length }];
  if (s.k === "think") return [];
  return [s];
});

const BOT_MS = 14; // per character, streamed reply
const TRACE_MS = 18; // per character, reasoning line
const REVEAL_MS = 560; // per line, verdict panel
const AGENT_MS = 950; // how long one agent holds its sub-task
const COUNT_TICKS = 26; // frames a counter takes to reach its value
const COUNT_MS = 46; // per frame

const CHAT_CSS = `
@keyframes amx-pop {
  from { opacity: 0; transform: translate3d(0, 7px, 0) scale(0.97); }
  to   { opacity: 1; transform: none; }
}
@keyframes amx-blink { 0%, 45% { opacity: 1; } 55%, 100% { opacity: 0; } }
@keyframes amx-d1 {
  0%, 16%   { transform: translateX(0) scale(1); }
  46%, 58%  { transform: translateX(10px) scale(1.3); }
  88%, 100% { transform: translateX(0) scale(1); }
}
@keyframes amx-d2 {
  0%, 16%   { transform: scale(1); }
  46%, 58%  { transform: scale(1.85); }
  88%, 100% { transform: scale(1); }
}
@keyframes amx-d3 {
  0%, 16%   { transform: translateX(0) scale(1); }
  46%, 58%  { transform: translateX(-10px) scale(1.3); }
  88%, 100% { transform: translateX(0) scale(1); }
}
@keyframes amx-spin { to { transform: rotate(360deg); } }
@keyframes amx-sheen {
  0%   { background-position: 150% 0; }
  100% { background-position: -70% 0; }
}
@keyframes amx-rail {
  0%   { background-position: 0 -34px; }
  100% { background-position: 0 34px; }
}
.amx-pop { animation: amx-pop 280ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.amx-chat { scroll-behavior: smooth; }
.amx-goo { filter: url(#amx-goo); }
.amx-dot {
  position: absolute; top: 5px; width: 8px; height: 8px;
  border-radius: 9999px; background: #a855f7;
}
.amx-dot-1 { left: 0;    animation: amx-d1 1.9s ease-in-out infinite; }
.amx-dot-2 { left: 10px; animation: amx-d2 1.9s ease-in-out infinite; }
.amx-dot-3 { left: 20px; animation: amx-d3 1.9s ease-in-out infinite; }
.amx-tcaret {
  display: inline-block; width: 2px; height: 11px; margin-left: 2px;
  vertical-align: -1px; background: currentColor; opacity: 0.75;
  animation: amx-blink 1s steps(1) infinite;
}
.amx-bar { transition: width 60ms linear; }
.amx-ring {
  display: inline-block; width: 9px; height: 9px; border-radius: 9999px;
  border: 1.5px solid rgba(168, 85, 247, 0.28); border-top-color: #a855f7;
  animation: amx-spin 680ms linear infinite;
}
.amx-idle {
  display: inline-block; width: 7px; height: 7px; border-radius: 9999px;
  border: 1.5px solid currentColor; opacity: 0.3;
}
.amx-sheen {
  background-image: linear-gradient(90deg,
    currentColor 0%, currentColor 34%, #a855f7 50%,
    currentColor 66%, currentColor 100%);
  background-size: 280% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: amx-sheen 1.6s linear infinite;
}
.amx-rail {
  background-image: linear-gradient(180deg,
    rgba(168, 85, 247, 0) 0%, #a855f7 50%, rgba(168, 85, 247, 0) 100%);
  background-size: 100% 34px;
  background-repeat: repeat-y;
  animation: amx-rail 1.3s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .amx-pop { animation: none; }
  .amx-chat { scroll-behavior: auto; }
  .amx-dot { animation: none; }
  .amx-tcaret { animation: none; opacity: 0; }
  .amx-bar { transition: none; }
  .amx-ring { animation: none; }
  .amx-rail { animation: none; }
  .amx-sheen {
    animation: none; background-image: none;
    -webkit-text-fill-color: currentColor;
  }
}
`;

const Goo: React.FC = () => (
  <svg aria-hidden="true" width="0" height="0" className="absolute">
    <defs>
      <filter id="amx-goo" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
        />
      </filter>
    </defs>
  </svg>
);

const ChatRowView: React.FC<{ item: ChatRow }> = ({ item }) => {
  switch (item.k) {
    case "user":
      return (
        <div className="amx-pop flex justify-end">
          <span className="max-w-[86%] rounded-2xl rounded-br-md bg-gray-900 dark:bg-white px-3 py-1.5 text-white dark:text-gray-900 font-medium">
            {item.text}
          </span>
        </div>
      );

    case "bot":
      return (
        <div className="amx-pop flex justify-start">
          <span className="max-w-[92%] rounded-2xl rounded-bl-md bg-gray-100 dark:bg-white/[0.06] px-3 py-1.5 text-gray-700 dark:text-gray-200 font-medium">
            {item.text.slice(0, item.typed)}
            {item.typed < item.text.length && <i className="amx-tcaret" />}
          </span>
        </div>
      );

    case "event":
      return (
        <div className="amx-pop flex items-center justify-center gap-1.5 py-0.5 text-[11px]">
          <span className="text-gray-400 dark:text-gray-500">{item.label}</span>
          <span className="text-purple-500 text-[8px]">&#9670;</span>
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            {item.name}
          </span>
        </div>
      );

    case "count": {
      const pct = Math.min(100, (item.value / item.to) * 100);
      return (
        <div className="amx-pop flex items-center gap-2.5 min-w-0 py-0.5">
          <span className="text-gray-400 dark:text-gray-500 shrink-0">
            {item.label}
          </span>
          <span className="flex-1 min-w-0 h-[3px] rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
            <span
              className="amx-bar block h-full rounded-full bg-purple-500"
              style={{ width: `${pct}%` }}
            />
          </span>
          <span className="shrink-0 font-semibold tabular-nums text-gray-900 dark:text-white">
            {item.value.toLocaleString()}
            {item.suffix}
          </span>
        </div>
      );
    }

    // The swarm reasoning out loud before it answers — one short line at
    // a time, with a light travelling down the rail while it is still busy.
    case "trace": {
      const current = item.lines[item.shown - 1] ?? "";
      const busy =
        item.shown < item.lines.length || item.typed < current.length;
      return (
        <div className="amx-pop flex gap-2 py-0.5">
          <span
            className={`w-[2px] shrink-0 rounded-full bg-gray-200 dark:bg-white/10 ${
              busy ? "amx-rail" : ""
            }`}
          />
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-purple-600/80 dark:text-purple-300/70">
              Reasoning
            </div>
            {item.lines.slice(0, item.shown).map((line, i) => {
              const last = i === item.shown - 1;
              return (
                <div
                  key={i}
                  className="text-gray-500 dark:text-gray-400 italic truncate"
                >
                  {last ? line.slice(0, item.typed) : line}
                  {last && busy && <i className="amx-tcaret" />}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Named agents taking a sub-task each. The live one spins and its
    // task text catches a sheen; finished ones settle into a check.
    case "agents":
      return (
        <div className="amx-pop rounded-xl border border-purple-300/50 dark:border-purple-400/20 bg-purple-50/70 dark:bg-purple-500/[0.07] px-3 py-2 space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-purple-600/80 dark:text-purple-300/70">
            <span>Agents at work</span>
            <span className="tabular-nums">
              {item.done}/{item.items.length}
            </span>
          </div>
          {item.items.map((a, i) => {
            const done = i < item.done;
            const live = i === item.at;
            let nameCls = "text-gray-400 dark:text-gray-600";
            let taskCls = "text-gray-300 dark:text-gray-700";
            if (done) {
              nameCls = "text-gray-900 dark:text-white";
              taskCls = "text-gray-500 dark:text-gray-400";
            } else if (live) {
              nameCls = "text-purple-600 dark:text-purple-300";
              taskCls = "amx-sheen text-gray-500 dark:text-gray-400";
            }
            return (
              <div key={i} className="flex items-baseline gap-1.5 min-w-0">
                <span className="w-3 shrink-0 text-center">
                  {done && <span className="text-purple-500">&#10003;</span>}
                  {!done && live && <i className="amx-ring" />}
                  {!done && !live && <i className="amx-idle" />}
                </span>
                <span className={`font-mono font-semibold shrink-0 ${nameCls}`}>
                  {a.name}
                </span>
                <span className={`truncate ${taskCls}`}>{a.task}</span>
              </div>
            );
          })}
        </div>
      );

    case "result":
      return (
        <div className="amx-pop rounded-xl bg-gray-100/80 dark:bg-white/[0.05] border border-gray-200/70 dark:border-white/10 px-3 py-1 space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-purple-600/80 dark:text-purple-300/70">
            <span>{item.title}</span>
            <span className="tabular-nums">
              {item.shown}/{item.items.length} checks
            </span>
          </div>
          {item.items.slice(0, item.shown).map((r, i) => (
            <div key={i} className="amx-pop min-w-0">
              <div className="flex items-baseline gap-1.5 min-w-0 leading-[16px]">
                <span className="text-purple-500 shrink-0">&#10003;</span>
                <span className="font-semibold text-gray-900 dark:text-white shrink-0">
                  {r.key}
                </span>
                <span className="text-gray-400 dark:text-gray-600 shrink-0">
                  &rarr;
                </span>
                <span className="text-gray-600 dark:text-gray-400 truncate">
                  {r.text}
                </span>
              </div>
              <div className="pl-[18px] text-gray-400 dark:text-gray-500 text-[11px] leading-[14px]">
                {r.note}
              </div>
            </div>
          ))}
        </div>
      );

    case "think":
      return (
        <div className="amx-pop flex items-center gap-2.5 py-0.5">
          <span className="amx-goo relative block h-[18px] w-[28px] shrink-0">
            <i className="amx-dot amx-dot-1" />
            <i className="amx-dot amx-dot-2" />
            <i className="amx-dot amx-dot-3" />
          </span>
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            {item.label}
          </span>
        </div>
      );
  }
};

const SwarmChat: React.FC = () => {
  const [rows, setRows] = React.useState<ChatRow[]>([]);
  const view = React.useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reduced) {
      setRows(CHAT_SETTLED);
      return;
    }

    let alive = true;
    const timers = new Set<number>();
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });

    const push = (row: ChatRow) => setRows((prev) => [...prev, row]);
    const pop = () => setRows((prev) => prev.slice(0, -1));
    const patch = (i: number, f: (r: ChatRow) => ChatRow) =>
      setRows((prev) => prev.map((r, j) => (j === i ? f(r) : r)));
    // Append and hand back the index the row landed on, so the typing,
    // counting and reveal loops can keep editing that exact row.
    const append = (row: ChatRow) =>
      new Promise<number>((resolve) =>
        setRows((prev) => {
          resolve(prev.length);
          return [...prev, row];
        })
      );

    const run = async () => {
      while (alive) {
        setRows([]);
        await wait(700);

        for (let s = 0; s < CHAT.length && alive; s += 1) {
          const it = CHAT[s];

          if (it.k === "user") {
            push({ k: "user", text: it.text });
            await wait(900);
          } else if (it.k === "think") {
            push({ k: "think", label: it.label });
            await wait(it.ms);
            if (!alive) break;
            pop();
            await wait(180);
          } else if (it.k === "bot") {
            const at = await append({ k: "bot", text: it.text, typed: 0 });
            for (let c = 1; c <= it.text.length && alive; c += 1) {
              patch(at, (r) => (r.k === "bot" ? { ...r, typed: c } : r));
              await wait(BOT_MS);
            }
            await wait(750);
          } else if (it.k === "event") {
            push({ k: "event", label: it.label, name: it.name });
            await wait(950);
          } else if (it.k === "count") {
            const at = await append({
              k: "count",
              label: it.label,
              value: 0,
              to: it.to,
              suffix: it.suffix,
            });
            for (let t = 1; t <= COUNT_TICKS && alive; t += 1) {
              // Ease out, so the counter sprints then settles on its value.
              const p = 1 - Math.pow(1 - t / COUNT_TICKS, 3);
              const v = Math.round(it.to * p);
              patch(at, (r) => (r.k === "count" ? { ...r, value: v } : r));
              await wait(COUNT_MS);
            }
            await wait(650);
          } else if (it.k === "trace") {
            const at = await append({
              k: "trace",
              lines: it.lines,
              shown: 1,
              typed: 0,
            });
            for (let n = 0; n < it.lines.length && alive; n += 1) {
              patch(at, (r) =>
                r.k === "trace" ? { ...r, shown: n + 1, typed: 0 } : r
              );
              const line = it.lines[n];
              for (let c = 1; c <= line.length && alive; c += 1) {
                patch(at, (r) => (r.k === "trace" ? { ...r, typed: c } : r));
                await wait(TRACE_MS);
              }
              await wait(240);
            }
            await wait(520);
          } else if (it.k === "agents") {
            const at = await append({
              k: "agents",
              items: it.items,
              at: -1,
              done: 0,
            });
            for (let n = 0; n < it.items.length && alive; n += 1) {
              // Hand the sub-task to this agent, let it actually work,
              // then retire it before the next one picks up.
              patch(at, (r) => (r.k === "agents" ? { ...r, at: n } : r));
              await wait(AGENT_MS);
              patch(at, (r) =>
                r.k === "agents" ? { ...r, at: -1, done: n + 1 } : r
              );
              await wait(130);
            }
            await wait(560);
          } else {
            const at = await append({
              k: "result",
              title: it.title,
              items: it.items,
              shown: 0,
            });
            for (let n = 1; n <= it.items.length && alive; n += 1) {
              patch(at, (r) => (r.k === "result" ? { ...r, shown: n } : r));
              await wait(REVEAL_MS);
            }
            await wait(700);
          }
        }

        await wait(2200);
      }
    };

    void run();
    return () => {
      alive = false;
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
    };
  }, [reduced]);

  React.useEffect(() => {
    const el = view.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [rows]);

  return (
    <div
      ref={view}
      className="amx-chat flex-1 min-h-0 overflow-hidden select-none -mx-5 md:-mx-6 px-5 md:px-6 py-2 text-[12px] leading-[16px]"
      style={{ maskImage: FEED_MASK, WebkitMaskImage: FEED_MASK }}
    >
      <style>{CHAT_CSS}</style>
      <Goo />
      <div className="min-h-full flex flex-col justify-end gap-1.5">
        {rows.map((item, i) => (
          <ChatRowView key={i} item={item} />
        ))}
      </div>
    </div>
  );
};



/* ------------------------------------------------------- Design Studio *
 * Prompt-to-interface console. Nothing here is a looped keyframe: the
 * prompt is typed one character per tick, the suggestion cursor walks
 * the list on its own clock, the send press is a real 0→100 ramp, and
 * the wireframe gains one layer at a time because the build is actually
 * advancing. Every field below is a pure function of elapsed ms.
 * ---------------------------------------------------------------------- */

type StudioPhase = "type" | "hold" | "send" | "build" | "done";

type StudioRun = {
  prompt: string;
  tab: number;
  pick: number;
  layers: string[];
  spans: number[];
  pal: string[];
  host: string;
  tok: number;
};

const ST_TABS = ["Suggested", "Wireframe", "Apps", "Websites", "Prototype"];

const ST_SUGGESTS: { icon: "grid" | "clock" | "bag"; text: string }[] = [
  { icon: "grid", text: "A developer portfolio with dark theme, project cards, and contact form." },
  { icon: "clock", text: "A modern SaaS landing page for a time-tracking app." },
  { icon: "bag", text: "An e-commerce homepage for a skincare brand." },
];

const ST_RUNS: StudioRun[] = [
  {
    prompt: "A modern SaaS landing page for a time-tracking app.",
    tab: 3,
    pick: 1,
    layers: ["Nav + logo lockup", "Hero headline", "Live timer widget", "Pricing table", "Footer"],
    spans: [3, 5, 2, 4, 2],
    pal: ["#18181b", "#2563eb", "#a855f7", "#e4e4e7"],
    host: "amthromax.design/timeflow",
    tok: 1840,
  },
  {
    prompt: "A developer portfolio with dark theme and project cards.",
    tab: 1,
    pick: 0,
    layers: ["Sidebar rail", "Project grid", "Case study", "Contact form"],
    spans: [2, 5, 4, 3],
    pal: ["#0b0c0e", "#a855f7", "#f59e0b", "#e4e4e7"],
    host: "amthromax.design/folio",
    tok: 1265,
  },
  {
    prompt: "An e-commerce homepage for a skincare brand.",
    tab: 2,
    pick: 2,
    layers: ["Sticky header", "Product carousel", "Bundle offer", "Reviews", "Footer + links"],
    spans: [2, 5, 3, 4, 2],
    pal: ["#1c1917", "#f472b6", "#fb923c", "#e7e5e4"],
    host: "amthromax.design/lumen",
    tok: 2110,
  },
];

const ST_TYPE_MS = 38; // per character
const ST_SCAN_MS = 300; // cursor dwell per suggestion row
const ST_HOLD_MS = 560;
const ST_SEND_MS = 420;
const ST_LAYER_MS = 470;
const ST_DONE_MS = 1500;

const ST_LENS = ST_RUNS.map(
  (r) => r.prompt.length * ST_TYPE_MS + ST_HOLD_MS + ST_SEND_MS + r.layers.length * ST_LAYER_MS + ST_DONE_MS,
);
const ST_CYCLE = ST_LENS.reduce((a, b) => a + b, 0);

type StudioFrame = {
  run: number;
  phase: StudioPhase;
  typed: number;
  caret: boolean;
  hover: number;
  picked: boolean;
  tab: number;
  layers: number;
  pct: number;
  press: number;
  wave: number[];
  blink: boolean;
  look: number;
  tokens: number;
  elapsed: number;
  swatch: number;
};

const sampleStudio = (raw: number): StudioFrame => {
  const ms = Math.max(0, raw);
  const cyc = ms % ST_CYCLE;

  let run = 0;
  let t = cyc;
  while (run < ST_RUNS.length - 1 && t >= ST_LENS[run]) {
    t -= ST_LENS[run];
    run += 1;
  }

  const r = ST_RUNS[run];
  const typeEnd = r.prompt.length * ST_TYPE_MS;
  const holdEnd = typeEnd + ST_HOLD_MS;
  const sendEnd = holdEnd + ST_SEND_MS;
  const buildLen = r.layers.length * ST_LAYER_MS;
  const buildEnd = sendEnd + buildLen;

  let phase: StudioPhase = "done";
  let typed = r.prompt.length;
  let hover = r.pick;
  let picked = true;
  let layers = r.layers.length;
  let pct = 100;
  let press = 0;

  if (t < typeEnd) {
    phase = "type";
    typed = Math.floor(t / ST_TYPE_MS);
    hover = Math.floor(t / ST_SCAN_MS) % ST_SUGGESTS.length;
    picked = false;
    layers = 0;
    pct = 0;
  } else if (t < holdEnd) {
    phase = "hold";
    picked = false;
    layers = 0;
    pct = 0;
  } else if (t < sendEnd) {
    phase = "send";
    press = Math.round(((t - holdEnd) / ST_SEND_MS) * 20) * 5;
    layers = 0;
    pct = 0;
  } else if (t < buildEnd) {
    phase = "build";
    layers = Math.min(r.layers.length, Math.floor((t - sendEnd) / ST_LAYER_MS) + 1);
    pct = Math.min(100, Math.round(((t - sendEnd) / buildLen) * 100));
  }

  let tokens = 0;
  let elapsed = 0;

  if (phase === "send") {
    elapsed = Math.round((t - holdEnd) / 100) * 100;
  } else if (phase === "build") {
    tokens = Math.round((((t - sendEnd) / buildLen) * r.tok) / 9) * 9;
    elapsed = Math.round((t - holdEnd) / 100) * 100;
  } else if (phase === "done") {
    tokens = r.tok;
    elapsed = Math.round((ST_SEND_MS + buildLen) / 100) * 100;
  }

  const live = phase === "type" || phase === "send";
  const wave = [0, 1, 2, 3].map((i) =>
    live ? 1 + Math.round(Math.abs(Math.sin(ms / 125 + i * 0.85)) * 4) : 1 + (i % 2),
  );

  return {
    run,
    phase,
    typed,
    caret: phase === "type" ? true : Math.floor(ms / 520) % 2 === 0,
    hover,
    picked,
    tab: phase === "type" || phase === "hold" ? 0 : r.tab,
    layers,
    pct,
    press,
    wave,
    blink: ms % 4300 > 4080,
    look: phase === "type" ? -1 : phase === "build" || phase === "send" ? 1 : 0,
    tokens,
    elapsed,
    swatch: phase === "build" || phase === "done" ? Math.min(4, layers) : 0,
  };
};

const sameStudio = (a: StudioFrame, b: StudioFrame) =>
  a.run === b.run &&
  a.phase === b.phase &&
  a.typed === b.typed &&
  a.caret === b.caret &&
  a.hover === b.hover &&
  a.picked === b.picked &&
  a.tab === b.tab &&
  a.layers === b.layers &&
  a.pct === b.pct &&
  a.press === b.press &&
  a.blink === b.blink &&
  a.look === b.look &&
  a.tokens === b.tokens &&
  a.elapsed === b.elapsed &&
  a.swatch === b.swatch &&
  a.wave.every((v, i) => v === b.wave[i]);

const ST_SPIN_MS = 950;
const ST_MAN_LAYER_MS = 620;

/* suggestion row -> the run that actually builds that prompt */
const ST_SUG_RUN = ST_SUGGESTS.map((_, i) => {
  const k = ST_RUNS.findIndex((r) => r.pick === i);
  return k < 0 ? 0 : k;
});

type StManPhase = "spin" | "run" | "done";

type StManFrame = {
  run: number;
  phase: StManPhase;
  spin: number;
  dots: number;
  layers: number;
  pct: number;
  tokens: number;
  elapsed: number;
  swatch: number;
};

/* The visitor-started timeline. Same contract as sampleStudio: a pure function
   of elapsed ms, quantised so React only re-renders on a real change. */
const sampleMan = (runIdx: number, raw: number): StManFrame => {
  const ms = Math.max(0, raw);
  const r = ST_RUNS[runIdx];
  const buildLen = r.layers.length * ST_MAN_LAYER_MS;

  if (ms < ST_SPIN_MS) {
    return {
      run: runIdx,
      phase: "spin",
      spin: Math.round((ms / ST_SPIN_MS) * 20) * 5,
      dots: 1 + (Math.floor(ms / 300) % 3),
      layers: 0,
      pct: 0,
      tokens: 0,
      elapsed: 0,
      swatch: 0,
    };
  }

  const t = ms - ST_SPIN_MS;

  if (t < buildLen) {
    const layers = Math.min(r.layers.length, Math.floor(t / ST_MAN_LAYER_MS) + 1);
    return {
      run: runIdx,
      phase: "run",
      spin: 100,
      dots: 1 + (Math.floor(t / 300) % 3),
      layers,
      pct: Math.min(100, Math.round((t / buildLen) * 100)),
      tokens: Math.round(((t / buildLen) * r.tok) / 9) * 9,
      elapsed: Math.round((ST_SPIN_MS + t) / 100) * 100,
      swatch: Math.min(4, layers),
    };
  }

  return {
    run: runIdx,
    phase: "done",
    spin: 100,
    dots: 0,
    layers: r.layers.length,
    pct: 100,
    tokens: r.tok,
    elapsed: Math.round((ST_SPIN_MS + buildLen) / 100) * 100,
    swatch: 4,
  };
};

const sameMan = (a: StManFrame, b: StManFrame) =>
  a.run === b.run &&
  a.phase === b.phase &&
  a.spin === b.spin &&
  a.dots === b.dots &&
  a.layers === b.layers &&
  a.pct === b.pct &&
  a.tokens === b.tokens &&
  a.elapsed === b.elapsed &&
  a.swatch === b.swatch;

const STUDIO_CSS = `
@keyframes amx-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes amx-blip { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
.amx-bob { animation: amx-bob 3.6s ease-in-out infinite; }
.amx-blip { animation: amx-blip 1.6s ease-in-out infinite; }
.amx-bar { transition: height .09s linear; }
@keyframes amx-spin { to { transform: rotate(360deg); } }
@keyframes amx-halo { 0% { transform: scale(.8); opacity: .6; } 100% { transform: scale(1.55); opacity: 0; } }
@keyframes amx-rise { from { opacity: 0; transform: translateY(10px) scale(.985); } to { opacity: 1; transform: none; } }
.amx-spin { animation: amx-spin .9s linear infinite; }
.amx-halo { animation: amx-halo 1.5s ease-out infinite; }
.amx-rise { animation: amx-rise .34s cubic-bezier(.22,1,.36,1) both; }
@media (prefers-reduced-motion: reduce) {
  .amx-bob, .amx-blip, .amx-spin, .amx-halo, .amx-rise { animation: none; }
  .amx-bar { transition: none; }
}
`;

const StIcon: React.FC<{ k: string; className?: string }> = ({ k, className }) => {
  const p = { className, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.4 } as const;
  if (k === "grid")
    return (
      <svg {...p}>
        <rect x="2" y="2" width="5" height="5" rx="1.2" />
        <rect x="9" y="2" width="5" height="5" rx="1.2" />
        <rect x="2" y="9" width="5" height="5" rx="1.2" />
        <rect x="9" y="9" width="5" height="5" rx="1.2" />
      </svg>
    );
  if (k === "clock")
    return (
      <svg {...p}>
        <circle cx="8" cy="8" r="6" />
        <path d="M8 4.6V8l2.4 1.5" strokeLinecap="round" />
      </svg>
    );
  if (k === "bag")
    return (
      <svg {...p}>
        <path d="M3.2 5.4h9.6l-.8 8.2H4z" strokeLinejoin="round" />
        <path d="M6 5.4a2 2 0 0 1 4 0" />
      </svg>
    );
  if (k === "clip")
    return (
      <svg {...p}>
        <path d="M11.4 7.3 7.6 11a2.3 2.3 0 0 1-3.3-3.3l4.4-4.4a1.6 1.6 0 0 1 2.3 2.3l-4.4 4.4a.8.8 0 0 1-1.1-1.1l3.9-3.9" strokeLinecap="round" />
      </svg>
    );
  if (k === "bulb")
    return (
      <svg {...p}>
        <path d="M5.6 9.6a3.6 3.6 0 1 1 4.8 0c-.5.5-.7 1-.7 1.6H6.3c0-.6-.2-1.1-.7-1.6Z" strokeLinejoin="round" />
        <path d="M6.4 13.4h3.2" strokeLinecap="round" />
      </svg>
    );
  if (k === "chev")
    return (
      <svg {...p}>
        <path d="m5 6.5 3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg {...p} fill="currentColor" stroke="none">
      <path d="m8 1.6 1.5 4.2 4.2 1.5-4.2 1.5L8 13l-1.5-4.2L2.3 7.3l4.2-1.5z" />
    </svg>
  );
};

/* 3D Glass Asterisk Core Emblem without outer black box container */
const StudioBot: React.FC<{ blink?: boolean; look?: number }> = () => (
  <div className="relative group shrink-0 select-none">
    {/* Ambient Glow behind 3D Asterisk */}
    <div className="absolute inset-0 rounded-full bg-white/10 blur-xl group-hover:opacity-100 opacity-50 transition-opacity duration-500 amx-blip" />
    
    {/* Floating 3D Emblem Image ONLY - Seamless integration */}
    <div className="amx-bob relative h-[62px] w-[62px] md:h-[74px] md:w-[74px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
      <img
        src="/images/asterisk_3d_transparent.png"
        alt="Amthromax 3D Core Emblem"
        className="w-full h-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.3)]"
      />
    </div>
  </div>
);

const AMTHROMAX_MODELS = [
  { name: "Simifig", tag: "Flagship", desc: "Frontier reasoning & code synthesis" },
  { name: "Ligivor", tag: "Multimodal", desc: "Real-time UI & spatial generation" },
  { name: "Favlon", tag: "Fast", desc: "Sub-50ms ultra-low latency agent" },
  { name: "Roqlow", tag: "Deep", desc: "Autonomous complex task mesh" },
];

const DesignStudio: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [f, setF] = React.useState<StudioFrame>(() => sampleStudio(0));
  const [selectedModel, setSelectedModel] = React.useState("Simifig");
  const [modelDropdownOpen, setModelDropdownOpen] = React.useState(false);
  const [attachedFile, setAttachedFile] = React.useState<string | null>(null);
  
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  /* A visitor-started run lives beside the autonomous demo. pick is the row
     they clicked; the ref mirrors it so the rAF loop below never restarts. */
  const [pick, setPick] = React.useState<number | null>(null);
  const [mf, setMf] = React.useState<StManFrame | null>(null);
  const [hover, setHover] = React.useState(-1);
  const pickRef = React.useRef(-1);
  const pickT0 = React.useRef(0);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setModelDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (reduced) {
      setF(sampleStudio(ST_LENS[0] - ST_DONE_MS / 2));
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const next = sampleStudio(now - t0);
      setF((prev) => (sameStudio(prev, next) ? prev : next));
      if (pickRef.current >= 0) {
        const m = sampleMan(pickRef.current, now - pickT0.current);
        setMf((prev) => (prev && sameMan(prev, m) ? prev : m));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const startRun = React.useCallback(
    (i: number) => {
      const rx = ST_SUG_RUN[i];
      setPick(i);
      setHover(-1);
      if (reduced) {
        pickRef.current = -1;
        setMf(sampleMan(rx, ST_SPIN_MS + ST_RUNS[rx].layers.length * ST_MAN_LAYER_MS));
        return;
      }
      pickT0.current = performance.now();
      pickRef.current = rx;
      setMf(sampleMan(rx, 0));
    },
    [reduced],
  );

  const resetRun = React.useCallback(() => {
    pickRef.current = -1;
    setPick(null);
    setMf(null);
  }, []);

  const againRun = React.useCallback(() => {
    if (pick !== null) startRun(pick);
  }, [pick, startRun]);

  const run = ST_RUNS[f.run];

  /* One view object, so every readout below reports whichever timeline is
     really driving: the autonomous demo, or the run the visitor just started. */
  const vRun = mf ? ST_RUNS[mf.run] : run;
  const vTab = mf ? vRun.tab : f.tab;
  const vText = mf ? vRun.prompt : run.prompt.slice(0, f.typed);
  const vCaret = mf ? false : f.caret;
  const vLayers = mf ? mf.layers : f.layers;
  const vPct = mf ? mf.pct : f.pct;
  const vTokens = mf ? mf.tokens : f.tokens;
  const vElapsed = mf ? mf.elapsed : f.elapsed;
  const vSwatch = mf ? mf.swatch : f.swatch;
  const vBusy = mf ? mf.phase !== "done" : f.phase === "build";
  const vDone = mf ? mf.phase === "done" : f.phase === "done";
  const nodes = vRun.spans.slice(0, vLayers).reduce((a, b) => a + b, 0) * 3;

  const status = mf
    ? mf.phase === "spin"
      ? "Warming the model"
      : mf.phase === "run"
        ? `Generating ${vRun.layers[Math.max(0, mf.layers - 1)]}`
        : "Interface ready"
    : f.phase === "build"
      ? `Generating ${run.layers[Math.max(0, f.layers - 1)]}`
      : f.phase === "done"
        ? "Interface ready"
        : f.phase === "send"
          ? "Sending to the model"
          : "Waiting for a prompt";

  /* What the popup quotes: the layer being written now, then what is queued. */
  const vQueue = [...vRun.layers, "Finalising the layout", "Handing off to preview"];
  const li = mf ? Math.max(0, Math.min(vRun.layers.length - 1, mf.layers - 1)) : 0;
  const popLines =
    mf && mf.phase === "done"
      ? [vRun.host, `${vRun.layers.length} layers, ${nodes} nodes`, `${vRun.tok.toLocaleString()} tokens`]
      : [vQueue[li], vQueue[li + 1], vQueue[li + 2]];

  return (
    <div className="bg-black rounded-2xl border border-white/10 shadow-sm flex flex-col md:h-[390px] group hover:border-white/20 transition-all duration-300 relative">
      <style>{STUDIO_CSS}</style>

      {/* Top macOS Window Control Bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-black px-4 py-2.5 select-none rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ff5f56] shadow-xs cursor-pointer hover:opacity-80 transition-opacity" />
          <span className="size-3 rounded-full bg-[#ffbd2e] shadow-xs cursor-pointer hover:opacity-80 transition-opacity" />
          <span className="size-3 rounded-full bg-[#27c93f] shadow-xs cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
        <span className="font-mono text-[11.5px] font-semibold text-gray-300 tracking-wider">amthromax.design / studio</span>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Terminal button (>_) */}
          <button
            type="button"
            title="Terminal CLI"
            className="flex size-7.5 items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all cursor-pointer shadow-xs"
          >
            <svg viewBox="0 0 16 16" className="size-4 fill-none stroke-white stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
              <path d="M3.5 5.5l3 2.5-3 2.5M8.5 10.5h4" />
            </svg>
          </button>

          {/* Doc/Book box button ([+]) */}
          <button
            type="button"
            title="Documentation"
            className="flex size-7.5 items-center justify-center rounded-lg text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <svg viewBox="0 0 16 16" className="size-4 fill-none stroke-white stroke-[1.8]">
              <rect x="3" y="2.5" width="10" height="11" rx="1.8" />
              <path d="M6 6h4M6 8.5h4M8 11h.01" />
            </svg>
          </button>

          {/* Globe button (🌐) */}
          <button
            type="button"
            title="Global Network"
            className="flex size-7.5 items-center justify-center rounded-lg text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <svg viewBox="0 0 16 16" className="size-4 fill-none stroke-white stroke-[1.8]">
              <circle cx="8" cy="8" r="5.5" />
              <path d="M2.5 8h11M8 2.5a8.5 8.5 0 0 1 0 11 8.5 8.5 0 0 1 0-11z" />
            </svg>
          </button>

          {/* Vertical Three Dots Options (⋮) */}
          <button
            type="button"
            title="More Options"
            className="flex size-7.5 items-center justify-center rounded-lg text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <svg viewBox="0 0 16 16" className="size-4 fill-white">
              <circle cx="8" cy="3" r="1.4" />
              <circle cx="8" cy="8" r="1.4" />
              <circle cx="8" cy="13" r="1.4" />
            </svg>
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-sans text-[11px] font-semibold shadow-[0_0_15px_rgba(99,102,241,0.35)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ml-1"
          >
            <span className="text-[11px] leading-none">✦</span>
            <span>Deploy</span>
          </button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
        {/* ---- prompt side ---- */}
        <div className="flex min-h-0 flex-col justify-center gap-3 bg-black p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-sans text-[20px] leading-[1.25] tracking-tight text-white md:text-[25px]">
              Turn your <span className="font-semibold text-white">ideas</span> into{" "}
              <span className="font-semibold text-white">interfaces</span>
            </h3>
            <StudioBot blink={f.blink} look={f.look} />
          </div>

          <div className="relative rounded-2xl bg-black border border-white/15 p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-white/30 group/glass">
            <div className="relative z-10 min-h-[38px] font-sans text-[14px] font-semibold leading-relaxed text-white">
              {vCaret && <span className="mr-1 inline-block h-[17px] w-[2.5px] -mb-[2px] bg-blue-400 align-middle shadow-[0_0_10px_#60a5fa]" />}
              {vText ? (
                <span className="tracking-tight text-white drop-shadow-sm font-semibold">{vText}</span>
              ) : (
                <span className="text-gray-200 font-medium">What do you want to design?</span>
              )}
            </div>

            <div className="relative z-10 mt-3.5 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setAttachedFile(file.name);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title={attachedFile ? `Attached: ${attachedFile}` : "Attach file or asset"}
                  className="relative flex size-8 shrink-0 items-center justify-center text-white/70 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <svg viewBox="0 0 16 16" className="size-4 fill-none stroke-current stroke-[2.4] stroke-linecap-round">
                    <path d="M8 3.5V12.5M3.5 8H12.5" />
                  </svg>
                  {attachedFile && (
                    <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 border border-black shadow-[0_0_8px_#34d399]" />
                  )}
                </button>

              </div>

              <div className="flex shrink-0 items-center gap-2">
                {/* Model Selector Dropdown */}
                <div className="relative shrink-0" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setModelDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-1 font-sans text-[12.5px] font-bold text-white/90 hover:text-white px-1.5 py-1 hover:scale-105 active:scale-95 transition-all duration-200 select-none cursor-pointer"
                  >
                    <span className="font-bold text-white tracking-wide">{selectedModel}</span>
                    <StIcon k="chev" className={`size-3.5 text-white/90 transition-transform duration-200 ${modelDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {modelDropdownOpen && (
                    <div className="absolute right-0 bottom-full mb-2 w-[260px] rounded-2xl border border-white/10 bg-[#18181b] p-2.5 shadow-2xl backdrop-blur-2xl z-[100] animate-in fade-in slide-in-from-bottom-2 duration-200 font-sans select-none text-left">
                      {/* Section 1: Header */}
                      <div className="px-2.5 py-1 text-[12px] font-medium text-zinc-400">
                        Models
                      </div>

                      {/* Models vertical list */}
                      <div className="flex flex-col gap-0.5 mt-1">
                        {AMTHROMAX_MODELS.map((m, idx) => {
                          const isSelected = selectedModel === m.name;
                          return (
                            <button
                              key={m.name}
                              type="button"
                              onClick={() => {
                                setSelectedModel(m.name);
                                setModelDropdownOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-2 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? "bg-white/10 text-white"
                                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">{m.name}</span>
                                {m.tag && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-400 font-normal">
                                    {m.tag}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
                                {isSelected && <span className="text-blue-500 font-bold text-[13px]">✓</span>}
                                <span>{idx + 1}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <span className="relative flex size-9 items-center justify-center rounded-full bg-gradient-to-b from-white via-gray-100 to-gray-200 text-black shadow-[0_0_20px_rgba(255,255,255,0.35),0_4px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_28px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
                  {f.press > 0 && (
                    <span
                      className="absolute inset-0 rounded-full border border-white"
                      style={{
                        transform: `scale(${1 + f.press / 90})`,
                        opacity: Math.max(0, 1 - f.press / 100) * 0.5,
                      }}
                    />
                  )}
                  <svg viewBox="0 0 16 16" className="size-4 fill-none stroke-black stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
                    <path d="M8 13V3.2M3.8 7L8 2.8L12.2 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---- suggestions + build side ---- */}
        <div className="flex min-h-0 flex-col gap-2 border-t border-white/10 bg-black p-4 md:border-l md:border-t-0 md:p-5">
          <div className="flex items-center gap-3 overflow-hidden">
            {ST_TABS.map((t, i) => (
              <span
                key={t}
                className={`flex shrink-0 items-center gap-1.5 px-1 py-1 font-sans text-[12.5px] transition-all duration-200 select-none cursor-pointer ${
                  i === vTab
                    ? "text-white font-bold"
                    : "text-gray-400 font-medium hover:text-white"
                } ${i > 2 ? "hidden lg:flex" : ""}`}
              >
                {i === 0 && <StIcon k="bulb" className="size-3.5 text-white" />}
                <span>{t}</span>
              </span>
            ))}
          </div>

          {/* Real buttons. Click one and the demo hands over: the pick lifts out of
              the stack, the core spins up, then the popup reports the run itself. */}
          <div className="relative min-h-[120px] flex-1">
            <div
              className={`space-y-1.5 transition-opacity duration-300 ${
                mf && mf.phase !== "spin" ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              {ST_SUGGESTS.map((s, i) => {
                const lifted = pick === i;
                const sunk = pick !== null && pick !== i;
                const on = pick === null && (hover === i || (hover === -1 && i === f.hover));
                const chosen = pick === null && f.picked && i === run.pick;
                return (
                  <button
                    key={s.text}
                    type="button"
                    onClick={() => startRun(i)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(-1)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-300 ${
                      lifted
                        ? "bg-white/[0.15] text-white ring-1 ring-white/30 shadow-[0_10px_28px_rgba(0,0,0,0.55)]"
                        : sunk
                          ? "text-gray-400 opacity-40"
                          : chosen
                            ? "bg-white/15 text-white font-semibold"
                            : on
                              ? "bg-white/10 text-white font-medium"
                              : "text-gray-200 hover:text-white"
                    }`}
                    style={{ transform: lifted ? "scale(1.02)" : sunk ? "scale(0.96)" : "none" }}
                  >
                    <StIcon
                      k={s.icon}
                      className={`size-4 shrink-0 transition-colors duration-300 ${
                        lifted ? "text-purple-300" : "text-gray-300"
                      }`}
                    />
                    <span
                      className={`min-w-0 flex-1 font-sans text-[12.5px] font-semibold leading-[1.35] line-clamp-2 ${
                        lifted ? "text-white" : "text-gray-100"
                      }`}
                    >
                      {s.text}
                    </span>
                    {chosen ? (
                      <span className="shrink-0 font-sans text-[13px] font-bold text-white">→</span>
                    ) : on ? (
                      <svg viewBox="0 0 12 14" className="size-3.5 shrink-0 fill-white">
                        <path d="M0 0l11 6.6-4.6.8L8.9 12l-1.9.9-2.4-4.5L0 11z" />
                      </svg>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* The core spins while the request is still on the wire. */}
            {mf && mf.phase === "spin" && (
              <div className="amx-rise pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#101114]/90 py-2 pl-2 pr-4 shadow-[0_12px_34px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                  <span className="relative flex size-8 items-center justify-center">
                    <span className="amx-spin absolute inset-0 rounded-full border-[1.6px] border-purple-400/20 border-t-purple-400" />
                    <span className="amx-halo absolute inset-0 rounded-full border border-purple-400/40" />
                    <img
                      src="/images/asterisk_3d_transparent.png"
                      alt=""
                      className="size-[17px] object-contain"
                      style={{ transform: `rotate(${mf.spin * 3.6}deg)` }}
                    />
                  </span>
                  <span className="font-sans text-[11px] text-gray-200">
                    Spinning up the core{".".repeat(mf.dots)}
                  </span>
                </div>
              </div>
            )}

            {/* Live report of the run the visitor started. */}
            {mf && mf.phase !== "spin" && (
              <div className="amx-rise absolute inset-0 z-10 flex items-center">
                <div className="w-full rounded-2xl border border-white/[0.12] bg-[#141519] p-3 shadow-[0_16px_44px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-purple-300">
                      {mf.phase === "run" ? "Running your prompt" : "Build complete"}
                    </span>
                    {mf.phase === "run" ? (
                      <span className="amx-spin size-3.5 shrink-0 rounded-full border-[1.6px] border-purple-400/20 border-t-purple-400" />
                    ) : (
                      <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 font-sans text-[8px] leading-none text-purple-300">
                        &#10003;
                      </span>
                    )}
                  </div>

                  <div className="mt-2.5 flex items-start gap-2.5">
                    <span
                      className="size-9 shrink-0 rounded-lg ring-1 ring-white/20 transition-all duration-500 shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${vRun.pal[1]} 0%, ${vRun.pal[2]} 100%)`,
                        opacity: 0.45 + (vPct / 100) * 0.55,
                      }}
                    />
                    <div className="min-w-0 flex-1 space-y-[3px]">
                      <p className="truncate font-sans text-[12.5px] font-semibold leading-tight text-white tracking-tight">
                        &ldquo;{popLines[0]}&rdquo;
                      </p>
                      <p className="truncate font-sans text-[11.5px] font-medium leading-tight text-gray-200">
                        &ldquo;{popLines[1]}&rdquo;
                      </p>
                      <p className="truncate font-sans text-[11.5px] font-medium leading-tight text-gray-300">
                        &ldquo;{popLines[2]}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={resetRun}
                      className="cursor-pointer rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md px-4 py-1.5 font-sans text-[12.5px] font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      Start over
                    </button>
                    <button
                      type="button"
                      onClick={againRun}
                      disabled={mf.phase === "run"}
                      className="cursor-pointer rounded-full bg-white text-black hover:bg-gray-200 px-4.5 py-1.5 font-sans text-[12.5px] font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-200 disabled:cursor-default disabled:opacity-50"
                    >
                      {mf.phase === "run" ? `Building ${mf.pct}%` : "Build again"}
                    </button>
                    <span className="ml-auto shrink-0 font-mono text-[10.5px] font-medium text-gray-300">
                      {(mf.elapsed / 1000).toFixed(1)}s
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto rounded-2xl bg-black border border-white/10 px-4 py-3.5 shadow-lg">
            <div className="flex items-center justify-between gap-2 font-sans text-[12px]">
              <span className="flex min-w-0 items-center gap-2 truncate text-white font-semibold">
                <span
                  className={`size-2.5 shrink-0 rounded-full ${
                    vBusy
                      ? "bg-white"
                      : vDone
                        ? "bg-white"
                        : "bg-gray-400"
                  }`}
                />
                <span className="truncate text-white font-bold tracking-tight">{status}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2.5">
                <span className="hidden items-center gap-[4px] sm:flex">
                  {vRun.pal.map((c, i) => (
                    <span
                      key={c}
                      className="size-2.5 rounded-full transition-all duration-300"
                      style={{
                        background: c,
                        opacity: i < vSwatch ? 0.9 : 0.25,
                        transform: i < vSwatch ? "none" : "scale(0.75)",
                      }}
                    />
                  ))}
                </span>
                <span className="font-mono text-white font-bold text-[11.5px] tracking-wide">
                  {vLayers}/{vRun.layers.length} layers
                </span>
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10 p-[1px]">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-150 ease-linear"
                style={{ width: `${vPct}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[11px] font-bold text-white">
              <span className="text-white bg-white/10 px-2 py-0.5 rounded-md">{vTokens.toLocaleString()} tok</span>
              <span className="text-white bg-white/10 px-2 py-0.5 rounded-md">{nodes} nodes</span>
              <span className="text-white bg-white/10 px-2 py-0.5 rounded-md">{(vElapsed / 1000).toFixed(1)}s</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-white/10 bg-black px-5 py-3 font-sans text-xs rounded-b-2xl">
        <span className="font-sans font-semibold text-white tracking-wide">Interface Synthesis</span>
        <Link
          to="/products"
          className="flex items-center gap-1.5 text-gray-300 font-medium transition-colors hover:text-white"
        >
          <span>Explore</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-white dark:bg-black text-gray-900 dark:text-white pt-16 md:pt-24 pb-20 px-6 overflow-hidden">
      {/* Main Headline & CTAs */}
      <div className="max-w-7xl mx-auto text-center space-y-6 px-4 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal font-sans tracking-tight leading-[1.06] text-gray-900 dark:text-white"
        >
          <span>Autonomous AI models</span>
          <br />
          <span>for enterprise </span>
          <span className="relative inline-block text-black dark:text-white underline underline-offset-8 decoration-1 decoration-gray-400 dark:decoration-gray-600">
            <span>intelligence</span>
          </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-black dark:text-white"
          >
            .
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-normal"
        >
          Autonomous agents, intelligent automation, and developer APIs. Engineered for mission-critical operations.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Link
            to="/register"
            className="h-11 px-6 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md select-none"
          >
            <span>Start Free Trial</span>
            <span className="text-xs font-normal">›</span>
          </Link>
          <Link
            to="/book"
            className="h-11 px-6 border border-gray-300 dark:border-white/20 bg-white dark:bg-black text-gray-900 dark:text-white rounded-full text-xs font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-all flex items-center select-none"
          >
            Book Enterprise Demo
          </Link>
          <Link
            to="/docs"
            className="h-11 px-6 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition-all flex items-center select-none"
          >
            View Documentation
          </Link>
        </motion.div>
      </div>

      {/* Bento Showcase Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="max-w-7xl mx-auto mt-14 space-y-4 md:space-y-5"
      >
        {/* Top Row: 2 Equal-Sized Premium Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* Equal Box 1: Neural Reasoning & Agentic Build */}
          <div className="bg-white dark:bg-black rounded-2xl p-5 md:p-6 flex flex-col justify-between border border-gray-200/80 dark:border-white/10 shadow-sm font-mono text-[11px] text-gray-800 dark:text-gray-300 overflow-hidden h-[240px] relative group hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
            <AgentSession />
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200/50 dark:border-white/10 pt-2.5 font-sans font-medium">
              <span className="font-mono text-gray-600 dark:text-gray-300 font-semibold">Neural Reasoning &amp; Build</span>
              <Link to="/products" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
                <span>Learn More</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Equal Box 2: Autonomous Swarm Mesh */}
          <div className="bg-white dark:bg-black rounded-2xl p-5 md:p-6 flex flex-col border border-gray-200/80 dark:border-white/10 shadow-sm overflow-hidden h-[240px] relative group hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
            <SwarmChat />

            <div className="shrink-0 flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 pt-2.5 border-t border-gray-200/50 dark:border-white/10 font-sans">
              <span className="font-mono text-gray-600 dark:text-gray-300 font-semibold">Autonomous Swarm</span>
              <Link to="/platform" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
                <span>View Architecture</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Row: Prompt-to-interface design studio */}
        <DesignStudio />
      </motion.div>
    </section>
  );
};

export default HeroSection;

