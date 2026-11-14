---
title: "Custom Marshaller Shapes - Value Marshallers (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/custom-marshaller-shapes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Custom marshaller shapes

This article describes the different "shapes" of custom marshallers that can be used with the .NET interop source generator.

## Value marshallers

This section describes the shapes of custom marshallers that can be used by the .NET interop source generator for marshalling value types between managed and unmanaged code.

### Stateless managed to unmanaged

With this shape, the generated code calls `ConvertToUnmanaged` to marshal a value to native code, or `GetPinnableReference` when applicable. The generated code calls `Free` when applicable to allow the marshaller to free any unmanaged resources associated with the managed type once its lifetime ends.

```csharp
[CustomMarshaller(typeof(TManaged), MarshalMode.ManagedToUnmanagedIn, typeof(ManagedToNative))]
[CustomMarshaller(typeof(TManaged), MarshalMode.UnmanagedToManagedOut, typeof(ManagedToNative))]
static class TMarshaller
{
    public static class ManagedToNative
    {
        /// <summary>
        /// Converts a managed type to an unmanaged representation. May throw exceptions.
        /// </summary>
        public static TNative ConvertToUnmanaged(TManaged managed);

        /// <summary>
        /// Optional.
        /// Returns a pinnable reference to the unmanaged representation.
        /// The reference will be pinned and passed as a pointer to the native code.
        /// TOther should be a dereferenced type of TNative.
        /// For example, if TNative is `int*`, then TOther should be `int`.
        /// </summary>
        public static ref TNativeDereferenced GetPinnableReference(TManaged managed);

        /// <summary>
        /// Optional.
        /// Frees any unmanaged resources associated with the marshalling of the managed type.
        /// Must not throw exceptions.
        /// </summary>
        public static void Free(TNative unmanaged);
    }
}
```

### Stateless managed to unmanaged with caller-allocated buffer

With this shape, the generator will allocate a buffer of the specified size and pass it to the `ConvertToUnmanaged` method to marshal a value to native code. The generated code handles the lifetime of this buffer.

```csharp
[CustomMarshaller(typeof(TManaged), MarshalMode.ManagedToUnmanagedIn, typeof(ManagedToNative))]
[CustomMarshaller(typeof(TManaged), MarshalMode.UnmanagedToManagedOut, typeof(ManagedToNative))]
static class TMarshaller
{
    public static class ManagedToNative
    {
        /// <summary>
        /// The size of the buffer that will be allocated by the generator.
        /// </summary>
        public static int BufferSize { get; }

        /// <summary>
        /// Converts a managed type to an unmanaged representation using a caller-allocated buffer.
        /// </summary>
        public static TNative ConvertToUnmanaged(TManaged managed, Span<byte> callerAllocatedBuffer);

        /// <summary>
        /// Optional.
        /// Frees any unmanaged resources associated with the marshalling of the managed type.
        /// Must not throw exceptions.
        /// </summary>
        public static void Free(TNative unmanaged);
    }
}
```

### Stateless unmanaged to managed

```csharp
[CustomMarshaller(typeof(TManaged), MarshalMode.ManagedToUnmanagedOut, typeof(NativeToManaged))]
[CustomMarshaller(typeof(TManaged), MarshalMode.UnmanagedToManagedIn, typeof(NativeToManaged))]
static class TMarshaller
{
    public static class NativeToManaged
    {
        /// <summary>
        /// Converts an unmanaged representation to a managed type. May throw exceptions.
        /// </summary>
        public static TManaged ConvertToManaged(TNative unmanaged);

        /// <summary>
        /// Optional.
        /// Frees any unmanaged resources associated with the marshalling of the managed type.
        /// Must not throw exceptions.
        /// </summary>
        public static void Free(TNative unmanaged);
    }
}
```

### Stateless unmanaged to managed with guaranteed unmarshalling

This shape directs the generator to emit the unmarshaling code in a way that guarantees the unmarshaling will be called, even if a previous marshaller throws an exception. This is useful for types that need to be cleaned up or finalized regardless of the success of the previous operations.

```csharp
[CustomMarshaller(typeof(TManaged), MarshalMode.ManagedToUnmanagedOut, typeof(NativeToManaged))]
[CustomMarshaller(typeof(TManaged), MarshalMode.UnmanagedToManagedIn, typeof(NativeToManaged))]
static class TMarshaller
{
    public static class NativeToManaged
    {
        /// <summary>
        /// Converts an unmanaged representation to a managed type.
        /// Should not throw exceptions.
        /// </summary>
        public static TManaged ConvertToManagedFinally(TNative unmanaged);

        /// <summary>
        /// Optional.
        /// Frees any unmanaged resources associated with the marshalling of the managed type.
        /// Must not throw exceptions.
        /// </summary>
        public static void Free(TNative unmanaged);
    }
}
```

