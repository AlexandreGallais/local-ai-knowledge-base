---
title: "SwitchAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/SwitchAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SwitchAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class SwitchAttribute : Attribute
```

Identifies a switch used in an assembly, class, or member.

#### Remarks
A `SwitchAttribute` attribute can be used on an assembly, class, constructor, method, property, or event.

The `SwitchAttribute` attribute can be used by tools that inspect an assembly for configuration settings.

#### Examples
The following example shows how to use the `SwitchAttribute` attribute to identify the switch used in an assembly. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## SwitchAttribute.SwitchAttribute(String, Type) constructor

```csharp
public SwitchAttribute (string switchName, Type switchType);
```

Initializes a new instance of the `SwitchAttribute` class, specifying the name and the type of the switch.

Parameters:

- `switchName`: The display name of the switch.
- `switchType`: The type of the switch.

#### Remarks
The `switchName` parameter should match the `DisplayName` property of the switch.

#### Examples
The following code example shows the use of the `SwitchAttribute.%23ctor` constructor to create a switch attribute. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## SwitchAttribute.SwitchDescription property

```csharp
public string? SwitchDescription { get; set; }
```

Gets or sets the description of the switch.

Returns: The description of the switch.

#### Remarks
The `SwitchDescription` property typically indicates the function of the switch.

## SwitchAttribute.SwitchName property

```csharp
public string SwitchName { get; set; }
```

Gets or sets the display name of the switch.

Returns: The display name of the switch.

Exceptions:

- `ArgumentNullException`: `SwitchAttribute.SwitchName` is set to `null`.
- `ArgumentException`: `SwitchAttribute.SwitchName` is set to an empty string.

#### Remarks
The `SwitchName` property should match the `DisplayName` property of the switch.

#### Examples
The following code example displays the value the `SwitchName` property for all switches used in an assembly. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## SwitchAttribute.SwitchType property

```csharp
public Type SwitchType { get; set; }
```

Gets or sets the type of the switch.

Returns: The type of the switch.

Exceptions:

- `ArgumentNullException`: `SwitchAttribute.SwitchType` is set to `null`.

#### Examples
The following code example displays the value of the `SwitchType` property for all switches used in an assembly. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## SwitchAttribute.GetAll(Assembly) method

```csharp
public static System.Diagnostics.SwitchAttribute[] GetAll (System.Reflection.Assembly assembly);
```

Returns all switch attributes for the specified assembly.

Parameters:

- `assembly`: The assembly to check for switch attributes.

Returns: An array that contains all the switch attributes for the assembly.

Exceptions:

- `ArgumentNullException`: `assembly` is `null`.

#### Examples
The following code example shows the use of the `SwitchAttribute.GetAll` method to identify the switches used in an assembly. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._
