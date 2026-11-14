---
title: "TensorMarshal class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TensorMarshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TensorMarshal class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class TensorMarshal
```

Provides methods to interoperate with `Tensor<T>`, `TensorSpan<T>`, and `ReadOnlyTensorSpan<T>`.

To be added.

## TensorMarshal.CreateReadOnlyTensorSpan<T>(T, IntPtr, IntPtr>, IntPtr>, Boolean) method

```csharp
public static System.Numerics.Tensors.ReadOnlyTensorSpan<T> CreateReadOnlyTensorSpan<T> (scoped ref readonly T data, IntPtr dataLength, scoped ReadOnlySpan<IntPtr> lengths, scoped ReadOnlySpan<IntPtr> strides, bool pinned);
```

Creates a new readonly tensor span over a portion of a regular managed object.

Parameters:

- `T`: The type of the data items.
- `data`: A readonly reference to data.
- `dataLength`: The number of `T` elements that `data` contains.
- `lengths`: The lengths of the dimensions. If an empty span is provided, the created tensor will have a single dimension that is the same length as `dataLength`.
- `strides`: The strides of each dimension. If an empty span is provided, then strides will be automatically calculated from `lengths`.
- `pinned`: `true` if `data` is permanently pinned; otherwise, `false`.

Returns: The created readonly tensor span.

This method should be used with caution. It is dangerous because the inputs may not be fully checked. Even though `data` is marked as `scoped`, it will be stored into the returned tensor span, and the lifetime of the returned tensor span will not be validated for safety, even by span-aware languages.

## TensorMarshal.CreateTensorSpan<T>(T, IntPtr, IntPtr>, IntPtr>, Boolean) method

```csharp
public static System.Numerics.Tensors.TensorSpan<T> CreateTensorSpan<T> (scoped ref T data, IntPtr dataLength, scoped ReadOnlySpan<IntPtr> lengths, scoped ReadOnlySpan<IntPtr> strides, bool pinned);
```

Creates a new tensor span over a portion of a regular managed object.

Parameters:

- `T`: The type of the data items.
- `data`: A reference to data.
- `dataLength`: The number of `T` elements that `data` contains.
- `lengths`: The lengths of the dimensions. If an empty span is provided, the created tensor will have a single dimension that is the same length as `dataLength`.
- `strides`: The strides of each dimension. If an empty span is provided, then strides will be automatically calculated from `lengths`.
- `pinned`: `true` if `data` is permanently pinned; otherwise, `false`.

Returns: The created tensor span.

This method should be used with caution. It is dangerous because the inputs may not be fully checked. Even though `data` is marked as `scoped`, it will be stored into the returned tensor span, and the lifetime of the returned tensor span will not be validated for safety, even by span-aware languages.

## TensorMarshal.GetReference<T>(ReadOnlyTensorSpan<T>) method

```csharp
public static ref readonly T GetReference<T> (in System.Numerics.Tensors.ReadOnlyTensorSpan<T> tensorSpan);
```

Returns a reference to the element of the readonly tensor span at index 0.

Parameters:

- `T`: The type of items in the readonly tensor span.
- `tensorSpan`: The readonly tensor span from which the reference is retrieved.

Returns: A readonly reference to the element at index 0.

If the readonly tensor span is empty, this method returns a reference to the location where the element at index 0 would have been stored. Such a reference may or may not be `null`. The returned reference can be used for pinning, but it must never be dereferenced.

## TensorMarshal.GetReference<T>(TensorSpan<T>) method

```csharp
public static ref T GetReference<T> (in System.Numerics.Tensors.TensorSpan<T> tensorSpan);
```

Returns a reference to the element of the tensor span at index 0.

Parameters:

- `T`: The type of items in the tensor span.
- `tensorSpan`: The tensor span from which the reference is retrieved.

Returns: A reference to the element at index 0.

If the tensor span is empty, this method returns a reference to the location where the element at index 0 would have been stored. Such a reference may or may not be `null`. The returned reference can be used for pinning, but it must never be dereferenced.
