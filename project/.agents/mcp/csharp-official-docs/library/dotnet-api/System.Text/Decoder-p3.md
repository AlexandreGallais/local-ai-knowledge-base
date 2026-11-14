---
title: "Decoder class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Decoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decoder class (part 3 of 3)

## Decoder.Reset() method

```csharp
public virtual void Reset ();
```

When overridden in a derived class, sets the decoder back to its initial state.

#### Remarks
This method clears the internal state of the `Decoder` object. The method clears any state information preserved from a previous call to `Decoder.GetChars` or `Decoder.Convert`, including trailing bytes at the end of the previous data block.

Your application should call the `Decoder.Reset` method if it wants to reuse the same decoder even after an exception is thrown by `Decoder.GetChars`, `Decoder.Convert`, or `Decoder.GetCharCount`, or if the decoder switches streams and begins to decode another stream.
