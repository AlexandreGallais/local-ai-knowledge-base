---
title: "ImmutableInterlocked class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableInterlocked.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableInterlocked class

Namespace: `System.Collections.Immutable`

```csharp
public static class ImmutableInterlocked
```

Contains interlocked exchange mechanisms for immutable collections.

To be added.

## ImmutableInterlocked.AddOrUpdate<TKey,TValue>(ImmutableDictionary<TKey,TValue>, TKey, Func<TKey,TValue>, Func<TKey,TValue,TValue>) method

```csharp
public static TValue AddOrUpdate<TKey,TValue> (ref System.Collections.Immutable.ImmutableDictionary<TKey,TValue> location, TKey key, Func<TKey,TValue> addValueFactory, Func<TKey,TValue,TValue> updateValueFactory);
```

Obtains the value from a dictionary after having added it or updated an existing entry.

Parameters:

- `TKey`: The type of key <example-value> by the dictionary.
- `TValue`: The type of value stored by the dictionary.
- `location`: The variable or field to atomically update if the specified  is not in the dictionary.
- `key`: The key for the value to add or update.
- `addValueFactory`: The function that receives the key and returns a new value to add to the dictionary when no value previously exists.
- `updateValueFactory`: The function that receives the key and prior value and returns the new value with which to update the dictionary.

Returns: The added or updated value.

To be added.

## ImmutableInterlocked.AddOrUpdate<TKey,TValue>(ImmutableDictionary<TKey,TValue>, TKey, TValue, Func<TKey,TValue,TValue>) method

```csharp
public static TValue AddOrUpdate<TKey,TValue> (ref System.Collections.Immutable.ImmutableDictionary<TKey,TValue> location, TKey key, TValue addValue, Func<TKey,TValue,TValue> updateValueFactory);
```

Obtains the value from a dictionary after having added it or updated an existing entry.

Parameters:

- `TKey`: The type of key <example-value> by the dictionary.
- `TValue`: The type of value stored by the dictionary.
- `location`: The variable or field to atomically update if the specified  is not in the dictionary.
- `key`: The key for the value to add or update.
- `addValue`: The value to use if no previous value exists.
- `updateValueFactory`: The function that receives the key and prior value and returns the new value with which to update the dictionary.

Returns: The added or updated value.

To be added.

## ImmutableInterlocked.Enqueue<T>(ImmutableQueue<T>, T) method

```csharp
public static void Enqueue<T> (ref System.Collections.Immutable.ImmutableQueue<T> location, T value);
```

Atomically enqueues an element to the end of a queue.

Parameters:

- `T`: The type of items contained in the collection.
- `location`: The variable or field to atomically update.
- `value`: The value to enqueue.

To be added.

## ImmutableInterlocked.GetOrAdd<TKey,TValue>(ImmutableDictionary<TKey,TValue>, TKey, Func<TKey,TValue>) method

```csharp
public static TValue GetOrAdd<TKey,TValue> (ref System.Collections.Immutable.ImmutableDictionary<TKey,TValue> location, TKey key, Func<TKey,TValue> valueFactory);
```

Gets the value for the specified key from the dictionary, or if the key was not found, adds a new value to the dictionary.

Parameters:

- `TKey`: The type of the keys contained in the collection.
- `TValue`: The type of the values contained in the collection.
- `location`: The variable or field to atomically update if the specified  is not in the dictionary.
- `key`: The key for the value to retrieve or add.
- `valueFactory`: The function to execute to obtain the value to insert into the dictionary if the key is not found. This delegate will not be invoked more than once.

Returns: The value at the specified key or `valueFactory` if the key was not present.

To be added.

## ImmutableInterlocked.GetOrAdd<TKey,TValue>(ImmutableDictionary<TKey,TValue>, TKey, TValue) method

```csharp
public static TValue GetOrAdd<TKey,TValue> (ref System.Collections.Immutable.ImmutableDictionary<TKey,TValue> location, TKey key, TValue value);
```

Gets the value for the specified key from the dictionary, or if the key was not found, adds a new value to the dictionary.

Parameters:

- `TKey`: The type of the keys contained in the collection.
- `TValue`: The type of the values contained in the collection.
- `location`: The variable or field to atomically update if the specified key is not in the dictionary.
- `key`: The key for the value to get or add.
- `value`: The value to add to the dictionary if the key isn't found.

Returns: The value at the specified key, if present.

To be added.

## ImmutableInterlocked.GetOrAdd<TKey,TValue,TArg>(ImmutableDictionary<TKey,TValue>, TKey, Func<TKey,TArg,TValue>, TArg) method

