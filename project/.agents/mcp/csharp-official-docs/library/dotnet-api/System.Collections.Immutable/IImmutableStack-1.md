---
title: "IImmutableStack<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/IImmutableStack`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IImmutableStack<T> interface

Namespace: `System.Collections.Immutable`

```csharp
public interface IImmutableStack<T> : System.Collections.Generic.IEnumerable<T>
```

Represents an immutable last-in-first-out (LIFO) collection.

Parameters:

- `T`: The type of elements in the stack.

To be added.

## IImmutableStack<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether this immutable stack is empty.

Returns: `true` if this stack is empty; otherwise,`false`.

To be added.

## IImmutableStack<T>.Clear() method

```csharp
public System.Collections.Immutable.IImmutableStack<T> Clear ();
```

Removes all objects from the immutable stack.

Returns: An empty immutable stack.

To be added.

## IImmutableStack<T>.Peek() method

```csharp
public T Peek ();
```

Returns the element at the top of the immutable stack without removing it.

Returns: The element at the top of the stack.

Exceptions:

- `InvalidOperationException`: The stack is empty.

To be added.

## IImmutableStack<T>.Pop() method

```csharp
public System.Collections.Immutable.IImmutableStack<T> Pop ();
```

Removes the element at the top of the immutable stack and returns the new stack.

Returns: The new stack; never `null`.

Exceptions:

- `InvalidOperationException`: The stack is empty.

To be added.

## IImmutableStack<T>.Push(T) method

```csharp
public System.Collections.Immutable.IImmutableStack<T> Push (T value);
```

Inserts an element at the top of the immutable stack and returns the new stack.

Parameters:

- `value`: The element to push onto the stack.

Returns: The new stack.

To be added.
