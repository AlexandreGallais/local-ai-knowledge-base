---
title: "ImmutableList<T>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableList`1+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableList<T>+Enumerator struct

Namespace: `System.Collections.Immutable`

```csharp
public struct ImmutableList<T>.Enumerator : System.Collections.Generic.IEnumerator<T>
```

Enumerates the contents of a binary tree.

#### Remarks
This structure should be kept synchronized with the other two binary tree enumerators: `Enumerator` and `Enumerator`.

> **Caution:**
>  When this enumerator is used as a value type (that is, when it isn't boxed), do not copy it by assigning it to a second variable or by passing it to another method. When this enumerator is disposed of, it returns a mutable reference type stack to a resource pool, and if the value type enumerator is copied (which can easily happen unintentionally if you pass the value around), there is a risk that a stack that has already been returned to the resource pool may still be in use by one of the enumerator copies, leading to data corruption or exceptions.

## ImmutableList<T>+Enumerator.Current property

```csharp
public T Current { get; }
```

Gets the element at the current position of the enumerator.

Returns: The element at the current position of the enumerator.

To be added.

## ImmutableList<T>+Enumerator.System.Collections.IEnumerator.Current property

```csharp
object? System.Collections.IEnumerator.Current { get; }
```

The current element.

Returns: The element in the collection at the current position of the enumerator.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Enumerator` instance is cast to an `IEnumerator` interface.

## ImmutableList<T>+Enumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases the resources used by the current instance of the `Enumerator` class.

To be added.

## ImmutableList<T>+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances enumeration to the next element of the immutable list.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the list.

To be added.

## ImmutableList<T>+Enumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the immutable list.

To be added.
