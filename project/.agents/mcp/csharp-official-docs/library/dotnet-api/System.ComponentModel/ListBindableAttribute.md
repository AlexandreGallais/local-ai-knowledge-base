---
title: "ListBindableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ListBindableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ListBindableAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class ListBindableAttribute : Attribute
```

Specifies that a list can be used as a data source. A visual designer should use this attribute to determine whether to display a particular list in a data-binding picker. This class cannot be inherited.

#### Remarks
For more information about using attributes, see Attributes.

## ListBindableAttribute.ListBindableAttribute(Boolean) constructor

```csharp
public ListBindableAttribute (bool listBindable);
```

Initializes a new instance of the `ListBindableAttribute` class using a value to indicate whether the list is bindable.

Parameters:

- `listBindable`: `true` if the list is bindable; otherwise, `false`.

To be added.

## ListBindableAttribute.ListBindableAttribute(BindableSupport) constructor

```csharp
public ListBindableAttribute (System.ComponentModel.BindableSupport flags);
```

Initializes a new instance of the `ListBindableAttribute` class using `BindableSupport` to indicate whether the list is bindable.

Parameters:

- `flags`: A `BindableSupport` that indicates whether the list is bindable.

To be added.

## ListBindableAttribute.ListBindable property

```csharp
public bool ListBindable { get; }
```

Gets whether the list is bindable.

Returns: `true` if the list is bindable; otherwise, `false`.

To be added.

## ListBindableAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the object passed is equal to this `ListBindableAttribute`.

Parameters:

- `obj`: The object to test equality with.

Returns: `true` if the object passed is equal to this `ListBindableAttribute`; otherwise, `false`.

To be added.

## ListBindableAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `ListBindableAttribute`.

To be added.

## ListBindableAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Returns whether `ListBindableAttribute.ListBindable` is set to the default value.

Returns: `true` if `ListBindableAttribute.ListBindable` is set to the default value; otherwise, `false`.

To be added.

## ListBindableAttribute.Default field

```csharp
public static readonly System.ComponentModel.ListBindableAttribute Default;
```

Represents the default value for `ListBindableAttribute`.

#### Remarks
Defaults to `Yes`.

## ListBindableAttribute.No field

```csharp
public static readonly System.ComponentModel.ListBindableAttribute No;
```

Specifies that the list is not bindable. This `static` field is read-only.

To be added.

## ListBindableAttribute.Yes field

```csharp
public static readonly System.ComponentModel.ListBindableAttribute Yes;
```

Specifies that the list is bindable. This `static` field is read-only.

#### Remarks
This field is the default setting for this attribute.