```csharp
public static TValue GetOrAdd<TKey,TValue,TArg> (ref System.Collections.Immutable.ImmutableDictionary<TKey,TValue> location, TKey key, Func<TKey,TArg,TValue> valueFactory, TArg factoryArgument) where TArg : allows ref struct;
```

Gets the value for the specified key from the dictionary, or if the key was not found, adds a new value to the dictionary.

Parameters:

- `TKey`: The type of the keys contained in the collection.
- `TValue`: The type of the values contained in the collection.
- `TArg`: The type of the argument supplied to the value factory.
- `location`: The variable or field to update if the specified is not in the dictionary.
- `key`: The key for the value to retrieve or add.
- `valueFactory`: The function to execute to obtain the value to insert into the dictionary if the key is not found.
- `factoryArgument`: The argument to pass to the value factory.

Returns: The value at the specified key or `valueFactory` if the key was not present.

To be added.

## ImmutableInterlocked.InterlockedCompareExchange<T>(ImmutableArray<T>, ImmutableArray<T>, ImmutableArray<T>) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> InterlockedCompareExchange<T> (ref System.Collections.Immutable.ImmutableArray<T> location, System.Collections.Immutable.ImmutableArray<T> value, System.Collections.Immutable.ImmutableArray<T> comparand);
```

Compares two immutable arrays for equality and, if they are equal, replaces one of the arrays.

Parameters:

- `T`: The type of element stored by the array.
- `location`: The destination, whose value is compared with `comparand` and possibly replaced.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location`.

Returns: The original value in `location`.

To be added.

