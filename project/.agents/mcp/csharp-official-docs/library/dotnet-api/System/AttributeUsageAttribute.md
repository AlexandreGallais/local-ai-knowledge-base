---
title: "AttributeUsageAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AttributeUsageAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AttributeUsageAttribute class

Namespace: `System`

```csharp
public sealed class AttributeUsageAttribute : Attribute
```

Specifies the usage of another attribute class. This class cannot be inherited.

#### Remarks
When you are defining your own attribute class, you can control the manner in which it is used by placing an `AttributeUsageAttribute` on your attribute class. The indicated attribute class must derive from `Attribute`, either directly or indirectly.

Attribute classes have positional and named parameters. Each public constructor for an attribute class defines a valid sequence of positional parameters for that class. Named parameters are defined by the non-static, public, and read-write fields or properties of the attribute class.

The three properties of `AttributeUsageAttribute` are set by defining the following parameters:

-   `AttributeUsageAttribute.ValidOn`

This positional parameter specifies the program elements that the indicated attribute can be placed on. The set of all possible elements that you can place an attribute on is listed in the `AttributeTargets` enumeration. You can combine several `AttributeTargets` values using a bitwise OR operation to get the desired combination of valid program elements.

-   `AttributeUsageAttribute.AllowMultiple`

This named parameter specifies whether the indicated attribute can be specified more than once for a given program element.

-   `AttributeUsageAttribute.Inherited`

This named parameter specifies whether the indicated attribute can be inherited by derived classes and overriding members.

For more information about using attributes, see `Attribute` and Attributes.

## AttributeUsageAttribute.AttributeUsageAttribute(AttributeTargets) constructor

```csharp
public AttributeUsageAttribute (AttributeTargets validOn);
```

Initializes a new instance of the `AttributeUsageAttribute` class with the specified list of `AttributeTargets`, the `AttributeUsageAttribute.AllowMultiple` value, and the `AttributeUsageAttribute.Inherited` value.

Parameters:

- `validOn`: The set of values combined using a bitwise OR operation to indicate which program elements are valid.

#### Remarks
You can combine several `AttributeTargets` values using a bitwise OR operation to get the desired combination of valid program elements.

For default property values, see the `AttributeUsageAttribute.ValidOn`, `AttributeUsageAttribute.AllowMultiple`, and `AttributeUsageAttribute.Inherited` properties.

#### Examples
The definition of the DispId attribute illustrates the use of a bitwise OR operation to combine several `AttributeTargets` values.

_Code sample not included: ~/snippets/csharp/System/AttributeUsageAttribute/.ctor/source.cs._

## AttributeUsageAttribute.AllowMultiple property

```csharp
public bool AllowMultiple { get; set; }
```

Gets or sets a Boolean value indicating whether more than one instance of the indicated attribute can be specified for a single program element.

Returns: `true` if more than one instance is allowed to be specified; otherwise, `false`. The default is `false`.

#### Remarks
An attribute that can be specified more than once for a program element is called a multi-use attribute. An attribute that can be specified only once is called a single-use attribute.

## AttributeUsageAttribute.Inherited property

```csharp
public bool Inherited { get; set; }
```

Gets or sets a `Boolean` value that determines whether the indicated attribute is inherited by derived classes and overriding members.

Returns: `true` if the attribute can be inherited by derived classes and overriding members; otherwise, `false`. The default is `true`.

#### Remarks
The `Inherited` property determines:

- Whether classes derived from a base class tagged with the attribute to which the `AttributeUsageAttribute` attribute is applied inherit that attribute.

- Whether methods of derived classes that override a base class method tagged with the attribute to which the `AttributeUsageAttribute` attribute is applied inherit that attribute.  (If a class inherits a base class member, it also inherits any attributes applied to that member.)

#### Examples
The following example illustrates the difference between an attribute to which an `AttributeUsageAttribute` attribute with an `Inherited` property value of `true` is applied and one to which  `AttributeUsageAttribute` attribute with an `Inherited` property value of `false` is applied. The example defines two attributes, `InheritedAttribute` and `NotInheritedAttribute`. Both attributes can apply to classes and methods. Because the `Inherited` property of the `AttributeUsageAttribute` attribute applied to `InheritedAttribute` is `true`, it is inherited by derived classes and the members of derived classes that override the base class method.  On the other hand, because the `Inherited` property of the `AttributeUsageAttribute` attribute applied to `NotInheritedAttribute` is `false`, it is not inherited by derived classes and the members of derived classes that override the base class method.

_Code sample not included: ~/snippets/csharp/System/AttributeUsageAttribute/Inherited/Inherited1.cs._

The example then defines two  base classes. The first, `BaseA`, has a single method, `MethodA`.  The second, `BaseB`, has a single method, `MethodB`. `BaseA` and `MethodA` are tagged with the `InheritedAttribute` attribute, and `BaseB` and `MethodB` are tagged with the `NotInheritedAttribute` attribute. `DerivedA` inherits from `BaseA` and overrides its `MethodA` method. `DerivedB` inherits from `BaseB` and overrides its `MethodB` method.

_Code sample not included: ~/snippets/csharp/System/AttributeUsageAttribute/Inherited/Inherited1.cs._

As the output from the example shows, `DerivedA` and `DerivedA.MethodA` inherit the `InheritedAttribute` attribute, but `DerivedB` and `DerivedB.MethodB` do not inherit the `NotInheritedAttribute` attribute.

## AttributeUsageAttribute.ValidOn property

```csharp
public AttributeTargets ValidOn { get; }
```

Gets a set of values identifying which program elements that the indicated attribute can be applied to.

Returns: One or several `AttributeTargets` values. The default is `All`.

To be added.
