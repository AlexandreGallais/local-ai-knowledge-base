---
title: "CultureInfo class (part 5 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CultureInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureInfo class (part 5 of 10)

## CultureInfo.CompareInfo property

```csharp
public virtual System.Globalization.CompareInfo CompareInfo { get; }
```

Gets the `CompareInfo` that defines how to compare strings for the culture.

Returns: The `CompareInfo` that defines how to compare strings for the culture.

#### Remarks
The `CompareInfo` property returns a `CompareInfo` object that provides culture-specific information used in culture-sensitive sorting and string comparison operations.

The user might choose to override some of the values associated with the current culture of Windows through the regional and language options portion of Control Panel. For example, the user might choose to display the date in a different format or to use a currency other than the default for the culture.

If `CultureInfo.UseUserOverride` is `true` and the specified culture matches the current culture of Windows, the `CultureInfo` uses those overrides, including user settings for the properties of the `DateTimeFormatInfo` instance returned by the `DateTimeFormat` property, and the properties of the `NumberFormatInfo` instance returned by the `NumberFormat` property. If the user settings are incompatible with the culture associated with the `CultureInfo`, for example, if the selected calendar is not one of the `CultureInfo.OptionalCalendars`, the results of the methods and the values of the properties are undefined.

#### Examples
The following code example shows how to create a `CultureInfo` for Spanish (Spain) with the international sort and another `CultureInfo` with the traditional sort.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/Overview/spanishspain.cs._

## CultureInfo.CultureTypes property

```csharp
public System.Globalization.CultureTypes CultureTypes { get; }
```

Gets the culture types that pertain to the current `CultureInfo` object.

Returns: A bitwise combination of one or more `CultureTypes` values. There is no default value.

#### Examples
The following example demonstrates the `CultureTypes` enumeration and the `CultureTypes` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CultureTypes/ct.cs._

## CultureInfo.CurrentCulture property

```csharp
public static System.Globalization.CultureInfo CurrentCulture { get; set; }
```

Gets or sets the `CultureInfo` object that represents the culture used by the current thread and task-based asynchronous operations.

Returns: The culture used by the current thread and task-based asynchronous operations.

Exceptions:

- `ArgumentNullException`: The property is set to `null`.

The `CultureInfo` object that's returned by the `CurrentCulture` property and its associated objects determines the default format for dates, times, numbers, and currency values, the sorting order of text, casing conventions, and string comparisons.

The current culture is a property of the executing thread. When you set this property to a `CultureInfo` object that represents a new culture, the value of the `Thread.CurrentThread.CurrentCulture` property also changes. However, we recommend that you always use the `CurrentCulture` property to retrieve and set the current culture.

The `CultureInfo` object that this property returns is read-only. That means you can't mutate the existing object, for example, by changing the `DateTimeFormat`. To change the date-time format or some other aspect of the current culture, create a new `CultureInfo` object and assign it to the property.

#### How a thread's culture is determined

When a thread is started, its culture is initially determined as follows:

- By retrieving the culture that is specified by the `DefaultThreadCurrentCulture` property in the application domain in which the thread is executing, if the property value is not `null`.

- If the thread is a thread pool thread that is executing a task-based asynchronous operation, its culture is determined by the culture of the calling thread. The following example changes the current culture to Portuguese (Brazil) and launches six tasks, each of which displays its thread ID, its task ID, and its current culture. Each of the tasks (and the threads) has inherited the culture of the calling thread.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CurrentCulture/Async1.cs._

For more information, see Culture and task-based asynchronous operations.

- By calling the `GetUserDefaultLocaleName` function on Windows or the `uloc_getDefault` function from ICU, which currently calls the POSIX `setlocale` function with category `LC_MESSAGES`, on Unix-like systems.

Note that if you set a specific culture that is different from the system-installed culture or the user's preferred culture, and your application starts multiple threads, the current culture of those threads will be the culture that is returned by the `GetUserDefaultLocaleName` function, unless you assign a culture to the `DefaultThreadCurrentCulture` property in the application domain in which the thread is executing.

For more information about how the culture of a thread is determined, see the "Culture and threads" section in the `CultureInfo` reference page.

#### Get the current culture

The `CurrentCulture` property is a per-thread setting; that is, each thread can have its own culture. You get the culture of the current thread by retrieving the value of the `CurrentCulture` property, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CurrentCulture/Get1.cs._

#### Set the CurrentCulture property explicitly

To change the culture that's used by an existing thread, you set the `CurrentCulture` property to the new culture. The following example changes the current thread culture to Dutch (Netherlands).

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CurrentCulture/changeculture11.cs._
> **Note:**
> Changing the culture by using the `CurrentCulture` property requires a `SecurityPermission` permission with the `ControlThread` value set. Manipulating threads is dangerous because of the security state associated with threads. Therefore, this permission should be given only to trustworthy code, and then only as necessary. You cannot change thread culture in semi-trusted code.

You can explicitly change the current thread culture to either a specific culture (such as French (Canada)) or a neutral culture (such as French). When a `CultureInfo` object represents a neutral culture, the values of `CultureInfo` properties such as `Calendar`, `CultureInfo.CompareInfo`, `DateTimeFormat`, `NumberFormat`, and `TextInfo` reflect the specific culture that is associated with the neutral culture. For example, the dominant culture for the English neutral culture is English (United States); the dominant culture for the German culture is German (Germany). The following example illustrates the difference in formatting when the current culture is set to a specific culture, French (Canada), and a neutral culture, French.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CurrentCulture/specific12.cs._

#### The current culture and user overrides

