---
title: "Breaking change: Top-level forms scale to DPI"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/8.0/forms-scale-size-to-dpi.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Top-level forms scale minimum and maximum size to DPI

Top-level forms in Windows Forms now scale their `System.Windows.Forms.Form.MinimumSize` and `System.Windows.Forms.Form.MaximumSize` values according to the dots per inch (DPI) of the monitor when running in `System.Windows.Forms.HighDpiMode.PerMonitorV2` mode.

## Version introduced

.NET 8 Preview 1

## Previous behavior

In .NET 8, the `System.Windows.Forms.Form.MinimumSize` and `System.Windows.Forms.Form.MaximumSize` values for top-level forms remained constant regardless of the application DPI mode and the DPI of the monitor where the form is rendered. This sometimes resulted in scaling limitations of the top-level form.

You can also opt in to this behavior in .NET 7. To opt in, set the `System.Windows.Forms.ScaleTopLevelFormMinMaxSizeForDpi` runtime configuration option described in the Recommended action section.

## New behavior

Starting in .NET 8, top-level forms scale their `System.Windows.Forms.Form.MinimumSize` and `System.Windows.Forms.Form.MaximumSize` values according to the DPI of the monitor when running in `System.Windows.Forms.HighDpiMode.PerMonitorV2` mode. The behavior of your app might change in the following ways:

- Runtime dependencies might be impacted when the minimum and maximum size of the form change.
- New `System.Windows.Forms.Form.MinimumSizeChanged` and `System.Windows.Forms.Form.MaximumSizeChanged` events might be raised.
- The scaled form size now has new constraint values for the minimum and maximum sizes.

## Change category

This change is a *behavioral change*.

## Reason for change

This change is part of a broader effort to improve the Windows Forms user experience on high DPI monitors. It enables developers to set minimum and maximum sizes for top-Level forms without having to take the DPI of the monitor into account.

## Recommended action

If the new behavior is problematic for you, you can opt out by setting `System.Windows.Forms.ScaleTopLevelFormMinMaxSizeForDpi` to `false` in your *runtimeconfig.json* file.

*runtimeconfig.template.json* template file:

```json
{
   "configProperties": {
      "System.Windows.Forms.ScaleTopLevelFormMinMaxSizeForDpi": false
   }
}
```

*[appname].runtimeconfig.json* output file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.Windows.Forms.ScaleTopLevelFormMinMaxSizeForDpi": false
      }
   }
}
```

## Affected APIs

N/A

## See also

- Forms scale according to AutoScaleMode
