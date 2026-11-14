---
title: "YieldAwaitable+YieldAwaiter struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/YieldAwaitable+YieldAwaiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# YieldAwaitable+YieldAwaiter struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct YieldAwaitable.YieldAwaiter : System.Runtime.CompilerServices.ICriticalNotifyCompletion
```

Provides an awaiter for switching into a target environment.

#### Remarks
This type and its members are intended for use by the compiler.

## YieldAwaitable+YieldAwaiter.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates whether a yield is not required.

Returns: Always `false`, which indicates that a yield is always required for `YieldAwaiter`.

#### Remarks
This type and its members are intended for use by the compiler.

## YieldAwaitable+YieldAwaiter.GetResult() method

```csharp
public void GetResult ();
```

Ends the await operation.

#### Remarks
This type and its members are intended for use by the compiler.

## YieldAwaitable+YieldAwaiter.OnCompleted(Action) method

```csharp
public void OnCompleted (Action continuation);
```

Sets the continuation to invoke.

Parameters:

- `continuation`: The action to invoke asynchronously.

Exceptions:

- `ArgumentNullException`: `continuation` is `null`.

#### Remarks
This type and its members are intended for use by the compiler.

## YieldAwaitable+YieldAwaiter.UnsafeOnCompleted(Action) method

```csharp
public void UnsafeOnCompleted (Action continuation);
```

Posts the `continuation` back to the current context.

Parameters:

- `continuation`: The action to invoke asynchronously.

Exceptions:

- `ArgumentNullException`: The `continuation` argument is `null`.

To be added.
