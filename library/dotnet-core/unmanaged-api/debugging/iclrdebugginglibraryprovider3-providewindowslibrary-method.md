---
title: "ICLRDebuggingLibraryProvider3::ProvideWindowsLibrary Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/iclrdebugginglibraryprovider3-providewindowslibrary-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICLRDebuggingLibraryProvider3::ProvideWindowsLibrary method

Gets a library provider callback interface that allows common language runtime (CLR) version-specific debugging libraries to be located and loaded on demand.

## Syntax

```cpp
HRESULT ProvideWindowsLibrary (
     [in] const WCHAR* pwszFileName,
     [in] const WCHAR* pwszRuntimeModule,
     [in] LIBRARY_PROVIDER_INDEX_TYPE indexType,
     [in] DWORD dwTimestamp,
     [in] DWORD dwSizeOfImage,
     [out] LPWSTR* ppResolvedModulePath);
```

## Parameters

`pwszFilename` \
[in] The name of the module being requested.

`pwszRuntimeModule` \
[in] The runtime or single-file module path.

`indexType` \
[in] The type of index information (dwTimestamp/dwSizeOfImage) provided. See LIBRARY_PROVIDER_INDEX_TYPE enum.

`dwTimestamp` \
[in] The date time stamp stored in the COFF file header of PE files.

`dwSizeOfImage` \
[in] The `SizeOfImage` field stored in the COFF optional file header of PE files.

`ppResolvedModulePath` \
[out] This is a null terminated path to the module dll. On Windows it should be allocated with CoTaskMemAlloc. On Unix it should be allocated with malloc. Failure leaves it untouched. See security note below!

## Return value

This method returns the following specific HRESULT as well as HRESULT errors that indicate method failure.

| HRESULT | Description                        |
|---------|------------------------------------|
| `S_OK`  | The method completed successfully. |

## Remarks

`ProvideWindowsLibrary` allows the debugger to provide modules that are needed for debugging specific CLR files such as mscordbi.dll and mscordacwks.dll.

The debugger may use any available means to locate or procure the debugging module.

> **Important:**
> This feature allows the API caller to provide modules that contain executable, and possibly malicious, code. As a security precaution, the caller should not use `ProvideWindowsLibrary` to distribute any code that it is not willing to execute itself.
>
> If a serious security issue is discovered in an already released library, such as mscordbi.dll or mscordacwks.dll, the shim can be patched to recognize the bad versions of the files. The shim can then issue requests for the patched versions of the files and reject the bad versions if they are provided in response to any request. This can occur only if the user has patched to a new version of the shim. Unpatched versions will remain vulnerable.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** dbgshim.h

**Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

**.NET Versions:** Available since .NET Core 2.1
