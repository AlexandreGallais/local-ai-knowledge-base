---
title: "ICorDebugModule4 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule4-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModule4 Interface

Provides a method that determines whether the module is loaded into memory in mapped/hydrated format.

## Syntax

```cpp
interface ICorDebugModule4 : IUnknown
{
     HRESULT IsMappedLayout(
     [out] BOOL *pIsMapped
     );
};
```

## Methods

|Method|Description|
|------------|-----------------|
|ICorDebugModule4::IsMappedLayout Method|Queries to see if the module is loaded into memory in mapped/hydrated format.|

## Remarks

This interface logically extends the 'ICorDebugModule', 'ICorDebugModule2', and 'ICoreDebugModule3' interfaces.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET Versions:** Available since .NET 5.0

## See also

- ICorDebugRemoteTarget Interface
- ICorDebug Interface
