---
title: "EditorBrowsableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/EditorBrowsableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EditorBrowsableAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class EditorBrowsableAttribute : Attribute
```

Specifies that a class or member is viewable in an editor. This class cannot be inherited.

#### Remarks

`EditorBrowsableAttribute` is a hint to a designer that indicates whether a class or member should be displayed. You can use this type in a visual designer or text editor to determine what to make visible to the user. For example, the IntelliSense engine in Visual Studio uses this attribute to determine whether to show a class or member.

In Visual Studio, you can control when advanced properties appear in C# IntelliSense and the Properties window with the **Hide Advanced Members** setting under **Tools > Options > Text Editor > C#**. The corresponding `EditorBrowsableState` is `Advanced`.

> **Note:**
> In C#, `EditorBrowsableAttribute` does not suppress members from being browsed by a class in the same assembly.

#### Examples

The following example demonstrates how to hide a property of a class from IntelliSense by setting the appropriate value for the `EditorBrowsableAttribute` attribute.

Build `Class1` in its own assembly. Then, in Visual Studio, create a new project and add a reference to the assembly that contains `Class1`. Declare an instance of `Class1`, and then enter the name of the instance and press the `.` key to activate the IntelliSense list of `Class1` members. The `Age` property does not appear in the drop-down list because it's hidden.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EditorBrowsableAttribute/Overview/ctleditorbrowsable.cs._

## EditorBrowsableAttribute.EditorBrowsableAttribute() constructor

```csharp
public EditorBrowsableAttribute ();
```

Initializes a new instance of the `EditorBrowsableAttribute` class with `EditorBrowsableAttribute.State` set to the default state.

#### Remarks
The default for this property is `Always`.

## EditorBrowsableAttribute.EditorBrowsableAttribute(EditorBrowsableState) constructor

```csharp
public EditorBrowsableAttribute (System.ComponentModel.EditorBrowsableState state);
```

Initializes a new instance of the `EditorBrowsableAttribute` class with an `EditorBrowsableState`.

Parameters:

- `state`: The `EditorBrowsableState` to set `EditorBrowsableAttribute.State` to.

To be added.

## EditorBrowsableAttribute.State property

```csharp
public System.ComponentModel.EditorBrowsableState State { get; }
```

Gets the browsable state of the property or method.

Returns: An `EditorBrowsableState` that is the browsable state of the property or method.

#### Remarks
The default for this property is `Always`.

## EditorBrowsableAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `EditorBrowsableAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## EditorBrowsableAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.
