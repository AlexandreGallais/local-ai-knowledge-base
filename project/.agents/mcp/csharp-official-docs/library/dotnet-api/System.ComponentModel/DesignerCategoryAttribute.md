---
title: "DesignerCategoryAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DesignerCategoryAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DesignerCategoryAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class DesignerCategoryAttribute : Attribute
```

Specifies that the designer for a class belongs to a certain category.

#### Remarks
A visual designer can use a designer category to inform a development environment of the type of designer that will be implemented. If no designer category is provided on a class, a development environment may or may not allow the class to be designed. A category can be created for any name.

When you mark a class with this attribute, it is set to a constant member. When you want to check the value of this attribute in your code, you must specify the constant member. The Description column in the table below lists the constant member that each value is set to.

The `DesignerCategoryAttribute` class defines the following common categories:

|Category|Description|
|--------------|-----------------|
|Component|Designers that are used with components. The attribute is set to the constant member `Component`.|
|Form|Designers that are used with forms. The attribute is set to the constant member `Form`.|
|Designer|Designers that are used with designers. The attribute is set to the constant member `Generic`.|
|Empty String ("")|This is the default category.|

For more information, see Attributes.

#### Examples
The following example creates a class called `MyForm`. `MyForm` has two attributes, a `DesignerAttribute` that specifies this class uses the `DocumentDesigner`, and a `DesignerCategoryAttribute` that specifies the `Form` category.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DesignerCategoryAttribute/Overview/source.cs._

The next example creates an instance of `MyForm`. Then it gets the attributes for the class, extracts the `DesignerCategoryAttribute`, and prints the name of the designer.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DesignerCategoryAttribute/Overview/source.cs._

## DesignerCategoryAttribute.DesignerCategoryAttribute() constructor

```csharp
public DesignerCategoryAttribute ();
```

Initializes a new instance of the `DesignerCategoryAttribute` class with an empty string ("").

To be added.

## DesignerCategoryAttribute.DesignerCategoryAttribute(String) constructor

```csharp
public DesignerCategoryAttribute (string category);
```

Initializes a new instance of the `DesignerCategoryAttribute` class with the given category name.

Parameters:

- `category`: The name of the category.

To be added.

## DesignerCategoryAttribute.Category property

```csharp
public string Category { get; }
```

Gets the name of the category.

Returns: The name of the category.

To be added.

## DesignerCategoryAttribute.TypeId property

```csharp
public override object TypeId { get; }
```

Gets a unique identifier for this attribute.

Returns: An `Object` that is a unique identifier for the attribute.

To be added.

## DesignerCategoryAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `DesignOnlyAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## DesignerCategoryAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DesignerCategoryAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Determines if this attribute is the default.

Returns: `true` if the attribute is the default value for this attribute class; otherwise, `false`.

To be added.

## DesignerCategoryAttribute.Component field

```csharp
public static readonly System.ComponentModel.DesignerCategoryAttribute Component;
```

Specifies that a component marked with this category use a component designer. This field is read-only.

To be added.

## DesignerCategoryAttribute.Default field

```csharp
public static readonly System.ComponentModel.DesignerCategoryAttribute Default;
```

Specifies that a component marked with this category cannot use a visual designer. This `static` field is read-only.

#### Remarks
This is the default category.

## DesignerCategoryAttribute.Form field

```csharp
public static readonly System.ComponentModel.DesignerCategoryAttribute Form;
```

Specifies that a component marked with this category use a form designer. This `static` field is read-only.

To be added.

## DesignerCategoryAttribute.Generic field

```csharp
public static readonly System.ComponentModel.DesignerCategoryAttribute Generic;
```

Specifies that a component marked with this category use a generic designer. This `static` field is read-only.

To be added.
