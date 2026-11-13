---
title: "Breaking change: .NET 6 obsoletions with non-default diagnostic IDs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/6.0/obsolete-apis-with-custom-diagnostics.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# API obsoletions with non-default diagnostic IDs (.NET 6)

Some APIs have been marked as obsolete, starting in .NET 6. This breaking change is specific to APIs that have been marked as obsolete *with a custom diagnostic ID*. Suppressing the default obsoletion diagnostic ID, which is CS0618 for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Change description

In previous .NET versions, these APIs can be used without any build warning. In .NET 6 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the obsoletion warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages for obsoleted APIs.

| Diagnostic ID | Description | Severity |
| - | - |
| SYSLIB0013 | `System.Uri.EscapeUriString(System.String)` can corrupt the URI string in some cases. Consider using `System.Uri.EscapeDataString(System.String)` for query string components instead. | Warning |
| SYSLIB0014 | `System.Net.WebRequest`, `System.Net.HttpWebRequest`, `System.Net.ServicePoint`, and `System.Net.WebClient` are obsolete. Use `System.Net.Http.HttpClient` instead. | Warning |
| SYSLIB0015 | `System.Runtime.CompilerServices.DisablePrivateReflectionAttribute` has no effect in .NET 6+. | Warning |
| SYSLIB0016 | Use the `System.Drawing.Graphics.GetContextInfo*` overloads that accept arguments for better performance and fewer allocations. | Warning |
| SYSLIB0017 | Strong-name signing is not supported and throws `System.PlatformNotSupportedException`. | Warning |
| SYSLIB0018 | Reflection-only loading is not supported and throws `System.PlatformNotSupportedException`. | Warning |
| SYSLIB0019 | The `System.Runtime.InteropServices.RuntimeEnvironment` members `System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile`, `System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid,System.Guid)`, and `System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid,System.Guid)` are no longer supported and throw `System.PlatformNotSupportedException`. | Warning |
| SYSLIB0020 | `System.Text.Json.JsonSerializerOptions.IgnoreNullValues` is obsolete. To ignore null values when serializing, set `System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition` to `System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull`. | Warning |
| SYSLIB0021 | Derived cryptographic types are obsolete. Use the `Create` method on the base type instead. | Warning |
| SYSLIB0022 | The `System.Security.Cryptography.Rijndael` and `System.Security.Cryptography.RijndaelManaged` types are obsolete. Use `System.Security.Cryptography.Aes` instead. | Warning |
| SYSLIB0023 | `System.Security.Cryptography.RNGCryptoServiceProvider` is obsolete. To generate a random number, use one of the `System.Security.Cryptography.RandomNumberGenerator` static methods instead. | Warning |
| SYSLIB0024 | Creating and unloading AppDomains is not supported and throws an exception. | Warning |
| SYSLIB0025 | `System.Runtime.CompilerServices.SuppressIldasmAttribute` has no effect in .NET 6+. | Warning |
| SYSLIB0026 | `System.Security.Cryptography.X509Certificates.X509Certificate` and `System.Security.Cryptography.X509Certificates.X509Certificate2` are immutable. Use the appropriate constructor to create a new certificate. | Warning |
| SYSLIB0027 | `System.Security.Cryptography.X509Certificates.PublicKey.Key` is obsolete. Use the appropriate method to get the public key, such as `System.Security.Cryptography.X509Certificates.PublicKey.GetRSAPublicKey`. | Warning |
| SYSLIB0028 | `System.Security.Cryptography.X509Certificates.X509Certificate2.PrivateKey` is obsolete. Use the appropriate method to get the private key, such as `System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2)`, or use the `System.Security.Cryptography.X509Certificates.X509Certificate2.CopyWithPrivateKey(System.Security.Cryptography.ECDiffieHellman)` method to create a new instance with a private key. | Warning |
| SYSLIB0029 | `ProduceLegacyHmacValues` is obsolete. Producing legacy HMAC values is no longer supported. | Warning |
| SYSLIB0030 | `HMACSHA1` always uses the algorithm implementation provided by the platform. Use a constructor without the `useManagedSha1` parameter. | Warning |
| SYSLIB0031 | `System.Security.Cryptography.CryptoConfig.EncodeOID(System.String)` is obsolete. Use the ASN.1 functionality provided in `System.Formats.Asn1`. | Warning |
| SYSLIB0032 | Recovery from corrupted process state exceptions is not supported; `System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute` is ignored. | Warning |
| SYSLIB0033 | `System.Security.Cryptography.Rfc2898DeriveBytes.CryptDeriveKey(System.String,System.String,System.Int32,System.Byte[])` is obsolete and is not supported. Use `System.Security.Cryptography.PasswordDeriveBytes.CryptDeriveKey(System.String,System.String,System.Int32,System.Byte[])` instead. | Warning |
| SYSLIB0034 | `System.Security.Cryptography.Pkcs.CmsSigner.#ctor(System.Security.Cryptography.CspParameters)` is obsolete. Use an alternative constructor instead. | Warning |
| SYSLIB0035 | `System.Security.Cryptography.Pkcs.SignerInfo.ComputeCounterSignature` is obsolete. Use the overload that accepts a `System.Security.Cryptography.Pkcs.CmsSigner` instead. | Warning |

