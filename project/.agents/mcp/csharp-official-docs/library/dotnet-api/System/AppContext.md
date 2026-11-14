---
title: "AppContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AppContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AppContext class

Namespace: `System`

```csharp
public static class AppContext
```

Provides members for setting and retrieving data about an application's context.

The `AppContext` class enables library writers to provide a uniform opt-out mechanism for new functionality for their users. It establishes a loosely coupled contract between components in order to communicate an opt-out request. This capability is typically important when a change is made to existing functionality. Conversely, there is already an implicit opt-in for new functionality.

#### AppContext for library developers

Libraries use the `AppContext` class to define and expose compatibility switches, while library users can set those switches to affect the library behavior. By default, libraries provide the new functionality, and they only alter it (that is, they provide the previous functionality) if the switch is set. This allows libraries to provide new behavior for an existing API while continuing to support callers who depend on the previous behavior.

#### Define the switch name

The most common way to allow consumers of your library to opt out of a change of behavior is to define a named switch. Its `value` element is a name/value pair that consists of the name of a switch and its `Boolean` value. By default, the switch is always implicitly `false`, which provides the new behavior (and makes the new behavior opt-in by default). Setting the switch to `true` enables it, which provides the legacy behavior. Explicitly setting the switch to `false` also provides the new behavior.

It's beneficial to use a consistent format for switch names, since they're a formal contract exposed by a library. The following are two obvious formats:

- *Switch*.*namespace*.*switchname*
- *Switch*.*library*.*switchname*

Once you define and document the switch, callers can use it by calling the `SetSwitch` method programmatically.

#### Check the setting

You can check if a consumer has declared the value of the switch and act appropriately by calling the `AppContext.TryGetSwitch` method. The method returns `true` if the `switchName` argument is found, and its `isEnabled` argument indicates the value of the switch. Otherwise, the method returns `false`.

#### Example

The following example illustrates the use of the `AppContext` class to allow the customer to choose the original behavior of a library method. The following is version 1.0 of a library named `StringLibrary`. It defines a `SubstringStartsAt` method that performs an ordinal comparison to determine the starting index of a substring within a larger string.

_Code sample not included: ~/snippets/csharp/System/AppContext/Overview/V1/Example4.cs._

The following example then uses the library to find the starting index of the substring "archæ" in "The archaeologist". Because the method performs an ordinal comparison, the substring cannot be found.

_Code sample not included: ~/snippets/csharp/System/AppContext/Overview/V1/Example4.cs._

Version 2.0 of the library, however, changes the `SubstringStartsAt` method to use culture-sensitive comparison.

_Code sample not included: ~/snippets/csharp/System/AppContext/Overview/V2/Example6.cs._

When the app is recompiled to run against the new version of the library, it now reports that the substring "archæ" is found at index 4 in "The archaeologist".

_Code sample not included: ~/snippets/csharp/System/AppContext/Overview/V2/Example6.cs._

This change can be prevented from breaking the applications that depend on the original behavior by defining a switch. In this case, the switch is named `StringLibrary.DoNotUseCultureSensitiveComparison`. Its default value, `false`, indicates that the library should perform its version 2.0 culture-sensitive comparison. `true` indicates that the library should perform its version 1.0 ordinal comparison. A slight modification of the previous code allows the library consumer to set the switch to determine the kind of comparison the method performs.

_Code sample not included: ~/snippets/csharp/System/AppContext/Overview/V3/Example8.cs._

#### AppContext for library consumers

If you're the consumer of a library, the `AppContext` class allows you to take advantage of a library or library method's opt-out mechanism for new functionality. Individual methods of the class library that you are calling define particular switches that enable or disable a new behavior. The value of the switch is a Boolean. If it is `false`, which is typically the default value, the new behavior is enabled; if it is `true`, the new behavior is disabled, and the member behaves as it did previously.

You can set the value of a switch by calling the `SetSwitch` method in your code. The `switchName` argument defines the switch name, and the `isEnabled` property defines the value of the switch. Because `AppContext` is a static class, it is available on a per-application domain basis. Calling the `SetSwitch` has application scope; that is, it affects only the application.

For ASP.NET Core applications, you set a switch by adding an `<Add>` element to the `<appSettings>` section of the web.config file. For example:

```xml
<appSettings>
   
   
</appSettings>
```

If you set the same switch in more than one way, the order of precedence for determining which setting overrides the others is:

