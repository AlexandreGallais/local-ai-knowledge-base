---
title: "SP800108HmacCounterKdf class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SP800108HmacCounterKdf.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SP800108HmacCounterKdf class (part 2 of 2)

## SP800108HmacCounterKdf.DeriveKey(String, String, Int32) method

```csharp
public byte[] DeriveKey (string label, string context, int derivedKeyLengthInBytes);
```

Derives a key of a specified length.

Parameters:

- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `derivedKeyLengthInBytes`: The length of the derived key, in bytes.

Returns: An array containing the derived key.

Exceptions:

- `ArgumentNullException`: `label` is `null`.

-or-

`context` is `null`.
- `ArgumentOutOfRangeException`: `derivedKeyLengthInBytes` is negative or larger than the maximum number of bytes
that can be derived.
- `EncoderFallbackException`: `label` or `context` contains text that cannot be converted to UTF-8.

`label` and `context` will be converted to bytes using the UTF-8 encoding.
for other encodings, perform the conversion using the desired encoding and use an overload that accepts the
label and context as a sequence of bytes.

## SP800108HmacCounterKdf.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of `SP800108HmacCounterKdf`.

To be added.
