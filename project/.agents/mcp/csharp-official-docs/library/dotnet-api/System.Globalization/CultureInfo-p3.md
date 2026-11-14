---
title: "CultureInfo class (part 3 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CultureInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureInfo class (part 3 of 10)

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/defaultthread1.cs._
You can set the culture and UI culture of all threads in an application domain by assigning a `CultureInfo` object that represents that culture to the `DefaultThreadCurrentCulture` and `DefaultThreadCurrentUICulture` properties. The following example uses these properties to ensure that all threads in the default application domain share the same culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/setthreads1.cs._
When you assign values to the `DefaultThreadCurrentCulture` and `DefaultThreadCurrentUICulture` properties, the culture and UI culture of the threads in the application domain also change if they have not explicitly been assigned a culture. However, these threads reflect the new culture settings only while they execute in the current application domain. If these threads execute in another application domain, their culture becomes the default culture defined for that application domain. As a result, we recommend that you always set the culture of the main application thread, and not rely on the `DefaultThreadCurrentCulture` and `DefaultThreadCurrentUICulture` properties to change it.

#### Culture and task-based asynchronous operations

The task-based asynchronous programming pattern uses `Task` and `Task<T>` objects to asynchronously execute delegates on thread pool threads. The specific thread on which a particular task runs is not known in advance, but is determined only at runtime.

Culture is part of an asynchronous operation's context. In other words, asynchronous operations by default inherit the values of the `CurrentCulture` and `CurrentUICulture` properties of the thread from which they are launched. If the current culture or current UI culture differs from the system culture, the current culture crosses thread boundaries and becomes the current culture of the thread pool thread that is executing an asynchronous operation.

The following example provides a simple illustration. The example defines a `Func<T>` delegate, `formatDelegate`, that returns some numbers formatted as currency values. The example changes the current system culture to either French (France) or, if French (France) is already the current culture, English (United States). It then:

- Invokes the delegate directly so that it runs synchronously on the main app thread.
- Creates a task that executes the delegate asynchronously on a thread pool thread.
- Creates a task that executes the delegate synchronously on the main app thread by calling the `Task.RunSynchronously` method.

As the output from the example shows, when the current culture is changed to French (France), the current culture of the thread from which tasks are invoked asynchronously becomes the current culture for that asynchronous operation.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/asyncculture1.cs._
#### CultureInfo object serialization

When a `CultureInfo` object is serialized, all that is actually stored is `Name` and `CultureInfo.UseUserOverride`. It is successfully deserialized only in an environment where that `Name` has the same meaning. The following three examples show why this is not always the case:

- If the `CultureTypes` property value is `InstalledWin32Cultures`, and if that culture was first introduced in a particular version of the Windows operating system, it is not possible to deserialize it on an earlier version of Windows. For example, if a culture was introduced in Windows 10, it cannot be deserialized on Windows 8.

- If the `CultureTypes` value is `UserCustomCulture`, and the computer on which it is deserialized does not have this user custom culture installed, it is not possible to deserialize it.

- If the `CultureTypes` value is `ReplacementCultures`, and the computer on which it is deserialized does not have this replacement culture, it deserializes to the same name, but not all of the same characteristics. For example, if `en-US` is a replacement culture on computer A, but not on computer B, and if a `CultureInfo` object referring to this culture is serialized on computer A and deserialized on computer B, then none of the custom characteristics of the culture are transmitted. The culture deserializes successfully, but with a different meaning.

#### Control Panel overrides

The user might choose to override some of the values associated with the current culture of Windows through the regional and language options portion of Control Panel. For example, the user might choose to display the date in a different format or to use a currency other than the default for the culture. In general, your applications should honor these user overrides.

If `CultureInfo.UseUserOverride` is `true` and the specified culture matches the current culture of Windows, the `CultureInfo` uses those overrides, including user settings for the properties of the `DateTimeFormatInfo` instance returned by the `DateTimeFormat` property, and the properties of the `NumberFormatInfo` instance returned by the `NumberFormat` property. If the user settings are incompatible with the culture associated with the `CultureInfo`, for example, if the selected calendar is not one of the `OptionalCalendars`, the results of the methods and the values of the properties are undefined.

#### Alternate sort orders

Some cultures support more than one sort order. For example:

- The Spanish (Spain) culture has two sort orders: the default international sort order, and the traditional sort order. When you instantiate a `CultureInfo` object with the `es-ES` culture name, the international sort order is used. When you instantiate a `CultureInfo` object with the `es-ES-tradnl` culture name, the traditional sort order is used.
- The `zh-CN` (Chinese (Simplified, PRC)) culture supports two sort orders:  by pronunciation (the default) and by stroke count. When you instantiate a `CultureInfo` object with the `zh-CN` culture name, the default sort order is used. When you instantiate a `CultureInfo` object with a local identifier of 0x00020804, strings are sorted by stroke count.

