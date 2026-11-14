---
title: "BrowsableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/BrowsableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BrowsableAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class BrowsableAttribute : Attribute
```

Specifies whether a property or event should be displayed in a Properties window.

#### Remarks
A visual designer typically displays in the Properties window those members that either have no browsable attribute or are marked with the `BrowsableAttribute.%23ctor` constructor's `browsable` parameter set to `true`. These members can be modified at design time. Members marked with the `BrowsableAttribute.%23ctor` constructor's `browsable` parameter set to `false` are not appropriate for design-time editing and therefore are not displayed in a visual designer. The default is `true`.

> **Note:**
>  When you mark a property with `Browsable(true)`, the value of this attribute is set to the constant member `Yes`. For a property marked with `Browsable(false)`, the value is `No`. Therefore, when you check the value of this attribute in your code, you must specify the attribute as `Yes` or `No`.

For more information, see Attributes.

#### Examples
The following example marks a property as browsable.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BrowsableAttribute/Overview/source.cs._

The next example shows how to check the value of the `BrowsableAttribute` for `MyProperty`. First, the code gets a `PropertyDescriptorCollection` with all the properties for the object. Next, the code indexes into the `PropertyDescriptorCollection` to get `MyProperty`. Then it returns the attributes for this property and saves them in the attributes variable.

The example presents two different ways of checking the value of the `BrowsableAttribute`. In the second code fragment, the example calls the `Object.Equals` method. In the last code fragment, the example uses the `Browsable` property to check the value.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BrowsableAttribute/Overview/source.cs._

If you marked a class with the `BrowsableAttribute`, use the following code to check the value.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BrowsableAttribute/Overview/source.cs._

## BrowsableAttribute.BrowsableAttribute(Boolean) constructor

```csharp
public BrowsableAttribute (bool browsable);
```

Initializes a new instance of the `BrowsableAttribute` class.

Parameters:

- `browsable`: `true` if a property or event can be modified at design time; otherwise, `false`. The default is `true`.

#### Remarks
When you mark a property with the `BrowsableAttribute.%23ctor` constructor of the value `true`, the value of this attribute is set to the constant member `Yes`. For a property marked with the `BrowsableAttribute.%23ctor` constructor of the value `false`, the value is `No`. Therefore, when you want to check the value of this attribute in your code, you must specify the attribute as `Yes` or `No`.

#### Examples
The following example marks a property as browsable. This code creates a new `BrowsableAttribute`, sets its value to `Yes`, and binds it to the property.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BrowsableAttribute/.ctor/source.cs._

## BrowsableAttribute.Browsable property

```csharp
public bool Browsable { get; }
```

Gets a value indicating whether an object is browsable.

Returns: `true` if the object is browsable; otherwise, `false`.

#### Examples
The following example checks to see whether `MyProperty` is browsable. First the code gets the attributes for `MyProperty` by:

- Retrieving a `PropertyDescriptorCollection` with all the properties for the object.

- Indexing into the `PropertyDescriptorCollection` to get `MyProperty`.

- Saving the attributes for this property in the attributes variable.

Then the code sets `myAttribute` to the value of the `BrowsableAttribute` in the `AttributeCollection` and checks whether the property is browsable.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BrowsableAttribute/Browsable/source.cs._

## BrowsableAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: Another object to compare to.

Returns: `true` if `obj` is equal to this instance; otherwise, `false`.

To be added.

## BrowsableAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## BrowsableAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Determines if this attribute is the default.

Returns: `true` if the attribute is the default value for this attribute class; otherwise, `false`.

To be added.

## BrowsableAttribute.Default field

```csharp
public static readonly System.ComponentModel.BrowsableAttribute Default;
```

Specifies the default value for the `BrowsableAttribute`, which is `BrowsableAttribute.Yes`. This `static` field is read-only.

#### Remarks
When you mark a property with this value, this attribute is set to the constant member `Yes`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `Yes`.

## BrowsableAttribute.No field

```csharp
public static readonly System.ComponentModel.BrowsableAttribute No;
```

Specifies that a property or event cannot be modified at design time. This `static` field is read-only.

#### Remarks
When you mark a property with the `BrowsableAttribute.%23ctor` constructor of the value `false`, this attribute is set to the constant member `No`. Therefore, when you check whether the attribute is set to this value in your code, you must specify the attribute as `No`.

## BrowsableAttribute.Yes field

```csharp
public static readonly System.ComponentModel.BrowsableAttribute Yes;
```

Specifies that a property or event can be modified at design time. This `static` field is read-only.

#### Remarks
This field is the default setting for this attribute.

When you mark a property with the `BrowsableAttribute.%23ctor` constructor of the value `true`, this attribute is set to the constant member `Yes`. Therefore, when you check whether the attribute is set to this value in your code, you must specify the attribute as `Yes`.
