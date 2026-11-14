---
title: "AmbientValueAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/AmbientValueAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AmbientValueAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class AmbientValueAttribute : Attribute
```

Specifies the value to pass to a property to cause the property to get its value from another source. This is known as *ambience*. This class cannot be inherited.

#### Remarks
If a property on a control has ambient behavior, this attribute must be present. Ambient properties query their parent for their value, for example, a `Font` property or a `BackColor` property.

Typically, a visual designer uses the `AmbientValueAttribute` attribute to decide which value to persist for a property. This is usually a value that causes the property to get its value from another source. An example of an ambient value is `Empty` as the ambient value for the `BackColor` property. If you have a control on a form and the `BackColor` property of the control is set to a different color than the `BackColor` property of the form, you can reset the `BackColor` property of the control to that of the form by setting the `Control.BackColor` of the control to `Empty`.

#### Examples
The following code example demonstrates using `AmbientValueAttribute` to enforce ambient behavior for a property called `AlertForeColor`. For a full code listing, see How to: Apply Attributes in Windows Forms Controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AmbientValueAttribute/Overview/attributesdemocontrol.cs._

## AmbientValueAttribute.AmbientValueAttribute(Boolean) constructor

```csharp
public AmbientValueAttribute (bool value);
```

Initializes a new instance of the `AmbientValueAttribute` class, given a Boolean value for its value.

Parameters:

- `value`: The value of this attribute.

To be added.

## AmbientValueAttribute.AmbientValueAttribute(Byte) constructor

```csharp
public AmbientValueAttribute (byte value);
```

Initializes a new instance of the `AmbientValueAttribute` class, given an 8-bit unsigned integer for its value.

Parameters:

- `value`: The value of this attribute.

To be added.

## AmbientValueAttribute.AmbientValueAttribute(Char) constructor

```csharp
public AmbientValueAttribute (char value);
```

Initializes a new instance of the `AmbientValueAttribute` class, given a Unicode character for its value.

Parameters:

- `value`: The value of this attribute.

To be added.

## AmbientValueAttribute.AmbientValueAttribute(Double) constructor

```csharp
public AmbientValueAttribute (double value);
```

Initializes a new instance of the `AmbientValueAttribute` class, given a double-precision floating-point number for its value.

Parameters:

- `value`: The value of this attribute.

To be added.

## AmbientValueAttribute.AmbientValueAttribute(Int16) constructor

```csharp
public AmbientValueAttribute (short value);
```

Initializes a new instance of the `AmbientValueAttribute` class, given a 16-bit signed integer for its value.

Parameters:

- `value`: The value of this attribute.

To be added.

## AmbientValueAttribute.AmbientValueAttribute(Int32) constructor

```csharp
public AmbientValueAttribute (int value);
```

Initializes a new instance of the `AmbientValueAttribute` class, given a 32-bit signed integer for its value.

Parameters:

- `value`: The value of this attribute.

To be added.

## AmbientValueAttribute.AmbientValueAttribute(Int64) constructor

```csharp
public AmbientValueAttribute (long value);
```

Initializes a new instance of the `AmbientValueAttribute` class, given a 64-bit signed integer for its value.

Parameters:

- `value`: The value of this attribute.

To be added.

## AmbientValueAttribute.AmbientValueAttribute(Object) constructor

```csharp
public AmbientValueAttribute (object? value);
```

Initializes a new instance of the `AmbientValueAttribute` class, given an object for its value.

Parameters:

- `value`: The value of this attribute.

To be added.

## AmbientValueAttribute.AmbientValueAttribute(Single) constructor

```csharp
public AmbientValueAttribute (float value);
```

Initializes a new instance of the `AmbientValueAttribute` class, given a single-precision floating point number for its value.

Parameters:

- `value`: The value of this attribute.

To be added.

## AmbientValueAttribute.AmbientValueAttribute(String) constructor

```csharp
public AmbientValueAttribute (string? value);
```

Initializes a new instance of the `AmbientValueAttribute` class, given a string for its value.

Parameters:

- `value`: The value of this attribute.

To be added.

## AmbientValueAttribute.AmbientValueAttribute(Type, String) constructor

```csharp
public AmbientValueAttribute (Type type, string value);
```

Initializes a new instance of the `AmbientValueAttribute` class, given the value and its type.

Parameters:

- `type`: The `Type` of the `value` parameter.
- `value`: The value for this attribute.

#### Examples
The following code example demonstrates using `AmbientValueAttribute` to enforce ambient behavior for a property called `AlertForeColor`. For a full code listing, see How to: Apply Attributes in Windows Forms Controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AmbientValueAttribute/Overview/attributesdemocontrol.cs._

## AmbientValueAttribute.Value property

```csharp
public object? Value { get; }
```

Gets the object that is the value of this `AmbientValueAttribute`.

Returns: The object that is the value of this `AmbientValueAttribute`.

To be added.

## AmbientValueAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `AmbientValueAttribute` is equal to the current `AmbientValueAttribute`.

Parameters:

- `obj`: The `AmbientValueAttribute` to compare with the current `AmbientValueAttribute`.

Returns: `true` if the specified `AmbientValueAttribute` is equal to the current `AmbientValueAttribute`; otherwise, `false`.

To be added.

## AmbientValueAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `AmbientValueAttribute`.

To be added.
