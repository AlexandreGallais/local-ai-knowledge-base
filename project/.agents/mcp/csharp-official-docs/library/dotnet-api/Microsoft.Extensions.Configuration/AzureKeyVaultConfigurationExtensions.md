---
title: "AzureKeyVaultConfigurationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/AzureKeyVaultConfigurationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AzureKeyVaultConfigurationExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class AzureKeyVaultConfigurationExtensions
```

Extension methods for registering `AzureKeyVaultConfigurationProvider` with `IConfigurationBuilder`.

To be added.

## AzureKeyVaultConfigurationExtensions.AddAzureKeyVault(IConfigurationBuilder, AzureKeyVaultConfigurationOptions) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddAzureKeyVault (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, Microsoft.Extensions.Configuration.AzureKeyVault.AzureKeyVaultConfigurationOptions options);
```

Adds an `IConfigurationProvider` that reads configuration values from the Azure KeyVault.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `options`: The `AzureKeyVaultConfigurationOptions` to use.

Returns: The `IConfigurationBuilder`.

To be added.

## AzureKeyVaultConfigurationExtensions.AddAzureKeyVault(IConfigurationBuilder, String) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddAzureKeyVault (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, string vault);
```

Adds an `IConfigurationProvider` that reads configuration values from the Azure KeyVault.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `vault`: Azure KeyVault uri.

Returns: The `IConfigurationBuilder`.

To be added.

## AzureKeyVaultConfigurationExtensions.AddAzureKeyVault(IConfigurationBuilder, String, IKeyVaultSecretManager) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddAzureKeyVault (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, string vault, Microsoft.Extensions.Configuration.AzureKeyVault.IKeyVaultSecretManager manager);
```

Adds an `IConfigurationProvider` that reads configuration values from the Azure KeyVault.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `vault`: Azure KeyVault uri.
- `manager`: The `IKeyVaultSecretManager` instance used to control secret loading.

Returns: The `IConfigurationBuilder`.

To be added.

## AzureKeyVaultConfigurationExtensions.AddAzureKeyVault(IConfigurationBuilder, String, KeyVaultClient, IKeyVaultSecretManager) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddAzureKeyVault (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, string vault, Microsoft.Azure.KeyVault.KeyVaultClient client, Microsoft.Extensions.Configuration.AzureKeyVault.IKeyVaultSecretManager manager);
```

Adds an `IConfigurationProvider` that reads configuration values from the Azure KeyVault.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `vault`: Azure KeyVault uri.
- `client`: The `KeyVaultClient` to use for retrieving values.
- `manager`: The `IKeyVaultSecretManager` instance used to control secret loading.

Returns: The `IConfigurationBuilder`.

To be added.

## AzureKeyVaultConfigurationExtensions.AddAzureKeyVault(IConfigurationBuilder, String, String, X509Certificate2) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddAzureKeyVault (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, string vault, string clientId, System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Adds an `IConfigurationProvider` that reads configuration values from the Azure KeyVault.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `vault`: Azure KeyVault uri.
- `clientId`: The application client id.
- `certificate`: The `X509Certificate2` to use for authentication.

Returns: The `IConfigurationBuilder`.

To be added.

## AzureKeyVaultConfigurationExtensions.AddAzureKeyVault(IConfigurationBuilder, String, String, String) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddAzureKeyVault (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, string vault, string clientId, string clientSecret);
```

Adds an `IConfigurationProvider` that reads configuration values from the Azure KeyVault.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `vault`: The Azure KeyVault uri.
- `clientId`: The application client id.
- `clientSecret`: The client secret to use for authentication.

Returns: The `IConfigurationBuilder`.

To be added.

## AzureKeyVaultConfigurationExtensions.AddAzureKeyVault(IConfigurationBuilder, String, String, X509Certificate2, IKeyVaultSecretManager) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddAzureKeyVault (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, string vault, string clientId, System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, Microsoft.Extensions.Configuration.AzureKeyVault.IKeyVaultSecretManager manager);
```

Adds an `IConfigurationProvider` that reads configuration values from the Azure KeyVault.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `vault`: Azure KeyVault uri.
- `clientId`: The application client id.
- `certificate`: The `X509Certificate2` to use for authentication.
- `manager`: The `IKeyVaultSecretManager` instance used to control secret loading.

Returns: The `IConfigurationBuilder`.

To be added.

## AzureKeyVaultConfigurationExtensions.AddAzureKeyVault(IConfigurationBuilder, String, String, String, IKeyVaultSecretManager) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddAzureKeyVault (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, string vault, string clientId, string clientSecret, Microsoft.Extensions.Configuration.AzureKeyVault.IKeyVaultSecretManager manager);
```

Adds an `IConfigurationProvider` that reads configuration values from the Azure KeyVault.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `vault`: The Azure KeyVault uri.
- `clientId`: The application client id.
- `clientSecret`: The client secret to use for authentication.
- `manager`: The `IKeyVaultSecretManager` instance used to control secret loading.

Returns: The `IConfigurationBuilder`.

To be added.
