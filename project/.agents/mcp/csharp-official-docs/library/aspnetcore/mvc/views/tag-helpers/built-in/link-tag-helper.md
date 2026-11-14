---
title: "Link Tag Helper in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/views/tag-helpers/built-in/link-tag-helper.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Link Tag Helper in ASP.NET Core

By Rick Anderson

The Link Tag Helper generates a link to a primary or fall back CSS file. Typically the primary CSS file is on a Content Delivery Network (CDN).

A CDN:

* Provides several performance advantages vs hosting the asset with the web app.
* Should not be relied on as the only source for the asset. CDNs are not always available, therefore a reliable fallback should be used. Typically the fallback is the site hosting the web app.

The Link Tag Helper allows you to specify a CDN for the CSS file and a fallback when the CDN is not available. The Link Tag Helper provides the performance advantage of a CDN with the robustness of local hosting.

The following Razor markup shows the `head` element of a layout file created with the ASP.NET Core web app template:

```cshtml
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - WebLinkTH</title>

    <environment include="Development">
        <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.css" />
    </environment>
    <environment exclude="Development">
        <link rel="stylesheet" 
              href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css"
              asp-fallback-href="~/lib/bootstrap/dist/css/bootstrap.css"
              asp-fallback-test-class="sr-only" asp-fallback-test-property="position" 
              asp-fallback-test-value="absolute"
              crossorigin="anonymous"
              integrity="sha256-eSi1q2PG6J7g7ib17yAaWMcrr5GrtohYChqibrV7PBE=" />
    </environment>
    <link rel="stylesheet" href="~/css/site.css" />
</head>
```

The following is rendered HTML from the preceding code (in a non-`Development` environment):

```html
﻿<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home page - WebLinkTH</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css"
          crossorigin="anonymous" integrity="sha256-eS<snip>BE=" />
    <meta name="x-stylesheet-fallback-test" content="" class="sr-only" />
    <script>
        !function (a, b, c, d) {
            var e, f = document,
                g = f.getElementsByTagName("SCRIPT"),
                h = g[g.length - 1].previousElementSibling,
                i = f.defaultView && f.defaultView.getComputedStyle ? f.defaultView.getComputedStyle(h) : h.currentStyle;
            if (i && i[a] !== b) for (e = 0; e < c.length; e++)
                f.write('<link href="' + c[e] + '" ' + d + "/>")
        }
            ("position", "absolute", ["\/lib\/bootstrap\/dist\/css\/bootstrap.css"],
                "rel=\u0022stylesheet\u0022 crossorigin=\u0022anonymous\u0022 integrity=\abc<snip>BE=\u0022 ");
    </script>

    <link rel="stylesheet" href="/css/site.css" />
</head>
```

In the preceding code, the Link Tag Helper generated the `<meta name="x-stylesheet-fallback-test" content="" class="sr-only" />` element and the following JavaScript which is used to verify the requested `bootstrap.css` file is available on the CDN. In this case, the CSS file was available so the Tag Helper generated the `<link />` element with the CDN CSS file.

## Commonly used Link Tag Helper attributes

See Link Tag Helper  for all the Link Tag Helper attributes, properties, and methods.

### href

Preferred address of the linked resource. The address is passed thought to the generated HTML in all cases.

### asp-fallback-href

The URL of a CSS stylesheet to fallback to in the case the primary URL fails.

### asp-fallback-test-class

The class name defined in the stylesheet to use for the fallback test. For more information, see `Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper.FallbackTestClass`.

### asp-fallback-test-property

The CSS property name to use for the fallback test. For more information, see `Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper.FallbackTestProperty`.

### asp-fallback-test-value

The CSS property value to use for the fallback test. For more information, see `Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper.FallbackTestValue`.

## Related content

* Tag Helpers in ASP.NET Core
* Areas in ASP.NET Core
* Razor Pages architecture and concepts in ASP.NET Core
* Compatibility version for ASP.NET Core MVC
