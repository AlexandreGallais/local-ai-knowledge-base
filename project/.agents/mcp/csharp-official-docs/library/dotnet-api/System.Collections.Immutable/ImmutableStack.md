---
title: "ImmutableStack class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableStack.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableStack class

Namespace: `System.Collections.Immutable`

```csharp
public static class ImmutableStack
```

Provides a set of initialization methods for instances of the `ImmutableStack<T>` class.

To be added.

## ImmutableStack.Create<T>() method

```csharp
public static System.Collections.Immutable.ImmutableStack<T> Create<T> ();
```

Creates an empty immutable stack.

Parameters:

- `T`: The type of items to be stored in the immutable stack.

Returns: An empty immutable stack.

To be added.

## ImmutableStack.Create<T>(ReadOnlySpan<T>) method

```csharp
public static System.Collections.Immutable.ImmutableStack<T> Create<T> (scoped ReadOnlySpan<T> items);
```

Creates a new immutable stack that contains the specified array of items.

Parameters:

- `T`: The type of items in the immutable stack.
- `items`: A span that contains the items to prepopulate the stack with.

Returns: A new immutable stack that contains the specified items.

To be added.

## ImmutableStack.Create<T>(T) method

```csharp
public static System.Collections.Immutable.ImmutableStack<T> Create<T> (T item);
```

Creates a new immutable stack that contains the specified item.

Parameters:

- `T`: The type of items in the immutable stack.
- `item`: The item to prepopulate the stack with.

Returns: A new immutable collection that contains the specified item.

To be added.

## ImmutableStack.Create<T>(T[]) method

```csharp
public static System.Collections.Immutable.ImmutableStack<T> Create<T> (params T[] items);
```

Creates a new immutable stack that contains the specified array of items.

Parameters:

- `T`: The type of items in the immutable stack.
- `items`: An array that contains the items to prepopulate the stack with.

Returns: A new immutable stack that contains the specified items.

To be added.

## ImmutableStack.CreateRange<T>(IEnumerable<T>) method

```csharp
public static System.Collections.Immutable.ImmutableStack<T> CreateRange<T> (System.Collections.Generic.IEnumerable<T> items);
```

Creates a new immutable stack that contains the specified items.

Parameters:

- `T`: The type of items in the stack.
- `items`: The items to add to the stack before it's immutable.

Returns: An immutable stack that contains the specified items.

To be added.

## ImmutableStack.Pop<T>(IImmutableStack<T>, T) method

```csharp
public static System.Collections.Immutable.IImmutableStack<T> Pop<T> (this System.Collections.Immutable.IImmutableStack<T> stack, out T value);
```

Removes the specified item from an immutable stack.

Parameters:

- `T`: The type of items contained in the stack.
- `stack`: The stack to modify.
- `value`: The item to remove from the stack.

Returns: A stack; never `null`.

Exceptions:

- `InvalidOperationException`: The stack is empty.

To be added.
