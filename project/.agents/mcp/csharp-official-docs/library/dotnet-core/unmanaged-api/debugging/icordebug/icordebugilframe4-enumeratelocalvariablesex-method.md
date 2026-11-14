---
title: "ICorDebugILFrame4::EnumerateLocalVariablesEx Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe4-enumeratelocalvariablesex-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILFrame4::EnumerateLocalVariablesEx Method

Gets an enumerator for the local variable in the frame, and optionally includes variables added in profiler ReJIT instrumentation.

## Syntax

```cpp
HRESULT EnumerateLocalVariablesEx(
   [in] ILCodeKind flags,
   [out] ICorDebugValueEnum **ppValueEnum
);
```

## Parameters

 `flags`
 [in] An ILCodeKind enumeration member that specifies whether variables added in profiler ReJIT instrumentation are included in the frame.

 `ppValueEnum`
 [out] A pointer to the address of an "ICorDebugValueEnum" object that is the enumerator for the local variables in this frame.

## Remarks

This method is similar to the EnumerateLocalVariables method, except that it optionally accesses variables added in profiler ReJIT instrumentation. Setting `flags` to `ILCODE_ORIGINAL_IL` is equivalent to calling ICorDebugILFrame::EnumerateLocalVariables. Setting `flags` to `ILCODE_REJIT_IL` allows the debugger to access the local variables added in profiler ReJIT instrumentation. If the intermediate language (IL) is not instrumented, the enumeration is empty and the method returns `S_OK`.

The enumerator may not include all of the local variables in the running method, since some of them may not be active.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ICorDebugILFrame4 Interface
- ReJIT: A How-To Guide
