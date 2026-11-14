---
title: "ICorDebugVariableHome::GetArgumentIndex Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehome-getargumentindex-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugVariableHome::GetArgumentIndex Method

Gets the index of a function argument.

## Syntax

```cpp
HRESULT GetArgumentIndex(
    [out] ULONG32* pArgumentIndex
);
```

## Parameters

`pArgumentIndex`\
[out] A pointer to the argument index.

## Return Value

The method returns the following values.

| Value    | Description                                      |
|----------|--------------------------------------------------|
| `S_OK`   | The method call returned a valid argument index. |
| `E_FAIL` | The current ICorDebugVariableHome instance represents a local variable. |

## Remarks

The argument index can be used to retrieve metadata for this argument.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorDebug.idl, CorDebug.h

**Library:** CorGuids.lib

**.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugVariableHome Interface
