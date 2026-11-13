---
title: "ASP.NET Core Blazor forms validation (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/forms/validation.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor forms validation (part 2 of 2)

## Respond to validation state

`EditContext` exposes the current validation state without initiating validation.

* Use `IsModified(field)` or `IsModified()` to determine whether a field or any field in the form has changed.
* Use `GetValidationMessages(field)` or `GetValidationMessages()` to inspect current field or form messages.

Use `IsValid(field)` to determine whether a field currently has validation messages.

The following example displays custom UI only after a field is modified and invalid:

```razor
@{
    var identifier = editContext.Field(nameof(Starship.Identifier));
}

@if (editContext.IsModified(identifier) &&
    !editContext.IsValid(identifier))
{
    <p>Correct the identifier before continuing.</p>
}
```

Input components, `ValidationMessage`, and `ValidationSummary` update themselves when validation state changes. A component that renders other conditional validation UI should subscribe to `Microsoft.AspNetCore.Components.Forms.EditContext.OnValidationStateChanged*` and call `StateHasChanged`:

```csharp
private void HandleValidationStateChanged(
    object? sender, ValidationStateChangedEventArgs e) =>
    _ = InvokeAsync(StateHasChanged);
```

Unsubscribe from `OnValidationStateChanged` when the component is disposed.

Use `IsValidationPending(field)` and `IsValidationFaulted(field)` for asynchronous field validation. The parameterless methods describe form-level `ValidateAsync` passes and don't aggregate the state of every field.

These states also include asynchronous work performed by `Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator`. An `AsyncValidationAttribute` applied to a property uses field state during field validation, including the default `pending` and `faulted` CSS classes. During `ValidateAsync`, asynchronous attributes and `System.ComponentModel.DataAnnotations.IAsyncValidatableObject` contribute to the form-level state reported by the parameterless methods.

Live pending indicators require an interactive render mode. During a static SSR form post, server-side validation completes before the response is rendered.

## Control form submission

`EditForm` provides three submission callbacks:

| Callback | Behavior |
|---|---|
| `Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit` | Runs after automatic validation succeeds. |
| `Microsoft.AspNetCore.Components.Forms.EditForm.OnInvalidSubmit` | Runs after automatic validation fails. |
| `Microsoft.AspNetCore.Components.Forms.EditForm.OnSubmit` | Gives the handler control of validation and submission. |

`OnValidSubmit` and `OnInvalidSubmit` can be used together. Don't combine `OnSubmit` with either of them.

`EditForm` uses `Microsoft.AspNetCore.Components.Forms.EditContext.ValidateAsync*` before invoking `OnValidSubmit` or `OnInvalidSubmit`, so it awaits synchronous and asynchronous validators. When handling `OnSubmit`, call `ValidateAsync` before processing the form:

```razor
<EditForm EditContext="editContext" OnSubmit="HandleSubmit">
    ...
</EditForm>

@code {
    private async Task HandleSubmit(EditContext editContext)
    {
        if (await editContext.ValidateAsync())
        {
            await SaveAsync();
        }
    }
}
```

The synchronous `Microsoft.AspNetCore.Components.Forms.EditContext.Validate*` method is obsolete in .NET 11. It doesn't await asynchronous validation and throws if a handler attempts to register asynchronous work.

For interactive forms, the form-level pending state can be used to disable submission while `ValidateAsync` is running:

```razor
<button type="submit" disabled="@editContext.IsValidationPending()">
    Save
</button>
```

## Related content

* ASP.NET Core Blazor forms overview
* ASP.NET Core Blazor forms binding
* ASP.NET Core Blazor input components
* ASP.NET Core Blazor advanced form validation

* Validation in ASP.NET Core

* ASP.NET Core Blazor client-side form validation in static SSR
