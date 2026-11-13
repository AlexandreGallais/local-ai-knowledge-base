---
title: "Include OpenAPI metadata in an ASP.NET Core app (part 3 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/openapi/include-metadata.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Include OpenAPI metadata in an ASP.NET Core app (part 3 of 6)

### Describe response types

OpenAPI supports providing a description of the responses returned from an API. ASP.NET Core provides several strategies for setting the response metadata of an endpoint. Response metadata that can be set includes the status code, the type of the response body, and content types of a response. Responses in OpenAPI may have additional metadata, such as description, headers, links, and examples. This additional metadata can be set with a document transformer or operation transformer.

The specific mechanisms for setting response metadata depend on the type of app being developed.

#### Minimal APIs

In Minimal API apps, ASP.NET Core can extract the response metadata added by extension methods on the endpoint, attributes on the route handler, and the return type of the route handler.

* The `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Produces*` extension method can be used on the endpoint to specify the status code, the type of the response body, and content types of a response from an endpoint.
* The `[ProducesResponseType]` or `Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute`1` attribute can be used to specify the type of the response body.
* A route handler can be used to return a type that implements `Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider` to specify the type and content-types of the response body.
* The `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.ProducesProblem*` extension method on the endpoint can be used to specify the status code and content-types of an error response.

Note that the `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Produces*`  and `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.ProducesProblem*` extension methods are supported on both `Microsoft.AspNetCore.Builder.RouteHandlerBuilder` and on `Microsoft.AspNetCore.Routing.RouteGroupBuilder`. This allows, for example, a common set of error responses to be defined for all operations in a group.

When not specified by one of the preceding strategies, the:
* Status code for the response defaults to 200.
* Schema for the response body can be inferred from the implicit or explicit return type of the endpoint method, for example, from `T` in `System.Threading.Tasks.Task`1`; otherwise, it's considered to be unspecified.
* Content-type for the specified or inferred response body is "application/json".

In Minimal APIs, the `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Produces*` extension method and the `[ProducesResponseType]` attribute only set the response metadata for the endpoint. They do not modify or constrain the behavior of the endpoint, which may return a different status code or response body type than specified by the metadata, and the content-type is determined by the return type of the route handler method, irrespective of any content-type specified in attributes or extension methods.

The `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Produces*` extension method can specify an endpoint's response type, with a default status code of 200 and a default content type of `application/json`. The following example illustrates this:

```csharp
app.MapGet("/todos", async (TodoDb db) => await db.Todos.ToListAsync())
    .Produces<IList<Todo>>();
```

The `[ProducesResponseType]` can be used to add response metadata to an endpoint. Note that the attribute is applied to the route handler method, not the method invocation to create the route, as shown in the following example:

```csharp
app.MapGet("/todos",
    [ProducesResponseType<List<Todo>>(200)]
    async (TodoDb db) => await db.Todos.ToListAsync());
```

`[ProducesResponseType]`, `[Produces]`, and `[ProducesDefaultResponseType]` also support an optional string property called `Description` that can be used to describe the response. This is useful for explaining why or when clients can expect a specific response:

```csharp
app.MapGet("/todos/{id}",
    [ProducesResponseType<Todo>(200, 
        Description = "Returns the requested Todo item.")]
    [ProducesResponseType(404, Description = "Requested item not found.")]
    [ProducesDefault(Description = "Undocumented status code.")]
    async (int id, TodoDb db) => /* Code here */);
```

Using `Microsoft.AspNetCore.Http.TypedResults` in the implementation of an endpoint's route handler automatically includes the response type metadata for the endpoint. For example, the following code automatically annotates the endpoint with a response under the `200` status code with an `application/json` content type.

```csharp
app.MapGet("/todos", async (TodoDb db) =>
{
    var todos = await db.Todos.ToListAsync();
    return TypedResults.Ok(todos);
});
```

Only return types that implement `Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider` create a `responses` entry in the OpenAPI document. The following is a partial list  of some of the `Microsoft.AspNetCore.Http.TypedResults` helper methods that produce a `responses` entry:

