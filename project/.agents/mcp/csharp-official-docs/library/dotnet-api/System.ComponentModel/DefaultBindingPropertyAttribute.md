---
title: "DefaultBindingPropertyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DefaultBindingPropertyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultBindingPropertyAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class DefaultBindingPropertyAttribute : Attribute
```

Specifies the default binding property for a component. This class cannot be inherited.

#### Remarks
The `DefaultBindingPropertyAttribute` is specified at the class level. It can be inherited and does not allow multiple attributes on the same class.

For more information about using attributes, see Attributes.

#### Examples
The following code example demonstrates using the `DefaultBindingPropertyAttribute` class to specify the default property for data binding. For a full code listing, see How to: Apply Attributes in Windows Forms Controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AmbientValueAttribute/Overview/attributesdemocontrol.cs._

## DefaultBindingPropertyAttribute.DefaultBindingPropertyAttribute() constructor

```csharp
public DefaultBindingPropertyAttribute ();
```

Initializes a new instance of the `DefaultBindingPropertyAttribute` class using no parameters.

#### Remarks
The parameterless constructor sets the `Name` property to `null`.

## DefaultBindingPropertyAttribute.DefaultBindingPropertyAttribute(String) constructor

```csharp
public DefaultBindingPropertyAttribute (string? name);
```

Initializes a new instance of the `DefaultBindingPropertyAttribute` class using the specified property name.

Parameters:

- `name`: The name of the default binding property.

#### Remarks
This constructor sets the `Name` property to the value of the `name` parameter.

## DefaultBindingPropertyAttribute.Name property

```csharp
public string? Name { get; }
```

Gets the name of the default binding property for the component to which the `DefaultBindingPropertyAttribute` is bound.

Returns: The name of the default binding property for the component to which the `DefaultBindingPropertyAttribute` is bound.

#### Remarks
The `Name` property is set in the constructor.

## DefaultBindingPropertyAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `DefaultBindingPropertyAttribute` instance.

Parameters:

- `obj`: The `Object` to compare with the current `DefaultBindingPropertyAttribute` instance.

Returns: `true` if the object is equal to the current instance; otherwise, `false`, indicating they are not equal.

#### Remarks
The `DefaultBindingPropertyAttribute.Equals` method returns `true` if the value of the `obj` parameter is of type `DefaultBindingPropertyAttribute` and the `DefaultBindingPropertyAttribute.Name` properties of the two objects are equal.

## DefaultBindingPropertyAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DefaultBindingPropertyAttribute.Default field

```csharp
public static readonly System.ComponentModel.DefaultBindingPropertyAttribute Default;
```

Represents the default value for the `DefaultBindingPropertyAttribute` class.

#### Remarks
The `Default` member is a static, read-only field that defines an instance of the `DefaultBindingPropertyAttribute` class initialized with the parameterless constructor.
