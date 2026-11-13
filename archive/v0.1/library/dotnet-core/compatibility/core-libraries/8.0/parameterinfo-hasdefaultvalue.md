---
title: ".NET 8 breaking change: Method builders generate parameters with HasDefaultValue set to false"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/8.0/parameterinfo-hasdefaultvalue.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Method builders generate parameters with HasDefaultValue set to false

`System.Reflection.Emit.ConstructorBuilder` and `System.Reflection.Emit.MethodBuilder` now generate method parameters that, when reflected on, have `System.Reflection.ParameterInfo.HasDefaultValue` set to `false`.

## Previous behavior

Previously, `System.Reflection.Emit.ConstructorBuilder` and `System.Reflection.Emit.MethodBuilder` generated IL for method parameters where the `System.Reflection.ParameterInfo.HasDefaultValue` of the parameters was set to `true`.

## New behavior

Starting in .NET 8, `System.Reflection.Emit.ConstructorBuilder` and `System.Reflection.Emit.MethodBuilder` generate IL for method parameters where the `System.Reflection.ParameterInfo.HasDefaultValue` of the parameters is set to `false`, which is the expected value.

## Version introduced

.NET 8 Preview 5

## Type of breaking change

This change is a behavioral change.

## Reason for change

The previous behavior was incorrect, as no default parameter values were specified when the method or constructor was defined.

## Recommended action

If you use `System.Reflection.Emit.TypeBuilder.DefineConstructor*` or `System.Reflection.Emit.TypeBuilder.DefineMethod*`, make sure consumers of the generated types' methods don't rely on the `System.Reflection.ParameterInfo.HasDefaultValue` property being `true`.

## Affected APIs

- `System.Reflection.ParameterInfo.HasDefaultValue`
