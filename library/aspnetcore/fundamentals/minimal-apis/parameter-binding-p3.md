---
title: "Parameter binding in Minimal API applications (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/minimal-apis/parameter-binding.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Parameter binding in Minimal API applications (part 3 of 4)

## Bind to collections and complex types from forms

Binding is supported for:

* Collections, for example List and Dictionary
* Complex types, for example, `Todo` or `Project`

> **Warning:**
> Complex-type form mapping with `[FromForm]` in Minimal APIs doesn't use MVC model binding. Attributes in the `Microsoft.AspNetCore.Mvc.ModelBinding` namespace, such as `[BindNever]` and `[BindRequired]`, aren't supported. Don't use these attributes to prevent overposting. Instead, use a dedicated input model or data transfer object (DTO) that includes only the properties clients are allowed to modify.

The following code shows:

* A minimal endpoint that binds a multi-part form input to a complex object.
* How to use the antiforgery services to support the generation and validation of antiforgery tokens.

```csharp
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAntiforgery();

var app = builder.Build();

app.UseAntiforgery();

app.MapGet("/", (HttpContext context, IAntiforgery antiforgery) =>
{
    var token = antiforgery.GetAndStoreTokens(context);
    var html = $"""
        <html><body>
           <form action="/todo" method="POST" enctype="multipart/form-data">
               <input name="{token.FormFieldName}" 
                                type="hidden" value="{token.RequestToken}" />
               <input type="text" name="name" />
               <input type="date" name="dueDate" />
               <input type="checkbox" name="isCompleted" value="true" />
               <input type="submit" />
               <input name="isCompleted" type="hidden" value="false" /> 
           </form>
        </body></html>
    """;
    return Results.Content(html, "text/html");
});

app.MapPost("/todo", async Task<Results<Ok<Todo>, BadRequest<string>>> 
               ([FromForm] Todo todo, HttpContext context, IAntiforgery antiforgery) =>
{
    try
    {
        await antiforgery.ValidateRequestAsync(context);
        return TypedResults.Ok(todo);
    }
    catch (AntiforgeryValidationException e)
    {
        return TypedResults.BadRequest("Invalid antiforgery token");
    }
});

app.Run();

class Todo
{
    public string Name { get; set; } = string.Empty;
    public bool IsCompleted { get; set; } = false;
    public DateTime DueDate { get; set; } = DateTime.Now.Add(TimeSpan.FromDays(1));
}
```
In the preceding code:

* The target parameter ***must*** be annotated with the `[FromForm]` attribute to disambiguate from parameters that should be read from the JSON body.
* Binding from complex or collection types is ***not*** supported for Minimal APIs that are compiled with the Request Delegate Generator.
* The markup shows an additional hidden input with a name of `isCompleted` and a value of `false`. If the `isCompleted` checkbox is checked when the form is submitted, both values `true` and `false` are submitted as values. If the checkbox is unchecked, only the hidden input value `false` is submitted. The ASP.NET Core form-mapping process reads only the first value when binding to a `bool` value, which results in `true` for checked checkboxes and `false` for unchecked checkboxes.

An example of the form data submitted to the preceding endpoint looks as follows:

```txt
__RequestVerificationToken: CfDJ8Bveip67DklJm5vI2PF2VOUZ594RC8kcGWpTnVV17zCLZi1yrs-CSz426ZRRrQnEJ0gybB0AD7hTU-0EGJXDU-OaJaktgAtWLIaaEWMOWCkoxYYm-9U9eLV7INSUrQ6yBHqdMEE_aJpD4AI72gYiCqc
name: Walk the dog
dueDate: 2024-04-06
isCompleted: true
isCompleted: false
```

## Bind arrays and string values from headers and query strings

The following code demonstrates binding query strings to an array of primitive types, string arrays, and StringValues:

```csharp
// Bind query string values to a primitive type array.
// GET  /tags?q=1&q=2&q=3
app.MapGet("/tags", (int[] q) =>
                      $"tag1: {q[0]} , tag2: {q[1]}, tag3: {q[2]}");

// Bind to a string array.
// GET /tags2?names=john&names=jack&names=jane
app.MapGet("/tags2", (string[] names) =>
            $"tag1: {names[0]} , tag2: {names[1]}, tag3: {names[2]}");

// Bind to StringValues.
// GET /tags3?names=john&names=jack&names=jane
app.MapGet("/tags3", (StringValues names) =>
            $"tag1: {names[0]} , tag2: {names[1]}, tag3: {names[2]}");
```
Binding query strings or header values to an array of complex types is supported when the type has `TryParse` implemented. The following code binds to a string array and returns all the items with the specified tags:

```csharp
// GET /todoitems/tags?tags=home&tags=work
app.MapGet("/todoitems/tags", async (Tag[] tags, TodoDb db) =>
{
    return await db.Todos
        .Where(t => tags.Select(i => i.Name).Contains(t.Tag.Name))
        .ToListAsync();
});
```
The following code shows the model and the required `TryParse` implementation:

```csharp
public class Todo
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }

    // This is an owned entity. 
    public Tag Tag { get; set; } = new();
}

[Owned]
public class Tag
{
    public string? Name { get; set; } = "n/a";

    public static bool TryParse(string? name, out Tag tag)
    {
        if (name is null)
        {
            tag = default!;
            return false;
        }

        tag = new Tag { Name = name };
        return true;
    }
}
```
The following code binds to an `int` array:

```csharp
// GET /todoitems/query-string-ids?ids=1&ids=3
app.MapGet("/todoitems/query-string-ids", async (int[] ids, TodoDb db) =>
{
    return await db.Todos
        .Where(t => ids.Contains(t.Id))
        .ToListAsync();
});
```
To test the preceding code, add the following endpoint to populate the database with `Todo` items:

```csharp
// POST /todoitems/batch
app.MapPost("/todoitems/batch", async (Todo[] todos, TodoDb db) =>
{
    await db.Todos.AddRangeAsync(todos);
    await db.SaveChangesAsync();

    return Results.Ok(todos);
});
```
Use a tool like `HttpRepl` to pass the following data to the previous endpoint:

```csharp
[
    {
        "id": 1,
        "name": "Have Breakfast",
        "isComplete": true,
        "tag": {
            "name": "home"
        }
    },
    {
        "id": 2,
        "name": "Have Lunch",
        "isComplete": true,
        "tag": {
            "name": "work"
        }
    },
    {
        "id": 3,
        "name": "Have Supper",
        "isComplete": true,
        "tag": {
            "name": "home"
        }
    },
    {
        "id": 4,
        "name": "Have Snacks",
        "isComplete": true,
        "tag": {
            "name": "N/A"
        }
    }
]
```
The following code binds to the header key `X-Todo-Id` and returns the `Todo` items with matching `Id` values:

```csharp
// GET /todoitems/header-ids
// The keys of the headers should all be X-Todo-Id with different values
app.MapGet("/todoitems/header-ids", async ([FromHeader(Name = "X-Todo-Id")] int[] ids, TodoDb db) =>
{
    return await db.Todos
        .Where(t => ids.Contains(t.Id))
        .ToListAsync();
});
```
> **Note:**
> When binding a non-nullable `string[]` from a query string, the absence of any matching query string value results in an empty array instead of `null`. If the parameter is declared as nullable (for example, `string[]?`) or has a default value of `null` (for example, `[FromQuery] string[]? names = null`), omitting the query parameter results in `null`.

## Parameter binding for argument lists with [AsParameters]

`Microsoft.AspNetCore.Http.AsParametersAttribute` enables simple parameter binding to types and not complex or recursive model binding.

Consider the following code:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Program.cs._
Consider the following `GET` endpoint:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Program.cs._
The following `struct` can be used to replace the preceding highlighted parameters:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Models/TodoDb.cs._
The refactored `GET` endpoint uses the preceding `struct` with the AsParameters attribute:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Program.cs._
The following code shows additional endpoints in the app:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Program.cs._
The following classes are used to refactor the parameter lists:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Models/TodoDb.cs._
The following code shows the refactored endpoints using `AsParameters` and the preceding `struct` and classes:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Program.cs._
The following `record` types can be used to replace the preceding parameters:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/arg-lists/Models/TodoRecord.cs._
Using a `struct` with `AsParameters` can be more performant than using a `record` type.

The complete sample code in the AspNetCore.Docs.Samples repository.
