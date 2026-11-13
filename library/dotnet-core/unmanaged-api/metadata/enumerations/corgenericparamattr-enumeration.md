---
title: "CorGenericParamAttr Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/corgenericparamattr-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorGenericParamAttr Enumeration

Contains values that describe the `System.Type` parameters for generic types, as used in calls to IMetaDataEmit2::DefineGenericParam.

## Syntax

```cpp
typedef enum CorGenericParamAttr {

    gpVarianceMask                     =   0x0003,
    gpNonVariant                       =   0x0000,
    gpCovariant                        =   0x0001,
    gpContravariant                    =   0x0002,

    gpSpecialConstraintMask            =   0x001C,
    gpNoSpecialConstraint              =   0x0000,
    gpReferenceTypeConstraint          =   0x0004,
    gpNotNullableValueTypeConstraint   =   0x0008,
    gpDefaultConstructorConstraint     =   0x0010,
    gpAllowByRefLike                   =   0x0020,

} CorGenericParamAttr;
```

## Members

| Member                      | Description                                                                         |
|-----------------------------|-------------------------------------------------------------------------------------|
| `gpVarianceMask`            | Parameter variance applies only to generic parameters for interfaces and delegates. |
| `gpNonVariant`              | Indicates the absence of variance.                                                  |
| `gpCovariant`               | Indicates covariance.                                                               |
| `gpContravariant`           | Indicates contravariance.                                                           |
| `gpSpecialConstraintMask`   | Special constraints can apply to any `System.Type` parameter.                  |
| `gpNoSpecialConstraint`     | Indicates that no constraint applies to the `System.Type` parameter.           |
| `gpReferenceTypeConstraint` | Indicates that the `System.Type` parameter must be a reference type.           |
| `gpNotNullableValueTypeConstraint` |Indicates that the `System.Type` parameter must be a value type that cannot be a null value.|
| `gpDefaultConstructorConstraint` |Indicates that the `System.Type` parameter must have a default public constructor that takes no parameters.|
| `gpAllowByRefLike` |Indicates that the `System.Type` parameter can be a byref-like type. (Available since .NET 7.) |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h

 **.NET versions:** Available since .NET Framework 2.0
