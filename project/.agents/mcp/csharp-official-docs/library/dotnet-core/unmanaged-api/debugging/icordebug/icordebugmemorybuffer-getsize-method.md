---
title: "ICorDebugMemoryBuffer::GetSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmemorybuffer-getsize-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugMemoryBuffer::GetSize Method

Gets the size of the memory buffer in bytes.

## Syntax

```cpp
HRESULT GetSize(
   [out] ULONG32 *pcbBufferLength
);
```

## Parameters

 `pcbBufferLength`
 [out] A pointer to the size of the memory buffer.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugMemoryBuffer Interface
