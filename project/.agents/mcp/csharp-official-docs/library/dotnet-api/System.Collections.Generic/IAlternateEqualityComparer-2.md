---
title: "IAlternateEqualityComparer<TAlternate,T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IAlternateEqualityComparer`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IAlternateEqualityComparer<TAlternate,T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IAlternateEqualityComparer<in TAlternate,T> where TAlternate : allows ref struct where T : allows ref struct
```

Implemented by an `IEqualityComparer<T>` to support comparing a `TAlternate` instance with a `T` instance.

Parameters:

- `TAlternate`: The alternate type to compare.
- `T`: The type to compare.

To be added.

## IAlternateEqualityComparer<TAlternate,T>.Create(TAlternate) method

```csharp
public T Create (TAlternate alternate);
```

Creates a `T` that is considered by `IAlternateEqualityComparer<T1,T2>.Equals` to be equal to the specified `alternate`.

Parameters:

- `alternate`: The instance of type `TAlternate` for which an equal `T` is required.

Returns: A `T` considered equal to the specified `alternate`.

To be added.

## IAlternateEqualityComparer<TAlternate,T>.Equals(TAlternate, T) method

```csharp
public bool Equals (TAlternate alternate, T other);
```

Determines whether the specified `alternate` equals the specified `other`.

Parameters:

- `alternate`: The instance of type `TAlternate` to compare.
- `other`: The instance of type `T` to compare.

Returns: `true` if the specified instances are equal; otherwise, `false`.

To be added.

## IAlternateEqualityComparer<TAlternate,T>.GetHashCode(TAlternate) method

```csharp
public int GetHashCode (TAlternate alternate);
```

Returns a hash code for the specified alternate instance.

Parameters:

- `alternate`: The instance of type `TAlternate` for which to get a hash code.

Returns: A hash code for the specified instance.

This interface is intended to be implemented on a type that also implements `IEqualityComparer<T>`.
The result of this method should return the same hash code as would invoking the `IEqualityComparer<T>.GetHashCode` method on any `T` for which `IAlternateEqualityComparer<T1,T2>.Equals` returns `true`.
