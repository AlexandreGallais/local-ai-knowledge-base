---
title: "ICorDebugMergedAssemblyRecord::GetCulture Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-getculture-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
