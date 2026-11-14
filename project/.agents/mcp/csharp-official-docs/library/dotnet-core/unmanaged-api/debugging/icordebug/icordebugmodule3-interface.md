---
title: "ICorDebugModule3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule3-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule3 Interface

Creates a symbol reader for a dynamic module.

## Syntax

```cpp
interface ICorDebugModule3 : IUnknown
{
    HRESULT CreateReaderForInMemorySymbols
      (
      [in] REFIID riid,
      [out][iid_is(riid)] void **  ppObj
      );
};
```

## Methods

| Method | Description |
|--------|-------------|
|ICorDebugModule3::CreateReaderForInMemorySymbols Method|Creates a symbol reader (typically ISymUnmanagedReader Interface) for a dynamic module.|

## Remarks

This interface logically extends the "ICorDebugModule" and "ICorDebugModule2" interfaces.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** 4.5, 4, 3.5 SP1

## See also

- ICorDebugRemoteTarget Interface
- ICorDebug Interface
