# Contributing to Claude Code Internals

Thank you for your interest in helping us understand the inner workings of Claude Code! This project is a research-first repository aimed at documenting the state-of-the-art in agentic coding.

---

## 🔬 What We Are Looking For

We prioritize contributions that fall into the following categories:

1.  **Architecture Analysis**: Deeper documentation of services like `Loom`, `Statsig`, and the `Vite` dev-server orchestration.
2.  **Prompt Engineering**: Discovery and documentation of system prompts and template variables found in the binary.
3.  **Hardening & Security**: Fixes for fragile parsing logic or improvements to the permission gating system.
4.  **Feature Reverse-Engineering**: Analysis of new features or experiments (e.g., `Context Compaction`, `Network` tool).

---

## 🛠️ Development Workflow

1.  **Fork** the repository and create your feature branch.
2.  **Verify** any logic changes with the existing test suite:
    ```bash
    npm test
    ```
3.  **Document** your findings! If you uncover a new service, please add a report to the `docs/` directory.
4.  **Submit** a pull request with a clear description of your research goal.

---

## 📜 Code of Conduct

As a research project, we value **clarity, accuracy, and professional ethics**.

-   Maintain a focus on technical analysis.
-   Be respectful and collaborative in discussions.
-   Ensure all deobfuscated code remains clearly marked as research-derived.

---

## ⚖️ Licensing & Legal

This repository is strictly for educational and security-research purposes. By contributing, you agree that your work will be licensed under the same terms as the rest of the repository.

*Note: Please do not submit proprietary or leaked source code from Anthropic. This project only accepts analysis of the publicly distributed npm packages.*
