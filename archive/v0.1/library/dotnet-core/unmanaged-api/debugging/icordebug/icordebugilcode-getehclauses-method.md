---
title: "ICorDebugILCode::GetEHClauses Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugilcode-getehclauses-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugILCode::GetEHClauses Method

Returns a pointer to a list of exception handling (EH) clauses that are defined for this intermediate language (IL).

## Syntax

```cpp
HRESULT GetEHClauses(
   [in] ULONG32 cClauses,
   [out] ULONG32 * pcClauses,
   [out, size_is(cClauses), length_is(*pcClauses)] CorDebugEHClause clauses[]);
```

## Parameters

 `cClauses`
 [in] The storage capacity of the `clauses` array. See the Remarks section for more information.

 `pcClauses`
 [out] The number of clauses about which information is written to the `clauses` array.

clauses
 [out] An array of CorDebugEHClause objects that contain information on exception handling clauses defined for this IL.

## Remarks

If `cClauses` is 0 and `pcClauses` is non-**null**, `pcClauses` is set to the number of available exception handling clauses. If `cClauses` is non-zero, it represents the storage capacity of the `clauses` array. When the method returns, `clauses` contains a maximum of `cClauses` items, and `pcClauses` is set to the number of clauses actually written to the `clauses` array.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ICorDebugILCode Interface
- CorDebugEHClause Structure
