---
title: "Breaking change: JSFunctionBinding implicit public default constructor removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/interop/8.0/jsfunctionbinding-constructor.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
