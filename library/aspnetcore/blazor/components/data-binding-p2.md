---
title: "ASP.NET Core Blazor data binding (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/data-binding.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor data binding (part 2 of 2)

## Unparsable values

When a user provides an unparsable value to a data-bound element, the unparsable value is automatically reverted to its previous value when the bind event is triggered.

Consider the following component, where an `` element is bound to an `int` type with an initial value of `123`.

`UnparsableValues.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/UnparsableValues.razor._
Binding applies to the element's `onchange` event. If the user updates the value of the text box's entry to `123.45` and changes the focus, the element's value is reverted to `123` when `onchange` fires. When the value `123.45` is rejected in favor of the original value of `123`, the user understands that their value wasn't accepted.

For the `oninput` event (`@bind:event="oninput"`), a value reversion occurs after any keystroke that introduces an unparsable value. When targeting the `oninput` event with an `int`-bound type, a user is prevented from typing a dot (`.`) character. A dot (`.`) character is immediately removed, so the user receives immediate feedback that only whole numbers are permitted. There are scenarios where reverting the value on the `oninput` event isn't ideal, such as when the user should be allowed to clear an unparsable `` value. Alternatives include:

* Don't use the `oninput` event. Use the default `onchange` event, where an invalid value isn't reverted until the element loses focus.
* Bind to a nullable type, such as `int?` or `string` and either use `@bind:get`/`@bind:set` modifiers (described earlier in this article) or bind to a property with custom `get` and `set` accessor logic to handle invalid entries.
* Use an input component, such as `Microsoft.AspNetCore.Components.Forms.InputNumber`1` or `Microsoft.AspNetCore.Components.Forms.InputDate`1`, with form validation. Input components together with form validation components provide built-in support to manage invalid inputs:
  * Permit the user to provide invalid input and receive validation errors on the associated `Microsoft.AspNetCore.Components.Forms.EditContext`.
  * Display validation errors in the UI without interfering with the user entering additional webform data.

## Format strings

Data binding works with a single `System.DateTime` format string using `@bind:format="{FORMAT STRING}"`, where the `{FORMAT STRING}` placeholder is the format string. Other format expressions, such as currency or number formats, aren't available at this time but might be added in a future release.

`DateBinding.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/DateBinding.razor._
In the preceding code, the `` element's field type (`type` attribute) defaults to `text`.

Nullable `System.DateTime` and `System.DateTimeOffset` are supported:

```csharp
private DateTime? date;
private DateTimeOffset? dateOffset;
```

Specifying a format for the `date` field type isn't recommended because Blazor has built-in support to format dates. In spite of the recommendation, only use the `yyyy-MM-dd` date format for binding to function correctly if a format is supplied with the `date` field type:

```razor
<input type="date" @bind="startDate" @bind:format="yyyy-MM-dd">
```

## Binding with component parameters

A common scenario is binding a property of a child component to a property in its parent component. This scenario is called a *chained bind* because multiple levels of binding occur simultaneously.

You can't implement chained binds with `@bind` syntax in a child component. An event handler and value must be specified separately to support updating the property in the parent from the child component. The parent component still leverages `@bind` syntax to set up data binding with the child component.

The following `ChildBind` component has a `Year` component parameter and an `Microsoft.AspNetCore.Components.EventCallback`1`. By convention, the `Microsoft.AspNetCore.Components.EventCallback`1` for the parameter must be named as the component parameter name with a "`Changed`" suffix. The naming syntax is `{PARAMETER NAME}Changed`, where the `{PARAMETER NAME}` placeholder is the parameter name. In the following example, the `Microsoft.AspNetCore.Components.EventCallback`1` is named `YearChanged`.

`Microsoft.AspNetCore.Components.EventCallback.InvokeAsync*` invokes the delegate associated with the binding with the provided argument and dispatches an event notification for the changed property.

`ChildBind.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ChildBind.razor._
For more information on events and `Microsoft.AspNetCore.Components.EventCallback`1`, see the *EventCallback* section of the ASP.NET Core Blazor event handling article.

In the following `Parent1` component, the `year` field is bound to the `Year` parameter of the child component. The `Year` parameter is bindable because it has a companion `YearChanged` event that matches the type of the `Year` parameter.

`Parent1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Parent1.razor._
Component parameter binding can also trigger `@bind:after` events. In the following example, the `YearUpdated` method executes asynchronously after binding the `Year` component parameter.

```razor
<ChildBind @bind-Year="year" @bind-Year:after="YearUpdated" />

@code {
    ...

    private async Task YearUpdated()
    {
        ... = await ...;
    }
}
```

By convention, a property can be bound to a corresponding event handler by including an `@bind-{PROPERTY}:event` attribute assigned to the handler, where the `{PROPERTY}` placeholder is the property. `<ChildBind @bind-Year="year" />` is equivalent to writing:

```razor
<ChildBind @bind-Year="year" @bind-Year:event="YearChanged" />
```

