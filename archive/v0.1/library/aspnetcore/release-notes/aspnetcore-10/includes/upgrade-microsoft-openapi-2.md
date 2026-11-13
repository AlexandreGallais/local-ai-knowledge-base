---
title: "upgrade-microsoft-openapi-2"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10/includes/upgrade-microsoft-openapi-2.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# upgrade-microsoft-openapi-2

### Upgrade Microsoft.OpenApi to 2.0.0

The `Microsoft.OpenApi` library used for OpenAPI document generation in ASP.NET Core has been upgraded to version 2.0.0 (GA).

#### Breaking changes in 2.0.0

The following breaking changes were introduced in the preview releases and remain in the GA version. These primarily affect users who implement document, operation, or schema transformers:

* Ephemeral object properties are now in Metadata
* Use HTTP Method Object Instead of Enum

With the update to the GA version, no further breaking changes are expected in OpenAPI document generation.
