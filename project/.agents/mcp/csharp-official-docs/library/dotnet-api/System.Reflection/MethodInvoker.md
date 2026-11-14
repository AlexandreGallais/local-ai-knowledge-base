---
title: "MethodInvoker class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodInvoker.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodInvoker class

Namespace: `System.Reflection`

```csharp
public sealed class MethodInvoker
```

Provides methods to invoke the method specified by the provided `MethodBase`.

The methods in this class provide better performance than `MethodBase.Invoke` when compatibility with that method isn't necessary and when the caller can cache the MethodInvoker instance for additional invoke calls. Unlike `MethodBase.Invoke`, the invoke methods in this class don't look up default values for arguments when `Type.Missing` is specified. In addition, the target method may be inlined for performance and not appear in stack traces.

## MethodInvoker.Create(MethodBase) method

```csharp
public static System.Reflection.MethodInvoker Create (System.Reflection.MethodBase method);
```

Creates a new instance of `MethodInvoker`.

Parameters:

- `method`: The method that will be invoked.

Returns: The new instance.

Exceptions:

- `ArgumentException`: The `method` is not a runtime-based method.

For performance, the resulting instance should be cached for additional calls.

## MethodInvoker.Invoke(Object) method

```csharp
public object? Invoke (object? obj);
```

Invokes the method using the specified arguments.

Parameters:

- `obj`: The object on which to invoke the method. If the method is static, this argument is ignored.

Returns: An object containing the return value of the invoked method, or `null` if the invoked method does not have a return value.

Exceptions:

- `TargetException`: The `obj` argument is `null` and the method is not static.

-or-

The method is not declared or inherited by the class of `obj`.
- `InvalidOperationException`: The type that declares the method is an open generic type.
- `TargetParameterCountException`: An incorrect number of arguments was provided.
- `NotSupportedException`: The calling convention or signature is not supported.

To be added.

## MethodInvoker.Invoke(Object, Object) method

```csharp
public object? Invoke (object? obj, object? arg1);
```

Invokes the method using the specified arguments.

Parameters:

- `obj`: The object on which to invoke the method. If the method is static, this argument is ignored.
- `arg1`: The first argument for the invoked method.

Returns: An object containing the return value of the invoked method, or `null` if the invoked method does not have a return value.

Exceptions:

- `ArgumentException`: The arguments do not match the signature of the invoked method.

To be added.

## MethodInvoker.Invoke(Object, Object>) method

```csharp
public object? Invoke (object? obj, Span<object?> arguments);
```

Invokes the method using the specified arguments.

Parameters:

- `obj`: The object on which to invoke the method. If the method is static, this argument is ignored.
- `arguments`: The arguments for the invoked method.

Returns: An object containing the return value of the invoked method, or `null` if the invoked method does not have a return value.

Exceptions:

- `ArgumentException`: The arguments do not match the signature of the invoked method.

To be added.

## MethodInvoker.Invoke(Object, Object, Object) method

```csharp
public object? Invoke (object? obj, object? arg1, object? arg2);
```

Invokes the method using the specified arguments.

Parameters:

- `obj`: The object on which to invoke the method. If the method is static, this argument is ignored.
- `arg1`: The first argument for the invoked method.
- `arg2`: The second argument for the invoked method.

Returns: An object containing the return value of the invoked method, or `null` if the invoked method does not have a return value.

To be added.

## MethodInvoker.Invoke(Object, Object, Object, Object) method

```csharp
public object? Invoke (object? obj, object? arg1, object? arg2, object? arg3);
```

Invokes the method using the specified arguments.

Parameters:

- `obj`: The object on which to invoke the method. If the method is static, this argument is ignored.
- `arg1`: The first argument for the invoked method.
- `arg2`: The second argument for the invoked method.
- `arg3`: The third argument for the invoked method.

Returns: An object containing the return value of the invoked method, or `null` if the invoked method does not have a return value.

To be added.

## MethodInvoker.Invoke(Object, Object, Object, Object, Object) method

```csharp
public object? Invoke (object? obj, object? arg1, object? arg2, object? arg3, object? arg4);
```

Invokes the method using the specified arguments.

Parameters:

- `obj`: The object on which to invoke the method. If the method is static, this argument is ignored.
- `arg1`: The first argument for the invoked method.
- `arg2`: The second argument for the invoked method.
- `arg3`: The third argument for the invoked method.
- `arg4`: The fourth argument for the invoked method.

Returns: An object containing the return value of the invoked method, or `null` if the invoked method does not have a return value.

To be added.
