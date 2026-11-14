---
title: "Compile-time options validation source generation (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/options-validation-generator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Compile-time options validation source generation (part 3 of 3)

> **Note:**
> You don't need to take any additional steps to enable the options validation source generator. It's automatically enabled by default when your project references Microsoft.Extensions.Options version 8 or later, or when building an ASP.NET application.

The only step you need to take is to add the following to the startup code:

```csharp
builder.Services
    .AddSingleton<IValidateOptions<SettingsOptions>, ValidateSettingsOptions>();
```

> **Note:**
> Calling `Microsoft.Extensions.DependencyInjection.OptionsBuilderDataAnnotationsExtensions.ValidateDataAnnotations``1(Microsoft.Extensions.Options.OptionsBuilder{``0})` isn't required when using the options validation source generator.

When the application attempts to access the options object, the generated code for options validation is executed to validate the options object. The following code snippet illustrates how to access the options object:

```csharp
var settingsOptions =
    app.Services.GetRequiredService<IOptions<SettingsOptions>>().Value;
```

## Replaced data annotation attributes

Upon close examination of the generated code, you'll observe that the original data annotation attributes, such as `System.ComponentModel.DataAnnotations.RangeAttribute`, that were initially applied to the property `SettingsOptions.Scale`, have been substituted with custom attributes like `__SourceGen__RangeAttribute`. This substitution is made because the `RangeAttribute` relies on reflection for validation. In contrast, `__SourceGen__RangeAttribute` is a custom attribute optimized for performance and doesn't depend on reflection, making the code AOT-compatible. The same pattern of attribute replacement will be applied on `System.ComponentModel.DataAnnotations.MaxLengthAttribute`, `System.ComponentModel.DataAnnotations.MinLengthAttribute`, and `System.ComponentModel.DataAnnotations.LengthAttribute` in addition to `System.ComponentModel.DataAnnotations.RangeAttribute`.

For anyone developing custom data annotation attributes, it's advisable to refrain from using reflection for validation. Instead, it's recommended to craft strongly typed code that doesn't rely on reflection. This approach ensures smooth compatibility with AOT builds.

## See also

Options pattern
