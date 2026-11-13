---
title: "CorDebugEHClause Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugehclause-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugEHClause Structure

Represents an exception handling (EH) clause for a given piece of intermediate language (IL) code.

## Syntax

```cpp
typedef struct _CorDebugEHClause {
   ULONG32 Flags;
   ULONG32 TryOffset;
   ULONG32 TryLength;
   ULONG32 HandlerOffset;
   ULONG32 HandlerLength;
   ULONG32 ClassToken;
   ULONG32 FilterOffset;
} CorDebugEHClause;
```

## Members

|Member|Description|
|------------|-----------------|
|`Flags`|A bit field that describes the exception information in the EH clause. For more information, see the Remarks section.|
|`TryOffset`|The offset, in bytes, of the `try` block from the start of the method body.|
|`TryLength`|The length, in bytes, of the `try` block.|
|`HandlerOffset`|The location of the handler for this `try` block.|
|`HandlerLength`|The size of the handler code in bytes.|
|`ClassToken`|The metadata token for a type-based exception handler.|
|`FilterOffset`|The offset, in bytes, from the start of the method body for a filter-based exception handler.|

## Remarks

 An array of `CoreDebugEHClause` values is returned by the GetEHClauses method.

 The EH clause information is defined by the CLI specification. For more information, see Standard ECMA-355: Common Language Infrastructure (CLI), 6th Edition.

 The `flags` field can contain the following flags. Note that they are not defined in CorDebug.idl or CorDebug.h.

|Flag|Value|Description|
|----------|-----------|-----------------|
|`COR_ILEXCEPTION_CLAUSE_EXCEPTION`|0x00000000|A typed exception clause.|
|`COR_ILEXCEPTION_CLAUSE_FILTER`|0x00000001|An exception filter and handler clause.|
|`COR_ILEXCEPTION_CLAUSE_FINALLY`|0x00000002|A `finally` clause.|
|`COR_ILEXCEPTION_CLAUSE_FAULT`|0x00000004|A fault clause (a `finally` clause that is called only when an exception is thrown).|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- GetEHClauses Method
