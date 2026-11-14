---
title: "SourceSwitch class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/SourceSwitch.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SourceSwitch class

Namespace: `System.Diagnostics`

```csharp
public class SourceSwitch : System.Diagnostics.Switch
```

Provides a multilevel switch to control tracing and debug output without recompiling your code.

#### Remarks
The `Switch` property of the `TraceSource` class is a `SourceSwitch` object. The `SourceSwitch` class provides a `Level` property to test the event level of the switch. The `Level` property gets or sets the switch's `TraceLevel` value.

You can set the event level of a `SourceSwitch` through the application configuration file and then use the configured `SourceSwitch` level in your application. Alternatively, you can create a `SourceSwitch` in your code and set the level directly, to instrument a specific section of code.

To configure a `SourceSwitch`, edit the configuration file that corresponds to the name of your application. Within this file, you can set a switch's value or clear all the switches previously set by the application. The configuration file should be formatted as shown in the following example.

```xml
<switches>
  <add name="SourceSwitch" value="Verbose"></add>
</switches>
```

The switch is used to check whether a trace should be propagated or ignored. Each `TraceSource` trace method calls the `SourceSwitch.ShouldTrace` method before calling the listeners. If the `SourceSwitch.ShouldTrace` method returns `false`, the trace is ignored and the trace method exits. If the `SourceSwitch.ShouldTrace` method returns `true`, the trace is passed to the listeners.

## SourceSwitch.SourceSwitch(String) constructor

```csharp
public SourceSwitch (string name);
```

Initializes a new instance of the `SourceSwitch` class, specifying the name of the source.

Parameters:

- `name`: The name of the source.

The `name` parameter is used to set the value of the `DisplayName` property.

## SourceSwitch.SourceSwitch(String, String) constructor

```csharp
public SourceSwitch (string displayName, string defaultSwitchValue);
```

Initializes a new instance of the `SourceSwitch` class, specifying the display name and the default value for the source switch.

Parameters:

- `displayName`: The name of the source switch.
- `defaultSwitchValue`: The default value for the switch.

#### Remarks
The `displayName` parameter is used to set the value of the `DisplayName` property; the `defaultSwitchValue` parameter is saved as a field and used to initialize the `Value` property on first reference.

#### Examples
The following code example creates a `SourceSwitch` with the name "SourceSwitch" and a default value of `Verbose`. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SourceFilter/.ctor/program.cs._

## SourceSwitch.Level property

```csharp
public System.Diagnostics.SourceLevels Level { get; set; }
```

Gets or sets the level of the switch.

Returns: One of the `SourceLevels` values that represents the event level of the switch.

#### Remarks
This property gets its value from the `SwitchSetting` property. Setting this property also modifies the `SwitchSetting` property.

> **Note:**
>  For extensibility, the `Level` property can be set to any integer, rather than being limited to a `SourceLevels` enumeration value.

#### Examples
The following code example displays the value of the `Level` property for a source switch. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SourceFilter/.ctor/program.cs._

## SourceSwitch.OnValueChanged() method

```csharp
protected override void OnValueChanged ();
```

Invoked when the value of the `Switch.Value` property changes.

Exceptions:

- `ArgumentException`: The new value of `Switch.Value` is not one of the `SourceLevels` values.

#### Remarks
The `SourceSwitch.OnValueChanged` method converts the new value of the `Value` property to the integer representation of the matching field in the `SourceLevels` enumeration, and then uses this integer to set the `SwitchSetting` property.

## SourceSwitch.ShouldTrace(TraceEventType) method

```csharp
public bool ShouldTrace (System.Diagnostics.TraceEventType eventType);
```

Determines if trace listeners should be called, based on the trace event type.

Parameters:

- `eventType`: One of the `TraceEventType` values.

Returns: `true` if the trace listeners should be called; otherwise, `false`.

#### Remarks
This method is called by the `Trace` methods in the `TraceSource` class to determine whether listeners should be called to write a trace.

> **Note:**
>  Application code should not call this method; it is intended to be called only by methods in the `TraceSource` class.
