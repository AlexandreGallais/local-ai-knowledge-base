---
title: "CultureInfo class (part 4 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CultureInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureInfo class (part 4 of 10)

## CultureInfo.CultureInfo(String) constructor

```csharp
public CultureInfo (string name);
```

Initializes a new instance of the `CultureInfo` class based on the culture specified by name.

Parameters:

- `name`: A predefined `CultureInfo` name, `CultureInfo.Name` of an existing `CultureInfo`, or Windows-only culture name. `name` is not case-sensitive.

Exceptions:

- `ArgumentNullException`: `name` is null.
- `CultureNotFoundException`: `name` is not a valid culture name. For more information, see the Notes to Callers section.

#### Remarks

For a list of predefined culture names on Windows systems, see the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47. In addition, starting with Windows 10, `name` can be any valid BCP-47 language tag.

If `name` is `Empty`, the constructor creates an instance of the invariant culture; this is equivalent to retrieving the value of the `InvariantCulture` property.

The user might choose to override some of the values associated with the current culture of Windows through the regional and language options portion of Control Panel. For example, the user might choose to display the date in a different format or to use a currency other than the default for the culture. If the culture identifier associated with `name` matches the culture identifier of the current Windows culture, this constructor creates a `CultureInfo` object that uses those overrides, including user settings for the properties of the `DateTimeFormatInfo` instance returned by the `DateTimeFormat` property, and the properties of the `NumberFormatInfo` instance returned by the `NumberFormat` property. If the user settings are incompatible with the culture associated with the `CultureInfo`, for example, if the selected calendar is not one of the `CultureInfo.OptionalCalendars`, the results of the methods and the values of the properties are undefined.

If the culture identifier associated with `name` does not match the culture identifier of the current Windows culture, this constructor creates a `CultureInfo` object that uses the default values for the specified culture.

The `UseUserOverride` property is always set to `true`.

For example, suppose that Arabic (Saudi Arabia) is the current culture of Windows and the user changed the calendar from Hijri to Gregorian:

- With `CultureInfo("ar-SA")`, `CultureInfo.Calendar` is set to `GregorianCalendar` (which is the user setting) and `CultureInfo.UseUserOverride` is set to `true`.
- With `CultureInfo("th-TH")`, `CultureInfo.Calendar` is set to `ThaiBuddhistCalendar` (which is the default calendar for th-TH) and `CultureInfo.UseUserOverride` is set to `true`.

The `LCID` property of the new `CultureInfo` is set to the culture identifier associated with the specified name.

#### Examples
The following example retrieves the current culture. If it is anything other than the French (France) culture, it calls the `%23ctor` constructor to instantiate a `CultureInfo` object that represents the French (France) culture and makes it the current culture. Otherwise, it instantiates a `CultureInfo` object that represents the French (Luxembourg) culture and makes it the current culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/Change1.cs._

## CultureInfo.CultureInfo(Int32, Boolean) constructor

```csharp
public CultureInfo (int culture, bool useUserOverride);
```

Initializes a new instance of the `CultureInfo` class based on the culture specified by the culture identifier and on a value that specifies whether to use the user-selected culture settings from Windows.

Parameters:

- `culture`: A predefined `CultureInfo` identifier, `CultureInfo.LCID` property of an existing `CultureInfo` object, or Windows-only culture identifier.
- `useUserOverride`: `true` to use the user-selected culture settings (Windows only); `false` to use the default culture settings.

Exceptions:

- `ArgumentOutOfRangeException`: `culture` is less than zero.
- `CultureNotFoundException`: `culture` is not a valid culture identifier. See the Notes to Callers section for more information.

#### Remarks

Predefined culture identifiers available on Windows systems are listed in the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47.

In most cases, the `culture` parameter is mapped to the corresponding National Language Support (NLS) locale identifier. The value of the `culture` parameter becomes the value of the `LCID` property of the new `CultureInfo`.

We recommend that you call the locale name constructor `CultureInfo.%23ctor`, because locale names are preferable to LCIDs. For custom locales, a locale name is required.

The user might choose to override some of the values associated with the current culture of Windows through the regional and language options portion of Control Panel. For example, the user might choose to display the date in a different format or to use a currency other than the default for the culture.

Applications should typically not disallow user overrides. Disallowing overrides does not itself guarantee data stability. For more information, see the blog entry Culture data shouldn't be considered stable (except for Invariant).

If the `UseUserOverride` property is set to `true` and the specified culture identifier matches the identifier of the current Windows culture, this constructor creates a `CultureInfo` that uses those overrides, including user settings for the properties of the `DateTimeFormatInfo` instance returned by the `DateTimeFormat` property, and the properties of the `NumberFormatInfo` instance returned by the `NumberFormat` property. If the user settings are incompatible with the culture associated with the `CultureInfo`, for example, if the selected calendar is not one of the `CultureInfo.OptionalCalendars`, the results of the methods and the values of the properties are undefined.

Otherwise, this constructor creates a `CultureInfo` that uses the default values for the specified culture.

The value of the `useUserOverride` parameter becomes the value of the `UseUserOverride` property.

For example, suppose that Arabic (Saudi Arabia) is the current culture of Windows and the user has changed the calendar from Hijri to Gregorian.

- With `CultureInfo("0x0401", true)` (culture name ar-SA), `CultureInfo.Calendar` is set to `GregorianCalendar` (which is the user setting) and `CultureInfo.UseUserOverride` is set to `true`.
- With `CultureInfo("0x0401", false)` (culture name ar-SA), `CultureInfo.Calendar` is set to `HijriCalendar` (which is the default calendar for ar-SA) and `CultureInfo.UseUserOverride` is set to `false`.
- With `CultureInfo("0x041E", true)` (culture name th-TH), `CultureInfo.Calendar` is set to `ThaiBuddhistCalendar` (which is the default calendar for th-TH) and `CultureInfo.UseUserOverride` is set to `true`.
- With `CultureInfo("0x041E", false)` (culture name th-TH), `CultureInfo.Calendar` is set to `ThaiBuddhistCalendar` (which is the default calendar for th-TH) and `CultureInfo.UseUserOverride` is set to `false`.

