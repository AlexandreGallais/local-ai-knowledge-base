---
title: "CultureInfo class (part 6 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CultureInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureInfo class (part 6 of 10)

## CultureInfo.DateTimeFormat property

```csharp
public virtual System.Globalization.DateTimeFormatInfo DateTimeFormat { get; set; }
```

Gets or sets a `DateTimeFormatInfo` that defines the culturally appropriate format of displaying dates and times.

Returns: A `DateTimeFormatInfo` that defines the culturally appropriate format of displaying dates and times.

Exceptions:

- `ArgumentNullException`: The property is set to null.
- `InvalidOperationException`: The `CultureInfo.DateTimeFormat` property or any of the `DateTimeFormatInfo` properties is set, and the `CultureInfo` is read-only.

You might choose to override some of the values associated with the current culture of Windows through the regional and language options portion of Control Panel. For example, the user might choose to display the date in a different format or to use a currency other than the default for the culture.

If `CultureInfo.UseUserOverride` is `true` and the specified culture matches the current culture of Windows, the `CultureInfo` uses those overrides, including user settings for the properties of the `DateTimeFormatInfo` instance returned by the `DateTimeFormat` property, and the properties of the `NumberFormatInfo` instance returned by the `NumberFormat` property. If the user settings are incompatible with the culture associated with the `CultureInfo`, for example, if the selected calendar is not one of the `CultureInfo.OptionalCalendars`, the results of the methods and the values of the properties are undefined.

The value of the `DateTimeFormat` property and the `NumberFormat` property is not calculated until your application accesses the property. If the user can change the current culture to a new culture while the application is running and then the application accesses the `CultureInfo.DateTimeFormat` or `NumberFormat` property, the application retrieves the defaults for the new culture instead of the overrides for the original culture. To preserve the overrides for the original current culture, the application should access the `CultureInfo.DateTimeFormat` and `CultureInfo.NumberFormat` properties before changing the current culture.

The following code example shows that CultureInfo.Clone also clones the `DateTimeFormatInfo` and `NumberFormatInfo` instances associated with the `CultureInfo`.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Clone/yslin_cultureinfo_clone.cs._

## CultureInfo.DefaultThreadCurrentCulture property

```csharp
public static System.Globalization.CultureInfo? DefaultThreadCurrentCulture { get; set; }
```

Gets or sets the default culture for threads.

Returns: The default culture for threads, or `null` if the current system culture is the default thread culture.

#### Remarks

The `DefaultThreadCurrentCulture` property enables an application to define the default culture of all threads.

> **Important:**
> If you have not explicitly set the culture of any existing threads, setting the `DefaultThreadCurrentCulture` property also changes the culture of these threads. You should always explicitly set the culture of your main application thread, and not rely on the `DefaultThreadCurrentCulture` property to define the culture of the main application thread.

Unless it is set explicitly, the value of the `DefaultThreadCurrentCulture` property is `null`, and the culture of threads that have not been assigned an explicit culture is defined by the default Windows system culture.

For more information about cultures and threads, see the "Culture and threads" section in the `CultureInfo` reference page.

#### Examples
The following example illustrates the default behavior of .NET in defining the current culture of a new thread. At startup, the example sets the current culture and the current UI culture to French (France) on all systems except those on which the default system culture is already French (France). If the default system culture is already French (France), the code sets the current culture and the current UI culture to English (United States). It then calls the `DisplayRandomNumbers` routine, which generates three random numbers and displays them as currency values. Next, it creates a new thread, which also executes the `DisplayRandomNumbers` routine.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DefaultThreadCurrentCulture/defaultculture1.cs._

As the output from the example shows, when the example is run on a computer whose system culture is English (United States), the main thread displays its currency values using the formatting conventions of the French (France) culture. However, because the worker thread's culture is derived from the current Windows system culture rather than the application's current culture, the work thread displays its currency values using the formatting conventions of the English (United States) culture.

The following example uses the `DefaultThreadCurrentCulture` and `DefaultThreadCurrentUICulture` properties  to define the current culture and current UI culture of a new application thread. At startup, the example sets the current culture and the current UI culture to French (France) on all systems except those on which the default system culture is already French (France). If the default system culture is already French (France), it sets the current culture and the current UI culture to English (United States). It then calls the `DisplayRandomNumbers` routine, which generates three random numbers and displays them as currency values. Next, it creates a new thread, which also executes the `DisplayRandomNumbers` routine.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DefaultThreadCurrentCulture/defaultculture2.cs._

As the output from the example shows, when the example is run on a computer whose system culture is English (United States), both the main thread and the worker thread display their currency values using the formatting conventions of the French (France) culture.

## CultureInfo.DefaultThreadCurrentUICulture property

```csharp
public static System.Globalization.CultureInfo? DefaultThreadCurrentUICulture { get; set; }
```

Gets or sets the default UI culture for threads.

Returns: The default UI culture for threads, or `null` if the current system UI culture is the default thread UI culture.

Exceptions:

- `ArgumentException`: In a set operation, the `CultureInfo.Name` property value is invalid.

#### Remarks

The `DefaultThreadCurrentUICulture` property lets you define the default UI culture of all threads.

> **Important:**
> If you have not explicitly set the UI culture of any existing threads, setting the `DefaultThreadCurrentUICulture` property also changes the culture of these threads. You should always explicitly set the culture of your main application thread, and not rely on the `DefaultThreadCurrentUICulture` property to define the culture of the main application thread.

