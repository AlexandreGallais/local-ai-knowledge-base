---
title: "IMapToken::Map Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imaptoken-map-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
