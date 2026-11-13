---
title: "ICorDebugThread::GetObject Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-getobject-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugThread::GetObject Method

Gets an interface pointer to the common language runtime (CLR) thread.

## Syntax

```cpp
HRESULT GetObject (
    [out] ICorDebugValue   **ppObject
);
```

## Parameters

 `ppObject`
 [out] A pointer to the address of an ICorDebugValue interface object that represents the CLR thread.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- `System.Threading.Thread`
