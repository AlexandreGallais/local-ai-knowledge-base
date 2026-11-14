---
title: "ICorDebugModule4::IsMappedLayout Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule4-ismappedlayout-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule4::IsMappedLayout Method

Determines whether a module is loaded into memory in mapped/hydrated format.

## Syntax

```cpp
HRESULT IsMappedLayout(
      [out] BOOL *pIsMapped
      );
```

## Parameters

`pIsMapped`\
[out] Pointer to a BOOL to store mapping information. TRUE represents mapped format while FALSE represents flat format.

## Return Value

`S_OK`\
Successfully created the reader.

`S_FALSE`\
The layout couldn't be determined.

## Remarks

The `pIsMapped` value should only be interpreted as valid when this function returns `S_OK`. All other return values (including
`S_FALSE`) indicate that the layout couldn't be determined and `pIsMapped` should be ignored.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** 4.5, 4, 3.5 SP1

## See also

- ICorDebugRemoteTarget Interface
- ICorDebug Interface
