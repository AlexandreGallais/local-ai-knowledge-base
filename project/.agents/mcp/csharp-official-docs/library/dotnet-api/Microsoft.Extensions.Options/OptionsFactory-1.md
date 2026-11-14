---
title: "OptionsFactory<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/OptionsFactory`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsFactory<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class OptionsFactory<TOptions> : Microsoft.Extensions.Options.IOptionsFactory<TOptions> where TOptions : class
```

Implementation of `IOptionsFactory<T>`.

Parameters:

- `TOptions`: The type of options being requested.

To be added.

## OptionsFactory<TOptions>.OptionsFactory(IConfigureOptions<TOptions>>, IPostConfigureOptions<TOptions>>) constructor

```csharp
public OptionsFactory (System.Collections.Generic.IEnumerable<Microsoft.Extensions.Options.IConfigureOptions<TOptions>> setups, System.Collections.Generic.IEnumerable<Microsoft.Extensions.Options.IPostConfigureOptions<TOptions>> postConfigures);
```

Initializes a new instance with the specified options configurations.

Parameters:

- `setups`: The configuration actions to run.
- `postConfigures`: The initialization actions to run.

To be added.

## OptionsFactory<TOptions>.OptionsFactory(IConfigureOptions<TOptions>>, IPostConfigureOptions<TOptions>>, IValidateOptions<TOptions>>) constructor

```csharp
public OptionsFactory (System.Collections.Generic.IEnumerable<Microsoft.Extensions.Options.IConfigureOptions<TOptions>> setups, System.Collections.Generic.IEnumerable<Microsoft.Extensions.Options.IPostConfigureOptions<TOptions>> postConfigures, System.Collections.Generic.IEnumerable<Microsoft.Extensions.Options.IValidateOptions<TOptions>> validations);
```

Initializes a new instance with the specified options configurations.

Parameters:

- `setups`: The configuration actions to run.
- `postConfigures`: The initialization actions to run.
- `validations`: The validations to run.

To be added.

## OptionsFactory<TOptions>.Create(String) method

```csharp
public TOptions Create (string name);
```

Returns a configured `TOptions` instance with the given `name`.

Parameters:

- `name`: The name of the `TOptions` instance to create.

Returns: The created `TOptions` instance with the given `name`.

Exceptions:

- `OptionsValidationException`: One or more `IValidateOptions<T>` return failed `ValidateOptionsResult` when validating the `TOptions` instance created.
- `MissingMethodException`: The `TOptions` does not have a public parameterless constructor or `TOptions` is `abstract`.

To be added.

## OptionsFactory<TOptions>.CreateInstance(String) method

```csharp
protected virtual TOptions CreateInstance (string name);
```

Creates a new instance of type `TOptions`.

Parameters:

- `name`: The name of the `TOptions` instance to create.

Returns: The created `TOptions` instance.

Exceptions:

- `MissingMethodException`: The `TOptions` does not have a public parameterless constructor or `TOptions` is `abstract`.

To be added.
