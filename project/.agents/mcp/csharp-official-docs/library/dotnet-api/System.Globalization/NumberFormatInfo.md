---
title: "NumberFormatInfo class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/NumberFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NumberFormatInfo class

Namespace: `System.Globalization`

```csharp
public sealed class NumberFormatInfo : ICloneable, IFormatProvider
```

Provides culture-specific information for formatting and parsing numeric values.

The `NumberFormatInfo` class contains culture-specific information that is used when you format and parse numeric values. This information includes the currency symbol, the decimal symbol, the group separator symbol, and the symbols for positive and negative signs.

#### Instantiate a NumberFormatInfo object

You can instantiate a `NumberFormatInfo` object that represents the formatting conventions of the current culture, the invariant culture, a specific culture, or a neutral culture.

#### Instantiate a NumberFormatInfo object for the current culture

You can instantiate a `NumberFormatInfo` object for the current culture in any of the following ways. In each case, the returned `NumberFormatInfo` object is read-only.

- By retrieving a `CultureInfo` object that represents the current culture from the `CurrentCulture` property, and retrieving the `NumberFormatInfo` object from its `NumberFormat` property.

- By retrieving the `NumberFormatInfo` object returned by the `static` (`Shared` in Visual Basic) `CurrentInfo` property.

- By calling the `NumberFormatInfo.GetInstance` method with a `CultureInfo` object that represents the current culture.

The following example uses these three ways to create `NumberFormatInfo` objects that represent the formatting conventions of the current culture. It also retrieves the value of the `IsReadOnly` property to illustrate that each object is read-only.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/instantiate1.cs._
You can create a writable `NumberFormatInfo` object that represents the conventions of the current culture in any of the following ways:

- By retrieving a `NumberFormatInfo` object in any of the ways illustrated in the previous code example, and calling the `NumberFormatInfo.Clone` method on the returned `NumberFormatInfo` object. This creates a copy of the original `NumberFormatInfo` object, except that its `IsReadOnly` property is `false`.

- By calling the `CultureInfo.CreateSpecificCulture` method to create a `CultureInfo` object that represents the current culture, and then using its `NumberFormat` property to retrieve the `NumberFormatInfo` object.

The following example illustrates these two ways of instantiating a `NumberFormatInfo` object, and displays the value of its `IsReadOnly` property to illustrate that the object is not read-only.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/instantiate2.cs._
Note that the Windows operating system allows the user to override some of the `NumberFormatInfo` property values used in numeric formatting and parsing operations through the **Region and Language** item in Control Panel. For example, a user whose culture is English (United States) might choose to display currency values as 1.1 USD instead of the default of $1.1. The `NumberFormatInfo` objects retrieved in the ways discussed previously all reflect these user overrides. If this is undesirable, you can create a `NumberFormatInfo` object that does not reflect user overrides (and that is also read/write rather than read-only) by calling the `%23ctor` constructor and supplying a value of `false` for the `useUserOverride` argument. The following example provides an illustration for a system whose current culture is English (United States) and whose currency symbol has been changed from the default of $ to USD.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/instantiate3.cs._
If the `UseUserOverride` property is set to `true`, the properties `DateTimeFormat`, `NumberFormat`, and `TextInfo` are also retrieved from the user settings. If the user settings are incompatible with the culture associated with the `CultureInfo` object (for example, if the selected calendar is not one of the calendars listed by the `OptionalCalendars` property), the results of the methods and the values of the properties are undefined.

#### Instantiate a NumberFormatInfo object for the invariant culture

The invariant culture represents a culture that is culture-insensitive. It is based on the English language but not on any specific English-speaking country/region. Although the data of specific cultures can be dynamic and can change to reflect new cultural conventions or user preferences, the data of the invariant culture does not change. A `NumberFormatInfo` object that represents the formatting conventions of the invariant culture can be used for formatting operations in which result strings should not vary by culture.

