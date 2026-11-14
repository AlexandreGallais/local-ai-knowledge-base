---
title: "Breaking change: Static files: CSV content type changed to standards-compliant"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/static-files-csv-content-type-changed.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Static files: CSV content type changed to standards-compliant

In ASP.NET Core 5.0, the default `Content-Type` response header value that the static file middleware uses for *.csv* files has changed to the standards-compliant value `text/csv`.

For discussion on this issue, see dotnet/aspnetcore#17385.

## Version introduced

5.0 Preview 1

## Old behavior

The `Content-Type` header value `application/octet-stream` was used.

## New behavior

The `Content-Type` header value `text/csv` is used.

## Reason for change

Compliance with the RFC 7111 standard.

## Recommended action

If this change impacts your app, you can customize the file extension-to-MIME type mapping. To revert to the `application/octet-stream` MIME type, modify the `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` method call in `Startup.Configure`. For example:

```csharp
var provider = new FileExtensionContentTypeProvider();
provider.Mappings[".csv"] = MediaTypeNames.Application.Octet;

app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider
});
```

For more information on customizing the mapping, see Map file extensions to MIME types.

## Affected APIs

`Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider`
