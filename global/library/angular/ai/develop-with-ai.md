---
title: "LLM prompts and AI IDE setup"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/ai/develop-with-ai.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# LLM prompts and AI IDE setup

Generating code with large language models (LLMs) is a rapidly growing area of interest for developers. While LLMs are often capable of generating working code it can be a challenge to generate code for consistently evolving frameworks like Angular.

Advanced instructions and prompting are an emerging standard for supporting modern code generation with domain specific details. This section contains curated content and resources to support more accurate code generation for Angular and LLMs.

## Custom Prompts and System Instructions

Improve your experience generating code with LLMs by using one of the following custom, domain specific files.

NOTE: These files will be updated on a regular basis staying up to date with Angular's conventions.

Here is a set of instructions to help LLMs generate correct code that follows Angular best practices. This file can be included as system instructions to your AI tooling or included along with your prompt as context.

_Code sample not included: /packages/core/resources/best-practices.md._

Click here to download the best-practices.md file.

## Rules Files

Several tools, such as Antigravity have rules files useful for providing critical context to LLMs.

| Environment/IDE      | Rules File                                                                                                             | Installation Instructions                                                                                                                                       |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Antigravity          | GEMINI.md                                             | Configure `GEMINI.md`                                                             |
| Copilot powered IDEs | copilot-instructions.md | Configure `.github/copilot-instructions.md` |
| Cursor               | cursor.md                                        | Configure `cursorrules.md`                                                                  |
| JetBrains IDEs       | AGENTS.md                                             | Configure `AGENTS.md`              |
| VS Code              | .instructions.md               | Configure `.instructions.md`                |
| Windsurf             | guidelines.md                                     | Configure `guidelines.md`                                               |

## Angular CLI MCP Server setup

The Angular CLI includes an experimental Model Context Protocol (MCP) server that allows AI assistants in your development environment to interact with the Angular CLI.

**Learn how to set up the Angular CLI MCP Server**

## Providing Context with `llms.txt`

`llms.txt` is a proposed standard for websites designed to help LLMs better understand and process their content. The Angular team has developed two versions of this file to help LLMs and tools that use LLMs for code generation to create better modern Angular code.

- llms.txt - an index file providing links to key files and resources.
- llms-full.txt - a more robust compiled set of resources describing how Angular works and how to build Angular applications.

Be sure to check out the overview page for more information on how to integrate AI into your Angular applications.
