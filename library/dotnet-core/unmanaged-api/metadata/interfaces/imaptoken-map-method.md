---
title: "IMapToken::Map Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imaptoken-map-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMapToken::Map Method

Maps a relationship between the assemblies using metadata signatures.

## Syntax

```cpp
HRESULT Map (
    [in]  mdToken tkImp,
    [in]  mdToken <example-value>
);
```

## Parameters

 `tkImp`
 [in] The metadata token that represents the imported code object.

 `tkEmit`
 [in] The metadata token that represents the emitted code object.

## Remarks

 When the token <example-value> occurs during a merge, the original token is scoped in the imported (source) metadata scope and the new token is scoped in the emitted (target) metadata scope.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMapToken <example-value>
