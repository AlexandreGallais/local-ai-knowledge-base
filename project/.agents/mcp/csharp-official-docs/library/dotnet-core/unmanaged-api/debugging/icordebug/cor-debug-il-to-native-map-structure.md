---
title: "COR_DEBUG_IL_TO_NATIVE_MAP Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cor-debug-il-to-native-map-structure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# COR_DEBUG_IL_TO_NATIVE_MAP Structure

Contains the offsets that are used to map common intermediate language (CIL) code to native code.

## Syntax

```cpp
typedef struct COR_DEBUG_IL_TO_NATIVE_MAP {
    ULONG32  ilOffset;
    ULONG32  nativeStartOffset;
    ULONG32  nativeEndOffset;
} COR_DEBUG_IL_TO_NATIVE_MAP;
```

## Members

| Member              | Description                                 |
|---------------------|---------------------------------------------|
| `ilOffset`          | The offset of the CIL code.                 |
| `nativeStartOffset` | The offset of the start of the native code. |
| `nativeEndOffset`   | The offset of the end of the native code.   |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorProf.idl, CorDebug.idl

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- GetILToNativeMapping Method
