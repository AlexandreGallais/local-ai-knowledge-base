---
title: "DebuggerVisualizerAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggerVisualizerAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggerVisualizerAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class DebuggerVisualizerAttribute : Attribute
```

Specifies that the type has a visualizer. This class cannot be inherited.

#### Remarks
This attribute can be used at the assembly level. Typically the attribute constructors take two types.  The two types are a visualizer and a visualizer object source, specified as types or as fully qualified assembly type names. The second option is provided so that the visualizer assembly does not need to be referenced by the assembly containing the `DebuggerVisualizerAttribute`. This allows a component creator to ship the visualizer in a DLL to be called only at debug time. The `Description` property specifies the visualizer description that appears in the drop-down box. The target parameters specify the type that is the target of the visualizer. For more information about visualizers, see Create Custom Visualizers of Data.

> **Note:**
>  Visualizer and visualizer object source implementation is dependent upon the hosting debugger.  For information on creating a visualizer for Visual Studio 2005, see How to: Write a Visualizer.

## DebuggerVisualizerAttribute.DebuggerVisualizerAttribute(String) constructor

```csharp
public DebuggerVisualizerAttribute (string visualizerTypeName);
```

Initializes a new instance of the `DebuggerVisualizerAttribute` class, specifying the type name of the visualizer.

Parameters:

- `visualizerTypeName`: The fully qualified type name of the visualizer.

#### Remarks
The `DebuggerVisualizerAttribute` can be applied to assemblies, classes, and structures. For information on the use of this attribute, see How to: Write a Visualizer.

## DebuggerVisualizerAttribute.DebuggerVisualizerAttribute(Type) constructor

```csharp
public DebuggerVisualizerAttribute (Type visualizer);
```

Initializes a new instance of the `DebuggerVisualizerAttribute` class, specifying the type of the visualizer.

Parameters:

- `visualizer`: The type of the visualizer.

Exceptions:

- `ArgumentNullException`: `visualizer` is `null`.

#### Remarks
The `DebuggerVisualizerAttribute` can be applied to assemblies, classes, and structures. For information on the use of this attribute, see How to: Write a Visualizer.

## DebuggerVisualizerAttribute.DebuggerVisualizerAttribute(String, String) constructor

```csharp
public DebuggerVisualizerAttribute (string visualizerTypeName, string? visualizerObjectSourceTypeName);
```

Initializes a new instance of the `DebuggerVisualizerAttribute` class, specifying the type name of the visualizer and the type name of the visualizer object source.

Parameters:

- `visualizerTypeName`: The fully qualified type name of the visualizer.
- `visualizerObjectSourceTypeName`: The fully qualified type name of the visualizer object source.

#### Remarks
The `DebuggerVisualizerAttribute` can be applied to assemblies, classes, and structures. For information on the use of this attribute, see How to: Write a Visualizer.

## DebuggerVisualizerAttribute.DebuggerVisualizerAttribute(String, Type) constructor

```csharp
public DebuggerVisualizerAttribute (string visualizerTypeName, Type visualizerObjectSource);
```

Initializes a new instance of the `DebuggerVisualizerAttribute` class, specifying the type name of the visualizer and the type of the visualizer object source.

Parameters:

- `visualizerTypeName`: The fully qualified type name of the visualizer.
- `visualizerObjectSource`: The type of the visualizer object source.

Exceptions:

- `ArgumentNullException`: `visualizerObjectSource` is `null`.

#### Remarks
The `DebuggerVisualizerAttribute` can be applied to assemblies, classes, and structures. For information on the use of this attribute, see How to: Write a Visualizer.

## DebuggerVisualizerAttribute.DebuggerVisualizerAttribute(Type, String) constructor

```csharp
public DebuggerVisualizerAttribute (Type visualizer, string? visualizerObjectSourceTypeName);
```

Initializes a new instance of the `DebuggerVisualizerAttribute` class, specifying the type of the visualizer and the type name of the visualizer object source.

Parameters:

- `visualizer`: The type of the visualizer.
- `visualizerObjectSourceTypeName`: The fully qualified type name of the visualizer object source.

Exceptions:

- `ArgumentNullException`: `visualizer` is `null`.

#### Remarks
The `DebuggerVisualizerAttribute` can be applied to assemblies, classes, and structures. For information on the use of this attribute, see How to: Write a Visualizer.

## DebuggerVisualizerAttribute.DebuggerVisualizerAttribute(Type, Type) constructor

```csharp
public DebuggerVisualizerAttribute (Type visualizer, Type visualizerObjectSource);
```

Initializes a new instance of the `DebuggerVisualizerAttribute` class, specifying the type of the visualizer and the type of the visualizer object source.

Parameters:

- `visualizer`: The type of the visualizer.
- `visualizerObjectSource`: The type of the visualizer object source.

Exceptions:

- `ArgumentNullException`: `visualizerObjectSource` is `null`.

#### Remarks
The `DebuggerVisualizerAttribute` can be applied to assemblies, classes, and structures. For information on the use of this attribute, see How to: Write a Visualizer.

## DebuggerVisualizerAttribute.Description property

```csharp
public string? Description { get; set; }
```

Gets or sets the description of the visualizer.

Returns: The description of the visualizer.

To be added.

## DebuggerVisualizerAttribute.Target property

```csharp
public Type? Target { get; set; }
```

Gets or sets the target type when the attribute is applied at the assembly level.

Returns: The type that is the target of the visualizer.

Exceptions:

- `ArgumentNullException`: The value cannot be set because it is `null`.

To be added.

## DebuggerVisualizerAttribute.TargetTypeName property

```csharp
public string? TargetTypeName { get; set; }
```

Gets or sets the fully qualified type name when the attribute is applied at the assembly level.

Returns: The fully qualified type name of the target type.

#### Remarks
If the target was specified by type (rather than by type name), the name returned is the `AssemblyQualifiedName` property of the target type.

## DebuggerVisualizerAttribute.VisualizerObjectSourceTypeName property

```csharp
public string? VisualizerObjectSourceTypeName { get; }
```

Gets the fully qualified type name of the visualizer object source.

Returns: The fully qualified type name of the visualizer object source.

#### Remarks
If the visualizer object source was specified by its type, then the value returned is the `AssemblyQualifiedName` property of the visualizer object source type.

A visualizer object source created for Visual Studio should inherit from the Visual Studio class `VisualizerObjectSource` class. For information on creating a visualizer, see Create Custom Visualizers of Data.

## DebuggerVisualizerAttribute.VisualizerTypeName property

```csharp
public string VisualizerTypeName { get; }
```

Gets the fully qualified type name of the visualizer.

Returns: The fully qualified visualizer type name.

#### Remarks
If the visualizer was specified by its type, then the value returned is the `AssemblyQualifiedName` property for the visualizer type.

For information on creating a visualizer, see How to: Write a Visualizer.
