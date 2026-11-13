---
title: "Breaking change: ExceptionCollection constructor throws ArgumentException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/windows-forms/8.0/exceptioncollection.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ExceptionCollection ctor throws ArgumentException

The `System.ComponentModel.Design.ExceptionCollection` constructor now throws an `System.ArgumentException` if the elements in the input array are not of type `System.Exception`.

## Version introduced

.NET 8 Preview 1

## Previous behavior

Previously, the `System.ComponentModel.Design.ExceptionCollection` constructor did not check the type passed in, which could delay failure until later in the process. No exceptions were thrown during object creation.

## New behavior

Starting in .NET 8, if the elements in the input array are not of type `System.Exception`, an `System.ArgumentException` is thrown.

## Change category

This change is a *behavioral change*.

## Reason for change

This change helps to make exception types consistent across the code base.

## Recommended action

For most scenarios, this change should not have a significant impact. However, consider updating your code to handle `System.ArgumentException` at constructor call sites.

## Affected APIs

- `System.ComponentModel.Design.ExceptionCollection.#ctor(System.Collections.ArrayList)` constructor
