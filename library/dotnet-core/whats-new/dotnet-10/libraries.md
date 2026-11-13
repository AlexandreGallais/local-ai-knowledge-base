---
title: "What's new in .NET libraries for .NET 10 (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-10/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 10

This article describes new features in the .NET libraries for .NET 10.

## Cryptography

- Find certificates by thumbprints other than SHA-1
- Find PEM-encoded data in ASCII/UTF-8
- Encryption algorithm for PKCS#12/PFX export
- Post-quantum cryptography (PQC)

### Find certificates by thumbprints other than SHA-1

Finding certificates uniquely by thumbprint is a fairly common operation, but the `System.Security.Cryptography.X509Certificates.X509Certificate2Collection.Find(System.Security.Cryptography.X509Certificates.X509FindType,System.Object,System.Boolean)` method (for the `System.Security.Cryptography.X509Certificates.X509FindType.FindByThumbprint` mode) only searches for the SHA-1 thumbprint value.

There's some risk to using the `Find` method for finding SHA-2-256 ("SHA256") and SHA-3-256 thumbprints since these hash algorithms have the same lengths.

Instead, .NET 10 introduces a new method that accepts the name of the hash algorithm to use for matching.

```csharp
X509Certificate2Collection coll = store.Certificates.FindByThumbprint(HashAlgorithmName.SHA256, thumbprint);
Debug.Assert(coll.Count < 2, "Collection has too many matches, has SHA-2 been broken?");
return coll.SingleOrDefault();
```

### Find PEM-encoded data in ASCII/UTF-8

The PEM encoding (originally *Privacy Enhanced Mail*, but now used widely outside of email) is defined for "text", which means that the `System.Security.Cryptography.PemEncoding` class was designed to run on `System.String` and `ReadOnlySpan<char>`. However, it's common (especially on Linux) to have something like a certificate written in a file that uses the ASCII (string) encoding. Historically, that meant you needed to open the file and convert the bytes to chars (or a string) before you could use `PemEncoding`.

The new `System.Security.Cryptography.PemEncoding.FindUtf8(System.ReadOnlySpan{System.Byte})` method takes advantage of the fact that PEM is only defined for 7-bit ASCII characters, and that 7-bit ASCII has a perfect overlap with single-byte UTF-8 values. By calling this new method, you can skip the UTF-8/ASCII-to-char conversion and read the file directly.

```diff
byte[] fileContents = File.ReadAllBytes(path);
-char[] text = Encoding.ASCII.GetString(fileContents);
-PemFields pemFields = PemEncoding.Find(text);
+PemFields pemFields = PemEncoding.FindUtf8(fileContents);

-byte[] contents = Base64.DecodeFromChars(text.AsSpan()[pemFields.Base64Data]);
+byte[] contents = Base64.DecodeFromUtf8(fileContents.AsSpan()[pemFields.Base64Data]);
```

### Encryption algorithm for PKCS#12/PFX export

The new `System.Security.Cryptography.X509Certificates.X509Certificate.ExportPkcs12*` methods on `System.Security.Cryptography.X509Certificates.X509Certificate` allow callers to choose what encryption and digest algorithms are used to produce the output:

- `System.Security.Cryptography.X509Certificates.Pkcs12ExportPbeParameters.Pkcs12TripleDesSha1` indicates the Windows XP-era de facto standard. It produces an output supported by almost every library and platform that supports reading PKCS#12/PFX by choosing an older encryption algorithm.
- `System.Security.Cryptography.X509Certificates.Pkcs12ExportPbeParameters.Pbes2Aes256Sha256` indicates that AES should be used instead of 3DES (and SHA-2-256 instead of SHA-1), but the output might not be understood by all readers (such as Windows XP).

If you want even more control, you can use the overload) that accepts a `System.Security.Cryptography.PbeParameters`.

### Post-quantum cryptography (PQC)

.NET 10 includes support for three new asymmetric algorithms: ML-KEM (FIPS 203), ML-DSA (FIPS 204), and SLH-DSA (FIPS 205). The new types are:

- `System.Security.Cryptography.MLKem`
- `System.Security.Cryptography.MLDsa`
- `System.Security.Cryptography.SlhDsa`

Because it adds little benefit, these new types don't derive from `System.Security.Cryptography.AsymmetricAlgorithm`. Rather than the `AsymmetricAlgorithm` approach of creating an object and then importing a key into it, or generating a fresh key, the new types all use static methods to generate or import a key:

```csharp
using System;
using System.IO;
using System.Security.Cryptography;

private static bool ValidateMLDsaSignature(ReadOnlySpan<byte> data, ReadOnlySpan<byte> signature, string publicKeyPath)
{
    string publicKeyPem = File.ReadAllText(publicKeyPath);

    using (MLDsa key = MLDsa.ImportFromPem(publicKeyPem))
    {
        return key.VerifyData(data, signature);
    }
}
```

