---
title: "ChangeToken class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/ChangeToken.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ChangeToken class

Namespace: `Microsoft.Extensions.Primitives`

```csharp
public static class ChangeToken
```

Propagates notifications that a change has occurred.

To be added.

## ChangeToken.OnChange(IChangeToken>, Action) method

```csharp
public static IDisposable OnChange (Func<Microsoft.Extensions.Primitives.IChangeToken?> changeTokenProducer, Action changeTokenConsumer);
```

Registers the `changeTokenConsumer` action to be called whenever the token <example-value> changes.

Parameters:

- `changeTokenProducer`: Produces the change token.
- `changeTokenConsumer`: Action called when the token changes. The token is re-registered once the action returns.

Returns: An `IDisposable` that, when disposed, unregisters the consumer.

Exceptions from `changeTokenProducer` are propagated to the caller of this method or to the code that triggers the change token.
Exceptions from `changeTokenConsumer` are propagated to the code that triggers the change token.

## ChangeToken.OnChange(IChangeToken>, Task>) method

```csharp
public static IDisposable OnChange (Func<Microsoft.Extensions.Primitives.IChangeToken?> changeTokenProducer, Func<System.Threading.Tasks.Task> changeTokenConsumer);
```

Registers the `changeTokenConsumer` function to be called whenever the token <example-value> changes.

Parameters:

- `changeTokenProducer`: Produces the change token.
- `changeTokenConsumer`: Function called when the token changes. The token is only re-registered once the returned `Task` completes.

Returns: An `IDisposable` that, when disposed, unregisters the consumer.

Exceptions from `changeTokenProducer` are propagated to the caller of this method or to the code that triggers the change token.
Synchronous exceptions from `changeTokenConsumer` are propagated to the code that triggers the change token.
Asynchronous exceptions from `changeTokenConsumer` are left unobserved.

## ChangeToken.OnChange<TState>(IChangeToken>, Action<TState>, TState) method

```csharp
public static IDisposable OnChange<TState> (Func<Microsoft.Extensions.Primitives.IChangeToken?> changeTokenProducer, Action<TState> changeTokenConsumer, TState state);
```

Registers the `changeTokenConsumer` action to be called whenever the token <example-value> changes.

Parameters:

- `TState`: The type of the state for the `changeTokenConsumer` action.
- `changeTokenProducer`: Produces the change token.
- `changeTokenConsumer`: Action called when the token changes. The token is re-registered once the action returns.
- `state`: state for the consumer.

Returns: An `IDisposable` that, when disposed, unregisters the consumer.

Exceptions from `changeTokenProducer` are propagated to the caller of this method or to the code that triggers the change token.
Exceptions from `changeTokenConsumer` are propagated to the code that triggers the change token.

## ChangeToken.OnChange<TState>(IChangeToken>, Task>, TState) method

```csharp
public static IDisposable OnChange<TState> (Func<Microsoft.Extensions.Primitives.IChangeToken?> changeTokenProducer, Func<TState,System.Threading.Tasks.Task> changeTokenConsumer, TState state);
```

Registers the `changeTokenConsumer` function to be called whenever the token <example-value> changes.

Parameters:

- `TState`: To be added.
- `changeTokenProducer`: Produces the change token.
- `changeTokenConsumer`: Function called when the token changes. The token is only re-registered once the returned `Task` completes.
- `state`: state for the consumer.

Returns: An `IDisposable` that, when disposed, unregisters the consumer.

Exceptions from `changeTokenProducer` are propagated to the caller of this method or to the code that triggers the change token.
Synchronous exceptions from `changeTokenConsumer` are propagated to the code that triggers the change token.
Asynchronous exceptions from `changeTokenConsumer` are left unobserved.
