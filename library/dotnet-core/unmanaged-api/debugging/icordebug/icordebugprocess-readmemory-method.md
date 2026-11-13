---
title: "ICorDebugProcess::ReadMemory Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-readmemory-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess::ReadMemory Method

Reads a specified area of memory for this process.

## Syntax

```cpp
HRESULT ReadMemory(
    [in]  CORDB_ADDRESS address,
    [in]  DWORD size,
    [out, size_is(size), length_is(size)] BYTE buffer[],
    [out] SIZE_T *read);
```

## Parameters

 `address`
 [in] A `CORDB_ADDRESS` value that specifies the base address of the memory to be read.

 `size`
 [in] The number of bytes to be read from memory.

 `buffer`
 [out] A buffer that receives the contents of the memory.

 `read`
 [out] A pointer to the number of bytes transferred into the specified buffer.

## Remarks

The `ReadMemory` method is primarily intended to be used by interop debugging to inspect memory regions that are being used by the unmanaged portion of the debuggee. This method can also be used to read common intermediate language (CIL) code and native JIT-compiled code.

Any managed breakpoints will be removed from the data that is returned in the `buffer` parameter. No adjustments will be made for native breakpoints set by ICorDebugProcess2::SetUnmanagedBreakpoint.

No caching of process memory is performed.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
