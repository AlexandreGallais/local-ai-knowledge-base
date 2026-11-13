---
title: "Breaking change: ScrollToRequest property renamed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/maui/7.0/scrolltorequest-property-rename.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ScrollToRequest property renamed

The `ScrollToRequest.HoriztonalOffset` property has been renamed to `HorizontalOffset`.

## Version introduced

.NET 7

## Previous behavior

The property name was misspelled.

## New behavior

The property name and a corresponding constructor parameter name have been changed to correct a typo.

## Type of breaking change

This change can affect binary compatibility and source compatibility.

## Reason for change

There was a typo in the property name. Renaming a C# record requires a fair amount of work and this API is both new and rarely used by developers.

## Recommended action

If you don't have a custom command mapper for `RequestScrollTo` in the `Microsoft.Maui.Handlers.ScrollViewHandler` handler, then no action is needed. Otherwise, update your code to use the new spelling.

## Affected APIs

- `Microsoft.Maui.ScrollToRequest.HorizontalOffset` property
- `ScrollToRequest(double,double,bool)` constructor
