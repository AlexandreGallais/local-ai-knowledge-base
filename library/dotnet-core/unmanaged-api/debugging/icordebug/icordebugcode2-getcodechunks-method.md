---
title: "ICorDebugCode2::GetCodeChunks Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcode2-getcodechunks-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugCode2::GetCodeChunks Method

Gets the chunks of code that this code object is composed of.

## Syntax

```cpp
HRESULT GetCodeChunks (
    [in]  ULONG32     cbufSize,
    [out] ULONG32     *pcnumChunks,
    [out, size_is(cbufSize), length_is(*pcnumChunks)]
        CodeChunkInfo chunks[]
);
```

## Parameters

`cbufSize`
[in] Size of the `chunks` array.

`pcnumChunks`
[out] The number of chunks returned in the `chunks` array.

`chunks`
[out] An array of "CodeChunkInfo" structures, each of which represents a single chunk of code. If the value of `cbufSize` is 0, this parameter can be null.

## Remarks

The code chunks will never overlap, and they will follow the order in which they would have been concatenated by ICorDebugCode::GetCode. A common intermediate language (CIL) code object comprises a single code chunk.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorDebug.idl, CorDebug.h

**Library:** CorGuids.lib

**.NET versions:** Available since .NET Framework 2.0
