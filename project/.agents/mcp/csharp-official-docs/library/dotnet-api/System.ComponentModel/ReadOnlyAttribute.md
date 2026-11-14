---
title: "ReadOnlyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ReadOnlyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class ReadOnlyAttribute : Attribute
```

Specifies whether the property this attribute is bound to is read-only or read/write. This class cannot be inherited.

#### Remarks
Members that are marked with the `ReadOnlyAttribute` set to `true` or that do not have a `Set` method cannot be changed. Members that do not have this attribute or that are marked with the `ReadOnlyAttribute` set to `false` are read/write, and they can be changed. The default is `No`.

> **Important:**
>  The `PropertyDescriptor` class enforces the `ReadOnlyAttribute` in the design environment and at run time. When you mark a property with the `ReadOnlyAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`. For a property marked with the `ReadOnlyAttribute` set to `false`, the value is `No`. Therefore, when you want to check the value of this attribute in your code, you must specify the attribute as `Yes` or `No`.

For more information, see Attributes.

#### Examples
The following code example marks a property as read-only.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ReadOnlyAttribute/Overview/source.cs._

The next code example shows how to check the value of the `ReadOnlyAttribute` for `MyProperty`. First, the code gets a `PropertyDescriptorCollection` with all the properties for the object. Next, it indexes into the `PropertyDescriptorCollection` to get `MyProperty`. Then it returns the attributes for this property and saves them in the attributes variable.

The example presents two different ways of checking the value of the `ReadOnlyAttribute`. In the second code fragment, the example calls the `ReadOnlyAttribute.Equals` method. In the last code fragment, the example uses the `IsReadOnly` property to check the value.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ReadOnlyAttribute/Overview/source.cs._

If you marked a class with the `ReadOnlyAttribute`, use the following code example to check the value.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ReadOnlyAttribute/Overview/source.cs._

## ReadOnlyAttribute.ReadOnlyAttribute(Boolean) constructor

```csharp
public ReadOnlyAttribute (bool isReadOnly);
```

Initializes a new instance of the `ReadOnlyAttribute` class.

Parameters:

- `isReadOnly`: `true` to show that the property this attribute is bound to is read-only; `false` to show that the property is read/write.

#### Remarks
Members that are marked with the `ReadOnlyAttribute` set to `true` or that do not have a `Set` method cannot be changed. Members that do not have this attribute or that are marked with the `ReadOnlyAttribute` set to `false` are read/write, and they can be changed. The default is `No`.

> **Note:**
>  When you mark a property with the `ReadOnlyAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`. For a property marked with the `ReadOnlyAttribute` set to `false`, the value is `No`. Therefore, when you want to check the value of this attribute in your code, you must specify the attribute as `Yes` or `No`.

#### Examples
The following code example marks a property as read-only. This code creates a new `ReadOnlyAttribute`, sets its value to `Yes`, and binds it to the property.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ReadOnlyAttribute/.ctor/source.cs._

## ReadOnlyAttribute.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the property this attribute is bound to is read-only.

Returns: `true` if the property this attribute is bound to is read-only; `false` if the property is read/write.

#### Examples
The following code example checks to see whether `MyProperty` is read-only. First, the code gets the attributes for `MyProperty` by doing the following:

- Retrieving a `PropertyDescriptorCollection` with all the properties for the object.

- Indexing into the `PropertyDescriptorCollection` to get `MyProperty`.

- Saving the attributes for this property in the attributes variable.

Then the code sets `myAttribute` to the value of the `ReadOnlyAttribute` in the `AttributeCollection` and checks whether the property is read-only.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ReadOnlyAttribute/IsReadOnly/source.cs._

## ReadOnlyAttribute.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Indicates whether this instance and a specified object are equal.

Parameters:

- `value`: Another object to compare to.

Returns: `true` if `value` is equal to this instance; otherwise, `false`.

To be added.

## ReadOnlyAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `ReadOnlyAttribute`.

To be added.

## ReadOnlyAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Determines if this attribute is the default.

Returns: `true` if the attribute is the default value for this attribute class; otherwise, `false`.

To be added.

## ReadOnlyAttribute.Default field

```csharp
public static readonly System.ComponentModel.ReadOnlyAttribute Default;
```

Specifies the default value for the `ReadOnlyAttribute`, which is `ReadOnlyAttribute.No` (that is, the property this attribute is bound to is read/write). This `static` field is read-only.

#### Remarks
When you mark a property with this value, this attribute is set to the constant member `No`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `No`.

## ReadOnlyAttribute.No field

```csharp
public static readonly System.ComponentModel.ReadOnlyAttribute No;
```

Specifies that the property this attribute is bound to is read/write and can be modified. This `static` field is read-only.

#### Remarks
This field is the default setting for this attribute.

When you mark a property with the `ReadOnlyAttribute` set to `false`, the value of this attribute is set to the constant member `No`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `No`.

## ReadOnlyAttribute.Yes field

```csharp
public static readonly System.ComponentModel.ReadOnlyAttribute Yes;
```

Specifies that the property this attribute is bound to is read-only and cannot be modified in the server explorer. This `static` field is read-only.

#### Remarks
When you mark a property with the `ReadOnlyAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `Yes`.
