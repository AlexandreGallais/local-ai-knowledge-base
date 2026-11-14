---
title: "Custom Marshaller Shapes - Value Marshallers (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/custom-marshaller-shapes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Custom Marshaller Shapes - Value Marshallers (part 2 of 3)

## Collection marshallers

This section describes the shapes of custom collection marshallers that the .NET interop source generator supports for marshalling collections between managed and unmanaged code. Contiguous collection marshallers are used for collections that are represented as a contiguous block of memory in their unmanaged representation, such as arrays or lists.

When the collection type being marshalled is a generic over its element type (for example, `List<T>`), the custom marshaller type will typically have two generic parameters: one for the managed element type and one for the unmanaged element type. In cases where the collection is not generic over its element type (for example, `StringCollection`), the marshaller might only have a single generic parameter for the unmanaged element type. The marshaller shape examples demonstrate a marshaller for a non-generic collection `TCollection` with elements of type `TManagedElement`. Since the elements might be marshalled using different value marshallers, it must be generic over the unmanaged element type, `TUnmanagedElement`. The native representation of the collection is called `TNative` (typically this is `*TUnmanagedElement`).

### Stateless managed to unmanaged

With this shape, the generator uses static methods to marshal a managed collection to unmanaged memory. The marshaller must provide methods to allocate the unmanaged container, access managed and unmanaged elements, and optionally free unmanaged resources.

```csharp
[CustomMarshaller(typeof(TCollection), MarshalMode.ManagedToUnmanagedIn, typeof(ManagedToNative))]
[CustomMarshaller(typeof(TCollection), MarshalMode.UnmanagedToManagedOut, typeof(ManagedToNative))]
[CustomMarshaller(typeof(TCollection), MarshalMode.ElementIn, typeof(ManagedToNative))]
[ContiguousCollectionMarshaller]
static class TMarshaller<TUnmanagedElement> where TUnmanagedElement : unmanaged
{
    public static class ManagedToNative
    {
        /// <summary>
        /// Gets the uninitialized unmanaged container for the elements and assigns the number of elements to numElements.
        /// The return value is later passed to GetUnmanagedValuesDestination.
        /// </summary>
        public static TNative AllocateContainerForUnmanagedElements(TCollection managed, out int numElements);

        /// <summary>
        /// Gets a span of managed elements in the collection.
        /// The elements in this span are marshalled by the element marshaller and put into the unmanaged container.
        /// </summary>
        public static ReadOnlySpan<TManagedElement> GetManagedValuesSource(TCollection managed);

        /// <summary>
        /// Gets a span of unmanaged elements from the TNative container.
        /// The elements in this span are filled with the marshalled values from the managed collection.
        /// </summary>
        public static Span<TUnmanagedElement> GetUnmanagedValuesDestination(TNative unmanaged, int numElements);

        /// <summary>
        /// Optional. Returns a pinnable reference to the unmanaged representations of the elements.
        /// TOther should be a dereferenced type of TNative.
        /// For example, if TNative is `int*`, then TOther should be `int`.
        /// </summary>
        public static ref TOther GetPinnableReference(TManaged managed);

        /// <summary>
        /// Optional. Frees unmanaged resources.
        /// Should not throw exceptions.
        /// </summary>
        public static void Free(TNative unmanaged);
    }
}
```

### Stateless managed to unmanaged with caller-allocated buffer

The generator allocates a buffer and passes it to the marshaller for use during marshalling.

