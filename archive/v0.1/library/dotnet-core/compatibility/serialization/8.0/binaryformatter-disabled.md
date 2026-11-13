---
title: "Breaking change: BinaryFormatter disabled across most project types"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/serialization/8.0/binaryformatter-disabled.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# BinaryFormatter disabled across most project types

The `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize(System.IO.Stream,System.Object)` and `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream)` methods now throw a `System.NotSupportedException` at runtime across nearly all project types, including console applications.

## Previous behavior

In .NET 7, the `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize(System.IO.Stream,System.Object)` and `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream)` methods were marked obsolete and raised an error at compile time. However, if your application suppressed the obsoletion, it could still call the methods and they functioned properly in most project types (excluding ASP.NET, WASM, and MAUI). For example, the APIs functioned correctly in a console app.

## New behavior

Starting in .NET 8, the affected methods throw a `System.NotSupportedException` at runtime across all project types except Windows Forms and WPF. The APIs continue to remain obsolete (as error) across all project types, including Windows Forms and WPF.

## Version introduced

.NET 8 Preview 4

## Type of breaking change

This change is a behavioral change.

## Reason for change

This runtime change is the next stage of the BinaryFormatter obsoletion plan, in which `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` will eventually be removed from .NET.

## Recommended action

**The best course of action is to migrate away from `BinaryFormatter` due to its security and reliability flaws.** For more information, see Preferred alternatives.

If you need to continue using `BinaryFormatter`, you can set a compatibility switch in your project file to re-enable `BinaryFormatter` functionality. For more information, see the Recommended action section of the .NET 7 breaking change notification. That compatibility switch continues to be honored in .NET 8.

## Affected APIs

- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize(System.IO.Stream,System.Object)`
- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream)`

## See also

- BinaryFormatter serialization methods are obsolete (.NET 5)
- SerializationFormat.Binary is obsolete (.NET 7)
- BinaryFormatter serialization APIs produce compiler errors (.NET 7)
