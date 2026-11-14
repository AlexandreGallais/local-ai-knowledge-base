---
title: "HttpRequestOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpRequestOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpRequestOptions class

Namespace: `System.Net.Http`

```csharp
public sealed class HttpRequestOptions : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<string,object>>, System.Collections.Generic.IDictionary<string,object>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<string,object>>, System.Collections.Generic.IReadOnlyDictionary<string,object>
```

Represents a collection of options for an HTTP request.

To be added.

## HttpRequestOptions.HttpRequestOptions() constructor

```csharp
public HttpRequestOptions ();
```

Initializes a new instance of the HttpRequestOptions class.

To be added.

## HttpRequestOptions.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.Count property

```csharp
int System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.Count { get; }
```

Gets the number of elements contained in the `ICollection<T>`.

Returns: The number of elements contained in the `ICollection<T>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `ICollection<T>` interface.

## HttpRequestOptions.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `ICollection<T>` interface.

## HttpRequestOptions.System.Collections.Generic.IDictionary<System.String,System.Object>.Item property

```csharp
object? System.Collections.Generic.IDictionary<System.String,System.Object>.Item[string key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key of the element to get or set.

Returns: The element with the specified key.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `IDictionary<T1,T2>` interface.

## HttpRequestOptions.System.Collections.Generic.IDictionary<System.String,System.Object>.Keys property

```csharp
System.Collections.Generic.ICollection<string> System.Collections.Generic.IDictionary<System.String,System.Object>.Keys { get; }
```

Gets an `ICollection<T>` containing the keys of the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the keys of the object that implements `IDictionary<T1,T2>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `IDictionary<T1,T2>` interface.

## HttpRequestOptions.System.Collections.Generic.IDictionary<System.String,System.Object>.Values property

```csharp
System.Collections.Generic.ICollection<object?> System.Collections.Generic.IDictionary<System.String,System.Object>.Values { get; }
```

Gets an `ICollection<T>` containing the values in the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the values in the object that implements `IDictionary<T1,T2>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `IDictionary<T1,T2>` interface.

## HttpRequestOptions.System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.Count property

```csharp
int System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.Count { get; }
```

Gets the number of elements in the collection.

Returns: The number of elements in the collection.

To be added.

## HttpRequestOptions.System.Collections.Generic.IReadOnlyDictionary<System.String,System.Object>.Item property

```csharp
object? System.Collections.Generic.IReadOnlyDictionary<System.String,System.Object>.Item[string key] { get; }
```

Gets the element that has the specified key in the read-only dictionary.

Parameters:

- `key`: The key to locate.

Returns: The element that has the specified key in the read-only dictionary.

To be added.

## HttpRequestOptions.System.Collections.Generic.IReadOnlyDictionary<System.String,System.Object>.Keys property

```csharp
System.Collections.Generic.IEnumerable<string> System.Collections.Generic.IReadOnlyDictionary<System.String,System.Object>.Keys { get; }
```

Gets an enumerable collection that contains the keys in the read-only dictionary.

Returns: An enumerable collection that contains the keys in the read-only dictionary.

To be added.

## HttpRequestOptions.System.Collections.Generic.IReadOnlyDictionary<System.String,System.Object>.Values property

```csharp
System.Collections.Generic.IEnumerable<object?> System.Collections.Generic.IReadOnlyDictionary<System.String,System.Object>.Values { get; }
```

Gets an enumerable collection that contains the values in the read-only dictionary.

Returns: An enumerable collection that contains the values in the read-only dictionary.

To be added.

## HttpRequestOptions.Set<TValue>(HttpRequestOptionsKey<TValue>, TValue) method

```csharp
public void Set<TValue> (System.Net.Http.HttpRequestOptionsKey<TValue> key, TValue value);
```

Sets the value of a specified HTTP request option.

Parameters:

- `TValue`: The type of the HTTP value as defined by `key`.
- `key`: The strongly typed key for the HTTP request option.
- `value`: The value of the HTTP request option.

To be added.

## HttpRequestOptions.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.Add(Object>) method

```csharp
void ICollection<KeyValuePair<string,object>>.Add (System.Collections.Generic.KeyValuePair<string,object> item);
```

Adds an item to the `ICollection<T>`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `ICollection<T>` interface.

## HttpRequestOptions.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.Clear() method

```csharp
void ICollection<KeyValuePair<string,object>>.Clear ();
```

Removes all items from the `ICollection<T>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `ICollection<T>` interface.

## HttpRequestOptions.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.Contains(Object>) method

```csharp
bool ICollection<KeyValuePair<string,object>>.Contains (System.Collections.Generic.KeyValuePair<string,object> item);
```

Determines whether the `ICollection<T>` contains a specific value.

Parameters:

- `item`: The object to locate in the `ICollection<T>`.

Returns: `true` if `item` is found in the `ICollection<T>`; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `ICollection<T>` interface.

## HttpRequestOptions.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.CopyTo(Object>[], Int32) method

```csharp
void ICollection<KeyValuePair<string,object>>.CopyTo (System.Collections.Generic.KeyValuePair<string,object>[] array, int arrayIndex);
```

Copies the elements of the `ICollection<T>` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `ICollection<T>` interface.

## HttpRequestOptions.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.Remove(Object>) method

```csharp
bool ICollection<KeyValuePair<string,object>>.Remove (System.Collections.Generic.KeyValuePair<string,object> item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if `item` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `item` is not found in the original `ICollection<T>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `ICollection<T>` interface.

## HttpRequestOptions.System.Collections.Generic.IDictionary<System.String,System.Object>.Add(String, Object) method

```csharp
void IDictionary<string,object>.Add (string key, object value);
```

Adds an element with the provided key and value to the `IDictionary<T1,T2>`.

Parameters:

- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `IDictionary<T1,T2>` interface.

## HttpRequestOptions.System.Collections.Generic.IDictionary<System.String,System.Object>.ContainsKey(String) method

```csharp
bool IDictionary<string,object>.ContainsKey (string key);
```

Determines whether the `IDictionary<T1,T2>` contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `IDictionary<T1,T2>`.

Returns: `true` if the `IDictionary<T1,T2>` contains an element with the key; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `IDictionary<T1,T2>` interface.

## HttpRequestOptions.System.Collections.Generic.IDictionary<System.String,System.Object>.Remove(String) method

```csharp
bool IDictionary<string,object>.Remove (string key);
```

Removes the element with the specified key from the `IDictionary<T1,T2>`.

Parameters:

- `key`: The key of the element to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`. This method also returns `false` if `key` was not found in the original `IDictionary<T1,T2>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `IDictionary<T1,T2>` interface.

## HttpRequestOptions.System.Collections.Generic.IDictionary<System.String,System.Object>.TryGetValue(String, Object) method

```csharp
bool IDictionary<string,object>.TryGetValue (string key, out object value);
```

Gets the value associated with the specified key.

Parameters:

- `key`: The key of the value to get.
- `value`: When this method returns, contains the value associated with the specified key, if the key is found; otherwise, the default value for the type of the `value` parameter. This parameter is passed uninitialized.

Returns: `true` if the `Dictionary<T1,T2>` contains an element with the specified key; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `IDictionary<T1,T2>` interface.

## HttpRequestOptions.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string,object>> IEnumerable<KeyValuePair<string,object>>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `IEnumerable<T>` interface.

## HttpRequestOptions.System.Collections.Generic.IReadOnlyDictionary<System.String,System.Object>.ContainsKey(String) method

```csharp
bool IReadOnlyDictionary<string,object>.ContainsKey (string key);
```

Determines whether the read-only dictionary contains an element that has the specified key.

Parameters:

- `key`: The key to locate.

Returns: `true` if the read-only dictionary contains an element that has the specified key; otherwise, `false`.

To be added.

## HttpRequestOptions.System.Collections.Generic.IReadOnlyDictionary<System.String,System.Object>.TryGetValue(String, Object) method

```csharp
bool IReadOnlyDictionary<string,object>.TryGetValue (string key, out object value);
```

Gets the value that is associated with the specified key.

Parameters:

- `key`: The key to locate.
- `value`: When this method returns, contains the value associated with the specified key, if the key is found; otherwise, the default value for the type of the `value` parameter. This parameter is passed uninitialized.

Returns: `true` if the `HttpRequestOptions` instance contains an element with the specified key; otherwise, `false`.

To be added.

## HttpRequestOptions.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpRequestOptions` instance is cast to an `IEnumerable` interface.

## HttpRequestOptions.TryGetValue<TValue>(HttpRequestOptionsKey<TValue>, TValue) method

```csharp
public bool TryGetValue<TValue> (System.Net.Http.HttpRequestOptionsKey<TValue> key, out TValue value);
```

Gets the value of a specified HTTP request option.

Parameters:

- `TValue`: The type of the HTTP value as defined by `key`.
- `key`: The strongly typed key to get the value of an HTTP request option.
- `value`: When this method returns, contains the value of the specified HTTP request option.

Returns: `true` if the collection contains an element with the specified key; otherwise, `false`.

To be added.
