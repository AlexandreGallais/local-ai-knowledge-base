---
title: "UnregisterForRuntimeStartup Function"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/unregisterforruntimestartup-function.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# UnregisterForRuntimeStartup function

Stops/cancels runtime startup notification.

## Syntax

```cpp
HRESULT UnregisterForRuntimeStartup (
    [in] PVOID pUnregisterToken)
);
```

## Parameters

 `pUnregisterToken`\
 [in] The token from the RegisterForRuntimeStartup APIs.

## Return value

 `S_OK`\
 The runtime startup callback was successfully unregistered.

 `E_FAIL` (or other `E_` return codes)\
 Unregister failed.

## Remarks

This API needs to be called during the debugger's shutdown to cleanup the internal data. It can be called in the startup callback. Otherwise, it will block until the callback thread finishes and no more callbacks will be initiated after this API returns.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET Core 2.1
