---
title: "RegionInfo class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/RegionInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegionInfo class

Namespace: `System.Globalization`

```csharp
public class RegionInfo
```

Contains information about the country/region.

## Remarks

Unlike the `CultureInfo` class, the `RegionInfo` class does not represent user preferences and does not depend on the user's language or culture.

#### Names associated with a RegionInfo object

The name of a `RegionInfo` object is one of the two-letter codes defined in ISO 3166 for country/region. Case is not significant. The `Name`, `TwoLetterISORegionName`, and `ThreeLetterISORegionName` properties return the appropriate codes in uppercase. For the current list of `RegionInfo` names, see ISO 3166: Country codes.

#### Instantiate a RegionInfo object

To instantiate a `RegionInfo` object, you pass the `%23ctor` constructor either a two-letter region name, such as "US" for the United States, or the name of a specific culture, such as "en-US" for English (United States). However, we recommend that you use a specific culture name instead of a two-letter region name, because a `RegionInfo` object is not completely language-independent. Several `RegionInfo` properties, including `DisplayName`, `NativeName`, and `CurrencyNativeName`, depend on culture names.

The following example illustrates the difference in `RegionInfo` property values for three objects that represent Belgium. The first is instantiated from a region name (`BE`) only, while the second and third are instantiated from culture names (`fr-BE` for French (Belgium) and `nl-BE` for Dutch (Belgium), respectively). The example uses reflection to retrieve the property values of each `RegionInfo` object.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/Overview/propertyvalues1.cs._
In scenarios such as the following, use culture names instead of country/region names when you instantiate a `RegionInfo` object:

- When the language name is of primary importance. For example, for the `es-US` culture name, you'll probably want your application to display "Estados Unidos" instead of "United States". Using the country/region name (`US`) alone yields "United States" regardless of the language, so you should work with the culture name instead.

- When script differences must be considered. For example, the country/region `AZ` deals with Azerbaijani cultures that have the names `az-Latn-AZ` and `az-Cyrl-AZ`, and the Latin and Cyrillic scripts can be very different for this country/region.

- When maintenance of detail is important. The values returned by `RegionInfo` members can differ depending on whether the `RegionInfo` object was instantiated by using a culture name or a region name. For example, the following table lists the differences in return values when a `RegionInfo` object is instantiated by using the "US" region, the "en-US" culture, and the "es-US" culture.

| Member                                                    | "US"            | "en-US"         | "es-US"           |
|-----------------------------------------------------------|-----------------|-----------------|-------------------|
| `CurrencyNativeName` | `US Dollar`     | `US Dollar`     | `Dólar de EE.UU.` |
| `Name`               | `US`            | `en-US`         | `es-US`           |
| `NativeName`         | `United States` | `United States` | `Estados Unidos`  |
| `RegionInfo.ToString`        | `US`            | `en-US`         | `es-US`           |
#### Example

