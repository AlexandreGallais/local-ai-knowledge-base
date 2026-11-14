---
title: "MergablePropertyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/MergablePropertyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MergablePropertyAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class MergablePropertyAttribute : Attribute
```

Specifies that this property can be combined with properties belonging to other objects in a Properties window.

#### Remarks
Properties that are marked with the `MergablePropertyAttribute` set to `true` can be combined with properties belonging to other objects in a Properties window. Properties that are marked with the `MergablePropertyAttribute` set to `false` must be displayed separately. The default is `true`.

> **Note:**
>  When you mark a property with the `MergablePropertyAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`. For a property marked with the `MergablePropertyAttribute` property set to `false`, the value is `No`. Therefore, when you want to check the value of this attribute in your code, you must specify the attribute as `Yes` or `No`.

For more information, see Attributes.

#### Examples
The following example marks a property as appropriate to merge.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/MergablePropertyAttribute/Overview/source.cs._

The next example shows how to check the value of the `MergablePropertyAttribute` for `MyProperty`. First the code gets a `PropertyDescriptorCollection` with all the properties for the object. Next it indexes into the `PropertyDescriptorCollection` to get `MyProperty`. Then it returns the attributes for this property and saves them in the attributes variable.

The example presents two different ways of checking the value of the `MergablePropertyAttribute`. In the second code fragment, the example calls the `MergablePropertyAttribute.Equals` method with a `static` value. In the last code fragment, the example uses the `AllowMerge` property to check the value.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/MergablePropertyAttribute/Overview/source.cs._

If you marked a class with the `MergablePropertyAttribute`, use the following code to check the value.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/MergablePropertyAttribute/Overview/source.cs._

## MergablePropertyAttribute.MergablePropertyAttribute(Boolean) constructor

```csharp
public MergablePropertyAttribute (bool allowMerge);
```

Initializes a new instance of the `MergablePropertyAttribute` class.

Parameters:

- `allowMerge`: `true` if this property can be combined with properties belonging to other objects in a Properties window; otherwise, `false`.

#### Examples
The following example marks a property as appropriate to merge. This code creates a new `MergablePropertyAttribute`, sets its value to `Yes`, and binds it to the property.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/MergablePropertyAttribute/.ctor/source.cs._

## MergablePropertyAttribute.AllowMerge property

```csharp
public bool AllowMerge { get; }
```

Gets a value indicating whether this property can be combined with properties belonging to other objects in a Properties window.

Returns: `true` if this property can be combined with properties belonging to other objects in a Properties window; otherwise, `false`.

#### Examples
The following example checks to see whether `MyProperty` is appropriate to merge. First the code gets the attributes for `MyProperty` by:

- Retrieving a `PropertyDescriptorCollection` with all the properties for the object.

- Indexing into the `PropertyDescriptorCollection` to get `MyProperty`.

- Saving the attributes for this property in the attributes variable.

Then the code sets `myAttribute` to the value of the `MergablePropertyAttribute` in the `AttributeCollection` and checks whether the property is appropriate to merge.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/MergablePropertyAttribute/AllowMerge/source.cs._

## MergablePropertyAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: Another object to compare to.

Returns: `true` if `obj` is equal to this instance; otherwise, `false`.

To be added.

## MergablePropertyAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `MergablePropertyAttribute`.

To be added.

## MergablePropertyAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Determines if this attribute is the default.

Returns: `true` if the attribute is the default value for this attribute class; otherwise, `false`.

To be added.

## MergablePropertyAttribute.Default field

```csharp
public static readonly System.ComponentModel.MergablePropertyAttribute Default;
```

Specifies the default value, which is `MergablePropertyAttribute.Yes`, that is a property can be combined with properties belonging to other objects in a Properties window. This `static` field is read-only.

#### Remarks
When you mark a property with this value, this attribute is set to the constant member `No`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `No`.

## MergablePropertyAttribute.No field

```csharp
public static readonly System.ComponentModel.MergablePropertyAttribute No;
```

Specifies that a property cannot be combined with properties belonging to other objects in a Properties window. This `static` field is read-only.

#### Remarks
When you mark a property with the `MergablePropertyAttribute` set to `false`, the value of this attribute is set to the constant member `No`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `No`.

## MergablePropertyAttribute.Yes field

```csharp
public static readonly System.ComponentModel.MergablePropertyAttribute Yes;
```

Specifies that a property can be combined with properties belonging to other objects in a Properties window. This `static` field is read-only.

#### Remarks
This field is the default setting for this attribute.

When you mark a property with the `MergablePropertyAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `Yes`.
