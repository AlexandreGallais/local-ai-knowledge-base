---
title: "Lazy<T> class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Lazy`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Lazy<T> class (part 3 of 3)

## Lazy<T>.IsValueCreated property

```csharp
public bool IsValueCreated { get; }
```

Gets a value that indicates whether a value has been created for this `Lazy<T>` instance.

Returns: `true` if a value has been created for this `Lazy<T>` instance; otherwise, `false`.

#### Remarks
When lazy initialization occurs for a `Lazy<T>` instance, it may result in either a value being created or an exception being thrown. If an exception is thrown, subsequent behavior of the `Lazy<T>` instance depends on whether exception caching is in effect. If the `Lazy<T>` instance was created by using a constructor that does not specify an initialization function, then exception caching is not in effect. A subsequent attempt to initialize the `Lazy<T>` might succeed, and after successful initialization the `IsValueCreated` property returns `true`. If the `Lazy<T>` instance was created with an initialization function (specified by the `valueFactory` parameter of the `Lazy<T>` constructor), then exception caching is controlled by the thread safety mode.

- If the mode is `ExecutionAndPublication` or `None`, there is no second chance to initialize the `Lazy<T>` instance. If an exception occurs and is unhandled in the initialization function, that exception is cached and rethrown on subsequent accesses of the `Value` property. No value is created if an exception is thrown, so in such cases `Lazy<T>.IsValueCreated` returns `false`.

- If the mode is `PublicationOnly`, the first thread that succeeds in running the initialization function (or the parameterless constructor) creates the value for the `Lazy<T>` instance. If the initialization function throws an exception on one thread, other threads can still try to initialize the `Lazy<T>` instance. Until the value is created, the `IsValueCreated` property returns `false`.

## Lazy<T>.Value property

```csharp
public T Value { get; }
```

Gets the lazily initialized value of the current `Lazy<T>` instance.

Returns: The lazily initialized value of the current `Lazy<T>` instance.

Exceptions:

- `MemberAccessException`: The `Lazy<T>` instance is initialized to use the parameterless constructor of the type that is being lazily initialized, and permissions to access the constructor are missing.
- `MissingMemberException`: The `Lazy<T>` instance is initialized to use the parameterless constructor of the type that is being lazily initialized, and that type does not have a public, parameterless constructor.
- `InvalidOperationException`: The initialization function tries to access `Lazy<T>.Value` on this instance.

#### Remarks
If the `IsValueCreated` property is `false`, accessing the `Value` property forces initialization.

In addition to the exceptions that are listed, the `Value` property can throw any unhandled exception that is thrown by the factory method that was passed to the `valueFactory` parameter of the `%23ctor`, `%23ctor`, or `%23ctor` constructor.

## Lazy<T>.ToString() method

```csharp
public override string? ToString ();
```

Creates and returns a string representation of the `Lazy<T>.Value` property for this instance.

Returns: The result of calling the `Object.ToString` method on the `Lazy<T>.Value` property for this instance, if the value has been created (that is, if the `Lazy<T>.IsValueCreated` property returns `true`). Otherwise, a string indicating that the value has not been created.

Exceptions:

- `NullReferenceException`: The `Lazy<T>.Value` property is `null`.

#### Remarks
Calling this method does not cause initialization.

The `Value` property can be `null` after lazy initialization if the factory method that was specified for the `valueFactory` parameter of the `%23ctor`, `%23ctor`, or `%23ctor` constructor returns `null`.