Windows allows users to override the standard property values of the `CultureInfo` object and its associated objects by using **Regional and Language Options** in Control Panel. The `CultureInfo` object returned by the `CurrentCulture` property reflects these user overrides in the following cases:

- If the current thread culture is set implicitly by the Windows `GetUserDefaultLocaleName` function.
- If the current thread culture defined by the `DefaultThreadCurrentCulture` property corresponds to the current Windows system culture.
- If the current thread culture is set explicitly to a culture returned by the `CultureInfo.CreateSpecificCulture` method, and that culture corresponds to the current Windows system culture.
- If the current thread culture is set explicitly to a culture instantiated by the `%23ctor` constructor, and that culture corresponds to the current Windows system culture.

In some cases, particularly for server applications, setting the current culture to a `CultureInfo` object that reflects user overrides may be undesirable. Instead, you can set the current culture to a `CultureInfo` object that does not reflect user overrides in the following ways:

- By calling the `%23ctor` constructor with a value of `false` for the `useUserOverride` argument.
- By calling the `CultureInfo.GetCultureInfo` method, which returns a cached, read-only `CultureInfo` object.

The following example demonstrates how to change the `CultureInfo.CurrentCulture` and `CultureInfo.CurrentUICulture` of the current thread.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CurrentCulture/currentculture.cs._

## CultureInfo.CurrentUICulture property

```csharp
public static System.Globalization.CultureInfo CurrentUICulture { get; set; }
```

Gets or sets the `CultureInfo` object that represents the current user interface culture used by the Resource Manager to look up culture-specific resources at run time.

Returns: The culture used by the Resource Manager to look up culture-specific resources at run time.

Exceptions:

- `ArgumentNullException`: The property is set to `null`.
- `ArgumentException`: The property is set to a culture name that cannot be used to locate a resource file. Resource filenames can include only letters, numbers, hyphens, or underscores.

The `CurrentUICulture` property is a per-thread property. That is, each thread has its own current UI culture. This property is equivalent to retrieving or setting the `CultureInfo` object assigned to the `System.Threading.Thread.CurrentThread.CurrentUICulture` property. When a thread is started, its UI culture is initially determined as follows:

- By retrieving the culture that is specified by the `DefaultThreadCurrentUICulture` property in the application domain in which the thread is executing, if the property value is not `null`.

- If the thread is a thread-pool thread that's executing a task-based asynchronous operation, its UI culture is determined by the UI culture of the calling thread. The following example changes the current UI culture to Portuguese (Brazil) and launches six tasks, each of which displays its thread ID, its task ID, and its current UI culture. Each of the tasks (and the threads) has inherited the UI culture of the calling thread.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CurrentUICulture/Async1.cs._

For more information, see Culture and task-based asynchronous operations.

- By calling the Windows `GetUserDefaultUILanguage` function.

To change the user interface culture used by a thread, set the `CurrentUICulture` property to the new culture. If you explicitly change a thread's UI culture in this way, that change persists if the thread crosses application domain boundaries.

> **Note:**
> If you set the property value to a `CultureInfo` object that represents a new culture, the value of the `Thread.CurrentThread.CurrentCulture` property also changes.

#### Get the current UI culture

The `CurrentUICulture` property is a per-thread setting; that is, each thread can have its own UI culture. You get the UI culture of the current thread by retrieving the value of the `CurrentUICulture` property, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CurrentUICulture/Get1.cs._

You can also retrieve the value of the current thread's UI culture from the `CurrentUICulture` property.

#### Explicitly set the current UI culture

You can change the current UI culture by assigning a `CultureInfo` object that represents the new culture to the `CurrentUICulture` property. The current UI culture can be set to either a specific culture (such as en-US or de-DE) or to a neutral culture (such as en or de). The following example sets the current UI culture to fr-FR or French (France).

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CurrentUICulture/currentuiculture1.cs._

In a multithreaded application, you can explicitly set the UI culture of any thread by assigning a `CultureInfo` object that represents that culture to the thread's `CurrentUICulture` property. If the thread whose culture you want to set is the current thread, you can assign the new culture to the `CurrentUICulture` property. When the UI culture of a thread is set explicitly, that thread retains the same culture even if it crosses application domain boundaries and executes code in another application domain.

#### Implicitly set the current UI culture

When a thread, including the main application thread, is first created, by default its current UI culture is set as follows:

- By using the culture defined by the `DefaultThreadCurrentUICulture` property for the current application domain if the property value is not `null`.
- By using the system's default culture. On systems that use the Windows operating system, the common language runtime calls the Windows `GetUserDefaultUILanguage` function to set the current  UI culture. `GetUserDefaultUILanguage` returns the default UI culture set by the user. If the user has not set a default UI language, it returns the culture originally installed on the system.

If the thread crosses application boundaries and executes code in another application domain, its culture is determined in the same way as that of a newly created thread.

Note that if you set a specific UI culture that is different from the system-installed UI culture or the user's preferred UI culture, and your application starts multiple threads, the current UI culture of those threads will be the culture returned by the `GetUserDefaultUILanguage` function, unless you assign a culture to the `DefaultThreadCurrentUICulture` property in the application domain in which the thread is executing.

#### Security considerations

Changing the culture of the current thread requires a `SecurityPermission` permission with the `ControlThread` value set.

> **Caution:**
> Manipulating threads is dangerous because of the security state associated with threads. Therefore, this permission should be given only to trustworthy code, and then only as necessary. You cannot change thread culture in semi-trusted code.

The following code example demonstrates how to change the `CultureInfo.CurrentCulture` and `CultureInfo.CurrentUICulture` of the current thread.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/CurrentCulture/currentculture.cs._
