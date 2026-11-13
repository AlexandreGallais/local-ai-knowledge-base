---
title: "ICorDebugProcess5::EnableNGENPolicy Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-enablengenpolicy-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::EnableNGENPolicy Method

Sets a value that determines how an application loads native images while running under a managed debugger.

## Syntax

```cpp
HRESULT EnableNGENPolicy(
    [in] CorDebugNGENPolicy ePolicy
);
```

## Parameters

 `ePolicy`
 [in] A CorDebugNGenPolicy constant that determines how an application loads native images while running under a managed debugger.

## Remarks

If the policy is set successfully, the method returns `S_OK`. If `ePolicy` is outside the range of the enumerated values defined by CorDebugNGenPolicy, the method returns `E_INVALIDARG` and the method call has no effect. If the policy of the Native Image Generator (Ngen.exe) cannot be updated, the method returns `E_FAIL`.

The `ICorDebugProcess5::EnableNGenPolicy` method can be called at any time during the lifetime of the process. The policy is in effect for any modules that are loaded after the policy is set.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugProcess5 Interface