### Stateless bidirectional

This shape allows for both managed to unmanaged and unmanaged to managed conversions, with the marshaller being stateless. The generator will use the `ConvertToUnmanaged` method for managed to unmanaged conversions and the `ConvertToManaged` method for unmanaged to managed conversions.

```csharp
[CustomMarshaller(typeof(TManaged<,,,...>), MarshalMode.ManagedToUnmanagedRef, typeof(Bidirectional))]
[CustomMarshaller(typeof(TManaged<,,,...>), MarshalMode.UnmanagedToManagedRef, typeof(Bidirectional))]
[CustomMarshaller(typeof(TManaged<,,,...>), MarshalMode.ElementRef, typeof(Bidirectional))]
static class TMarshaller<T, U, V...>
{
    public static class Bidirectional
    {
        // Include members from each of the following:
        // - One Stateless Managed->Unmanaged Value shape
        // - One Stateless Unmanaged->Managed Value shape
    }
}
```

### Stateful managed to unmanaged

This shape allows for stateful marshalling from managed to unmanaged. The generated code will use a unique marshaller instance for each parameter, so the marshaller can maintain state across marshalling

```csharp
[CustomMarshaller(typeof(TManaged), MarshalMode.ManagedToUnmanagedIn, typeof(ManagedToNative))]
[CustomMarshaller(typeof(TManaged), MarshalMode.UnmanagedToManagedOut, typeof(ManagedToNative))]
static class TMarshaller
{
    public struct ManagedToNative // Can be ref struct
    {
        /// <summary>
        /// Optional constructor.
        /// May throw exceptions.
        /// </summary>
        public ManagedToNative();

        /// <summary>
        /// Takes a managed type to be converted to an unmanaged representation in ToUnmanaged or GetPinnableReference.
        /// </summary>
        public void FromManaged(TManaged managed);

        /// <summary>
        /// Optional.
        /// Returns a pinnable reference to the unmanaged representation.
        /// The reference will be pinned and passed as a pointer to the native code.
        /// TOther should be a dereferenced type of TNative.
        /// For example, if TNative is `int*`, then TOther should be `int`.
        /// When applicable, this method is preferred to ToUnmanaged for marshalling.
        /// </summary>
        public ref TIgnored GetPinnableReference();

        /// <summary>
        /// Optional.
        /// Returns a pinnable reference to the unmanaged representation.
        /// The reference will be pinned and passed as a pointer to the native code.
        /// TOther should be a dereferenced type of TNative.
        /// For example, if TNative is `int*`, then TOther should be `int`.
        /// When applicable, only this method is called for the marshalling step.
        /// May throw exceptions.
        /// </summary>
        public static ref TOther GetPinnableReference(TManaged managed);

        /// <summary>
        /// Converts the managed type to an unmanaged representation.
        /// May throw exceptions.
        /// </summary>
        public TNative ToUnmanaged();

        /// <summary>
        /// Optional.
        /// In managed to unmanaged stubs, this method is called after call to the unmanaged code.
        /// Must not throw exceptions.
        /// </summary>
        public void OnInvoked();

        /// <summary>
        /// Optional.
        /// Frees any unmanaged resources associated with the marshalling of the managed type.
        /// Must not throw exceptions.
        /// </summary>
        public void Free();
    }
}
```

### Stateful managed to unmanaged with caller-allocated buffer

This shape allows for stateful marshalling from managed to unmanaged, with the generator allocating a buffer of the specified size and passing it to the `FromManaged` method. The generated code will use a unique marshaller instance for each parameter, so the marshaller can maintain state across marshalling.

