# Claude Code Internals (v2.1.88)

![Build State](https://img.shields.io/badge/Research-Production--Ready-blue)
![Claude Version](https://img.shields.io/badge/Claude--Code-v2.1.88-orange)
![Security Status](https://img.shields.io/badge/Status-Hardened-green)

A deep-dive research repository into the **architecture, prompts, and internal mechanics** of Anthropic's Claude Code agentic CLI.

This project contains deobfuscated and organized source code (extracted from `@anthropic-ai/claude-code@2.1.88`), along with technical reports and security refinements developed to harden the agent's internal parser logic.

---

## 🚀 Mission

The goal of this project is to provide a comprehensive reference for researchers and developers building high-quality agentic coding tools. We have analyzed the "Gold Standard" implementation and applied critical refinements to its internal robustness.

- **[Architecture Deep-Dive](docs/ARCHITECTURE.md)**: Analysis of the CLI orchestrator, heartbeats, and state machine.
- **[Security & Gating](docs/SECURITY.md)**: Review of the "Auto Mode" YOLO classifier and tool permissions.
- **[Context Management](src/services/compact/)**: Studying the "Compaction" (Summarization) logic used for huge repositories.

---

## 📁 Repository Structure

- **`src/`**: Reorganized and deobfuscated source tree for developer readability.
- **`docs/`**: Technical reports on the project architecture and security reviews.
- **`tests/`**: Standalone test suites for validating core parser refinements.
- **`scripts/`**: Operational tools including the original extraction logic.

---

## 🛠️ Critical Hardening Applied

As part of this research, the following logic refinements have been integrated into the `src/` tree:

### 1. Robust YOLO Permission Gate
We optimized the `yoloClassifier.ts` to prevent "unparseable decision" errors. The new logic handles non-greedy XML extraction and case-insensitivity, ensuring that security defaults (Deny-by-Default) are only triggered for genuine risks, not malformed model output.
- **Test**: `npm run test:yolo`

### 2. Context Compaction Refinement
The `prompt.ts` parser in the compaction service was hardened to correctly strip `<analysis>` scratchpads and extract summaries even from truncated or chatty model responses.
- **Test**: `npm run test:compact`

---

## 🏁 Getting Started

### Prerequisites
- Node.js >= 18
- Bun (Optional: for high-speed test execution)

### Installation
```bash
npm install
```

### Running Verification Tests
Ensure the hardened parsers are operating correctly in your environment:
```bash
npm test
```

---

## 🤝 Contributing
Please see **[CONTRIBUTING.md](CONTRIBUTING.md)** for guidelines on how to submit research findings or feature analysis.

---

*Disclaimer: This is an unofficial research project intended strictly for educational and security-research purposes. Claude Code is a trademark of Anthropic PBC. All content in `src/` is derived from publicly available npm bundles.*
