---
title: "UnmanagedCallConvAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/UnmanagedCallConvAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnmanagedCallConvAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class UnmanagedCallConvAttribute : Attribute
```

Specifies the calling convention required to call P/Invoke methods implemented in unmanaged code.

#### Remarks

When this attribute is applied to a method with `DllImportAttribute`
where `CallingConvention` is either not set or set
to `Winapi`, the .NET runtime will use
`CallConvs` to determine the calling convention
of the P/Invoke.

This attribute is ignored if applied to a method without `DllImportAttribute`
or with `CallingConvention` set to something other than
`Winapi`.

#### Examples

The following examples declare P/Invokes using the `UnmanagedCallConvAttribute`
to specify the calling convention.

Using the `cdecl` calling convention:

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Attributes/UnmanagedCallConv.cs._
Using the `stdcall` calling convention:

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Attributes/UnmanagedCallConv.cs._
## UnmanagedCallConvAttribute.UnmanagedCallConvAttribute() constructor

```csharp
public UnmanagedCallConvAttribute ();
```

Initializes a new `UnmanagedCallConvAttribute` instance.

To be added.

## UnmanagedCallConvAttribute.CallConvs field

```csharp
public Type[]? CallConvs;
```

Optional. Types indicating calling conventions for the unmanaged target.

#### Remarks

If `null`, the runtime will use the default platform calling convention.
