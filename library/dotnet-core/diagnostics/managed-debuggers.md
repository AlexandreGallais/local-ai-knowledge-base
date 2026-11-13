---
title: "Managed debuggers - .NET Core"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/managed-debuggers.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET Core managed debuggers

Debuggers allow programs to be paused or executed step-by-step. When paused, the current state of the process can be viewed. By stepping through key <example-value>, you gain understanding of your code and why it produces the result that it does.

Microsoft provides debuggers for managed code in **Visual Studio** and **Visual Studio Code**.

## Visual Studio managed debugger

**Visual Studio** is an integrated development environment with the most comprehensive debugger available. Visual Studio is an excellent choice for developers working on Windows.

- Tutorial - Debugging a .NET application
- Debug ASP.NET Core apps in Visual Studio

While Visual Studio is a Windows application, it can also be used to debug Linux apps running remotely, in WSL, or in Docker containers:

- Remotely debug a .NET Core app on Linux
- Debug a .NET Core app in WSL2
- Debug a .NET Core app in a Docker container

## Visual Studio Code managed debugger

**Visual Studio Code** is a lightweight cross-platform code editor. It uses the same .NET Core debugger implementation as Visual Studio, but with a simplified user interface.

- Tutorial - Debugging a .NET application
- Debugging in Visual Studio Code
