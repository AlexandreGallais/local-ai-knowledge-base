---
title: "ASP.NET Core Blazor forms binding (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/forms/binding.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor forms binding

This article explains how to use binding in Blazor forms.

## `EditForm`/`EditContext` model

An `Microsoft.AspNetCore.Components.Forms.EditForm` creates an `Microsoft.AspNetCore.Components.Forms.EditContext` based on the assigned object as a cascading value for other components in the form. The `Microsoft.AspNetCore.Components.Forms.EditContext` tracks metadata about the edit process, including which form fields have been modified and the current validation messages. Assigning to either an `Microsoft.AspNetCore.Components.Forms.EditForm.Model` or an `Microsoft.AspNetCore.Components.Forms.EditForm.EditContext` can bind a form to data.

## Model binding

Assignment to `Microsoft.AspNetCore.Components.Forms.EditForm.Model`:

```razor
<EditForm ... Model="Model" ...>
    ...
</EditForm>

@code {
    [SupplyParameterFromForm]
    private Starship? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();
}
```

When a different object instance is assigned to the `Microsoft.AspNetCore.Components.Forms.EditForm.Model` parameter of `EditForm`, the form creates a new `EditContext`. The new context starts with no modified fields or validation messages.

## Context binding

Assignment to `Microsoft.AspNetCore.Components.Forms.EditForm.EditContext`:

```razor
<EditForm ... EditContext="editContext" ...>
    ...
</EditForm>

@code {
    private EditContext? editContext;

    [SupplyParameterFromForm]
    private Starship? Model { get; set; }

    protected override void OnInitialized()
    {
        Model ??= new();
        editContext = new(Model);
    }
}
```

Assign **either** an `Microsoft.AspNetCore.Components.Forms.EditForm.EditContext` **or** a `Microsoft.AspNetCore.Components.Forms.EditForm.Model` to an `Microsoft.AspNetCore.Components.Forms.EditForm`. If both are assigned, a runtime error is thrown.

## Supported types

Binding supports:

* Primitive types
* Collections
* Complex types
* Recursive types
* Types with constructors
* Enums

You can also use the `[DataMember]` and `[IgnoreDataMember]` attributes to customize model binding. Use these attributes to rename properties, ignore properties, and mark properties as required.

When binding a type with constructor parameters, if a constructor parameter matches a property by name, the constructor parameter takes precedence. The mapper uses the property's explicit `DataMember.Name`, if present, as the form field name, but otherwise ignores the property's mapping attributes. Constructor parameters are always required.

## Additional binding options

Additional model binding options are available from `Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions` when calling `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*`:

* `Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingCollectionSize`: Maximum number of elements allowed in a form collection.
* `Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingRecursionDepth`: Maximum depth allowed when recursively mapping form data.
* `Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingErrorCount`: Maximum number of errors allowed when mapping form data.
* `Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.MaxFormMappingKeySize`: Maximum size of the buffer used to read form data keys.

The following demonstrates the default values assigned by the framework:

```csharp
builder.Services.AddRazorComponents(options =>
{
    options.FormMappingUseCurrentCulture = true;
    options.MaxFormMappingCollectionSize = 1024;
    options.MaxFormMappingErrorCount = 200;
    options.MaxFormMappingKeySize = 1024 * 2;
    options.MaxFormMappingRecursionDepth = 64;
}).AddInteractiveServerComponents();
```

## Form names

Use the `Microsoft.AspNetCore.Components.Forms.EditForm.FormName` parameter to assign a form name. Form names must be unique to bind model data. The following form is named `RomulanAle`:

```razor
<EditForm ... FormName="RomulanAle" ...>
    ...
</EditForm>
```

Supplying a form name:

* Is required for all forms that are submitted by statically-rendered server-side components.
* Isn't required for forms that are submitted by interactively-rendered components, which includes forms in Blazor WebAssembly apps and components with an interactive render mode. However, we recommend supplying a unique form name for every form to prevent runtime form posting errors if interactivity is ever dropped for a form.

The form name is only checked when the form is posted to an endpoint as a traditional HTTP POST request from a statically-rendered server-side component. The framework doesn't throw an exception at the point of rendering a form, but only at the point that an HTTP POST arrives and doesn't specify a form name.

There's an unnamed (empty string) form scope above the app's root component, which suffices when there are no form name collisions in the app. If form name collisions are possible, such as when including a form from a library and you have no control of the form name used by the library's developer, provide a form name scope with the `Microsoft.AspNetCore.Components.Forms.FormMappingScope` component in the Blazor Web App's main project.

In the following example, the `HelloFormFromLibrary` component has a form named `Hello` and is in a library.

`HelloFormFromLibrary.razor`:

```razor
<EditForm FormName="Hello" Model="this" OnSubmit="Submit">
    <InputText @bind-Value="Name" />
    <button type="submit">Submit</button>
</EditForm>

@if (submitted)
{
    <p>Hello @Name from the library's form!</p>
}

@code {
    bool submitted = false;

    [SupplyParameterFromForm]
    private string? Name { get; set; }

    private void Submit() => submitted = true;
}
```

The following `NamedFormsWithScope` component uses the library's `HelloFormFromLibrary` component and also has a form named `Hello`. The `Microsoft.AspNetCore.Components.Forms.FormMappingScope` component's scope name is `ParentContext` for any forms supplied by the `HelloFormFromLibrary` component. Although both of the forms in this example have the form name (`Hello`), the form names don't collide and events are routed to the correct form for form POST events.

`NamedFormsWithScope.razor`:

