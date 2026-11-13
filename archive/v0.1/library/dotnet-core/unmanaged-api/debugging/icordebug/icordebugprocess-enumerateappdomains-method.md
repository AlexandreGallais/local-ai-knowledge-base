---
title: "ICorDebugProcess::EnumerateAppDomains Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-enumerateappdomains-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
