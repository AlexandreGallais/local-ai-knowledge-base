---
title: "JsonArray class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Nodes/JsonArray.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonArray class

Namespace: `System.Text.Json.Nodes`

```csharp
public sealed class JsonArray : System.Text.Json.Nodes.JsonNode, System.Collections.Generic.ICollection<System.Text.Json.Nodes.JsonNode>, System.Collections.Generic.IEnumerable<System.Text.Json.Nodes.JsonNode>, System.Collections.Generic.IList<System.Text.Json.Nodes.JsonNode>
```

Represents a mutable JSON array.

#### Remarks

It is safe to perform multiple concurrent read operations on a `JsonArray`, but issues can occur if the collection is modified while it's being read.

## JsonArray.JsonArray(JsonNodeOptions>) constructor

```csharp
public JsonArray (System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonArray` class that is empty.

Parameters:

- `options`: Options to control the behavior.

To be added.

## JsonArray.JsonArray(JsonNode>) constructor

```csharp
public JsonArray (scoped ReadOnlySpan<System.Text.Json.Nodes.JsonNode?> items);
```

Initializes a new instance of the `JsonArray` class that contains items from the specified span.

Parameters:

- `items`: The items to add to the new `JsonArray`.

To be added.

## JsonArray.JsonArray(JsonNode[]) constructor

```csharp
public JsonArray (params System.Text.Json.Nodes.JsonNode?[] items);
```

Initializes a new instance of the `JsonArray` class that contains items from the specified array.

Parameters:

- `items`: The items to add to the new `JsonArray`.

To be added.

## JsonArray.JsonArray(JsonNodeOptions, JsonNode>) constructor

```csharp
public JsonArray (System.Text.Json.Nodes.JsonNodeOptions options, scoped ReadOnlySpan<System.Text.Json.Nodes.JsonNode?> items);
```

Initializes a new instance of the `JsonArray` class that contains items from the specified params span.

Parameters:

- `options`: Options to control the behavior.
- `items`: The items to add to the new `JsonArray`.

To be added.

## JsonArray.JsonArray(JsonNodeOptions, JsonNode[]) constructor

```csharp
public JsonArray (System.Text.Json.Nodes.JsonNodeOptions options, params System.Text.Json.Nodes.JsonNode?[] items);
```

Initializes a new instance of the `JsonArray` class that contains items from the specified params array.

Parameters:

- `options`: Options to control the behavior.
- `items`: The items to add to the new `JsonArray`.

To be added.

## JsonArray.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `JsonArray`.

Returns: The number of elements contained in the `ICollection<T>`.

To be added.

