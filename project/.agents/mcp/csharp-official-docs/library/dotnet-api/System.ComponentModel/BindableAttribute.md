---
title: "BindableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/BindableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BindableAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class BindableAttribute : Attribute
```

Specifies whether a member is typically used for binding. This class cannot be inherited.

#### Remarks
You can specify this attribute for multiple members, typically properties, on a control.

If a property has been marked with the `BindableAttribute` set to `true`, then a property change notification should be raised for that property. This means that if the `Bindable` property is `Yes`, then two-way data binding is supported. If `BindableAttribute.Bindable` is `No`, you can still bind to the property, but it should not be shown in the default set of properties to bind to, because it might or might not raise a property change notification.

> **Note:**
>  When you mark a property with `BindableAttribute.%23ctor` set to `true`, the value of this attribute is set to the constant member `Yes`. For a property marked with the `BindableAttribute.%23ctor` set to `false`, the value is `No`. Therefore, to check the value of this attribute in your code, you must specify the attribute as `Yes` or `No`.

> **Caution:**
>  You can use this attribute at design time only. Nothing prevents you from binding to any property during run time.

For more information, see Attributes.

#### Examples
The following code example marks a property as appropriate to bind data to.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindableAttribute/Overview/source.cs._

The next code example shows how to check the value of the `BindableAttribute` for `MyProperty`. First, the code gets a `PropertyDescriptorCollection` with all the properties for the object. Next, the code indexes into the `PropertyDescriptorCollection` to get `MyProperty`. Finally, the code returns the attributes for this property and saves them in the attributes variable. The code example presents two different ways to check the value of the `BindableAttribute`. In the second code fragment, the example calls the `Object.Equals` method. In the last code fragment, the example uses the `Bindable` property to check the value.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindableAttribute/Overview/source.cs._

If you marked a class with the `BindableAttribute`, use the following code example to check the value.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindableAttribute/Overview/source.cs._

## BindableAttribute.BindableAttribute(Boolean) constructor

```csharp
public BindableAttribute (bool bindable);
```

Initializes a new instance of the `BindableAttribute` class with a Boolean value.

Parameters:

- `bindable`: `true` to use property for binding; otherwise, `false`.

#### Remarks
When you mark a property with the `BindableAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`. For a property marked with the `BindableAttribute` set to `false`, the value is `No`. Therefore, to check the value of this attribute in your code, you must specify the attribute as `Yes` or `No`.

#### Examples
The following code example marks a property as appropriate to bind data to. This code example creates a new `BindableAttribute`, sets its value to `Yes`, and binds it to the property.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindableAttribute/.ctor/source.cs._

## BindableAttribute.BindableAttribute(BindableSupport) constructor

```csharp
public BindableAttribute (System.ComponentModel.BindableSupport flags);
```

Initializes a new instance of the `BindableAttribute` class with one of the `BindableSupport` values.

Parameters:

- `flags`: One of the `BindableSupport` values.

#### Remarks
When you mark a property with the `BindableAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`. For a property marked with the `BindableAttribute` set to `false`, the value is `No`. Therefore, to check the value of this attribute in your code, you must specify the attribute as `Yes` or `No`.

#### Examples
The following code example marks a property as appropriate to bind data to. This code example creates a new `BindableAttribute`, sets its value to `Yes`, and binds it to the property.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindableAttribute/.ctor/source1.cs._

## BindableAttribute.BindableAttribute(Boolean, BindingDirection) constructor

```csharp
public BindableAttribute (bool bindable, System.ComponentModel.BindingDirection direction);
```

Initializes a new instance of the `BindableAttribute` class.

Parameters:

- `bindable`: `true` to use property for binding; otherwise, `false`.
- `direction`: One of the `BindingDirection` values.

To be added.

## BindableAttribute.BindableAttribute(BindableSupport, BindingDirection) constructor

```csharp
public BindableAttribute (System.ComponentModel.BindableSupport flags, System.ComponentModel.BindingDirection direction);
```

Initializes a new instance of the `BindableAttribute` class.

Parameters:

- `flags`: One of the `BindableSupport` values.
- `direction`: One of the `BindingDirection` values.

To be added.

## BindableAttribute.Bindable property

```csharp
public bool Bindable { get; }
```

Gets a value indicating that a property is typically used for binding.

Returns: `true` if the property is typically used for binding; otherwise, `false`.

#### Examples
The following code example checks to see whether `MyProperty` is bindable. First the code gets the attributes for `MyProperty` by doing the following:

- Retrieving a `PropertyDescriptorCollection` with all the properties for the object.

- Indexing into the `PropertyDescriptorCollection` to get `MyProperty`.

- Saving the attributes for this property in the attributes variable.

Then, the code sets `myAttribute` to the value of the `BindableAttribute` in the `AttributeCollection` and checks whether the property is bindable.

For this code example to run, you must provide the fully qualified assembly name. For information about how to obtain the fully qualified assembly name, see

Assembly Names.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindableAttribute/Bindable/source.cs._

## BindableAttribute.Direction property

```csharp
public System.ComponentModel.BindingDirection Direction { get; }
```

Gets a value indicating the direction or directions of this property's data binding.

Returns: The direction of this property's data binding.

To be added.

## BindableAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether two `BindableAttribute` objects are equal.

Parameters:

- `obj`: The object to compare.

Returns: `true` if the specified `BindableAttribute` is equal to the current `BindableAttribute`; `false` if it is not equal.

To be added.

## BindableAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for the `BindableAttribute` class.

Returns: A hash code for the current `BindableAttribute`.

To be added.

## BindableAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Determines if this attribute is the default.

Returns: `true` if the attribute is the default value for this attribute class; otherwise, `false`.

To be added.

## BindableAttribute.Default field

```csharp
public static readonly System.ComponentModel.BindableAttribute Default;
```

Specifies the default value for the `BindableAttribute`, which is `BindableAttribute.No`. This field is read-only.

#### Remarks
When you mark a property with this value, the `BindableAttribute` is set to the constant member `No`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `No`.

## BindableAttribute.No field

```csharp
public static readonly System.ComponentModel.BindableAttribute No;
```

Specifies that a property is not typically used for binding. This field is read-only.

#### Remarks
The `No` field is the default setting for the `BindableAttribute`.

When you mark a property with the `BindableAttribute.%23ctor` constructor of the value `false,` the value of this attribute is set to the constant member `No`. Therefore, to check whether the attribute is set to this value in your code, you must specify the attribute as `No`.

## BindableAttribute.Yes field

```csharp
public static readonly System.ComponentModel.BindableAttribute Yes;
```

Specifies that a property is typically used for binding. This field is read-only.

#### Remarks
When you mark a property with the `BindableAttribute.%23ctor` constructor of the value `true`, the value of the `BindableAttribute` is set to the constant member `Yes`. Therefore, to check whether the attribute is set to this value in your code, you must specify the attribute as `Yes`.