Unless it is set explicitly, the value of the `DefaultThreadCurrentUICulture` property is `null`, and the current culture of all threads that have not been assigned an explicit culture is defined by the default Windows system culture.

For more information about cultures and threads, see the "Culture and threads" section of `CultureInfo`.

#### Examples
The following example illustrates the default behavior of .NET in defining the current culture of a new thread. It uses English and Russian language resources. The following text file named GreetingStrings.txt contains the English language resources:

```txt
greeting =Hello again!
newGreeting=Hello!
```

It is compiled to a binary .resources file named GreetingStrings.resources by using the Resource File Generator with the following command.

```console
resgen greetingstrings.txt
```

The following text file named GreetingStrings.ru-RU.txt contains the Russian language resources:

```txt
greeting=Еще раз привет!
newGreeting=Привет!
```

It is compiled to a binary .resources file named GreetingStrings.ru-RU.resources by using the Resource File Generator with the following command.

```console
resgen greetingstrings.ru-RU.txt
```

The application code, which is shown below, resides in a file named Example1.vb or Example1.cs. It is compiled to an executable by using the following command for the Visual Basic <example-value>:

```console
vbc Example1.vb /resource:GreetingStrings.resources
```

For the C# compiler, the command is similar:

```console
csc /resource:GreetingStrings.resources Example1.cs
```

This creates an assembly that includes the example's executable code along with the resources for its fallback culture. You can also use the Assembly Linker to create the resource file for the Russian (Russia) culture with the following command:

```console
>al /embed:greetingstrings.ru-RU.resources /c:ru-RU /template:example1.exe /out:ru-RU\Example1.resources.dll
```

At startup, the example sets the current culture and the current UI culture to Russian (Russia) on all systems except those on which the default system culture is already Russian (Russia). If the default system culture is already Russian (Russia), the code sets the current culture and the current UI culture to English (United States). It then calls the `ShowGreeting` routine, which displays a simple string the first time it is called and a slightly different string on subsequent method calls. Next, it creates a new thread, which also executes the `ShowGreeting` routine.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DefaultThreadCurrentUICulture/example1.cs._

As the output from the example shows, when the example is run on a computer whose system culture is English (United States), the main thread displays its initial string in Russian. However, because the worker thread's culture is derived from the current Windows system culture rather than the application's current culture, the worker thread displays its string in English.

The following example uses the `CultureInfo.DefaultThreadCurrentCulture` and `CultureInfo.DefaultThreadCurrentUICulture` properties  to define the current culture and current UI culture of a new application thread.

The example uses the same resources files as the previous example. The commands to compile and to embed the localized Russian language resources into a satellite assembly are also identical, except that the name of the executable assembly changes.

At startup, the example sets the current culture and the current UI culture to Russian (Russia) on all systems except those on which the default system culture is already Russian (Russia). If the default system culture is already Russian (Russia), it sets the current culture and the current UI culture to English (United States). It then calls the `ShowGreeting` routine, which displays a simple string the first time it is called and a slightly different string on subsequent method calls. Next, it creates a new thread, which also executes the `ShowGreeting` routine.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DefaultThreadCurrentUICulture/example2.cs._

As the output from the example shows, when the example is run on a computer whose system culture is English (United States), both the main thread and the worker thread display their strings in the Russian language.

## CultureInfo.DisplayName property

```csharp
public virtual string DisplayName { get; }
```

Gets the full localized culture name.

Returns: The full localized culture name in the format *languagefull* [*country/regionfull*], where *languagefull* is the full name of the language and *country/regionfull* is the full name of the country/region.

#### Remarks
This property represents the localized name of the `CultureInfo` object.

Culture names may vary due to scripting or formatting conventions. You should use the returned name for display, and not attempt to parse it.

If a custom culture is created by means of the `CultureAndRegionInfoBuilder` class, the `DisplayName` property is initialized to the value of the `NativeName` property.

#### Examples
The following code example displays several properties of the neutral cultures.

> **Note:**
> The example displays the `zh-CHS` and `zh-CHT` cultures with the 0x0004 and 0x7C04 culture identifiers, respectively. However, your Windows Vista applications should use the `zh-Hans` name instead of `zh-CHS` and the `zh-Hant` name instead of zh-CHT. The `zh-Hans` and `zh-Hant` names represent the current standard, and should be used unless you have a reason for using the older names.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DisplayName/getcultures.cs._

## CultureInfo.EnglishName property

```csharp
public virtual string EnglishName { get; }
```

Gets the culture name in the format *languagefull* [*country/regionfull*] in English.

Returns: The culture name in the format *languagefull* [*country/regionfull*] in English, where *languagefull* is the full name of the language and *country/regionfull* is the full name of the country/region.

#### Remarks
For example, the `CultureInfo.EnglishName` for the specific culture name en-US is "English (United States)".

#### Examples
The following code example displays several properties of the neutral cultures.

> **Note:**
> The example displays the older `zh-CHS` and `zh-CHT` culture names with the 0x0004 and 0x7C04 culture identifiers, respectively. However, your Windows Vista applications should use the `zh-Hans` name instead of `zh-CHS` and the `zh-Hant` name instead of zh-CHT. The `zh-Hans` and `zh-Hant` names represent the current standard, and should be used unless you have a reason for using the older names.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/DisplayName/getcultures.cs._
