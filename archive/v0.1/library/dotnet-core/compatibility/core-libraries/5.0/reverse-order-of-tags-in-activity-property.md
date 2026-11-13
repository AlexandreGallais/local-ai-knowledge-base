---
title: "Breaking change: Order of tags in Activity.Tags is reversed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/reverse-order-of-tags-in-activity-property.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Order of tags in Activity.Tags is reversed

`System.Diagnostics.Activity.Tags` now stores items in the list according to the order they're added. That is, the first item that's added is first in the list. This change was made to match the OpenTelemetry Attributes specification.

## Change description

In previous .NET versions, `System.Diagnostics.Activity.Tags` stores items in the reverse order from which they're added. That is, the first item added is last in the list. Starting in .NET 5, the order of the items is reversed, and the first item added is always first in the list.

## Version introduced

5.0

## Recommended action

If your app has a dependency on the `System.Diagnostics.Activity.Tags` list order and you're upgrading to .NET 5 or later, you'll need to change this part of your code.

## Affected APIs

- `System.Diagnostics.Activity.Tags`
