---
title: "Breaking change: Strong-name APIs throw PlatformNotSupportedException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/6.0/strong-name-signing-exceptions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Strong-name APIs throw PlatformNotSupportedException

A few APIs that aren't supported in .NET/.NET Core but didn't do anything when accessed have been changed to now throw a `System.PlatformNotSupportedException` at runtime. Previously, using these APIs would eventually result in a runtime exception further along; the exception is now thrown when the type is instantiated or first accessed.

## Previous behavior

In previous versions, calling `System.Reflection.AssemblyName.KeyPair` or `System.Reflection.StrongNameKeyPair.#ctor(System.Byte[])` was a no-op. Calling `System.Reflection.StrongNameKeyPair.#ctor(System.IO.FileStream)` read the stream but otherwise did nothing.

## New behavior

Starting in .NET 6, each of the three affected APIs throws a `System.PlatformNotSupportedException` at runtime.

## Version introduced

.NET 6

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

Previously, an application that called the API compiled and ran, but as soon as the instance was used in any code path, it threw a runtime exception. To make it more explicit that this scenario is unsupported, the exception-throwing logic was moved into the instance constructor. In case no instances are created, the exception is also thrown in public entry points that return this type, that is, `System.Reflection.AssemblyName.KeyPair`.

## Recommended action

Strong-name signing is not supported in .NET/.NET Core, and there is no workaround.

> **Note:**
> .NET Core/5+ never checks signatures in its runtime. However, if you're targeting cross-platform libraries (for example, a basic auth package that targets .NET Standard 2.0, so it runs on .NET Framework too), then strong-naming is a good idea for cross-runtime compatibility. .NET Framework continues to enforce strong naming if the calling app is strong-named. You can strong-name assemblies in all versions of .NET using the Sn.exe tool. For more information, see Strong name signing.

## Affected APIs

- `System.Reflection.StrongNameKeyPair.#ctor(System.IO.FileStream)`
- `System.Reflection.StrongNameKeyPair.#ctor(System.Byte[])`
- `System.Reflection.AssemblyName.KeyPair`

## See also

- How to: Sign an assembly with a strong name
