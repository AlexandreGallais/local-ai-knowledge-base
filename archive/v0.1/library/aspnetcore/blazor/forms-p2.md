---
title: "ASP.NET Core Blazor forms overview (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/forms/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor forms overview (part 2 of 2)

## Antiforgery support

Antiforgery services are automatically added to Blazor apps when `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*` is called in the `Program` file.

Automatic Cross-Site Request Forgery (CSRF) protection middleware is enabled by default in apps built with `WebApplication.CreateBuilder`. The middleware inspects the `Sec-Fetch-Site` and `Origin` headers on unsafe HTTP methods and records a validation verdict on the request. Blazor server-side rendering (SSR) form posts enforce that verdict and return `400 Bad Request` for cross-origin form posts that aren't trusted.

Token-based antiforgery services are added to the app when `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*` is called in the `Program` file. However, token <example-value> only runs when antiforgery middleware is explicitly added to the request processing pipeline by calling `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*`.

Adding token-based antiforgery middleware doesn't replace the automatic header-based CSRF protection middleware. When an app calls `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*`, both defense mechanisms run for a form post:

* The header-based CSRF protection middleware runs first and records its verdict.
* Antiforgery middleware performs token-based validation.

The token-based result from antiforgery middleware is authoritative and overrides the earlier header-based CSRF middleware verdict.

To explicitly add antiforgery middleware, call `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*` after the call to `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*`. If there are calls to `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*` and `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*`, the call to `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*` must go between them. A call to `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*` must be placed after calls to `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*` and `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*`.

To disable the automatic header-based CSRF protection middleware, set the `DisableCsrfProtection` configuration key to true. For example, use the app settings file (`appsettings.json`) to disable the middleware:

```json
{
  "DisableCsrfProtection": true
}
```

The `DisableCsrfProtection` configuration setting can be supplied by any configuration source, including via an environment variable (`DisableCsrfProtection=true`).

> **Warning:**
> Disabling the automatic CSRF protection middleware removes the default header-based (`Sec-Fetch-Site`/`Origin`) protection for the entire app. Only disable it if you provide an alternative CSRF defense, such as explicitly adopting token-based antiforgery middleware by calling `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*`.

For more information, see Automatic CSRF protection.

> **Important:**
> The following guidance on the `Microsoft.AspNetCore.Components.Forms.AntiforgeryToken` component and the `Microsoft.AspNetCore.Components.Forms.AntiforgeryStateProvider` service only apply to an app that explicitly adopts token-based antiforgery middleware by calling `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*` in its request processing pipeline.

The `Microsoft.AspNetCore.Components.Forms.AntiforgeryToken` component renders an antiforgery token as a hidden field, and the `[RequireAntiforgeryToken]` attribute enables antiforgery protection. If an antiforgery check fails, a `400 - Bad Request` response is thrown and the form isn't processed.

For forms based on `Microsoft.AspNetCore.Components.Forms.EditForm`, the `Microsoft.AspNetCore.Components.Forms.AntiforgeryToken` component and `[RequireAntiforgeryToken]` attribute are automatically added to provide antiforgery protection.

For forms based on the HTML `<form>` element, manually add the `Microsoft.AspNetCore.Components.Forms.AntiforgeryToken` component to the form:

```razor
<form method="post" @onsubmit="Submit" @formname="starshipForm">
    <AntiforgeryToken />
    <input id="send" type="submit" value="Send" />
</form>

@if (submitted)
{
    <p>Form submitted!</p>
}

@code{
    private bool submitted = false;

    private void Submit() => submitted = true;
}
```

> **Warning:**
> For forms based on either `Microsoft.AspNetCore.Components.Forms.EditForm` or the HTML `<form>` element, antiforgery protection can be disabled by passing `required: false` to the `[RequireAntiforgeryToken]` attribute. The following example disables antiforgery and is ***not recommended*** for public apps:
>
> ```razor
> @using Microsoft.AspNetCore.Antiforgery
> @attribute [RequireAntiforgeryToken(required: false)]
> ```

For more information, see ASP.NET Core Blazor authentication and authorization.

## Mitigate overposting attacks

