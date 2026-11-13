---
title: "Options pattern (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/options.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Options pattern (part 3 of 3)

## Options post-configuration

Set post-configuration with `Microsoft.Extensions.Options.IPostConfigureOptions`1`. Post-configuration runs after all `Microsoft.Extensions.Options.IConfigureOptions`1` configuration occurs, and can be useful in scenarios when you need to override configuration:

```csharp
builder.Services.PostConfigure<CustomOptions>(customOptions =>
{
    customOptions.Option1 = "post_configured_option1_value";
});
```

`Microsoft.Extensions.Options.IPostConfigureOptions`1.PostConfigure*` is available to post-configure named options:

```csharp
builder.Services.PostConfigure<CustomOptions>("named_options_1", customOptions =>
{
    customOptions.Option1 = "post_configured_option1_value";
});
```

Use `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.PostConfigureAll*` to post-configure all configuration instances:

```csharp
builder.Services.PostConfigureAll<CustomOptions>(customOptions =>
{
    customOptions.Option1 = "post_configured_option1_value";
});
```

## See also

- Configuration in .NET
- Options pattern guidance for .NET library authors
