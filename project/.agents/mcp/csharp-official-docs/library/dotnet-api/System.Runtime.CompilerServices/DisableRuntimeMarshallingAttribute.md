---
title: "DisableRuntimeMarshallingAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/DisableRuntimeMarshallingAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DisableRuntimeMarshallingAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class DisableRuntimeMarshallingAttribute : Attribute
```

Disables the built-in runtime managed/unmanaged marshalling subsystem for P/Invokes, Delegate types, and unmanaged function pointer invocations.

#### Remarks

The built-in marshalling subsystem has some behaviors that cannot be changed due to backward-compatibility requirements. This attribute allows disabling the built-in subsystem and instead uses the following rules for P/Invokes, Delegates, and unmanaged function pointer invocations:

- All value types that do not contain reference type fields recursively (`unmanaged` in C#) are blittable.
- Value types that recursively have any fields that have `[StructLayout(LayoutKind.Auto)]` are disallowed from interop.
- All reference types are disallowed from usage in interop scenarios.
- SetLastError support in P/Invokes is disabled.
- varargs support is disabled.
- LCIDConversionAttribute support is disabled.

## DisableRuntimeMarshallingAttribute.DisableRuntimeMarshallingAttribute() constructor

```csharp
public DisableRuntimeMarshallingAttribute ();
```

Initializes a `DisableRuntimeMarshallingAttribute` instance with default values.

To be added.
