---
title: "Lazy<T> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Lazy`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Lazy<T> class

Namespace: `System`

```csharp
public class Lazy<T>
```

Provides support for lazy initialization.

Parameters:

- `T`: The type of object that is being lazily initialized.

#### Remarks
Use lazy initialization to defer the creation of a large or resource-intensive object, or the execution of a resource-intensive task, particularly when such creation or execution might not occur during the lifetime of the program.

To prepare for lazy initialization, you create an instance of `Lazy<T>`. The type argument of the `Lazy<T>` object that you create specifies the type of the object that you want to initialize lazily. The constructor that you use to create the `Lazy<T>` object determines the characteristics of the initialization. Lazy initialization occurs the first time the `Value` property is accessed.

In most cases, choosing a constructor depends on your answers to two questions:

- Will the lazily initialized object be accessed from more than one thread? If so, the `Lazy<T>` object might create it on any thread. You can use one of the simple constructors whose default behavior is to create a thread-safe `Lazy<T>` object, so that only one instance of the lazily instantiated object is created no matter how many threads try to access it. To create a `Lazy<T>` object that is not thread safe, you must use a constructor that enables you to specify no thread safety.

> **Caution:**
> Making the `Lazy<T>` object thread safe does not protect the lazily initialized object. If multiple threads can access the lazily initialized object, you must make its properties and methods safe for multithreaded access.

- Does lazy initialization require a lot of code, or does the lazily initialized object have a parameterless constructor that does everything you need and doesn't throw exceptions? If you need to write initialization code or if exceptions need to be handled, use one of the constructors that takes a factory method. Write your initialization code in the factory method.

The following table shows which constructor to choose, based on these two factors:

|Object will be accessed by|If no initialization code is required (parameterless constructor), use|If initialization code is required, use|
|--------------------------------|------------------------------------------------------------------------|---------------------------------------------|
|Multiple threads|`%23ctor`|`%23ctor`|
|One thread|`%23ctor` with `isThreadSafe` set to `false`.|`%23ctor` with `isThreadSafe` set to `false`.|

You can use a lambda expression to specify the factory method. This keeps all the initialization code in one place. The lambda expression captures the context, including any arguments you pass to the lazily initialized object's constructor.

**Exception caching** When you use factory methods, exceptions are cached. That is, if the factory method throws an exception the first time a thread tries to access the `Value` property of the `Lazy<T>` object, the same exception is thrown on every subsequent attempt. This ensures that every call to the `Value` property produces the same result and avoids subtle errors that might arise if different threads get different results. The `Lazy<T>` stands in for an actual `T` that otherwise would have been initialized at some earlier point, usually during startup. A failure at that earlier point is usually fatal. If there is a potential for a recoverable failure, we recommend that you build the retry logic into the initialization routine (in this case, the factory method), just as you would if you weren't using lazy initialization.

**Alternative to locking** In certain situations, you might want to avoid the overhead of the `Lazy<T>` object's default locking behavior. In rare situations, there might be a potential for deadlocks. In such cases, you can use the `%23ctor` or `%23ctor` constructor, and specify `PublicationOnly`. This enables the `Lazy<T>` object to create a copy of the lazily initialized object on each of several threads if the threads call the `Value` property simultaneously. The `Lazy<T>` object ensures that all threads use the same instance of the lazily initialized object and discards the instances that are not used. Thus, the cost of reducing the locking overhead is that your program might sometimes create and discard extra copies of an expensive object. In most cases, this is unlikely. The examples for the `%23ctor` and `%23ctor` constructors demonstrate this behavior.

> **Important:**
> When you specify `PublicationOnly`, exceptions are never cached, even if you specify a factory method.

**Equivalent constructors** In addition to enabling the use of `PublicationOnly`, the `%23ctor` and `%23ctor` constructors can duplicate the functionality of the other constructors. The following table shows the parameter values that produce equivalent behavior.

|To create a `Lazy<T>` object that is|For constructors that have a `LazyThreadSafetyMode` `mode` parameter, set `mode` to|For constructors that have a Boolean `isThreadSafe` parameter, set `isThreadSafe` to|For constructors with no thread safety parameters|
|-------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------|
|Fully thread safe; uses locking to ensure that only one thread initializes the value.|`ExecutionAndPublication`|`true`|All such constructors are fully thread safe.|
|Not thread safe.|`None`|`false`|Not applicable.|
|Fully thread safe; threads race to initialize the value.|`PublicationOnly`|Not applicable.|Not applicable.|

**Other capabilities** For information about the use of `Lazy<T>` with thread-static fields, or as the backing store for properties, see Lazy Initialization.

#### Examples
The following example demonstrates the use of the `Lazy<T>` class to provide lazy initialization with access from multiple threads.

> **Note:**
> The example uses the `%23ctor` constructor. It also demonstrates the use of the `%23ctor` constructor (specifying `true` for `isThreadSafe`) and the `%23ctor` constructor (specifying `ExecutionAndPublication` for `mode`). To switch to a different constructor, just change which constructors are commented out.
>
> For an example that demonstrates exception caching using the same constructors, see the `%23ctor` constructor.

