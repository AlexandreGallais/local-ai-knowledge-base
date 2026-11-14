---
title: "StringValues+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/StringValues+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringValues+Enumerator struct

Namespace: `Microsoft.Extensions.Primitives`

```csharp
public struct StringValues.Enumerator : System.Collections.Generic.IEnumerator<string>
```

Enumerates the string values of a `StringValues`.

To be added.

## StringValues+Enumerator.StringValues+Enumerator(StringValues) constructor

```csharp
public Enumerator (ref Microsoft.Extensions.Primitives.StringValues values);
```

Instantiates an `Enumerator` using a `StringValues`.

Parameters:

- `values`: The `StringValues` to enumerate.

To be added.

## StringValues+Enumerator.Current property

```csharp
public string? Current { get; }
```

Gets the element at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

To be added.

## StringValues+Enumerator.System.Collections.IEnumerator.Current property

```csharp
object? System.Collections.IEnumerator.Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Enumerator` instance is cast to an `IEnumerator` interface.

## StringValues+Enumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `Enumerator`.

To be added.

## StringValues+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the `StringValues`.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the `StringValues`.

To be added.

## StringValues+Enumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Enumerator` instance is cast to an `IEnumerator` interface.
