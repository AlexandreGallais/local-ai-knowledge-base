---
title: "CultureTypes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CultureTypes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureTypes enum

Namespace: `System.Globalization`

```csharp
public enum CultureTypes
```

Defines the types of culture lists that can be retrieved using the `CultureInfo.GetCultures` method.

#### Remarks

These culture type values are returned by the `CultureTypes` property, and also serve as a filter that limits the cultures returned by the `CultureInfo.GetCultures` method. For more information on cultures, see `CultureInfo`.

Generally, you enumerate all cultures by using the `CultureTypes.AllCultures` value. This allows enumeration of custom cultures as well as the other culture types.

Note that all `CultureTypes` members have been deprecated except for `CultureTypes.AllCultures`, `CultureTypes.NeutralCultures`, and `CultureTypes.SpecificCultures`.

.NET recognizes the following culture types, all of which are included in enumerations returned by the `CultureTypes.AllTypes` enumeration member:

- **Specific cultures**, which specify a country/region and a language. The names of these cultures follow RFC 4646. The format is `<languagecode2>-<country/regioncode2>`, where `<languagecode2>` is a lowercase two-letter code derived from ISO 639-1, and `<country/regioncode2>` is an uppercase two-letter code derived from ISO 3166. For example, "en-US" for English (United States) is a specific culture. Custom specific cultures (that is, cultures that are application- rather than system-defined) can have any user-specified name, not just a standards-compliant one.

- **Neutral cultures**, which specify a language without respect to a country/region. The names of neutral cultures consist of the lowercase two-letter code derived from ISO 639-1. For example: "en" (English) is a neutral culture. Custom neutral cultures (that is, cultures that are application- rather than system-defined) can have any user-specified name, not just a two-letter code.

The invariant culture is included in the array of cultures returned by the `CultureInfo.GetCultures` method that specifies this value.

- **Custom cultures**, which are application-defined cultures. Custom cultures can represent either specific cultures or neutral cultures and can have any application-specified name.

In Windows versions prior to Windows 10, the `UserCustomCulture` value is assigned to custom cultures created by the developer. In Windows 10, the `UserCustomCulture` value is also assigned to system cultures that are not backed by a complete set of cultural data and that do not have unique local identifiers. (All cultures of type `UserCustomCulture` share a `CultureInfo.LCID` value of `LOCALE_CUSTOM_UNSPECIFIED` (0x1000, or 4096)). As a result, the `CultureInfo.GetCultures(CultureTypes.UserCustomCulture)` method returns different sets of cultures on different Windows versions.

#### Examples

The following example demonstrates the `CultureTypes.AllCultures` enumeration member and the `CultureTypes` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CultureTypes/ct.cs._

The following example displays several properties of the neutral cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DisplayName/getcultures.cs._

## CultureTypes.AllCultures field

```csharp
AllCultures
```

All cultures that are recognized by .NET, including neutral and specific cultures and custom cultures created by the user.

On Windows, it includes the culture data available from the Windows operating system. On Linux and macOS, it includes culture data defined in the ICU libraries.

`CultureTypes.AllCultures` is a composite field that includes the `CultureTypes.NeutralCultures`, `CultureTypes.SpecificCultures`, and `CultureTypes.InstalledWin32Cultures` values.

## CultureTypes.FrameworkCultures field

```csharp
FrameworkCultures
```

**This member is deprecated.** Specifies neutral and specific cultures shipped with .NET Framework 2.0.

## CultureTypes.InstalledWin32Cultures field

```csharp
InstalledWin32Cultures
```

**This member is deprecated.** All cultures that are installed in the Windows operating system.

## CultureTypes.NeutralCultures field

```csharp
NeutralCultures
```

Cultures that are associated with a language but are not specific to a country/region.

## CultureTypes.ReplacementCultures field

```csharp
ReplacementCultures
```

**This member is deprecated.** Specifies custom cultures created by the user that replace cultures shipped with .NET Framework.

## CultureTypes.SpecificCultures field

```csharp
SpecificCultures
```

Cultures that are specific to a country/region.

## CultureTypes.UserCustomCulture field

```csharp
UserCustomCulture
```

**This member is deprecated.** Custom cultures created by the user.

## CultureTypes.WindowsOnlyCultures field

```csharp
WindowsOnlyCultures
```

**This member is deprecated and ignored.**
