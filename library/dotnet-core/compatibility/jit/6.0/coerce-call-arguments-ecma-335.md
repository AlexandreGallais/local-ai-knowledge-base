---
title: "Breaking change: Coerce call arguments according to ECMA-335"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/jit/6.0/coerce-call-arguments-ecma-335.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Coerce call arguments according to ECMA-335

ECMA-335 (Table III.9: Signature Matching) describes which implicit conversions are supported for call arguments. This change adds checking for the supported conversions.

## Version introduced

6.0

## Change description

In previous .NET versions, the just-in-time (JIT) compiler does not coerce call arguments according to ECMA-335. This leads to undefined behavior on some platforms. For example, on x86, passing a `long` value as an `int` register leaves the register undefined.

Starting in .NET 6, if implicit conversion is not allowed, then the JIT compiler throws an `System.InvalidProgramException`. There are two conversion cases that are still allowed:

- `int8` -> `nint` on 64-bit platform (because it's used often and doesn't lead to bad code)
- `byref` -> `nint`

## Reason for change

The previous behavior caused silent, bad code generation on some platforms, including Arm64 Apple.

## Recommended action

If you updated to .NET 6 and your app throws `System.InvalidProgramException` exceptions because of this change, use an explicit conversion for the affected argument or fix the callee declaration.

## Affected APIs

None.
