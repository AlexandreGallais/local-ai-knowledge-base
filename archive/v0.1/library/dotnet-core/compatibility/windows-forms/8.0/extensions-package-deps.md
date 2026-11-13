---
title: "Breaking change: System.Windows.Extensions doesn't reference System.Drawing.Common"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/windows-forms/8.0/extensions-package-deps.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# System.Windows.Extensions doesn't reference System.Drawing.Common

The System.Windows.Extensions package no longer references the System.Drawing.Common package.

## Version introduced

.NET 8 Preview 7

## Previous behavior

Previously, the System.Windows.Extensions package referenced the System.Drawing.Common package.

## New behavior

Starting in .NET 8, the System.Windows.Extensions package no longer references the System.Drawing.Common package. If you depended on the System.Windows.Extensions package bringing in System.Drawing.Common, you might see a compilation error similar to this (but not necessarily for `System.Drawing.FontConverter`):

> **error CS1069: The type name '<example-value>' could not be found in the namespace '<example-value>'. This type has been forwarded to assembly '<example-value>' Consider adding a reference to that assembly.**

## Change category

This change can affect *source compatibility*.

## Reason for change

This change avoids a dependency on System.Drawing.Common when System.Windows.Extensions is referenced.

This change helps more components remove a dependency on System.Drawing.Common unless they actually need it. For more information, see dotnet/msbuild issue 8962.

## Recommended action

If you still need to use System.Drawing.Common, add a direct reference.

## Affected APIs

N/A
