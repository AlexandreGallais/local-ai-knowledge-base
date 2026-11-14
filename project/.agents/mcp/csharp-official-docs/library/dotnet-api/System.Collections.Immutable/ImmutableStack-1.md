---
title: "ImmutableStack<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableStack`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableStack<T> class

Namespace: `System.Collections.Immutable`

```csharp
public sealed class ImmutableStack<T> : System.Collections.Generic.IEnumerable<T>, System.Collections.Immutable.IImmutableStack<T>
```

Represents an immutable stack.

Parameters:

- `T`: The type of element on the stack.

To be added.

## ImmutableStack<T>.Empty property

```csharp
public static System.Collections.Immutable.ImmutableStack<T> Empty { get; }
```

Gets an empty immutable stack.

Returns: An empty immutable stack.

To be added.

## ImmutableStack<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether this instance of the immutable stack is empty.

Returns: `true` if this instance is empty; otherwise, `false`.

To be added.

## ImmutableStack<T>.Clear() method

```csharp
public System.Collections.Immutable.ImmutableStack<T> Clear ();
```

Removes all objects from the immutable stack.

Returns: An empty immutable stack.

To be added.

## ImmutableStack<T>.GetEnumerator() method

```csharp
public System.Collections.Immutable.ImmutableStack<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the immutable stack.

Returns: An enumerator that can be used to iterate through the stack.

To be added.

## ImmutableStack<T>.Peek() method

```csharp
public T Peek ();
```

Returns the object at the top of the stack without removing it.

Returns: The object at the top of the stack.

Exceptions:

- `InvalidOperationException`: The stack is empty.

To be added.

## ImmutableStack<T>.PeekRef() method

```csharp
public ref readonly T PeekRef ();
```

Gets a read-only reference to the element on the top of the stack.

Returns: A read-only reference to the element on the top of the stack.

Exceptions:

- `InvalidOperationException`: The stack is empty.

To be added.

## ImmutableStack<T>.Pop() method

```csharp
public System.Collections.Immutable.ImmutableStack<T> Pop ();
```

Removes the element at the top of the immutable stack and returns the stack after the removal.

Returns: A stack; never `null`.

Exceptions:

- `InvalidOperationException`: The stack is empty.

To be added.

## ImmutableStack<T>.Pop(T) method

```csharp
public System.Collections.Immutable.ImmutableStack<T> Pop (out T value);
```

Removes the specified element from the immutable stack and returns the stack after the removal.

Parameters:

- `value`: The value to remove from the stack.

Returns: A stack; never `null`.

To be added.

## ImmutableStack<T>.Push(T) method

```csharp
public System.Collections.Immutable.ImmutableStack<T> Push (T value);
```

Inserts an object at the top of the immutable stack and returns the new stack.

Parameters:

- `value`: The object to push onto the stack.

Returns: The new stack.

To be added.

## ImmutableStack<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator  that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableStack<T>` instance is cast to an `IEnumerable<T>` interface.

## ImmutableStack<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableStack<T>` instance is cast to an `IEnumerable<T>` interface.

## ImmutableStack<T>.System.Collections.Immutable.IImmutableStack<T>.Clear() method

```csharp
System.Collections.Immutable.IImmutableStack<T> IImmutableStack<T>.Clear ();
```

Removes all elements from the immutable stack.

Returns: The empty immutable stack.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableStack<T>` instance is cast to an `IImmutableStack<T>` interface.

## ImmutableStack<T>.System.Collections.Immutable.IImmutableStack<T>.Pop() method

```csharp
System.Collections.Immutable.IImmutableStack<T> IImmutableStack<T>.Pop ();
```

Removes the element at the top of the immutable stack and returns the new stack.

Returns: The new stack; never `null`.

Exceptions:

- `InvalidOperationException`: The stack is empty.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableStack<T>` instance is cast to an `IImmutableStack<T>` interface.

## ImmutableStack<T>.System.Collections.Immutable.IImmutableStack<T>.Push(T) method

```csharp
System.Collections.Immutable.IImmutableStack<T> IImmutableStack<T>.Push (T value);
```

Inserts an element at the top of the immutable stack and returns the new stack.

Parameters:

- `value`: The element to push onto the stack.

Returns: The new stack.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableStack<T>` instance is cast to an `IImmutableStack<T>` interface.
