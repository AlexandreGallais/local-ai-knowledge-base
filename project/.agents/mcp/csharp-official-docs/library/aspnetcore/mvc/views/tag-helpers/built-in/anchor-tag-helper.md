---
title: "Anchor Tag Helper in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/views/tag-helpers/built-in/anchor-tag-helper.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Anchor Tag Helper in ASP.NET Core

By Peter Kellner and Scott Addie

The Anchor Tag Helper enhances the standard HTML anchor (``) tag by adding new attributes. By convention, the attribute names are prefixed with `asp-`. The rendered anchor element's `href` attribute value is determined by the values of the `asp-` attributes.

For an overview of Tag Helpers, see Tag Helpers in ASP.NET Core.

View or download sample code (how to download)

*SpeakerController* is used in samples throughout this document:

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

public class SpeakerController : Controller
{
    private List<Speaker> Speakers =
        new List<Speaker>
        {
            new Speaker {SpeakerId = 10},
            new Speaker {SpeakerId = 11},
            new Speaker {SpeakerId = 12}
        };

    [Route("Speaker/{id:int}")]
    public IActionResult Detail(int id) =>
        View(Speakers.FirstOrDefault(a => a.SpeakerId == id));
```

## Anchor Tag Helper attributes

### asp-controller

The asp-controller attribute assigns the controller used for generating the URL. The following markup lists all speakers:

```cshtml
<a asp-controller="Speaker"
   asp-action="Index">All Speakers</a>
```

The generated HTML:

```html
<a href="/Speaker">All Speakers</a>
```

If the `asp-controller` attribute is specified and `asp-action` isn't, the default `asp-action` value is the controller action associated with the currently executing view. If `asp-action` is omitted from the preceding markup, and the Anchor Tag Helper is used in *HomeController*'s *Index* view (*/Home*), the generated HTML is:

```html
<a href="/Home">All Speakers</a>
```

### asp-action

The asp-action attribute value represents the controller action name included in the generated `href` attribute. The following markup sets the generated `href` attribute value to the speaker evaluations page:

```cshtml
<a asp-controller="Speaker"
   asp-action="Evaluations">Speaker Evaluations</a>
```

The generated HTML:

```html
<a href="/Speaker/Evaluations">Speaker Evaluations</a>
```

If no `asp-controller` attribute is specified, the default controller calling the view executing the current view is used.

If the `asp-action` attribute value is `Index`, then no action is appended to the URL, leading to the invocation of the default `Index` action. The action specified (or defaulted), must exist in the controller referenced in `asp-controller`.

### asp-route-{value}

The asp-route-{value} attribute enables a wildcard route prefix. Any value occupying the `{value}` placeholder is interpreted as a potential route parameter. If a default route isn't found, this route prefix is appended to the generated `href` attribute as a request parameter and value. Otherwise, it's substituted in the route template.

Consider the following controller action:

```csharp
private List<Speaker> Speakers =
    new List<Speaker>
    {
        new Speaker {SpeakerId = 10},
        new Speaker {SpeakerId = 11},
        new Speaker {SpeakerId = 12}
    };

[Route("Speaker/{id:int}")]
public IActionResult Detail(int id) =>
    View(Speakers.FirstOrDefault(a => a.SpeakerId == id));
```

With a default route template defined in `Program.cs`:

```csharp
app.MapControllerRoute(
  name: "default",
  pattern: "{controller=Home}/{action=Index}/{id?}");
```

The MVC view uses the model, provided by the action, as follows:

```cshtml
@model Speaker
<!DOCTYPE html>
<html>
<body>
    <a asp-controller="Speaker"
       asp-action="Detail" 
       asp-route-id="@Model.SpeakerId">SpeakerId: @Model.SpeakerId</a>
</body>
</html>
```

The default route's `{id?}` placeholder was matched. The generated HTML:

```html
<a href="/Speaker/Detail/12">SpeakerId: 12</a>
```

Assume the route prefix isn't part of the matching routing template, as with the following MVC view:

```cshtml
@model Speaker
<!DOCTYPE html>
<html>
<body>
    <a asp-controller="Speaker"
       asp-action="Detail"
       asp-route-speakerid="@Model.SpeakerId">SpeakerId: @Model.SpeakerId</a>
<body>
</html>
```

The following HTML is generated because `speakerid` wasn't found in the matching route:

```html
<a href="/Speaker/Detail?speakerid=12">SpeakerId: 12</a>
```

If either `asp-controller` or `asp-action` aren't specified, then the same default processing is followed as is in the `asp-route` attribute.

### asp-route

The asp-route attribute is used for creating a URL linking directly to a named route. Using routing attributes, a route can be named as shown in the `SpeakerController` and used in its `Evaluations` action:

```csharp
[Route("/Speaker/Evaluations", 
       Name = "speakerevals")]
```

In the following markup, the `asp-route` attribute references the named route:

```cshtml
<a asp-route="speakerevals">Speaker Evaluations</a>
```

The Anchor Tag Helper generates a route directly to that controller action using the URL */Speaker/Evaluations*. The generated HTML:

```html
<a href="/Speaker/Evaluations">Speaker Evaluations</a>
```

If `asp-controller` or `asp-action` is specified in addition to `asp-route`, the route generated may not be what you expect. To avoid a route conflict, `asp-route` shouldn't be used with the `asp-controller` and `asp-action` attributes.

### asp-all-route-data

The asp-all-route-data attribute supports the creation of a dictionary of key-value pairs. The key is the parameter name, and the value is the parameter value.

In the following example, a dictionary is initialized and passed to a Razor view. Alternatively, the data could be passed in with your model.

```cshtml
@{
var parms = new Dictionary<string, string>
            {
                { "speakerId", "11" },
                { "currentYear", "true" }
            };
}

<a asp-route="speakerevalscurrent"
   asp-all-route-data="parms">Speaker Evaluations</a>
```

The preceding code generates the following HTML:

```html
<a href="/Speaker/EvaluationsCurrent?speakerId=11&currentYear=true">Speaker Evaluations</a>
```

The `asp-all-route-data` dictionary is flattened to produce a query string meeting the requirements of the overloaded `Evaluations` action:

```csharp
public IActionResult Evaluations() => View();

[Route("/Speaker/EvaluationsCurrent",
       Name = "speakerevalscurrent")]
public IActionResult Evaluations(
```

If any keys in the dictionary match route parameters, those values are substituted in the route as appropriate. The other non-matching values are generated as request parameters.

### asp-fragment

The asp-fragment attribute defines a URL fragment to append to the URL. The Anchor Tag Helper adds the hash character (#). Consider the following markup:

```cshtml
<a asp-controller="Speaker"
   asp-action="Evaluations"
   asp-fragment="SpeakerEvaluations">Speaker Evaluations</a>
```

The generated HTML:

```html
<a href="/Speaker/Evaluations#SpeakerEvaluations">Speaker Evaluations</a>
```

Hash tags are useful when building client-side apps. They can be used for easy marking and searching in JavaScript, for example.

### asp-area

The asp-area attribute sets the area name used to set the appropriate route. The following examples depict how the `asp-area` attribute causes a remapping of routes.

#### Usage in Razor Pages

Razor Pages areas are supported in ASP.NET Core 2.1 or later.

Consider the following directory hierarchy:

* **{Project name}**
  * **wwwroot**
  * **Areas**
    * **Sessions**
      * **Pages**
        * *\_ViewStart.cshtml*
        * `Index.cshtml`
        * `Index.cshtml.cs`
  * **Pages**

The markup to reference the *Sessions* area *Index* Razor Page is:

```cshtml
<a asp-area="Sessions"
   asp-page="/Index">View Sessions</a>
```

The generated HTML:

```html
<a href="/Sessions">View Sessions</a>
```

> **Tip:**
> To support areas in a Razor Pages app, ensure that area routing is enabled in your app's routing configuration. Use the minimal hosting model and configure area routes in *Program.cs* as needed.

#### Usage in MVC

Consider the following directory hierarchy:

* **{Project name}**
  * **wwwroot**
  * **Areas**
    * **Blogs**
      * **Controllers**
        * `HomeController.cs`
      * **Views**
        * **Home**
          * `AboutBlog.cshtml`
          * `Index.cshtml`
        * *\_ViewStart.cshtml*
  * **Controllers**

Setting `asp-area` to "Blogs" prefixes the directory *Areas/Blogs* to the routes of the associated controllers and views for this anchor tag. The markup to reference the *AboutBlog* view is:

```cshtml
<a asp-area="Blogs"
   asp-controller="Home"
   asp-action="AboutBlog">About Blog</a>
```

The generated HTML:

```html
<a href="/Blogs/Home/AboutBlog">About Blog</a>
```

> **Tip:**
> To support areas in an MVC app, the route template must include a reference to the area, if it exists. Configure area routes in *Program.cs* using `MapControllerRoute` with an area pattern, for example:
>
> ```csharp
> app.MapControllerRoute(
>     name: "mvcAreaRoute",
>     pattern: "{area:exists}/{controller=Home}/{action=Index}");
> ```

### asp-protocol

The asp-protocol attribute is for specifying a protocol (such as `https`) in your URL. For example:

```cshtml
<a asp-protocol="https"
   asp-controller="Home"
   asp-action="About">About</a>
```

The generated HTML:

```html
<a href="https://localhost/Home/About">About</a>
```

The host name in the example is localhost. The Anchor Tag Helper uses the website's public domain when generating the URL.

### asp-host

The asp-host attribute is for specifying a host name in your URL. For example:

```cshtml
<a asp-protocol="https"
   asp-host="microsoft.com"
   asp-controller="Home"
   asp-action="About">About</a>
```

The generated HTML:

```html
<a href="https://microsoft.com/Home/About">About</a>
```

### asp-page

The asp-page attribute is used with Razor Pages. Use it to set an anchor tag's `href` attribute value to a specific page. Prefixing the page name with `/` creates a URL for a matching page from the root of the app:

With the sample code, the following markup creates a link to the attendee Razor Page:

```cshtml
<a asp-page="/Attendee">All Attendees</a>
```

The generated HTML:

```html
<a href="/Attendee">All Attendees</a>
```

The `asp-page` attribute is mutually exclusive with the `asp-route`, `asp-controller`, and `asp-action` attributes. However, `asp-page` can be used with `asp-route-{value}` to control routing, as the following markup demonstrates:

```cshtml
<a asp-page="/Attendee"
   asp-route-attendeeid="10">View Attendee</a>
```

The generated HTML:

```html
<a href="/Attendee?attendeeid=10">View Attendee</a>
```

If the referenced page doesn't exist, a link to the current page is generated using an ambient value from the request. No warning is indicated, except at the debug log level.

### asp-page-handler

The asp-page-handler attribute is used with Razor Pages. It's intended for linking to specific page handlers.

Consider the following page handler:

```csharp
public void OnGetProfile(int attendeeId)
{
    ViewData["AttendeeId"] = attendeeId;

    // code omitted for brevity
}
```

The page model's associated markup links to the `OnGetProfile` page handler. Note the `On<Verb>` prefix of the page handler method name is omitted in the `asp-page-handler` attribute value. When the method is asynchronous, the `Async` suffix is omitted, too.

```cshtml
<a asp-page="/Attendee"
   asp-page-handler="Profile"
   asp-route-attendeeid="12">Attendee Profile</a>
```

The generated HTML:

```html
<a href="/Attendee?attendeeid=12&handler=Profile">Attendee Profile</a>
```

## Related content

* Areas in ASP.NET Core
* Razor Pages architecture and concepts in ASP.NET Core
* Compatibility version for ASP.NET Core MVC
