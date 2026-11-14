---
title: "Options pattern in ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/configuration/options.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Options pattern in ASP.NET Core (part 2 of 3)

## Specify a custom key name for a configuration property using `ConfigurationKeyName`

By default, the property names of the options class are used as the key name in the configuration source. If the property name is `Title`, the key name in the configuration is `Title` as well.

When the names differentiate, you can use the `[ConfigurationKeyName]` attribute to specify the key name in the configuration source. Using this technique, you can map a property in the configuration to one in your code with a different name. This is useful when the property name in the configuration source isn't a valid C# identifier or when you want to use a different name in your code.

For example, consider the following options class.

`PositionKeyName.cs`:

```csharp
public class PositionKeyName
{
    public const string Position = "PositionKeyName";

    [ConfigurationKeyName("PositionName")]
    public string? Name { get; set; }

    [ConfigurationKeyName("PositionTitle")]
    public string? Title { get; set; }
}
```

The `Name` and `Title` class properties are bound to the `PositionName` and `PositionTitle` from the following JSON configuration:

```json
"PositionKeyName": {
  "PositionName": "Carlos Diego",
  "PositionTitle": "Director"
}
```

`PositionKeyNameOptions.razor`:

```razor
@page "/position-key-name-options"
@inject IConfiguration Config

Name: @positionOptions?.Name<br>
Title: @positionOptions?.Title

@code {
    private PositionKeyName? positionOptions;

    protected override void OnInitialized() =>
        positionOptions = Config.GetSection(PositionKeyName.Position)
            .Get<PositionKeyName>();
}
```

Output:

> :::no-loc text="Name: Carlos Diego":::
> :::no-loc text="Title: Director":::

After the app has started, changes to the JSON configuration in the app settings file are read. To demonstrate the behavior, change one or both configuration values in the app settings file and reload the page without restarting the app.

## Named options support using `IConfigureNamedOptions`

Named options:

* Are useful when multiple configuration sections bind to the same properties.
* Are case sensitive.

Consider the following JSON configuration:

```json
"TopItem": {
  "Month": {
    "Name": "Green Widget",
    "Model": "GW46"
  },
  "Year": {
    "Name": "Orange Gadget",
    "Model": "OG35"
  }
}
```

Rather than creating two classes to bind `TopItem:Month` and `TopItem:Year`, the following class is used for each section.

`TopItemSettings.cs`:

```csharp
public class TopItemSettings
{
    public const string Month = "Month";
    public const string Year = "Year";

    public string? Name { get; set; }
    public string? Model { get; set; }
}
```

Where services are registered for dependency injection, the following example configures the named options:

```csharp
builder.Services.Configure<TopItemSettings>(TopItemSettings.Month,
    builder.Configuration.GetSection("TopItem:Month"));
builder.Services.Configure<TopItemSettings>(TopItemSettings.Year,
    builder.Configuration.GetSection("TopItem:Year"));
```

The following example displays the named options:

`NamedOptions.razor`:

```razor
@page "/named-options"
@using Microsoft.Extensions.Options
@inject IOptionsSnapshot<TopItemSettings> Options

Month: Name: @monthTopItem?.Name Model: @monthTopItem?.Model<br>
Year: Name: @yearTopItem?.Name Model: @yearTopItem?.Model

@code {
    private TopItemSettings? monthTopItem;
    private TopItemSettings? yearTopItem;

    protected override void OnInitialized()
    {
        monthTopItem = Options.Get(TopItemSettings.Month);
        yearTopItem = Options.Get(TopItemSettings.Year);
    }
}
```

All options are named instances. `Microsoft.Extensions.Options.IConfigureOptions`1` instances are treated as targeting the `Options.DefaultName` instance, which is `string.Empty`. `Microsoft.Extensions.Options.IConfigureNamedOptions`1` also implements `Microsoft.Extensions.Options.IConfigureOptions`1`. The default implementation of the `Microsoft.Extensions.Options.IOptionsFactory`1` has logic to use each appropriately. The `null` named option is used to target all of the named instances instead of a specific named instance. `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.ConfigureAll*` and `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.PostConfigureAll*` use this convention.

Guidance on post-configuring named options is provided in the Options post-configuration section.

## `OptionsBuilder` API

