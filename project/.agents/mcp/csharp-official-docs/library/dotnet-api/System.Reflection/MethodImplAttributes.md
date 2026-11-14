---
title: "MethodImplAttributes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodImplAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodImplAttributes enum

Namespace: `System.Reflection`

```csharp
public enum MethodImplAttributes
```

Specifies flags for the attributes of a method implementation.

#### Remarks
The attributes are combined using the bitwise OR operation as follows:

**Code implementation masks:**

- `CodeTypeMask`
- `IL`
- `Native`
- `OPTIL`
- `Runtime`

**Managed masks:**

- `ManagedMask`
- `Unmanaged`
- `Managed`

**Implementation information and interop masks:**

- `ForwardRef`
- `PreserveSig`
- `InternalCall`
- `Synchronized`
- `NoInlining`
- `NoOptimization`
- `MaxMethodImplVal`
- `SecurityMitigations`

> **Note:**
>  Locking on the instance or on the type, as with the `Synchronized` flag, is not recommended for public types, because code other than your own can take locks on public types and instances. This might cause deadlocks or other synchronization problems.

## MethodImplAttributes.AggressiveInlining field

```csharp
AggressiveInlining
```

Specifies that the method should be inlined wherever possible.

## MethodImplAttributes.AggressiveOptimization field

```csharp
AggressiveOptimization
```

Specifies that the method should be optimized whenever possible.

## MethodImplAttributes.Async field

```csharp
Async
```

Specifies that the method uses runtime-managed asynchronous execution, where suspension and resumption are handled by the runtime rather than by a compiler-generated async state machine.

## MethodImplAttributes.CodeTypeMask field

```csharp
CodeTypeMask
```

Specifies flags about code type.

## MethodImplAttributes.ForwardRef field

```csharp
ForwardRef
```

Specifies that the method is not defined.

## MethodImplAttributes.IL field

```csharp
IL
```

Specifies that the method implementation is in Microsoft intermediate language (MSIL).

## MethodImplAttributes.InternalCall field

```csharp
InternalCall
```

Specifies an internal call.

## MethodImplAttributes.Managed field

```csharp
Managed
```

Specifies that the method is implemented in managed code.

## MethodImplAttributes.ManagedMask field

```csharp
ManagedMask
```

Specifies whether the method is implemented in managed or unmanaged code.

## MethodImplAttributes.MaxMethodImplVal field

```csharp
MaxMethodImplVal
```

Specifies a range check value.

## MethodImplAttributes.Native field

```csharp
Native
```

Specifies that the method implementation is native.

## MethodImplAttributes.NoInlining field

```csharp
NoInlining
```

Specifies that the method cannot be inlined.

## MethodImplAttributes.NoOptimization field

```csharp
NoOptimization
```

Specifies that the method is not optimized by the just-in-time (JIT) compiler or by native code generation (see Ngen.exe) when debugging possible code generation problems.

## MethodImplAttributes.OPTIL field

```csharp
OPTIL
```

Specifies that the method implementation is in Optimized Intermediate Language (OPTIL).

## MethodImplAttributes.PreserveSig field

```csharp
PreserveSig
```

Specifies that the method signature is exported exactly as declared.

## MethodImplAttributes.Runtime field

```csharp
Runtime
```

Specifies that the method implementation is provided by the runtime.

## MethodImplAttributes.Synchronized field

```csharp
Synchronized
```

Specifies that the method is single-threaded through the body. Static methods (`Shared` in Visual Basic) lock on the type, whereas instance methods lock on the instance. You can also use the C# lock statement or the Visual Basic <example-value> statement for this purpose.

## MethodImplAttributes.Unmanaged field

```csharp
Unmanaged
```

Specifies that the method is implemented in unmanaged code.
