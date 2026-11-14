---
title: "CultureInfo class (part 2 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CultureInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureInfo class (part 2 of 10)

## Remarks

The `CultureInfo` class provides information associated with a specific culture, such as language, sublanguage, country/region, calendar, and conventions. This class also provides access to culture-specific instances of the `DateTimeFormatInfo`, `NumberFormatInfo`, `CompareInfo`, and `TextInfo` objects. These objects contain the information required for culture-specific operations, such as casing, formatting dates and numbers, and comparing strings. The `CultureInfo` class is used either directly or indirectly by classes that format, parse, or manipulate culture-specific data, such as `String`, `DateTime`, `DateTimeOffset`, and the numeric types.

#### Culture names and identifiers

The `CultureInfo` class specifies a unique name for each culture, based on RFC 4646. The name is a combination of an ISO 639 two-letter or three-letter lowercase culture code associated with a language and an ISO 3166 two-letter uppercase subculture code associated with a country or region. In addition, for apps that are running under Windows 10 or later, culture names that correspond to valid BCP-47 language tags are supported.

> **Note:**
> When a culture name is passed to a class constructor or a method such as `CultureInfo.CreateSpecificCulture` or `CultureInfo`, its case is not significant.

The format for the culture name based on RFC 4646 is *`languagecode2`*-*`country/regioncode2`*, where *`languagecode2`* is the two-letter language code and *`country/regioncode2`* is the two-letter subculture code. Examples include `ja-JP` for Japanese (Japan) and `en-US` for English (United States). In cases where a two-letter language code is not available, a three-letter code as defined in ISO 639-3 is used.

Some culture names also specify an ISO 15924 script. For example, Cyrl specifies the Cyrillic script and Latn specifies the Latin script. A culture name that includes a script uses the pattern *`languagecode2`*-*`scripttag`*-*`country/regioncode2`*. An example of this type of culture name is `uz-Cyrl-UZ` for Uzbek (Cyrillic, Uzbekistan). On Windows operating systems before Windows Vista, a culture name that includes a script uses the pattern *`languagecode2`*-*`country/regioncode2`*-*`scripttag`*, for example, `uz-UZ-Cyrl` for Uzbek (Cyrillic, Uzbekistan).

A neutral culture is specified by only the two-letter, lowercase language code. For example, `fr` specifies the neutral culture for French, and `de` specifies the neutral culture for German.

> **Note:**
> There are two culture names that contradict this rule. The cultures Chinese (Simplified), named `zh-Hans`, and Chinese (Traditional), named `zh-Hant`, are neutral cultures. The culture names represent the current standard and should be used unless you have a reason for using the older names `zh-CHS` and `zh-CHT`.

A culture identifier is a standard international numeric abbreviation and has the components necessary to uniquely identify one of the installed cultures. Your application can use predefined culture identifiers or define custom identifiers.

Certain predefined culture names and identifiers are used by this and other classes in the `Globalization` namespace. For detailed culture information for Windows systems, see the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47.

The culture names and identifiers represent only a subset of cultures that can be found on a particular computer. Windows versions or service packs can change the available cultures. Applications can add custom cultures using the `CultureAndRegionInfoBuilder` class. Users can add their own custom cultures using the Microsoft Locale Builder tool. Microsoft Locale Builder is written in managed code using the `CultureAndRegionInfoBuilder` class.

Several distinct names are closely associated with a culture, notably the names associated with the following class members:

- `CultureInfo.ToString`
- `Name`
- `Name`

#### Invariant, neutral, and specific cultures

The cultures are generally grouped into three sets: invariant cultures, neutral cultures, and specific cultures.

An invariant culture is culture-insensitive. Your application specifies the invariant culture by name using an empty string ("") or by its identifier. `InvariantCulture` defines an instance of the invariant culture. It is associated with the English language but not with any country/region. It is used in almost any method in the `Globalization` namespace that requires a culture.

