---
title: "Using Gordon via CLI"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/gordon/how-to/cli.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Using Gordon via CLI

The `docker ai` command provides a Terminal User Interface (TUI) for Gordon,
integrating AI assistance directly into your terminal.

## Basic usage

Launch the interactive TUI:

```console
$ docker ai
```

This opens Gordon's terminal interface where you can type prompts, approve
actions, and continue conversations with full context.

Pass a prompt directly as an argument:

```console
$ docker ai "list my running containers"
```

Exit the TUI with `/exit` or `Ctrl+C`.

## Working directory

The working directory sets the default context for Gordon's file operations.

Gordon uses your current shell directory as the working directory:

```console
$ cd ~/my-project
$ docker ai
```

Override with `-C` or `--working-dir`:

```console
$ docker ai -C ~/different-project
```

## Disabling Gordon

Gordon CLI is part of Docker Desktop. To disable it, disable Gordon in Docker
Desktop Settings:

1. Open Docker Desktop Settings.
2. Navigate to the **AI** section.
3. Clear the **Enable Gordon** option.
4. Select **Apply**.

## Commands

The `docker ai` command includes several subcommands:

Interactive mode (default):

```console
$ docker ai
```

Opens the TUI for conversational interaction.

Version:

```console
$ docker ai version
```

Displays the Gordon version.

Feedback:

```console
$ docker ai feedback
```

Opens a feedback form in your browser.
