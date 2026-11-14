---
title: "ICorDebugILFrame4::GetLocalVariableEx Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe4-getlocalvariableex-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILFrame4::GetLocalVariableEx Method

Gets the value of the specified local variable in this intermediate language (IL) stack frame, and optionally accesses a variable added in profiler ReJIT instrumentation.

## Syntax

```cpp
HRESULT GetLocalVariableEx(
   [in] ILCodeKind flags,
   [in] DWORD dwIndex,
   [out] ICorDebugValue **ppValue
);
```

## Parameters

 `flags`
 [in] An ILCodeKind enumeration member that specifies whether a variable added in profiler ReJIT instrumentation is included in the frame.

 `dwIndex`
 [in] The index of the local variable in the IL stack frame.

 `ppValue`
 [out] A pointer to the address of an "ICorDebugValue" object that represents the retrieved value.

## Remarks

This method is similar to the GetLocalVariable method, except that it optionally accesses a variable added in profiler ReJIT instrumentation. Calling this method with a `flags` value of `ILCODE_ORIGINAL_IL` is equivalent to calling GetLocalVariable; if the method is instrumented with additional local variables, those variables cannot be accessed. `ILCODE_REJIT_IL` allows the debugger to access the local variables added in profiler ReJIT instrumentation. If the IL is not instrumented, the method returns `E_INVALIDARG`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ICorDebugILFrame4 Interface
- ReJIT: A How-To Guide
