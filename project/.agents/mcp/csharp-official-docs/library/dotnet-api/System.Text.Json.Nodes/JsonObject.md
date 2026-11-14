---
title: "JsonObject class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Nodes/JsonObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonObject class

Namespace: `System.Text.Json.Nodes`

```csharp
public sealed class JsonObject : System.Text.Json.Nodes.JsonNode, System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode>>, System.Collections.Generic.IDictionary<string,System.Text.Json.Nodes.JsonNode>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode>>, System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode>>
```

Represents a mutable JSON object.

#### Remarks

It's safe to perform multiple concurrent read operations on a `JsonObject`, but issues can occur if the collection is modified while it's being read.

## JsonObject.JsonObject(JsonNodeOptions>) constructor

```csharp
public JsonObject (System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonObject` class that is empty.

Parameters:

- `options`: Options to control the behavior.

To be added.

## JsonObject.JsonObject(JsonNode>>, JsonNodeOptions>) constructor

```csharp
public JsonObject (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode?>> properties, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonObject` class that contains the specified `properties`.

Parameters:

- `properties`: The properties to be added.
- `options`: Options to control the behavior.

To be added.

## JsonObject.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in `JsonObject`.

Returns: The number of elements contained in the `ICollection<T>`.

To be added.

## JsonObject.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Text.Json.Nodes.JsonNode>>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Text.Json.Nodes.JsonNode>>.IsReadOnly { get; }
```

Returns `false`.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## JsonObject.System.Collections.Generic.IDictionary<System.String,System.Text.Json.Nodes.JsonNode>.Keys property

```csharp
System.Collections.Generic.ICollection<string> System.Collections.Generic.IDictionary<System.String,System.Text.Json.Nodes.JsonNode>.Keys { get; }
```

Gets a collection containing the property names in the `JsonObject`.

Returns: An `ICollection<T>` containing the keys of the object that implements `IDictionary<T1,T2>`.

To be added.

## JsonObject.System.Collections.Generic.IDictionary<System.String,System.Text.Json.Nodes.JsonNode>.Values property

```csharp
System.Collections.Generic.ICollection<System.Text.Json.Nodes.JsonNode?> System.Collections.Generic.IDictionary<System.String,System.Text.Json.Nodes.JsonNode>.Values { get; }
```

Gets a collection containing the property values in the `JsonObject`.

Returns: An `ICollection<T>` containing the values in the object that implements `IDictionary<T1,T2>`.

To be added.

## JsonObject.System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<System.String,System.Text.Json.Nodes.JsonNode>>.Item property

```csharp
System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode?> System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<System.String,System.Text.Json.Nodes.JsonNode>>.Item[int index] { get; set; }
```

To be added.

Parameters:

- `index`: To be added.

Returns: To be added.

To be added.

## JsonObject.Add(JsonNode>) method

```csharp
public void Add (System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode?> property);
```

Adds the specified property to the `JsonObject`.

Parameters:

- `property`: The KeyValuePair structure representing the property name and value to add to the `JsonObject`.

Exceptions:

- `ArgumentException`: An element with the same property name already exists in the `JsonObject`.
- `ArgumentNullException`: The property name of `property` is `null`.

To be added.

## JsonObject.Add(String, JsonNode) method

```csharp
public void Add (string propertyName, System.Text.Json.Nodes.JsonNode? value);
```

Adds an element with the provided property name and value to the `JsonObject`.

Parameters:

- `propertyName`: The property name of the element to add.
- `value`: The value of the element to add.

Exceptions:

- `ArgumentNullException`: `propertyName`is `null`.
- `ArgumentException`: An element with the same property name already exists in the `JsonObject`.

To be added.

## JsonObject.Clear() method

```csharp
public void Clear ();
```

Removes all elements from the `JsonObject`.

To be added.

## JsonObject.ContainsKey(String) method

```csharp
public bool ContainsKey (string propertyName);
```

Determines whether the `JsonObject` contains an element with the specified property name.

Parameters:

- `propertyName`: The property name to locate in the `JsonObject`.

Returns: `true` if the `JsonObject` contains an element with the specified property name; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `propertyName` is `null`.

To be added.

## JsonObject.Create(JsonElement, JsonNodeOptions>) method

```csharp
public static System.Text.Json.Nodes.JsonObject? Create (System.Text.Json.JsonElement element, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonObject` class that contains properties from the specified `JsonElement`.

Parameters:

- `element`: The `JsonElement`.
- `options`: Options to control the behavior.

Returns: The new instance of the `JsonObject` class that contains properties from the specified `JsonElement`.

To be added.

## JsonObject.GetAt(Int32) method

```csharp
public System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode?> GetAt (int index);
```

Gets the property of the specified index.

Parameters:

- `index`: The zero-based index of the pair to get.

Returns: The property at the specified index as a key/value pair.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than or equal to `JsonObject.Count`.

To be added.

## JsonObject.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode?>> GetEnumerator ();
```

Returns an enumerator that iterates through the `JsonObject`.

Returns: An enumerator that iterates through the `JsonObject`.

To be added.

## JsonObject.IndexOf(String) method

```csharp
public int IndexOf (string propertyName);
```

Determines the index of a specific property name in the object.

Parameters:

- `propertyName`: The property name to locate.

Returns: The index of `propertyName` if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `propertyName` is `null`.

To be added.

## JsonObject.Insert(Int32, String, JsonNode) method

```csharp
public void Insert (int index, string propertyName, System.Text.Json.Nodes.JsonNode? value);
```

Inserts a property into the object at the specified index.

Parameters:

- `index`: The zero-based index at which the property should be inserted.
- `propertyName`: The property name to insert.
- `value`: The JSON value to insert.

Exceptions:

- `ArgumentNullException`: `propertyName` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `JsonObject`.
- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than `JsonObject.Count`.

To be added.

## JsonObject.Remove(String) method

```csharp
public bool Remove (string propertyName);
```

Removes the element with the specified property name from the `JsonObject`.

Parameters:

- `propertyName`: The property name of the element to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `propertyName` is `null`.

To be added.

## JsonObject.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the property at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than or equal to `JsonObject.Count`.

To be added.

## JsonObject.SetAt(Int32, JsonNode) method

```csharp
public void SetAt (int index, System.Text.Json.Nodes.JsonNode? value);
```

Sets a new property value at the specified index.

Parameters:

- `index`: The zero-based index of the property to set.
- `value`: The JSON value to store at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than or equal to `JsonObject.Count`.
- `InvalidOperationException`: `value` already has a parent.

To be added.

## JsonObject.SetAt(Int32, String, JsonNode) method

```csharp
public void SetAt (int index, string propertyName, System.Text.Json.Nodes.JsonNode? value);
```

Sets a new property at the specified index.

Parameters:

- `index`: The zero-based index of the property to set.
- `propertyName`: The property name to store at the specified index.
- `value`: The JSON value to store at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than or equal to `JsonObject.Count`.
- `ArgumentException`: `propertyName` is already specified in a different index.
- `InvalidOperationException`: `value` already has a parent.

To be added.

## JsonObject.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Text.Json.Nodes.JsonNode>>.Contains(JsonNode>) method

```csharp
bool ICollection<KeyValuePair<string,JsonNode>>.Contains (System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode> item);
```

Determines whether the `JsonObject` contains a specific property name and `JsonNode` reference.

Parameters:

- `item`: The element to locate in the `JsonObject`.

Returns: `true` if the `JsonObject` contains an element with the property name; otherwise, `false`.

To be added.

## JsonObject.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Text.Json.Nodes.JsonNode>>.CopyTo(JsonNode>[], Int32) method

```csharp
void ICollection<KeyValuePair<string,JsonNode>>.CopyTo (System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode>[] array, int index);
```

Copies the elements of the `JsonObject` to an array of type KeyValuePair starting at the specified array index.

Parameters:

- `array`: The one-dimensional Array that is the destination of the elements copied from `JsonObject`.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: The number of elements in the source ICollection is greater than the available space from `index` to the end of the destination `array`.

To be added.

## JsonObject.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<System.String,System.Text.Json.Nodes.JsonNode>>.Remove(JsonNode>) method

```csharp
bool ICollection<KeyValuePair<string,JsonNode>>.Remove (System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode> item);
```

Removes a key and value from the `JsonObject`.

Parameters:

- `item`: The KeyValuePair structure representing the property name and value to remove from the `JsonObject`.

Returns: `true` if the element is successfully removed; otherwise, `false`.

To be added.

## JsonObject.System.Collections.Generic.IDictionary<System.String,System.Text.Json.Nodes.JsonNode>.TryGetValue(String, JsonNode) method

```csharp
bool IDictionary<string,JsonNode>.TryGetValue (string propertyName, out System.Text.Json.Nodes.JsonNode jsonNode);
```

Gets the value associated with the specified property name.

Parameters:

- `propertyName`: The property name of the value to get.
- `jsonNode`: When this method returns, contains the value associated with the specified property name, if the property name is found; otherwise, `null`.

Returns: `true` if the `JsonObject` contains an element with the specified property name; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `propertyName` is `null`.

To be added.

## JsonObject.System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<System.String,System.Text.Json.Nodes.JsonNode>>.IndexOf(JsonNode>) method

```csharp
int IList<KeyValuePair<string,JsonNode>>.IndexOf (System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode> item);
```

To be added.

Parameters:

- `item`: To be added.

Returns: To be added.

To be added.

## JsonObject.System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<System.String,System.Text.Json.Nodes.JsonNode>>.Insert(Int32, JsonNode>) method

```csharp
void IList<KeyValuePair<string,JsonNode>>.Insert (int index, System.Collections.Generic.KeyValuePair<string,System.Text.Json.Nodes.JsonNode> item);
```

To be added.

Parameters:

- `index`: To be added.
- `item`: To be added.

To be added.

## JsonObject.System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<System.String,System.Text.Json.Nodes.JsonNode>>.RemoveAt(Int32) method

```csharp
void IList<KeyValuePair<string,JsonNode>>.RemoveAt (int index);
```

To be added.

Parameters:

- `index`: To be added.

To be added.

## JsonObject.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the `JsonObject`.

Returns: An enumerator that iterates through the `JsonObject`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `JsonObject` instance is cast to an `IEnumerable` interface.

## JsonObject.TryAdd(String, JsonNode) method

```csharp
public bool TryAdd (string propertyName, System.Text.Json.Nodes.JsonNode? value);
```

Adds an element with the provided name and value to the `JsonObject`, if a property named `propertyName` doesn't already exist.

Parameters:

- `propertyName`: The property name of the element to add.
- `value`: The value of the element to add.

Returns: `true` if the property didn't exist and the element was added; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `propertyName` is `null`.

To be added.
