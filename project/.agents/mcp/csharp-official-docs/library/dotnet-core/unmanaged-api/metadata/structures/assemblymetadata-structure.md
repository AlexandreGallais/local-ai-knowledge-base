---
title: "ASSEMBLYMETADATA Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/structures/assemblymetadata-structure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ASSEMBLYMETADATA Structure

Contains information about the referenced assembly, including its version and its level of support for locales, processors, and operating systems.

## Syntax

```cpp
typedef struct {
    USHORT  usMajorVersion;
    USHORT  usMinorVersion;
    USHORT  usBuildNumber;
    USHORT  usRevisionNumber;
    LPWSTR  szLocale;
    ULONG   cbLocale;
    DWORD*  rdwProcessor[];
    ULONG   ulProcessor
    OSINFO* rOS[];
    ULONG   ulOS;
} ASSEMBLYMETADATA;
```

## Members

| Member           | Description |
|------------------|-------------|
| `usMajorVersion` | The major version number of the referenced assembly. This value cannot be zero. If all the bits of `usMajorVersion` are set, the major version is not specified. |
| `usMinorVersion` | The minor version number of the referenced assembly. This value cannot be zero. If all the bits of `usMinorVersion` are set, the minor version is not specified. |
| `usBuildNumber` | The build number of the referenced assembly. This value cannot be zero. If all the bits of `usBuildNumber` are set, the build number is not specified. |
| `usRevisionNumber` | The revision number of the referenced assembly. This value cannot be zero. If all the bits of `usRevisionNumber` are set, the revision number is not specified. |
| `szLocale` |A list of locale names conforming to the RFC1766 specification, separated by semicolons, specifying the locales supported by the referenced assembly. A null value indicates locale independence.|
| `cbLocale` | The size in wide characters of `szLocale`. |
| `rdwProcessor` | An array of identifiers, as defined in Winnt.h, for the processor types that are supported by the referenced assembly. A NULL value indicates processor independence. |
| `ulProcessor` | The length of the `rdwProcessor` array. |
| `rOS` |An array of OSINFO instances specifying the operating systems that are supported by the referenced assembly. A NULL value indicates operating-system independence.|
| `ulOS` | The length of the `rOS` array. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

## See also

- IMetaDataAssemblyEmit Interface
- OSINFO Structure
