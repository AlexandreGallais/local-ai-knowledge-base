---
title: "Breaking change: .NET 9 obsoletions with custom IDs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/9.0/obsolete-apis-with-custom-diagnostics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# API obsoletions with non-default diagnostic IDs (.NET 9)

Some APIs have been marked as obsolete, starting in .NET 9. This breaking change is specific to APIs that have been marked as obsolete *with a custom diagnostic ID*. Suppressing the default obsoletion diagnostic ID, which is CS0618 for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Change description

In previous .NET versions, these APIs can be used without any build warning. In .NET 9 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the obsoletion warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages for obsoleted APIs.

| Diagnostic ID | Description | Severity |
|---------------|-------------|----------|
| SYSLIB0009 | `System.Net.AuthenticationManager` is not supported. Methods will no-op or throw `System.PlatformNotSupportedException`. | Warning |
| SYSLIB0014 | `System.Net.ServicePointManager` is fully obsolete. Settings on `System.Net.ServicePointManager` don't affect `System.Net.Security.SslStream` or `System.Net.Http.HttpClient` (this behavior hasn't changed since .NET 6). | Warning |
| SYSLIB0054 | `System.Threading.Thread.VolatileRead*` and `System.Threading.Thread.VolatileWrite*` are obsolete. Use `System.Threading.Volatile.Read*` or `System.Threading.Volatile.Write*` instead. | Warning |
| SYSLIB0055 | `AdvSimd.ShiftRightLogicalRoundedNarrowingSaturate*` methods with signed parameters are obsolete. Use the unsigned overloads instead. | Warning |
| SYSLIB0056 | `Assembly.LoadFrom` with a custom `AssemblyHashAlgorithm` is obsolete. Use overloads without an `AssemblyHashAlgorithm`. | Warning |
| SYSLIB0057 | `X509Certificate2` and `X509Certificate` constructors for binary and file content are obsolete. | Warning |

## Version introduced

.NET 9

## Type of breaking change

These obsoletions can affect source compatibility.

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.

- Warnings or errors for these obsoletions can't be suppressed using the standard diagnostic ID for obsolete types or members; use the custom `SYSLIBxxxx` diagnostic ID value instead.

## Affected APIs

### SYSLIB0009

- `System.Net.AuthenticationManager`

### SYSLIB0014

- `System.Net.ServicePointManager`

### SYSLIB0054

- `System.Threading.Thread.VolatileRead*`
- `System.Threading.Thread.VolatileWrite*`

### SYSLIB0055

- `System.Runtime.Intrinsics.Arm.AdvSimd.Arm64.ShiftRightLogicalRoundedNarrowingSaturateScalar(System.Runtime.Intrinsics.Vector64{System.Int64},System.Byte)`
- `System.Runtime.Intrinsics.Arm.AdvSimd.Arm64.ShiftRightLogicalRoundedNarrowingSaturateScalar(System.Runtime.Intrinsics.Vector64{System.Int16},System.Byte)`
- `System.Runtime.Intrinsics.Arm.AdvSimd.Arm64.ShiftRightLogicalRoundedNarrowingSaturateScalar(System.Runtime.Intrinsics.Vector64{System.Int32},System.Byte)`
- `System.Runtime.Intrinsics.Arm.AdvSimd.ShiftRightLogicalRoundedNarrowingSaturateLower(System.Runtime.Intrinsics.Vector128{System.Int16},System.Byte)`
- `System.Runtime.Intrinsics.Arm.AdvSimd.ShiftRightLogicalRoundedNarrowingSaturateLower(System.Runtime.Intrinsics.Vector128{System.Int64},System.Byte)`
- `System.Runtime.Intrinsics.Arm.AdvSimd.ShiftRightLogicalRoundedNarrowingSaturateLower(System.Runtime.Intrinsics.Vector128{System.Int32},System.Byte)`
- `System.Runtime.Intrinsics.Arm.AdvSimd.ShiftRightLogicalRoundedNarrowingSaturateUpper(System.Runtime.Intrinsics.Vector64{System.SByte},System.Runtime.Intrinsics.Vector128{System.Int16},System.Byte)`
- `System.Runtime.Intrinsics.Arm.AdvSimd.ShiftRightLogicalRoundedNarrowingSaturateUpper(System.Runtime.Intrinsics.Vector64{System.Int16},System.Runtime.Intrinsics.Vector128{System.Int32},System.Byte)`
- `System.Runtime.Intrinsics.Arm.AdvSimd.ShiftRightLogicalRoundedNarrowingSaturateUpper(System.Runtime.Intrinsics.Vector64{System.Int32},System.Runtime.Intrinsics.Vector128{System.Int64},System.Byte)`

### SYSLIB0056

- `System.Reflection.Assembly.LoadFrom(System.String,System.Byte[],System.Configuration.Assemblies.AssemblyHashAlgorithm)`

### SYSLIB0057

- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.Byte[])`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.ReadOnlySpan{System.Byte})`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.String)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.Byte[],System.Security.SecureString)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.Byte[],System.String)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.String,System.Security.SecureString)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.String,System.String)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.Byte[],System.Security.SecureString,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.Byte[],System.String,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.ReadOnlySpan{System.Byte},System.ReadOnlySpan{System.Char},System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.String,System.ReadOnlySpan{System.Char},System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.String,System.Security.SecureString,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.String,System.String,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.Byte[])`
- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.String)`
- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.Byte[],System.Security.SecureString)`
- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.Byte[],System.String)`
- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.String,System.String,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.String,System.Security.SecureString)`
- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.String,System.String)`
- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.Byte[],System.Security.SecureString,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.Byte[],System.String,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.String,System.Security.SecureString,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.String,System.String,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2Collection.Import(System.Byte[])`
- `System.Security.Cryptography.X509Certificates.X509Certificate2Collection.Import(System.ReadOnlySpan{System.Byte})`
- `System.Security.Cryptography.X509Certificates.X509Certificate2Collection.Import(System.ReadOnlySpan{System.Byte})`
- `System.Security.Cryptography.X509Certificates.X509Certificate2Collection.Import(System.Byte[],System.String,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2Collection.Import(System.ReadOnlySpan{System.Byte},System.ReadOnlySpan{System.Char},System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2Collection.Import(System.ReadOnlySpan{System.Byte},System.String,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2Collection.Import(System.String,System.ReadOnlySpan{System.Char},System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate2Collection.Import(System.String,System.String,System.Security.Cryptography.X509Certificates.X509KeyStorageFlags)`
- `System.Security.Cryptography.X509Certificates.X509Certificate.CreateFromSignedFile(System.String)`

## See also

- API obsoletions with non-default diagnostic IDs (.NET 10)
- API obsoletions with non-default diagnostic IDs (.NET 8)
- API obsoletions with non-default diagnostic IDs (.NET 7)
- API obsoletions with non-default diagnostic IDs (.NET 6)
- API obsoletions with non-default diagnostic IDs (.NET 5)
- Obsolete features in .NET 5+
