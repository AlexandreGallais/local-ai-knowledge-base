---
title: "Breaking change: ImageList.ColorDepth default is Depth32Bit"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/8.0/imagelist-colordepth.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ImageList.ColorDepth default is Depth32Bit

The default value for `System.Windows.Forms.ImageList.ColorDepth` has changed over time. Starting in .NET 8, the default value has changed from `System.Windows.Forms.ColorDepth.Depth8Bit` to `System.Windows.Forms.ColorDepth.Depth32Bit`. This change affects both new and existing applications if they're upgraded to target .NET 8.

## Version introduced

.NET 8 Preview 1

## Previous behavior

The default value for `System.Windows.Forms.ImageList.ColorDepth` was `System.Windows.Forms.ColorDepth.Depth8Bit`.

## New behavior

If you haven't explicitly set `System.Windows.Forms.ImageList.ColorDepth` for an image list, the color depth will automatically be reset to `System.Windows.Forms.ColorDepth.Depth32Bit`. This could increase your app's memory usage.

## Change category

This change is a *behavioral change*.

## Reason for change

The default value was changed to improve image quality.

## Recommended action

If you want to continue using the previous color depth, explicitly set `System.Windows.Forms.ImageList.ColorDepth` to `System.Windows.Forms.ColorDepth.Depth8Bit`.

## Affected APIs

- `System.Windows.Forms.ImageList.ColorDepth`
