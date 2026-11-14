---
title: "LookupBindingPropertiesAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/LookupBindingPropertiesAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LookupBindingPropertiesAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class LookupBindingPropertiesAttribute : Attribute
```

Specifies the properties that support lookup-based binding. This class cannot be inherited.

#### Remarks
The `LookupBindingPropertiesAttribute` is used to specify the properties used with lookup-based binding, particularly `ListBox` and `ComboBox` controls.

The `LookupBindingPropertiesAttribute` is specified at the class level. The class can be inherited and does not allow multiple attributes on the same class.

#### Examples
The following code example shows properties used with lookup-based binding.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LookupBindingPropertiesAttribute/Overview/DemoControl.cs._

The `LookupBindingPropertiesAttribute` attribute must include all four members, except when unsetting values. The following code example shows the `ComboBox` control.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LookupBindingPropertiesAttribute/Overview/DemoControl.cs._

The following code example shows that a control can support both simple binding as well as list binding.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LookupBindingPropertiesAttribute/Overview/DemoControl.cs._

The following code example shows that the `LookupBindingPropertiesAttribute` attribute can be unset by specifying no arguments.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LookupBindingPropertiesAttribute/Overview/DemoControl.cs._

## LookupBindingPropertiesAttribute.LookupBindingPropertiesAttribute() constructor

```csharp
public LookupBindingPropertiesAttribute ();
```

Initializes a new instance of the `LookupBindingPropertiesAttribute` class using no parameters.

#### Remarks
The parameterless constructor sets the `LookupBindingPropertiesAttribute.DataSource`, `LookupBindingPropertiesAttribute.DisplayMember`, `LookupBindingPropertiesAttribute.ValueMember`, and `LookupBindingPropertiesAttribute.LookupMember` properties to `null`.

## LookupBindingPropertiesAttribute.LookupBindingPropertiesAttribute(String, String, String, String) constructor

```csharp
public LookupBindingPropertiesAttribute (string dataSource, string displayMember, string valueMember, string lookupMember);
```

Initializes a new instance of the `LookupBindingPropertiesAttribute` class.

Parameters:

- `dataSource`: The name of the property to be used as the data source.
- `displayMember`: The name of the property to be used for the display name.
- `valueMember`: The name of the property to be used as the source for values.
- `lookupMember`: The name of the property to be used for lookups.

#### Remarks
This constructor sets each of its public properties to the corresponding supplied parameter; for example, the `DataSource` property is set to `dataSource`.

## LookupBindingPropertiesAttribute.DataSource property

```csharp
public string? DataSource { get; }
```

Gets the name of the data source property for the component to which the `LookupBindingPropertiesAttribute` is bound.

Returns: The data source property for the component to which the `LookupBindingPropertiesAttribute` is bound.

#### Remarks
The `DataSource` property is set in the constructors for this class.

## LookupBindingPropertiesAttribute.DisplayMember property

```csharp
public string? DisplayMember { get; }
```

Gets the name of the display member property for the component to which the `LookupBindingPropertiesAttribute` is bound.

Returns: The name of the display member property for the component to which the `LookupBindingPropertiesAttribute` is bound.

#### Remarks
The `DisplayMember` property is set in the constructors for this class.

## LookupBindingPropertiesAttribute.LookupMember property

```csharp
public string? LookupMember { get; }
```

Gets the name of the lookup member for the component to which this attribute is bound.

Returns: The name of the lookup member for the component to which the `LookupBindingPropertiesAttribute` is bound.

#### Remarks
The `LookupMember` property is set in the constructors for this class.

## LookupBindingPropertiesAttribute.ValueMember property

```csharp
public string? ValueMember { get; }
```

Gets the name of the value member property for the component to which the `LookupBindingPropertiesAttribute` is bound.

Returns: The name of the value member property for the component to which the `LookupBindingPropertiesAttribute` is bound.

#### Remarks
The `ValueMember` property is set in the constructors for this class.

## LookupBindingPropertiesAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `LookupBindingPropertiesAttribute` instance.

Parameters:

- `obj`: The `Object` to compare with the current `LookupBindingPropertiesAttribute` instance.

Returns: `true` if the object is equal to the current instance; otherwise, `false`, indicating they are not equal.

#### Remarks
The `LookupBindingPropertiesAttribute.Equals` method returns `true` if the `obj` parameter is of type `LookupBindingPropertiesAttribute` and all the public properties - `LookupBindingPropertiesAttribute.DataSource`, `LookupBindingPropertiesAttribute.DisplayMember`, `LookupBindingPropertiesAttribute.ValueMember`, and `LookupBindingPropertiesAttribute.LookupMember` - are equal to each other.

## LookupBindingPropertiesAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `LookupBindingPropertiesAttribute`.

To be added.

## LookupBindingPropertiesAttribute.Default field

```csharp
public static readonly System.ComponentModel.LookupBindingPropertiesAttribute Default;
```

Represents the default value for the `LookupBindingPropertiesAttribute` class.

#### Remarks
The `Default` member is a static, read-only field that defines an instance of the `LookupBindingPropertiesAttribute` class initialized with the parameterless constructor.
