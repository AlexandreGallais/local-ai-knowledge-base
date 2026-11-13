---
title: "CreateProcessForLaunch Function"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/createprocessforlaunch-function.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CreateProcessForLaunch function

A subset of the Windows CreateProcess that can be supported cross-platform.

## Syntax

```cpp
HRESULT CreateProcessForLaunch (
    [in] LPWSTR lpCommandLine,
    [in] BOOL bSuspendProcess,
    [in] LPVOID lpEnvironment,
    [in] LPCWSTR lpCurrentDirectory,
    [out] PDWORD pProcessId,
    [out] HANDLE *pResumeHandle
);
```

## Parameters

 `lpCommandLine`\
 [in] The command line to be executed.

 `bSuspendProcess`\
 [in] If this parameter is TRUE, suspend the process for launch.

 `lpEnvironment`\
 [in, optional] A pointer to the environment block for the new process. If this parameter is NULL, the new process uses the environment of the calling process.

 `lpCurrentDirectory`\
 [in, optional] The full path to the current directory for the process. If this parameter is NULL, the new process will have the same current drive and directory as the calling process.

 `pProcessId`\
 [out] The id to identify the process created.

 `pResumeHandle`\
 [out] The handle to use with ResumeProcess to resume the process if bSuspendProcess is TRUE.

## Return value

 `S_OK`\
 The process was successfully created.

 `E_FAIL`\ (or other `E_` return codes)
 The launch failed.

## Remarks

See the Win32 CreateProcess API for more details.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET Core 2.1
