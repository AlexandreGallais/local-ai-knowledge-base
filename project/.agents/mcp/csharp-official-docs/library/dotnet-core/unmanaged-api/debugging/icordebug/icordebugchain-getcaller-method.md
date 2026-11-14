---
title: "ICorDebugChain::GetCaller Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugchain-getcaller-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugChain::GetCaller Method

Gets the chain that called this chain.

## Syntax

```cpp
HRESULT GetCaller (
    [out] ICorDebugChain      **ppChain
);
```

## Parameters

 `ppChain`
 [out] A pointer to the address of an ICorDebugChain object that represents the calling chain.

If this chain was spontaneously called (as would be the case if this chain or the debugger initialized the call stack), `ppChain` will be null.

## Remarks

The calling chain may be on a different thread, if the call was marshalled across threads.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
