---
title: "Delegate+InvocationListEnumerator<TDelegate> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Delegate+InvocationListEnumerator`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Delegate+InvocationListEnumerator<TDelegate> struct

Namespace: `System`

```csharp
public struct Delegate.InvocationListEnumerator<TDelegate> where TDelegate : Delegate
```

Provides an enumerator for the invocation list of a delegate.

Parameters:

- `TDelegate`: Delegate type being enumerated.

To be added.

## Delegate+InvocationListEnumerator<TDelegate>.Current property

```csharp
public TDelegate Current { get; }
```

Implements the IEnumerator pattern.

Returns: To be added.

To be added.

## Delegate+InvocationListEnumerator<TDelegate>.GetEnumerator() method

```csharp
public Delegate.InvocationListEnumerator<TDelegate> GetEnumerator ();
```

Implements IEnumerable.GetEnumerator() to return 'this' as the IEnumerator.

Returns: An IEnumerator instance that can be used to iterate through the invocation targets of the delegate.

To be added.

## Delegate+InvocationListEnumerator<TDelegate>.MoveNext() method

```csharp
public bool MoveNext ();
```

Implements the IEnumerator pattern.

Returns: `true` if the enumerator was successfully advanced to the next element; otherwise, `false` if the enumerator has passed the end of the collection.

To be added.
