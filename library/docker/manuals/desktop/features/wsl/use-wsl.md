---
title: "Develop with Docker Desktop using WSL 2 on Windows"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/features/wsl/use-wsl.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Develop with Docker Desktop using WSL 2 on Windows

The following section describes how to start developing your applications using Docker and WSL 2.

For the best development experience, store your code inside your default Linux distribution. After you have turned on the WSL 2 feature on Docker Desktop, you can start working with your code inside the Linux distribution and ideally with your IDE still in Windows. This workflow is straightforward if you are using VS Code.

## Develop with Docker and WSL 2

Before you begin, make sure you have enabled WSL 2 integration in Docker Desktop under **Settings** > **Resources** > **WSL Integration**.

1. Open VS Code and install the WSL extension. This extension lets you work with a remote server in the Linux distribution and your IDE client still on Windows.
2. Open your terminal and type:

    ```console
    $ wsl
    ```
3. Navigate to your project directory and then type:

    ```console
    $ code .
    ```

    This opens a new VS Code window connected remotely to your default Linux distribution which you can check in the bottom corner of the screen.

Alternatively, you can open your default Linux distribution from the **Start** menu, navigate to your project directory, and then run `code .`
