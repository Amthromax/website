/* The four commitments on the Trust page, and the long-form detail each one
   opens into. Shared so the summary and the detail page can never drift apart. */

export interface Commitment {
  slug: string;
  n: string;
  title: string;
  /* One-line summary, used on the Trust page row. */
  body: string;
  /* Detail page content. */
  lede: string;
  whatItMeans: string[];
  howItIsEnforced: { term: string; desc: string }[];
  limits: string;
  verify: { label: string; to: string }[];
}

export const COMMITMENTS: Commitment[] = [
  {
    slug: "no-training-on-your-data",
    n: "01",
    title: "We will not train on your data",
    body: "Not by default, not under a setting buried in an admin panel, and not for a model that is later served to someone else. Opting in requires a written agreement, and the default is off.",
    lede: "Customer prompts, documents, embeddings and tool outputs do not enter any training corpus. This is the default state of every account, not a setting you have to find and switch off.",
    whatItMeans: [
      "No prompt, completion, uploaded document or tool result is used to train a foundation model.",
      "Derived artefacts count as your data too: embeddings, summaries and extracted structure inherit the same rule.",
      "Switching this on is a written contractual change, not a toggle an administrator can flip by accident.",
      "A model trained for you under such an agreement is never served to another tenant.",
    ],
    howItIsEnforced: [
      { term: "Separation", desc: "Inference traffic and training pipelines read from different stores. There is no path that promotes a request log into a training set." },
      { term: "Retention", desc: "Request bodies live only as long as the retention window you configure, after which they and their derived indexes are deleted." },
      { term: "Audit", desc: "Any access to tenant data by an operator is written to the attestation ledger as its own event." },
    ],
    limits: "Aggregate operational telemetry — request counts, latencies, error rates — is collected to run the service. It contains no prompt or document content, and it is not training data.",
    verify: [
      { label: "Data Processing Addendum", to: "/data-protection" },
      { label: "Security posture", to: "/security" },
    ],
  },
  {
    slug: "no-silent-region-failover",
    n: "02",
    title: "We will not move your data to another region quietly",
    body: "If a region is degraded, the request fails rather than failing over somewhere you did not choose. Availability is never traded against residency without you asking for it.",
    lede: "Residency is a hard boundary, not a preference the scheduler may override when a region is under pressure. If your region cannot serve a request, the request returns an error.",
    whatItMeans: [
      "Processing and storage stay in the region you selected, including retries and queued work.",
      "A degraded region produces a visible failure rather than silent relocation.",
      "Multi-region operation is something you opt into and configure, naming each region explicitly.",
      "Backups and snapshots inherit the residency of the data they came from.",
    ],
    howItIsEnforced: [
      { term: "Pinning", desc: "Tenant records carry their region, and the scheduler refuses to place work outside it." },
      { term: "Egress policy", desc: "Cross-region destinations that were not declared for the tenant are blocked at the egress check." },
      { term: "Evidence", desc: "Every placement decision, including refusals, is recorded with its region in the ledger." },
    ],
    limits: "Control-plane metadata such as account identifiers and billing records is global by necessity. It is separated from tenant payloads and documented in the DPA.",
    verify: [
      { label: "Request path and egress checks", to: "/security" },
      { label: "Privacy centre", to: "/privacy-center" },
    ],
  },
  {
    slug: "no-silent-operator-access",
    n: "03",
    title: "We will not grant ourselves silent access",
    body: "Support cannot read a tenant's data without the access being recorded as an event in the same ledger you read. There is no operator path that bypasses the log.",
    lede: "Engineers and support staff sometimes need to look at a tenant's data to resolve an incident. The commitment is not that this never happens — it is that it can never happen unobserved.",
    whatItMeans: [
      "Operator reads are authenticated, scoped and time-bound rather than standing access.",
      "Each read writes an entry to the append-only ledger naming the operator, the scope and the reason.",
      "There is no administrative bypass, break-glass path or debug mode that skips the log.",
      "You can read those entries in the same audit stream as everything else.",
    ],
    howItIsEnforced: [
      { term: "Enforcement point", desc: "Operator tooling reaches tenant data through the same policy gateway as customer traffic, with no privileged side door." },
      { term: "Append-only", desc: "The ledger accepts writes and verification reads. Entries cannot be edited or deleted, including by us." },
      { term: "Expiry", desc: "Elevated scopes expire automatically rather than relying on someone remembering to revoke them." },
    ],
    limits: "Infrastructure staff can see that encrypted storage volumes exist and how large they are. They cannot read their contents, and volume-level operations are logged.",
    verify: [
      { label: "Attestation ledger", to: "/trust" },
      { label: "Security posture", to: "/security" },
    ],
  },
  {
    slug: "no-limitation-as-feature",
    n: "04",
    title: "We will not describe a limitation as a feature",
    body: "Where a control is partial, scoped to certain plans, or still being rolled out, the documentation says so. A trust page that only lists strengths is not a trust page.",
    lede: "Security documentation is useful in proportion to how willing it is to state what is missing. Where something is incomplete, scoped or planned, we label it rather than writing around it.",
    whatItMeans: [
      "Controls that depend on a particular plan or deployment mode say which one.",
      "Features still being rolled out are marked as such rather than written in the present tense.",
      "Known limitations and edge failure cases are published alongside capabilities.",
      "Incident post-mortems include what went wrong, not only what was fixed.",
    ],
    howItIsEnforced: [
      { term: "Review", desc: "Security and compliance claims are reviewed before publication by the team that owns the control, not only by the team writing the page." },
      { term: "Disclosure", desc: "A responsible disclosure programme gives researchers a route to report what our own review missed." },
      { term: "Correction", desc: "When a published claim turns out to be wrong, the page is corrected and the change is noted rather than quietly edited." },
    ],
    limits: "This commitment is about honesty of description, not a guarantee of completeness. Some controls are scoped to enterprise agreements, and those scopes are stated where the control is described.",
    verify: [
      { label: "Open research and disclosure", to: "/research" },
      { label: "Compliance documentation", to: "/privacy-center" },
    ],
  },
];
