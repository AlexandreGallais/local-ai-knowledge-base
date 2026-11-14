---
title: "AsyncLocal<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/AsyncLocal`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncLocal<T> class

Namespace: `System.Threading`

```csharp
public sealed class AsyncLocal<T>
```

Represents ambient data that is local to a given asynchronous control flow, such as an asynchronous method.

Parameters:

- `T`: The type of the ambient data.

#### Remarks
Because the task-based asynchronous programming model tends to abstract the use of threads, `AsyncLocal<T>` instances can be used to persist data across threads.

The `AsyncLocal<T>` class also provides optional notifications when the value associated with the current thread changes, either because it was explicitly changed by setting the `Value` property, or implicitly changed when the thread encountered an `await` or other context transition.

#### Examples
The following example uses the `AsyncLocal<T>` class to persist a string value across an asynchronous flow. It also contrasts the use of  `AsyncLocal<T>` with `ThreadLocal<T>`.

_Code sample not included: ~/snippets/csharp/System.Threading/AsyncLocalT/Overview/Example1.cs._

## AsyncLocal<T>.AsyncLocal() constructor

```csharp
public AsyncLocal ();
```

Instantiates an `AsyncLocal<T>` instance that does not receive change notifications.

To be added.

## AsyncLocal<T>.AsyncLocal(AsyncLocalValueChangedArgs<T>>) constructor

```csharp
public AsyncLocal (Action<System.Threading.AsyncLocalValueChangedArgs<T>>? valueChangedHandler);
```

Instantiates an `AsyncLocal<T>` local instance that receives change notifications.

Parameters:

- `valueChangedHandler`: The delegate that is called whenever the current value changes on any thread.

#### Remarks
The delegate's signature is `Action<AsyncLocalValueChangedArgs<T>>`.

## AsyncLocal<T>.Value property

```csharp
public T Value { get; set; }
```

Gets or sets the value of the ambient data.

Returns: The value of the ambient data. If no value has been set, the returned value is `default(T)`.

To be added.
