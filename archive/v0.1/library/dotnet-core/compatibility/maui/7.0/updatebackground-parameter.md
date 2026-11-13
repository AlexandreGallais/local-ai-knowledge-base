---
title: "Breaking change: Optional parameter on UpdateBackground"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/maui/7.0/updatebackground-parameter.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# New UpdateBackground parameter

When updating the button background on iOS, the border was also required to be drawn. This change adds a new parameter to `ViewExtensions.UpdateBackground()` to pass in the stroke information.

## Version introduced

.NET 7

## Previous behavior

Previously there was no way to draw the border on buttons if there was a gradient or complex background.

## New behavior

The new, optional parameter now allows for additional border information.

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

We need more information when drawing the button background or border, so we added a new parameter to pass this information.

## Recommended action

No action is required if you're calling from source. Otherwise, multi-target to support `net6.0-ios` or `net6.0-maccatalyst`.

## Affected APIs

- `Microsoft.Maui.Platform.ViewExtensions.UpdateBackground(UIKit.UIView,Microsoft.Maui.Graphics.Paint)`