And rather than setting object properties and having a key <example-value>, key <example-value> on these new types takes in all of the options it needs.

```csharp
using (MLKem key = MLKem.GenerateKey(MLKemAlgorithm.MLKem768))
{
    string publicKeyPem = key.ExportSubjectPublicKeyInfoPem();
    ...
}
```

These algorithms all continue with the pattern of having a static `IsSupported` property to indicate if the algorithm is supported on the current system.

.NET 10 includes Windows Cryptography API: Next Generation (CNG) support for Post-Quantum Cryptography (PQC), which makes these algorithms available on Windows systems with PQC support. For example:

```csharp
using System;
using System.IO;
using System.Security.Cryptography;

private static bool ValidateMLDsaSignature(ReadOnlySpan<byte> data, ReadOnlySpan<byte> signature, string publicKeyPath)
{
    string publicKeyPem = File.ReadAllText(publicKeyPath);

    using MLDsa key = MLDsa.ImportFromPem(publicKeyPem);
    return key.VerifyData(data, signature);
}
```

The PQC algorithms are available on systems where the system cryptographic libraries are OpenSSL 3.5 (or newer) or Windows CNG with PQC support. The `System.Security.Cryptography.MLKem` type isn't marked as `[Experimental]`, but some of its methods are (and will be until the underlying standards are finalized). The `System.Security.Cryptography.MLDsa`, `System.Security.Cryptography.SlhDsa`, and `System.Security.Cryptography.CompositeMLDsa` classes are marked as `[Experimental]` under diagnostic `SYSLIB5006` until development is complete.

#### ML-DSA

The `System.Security.Cryptography.MLDsa` class includes ease-of-use features that simplify common code patterns:

```diff
private static byte[] SignData(string privateKeyPath, ReadOnlySpan<byte> data)
{
    using (MLDsa signingKey = MLDsa.ImportFromPem(File.ReadAllBytes(privateKeyPath)))
    {
-       byte[] signature = new byte[signingKey.Algorithm.SignatureSizeInBytes];
-       signingKey.SignData(data, signature);
+       return signingKey.SignData(data);
-       return signature;
    }
}
```

Additionally, .NET 10 adds support for HashML-DSA, which is called "PreHash" to help distinguish it from "pure" ML-DSA. As the underlying specification interacts with the Object Identifier (OID) value, the SignPreHash and VerifyPreHash methods on this `[Experimental]` type take the dotted-decimal OID as a string. This might evolve as more scenarios using HashML-DSA become well-defined.

```csharp
private static byte[] SignPreHashSha3_256(MLDsa signingKey, ReadOnlySpan<byte> data)
{
    const string Sha3_256Oid = "2.16.840.1.101.3.4.2.8";
    return signingKey.SignPreHash(SHA3_256.HashData(data), Sha3_256Oid);
}
```

Starting in RC 1, ML-DSA also supports signatures created and verified from an "external" mu value, which provides additional flexibility for advanced cryptographic scenarios:

```csharp
private static byte[] SignWithExternalMu(MLDsa signingKey, ReadOnlySpan<byte> externalMu)
{
    return signingKey.SignMu(externalMu);
}

private static bool VerifyWithExternalMu(MLDsa verifyingKey, ReadOnlySpan<byte> externalMu, ReadOnlySpan<byte> signature)
{
    return verifyingKey.VerifyMu(externalMu, signature);
}
```

#### Composite ML-DSA

.NET 10 introduces new types to support ietf-lamps-pq-composite-sigs (at draft 8 as of .NET 10 GA), including the `System.Security.Cryptography.CompositeMLDsa` and `System.Security.Cryptography.CompositeMLDsaAlgorithm` types, with implementation of the primitive methods for RSA variants.

```csharp
var algorithm = CompositeMLDsaAlgorithm.MLDsa65WithRSA4096Pss;
using var privateKey = CompositeMLDsa.GenerateKey(algorithm);

byte[] data = [42];
byte[] signature = privateKey.SignData(data);

using var publicKey = CompositeMLDsa.ImportCompositeMLDsaPublicKey(algorithm, privateKey.ExportCompositeMLDsaPublicKey());
Console.WriteLine(publicKey.VerifyData(data, signature)); // True

signature[0] ^= 1; // Tamper with signature
Console.WriteLine(publicKey.VerifyData(data, signature)); // False
```

### AES KeyWrap with Padding (IETF RFC 5649)

AES-KWP is an algorithm that's occasionally used in constructions like Cryptographic Message Syntax (CMS) EnvelopedData, where content is encrypted once, but the decryption key needs to be distributed to multiple parties, each one in a distinct secret form.

.NET now supports the AES-KWP algorithm via instance methods on the `System.Security.Cryptography.Aes` class:

```csharp
private static byte[] DecryptContent(ReadOnlySpan<byte> kek, ReadOnlySpan<byte> encryptedKey, ReadOnlySpan<byte> ciphertext)
{
    using (Aes aes = Aes.Create())
    {
        aes.SetKey(kek);

        Span<byte> dek = stackalloc byte[256 / 8];
        int length = aes.DecryptKeyWrapPadded(encryptedKey, dek);

        aes.SetKey(dek.Slice(0, length));
        return aes.DecryptCbc(ciphertext);
    }
}
```

## Globalization and date/time

- New method overloads in ISOWeek for DateOnly type
- Numeric ordering for string comparison
- New `TimeSpan.FromMilliseconds` overload with single parameter

### New method overloads in ISOWeek for DateOnly type

The `System.Globalization.ISOWeek` class was originally designed to work exclusively with `System.DateTime`, as it was introduced before the `System.DateOnly` type existed. Now that `DateOnly` is available, it makes sense for `ISOWeek` to support it as well. The following overloads are new:

- `System.Globalization.ISOWeek.GetWeekOfYear(System.DateOnly)`
- `System.Globalization.ISOWeek.GetYear(System.DateOnly)`
- `System.Globalization.ISOWeek.ToDateOnly(System.Int32,System.Int32,System.DayOfWeek)`

### Numeric ordering for string comparison

Numerical string comparison is a highly requested feature for comparing strings numerically instead of lexicographically. For example, `2` is less than `10`, so `"2"` should appear before `"10"` when ordered numerically. Similarly, `"2"` and `"02"` are equal numerically. With the new `System.Globalization.CompareOptions.NumericOrdering` option, it's now possible to do these types of comparisons:

```csharp
StringComparer numericStringComparer = StringComparer.Create(CultureInfo.CurrentCulture, CompareOptions.NumericOrdering);

Console.WriteLine(numericStringComparer.Equals("02", "2"));
// Output: True

foreach (string os in new[] { "Windows 8", "Windows 10", "Windows 11" }.Order(numericStringComparer))
{
    Console.WriteLine(os);
}

// Output:
// Windows 8
// Windows 10
// Windows 11

HashSet<string> set = new HashSet<string>(numericStringComparer) { "007" };
Console.WriteLine(set.Contains("7"));
// Output: True 
```
This option isn't valid for the following index-based string operations: `IndexOf`, `LastIndexOf`, `StartsWith`, `EndsWith`, `IsPrefix`, and `IsSuffix`.

### New `TimeSpan.FromMilliseconds` overload with single parameter

The `System.TimeSpan.FromMilliseconds(System.Int64,System.Int64)` method was introduced previously without adding an overload that takes a single parameter.

Although this works since the second parameter is optional, it causes a compilation error when used in a LINQ expression like:

```csharp
Expression<Action> a = () => TimeSpan.FromMilliseconds(1000);
```

The issue arises because LINQ expressions can't handle optional parameters. To address this, .NET 10 introduces a new overload) takes a single parameter. It also modifies the existing method) to make the second parameter mandatory.

## Strings

- String normalization APIs to work with span of characters
- UTF-8 support for hex-string conversion

### String normalization APIs to work with span of characters

Unicode string normalization has been supported for a long time, but existing APIs only worked with the string type. This means that callers with data stored in different forms, such as character arrays or spans, must allocate a new string to use these APIs. Additionally, APIs that return a normalized string always allocate a new string to represent the normalized output.

.NET 10 introduces new APIs that work with spans of characters, which expand normalization beyond string types and help to avoid unnecessary allocations:

- `System.StringNormalizationExtensions.GetNormalizedLength(System.ReadOnlySpan{System.Char},System.Text.NormalizationForm)`
- `System.StringNormalizationExtensions.IsNormalized(System.ReadOnlySpan{System.Char},System.Text.NormalizationForm)`
- `System.StringNormalizationExtensions.TryNormalize(System.ReadOnlySpan{System.Char},System.Span{System.Char},System.Int32@,System.Text.NormalizationForm)`

### UTF-8 support for hex-string conversion

.NET 10 adds UTF-8 support for hex-string conversion operations in the `System.Convert` class. These new methods provide efficient ways to convert between UTF-8 byte sequences and hexadecimal representations without requiring intermediate string allocations:

- `System.Convert.FromHexString(System.ReadOnlySpan{System.Byte})`
- `System.Convert.FromHexString(System.ReadOnlySpan{System.Byte},System.Span{System.Byte},System.Int32@,System.Int32@)`
- `System.Convert.TryToHexString(System.ReadOnlySpan{System.Byte},System.Span{System.Byte},System.Int32@)`
- `System.Convert.TryToHexStringLower(System.ReadOnlySpan{System.Byte},System.Span{System.Byte},System.Int32@)`

These methods mirror the existing overloads that work with `string` and `ReadOnlySpan<char>`, but operate directly on UTF-8 encoded bytes for improved performance in scenarios where you're already working with UTF-8 data.