```csharp
[CustomMarshaller(typeof(TManaged), MarshalMode.ManagedToUnmanagedIn, typeof(ManagedToNative))]
[CustomMarshaller(typeof(TManaged), MarshalMode.UnmanagedToManagedOut, typeof(ManagedToNative))]
static class TMarshaller
{
    public struct ManagedToNative // Can be ref struct
    {
        /// <summary>
        /// The length of the buffer that will be allocated by the generator.
        /// </summary>
        public static int BufferSize { get; }

        /// <summary>
        /// Optional constructor.
        /// May throw exceptions.
        /// </summary>
        public ManagedToNative();

        /// <summary>
        /// Takes a managed type to be converted to an unmanaged representation in ToUnmanaged or GetPinnableReference.
        /// May throw exceptions.
        /// </summary>
        public void FromManaged(TManaged managed, Span<TBuffer> buffer);

        /// <summary>
        /// Optional.
        /// Returns a pinnable reference to the unmanaged representation.
        /// The reference will be pinned and passed as a pointer to the native code.
        /// TOther should be a dereferenced type of TNative.
        /// For example, if TNative is `int*`, then TOther should be `int`.
        /// When applicable, this method is preferred to ToUnmanaged for marshalling.
        /// </summary>
        public ref TIgnored GetPinnableReference();

        /// <summary>
        /// Optional.
        /// Returns a pinnable reference to the unmanaged representation.
        /// The reference will be pinned and passed as a pointer to the native code.
        /// TOther should be a dereferenced type of TNative.
        /// For example, if TNative is `int*`, then TOther should be `int`.
        /// When applicable, only this method is called for the marshalling step.
        /// May throw exceptions.
        public static ref TOther GetPinnableReference(TManaged managed);

        /// <summary>
        /// Returns the unmanaged representation of the managed value.
        /// May throw exceptions.
        /// </summary>
        public TNative ToUnmanaged();

        /// <summary>
        /// Optional.
        /// In managed to unmanaged stubs, this method is called after call to the unmanaged code.
        /// Must not throw exceptions.
        /// </summary>
        public void OnInvoked();

        /// <summary>
        /// Optional.
        /// Frees any unmanaged resources associated with the marshalling of the managed type.
        /// Must not throw exceptions.
        /// </summary>
        public void Free();
    }
}
```

### Stateful unmanaged to managed

This shape allows for stateful unmarshalling from unmanaged to managed. The generated code will use a unique instance for each parameter, so the struct can maintain state across unmarshalling.

```csharp
[CustomMarshaller(typeof(TManaged), MarshalMode.ManagedToUnmanagedOut, typeof(NativeToManaged))]
[CustomMarshaller(typeof(TManaged), MarshalMode.UnmanagedToManagedIn, typeof(NativeToManaged))]
static class TMarshaller
{
    public struct NativeToManaged // Can be ref struct
    {
        /// <summary>
        /// Optional constructor.
        /// May throw exceptions.
        /// </summary>
        public NativeToManaged();

        /// <summary>
        /// Takes an unmanaged representation to be converted to a managed type in ToManaged.
        /// Should not throw exceptions.
        /// </summary>
        public void FromUnmanaged(TNative unmanaged);

        /// <summary>
        /// Returns the managed value representation of the unmanaged value.
        /// May throw exceptions.
        /// </summary>
        public TManaged ToManaged();

        /// <summary>
        /// Optional.
        /// Frees any unmanaged resources associated with the unmarshalling of the managed type.
        /// Must not throw exceptions.
        /// </summary>
        public void Free();
    }
}
```

### Stateful unmanaged to managed with guaranteed unmarshalling

This shape allows for stateful unmarshalling from unmanaged to managed, with the generator ensuring that the `ToManagedFinally` method is called even if a previous marshaller throws an exception. This is useful for types that need to be cleaned up or finalized regardless of the success of the previous operations.

```csharp
[CustomMarshaller(typeof(TManaged), MarshalMode.ManagedToUnmanagedOut, typeof(NativeToManaged))]
[CustomMarshaller(typeof(TManaged), MarshalMode.UnmanagedToManagedIn, typeof(NativeToManaged))]
static class TMarshaller
{
    public struct NativeToManaged // Can be ref struct
    {
        /// <summary>
        /// Optional constructor.
        /// May throw exceptions.
        /// </summary>
        public NativeToManaged();

        /// <summary>
        /// Takes an unmanaged representation to be converted to a managed type in ToManagedFinally.
        /// Should not throw exceptions.
        /// </summary>
        public void FromUnmanaged(TNative unmanaged);

        /// <summary>
        /// Returns the managed value representation of the unmanaged value.
        /// Should not throw exceptions.
        /// </summary>
        public TManaged ToManagedFinally();

        /// <summary>
        /// Optional.
        /// Frees any unmanaged resources associated with the unmarshalling of the managed type.
        /// Must not throw exceptions.
        /// </summary>
        public void Free();
    }
}
```

### Stateful bidirectional

```csharp
[CustomMarshaller(typeof(TManaged), MarshalMode.ManagedToUnmanagedRef, typeof(Bidirectional))]
[CustomMarshaller(typeof(TManaged), MarshalMode.UnmanagedToManagedRef, typeof(Bidirectional))]
static class TMarshaller
{
    public struct Bidirectional // Can be ref struct
    {
        // Include members from each of the following:
        // - One Stateful Managed->Unmanaged Value shape
        // - One Stateful Unmanaged->Managed Value shape
    }
}
```