You can instantiate a `NumberFormatInfo` object that represents the formatting conventions of the invariant culture in the following ways:

- By retrieving the value of the `InvariantInfo` property. The returned  `NumberFormatInfo` object is read-only.

- By retrieving the value of the `NumberFormat` property from the `CultureInfo` object that is returned by the `InvariantCulture` property. The returned `NumberFormatInfo` object is read-only.

- By calling the parameterless `NumberFormatInfo.%23ctor` class constructor. The returned `NumberFormatInfo` object is read/write.

The following example uses each of these methods to instantiate a `NumberFormatInfo` object that represents the invariant culture. It then indicates whether the object is read-only,

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/instantiate4.cs._
#### Instantiate a NumberFormatInfo object for a specific culture

A specific culture represents a language that is spoken in a particular country/region. For example, en-US is a specific culture that represents the English language spoken in the United States, and en-CA is a specific culture that represents the English language spoken in Canada. You can instantiate a `NumberFormatInfo` object that represents the formatting conventions of a specific culture in the following ways:

- By calling the `GetCultureInfo` method and retrieving the value of the returned `CultureInfo` object's `NumberFormat` property. The returned `NumberFormatInfo` object is read-only.

- By passing a `CultureInfo` object that represents the culture whose `NumberFormatInfo` object you want to retrieve to the static `NumberFormatInfo.GetInstance` method. The returned `NumberFormatInfo` object is read/write.

- By calling the `CultureInfo.CreateSpecificCulture` method and retrieving the value of the returned `CultureInfo` object's `NumberFormat` property. The returned `NumberFormatInfo` object is read/write.

- By calling one of the `CultureInfo.%23ctor` class constructors and retrieving the value of the returned `CultureInfo` object's `NumberFormat` property. The returned `NumberFormatInfo` object is read/write.

The following example uses these four ways to create a `NumberFormatInfo` object that reflects the formatting conventions of the Indonesian (Indonesia) culture. It also indicates whether each object is read-only.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/instantiate5.cs._
#### Instantiate a NumberFormatInfo object for a neutral culture

A neutral culture represents a culture or language that is independent of a country/region. It is typically the parent of one or more specific cultures. For example, fr is a neutral culture for the French language and the parent of the fr-FR culture. You create a `NumberFormatInfo` object that represents the formatting conventions of a neutral culture in the same way that you create a `NumberFormatInfo` object that represents the formatting conventions of a specific culture.

However, because it is independent of a specific country/region, a neutral culture lacks culture-specific formatting information. Rather than populating the `NumberFormatInfo` object with generic values, .NET returns a `NumberFormatInfo` object that reflects the formatting conventions of a specific culture that is a child of the neutral culture. For example, the `NumberFormatInfo` object for the neutral en culture reflects the formatting conventions of the en-US culture, and the `NumberFormatInfo` object for the fr culture reflects the formatting conventions of the fr-FR culture.

You can use code like the following to determine which specific culture's formatting conventions each neutral culture represents.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/instantiate6.cs._
#### Dynamic data

The culture-specific data for formatting numeric values provided by the `NumberFormatInfo` class is dynamic, just like the cultural data provided by the `CultureInfo` class. You should not make any assumptions about the stability of values for `NumberFormatInfo` objects that are associated with particular `CultureInfo` objects. Only the data provided by the invariant culture and its associated `NumberFormatInfo` object is stable. Other data can change between application sessions, or even within a single session, for the following reasons:

- **System updates.** Cultural preferences such as the currency symbol or currency formats change over time. When this happens, Windows Update includes changes to the `NumberFormatInfo` property value for a particular culture.

- **Replacement cultures.** The `CultureAndRegionInfoBuilder` class can be used to replace the data of an existing culture.

- **Cascading changes to property values.** A number of culture-related properties can change at runtime, which, in turn, causes `NumberFormatInfo` data to change. For example, the current culture can be changed either programmatically or through user action. When this happens, the `NumberFormatInfo` object returned by the `CurrentInfo` property changes to an object associated with the current culture.

