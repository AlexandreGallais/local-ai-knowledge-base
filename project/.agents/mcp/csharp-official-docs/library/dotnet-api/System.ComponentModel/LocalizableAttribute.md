---
title: "LocalizableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/LocalizableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LocalizableAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class LocalizableAttribute : Attribute
```

Specifies whether a property or parameter should be localized. This class cannot be inherited.

#### Remarks
When code is generated for a component, members that are marked with the `LocalizableAttribute` set to `true` have their property values saved in resource files. You can localize these resource files without modifying the code.

By default, members that have no localizable attribute or are marked with the `LocalizableAttribute` set to `false` will have their property values persisted to code, if the data type allows. Otherwise, if the main component is set to `Localizable`, all properties will be persisted to the resource file. The default is `false`.

> **Note:**
> When you mark a property with the `LocalizableAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`. For a property marked with the `LocalizableAttribute` set to `false`, the value is `No`. Therefore, when you want to check the value of this attribute in your code, you must specify the attribute as `Yes` or `No`.

For more information, see Attributes.

#### Examples

The following example marks the `message` parameter as needing to be localized.

```csharp
public static void ShowMessage([Localizable(true)] string message)
```

The following example marks a property as needing to be localized.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LocalizableAttribute/Overview/source.cs._

The next example shows how to check the value of the `LocalizableAttribute` for `MyProperty`. First, the code gets a `PropertyDescriptorCollection` with all the properties for the object. Then, the code gets `MyProperty` from the `PropertyDescriptorCollection`. Next, it returns the attributes for this property and saves them in the attributes variable.

Finally, the code sets `myAttribute` to the value of the `LocalizableAttribute` in the `AttributeCollection` and checks whether the property needs to be localized.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LocalizableAttribute/Overview/source.cs._

## LocalizableAttribute.LocalizableAttribute(Boolean) constructor

```csharp
public LocalizableAttribute (bool isLocalizable);
```

Initializes a new instance of the `LocalizableAttribute` class.

Parameters:

- `isLocalizable`: `true` if a property should be localized; otherwise, `false`.

#### Examples
The following example marks a property as needing to be localized. This code creates a new `LocalizableAttribute`, sets its value to `Yes`, and binds it to the property.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LocalizableAttribute/.ctor/source.cs._

## LocalizableAttribute.IsLocalizable property

```csharp
public bool IsLocalizable { get; }
```

Gets a value indicating whether a property should be localized.

Returns: `true` if a property should be localized; otherwise, `false`.

#### Examples
The following example shows how to check the value of the `LocalizableAttribute` for `MyProperty`. First, the code gets a `PropertyDescriptorCollection` with all the properties for the object. Then, the code gets `MyProperty` from the `PropertyDescriptorCollection`. Next, it returns the attributes for this property and saves them in the attributes variable.

Finally, the code sets `myAttribute` to the value of the `LocalizableAttribute` in the `AttributeCollection` and checks whether the property needs to be localized.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LocalizableAttribute/IsLocalizable/source.cs._

## LocalizableAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `LocalizableAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## LocalizableAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `LocalizableAttribute`.

To be added.

## LocalizableAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Determines if this attribute is the default.

Returns: `true` if the attribute is the default value for this attribute class; otherwise, `false`.

To be added.

## LocalizableAttribute.Default field

```csharp
public static readonly System.ComponentModel.LocalizableAttribute Default;
```

Specifies the default value, which is `LocalizableAttribute.No`. This `static` field is read-only.

#### Remarks
When you mark a property with this value, this attribute is set to the constant member `No`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `No`.

## LocalizableAttribute.No field

```csharp
public static readonly System.ComponentModel.LocalizableAttribute No;
```

Specifies that a property should not be localized. This `static` field is read-only.

#### Remarks
This field is the default setting for this attribute.

When you mark a property with the `LocalizableAttribute` set to `false`, the value of this attribute is set to the constant member `No`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `No`.

## LocalizableAttribute.Yes field

```csharp
public static readonly System.ComponentModel.LocalizableAttribute Yes;
```

Specifies that a property should be localized. This `static` field is read-only.

#### Remarks
When you mark a property with the `LocalizableAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `Yes`.
