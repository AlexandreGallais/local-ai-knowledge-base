---
title: "ICorDebugProcess::WriteMemory Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-writememory-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess::WriteMemory Method

Writes data to an area of memory in this process.

## Syntax

```cpp
HRESULT WriteMemory(
    [in]  CORDB_ADDRESS address,
    [in]  DWORD size,
    [in, size_is(size)] BYTE buffer[],
    [out] SIZE_T *written);
```

## Parameters

 `address`
 [in] A `CORDB_ADDRESS` value that is the base address of the memory area to which data is written. Before data transfer occurs, the system verifies that the memory area of the specified size, beginning at the base address, is accessible for writing. If it is not accessible, the method fails.

 `size`
 [in] The number of bytes to be written to the memory area.

 `buffer`
 [in] A buffer that contains data to be written.

 `written`
 [out] A pointer to a variable that receives the number of bytes written to the memory area in this process. If `written` is NULL, this parameter is ignored.

## Remarks

Data is automatically written behind any breakpoints. Native debuggers should not use this method to inject breakpoints into the instruction stream. Use ICorDebugProcess2::SetUnmanagedBreakpoint instead.

The `WriteMemory` method should be used only outside of managed code. This method can corrupt the runtime if used improperly.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
