---
title: "CodeChunkInfo Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/codechunkinfo-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CodeChunkInfo Structure

Represents a single chunk of code in memory.

## Syntax

```cpp
typedef struct _CodeChunkInfo {
    CORDB_ADDRESS startAddr;
    ULONG32       length;
} CodeChunkInfo;
```

## Members

| Member      | Description                                                               |
|-------------|---------------------------------------------------------------------------|
| `startAddr` | A `CORDB_ADDRESS` value that specifies the starting address of the chunk. |
| `length`    | The size, in bytes, of the chunk.                                         |

## Remarks

 The single chunk of code is a region of native code that is part of a code object such as a function.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- GetCodeChunks Method
