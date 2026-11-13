---
title: "Include OpenAPI metadata in an ASP.NET Core app (part 6 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/openapi/include-metadata.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Include OpenAPI metadata in an ASP.NET Core app (part 6 of 6)

## Set JSON serialization options globally

The following code configures some JSON options globally, for Minimal APIs and Controller based APIs:

  ```csharp
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.Converters.Add(
        new JsonStringEnumConverter<DayOfTheWeekAsString>());
    options.SerializerOptions.DefaultIgnoreCondition =
        JsonIgnoreCondition.WhenWritingNull;
    options.SerializerOptions.PropertyNamingPolicy =
        JsonNamingPolicy.CamelCase;

});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter<DayOfTheWeekAsString>());
        options.JsonSerializerOptions.DefaultIgnoreCondition =
            JsonIgnoreCondition.WhenWritingNull;
        options.JsonSerializerOptions.PropertyNamingPolicy =
            JsonNamingPolicy.CamelCase;
    });

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/", () =>
{
    var day = DayOfTheWeekAsString.Friday;
    return Results.Json(day);
});

app.MapPost("/", (DayOfTheWeekAsString day) =>
{
    return Results.Json($"Received: {day}");
});

app.UseRouting();
app.MapControllers();

app.Run();
```

## MVC JSON options and global JSON options

The following table shows the key differences between the MVC JSON options and global Minimal API JSON options.

| **Aspect**           | **MVC JSON Options**                       | **Global JSON Options**             |
|-----------------------|--------------------------------------------|-----------------------------------------------|
| **Scope**             | Limited to MVC controllers and endpoints.  | Minimal APIs and OpenAPI docs.   |
| **Configuration**     | `AddControllers().AddJsonOptions()`        | `Configure<JsonOptions>()`                    |
| **Purpose**           | Handles serialization and deserialization of JSON requests and responses in APIs.  | Defines global JSON handling for Minimal APIs and OpenAPI schemas. |
| **Influence on OpenAPI** | None                                     | Directly influences OpenAPI schema generation.|

---

## Related content

* Use the generated OpenAPI documents
* OpenAPI specification
