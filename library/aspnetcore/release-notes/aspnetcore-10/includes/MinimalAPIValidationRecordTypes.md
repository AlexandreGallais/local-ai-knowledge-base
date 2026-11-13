---
title: "MinimalAPIValidationRecordTypes"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10/includes/MinimalAPIValidationRecordTypes.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# MinimalAPIValidationRecordTypes

#### Validation with record types

Minimal APIs also support validation with C# record types. Record types can be validated using attributes from the `System.ComponentModel.DataAnnotations` namespace, similar to classes. For example:

```csharp
public record Product(
    [Required] string Name,
    [Range(1, 1000)] int Quantity);
```

When using record types as parameters in Minimal API endpoints, validation attributes are automatically applied in the same way as class types:

```csharp
app.MapPost("/products", (Product product) =>
{
    // Endpoint logic here
    return TypedResults.Ok(product);
});
```
