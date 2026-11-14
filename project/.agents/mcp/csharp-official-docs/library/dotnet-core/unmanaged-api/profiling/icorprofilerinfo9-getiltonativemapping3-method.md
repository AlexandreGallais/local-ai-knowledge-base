---
title: "ICorProfilerInfo9::GetILToNativeMapping3"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo9-getiltonativemapping3-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo9::GetILToNativeMapping3 method

Given the native code start address, returns the native to IL mapping information for this jitted version of the code.

## Syntax

```cpp
HRESULT GetILToNativeMapping3( [in]  UINT_PTR pNativeCodeStartAddress,
                               [in]  ULONG32 cMap,
                               [out] ULONG32 *pcMap,
                               [out] COR_DEBUG_IL_TO_NATIVE_MAP map[]);
```

## Parameters

`pNativeCodeStartAddress`\
[in] A pointer to the start of a native function.

`cMap`\
[in] The maximum size of the `map` array.

`pcMap`\
[out] The total number of available COR_DEBUG_IL_TO_NATIVE_MAP structures.

`map`\
[out] An array of COR_DEBUG_IL_TO_NATIVE_MAP structures, each of which specifies the offsets. After the `GetILToNativeMapping3` method returns, `map` will contain some or all of the `COR_DEBUG_IL_TO_NATIVE_MAP` structures.

## Remarks

When tiered compilation is enabled, a method may have more than one native code body. ICorProfilerInfo9::GetNativeCodeStartAddresses will return the start addresses for all of the native code bodies.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**Library:** CorGuids.lib

**.NET versions:** Available since .NET Core 2.1

## See also

- ICorProfilerInfo9 Interface
