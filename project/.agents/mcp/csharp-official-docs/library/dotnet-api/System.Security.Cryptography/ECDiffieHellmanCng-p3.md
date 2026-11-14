---
title: "ECDiffieHellmanCng class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDiffieHellmanCng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDiffieHellmanCng class (part 3 of 3)

## ECDiffieHellmanCng.TryExportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public override bool TryExportPkcs8PrivateKey (Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 PrivateKeyInfo format into a provided buffer.

Parameters:

- `destination`: The byte span to receive the PKCS#8 PrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

To be added.
