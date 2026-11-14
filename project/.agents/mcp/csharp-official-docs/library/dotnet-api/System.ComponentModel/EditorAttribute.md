---
title: "EditorAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/EditorAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EditorAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class EditorAttribute : Attribute
```

Specifies the editor to use to change a property. This class cannot be inherited.

#### Remarks
When editing the property, a visual designer should create a new instance of the specified editor through a dialog box or drop-down window.

Use the `EditorBaseTypeName` property to find this editor's base type. The only available base type is `UITypeEditor`.

Use the `EditorTypeName` property to get the name of the type of editor associated with this attribute.

For general information on using attributes, see Attributes.

#### Examples
The following code example creates the `MyImage` class. The class is marked with an `EditorAttribute` that specifies the `ImageEditor` as its editor.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EditorAttribute/Overview/source.cs._

The following code example creates an instance of the `MyImage` class, gets the attributes for the class, and then prints the name of the editor used by `myNewImage`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EditorAttribute/Overview/source.cs._

## EditorAttribute.EditorAttribute() constructor

```csharp
public EditorAttribute ();
```

Initializes a new instance of the `EditorAttribute` class with the default editor, which is no editor.

To be added.

## EditorAttribute.EditorAttribute(String, String) constructor

```csharp
public EditorAttribute (string typeName, string? baseTypeName);
```

Initializes a new instance of the `EditorAttribute` class with the type name and base type name of the editor.

Parameters:

- `typeName`: The fully qualified type name of the editor.
- `baseTypeName`: The fully qualified type name of the base class or interface to use as a lookup key for the editor. This class must be or derive from `UITypeEditor`.

#### Remarks
The `typeName` parameter must be in the `Type.AssemblyQualifiedName` format.

The `Type` represented by the `typeName` parameter must either derive from or implement the base class.

The `Type` represented by the `baseTypeName` parameter is used as a key to find a particular editor, because a data type can have more than one editor associated with it. This can be any class, but is typically `UITypeEditor` or `ComponentEditor`.

## EditorAttribute.EditorAttribute(String, Type) constructor

```csharp
public EditorAttribute (string typeName, Type baseType);
```

Initializes a new instance of the `EditorAttribute` class with the type name and the base type.

Parameters:

- `typeName`: The fully qualified type name of the editor.
- `baseType`: The `Type` of the base class or interface to use as a lookup key for the editor. This class must be or derive from `UITypeEditor`.

#### Remarks
The `typeName` parameter must be in the `Type.AssemblyQualifiedName` format.

The `Type` represented by the `typeName` must either derive from or implement the base class.

The `baseType` parameter is used as a key to find a particular editor, because a data type can have more than one editor associated with it.

## EditorAttribute.EditorAttribute(Type, Type) constructor

```csharp
public EditorAttribute (Type type, Type baseType);
```

Initializes a new instance of the `EditorAttribute` class with the type and the base type.

Parameters:

- `type`: A `Type` that represents the type of the editor.
- `baseType`: The `Type` of the base class or interface to use as a lookup key for the editor. This class must be or derive from `UITypeEditor`.

#### Remarks
The `Type` represented by the `type` parameter must either derive from or implement the base class.

The `baseType` parameter is used as a key to find a particular editor, because a data type can have more than one editor associated with it.

## EditorAttribute.EditorBaseTypeName property

```csharp
public string? EditorBaseTypeName { get; }
```

Gets the name of the base class or interface serving as a lookup key for this editor.

Returns: The name of the base class or interface serving as a lookup key for this editor.

#### Remarks
The `EditorBaseTypeName` property is an assembly qualified type name. .NET provides both `UITypeEditor` and `ComponentEditor` as valid base classes, but any value is valid here.

## EditorAttribute.EditorTypeName property

```csharp
public string EditorTypeName { get; }
```

Gets the name of the editor class in the `Type.AssemblyQualifiedName` format.

Returns: The name of the editor class in the `Type.AssemblyQualifiedName` format.

To be added.

## EditorAttribute.TypeId property

```csharp
public override object TypeId { get; }
```

Gets a unique ID for this attribute type.

Returns: A unique ID for this attribute type.

#### Remarks
The `TypeId` property is used by filtering algorithms to identify two attributes that are the same type. For most attributes, this just returns the `Type` instance for the attribute. `EditorAttribute` overrides this to include the type of the editor base type.

## EditorAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `EditorAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current object; otherwise, `false`.

To be added.

## EditorAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.
