---
title: "LazyThreadSafetyMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/LazyThreadSafetyMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LazyThreadSafetyMode enum

Namespace: `System.Threading`

```csharp
public enum LazyThreadSafetyMode
```

Specifies how a `Lazy<T>` instance synchronizes access among multiple threads.

#### Remarks
Use this enumeration to specify the `mode` parameter of `Lazy<T>` constructors. The effects of all constructors on thread synchronization can be described in terms of this enumeration, whether or not they have `mode` parameters.

A `Lazy<T>` instance is initialized either by a user-specified initialization method or by the parameterless constructor for `T`. The initialization method is specified by the `valueFactory` parameter of a `Lazy<T>` constructor. The method returns an instance of `T`, which is the type that is lazily instantiated by the instance of `Lazy<T>`. If a constructor does not have a `valueFactory` parameter, the parameterless constructor for `T` is used to initialize the `Lazy<T>` instance. In either case, initialization occurs the first time you call the `Value` property.

In addition to specifying the thread safety of a `Lazy<T>` instance, this enumeration affects exception caching. When exceptions are cached for a `Lazy<T>` instance, you get only one chance to initialize the instance. If an exception is thrown the first time you call the `Value` property, that exception is cached and rethrown on all subsequent calls to the `Value` property. The advantage of caching exceptions is that any two threads always get the same result, even when errors occur.

When you specify the PublicationOnly mode, exceptions are never cached. When you specify None or ExecutionAndPublication, caching depends on whether you specify an initialization method or allow the parameterless constructor for `T` to be used. Specifying an initialization method enables exception caching for these two modes. The initialization method can be very simple. For example, it might call the parameterless constructor for `T`: `new Lazy<Contents>(() => new Contents(), mode)` in C#, or `New Lazy(Of Contents)(Function() New Contents())` in Visual Basic. If you use a constructor that does not specify an initialization method, exceptions that are thrown by the parameterless constructor for `T` are not cached. The following table summarizes exception caching behavior.

|Mode|Using initialization method|Using parameterless constructor for `T`|
|----------|---------------------------------|---------------------------------------|
|None|Cached|Not cached|
|PublicationOnly|Not cached|Not cached|
|ExecutionAndPublication|Cached|Not cached|

## LazyThreadSafetyMode.ExecutionAndPublication field

```csharp
ExecutionAndPublication
```

Locks are used to ensure that only a single thread can initialize a `Lazy<T>` instance in a thread-safe manner. Effectively, the initialization method is executed in a thread-safe manner (referred to as `Execution` in the field name). `Publication` of the initialized value is also thread-safe in the sense that only one value may be published and used by all threads. If the initialization method (or the parameterless constructor, if there is no initialization method) uses locks internally, deadlocks can occur. If you use a `Lazy<T>` constructor that specifies an initialization method (`valueFactory` parameter), and if that initialization method throws an exception (or fails to handle an exception) the first time you call the `Lazy<T>.Value` property, then the exception is cached and thrown again on subsequent calls to the `Lazy<T>.Value` property. If you use a `Lazy<T>` constructor that does not specify an initialization method, exceptions that are thrown by the parameterless constructor for `T` are not cached. In that case, a subsequent call to the `Lazy<T>.Value` property might successfully initialize the `Lazy<T>` instance. If the initialization method recursively accesses the `Lazy<T>.Value` property of the `Lazy<T>` instance, an `InvalidOperationException` is thrown.

## LazyThreadSafetyMode.None field

```csharp
None
```

The `Lazy<T>` instance is not thread safe; if the instance is accessed from multiple threads, its behavior is undefined. Use this mode only when high performance is crucial and the `Lazy<T>` instance is guaranteed never to be initialized from more than one thread. If you use a `Lazy<T>` constructor that specifies an initialization method (`valueFactory` parameter), and if that initialization method throws an exception (or fails to handle an exception) the first time you call the `Lazy<T>.Value` property, then the exception is cached and thrown again on subsequent calls to the `Lazy<T>.Value` property. If you use a `Lazy<T>` constructor that does not specify an initialization method, exceptions that are thrown by the parameterless constructor for `T` are not cached. In that case, a subsequent call to the `Lazy<T>.Value` property might successfully initialize the `Lazy<T>` instance. If the initialization method recursively accesses the `Lazy<T>.Value` property of the `Lazy<T>` instance, an `InvalidOperationException` is thrown.

## LazyThreadSafetyMode.PublicationOnly field

```csharp
PublicationOnly
```

When multiple threads try to initialize a `Lazy<T>` instance simultaneously, all threads are allowed to run the initialization method (or the parameterless constructor, if there is no initialization method). The first thread to complete initialization sets the value of the `Lazy<T>` instance. This is referred to as `Publication` in the field names. That value is returned to any other threads that were simultaneously running the initialization method, unless the initialization method throws exceptions on those threads. Any instances of `T` that were created by the competing threads are discarded. Effectively, the publication of the initialized value is thread-safe in the sense that only one of the initialized values can be published and used by all threads. If the initialization method throws an exception on any thread, the exception is propagated out of the `Lazy<T>.Value` property on that thread. The exception is not cached. The value of the `Lazy<T>.IsValueCreated` property remains `false`, and subsequent calls to the `Lazy<T>.Value` property, either by the thread where the exception was thrown or by other threads, cause the initialization method to run again. If the initialization method recursively accesses the `Lazy<T>.Value` property of the `Lazy<T>` instance, no exception is thrown.