| `TypedResults` helper method | Status code |
| ---------------------------- | ----------- |
| Ok()                         | 200         |
| Created()                    | 201         |
| CreatedAtRoute()             | 201         |
| Accepted()                   | 202         |
| AcceptedAtRoute()            | 202         |
| NoContent()                  | 204         |
| BadRequest()                 | 400         |
| ValidationProblem()          | 400         |
| NotFound()                   | 404         |
| Conflict()                   | 409         |
| UnprocessableEntity()        | 422         |
| File()                       | 200         |

All of these methods except `NoContent` have a generic overload that specifies the type of the response body.

A class can be implemented to set the endpoint metadata and return it from the route handler.

##### Describe binary file responses

To describe endpoints that return binary file responses in the OpenAPI document, use the `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Produces*` extension method with a file result type as the type parameter to specify the response type and content type. `Microsoft.AspNetCore.Mvc.FileContentResult`, `Microsoft.AspNetCore.Mvc.FileStreamResult`, `Microsoft.AspNetCore.Http.HttpResults.FileContentHttpResult`, and `Microsoft.AspNetCore.Http.HttpResults.FileStreamHttpResult` all produce a binary schema. The following example uses `FileContentResult`:

```csharp
app.MapPost("/filecontentresult", () =>
{
    var content = "This endpoint returns a FileContentResult!"u8.ToArray();
    return TypedResults.File(content);
})
.Produces<FileContentResult>(contentType: MediaTypeNames.Application.Octet);
```

This generates an OpenAPI schema with `type: string` and `format: binary` for the `FileContentResult` type. The other file result types behave identically, each with a component schema named after the type—for example, `FileStreamHttpResult`.

The generated OpenAPI document describes the endpoint response as:

```yaml
responses:
  '200':
    description: OK
    content:
      application/octet-stream:
        schema:
          $ref: '#/components/schemas/FileContentResult'
```

With `FileContentResult` defined in `components/schemas` as:

```yaml
components:
  schemas:
    FileContentResult:
      type: string
      format: binary
```

File results also support conditional requests and range requests, and `Stream` is an equally valid `TResponse` for a binary schema. For the full set of file result types and their behavior, see File result return values.

##### Set responses for `ProblemDetails`

When setting the response type for endpoints that may return a ProblemDetails response, the following can be used to add the appropriate response metadata for the endpoint:

* `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.ProducesProblem*`
* `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.ProducesValidationProblem*` extension method.
* `Microsoft.AspNetCore.Http.TypedResults` with a status code in the (400-499) range.

For more information on how to configure a Minimal API app to return ProblemDetails responses, see Handle errors in ASP.NET Core APIs.

##### Multiple response types

If an endpoint can return different response types in different scenarios, you can provide metadata in the following ways:

* Call the `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Produces*` extension method multiple times, as shown in the following example:

  ```csharp
app.MapGet("/api/todoitems/{id}", async (int id, TodoDb db) =>
         await db.Todos.FindAsync(id) 
         is Todo todo
         ? Results.Ok(todo) 
         : Results.NotFound())
   .Produces<Todo>(StatusCodes.Status200OK)
   .Produces(StatusCodes.Status404NotFound);
```

