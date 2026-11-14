---
title: "Exceptions Interoperability"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/exceptions-interoperability.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Working with Interop Exceptions in Unmanaged Code

Unmanaged code exception interop is supported on Windows platforms only. Portability issues arise on non-Windows platforms. Since the Unix ABI has no definition for exception handling, managed code can't know how exception mechanisms work under the covers. Therefore, exceptions can end up resulting in unpredictable behaviors and crashes.

## Setjmp/Longjmp Behaviors

Interop with `setjmp` and `longjmp` C functions is not supported. You can't use `longjmp` to skip over managed frames.

For more information, see longjmp documentation.

## See also

- Exceptions
- Interop with Native Libraries
