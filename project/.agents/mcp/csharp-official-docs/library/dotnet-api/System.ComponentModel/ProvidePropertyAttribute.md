---
title: "ProvidePropertyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ProvidePropertyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProvidePropertyAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class ProvidePropertyAttribute : Attribute
```

Specifies the name of the property that an implementer of `IExtenderProvider` offers to other components. This class cannot be inherited.

#### Remarks
When you mark a class with this attribute, you tell the code generator to create an extender property with the name you provide. The marked class must implement `IExtenderProvider`. As a result, the new property can be used by other components in a container.

Within the marked class, you must implement `Get` \<name> and `Set` \<name> methods. For example, if you mark a class with [ProvideProperty("PropertyName")], you must implement `GetPropertyName` and `SetPropertyName` methods. To specify that the new property will be an extender property, you must implement from `IExtenderProvider`, you must also implement a `CanExtend` method.

For more information, see Attributes.

#### Examples
The following example marks `MyClass` with a `ProvidePropertyAttribute` that tells the compiler to create a property called `MyProperty` from the `GetMyProperty` and `SetMyProperty` methods.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ProvidePropertyAttribute/Overview/source.cs._

## ProvidePropertyAttribute.ProvidePropertyAttribute(String, String) constructor

```csharp
public ProvidePropertyAttribute (string propertyName, string receiverTypeName);
```

Initializes a new instance of the `ProvidePropertyAttribute` class with the name of the property and the type of its receiver.

Parameters:

- `propertyName`: The name of the property extending to an object of the specified type.
- `receiverTypeName`: The name of the data type this property can extend.

To be added.

## ProvidePropertyAttribute.ProvidePropertyAttribute(String, Type) constructor

```csharp
public ProvidePropertyAttribute (string propertyName, Type receiverType);
```

Initializes a new instance of the `ProvidePropertyAttribute` class with the name of the property and its `Type`.

Parameters:

- `propertyName`: The name of the property extending to an object of the specified type.
- `receiverType`: The `Type` of the data type of the object that can receive the property.

To be added.

## ProvidePropertyAttribute.PropertyName property

```csharp
public string PropertyName { get; }
```

Gets the name of a property that this class provides.

Returns: The name of a property that this class provides.

To be added.

## ProvidePropertyAttribute.ReceiverTypeName property

```csharp
public string ReceiverTypeName { get; }
```

Gets the name of the data type this property can extend.

Returns: The name of the data type this property can extend.

To be added.

## ProvidePropertyAttribute.TypeId property

```csharp
public override object TypeId { get; }
```

Gets a unique identifier for this attribute.

Returns: An `Object` that is a unique identifier for the attribute.

To be added.

## ProvidePropertyAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `ProvidePropertyAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## ProvidePropertyAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `ProvidePropertyAttribute`.

To be added.
