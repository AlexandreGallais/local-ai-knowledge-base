---
title: "ICorDebugFunction3::GetActiveReJitRequestILCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction3-getactiverejitrequestilcode-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFunction3::GetActiveReJitRequestILCode Method

Gets an interface pointer to an ICorDebugILCode that contains the IL from an active ReJIT request.

## Syntax

```cpp
HRESULT GetActiveReJitRequestILCode(
   ICorDebugILCode **ppReJitedILCode
);
```

## Parameters

`ppReJitedILCode`\
A pointer to the IL from an active ReJIT request.

## Remarks

If the method represented by this `ICorDebugFunction3` object has an active ReJIT request, `ppReJitedILCode` returns a pointer to its IL. If there is no active request, which is a common case, then `ppReJitedILCode` is **null**.

A ReJIT request becomes active just after execution returns from the ICorProfilerCallback4::GetReJITParameters method call. It may not yet be JIT-compiled, and threads may still be executing in the original version of the code. A ReJIT request becomes inactive during the profiler's call to the ICorProfilerInfo4::RequestRevert method. Even after the IL is reverted, a thread can still be executing in the JIT-recompiled (ReJIT) code.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ICorDebugFunction3 Interface
- ReJIT: A How-To Guide
