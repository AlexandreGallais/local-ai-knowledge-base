---
title: "Custom Marshaller Shapes - Value Marshallers (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/custom-marshaller-shapes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Custom Marshaller Shapes - Value Marshallers (part 3 of 3)

### Stateful managed to unmanaged with caller-allocated buffer

```csharp
[CustomMarshaller(typeof(TCollection), MarshalMode.ManagedToUnmanagedIn, typeof(ManagedToNative))]
[ContiguousCollectionMarshaller]
static class TMarshaller<TUnmanagedElement> where TUnmanagedElement : unmanaged
{
    public struct ManagedToNative // Can be ref struct
    {
        /// <summary>
        /// The length of the buffer that will be allocated by the generated code and passed to FromManaged.
        /// </summary>
        public static int BufferSize { get; }

        /// <summary>
        /// Optional constructor.
        /// May throw exceptions.
        /// </summary>
        public ManagedToNative();

        /// <summary>
        /// Takes a managed collection to be converted to an unmanaged representation in ToUnmanaged or GetPinnableReference.
        /// The caller-allocated buffer is passed to this method.
        /// </summary>
        public void FromManaged(TCollection collection, Span<TBuffer> buffer);

        /// <summary>
        /// Gets the source span of managed elements to marshal.
        /// May throw exceptions.
        /// </summary>
        public ReadOnlySpan<TManagedElement> GetManagedValuesSource();

        /// <summary>
        /// Gets the destination span of unmanaged elements to marshal to.
        /// May throw exceptions.
        /// </summary>
        public Span<TUnmanagedElement> GetUnmanagedValuesDestination();

        /// <summary>
        /// Optional.
        /// Gets a pinnable reference to the unmanaged representation.
        /// The reference will be pinned and passed as a pointer to the native code.
        /// TOther should be a dereferenced type of TNative.
        /// For example, if TNative is `int*`, then TOther should be `int`.
        /// When applicable, this method is preferred to ToUnmanaged for marshalling.
        /// May throw exceptions.
        /// </summary>
        public ref TOther GetPinnableReference();

        /// <summary>
        /// Optional.
        /// Gets a pinnable reference to the unmanaged representation.
        /// The reference will be pinned and passed as a pointer to the native code.
        /// TOther should be a dereferenced type of TNative.
        /// For example, if TNative is `int*`, then TOther should be `int`.
        /// When applicable, this method is preferred to the instance GetPinnableReference and ToUnmanaged for marshalling.
        /// May throw exceptions.
        /// </summary>
        public static ref TOther GetPinnableReference(TCollection collection);

        /// <summary>
        /// Converts the managed collection to an unmanaged representation.
        /// May throw exceptions.
        /// </summary>
        public TNative ToUnmanaged();

        /// <summary>
        /// Optional.
        /// In managed to unmanaged stubs, this method is called after call to the unmanaged code.
        /// Must not throw exceptions.
        /// </summary>
        public void OnInvoked();
    }
}
```

### Stateful unmanaged to managed

This shape allows the marshaller to maintain state across the unmarshalling process.

```csharp
[CustomMarshaller(typeof(TCollection), MarshalMode.ManagedToUnmanagedOut, typeof(NativeToManaged))]
[CustomMarshaller(typeof(TCollection), MarshalMode.UnmanagedToManagedIn, typeof(NativeToManaged))]
[ContiguousCollectionMarshaller]
static class TMarshaller<TUnmanagedElement> where TUnmanagedElement : unmanaged
{
    public struct NativeToManaged // Can be ref struct
    {
        /// <summary>
        /// Optional constructor.
        /// May throw exceptions.
        /// </summary>
        public NativeToManaged();

        /// <summary>
        /// Takes an unmanaged collection to be converted to a managed representation in ToManaged.
        /// Should not throw exceptions.
        /// </summary>
        public void FromUnmanaged(TNative value);

        /// <summary>
        /// Gets the source span of unmanaged elements to unmarshal from.
        /// May throw exceptions.
        /// </summary>
        public ReadOnlySpan<TUnmanagedElement> GetUnmanagedValuesSource(int numElements);

        /// <summary>
        /// Gets the destination span that unmarshalled managed elements will be written to.
        /// May throw exceptions.
        /// </summary>
        public Span<TManagedElement> GetManagedValuesDestination(int numElements);

        /// <summary>
        /// Returns the managed value representation of the unmanaged value.
        /// May throw exceptions.
        /// </summary>
        public TCollection ToManaged();

        /// <summary>
        /// Optional. Should not throw exceptions.
        /// </summary>
        public void Free();
    }
}
```

### Stateful unmanaged to managed with guaranteed unmarshalling

```csharp
[CustomMarshaller(typeof(TCollection), MarshalMode.ManagedToUnmanagedOut, typeof(NativeToManaged))]
[ContiguousCollectionMarshaller]
static class TMarshaller<TUnmanagedElement> where TUnmanagedElement : unmanaged
{
    public struct NativeToManaged // Can be ref struct
    {
        /// <summary>
        /// Optional constructor.
        /// May throw exceptions.
        /// </summary>
        public NativeToManaged(); // Optional, can throw exceptions.

        /// <summary>
        /// Takes an unmanaged collection to be converted to a managed representation in ToManagedFinally.
        /// Should not throw exceptions.
        /// </summary>
        public void FromUnmanaged(TNative value);

        /// <summary>
        /// Gets the source span of unmanaged elements to unmarshal from.
        /// May throw exceptions.
        /// </summary>
        public ReadOnlySpan<TUnmanagedElement> GetUnmanagedValuesSource(int numElements);

        /// <summary>
        /// Gets the destination span that unmarshalled managed elements will be written to.
        /// May throw exceptions.
        /// </summary>
        public Span<TManagedElement> GetManagedValuesDestination(int numElements);

        /// <summary>
        /// Returns the managed value representation of the unmanaged value.
        /// Should not throw exceptions.
        /// </summary>
        public TCollection ToManagedFinally();

        /// <summary>
        /// Optional. Should not throw exceptions.
        /// </summary>
        public void Free();
    }
}
```

### Stateful bidirectional

```csharp
[CustomMarshaller(typeof(TCollection), MarshalMode.ManagedToUnmanagedRef, typeof(Bidirectional))]
[CustomMarshaller(typeof(TCollection), MarshalMode.UnmanagedToManagedRef, typeof(Bidirectional))]
[ContiguousCollectionMarshaller]
static class TMarshaller<TUnmanagedElement> where TUnmanagedElement : unmanaged
{
    public struct Bidirectional // Can be ref struct
    {
        // Include members from each of the following:
        // - One Stateful Managed->Unmanaged Contiguous Collection shape
        // - One Stateful Unmanaged->Managed Contiguous Collection shape
    }
}
```
