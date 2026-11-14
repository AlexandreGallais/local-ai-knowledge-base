---
title: "ConstructorInvoker class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ConstructorInvoker.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConstructorInvoker class

Namespace: `System.Reflection`

```csharp
public sealed class ConstructorInvoker
```

Provides methods to invoke the method specified by the provided `ConstructorInfo`.

This class provides better performance than `ConstructorInfo.Invoke` when compatibility with that method is not necessary and when the caller can cache the ConstructorInvoker instance for additional invoke calls. Unlike `ConstructorInfo.Invoke`, the invoke methods in this class don't look up default values for arguments when `Type.Missing` is specified. In addition, the target constructor may be inlined for performance and not appear in stack traces.

## ConstructorInvoker.Create(ConstructorInfo) method

```csharp
public static System.Reflection.ConstructorInvoker Create (System.Reflection.ConstructorInfo constructor);
```

Creates a new instance of `ConstructorInvoker`.

Parameters:

- `constructor`: The constructor that will be invoked.

Returns: The new instance.

Exceptions:

- `ArgumentException`: The `constructor` is not a runtime-based method.

For performance, the resulting instance should be cached for additional calls.

## ConstructorInvoker.Invoke() method

```csharp
public object Invoke ();
```

Invokes the constructor.

Returns: An instance of the class associated with the constructor.

Exceptions:

- `InvalidOperationException`: The type that declares the method is an open generic type.
- `TargetParameterCountException`: An incorrect number of arguments was provided.
- `NotSupportedException`: The calling convention or signature is not supported.

To be added.

## ConstructorInvoker.Invoke(Object) method

```csharp
public object Invoke (object? arg1);
```

Invokes the constructor using the specified arguments.

Parameters:

- `arg1`: The first argument for the invoked method.

Returns: An instance of the class associated with the constructor.

Exceptions:

- `ArgumentException`: The arguments do not match the signature of the invoked constructor.

To be added.

## ConstructorInvoker.Invoke(Object>) method

```csharp
public object Invoke (Span<object?> arguments);
```

Invokes the constructor using the specified arguments.

Parameters:

- `arguments`: The arguments for the invoked constructor.

Returns: An instance of the class associated with the constructor.

Exceptions:

- `ArgumentException`: The arguments do not match the signature of the invoked constructor.

To be added.

## ConstructorInvoker.Invoke(Object, Object) method

```csharp
public object Invoke (object? arg1, object? arg2);
```

Invokes the constructor using the specified arguments.

Parameters:

- `arg1`: The first argument for the invoked method.
- `arg2`: The second argument for the invoked method.

Returns: An instance of the class associated with the constructor.

To be added.

## ConstructorInvoker.Invoke(Object, Object, Object) method

```csharp
public object Invoke (object? arg1, object? arg2, object? arg3);
```

Invokes the constructor using the specified arguments.

Parameters:

- `arg1`: The first argument for the invoked method.
- `arg2`: The second argument for the invoked method.
- `arg3`: The third argument for the invoked method.

Returns: An instance of the class associated with the constructor.

To be added.

## ConstructorInvoker.Invoke(Object, Object, Object, Object) method

```csharp
public object Invoke (object? arg1, object? arg2, object? arg3, object? arg4);
```

Invokes the constructor using the specified arguments.

Parameters:

- `arg1`: The first argument for the invoked method.
- `arg2`: The second argument for the invoked method.
- `arg3`: The third argument for the invoked method.
- `arg4`: The fourth argument for the invoked method.

Returns: An instance of the class associated with the constructor.

To be added.
