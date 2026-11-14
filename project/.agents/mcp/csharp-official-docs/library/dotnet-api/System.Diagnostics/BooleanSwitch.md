---
title: "BooleanSwitch class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/BooleanSwitch.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BooleanSwitch class

Namespace: `System.Diagnostics`

```csharp
public class BooleanSwitch : System.Diagnostics.Switch
```

Provides a simple on/off switch that controls debugging and tracing output.

#### Remarks
You can use a Boolean trace switch to enable or disable messages based on their importance. Use the `Enabled` property to get the current value of the switch.

You can create a `BooleanSwitch` in your code and set the `Enabled` property directly to instrument a specific section of code.

The `Enabled` property of the new switch is set to `false` by default.

You must enable tracing or debugging to use a switch.

> **Note:**
> These debug and trace compiler switches are not required when using the `BooleanSwitch` class in isolation. They are only required in conjunction with `Trace` or `Debug` methods that are conditionally compiled.

For more information on instrumenting your application, see `Debug` and `Trace`

> **Note:**
> To improve performance, you can make `BooleanSwitch` members `static` in your class.

#### Examples
The following example creates a `BooleanSwitch` and uses the switch to determine whether to print an error message. You create the switch at the class level. The `Main` method passes its location to `MyMethod`, which prints an error message and where the error occurred.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/BooleanSwitch/Overview/source.cs._

## BooleanSwitch.BooleanSwitch(String, String) constructor

```csharp
public BooleanSwitch (string displayName, string? description);
```

Initializes a new instance of the `BooleanSwitch` class with the specified display name and description.

Parameters:

- `displayName`: The name to display on a user interface.
- `description`: The description of the switch.

#### Remarks
When you create a `BooleanSwitch`, the `Enabled` property is set to `false` (disabled).

#### Examples
The following example creates a `BooleanSwitch` and uses the switch to determine whether to print an error message. The switch is created at the class level. The `Main` method passes its location to `MyMethod`, which prints an error message and where the error occurred.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/BooleanSwitch/Overview/source.cs._

## BooleanSwitch.BooleanSwitch(String, String, String) constructor

```csharp
public BooleanSwitch (string displayName, string? description, string defaultSwitchValue);
```

Initializes a new instance of the `BooleanSwitch` class with the specified display name, description, and default switch value.

Parameters:

- `displayName`: The name to display on the user interface.
- `description`: The description of the switch.
- `defaultSwitchValue`: The default value of the switch.

To be added.

## BooleanSwitch.Enabled property

```csharp
public bool Enabled { get; set; }
```

Gets or sets a value indicating whether the switch is enabled or disabled.

Returns: `true` if the switch is enabled; otherwise, `false`. The default is `false`.

Exceptions:

- `SecurityException`: The caller does not have the correct permission.

#### Remarks
By default, this field is set to `false` (disabled). To enable the switch, assign this field the value of `true`. To disable the switch, assign the value to `false`.  The value of this property is determined by the value of the base class property `Switch.SwitchSetting`.

#### Examples
The following code example creates a `BooleanSwitch` and uses the switch to determine whether to print an error message. The switch is created at the class level. The `Main` method passes its location to `MyMethod`, which prints an error message and the location where the error occurred.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/BooleanSwitch/Enabled/source.cs._

## BooleanSwitch.OnValueChanged() method

```csharp
protected override void OnValueChanged ();
```

Determines whether the new value of the `Switch.Value` property can be parsed as a Boolean value.

#### Remarks
The `BooleanSwitch.OnValueChanged` method determines whether the new value is a valid string representation of a Boolean value ("false" or "true"). If so, the method sets the `SwitchSetting` property to 0 or 1.  Otherwise, the base method is called, which converts the string value to an integer value, which is then used to set the `SwitchSetting` property.