```razor
@page "/named-forms-with-scope"

<div>Hello form from a library</div>

<FormMappingScope Name="ParentContext">
    <HelloFormFromLibrary />
</FormMappingScope>

<div>Hello form using the same form name</div>

<EditForm FormName="Hello" Model="this" OnSubmit="Submit">
    <InputText @bind-Value="Name" />
    <button type="submit">Submit</button>
</EditForm>

@if (submitted)
{
    <p>Hello @Name from the app form!</p>
}

@code {
    bool submitted = false;

    [SupplyParameterFromForm]
    private string? Name { get; set; }

    private void Submit() => submitted = true;
}
```

## Supply a parameter from the form (`[SupplyParameterFromForm]`)

The `[SupplyParameterFromForm]` attribute indicates that the value of the associated property should be supplied from the form data for the form. Data in the request that matches the name of the property is bound to the property. Inputs based on `InputBase<TValue>` generate form value names that match the names Blazor uses for model binding. Unlike component parameter properties (`[Parameter]`), properties annotated with `[SupplyParameterFromForm]` aren't required to be marked `public`.

Blazor form mapping with `[SupplyParameterFromForm]` doesn't use MVC model binding. Attributes in the `Microsoft.AspNetCore.Mvc.ModelBinding` namespace, such as `[BindNever]` and `[BindRequired]`, aren't supported. Don't use these attributes to prevent overposting. Instead, use a dedicated form model, view model, or data transfer object (DTO) that includes only the properties users are allowed to modify. For more information, see Mitigate overposting attacks.

You can specify the following form binding parameters to the `[SupplyParameterFromForm]` attribute:

* `Microsoft.AspNetCore.Components.SupplyParameterFromFormAttribute.Name`: Gets or sets the name for the parameter. The name is used to determine the prefix to use to match the form data and decide whether or not the value needs to be bound.
* `Microsoft.AspNetCore.Components.SupplyParameterFromFormAttribute.FormName`: Gets or sets the name for the handler. The name is used to match the parameter to the form by form name to decide whether or not the value needs to be bound.

The following example independently binds two forms to their models by form name.

`Starship6.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship6.razor._
## Nest and bind forms

The following guidance demonstrates how to nest and bind child forms.

The following ship details class (`ShipDetails`) holds a description and length for a subform.

`ShipDetails.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/ShipDetails.cs._
The following `Ship` class names an identifier (`Id`) and includes the ship details.

`Ship.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Ship.cs._
The following subform is used for editing values of the `ShipDetails` type. This is implemented by inheriting `Microsoft.AspNetCore.Components.Forms.Editor`1` at the top of the component. `Microsoft.AspNetCore.Components.Forms.Editor`1` ensures that the child component generates the correct form field names based on the model (`T`), where `T` in the following example is `ShipDetails`.

`StarshipSubform.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/StarshipSubform.razor._
The main form is bound to the `Ship` class. The `StarshipSubform` component is used to edit ship details, bound as `Model!.Details`.

`Starship7.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship7.razor._
## Initialize form data with static SSR

When a component adopts static SSR, the `OnInitialized{Async}` lifecycle method and the `OnParametersSet{Async}` lifecycle method fire when the component is initially rendered and on every form POST to the server. To initialize form model values, confirm if the model already has data before assigning new model values in `OnParametersSet{Async}`, as the following example demonstrates.

`StarshipInit.razor`:

```razor
@page "/starship-init"
@inject ILogger<StarshipInit> Logger

<EditForm Model="Model" OnValidSubmit="Submit" FormName="StarshipInit">
    <div>
        <label>
            Identifier:
            <InputText @bind-Value="Model!.Id" />
        </label>
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</EditForm>

@code {
    [SupplyParameterFromForm]
    private Starship? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();

    protected override void OnParametersSet()
    {
        if (Model!.Id == default)
        {
            LoadData();
        }
    }

    private void LoadData()
    {
        Model!.Id = "Set by LoadData";
    }

    private void Submit()
    {
        Logger.LogInformation("Id = {Id}", Model?.Id);
    }

    public class Starship
    {
        public string? Id { get; set; }
    }
}
```

## Advanced form mapping error scenarios

The framework instantiates and populates the `Microsoft.AspNetCore.Components.Forms.FormMappingContext` for a form, which is the context associated with a given form's mapping operation. Each mapping scope (defined by a `Microsoft.AspNetCore.Components.Forms.FormMappingScope` component) instantiates `Microsoft.AspNetCore.Components.Forms.FormMappingContext`. Each time a `[SupplyParameterFromForm]` asks the context for a value, the framework populates the `Microsoft.AspNetCore.Components.Forms.FormMappingContext` with the attempted value and any mapping errors.

Developers aren't expected to interact with `Microsoft.AspNetCore.Components.Forms.FormMappingContext` directly, as it's mainly a source of data for `Microsoft.AspNetCore.Components.Forms.InputBase`1`, `Microsoft.AspNetCore.Components.Forms.EditContext`, and other internal implementations to show mapping errors as validation errors. In advanced custom scenarios, developers can access `Microsoft.AspNetCore.Components.Forms.FormMappingContext` directly as a `[CascadingParameter]` to write custom code that consumes the attempted values and mapping errors.

## `InputText` based on the input event

Use the `Microsoft.AspNetCore.Components.Forms.InputText` component to create a custom component that uses the `oninput` event (`input`) instead of the `onchange` event (`change`). Use of the `input` event triggers field validation on each keystroke.

The following `CustomInputText` component inherits the framework's `InputText` component and sets event binding to the `oninput` event (`input`).

`CustomInputText.razor`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/CustomInputText.razor._
The `CustomInputText` component can be used anywhere `Microsoft.AspNetCore.Components.Forms.InputText` is used. The following  component uses the shared `CustomInputText` component.

`Starship11.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Starship11.razor._
