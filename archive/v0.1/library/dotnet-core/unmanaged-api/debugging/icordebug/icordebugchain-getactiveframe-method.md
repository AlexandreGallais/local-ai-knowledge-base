---
title: "ICorDebugChain::GetActiveFrame Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugchain-getactiveframe-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugChain::GetActiveFrame Method

Gets the active (that is, most recent) frame on the chain.

## Syntax

```cpp
HRESULT GetActiveFrame (
    [out] ICorDebugFrame   **ppFrame
);
```

## Parameters

 `ppFrame`
 [out] A pointer to the address of an ICorDebugFrame object that represents the active (that is, most recent) frame on the chain.

## Remarks

If no managed stack frame is available, `ppFrame` is set to null.

If the active frame is not available, the call will succeed and `ppFrame` will be null. Active frames will not be available for chains initiated due to CHAIN_ENTER_UNMANAGED, and for some chains initiated due to CHAIN_CLASS_INIT. See the CorDebugChainReason enumeration.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
