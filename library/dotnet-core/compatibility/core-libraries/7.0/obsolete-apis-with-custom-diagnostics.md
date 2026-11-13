---
title: "Breaking change: .NET 7 obsoletions with non-default diagnostic IDs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/7.0/obsolete-apis-with-custom-diagnostics.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# API obsoletions with non-default diagnostic IDs (.NET 7)

Some APIs have been marked as obsolete, starting in .NET 7. This breaking change is specific to APIs that have been marked as obsolete *with a custom diagnostic ID*. Suppressing the default obsoletion diagnostic ID, which is CS0618 for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Change description

In previous .NET versions, these APIs can be used without any build warning. In .NET 7 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the obsoletion warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages for obsoleted APIs.

| Diagnostic ID | Description | Severity |
| - | - |
| SYSLIB0036 | `System.Text.RegularExpressions.Regex.CompileToAssembly*` is obsolete and not supported. Use `RegexGeneratorAttribute` with the regular expression source generator instead. | Warning |
| SYSLIB0037 | `System.Reflection.AssemblyName` members `System.Reflection.AssemblyName.HashAlgorithm`, `System.Reflection.AssemblyName.ProcessorArchitecture`, and `System.Reflection.AssemblyName.VersionCompatibility` are obsolete and not supported. | Warning |
| SYSLIB0038 | `System.Data.SerializationFormat.Binary` is obsolete and should not be used. | Warning |
| SYSLIB0039 | TLS versions 1.0 and 1.1 have known vulnerabilities and are not recommended. Use a newer TLS version instead, or use `System.Security.Authentication.SslProtocols.None` to defer to OS defaults. | Warning |
| SYSLIB0040 | `System.Net.Security.EncryptionPolicy.NoEncryption` and `System.Net.Security.EncryptionPolicy.AllowNoEncryption` significantly reduce security and should not be used in production code. | Warning |
| SYSLIB0041 | The default hash algorithm and iteration counts in `System.Security.Cryptography.Rfc2898DeriveBytes` constructors are outdated and insecure. Use a constructor that accepts the hash algorithm and the number of iterations. | Warning |
| SYSLIB0042 | `ToXmlString` and `FromXmlString` have no implementation for elliptic curve cryptography (ECC) types, and are obsolete. Use a standard import and export format such as `ExportSubjectPublicKeyInfo` or `ImportSubjectPublicKeyInfo` for public keys, and `ExportPkcs8PrivateKey` or `ImportPkcs8PrivateKey` for private keys. | Warning |
| SYSLIB0043 | `System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray` and the associated constructor do not have a consistent and interoperable implementation on all platforms. Use `System.Security.Cryptography.ECDiffieHellmanPublicKey.ExportSubjectPublicKeyInfo` instead. | Warning |
| SYSLIB0044 | `System.Reflection.AssemblyName.CodeBase` and `System.Reflection.AssemblyName.EscapedCodeBase` are obsolete. | Warning |
| SYSLIB0045 | Cryptographic factory methods accepting an algorithm name are obsolete. Use the parameterless `Create` factory method on the algorithm type instead. | Warning |
| SYSLIB0047 | `System.Xml.XmlSecureResolver` is obsolete. Use `XmlResolver.ThrowingResolver` instead to forbid resolution of external XML resources. | Warning |

## Version introduced

.NET 7

## Type of breaking change

These obsoletions can affect source compatibility.

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.

- Warnings or errors for these obsoletions can't be suppressed using the standard diagnostic ID for obsolete types or members; use the custom `SYSLIBxxxx` diagnostic ID value instead.

## Affected APIs

### SYSLIB0036

- `System.Text.RegularExpressions.Regex.CompileToAssembly*`

### SYSLIB0037

- `System.Reflection.AssemblyName.HashAlgorithm`
- `System.Reflection.AssemblyName.ProcessorArchitecture`
- `System.Reflection.AssemblyName.VersionCompatibility`

### SYSLIB0038

- `System.Data.SerializationFormat.Binary`

### SYSLIB0039

- `System.Security.Authentication.SslProtocols.Tls`
- `System.Security.Authentication.SslProtocols.Tls11`

### SYSLIB0040

- `System.Net.Security.EncryptionPolicy.AllowNoEncryption`
- `System.Net.Security.EncryptionPolicy.NoEncryption`

### SYSLIB0041

- `System.Security.Cryptography.Rfc2898DeriveBytes.#ctor(System.String,System.Byte[])`
- `System.Security.Cryptography.Rfc2898DeriveBytes.#ctor(System.String,System.Int32)`
- `System.Security.Cryptography.Rfc2898DeriveBytes.#ctor(System.Byte[],System.Byte[],System.Int32)`
- `System.Security.Cryptography.Rfc2898DeriveBytes.#ctor(System.String,System.Byte[],System.Int32)`
- `System.Security.Cryptography.Rfc2898DeriveBytes.#ctor(System.String,System.Int32,System.Int32)`

### SYSLIB0042

- `System.Security.Cryptography.ECDiffieHellmanCng.FromXmlString(System.String,System.Security.Cryptography.ECKeyXmlFormat)`
- `System.Security.Cryptography.ECDiffieHellmanCng.ToXmlString(System.Security.Cryptography.ECKeyXmlFormat)`
- `System.Security.Cryptography.ECDiffieHellmanCngPublicKey.FromXmlString(System.String)`
- `System.Security.Cryptography.ECDiffieHellmanCngPublicKey.ToXmlString`
- `System.Security.Cryptography.ECDiffieHellmanPublicKey.ToXmlString`
- `System.Security.Cryptography.ECDsaCng.FromXmlString(System.String,System.Security.Cryptography.ECKeyXmlFormat)`
- `System.Security.Cryptography.ECDsaCng.ToXmlString(System.Security.Cryptography.ECKeyXmlFormat)`

### SYSLIB0043

- `System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray`
- `System.Security.Cryptography.ECDiffieHellmanPublicKey.#ctor(System.Byte[])`

### SYSLIB0045

- `System.Security.Cryptography.Aes.Create(System.String)`
- `System.Security.Cryptography.AsymmetricAlgorithm.Create(System.String)`
- `System.Security.Cryptography.DES.Create(System.String)`
- `System.Security.Cryptography.ECDiffieHellman.Create(System.String)`
- `System.Security.Cryptography.ECDsa.Create(System.String)`
- `System.Security.Cryptography.HashAlgorithm.Create(System.String)`
- `System.Security.Cryptography.KeyedHashAlgorithm.Create(System.String)`
- `System.Security.Cryptography.RandomNumberGenerator.Create(System.String)`
- `System.Security.Cryptography.RC2.Create(System.String)`
- `System.Security.Cryptography.Rijndael.Create(System.String)`
- `System.Security.Cryptography.RSA.Create(System.String)`
- `System.Security.Cryptography.SHA1.Create(System.String)`
- `System.Security.Cryptography.SHA256.Create(System.String)`
- `System.Security.Cryptography.SHA384.Create(System.String)`
- `System.Security.Cryptography.SHA512.Create(System.String)`
- `System.Security.Cryptography.SymmetricAlgorithm.Create(System.String)`
- `System.Security.Cryptography.TripleDES.Create(System.String)`

### SYSLIB0047

- `System.Xml.XmlSecureResolver`

## See also

- API obsoletions with non-default diagnostic IDs (.NET 6)
- API obsoletions with non-default diagnostic IDs (.NET 5)
- Obsolete features in .NET 5+
