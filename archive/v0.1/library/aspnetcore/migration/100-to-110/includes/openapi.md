---
title: "openapi"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/migration/100-to-110/includes/openapi.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# openapi

### Microsoft.OpenApi upgraded to 3.x

In .NET 11, `Microsoft.AspNetCore.OpenApi` upgrades its dependency on `Microsoft.OpenApi` from 2.x to 3.x. The transformer interfaces are unchanged, but the object model for `OpenApiDocument`, `OpenApiOperation`, and `OpenApiSchema` has changed shape. Custom document, operation, and schema transformers that inspect or mutate OpenAPI objects must be updated to compile against the 3.x API.

For detailed migration guidance and breaking change details, see Microsoft.OpenApi upgraded to 3.x (ASP.NET Core 11.0 breaking change announcement) and the Microsoft.OpenApi 3.x upgrade guide.
