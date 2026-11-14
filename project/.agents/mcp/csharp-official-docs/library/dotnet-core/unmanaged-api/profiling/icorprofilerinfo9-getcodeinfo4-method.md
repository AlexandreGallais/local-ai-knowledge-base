---
title: "ICorProfilerInfo9::GetCodeInfo4"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo9-getcodeinfo4-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo9::GetCodeInfo4 method

Given the native code start address, returns the blocks of virtual memory that store this code.

## Syntax

```cpp
HRESULT GetCodeInfo4( [in]  UINT_PTR pNativeCodeStartAddress,
                      [in]  ULONG32 cCodeInfos,
                      [out] ULONG32* pcCodeInfos,
                      [out] COR_PRF_CODE_INFO codeInfos[]);
```

## Parameters

`pNativeCodeStartAddress`\
[in] A pointer to the start of a native function.

`cCodeInfos`\
[in] The size of the `codeInfos` array.

`pcCodeInfos`\
[out] A pointer to the total number of COR_PRF_CODE_INFO structures available.

`codeInfos`\
[out] A caller-provided buffer. After the method returns, it contains an array of `COR_PRF_CODE_INFO` structures, each of which describes a block of native code.

## Remarks

The `GetCodeInfo4` method is similar to GetCodeInfo3, except that it can look up code information for different native versions of a method.

> **Note:**
> `GetCodeInfo4` can trigger a garbage collection.

The extents are sorted in order of increasing Common Intermediate Language (CIL) offset.

After `GetCodeInfo4` returns, you must verify that the `codeInfos` buffer was large enough to contain all the COR_PRF_CODE_INFO structures. To do this, compare the value of `cCodeInfos` with the value of the `cchName` parameter. If `cCodeInfos` divided by the size of a COR_PRF_CODE_INFO structure is smaller than `pcCodeInfos`, allocate a larger `codeInfos` buffer, update `cCodeInfos` with the new, larger size, and call `GetCodeInfo4` again.

Alternatively, you can first call `GetCodeInfo4` with a zero-length `codeInfos` buffer to obtain the correct buffer size. You can then set the `codeInfos` buffer size to the value returned in `pcCodeInfos`, multiplied by the size of a COR_PRF_CODE_INFO structure, and call `GetCodeInfo4` again.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**Library:** CorGuids.lib

**.NET Versions:** Available since .NET Core 2.1

## See also

- ICorProfilerInfo9 Interface
