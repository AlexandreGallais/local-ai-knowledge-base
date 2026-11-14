---
title: "ParenthesizePropertyNameAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ParenthesizePropertyNameAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParenthesizePropertyNameAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class ParenthesizePropertyNameAttribute : Attribute
```

Indicates whether the name of the associated property is displayed with parentheses in the Properties window. This class cannot be inherited.

#### Remarks
A `ParenthesizePropertyNameAttribute` with a `ParenthesizePropertyNameAttribute.NeedParenthesis` value of `true` indicates to the Properties window that the associated property should be displayed with parentheses around its name. The Properties window displays a property with parentheses around its name near the top of the list in alphabetical mode, or near the top of its category if the Properties window is in categorize mode.

## ParenthesizePropertyNameAttribute.ParenthesizePropertyNameAttribute() constructor

```csharp
public ParenthesizePropertyNameAttribute ();
```

Initializes a new instance of the `ParenthesizePropertyNameAttribute` class that indicates that the associated property should not be shown with parentheses.

To be added.

## ParenthesizePropertyNameAttribute.ParenthesizePropertyNameAttribute(Boolean) constructor

```csharp
public ParenthesizePropertyNameAttribute (bool needParenthesis);
```

Initializes a new instance of the `ParenthesizePropertyNameAttribute` class, using the specified value to indicate whether the attribute is displayed with parentheses.

Parameters:

- `needParenthesis`: `true` if the name should be enclosed in parentheses; otherwise, `false`.

To be added.

## ParenthesizePropertyNameAttribute.NeedParenthesis property

```csharp
public bool NeedParenthesis { get; }
```

Gets a value indicating whether the Properties window displays the name of the property in parentheses in the Properties window.

Returns: `true` if the property is displayed with parentheses; otherwise, `false`.

To be added.

## ParenthesizePropertyNameAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Compares the specified object to this object and tests for equality.

Parameters:

- `obj`: To be added.

Returns: `true` if equal; otherwise, `false`.

To be added.

## ParenthesizePropertyNameAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Gets the hash code for this object.

Returns: The hash code for the object the attribute belongs to.

To be added.

## ParenthesizePropertyNameAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Gets a value indicating whether the current value of the attribute is the default value for the attribute.

Returns: `true` if the current value of the attribute is the default value of the attribute; otherwise, `false`.

To be added.

## ParenthesizePropertyNameAttribute.Default field

```csharp
public static readonly System.ComponentModel.ParenthesizePropertyNameAttribute Default;
```

Initializes a new instance of the `ParenthesizePropertyNameAttribute` class with a default value that indicates that the associated property should not be shown with parentheses. This field is read-only.

To be added.
