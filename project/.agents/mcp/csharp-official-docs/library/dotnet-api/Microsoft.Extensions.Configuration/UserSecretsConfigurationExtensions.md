---
title: "UserSecretsConfigurationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/UserSecretsConfigurationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UserSecretsConfigurationExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class UserSecretsConfigurationExtensions
```

Provides configuration extensions for adding user secrets configuration source.

To be added.

## UserSecretsConfigurationExtensions.AddUserSecrets(IConfigurationBuilder, Assembly) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddUserSecrets (this Microsoft.Extensions.Configuration.IConfigurationBuilder configuration, System.Reflection.Assembly assembly);
```

Adds the user secrets configuration source. This searches `assembly` for an instance
of `UserSecretsIdAttribute`, which specifies a user secrets ID.

A user secrets ID is unique value used to store and identify a collection of secret <example-value> values.

Parameters:

- `configuration`: The configuration builder.
- `assembly`: The assembly with the `UserSecretsIdAttribute`.

Returns: The configuration builder.

Exceptions:

- `InvalidOperationException`: `assembly` does not have a valid `UserSecretsIdAttribute`.

To be added.

## UserSecretsConfigurationExtensions.AddUserSecrets(IConfigurationBuilder, String) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddUserSecrets (this Microsoft.Extensions.Configuration.IConfigurationBuilder configuration, string userSecretsId);
```

Adds the user secrets configuration source with specified user secrets ID.

A user secrets ID is unique value used to store and identify a collection of secret <example-value> values.

Parameters:

- `configuration`: The configuration builder.
- `userSecretsId`: The user secrets ID.

Returns: The configuration builder.

To be added.

## UserSecretsConfigurationExtensions.AddUserSecrets(IConfigurationBuilder, Assembly, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddUserSecrets (this Microsoft.Extensions.Configuration.IConfigurationBuilder configuration, System.Reflection.Assembly assembly, bool optional);
```

Adds the user secrets configuration source. This searches `assembly` for an instance
of `UserSecretsIdAttribute`, which specifies a user secrets ID.

A user secrets ID is unique value used to store and identify a collection of secret <example-value> values.

Parameters:

- `configuration`: The configuration builder.
- `assembly`: The assembly with the `UserSecretsIdAttribute`.
- `optional`: Whether loading secrets is optional. When false, this method may throw.

Returns: The configuration builder.

Exceptions:

- `InvalidOperationException`: `optional` is false and `assembly` does not have a valid `UserSecretsIdAttribute`.

To be added.

## UserSecretsConfigurationExtensions.AddUserSecrets(IConfigurationBuilder, String, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddUserSecrets (this Microsoft.Extensions.Configuration.IConfigurationBuilder configuration, string userSecretsId, bool reloadOnChange);
```

Adds the user secrets configuration source with specified user secrets ID.

A user secrets ID is unique value used to store and identify a collection of secret <example-value> values.

Parameters:

- `configuration`: The configuration builder.
- `userSecretsId`: The user secrets ID.
- `reloadOnChange`: Whether the configuration should be reloaded if the file changes.

Returns: The configuration builder.

To be added.

## UserSecretsConfigurationExtensions.AddUserSecrets(IConfigurationBuilder, Assembly, Boolean, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddUserSecrets (this Microsoft.Extensions.Configuration.IConfigurationBuilder configuration, System.Reflection.Assembly assembly, bool optional, bool reloadOnChange);
```

Adds the user secrets configuration source. This searches `assembly` for an instance
of `UserSecretsIdAttribute`, which specifies a user secrets ID.

A user secrets ID is unique value used to store and identify a collection of secret <example-value> values.

Parameters:

- `configuration`: The configuration builder.
- `assembly`: The assembly with the `UserSecretsIdAttribute`.
- `optional`: Whether loading secrets is optional. When false, this method may throw.
- `reloadOnChange`: Whether the configuration should be reloaded if the file changes.

Returns: The configuration builder.

Exceptions:

- `InvalidOperationException`: `optional` is false and `assembly` does not have a valid `UserSecretsIdAttribute`.

To be added.

## UserSecretsConfigurationExtensions.AddUserSecrets<T>(IConfigurationBuilder) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddUserSecrets<T> (this Microsoft.Extensions.Configuration.IConfigurationBuilder configuration) where T : class;
```

Adds the user secrets configuration source. Searches the assembly that contains type `T`
for an instance of `UserSecretsIdAttribute`, which specifies a user secrets ID.

A user secrets ID is unique value used to store and identify a collection of secret <example-value> values.

Parameters:

- `T`: The type from the assembly to search for an instance of `UserSecretsIdAttribute`.
- `configuration`: The configuration builder.

Returns: The configuration builder.

Exceptions:

- `InvalidOperationException`: The assembly containing `T` does not have `UserSecretsIdAttribute`.

To be added.

## UserSecretsConfigurationExtensions.AddUserSecrets<T>(IConfigurationBuilder, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddUserSecrets<T> (this Microsoft.Extensions.Configuration.IConfigurationBuilder configuration, bool optional) where T : class;
```

Adds the user secrets configuration source. Searches the assembly that contains type `T`
for an instance of `UserSecretsIdAttribute`, which specifies a user secrets ID.

A user secrets ID is unique value used to store and identify a collection of secret <example-value> values.

Parameters:

- `T`: The type from the assembly to search for an instance of `UserSecretsIdAttribute`.
- `configuration`: The configuration builder.
- `optional`: Whether loading secrets is optional. When false, this method may throw.

Returns: The configuration builder.

Exceptions:

- `InvalidOperationException`: `optional` is false and the assembly containing `T` does not have a valid `UserSecretsIdAttribute`.

To be added.

## UserSecretsConfigurationExtensions.AddUserSecrets<T>(IConfigurationBuilder, Boolean, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddUserSecrets<T> (this Microsoft.Extensions.Configuration.IConfigurationBuilder configuration, bool optional, bool reloadOnChange) where T : class;
```

Adds the user secrets configuration source. Searches the assembly that contains type `T`
for an instance of `UserSecretsIdAttribute`, which specifies a user secrets ID.

A user secrets ID is unique value used to store and identify a collection of secret <example-value> values.

Parameters:

- `T`: The type from the assembly to search for an instance of `UserSecretsIdAttribute`.
- `configuration`: The configuration builder.
- `optional`: Whether loading secrets is optional. When false, this method may throw.
- `reloadOnChange`: Whether the configuration should be reloaded if the file changes.

Returns: The configuration builder.

Exceptions:

- `InvalidOperationException`: `optional` is `false` and the assembly containing `T` does not have a valid `UserSecretsIdAttribute`.

To be added.