## JsonArray.System.Collections.Generic.ICollection<System.Text.Json.Nodes.JsonNode>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Text.Json.Nodes.JsonNode>.IsReadOnly { get; }
```

Returns `false`.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## JsonArray.Add(JsonNode) method

```csharp
public void Add (System.Text.Json.Nodes.JsonNode? item);
```

Adds a `JsonNode` to the end of the `JsonArray`.

Parameters:

- `item`: The `JsonNode` to be added to the end of the `JsonArray`.

To be added.

## JsonArray.Add<T>(T) method

```csharp
public void Add<T> (T? value);
```

Adds an object to the end of the `JsonArray`.

Parameters:

- `T`: The type of object to be added.
- `value`: The object to be added to the end of the `JsonArray`.

To be added.

## JsonArray.Clear() method

```csharp
public void Clear ();
```

Removes all elements from the `JsonArray`.

To be added.

## JsonArray.Contains(JsonNode) method

```csharp
public bool Contains (System.Text.Json.Nodes.JsonNode? item);
```

Determines whether an element is in the `JsonArray`.

Parameters:

- `item`: The object to locate in the `JsonArray`.

Returns: `true` if `item` is found in the `JsonArray`; otherwise, `false`.

To be added.

## JsonArray.Create(JsonElement, JsonNodeOptions>) method

```csharp
public static System.Text.Json.Nodes.JsonArray? Create (System.Text.Json.JsonElement element, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonArray` class that contains items from the specified `JsonElement`.

Parameters:

- `element`: The `JsonElement`.
- `options`: Options to control the behavior.

Returns: The new instance of the `JsonArray` class that contains items from the specified `JsonElement`.

Exceptions:

- `InvalidOperationException`: The `element` is not a `JsonValueKind.Array`.

To be added.

## JsonArray.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<System.Text.Json.Nodes.JsonNode?> GetEnumerator ();
```

Returns an enumerator that iterates through the `JsonArray`.

Returns: An `IEnumerator<T>` for the `JsonArray`.

To be added.

## JsonArray.GetValues<T>() method

```csharp
public System.Collections.Generic.IEnumerable<T> GetValues<T> ();
```

Returns an enumerable that wraps calls to `JsonNode.GetValue<T>`.

Parameters:

- `T`: The type of the value to obtain from the `JsonValue`.

Returns: An enumerable iterating over values of the array.

To be added.

## JsonArray.IndexOf(JsonNode) method

```csharp
public int IndexOf (System.Text.Json.Nodes.JsonNode? item);
```

The object to locate in the `JsonArray`.

Parameters:

- `item`: The `JsonNode` to locate in the `JsonArray`.

Returns: The index of item if found in the list; otherwise, -1.

To be added.

## JsonArray.Insert(Int32, JsonNode) method

```csharp
public void Insert (int index, System.Text.Json.Nodes.JsonNode? item);
```

Inserts an element into the `JsonArray` at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The `JsonNode` to insert.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or `index` is greater than `JsonArray.Count`.

To be added.

## JsonArray.Remove(JsonNode) method

```csharp
public bool Remove (System.Text.Json.Nodes.JsonNode? item);
```

Removes the first occurrence of a specific `JsonNode` from the `JsonArray`.

Parameters:

- `item`: The `JsonNode` to remove from the `JsonArray`.

Returns: `true` if `item` is successfully removed; otherwise, `false`.

To be added.

## JsonArray.RemoveAll(Boolean>) method

```csharp
public int RemoveAll (Func<System.Text.Json.Nodes.JsonNode?,bool> match);
```

Removes all the elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The predicate that defines the conditions of the elements to remove.

Returns: The number of elements removed from the `JsonArray`.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

To be added.

## JsonArray.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the element at the specified index of the `JsonArray`.

Parameters:

- `index`: The zero-based index of the element to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or `index` is greater than `JsonArray.Count`.

To be added.

## JsonArray.RemoveRange(Int32, Int32) method

```csharp
public void RemoveRange (int index, int count);
```

Removes a range of elements from the `JsonArray`.

Parameters:

- `index`: The zero-based starting index of the range of elements to remove.
- `count`: The number of elements to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` or `count` is less than 0.
- `ArgumentException`: `index` and `count` do not denote a valid range of elements in the `JsonArray`.

To be added.

## JsonArray.System.Collections.Generic.ICollection<System.Text.Json.Nodes.JsonNode>.CopyTo(JsonNode[], Int32) method

```csharp
void ICollection<JsonNode>.CopyTo (System.Text.Json.Nodes.JsonNode?[]? array, int index);
```

Copies the entire `Array` to a compatible one-dimensional array, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `JsonArray`. The Array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: The number of elements in the source ICollection is greater than the available space from `index` to the end of the destination `array`.

To be added.

## JsonArray.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator? IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the `JsonArray`.

Returns: A `IEnumerator` for the `JsonArray`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `JsonArray` instance is cast to an `IEnumerable` interface.

## JsonArray.WriteTo(Utf8JsonWriter, JsonSerializerOptions) method

```csharp
public override void WriteTo (System.Text.Json.Utf8JsonWriter writer, System.Text.Json.JsonSerializerOptions? options = default);
```

Writes the `JsonNode` into the provided `Utf8JsonWriter` as JSON.

Parameters:

- `writer`: The `Utf8JsonWriter`.
- `options`: Options to control the serialization behavior.

Exceptions:

- `ArgumentNullException`: The `writer` parameter is `null`.

To be added.
