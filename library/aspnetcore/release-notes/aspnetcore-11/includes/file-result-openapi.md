---
title: "file-result-openapi"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/file-result-openapi.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# file-result-openapi

### File stream result types appear in OpenAPI documents

`FileStreamResult`, `FileContentHttpResult`, and `FileStreamHttpResult` are now described as binary string schemas in generated OpenAPI documents, so clients see accurate response shapes for endpoints that stream files. Annotate the endpoint with `.Produces<FileContentHttpResult>(contentType: "application/pdf")` (or the equivalent `FileStreamHttpResult`/`FileStreamResult` type) so OpenAPI sees the result type and emits the binary schema.

Thank you @marcominerva for this contribution!
