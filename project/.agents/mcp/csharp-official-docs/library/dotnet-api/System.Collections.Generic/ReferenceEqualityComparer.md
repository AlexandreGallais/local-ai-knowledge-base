---
title: "ReferenceEqualityComparer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/ReferenceEqualityComparer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReferenceEqualityComparer class

Namespace: `System.Collections.Generic`

```csharp
public sealed class ReferenceEqualityComparer : System.Collections.Generic.IEqualityComparer<object>, System.Collections.IEqualityComparer
```

An `IEqualityComparer<T>` that uses reference equality (`Object.ReferenceEquals`) instead of value equality (`Object.Equals`) when comparing two object instances.

#### Remarks

The `ReferenceEqualityComparer` type cannot be instantiated. Instead, use the `Instance` property to access the singleton instance of this type.

## ReferenceEqualityComparer.Instance property

```csharp
public static System.Collections.Generic.ReferenceEqualityComparer Instance { get; }
```

Gets the singleton `ReferenceEqualityComparer` instance.

Returns: To be added.

To be added.

## ReferenceEqualityComparer.Equals(Object, Object) method

```csharp
public bool Equals (object? x, object? y);
```

Determines whether two object references refer to the same object instance.

Parameters:

- `x`: The first object to compare.
- `y`: The second object to compare.

Returns: `true` if both `x` and `y` refer to the same object instance or if both are `null`; otherwise, `false`.

#### Remarks

This API is a wrapper around `ReferenceEquals`.
It is not necessarily equivalent to calling `Equals`.

## ReferenceEqualityComparer.GetHashCode(Object) method

```csharp
public int GetHashCode (object? obj);
```

Returns a hash code for the specified object. The returned hash code is based on the object identity, not on the contents of the object.

Parameters:

- `obj`: The object for which to retrieve the hash code.

Returns: A hash code for the identity of `obj`.

#### Remarks

This API is a wrapper around `GetHashCode`.
It is not necessarily equivalent to calling `GetHashCode`.
