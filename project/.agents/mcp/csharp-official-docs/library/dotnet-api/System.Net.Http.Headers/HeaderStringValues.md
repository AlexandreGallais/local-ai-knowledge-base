---
title: "HeaderStringValues struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/HeaderStringValues.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HeaderStringValues struct

Namespace: `System.Net.Http.Headers`

```csharp
public readonly struct HeaderStringValues : System.Collections.Generic.IEnumerable<string>, System.Collections.Generic.IReadOnlyCollection<string>
```

Provides a collection of header string values.

To be added.

## HeaderStringValues.Count property

```csharp
public int Count { get; }
```

Gets the number of header values in the collection.

Returns: The number of elements in the collection.

To be added.

## HeaderStringValues.GetEnumerator() method

```csharp
public System.Net.Http.Headers.HeaderStringValues.Enumerator GetEnumerator ();
```

Gets an enumerator for all of the strings in the collection.

Returns: An enumerator for all the strings in the collection.

To be added.

## HeaderStringValues.System.Collections.Generic.IEnumerable<System.String>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<string> IEnumerable<string>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## HeaderStringValues.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HeaderStringValues` instance is cast to an `IEnumerable` interface.

## HeaderStringValues.ToString() method

```csharp
public override string ToString ();
```

Gets a string containing all the headers in the collection.

Returns: The string representation of all the headers in the collection.

To be added.