## Version introduced

.NET 6

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.

- Warnings or errors for these obsoletions can't be suppressed using the standard diagnostic ID for obsolete types or members; use the custom `SYSLIBxxxx` diagnostic ID value instead.

## Affected APIs

### SYSLIB0013

- `System.Uri.EscapeUriString(System.String)`

### SYSLIB0014

- `System.Net.WebRequest`
- `System.Net.HttpWebRequest`
- `System.Net.ServicePoint`
- `System.Net.WebClient`

### SYSLIB0015

- `System.Runtime.CompilerServices.DisablePrivateReflectionAttribute`

### SYSLIB0016

- `System.Drawing.Graphics.GetContextInfo`

### SYSLIB0017

- `System.Reflection.AssemblyName.KeyPair`
- `System.Reflection.StrongNameKeyPair`

### SYSLIB0018

- `System.Reflection.Assembly.ReflectionOnlyLoad*`
- `System.Reflection.Assembly.ReflectionOnlyLoadFrom(System.String)`
- `System.Type.ReflectionOnlyGetType(System.String,System.Boolean,System.Boolean)`

### SYSLIB0019

- `System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile`
- `System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid,System.Guid)`
- `System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid,System.Guid)`

### SYSLIB0020

- `System.Text.Json.JsonSerializerOptions.IgnoreNullValues`

### SYSLIB0021

- `System.Security.Cryptography.AesCryptoServiceProvider`
- `System.Security.Cryptography.AesManaged`
- `System.Security.Cryptography.DESCryptoServiceProvider`
- `System.Security.Cryptography.MD5CryptoServiceProvider`
- `System.Security.Cryptography.RC2CryptoServiceProvider`
- `System.Security.Cryptography.SHA1CryptoServiceProvider`
- `System.Security.Cryptography.SHA1Managed`
- `System.Security.Cryptography.SHA256Managed`
- `System.Security.Cryptography.SHA256CryptoServiceProvider`
- `System.Security.Cryptography.SHA384Managed`
- `System.Security.Cryptography.SHA384CryptoServiceProvider`
- `System.Security.Cryptography.SHA512Managed`
- `System.Security.Cryptography.SHA512CryptoServiceProvider`
- `System.Security.Cryptography.TripleDESCryptoServiceProvider`

### SYSLIB0022

- `System.Security.Cryptography.Rijndael`
- `System.Security.Cryptography.RijndaelManaged`

### SYSLIB0023

- `System.Security.Cryptography.RNGCryptoServiceProvider`

### SYSLIB0024

- `System.AppDomain.CreateDomain(System.String)`
- `System.AppDomain.Unload(System.AppDomain)`

### SYSLIB0025

- `System.Runtime.CompilerServices.SuppressIldasmAttribute`

### SYSLIB0026

- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor`
- `System.Security.Cryptography.X509Certificates.X509Certificate.Import*`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.Import*`

### SYSLIB0027

- `System.Security.Cryptography.X509Certificates.PublicKey.Key`

### SYSLIB0028

- `System.Security.Cryptography.X509Certificates.X509Certificate2.PrivateKey`

### SYSLIB0029

- `System.Security.Cryptography.HMACSHA384.ProduceLegacyHmacValues`
- `System.Security.Cryptography.HMACSHA512.ProduceLegacyHmacValues`

### SYSLIB0030

- `System.Security.Cryptography.HMACSHA1.#ctor(System.Byte[],System.Boolean)`

### SYSLIB0031

- `System.Security.Cryptography.CryptoConfig.EncodeOID(System.String)`

### SYSLIB0032

- `System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute`

### SYSLIB0033

- `System.Security.Cryptography.Rfc2898DeriveBytes.CryptDeriveKey(System.String,System.String,System.Int32,System.Byte[])`

### SYSLIB0034

- `System.Security.Cryptography.Pkcs.CmsSigner.#ctor(System.Security.Cryptography.CspParameters)`

### SYSLIB0035

- `System.Security.Cryptography.Pkcs.SignerInfo.ComputeCounterSignature`

## See also

- API obsoletions with non-default diagnostic IDs (.NET 7)
- API obsoletions with non-default diagnostic IDs (.NET 5)
- Obsolete features in .NET 5+
