---
title: "UnmanagedCallersOnlyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/UnmanagedCallersOnlyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnmanagedCallersOnlyAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class UnmanagedCallersOnlyAttribute : Attribute
```

Any method marked with `UnmanagedCallersOnlyAttribute` can be directly called from native code. The function token can be loaded to a local variable using the address-of operator in C# and passed as a callback to a native method.

#### Remarks

Methods marked with this attribute have the following restrictions:

* Must be marked `static`.
* Must not be called from managed code.
* Must only have blittable arguments.
* Must not have generic type parameters or be contained within a generic class.

#### Examples

The following example demonstrates passing a callback marked `UnmanagedCallersOnlyAttribute`
to a native function.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Attributes/UnmanagedCallersOnly.cs._
## UnmanagedCallersOnlyAttribute.UnmanagedCallersOnlyAttribute() constructor

```csharp
public UnmanagedCallersOnlyAttribute ();
```

Initializes a new `UnmanagedCallersOnlyAttribute` instance.

To be added.

## UnmanagedCallersOnlyAttribute.AssociatedSourceType field

```csharp
public Type? AssociatedSourceType;
```

To be added.

To be added.

## UnmanagedCallersOnlyAttribute.CallConvs field

```csharp
public Type[]? CallConvs;
```

Optional. If omitted, the runtime will use the default platform calling convention.

#### Remarks

Supplied types must be from the official `CompilerServices` namespace and be of the form `CallConvXXX`.

## UnmanagedCallersOnlyAttribute.EntryPoint field

```csharp
public string? EntryPoint;
```

Optional. If omitted, no named export is emitted during compilation.

#### Remarks

The export name must be a valid identifier for a native symbol on the target platform. The identifier must not conflict with system-provided native identifiers (for example, names of methods in the C standard library, or POSIX/Win32 API names).
To avoid name collisions of native symbols, it's common to use a prefix. For example, you can name the exported functions `mylibrary_free`, `mylibrary_isdigit`, and `mylibrary_copy` to avoid name collisions.

Target-dependent name mangling is performed on the symbol name, such as prepending or appending `_` or `@` characters to distinguish calling conventions on x86 Windows.
