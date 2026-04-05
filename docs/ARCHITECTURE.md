# Architecture Overview: Claude Code (v2.1.88)

This document provides a technical breakdown of the internal architecture of Claude Code, as discovered through source code analysis of the CLI bundle.

## 1. CLI Orchestration & Boot Sequence
**Core Files**: `main.tsx`, `entrypoints/cli.tsx`

The application starts by initializing the environment, parsing command-line flags, and setting up telemetry (`Statsig`, `GrowthBook`). It then launches either the `REPL` (interactive) or the `Headless` mode.

### Heartbeat System
A background heartbeat ensures the CLI remains responsive and gracefully handles crashes or hangs. This is orchestrated through a "Bridge" system in `src/bridge/`.

## 2. The Agent & Task State Machine
**Core Files**: `src/tasks/LocalAgentTask/`

The main agent operates as a loop:
1.  **Thinking**: Analyzes context and user requirements.
2.  **Tool Selection**: Chooses from built-in tools (Bash, Read, Edit) or MCP-provided tools.
3.  **Execution**: Calls the tools and processes results.
4.  **Feedback**: Reports progress to the user and awaits further input if needed.

## 3. Model Context Protocol (MCP) Integration
**Core Files**: `src/services/mcp/`

Claude Code acts as an MCP client. It dynamically discovers tools from configured MCP servers (defined in `~/.claude.json`).
- **Dynamic Schemas**: Tools are injected into the system prompt at runtime.
- **Permission Mapping**: Every tool usage is gated by the permission system, which evaluates security risk in "Auto Mode" vs manual mode.

## 4. Systems Prompting
**Core Files**: `src/constants/prompts.ts`

The system prompt is segmented into:
- **Identity**: Defines the brand, persona, and tone of Claude.
- **Formatting**: Strict guidelines on how to output thinking and tool blocks.
- **Dynamic Context**: Injects the current working directory, git state, and environment-specific constraints.
- **Cyber-Risk Guidelines**: Specific blockers to prevent generating harmful content or insecure bash scripts.

## 5. Context Management (Compaction)
**Core Files**: `src/services/compact/`

To maintain performance, Claude uses a "Compaction" process to summarize and reduce context when token limits are reached. 
This process involves a specialized "Summarizer Agent" that identifies:
- Key decisions and code changes.
- Current active tasks.
- Unresolved issues.
The summary is then injected back into the prompt while older, detailed history is archived to disk.

---

*This document is part of the [Claude Code Internals](https://github.com/clevervi/claude-code-internals) project.*
