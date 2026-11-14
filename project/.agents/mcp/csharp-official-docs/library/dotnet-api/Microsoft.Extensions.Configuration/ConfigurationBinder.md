---
title: "ConfigurationBinder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ConfigurationBinder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationBinder class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class ConfigurationBinder
```

Static helper class that allows binding strongly typed objects to configuration values.

#### Remarks

For more information and examples, see Binding.

## ConfigurationBinder.Bind(IConfiguration, Object) method

```csharp
public static void Bind (this Microsoft.Extensions.Configuration.IConfiguration configuration, object? instance);
```

Attempts to bind the given object instance to configuration values by matching property names against configuration keys recursively.

Parameters:

- `configuration`: The configuration instance to bind.
- `instance`: The object to bind.

To be added.

## ConfigurationBinder.Bind(IConfiguration, Object, BinderOptions>) method

```csharp
public static void Bind (this Microsoft.Extensions.Configuration.IConfiguration configuration, object? instance, Action<Microsoft.Extensions.Configuration.BinderOptions>? configureOptions);
```

Attempts to bind the given object instance to configuration values by matching property names against configuration keys recursively.

Parameters:

- `configuration`: The configuration instance to bind.
- `instance`: The object to bind.
- `configureOptions`: Configures the binder options.

To be added.

## ConfigurationBinder.Bind(IConfiguration, String, Object) method

```csharp
public static void Bind (this Microsoft.Extensions.Configuration.IConfiguration configuration, string key, object? instance);
```

Attempts to bind the given object instance to the configuration section specified by the key by matching property names against configuration keys recursively.

Parameters:

- `configuration`: The configuration instance to bind.
- `key`: The key of the configuration section to bind.
- `instance`: The object to bind.

To be added.

## ConfigurationBinder.Get(IConfiguration, Type) method

```csharp
public static object? Get (this Microsoft.Extensions.Configuration.IConfiguration configuration, Type type);
```

Attempts to bind the configuration instance to a new instance of type T.
If this configuration section has a value, that will be used.
Otherwise binding by matching property names against configuration keys recursively.

Parameters:

- `configuration`: The configuration instance to bind.
- `type`: The type of the new instance to bind.

Returns: The new instance if successful, null otherwise.

To be added.

## ConfigurationBinder.Get(IConfiguration, Type, BinderOptions>) method

```csharp
public static object? Get (this Microsoft.Extensions.Configuration.IConfiguration configuration, Type type, Action<Microsoft.Extensions.Configuration.BinderOptions>? configureOptions);
```

Attempts to bind the configuration instance to a new instance of type T.
If this configuration section has a value, that will be used.
Otherwise binding by matching property names against configuration keys recursively.

Parameters:

- `configuration`: The configuration instance to bind.
- `type`: The type of the new instance to bind.
- `configureOptions`: Configures the binder options.

Returns: The new instance if successful, null otherwise.

To be added.

## ConfigurationBinder.Get<T>(IConfiguration) method

```csharp
public static T? Get<T> (this Microsoft.Extensions.Configuration.IConfiguration configuration);
```

Attempts to bind the configuration instance to a new instance of type T.
If this configuration section has a value, that will be used.
Otherwise binding by matching property names against configuration keys recursively.

Parameters:

- `T`: The type of the new instance to bind.
- `configuration`: The configuration instance to bind.

Returns: The new instance of T if successful, default(T) otherwise.

To be added.

## ConfigurationBinder.Get<T>(IConfiguration, BinderOptions>) method

```csharp
public static T? Get<T> (this Microsoft.Extensions.Configuration.IConfiguration configuration, Action<Microsoft.Extensions.Configuration.BinderOptions>? configureOptions);
```

Attempts to bind the configuration instance to a new instance of type T.
If this configuration section has a value, that will be used.
Otherwise binding by matching property names against configuration keys recursively.

Parameters:

- `T`: The type of the new instance to bind.
- `configuration`: The configuration instance to bind.
- `configureOptions`: Configures the binder options.

Returns: The new instance of T if successful, default(T) otherwise.

To be added.

## ConfigurationBinder.GetValue(IConfiguration, Type, String) method

```csharp
public static object? GetValue (this Microsoft.Extensions.Configuration.IConfiguration configuration, Type type, string key);
```

Extracts the value with the specified key and converts it to the specified type.

Parameters:

- `configuration`: The configuration.
- `type`: The type to convert the value to.
- `key`: The key of the configuration section's value to convert.

Returns: The converted value.

To be added.

## ConfigurationBinder.GetValue(IConfiguration, Type, String, Object) method

```csharp
public static object? GetValue (this Microsoft.Extensions.Configuration.IConfiguration configuration, Type type, string key, object? defaultValue);
```

Extracts the value with the specified key and converts it to the specified type.

Parameters:

- `configuration`: The configuration.
- `type`: The type to convert the value to.
- `key`: The key of the configuration section's value to convert.
- `defaultValue`: The default value to use if no value is found.

Returns: The converted value.

To be added.

## ConfigurationBinder.GetValue<T>(IConfiguration, String) method

```csharp
public static T? GetValue<T> (this Microsoft.Extensions.Configuration.IConfiguration configuration, string key);
```

Extracts the value with the specified key and converts it to type T.

Parameters:

- `T`: The type to convert the value to.
- `configuration`: The configuration.
- `key`: The key of the configuration section's value to convert.

Returns: The converted value.

To be added.

## ConfigurationBinder.GetValue<T>(IConfiguration, String, T) method

```csharp
public static T? GetValue<T> (this Microsoft.Extensions.Configuration.IConfiguration configuration, string key, T defaultValue);
```

Extracts the value with the specified key and converts it to type T.

Parameters:

- `T`: The type to convert the value to.
- `configuration`: The configuration.
- `key`: The key of the configuration section's value to convert.
- `defaultValue`: The default value to use if no value is found.

Returns: The converted value.

To be added.
