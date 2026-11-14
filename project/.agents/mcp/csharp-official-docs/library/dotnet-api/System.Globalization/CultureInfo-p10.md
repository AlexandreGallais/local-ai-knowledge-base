---
title: "CultureInfo class (part 10 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CultureInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureInfo class (part 10 of 10)

## CultureInfo.GetCultureInfoByIetfLanguageTag(String) method

```csharp
public static System.Globalization.CultureInfo GetCultureInfoByIetfLanguageTag (string name);
```

Deprecated. Retrieves a read-only `CultureInfo` object having linguistic characteristics that are identified by the specified RFC 4646 language tag.

Parameters:

- `name`: The name of a language as specified by the RFC 4646 standard.

Returns: A read-only `CultureInfo` object.

Exceptions:

- `ArgumentNullException`: `name` is null.
- `CultureNotFoundException`: `name` does not correspond to a supported culture.

#### Remarks

> **Note:**
> This method and the `IetfLanguageTag` property are deprecated. Instead of using these APIs, we recommend using the `CultureInfo.%23ctor` constructors, `CultureInfo.GetCultureInfo`, and the `Name` property. IETF tags and names are identical.

The RFC 4646 standard that is maintained by the Internet Engineering Task Force (IETF) defines an IETF language tag, which provides a uniform means of identifying a language. The format of an IETF language tag is the same as the culture name returned by the `Name` property, but does not identify a culture uniquely. Different cultures share the same IETF language tag if those cultures have identical linguistic characteristics. The linguistic characteristics of a culture are contained in the `TextInfo` object associated with a `CultureInfo` object.

An IETF language tag consists of a mandatory language identifier, an optional script identifier, and an optional region identifier.

Your applications should use the retrieved culture to control language-specific tasks, such as managing a spelling or grammar checker. Applications should not use the retrieved culture to control culture-specific tasks, such as sorting text or formatting times and dates.

For more information, see RFC 4646 - "Tags for Identifying Languages.

## CultureInfo.GetCultures(CultureTypes) method

```csharp
public static System.Globalization.CultureInfo[] GetCultures (System.Globalization.CultureTypes types);
```

Gets the list of supported cultures filtered by the specified `CultureTypes` parameter.

Parameters:

- `types`: A bitwise combination of the enumeration values that filter the cultures to retrieve.

Returns: An array that contains the cultures specified by the `types` parameter. The array of cultures is unsorted.

Exceptions:

- `ArgumentOutOfRangeException`: `types` specifies an invalid combination of `CultureTypes` values.

#### Remarks
The `CultureInfo.GetCultures` method is most commonly called with the `types` parameter set to the following values:

- `SpecificCultures`, which returns all specific cultures.

- `NeutralCultures`, which returns all neutral cultures and the invariant culture.

- `AllCultures`, which returns all neutral and specific cultures, cultures installed in the Windows system, and custom cultures created by the user.

- `UserCustomCulture`, which returns all custom cultures, such as those registered by the `CultureAndRegionInfoBuilder` class. In versions of Windows before Windows 10, the `UserCustomCulture` value applies to all user-defined custom cultures. Starting with Windows 10, it applies to system cultures that lack complete cultural data and that do not have a unique local identifier, as indicated by the `LCID` property value. As a result, code such as the following will return different results when run on Windows 10 and on an earlier version of Windows.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DisplayName/getcultures3.cs._

#### Examples
The following code example displays several properties of the neutral cultures.

> **Note:**
> The example displays the `zh-CHS` and `zh-CHT` cultures with the 0x0004 and 0x7C04 culture identifiers, respectively. However, your Windows Vista applications should use the `zh-Hans` name instead of `zh-CHS` and the `zh-Hant` name instead of zh-CHT. The `zh-Hans` and `zh-Hant` names represent the current standard, and should be used unless you have a reason for using the older names.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DisplayName/getcultures.cs._

## CultureInfo.GetFormat(Type) method

```csharp
public virtual object? GetFormat (Type? formatType);
```

Gets an object that defines how to format the specified type.

Parameters:

- `formatType`: The `Type` for which to get a formatting object. This method only supports the `NumberFormatInfo` and `DateTimeFormatInfo` types.

Returns: The value of the `CultureInfo.NumberFormat` property, which is a `NumberFormatInfo` containing the default number format information for the current `CultureInfo`, if `formatType` is the `Type` object for the `NumberFormatInfo` class.

-or-

The value of the `CultureInfo.DateTimeFormat` property, which is a `DateTimeFormatInfo` containing the default date and time format information for the current `CultureInfo`, if `formatType` is the `Type` object for the `DateTimeFormatInfo` class.

-or-

null, if `formatType` is any other object.

#### Remarks
`CultureInfo.GetFormat` implements `IFormatProvider.GetFormat`.

`NumberFormatInfo` provides the culture-specific numeric format used in conjunction with the Format methods in the base data types. `DateTimeFormatInfo` controls how the date and time values are formatted for a specific culture.

## CultureInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for the current `CultureInfo`, suitable for hashing algorithms and data structures, such as a hash table.

Returns: A hash code for the current `CultureInfo`.

#### Remarks
This method overrides `Object.GetHashCode`.

This method generates the same hash code for two objects that are equal according to the `CultureInfo.Equals` method.

## CultureInfo.ReadOnly(CultureInfo) method

```csharp
public static System.Globalization.CultureInfo ReadOnly (System.Globalization.CultureInfo ci);
```

Returns a read-only wrapper around the specified `CultureInfo` object.

Parameters:

- `ci`: The `CultureInfo` object to wrap.

Returns: A read-only `CultureInfo` wrapper around `ci`.

Exceptions:

- `ArgumentNullException`: `ci` is null.

#### Remarks
This wrapper prevents any modifications to `ci`, or the objects returned by the `ci`.`CultureInfo.DateTimeFormat` and `ci`.`CultureInfo.NumberFormat` properties.

#### Examples
The following example shows that the `CultureInfo.ReadOnly` method helps protect the `DateTimeFormatInfo` and `NumberFormatInfo` instances associated with the `CultureInfo`.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/IsReadOnly/yslin_cultureinfo_readonly.cs._

## CultureInfo.ToString() method

```csharp
public override string ToString ();
```

Returns a string containing the name of the current `CultureInfo` in the format *languagecode2*-*country/regioncode2*.

Returns: A string containing the name of the current `CultureInfo`.

#### Remarks
This method overrides `Object.ToString`. It returns a normalized version of the culture name that is passed to the `%23ctor` or `%23ctor` constructor or to the `CultureInfo.CreateSpecificCulture` or `GetCultureInfo` method. It normalizes the result string by converting characters in *languagecode2* to lowercase and converting characters in *country/regioncode2* to uppercase if necessary.

Predefined culture names on Windows systems are listed in the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47.
