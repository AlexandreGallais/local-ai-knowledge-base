---
title: "RecommendedAsConfigurableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/RecommendedAsConfigurableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RecommendedAsConfigurableAttribute class

Namespace: `System.ComponentModel`

```csharp
public class RecommendedAsConfigurableAttribute : Attribute
```

Specifies that the property can be used as an application setting.

To be added.

## RecommendedAsConfigurableAttribute.RecommendedAsConfigurableAttribute(Boolean) constructor

```csharp
public RecommendedAsConfigurableAttribute (bool recommendedAsConfigurable);
```

Initializes a new instance of the `RecommendedAsConfigurableAttribute` class.

Parameters:

- `recommendedAsConfigurable`: `true` if the property this attribute is bound to can be used as an application setting; otherwise, `false`.

To be added.

## RecommendedAsConfigurableAttribute.RecommendedAsConfigurable property

```csharp
public bool RecommendedAsConfigurable { get; }
```

Gets a value indicating whether the property this attribute is bound to can be used as an application setting.

Returns: `true` if the property this attribute is bound to can be used as an application setting; otherwise, `false`.

To be added.

## RecommendedAsConfigurableAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: Another object to compare to.

Returns: `true` if `obj` is equal to this instance; otherwise, `false`.

To be added.

## RecommendedAsConfigurableAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `RecommendedAsConfigurableAttribute`.

To be added.

## RecommendedAsConfigurableAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Indicates whether the value of this instance is the default value for the class.

Returns: `true` if this instance is the default attribute for the class; otherwise, `false`.

To be added.

## RecommendedAsConfigurableAttribute.Default field

```csharp
public static readonly System.ComponentModel.RecommendedAsConfigurableAttribute Default;
```

Specifies the default value for the `RecommendedAsConfigurableAttribute`, which is `RecommendedAsConfigurableAttribute.No`. This `static` field is read-only.

To be added.

## RecommendedAsConfigurableAttribute.No field

```csharp
public static readonly System.ComponentModel.RecommendedAsConfigurableAttribute No;
```

Specifies that a property cannot be used as an application setting. This `static` field is read-only.

#### Remarks
This field is the default setting for this attribute.

When you mark a property with `RecommendedAsConfigurableAttribute` set to `false`, the value of this attribute is set to the constant member `No`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute `No`.

## RecommendedAsConfigurableAttribute.Yes field

```csharp
public static readonly System.ComponentModel.RecommendedAsConfigurableAttribute Yes;
```

Specifies that a property can be used as an application setting. This `static` field is read-only.

#### Remarks
When you mark a property with `RecommendedAsConfigurableAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`.

Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `Yes`.
