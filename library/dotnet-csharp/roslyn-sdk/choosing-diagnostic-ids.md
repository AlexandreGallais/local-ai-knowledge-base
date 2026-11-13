---
title: "Choosing diagnostic IDs"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/roslyn-sdk/choosing-diagnostic-ids.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Choose diagnostic IDs

A diagnostic ID is the string associated with a given diagnostic, such as a
compiler error or a diagnostic that is produced by an analyzer.

The IDs are surfaced from various APIs, such as:

* `Microsoft.CodeAnalysis.DiagnosticDescriptor.Id`
* `System.ObsoleteAttribute.DiagnosticId`
* `System.Diagnostics.CodeAnalysis.ExperimentalAttribute.DiagnosticId`

Diagnostic IDs are also used as identifiers in source, for example, from
[#pragma warning disable] or [.editorconfig] files.

## Considerations

* Diagnostic IDs should be unique
* Diagnostic IDs must be legal identifiers in C#
* Diagnostic IDs should be less than 15 characters long
* Diagnostic IDs should be of the form `<PREFIX><number>`
  - The prefix is specific to your project
  - The number represents the specific diagnostic

> **Note:**
> It's a source breaking change to change diagnostic IDs, as existing
> suppressions would be ignored if the ID changed.

Don't limit your prefix to two-characters (such as `CSXXX`and `CAXXXX`).
Instead, use a longer prefix to avoid conflicts. For example, the `System.*`
diagnostics use `SYSLIB` as their prefix.
