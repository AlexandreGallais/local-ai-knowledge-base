---
title: "Switch class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Switch.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Switch class

Namespace: `System.Diagnostics`

```csharp
public abstract class Switch
```

Provides an abstract base class to create new debugging and tracing switches.

#### Remarks
A switch provides an efficient mechanism for controlling tracing and debugging output at run time using external settings. The `Switch` class implements default behavior for switches, allowing you to change the switch level at run time.

This class is the base class for the `BooleanSwitch`, `SourceSwitch`, and `TraceSwitch` classes. These switches meet most debugging and tracing needs. For more information about trace switches, see Trace Switches.

You must enable tracing or debugging to use a switch.

#### Examples
The following example shows how to define a new `Switch` class with four levels of tracing that can be used to trace a call stack. You can use the switch to instrument your application to log each time the method is entered or exited.

The first example creates the enumeration used to set the level of the switch.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Switch/Overview/source.cs._

The following example creates the new switch. The code implements a `Level` property to set the value of the new switch. `Level` calls the protected property `Switch.SwitchSetting` that assigns the value to the new switch. This example also implements two assessor properties to get the assigned value of the switch.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Switch/Overview/source.cs._

The following example creates a new switch in `Main`. It creates a new switch and assigns it a value. Then, depending on the switch settings, it outputs debugging messages for entering and leaving the method.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Switch/Overview/source.cs._

## Switch.Switch(String, String) constructor

```csharp
protected Switch (string displayName, string? description);
```

Initializes a new instance of the `Switch` class.

Parameters:

- `displayName`: The name of the switch.
- `description`: The description for the switch.

#### Remarks
When you create a new `Switch` object, the value of the `displayName` parameter is used to find initial switch settings. The default value is an empty string ("").

## Switch.Switch(String, String, String) constructor

```csharp
protected Switch (string displayName, string? description, string defaultSwitchValue);
```

Initializes a new instance of the `Switch` class, specifying the display name, description, and default value for the switch.

Parameters:

- `displayName`: The name of the switch.
- `description`: The description of the switch.
- `defaultSwitchValue`: The default value for the switch.

#### Remarks
The `displayName` parameter is used to set the value of the `DisplayName` property, and the `description` parameter is use to set the value of the `Description` property. The `defaultSwitchValue` parameter is the value for the switch if the `Value` property is not set by code or by the configuration file attribute. See the `%23ctor` overload for additional information.

## Switch.Attributes property

```csharp
public System.Collections.Specialized.StringDictionary Attributes { get; }
```

Gets the custom switch attributes defined in the application configuration file.

Returns: A `StringDictionary` containing the case-insensitive custom attributes for the trace switch.

#### Remarks
The `Attributes` property identifies the custom attributes referenced in the application's configuration file. Unreferenced custom attributes are not enumerated. Classes that inherit from the `Switch` class can add custom attributes by overriding the `Switch.GetSupportedAttributes` method and returning a string array of custom attribute names.

#### Examples
The following code sample shows how to display the unrecognized attributes for a custom switch.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SourceFilter/.ctor/program.cs._

## Switch.DefaultValue property

```csharp
public string DefaultValue { get; }
```

Gets the default value assigned in the constructor.

Returns: To be added.

To be added.

## Switch.Description property

```csharp
public string Description { get; }
```

Gets a description of the switch.

Returns: The description of the switch. The default value is an empty string ("").

#### Remarks
This property should indicate the function of the switch; for example, "Enables tracing for a directory watcher component." The value is set by the `descriptor` parameter in the `Switch.%23ctor` constructor.

## Switch.DisplayName property

```csharp
public string DisplayName { get; }
```

Gets a name used to identify the switch.

Returns: The name used to identify the switch. The default value is an empty string ("").

#### Remarks
When you create a new `Switch` object, the `Switch.DisplayName` finds initial switch settings. For more information, see the `Switch.%23ctor` constructor and How to: Create, Initialize and Configure Trace Switches in the Visual Studio documentation.

#### Examples
The following code example displays the display name for the switch in use by a trace source.  This code example is part of a larger example that can be found in the `TraceSource` class summary.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SourceFilter/.ctor/program.cs._

## Switch.SwitchSetting property

```csharp
protected int SwitchSetting { get; set; }
```

Gets or sets the current setting for this switch.

Returns: The current setting for this switch. The default is zero.

To be added.

## Switch.Value property

```csharp
public string Value { get; set; }
```

Gets or sets the value of the switch.

Returns: A string representing the value of the switch.

Exceptions:

- `ConfigurationErrorsException`: The value is `null`.

-or-

The value does not consist solely of an optional negative sign followed by a sequence of digits ranging from 0 to 9.

-or-

The value represents a number less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The `Switch.OnValueChanged` method is called when the value of the `Value` property is changed. The `Switch.OnValueChanged` method parses the value of this property and converts it to an integer value, which is then used to set the `SwitchSetting` property.

## Switch.GetSupportedAttributes() method

```csharp
protected virtual string[]? GetSupportedAttributes ();
```

Gets the custom attributes supported by the switch.

Returns: A string array that contains the names of the custom attributes supported by the switch, or `null` if there no custom attributes are supported.

#### Remarks
The default implementation for the `Switch.GetSupportedAttributes` method returns `null`. If a switch is added in a configuration file and custom attributes are specified that are not included in the string array returned by `Switch.GetSupportedAttributes`, a `ConfigurationException` is thrown when the switch is loaded.

#### Examples
The following code sample shows an override of the `Switch.GetSupportedAttributes` method for a custom switch.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SourceFilter/.ctor/program.cs._

## Switch.OnSwitchSettingChanged() method

```csharp
protected virtual void OnSwitchSettingChanged ();
```

Invoked when the `Switch.SwitchSetting` property is changed.

#### Remarks
`Switch.OnSwitchSettingChanged` is invoked the first time a switch reads the `Switch.SwitchSetting` value from the configuration file and is invoked again each time the switch's value is changed.

## Switch.OnValueChanged() method

```csharp
protected virtual void OnValueChanged ();
```

Invoked when the `Switch.Value` property is changed.

#### Remarks
The default implementation parses the new value of the `Value` property to an integer value that it uses to set the `SwitchSetting` property.

## Switch.Refresh() method

```csharp
public void Refresh ();
```

Refreshes the trace configuration data.

To be added.

## Switch.Initializing event

```csharp
public static event EventHandler<System.Diagnostics.InitializingSwitchEventArgs>? Initializing;
```

Occurs when a `Switch` needs to be initialized.

To be added.
