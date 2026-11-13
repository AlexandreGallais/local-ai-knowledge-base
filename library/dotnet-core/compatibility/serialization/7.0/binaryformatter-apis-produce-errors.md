---
title: "Breaking change: BinaryFormatter serialization APIs produce compiler errors"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/serialization/7.0/binaryformatter-apis-produce-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# BinaryFormatter serialization APIs produce compiler errors

As part of the BinaryFormatter long-term deprecation plan, we continue to cull `BinaryFormatter` functionality from our libraries and to wean developers off of the type. Starting in .NET 7, calls to the following APIs produce compile-time errors across all C# and Visual Basic project types:

- `System.Exception.SerializeObjectState` event
- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*` method
- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*` method
- `System.Runtime.Serialization.Formatter.Serialize(System.IO.Stream,System.Object)` method
- `System.Runtime.Serialization.Formatter.Deserialize(System.IO.Stream)` method
- `System.Runtime.Serialization.IFormatter.Serialize(System.IO.Stream,System.Object)` method
- `System.Runtime.Serialization.IFormatter.Deserialize(System.IO.Stream)` method

## Previous behavior

Since .NET 5, using the affected `Serialize` and `Deserialize` methods produced a compiler *warning* with ID `SYSLIB0011`. For more information, see BinaryFormatter serialization methods are obsolete and prohibited in ASP.NET apps (.NET 5).

Using the `System.Exception.SerializeObjectState` event did not produce an error.

## New behavior

Starting in .NET 7, using any of the affected APIs in code produces a compiler *error* with the same ID, `SYSLIB0011`. Your project will be affected if it meets all of the following criteria:

- It's a C# or Visual Basic project.
- It targets `net7.0` or higher.
- It directly calls one of the affected APIs.
- It's not already suppressing the `SYSLIB0011` warning code.

## Version introduced

.NET 7

## Type of breaking change

This change can affect source compatibility.

## Reason for change

As part of the BinaryFormatter long-term deprecation plan, we continue to cull `BinaryFormatter` functionality from our libraries and to wean developers off of the type.

## Recommended action

The best course of action is to migrate away from `BinaryFormatter` due to its security and reliability flaws. `BinaryFormatter` may be removed from .NET in a future release. The .NET libraries team has already taken a stance that recent types such as `System.Half` and `System.DateOnly` won't be compatible with `BinaryFormatter`.

If you must suppress the errors, you can do so by following the guidelines in the original obsoletion article. You can also disable the error project-wide by setting a project property that converts the error back to a warning (to match the .NET 5/6 behavior).

> **Warning:**
> Setting this property might change host behavior. See `<EnableUnsafeBinaryFormatterSerialization>` property.

```csharp
<PropertyGroup>
    ...
    <EnableUnsafeBinaryFormatterSerialization>true</EnableUnsafeBinaryFormatterSerialization>
</PropertyGroup>
```

> **Note:**
> If your project compiles with "warnings as errors" enabled, compilation will still fail. (This matches the behavior that shipped in the .NET 5 and .NET 6 SDKs.) If that's the case, you'll still need to suppress the `SYSLIB0011` warning in source or in your project file's `<NoWarn>` element.

### `<EnableUnsafeBinaryFormatterSerialization>` property

The `<EnableUnsafeBinaryFormatterSerialization` property was introduced in .NET 5. With .NET 7, the behavior of this switch has changed to control *both compilation and host* runtime behavior. The meaning of this switch differs based on the project type, as described in the following table.

| Type of project | Property set to `true` | Property set to `false` | Property omitted |
| - | - | - | - |
| Library/shared component1 | The affected APIs are obsolete as warning. Compilation will succeed unless you have "warnings as errors" enabled for your application or you've suppressed the `SYSLIB0011` warning code. | The affected APIs are obsolete as error, and calls from your code to those APIs will fail at compile time unless the error is suppressed. | (Same as for `false`.) |
| Blazor and MAUI apps2 | Calls to `BinaryFormatter` will fail at runtime. | Calls to `BinaryFormatter` will fail at runtime. | Calls to `BinaryFormatter` will fail at runtime. |
| ASP.NET app | The affected APIs are obsolete as warning. Compilation will succeed unless you have "warnings as errors" enabled for your application or you've suppressed the `SYSLIB0011` warning code. The runtime will *allow* calls to `BinaryFormatter`, regardless of whether the call originates from your code or from a dependency that you consume. | The affected APIs are obsolete as error, and calls from your code to those APIs will fail at compile time unless the error is suppressed. The runtime will *forbid* calls to `BinaryFormatter`, regardless of whether the call originates from your code or from a dependency that you consume. | (Same as for `false`.) |
| Desktop apps and all other app types | The affected APIs are obsolete as warning. Compilation will succeed unless you have "warnings as errors" enabled for your application or you've suppressed the `SYSLIB0011` warning code. The runtime will *allow* calls to `BinaryFormatter`, regardless of whether the call originates from your code or from a dependency that you consume. | The affected APIs are obsolete as error, and calls from your code to those APIs will fail at compile time unless the error is suppressed. The runtime will *forbid* calls to `BinaryFormatter`, regardless of whether the call originates from your code or from a dependency that you consume. | The affected APIs are obsolete as error, and calls from your code to those APIs will fail at compile time unless the error is suppressed. The runtime will *allow* calls to `BinaryFormatter`, regardless of whether the call originates from your code or from a dependency that you consume. |

1Runtime policy is controlled by the app host. Calls into `BinaryFormatter` might still fail at runtime even if `<EnableUnsafeBinaryFormatterSerialization>` is set to `true` within your library's project file. Libraries can't override the app host's runtime policy.

2The Blazor and MAUI runtimes forbid calls to `BinaryFormatter`. Regardless of any value you set for `<EnableUnsafeBinaryFormatterSerialization>`, the calls will fail at runtime. Don't call these APIs from Blazor or MAUI applications or from libraries intended to be consumed by Blazor or MAUI apps.

## Affected APIs

- `System.Exception.SerializeObjectState`
- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*`
- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*`
- `System.Runtime.Serialization.Formatter.Serialize(System.IO.Stream,System.Object)`
- `System.Runtime.Serialization.Formatter.Deserialize(System.IO.Stream)`
- `System.Runtime.Serialization.IFormatter.Serialize(System.IO.Stream,System.Object)`
- `System.Runtime.Serialization.IFormatter.Deserialize(System.IO.Stream)`

## See also

- dotnet/runtime issue 72132
- BinaryFormatter serialization methods are obsolete (.NET 5)
- SerializationFormat.Binary is obsolete (.NET 7)
- BinaryFormatter disabled across most project types (.NET 8)
