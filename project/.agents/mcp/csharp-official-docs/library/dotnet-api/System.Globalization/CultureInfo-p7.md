---
title: "CultureInfo class (part 7 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CultureInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureInfo class (part 7 of 10)

## CultureInfo.IetfLanguageTag property

```csharp
public string IetfLanguageTag { get; }
```

Deprecated. Gets the RFC 4646 standard identification for a language.

Returns: A string that is the RFC 4646 standard identification for a language.

#### Remarks

> **Note:**
> This property (and the `CultureInfo.GetCultureInfoByIetfLanguageTag` method) is deprecated. Instead, you should use the `Name` property. IETF tags and names are identical.

The RFC 4646 standard that is maintained by the Internet Engineering Task Force (IETF) defines an IETF language tag, which provides a uniform means of identifying a language. The format of an IETF language tag is similar to the culture name returned by the `Name` property, but does not identify a culture uniquely. That is, different cultures share the same IETF language tag if those cultures have identical linguistic characteristics. The linguistic characteristics of a culture are contained in the `TextInfo` object associated with a `CultureInfo` object.

An IETF language tag consists of a mandatory language identifier, an optional script identifier, and an optional region identifier.

For more information, see RFC 4646, "Tags for Identifying Languages. For a list of subtags, see The IANA Language Subtag Registry.

## CultureInfo.InstalledUICulture property

```csharp
public static System.Globalization.CultureInfo InstalledUICulture { get; }
```

Gets the `CultureInfo` that represents the culture installed with the operating system.

Returns: The `CultureInfo` that represents the culture installed with the operating system.

#### Remarks
In a localized operating system, such as a Japanese edition of Windows, this property returns the culture of the operating system. This property is the equivalent of `GetSystemDefaultUILanguage` in the Windows API.

## CultureInfo.InvariantCulture property

```csharp
public static System.Globalization.CultureInfo InvariantCulture { get; }
```

Gets the `CultureInfo` object that is culture-independent (invariant).

Returns: The object that is culture-independent (invariant).

The invariant culture is culture-insensitive; it's associated with the English language but not with any country/region. You specify the invariant culture by name by using an empty string ("") in the call to a `CultureInfo` instantiation method. This property, `InvariantCulture`, also retrieves an instance of the invariant culture. It can be used in almost any method in the `Globalization` namespace that requires a culture. The objects returned by properties such as `CompareInfo`, `DateTimeFormat`, and `NumberFormat` also reflect the string comparison and formatting conventions of the invariant culture.

Unlike culture-sensitive data, which is subject to change by user customization or by updates to .NET or the operating system, invariant culture data is stable over time and across installed cultures and cannot be customized by users. This makes the invariant culture particularly useful for operations that require culture-independent results, such as formatting and parsing operations that persist formatted data, or sorting and ordering operations that require that data be displayed in a fixed order regardless of culture.

#### String operations

You can use the invariant culture for culture-sensitive string operations that are not affected by the conventions of the current culture and that are consistent across cultures. For example, you may want sorted data to appear in a fixed order or apply a standard set of casing conventions to strings regardless of the current culture. To do this, you pass the `InvariantCulture` object to a method that has a `CultureInfo` parameter, such as `Compare` and `ToUpper`.

#### Persisting data

The `InvariantCulture` property can be used to persist data in a culture-independent format. This provides a known format that does not change and that can be used to serialize and deserialize data across cultures. After the data is deserialized, it can be formatted appropriately based on the cultural conventions of the current user.

For example, if you choose to persist date and time data in string form, you can pass the `InvariantCulture` object to the `ToString` or `ToString` method to create the string, and you can pass the `InvariantCulture` object to the `Parse` or `Parse` method to convert the string back to a date and time value. This technique ensures that the underlying date and time values do not change when the data is read or written by users from different cultures.

The following example uses the invariant culture to persist a `DateTime` value as a string. It then parses the string and displays its value by using the formatting conventions of the French (France) and German (Germany) cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/InvariantCulture/persist1.cs._

#### Security decisions

