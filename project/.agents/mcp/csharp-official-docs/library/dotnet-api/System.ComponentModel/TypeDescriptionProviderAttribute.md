---
title: "TypeDescriptionProviderAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeDescriptionProviderAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeDescriptionProviderAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class TypeDescriptionProviderAttribute : Attribute
```

Specifies the custom type description provider for a class. This class cannot be inherited.

#### Remarks
This attribute supplies a way for developers to provide custom metadata for their authored classes. This capability extends the static type information functionality in the `TypeDescriptor` class, which by default only obtains type information directly from metadata of the compiled classes.

> **Note:**
>  For a more dynamic way to provide custom metadata for your authored classes, see the `TypeDescriptor.AddProvider` method.

Tagging a class with a `TypeDescriptionProviderAttribute` will associate a `TypeDescriptionProvider` with that class. A `TypeDescriptionProvider` provides supplemental metadata information about the tagged class. For example, the `TypeDescriptionProvider.GetTypeDescriptor` method returns an `ICustomTypeDescriptor` that defines additional type information, such as attributes, events, and properties. Subsequently, if a `TypeDescriptionProvider` member is used to investigate the tagged class, it will discover both the default and custom type information.

This attribute can only be applied to classes and is inherited by derived classes.

This attribute cannot be derived from.

For more information about using attributes, see Attributes.

## TypeDescriptionProviderAttribute.TypeDescriptionProviderAttribute(String) constructor

```csharp
public TypeDescriptionProviderAttribute (string typeName);
```

Initializes a new instance of the `TypeDescriptionProviderAttribute` class using the specified type name.

Parameters:

- `typeName`: The qualified name of the type.

Exceptions:

- `ArgumentNullException`: `typeName` is `null`.

#### Remarks
The `TypeDescriptionProviderAttribute.%23ctor` constructor associates the specified `TypeDescriptionProvider` with the tagged class.

## TypeDescriptionProviderAttribute.TypeDescriptionProviderAttribute(Type) constructor

```csharp
public TypeDescriptionProviderAttribute (Type type);
```

Initializes a new instance of the `TypeDescriptionProviderAttribute` class using the specified type.

Parameters:

- `type`: The type to store in the attribute.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
The `TypeDescriptionProviderAttribute.%23ctor` constructor associates the specified `TypeDescriptionProvider` with the tagged class.

## TypeDescriptionProviderAttribute.TypeName property

```csharp
public string TypeName { get; }
```

Gets the type name for the type description provider.

Returns: A `String` containing the qualified type name for the `TypeDescriptionProvider`.

#### Remarks
This read-only property retrieves the name of the type description provider set in the constructor.