> **Note:**
> For backwards compatibility, a culture constructed using a `culture` parameter of 0x0004 or 0x7c04 will have a `Name` property of zh-CHS or zh-CHT, respectively. You should instead prefer to construct the culture using the current standard culture names of `zh-Hans` or zh-Hant, unless you have a reason for using the older names.

> **Note:**
> LCIDs are being deprecated, and implementers are strongly encouraged to use newer versions of APIs that support BCP 47 locale names instead. Each LCID can be represented by a BCP 47 locale name, but the reverse is not true. The LCID range is restricted and unable to uniquely identify all the possible combinations of language and region.

## CultureInfo.CultureInfo(String, Boolean) constructor

```csharp
public CultureInfo (string name, bool useUserOverride);
```

Initializes a new instance of the `CultureInfo` class based on the culture specified by name and on a value that specifies whether to use the user-selected culture settings from Windows.

Parameters:

- `name`: A predefined `CultureInfo` name, `CultureInfo.Name` of an existing `CultureInfo`, or Windows-only culture name. `name` is not case-sensitive.
- `useUserOverride`: `true` to use the user-selected culture settings (Windows only); `false` to use the default culture settings.

Exceptions:

- `ArgumentNullException`: `name` is null.
- `CultureNotFoundException`: `name` is not a valid culture name. See the Notes to Callers section for more information.

#### Remarks

For a list of predefined culture names, see the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47. In addition, starting with Windows 10, `name` can be any valid BCP-47 language tag.

If `name` is `Empty`, the constructor creates an instance of the invariant culture; this is equivalent to retrieving the value of the `InvariantCulture` property.

The user might choose to override some of the values associated with the current Windows culture through the regional and language options portion of Control Panel. For example, the user might choose to display the date in a different format or to use a currency other than the default for the culture.

Applications should typically not disallow user overrides. Disallowing overrides does not itself guarantee data stability. For more information, see the blog entry Culture data shouldn't be considered stable (except for Invariant).

If the `UseUserOverride` property is set to `true` and the culture identifier associated with the specified culture name matches the culture identifier of the current Windows culture, this constructor creates a `CultureInfo` that uses those overrides, including user settings for the properties of the `DateTimeFormatInfo` instance returned by the `DateTimeFormat` property, and the properties of the `NumberFormatInfo` instance returned by the `NumberFormat` property. If the user settings are incompatible with the culture associated with the `CultureInfo`, for example, if the selected calendar is not one of the `CultureInfo.OptionalCalendars`, the results of the methods and the values of the properties are undefined.

Otherwise, this constructor creates a `CultureInfo` that uses the default values for the specified culture.

The value of the `useUserOverride` parameter becomes the value of the `UseUserOverride` property.

For example, suppose that Arabic (Saudi Arabia) is the current culture of Windows and the user changed the calendar from Hijri to Gregorian.

- With `CultureInfo("ar-SA", true)`, `CultureInfo.Calendar` is set to `GregorianCalendar` (which is the user setting) and `CultureInfo.UseUserOverride` is set to `true`.

- With `CultureInfo("ar-SA", false)`, `CultureInfo.Calendar` is set to `HijriCalendar` (which is the default calendar for ar-SA) and `CultureInfo.UseUserOverride` is set to `false`.

- With `CultureInfo("th-TH", true)`, `CultureInfo.Calendar` is set to `ThaiBuddhistCalendar` (which is the default calendar for th-TH) and `CultureInfo.UseUserOverride` is set to `true`.

- With `CultureInfo("th-TH", false)`, `CultureInfo.Calendar` is set to `ThaiBuddhistCalendar` (which is the default calendar for th-TH) and `CultureInfo.UseUserOverride` is set to `false`.

The `LCID` property of the new `CultureInfo` is set to the culture identifier associated with the specified name.

## CultureInfo.Calendar property

```csharp
public virtual System.Globalization.Calendar Calendar { get; }
```

Gets the default calendar used by the culture.

Returns: A `Calendar` that represents the default calendar used by the culture.

#### Remarks
The user might choose to override some of the values associated with the current culture of Windows through the regional and language options portion of Control Panel. For example, the user might choose to display the date in a different format or to use a currency other than the default for the culture.

If `CultureInfo.UseUserOverride` is `true` and the specified culture matches the current culture of Windows, the `CultureInfo` uses those overrides, including user settings for the properties of the `DateTimeFormatInfo` instance returned by the `DateTimeFormat` property, and the properties of the `NumberFormatInfo` instance returned by the `NumberFormat` property. If the user settings are incompatible with the culture associated with the `CultureInfo`, for example, if the selected calendar is not one of the `CultureInfo.OptionalCalendars`, the results of the methods and the values of the properties are undefined.

Therefore, if `CultureInfo.UseUserOverride` is `true`, the value of this property might be different from the default calendar used by the culture.

Your application changes the calendar used by the current `CultureInfo` by setting the `Calendar` property of `CultureInfo.DateTimeFormat`, which is an instance of the `DateTimeFormatInfo` class. The new calendar must be one of the calendars listed in `CultureInfo.OptionalCalendars`. `CultureInfo.DateTimeFormat` also includes other properties that customize the date and time formatting associated with that `DateTimeFormatInfo.Calendar`.
