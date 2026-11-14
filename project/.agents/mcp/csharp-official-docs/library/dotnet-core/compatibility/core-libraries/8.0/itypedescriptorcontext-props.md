---
title: ".NET 8 breaking change: ITypeDescriptorContext nullable annotations"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/8.0/itypedescriptorcontext-props.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ITypeDescriptorContext nullable annotations

`System.ComponentModel.ITypeDescriptorContext` has three properties that were previously annotated as being non-nullable, but they were actually nullable in practice. The nullable annotations for these properties have been updated to indicate that they're nullable. This change can result in new build warnings related to use of nullable members.

## Previous behavior

Previously, the affected properties were annotated as not being nullable. You could consume their values and assume they weren't `null` without any compile-time warnings.

## New behavior

Starting in .NET 8, the affected properties are annotated as being nullable. If you consume their values without `null` checks, you'll get warnings at compile time.

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The previous annotations of these properties were incorrect. This change applies the appropriate annotations for the properties and ensures callers understand that the values can be `null`.

## Recommended action

Update calling code to guard against `null` for these properties.

## Affected APIs

- `System.ComponentModel.ITypeDescriptorContext.Container`
- `System.ComponentModel.ITypeDescriptorContext.Instance`
- `System.ComponentModel.ITypeDescriptorContext.PropertyDescriptor`
