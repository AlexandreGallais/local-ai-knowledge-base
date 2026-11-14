---
title: "TraceSwitch class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TraceSwitch.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TraceSwitch class

Namespace: `System.Diagnostics`

```csharp
public class TraceSwitch : System.Diagnostics.Switch
```

Provides a multilevel switch to control tracing and debug output without recompiling your code.

#### Remarks
You can use a trace switch to filter out messages based on their importance. The `TraceSwitch` class provides the `TraceSwitch.TraceError`, `TraceSwitch.TraceWarning`, `TraceSwitch.TraceInfo`, and `TraceSwitch.TraceVerbose` properties to test the level of the switch. The `Level` property gets or sets the switch's `TraceLevel`.

You can create a `TraceSwitch` in your code and set the level directly to instrument a specific section of code.

You must enable tracing or debugging to use a switch.

> **Note:**
> These debug and trace compiler switches are not required when using the `TraceSwitch` class in isolation. They are only required in conjunction with `Trace` or `Debug` methods that are conditionally compiled.

For more information on instrumenting your application, see `Debug` and `Trace`.

> **Note:**
> To improve performance, you can make `TraceSwitch` members `static` in your class.

#### Examples
The following code example creates a new `TraceSwitch` and uses the switch to determine whether to print error messages. The switch is created at the class level. `MyMethod` writes the first error message if the `Level` property is set to `Error` or higher. However, `MyMethod` does not write the second error message if the `TraceSwitch.Level` is less than `Verbose`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TraceSwitch/Overview/source.cs._

## TraceSwitch.TraceSwitch(String, String) constructor

```csharp
public TraceSwitch (string displayName, string? description);
```

Initializes a new instance of the `TraceSwitch` class, using the specified display name and description.

Parameters:

- `displayName`: The name to display on a user interface.
- `description`: The description of the switch.

#### Remarks

The `TraceSwitch` class provides the `TraceError`, `TraceWarning`, `TraceInfo`, and `TraceVerbose` properties to test the `Level` of the switch. The `Level` property gets or sets the switch's `TraceLevel`.

> **Note:**
> To improve performance, you can make `TraceSwitch` members `static` in your class.

#### Examples
The following code example creates a new `TraceSwitch` and uses the switch to determine whether to print error messages. The switch is created at the class level. `MyMethod` writes the first error message if the `Level` property is set to `Error` or higher. However, `MyMethod` does not write the second error message if the `TraceSwitch.Level` is less than `Verbose`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TraceSwitch/Overview/source.cs._

## TraceSwitch.TraceSwitch(String, String, String) constructor

```csharp
public TraceSwitch (string displayName, string? description, string defaultSwitchValue);
```

Initializes a new instance of the `TraceSwitch` class, using the specified display name, description, and default value for the switch.

Parameters:

- `displayName`: The name to display on a user interface.
- `description`: The description of the switch.
- `defaultSwitchValue`: The default value of the switch.

#### Remarks
The `displayName` parameter is used to set the value of the `DisplayName` property, the `description` parameter is use to set the value of the `Description` property, and the `defaultSwitchValue` parameter is saved as a field and used to initialize the `Value` property on first reference. See the `%23ctor` constructor for more information and a code example.

## TraceSwitch.Level property

```csharp
public System.Diagnostics.TraceLevel Level { get; set; }
```

Gets or sets the trace level that determines the messages the switch allows.

Returns: One of the `TraceLevel` values that specifies the level of messages that are allowed by the switch.

Exceptions:

- `ArgumentException`: `TraceSwitch.Level` is set to a value that is not one of the `TraceLevel` values.

#### Remarks

Setting this property updates the `TraceError`, `TraceWarning`, `TraceInfo`, and `TraceVerbose` properties to reflect the new value.

#### Examples
The following code example creates a new `TraceSwitch` and uses the switch to determine whether to print error messages. The switch is created at the class level. `MyMethod` writes the first error message if the `Level` property is set to `Error` or higher. However, `MyMethod` does not write the second error message if the `TraceSwitch.Level` is less than `Verbose`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TraceSwitch/Level/source.cs._

## TraceSwitch.TraceError property

```csharp
public bool TraceError { get; }
```

Gets a value indicating whether the switch allows error-handling messages.

Returns: `true` if the `TraceSwitch.Level` property is set to `TraceLevel.Error`, `TraceLevel.Warning`, `TraceLevel.Info`, or `TraceLevel.Verbose`; otherwise, `false`.

