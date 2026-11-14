---
title: "Lazy<T> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Lazy`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Lazy<T> class (part 2 of 3)

## Lazy<T>.Lazy(Func<T>) constructor

```csharp
public Lazy (Func<T> valueFactory);
```

Initializes a new instance of the `Lazy<T>` class. When lazy initialization occurs, the specified initialization function is used.

Parameters:

- `valueFactory`: The delegate that is invoked to produce the lazily initialized value when it is needed.

Exceptions:

- `ArgumentNullException`: `valueFactory` is `null`.

#### Remarks
An instance that is created with this constructor may be used concurrently from multiple threads.

The thread safety mode of a `Lazy<T>` instance that is initialized with this constructor is `ExecutionAndPublication`. The thread safety mode describes the behavior when multiple threads try to initialize the `Lazy<T>` instance.

Exceptions that are thrown by `valueFactory` are cached. For more information, see the `Lazy<T>` class or the `LazyThreadSafetyMode` enumeration.

#### Examples
The following example demonstrates the use of this constructor to provide lazy initialization with exception caching. It also demonstrates the use of the `%23ctor` constructor (specifying `true` for `isThreadSafe`) and the `%23ctor` constructor (specifying `ExecutionAndPublication` for `mode`). To switch to a different constructor, just change which constructors are commented out.

The example defines a `LargeObject` class that will be initialized lazily by one of several threads. The three key <example-value> of code illustrate the creation of the initializer, the actual initialization, and the constructor of the `LargeObject` class, which demonstrates exception caching. At the beginning of the `Main` method, the example creates the thread-safe lazy initializer for `LargeObject`:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example2.cs._

The example creates and starts three threads. The `ThreadProc` method that's used by all three threads calls the `Value` property to get the `LargeObject` instance:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example2.cs._

In the constructor of the `LargeObject` class, the third key <example-value> of code throws an exception the first time a `LargeObject` instance is created, but thereafter allows instance creation to occur:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example2.cs._

When the example is run, the first thread that tries to create an instance of `LargeObject` fails, and the exception is caught. You might expect that the next thread would successfully create an instance, but the `Lazy<T>` object has cached the exception. Because of this, all three threads throw the exception.

> **Note:**
> For simplicity, this example uses a global instance of `Lazy<T>`, and all the methods are `static` (`Shared` in Visual Basic). These are not requirements for the use of lazy initialization.

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example2.cs._

## Lazy<T>.Lazy(LazyThreadSafetyMode) constructor

```csharp
public Lazy (System.Threading.LazyThreadSafetyMode mode);
```

Initializes a new instance of the `Lazy<T>` class that uses the parameterless constructor of `T` and the specified thread-safety mode.

Parameters:

- `mode`: One of the enumeration values that specifies the thread safety mode.

Exceptions:

- `ArgumentOutOfRangeException`: `mode` contains an invalid value.

#### Remarks
The thread safety mode of a `Lazy<T>` instance describes the behavior when multiple threads try to initialize the `Lazy<T>` instance.

A `Lazy<T>` instance that is created with this constructor does not cache exceptions. For more information, see the `Lazy<T>` class or the `LazyThreadSafetyMode` enumeration.

#### Examples
The following example demonstrates the use of this constructor to create a lazy initializer that enables multiple threads to race to create an object lazily. Multiple threads might succeed in creating instances, but all threads use the instance that was created first.

> **Note:**
> For an example that demonstrates how to use this constructor in single-threaded scenarios (specifying `None` for `mode`), see the `%23ctor` constructor. For an example that demonstrates how to use this constructor to provide locking instead of race conditions in multithreaded scenarios (specifying `ExecutionAndPublication` for `mode`), see the `%23ctor` constructor.

The example defines a `LargeObject` class that will be initialized lazily by any of several threads. The three key <example-value> of code illustrate the creation of the initializer, the actual initialization, and the constructor and finalizer of the `LargeObject` class. At the beginning of the `Main` method, the example creates the `Lazy<T>` object that performs lazy initialization of the `LargeObject`:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example5.cs._

The example creates and starts three threads that block on a `ManualResetEvent` object, so that the example can release the threads all at once. In the `ThreadProc` method that's used by all three threads, calling the `Value` property creates the `LargeObject` instance:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example5.cs._

Because the constructor for the `Lazy<T>` instance specified `PublicationOnly`, all three threads are allowed to create `LargeObject` instances. The example demonstrates this by displaying console messages in the constructor and in the finalizer of the `LargeObject` class:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example5.cs._

However, the `Lazy<T>` object ensures that only one instance is used by all threads. The output from the example shows that all three threads use the same instance, and also shows that the other two instances can be reclaimed by garbage collection.

> **Note:**
> For simplicity, this example uses a global instance of `Lazy<T>`, and all the methods are `static` (`Shared` in Visual Basic). These are not requirements for the use of lazy initialization.

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example5.cs._

## Lazy<T>.Lazy(T) constructor

```csharp
public Lazy (T value);
```

Initializes a new instance of the `Lazy<T>` class that uses a preinitialized specified value.

Parameters:

- `value`: The preinitialized value to be used.

#### Remarks
An instance created with this constructor is usable by multiple threads concurrently.

## Lazy<T>.Lazy(Func<T>, Boolean) constructor

```csharp
public Lazy (Func<T> valueFactory, bool isThreadSafe);
```

Initializes a new instance of the `Lazy<T>` class. When lazy initialization occurs, the specified initialization function and initialization mode are used.

Parameters:

- `valueFactory`: The delegate that is invoked to produce the lazily initialized value when it is needed.
- `isThreadSafe`: `true` to make this instance usable concurrently by multiple threads; `false` to make this instance usable by only one thread at a time.

Exceptions:

- `ArgumentNullException`: `valueFactory` is `null`.

#### Remarks
The thread safety mode of a `Lazy<T>` instance that is initialized with this constructor is `ExecutionAndPublication` if `isThreadSafe` is `true`; otherwise, the mode is `None`. The thread safety mode describes the behavior when multiple threads try to initialize the `Lazy<T>` instance.

To specify the `PublicationOnly` mode, use the `%23ctor` or `%23ctor` constructor.

Exceptions that are thrown by `valueFactory` are cached. For more information, see the `Lazy<T>` class or the `LazyThreadSafetyMode` enumeration.

#### Examples
The following example demonstrates the use of this constructor to provide lazy initialization with exception caching, in a scenario with a single thread. It also demonstrates the use of the  `Lazy<T>.%23ctor` constructor (specifying `None` for `mode`). To switch to that constructor, just change which constructor is commented out.

> **Note:**
> For code that demonstrates how to use this constructor in multithreaded scenarios (specifying `true` for `isThreadSafe`), see the example for the `%23ctor` constructor.

The example defines a `LargeObject` class that will be initialized lazily by one of several threads. The three key <example-value> of code illustrate the creation of the initializer, the actual initialization, and the constructor of the `LargeObject` class, which demonstrates exception caching. At the beginning of the `Main` method, the example creates the thread-safe lazy initializer for `LargeObject`:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example3.cs._

In the call to the constructor, the `isThreadSafe` parameter is `false`, so the `Lazy<T>` is not thread safe. Because it's not thread safe, the example calls the `Value` property three times on the same thread:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example3.cs._

In the constructor of the `LargeObject` class, the third key <example-value> of code throws an exception the first time a `LargeObject` instance is created, but thereafter allows instance creation to occur:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example3.cs._

When the example is run, the first attempt to create an instance of `LargeObject` fails, and the exception is caught. You might expect that the next attempt would succeed, but the `Lazy<T>` object has cached the exception. Because of this, all three attempts throw the exception.

> **Note:**
> For simplicity, this example uses a global instance of `Lazy<T>`, and all the methods are `static` (`Shared` in Visual Basic). These are not requirements for the use of lazy initialization.

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example3.cs._

## Lazy<T>.Lazy(Func<T>, LazyThreadSafetyMode) constructor

```csharp
public Lazy (Func<T> valueFactory, System.Threading.LazyThreadSafetyMode mode);
```

Initializes a new instance of the `Lazy<T>` class that uses the specified initialization function and thread-safety mode.

Parameters:

- `valueFactory`: The delegate that is invoked to produce the lazily initialized value when it is needed.
- `mode`: One of the enumeration values that specifies the thread safety mode.

Exceptions:

- `ArgumentOutOfRangeException`: `mode` contains an invalid value.
- `ArgumentNullException`: `valueFactory` is `null`.

#### Remarks
The thread safety mode of a `Lazy<T>` instance describes the behavior when multiple threads try to initialize the `Lazy<T>` instance.

Exceptions that are thrown by `valueFactory` are cached, unless `mode` is `PublicationOnly`. For more information, see the `Lazy<T>` class or the `LazyThreadSafetyMode` enumeration.

#### Examples
The following example demonstrates the use of this constructor to create a lazy initializer that enables multiple threads to race to create an object lazily. Multiple threads might succeed in creating instances, but all threads use the instance that was created first. In addition, the example demonstrates that exceptions are never cached when you specify `PublicationOnly`, even if initialization is performed by a function instead of by the parameterless constructor of the lazily created type.

> **Note:**
> For an example that demonstrates how to use this constructor in single-threaded scenarios (specifying `None` for `mode`), see the `%23ctor` constructor. For an example that demonstrates how to use this constructor to provide locking instead of race conditions in multithreaded scenarios (specifying `ExecutionAndPublication` for `mode`), see the `%23ctor` constructor.

The example defines a `LargeObject` class that will be initialized lazily by any of several threads. The four key <example-value> of code illustrate the creation of the initializer, the actual initialization, the initialization function, and the constructor and finalizer of the `LargeObject` class. At the beginning of the `Main` method, the example creates the `Lazy<T>` object that performs lazy initialization of the `LargeObject`:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example4.cs._

The lazy initializer uses a function to perform the initialization. In this case, a function is required because there is no parameterless constructor for the `LargeObject` class.

The example creates and starts three threads that block on a `ManualResetEvent` object, so that the example can release the threads all at once. In the `ThreadProc` method that's used by all three threads, calling the `Value` property creates the `LargeObject` instance:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example4.cs._

In the third key <example-value> of code, the lazy initialization function is called to create the `LargeObject` instance. The function throws an exception the first time it's called:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example4.cs._

With any other `LazyThreadSafetyMode` setting, an unhandled exception in the initialization function would be cached. However, `PublicationOnly` suppresses exception caching. The output from the example demonstrates that a subsequent attempt to initialize the object succeeds.

> **Note:**
> The exception message usually appears after messages indicating that other threads have successfully initialized the object. This is because of the delay introduced by throwing and catching the exception.

Because the constructor for the `Lazy<T>` instance specified `PublicationOnly`, all three threads are allowed to create `LargeObject` instances. The example demonstrates this by displaying console messages in the constructor and in the finalizer of the `LargeObject` class:

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example4.cs._

The `Lazy<T>` object ensures that only one instance is used by all threads (except the thread where the initialization function throws an exception). The output from the example shows this.

> **Note:**
> For simplicity, this example uses a global instance of `Lazy<T>`, and all the methods are `static` (`Shared` in Visual Basic). These are not requirements for the use of lazy initialization.

_Code sample not included: ~/snippets/csharp/System/LazyT/.ctor/example4.cs._
