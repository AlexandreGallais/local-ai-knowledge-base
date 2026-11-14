---
title: "CorMethodSemanticsAttr Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/enumerations/cormethodsemanticsattr-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorMethodSemanticsAttr Enumeration

Contains values that describe the relationship between a method and an associated property or event.

## Syntax

```cpp
typedef enum CorMethodSemanticsAttr {

    msSetter    =   0x0001,
    msGetter    =   0x0002,
    msOther     =   0x0004,
    msAddOn     =   0x0008,
    msRemoveOn  =   0x0010,
    msFire      =   0x0020,

} CorMethodSemanticsAttr;
```

## Members

| Member | Description |
|------------|-----------------|
| `msSetter` | Specifies that the method is a `set` accessor for a property. |
| `msGetter` | Specifies that the method is a `get` accessor for a property. |
| `msOther` | Specifies that the method has a relationship to a property or an event other than those defined here. |
| `msAddOn` | Specifies that the method adds handler methods for an event. |
| `msRemoveOn` | Specifies that the method removes handler methods for an event. |
| `msFire` | Specifies that the method raises an event. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
