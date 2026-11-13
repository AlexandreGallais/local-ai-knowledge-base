---
title: "prerequisites-ref-docs"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/contribute/generate-ref-docs/prerequisites-ref-docs.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# prerequisites-ref-docs

### Requirements:

- You need a machine that is running Linux or macOS. On Windows, use
  Windows Subsystem for Linux (WSL),
  since the build tooling relies on `make` and Bash scripts.

- You need to have these tools installed:

  - Git
  - Go, any recent release (Go downloads the exact toolchain a generator needs automatically)
  - make
  - gcc compiler/linker
  - Docker (required only for the local website preview with `make container-serve`)

- You need to know how to create a pull request to a GitHub repository.
  This involves creating your own fork of the repository. For more
  information, see Work from a local clone.
