---
title: "DebuggerDisplayAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggerDisplayAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggerDisplayAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class DebuggerDisplayAttribute : Attribute
```

Determines how a class or field is displayed in the debugger variable windows.

#### Remarks
The `DebuggerDisplayAttribute.%23ctor` constructor has a single argument: a string to be displayed in the value column for instances of the type. This string can contain braces ({ and }). The text within a pair of braces is evaluated as the name of a field, property, or method. For example, the following C# code causes "Count = 4" to be displayed when the plus sign (+) is selected to expand the debugger display for an instance of `MyHashtable`.

```csharp
[DebuggerDisplay("Count = {count}")]
class MyHashtable
{
    public int count = 4;
}
```

For information about using this attribute in Visual Studio, see Using the DebuggerDisplay Attribute.

#### Examples
View the following example in Visual Studio to see the results of applying the `DebuggerDisplayAttribute`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DebuggerBrowsableAttribute/.ctor/program.cs._

## DebuggerDisplayAttribute.DebuggerDisplayAttribute(String) constructor

```csharp
public DebuggerDisplayAttribute (string? value);
```

Initializes a new instance of the `DebuggerDisplayAttribute` class.

Parameters:

- `value`: The string to be displayed in the value column for instances of the type; an empty string ("") causes the value column to be hidden.

#### Remarks
The `value` parameter can contain braces ({ and }). The text within a pair of braces is evaluated as the name of a field, property, or method. For example, the following C# code causes "Count = 4" to be displayed when the plus sign (+) is selected to expand the debugger display for an instance of `MyTable`.

```csharp
[DebuggerDisplay("Count = {count}")]
class MyTable
{
    public int count = 4;
}
```

#### Examples
The following code example causes the value of the `Count` property from the inherited `Hashtable` class to be displayed when the plus sign (+) is selected to expand the debugger display for an instance of `MyHashtable`. You must run the complete example, which is provided in the `DebuggerDisplayAttribute` class, to see the results.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DebuggerBrowsableAttribute/.ctor/program.cs._

## DebuggerDisplayAttribute.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name to display in the debugger variable windows.

Returns: The name to display in the debugger variable windows.

#### Remarks
The value can contain curly braces ({ and }). Text within a pair of braces is evaluated as the name of a field, property, or method. You can also use format specifiers within the braces to control how values are displayed. For information about debugger format specifiers, see Format Specifiers in C#.

#### Examples
The following code example causes the name and value of each key to be displayed in the debugger variable windows. When the attribute is not applied, the index and value type are displayed (for example: "[0] {KeyValuePairs}"). When the attribute is applied, the name of the key and its value are displayed (for example, if the first key is "one" and its value is 1, the display is: "one 1"). This code example is part of a larger example provided for the `DebuggerDisplayAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DebuggerBrowsableAttribute/.ctor/program.cs._

## DebuggerDisplayAttribute.Target property

```csharp
public Type? Target { get; set; }
```

Gets or sets the type of the attribute's target.

Returns: The attribute's target type.

Exceptions:

- `ArgumentNullException`: `DebuggerDisplayAttribute.Target` is set to `null`.

#### Remarks
Use this property to specify the target type when the attribute is used at the assembly level.

## DebuggerDisplayAttribute.TargetTypeName property

```csharp
public string? TargetTypeName { get; set; }
```

Gets or sets the type name of the attribute's target.

Returns: The name of the attribute's target type.

#### Remarks
Use this property to specify the name of the target type when the attribute is used at the assembly level.

## DebuggerDisplayAttribute.Type property

```csharp
public string? Type { get; set; }
```

Gets or sets the string to display in the type column of the debugger variable windows.

Returns: The string to display in the type column of the debugger variable windows.

#### Remarks
The value can contain curly braces ({ and }). Text within a pair of braces is evaluated as the name of a field, property, or method. You can also use format specifiers within the braces to control how values are displayed. For information about debugger format specifiers, see Format Specifiers in C#.

## DebuggerDisplayAttribute.Value property

```csharp
public string Value { get; }
```

Gets the string to display in the value column of the debugger variable windows.

Returns: The string to display in the value column of the debugger variable.

#### Remarks
This property contains the string passed in by the `value` parameter of the constructor.

The value can contain curly braces ({ and }). Text within a pair of braces is evaluated as the name of a field, property, or method. You can also use format specifiers within the braces to control how values are displayed. For information about debugger format specifiers, see Format Specifiers in C#.
