---
title: "Breaking change: SafeEvpPKeyHandle.DuplicateHandle up-refs the handle"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/9.0/evp-pkey-handle.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# SafeEvpPKeyHandle.DuplicateHandle up-refs the handle

Along with work to enable OpenSSL providers support, a change was made to the `System.Security.Cryptography.SafeEvpPKeyHandle.DuplicateHandle` method that impacts the `System.Security.Cryptography.ECDsaOpenSsl` and `System.Security.Cryptography.RSAOpenSsl` constructors that take a `System.Security.Cryptography.SafeEvpPKeyHandle`. External modifications of the passed handle now also affect the handle stored in instances of those classes.

## Previous behavior

`System.Security.Cryptography.SafeEvpPKeyHandle.DuplicateHandle` created a new `EVP_PKEY` instance. Modifications to the duplicated key (that is, through direct calls to OpenSSL APIs) did not impact the original key. `SafeEvpPKeyHandle.DuplicateHandle` was called by the constructors of `System.Security.Cryptography.ECDsaOpenSsl` and `System.Security.Cryptography.RSAOpenSsl` that take a `System.Security.Cryptography.SafeEvpPKeyHandle`.

## New behavior

`System.Security.Cryptography.SafeEvpPKeyHandle.DuplicateHandle` increments the reference count of the existing `EVP_PKEY` and returns a handle to the same key. That means external calls to OpenSSL APIs that modify `EVP_PKEY` now also affect instances of the duplicated `System.Security.Cryptography.SafeEvpPKeyHandle`. Those APIs include `System.Security.Cryptography.ECDsaOpenSsl` and `System.Security.Cryptography.RSAOpenSsl` instances created from such handles.

## Version introduced

.NET 9 Preview 7

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made to enable OpenSSL providers support. As a side effect, there are also some performance improvements.

## Recommended action

Avoid modifications of `EVP_PKEY` passed in to .NET APIs. If you can't avoid modifications to `EVP_PKEY`, create a copy of `EVP_PKEY` yourself (that is, copy parameters into the new `EVP_PKEY` instance).

## Affected APIs

- `System.Security.Cryptography.SafeEvpPKeyHandle.DuplicateHandle`
- `System.Security.Cryptography.ECDsaOpenSsl.#ctor(System.Security.Cryptography.SafeEvpPKeyHandle)`
- `System.Security.Cryptography.RSAOpenSsl.#ctor(System.Security.Cryptography.SafeEvpPKeyHandle)`

Every API that accepts an <Xref:System.Security.Cryptography.RSA> or <Xref:System.Security.Cryptography.ECDsa> instance that originates from `System.Security.Cryptography.SafeEvpPKeyHandle` is also affected.
