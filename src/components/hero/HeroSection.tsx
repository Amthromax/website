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

const CAPTION_MASK =
  "linear-gradient(to right, transparent 0, #000 28px, #000 100%)";

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
        <div className="-mx-5 md:-mx-6 px-5 md:px-6 my-1 py-1 bg-[#1f1f1f] flex items-baseline gap-2 min-w-0">
          <span className="text-[#3b82f6] shrink-0">&rsaquo;</span>
          <span className="text-white font-semibold truncate">
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
          <div className="flex items-center gap-2 text-[#8b8b93]">
            <span className="text-[#a78bfa]">&#8942;</span>
            <span>
              Thinking{dots}
              <span className="text-[#5b5b63] tabular-nums">
                {" "}
                {(item.ms / 1000).toFixed(1)}s
              </span>
            </span>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-2 text-[#a1a1aa]">
          <span className="text-[#a78bfa] text-[10px]">&#9670;</span>
          <span>Thought for {(item.total / 1000).toFixed(1)}s</span>
        </div>
      );
    }

    case "tool":
      return (
        <div className="flex items-baseline gap-2 min-w-0">
          <span
            className={`text-[#2dd4bf]/70 text-[10px] shrink-0 ${
              item.ready ? "" : "animate-pulse"
            }`}
          >
            &#9656;
          </span>
          <span className="text-[#2dd4bf] font-semibold shrink-0">{item.name}</span>
          <span className="text-[#d4d4d8] truncate">{item.arg}</span>
          <span className="text-[#6b7280] shrink-0">
            {item.ready ? item.out : <span className="animate-pulse">&#8230;</span>}
          </span>
        </div>
      );

    case "task":
      return (
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`w-[2px] h-[14px] shrink-0 ${
              item.done ? "bg-[#22c55e]" : "bg-[#3b82f6] animate-pulse"
            }`}
          />
          <span className="text-[#d4d4d8] truncate">{item.title}</span>
          <span className="text-[#6b7280] truncate">{item.agent}</span>
          <span
            className={`ml-auto pl-2 shrink-0 ${
              item.done ? "text-[#4ade80]" : "text-[#60a5fa] animate-pulse"
            }`}
          >
            {item.done ? "[done]" : "[running]"}
          </span>
        </div>
      );

    case "edit":
      return (
        <div className="flex items-baseline gap-2 mt-1.5 min-w-0">
          <span className="text-[#a78bfa] text-[10px] shrink-0">&#9670;</span>
          <span className="text-white font-semibold shrink-0">Edit</span>
          <span className="text-[#86efac] truncate">{item.file}</span>
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
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-gray-400">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex items-center gap-1 shrink-0">
            <span className="w-[7px] h-[7px] rounded-full bg-[#fd5f57] inline-block" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#febc30] inline-block" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#28c840] inline-block" />
          </span>
          <span className="text-[#a1a1aa] font-medium text-xs truncate">
            amthromax/neural-core
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[#4b4b52]">|</span>
          <span className="w-7 h-[5px] rounded-full bg-white/10 overflow-hidden inline-block">
            <span
              className="block h-full rounded-full bg-white/60 transition-[width] duration-500 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </span>
          <span className="text-[10px] text-[#d4d4d8] font-mono tabular-nums">
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

/* ------------------------------------------------------------- spatial */

type P3 = { x: number; y: number; z: number };

// A Fibonacci sphere: an even scatter over a unit sphere, so the cloud
// reads as a surface instead of banded rings.
const CLOUD: P3[] = Array.from({ length: 64 }, (_, i) => {
  const k = i + 0.5;
  const phi = Math.acos(1 - (2 * k) / 64);
  const theta = Math.PI * (1 + Math.sqrt(5)) * k;
  return {
    x: Math.cos(theta) * Math.sin(phi),
    y: Math.cos(phi),
    z: Math.sin(theta) * Math.sin(phi),
  };
});

// Point pairs close enough on the sphere to be worth drawing as mesh
// edges. Computed once, then filtered each frame by what has been caught.
const EDGES: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (let i = 0; i < CLOUD.length; i += 1) {
    for (let j = i + 1; j < CLOUD.length; j += 1) {
      const a = CLOUD[i];
      const b = CLOUD[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
      if (d < 0.44) out.push([i, j]);
    }
  }
  return out;
})();

const SWEEP = 190; // frames in one top-to-bottom capture pass
const SPIN = 0.012; // radians of yaw per frame
const STAGES = [
  "Scanning depth",
  "Meshing surface",
  "Baking texture",
  "Scene ready",
];

const SpatialEngine: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [tick, setTick] = React.useState(0);
  const [caught, setCaught] = React.useState<boolean[]>(() =>
    CLOUD.map(() => false)
  );
  const [stage, setStage] = React.useState(0);

  React.useEffect(() => {
    if (reduced) {
      setCaught(CLOUD.map(() => true));
      setStage(STAGES.length - 1);
      return;
    }

    let raf = 0;
    let n = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      n += 1;
      if (n % 2) return; // hold the cloud at ~30fps, not 60
      setTick(n);

      const pass = Math.floor(n / SWEEP) % STAGES.length;
      const at = n % SWEEP;
      if (at < 2) {
        // A pass just ended. The last stage holds the finished mesh; the
        // rest start over with nothing captured yet.
        setStage(pass);
        setCaught(CLOUD.map(() => pass === STAGES.length - 1));
        return;
      }
      if (pass === STAGES.length - 1) return; // built, just let it turn
      // Where the scan plane sits this frame, in sphere space.
      const plane = 1 - (2 * at) / SWEEP;
      setCaught((prev) => {
        let hit = false;
        const next = prev.map((was, i) => {
          if (was || CLOUD[i].y < plane) return was;
          hit = true;
          return true;
        });
        return hit ? next : prev;
      });
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const yaw = tick * SPIN;
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  // Yaw only, no tilt: a point's model y then maps straight to a screen
  // row, so the scan line lands exactly on the points it captures.
  const view = CLOUD.map((p) => {
    const z = p.z * cos - p.x * sin;
    return {
      cx: 100 + (p.x * cos + p.z * sin) * 60,
      cy: 100 - p.y * 60,
      d: (z + 1) / 2, // 0 = far, 1 = near
    };
  });

  const at = tick % SWEEP;
  const plane = 1 - (2 * at) / SWEEP;
  const scanY = 100 - plane * 60;
  const got = caught.reduce((a, b) => a + (b ? 1 : 0), 0);
  const pts = got * 16; // 64 sampled points stand in for 1,024
  const settled = stage === STAGES.length - 1;

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
          <circle
            cx="100"
            cy="100"
            r="76"
            stroke="#ef4444"
            strokeOpacity="0.22"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            transform={`rotate(${-tick * 0.3} 100 100)`}
          />
          {EDGES.map(([i, j], k) =>
            caught[i] && caught[j] ? (
              <line
                key={k}
                x1={view[i].cx}
                y1={view[i].cy}
                x2={view[j].cx}
                y2={view[j].cy}
                stroke="#ef4444"
                strokeWidth="0.7"
                strokeOpacity={
                  0.08 + ((view[i].d + view[j].d) / 2) * (settled ? 0.4 : 0.26)
                }
              />
            ) : null
          )}
          {view.map((p, i) => (
            <circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r={caught[i] ? 1.3 + p.d * 1.9 : 1 + p.d * 0.8}
              fill={caught[i] ? "#ef4444" : "#ffffff"}
              fillOpacity={
                caught[i] ? 0.35 + p.d * 0.6 : 0.06 + p.d * 0.12
              }
            />
          ))}
          {!settled && (
            <>
              <line
                x1="16"
                y1={scanY}
                x2="184"
                y2={scanY}
                stroke="#ef4444"
                strokeWidth="1"
                strokeOpacity="0.55"
              />
              <rect
                x="16"
                y={scanY - 7}
                width="168"
                height="14"
                fill="#ef4444"
                fillOpacity="0.07"
              />
            </>
          )}
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-[#0b0c0e]/40" />
      </div>

      <div className="relative z-10 flex items-start justify-between gap-2">
        <span className="text-xs font-mono text-gray-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10 font-medium">
          Imagine
        </span>
        <span className="text-right leading-[13px]">
          <span className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-red-300/90">
            <span
              className="inline-block w-1 h-1 rounded-full bg-red-500"
              style={{ opacity: settled ? 1 : 0.35 + (at / SWEEP) * 0.65 }}
            />
            {STAGES[stage]}
          </span>
          <span className="block text-[10px] font-mono text-gray-500 tabular-nums mt-0.5">
            {pts.toLocaleString()} / 1,024 pts
          </span>
        </span>
      </div>
    </>
  );
};

/* ------------------------------------------------------------ acoustic */

const PHRASE = [
  "route",
  "this",
  "call",
  "to",
  "the",
  "on-call",
  "agent",
  "and",
  "open",
  "a",
  "priority",
  "ticket",
];
const BARS = 30;
// Fixed per-bar weight: speech energy peaks through the mid band.
const BAND = Array.from({ length: BARS }, (_, i) =>
  Math.max(
    0.18,
    0.32 + 0.68 * Math.sin(Math.PI * Math.pow(i / (BARS - 1), 0.85))
  )
);
const FRAME_MS = 40; // one analysis frame
const GAP_MS = 80; // silence between words
const HOLD_MS = 1500; // how long the verdict sits before the next take

const AcousticEngine: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [bars, setBars] = React.useState<number[]>(() =>
    Array.from({ length: BARS }, () => 0)
  );
  const [said, setSaid] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (reduced) {
      setBars(BAND.map((b) => b * 0.5));
      setSaid(PHRASE.length);
      setDone(true);
      return;
    }

    // How long a word takes to say, from how much word there is.
    const span = (w: string) => 130 + w.length * 46;

    let wi = 0; // word being spoken
    let wt = 0; // ms into that word
    let rest = 0; // ms left on the verdict hold

    const id = window.setInterval(() => {
      let env = 0;

      if (wi < PHRASE.length) {
        const d = span(PHRASE[wi]);
        if (wt === 0) setSaid(wi + 1);
        wt += FRAME_MS;
        // A single breath of energy, rising and falling across the word.
        env = wt <= d ? Math.sin(Math.PI * (wt / d)) : 0;
        if (wt >= d + GAP_MS) {
          wi += 1;
          wt = 0;
          if (wi >= PHRASE.length) {
            setDone(true);
            rest = HOLD_MS;
          }
        }
      } else {
        rest -= FRAME_MS;
        if (rest <= 0) {
          wi = 0;
          wt = 0;
          setSaid(0);
          setDone(false);
        }
      }

      setBars((prev) =>
        prev.map((v, i) => {
          const target = env
            ? Math.min(1, env * BAND[i] * (0.5 + Math.random() * 0.7))
            : Math.random() * 0.05;
          // Ease toward the target so the bars settle instead of snapping.
          return v + (target - v) * 0.5;
        })
      );
    }, FRAME_MS);

    return () => window.clearInterval(id);
  }, [reduced]);

  const rms = Math.sqrt(
    bars.reduce((a, b) => a + b * b, 0) / BARS
  );
  const db = Math.round(-52 + rms * 50);

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-2.5 relative">
      <div className="relative w-14 h-14 shrink-0">
        <div
          className="absolute inset-0 rounded-full border border-white/40"
          style={{
            transform: `scale(${1 + rms * 0.75})`,
            opacity: Math.max(0, 0.45 - rms * 0.4),
          }}
        />
        <div
          className="w-full h-full rounded-full bg-gradient-to-tr from-zinc-700 via-zinc-400 to-white p-0.5 shadow-xl"
          style={{ transform: `scale(${1 + rms * 0.16})` }}
        >
          <div className="w-full h-full rounded-full bg-[#0a0a0d] flex items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/25 via-zinc-500/10 to-transparent blur-sm"
              style={{ opacity: 0.3 + rms * 0.7 }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full bg-white shadow-lg shadow-white/50"
              style={{ transform: `scale(${1 + rms * 0.5})` }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 absolute top-3 left-4" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 absolute bottom-4 right-4" />
          </div>
        </div>
      </div>

      <div className="flex items-end justify-center gap-[2px] h-[30px] w-full shrink-0">
        {bars.map((v, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-zinc-600 to-white"
            style={{
              height: `${3 + v * 27}px`,
              opacity: 0.28 + v * 0.72,
            }}
          />
        ))}
      </div>

      <div
        className="w-full h-[14px] overflow-hidden flex justify-end items-center whitespace-nowrap text-[11px] font-mono shrink-0"
        style={{ maskImage: CAPTION_MASK, WebkitMaskImage: CAPTION_MASK }}
      >
        {said === 0 ? (
          <span className="text-gray-600 w-full text-center">listening…</span>
        ) : (
          PHRASE.slice(0, said).map((w, i) => (
            <span
              key={i}
              className={
                i === said - 1 && !done
                  ? "text-white ml-1"
                  : "text-gray-500 ml-1"
              }
            >
              {w}
            </span>
          ))
        )}
      </div>

      <span className="relative z-10 text-[10px] font-mono px-2.5 py-0.5 rounded-full w-fit backdrop-blur-xs border font-medium shrink-0 whitespace-nowrap bg-white/10 border-white/10 text-gray-300">
        {done ? (
          <>
            <span className="text-emerald-400">&#10003;</span> escalate_ticket
            &middot; 0.98
          </>
        ) : (
          <>
            Voice Engine <span className="text-gray-500">&middot;</span>{" "}
            <span className="tabular-nums text-gray-400">{db} dB</span>
          </>
        )}
      </span>
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
            <span>intelligence.</span>
          </span>
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
            to="/login"
            className="h-11 px-6 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-normal hover:opacity-90 transition-all flex items-center gap-1.5 shadow-xs select-none"
          >
            <span>Get API Access</span>
            <span className="text-xs font-normal">›</span>
          </Link>
          <Link
            to="/docs"
            className="h-11 px-6 border border-gray-300 dark:border-white/20 bg-white dark:bg-black text-gray-900 dark:text-white rounded-full text-xs font-normal hover:bg-gray-100 dark:hover:bg-white/10 transition-all flex items-center select-none"
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
        className="max-w-6xl mx-auto mt-14 space-y-4 md:space-y-5"
      >
        {/* Top Row: 2 Equal-Sized Premium Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* Equal Box 1: Neural Reasoning & Agentic Build */}
          <div className="bg-[#141414] rounded-2xl p-5 md:p-6 flex flex-col justify-between border border-white/10 shadow-md font-mono text-[11px] text-gray-300 overflow-hidden h-[240px] relative group hover:border-white/20 transition-all duration-300">
            <AgentSession />
            <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/10 pt-2.5 font-sans font-medium">
              <span className="font-mono text-gray-300 font-semibold">Neural Reasoning &amp; Build</span>
              <Link to="/products" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                <span>Explore</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Equal Box 2: Autonomous Swarm Mesh */}
          <div className="bg-white dark:bg-[#0b0c0e] rounded-2xl p-5 md:p-6 flex flex-col border border-gray-200/80 dark:border-white/10 shadow-sm overflow-hidden h-[240px] relative group hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
            <SwarmChat />

            <div className="shrink-0 flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 pt-2.5 border-t border-gray-200/50 dark:border-white/10 font-sans">
              <span className="font-mono text-gray-600 dark:text-gray-300 font-semibold">Autonomous Swarm</span>
              <Link to="/platform" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
                <span>Explore</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Row: 3 Equal-Sized Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

        {/* Standalone Card 3: Imagine */}
        <div className="bg-[#0b0c0e] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-inner group hover:border-white/20 transition-all h-[240px]">
          <SpatialEngine />
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-gray-400 border-t border-white/10 pt-2 font-sans">
            <span>Spatial Engine</span>
            <Link to="/products" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              <span>Explore</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Standalone Card 4: Vision */}
        <div className="bg-[#f8f9fa] dark:bg-[#111114] rounded-2xl p-5 flex flex-col justify-between border border-gray-200/80 dark:border-white/10 shadow-sm h-[240px]">
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Multimodal Vision</span>
            <div className="space-y-2">
              <div className="bg-stone-200 dark:bg-stone-900 rounded-xl px-3.5 py-2.5 flex items-center justify-between border border-stone-300/50 dark:border-stone-800">
                <span className="font-serif italic text-xs text-stone-800 dark:text-stone-200 font-bold">La Belle Vie</span>
              </div>
              <div className="bg-white dark:bg-stone-950 rounded-xl px-3.5 py-2.5 flex items-center justify-between border border-gray-200 dark:border-stone-800 shadow-2xs">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Superlight Pro</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200/50 dark:border-white/5 font-sans">
            <span>Vision Gallery</span>
            <Link to="/products" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
              <span>Explore</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Standalone Card 5: Voice */}
        <div className="bg-[#0b0c0e] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-inner h-[240px]">
          <AcousticEngine />
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-gray-400 border-t border-white/10 pt-2 font-sans">
            <span>Acoustic Neural</span>
            <Link to="/products" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              <span>Explore</span>
              <span>→</span>
            </Link>
          </div>
        </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