#### Remarks
You can use the `TraceSwitch.TraceError`, `TraceSwitch.TraceWarning`, `TraceSwitch.TraceInfo`, and `TraceSwitch.TraceVerbose` properties in conjunction with the `Debug` and `Trace` classes to emit all messages with a specified importance or greater. When the `Level` property is set to the highest importance, `Error`, `Error` ,  only error-handling messages are emitted.

#### Examples
The following code example creates a new `TraceSwitch` and uses the switch to determine whether to emit error messages. The switch is created at the class level. `MyMethod` writes the first error message if the `Level` property is set to `Error` or higher. However, `MyMethod` does not write the second error message if the `TraceSwitch.Level` is less than `Verbose`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TraceSwitch/Overview/source.cs._

## TraceSwitch.TraceInfo property

```csharp
public bool TraceInfo { get; }
```

Gets a value indicating whether the switch allows informational messages.

Returns: `true` if the `TraceSwitch.Level` property is set to `TraceLevel.Info` or `TraceLevel.Verbose`; otherwise, `false`.

#### Remarks
You can use the `TraceSwitch.TraceError`, `TraceSwitch.TraceWarning`, `TraceSwitch.TraceInfo`, and `TraceSwitch.TraceVerbose` properties in conjunction with the `Debug` and `Trace` classes to emit all messages with a specified importance or greater. When the `Level` property is set to `Warning`, informational messages, warnings, and error-handling messages are emitted.

#### Examples
The following code example creates a new `TraceSwitch` and uses the switch to determine whether to emit error messages. The switch is created at the class level. `MyMethod` writes the first error message if the `Level` property is set to `Info` or higher. However, `MyMethod` does not write the second error message if the `TraceSwitch.Level` is less than `Verbose`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TraceSwitch/TraceInfo/source.cs._

## TraceSwitch.TraceVerbose property

```csharp
public bool TraceVerbose { get; }
```

Gets a value indicating whether the switch allows all messages.

Returns: `true` if the `TraceSwitch.Level` property is set to `TraceLevel.Verbose`; otherwise, `false`.

#### Remarks
You can use the `TraceSwitch.TraceError`, `TraceSwitch.TraceWarning`, `TraceSwitch.TraceInfo`, and `TraceSwitch.TraceVerbose` properties in conjunction with the `Debug` and `Trace` classes to emit all messages with a specified importance or greater. When the `Level` property is set to `Verbose`, all debugging and tracing messages are transmitted.

#### Examples
The following code example creates a new `TraceSwitch` and uses the switch to determine whether to emit error messages. The switch is created at the class level. `MyMethod` writes both error messages when the `Level` property is set to `Verbose`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TraceSwitch/Overview/source.cs._

## TraceSwitch.TraceWarning property

```csharp
public bool TraceWarning { get; }
```

Gets a value indicating whether the switch allows warning messages.

Returns: `true` if the `TraceSwitch.Level` property is set to `TraceLevel.Warning`, `TraceLevel.Info`, or `TraceLevel.Verbose`; otherwise, `false`.

#### Remarks
You can use the `TraceSwitch.TraceError`, `TraceSwitch.TraceWarning`, `TraceSwitch.TraceInfo`, and `TraceSwitch.TraceVerbose` properties in conjunction with the `Debug` and `Trace` classes to emit all messages with a specified importance or greater. When the `Level` property is set to `Warning`, warnings and error-handling messages are emitted.

#### Examples
The following code example creates a new `TraceSwitch` and uses the switch to determine whether to emit error messages. The switch is created at the class level. `MyMethod` writes the first error message if the `Level` property is set to `Warning` or higher. However, `MyMethod` does not write the second error message when the `TraceSwitch.Level` is less than `Verbose`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TraceSwitch/TraceWarning/source.cs._

## TraceSwitch.OnSwitchSettingChanged() method

```csharp
protected override void OnSwitchSettingChanged ();
```

Updates and corrects the level for this switch.

#### Remarks
The `TraceSwitch.OnSwitchSettingChanged` method is used by .NET Framework to validate and correct the value of a switch initialized via a configuration file. A message is written to all trace listeners if the switch value specified in the configuration file is not defined by the `TraceLevel` enumeration and the switch is set to a defined value.

If you attempt in your code to set the `Level` property to a value that is not defined by the `TraceLevel` enumeration, an `ArgumentException` is thrown.

## TraceSwitch.OnValueChanged() method

```csharp
protected override void OnValueChanged ();
```

Sets the `Switch.SwitchSetting` property to the integer equivalent of the `Switch.Value` property.

#### Remarks
This method is called internally when the `Value` property of the switch changes. The method ensures that the properties relating to the switch's value reflect the new value.
