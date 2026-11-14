---
title: "Tutorial: Pattern matching basics (part 1 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/tutorials/pattern-matching-basics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tutorial: Pattern matching basics

> **Tip:**
> **New to developing software?** Start with the Get started tutorials first. They introduce classes, methods, and control flow.
>
> **Experienced in another language?** This tutorial shows how C# patterns can express object behavior clearly when rules depend on the current state of an object.

In this tutorial, you build a console app that models the rules for a canal lock.

A canal lock raises or lowers boats between two stretches of water at different heights. It has two gates and a chamber whose water level changes between a low setting and a high setting. The lock can operate safely only when the water level and gate positions stay in valid combinations.

In this tutorial, you learn how to:

>
> - Express object behavior by matching on state.
> - Implement those rules with C# pattern matching.
> - Use compiler diagnostics to validate your implementation.

## Prerequisites

- The latest .NET SDK
- Visual Studio Code editor
- The C# DevKit

### Installation instructions

On Windows, this WinGet configuration file to install all prerequisites. If you already have something installed, WinGet will skip that step.

1. Download the file and double-click to run it.
1. Read the license agreement, type `y`, and select `Enter` when prompted to accept.
1. If you get a flashing User Account Control (UAC) prompt in your Taskbar, allow the installation to continue.

On other platforms, you need to install each of these components separately.

1. Download the recommended installer from the .NET SDK download page and double-click to run it. The download page detects your platform and recommends the latest installer for your platform.
1. Download the latest installer from the Visual Studio Code home page and double click to run it. That page also detects your platform and the link should be correct for your system.
1. Click the "Install" button on the C# DevKit extension page. That opens Visual Studio code, and asks if you want to install or enable the extension. Select "install".

## Build a simulation of a canal lock

A canal lock raises and lowers boats between waterways at different levels. In this tutorial, the simulated lock has a lower gate, an upper gate, and water that can be either low or high.

In normal operation, a boat enters when the water level inside the lock matches the level on the entry side. Once the boat is inside, both gates close. The water level changes to match the exit side, and then the exit gate opens. To keep the model safe, the water level can change only when both gates are closed, and a gate can open only when the water level matches that side.

You can model those rules with a `CanalLock` class. It exposes commands to open or close either gate and to raise or lower the water. It also exposes properties that report the current state of the lock.
