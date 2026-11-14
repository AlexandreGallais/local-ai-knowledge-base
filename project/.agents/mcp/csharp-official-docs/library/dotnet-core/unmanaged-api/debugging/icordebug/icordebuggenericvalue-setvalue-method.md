---
title: "ICorDebugGenericValue::SetValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebuggenericvalue-setvalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugGenericValue::SetValue Method

Copies a new value from the specified buffer.

## Syntax

```cpp
HRESULT SetValue (
    [in] void      *pFrom
);
```

## Parameters

 `pFrom`
 [in] A pointer to the buffer from which to copy the value.

## Remarks

For reference types, the value is the reference, not the content.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
