---
title: "CorOpenFlags Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/enumerations/coropenflags-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorOpenFlags Enumeration

Contains flag values that control metadata behavior upon opening manifest files.

## Syntax

```cpp
typedef enum CorOpenFlags
{
    ofRead              =   0x00000000,
    ofWrite             =   0x00000001,
    ofReadWriteMask     =   0x00000001,
    ofCopyMemory        =   0x00000002,
    ofCacheImage        =   0x00000004,
    ofManifestMetadata  =   0x00000008,
    ofReadOnly          =   0x00000010,
    ofTakeOwnership     =   0x00000020,
    ofCacheImage        =   0x00000004,
    ofNoTypeLib         =   0x00000080,
    ofNoTransform       =   0x00001000,
    ofReserved1         =   0x00000100,
    ofReserved2         =   0x00000200,
    ofReserved          =   0xffffff40
} CorOpenFlags;
```

## Members

| Member | Description |
|------------|-----------------|
| `ofRead` | Indicates that the file should be opened for reading only. |
| `ofWrite` |Indicates that the file should be opened for writing. If you are using the `ofWrite` flag when opening a .winmd file, you should also pass the `ofNoTransform` flag.|
| `ofReadWriteMask` | A mask for reading and writing. |
| `ofCopyMemory` | Indicates that the file should be read into memory. Metadata should maintain its own copy. |
| `ofCacheImage` | Obsolete. This flag is ignored. |
| `ofManifestMetadata` | Obsolete. This flag is ignored. |
| `ofReadOnly` |Indicates that the file should be opened for reading, and that a call to `QueryInterface` for an IMetaDataEmit cannot be made.|
| `ofTakeOwnership` |Indicates that the memory was allocated using a call to CoTaskMemAlloc and will be freed by the metadata.|
| `ofNoTypeLib` | Obsolete. This flag is ignored. |
| `ofNoTransform` |Indicates that automatic transforms of .winmd files should be disabled. In other words, the projection of a Windows Runtime type to a .NET type should be disabled. For more information, see Windows Runtime and the CLR - Underneath the Hood with .NET and the Windows Runtime.|
|`ofReserved1`| Reserved for internal use. |
|`ofReserved2`| Reserved for internal use. |
| `ofReserved` | Reserved for internal use. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
