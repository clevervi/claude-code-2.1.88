# Security Gate Review: YOLO (Auto Mode) Classifier

This document explores the internal security model of Claude Code and how high-risk tool calls are gated in "Auto Mode."

## 1. The YOLO Classifier (v2.1.88)
**Core Files**: `src/utils/permissions/yoloClassifier.ts`

The YOLO Classifier is a specialized, fast-response model prompt designed to approve or deny tool calls that are $NOT$ explicitly safe.

### Two-Stage Permissions Pipeline

1.  **Stage 1 (XML Prompt)**: A fast, 64-token max_tokens call to a Sonnet-3.5 or Haiku-3.5 variant. It receives the tool name, arguments, and the "Preamble" (intent). It responds with `<block>yes</block>` or `<block>no</block>`.
2.  **Stage 2 (Thinking Phase)**: If Stage 1 is uncertain or a potential violation is detected, the agent transitions to a "Thinking" phase where a more advanced model evaluates the security risk in depth.

## 2. High-Risk Tool Mapping

Tool calls are projected into "intent" summaries before reaching the classifier. High-risk tools include:
- `BashTool`: Execution of shell commands.
- `FileWriteTool`: Overwriting local files.
- `FileEditTool`: Precise modifications using lints/grep.
- `MCP Tools`: Third-party tools that might have outbound network access.

### Permissions Tiers
- **Safe**: Reading files, listing directories. Usually auto-approved without classifier intervention.
- **Risk 1 (Moderate)**: Editing existing project files.
- **Risk 2 (High)**: Shell commands that might affect system state (e.g., `apt install`, `git push --force`).

## 3. Our Robustness Improvements

Initial analysis showed that the YOLO parser often failed if the model provided "chatty" responses (preambles) or if the output was truncated. We have replaced the strict regex with a **Robust Regex** that handles:
- Missing closing tags.
- Case-insensitivity.
- Optional whitespace.

```typescript
// Optimized regex for decision extraction
const DECISION_REGEX = /<block>\s*(yes|no)\b[\s\S]*?(?:<\/block>|$)/gi;
```

This change prevents the user from seeing "Unparseable decision" errors while maintaining the strict "Deny-by-default" security boundary.

## 4. Sandbox vs. Native Execution

Claude Code runs natively on your machine by default. Its only real "sandbox" is the YOLO classifier gate. As a result, the reliability of this classifier is the single most important factor for terminal-level security.

---

*This document is part of the [Claude Code Internals](https://github.com/clevervi/claude-code-internals) project.*
