---
title: ".NET API changes that affect compatibility (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/library-change-rules.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Change rules for compatibility

Throughout its history, .NET has attempted to maintain a high level of compatibility from version to version and across implementations of .NET. Although .NET 5 (and .NET Core) and later versions can be considered as a new technology compared to .NET Framework, two major factors limit the ability of this implementation of .NET to diverge from .NET Framework:

- A large number of developers either originally developed or continue to develop .NET Framework applications. They expect consistent behavior across .NET implementations.
- .NET Standard library projects allow developers to create libraries that target common APIs shared by .NET Framework and .NET 5 (and .NET Core) and later versions. Developers expect that a library used in a .NET application should behave identically to the same library used in a .NET Framework application.

Along with compatibility across .NET implementations, developers expect a high level of compatibility across versions of a given implementation of .NET. In particular, code written for an earlier version of .NET Core should run seamlessly on .NET 5 or a later version. In fact, many developers expect that the new APIs found in newly released versions of .NET should also be compatible with the pre-release versions in which those APIs were introduced.

This article outlines changes that affect compatibility and the way in which the .NET team evaluates each type of change. Understanding how the .NET team approaches possible breaking changes is particularly helpful for developers who open pull requests that modify the behavior of existing .NET APIs.

The following sections describe the categories of changes made to .NET APIs and their impact on application compatibility. Changes are either allowed (✔️), disallowed (❌), or require judgment and an evaluation of how predictable, obvious, and consistent the previous behavior was (❓).

> **Note:**
>
> - In addition to serving as a guide to how changes to .NET libraries are evaluated, library developers can also use these criteria to evaluate changes to their libraries that target multiple .NET implementations and versions.
> - For information about the compatibility categories, for example, forward and backwards compatibility, see How code changes can affect compatibility.
