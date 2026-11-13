---
title: "ASP.NET Core Blazor advanced form validation"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/forms/validation-advanced.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor advanced form validation

-->
-->

This article demonstrates reusable validator components and remote validation. For common form validation APIs, including data annotations, direct `Microsoft.AspNetCore.Components.Forms.EditContext` validation, message display, styling, state, and submit behavior, see ASP.NET Core Blazor forms validation.

For model-based validation rules shared by Blazor and Minimal APIs, see Validation in ASP.NET Core.

For browser validation in static server-side rendering (static SSR), see ASP.NET Core Blazor client-side form validation in static SSR.

## Build a validator component

A validator component encapsulates validation that uses a form's `EditContext` and `Microsoft.AspNetCore.Components.Forms.ValidationMessageStore`. This is useful when the same validation behavior is used by several forms or when errors arrive from a service rather than from validation attributes on the model.

The component:

* Receives the form's `EditContext` as a cascading parameter.
* Creates a message store for its errors.
* Clears stale form errors when validation is requested.
* Clears a field's stale errors when the field changes.
* Exposes methods for displaying and clearing errors.
* Unsubscribes its event handlers when disposed.

`CustomValidation.razor`:

```razor
@implements IDisposable

@code {
    [CascadingParameter]
    private EditContext? CurrentEditContext { get; set; }

    private ValidationMessageStore messages = default!;

    protected override void OnInitialized()
    {
        if (CurrentEditContext is null)
        {
            throw new InvalidOperationException(
                "CustomValidation requires a cascading EditContext.");
        }

        messages = new ValidationMessageStore(CurrentEditContext);
        CurrentEditContext.OnValidationRequested +=
            HandleValidationRequested;
        CurrentEditContext.OnFieldChanged += HandleFieldChanged;
    }

    public void DisplayErrors(IDictionary<string, string[]> errors)
    {
        foreach (var error in errors)
        {
            messages.Add(
                CurrentEditContext!.Field(error.Key),
                error.Value);
        }

        CurrentEditContext!.NotifyValidationStateChanged();
    }

    public void ClearErrors()
    {
        messages.Clear();
        CurrentEditContext!.NotifyValidationStateChanged();
    }

    private void HandleValidationRequested(
        object? sender, ValidationRequestedEventArgs e) =>
        ClearErrors();

    private void HandleFieldChanged(
        object? sender, FieldChangedEventArgs e)
    {
        messages.Clear(e.FieldIdentifier);
        CurrentEditContext!.NotifyValidationStateChanged();
    }

    public void Dispose()
    {
        if (CurrentEditContext is not null)
        {
            CurrentEditContext.OnValidationRequested -=
                HandleValidationRequested;
            CurrentEditContext.OnFieldChanged -= HandleFieldChanged;
        }
    }
}
```

Place the component inside an `EditForm` and capture a component reference when the form or a service should display errors:

```razor
<EditForm Model="Model" OnValidSubmit="Submit">
    <DataAnnotationsValidator />
    <CustomValidation @ref="customValidation" />
    <ValidationSummary />

    ...
</EditForm>

@code {
    private CustomValidation? customValidation;
}
```

The component can be used alongside `DataAnnotationsValidator`. Each validator has its own message store associated with the same `EditContext`, and `ValidationMessage` and `ValidationSummary` display messages from both validators.

To implement a business rule inside the validator component instead of accepting external errors, run the rule from `HandleValidationRequested` or `HandleFieldChanged` and add its messages to `messages`. For a smaller example that performs this directly in a form component, see ASP.NET Core Blazor forms validation.

### Add asynchronous validation

The same component pattern supports asynchronous work:

* In an `OnValidationRequested` handler, call `e.AddAsyncValidator` to register form-level work. `EditForm` awaits it before invoking `OnValidSubmit` or `OnInvalidSubmit`.
* In an `OnFieldChanged` handler, call `EditContext.RegisterAsyncFieldValidator` to start validation for that field. Starting another validation for the same field supersedes and cancels the previous operation.

For form-level asynchronous validation:

```csharp
private void HandleValidationRequested(
    object? sender, ValidationRequestedEventArgs e) =>
    e.AddAsyncValidator(ValidateAsync);

private async Task ValidateAsync(CancellationToken <example-value>)
{
    var field = CurrentEditContext!.Field(nameof(Model.Username));
    messages.Clear(field);

    var available = await Http.GetFromJsonAsync<bool>(
        $"api/usernames/available?value={Uri.EscapeDataString(Model.Username)}",
        cancellationToken);

    if (!available)
    {
        messages.Add(field, "The username is already taken.");
    }

    CurrentEditContext.NotifyValidationStateChanged();
}
```

For field-level asynchronous validation:

```csharp
private void HandleFieldChanged(
    object? sender, FieldChangedEventArgs e)
{
    CurrentEditContext!.RegisterAsyncFieldValidator(
        e.FieldIdentifier,
        token => ValidateFieldAsync(e.FieldIdentifier, token));
}
```

Pass the supplied cancellation token to I/O. Clear prior messages before starting the operation, avoid publishing partial results after an exception, and call `NotifyValidationStateChanged` after updating messages.

An operation canceled because it was superseded or because the validation pass was canceled is discarded. Other exceptions place the field or form in the faulted state. For displaying pending and faulted state, see ASP.NET Core Blazor forms validation.

For a complete component that combines form-level and per-field asynchronous validation, see the following sample:

_Code sample not included: ~/../blazor-samples/11.0/BlazorSample_BlazorWebApp/Components/UsernameUniquenessValidator.razor._
For asynchronous validation attributes on the model, see Validation in ASP.NET Core.

Validator component code runs where the component runs. In Interactive WebAssembly, it runs in the browser, while it runs on the server over the circuit in Interactive Server.

In static SSR, validator component code runs on the server during the form post and doesn't provide live .NET field validation between requests.

## Remote validation from Interactive WebAssembly

Remote validation sends form data from an Interactive WebAssembly component to a server endpoint and adds returned field errors to the form's `EditContext`. It's useful when a rule requires private server data, an external service, or other logic that shouldn't run in the browser.

The form:

1. Runs data annotations validation locally.
1. Sends locally valid input to the endpoint from `OnValidSubmit`.
1. Receives field-keyed validation errors from the server.
1. Adds remote errors to the form through the validator component.

`OnValidSubmit` only means that local validation succeeded. Process or save the model only after remote validation also succeeds.

> **Important:**
> Don't send private validation data or business rules to the browser. The server must validate every request independently because client-side validation can be bypassed.

This example validates remotely when the form is submitted. For live per-field remote checks, use the asynchronous field-validation pattern from Add asynchronous validation.

If the WebAssembly form is prerendered, its client-side services must also be available during prerendering. For the available approaches, see Prerender ASP.NET Core Razor components.

### Validate with a Minimal API

Call `Microsoft.Extensions.DependencyInjection.ValidationServiceCollectionExtensions.AddValidation*` in the server project to validate supported endpoint parameters before the handler runs.

If the model is declared in the `.Client` project, register its generated validation metadata in both projects as described in Validation in ASP.NET Core.

The endpoint adds a private business rule and returns errors keyed by model member name:

_Code sample not included: ~/../blazor-samples/11.0/BlazorWebAppRemoteValidation/BlazorWebAppRemoteValidation/Program.cs._
Automatic validation rejects invalid data annotations before the handler runs. `Microsoft.AspNetCore.Http.Results.ValidationProblem*` returns `400 Bad Request` with an `errors` property containing field-keyed messages. Successful validation returns `204 No Content`.

### Call the endpoint and display errors

Register an `HttpClient` in the WebAssembly project with the app's base address:

_Code sample not included: ~/../blazor-samples/11.0/BlazorWebAppRemoteValidation/BlazorWebAppRemoteValidation.Client/Program.cs._
Place the `CustomValidation` component from Build a validator component in the form:

_Code sample not included: ~/../blazor-samples/11.0/BlazorWebAppRemoteValidation/BlazorWebAppRemoteValidation.Client/Pages/Home.razor._
The validator component clears a remote field error when that field changes, so the user can correct the value and submit again. Protect the endpoint according to the application's security requirements; authentication and authorization are outside the scope of this validation example.

The complete remote-validation sample includes the host endpoint, shared model, cross-assembly validation registration, validator component, and Interactive WebAssembly form.

## Related content

* ASP.NET Core Blazor forms validation
* ASP.NET Core Blazor client-side form validation in static SSR
* Validation in ASP.NET Core
* Minimal APIs quick reference