In a more sophisticated and real-world example, the following `PasswordEntry` component:

* Sets an `` element's value to a `password` field.
* Exposes changes of a `Password` property to a parent component with an `EventCallback` that passes in the current value of the child's `password` field as its argument.
* Uses the `onclick` event to trigger the `ToggleShowPassword` method. For more information, see ASP.NET Core Blazor event handling.

> **Warning:**
> Don'<example-value>'t the most secure approach. For local development testing, the Secret <example-value> tool is recommended for securing sensitive data. For more information, see Securely maintain sensitive data and credentials.

`PasswordEntry.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/PasswordEntry.razor._
The `PasswordEntry` component is used in another component, such as the following `PasswordBinding` component example.

`PasswordBinding.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/PasswordBinding.razor._
When the `PasswordBinding` component is initially rendered, the `password` value of `Not set` is displayed in the UI. After initial rendering, the value of `password` reflects changes made to the `Password` component parameter value in the `PasswordEntry` component.

> **Note:**
> The preceding example binds the password <example-value> from the child `PasswordEntry` component to the parent `PasswordBinding` component. Two-way binding isn'<example-value>'s parameter, see the `NestedChild` component example in the Bind across more than two components section of this article.

Perform checks or trap errors in the handler. The following revised `PasswordEntry` component provides immediate feedback to the user if a space is used in the password's value.

`PasswordEntry.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/PasswordEntry2.razor._
## Bind across more than two components

You can bind parameters through any number of nested components, but you must respect the one-way flow of data:

* Change notifications *flow up the hierarchy*.
* New parameter values *flow down the hierarchy*.

A common and recommended approach is to only store the underlying data in the parent component to avoid any confusion about what state must be updated, as shown in the following example.

`Parent2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Parent2.razor._
In the following `NestedChild` component, the `NestedGrandchild` component:

* Assigns the value of `ChildMessage` to `GrandchildMessage` with `@bind:get` syntax.
* Updates `GrandchildMessage` when `ChildMessageChanged` executes with `@bind:set` syntax.

Prior to the release of .NET 7, two-way binding across components uses `get`/`set` accessors with a third property that discards the `System.Threading.Tasks.Task` returned by `Microsoft.AspNetCore.Components.EventCallback.InvokeAsync*` in its setter. To see an example of this approach for .NET 6 or earlier before `@bind:get`/`@bind:set` modifiers became a framework feature, see the `NestedChild` component of this section in the .NET 6 version of this article.

The reason to avoid directly changing the value of a component parameter is that it effectively mutates the parent's state from the child component. This can interfere with Blazor's change detection process and trigger extra render cycles because parameters are meant to be *inputs*, they're not meant to be mutable state. In chained scenarios where data is passed among components, directly writing to a component parameter can lead to unintended effects, such as infinite rerenders that hang the app.

`@bind:get`/`@bind:set` syntax allows you to:

* Avoid creating an extra property that only exists to forward values and callbacks across chained components, which was required prior to the release of .NET 7.
* Intercept and transform values before they're applied.
* Keep the parameter immutable in the child, while still supporting two-way binding.

A useful analogy is HTML's `` element that tracks the following value states:

* `defaultValue`: Like a component parameter received from the parent.
* `value`: Like the current state inside the component.

If you mutate `defaultValue` directly, you're breaking the contract. Instead, these states are kept separate, and only the `value` is updated through controlled means after the initial render of the element. The same reasoning applies to component parameters, and using `@bind:get`/`@bind:set` syntax avoids potential unintended rendering effects associated with writing directly to component parameters.

`NestedChild.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/NestedChild.razor._
`NestedGrandchild.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/NestedGrandchild.razor._
For an alternative approach suited to sharing data in memory and across components that aren't necessarily nested, see ASP.NET Core Blazor state management overview.

## Bound field or property expression tree

To facilitate deeper interactions with a binding, Blazor allows you to capture of the expression tree of a bound field or property. This is achieved by defining a property with the field or property name suffixed with `Expression`. For any given field or property named `{FIELD OR PROPERTY NAME}`, the corresponding expression tree property is named `{FIELD OR PROPERTY NAME}Expression`.

The following `ChildParameterExpression` component identifies the `Year` expression's model and field name. A `Microsoft.AspNetCore.Components.Forms.FieldIdentifier`, which is used to obtain the model and field name, uniquely identifies a single field that can be edited. This may correspond to a property on a model object or can be any other named value. Use of a parameter's expression is useful when creating custom validation components, which isn't covered by the Microsoft Blazor documentation but is addressed by numerous third-party resources.

`ChildParameterExpression.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ChildParameterExpression.razor._
`Parent3.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Parent3.razor._
## Related content

* Parameter change detection and additional guidance on Razor component rendering
* ASP.NET Core Blazor forms overview
* Binding to radio buttons in a form
* Binding `InputSelect` options to C# object `null` values
* ASP.NET Core Blazor event handling: `EventCallback` section
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
