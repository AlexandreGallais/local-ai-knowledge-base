---
title: "ExtenderProvidedPropertyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ExtenderProvidedPropertyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExtenderProvidedPropertyAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class ExtenderProvidedPropertyAttribute : Attribute
```

Specifies a property that is offered by an extender provider. This class cannot be inherited.

#### Remarks
The `ExtenderProvidedPropertyAttribute` is injected automatically by the `TypeDescriptor` class on properties that are exposed as extended properties.

> **Note:**
>  Do not use this attribute on your properties. Instead, use the `ProvidePropertyAttribute` on a type that implements the `IExtenderProvider` interface.

## ExtenderProvidedPropertyAttribute.ExtenderProvidedPropertyAttribute() constructor

```csharp
public ExtenderProvidedPropertyAttribute ();
```

Initializes a new instance of the `ExtenderProvidedPropertyAttribute` class.

To be added.

## ExtenderProvidedPropertyAttribute.ExtenderProperty property

```csharp
public System.ComponentModel.PropertyDescriptor? ExtenderProperty { get; }
```

Gets the property that is being provided.

Returns: A `PropertyDescriptor` encapsulating the property that is being provided.

To be added.

## ExtenderProvidedPropertyAttribute.Provider property

```csharp
public System.ComponentModel.IExtenderProvider? Provider { get; }
```

Gets the extender provider that is providing the property.

Returns: The `IExtenderProvider` that is providing the property.

To be added.

## ExtenderProvidedPropertyAttribute.ReceiverType property

```csharp
public Type? ReceiverType { get; }
```

Gets the type of object that can receive the property.

Returns: A `Type` describing the type of object that can receive the property.

To be added.

## ExtenderProvidedPropertyAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An `Object` to compare with this instance or a null reference (`Nothing` in Visual Basic).

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## ExtenderProvidedPropertyAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## ExtenderProvidedPropertyAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Provides an indication whether the value of this instance is the default value for the derived class.

Returns: `true` if this instance is the default attribute for the class; otherwise, `false`.

To be added.
