---
title: "DebuggerBrowsableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggerBrowsableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggerBrowsableAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class DebuggerBrowsableAttribute : Attribute
```

Determines if and how a member is displayed in the debugger variable windows. This class cannot be inherited.

#### Remarks

This attribute can be applied only as a single instance to properties and fields. It cannot be applied to assemblies.

The constructor for this attribute takes one of the `DebuggerBrowsableState` enumeration values, which specifies one of the following states:

- `Never` indicates that the member is not displayed in the data window. For example, using this value for the `DebuggerBrowsableAttribute` on a field removes the field from the hierarchy; the field is not displayed when you expand the enclosing type by clicking the plus sign (+) for the type instance.
- `Collapsed` indicates that the member is displayed but not expanded by default. This is the default behavior.
- `RootHidden` indicates that the member itself is not shown, but its constituent objects are displayed if it is an array or collection.

For an example of the use of this attribute and the `DebuggerDisplayAttribute` and `DebuggerTypeProxyAttribute` attributes, see the example provided for the `DebuggerDisplayAttribute` class.

## DebuggerBrowsableAttribute.DebuggerBrowsableAttribute(DebuggerBrowsableState) constructor

```csharp
public DebuggerBrowsableAttribute (System.Diagnostics.DebuggerBrowsableState state);
```

Initializes a new instance of the `DebuggerBrowsableAttribute` class.

Parameters:

- `state`: One of the `DebuggerBrowsableState` values that specifies how to display the member.

Exceptions:

- `ArgumentOutOfRangeException`: `state` is not one of the `DebuggerBrowsableState` values.

#### Remarks
This attribute can be applied only to properties and fields.

#### Examples
The following code example shows the use of a `DebuggerBrowsableAttribute` attribute to instruct the debugger to not display the root (property name) of the `Keys` property, but to display the elements of the array that `Keys` gets. This code example is part of a larger example provided for the `DebuggerDisplayAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DebuggerBrowsableAttribute/.ctor/program.cs._

## DebuggerBrowsableAttribute.State property

```csharp
public System.Diagnostics.DebuggerBrowsableState State { get; }
```

Gets the display state for the attribute.

Returns: One of the `DebuggerBrowsableState` values.

#### Remarks
The `DebuggerBrowsableAttribute.%23ctor` constructor uses the value of the `state` parameter to set this value.
