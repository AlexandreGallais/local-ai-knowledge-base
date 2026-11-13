---
title: "Breaking change: 'DynamicallyAccessedMembers' annotation removed from 'DefaultValueAttribute' ctor"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/10.0/defaultvalueattribute-dynamically-accessed-members.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# `DynamicallyAccessedMembers` annotation removed from `DefaultValueAttribute` ctor

The `System.ComponentModel.DefaultValueAttribute.#ctor(System.Type,System.String)` constructor is no longer annotated with `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMembersAttribute`. This constructor is not supported with trimming and throws an exception if reached at runtime in a trimmed app.

## Version introduced

.NET 10

## Previous behavior

Previously, if the constructor was used in a trimmed app and the feature switch to disable exception throwing was used, publishing the app generated a trimming warning, and there was a chance the code worked at runtime.

## New behavior

Starting in .NET 10, if the constructor is used in a trimmed app and the feature switch to disable exception throwing is used, publishing the app still generates a trimming warning. But there's a smaller chance the code will work at runtime.

## Type of breaking change

This change can affect binary compatibility and source compatibility.

## Reason for change

This attribute should not be used in trimmed apps because it doesn't reliably work. Trimming should be free to remove type members mentioned in the attribute.

## Recommended action

Don't enable the feature switch that attempts to make `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMembersAttribute` (unreliably) work in trimmed apps.

## Affected APIs

- `System.ComponentModel.DefaultValueAttribute.#ctor(System.Type,System.String)`