A neutral culture is a culture that is associated with a language but not with a country/region. A specific culture is a culture that is associated with a language and a country/region. For example, `fr` is the neutral name for the French culture, and `fr-FR` is the name of the specific French (France) culture. Note that Chinese (Simplified) and Chinese (Traditional) are also considered neutral cultures.

Creating an instance of a `CompareInfo` class for a neutral culture is not recommended because the data it contains is arbitrary. To display and sort data, specify both the language and region. Additionally, the `Name` property of a `CompareInfo` object created for a neutral culture returns only the country and does not include the region.

The defined cultures have a hierarchy in which the parent of a specific culture is a neutral culture and the parent of a neutral culture is the invariant culture. The `Parent` property contains the neutral culture associated with a specific culture. Custom cultures should define the `Parent` property in conformance with this pattern.

If the resources for a specific culture are not available in the operating system, the resources for the associated neutral culture are used. If the resources for the neutral culture are not available, the resources embedded in the main assembly are used. For more information on the resource fallback process, see Packaging and Deploying Resources.

The list of locales in the Windows API is slightly different from the list of cultures supported by .NET. If interoperability with Windows is required, for example, through the p/invoke mechanism, the application should use a specific culture that's defined for the operating system. Use of the specific culture ensures consistency with the equivalent Windows locale, which is identified with a locale identifier that is the same as `LCID`.

A `DateTimeFormatInfo` or a `NumberFormatInfo` can be created only for the invariant culture or for specific cultures, not for neutral cultures.

If `Calendar` is the `TaiwanCalendar` but the `CurrentCulture` is not set to `zh-TW`, then `NativeCalendarName`, `DateTimeFormatInfo.GetEraName`, and `DateTimeFormatInfo.GetAbbreviatedEraName` return an empty string ("").

#### Custom cultures

On Windows, you can create custom locales. For more information, see Custom locales.

#### CultureInfo and cultural data

.NET derives its cultural data from two different sources, depending on the OS:

- On Unix platforms or Windows 10 and later versions, cultural data is provided by the International Components for Unicode (ICU) Library. The specific version of the ICU Library depends on the individual operating system.
- On Windows 8.1 and earlier versions, cultural data is provided by the Windows operating system.

Because of this, a culture available on a particular .NET implementation, platform, or version may not be available on a different .NET implementation, platform, or version.

Some `CultureInfo` objects differ depending on the underlying platform. In particular, `zh-CN`, or Chinese (Simplified, China) and `zh-TW`, or Chinese (Traditional, Taiwan), are available cultures on Windows systems, but they are aliased cultures on Unix systems. "zh-CN" is an alias for the "zh-Hans-CN" culture, and "zh-TW" is an alias for the "zh-Hant-TW" culture. Aliased cultures are not returned by calls to the `CultureInfo.GetCultures` method and may have different property values, including different `Parent` cultures, than their Windows counterparts. For the `zh-CN` and `zh-TW` cultures, these differences include the following:

- On Windows systems, the parent culture of the "zh-CN" culture is "zh-Hans", and the parent culture of the "zh-TW" culture is "zh-Hant". The parent culture of both these cultures is "zh". On Unix systems, the parents of both cultures are "zh". This means that, if you don't provide culture-specific resources for the "zh-CN" or "zh-TW" cultures but do provide a resources for the neutral "zh-Hans" or "zh-Hant" culture, your application will load the resources for the neutral culture on Windows but not on Unix. On Unix systems, you must explicitly set the thread's `CurrentUICulture` to either "zh-Hans" or "zh-Hant".

- On Windows systems, calling `CultureInfo.Equals` on an instance that represents the "zh-CN" culture and passing it a "zh-Hans-CN" instance returns `true`. On Unix systems, the method call returns `false`. This behavior also applies to calling `CultureInfo.Equals` on a "zh-TW" `CultureInfo` instance and passing it a "zh-Hant-Tw" instance.

#### Dynamic culture data

