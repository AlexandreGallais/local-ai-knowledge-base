---
title: "CorImportOptions Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/corimportoptions-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorImportOptions Enumeration

Contains flag values that control the behavior during importation of an assembly outside the current scope.

## Syntax

```cpp
typedef enum CorImportOptions {

    MDImportOptionDefault                = 0x00000000,
    MDImportOptionAll                    = 0xFFFFFFFF,
    MDImportOptionAllTypeDefs            = 0x00000001,
    MDImportOptionAllMethodDefs          = 0x00000002,
    MDImportOptionAllFieldDefs           = 0x00000004,
    MDImportOptionAllProperties          = 0x00000008,
    MDImportOptionAllEvents              = 0x00000010,
    MDImportOptionAllCustomAttributes    = 0x00000020,
    MDImportOptionAllExportedTypes       = 0x00000040

} CorImportOptions;
```

## Members

| Member | Description |
|------------|-----------------|
| `MDImportOptionDefault` | Indicates the default behavior, which is to skip deleted records. |
| `MDImportOptionAll` | Indicates that all metadata should be enumerated. |
| `MDImportOptionAllTypeDefs` | Indicates that all TypeDefs, including deleted ones, should be enumerated. |
| `MDImportOptionAllMethodDefs` | Indicates that all MethodDefs, including deleted ones, should be enumerated. |
| `MDImportOptionAllFieldDefs` | Indicates that all FieldDefs, including deleted ones, should be enumerated. |
| `MDImportOptionAllProperties` | Indicates that all PropertyDefs, including deleted ones, should be enumerated. |
| `MDImportOptionAllEvents` | Indicates that all EventDefs, including deleted ones, should be enumerated. |
| `MDImportOptionAllCustomAttributes` | Indicates that all custom attributes, including deleted ones, should be enumerated. |
| `MDImportOptionAllExportedTypes` | Indicates that all exported types, including deleted ones, should be enumerated. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
