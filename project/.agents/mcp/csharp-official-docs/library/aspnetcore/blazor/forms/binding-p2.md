---
title: "ASP.NET Core Blazor forms binding (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/forms/binding.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor forms binding (part 2 of 2)

## Custom input components

For custom input processing scenarios, the following subsections demonstrate custom input components:

* Input component based on `InputBase<T>`: The component inherits from `Microsoft.AspNetCore.Components.Forms.InputBase`1`, which provides a base implementation for binding, callbacks, and validation. Components that inherit from `Microsoft.AspNetCore.Components.Forms.InputBase`1` must be used in a Blazor form (`Microsoft.AspNetCore.Components.Forms.EditForm`).

* Input component with full developer control: The component takes full control of input processing. The component's code must manage binding, callbacks, and validation. The component can be used inside or outside of a Blazor form.

We recommend that you derive your custom input components from `Microsoft.AspNetCore.Components.Forms.InputBase`1` unless specific requirements prevent you from doing so. The `Microsoft.AspNetCore.Components.Forms.InputBase`1` class is actively maintained by the ASP.NET Core team, ensuring it stays up-to-date with the latest Blazor features and framework changes.

### Input component based on `InputBase<T>`

The following example component:

* Inherits from `Microsoft.AspNetCore.Components.Forms.InputBase`1`. Components that inherit from `Microsoft.AspNetCore.Components.Forms.InputBase`1` must be used in a Blazor form (`Microsoft.AspNetCore.Components.Forms.EditForm`).
* Takes boolean input from a checkbox.
* Sets the background color of its container `` based on the checkbox's state, which occurs when the `AfterChange` method executes after binding (`@bind:after`).
* Is required to override the base class's `TryParseValueFromString` method but doesn't process string input data because a checkbox doesn't provide string data. Example implementations of `TryParseValueFromString` for other types of input components that process string input are available in the ASP.NET Core reference source.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

`EngineeringApprovalInputDerived.razor`:

```razor
@using System.Diagnostics.CodeAnalysis
@inherits InputBase<bool>

<div class="@divCssClass">
    <label>
        Engineering Approval:
        <input @bind="CurrentValue" @bind:after="AfterChange" class="@CssClass" 
            type="checkbox" />
    </label>
</div>

@code {
    private string? divCssClass;

    private void AfterChange()
    {
        divCssClass = CurrentValue ? "bg-success text-white" : null;
    }

    protected override bool TryParseValueFromString(
        string? value, out bool result, 
        [NotNullWhen(false)] out string? validationErrorMessage)
            => throw new NotSupportedException(
                "This component does not parse string inputs. " +
                $"Bind to the '{nameof(CurrentValue)}' property, " +
                $"not '{nameof(CurrentValueAsString)}'.");
}
```

To use the preceding component in the starship example form (`Starship3.razor`/`Starship.cs`), replace the `` block for the engineering approval field with an `EngineeringApprovalInputDerived` component instance bound to the model's `IsValidatedDesign` property:

```diff
- <div>
-     <label>
-         Engineering Approval: 
-         <InputCheckbox @bind-Value="Model!.IsValidatedDesign" />
-     </label>
- </div>
+ <EngineeringApprovalInputDerived @bind-Value="Model!.IsValidatedDesign" />
```

If the component that inherits from `Microsoft.AspNetCore.Components.Forms.InputBase`1` is ever statically rendered, assign the `Microsoft.AspNetCore.Components.Forms.InputBase`1.NameAttributeValue` property to the `name` attribute of `` elements:

```razor
<input @bind="CurrentValue" @bind:after="AfterChange" class="@CssClass"
    type="checkbox" name="@NameAttributeValue" />
```

The preceding assignment isn't necessary if the component is guaranteed to always render interactively.

### Input component with full developer control

The following example component:

* Doesn't inherit from `Microsoft.AspNetCore.Components.Forms.InputBase`1`. The component takes full control of input processing, including binding, callbacks, and validation. The component can be used inside or outside of a Blazor form (`Microsoft.AspNetCore.Components.Forms.EditForm`).
* Takes boolean input from a checkbox.
* Changes the background color if the checkbox is checked.

Code in the component includes:

* The `Value` property is used with two-way binding to get or set the value of the input. `ValueChanged` is the callback that updates the bound value.

