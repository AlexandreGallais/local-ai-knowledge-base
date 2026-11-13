---
title: "ICorDebugCode::GetCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcode-getcode-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugCode::GetCode Method

Gets all the code for the specified function, formatted for disassembly. This method is deprecated. Use ICorDebugCode2::GetCodeChunks instead.

## Syntax

```cpp
HRESULT GetCode (
    [in] ULONG32     startOffset,
    [in] ULONG32     endOffset,
    [in] ULONG32     cBufferAlloc,
    [out, size_is(cBufferAlloc),
        length_is(*pcBufferSize)] BYTE buffer[],
    [out] ULONG32    *pcBufferSize
);
```

## Parameters

 `startOffset`
 [in] The offset of the beginning of the function.

 `endOffset`
 [in] The offset of the end of the function.

 `cBufferAlloc`
 [in] The size of the `buffer` array into which the code will be returned.

 `buffer`
 [out] The array into which the code will be returned.

 `pcBufferSize`
 [out] The number of bytes returned.

## Remarks

If the function's code has been divided into multiple chunks, they are concatenated in order of increasing native offset. Instruction boundaries are not checked.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** 1.1, 1.0

## See also

- GetCodeChunks Method
