---
title: "TypeConverter+SimplePropertyDescriptor class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeConverter+SimplePropertyDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeConverter+SimplePropertyDescriptor class

Namespace: `System.ComponentModel`

```csharp
protected abstract class TypeConverter.SimplePropertyDescriptor : System.ComponentModel.PropertyDescriptor
```

Represents an `abstract` class that provides properties for objects that do not have properties.

#### Examples
For an example on this class, see the example in `PropertyDescriptor`.

## TypeConverter+SimplePropertyDescriptor.TypeConverter+SimplePropertyDescriptor(Type, String, Type) constructor

```csharp
protected SimplePropertyDescriptor (Type componentType, string name, Type propertyType);
```

Initializes a new instance of the `SimplePropertyDescriptor` class.

Parameters:

- `componentType`: A `Type` that represents the type of component to which this property descriptor binds.
- `name`: The name of the property.
- `propertyType`: A `Type` that represents the data type for this property.

To be added.

## TypeConverter+SimplePropertyDescriptor.TypeConverter+SimplePropertyDescriptor(Type, String, Type, Attribute[]) constructor

```csharp
protected SimplePropertyDescriptor (Type componentType, string name, Type propertyType, Attribute[]? attributes);
```

Initializes a new instance of the `SimplePropertyDescriptor` class.

Parameters:

- `componentType`: A `Type` that represents the type of component to which this property descriptor binds.
- `name`: The name of the property.
- `propertyType`: A `Type` that represents the data type for this property.
- `attributes`: An `Attribute` array with the attributes to associate with the property.

To be added.

## TypeConverter+SimplePropertyDescriptor.ComponentType property

```csharp
public override Type ComponentType { get; }
```

Gets the type of component to which this property description binds.

Returns: A `Type` that represents the type of component to which this property binds.

To be added.

## TypeConverter+SimplePropertyDescriptor.IsReadOnly property

```csharp
public override bool IsReadOnly { get; }
```

Gets a value indicating whether this property is read-only.

Returns: `true` if the property is read-only; `false` if the property is read/write.

To be added.

## TypeConverter+SimplePropertyDescriptor.PropertyType property

```csharp
public override Type PropertyType { get; }
```

Gets the type of the property.

Returns: A `Type` that represents the type of the property.

To be added.

## TypeConverter+SimplePropertyDescriptor.CanResetValue(Object) method

```csharp
public override bool CanResetValue (object component);
```

Returns whether resetting the component changes the value of the component.

Parameters:

- `component`: The component to test for reset capability.

Returns: `true` if resetting the component changes the value of the component; otherwise, `false`.

#### Remarks
This method looks for a `DefaultValueAttribute`. If it finds one, it compares the value of the attribute with the current value of the property. It returns `true` when the default value does not match the current value of the property. If this method cannot find a `DefaultValueAttribute`, it looks for a `ShouldSerializeMyProperty` method. If it finds a `ShouldSerializeMyProperty` method, it returns what `ShouldSerializeMyProperty` returns. If this method cannot find a `ShouldSerializeMyProperty` method, it looks for a `ResetMyProperty` method. If it finds a `ResetMyProperty` method, it returns `true`. If this method cannot find a `DefaultValueAttribute`, a `ShouldSerializeMyProperty` method, or a `ResetMyProperty` method, then it returns `false`.

## TypeConverter+SimplePropertyDescriptor.ResetValue(Object) method

```csharp
public override void ResetValue (object component);
```

Resets the value for this property of the component.

Parameters:

- `component`: The component with the property value to be reset.

#### Remarks
This method looks for a `DefaultValueAttribute`. If it finds one, it sets the value of the property to the value specified in the attribute. If this method cannot find a `DefaultValueAttribute`, it looks for a `ResetMyProperty` method. If it finds a `ResetMyProperty` method, it invokes it. If this method cannot find a `DefaultValueAttribute` or a `ResetMyProperty` method, then it does not perform an operation.

## TypeConverter+SimplePropertyDescriptor.ShouldSerializeValue(Object) method

```csharp
public override bool ShouldSerializeValue (object component);
```

Returns whether the value of this property can persist.

Parameters:

- `component`: The component with the property that is to be examined for persistence.

Returns: `true` if the value of the property can persist; otherwise, `false`.

#### Remarks
As implemented in this class, this method returns `false`.
