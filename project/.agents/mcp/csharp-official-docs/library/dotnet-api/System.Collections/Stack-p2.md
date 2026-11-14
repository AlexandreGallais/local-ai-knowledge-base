---
title: "Stack class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/Stack.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stack class (part 2 of 2)

## Stack.Push(Object) method

```csharp
public virtual void Push (object? obj);
```

Inserts an object at the top of the `Stack`.

Parameters:

- `obj`: The `Object` to push onto the `Stack`. The value can be `null`.

#### Remarks
If `Stack.Count` already equals the capacity, the capacity of the `Stack` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

`null` can be pushed onto the `Stack` as a placeholder, if needed. It occupies a slot in the stack and is treated like any object.

If `Stack.Count` is less than the capacity of the stack, `Stack.Push` is an `O(1)` operation. If the capacity needs to be increased to accommodate the new element, `Stack.Push` becomes an `O(n)` operation, where `n` is `Stack.Count`.

#### Examples
The following example shows how to add elements to the `Stack`, remove elements from the `Stack`, or view the element at the top of the `Stack`.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/Peek/source.cs._

## Stack.Synchronized(Stack) method

```csharp
public static System.Collections.Stack Synchronized (System.Collections.Stack stack);
```

Returns a synchronized (thread safe) wrapper for the `Stack`.

Parameters:

- `stack`: The `Stack` to synchronize.

Returns: A synchronized wrapper around the `Stack`.

Exceptions:

- `ArgumentNullException`: `stack` is `null`.

#### Remarks
To guarantee the thread safety of the `Stack`, all operations must be done through this wrapper.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `Stack.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/IsSynchronized/source2.cs._

This method is an `O(1)` operation.

#### Examples
The following example shows how to synchronize a `Stack`, determine if a `Stack` is synchronized, and use a synchronized `Stack`.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/IsSynchronized/source.cs._

## Stack.ToArray() method

```csharp
public virtual object?[] ToArray ();
```

Copies the `Stack` to a new array.

Returns: A new array containing copies of the elements of the `Stack`.

#### Remarks
The elements are copied onto the array in last-in-first-out (LIFO) order, similar to the order of the elements returned by a succession of calls to `Stack.Pop`.

This method is an `O(n)` operation, where `n` is `Stack.Count`.

#### Examples
The following example shows how to copy a `Stack` into a one-dimensional array.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/CopyTo/source.cs._
