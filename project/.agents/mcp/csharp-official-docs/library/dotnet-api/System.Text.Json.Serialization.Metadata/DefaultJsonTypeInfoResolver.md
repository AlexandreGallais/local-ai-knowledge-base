---
title: "DefaultJsonTypeInfoResolver class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/DefaultJsonTypeInfoResolver.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultJsonTypeInfoResolver class

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public class DefaultJsonTypeInfoResolver : System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver
```

Defines the default, reflection-based JSON contract resolver used by System.Text.Json.

#### Remarks

The contract resolver used by `Default`.

## DefaultJsonTypeInfoResolver.DefaultJsonTypeInfoResolver() constructor

```csharp
public DefaultJsonTypeInfoResolver ();
```

Creates a mutable `DefaultJsonTypeInfoResolver` instance.

To be added.

## DefaultJsonTypeInfoResolver.Modifiers property

```csharp
public System.Collections.Generic.IList<Action<System.Text.Json.Serialization.Metadata.JsonTypeInfo>> Modifiers { get; }
```

Gets a list of user-defined callbacks that can be used to modify the initial contract.

Returns: To be added.

#### Remarks

The modifier list will be rendered immutable after the first `GetTypeInfo` invocation.

Modifier callbacks are called consecutively in the order in which they're specified in the list.

## DefaultJsonTypeInfoResolver.GetTypeInfo(Type, JsonSerializerOptions) method

```csharp
public virtual System.Text.Json.Serialization.Metadata.JsonTypeInfo GetTypeInfo (Type type, System.Text.Json.JsonSerializerOptions options);
```

Resolves a JSON contract for a given `type` and `options` configuration.

Parameters:

- `type`: The type for which to resolve a JSON contract.
- `options`: A `JsonSerializerOptions` instance used to determine contract configuration.

Returns: A `JsonTypeInfo` defining a reflection-derived JSON contract for `type`.

Exceptions:

- `ArgumentNullException`: `type` or `options` is `null`.

#### Remarks

The base implementation of this method will produce a reflection-derived contract
and apply any callbacks from the `Modifiers` list.
