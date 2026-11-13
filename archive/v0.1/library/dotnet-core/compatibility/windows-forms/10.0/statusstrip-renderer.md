---
title: "Breaking change: System.Windows.Forms.StatusStrip uses System RenderMode by default"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/windows-forms/10.0/statusstrip-renderer.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# System.Windows.Forms.StatusStrip uses System RenderMode by default

`System.Windows.Forms.StatusStrip` has been updated to use the system renderer.

## Version introduced

.NET 10

## Previous behavior

Previously, `System.Windows.Forms.StatusStrip` used the default renderer.

## New behavior

The `StatusStrip.RenderMode` property is set to `System.Windows.Forms.ToolStripRenderMode.System` by default. You might observe minor changes to the appearance of the `StatusStrip`.

## Change category

This change is a *behavioral change*.

## Reason for change

The previous behavior was changed in .NET 9. This reverts the behavior to the previous default behavior.

## Recommended action

N/A

## Affected APIs

- `System.Windows.Forms.StatusStrip`
- `System.Windows.Forms.ToolStripManager.RenderMode`
