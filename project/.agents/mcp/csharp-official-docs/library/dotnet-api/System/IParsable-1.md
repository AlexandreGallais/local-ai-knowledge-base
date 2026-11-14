---
title: "IParsable<TSelf> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IParsable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IParsable<TSelf> interface

Namespace: `System`

```csharp
public interface IParsable<TSelf> where TSelf : IParsable<TSelf>
```

Defines a mechanism for parsing a string to a value.

Parameters:

- `TSelf`: The type that implements this interface.

To be added.

## IParsable<TSelf>.Parse(String, IFormatProvider) method

```csharp
public static abstract TSelf Parse (string s, IFormatProvider? provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` is not representable by `TSelf`.

To be added.

## IParsable<TSelf>.TryParse(String, IFormatProvider, TSelf) method

```csharp
public static abstract bool TryParse (string? s, IFormatProvider? provider, out TSelf result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.
