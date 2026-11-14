---
title: "ImmutableCollectionsMarshal class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ImmutableCollectionsMarshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableCollectionsMarshal class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class ImmutableCollectionsMarshal
```

An unsafe class that provides a set of methods to access the underlying data representations of immutable collections.

To be added.

## ImmutableCollectionsMarshal.AsArray<T>(ImmutableArray<T>) method

```csharp
public static T[]? AsArray<T> (System.Collections.Immutable.ImmutableArray<T> array);
```

Gets the underlying `T` array for an input `ImmutableArray<T>` value.

Parameters:

- `T`: The type of elements in the input `ImmutableArray<T>` value.
- `array`: The input `ImmutableArray<T>` value to get the underlying `T` array from.

Returns: The underlying `T` array for `array`, if present.

When using this method, callers should make sure to not pass the resulting underlying array to methods that might mutate it. Doing so might cause undefined behavior in code paths using `array` that don't expect the contents of the `ImmutableArray<T>` value to change.

If `array` is uninitialized (that is, its `ImmutableArray<T>.IsDefault` property is `true`), the resulting `T` array will be `null`.

## ImmutableCollectionsMarshal.AsImmutableArray<T>(T[]) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> AsImmutableArray<T> (T[]? array);
```

Gets an `ImmutableArray<T>` value wrapping the input `T` array.

Parameters:

- `T`: The type of elements in the input array.
- `array`: The input array to wrap in the returned `ImmutableArray<T>` value.

Returns: An `ImmutableArray<T>` value wrapping `array`.

When using this method, callers should take extra care to ensure that they're the sole owners of the input array, and that it won't be modified once the returned `ImmutableArray<T>` value starts being used. Doing so might cause undefined behavior in code paths that don't expect the contents of a given `ImmutableArray<T>` values to change after its creation.

If `array` is `null`, the returned `ImmutableArray<T>` value will be uninitialized (that is, its `ImmutableArray<T>.IsDefault` property will be `true`).

## ImmutableCollectionsMarshal.AsMemory<T>(ImmutableArray<T>+Builder) method

```csharp
public static Memory<T> AsMemory<T> (System.Collections.Immutable.ImmutableArray<T>.Builder? builder);
```

To be added.

Parameters:

- `T`: To be added.
- `builder`: To be added.

Returns: To be added.

To be added.