The following table lists the cultures that support alternate sort orders and the identifiers for the default and alternate sort orders.

| Culture name | Culture                 | Default sort name and identifier | Alternate sort name and identifier    |
|--------------|-------------------------|----------------------------------|---------------------------------------|
| es-ES        | Spanish (Spain)         | International: 0x00000C0A        | Traditional: 0x0000040A               |
| zh-TW        | Chinese (Taiwan)        | Stroke Count: 0x00000404         | Bopomofo: 0x00030404                  |
| zh-CN        | Chinese (PRC)           | Pronunciation: 0x00000804        | Stroke Count: 0x00020804              |
| zh-HK        | Chinese (Hong Kong SAR) | Stroke Count: 0x00000c04         | Stroke Count: 0x00020c04              |
| zh-SG        | Chinese (Singapore)     | Pronunciation: 0x00001004        | Stroke Count: 0x00021004              |
| zh-MO        | Chinese (Macao SAR)     | Pronunciation: 0x00001404        | Stroke Count: 0x00021404              |
| ja-JP        | Japanese (Japan)        | Default: 0x00000411              | Unicode: 0x00010411                   |
| ko-KR        | Korean (Korea)          | Default: 0x00000412              | Korean Xwansung - Unicode: 0x00010412 |
| de-DE        | German (Germany)        | Dictionary: 0x00000407           | Phone Book Sort DIN: 0x00010407       |
| hu-HU        | Hungarian (Hungary)     | Default: 0x0000040e              | Technical Sort: 0x0001040e            |
| ka-GE        | Georgian (Georgia)      | Traditional: 0x00000437          | Modern Sort: 0x00010437               |

#### Example

The following example shows how to create a `CultureInfo` object for Spanish (Spain) with the international sort and another `CultureInfo` object with the traditional sort.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/spanishspain.cs._

## CultureInfo.CultureInfo(Int32) constructor

```csharp
public CultureInfo (int culture);
```

Initializes a new instance of the `CultureInfo` class based on the culture specified by the culture identifier.

Parameters:

- `culture`: A predefined `CultureInfo` identifier, `CultureInfo.LCID` property of an existing `CultureInfo` object, or Windows-only culture identifier.

Exceptions:

- `ArgumentOutOfRangeException`: `culture` is less than zero.
- `CultureNotFoundException`: `culture` is not a valid culture identifier. See the Notes to Callers section for more information.

#### Remarks

Predefined culture identifiers for cultures available on Windows system are listed in the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47.

In most cases, the `culture` parameter is mapped to the corresponding National Language Support (NLS) locale identifier. The value of the `culture` parameter becomes the value of the `LCID` property of the new `CultureInfo`.

We recommend that you call the locale name constructor `CultureInfo.%23ctor`, because locale names are preferable to LCIDs. For custom locales, a locale name is required.

The user might choose to override some of the values associated with the current culture of Windows through the regional and language options portion of Control Panel. For example, the user might choose to display the date in a different format or to use a currency other than the default for the culture. If the specified culture identifier matches the culture identifier of the current Windows culture, this constructor creates a `CultureInfo` that uses those overrides, including user settings for the properties of the `DateTimeFormatInfo` instance returned by the `DateTimeFormat` property, and the properties of the `NumberFormatInfo` instance returned by the `NumberFormat` property. If the user settings are incompatible with the culture associated with the `CultureInfo` (for example, if the selected calendar is not one of the `CultureInfo.OptionalCalendars`) the results of the methods and the values of the properties are undefined.

If the specified culture identifier does not match the identifier of the current Windows culture, this constructor creates a `CultureInfo` that uses the default values for the specified culture.

The `UseUserOverride` property is always set to `true`.

For example, suppose that Arabic (Saudi Arabia) is the current Windows culture and the user has changed the calendar from Hijri to Gregorian.

- With `CultureInfo("0x0401")` (culture name ar-SA), `CultureInfo.Calendar` is set to `GregorianCalendar` (which is the user setting) and `CultureInfo.UseUserOverride` is set to `true`.
- With `CultureInfo("0x041E")` (culture name th-TH), `CultureInfo.Calendar` is set to `ThaiBuddhistCalendar` (which is the default calendar for th-TH) and `CultureInfo.UseUserOverride` is set to `true`.

> **Note:**
> For backwards compatibility, a culture constructed using a `culture` parameter of 0x0004 or 0x7c04 has a `Name` property of `zh-CHS` or `zh-CHT`, respectively. You should instead prefer to construct the culture using the current standard culture names of `zh-Hans` or `zh-Hant`, unless you have a reason for using the older names.

> **Note:**
> LCIDs are being deprecated, and implementers are strongly encouraged to use newer versions of APIs that support BCP 47 locale names instead. Each LCID can be represented by a BCP 47 locale name, but the reverse is not true. The LCID range is restricted and unable to uniquely identify all the possible combinations of language and region.
