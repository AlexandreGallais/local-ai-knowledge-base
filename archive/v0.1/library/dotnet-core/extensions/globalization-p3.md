---
title: "Globalization (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/globalization.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Globalization (part 3 of 3)

## Work with culture-specific settings

In .NET, the `System.Globalization.CultureInfo` class represents a particular culture or region. Some of its properties return objects that provide specific information about some aspect of a culture:

- The `System.Globalization.CultureInfo.CompareInfo` property returns a `System.Globalization.CompareInfo` object that contains information about how the culture compares and orders strings.

- The `System.Globalization.CultureInfo.DateTimeFormat` property returns a `System.Globalization.DateTimeFormatInfo` object that provides culture-specific information used in formatting date and time data.

- The `System.Globalization.CultureInfo.NumberFormat` property returns a `System.Globalization.NumberFormatInfo` object that provides culture-specific information used in formatting numeric data.

- The `System.Globalization.CultureInfo.TextInfo` property returns a `System.Globalization.TextInfo` object that provides information about the culture's writing system.

In general, do not make any assumptions about the values of specific `System.Globalization.CultureInfo` properties and their related objects. Instead, you should view culture-specific data as subject to change, for these reasons:

- Individual property values are subject to change and revision over time, as data is corrected, better data becomes available, or culture-specific conventions change.

- Individual property values may vary across versions of .NET or operating system versions.

- .NET supports replacement cultures. This makes it possible to define a new custom culture that either supplements existing standard cultures or completely replaces an existing standard culture.

- On Windows systems, the user can customize culture-specific settings by using the **Region and Language** app in Control Panel. When you instantiate a `System.Globalization.CultureInfo` object, you can determine whether it reflects these user customizations by calling the `System.Globalization.CultureInfo.#ctor(System.String,System.Boolean)` constructor. Typically, for end-user apps, you should respect user preferences so that the user is presented with data in a format that they expect.

## See also

- Globalization and localization
- Best practices for using strings
