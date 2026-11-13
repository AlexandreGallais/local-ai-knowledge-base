---
title: "ICorDebugChain::EnumerateFrames Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugchain-enumerateframes-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugChain::EnumerateFrames Method

Gets an enumerator that contains all the managed stack frames in the chain, starting with the most recent frame.

## Syntax

```cpp
HRESULT EnumerateFrames (
    [out] ICorDebugFrameEnum **ppFrames
);
```

## Parameters

 `ppFrames`
 [out] A pointer to the address of an ICorDebugFrameEnum object that is the enumerator for the stack frames.

## Remarks

The chain represents the physical call stack for the thread.

The `EnumerateFrames` method should be called only for managed chains. The debugging API does not provide methods for obtaining frames contained in unmanaged chains. The debugger must use other means to obtain this information.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
