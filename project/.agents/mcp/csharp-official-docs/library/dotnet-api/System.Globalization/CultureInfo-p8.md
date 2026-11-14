---
title: "CultureInfo class (part 8 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CultureInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureInfo class (part 8 of 10)

## CultureInfo.OptionalCalendars property

```csharp
public virtual System.Globalization.Calendar[] OptionalCalendars { get; }
```

Gets the list of calendars that can be used by the culture.

Returns: An array of type `Calendar` that represents the calendars that can be used by the culture represented by the current `CultureInfo`.

#### Remarks
Your application changes the calendar used by the current `CultureInfo` by setting the `Calendar` property of `CultureInfo.DateTimeFormat`, which is an instance of the `DateTimeFormatInfo` class. The new calendar must be one of the calendars listed in `CultureInfo.OptionalCalendars`. `CultureInfo.DateTimeFormat` also includes other properties that customize the date and time formatting associated with that `DateTimeFormatInfo.Calendar`.

#### Examples
The following code example demonstrates how to determine the `GregorianCalendar` versions supported by the culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/OptionalCalendars/gregoriancalendartypes.cs._

## CultureInfo.Parent property

```csharp
public virtual System.Globalization.CultureInfo Parent { get; }
```

Gets the `CultureInfo` that represents the parent culture of the current `CultureInfo`.

Returns: The `CultureInfo` that represents the parent culture of the current `CultureInfo`.

#### Remarks
The cultures have a hierarchy in which the parent of a specific culture is a neutral culture, the parent of a neutral culture is the `CultureInfo.InvariantCulture`, and the parent of the `CultureInfo.InvariantCulture` is the invariant culture itself. The parent culture encompasses only the set of information that is common among its children.

If the resources for the specific culture are not available in the system, the resources for the neutral culture are used. If the resources for the neutral culture are not available, the resources embedded in the main assembly are used. For more information on the resource fallback process, see Packaging and Deploying Resources.

#### Examples
The following code example determines the parent culture of each specific culture using the Chinese language.

> **Note:**
> The example displays the older `zh-CHS` and `zh-CHT` culture names with the 0x0004 and 0x7C04 culture identifiers, respectively. However, your Windows Vista applications should use the `zh-Hans` name instead of `zh-CHS` and the `zh-Hant` name instead of zh-CHT. The `zh-Hans` and `zh-Hant` names represent the current standard, and should be used unless you have a reason for using the older names.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Parent/parentculture.cs._

## CultureInfo.TextInfo property

```csharp
public virtual System.Globalization.TextInfo TextInfo { get; }
```

Gets the `TextInfo` that defines the writing system associated with the culture.

Returns: The `TextInfo` that defines the writing system associated with the culture.

#### Remarks
The `TextInfo` property provides culture-specific casing information for strings. To perform culture-insensitive casing, the application should use the `TextInfo` property of `CultureInfo.InvariantCulture`.

#### Examples
The following code example shows how to create a `CultureInfo` for Spanish (Spain) with the international sort order and another `CultureInfo` with the traditional sort order.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/spanishspain.cs._

## CultureInfo.ThreeLetterISOLanguageName property

```csharp
public virtual string ThreeLetterISOLanguageName { get; }
```

Gets the ISO 639-2 three-letter code for the language of the current `CultureInfo`.

Returns: The ISO 639-2 three-letter code for the language of the current `CultureInfo`.

#### Remarks
For example, the three-letter abbreviation for English is "eng".

> **Note:**
> When communicating between processes or persisting data it is usually better to use the full `CultureInfo.Name`. Using just the language can lose context and data.

#### Examples
The following code example displays several properties of the neutral cultures.

> **Note:**
> The example displays the older `zh-CHS` and `zh-CHT` culture names with the 0x0004 and 0x7C04 culture identifiers, respectively. However, your Windows Vista applications should use the `zh-Hans` name instead of `zh-CHS` and the `zh-Hant` name instead of zh-CHT. The `zh-Hans` and `zh-Hant` names represent the current standard, and should be used unless you have a reason for using the older names.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DisplayName/getcultures.cs._

## CultureInfo.ThreeLetterWindowsLanguageName property

