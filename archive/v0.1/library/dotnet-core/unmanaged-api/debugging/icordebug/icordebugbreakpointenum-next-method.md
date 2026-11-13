---
title: "ICorDebugBreakpointEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugbreakpointenum-next-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugBreakpointEnum::Next Method

Gets the specified number of ICorDebugBreakpoint instances from the enumeration, starting at the current position.

## Syntax

```cpp
HRESULT Next (
    [in] ULONG  celt,
    [out, size_is(celt), length_is(*pceltFetched)]
        ICorDebugBreakpoint *breakpoints[],
    [out] ULONG *pceltFetched
);
```

## Parameters

 `celt`
 [in] The number of `ICorDebugBreakpoint` instances to be retrieved.

 `breakpoints`
 [out] An array of pointers, each of which points to an `ICorDebugBreakpoint` object that represents a breakpoint.

 `pceltFetched`
 [out] A pointer to the number of `ICorDebugBreakpoint` instances actually returned. This value may be null if `celt` is one.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
