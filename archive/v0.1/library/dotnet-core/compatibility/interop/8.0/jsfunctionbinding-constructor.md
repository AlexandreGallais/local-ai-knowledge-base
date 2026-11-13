---
title: "Breaking change: JSFunctionBinding implicit public default constructor removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/interop/8.0/jsfunctionbinding-constructor.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# JSFunctionBinding implicit public default constructor removed

The implicit public default constructor for `System.Runtime.InteropServices.JavaScript.JSFunctionBinding` has been removed.

## Previous behavior

Previously, you could create empty instances of `System.Runtime.InteropServices.JavaScript.JSFunctionBinding`.

## New behavior

Starting in .NET 8, you can't instantiate a `System.Runtime.InteropServices.JavaScript.JSFunctionBinding` object.

## Version introduced

.NET 8

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

The constructor was not intended to be public; this change fixes the mistake.

## Recommended action

N/A

## Affected APIs

- `System.Runtime.InteropServices.JavaScript.JSFunctionBinding.#ctor`
