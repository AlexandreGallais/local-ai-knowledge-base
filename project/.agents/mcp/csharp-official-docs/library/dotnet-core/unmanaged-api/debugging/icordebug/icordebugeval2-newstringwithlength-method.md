---
title: "ICorDebugEval2::NewStringWithLength Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugeval2-newstringwithlength-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugEval2::NewStringWithLength Method

Creates a string of the specified length, with the specified contents.

## Syntax

```cpp
HRESULT NewStringWithLength (
    [in] LPCWSTR               string,
    [in] UINT                  uiLength
);
```

## Parameters

 `string`
 [in] A pointer to the string value.

 `uiLength`
 [in] Length of the string.

## Remarks

If the string's trailing null character is expected to be in the managed string, the caller of the `NewStringWithLength` method must ensure that the string length includes the trailing null character.

The string is always created in the application domain in which the thread is currently executing.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
