---
title: "DateTimeFormatInfo class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/DateTimeFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeFormatInfo class

Namespace: `System.Globalization`

```csharp
public sealed class DateTimeFormatInfo : ICloneable, IFormatProvider
```

Provides culture-specific information about the format of date and time values.

The properties of the `DateTimeFormatInfo` class contain culture-specific information for formatting or parsing date and time values such as the following:

- The patterns used to format date values.
- The patterns used to format time values.
- The names of the days of the week.
- The names of the months of the year.
- The A.M. and P.M. designators used in time values.
- The calendar in which dates are expressed.

#### Instantiate a DateTimeFormatInfo object

A `DateTimeFormatInfo` object can represent the formatting conventions of the invariant culture, a specific culture, a neutral culture, or the current culture. This section discusses how to instantiate each type of `DateTimeFormatInfo` object.

#### Instantiate a DateTimeFormatInfo object for the invariant culture

The invariant culture represents a culture that is culture-insensitive. It is based on the English language, but not on any specific English-speaking country/region. Although the data of specific cultures can be dynamic and can change to reflect new cultural conventions or user preferences, the data of the invariant culture does not change. You can instantiate a `DateTimeFormatInfo` object that represents the formatting conventions of the invariant culture in the following ways:

- By retrieving the value of the `InvariantInfo` property. The returned `DateTimeFormatInfo` object is read-only.
- By calling the parameterless `DateTimeFormatInfo.%23ctor` constructor. The returned `DateTimeFormatInfo` object is read/write.
- By retrieving the value of the `DateTimeFormat` property from the `CultureInfo` object that is returned by the `InvariantCulture` property. The returned `DateTimeFormatInfo` object is read-only.

The following example uses each of these methods to instantiate a `DateTimeFormatInfo` object that represents the invariant culture. It then indicates whether the object is read-only.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/create1.cs._
#### Instantiate a DateTimeFormatInfo object for a specific culture

A specific culture represents a language that is spoken in a particular country/region. For example, en-US is a specific culture that represents the English language spoken in the United States, and en-CA is a specific culture that represents the English language spoken in Canada. You can instantiate a `DateTimeFormatInfo` object that represents the formatting conventions of a specific culture in the following ways:

- By calling the `GetCultureInfo` method and retrieving the value of the returned `CultureInfo` object's `DateTimeFormat` property. The returned `DateTimeFormatInfo` object is read-only.

- By passing the static `DateTimeFormatInfo.GetInstance` method a `CultureInfo` object that represents the culture whose `DateTimeFormatInfo` object you want to retrieve. The returned `DateTimeFormatInfo` object is read/write.

- By calling the static `CultureInfo.CreateSpecificCulture` method and retrieving the value of the returned `CultureInfo` object's `DateTimeFormat` property. The returned `DateTimeFormatInfo` object is read/write.

- By calling the `CultureInfo.%23ctor` class constructor and retrieving the value of the returned `CultureInfo` object's `DateTimeFormat` property. The returned `DateTimeFormatInfo` object is read/write.

The following example illustrates each of these ways to instantiate a `DateTimeFormatInfo` object and indicates whether the resulting object is read-only.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/create1.cs._
#### Instantiate a DateTimeFormatInfo object for a neutral culture

