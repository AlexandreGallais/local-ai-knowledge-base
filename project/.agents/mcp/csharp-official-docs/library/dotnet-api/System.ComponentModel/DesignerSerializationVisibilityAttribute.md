---
title: "DesignerSerializationVisibilityAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DesignerSerializationVisibilityAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DesignerSerializationVisibilityAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class DesignerSerializationVisibilityAttribute : Attribute
```

Specifies the type of persistence to use when serializing a property on a component at design time.

#### Remarks
When a serializer persists the persistable state of a design mode document, it often adds code to the initialization method of components to persist values of properties that have been set at design time. This happens by default for most basic types, if no attribute has been set to direct other behavior.

With the `DesignerSerializationVisibilityAttribute`, you can indicate whether the value for a property is `Visible`, and should be persisted in initialization code, `Hidden`, and should not be persisted in initialization code, or consists of `Content`, which should have initialization code generated for each public, not hidden property of the object assigned to the property.

Members that do not have a `DesignerSerializationVisibilityAttribute` will be treated as though they have a `DesignerSerializationVisibilityAttribute` with a value of `Visible`. The values of a property marked as `Visible` will be serialized, if possible, by a serializer for the type. To specify custom serialization for a particular type or property, use the `DesignerSerializerAttribute`.

For more information, see Attributes.

#### Examples
The following code example demonstrates the use of a `DesignerSerializationVisibilityAttribute` set to `Content`. It persists the values of a public property of a user control, which can be configured at design time. To use the example, first compile the following code into a user control library. Next, add a reference to the compiled .dll file in a new Windows Application project. If you are using Visual Studio, the `ContentSerializationExampleControl` is automatically added to the **Toolbox**.

Drag the control from the **Toolbox** to a form, and set the properties of the `DimensionData` object listed in the Properties window. When you view the code for the form, code will have been added to the `InitializeComponent` method of the parent form. This code sets the values of the control's properties to those that you have set in design mode.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DesignerSerializationVisibilityAttribute/Overview/source.cs._

## DesignerSerializationVisibilityAttribute.DesignerSerializationVisibilityAttribute(DesignerSerializationVisibility) constructor

```csharp
public DesignerSerializationVisibilityAttribute (System.ComponentModel.DesignerSerializationVisibility visibility);
```

Initializes a new instance of the `DesignerSerializationVisibilityAttribute` class using the specified `DesignerSerializationVisibility` value.

Parameters:

- `visibility`: One of the `DesignerSerializationVisibility` values.

#### Examples
The following code example specifies how a property on a component is saved by a designer. This code creates a new `DesignerSerializationVisibilityAttribute` and sets its value to `Content`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DesignerSerializationVisibilityAttribute/.ctor/source.cs._

## DesignerSerializationVisibilityAttribute.Visibility property

```csharp
public System.ComponentModel.DesignerSerializationVisibility Visibility { get; }
```

Gets a value indicating the basic <example-value> mode a serializer should use when determining whether and how to persist the value of a property.

Returns: One of the `DesignerSerializationVisibility` values. The default is `DesignerSerializationVisibility.Visible`.

#### Examples
The following code example shows how to check the value of the `DesignerSerializationVisibilityAttribute` for `MyProperty`. First the code gets a `PropertyDescriptorCollection` with all the properties for the object. Next, the code indexes into the `PropertyDescriptorCollection` to get `MyProperty`. Then, the code returns the attributes for this property and saves them in the attributes variable.

This example presents two different ways to check the value of the `DesignerSerializationVisibilityAttribute`. In the second code fragment, the example calls the `Object.Equals` method with a `static` value. In the last code fragment, the example uses the `Visibility` property to check the value.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DesignerSerializationVisibilityAttribute/Visibility/source.cs._

## DesignerSerializationVisibilityAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: Another object to compare to.

Returns: `true` if `obj` is equal to this instance; otherwise, `false`.

To be added.

## DesignerSerializationVisibilityAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this object.

Returns: A 32-bit signed integer hash code.

To be added.

## DesignerSerializationVisibilityAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Gets a value indicating whether the current value of the attribute is the default value for the attribute.

Returns: `true` if the attribute is set to the default value; otherwise, `false`.

To be added.

## DesignerSerializationVisibilityAttribute.Content field

```csharp
public static readonly System.ComponentModel.DesignerSerializationVisibilityAttribute Content;
```

Specifies that a serializer should serialize the contents of the property, rather than the property itself. This field is read-only.

#### Remarks
When you mark a property with `DesignerSerializationVisibilityAttribute.Content`, the value of its `Visibility` property is set to `Content`.

## DesignerSerializationVisibilityAttribute.Default field

```csharp
public static readonly System.ComponentModel.DesignerSerializationVisibilityAttribute Default;
```

Specifies the default value, which is `DesignerSerializationVisibilityAttribute.Visible`, that is, a visual designer uses default rules to generate the value of a property. This `static` field is read-only.

#### Remarks
When you mark a property with this value, this attribute is set to the constant member `Visible`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `Visible`.

## DesignerSerializationVisibilityAttribute.Hidden field

```csharp
public static readonly System.ComponentModel.DesignerSerializationVisibilityAttribute Hidden;
```

Specifies that a serializer should not serialize the value of the property. This `static` field is read-only.

#### Remarks
When you mark a property with `DesignerSerializationVisibilityAttribute.Hidden`, the value of its `Visibility` property is set to the constant member `Hidden`.

## DesignerSerializationVisibilityAttribute.Visible field

```csharp
public static readonly System.ComponentModel.DesignerSerializationVisibilityAttribute Visible;
```

Specifies that a serializer should be allowed to serialize the value of the property. This `static` field is read-only.

#### Remarks
This field is the default setting for this attribute.

When you mark a property with `DesignerSerializationVisibilityAttribute.Visible`, the value of its `Visibility` property is set to the constant member `Visible`.
