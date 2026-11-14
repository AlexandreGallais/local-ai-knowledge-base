---
title: "SwitchLevelAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/SwitchLevelAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SwitchLevelAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class SwitchLevelAttribute : Attribute
```

Identifies the level type for a switch.

#### Remarks
This attribute is intended to be applied to all classes that inherit from the `Switch` class. The purpose of the attribute is to identify the type that specifies the switch criteria of the switch. Each switch determines whether a trace is to be written, based on whether an event type matches or exceeds the value of the `SwitchLevelType` property for the switch. The type used for the `SwitchLevelType` property varies for different switches. For example, the switch level type for the `BooleanSwitch` class is `Boolean`, and the switch level type for the `TraceSwitch` class is `TraceLevel`.

## SwitchLevelAttribute.SwitchLevelAttribute(Type) constructor

```csharp
public SwitchLevelAttribute (Type switchLevelType);
```

Initializes a new instance of the `SwitchLevelAttribute` class, specifying the type that determines whether a trace should be written.

Parameters:

- `switchLevelType`: The `Type` that determines whether a trace should be written.

#### Remarks
The `switchLevelType` parameter identifies the type that is used by the switch to determine if a trace should be written; for example, the type of the `Level` property of the `TraceSwitch` class is `TraceLevel`.

## SwitchLevelAttribute.SwitchLevelType property

```csharp
public Type SwitchLevelType { get; set; }
```

Gets or sets the type that determines whether a trace should be written.

Returns: The `Type` that determines whether a trace should be written.

Exceptions:

- `ArgumentNullException`: The set operation failed because the value is `null`.

#### Remarks
The level property of a switch is not necessarily named `Level`; for example, the level property of the `BooleanSwitch` class is `BooleanSwitch.Enabled`.

#### Examples
The following code example displays the value of the `SwitchLevelType` property for the `BooleanSwitch`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SourceFilter/.ctor/program.cs._
