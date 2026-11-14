---
title: "JsonSerializerContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonSerializerContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializerContext class

Namespace: `System.Text.Json.Serialization`

```csharp
public abstract class JsonSerializerContext : System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver
```

Provides metadata about a set of types that is relevant to JSON serialization.

To be added.

## JsonSerializerContext.JsonSerializerContext(JsonSerializerOptions) constructor

```csharp
protected JsonSerializerContext (System.Text.Json.JsonSerializerOptions? options);
```

Creates an instance of `JsonSerializerContext` and binds it with the indicated `JsonSerializerOptions`.

Parameters:

- `options`: The run time provided options for the context instance.

#### Remarks

If no instance options are passed, then no options are set until the context is bound using `AddContext<T>` or until `Options` is called, where a new options instance is created and bound.

## JsonSerializerContext.GeneratedSerializerOptions property

```csharp
protected abstract System.Text.Json.JsonSerializerOptions? GeneratedSerializerOptions { get; }
```

Gets the default run-time options for the context.

Returns: To be added.

To be added.

## JsonSerializerContext.Options property

```csharp
public System.Text.Json.JsonSerializerOptions Options { get; }
```

Gets the run-time specified options of the context. If no options were passed when instantiating the context, then a new instance is bound and returned.

Returns: To be added.

#### Remarks

The instance cannot be mutated once it is bound with the context instance.

## JsonSerializerContext.GetTypeInfo(Type) method

```csharp
public abstract System.Text.Json.Serialization.Metadata.JsonTypeInfo? GetTypeInfo (Type type);
```

Gets metadata for the specified type.

Parameters:

- `type`: The type to fetch metadata for.

Returns: The metadata for the specified type, or `null` if the context has no metadata for the type.

To be added.

## JsonSerializerContext.System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver.GetTypeInfo(Type, JsonSerializerOptions) method

```csharp
System.Text.Json.Serialization.Metadata.JsonTypeInfo IJsonTypeInfoResolver.GetTypeInfo (Type type, System.Text.Json.JsonSerializerOptions options);
```

Resolves a `JsonTypeInfo` contract for the requested type and options.

Parameters:

- `type`: The type to be resolved.
- `options`: The configuration to use when resolving the metadata.

Returns: A `JsonTypeInfo` instance matching the requested type, or `null` if no contract could be resolved.

To be added.