Except for the invariant culture, culture data is dynamic. This is true even for the predefined cultures. For example, countries or regions adopt new currencies, change their spellings of words, or change their preferred calendar, and culture definitions change to track this. Custom cultures are subject to change without notice, and any specific culture might be overridden by a custom replacement culture. Also, as discussed below, an individual user can override cultural preferences. Applications should always obtain culture data at runtime.

> **Caution:**
> When saving data, your application should use the invariant culture, a binary format, or a specific culture-independent format. Data saved according to the current values associated with a particular culture, other than the invariant culture, might become unreadable or might change in meaning if that culture changes.

#### The current culture and current UI culture

Every thread in a .NET application has a current culture and a current UI culture. The current culture determines the formatting conventions for dates, times, numbers, and currency values, the sort order of text, casing conventions, and the ways in which strings are compared. The current UI culture is used to retrieve culture-specific resources at runtime.

> **Note:**
> For information on how the current and current UI culture is determined on a per-thread basis, see the Culture and threads section. For information on how the current and current UI culture is determined on threads performing task-based asynchronous operations, see the Culture and task-based asynchronous operations section.

For more detailed information on the current culture, see the `CurrentCulture` property. For more detailed information on the current UI culture, see the `CurrentUICulture` property topic.

#### Retrieve the current and current UI cultures

You can get a `CultureInfo` object that represents the current culture in either of two ways:

- By retrieving the value of the `CurrentCulture` property.
- By retrieving the value of the Thread.CurrentThread.CurrentCulture property.

The following example retrieves both property values, compares them to show that they are equal, and displays the name of the current culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/Current1.cs._
You can get a `CultureInfo` object that represents the current UI culture in either of two ways:

- By retrieving the value of the `CurrentUICulture` property.

- By retrieving the value of the Thread.CurrentThread.CurrentUICulture property.

The following example retrieves both property values, compares them to show that they are equal, and displays the name of the current UI culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/CurrentUI1.cs._
#### Set the current and current UI cultures

To change the culture and UI culture of a thread, do the following:

1. Instantiate a `CultureInfo` object that represents that culture by calling a `CultureInfo` class constructor and passing it the name of the culture. The `%23ctor` constructor instantiates a `CultureInfo` object that reflects user overrides if the new culture is the same as the current Windows culture. The `%23ctor` constructor allows you to specify whether the newly instantiated `CultureInfo` object reflects user overrides if the new culture is the same as the current Windows culture.

2. Assign the `CultureInfo` object to the `CurrentCulture` or `CurrentUICulture` property.

The following example retrieves the current culture. If it is anything other than the French (France) culture, it changes the current culture to French (France). Otherwise, it changes the current culture to French (Luxembourg).

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/Change1.cs._
The following example retrieves the current culture. If it is anything other the Slovenian (Slovenia) culture, it changes the current culture to Slovenian (Slovenia). Otherwise, it changes the current culture to Croatian (Croatia).

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/ChangeUI1.cs._
#### Get all cultures

You can retrieve an array of specific categories of cultures or of all the cultures available on the local computer by calling the `CultureInfo.GetCultures` method. For example, you can retrieve custom cultures, specific cultures, or neutral cultures either alone or in combination.

The following example calls the `CultureInfo.GetCultures` method twice, first with the `CultureTypes` enumeration member to retrieve all custom cultures, and then with the `CultureTypes` enumeration member to retrieve all replacement cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/GetCultures1.cs._
#### Culture and threads

When a new application thread is started, its current culture and current UI culture are defined by the current system culture, and not by the current thread culture. The following example illustrates the difference. It sets the current culture and current UI culture of an application thread to the French (France) culture (fr-FR). If the current culture is already fr-FR, the example sets it to the English (United States) culture (en-US). It displays three random numbers as currency values and then creates a new thread, which, in turn, displays three more random numbers as currency values. But as the output from the example shows, the currency values displayed by the new thread do not reflect the formatting conventions of the French (France) culture, unlike the output from the main application thread.
