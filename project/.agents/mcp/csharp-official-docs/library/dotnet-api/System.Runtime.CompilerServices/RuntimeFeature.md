---
title: "RuntimeFeature class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/RuntimeFeature.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeFeature class

Namespace: `System.Runtime.CompilerServices`

```csharp
public static class RuntimeFeature
```

Defines APIs to determine whether specific features are supported by the common language runtime.

To be added.

## RuntimeFeature.IsDynamicCodeCompiled property

```csharp
public static bool IsDynamicCodeCompiled { get; }
```

Gets a value that indicates whether the runtime compiles dynamic code.

Returns: `true` if the runtime compiles dynamic code; `false` if it doesn't compile dynamic code or doesn't know about this property.

To be added.

## RuntimeFeature.IsDynamicCodeSupported property

```csharp
public static bool IsDynamicCodeSupported { get; }
```

Gets a value that indicates whether the runtime supports dynamic code.

Returns: `true` if the runtime supports dynamic code; `false` if it doesn't support dynamic code or doesn't know about this property.

To be added.

## RuntimeFeature.IsMultithreadingSupported property

```csharp
public static bool IsMultithreadingSupported { get; }
```

To be added.

Returns: To be added.

To be added.

## RuntimeFeature.IsSupported(String) method

```csharp
public static bool IsSupported (string feature);
```

Determines whether a specified feature is supported by the common language runtime.

Parameters:

- `feature`: The name of the feature.

Returns: `true` if `feature` is supported; otherwise, `false`.

To be added.

## RuntimeFeature.ByRefFields field

```csharp
public const string ByRefFields;
```

Represents a runtime feature where types can define ref fields.

To be added.

## RuntimeFeature.ByRefLikeGenerics field

```csharp
public const string ByRefLikeGenerics;
```

Represents a runtime feature where byref-like types can be used in generic parameters.

To be added.

## RuntimeFeature.CovariantReturnsOfClasses field

```csharp
public const string CovariantReturnsOfClasses;
```

Represents a runtime feature where overriding methods can return more derived types than the method they override.

To be added.

## RuntimeFeature.DefaultImplementationsOfInterfaces field

```csharp
public const string DefaultImplementationsOfInterfaces;
```

Represents a runtime feature where interfaces can define default method implementations.

To be added.

## RuntimeFeature.NumericIntPtr field

```csharp
public const string NumericIntPtr;
```

Indicates that this version of the runtime supports `IntPtr` and `UIntPtr` as numeric types.

To be added.

## RuntimeFeature.PortablePdb field

```csharp
public const string PortablePdb;
```

Represents the portable PDB runtime feature.

To be added.

## RuntimeFeature.UnmanagedSignatureCallingConvention field

```csharp
public const string UnmanagedSignatureCallingConvention;
```

Represents a runtime feature where C# function pointers can be declared with an unmanaged calling convention.

To be added.

## RuntimeFeature.VirtualStaticsInInterfaces field

```csharp
public const string VirtualStaticsInInterfaces;
```

Indicates that this version of runtime supports virtual static members of interfaces.

To be added.