- **User preferences.** Users of your application might override some of the values associated with the current system culture through the region and language options in Control Panel. For example, users might choose a different currency symbol or a different decimal separator symbol. If the `UseUserOverride` property is set to `true` (its default value), the properties of the `NumberFormatInfo` object are also retrieved from the user settings.

All user-overridable properties of a `NumberFormatInfo` object are initialized when the object is created. There is still a possibility of inconsistency, because neither object creation nor the user override process is atomic, and the relevant values may change during object creation. However, these inconsistencies should be extremely rare.

You can control whether user overrides are reflected in `NumberFormatInfo` objects that represent the same culture as the current culture. The following table lists the ways in which a `NumberFormatInfo` object can be retrieved and indicates whether the resulting object reflects user overrides.

|Source of CultureInfo and NumberFormatInfo object|Reflects user overrides|
|-------------------------------------------------------|-----------------------------|
|`CultureInfo.CurrentCulture.NumberFormat` property|Yes|
|`CurrentInfo` property|Yes|
|`CultureInfo.CreateSpecificCulture` method|Yes|
|`CultureInfo.GetCultureInfo` method|No|
|`%23ctor` constructor|Yes|
|`%23ctor` constructor|Depends on value of `useUserOverride` parameter|

Unless there is a compelling reason to do otherwise, you should respect user overrides when you use the `NumberFormatInfo` object in client applications to format and parse user input or to display numeric data. For server applications or unattended applications, you should not respect user overrides. However, if you are using the `NumberFormatInfo` object either explicitly or implicitly to persist numeric data in string form, you should either use a `NumberFormatInfo` object that reflects the formatting conventions of the invariant culture, or you should specify a custom numeric format string that you use regardless of culture.

#### IFormatProvider, NumberFormatInfo, and numeric formatting

A `NumberFormatInfo` object is used implicitly or explicitly in all numeric formatting operations. These include calls to the following methods:

- All numeric formatting methods, such as `Int32.ToString`, `Double.ToString`, and `ToString`.

- The major composite formatting method, `String.Format`.

- Other composite formatting methods, such as `WriteLine` and `AppendFormat`.

All numeric formatting operations make use of an `IFormatProvider` implementation. The `IFormatProvider` interface includes a single method, `GetFormat`. This is a callback method that is passed a `Type` object that represents the type needed to provide formatting information. The method is responsible for returning either an instance of that type or `null`, if it cannot provide an instance of the type. .NET provides two `IFormatProvider` implementations for formatting numbers:

- The `CultureInfo` class, which represents a specific culture (or a specific language in a specific country/region). In a numeric formatting operation, the `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object associated with its `NumberFormat` property.

- The `NumberFormatInfo` class, which provides information about the formatting conventions of its associated culture. The `NumberFormatInfo.GetFormat` method returns an instance of itself.

If an `IFormatProvider` implementation is not provided to a formatting method explicitly, a `CultureInfo` object returned by the `CurrentCulture` property that represents the current culture is used.

The following example illustrates the relationship between the `IFormatProvider` interface and the `NumberFormatInfo` class in formatting operations by defining a custom `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method displays the type name of the object requested by the formatting operation. If the interface is requesting a `NumberFormatInfo` object, this method provides the `NumberFormatInfo` object for the current culture. As the output from the example shows, the `ToString` method requests a `NumberFormatInfo` object to provide formatting information, whereas the `Format` method requests `NumberFormatInfo` and `DateTimeFormatInfo` objects as well as an `ICustomFormatter` implementation.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/formatprovider1.cs._
If an `IFormatProvider` implementation is not explicitly provided in a numeric formatting method call, the method calls the `CultureInfo.CurrentCulture.GetFormat` method, which returns the `NumberFormatInfo` object that corresponds to the current culture.

#### Format strings and NumberFormatInfo properties
