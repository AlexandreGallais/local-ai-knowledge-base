---
title: "ICorDebugILFrame4::GetCodeEx Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe4-getcodeex-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILFrame4::GetCodeEx Method

Gets a pointer to the code that this stack frame is executing.

## Syntax

```cpp
HRESULT GetCodeEx(
   [in] ILCodeKind flags,
   [out] ICorDebugCode **ppCode
);
```

## Parameters

 `flags`
 [in] An ILCodeKind enumeration member that specifies whether the intermediate language (IL) defined by the profiler's ReJIT request is included in the frame.

 `ppCode`
 [out] A pointer to the address of an "ICorDebugCode" object that represents the code that this stack frame is executing.

## Remarks

This method is similar to the ICorDebugFrame::GetCode method, except that it optionally accesses code defined by the profiler's ReJIT request. Calling this method with a `flags` value of `ILCODE_ORIGINAL_IL` is equivalent to calling GetCode; if the method is instrumented, its IL will not be accessible. `ILCODE_REJIT_IL` allows the debugger to access the IL defined by the profiler's ReJIT request. If the IL is not instrumented, `ppCode` is **null**, and the method returns `S_OK`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ICorDebugILFrame4 Interface
- ReJIT: A How-To Guide
