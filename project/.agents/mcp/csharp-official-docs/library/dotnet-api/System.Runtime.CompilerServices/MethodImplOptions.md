---
title: "MethodImplOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/MethodImplOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodImplOptions enum

Namespace: `System.Runtime.CompilerServices`

```csharp
public enum MethodImplOptions
```

Specifies constants that define the details of how a method is implemented.

#### Remarks
This enumeration is used with the `MethodImplAttribute` attribute.

You can specify multiple `MethodImplOptions` values by using the bitwise OR operator.

> **Note:**
> Locking on the instance or on the type, as with the `Synchronized` flag, is not recommended for public types, because code other than your own can take locks on public types and instances. This might cause deadlocks or other synchronization problems.

## MethodImplOptions.AggressiveInlining field

```csharp
AggressiveInlining
```

The method should be inlined if possible.

Unnecessary use of this attribute can reduce performance. The attribute might cause implementation limits to be encountered that will result in slower generated code. Always measure performance to ensure it's helpful to apply this attribute.

## MethodImplOptions.AggressiveOptimization field

```csharp
AggressiveOptimization
```

The method contains code that should always be optimized for performance.

It's rarely appropriate to use this attribute. Methods that apply this attribute bypass the first tier of tiered compilation and therefore don't benefit from optimizations that rely on tiered compilation. Those optimizations include dynamic PGO and optimizations based on initialized classes. Use of this attribute might also increase memory use. Always measure performance to ensure it's helpful to apply this attribute.

## MethodImplOptions.Async field

```csharp
Async
```

Specifies that the method uses runtime-managed asynchronous execution, where suspension and resumption are handled by the runtime rather than by a compiler-generated async state machine.

The C# compiler applies this flag internally; you can't specify it explicitly in C#.

## MethodImplOptions.ForwardRef field

```csharp
ForwardRef
```

The method is declared, but its implementation is provided elsewhere.

## MethodImplOptions.InternalCall field

```csharp
InternalCall
```

The call is internal, that is, it calls a method that's implemented within the common language runtime.

## MethodImplOptions.NoInlining field

```csharp
NoInlining
```

The method cannot be inlined. Inlining is an optimization by which a method call is replaced with the method body.

## MethodImplOptions.NoOptimization field

```csharp
NoOptimization
```

The method is not optimized by the just-in-time (JIT) compiler or by native code generation (see Ngen.exe) when debugging possible code generation problems.

## MethodImplOptions.PreserveSig field

```csharp
PreserveSig
```

The method signature is exported exactly as declared.

## MethodImplOptions.Synchronized field

```csharp
Synchronized
```

The method can be executed by only one thread at a time. Static methods lock on the type, whereas instance methods lock on the instance. Only one thread can execute in any of the instance functions, and only one thread can execute in any of a class's static functions.

## MethodImplOptions.Unmanaged field

```csharp
Unmanaged
```

The method is implemented in unmanaged code.
