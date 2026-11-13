---
title: "ICorDebugExceptionObjectCallStackEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugexceptionobjectcallstackenum-next-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugExceptionObjectCallStackEnum::Next Method

Gets the specified number of CorDebugExceptionObjectStackFrame instances that contain information from an exception object's call stack.

## Syntax

```cpp
HRESULT Next(
    [in] ULONG celt,
    [out, size_is(celt), length_is(*pceltFetched)] CorDebugExceptionObjectStackFrame values[],
    [out] ULONG *pceltFetched
);
```

## Parameters

 `celt`
 [in] The number of CorDebugExceptionObjectStackFrame instances to be retrieved.

 `values`
 [out] An array of pointers, each of which points to a CorDebugExceptionObjectStackFrame object.

 `pceltFetched`
 [out] A pointer to the number of CorDebugExceptionObjectStackFrame instances actually returned.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugExceptionObjectCallStackEnum Interface
