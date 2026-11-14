---
title: "ResilienceHandlerContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/ResilienceHandlerContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResilienceHandlerContext class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public sealed class ResilienceHandlerContext
```

The context used when building a resilience pipeline HTTP handler.

To be added.

## ResilienceHandlerContext.BuilderName property

```csharp
public string BuilderName { get; }
```

Gets the name of the builder being built.

Returns: To be added.

To be added.

## ResilienceHandlerContext.InstanceName property

```csharp
public string InstanceName { get; }
```

Gets the instance name of resilience pipeline being built.

Returns: To be added.

To be added.

## ResilienceHandlerContext.ServiceProvider property

```csharp
public IServiceProvider ServiceProvider { get; }
```

Gets the service provider.

Returns: To be added.

To be added.

## ResilienceHandlerContext.EnableReloads<TOptions>(String) method

```csharp
public void EnableReloads<TOptions> (string? name = default);
```

Enables dynamic reloading of the resilience pipeline whenever the `TOptions` options are changed.

Parameters:

- `TOptions`: The options type to listen to.
- `name`: The named options, if any.

You can decide based on the `name` to listen for changes in global options or named options.
If `name` is `null` then the global options are listened to.
By default, the `name` parameter is `null`.

You can listen for changes only for single options. If you call this method multiple times, the preceding calls are ignored and only the last one wins.

## ResilienceHandlerContext.GetOptions<TOptions>(String) method

```csharp
public TOptions GetOptions<TOptions> (string? name = default);
```

Gets the options identified by `name`.

Parameters:

- `TOptions`: The options type.
- `name`: The options name, if any.

Returns: The options instance.

If `name` is `null` then the global options are returned.
By default, the `name` parameter is `null`.

## ResilienceHandlerContext.OnPipelineDisposed(Action) method

```csharp
public void OnPipelineDisposed (Action callback);
```

Registers a callback that is called when the pipeline instance being configured is disposed.

Parameters:

- `callback`: The callback delegate.

To be added.