1. The programmatic setting.
2. The setting in the web.config file (for ASP.NET Core apps).

## AppContext.BaseDirectory property

```csharp
public static string BaseDirectory { get; }
```

Gets the file path of the base directory of the application.

Returns: The file path of the base directory of the application.

To be added.

## AppContext.TargetFrameworkName property

```csharp
public static string? TargetFrameworkName { get; }
```

Gets the name of the framework version targeted by the current application.

Returns: The name of the framework version targeted by the current application.

#### Remarks
The name of the target framework version corresponds to the value of the `FrameworkName` property.

## AppContext.GetData(String) method

```csharp
public static object? GetData (string name);
```

Returns the value of the named data element assigned to the current application domain.

Parameters:

- `name`: The name of the data element.

Returns: The value of `name`, if `name` identifies a named value; otherwise, `null`.

To be added.

## AppContext.SetData(String, Object) method

```csharp
public static void SetData (string name, object? data);
```

Sets the value of the named data element assigned to the current application domain.

Parameters:

- `name`: The name of the data element
- `data`: The value of `name`

Exceptions:

- `ArgumentNullException`: `name` is `null`.

To be added.

## AppContext.SetSwitch(String, Boolean) method

```csharp
public static void SetSwitch (string switchName, bool isEnabled);
```

Sets the value of a switch.

Parameters:

- `switchName`: The name of the switch.
- `isEnabled`: The value of the switch.

Exceptions:

- `ArgumentNullException`: `switchName` is `null`.
- `ArgumentException`: `switchName` is `String.Empty`.

#### Remarks
The `AppContext` class enables library writers to provide a uniform opt-out mechanism for new functionality for their users. It establishes a loosely coupled contract between components in order to communicate an opt-out request. This capability is typically important when a change is made to existing functionality. Conversely, there is already an implicit opt-in for new functionality.

The `AppContext.SetSwitch` method is called by an application (or a library) to declare the value of a switch (which is always a `Boolean` value) that a dependent library defines. The switch is always implicitly `false`, which provides the new behavior. Setting the switch to `true` enables it, which provides the legacy behavior. Explicitly setting the switch to `false` also provides the new behavior. The dependent library can then check the value of the switch by calling the `AppContext.TryGetSwitch` method.

> **Note:**
> It's beneficial to use a consistent format for switch names, since they are a formal contract exposed by a library. The following are two obvious formats.
>
> - *Switch*.*namespace*.*switchname*
> - *Switch*.*library*.*switchname*

#### Examples
The following line of code sets a switch named `Switch.AmazingLib.ThrowOnException` to `true`, which enables a legacy behavior. The library can then check whether a library consumer has set the value of the switch by calling the `AppContext.TryGetSwitch` method.

_Code sample not included: ~/snippets/csharp/System/AppContext/Overview/TestValue1.cs._

## AppContext.TryGetSwitch(String, Boolean) method

```csharp
public static bool TryGetSwitch (string switchName, out bool isEnabled);
```

Tries to get the value of a switch.

Parameters:

- `switchName`: The name of the switch.
- `isEnabled`: When this method returns, contains the value of `switchName` if `switchName` was found, or `false` if `switchName` was not found. This parameter is passed uninitialized.

Returns: `true` if `switchName` was set and the `isEnabled` argument contains the value of the switch; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `switchName` is `null`.
- `ArgumentException`: `switchName` is `String.Empty`.

#### Remarks
The `AppContext` class enables library writers to provide a uniform opt-out mechanism for new functionality for their users. It establishes a loosely coupled contract between components in order to communicate an opt-out request. This capability is typically important when a change is made to existing functionality. Conversely, there is already an implicit opt-in for new functionality.

The common language runtime automatically populates the switches assigned to an `AppContext` instance by reading the registry and the application's configuration file. The value of these switches can then be overridden, and new switches added, by calling the `AppContext.SetSwitch` method.

A library calls the `AppContext.TryGetSwitch` method to check whether its consumers have declared the value of the switch and then act appropriately on it. By default, if the switch is not defined, the new functionality is enabled. If the switch is defined and its value is `false`, the new functionality is also enabled. If its value is `true`, the legacy behavior is enabled.

#### Examples
The following example determines whether a library consumer has set a switch named `Switch.AmazingLib.ThrowOnException`.

_Code sample not included: ~/snippets/csharp/System/AppContext/Overview/TestValue1.cs._
