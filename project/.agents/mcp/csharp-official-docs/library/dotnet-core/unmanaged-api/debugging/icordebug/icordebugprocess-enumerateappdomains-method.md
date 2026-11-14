---
title: "ICorDebugProcess::EnumerateAppDomains Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-enumerateappdomains-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess::EnumerateAppDomains Method

Enumerates all the application domains in this process.

## Syntax

```cpp
HRESULT EnumerateAppDomains(
    [out] ICorDebugAppDomainEnum **ppAppDomains);
```

## Parameters

 `ppAppDomains`
 [out] A pointer to the address of an ICorDebugAppDomainEnum that is an enumerator for the application domains in this process.

## Remarks

This method can be used before the ICorDebugManagedCallback::CreateProcess callback.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
