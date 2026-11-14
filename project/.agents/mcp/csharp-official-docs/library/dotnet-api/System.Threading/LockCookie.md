---
title: "LockCookie struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/LockCookie.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LockCookie struct

Namespace: `System.Threading`

```csharp
public struct LockCookie : IEquatable<System.Threading.LockCookie>
```

Defines the lock that implements single-writer/multiple-reader semantics. This is a value type.

#### Examples
The following example shows how to request a reader lock, upgrade the reader lock to a writer lock, and save the `LockCookie`. It then uses the `LockCookie` to downgrade to a reader lock again.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## LockCookie.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether a specified object is a `LockCookie` and is equal to the current instance.

Parameters:

- `obj`: The object to compare to the current instance.

Returns: `true` if the value of `obj` is equal to the value of the current instance; otherwise, `false`.

To be added.

## LockCookie.Equals(LockCookie) method

```csharp
public bool Equals (System.Threading.LockCookie obj);
```

Indicates whether the current instance is equal to the specified `LockCookie`.

Parameters:

- `obj`: The `LockCookie` to compare to the current instance.

Returns: `true` if `obj` is equal to the value of the current instance; otherwise, `false`.

To be added.

## LockCookie.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## LockCookie.op_Equality(LockCookie, LockCookie) method

```csharp
public static bool operator == (System.Threading.LockCookie a, System.Threading.LockCookie b);
```

Indicates whether two `LockCookie` structures are equal.

Parameters:

- `a`: The `LockCookie` to compare to `b`.
- `b`: The `LockCookie` to compare to `a`.

Returns: `true` if `a` is equal to `b`; otherwise, `false`.

The equivalent method for this operator is `Equals`.

## LockCookie.op_Inequality(LockCookie, LockCookie) method

```csharp
public static bool operator != (System.Threading.LockCookie a, System.Threading.LockCookie b);
```

Indicates whether two `LockCookie` structures are not equal.

Parameters:

- `a`: The `LockCookie` to compare to `b`.
- `b`: The `LockCookie` to compare to `a`.

Returns: `true` if `a` is not equal to `b`; otherwise, `false`.

The equivalent method for this operator is `Equals`.
