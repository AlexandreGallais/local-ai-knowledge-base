---
title: "ArrayPool<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/ArrayPool`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArrayPool<T> class

Namespace: `System.Buffers`

```csharp
public abstract class ArrayPool<T>
```

Provides a resource pool that enables reusing instances of type T[].

Parameters:

- `T`: The type of the objects that are in the resource pool.

#### Remarks

Using the `ArrayPool<T>` class to rent and return buffers (using the `ArrayPool<T>.Rent` and `ArrayPool<T>.Return` methods) can improve performance in situations where arrays are created and destroyed frequently, resulting in significant memory pressure on the garbage collector.

## ArrayPool<T>.ArrayPool() constructor

```csharp
protected ArrayPool ();
```

Initializes a new instance of the `ArrayPool<T>` class.

#### Remarks

Note that this constructor is protected; it can only be called by classes derived from the `ArrayPool<T>` class.

## ArrayPool<T>.Shared property

```csharp
public static System.Buffers.ArrayPool<T> Shared { get; }
```

Gets a shared `ArrayPool<T>` instance.

Returns: A shared `ArrayPool<T>` instance.

#### Remarks

The shared pool provides a default implementation of the `ArrayPool<T>` class that's intended for general applicability. A shared class maintains arrays of multiple sizes, and may hand back a larger array than was actually requested, but it will never hand back a smaller array than was requested. Renting a buffer from a shared class using the `ArrayPool<T>.Rent` method will result in an existing buffer being taken from the pool if an appropriate buffer is available or in a new buffer being allocated if one is not available.

## ArrayPool<T>.Create() method

```csharp
public static System.Buffers.ArrayPool<T> Create ();
```

Creates a new instance of the `ArrayPool<T>` class.

Returns: A new instance of the `ArrayPool<T>` class.

## ArrayPool<T>.Create(Int32, Int32) method

```csharp
public static System.Buffers.ArrayPool<T> Create (int maxArrayLength, int maxArraysPerBucket);
```

Creates a new instance of the `ArrayPool<T>` class using the specified configuration.

Parameters:

- `maxArrayLength`: The maximum length of an array instance that may be stored in the pool.
- `maxArraysPerBucket`: The maximum number of array instances that may be stored in each bucket in the pool. The pool groups arrays of similar lengths into buckets for faster access.

Returns: A new instance of the `ArrayPool<T>` class with the specified configuration.

#### Remarks

The instance of the `ArrayPool<T>` class created by this method will group arrays into buckets, with no more than `maxArraysPerBucket` in each bucket, and with those arrays not exceeding `maxArrayLength` in length.

## ArrayPool<T>.Rent(Int32) method

```csharp
public abstract T[] Rent (int minimumLength);
```

Retrieves a buffer that is at least the requested length.

Parameters:

- `minimumLength`: The minimum length of the array.

Returns: An array of type T that is at least `minimumLength` in length.

#### Remarks

This buffer is loaned to the caller and should be returned to the same pool using the `ArrayPool<T>.Return` method, so that it can be reused in subsequent calls to the `ArrayPool<T>.Rent` method. Failure to return a rented buffer is not a fatal error. However, it may lead to decreased application performance, as the pool may need to create a new buffer to replace the lost one.

The array returned by this method may not be zero-initialized.

## ArrayPool<T>.Return(T[], Boolean) method

```csharp
public abstract void Return (T[] array, bool clearArray = false);
```

Returns an array to the pool that was previously obtained using the `ArrayPool<T>.Rent` method on the same `ArrayPool<T>` instance.

Parameters:

- `array`: A buffer to return to the pool that was previously obtained using the `ArrayPool<T>.Rent` method.
- `clearArray`: Indicates whether the contents of the buffer should be cleared before reuse. If `clearArray` is set to `true`, and if the pool will store the buffer to enable subsequent reuse, the `ArrayPool<T>.Return` method will clear the `array` of its contents so that a subsequent caller using the `ArrayPool<T>.Rent` method will not see the content of the previous caller. If `clearArray` is set to `false` or if the pool will release the buffer, the array's contents are left unchanged.

#### Remarks

Once a buffer has been returned to the pool, the caller gives up all ownership of the buffer and must not use it. The reference returned from a given call to the `ArrayPool<T>.Rent` method must only be returned using the `ArrayPool<T>.Return` method once. The default `ArrayPool<T>` may hold onto the returned buffer in order to rent it again, or it may release the returned buffer if it's determined that the pool already has enough buffers stored.

> **Important:**
> Returning the same array reference twice or continuing to use the array reference after it has been returned is a high-severity security issue. These actions can lead to double-free and use-after-free vulnerabilities, which might result in data corruption, data leaks, and denial of service.