A neutral culture represents a culture or language that is independent of a country/region; it is typically the parent of one or more specific cultures. For example, Fr is a neutral culture for the French language and the parent of the fr-FR culture. You can instantiate a `DateTimeFormatInfo` object that represents the formatting conventions of a neutral culture in the same ways that you create a `DateTimeFormatInfo` object that represents the formatting conventions of a specific culture. In addition, you can retrieve a neutral culture's `DateTimeFormatInfo` object by retrieving a neutral culture from a specific culture's `Parent` property and retrieving the `DateTimeFormatInfo` object returned by its `DateTimeFormat` property. Unless the parent culture represents the invariant culture, the returned `DateTimeFormatInfo` object is read/write. The following example illustrates these ways of instantiating a `DateTimeFormatInfo` object that represents a neutral culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/create1.cs._
However, a neutral culture lacks culture-specific formatting information, because it is independent of a specific country/region. Instead of populating the `DateTimeFormatInfo` object with generic values, .NET returns a `DateTimeFormatInfo` object that reflects the formatting conventions of a specific culture that is a child of the neutral culture. For example, the `DateTimeFormatInfo` object for the neutral en culture reflects the formatting conventions of the en-US culture, and the `DateTimeFormatInfo` object for the fr culture reflects the formatting conventions of the fr-FR culture.

You can use code like the following to determine which specific culture's formatting conventions a neutral culture represents. The example uses reflection to compare the `DateTimeFormatInfo` properties of a neutral culture with the properties of a specific child culture. It considers two calendars to be equivalent if they are the same calendar type and, for Gregorian calendars, if their `CalendarType` properties have identical values.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/instantiate6.cs._
#### Instantiate a DateTimeFormatInfo object for the current culture

You can instantiate a `DateTimeFormatInfo` object that represents the formatting conventions of the current culture in the following ways:

- By retrieving the value of the `CurrentInfo` property. The returned `DateTimeFormatInfo` object is read-only.

- By retrieving the value of the `DateTimeFormat` property from the `CultureInfo` object that is returned by the `CurrentCulture` property. The returned `DateTimeFormatInfo` object is read-only.

- By calling the `NumberFormatInfo.GetInstance` method with a `CultureInfo` object that represents the current culture. The returned `DateTimeFormatInfo` object is read-only.

The following example uses each of these methods to instantiate a `DateTimeFormatInfo` object that represents the formatting conventions of the current culture. It then indicates whether the object is read-only.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/create2.cs._
You can create a writable `DateTimeFormatInfo` object that represents the conventions of the current culture in one of these ways:

- By retrieving a `DateTimeFormatInfo` object in any of the three previous ways and calling the `DateTimeFormatInfo.Clone` method on the returned `DateTimeFormatInfo` object. This creates a copy of the original `DateTimeFormatInfo` object, except that its `IsReadOnly` property is `false`.

- By calling the `CultureInfo.CreateSpecificCulture` method to create a `CultureInfo` object that represents the current culture, and then using its `DateTimeFormat` property to retrieve the `DateTimeFormatInfo` object.

The following example illustrates each way of instantiating a read/write `DateTimeFormatInfo` object and displays the value of its `IsReadOnly` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/instantiate2.cs._
In Windows, the user can override some of the `DateTimeFormatInfo` property values used in formatting and parsing operations through the **Region and Language** application in Control Panel. For example, a user whose culture is English (United States) might choose to display long time values using a 24-hour clock (in the format HH:mm:ss) instead of the default 12-hour clock (in the format h:mm:ss tt). The `DateTimeFormatInfo` objects retrieved in the ways discussed previously all reflect these user overrides. If this is undesirable, you can create a `NumberFormatInfo` object that does not reflect user overrides (and is also read/write instead of read-only) by calling the `%23ctor` constructor and supplying a value of `false` for the `useUserOverride` argument. The following example illustrates this for a system whose current culture is English (United States) and whose long time pattern has been changed from the default of h:mm:ss tt to HH:mm:ss.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/instantiate3.cs._
#### DateTimeFormatInfo and dynamic data

The culture-specific data for formatting date and time values provided by the `DateTimeFormatInfo` class is dynamic, just like cultural data provided by the `CultureInfo` class. You should not make any assumptions about the stability of values for `DateTimeFormatInfo` objects that are associated with particular `CultureInfo` objects. Only the data provided by the invariant culture and its associated `DateTimeFormatInfo` object is stable. Other data can change between application sessions or even while your application is running. There are four major sources of change:

