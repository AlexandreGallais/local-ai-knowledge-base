---
title: "EnumerateCLRs Function"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/enumerateclrs-function.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# EnumerateCLRs function

Provides a mechanism for enumerating the CLRs in a process.

## Syntax

```cpp
HRESULT EnumerateCLRs (
    [in]  DWORD      debuggeePID,
    [out] HANDLE**   ppHandleArrayOut,
    [out] LPWSTR**   ppStringArrayOut,
    [out] DWORD*     pdwArrayLengthOut
);
```

## Parameters

 `debuggeePID`\
 [in] Process identifier of the process from which loaded CLRs will be enumerated.

 `ppHandleArrayOut`\
 [out] Pointer to an array containing event handles that are used to continue a CLR startup. Each handle in the array is not guaranteed to be valid. If valid, the handle is to be used as the continue-startup event for the corresponding runtime located in the same index of `ppStringArrayOut`.

 `ppStringArrayOut`\
 [out] Pointer to an array of strings that specify full paths to CLRs loaded in the process.

 `pdwArrayLengthOut`\
 [out] Pointer to a DWORD that contains the length of the equally sized `ppHandleArrayOut` and `pdwArrayLengthOut`.

## Return value

 `S_OK`\
 The number of CLRs in the process was successfully determined, and the corresponding handle and path arrays were properly filled.

 `E_INVALIDARG`\
 Either `ppHandleArrayOut` or `ppStringArrayOut` is null, or `pdwArrayLengthOut` is null.

 `E_OUTOFMEMORY`\
 The function is unable to allocate enough memory for the handle and path arrays.

 `E_FAIL` (or other `E_` return codes)\
 Unable to enumerate loaded CLRs.

## Remarks

 For a target process that is identified by `debuggeePID`, the function returns an array of paths, `ppStringArrayOut`, to CLRs loaded in the process; an array of event handles, `ppHandleArrayOut`, which may contain a continue-startup event for the CLR at the same index; and the size of the arrays, `pdwArrayLengthOut`, which specifies the number of CLRs that are loaded.

 On the Windows operating system, `debuggeePID` maps to an OS process identifier.

 The memory for `ppHandleArrayOut` and `ppStringArrayOut` are allocated by this function. To free the memory allocated, you must call CloseCLREnumeration Function.

 This function can be called with both array parameters set to null in order to return the count of CLRs in the target process. From this count, a caller can infer the size of the buffer that will be created: `(sizeof(HANDLE) * count) + (sizeof(LPWSTR) * count) + (sizeof(WCHAR*) * count * MAX_PATH)`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET Core 2.1
