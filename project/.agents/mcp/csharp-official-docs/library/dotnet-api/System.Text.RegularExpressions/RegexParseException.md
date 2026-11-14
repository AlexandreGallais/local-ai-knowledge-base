---
title: "RegexParseException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/RegexParseException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegexParseException class

Namespace: `System.Text.RegularExpressions`

```csharp
public sealed class RegexParseException : ArgumentException
```

An exception as a result of a parse error in a regular expression, with detailed information in the
`RegexParseException.Error` and `RegexParseException.Offset` properties.

To be added.

## RegexParseException.Error property

```csharp
public System.Text.RegularExpressions.RegexParseError Error { get; }
```

Gets the error that happened during parsing.

Returns: The error that occurred during parsing.

To be added.

## RegexParseException.Offset property

```csharp
public int Offset { get; }
```

Gets the zero-based character offset in the regular expression pattern where the parse error
occurs.

Returns: The offset at which the parse error occurs.

To be added.

## RegexParseException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `info` object with the parameter name and additional exception
information.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.