* When used in a Blazor form:

  * The `Microsoft.AspNetCore.Components.Forms.EditContext` is a cascading value.
  * `fieldCssClass` styles the field based on the result of `Microsoft.AspNetCore.Components.Forms.EditContext` validation.
  * `ValueExpression` is an expression (`Expression<Func<T>>`) assigned by the framework that identifies the bound value.
  * `Microsoft.AspNetCore.Components.Forms.FieldIdentifier` uniquely identifies a single field that can be edited, usually corresponding to a model property. The field identifier is created with the expression that identifies the bound value (`ValueExpression`).

* In the `OnChange` event handler:

  * The value of the checkbox input is obtained from `Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs`.
  * The background color and text color of the container `` element are set.
  * `Microsoft.AspNetCore.Components.EventCallback.InvokeAsync*` invokes the delegate associated with the binding and dispatches an event notification to consumers that the value has changed.
  * If the component is used in an `Microsoft.AspNetCore.Components.Forms.EditForm` (the `EditContext` property isn't `null`), `Microsoft.AspNetCore.Components.Forms.EditContext.NotifyFieldChanged*` is called to trigger validation.

`EngineeringApprovalInputStandalone.razor`:

```razor
@using System.Globalization
@using System.Linq.Expressions

<div class="@divCssClass">
    <label>
        Engineering Approval:
        <input class="@fieldCssClass" @onchange="OnChange" type="checkbox" 
            value="@Value" />
    </label>
</div>

@code {
    private string? divCssClass;
    private FieldIdentifier fieldIdentifier;
    private string? fieldCssClass => EditContext?.FieldCssClass(fieldIdentifier);

    [CascadingParameter]
    private EditContext? EditContext { get; set; }

    [Parameter]
    public bool? Value { get; set; }

    [Parameter]
    public EventCallback<bool> ValueChanged { get; set; }

    [Parameter]
    public Expression<Func<bool>>? ValueExpression { get; set; }

    protected override void OnInitialized()
    {
        fieldIdentifier = FieldIdentifier.Create(ValueExpression!);
    }

    private async Task OnChange(ChangeEventArgs args)
    {
        BindConverter.TryConvertToBool(args.Value, CultureInfo.CurrentCulture, 
            out var value);

        divCssClass = value ? "bg-success text-white" : null;

        await ValueChanged.InvokeAsync(value);
        EditContext?.NotifyFieldChanged(fieldIdentifier);
    }
}
```

To use the preceding component in the starship example form (`Starship3.razor`/`Starship.cs`), replace the `` block for the engineering approval field with a `EngineeringApprovalInputStandalone` component instance bound to the model's `IsValidatedDesign` property:

```diff
- <div>
-     <label>
-         Engineering Approval: 
-         <InputCheckbox @bind-Value="Model!.IsValidatedDesign" />
-     </label>
- </div>
+ <EngineeringApprovalInputStandalone @bind-Value="Model!.IsValidatedDesign" />
```

The `EngineeringApprovalInputStandalone` component is also functional outside of an `Microsoft.AspNetCore.Components.Forms.EditForm`:

```razor
<EngineeringApprovalInputStandalone @bind-Value="ValidDesign" />

<div>
    <b>ValidDesign:</b> @ValidDesign
</div>

@code {
    private bool ValidDesign { get; set; }
}
```

## Radio buttons

The example in this section is based on the `Starfleet Starship Database` form (`Starship3` component) of the Example form section of this article.

Add the following `enum` types to the app. Create a new file to hold them or add them to the `Starship.cs` file.

```csharp
public class ComponentEnums
{
    public enum Manufacturer { SpaceX, NASA, ULA, VirginGalactic, Unknown }
    public enum Color { ImperialRed, SpacecruiserGreen, StarshipBlue, VoyagerOrange }
    public enum Engine { Ion, Plasma, Fusion, Warp }
}
```

Make the `ComponentEnums` class accessible to the:

* `Starship` model in `Starship.cs` (for example, `using static ComponentEnums;`).
* `Starfleet Starship Database` form (`Starship3.razor`) (for example, `@using static ComponentEnums`).

Use `Microsoft.AspNetCore.Components.Forms.InputRadio`1` components with the `Microsoft.AspNetCore.Components.Forms.InputRadioGroup`1` component to create a radio button group. In the following example, properties are added to the `Starship` model described in the Example form section of the *Input components* article:

```csharp
[Required]
[Range(typeof(Manufacturer), nameof(Manufacturer.SpaceX), 
    nameof(Manufacturer.VirginGalactic), ErrorMessage = "Pick a manufacturer.")]
public Manufacturer Manufacturer { get; set; } = Manufacturer.Unknown;

[Required, EnumDataType(typeof(Color))]
public Color? Color { get; set; } = null;

[Required, EnumDataType(typeof(Engine))]
public Engine? Engine { get; set; } = null;
```

Update the `Starfleet Starship Database` form (`Starship3` component) of the Example form section of the *Input components* article. Add the components to produce:

* A radio button group for the ship manufacturer.
* A nested radio button group for engine and ship color.

> **Note:**
> Nested radio button groups aren't often used in forms because they can result in a disorganized layout of form controls that may confuse users. However, there are cases when they make sense in UI design, such as in the following example that pairs recommendations for two user inputs, ship engine and ship color. One engine and one color are required by the form's validation. The form's layout uses nested `Microsoft.AspNetCore.Components.Forms.InputRadioGroup`1`s to pair engine and color recommendations. However, the user can combine any engine with any color to submit the form.

> **Note:**
> Be sure to make the `ComponentEnums` class available to the component for the following example:
>
> ```razor
> @using static ComponentEnums
> ```

```razor
<fieldset>
    <legend>Manufacturer</legend>
    <InputRadioGroup @bind-Value="Model!.Manufacturer">
        @foreach (var manufacturer in Enum.GetValues<Manufacturer>())
        {
            <div>
                <label>
                    <InputRadio Value="manufacturer" />
                    @manufacturer
                </label>
            </div>
        }
    </InputRadioGroup>
</fieldset>

<fieldset>
    <legend>Engine and Color</legend>
    <p>
        Engine and color pairs are recommended, but any
        combination of engine and color is allowed.
    </p>
    <InputRadioGroup Name="engine" @bind-Value="Model!.Engine">
        <InputRadioGroup Name="color" @bind-Value="Model!.Color">
            <div style="margin-bottom:5px">
                <div>
                    <label>
                        <InputRadio Name="engine" Value="Engine.Ion" />
                        Ion
                    </label>
                </div>
                <div>
                    <label>
                        <InputRadio Name="color" Value="Color.ImperialRed" />
                        Imperial Red
                    </label>
                </div>
            </div>
            <div style="margin-bottom:5px">
                <div>
                    <label>
                        <InputRadio Name="engine" Value="Engine.Plasma" />
                        Plasma
                    </label>
                </div>
                <div>
                    <label>
                        <InputRadio Name="color" Value="Color.SpacecruiserGreen" />
                        Spacecruiser Green
                    </label>
                </div>
            </div>
            <div style="margin-bottom:5px">
                <div>
                    <label>
                        <InputRadio Name="engine" Value="Engine.Fusion" />
                        Fusion
                    </label>
                </div>
                <div>
                    <label>
                        <InputRadio Name="color" Value="Color.StarshipBlue" />
                        Starship Blue
                    </label>
                </div>
            </div>
            <div style="margin-bottom:5px">
                <div>
                    <label>
                        <InputRadio Name="engine" Value="Engine.Warp" />
                        Warp
                    </label>
                </div>
                <div>
                    <label>
                        <InputRadio Name="color" Value="Color.VoyagerOrange" />
                        Voyager Orange
                    </label>
                </div>
            </div>
        </InputRadioGroup>
    </InputRadioGroup>
</fieldset>
```

> **Note:**
> If `Name` is omitted, `Microsoft.AspNetCore.Components.Forms.InputRadio`1` components are grouped by their most recent ancestor.

If you implemented the preceding Razor markup in the `Starship3` component of the Example form section of the *Input components* article, update the logging for the `Submit` method:

```csharp
Logger.LogInformation("Id = {Id} Description = {Description} " +
    "Classification = {Classification} MaximumAccommodation = " +
    "{MaximumAccommodation} IsValidatedDesign = " +
    "{IsValidatedDesign} ProductionDate = {ProductionDate} " +
    "Manufacturer = {Manufacturer}, Engine = {Engine}, " +
    "Color = {Color}",
    Model?.Id, Model?.Description, Model?.Classification,
    Model?.MaximumAccommodation, Model?.IsValidatedDesign,
    Model?.ProductionDate, Model?.Manufacturer, Model?.Engine, 
    Model?.Color);
```
