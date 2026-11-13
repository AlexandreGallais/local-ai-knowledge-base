---
title: "CorRefToDefCheck Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/correftodefcheck-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorRefToDefCheck Enumeration

Specifies flags to control which referenced items are converted to their definitions in order to optimize the code.

## Syntax

```cpp
typedef enum CorRefToDefCheck {
    MDRefToDefDefault           = 0x00000003,
    MDRefToDefAll               = 0xffffffff,
    MDRefToDefNone              = 0x00000000,
    MDTypeRefToDef              = 0x00000001,
    MDMemberRefToDef            = 0x00000002
} CorRefToDefCheck;
```

## Members

| Member | Description |
|------------|-----------------|
| `MDRefToDefDefault` |Specifies that type references and member references should be converted to definitions. This is the default value (`MDTypeRefToDef` &#124; `MDMemberRefToDef`).|
| `MDRefToDefAll` | Specifies that all referenced items should be converted to definitions. |
| `MDRefToDefNone` | Specifies that no referenced items should be converted to definitions. |
| `MDTypeRefToDef` | Specifies that only type references should be converted to type definitions. |
| `MDMemberRefToDef` | Specifies that only member references should be converted to definitions. That is, member references should be converted to either method definitions or field definitions. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
