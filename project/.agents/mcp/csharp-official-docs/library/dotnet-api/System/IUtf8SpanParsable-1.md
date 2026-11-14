---
title: "IUtf8SpanParsable<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IUtf8SpanParsable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IUtf8SpanParsable<TSelf> interface

Namespace: `System`

```csharp
public interface IUtf8SpanParsable<TSelf> where TSelf : IUtf8SpanParsable<TSelf>
```

Defines a mechanism for parsing a span of UTF-8 characters to a value.

Parameters:

- `TSelf`: The type that implements this interface.

To be added.

## IUtf8SpanParsable<TSelf>.Parse(Byte>, IFormatProvider) method

```csharp
public static abstract TSelf Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

Exceptions:

- `FormatException`: `utf8Text` is not in the correct format.
- `OverflowException`: `utf8Text` is not representable by `TSelf`.

To be added.

## IUtf8SpanParsable<TSelf>.TryParse(Byte>, IFormatProvider, TSelf) method

```csharp
public static abstract bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out TSelf result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.
