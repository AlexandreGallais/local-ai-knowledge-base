---
title: "ICorDebugMemoryBuffer::GetSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmemorybuffer-getsize-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