The example defines a `LargeObject` class that will be initialized lazily by one of several threads. The four key <example-value> of code illustrate the creation of the initializer, the factory method, the actual initialization, and the constructor of the `LargeObject` class, which displays a message when the object is created. At the beginning of the `Main` method, the example creates the thread-safe lazy initializer for `LargeObject`:

_Code sample not included: ~/snippets/csharp/System/LazyT/Overview/example.cs._

The factory method shows the creation of the object, with a placeholder for further initialization:

_Code sample not included: ~/snippets/csharp/System/LazyT/Overview/example.cs._

Note that the first two code sections could be combined by using a lambda function, as shown here:

_Code sample not included: ~/snippets/csharp/System/LazyT/Overview/lambda.cs._

The example pauses, to indicate that an indeterminate period may elapse before lazy initialization occurs. When you press the **Enter** key, the example creates and starts three threads. The `ThreadProc` method that's used by all three threads calls the `Value` property. The first time this happens, the `LargeObject` instance is created:

_Code sample not included: ~/snippets/csharp/System/LazyT/Overview/example.cs._

The constructor of the `LargeObject` class, which includes the last key <example-value> of code, displays a message and records the identity of the initializing thread. The output from the program appears at the end of the full code listing.

_Code sample not included: ~/snippets/csharp/System/LazyT/Overview/example.cs._

> **Note:**
> For simplicity, this example uses a global instance of `Lazy<T>`, and all the methods are `static` (`Shared` in Visual Basic). These are not requirements for the use of lazy initialization.

_Code sample not included: ~/snippets/csharp/System/LazyT/Overview/example.cs._

## Lazy<T>.Lazy() constructor

```csharp
public Lazy ();
```

Initializes a new instance of the `Lazy<T>` class. When lazy initialization occurs, the parameterless constructor of the target type is used.

#### Remarks
An instance that is created with this constructor may be used concurrently from multiple threads.

The thread safety mode of a `Lazy<T>` instance that is initialized with this constructor is `ExecutionAndPublication`. The thread safety mode describes the behavior when multiple threads try to initialize the `Lazy<T>` instance.

A `Lazy<T>` instance that is created with this constructor does not cache exceptions. For more information, see the `Lazy<T>` class or the `LazyThreadSafetyMode` enumeration.

#### Examples
The following example demonstrates the use of this constructor. It also illustrates the use of the `%23ctor` constructor (specifying `true` for `isThreadSafe`) and the `%23ctor` constructor (specifying `ExecutionAndPublication` for `mode`). To switch to a different constructor, just change which constructors are commented out.

The example defines a `LargeObject` class that will be initialized lazily by one of several threads. The two key lines of code in this example are the creation of the initializer and the actual initialization. At the beginning of the `Main` method, the example creates the thread-safe lazy initializer for `LargeObject`:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example.cs._

The example creates and starts three threads that block on a `ManualResetEvent` object, so that the example can release the threads all at once. The `ThreadProc` method that's used by all three threads calls the `Value` property to get the `LargeObject` instance:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example.cs._

The `Lazy<T>` class provides locking, so that only one thread is allowed to create the `LargeObject` instance. The example demonstrates that the other threads all get the same instance.

> **Note:**
> For simplicity, this example uses a global instance of `Lazy<T>`, and all the methods are `static` (`Shared` in Visual Basic). These are not requirements for the use of lazy initialization.

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example.cs._

## Lazy<T>.Lazy(Boolean) constructor

```csharp
public Lazy (bool isThreadSafe);
```

Initializes a new instance of the `Lazy<T>` class. When lazy initialization occurs, the parameterless constructor of the target type and the specified initialization mode are used.

Parameters:

- `isThreadSafe`: `true` to make this instance usable concurrently by multiple threads; `false` to make the instance usable by only one thread at a time.

#### Remarks
The thread safety mode of a `Lazy<T>` instance that is initialized with this constructor is `ExecutionAndPublication` if `isThreadSafe` is `true`; otherwise, the mode is `None`. The thread safety mode describes the behavior when multiple threads try to initialize the `Lazy<T>` instance. To specify the `PublicationOnly` mode, use the `%23ctor` or `%23ctor` constructor.

A `Lazy<T>` instance that is created with this constructor does not cache exceptions. For more information, see the `Lazy<T>` class or the `LazyThreadSafetyMode` enumeration.

#### Examples
The following example demonstrates the use of this constructor to create a lazy initializer that is not thread safe, for scenarios where all access to the lazily initialized object occurs on the same thread. It also demonstrates the use of the `%23ctor` constructor (specifying `None` for `mode`. To switch to a different constructor, just change which constructor is commented out.

> **Note:**
> For code that demonstrates how to use this constructor in multithreaded scenarios (specifying `true` for `isThreadSafe`), see the example for the `%23ctor` constructor.

The example defines a `LargeObject` class that will be initialized lazily. In the `Main` method, the example creates a `Lazy<T>` instance and then pauses. When you press the **Enter** key, the example accesses the `Value` property of the `Lazy<T>` instance, which causes initialization to occur. The constructor of the `LargeObject` class displays a console message.

> **Note:**
> For simplicity, this example uses a global instance of `Lazy<T>`, and all the methods are `static` (`Shared` in Visual Basic). These are not requirements for the use of lazy initialization.

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example1.cs._
