---
title: "StringTokenizer struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/StringTokenizer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringTokenizer struct

Namespace: `Microsoft.Extensions.Primitives`

```csharp
public readonly struct StringTokenizer : System.Collections.Generic.IEnumerable<Microsoft.Extensions.Primitives.StringSegment>
```

Tokenizes a `String` into <see cref="<example-value>">StringSegments</see>.

To be added.

## StringTokenizer.StringTokenizer(StringSegment, Char[]) constructor

```csharp
public StringTokenizer (Microsoft.Extensions.Primitives.StringSegment value, char[] separators);
```

Initializes a new instance of `StringTokenizer`.

Parameters:

- `value`: The `StringSegment` to tokenize.
- `separators`: The characters to tokenize by.

To be added.

## StringTokenizer.StringTokenizer(String, Char[]) constructor

```csharp
public StringTokenizer (string value, char[] separators);
```

Initializes a new instance of `StringTokenizer`.

Parameters:

- `value`: The `String` to tokenize.
- `separators`: The characters to tokenize by.

To be added.

## StringTokenizer.GetEnumerator() method

```csharp
public Microsoft.Extensions.Primitives.StringTokenizer.Enumerator GetEnumerator ();
```

Initializes a new instance of `Enumerator`.

Returns: An `Enumerator` based on the `StringTokenizer`'s value and separators.

To be added.

## StringTokenizer.System.Collections.Generic.IEnumerable<Microsoft.Extensions.Primitives.StringSegment>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<Microsoft.Extensions.Primitives.StringSegment> IEnumerable<StringSegment>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## StringTokenizer.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `StringTokenizer` instance is cast to an `IEnumerable` interface.