`Microsoft.Extensions.Options.OptionsBuilder`1` is used to configure `TOptions` instances. `OptionsBuilder` streamlines creating named options as it's only a single parameter to the initial `AddOptions<TOptions>(string optionsName)` call instead of appearing in all of the subsequent calls. Options validation and the `Microsoft.Extensions.Options.IConfigureOptions`1` overloads that accept service dependencies are only available via `OptionsBuilder` (see Use DI services to configure options).

`Microsoft.Extensions.Options.OptionsBuilder`1` is demonstrated in the Options validation section.

For information adding a custom repository, see Get started with the Data Protection APIs in ASP.NET Core.

## Use DI services to configure options

Services can be accessed from dependency injection while configuring options in two ways:

* Configuration delegate
* Configuration options service

### Configuration delegate approach

Where services are registered for dependency injection, pass a configuration delegate to `Microsoft.Extensions.Options.OptionsBuilder`1.Configure*` on `Microsoft.Extensions.Options.OptionsBuilder`1`. `OptionsBuilder<TOptions>` provides overloads of `Microsoft.Extensions.Options.OptionsBuilder`1.Configure*` that allow use of up to five services to configure options:

```csharp
builder.Services.AddOptions<PositionOptions>("optionalName")
    .Configure<Service1, Service2, Service3, Service4, Service5>(
        (o, s, s2, s3, s4, s5) => 
            o.Property = DoSomethingWith(s, s2, s3, s4, s5));
```

### Configuration options service approach

Create a type that implements `Microsoft.Extensions.Options.IConfigureOptions`1` or `Microsoft.Extensions.Options.IConfigureNamedOptions`1` and register the type as a service.

We recommend passing a configuration delegate to `Microsoft.Extensions.Options.OptionsBuilder`1.Configure*`, since creating a service is more complex. Creating a type is equivalent to what the framework does when calling `Microsoft.Extensions.Options.OptionsBuilder`1.Configure*`. Calling `Microsoft.Extensions.Options.OptionsBuilder`1.Configure*` registers a transient generic `Microsoft.Extensions.Options.IConfigureNamedOptions`1`, which has a constructor that accepts the generic service types specified.

## Options validation

Options validation enables the validation of option values.

Consider the following JSON configuration:

```json
"KeyOptions": {
  "Key1": "Key One",
  "Key2": 10,
  "Key3": 32
}
```

The following class is used to bind to the `"KeyOptions"` configuration section and applies two data annotations rules, which include a regular expression and range requirement.

`KeyOptions.cs`:

```csharp
public class KeyOptions
{
    public const string Key = "KeyOptions";

    [RegularExpression(@"^[a-zA-Z\s]{1,40}$")]
    public string? Key1 { get; set; }

    [Range(0, 1000, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
    public int Key2 { get; set; }
    public int Key3 { get; set; }
}
```

Where services are registered for dependency injection, the following example:

* Calls `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.AddOptions*` to get an `Microsoft.Extensions.Options.OptionsBuilder`1` that binds to the `KeyOptions` class.
* Calls `Microsoft.Extensions.DependencyInjection.OptionsBuilderDataAnnotationsExtensions.ValidateDataAnnotations*` to enable validation.

```csharp
builder.Services.AddOptions<KeyOptions>()
    .Bind(builder.Configuration.GetSection(KeyOptions.Key))
    .ValidateDataAnnotations();
```

The `Microsoft.Extensions.DependencyInjection.OptionsBuilderDataAnnotationsExtensions.ValidateDataAnnotations*` extension method is defined in the `Microsoft.Extensions.Options.DataAnnotations` NuGet package. For web apps that use the `Microsoft.NET.Sdk.Web` SDK, this package is referenced implicitly from the shared framework.

Where services are registered for dependency injection, the following example applies a more complex validation rule using a delegate:

```csharp
builder.Services.AddOptions<KeyOptions>()
        .Bind(builder.Configuration.GetSection(KeyOptions.Key))
        .ValidateDataAnnotations()
    .Validate(options =>
    {
        return options.Key3 > options.Key2;
    }, "Key3 must be > than Key2");
```

The following example demonstrates how to log options validation exceptions and display an `Microsoft.Extensions.Options.OptionsValidationException.Message`.

> **Note:**
> For demonstration purposes, the following example uses a `Microsoft.AspNetCore.Components.MarkupString` to format raw HTML. Rendering raw HTML constructed from any untrusted source is a **security risk** and should **always** be avoided. For more information, see ASP.NET Core Razor components.

`OptionsValidation1.razor`:

```razor
@page "/options-validation-1"
@inject IOptionsSnapshot<KeyOptions> Options
@inject ILogger<OptionsValidation1> Logger