```csharp
[CustomMarshaller(typeof(TCollection), MarshalMode.ManagedToUnmanagedIn, typeof(ManagedToNative))]
[CustomMarshaller(typeof(TCollection), MarshalMode.ElementIn, typeof(ManagedToNative))]
[ContiguousCollectionMarshaller]
static class TMarshaller<TUnmanagedElement> where TUnmanagedElement : unmanaged
{
    public static class ManagedToNative
    {
        /// <summary>
        /// The length of the buffer that will be allocated by the generated code and passed to AllocateContainerForUnmanagedElements.
        /// </summary>
        public static int BufferSize { get; }

        /// <summary>
        /// Creates the unmanaged container using a caller-allocated buffer, and assigns the number of elements in the collection to numElements.
        /// The return value is later passed to GetUnmanagedValuesDestination.
        /// </summary>
        public static TNative AllocateContainerForUnmanagedElements(TCollection managed, Span<TBuffer> buffer, out int numElements);

        /// <summary>
        /// Gets a span of managed elements in the collection.
        /// The elements in this span are marshalled by the element marshaller and put into the unmanaged container.
        /// </summary>
        public static ReadOnlySpan<TManagedElement> GetManagedValuesSource(TCollection managed);

        /// <summary>
        /// Gets a span of unmanaged elements from the TNative container.
        /// The elements in this span are filled with the marshalled values from the managed collection.
        /// </summary>
        public static Span<TUnmanagedElement> GetUnmanagedValuesDestination(TNative unmanaged, int numElements);

        /// <summary>
        /// Optional. Returns a pinnable reference to the unmanaged representations of the elements.
        /// TOther should be a dereferenced type of TNative.
        /// For example, if TNative is `int*`, then TOther should be `int`.
        /// </summary>
        public static ref TOther GetPinnableReference(TManaged managed);

        /// <summary>
        /// Optional. Frees unmanaged resources.
        /// Should not throw exceptions.
        /// </summary>
        public static void Free(TNative unmanaged);
    }
}
```

### Stateless unmanaged to managed

This shape marshals from unmanaged memory to a managed collection.

```csharp
[CustomMarshaller(typeof(TCollection), MarshalMode.ManagedToUnmanagedOut, typeof(NativeToManaged))]
[CustomMarshaller(typeof(TCollection), MarshalMode.UnmanagedToManagedIn, typeof(NativeToManaged))]
[CustomMarshaller(typeof(TCollection), MarshalMode.ElementOut, typeof(NativeToManaged))]
[ContiguousCollectionMarshaller]
static class TMarshaller<TUnmanagedElement> where TUnmanagedElement : unmanaged
{
    public static class NativeToManaged
    {
        /// <summary>
        /// Allocates a new collection for unmarshalling.
        /// May throw exceptions.
        /// </summary>
        public static TCollection AllocateContainerForManagedElements(TNative unmanaged, int numElements);

        /// <summary>
        /// Gets the destination span that unmarshalled managed elements will be written to.
        /// May throw exceptions.
        /// </summary>
        public static Span<TManagedElement> GetManagedValuesDestination(TCollection managed);

        /// <summary>
        /// Gets the source span of unmanaged elements to unmarshal from.
        /// May throw exceptions.
        /// </summary>
        public static ReadOnlySpan<TUnmanagedElement> GetUnmanagedValuesSource(TNative unmanaged, int numElements);

        /// <summary>
        /// Optional. Frees unmanaged resources.
        /// Should not throw exceptions.
        /// </summary>
        public static void Free(TNative unmanaged);
    }
}
```

### Stateless unmanaged to managed with guaranteed unmarshalling

The generator ensures that unmarshalling occurs even if a previous marshaller throws an exception.

```csharp
[CustomMarshaller(typeof(TCollection), MarshalMode.ManagedToUnmanagedOut, typeof(NativeToManaged))]
[ContiguousCollectionMarshaller]
static class TMarshaller<TUnmanagedElement> where TUnmanagedElement : unmanaged
{
    public static class NativeToManaged
    {
        /// <summary>
        /// Allocates the managed container for the elements.
        /// Should not throw exceptions other than OutOfMemoryException.
        /// </summary>
        public static TCollection AllocateContainerForManagedElementsFinally(TNative unmanaged, int numElements);

        /// <summary>
        /// Gets the destination span that unmarshalled managed elements will be written to.
        /// May throw exceptions.
        /// </summary>
        public static Span<TManagedElement> GetManagedValuesDestination(TCollection managed);

        /// <summary>
        /// Gets the source span of unmanaged elements to unmarshal from.
        /// May throw exceptions.
        /// </summary>
        public static ReadOnlySpan<TUnmanagedElement> GetUnmanagedValuesSource(TNative unmanaged, int numElements);

        /// <summary>
        /// Optional. Frees unmanaged resources.
        /// Should not throw exceptions.
        /// </summary>
        public static void Free(TNative unmanaged);
    }
}
```