- System updates. Cultural preferences such as the preferred calendar or customary date and time formats change over time. When this happens, Windows Update includes changes to the `DateTimeFormatInfo` property value for a particular culture.

- Replacement cultures. The `CultureAndRegionInfoBuilder` class can be used to replace the data of an existing culture.

- Cascading changes to property values. A number of culture-related properties can change at runtime, which, in turn, causes `DateTimeFormatInfo` data to change. For example, the current culture can be changed either programmatically or through user action. When this happens, the `DateTimeFormatInfo` object returned by the `CurrentInfo` property changes to an object associated with the current culture. Similarly, a culture's calendar can change, which can result in changes to numerous `DateTimeFormatInfo` property values.

- User preferences. Users of your application might choose to override some of the values associated with the current system culture through the regional and language options in Control Panel. For example, users might choose to display the date in a different format. If the `UseUserOverride` property is set to `true`, the properties of the `DateTimeFormatInfo` object is also retrieved from the user settings. If the user settings are incompatible with the culture associated with the `CultureInfo` object (for example, if the selected calendar is not one of the calendars indicated by the `OptionalCalendars` property), the results of the methods and the values of the properties are undefined.

To minimize the possibility of inconsistent data, all user-overridable properties of a `DateTimeFormatInfo` object are initialized when the object is created. There is still a possibility of inconsistency, because neither object creation nor the user override process is atomic and the relevant values can change during object creation. However, this situation should be extremely rare.

You can control whether user overrides are reflected in `DateTimeFormatInfo` objects that represent the same culture as the system culture. The following table lists the ways in which a `DateTimeFormatInfo` object can be retrieved and indicates whether the resulting object reflects user overrides.

|Source of CultureInfo and DateTimeFormatInfo object|Reflects user overrides|
|---------------------------------------------------------|-----------------------------|
|`CultureInfo.CurrentCulture.DateTimeFormat` property|Yes|
|`CurrentInfo` property|Yes|
|`CultureInfo.CreateSpecificCulture` method|Yes|
|`CultureInfo.GetCultureInfo` method|No|
|`%23ctor` constructor|Yes|
|`%23ctor` constructor|Depends on value of `useUserOverride` parameter|

Unless there is a compelling reason to do otherwise, you should respect user overrides when you use the `DateTimeFormatInfo` object in client applications to format and parse user input or to display data. For server applications or unattended applications, you should not. However, if you are using the `DateTimeFormatInfo` object either explicitly or implicitly to persist date and time data in string form, you should either use a `DateTimeFormatInfo` object that reflects the formatting conventions of the invariant culture, or you should specify a custom date and time format string that you use regardless of culture.

#### Format dates and times

A `DateTimeFormatInfo` object is used implicitly or explicitly in all date and time formatting operations. These include calls to the following methods:

- All date and time formatting methods, such as `ToString` and `ToString`.
- The major composite formatting method, which is `String.Format`.
- Other composite formatting methods, such as `WriteLine` and `AppendFormat`.

All date and time formatting operations make use of an `IFormatProvider` implementation. The `IFormatProvider` interface includes a single method, `GetFormat`. This callback method is passed a `Type` object that represents the type needed to provide formatting information. The method returns either an instance of that type or `null` if it cannot provide an instance of the type. .NET includes two `IFormatProvider` implementations for formatting dates and times:

- The `CultureInfo` class,  which represents a specific culture (or a specific language in a specific country/region). In a date and time formatting operation, the `CultureInfo.GetFormat` method returns the `DateTimeFormatInfo` object associated with its `DateTimeFormat` property.
- The `DateTimeFormatInfo` class, which provides information about the formatting conventions of its associated culture. The `DateTimeFormatInfo.GetFormat` method returns an instance of itself.

If an `IFormatProvider` implementation is not provided to a formatting method explicitly, the `CultureInfo` object returned by the `CurrentCulture` property that represents the current culture is used.
