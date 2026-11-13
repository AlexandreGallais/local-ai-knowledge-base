---
title: "CorPropertyAttr Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/corpropertyattr-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorPropertyAttr Enumeration

Contains values that describe the metadata of a property.

## Syntax

```cpp
typedef enum CorPropertyAttr {

    prSpecialName           =   0x0200,
    prReservedMask          =   0xf400,
    prRTSpecialName         =   0x0400,
    prHasDefault            =   0x1000,
    prUnused                =   0xe9ff

} CorPropertyAttr;
```

## Members

| Member | Description |
|------------|-----------------|
| `prSpecialName` | Specifies that the property is special, and that its name describes how. |
| `prReservedMask` | Reserved for internal use by the common language runtime. |
| `prRTSpecialName` | Specifies that the common language runtime metadata internal APIs should check the encoding of the property name. |
| `prHasDefault` | Specifies that the property has a default value. |
| `prUnused` | Unused. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