```csharp
public virtual string ThreeLetterWindowsLanguageName { get; }
```

Gets the three-letter code for the language as defined in the Windows API.

Returns: The three-letter code for the language as defined in the Windows API.

#### Remarks
This property returns the same value as the Windows API method `GetLocaleInfo` with the LOCALE_SABBREVLANGNAME value. For example, the three-letter code for English (United States) as defined in the Windows API is "enu".

> **Note:**
> When communicating between processes or persisting data it is usually better to use the full `CultureInfo.Name`. Using just the language can lose context and data.

#### Examples
The following code example displays several properties of the neutral cultures.

> **Note:**
> The `zh-Hans` and `zh-Hant` names represent the current standard for Chinese cultures. Older applications might reference the legacy `zh-CHS` and `zh-CHT` culture names, but these should be replaced with `zh-Hans` and `zh-Hant` respectively in modern applications.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DisplayName/getcultures.cs._

## CultureInfo.TwoLetterISOLanguageName property

```csharp
public virtual string TwoLetterISOLanguageName { get; }
```

Gets the ISO 639-1 two-letter or ISO 639-3 three-letter code for the language of the current `CultureInfo`.

Returns: The ISO 639-1 two-letter code for the language of the current `CultureInfo`. If no two-letter code is available, the three-letter code from ISO 639-3 is used.

#### Remarks
For example, the two-letter abbreviation for English is "en". The `TwoLetterISOLanguageName` property value for the invariant culture is "iv".

> **Note:**
> When communicating between processes or persisting data it is usually better to use the full `CultureInfo.Name`. Using just the language can lose context and data.

If ISO 639-1 does not define a two-letter language code for a particular culture, the `TwoLetterISOLanguageName` property returns a string that consists of three or more letters. For more information, see the example.

#### Examples
The following example lists the cultures whose `TwoLetterISOLanguageName` property does not consist of a two-letter language code.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/TwoLetterISOLanguageName/twoletterisolanguagename1.cs._

## CultureInfo.UseUserOverride property

```csharp
public bool UseUserOverride { get; }
```

Gets a value indicating whether the current `CultureInfo` object uses the user-selected culture settings.

Returns: `true` if the current `CultureInfo` uses the user-selected culture settings; otherwise, `false`.

#### Remarks
The user might choose to override some of the values associated with the current culture of Windows through the regional and language options portion of Control Panel. For example, the user might choose to display the date in a different format or to use a currency other than the default for the culture.

If `CultureInfo.UseUserOverride` is `true` and the specified culture matches the current culture of Windows, the `CultureInfo` uses those overrides, including user settings for the properties of the `DateTimeFormatInfo` instance returned by the `DateTimeFormat` property, and the properties of the `NumberFormatInfo` instance returned by the `NumberFormat` property. If the user settings are incompatible with the culture associated with the `CultureInfo`, for example, if the selected calendar is not one of the `CultureInfo.OptionalCalendars`, the results of the methods and the values of the properties are undefined.

This property is set when the `CultureInfo` is created.

## CultureInfo.ClearCachedData() method

```csharp
public void ClearCachedData ();
```

Refreshes cached culture-related information.

#### Remarks

Information, such as the default culture and format patterns, is cached the first time it's requested. That information can change, for example, when the user modifies the regional and language options portion of Control Panel. However, the `CultureInfo` class does not automatically detect changes in the system settings.

The `CultureInfo.ClearCachedData` method clears the cache of `CultureInfo` objects created by `CultureInfo.GetCultureInfo` and refreshes the information in the `CultureInfo.CurrentCulture`, `CultureInfo.CurrentUICulture`, and `RegionInfo.CurrentRegion` properties, based on the current system settings.

The `CultureInfo.ClearCachedData` method does not refresh the information in the `CurrentCulture` property for existing threads. However, future threads will have any new `CultureInfo` property values.

## CultureInfo.Clone() method

```csharp
public virtual object Clone ();
```

Creates a copy of the current `CultureInfo`.

Returns: A copy of the current `CultureInfo`.

#### Remarks
The clone is writable even if the original `CultureInfo` is read-only. Therefore, the properties of the clone can be modified.

