---
title: "ResumeProcess Function"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/resumeprocess-function.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ResumeProcess function

Resumes the process using the resume handle returned by the CreateProcessForLaunch function.

## Syntax

```cpp
HRESULT ResumeProcess (
    [in] HANDLE hResumeHandle
);
```

## Parameters

 `hResumeHandle`\
 [in] The resume handle returned by CreateProcessForLaunch function.

## Return value

 `S_OK`\
 The process was successfully resumed.

 `E_FAIL` (or other `E_` return codes)\
 The handle was invalid or the function failed.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET Core 2.1
