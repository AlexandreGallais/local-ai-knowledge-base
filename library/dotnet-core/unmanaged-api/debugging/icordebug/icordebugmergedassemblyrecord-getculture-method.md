---
title: "ICorDebugMergedAssemblyRecord::GetCulture Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-getculture-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugMergedAssemblyRecord::GetCulture Method

Gets the culture name string of the assembly.

## Syntax

```cpp
HRESULT GetCulture(
   [in] ULONG32 cchCulture,
   [out] ULONG32 *pcchCulture,
   [out, size_is(cchCulture), length_is(*pcchCulture)] WCHAR szCulture[]
);
```

## Parameters

 `cchCulture`
 [in] The number of characters in the `szCulture` buffer.

 `pcchCulture`
 [out] The number of characters actually written to the `szCulture` buffer.

 `szCulture`
 [out] A character array that contains the culture name.

## Remarks

The culture name is a unique string that identifies a culture, such as "en-US" (for the English (United States) culture), or "neutral" (for a neutral culture).

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugMergedAssemblyRecord Interface
