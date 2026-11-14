---
title: "Breaking change: OpenSSL cryptographic primitives not supported on macOS"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/10.0/openssl-macos-unsupported.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# OpenSSL cryptographic primitives not supported on macOS

Starting in .NET 10, OpenSSL-backed cryptographic primitives are no longer supported on macOS. `System.Security.Cryptography.AesCcm` and classes that are specific to OpenSSL, such as `System.Security.Cryptography.RSAOpenSsl`, now throw a `System.PlatformNotSupportedException` on macOS.

## Version introduced

.NET 10

## Previous behavior

Previously, classes that are specific to OpenSSL, such as `System.Security.Cryptography.RSAOpenSsl`, worked on macOS if OpenSSL was available.

`System.Security.Cryptography.AesCcm` worked on macOS if OpenSSL was available.

## New behavior

Starting in .NET 10, classes that are specific to OpenSSL, such as `System.Security.Cryptography.RSAOpenSsl`, don't work on macOS even if OpenSSL is available, and a `System.PlatformNotSupportedException` exception is thrown.

`System.Security.Cryptography.AesCcm` throws a `System.PlatformNotSupportedException` exception.

## Type of breaking change

This is a behavioral change.

## Reason for change

Support for the OpenSSL-backed primitives originated from .NET Core 1.0, where cryptography on macOS was implemented with OpenSSL. This wasn't ideal because a recent version of OpenSSL doesn't come on macOS, and acquiring and configuring OpenSSL on macOS was troublesome. In the .NET Core 2.0 timeframe, cryptography was moved to Apple's built-in functionality, so cryptographic functionality "just worked" without needing to acquire any additional components.

The types that are suffixed as `OpenSsl` were left as being implemented by OpenSSL, and `System.Security.Cryptography.AesCcm` doesn't have an implementation in Apple's cryptographic libraries.

Supporting these OpenSSL-backed primitives on macOS has become more difficult as Apple has made it more difficult to load libraries from certain paths, and it complicates distributing software on macOS.

## Recommended action

If you're using OpenSSL-backed primitives without any specific intention of using OpenSSL, the recommendation is to use the factories that provide a macOS implementation:

* `new DSAOpenSsl(...)` -> `DSA.Create(...)`
* `new ECDiffieHellmanOpenSsl(...)` -> `ECDiffieHellman.Create(...)`
* `new ECDsaOpenSsl(...)` -> `ECDsa.Create(...)`
* `new RSAOpenSsl(...)` -> `RSA.Create(...)`

`System.Security.Cryptography.AesCcm` has no functional equivalent on macOS. Consider using a different cryptographic primitive, such as `System.Security.Cryptography.AesGcm`, instead.

## Affected APIs

* `System.Security.Cryptography.AesCcm` (all constructors)
* `System.Security.Cryptography.DSAOpenSsl` (all constructors)
* `System.Security.Cryptography.ECDiffieHellmanOpenSsl` (all constructors)
* `System.Security.Cryptography.ECDsaOpenSsl` (all constructors)
* `System.Security.Cryptography.RSAOpenSsl` (all constructors)
* `System.Security.Cryptography.SafeEvpPKeyHandle` (entire class)
