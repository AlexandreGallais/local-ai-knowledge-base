---
title: "Unsafe class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/Unsafe.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Unsafe class (part 4 of 4)

## Unsafe.Unbox<T>(Object) method

```csharp
public static ref T Unbox<T> (object box) where T : struct;
```

Returns a `mutable ref` to a boxed value.

Parameters:

- `T`: The type to be unboxed.
- `box`: The value to unbox.

Returns: A `mutable ref` to the boxed value `box`.

Exceptions:

- `NullReferenceException`: `box` is `null`, and `T` is a non-nullable value type.
- `InvalidCastException`: `box` is not a boxed value type.

-or-

`box` is not a boxed `T`.
- `TypeLoadException`: `T` cannot be found.

The `Unbox<T>` method is simply a wrapper for the IL unbox instruction. It is useful as a performance optimization. Whenever an API that takes an `Object` needs to be called repeatedly with different values of a value type, the same box object can be reused rather than a new one created each time.

The `Unbox<T>` method has an important usage constraint that is not enforced by language compilers and that is the responsibility of the caller. The IL `unbox` instruction returns a controlled-mutability managed pointer. Because .NET and .NET language compilers cannot represent this constraint, the `Unbox<T>` method returns a normal mutable `ref T`. However developers **must not** mutate the returned reference unless they are certain that `T` is a mutable struct type. For example, because the numeric primitives such as `Int32` are not mutable struct types, the following code is not suppported:

```csharp
// The following line is NOT SUPPORTED.
Unsafe.Unbox<int>(obj) = 30;
```

In contrast, a type such as `Point` is a mutable struct with public property setters, so mutating the boxed value by calling the property setters is supported:

```csharp
// The following lines are legal and supported.
Unsafe.Unbox<System.Drawing.Point>(obj).X = 50;
Unsafe.Unbox<System.Drawing.Point>(obj).Y = 70;
```

However, replacing the entire reference wholesale is not supported, even if the reference is to a mutable struct type.

```csharp
// Resetting the reference to default(T) is NOT SUPPORTED.
Unsafe.Unbox<System.Drawing.Point>(obj) = default(System.Drawing.Point);

// Setting the reference to a completely new value is NOT SUPPORTED.
Unsafe.Unbox<System.Drawing.Point>(obj) = new System.Drawing.Point(50, 70);
```

For more information, including detailed discussion of the usage constraints of this instruction, see sections III.1.8.1.2.2 ("Controlled-mutability managed pointers") and III.4.32 ("unbox -- convert boxed value type to its raw form") in ECMA-335: Common Language Infrastructure (CLI).

## Unsafe.Write<T>(Void*, T) method

```csharp
public static void Write<T> (void* destination, T value) where T : allows ref struct;
```

Writes a value of type `T` to the given location.

Parameters:

- `T`: The type of the value to write.
- `destination`: The location to write to.
- `value`: The value to write.

#### Remarks

> **Caution:**
> The caller must ensure that there are `SizeOf<T>()` bytes of writable memory available starting at the location pointed to by `destination`. Access violations may occur if this requirement is not met.

`destination` is assumed to be a properly aligned pointer to a value of type `T`. For more information on alignment assumptions, see ECMA-335, Sec. I.12.6.2 ("Alignment").

## Unsafe.WriteUnaligned<T>(Byte, T) method

```csharp
public static void WriteUnaligned<T> (ref byte destination, T value) where T : allows ref struct;
```

Writes a value of type `T` to the given location without assuming architecture dependent alignment of the destination address.

Parameters:

- `T`: The type of the value to write.
- `destination`: A managed pointer containing the address to write to.
- `value`: The value to write.

#### Remarks

> **Caution:**
> The caller must ensure that there are `SizeOf<T>()` bytes of writable memory available starting at the location pointed to by `destination`. Access violations may occur if this requirement is not met.

## Unsafe.WriteUnaligned<T>(Void*, T) method

```csharp
public static void WriteUnaligned<T> (void* destination, T value) where T : allows ref struct;
```

Writes a value of type `T` to the given location without assuming architecture dependent alignment of the destination address.

Parameters:

- `T`: The type of the value to write.
- `destination`: A managed pointer containing the address to write to.
- `value`: The value to write.

#### Remarks

> **Caution:**
> The caller must ensure that there are `SizeOf<T>()` bytes of writable memory available starting at the location pointed to by `destination`. Access violations may occur if this requirement is not met.