The following example demonstrates several members of the `RegionInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/Overview/regioninfo.cs._

## RegionInfo.RegionInfo(Int32) constructor

```csharp
public RegionInfo (int culture);
```

Initializes a new instance of the `RegionInfo` class based on the country/region associated with the specified culture identifier.

Parameters:

- `culture`: A culture identifier.

Exceptions:

- `ArgumentException`: `culture` specifies either an invariant, custom, or neutral culture.

-or-

.NET 6+ only: Globalization-invariant mode is enabled in the environment.

`%23ctor` is the recommended constructor for instantiating a `RegionInfo` object. Unlike the `%23ctor` constructor that requires a numeric culture identifier as a parameter, its parameter is a more readable culture name or country code.

The culture identifier is mapped to the corresponding National Language Support (NLS) locale identifier. For more information, see Windows LCID reference.

The value of the `Name` property of the new `RegionInfo` object instantiated by calling this constructor is the ISO 3166 2-letter code for the country/region, not the combined language and country/region code. For example, if a `RegionInfo` object is instantiated with the culture identifier 0x0409 for the English (United States) culture, the value of the `Name` property is "US". In contrast, if a `RegionInfo` object is instantiated with the combined language and country/region code `en-US` for the English (United States) culture, the value of the `Name` property is "en-US" in .NET Framework and just "US" in modern .NET.

#### Examples

The following code example compares two instances of `RegionInfo` that were created differently.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/.ctor/regioninfo_equals.cs._

## RegionInfo.RegionInfo(String) constructor

```csharp
public RegionInfo (string name);
```

Initializes a new instance of the `RegionInfo` class based on the country/region or specific culture, specified by name.

Parameters:

- `name`: A string that contains a two-letter code defined in ISO 3166 for country/region.

-or-

A string that contains the culture name for a specific culture, custom culture, or Windows-only culture. If the culture name is not in RFC 4646 format, your application should specify the entire culture name instead of just the country/region.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `ArgumentException`: `name` is not a valid country/region name or specific culture name.

-or-

.NET 6+ only: Globalization-invariant mode is enabled in the environment.

The `name` parameter is either one of the codes defined for country/region, or a specific, custom, or Windows-only culture name. Case is not significant. However, the `Name`, `TwoLetterISORegionName`, and `ThreeLetterISORegionName` properties return the specified code or culture name in uppercase.

The predefined `RegionInfo` names are listed in ISO 3166: Country codes.

You should provide the name of a specific culture rather than just a country/region name in the `name` parameter. For example, `en-US` for English (United States) or `es-US` for Spanish (United States) is preferable to `US` because properties such as `NativeName` and `CurrencyNativeName` reflect a specific language. `az-Latn-AZ` or `az-Cyrl-AZ` is preferable to `AZ` because properties such as `NativeName`, `CurrencyNativeName`, and `CurrencySymbol` reflect a specific script. The predefined culture names are listed at Windows LCID reference.

This constructor throws an `ArgumentException` if `name` is a neutral culture (such as `en` for English).

#### Examples

The following code example compares two instances of `RegionInfo` that were created differently.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/.ctor/regioninfo_equals.cs._

The following code example creates instances of `RegionInfo` using culture names.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/.ctor/regioninfo_ctorculturename.cs._

## RegionInfo.CurrencyEnglishName property

```csharp
public virtual string CurrencyEnglishName { get; }
```

Gets the name, in English, of the currency used in the country/region.

Returns: The name, in English, of the currency used in the country/region.

#### Examples

The following code example demonstrates the `CurrencyEnglishName` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencyEnglishName/rgn5props.cs._

## RegionInfo.CurrencyNativeName property

```csharp
public virtual string CurrencyNativeName { get; }
```

Gets the name of the currency used in the country/region, formatted in the native language of the country/region.

Returns: The native name of the currency used in the country/region, formatted in the language associated with the ISO 3166 country/region code.

If the current `RegionInfo` object is created with a specific culture and more than one language is used in the corresponding country/region, the `CurrencyNativeName` property retrieves the currency name associated with the specific culture.

The value of this property depends on the language that's associated with a particular country/region. Therefore, if you intend to use the `CurrencyNativeName` property, you should instantiate the `RegionInfo` object by passing the `%23ctor` constructor a combined language and country/region code. For example, if a `RegionInfo` object is instantiated with a combined language and country/region code of "en-CA" for English (Canada), the value of its `CurrencyNativeName` property is "Canadian Dollar". If it is instantiated with a combined language and country/region code of "fr-CA" for French (Canada), the value of its `CurrencyNativeName` property is "Dollar canadien". Therefore, creating the `RegionInfo` object with only a country/region name ("CA" in this case) is not specific enough to distinguish the appropriate native currency name.

#### Examples

The following code example demonstrates the `CurrencyNativeName` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencyEnglishName/rgn5props.cs._

## RegionInfo.CurrencySymbol property

```csharp
public virtual string CurrencySymbol { get; }
```

Gets the currency symbol associated with the country/region.

Returns: The currency symbol associated with the country/region.

For example, the currency symbol for the United States is "$".

If the current `RegionInfo` object is created with a specific culture and more than one language is used in the corresponding country/region, the `CurrencySymbol` property returns the currency symbol associated with the specific culture.

#### Examples

The following code example displays the properties of the `RegionInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencySymbol/regioninfo_properties.cs._

## RegionInfo.CurrentRegion property

```csharp
public static System.Globalization.RegionInfo CurrentRegion { get; }
```

Gets the `RegionInfo` that represents the country/region used by the current thread.

Returns: The `RegionInfo` that represents the country/region used by the current thread.

The value of this property is based on the culture selected through the regional and language options portion of Control Panel. However, that information can change during the life of the `AppDomain`. The `RegionInfo` class does not automatically detect changes in the system settings, but the `CurrentRegion` property is updated when you call the `CultureInfo.ClearCachedData` method.

## RegionInfo.DisplayName property

```csharp
public virtual string DisplayName { get; }
```

Gets the full name of the country/region in the language of the localized version of .NET.

Returns: The full name of the country/region in the language of the localized version of .NET.

The `DisplayName` property displays the country/region name in the language of the localized version of .NET. For example, the `DisplayName` property displays the country/region in English on the English version of .NET, and in Spanish on the Spanish version of .NET.

The value of the `DisplayName` property is taken from the resource files in the language of the current user interface culture, represented by `CultureInfo.CurrentUICulture`. Custom regions or those synthesized from the operating system might not have resource information, in which case the value for `RegionInfo.DisplayName` is the same as the value of the `NativeName` property.

#### Examples

The following code example displays the properties of the `RegionInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencySymbol/regioninfo_properties.cs._

## RegionInfo.EnglishName property

```csharp
public virtual string EnglishName { get; }
```

Gets the full name of the country/region in English.

Returns: The full name of the country/region in English.

For example, a `RegionInfo` object created for the English (United States) culture displays "United States".

#### Examples

The following code example displays the properties of the `RegionInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencySymbol/regioninfo_properties.cs._

## RegionInfo.GeoId property

```csharp
public virtual int GeoId { get; }
```

Gets a unique identification number for a geographical region, country, city, or location.

Returns: A 32-bit signed number that uniquely identifies a geographical location.

The application should use the `GeoId` property to provide culture-specific services to customers. For example, the `GeoId` property can be used as a key to access a database record that contains specific information about a country/region.

This property value corresponds to the Windows `GetUserGeoID` function. For a list of geographical identifiers, see Table of Geographical Locations.

#### Examples

The following code example demonstrates the `GeoId` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencyEnglishName/rgn5props.cs._

## RegionInfo.IsMetric property

```csharp
public virtual bool IsMetric { get; }
```

Gets a value indicating whether the country/region uses the metric system for measurements.

Returns: `true` if the country/region uses the metric system for measurements; otherwise, `false`.

#### Examples

The following code example displays the properties of the `RegionInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencySymbol/regioninfo_properties.cs._
