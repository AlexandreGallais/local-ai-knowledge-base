---
title: "ComplexBindingPropertiesAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ComplexBindingPropertiesAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComplexBindingPropertiesAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class ComplexBindingPropertiesAttribute : Attribute
```

Specifies the data source and data member properties for a component that supports complex data binding. This class cannot be inherited.

#### Remarks
The `ComplexBindingPropertiesAttribute` is used to specify the properties used with complex data binding, such as binding based on `IList`.

The `ComplexBindingPropertiesAttribute` attribute is specified at the class level. It is inheritable and does not allow multiple attributes on the same class.

A control can support both simple binding, with `DefaultBindingPropertyAttribute`, as well as complex binding.

For more information about using attributes, see Attributes.

#### Examples
The following code example demonstrates using `ComplexBindingPropertiesAttribute` to identify a control's `DataSource` and `DataMember` properties for data binding. For a full code listing, see How to: Apply Attributes in Windows Forms Controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AmbientValueAttribute/Overview/attributesdemocontrol.cs._

## ComplexBindingPropertiesAttribute.ComplexBindingPropertiesAttribute() constructor

```csharp
public ComplexBindingPropertiesAttribute ();
```

Initializes a new instance of the `ComplexBindingPropertiesAttribute` class using no parameters.

#### Remarks
The parameterless constructor sets the `ComplexBindingPropertiesAttribute.DataSource` and `ComplexBindingPropertiesAttribute.DataMember` properties to `null`.

## ComplexBindingPropertiesAttribute.ComplexBindingPropertiesAttribute(String) constructor

```csharp
public ComplexBindingPropertiesAttribute (string? dataSource);
```

Initializes a new instance of the `ComplexBindingPropertiesAttribute` class using the specified data source.

Parameters:

- `dataSource`: The name of the property to be used as the data source.

#### Remarks
This constructor sets the `DataSource` property to `dataSource` and the `DataMember` property to `null`.

## ComplexBindingPropertiesAttribute.ComplexBindingPropertiesAttribute(String, String) constructor

```csharp
public ComplexBindingPropertiesAttribute (string? dataSource, string? dataMember);
```

Initializes a new instance of the `ComplexBindingPropertiesAttribute` class using the specified data source and data member.

Parameters:

- `dataSource`: The name of the property to be used as the data source.
- `dataMember`: The name of the property to be used as the source for data.

#### Remarks
This constructor sets the `DataSource` property to `dataSource` and the `DataMember` property to `dataMember`.

## ComplexBindingPropertiesAttribute.DataMember property

```csharp
public string? DataMember { get; }
```

Gets the name of the data member property for the component to which the `ComplexBindingPropertiesAttribute` is bound.

Returns: The name of the data member property for the component to which `ComplexBindingPropertiesAttribute` is bound.

#### Remarks
The `DataMember` property is set in the constructors for this class.

## ComplexBindingPropertiesAttribute.DataSource property

```csharp
public string? DataSource { get; }
```

Gets the name of the data source property for the component to which the `ComplexBindingPropertiesAttribute` is bound.

Returns: The name of the data source property for the component to which `ComplexBindingPropertiesAttribute` is bound.

#### Remarks
The `DataSource` property is set in the constructors for this class.

## ComplexBindingPropertiesAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `ComplexBindingPropertiesAttribute` instance.

Parameters:

- `obj`: The `Object` to compare with the current `ComplexBindingPropertiesAttribute` instance.

Returns: `true` if the object is equal to the current instance; otherwise, `false`, indicating they are not equal.

#### Remarks
The `ComplexBindingPropertiesAttribute.Equals` method returns `true` if `obj` is of type `ComplexBindingPropertiesAttribute` and the `ComplexBindingPropertiesAttribute.DataSource` and `ComplexBindingPropertiesAttribute.DataMember` properties of the two objects are equal.

## ComplexBindingPropertiesAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## ComplexBindingPropertiesAttribute.Default field

```csharp
public static readonly System.ComponentModel.ComplexBindingPropertiesAttribute Default;
```

Represents the default value for the `ComplexBindingPropertiesAttribute` class.

#### Remarks
The `Default` member is a static, read-only field that defines an instance of the `ComplexBindingPropertiesAttribute` class initialized with the parameterless constructor.
