---
title: "DescriptionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DescriptionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DescriptionAttribute class

Namespace: `System.ComponentModel`

```csharp
public class DescriptionAttribute : Attribute
```

Specifies a description for a property or event.

#### Remarks
A visual designer can display the specified description when referencing the component member, such as in a Properties window. Call `DescriptionAttribute.Description` to access the value of this attribute.

For more information, see Attributes.

#### Examples
The following example creates the `MyImage` property. The property has two attributes, a `DescriptionAttribute` and a `CategoryAttribute`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DescriptionAttribute/Overview/source.cs._

The next example gets the description of `MyImage`. First the code gets a `PropertyDescriptorCollection` with all the properties for the object. Next it indexes into the `PropertyDescriptorCollection` to get `MyImage`. Then it returns the attributes for this property and saves them in the attributes variable.

The example then prints the description by retrieving `DescriptionAttribute` from the `AttributeCollection`, and writing it to the console screen.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DescriptionAttribute/Overview/source.cs._

## DescriptionAttribute.DescriptionAttribute() constructor

```csharp
public DescriptionAttribute ();
```

Initializes a new instance of the `DescriptionAttribute` class with no parameters.

To be added.

## DescriptionAttribute.DescriptionAttribute(String) constructor

```csharp
public DescriptionAttribute (string description);
```

Initializes a new instance of the `DescriptionAttribute` class with a description.

Parameters:

- `description`: The description text.

To be added.

## DescriptionAttribute.Description property

```csharp
public virtual string Description { get; }
```

Gets the description stored in this attribute.

Returns: The description stored in this attribute.

To be added.

## DescriptionAttribute.DescriptionValue property

```csharp
protected string DescriptionValue { get; set; }
```

Gets or sets the string stored as the description.

Returns: The string stored as the description. The default value is an empty string ("").

#### Remarks
The default implementation of the `Description` property simply returns this value.

This extra property exists so that you can derive from `DescriptionAttribute` and provide a localized version. The derived localizable `DescriptionAttribute` will maintain a private Boolean field to indicate if it has been localized. On the first access to the `Description` property, it will look up the localized string and store it back in the `DescriptionValue` property.

## DescriptionAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `DescriptionAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## DescriptionAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DescriptionAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Returns a value indicating whether this is the default `DescriptionAttribute` instance.

Returns: `true`, if this is the default `DescriptionAttribute` instance; otherwise, `false`.

#### Remarks
The default value is an empty string ("").

## DescriptionAttribute.Default field

```csharp
public static readonly System.ComponentModel.DescriptionAttribute Default;
```

Specifies the default value for the `DescriptionAttribute`, which is an empty string (""). This `static` field is read-only.

To be added.
