---
title: "Use web API analyzers"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/web-api/advanced/analyzers.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use web API analyzers

> **Warning:**
> The `IncludeOpenAPIAnalyzers` MSBuild property and its associated MVC API analyzers are deprecated as of .NET 10 and will be removed in a future release. When `IncludeOpenAPIAnalyzers` is set to `true`, the build emits warning `ASPDEPR007`. Migrate to the `Microsoft.AspNetCore.Http.TypedResults` pattern, which provides compile-time response-type guarantees without separate analyzers. For more information, see IncludeOpenAPIAnalyzers property and MVC API analyzers are deprecated.

ASP.NET Core provides an MVC analyzers package intended for use with web API projects. The analyzers work with controllers annotated with `Microsoft.AspNetCore.Mvc.ApiControllerAttribute`, while building on web API conventions.

The analyzers package notifies you of any controller action that:

* Returns an undeclared status code.
* Returns an undeclared success result.
* Documents a status code that isn't returned.
* Includes an explicit model validation check.

## Reference the analyzer package

The analyzers are included in the .NET SDK. To enable the analyzer in your project, include the `IncludeOpenAPIAnalyzers` property in the project file:

```xml
<PropertyGroup>
 <IncludeOpenAPIAnalyzers>true</IncludeOpenAPIAnalyzers>
</PropertyGroup>
```

## Analyzers for web API conventions

OpenAPI documents contain status codes and response types that an action may return. In ASP.NET Core MVC, attributes such as `Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute` and `Microsoft.AspNetCore.Mvc.ProducesAttribute` are used to document an action. ASP.NET Core web API documentation with Swagger / OpenAPI goes into further detail on documenting your web API.

One of the analyzers in the package inspects controllers annotated with `Microsoft.AspNetCore.Mvc.ApiControllerAttribute` and identifies actions that don't entirely document their responses. Consider the following example:

```csharp
// GET api/contacts/{guid}
[HttpGet("{id}", Name = "GetById")]
[ProducesResponseType(typeof(Contact), StatusCodes.Status200OK)]
public IActionResult Get(string id)
{
    var contact = _contacts.Get(id);

    if (contact == null)
    {
        return NotFound();
    }

    return Ok(contact);
}
```

The preceding action documents the HTTP 200 success return type but doesn't document the HTTP 404 failure status code. The analyzer reports the missing documentation for the HTTP 404 status code as a warning. An option to fix the problem is provided.

## Analyzers require Microsoft.NET.Sdk.Web

Analyzers don't work with library projects or projects referencing `Sdk="Microsoft.NET.Sdk"`.

## Related content

* Use web API conventions
* ASP.NET Core web API documentation with Swagger / OpenAPI
* Create web APIs with ASP.NET Core
