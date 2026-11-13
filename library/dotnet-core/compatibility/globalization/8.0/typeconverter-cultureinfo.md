---
title: "Breaking change: Date and time converters honor culture argument"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/globalization/8.0/typeconverter-cultureinfo.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Date and time converters honor culture argument

The `ConvertTo` methods on the following classes now use the culture from the `culture` parameter as the format provider for the date and time instead of `System.Globalization.CultureInfo.CurrentCulture`:

- `System.ComponentModel.DateOnlyConverter`
- `System.ComponentModel.DateTimeConverter`
- `System.ComponentModel.DateTimeOffsetConverter`
- `System.ComponentModel.TimeOnlyConverter`

## Previous behavior

Previously, the affected APIs used `System.Globalization.CultureInfo.CurrentCulture` as the format provider for the date and time even though the caller specified a culture in the `culture` parameter.

Consider the following code snippet that sets the current culture to Spanish (Spain) but passes a customized French culture to `System.ComponentModel.DateTimeConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object,System.Type)`.

```csharp
CultureInfo.CurrentCulture = new CultureInfo("es-ES");
Console.WriteLine($"Current culture: {CultureInfo.CurrentCulture}");

var dt1 = new DateTime(2022, 8, 1);

var frCulture = new CultureInfo("fr-FR");
frCulture.DateTimeFormat.ShortDatePattern = "dd MMMM yyyy";

Console.WriteLine(TypeDescriptor.GetConverter(dt1).ConvertTo(null, frCulture, dt1, typeof(string)));
```

In .NET 7 and earlier versions, this code prints the date in the correct format but with the name of the month in Spanish instead of French:

```output
Current culture: es-ES
01 agosto 2022
```

## New behavior

Starting in .NET 8, the affected APIs use the culture specified by the `culture` parameter as the format provider.

The code snippet shown in the Previous behavior correctly prints the name of the month in French:

```output
Current culture: es-ES
01 août 2022
```

## Version introduced

.NET 8 Preview 4

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change fixes a bug where `ConvertTo` was not consistent with `ConvertFrom`. It used the date and time format strings from the input culture but formatted the date and time with `System.Globalization.CultureInfo.CurrentCulture`.

## Recommended action

If you relied on the previous behavior, pass in `System.Globalization.CultureInfo.CurrentCulture`, `null`, or a custom culture for the `culture` parameter.

## Affected APIs

- `System.ComponentModel.DateOnlyConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object,System.Type)`
- `System.ComponentModel.DateTimeConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object,System.Type)`
- `System.ComponentModel.DateTimeOffsetConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object,System.Type)`
- `System.ComponentModel.TimeOnlyConverter.ConvertTo(System.ComponentModel.ITypeDescriptorContext,System.Globalization.CultureInfo,System.Object,System.Type)`