If you are making a security decision (such as whether to allow access to a system resource) based on the result of a string comparison or a case change, you should not use the invariant culture. Instead, you should perform a case-sensitive or case-insensitive ordinal comparison by calling a method that includes a `StringComparison` parameter and supplying either `Ordinal` or `OrdinalIgnoreCase` as an argument. Code that performs culture-sensitive string operations can cause security vulnerabilities if the current culture is changed or if the culture on the computer that is running the code differs from the culture that is used to test the code. In contrast, an ordinal comparison depends solely on the binary value of the compared characters.

## CultureInfo.IsNeutralCulture property

```csharp
public virtual bool IsNeutralCulture { get; }
```

Gets a value indicating whether the current `CultureInfo` represents a neutral culture.

Returns: `true` if the current `CultureInfo` represents a neutral culture; otherwise, `false`.

#### Remarks
A neutral culture is a culture that is associated with a language but not with a country or region. It differs from a specific culture, which is a culture that is associated with both a language and a country or region. For example, fr is the name for the neutral French culture, while fr-FR is the name for the French culture in France.

If this property returns `false`, the culture is either a specific culture or the invariant culture.

#### Examples
The following code example determines which cultures using the Chinese language are neutral cultures.

> **Note:**
> The example displays the older `zh-CHS` and `zh-CHT` culture names with the 0x0004 and 0x7C04 culture identifiers, respectively. However, your Windows Vista applications should use the `zh-Hans` name instead of `zh-CHS` and the `zh-Hant` name instead of zh-CHT. The `zh-Hans` and `zh-Hant` names represent the current standard, and should be used unless you have a reason for using the older names.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/IsNeutralCulture/neutralculture.cs._

## CultureInfo.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the current `CultureInfo` is read-only.

Returns: `true` if the current `CultureInfo` is read-only; otherwise, `false`. The default is `false`.

#### Remarks
If the `CultureInfo` is read-only, the `CultureInfo.DateTimeFormat` and `CultureInfo.NumberFormat` instances are also read-only.

#### Examples
The following code example shows that `CultureInfo.IsReadOnly` also helps protect the `DateTimeFormatInfo` and `NumberFormatInfo` instances associated with the `CultureInfo`.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/IsReadOnly/yslin_cultureinfo_readonly.cs._

## CultureInfo.KeyboardLayoutId property

```csharp
public virtual int KeyboardLayoutId { get; }
```

Gets the active input locale identifier.

Returns: A 32-bit signed number that specifies an input locale identifier.

#### Remarks
The input locale identifier was formerly called the keyboard layout. An input locale identifier is a broader concept than a keyboard layout since it can also indicate a speech-to-text converter, an Input Method Editor (IME), or any other form of input.

## CultureInfo.LCID property

```csharp
public virtual int LCID { get; }
```

Gets the culture identifier for the current `CultureInfo`.

Returns: The culture identifier for the current `CultureInfo`.

#### Remarks
In most cases, the culture identifier is mapped to the corresponding NLS locale identifier.

In versions of Windows prior to Windows 10, the locale identifier `LOCALE_CUSTOM_UNSPECIFIED` (0x1000, or 4096) is assigned to custom cultures created by the user. Starting with Windows 10, it is assigned to any culture that does not have a unique locale identifier and does not have complete system-provided data. As a result, code that iterates cultures and retrieves those with an `CultureInfo.LCID` value of `LOCALE_CUSTOM_UNSPECIFIED` returns a larger subset of `CultureInfo` objects if run under Windows 10.

> **Note:**
> LCIDs are being deprecated, and implementers are strongly encouraged to use newer versions of APIs that support BCP 47 locale names instead. Each LCID can be represented by a BCP 47 locale name, but the reverse is not true. The LCID range is restricted and unable to uniquely identify all the possible combinations of language and region.

#### Examples
The following code example shows how to create a `CultureInfo` for Spanish (Spain) with the international sort order and another `CultureInfo` with the traditional sort order.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/spanishspain.cs._

## CultureInfo.Name property

```csharp
public virtual string Name { get; }
```

