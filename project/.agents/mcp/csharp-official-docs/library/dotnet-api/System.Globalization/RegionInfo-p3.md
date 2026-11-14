---
title: "RegionInfo class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/RegionInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegionInfo class (part 3 of 3)

## RegionInfo.TwoLetterISORegionName property

```csharp
public virtual string TwoLetterISORegionName { get; }
```

Gets the two-letter code defined in ISO 3166 for the country/region.

Returns: The two-letter code defined in ISO 3166 for the country/region.

The `RegionInfo` name is one of the two-letter codes defined in ISO 3166 for country/region. For example, the two-letter code for United States is "US".

> **Important:**
> In some cases, the `TwoLetterISORegionName` property may have more than two characters. For example, the value of the `TwoLetterISORegionName` property for the Caribbean region is "029".

Case is not significant. However, the `Name`, `TwoLetterISORegionName`, and `ThreeLetterISORegionName` properties return the appropriate code in uppercase.

> **Warning:**
> If you want to persist a `RegionInfo` object or communicate it between processes, you should instantiate it by using a full culture name rather than a two-letter ISO region code. Because `RegionInfo` properties depend on script and language, instantiating a `RegionInfo` object by using only a region code loses context and data.

The predefined `RegionInfo` names are listed in ISO 3166: Country codes.

#### Examples

The following code example displays the properties of the `RegionInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencySymbol/regioninfo_properties.cs._

## RegionInfo.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Determines whether the specified object is the same instance as the current `RegionInfo`.

Parameters:

- `value`: The object to compare with the current `RegionInfo`.

Returns: `true` if the `value` parameter is a `RegionInfo` object and its `RegionInfo.Name` property is the same as the `RegionInfo.Name` property of the current `RegionInfo` object; otherwise, `false`.

This method overrides `Object.Equals`.

#### Examples

The following code example compares two instances of `RegionInfo` that were created differently.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/.ctor/regioninfo_equals.cs._

## RegionInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for the current `RegionInfo`, suitable for hashing algorithms and data structures, such as a hash table.

Returns: A hash code for the current `RegionInfo`.

This method overrides `Object.GetHashCode`.

This method generates the same hash code for two objects that are equal according to the `RegionInfo.Equals` method.

## RegionInfo.ToString() method

```csharp
public override string ToString ();
```

Returns a string containing the culture name or ISO 3166 two-letter country/region codes specified for the current `RegionInfo`.

Returns: A string containing the culture name or ISO 3166 two-letter country/region codes defined for the current `RegionInfo`.

This method overrides `Object.ToString`.

This method returns the value of the `Name` property.

Case is not significant. However, the `Name`, `TwoLetterISORegionName`, and `ThreeLetterISORegionName` properties return the appropriate code in uppercase.

The predefined `RegionInfo` names are listed on the `RegionInfo` class page.
