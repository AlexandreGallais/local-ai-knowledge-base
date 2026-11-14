---
title: "Tag Helpers in forms in ASP.NET Core (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/views/working-with-forms.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Tag Helpers in forms in ASP.NET Core

By Rick Anderson, N. Taylor Mullen, Dave Paquette, and Jerrie Pelser

This document demonstrates working with Forms and the HTML elements commonly used on a Form. The HTML Form element provides the primary mechanism web apps use to post back data to the server. Most of this document describes Tag Helpers and how they can help you productively create robust HTML forms. We recommend you read Introduction to Tag Helpers before you read this document.

In many cases, HTML Helpers provide an alternative approach to a specific Tag Helper. However, it's important to recognize that Tag Helpers don't replace HTML Helpers, and there's not a Tag Helper for each HTML Helper. When an HTML Helper alternative exists, it's mentioned.

## The Form Tag Helper

The Form Tag Helper:

* Generates the HTML \<FORM> `action` attribute value for a MVC controller action or named route.

* Generates a hidden Request Verification Token to prevent cross-site request forgery (when used with the `[ValidateAntiForgeryToken]` attribute in the HTTP Post action method).

* Provides the `asp-route-<Parameter Name>` attribute, where `<Parameter Name>` is added to the route values. The  `routeValues` parameters to `Html.BeginForm` and `Html.BeginRouteForm` provide similar functionality.

* Has an HTML Helper alternative `Html.BeginForm` and `Html.BeginRouteForm`.

Sample:

```cshtml
﻿<form asp-controller="Demo" asp-action="Register" method="post">
    <!-- Input and Submit elements -->
</form>
```

The previous Form Tag Helper generates the following HTML:

```html
<form method="post" action="/Demo/Register">
    <!-- Input and Submit elements -->
    <input name="<example-value>" type="<example-value>" value="<example-value>">
</form>
```

The MVC runtime generates the `action` attribute value from the Form Tag Helper attributes `asp-controller` and `asp-action`. The Form Tag Helper also generates a hidden Request Verification Token to prevent cross-site request forgery (when used with the `[ValidateAntiForgeryToken]` attribute in the HTTP Post action method). Protecting a pure HTML Form from cross-site request forgery is difficult, but the Form Tag Helper provides this service for you.

### Using a named route

The `asp-route` Tag Helper attribute can also generate markup for the HTML `action` attribute. An app with a route  named `register` could use the following markup for the registration page:

```cshtml
﻿<form asp-route="register" method="post">
    <!-- Input and Submit elements -->
</form>
```

Many of the views in the *Views/Account* folder (generated when you create a new web app with *Individual Accounts*) contain the asp-route-returnurl attribute:

```cshtml
<form asp-controller="Account" asp-action="Login"
     asp-route-returnurl="@ViewData["ReturnUrl"]"
     method="post" class="form-horizontal" role="form">
```

>**Note:**
>With the built in templates, `returnUrl` is only populated automatically when you try to access an authorized resource but aren't authenticated or authorized. When you attempt an unauthorized access, the security middleware redirects you to the login page with the `returnUrl` set.

## The Form Action Tag Helper

The Form Action Tag Helper generates the `formaction` attribute on the generated `` or `` tag. The `formaction` attribute controls where a form submits its data. It binds to \ elements of type `image` and \ elements. The Form Action Tag Helper enables the usage of several AnchorTagHelper `asp-` attributes to control what `formaction` link is generated for the corresponding element.

Supported AnchorTagHelper attributes to control the value of `formaction`:

|Attribute|Description|
|---|---|
|asp-controller|The name of the controller.|
|asp-action|The name of the action method.|
|asp-area|The name of the area.|
|asp-page|The name of the Razor page.|
|asp-page-handler|The name of the Razor page handler.|
|asp-route|The name of the route.|
|asp-route-{value}|A single URL route value. For example, `asp-route-id="1234"`.|
|asp-all-route-data|All route values.|
|asp-fragment|The URL fragment.|

### Submit to controller example

The following markup submits the form to the `Index` action of `HomeController` when the input or button is selected:

```cshtml
<form method="post">
    <button asp-controller="Home" asp-action="Index">Click Me</button>
    <input type="image" src="..." alt="Or Click Me" asp-controller="Home" 
                                asp-action="Index">
</form>
```

The previous markup generates following HTML:

```html
<form method="post">
    <button formaction="/Home">Click Me</button>
    <input type="image" src="..." alt="Or Click Me" formaction="/Home">
</form>
```

### Submit to page example

The following markup submits the form to the `About` Razor Page:

```cshtml
<form method="post">
    <button asp-page="About">Click Me</button>
    <input type="image" src="..." alt="Or Click Me" asp-page="About">
</form>
```

The previous markup generates following HTML:

```html
<form method="post">
    <button formaction="/About">Click Me</button>
    <input type="image" src="..." alt="Or Click Me" formaction="/About">
</form>
```

### Submit to route example

Consider the `/Home/Test` endpoint:

```csharp
public class HomeController : Controller
{
    [Route("/Home/Test", Name = "Custom")]
    public string Test()
    {
        return "This is the test page";
    }
}
```

The following markup submits the form to the `/Home/Test` endpoint.

```cshtml
<form method="post">
    <button asp-route="Custom">Click Me</button>
    <input type="image" src="..." alt="Or Click Me" asp-route="Custom">
</form>
```

The previous markup generates following HTML:

```html
<form method="post">
    <button formaction="/Home/Test">Click Me</button>
    <input type="image" src="..." alt="Or Click Me" formaction="/Home/Test">
</form>
```
