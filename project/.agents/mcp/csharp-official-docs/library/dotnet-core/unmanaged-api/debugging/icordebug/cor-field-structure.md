---
title: "COR_FIELD Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cor-field-structure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# COR_FIELD Structure

Provides information about a field in an object.

## Syntax

```cpp
typedef struct COR_FIELD{
    mdFieldDef token;
    ULONG32 offset;
    COR_TYPEID id;
    CorElementType fieldType;
} COR_FIELD;
```

## Members

| Member      | Description                                                                           |
|-------------|---------------------------------------------------------------------------------------|
| `token`     | An `mdFieldDef` token that can be used to get field information.                      |
| `offset`    | The offset, in bytes, to the field data in the object.                                |
| `id`        | A COR_TYPEID value that identifies the type of this field. |
| `fieldType` | A CorElementType enumeration value that indicates the type of the field.              |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
