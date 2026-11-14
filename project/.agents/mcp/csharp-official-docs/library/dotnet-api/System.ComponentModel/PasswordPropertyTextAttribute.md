---
title: "PasswordPropertyTextAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/PasswordPropertyTextAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PasswordPropertyTextAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class PasswordPropertyTextAttribute : Attribute
```

Indicates that an object's text representation is obscured by characters such as asterisks. This class cannot be inherited.

#### Remarks
If the `PasswordPropertyTextAttribute` attribute is placed on a property or a type, its text representation in a property window appears as dots or asterisks to indicate a password field.

> **Caution:**
>  This indication in no way represents any type of encryption or security. For more information about using attributes, see Attributes.

#### Examples
The following code example demonstrates using the `PasswordPropertyTextAttribute` to obscure the value of a string property in a `PropertyGrid` control. For a full code listing, see How to: Apply Attributes in Windows Forms Controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AmbientValueAttribute/Overview/attributesdemocontrol.cs._

## PasswordPropertyTextAttribute.PasswordPropertyTextAttribute() constructor

```csharp
public PasswordPropertyTextAttribute ();
```

Initializes a new instance of the `PasswordPropertyTextAttribute` class.

To be added.

## PasswordPropertyTextAttribute.PasswordPropertyTextAttribute(Boolean) constructor

```csharp
public PasswordPropertyTextAttribute (bool password);
```

Initializes a new instance of the `PasswordPropertyTextAttribute` class, optionally showing password text.

Parameters:

- `password`: `true` to indicate that the property should be shown as password text; otherwise, `false`. The default is `false`.

To be added.

## PasswordPropertyTextAttribute.Password <example-value>

```csharp
public bool Password { get; }
```

Gets a value indicating if the property for which the `PasswordPropertyTextAttribute` is defined should be shown as password text.

Returns: `true` if the property should be shown as password text; otherwise, `false`.

To be added.

## PasswordPropertyTextAttribute.Equals(Object) method

```csharp
public override bool Equals (object? o);
```

Determines whether two `PasswordPropertyTextAttribute` instances are equal.

Parameters:

- `o`: The `PasswordPropertyTextAttribute` to compare with the current `PasswordPropertyTextAttribute`.

Returns: `true` if the specified `PasswordPropertyTextAttribute` is equal to the current `PasswordPropertyTextAttribute`; otherwise, `false`.

To be added.

## PasswordPropertyTextAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `PasswordPropertyTextAttribute`.

To be added.

## PasswordPropertyTextAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Returns an indication whether the value of this instance is the default value.

Returns: `true` if this instance is the default attribute for the class; otherwise, `false`.

To be added.

## PasswordPropertyTextAttribute.Default field

```csharp
public static readonly System.ComponentModel.PasswordPropertyTextAttribute Default;
```

Specifies the default value for the `PasswordPropertyTextAttribute`.

#### Remarks
The default value is `No`.

## PasswordPropertyTextAttribute.No field

```csharp
public static readonly System.ComponentModel.PasswordPropertyTextAttribute No;
```

Specifies that a text property is not used as a password. This `static` (`Shared` in Visual Basic) field is read-only.

#### Remarks
The `No` field is the default value for the `PasswordPropertyTextAttribute`.

## PasswordPropertyTextAttribute.Yes field

```csharp
public static readonly System.ComponentModel.PasswordPropertyTextAttribute Yes;
```

Specifies that a text property is used as a password. This `static` (`Shared` in Visual Basic) field is read-only.

To be added.
