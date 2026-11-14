---
title: "Breaking change: DefaultValueAttribute removed from some properties"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/8.0/defaultvalueattribute-removal.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# DefaultValueAttribute removed from some properties

`System.ComponentModel.DefaultValueAttribute` has been removed from control properties that are dependent on the default font height.

## Version introduced

.NET 8

## Previous behavior

The affected properties were decorated with `System.ComponentModel.DefaultValueAttribute`, and default values were hardcoded according to an assumed application-wide font.

## New behavior

Starting in .NET 8, the attribute is removed from certain properties. Design-time default values are calculated at startup based on the current font metrics.

## Change category

This change is a *behavioral change*.

## Reason for change

The `System.ComponentModel.DefaultValueAttribute` attribute is designed to define constant default values used by the Windows Forms designer. In the past, this attribute was used to specify defaults on certain properties that depend on the current font height. A new default font was introduced in .NET Core 3.1, but the attribute values weren't updated accordingly. Moreover, there's now an API to modify application font. Thus, it makes sense to use dynamic default values instead of constant ones.

The designer provides methods to specify dynamic default values, however, for properties decorated with `System.ComponentModel.DefaultValueAttribute`, it always uses the constant default value instead. The methods for specifying dynamic defaults preserve the design-time functionality provided by the attribute.

## Recommended action

`System.ComponentModel.DefaultValueAttribute` is intended for internal use in design-time scenarios. You shouldn't use it in other scenarios.

## Affected APIs

The following table lists the affected properties.

| Property | Change version |
|-|-|-|
| `System.Windows.Forms.DataGridViewRow.Height` | Preview 2 |
| `System.Windows.Forms.ListBox.ItemHeight` | Preview 2 |
