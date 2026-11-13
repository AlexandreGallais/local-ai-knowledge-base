---
title: "COR_FIELD_OFFSET Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/structures/cor-field-offset-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_FIELD_OFFSET Structure

Stores the offset, within a class, of the specified field.

## Syntax

```cpp
typedef struct COR_FIELD_OFFSET {
    mdFieldDef  ridOfField;
    ULONG       ulOffset;
} COR_FIELD_OFFSET;
```

## Members

| Member       | Description                                               |
|--------------|-----------------------------------------------------------|
| `ridOfField` | An `mdFieldDef` metadata token that represents the field. |
| `ulOffset`   | The field's offset within its class.                      |

## Remarks

 IMetaDataImport::GetClassLayout and IMetaDataEmit::SetClassLayout methods take a parameter of type `COR_FIELD_OFFSET`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h, CorProf.idl

## See also

- IMetaDataEmit Interface
- IMetaDataImport Interface
