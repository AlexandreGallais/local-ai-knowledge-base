---
title: "RegisterForRuntimeStartupEx Function"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/registerforruntimestartupex-function.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# RegisterForRuntimeStartupEx function

Executes the callback when the .NET runtime starts in the specified process.

## Syntax

```cpp
HRESULT RegisterForRuntimeStartupEx (
    [in] DWORD dwProcessId,
    [in] LPCWSTR lpApplicationGroupId,
    [in] PSTARTUP_CALLBACK pfnCallback,
    [in] PVOID parameter,
    [out] PVOID *ppUnregisterToken)
);
```

## Parameters

 `dwProcessId`\
 [in] The process id of the target process.

 `lpApplicationGroupId`\
 [in] A string representing the application group ID of a sandboxed process running in Mac. Pass NULL if the process is not running in a sandbox and other platforms.

 `pfnCallback`\
 [in] A callback that is invoked when the runtime starts. See PSTARTUP_CALLBACK function pointer.

 `parameter`\
 [in] data pointer passed to `pfnCallback`.

 `ppUnregisterToken`\
 [out] pointer to return the UnregisterForRuntimeStartup token.

## Return value

 `S_OK`\
 The startup callback was successfully registered.

 `E_INVALIDARG`\
 Either `pfnCallback` or `ppUnregisterToken` is null.

 `E_FAIL` (or other `E_` return codes)\
 Callback registration failed.

## Remarks

The callback is passed the proper ICorDebug instance for the version of the runtime or an error if something fails. This API works for launch and attach (and even the attach scenario if the runtime hasn't been loaded yet) equally on both xplat and Windows. The callback is always called on a separate thread. This API returns immediately.  The callback is invoked when the coreclr runtime module is loaded during early initialization. The runtime is blocked during initialization until the callback returns.  If the runtime is already loaded in the process (as in the normal attach case), the callback is executed and the runtime is not blocked.  The callback is always invoked on a separate thread and this API returns immediately.  Only the first coreclr module instance found in the target process is currently supported.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET Core 2.1