A shallow copy of an object is a copy of the object only. If the object contains references to other objects, the shallow copy does not create copies of the referred objects. It refers to the original objects instead. In contrast, a deep copy of an object creates a copy of the object and a copy of everything directly or indirectly referenced by that object.

The `CultureInfo.Clone` method creates an enhanced shallow copy. The objects returned by the `CultureInfo.NumberFormat`, `CultureInfo.DateTimeFormat`, `CultureInfo.TextInfo`, and `CultureInfo.Calendar` properties are also copied. Consequently, the cloned `CultureInfo` object can modify its copied properties without affecting the original `CultureInfo` object.

#### Examples
The following code example shows that CultureInfo.Clone also clones the `DateTimeFormatInfo` and `NumberFormatInfo` instances associated with the `CultureInfo`.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Clone/yslin_cultureinfo_clone.cs._

## CultureInfo.CreateSpecificCulture(String) method

```csharp
public static System.Globalization.CultureInfo CreateSpecificCulture (string name);
```

Creates a `CultureInfo` that represents the specific culture that is associated with the specified name.

Parameters:

- `name`: A predefined `CultureInfo` name or the name of an existing `CultureInfo` object. `name` is not case-sensitive.

Returns: A `CultureInfo` object that represents:

The invariant culture, if `name` is an empty string ("").

-or-

The specific culture associated with `name`, if `name` is a neutral culture.

-or-

The culture specified by `name`, if `name` is already a specific culture.

Exceptions:

- `CultureNotFoundException`: `name` is not a valid culture name.

-or-

The culture specified by `name` does not have a specific culture associated with it.

-or-

The app is running in an environment where globalization-invariant mode is enabled, for example, some Docker containers, and a culture other than the invariant culture is specified.
- `NullReferenceException`: `name` is null.

#### Remarks
The `CultureInfo.CreateSpecificCulture` method wraps a call to the `%23ctor` constructor.

> **Note:**
> For a list of predefined culture names on Windows systems, see the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47. In addition, starting with Windows 10, `name` can be any valid BCP-47 language tag.

Cultures are grouped into three sets: the invariant culture, the neutral cultures, and the specific cultures. For more information, see the description of the `CultureInfo` class.

If the culture identifier of the specific culture returned by this method matches the culture identifier of the current Windows culture, this method creates a `CultureInfo` object that uses the Windows culture overrides. The overrides include user settings for the properties of the `DateTimeFormatInfo` object returned by the `DateTimeFormat` property and the `NumberFormatInfo` object returned by the `NumberFormat` property. To instantiate a `CultureInfo` object that with default culture settings rather than user overrides, call the `%23ctor` constructor with a value of `false` for the `useUserOverride` argument.

Although the `CultureInfo.CreateSpecificCulture` method name includes the term "Specific", remember that culture data can change between versions, or due to custom cultures, or because of user overrides. Use the invariant culture or binary or fixed forms for saving data.

#### Examples
The following example retrieves an array of `CultureInfo` objects that represent neutral cultures from the `CultureInfo.GetCultures` method and sorts the array. When it iterates the elements in the array, it passes the name of each neutral culture to the `CultureInfo.CreateSpecificCulture` method and displays the name of the specific culture returned by the method.

> **Note:**
> The example uses the `zh-CHS` and `zh-CHT` culture names. However, applications that target Windows Vista and later should use `zh-Hans` instead of `zh-CHS` and `zh-Hant` instead of zh-CHT. `zh-Hans` and `zh-Hant` represent the current standard and should be used unless you have a reason for using the older names.
>
> Note also that the results of the example may differ on an installation of Taiwanese Windows, where the input of a Chinese (Traditional) neutral culture (zh, zh-CHT, or zh-Hant) will return zh-TW.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CreateSpecificCulture/createspecificculture2.cs._

## CultureInfo.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Determines whether the specified object is the same culture as the current `CultureInfo`.

Parameters:

- `value`: The object to compare with the current `CultureInfo`.

Returns: `true` if `value` is the same culture as the current `CultureInfo`; otherwise, `false`.

#### Remarks
This method overrides `Object.Equals`.

Two `CultureInfo` objects are considered equal if their `CultureInfo.Name` and `CultureInfo.CompareInfo` properties are equal.
