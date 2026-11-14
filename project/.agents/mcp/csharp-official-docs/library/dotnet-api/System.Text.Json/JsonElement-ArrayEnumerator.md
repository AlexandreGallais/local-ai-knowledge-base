---
title: "JsonElement+ArrayEnumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonElement+ArrayEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonElement+ArrayEnumerator struct

Namespace: `System.Text.Json`

```csharp
public struct JsonElement.ArrayEnumerator : System.Collections.Generic.IEnumerable<System.Text.Json.JsonElement>, System.Collections.Generic.IEnumerator<System.Text.Json.JsonElement>
```

Represents an enumerator for the contents of a JSON array.

To be added.

## JsonElement+ArrayEnumerator.Current property

```csharp
public System.Text.Json.JsonElement Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

To be added.

## JsonElement+ArrayEnumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ArrayEnumerator` instance is cast to an `IEnumerator` interface.

## JsonElement+ArrayEnumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases the resources used by this `ArrayEnumerator` instance.

To be added.

## JsonElement+ArrayEnumerator.GetEnumerator() method

```csharp
public System.Text.Json.JsonElement.ArrayEnumerator GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator that can be used to iterate through the array.

To be added.

## JsonElement+ArrayEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the collection.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

To be added.

## JsonElement+ArrayEnumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the collection.

To be added.

## JsonElement+ArrayEnumerator.System.Collections.Generic.IEnumerable<System.Text.Json.JsonElement>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Text.Json.JsonElement> IEnumerable<JsonElement>.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator for an array of `JsonElement` that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ArrayEnumerator` instance is cast to an IEnumerable\<JsonElement> interface.

## JsonElement+ArrayEnumerator.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ArrayEnumerator` instance is cast to an `IEnumerable` interface.