## ImmutableInterlocked.InterlockedExchange<T>(ImmutableArray<T>, ImmutableArray<T>) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> InterlockedExchange<T> (ref System.Collections.Immutable.ImmutableArray<T> location, System.Collections.Immutable.ImmutableArray<T> value);
```

Sets an array to the specified array and returns a reference to the original array, as an atomic operation.

Parameters:

- `T`: The type of element stored by the array.
- `location`: The array to set to the specified value.
- `value`: The value to which the `location` parameter is set.

Returns: The original value of `location`.

To be added.

## ImmutableInterlocked.InterlockedInitialize<T>(ImmutableArray<T>, ImmutableArray<T>) method

```csharp
public static bool InterlockedInitialize<T> (ref System.Collections.Immutable.ImmutableArray<T> location, System.Collections.Immutable.ImmutableArray<T> value);
```

Sets an array to the specified array if the array has not been initialized.

Parameters:

- `T`: The type of element stored by the array.
- `location`: The array to set to the specified value.
- `value`: The value to which the `location` parameter is set, if it's not initialized.

Returns: `true` if the array was assigned the specified value;  otherwise, `false`.

To be added.

## ImmutableInterlocked.Push<T>(ImmutableStack<T>, T) method

```csharp
public static void Push<T> (ref System.Collections.Immutable.ImmutableStack<T> location, T value);
```

Pushes a new element onto the stack.

Parameters:

- `T`: The type of items in the stack.
- `location`: The stack to update.
- `value`: The value to push on the stack.

To be added.

## ImmutableInterlocked.TryAdd<TKey,TValue>(ImmutableDictionary<TKey,TValue>, TKey, TValue) method

```csharp
public static bool TryAdd<TKey,TValue> (ref System.Collections.Immutable.ImmutableDictionary<TKey,TValue> location, TKey key, TValue value);
```

Adds the specified key and value to the dictionary if the key is not in the dictionary.

Parameters:

- `TKey`: The type of the keys contained in the collection.
- `TValue`: The type of the values contained in the collection.
- `location`: The dictionary to update with the specified key and value.
- `key`: The key to add, if is not already defined in the dictionary.
- `value`: The value to add.

Returns: `true` if the key is not in the dictionary; otherwise, `false`.

To be added.

## ImmutableInterlocked.TryDequeue<T>(ImmutableQueue<T>, T) method

```csharp
public static bool TryDequeue<T> (ref System.Collections.Immutable.ImmutableQueue<T> location, out T value);
```

Atomically removes and returns the specified element at the head of the queue, if the queue is not empty.

Parameters:

- `T`: The type of items in the queue.
- `location`: The variable or field to atomically update.
- `value`: Set to the value from the head of the queue, if the queue not empty.

Returns: `true` if the queue is not empty and the head element is removed; otherwise, `false`.

To be added.

## ImmutableInterlocked.TryPop<T>(ImmutableStack<T>, T) method

```csharp
public static bool TryPop<T> (ref System.Collections.Immutable.ImmutableStack<T> location, out T value);
```

Removes an element from the top of the stack, if there is an element to remove.

Parameters:

- `T`: The type of items in the stack.
- `location`: The stack to update.
- `value`: Receives the value removed from the stack, if the stack is not empty.

Returns: `true` if an element is removed from the stack; otherwise, `false`.

To be added.

## ImmutableInterlocked.TryRemove<TKey,TValue>(ImmutableDictionary<TKey,TValue>, TKey, TValue) method

```csharp
public static bool TryRemove<TKey,TValue> (ref System.Collections.Immutable.ImmutableDictionary<TKey,TValue> location, TKey key, out TValue value);
```

Removes the element with the specified key, if the key exists.

Parameters:

- `TKey`: The type of the keys contained in the collection.
- `TValue`: The type of the values contained in the collection.
- `location`: The dictionary to update.
- `key`: The key to remove.
- `value`: Receives the value of the removed item, if the dictionary is not empty.

Returns: `true` if the key was found and removed; otherwise, `false`.

To be added.

## ImmutableInterlocked.TryUpdate<TKey,TValue>(ImmutableDictionary<TKey,TValue>, TKey, TValue, TValue) method

```csharp
public static bool TryUpdate<TKey,TValue> (ref System.Collections.Immutable.ImmutableDictionary<TKey,TValue> location, TKey key, TValue newValue, TValue comparisonValue);
```

Sets the specified key to the specified value if the specified key <example-value> is set to a specific value.

Parameters:

- `TKey`: The type of the keys contained in the collection.
- `TValue`: The type of the values contained in the collection.
- `location`: The dictionary to update.
- `key`: The key to update.
- `newValue`: The new value to set.
- `comparisonValue`: The current value for `key` in order for the update to succeed.

Returns: `true` if `key` and `comparisonValue` are present in the dictionary and comparison was updated to `newValue`; otherwise, `false`.

To be added.

## ImmutableInterlocked.Update<T>(ImmutableArray<T>, ImmutableArray<T>>) method

```csharp
public static bool Update<T> (ref System.Collections.Immutable.ImmutableArray<T> location, Func<System.Collections.Immutable.ImmutableArray<T>,System.Collections.Immutable.ImmutableArray<T>> transformer);
```

Mutates an immutable array in-place with optimistic locking transaction semantics via a specified transformation function.
The transformation is retried as many times as necessary to win the optimistic locking race.

Parameters:

- `T`: The type of data in the immutable array.
- `location`: The immutable array to be changed.
- `transformer`: A function that produces the new array from the old. This function should be side-effect free, as it may run multiple times when races occur with other threads.

Returns: `true` if the location's value is changed by applying the result of the `transformer` function; `false` if the location's value remained the same because the last invocation of `transformer` returned the existing value.

To be added.

## ImmutableInterlocked.Update<T>(T, Func<T,T>) method

```csharp
public static bool Update<T> (ref T location, Func<T,T> transformer) where T : class;
```

Mutates a value in-place with optimistic locking transaction semantics             via a specified transformation function.             The transformation is retried as many times as necessary to win the optimistic locking race.

Parameters:

- `T`: The type of data.
- `location`: The variable or field to be changed, which may be accessed by multiple threads.
- `transformer`: A function that mutates the value. This function should be side-effect free,              as it may run multiple times when races occur with other threads.

Returns: `true` if the location's value is changed by applying the result of the `transformer` function; `false` if the location's value remained the same because the last invocation of `transformer` returned the existing value.

To be added.

## ImmutableInterlocked.Update<T,TArg>(ImmutableArray<T>, ImmutableArray<T>>, TArg) method

```csharp
public static bool Update<T,TArg> (ref System.Collections.Immutable.ImmutableArray<T> location, Func<System.Collections.Immutable.ImmutableArray<T>,TArg,System.Collections.Immutable.ImmutableArray<T>> transformer, TArg transformerArgument) where TArg : allows ref struct;
```

Mutates an immutable array in-place with optimistic locking transaction semantics via a specified transformation function.
The transformation is retried as many times as necessary to win the optimistic locking race.

Parameters:

- `T`: The type of data in the immutable array.
- `TArg`: The type of argument passed to the `transformer`.
- `location`: The immutable array to be changed.
- `transformer`: A function that produces the new array from the old. This function should be side-effect free, as it may run multiple times when races occur with other threads.
- `transformerArgument`: The argument to pass to `transformer`.

Returns: `true` if the location's value is changed by applying the result of the `transformer` function; `false` if the location's value remained the same because the last invocation of `transformer` returned the existing value.

To be added.
