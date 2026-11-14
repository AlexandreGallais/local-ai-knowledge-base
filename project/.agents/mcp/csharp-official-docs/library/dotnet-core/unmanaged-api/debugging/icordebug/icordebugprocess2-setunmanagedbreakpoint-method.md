---
title: "ICorDebugProcess2::SetUnmanagedBreakpoint Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess2-setunmanagedbreakpoint-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess2::SetUnmanagedBreakpoint Method

Sets an unmanaged breakpoint at the specified native image offset.

## Syntax

```cpp
HRESULT SetUnmanagedBreakpoint (
    [in]  CORDB_ADDRESS    address,
    [in]  ULONG32          bufsize,
    [out, size_is(bufsize), length_is(*bufLen)]
        BYTE               buffer[],
    [out] ULONG32          *bufLen
);
```

## Parameters

 `address`
 [in] A `CORDB_ADDRESS` object that specifies the native image offset.

 `bufsize`
 [in] The size, in bytes, of the `buffer` array.

 `buffer`
 [out] An array that contains the opcode that is replaced by the breakpoint.

 `bufLen`
 [out] A pointer to the number of bytes returned in the `buffer` array.

## Remarks

If the native image offset is within the common language runtime (CLR), the breakpoint will be ignored. This allows the CLR to avoid dispatching an out-of-band breakpoint, when the breakpoint is set by the debugger.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
