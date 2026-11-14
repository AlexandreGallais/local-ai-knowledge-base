---
title: "Encoding class (part 14 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class (part 14 of 14)

## Encoding.TryGetChars(Byte>, Char>, Int32) method

```csharp
public virtual bool TryGetChars (ReadOnlySpan<byte> bytes, Span<char> chars, out int charsWritten);
```

Decodes into a span of chars a set of bytes from the specified read-only span if the destination is large enough.

Parameters:

- `bytes`: A read-only span containing the sequence of bytes to decode.
- `chars`: The character span receiving the decoded bytes.
- `charsWritten`: Upon successful completion of the operation, the number of chars decoded into `chars`.

Returns: `true` if all of the characters were decoded into the destination; `false` if the destination was too small to contain all the decoded chars.

To be added.
