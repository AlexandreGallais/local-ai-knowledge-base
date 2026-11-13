---
title: "Breaking change: CA2014: Do not use stackalloc in loops"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/code-analysis/5.0/ca2014-stackalloc-in-loops.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Warning CA2014: Do not use stackalloc in loops

.NET code analyzer rule CA2014 is enabled, by default, starting in .NET 5. It produces a build warning for any C# code where a stackalloc expression is used inside a loop.

## Change description

Starting in .NET 5, the .NET SDK includes .NET source code analyzers. Several of these rules are enabled, by default, including CA2014. If your project contains code that violates this rule and is configured to treat warnings as errors, this change could break your build.

Rule CA2014 looks for C# code where a stackalloc expression is used inside a loop. stackalloc allocates memory from the current stack frame. The memory isn't released until the current method call returns, which can lead to stack overflows. Because you can't catch stack overflow exceptions, the app will terminate in case of stack overflow.

## Version introduced

5.0

## Recommended action

- Avoid using stackalloc inside loops. Allocate the memory block outside the loop and reuse it inside the loop. For more information, see CA2014.

- To disable code analysis completely, set `EnableNETAnalyzers` to `false` in your project file. For more information, see EnableNETAnalyzers.

## Affected APIs

Not detectable via API analysis.
