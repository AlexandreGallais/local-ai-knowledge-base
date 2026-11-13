---
title: "ICorDebugILCode2::GetInstrumentedILMap Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugilcode2-getinstrumentedilmap-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugILCode2::GetInstrumentedILMap Method

Returns a map from profiler-instrumented intermediate language (IL) offsets to original method IL offsets for this instance.

## Syntax

```cpp
HRESULT GetInstrumentedILMap(
   [in] ULONG32 cMap,
   [out] ULONG32 *pcMap,
   [out, size_is(cMap), length_is(*pcMap)] COR_IL_MAP map[]
);
```

## Parameters

cMap
 [in] The storage capacity of the `map` array. See the Remarks section for more information.

pcMap
 [out] The number of COR_IL_MAP values written to the map array.

map
 [out] An array of COR_IL_MAP values that provide information on mappings from profiler-instrumented IL to the IL of the original method.

## Remarks

If the profiler sets the mapping by calling the ICorProfilerInfo::SetILInstrumentedCodeMap method, the debugger can call this method to retrieve the mapping and to use the mapping internally when calculating IL offsets for stack traces and variable lifetimes.

If `cMap` is 0 and `pcMap` is non-**null**, `pcMap` is set to the number of available COR_IL_MAP values. If `cMap` is non-zero, it represents the storage capacity of the `map` array. When the method returns, `map` contains a maximum of `cMap` items, and `pcMap` is set to the number of COR_IL_MAP values actually written to the `map` array.

If the IL hasn't been instrumented or the mapping wasn't provided by a profiler, this method returns `S_OK` and sets `pcMap` to 0.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ICorProfilerInfo::SetILInstrumentedCodeMap
- ICorDebugILCode2 Interface