@if (message is not null)
{
    @((MarkupString)message)
}

@code {
    private string? message;

    protected override void OnInitialized()
    {
        try
        {
            var keyOptions = Options.Value;
        }
        catch (OptionsValidationException ex)
        {
            foreach (var failure in ex.Failures)
            {
                Logger.LogError(failure);
            }
        }

        try
        {
            message = 
                $"Key1: {Options.Value.Key1}<br>" +
                $"Key2: {Options.Value.Key2}<br>" +
                $"Key3: {Options.Value.Key3}";
        }
        catch (OptionsValidationException optValEx)
        {
            message = optValEx.Message;
        }
    }
}
```

The preceding code displays the configuration values or validation errors:

* Use the code with the preceding app settings configuration to demonstrate no validation errors.
* Change the configuration in the app settings file in one or more ways that violate the data annotations rules. Reload the options validation page to see the rule violations.

In the following example, the page content indicates that the value of `Key2` is out of range if the value of `Key2` in the app settings file is changed to a value below zero or over 1,000:

> :::no-loc text="DataAnnotation validation failed for 'KeyOptions' members: 'Key2' with the error: 'Value for Key2 must be between 0 and 1000.'.":::

## Validate options in a dedicated class with `IValidateOptions<TOptions>`

Implement `Microsoft.Extensions.Options.IValidateOptions`1` to validate options without the need to maintain validation rules with data annotations or in the app's `Program` file.

In the following example, the data annotations rules and options delegate validation of the preceding examples is moved to a validation class. The Options model class (`KeyOptions2`) doesn't contain data annotations.

Consider the following JSON configuration:

```json
"KeyOptions": {
  "Key1": "Key One",
  "Key2": 10,
  "Key3": 32
}
```

`KeyOptions2.cs`:

```csharp
public class KeyOptions2
{
    public const string Key = "KeyOptions";

    public string? Key1 { get; set; }
    public int Key2 { get; set; }
    public int Key3 { get; set; }
}
```

```csharp
public class KeyOptionsValidation : IValidateOptions<KeyOptions2>
{
    public ValidateOptionsResult Validate(string? name, KeyOptions2 options)
    {
        if (options == null)
        {
            return ValidateOptionsResult.Fail("KeyOptions not found.");
        }

        StringBuilder? validationResult = new();
        var rx = new Regex(@"^[a-zA-Z\s]{1,40}$");
        var match = rx.Match(options.Key1!);

        if (string.IsNullOrEmpty(match.Value))
        {
            validationResult.Append($"{options.Key1} doesn't match RegEx<br>");
        }

        if (options.Key2 < 0 || options.Key2 > 1000)
        {
            validationResult.Append($"{options.Key2} doesn't match Range 0 - 1000<br>");
        }

        if (options.Key3 < options.Key2)
        {
            validationResult.Append("Key3 must be > than Key2<br>");
        }

        if (validationResult.Length > 0)
        {
            return ValidateOptionsResult.Fail(validationResult.ToString());
        }

        return ValidateOptionsResult.Success;
    }
}
```

Where services are registered for dependency injection and using the preceding code, validation is enabled in `Program.cs` with the following example:

```csharp
builder.Services.Configure<KeyOptions2>(
    builder.Configuration.GetSection(KeyOptions2.Key));

builder.Services.AddSingleton<IValidateOptions<KeyOptions2>, 
    KeyOptionsValidation>();
```

The following example demonstrates how to log options validation exceptions and display an `Microsoft.Extensions.Options.OptionsValidationException.Message`.

`OptionsValidation2.razor`:

```razor
@page "/options-validation-2"
@inject IOptionsSnapshot<KeyOptions2> Options
@inject ILogger<OptionsValidation2> Logger

@if (message is not null)
{
    @((MarkupString)message)
}

@code {
    private string? message;

    protected override void OnInitialized()
    {
        try
        {
            var keyOptions = Options.Value;
        }
        catch (OptionsValidationException ex)
        {
            foreach (var failure in ex.Failures)
            {
                Logger.LogError(failure);
            }
        }

        try
        {
            message = 
                $"Key1: {Options.Value.Key1}<br>" +
                $"Key2: {Options.Value.Key2}<br>" +
                $"Key3: {Options.Value.Key3}";
        }
        catch (OptionsValidationException optValEx)
        {
            message = optValEx.Message;
        }
    }
}
```
