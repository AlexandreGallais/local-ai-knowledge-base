---
title: "JsonElement+ObjectEnumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonElement+ObjectEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonElement+ObjectEnumerator struct

Namespace: `System.Text.Json`

```csharp
public struct JsonElement.ObjectEnumerator : System.Collections.Generic.IEnumerable<System.Text.Json.JsonProperty>, System.Collections.Generic.IEnumerator<System.Text.Json.JsonProperty>
```

Represents an enumerator for the properties of a JSON object.

To be added.

## JsonElement+ObjectEnumerator.Current property

```csharp
public System.Text.Json.JsonProperty Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

To be added.

## JsonElement+ObjectEnumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ObjectEnumerator` instance is cast to an `IEnumerator` interface.

## JsonElement+ObjectEnumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases the resources used by this `ObjectEnumerator` instance.

To be added.

## JsonElement+ObjectEnumerator.GetEnumerator() method

```csharp
public System.Text.Json.JsonElement.ObjectEnumerator GetEnumerator ();
```

Returns an enumerator that iterates the properties of an object.

Returns: An enumerator that can be used to iterate through the object.

<format>

## Remarks

The enumerator will enumerate the properties in the order they are declared, and when an object has multiple definitions of a single property, they will all individually be returned (each in the order they appear in the content).

</format>

## JsonElement+ObjectEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the collection.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

To be added.

## JsonElement+ObjectEnumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the collection.

To be added.

## JsonElement+ObjectEnumerator.System.Collections.Generic.IEnumerable<System.Text.Json.JsonProperty>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Text.Json.JsonProperty> IEnumerable<JsonProperty>.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator for `JsonProperty` objects that can be used to iterate through the collection.

This member is an explicit interface member implementation. It can be used only when the `ObjectEnumerator` instance is cast to an IEnumerator\<JsonProperty> interface.

## JsonElement+ObjectEnumerator.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator that can be used to iterate through the collection.

This member is an explicit interface member implementation. It can be used only when the `ObjectEnumerator` instance is cast to an `IEnumerable` interface.
