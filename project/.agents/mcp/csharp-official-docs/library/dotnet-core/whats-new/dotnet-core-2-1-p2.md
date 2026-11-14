---
title: "What's new in .NET Core 2.1 (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-core-2-1.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET Core 2.1 (part 2 of 2)

## API changes

### `Span<T>` and `Memory<T>`

.NET Core 2.1 includes some new types that make working with arrays and other types of memory much more efficient. The new types include:

- `System.Span`1` and `System.ReadOnlySpan`1`.

- `System.Memory`1` and `System.ReadOnlyMemory`1`.

Without these types, when passing such items as a portion of an array or a section of a memory buffer, you have to make a copy of some portion of the data before passing it to a method. These types provide a virtual view of that data that eliminates the need for the additional memory allocation and copy operations.

The following example uses a `System.Span`1` and `System.Memory`1` instance to provide a virtual view of 10 elements of an array.

```csharp
﻿using System;

class Program
{
    static void Main()
    {
        int[] numbers = new int[100];
        for (int i = 0; i < 100; i++)
        {
            numbers[i] = i * 2;
        }

        var part = new Span<int>(numbers, start: 10, length: 10);
        foreach (var value in part)
            Console.Write($"{value}  ");
    }
}
// The example displays the following output:
//     20  22  24  26  28  30  32  34  36  38
```

```vb
﻿Module Program
    Sub Main()
        Dim numbers As Integer() = New Integer(99) {}

        For i As Integer = 0 To 99
            numbers(i) = i * 2
        Next

        Dim part = New Memory(Of Integer)(numbers, start:=10, length:=10)

        For Each value In part.Span
            Console.Write($"{value}  ")
        Next
    End Sub
End Module
' The example displays the following output:
'     20  22  24  26  28  30  32  34  36  38
```

### Brotli compression

.NET Core 2.1 adds support for Brotli compression and decompression. Brotli is a general-purpose lossless compression algorithm that is defined in RFC 7932 and is supported by most web browsers and major web servers. You can use the stream-based `System.IO.Compression.BrotliStream` class or the high-performance span-based `System.IO.Compression.BrotliEncoder` and `System.IO.Compression.BrotliDecoder` classes. The following example illustrates compression with the `System.IO.Compression.BrotliStream` class:

```csharp
﻿using System;
using System.IO;
using System.IO.Compression;

public static class BrotliExample
{
    public static Stream DecompressWithBrotli(Stream toDecompress)
    {
        MemoryStream decompressedStream = new MemoryStream();
        using (BrotliStream decompressionStream = new BrotliStream(toDecompress, CompressionMode.Decompress))
        {
            decompressionStream.CopyTo(decompressedStream);
        }
        decompressedStream.Position = 0;
        return decompressedStream;
    }
}
```

```vb
﻿Imports System.IO
Imports System.IO.Compression

Public Module BrotliExample
    Public Function DecompressWithBrotli(toDecompress As Stream) As Stream
        Dim decompressedStream As New MemoryStream()
        Using decompressionStream As New BrotliStream(toDecompress, CompressionMode.Decompress)
            decompressionStream.CopyTo(decompressedStream)
        End Using
        decompressedStream.Position = 0
        Return decompressedStream
    End Function
End Module
```

The `System.IO.Compression.BrotliStream` behavior is the same as `System.IO.Compression.DeflateStream` and `System.IO.Compression.GZipStream`, which makes it easy to convert code that calls these APIs to `System.IO.Compression.BrotliStream`.

### New cryptography APIs and cryptography improvements

.NET Core 2.1 includes numerous enhancements to the cryptography APIs:

- `System.Security.Cryptography.Pkcs.SignedCms` is available in the System.Security.Cryptography.Pkcs package. The implementation is the same as the `System.Security.Cryptography.Pkcs.SignedCms` class in the .NET Framework.

- New overloads of the `System.Security.Cryptography.X509Certificates.X509Certificate.GetCertHash*` and `System.Security.Cryptography.X509Certificates.X509Certificate.GetCertHashString*` methods accept a hash algorithm identifier to enable callers to get certificate thumbprint values using algorithms other than SHA-1.

- New `System.Span`1`-based cryptography APIs are available for hashing, HMAC, cryptographic random number generation, asymmetric signature generation, asymmetric signature processing, and RSA encryption.

- The performance of `System.Security.Cryptography.Rfc2898DeriveBytes` has improved by about 15% by using a `System.Span`1`-based implementation.

- The new `System.Security.Cryptography.CryptographicOperations` class includes two new methods:

  - `System.Security.Cryptography.CryptographicOperations.FixedTimeEquals*` takes a fixed amount of time to return for any two inputs of the same length, which makes it suitable for use in cryptographic verification to avoid contributing to timing side-channel information.

  - `System.Security.Cryptography.CryptographicOperations.ZeroMemory*` is a memory-clearing routine that cannot be optimized.

- The static `System.Security.Cryptography.RandomNumberGenerator.Fill*` method fills a `System.Span`1` with random values.

- The `System.Security.Cryptography.Pkcs.EnvelopedCms` is now supported on Linux and macOS.

- Elliptic-Curve Diffie-Hellman (ECDH) is now available in the `System.Security.Cryptography.ECDiffieHellman` class family. The surface area is the same as in the .NET Framework.

- The instance returned by `System.Security.Cryptography.RSA.Create*` can encrypt or decrypt with OAEP using a SHA-2 digest, as well as generate or validate signatures using RSA-PSS.

### Sockets improvements

.NET Core includes a new type, `System.Net.Http.SocketsHttpHandler`, and a rewritten `System.Net.Http.HttpMessageHandler`, that form the basis of higher-level networking APIs.  `System.Net.Http.SocketsHttpHandler`, for example, is the basis of the `System.Net.Http.HttpClient` implementation. In previous versions of .NET Core, higher-level APIs were based on native networking implementations.

The sockets implementation introduced in .NET Core 2.1 has a number of advantages:

- A significant performance improvement when compared with the previous implementation.

- Elimination of platform dependencies, which simplifies deployment and servicing.

- Consistent behavior across all .NET Core platforms.

`System.Net.Http.SocketsHttpHandler` is the default implementation in .NET Core 2.1. However, you can configure your application to use the older `System.Net.Http.HttpClientHandler` class by calling the `System.AppContext.SetSwitch*` method:

```csharp
AppContext.SetSwitch("System.Net.Http.UseSocketsHttpHandler", false);
```

```vb
AppContext.SetSwitch("System.Net.Http.UseSocketsHttpHandler", False)
```

You can also use an environment variable to opt out of using sockets implementations based on `System.Net.Http.SocketsHttpHandler`. To do this, set the `DOTNET_SYSTEM_NET_HTTP_USESOCKETSHTTPHANDLER` to either `false` or 0.

On Windows, you can also choose to use `System.Net.Http.WinHttpHandler`, which relies on a native implementation, or the `System.Net.Http.SocketsHttpHandler` class by passing an instance of the class to the `System.Net.Http.HttpClient` constructor.

On Linux and macOS, you can only configure `System.Net.Http.HttpClient` on a per-process basis. On Linux, you need to deploy libcurl if you want to use the old `System.Net.Http.HttpClient` implementation. (It is installed with .NET Core 2.0.)

### Breaking changes

For information about breaking changes, see Breaking changes for migration from version 2.0 to 2.1.

## See also

- What's new in .NET Core 3.1
- New features in EF Core 2.1
- What's new in ASP.NET Core 2.1
