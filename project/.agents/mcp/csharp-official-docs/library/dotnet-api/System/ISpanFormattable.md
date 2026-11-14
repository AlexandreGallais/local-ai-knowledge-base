---
title: "ISpanFormattable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ISpanFormattable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ISpanFormattable interface

Namespace: `System`

```csharp
public interface ISpanFormattable : IFormattable
```

Provides functionality to format the string representation of an object into a span.

To be added.

## ISpanFormattable.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format, IFormatProvider? provider);
```

Tries to format the value of the current instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

#### Remarks

- An implementation of this interface should produce the same string of characters as an implementation of `ToString` on the same type.
- TryFormat should return false only if there is not enough space in the destination buffer. Any other failures should throw an exception.
