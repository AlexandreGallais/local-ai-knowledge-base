---
title: "CorNotificationForTokenMovement Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/enumerations/cornotificationfortokenmovement-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorNotificationForTokenMovement Enumeration

Specifies the notifications that will be sent to the metadata API client when a token remap occurs.

## Syntax

```cpp
typedef enum CorNotificationForTokenMovement {

    MDNotifyDefault             = 0x0000000f,
    MDNotifyAll                 = 0xffffffff,
    MDNotifyNone                = 0x00000000,
    MDNotifyMethodDef           = 0x00000001,
    MDNotifyMemberRef           = 0x00000002,
    MDNotifyFieldDef            = 0x00000004,
    MDNotifyTypeRef             = 0x00000008,

    MDNotifyTypeDef             = 0x00000010,
    MDNotifyParamDef            = 0x00000020,
    MDNotifyInterfaceImpl       = 0x00000040,
    MDNotifyProperty            = 0x00000080,
    MDNotifyEvent               = 0x00000100,
    MDNotifySignature           = 0x00000200,
    MDNotifyTypeSpec            = 0x00000400,
    MDNotifyCustomAttribute     = 0x00000800,
    MDNotifySecurityValue       = 0x00001000,
    MDNotifyPermission          = 0x00002000,
    MDNotifyModuleRef           = 0x00004000,

    MDNotifyNameSpace           = 0x00008000,

    MDNotifyAssemblyRef         = 0x01000000,
    MDNotifyFile                = 0x02000000,
    MDNotifyExportedType        = 0x04000000,
    MDNotifyResource            = 0x08000000

} CorNotificationForTokenMovement;
```

## Members

| Member | Description |
|------------|-----------------|
| `MDNotifyDefault` | Notify when `mdTypeRef`, `mdMethodDef`, `mdMemberRef`, or `mdFieldDef` tokens move. |
| `MDNotifyAll` | Notify when any token moves. |
| `MDNotifyNone` | Do not notify when tokens move. |
| `MDNotifyMethodDef` | Notify when an `mdMethodDef` token moves. |
| `MDNotifyMemberRef` | Notify when an `mdMemberRef` token moves. |
| `MDNotifyFieldDef` | Notify when an `mdFieldDef` token moves. |
| `MDNotifyTypeRef` | Notify when an `mdTypeRef` token moves. |
| `MDNotifyTypeDef` | Notify when an `mdTypeDef` token moves. |
| `MDNotifyParamDef` | Notify when an `mdParamDef` token moves. |
| `MDNotifyInterfaceImpl` | Notify when an `mdInterfaceImpl` token moves. |
| `MDNotifyProperty` | Notify when an `mdProperty` token moves. |
| `MDNotifyEvent` | Notify when an `mdEvent` token moves. |
| `MDNotifySignature` | Notify when an `mdSignature` token moves. |
| `MDNotifyTypeSpec` | Notify when an `mdTypeSpec` token moves. |
| `MDNotifyCustomAttribute` | Notify when an `mdCustomAttribute` token moves. |
| `MDNotifySecurityValue` | Notify when an `mdSecurityValue` token moves. |
| `MDNotifyPermission` | Notify when an `mdPermission` token moves. |
| `MDNotifyModuleRef` | Notify when an `mdModuleRef` token moves. |
| `MDNotifyNameSpace` | Notify when an `mdNameSpace` token moves. |
| `MDNotifyAssemblyRef` | Notify when an `mdAssemblyRef` token moves. |
| `MDNotifyFile` | Notify when an `mdFile` token moves. |
| `MDNotifyExportedType` | Notify when an `mdExportedType` token moves. |
| `MDNotifyResource` | Notify when an `mdManifestResource` token moves. |

## Remarks

 A token may be re-mapped (that is, moved) during a metadata merge.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