### Stateless bidirectional

This shape supports both managed-to-unmanaged and unmanaged-to-managed conversions.

```csharp
[CustomMarshaller(typeof(TCollection), MarshalMode.ManagedToUnmanagedRef, typeof(Bidirectional))]
[CustomMarshaller(typeof(TCollection), MarshalMode.UnmanagedToManagedRef, typeof(Bidirectional))]
[CustomMarshaller(typeof(TCollection), MarshalMode.ElementRef, typeof(Bidirectional))]
[ContiguousCollectionMarshaller]
static class TMarshaller<TUnmanagedElement> where TUnmanagedElement : unmanaged
{
    public static class Bidirectional
    {
        // Include members from each of the following:
        // - One Stateless Managed->Unmanaged Linear Collection shape
        // - One Stateless Unmanaged->Managed Linear Collection shape
    }
}
```

### Stateful managed to unmanaged

This shape allows the marshaller to maintain state across the marshalling process.

```csharp
[CustomMarshaller(typeof(TCollection), MarshalMode.ManagedToUnmanagedIn, typeof(ManagedToNative))]
[CustomMarshaller(typeof(TCollection), MarshalMode.UnmanagedToManagedOut, typeof(ManagedToNative))]
[ContiguousCollectionMarshaller]
static class TMarshaller<TUnmanagedElement> where TUnmanagedElement : unmanaged
{
    public struct ManagedToNative // Can be ref struct
    {
        /// <summary>
        /// Optional constructor.
        /// May throw exceptions.
        /// </summary>
        public ManagedToNative(); // Optional, can throw exceptions.

        /// <summary>
        /// Takes a managed collection to be converted to an unmanaged representation in ToUnmanaged or GetPinnableReference.
        /// </summary>
        public void FromManaged(TCollection collection); // Can throw exceptions.

        /// <summary>
        /// Gets the source span of managed elements to marshal.
        /// May throw exceptions.
        /// </summary>
        public ReadOnlySpan<TManagedElement> GetManagedValuesSource(); // Can throw exceptions.

        /// <summary>
        /// Gets the destination span of unmanaged elements to marshal to.
        /// May throw exceptions.
        /// </summary>
        public Span<TUnmanagedElement> GetUnmanagedValuesDestination(); // Can throw exceptions.

        /// <summary>
        /// Optional.
        /// Gets a pinnable reference to the unmanaged representation.
        /// The reference will be pinned and passed as a pointer to the native code.
        /// TOther should be a dereferenced type of TNative.
        /// For example, if TNative is `int*`, then TOther should be `int`.
        /// When applicable, this method is preferred to ToUnmanaged for marshalling.
        /// May throw exceptions.
        /// </summary>
        public ref TOther GetPinnableReference(); // Optional. Can throw exceptions.

        /// <summary>
        /// Optional.
        /// Gets a pinnable reference to the unmanaged representation.
        /// The reference will be pinned and passed as a pointer to the native code.
        /// TOther should be a dereferenced type of TNative.
        /// For example, if TNative is `int*`, then TOther should be `int`.
        /// When applicable, this method is preferred to the instance version and ToUnmanaged for marshalling.
        /// May throw exceptions.
        /// </summary>
        public static ref TOther GetPinnableReference(TCollection collection); // Optional. Can throw exceptions. Result pinnned and passed to Invoke.

        /// <summary>
        /// Converts the managed collection to an unmanaged representation.
        /// May throw exceptions.
        /// </summary>
        public TNative ToUnmanaged(); // Can throw exceptions.

        /// <summary>
        /// Optional.
        /// In managed to unmanaged stubs, this method is called after call to the unmanaged code.
        /// Must not throw exceptions.
        /// </summary>
        public void OnInvoked(); // Optional. Should not throw exceptions.
    }
}
```
