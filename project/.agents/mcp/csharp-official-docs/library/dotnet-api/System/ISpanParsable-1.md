---
title: "ISpanParsable<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ISpanParsable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ISpanParsable<TSelf> interface

Namespace: `System`

```csharp
public interface ISpanParsable<TSelf> : IParsable<TSelf> where TSelf : ISpanParsable<TSelf>
```

Defines a mechanism for parsing a span of characters to a value.

Parameters:

- `TSelf`: The type that implements this interface.

To be added.

## ISpanParsable<TSelf>.Parse(Char>, IFormatProvider) method

```csharp
public static abstract TSelf Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

Exceptions:

- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` is not representable by `TSelf`.

To be added.

## ISpanParsable<TSelf>.TryParse(Char>, IFormatProvider, TSelf) method

```csharp
public static abstract bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out TSelf result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.