Gets the culture name in the format *languagecode2*-*country/regioncode2*.

Returns: The culture name in the format *languagecode2*-*country/regioncode2*, if the current `CultureInfo` is culture-dependent; or an empty string, if it's an invariant culture. *languagecode2* is a lowercase two-letter code as defined in ISO 639-1, or, if no two-letter code is available, a three-letter code as defined in ISO 639-3. *country/regioncode2* contains a value defined in ISO 3166 and usually consists of two uppercase letters, or a BCP-47 language tag.

#### Remarks

For a list of predefined culture names and identifiers that the `Name` property can return on Windows systems, see the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47. In addition, starting with Windows 10, `name` can be any valid BCP-47 language tag. Note that culture names are subject to change, and that they also can reflect the names of custom cultures.

The `Name` property follows the naming standards provided in the `CultureInfo` class topic. It returns the short form of the culture name that excludes any indication of an alternate sort order. For example, if you instantiate a `CultureInfo` object by using the string "de-DE_phoneb" to reflect an alternate sort order, the `Name` property returns "de-DE".

To get the full name of the culture, you should use the `CultureInfo.DisplayName`, `CultureInfo.EnglishName`, or `NativeName` property.

#### Examples
The following code example displays several properties of the neutral cultures.

> **Note:**
> The example displays the older `zh-CHS` and `zh-CHT` culture names with the 0x0004 and 0x7C04 culture identifiers, respectively. However, your Windows Vista applications should use the `zh-Hans` name instead of `zh-CHS` and the `zh-Hant` name instead of zh-CHT. The `zh-Hans` and `zh-Hant` names represent the current standard, and should be used unless you have a reason for using the older names.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DisplayName/getcultures.cs._

## CultureInfo.NativeName property

```csharp
public virtual string NativeName { get; }
```

Gets the culture name, consisting of the language, the country/region, and the optional script, that the culture is set to display.

Returns: The culture name, consisting of the full name of the language, the full name of the country/region, and the optional script. The format is discussed in the description of the `CultureInfo` class.

To be added.

## CultureInfo.NumberFormat property

```csharp
public virtual System.Globalization.NumberFormatInfo NumberFormat { get; set; }
```

Gets or sets a `NumberFormatInfo` that defines the culturally appropriate format of displaying numbers, currency, and percentage.

Returns: A `NumberFormatInfo` that defines the culturally appropriate format of displaying numbers, currency, and percentage.

Exceptions:

- `ArgumentNullException`: The property is set to null.
- `InvalidOperationException`: The `CultureInfo.NumberFormat` property or any of the `NumberFormatInfo` properties is set, and the `CultureInfo` is read-only.

You might choose to override some of the values associated with the current culture of Windows through the regional and language options portion of Control Panel. For example, the user might choose to display the date in a different format or to use a currency other than the default for the culture.

If `CultureInfo.UseUserOverride` is `true` and the specified culture matches the current culture of Windows, the `CultureInfo` uses those overrides, including user settings for the properties of the `DateTimeFormatInfo` instance returned by the `DateTimeFormat` property, and the properties of the `NumberFormatInfo` instance returned by the `NumberFormat` property. If the user settings are incompatible with the culture associated with the `CultureInfo`, for example, if the selected calendar is not one of the `CultureInfo.OptionalCalendars`, the results of the methods and the values of the properties are undefined.

The values of the `DateTimeFormat` property and the `NumberFormat` property are not calculated until the user accesses the property. If the user uses the Control Panel to change the current culture to a new culture while the application is running and then accesses the `CultureInfo.DateTimeFormat` or `NumberFormat` property, the application retrieves the defaults for the new culture. not the overrides for the original culture. To preserve the overrides for the original current culture, the application should access the `CultureInfo.DateTimeFormat` and `CultureInfo.NumberFormat` properties before changing the current culture.

The following code example shows that CultureInfo.Clone also clones the `DateTimeFormatInfo` and `NumberFormatInfo` instances associated with the `CultureInfo`.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Clone/yslin_cultureinfo_clone.cs._
