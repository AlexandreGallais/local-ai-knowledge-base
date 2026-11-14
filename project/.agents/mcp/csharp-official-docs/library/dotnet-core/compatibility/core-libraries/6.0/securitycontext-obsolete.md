---
title: "Breaking change: System.Security.SecurityContext is marked obsolete"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/6.0/securitycontext-obsolete.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.Security.SecurityContext is marked obsolete

`System.Security.SecurityContext` is marked obsolete *with a custom diagnostic ID*. Using any `SecurityContext` APIs generates warning `SYSLIB0003` at compile time.

> **Note:**
> Suppressing the default obsoletion diagnostic ID, which is CS0618 for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Old behavior

Prior to .NET 6, the `System.Security.SecurityContext` type was not marked obsolete, however, all of its public members throw a `System.PlatformNotSupportedException` at runtime.

## New behavior

Starting in .NET 6, the `System.Security.SecurityContext` is marked obsolete.

## Version introduced

.NET 6 RC 1

## Type of breaking change

This change can affect source compatibility.

## Reason for change

All of the public members of `System.Security.SecurityContext` throw a `System.PlatformNotSupportedException` at runtime. The `System.Security.SecurityContext` is part of Code access security (CAS), which is an unsupported legacy technology.

## Recommended action

Remove any use of these APIs from your code.

## Affected APIs

- `System.Security.SecurityContext`

## See also

- Most code access security APIs are obsolete
