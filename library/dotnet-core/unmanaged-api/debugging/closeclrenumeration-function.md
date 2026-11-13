---
title: "CloseCLREnumeration Function"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/closeclrenumeration-function.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CloseCLREnumeration function

Closes any valid common language runtime (CLR) continue-startup events located in an array of handles returned by the EnumerateCLRs function, and frees the memory for the handle and string path arrays.

## Syntax

```cpp
HRESULT CloseCLREnumeration (
    [in]  DWORD      pHandleArray,
    [in]  LPWSTR**   pStringArray,
    [in]  DWORD*     dwArrayLength
);
```

## Parameters

 `pHandleArray`\
 [in] Pointer to the array of event handles returned from the EnumerateCLRs function.

 `pStringArray`\
 [in] Pointer to the array of CLR string paths returned from the EnumerateCLRs function.

 `dwArrayLength`\
 [in] DWORD that contains the size (length) of either `pHandleArray` or `pStringArray` (they are the same).

## Return value

 `S_OK`\
 Handles opened by the EnumerateCLRs function are closed, and memory allocated for the handle and string arrays is freed.

 `E_INVALIDARG`\
 The length of `pHandleArray` does not match the length that is passed in `dwArrayLength`.

 `E_FAIL` (or other `E_` return codes)\
 The function is unable to free the memory for `pHandleArray` and `pStringArray`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET Core 2.1
