---
title: "HeaderEncodingSelector<TContext> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HeaderEncodingSelector`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HeaderEncodingSelector<TContext> delegate

Namespace: `System.Net.Http`

```csharp
public delegate System.Text.Encoding? HeaderEncodingSelector<TContext>(string headerName, TContext context);
```

Represents a method that specifies the encoding to use when interpreting header values.

Parameters:

- `TContext`: The type of the headers that are being encoded/decoded.
- `headerName`: The name of the header to specify for the encoding.
- `context`: The type we are encoding/decoding the headers for.

Returns: The encoding to use, or `null` to use the default behavior.

To be added.