Statically-rendered server-side forms, such as those typically used in components that create and edit records in a database with a form model, can be vulnerable to an *overposting* attack, also known as a *mass assignment* attack. An overposting attack occurs when a malicious user issues an HTML form POST to the server that processes data for properties that aren't part of the rendered form and that the developer doesn't wish to allow users to modify. The term "overposting" literally means that the malicious user has *over*-POSTed with the form.

Overposting isn't a concern when the model doesn't include restricted properties for create and update operations. However, it's important to keep overposting in mind when working with static SSR-based Blazor forms that you maintain.

To mitigate overposting, we recommend using a separate view model/data transfer object (DTO) for the form and database with create (insert) and update operations. When the form is submitted, only properties of the view model/DTO are used by the component and C# code to modify the database. Any extra data included by a malicious user is discarded, so the malicious user is prevented from conducting an overposting attack.

## Enhanced form handling

Enhance navigation for form POST requests with the `Microsoft.AspNetCore.Components.Forms.EditForm.Enhance` parameter for `Microsoft.AspNetCore.Components.Forms.EditForm` forms or the `data-enhance` attribute for HTML forms (`<form>`):

```razor
<EditForm ... Enhance ...>
    ...
</EditForm>
```

```html
<form ... data-enhance ...>
    ...
</form>
```

❌Unsupported: You can't set enhanced navigation on a form's ancestor element to enable enhanced form handling.

```html
<div ... data-enhance ...>
    <form ...>
        <!-- NOT enhanced -->
    </form>
</div>
```

Enhanced form posts only work with Blazor endpoints. Posting an enhanced form to non-Blazor endpoint results in an error.

To disable enhanced form handling:

* For an `Microsoft.AspNetCore.Components.Forms.EditForm`, remove the `Microsoft.AspNetCore.Components.Forms.EditForm.Enhance` parameter from the form element (or set it to `false`: `Enhance="false"`).
* For an HTML `<form>`, remove the `data-enhance` attribute from form element (or set it to `false`: `data-enhance="false"`).

Blazor's enhanced navigation and form handling may undo dynamic changes to the DOM if the updated content isn't part of the server rendering. To preserve the content of an element, use the `data-permanent` attribute.

In the following example, the content of the `` element is updated dynamically by a script when the page loads:

```html
<div data-permanent>
    ...
</div>
```

To disable enhanced navigation and form handling globally, see ASP.NET Core Blazor startup.

For guidance on using the `enhancedload` event to listen for enhanced page updates, see ASP.NET Core Blazor navigation.

## Examples

Examples don't adopt enhanced form handling for form POST requests, but all of the examples can be updated to adopt the enhanced features by following the guidance in the Enhanced form handling section.

To demonstrate how forms work with data annotations validation, example components rely on `System.ComponentModel.DataAnnotations` API. If you wish to avoid an extra line of code in components that use data annotations, make the namespace available throughout the app's components with the imports file (`_Imports.razor`):

```razor
@using System.ComponentModel.DataAnnotations
```

Form examples reference aspects of the Star Trek universe. Star Trek is a copyright &copy;1966-2023 of CBS Studios and Paramount.

## Client-side validation in static SSR forms

In Blazor Web Apps, forms in components that adopt static server-side rendering (static SSR) gain client-side validation automatically when a `Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator` component is present in the form. For details, see ASP.NET Core Blazor client-side form validation in static SSR.

## Unsupported validation features

All of the data annotation built-in validators are supported in Blazor except for the `[Remote]` validation attribute.

jQuery validation isn't supported in Razor components. We recommend any of the following approaches:

* Follow the guidance in ASP.NET Core Blazor forms validation for any of the following scenarios:
  * Server-side validation in a Blazor Web App that adopts an interactive render mode.
  * Client-side validation in static SSR forms.
  * Client-side validation in a standalone Blazor WebAssembly app.
* Use native HTML validation attributes (see Client-side form validation).
* Adopt a third-party validation JavaScript library.

## Related content

* ASP.NET Core Blazor file uploads
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
* ASP.NET Core GitHub repository (`dotnet/aspnetcore`) forms test assets