* Use `Microsoft.AspNetCore.Http.HttpResults.Results`6` in the signature and `Microsoft.AspNetCore.Http.TypedResults` in the body of the handler, as shown in the following example:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MultipleResultTypes/Program.cs._
  The `Results<TResult1,TResult2,TResultN>` union types declare that a route handler returns multiple `IResult`-implementing concrete types, and any of those types that implement `Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider` will contribute to the endpoint's metadata.

  The union types implement implicit cast operators. These operators enable the compiler to automatically convert the types specified in the generic arguments to an instance of the union type. This capability has the added benefit of providing compile-time checking that a route handler only returns the results that it declares it does. Attempting to return a type that isn't declared as one of the generic arguments to `Results<TResult1,TResult2,TResultN>` results in a compilation error.

Multiple `Produces` calls can also target the *same* status code with different content types — for example, a `200` response available as both `application/json` and `text/plain`. Every declaration is preserved in the generated document: each content type gets its own entry, and when several declared types share one content type, the response schema is an `anyOf` composite of them. Earlier releases kept only the last declaration for each status code. For more information, see OpenAPI document includes all ProducesResponseType entries per status code.

##### Describe Server-Sent Events responses

An endpoint that streams Server-Sent Events returns `text/event-stream` rather than a single response body, so a single response schema can't describe it. OpenAPI 3.2 introduces `itemSchema`, which describes the shape of **one event** in the stream. ASP.NET Core emits `itemSchema` when an endpoint returns `System.Net.ServerSentEvents.SseItem`1` through `Microsoft.AspNetCore.Http.TypedResults.ServerSentEvents*`:

```csharp
app.MapGet("/todos/stream", (CancellationToken ct) =>
    TypedResults.ServerSentEvents(GetTodosAsync(ct)))
   .WithName("StreamTodos");

static async IAsyncEnumerable<SseItem<Todo>> GetTodosAsync(
    [EnumeratorCancellation] CancellationToken ct = default)
{
    foreach (var todo in Todos.All)
    {
        yield return new SseItem<Todo>(todo) { EventId = todo.Id.ToString() };
        await Task.Delay(1000, ct);
    }
}
```

The generated document describes each event as an object whose `data` member references the payload's component schema, alongside the standard Server-Sent Events `event` and `id` fields:

```yaml
responses:
  '200':
    description: OK
    content:
      text/event-stream:
        itemSchema:
          type: object
          required: [data]
          properties:
            data:
              $ref: '#/components/schemas/Todo'
            event: { type: string }
            id: { type: string }
```

If the event payload is a discriminated union, the union's case names are also emitted as an `enum` on the `event` field.

> **Important:**
> `itemSchema` is an OpenAPI 3.2 construct. Apps that target .NET 11 or later generate OpenAPI 3.2 documents by default, but an app that sets `Microsoft.AspNetCore.OpenApi.OpenApiOptions.OpenApiVersion` to an earlier version serializes the item schema as the `x-oai-itemSchema` extension instead. For more information, see Customize the OpenAPI version of a generated document.

#### Controllers

In controller-based apps, ASP.NET Core can extract the response metadata from the action method signature, attributes, and conventions.

* You can use the `[ProducesResponseType]` or `Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute`1` attribute to specify the status code, the type of the response body, and content types of a response from an action method.
* You can use the `[Produces]` or `Microsoft.AspNetCore.Mvc.ProducesAttribute`1` attribute to specify the type of the response body.
* You can use the `[ProducesDefaultResponseType]` attribute to specify the response body type for the "default" response.
* You can use the `[ProducesErrorResponseType]` attribute to specify the response body type for an error response. However, be aware that this is only complements the status code and content types specified by an `[ProducesResponseType]` attribute with a 4XX status code.

Only one `[Produces]` or `Microsoft.AspNetCore.Mvc.ProducesAttribute`1` attributes may be applied to an action method, but multiple `[ProducesResponseType]` or `Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute`1` attributes with different status codes may be applied to a single action method.

All of the above attributes can be applied to individual action methods or to the controller class where it applies to all action methods in the controller.

`[ProducesResponseType]`, `[Produces]`, and `[ProducesDefaultResponseType]` also support an optional string property called `Description` that can be used to describe the response. This is useful for explaining why or when clients can expect a specific response:

```csharp
[HttpGet("/todos/{id}")]
[ProducesResponseType<Todo>(StatusCodes.Status200OK,
    "application/json", Description = "Returns the requested Todo item.")]
[ProducesResponseType(StatusCodes.Status404NotFound,
    Description = "Requested Todo item not found.")]
[ProducesDefault(Description = "Undocumented status code.")]
public async Task<ActionResult<Todo>> GetTodoItem(string id, Todo todo)
```

When not specified by an attribute:
