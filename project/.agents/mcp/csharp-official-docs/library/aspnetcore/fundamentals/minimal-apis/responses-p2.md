---
title: "Create responses in Minimal API applications (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/minimal-apis/responses.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Create responses in Minimal API applications (part 2 of 5)

## `IResult` return values

|Behavior|Content-Type|
|--|--|
| The framework calls IResult.ExecuteAsync.| Decided by the `IResult` implementation.

The `IResult` interface defines a contract that represents the result of an HTTP endpoint. The static Results class and the static TypedResults are used to create various `IResult` objects that represent different types of responses.

### `TypedResults` versus `Results`

The `Microsoft.AspNetCore.Http.Results` and `Microsoft.AspNetCore.Http.TypedResults` static classes provide similar sets of results helpers. The `TypedResults` class is the *typed* equivalent of the `Results` class. However, the `Results` helpers' return type is `Microsoft.AspNetCore.Http.IResult`, while each `TypedResults` helper's return type is one of the `IResult` implementation types. The difference means that for `Results` helpers a conversion is needed when the concrete type is needed, for example, for unit testing. The implementation types are defined in the `Microsoft.AspNetCore.Http.HttpResults` namespace.

Returning `TypedResults` rather than `Results` has the following advantages:

* `TypedResults` helpers return strongly typed objects, which can improve code readability, unit testing, and reduce the chance of runtime errors.
* The implementation type automatically provides the response type metadata for OpenAPI to describe the endpoint.

Consider the following endpoint, for which a `200 OK` status code with the expected JSON response is produced.

```csharp
app.MapGet("/hello", () => Results.Ok(new Message() { Text = "Hello World!" }))
    .Produces<Message>();
```
In order to document this endpoint correctly the extensions method `Produces` is called. However, it's not necessary to call `Produces` if `TypedResults` is used instead of `Results`, as shown in the following code. `TypedResults` automatically provides the metadata for the endpoint.

```csharp
app.MapGet("/hello2", () => TypedResults.Ok(new Message() { Text = "Hello World!" }));
```
For more information about describing a response type, see Include OpenAPI metadata in an ASP.NET Core app. For complete setup instructions, see Overview of OpenAPI support in ASP.NET Core API apps.

> **Note:**
> The `.Produces()` and `.Produces<T>()` extension methods are provided by the shared framework and only add endpoint metadata. To generate an OpenAPI document from that metadata, configure an OpenAPI document generator such as Microsoft.AspNetCore.OpenApi, Swashbuckle, or NSwag. For more information, see Overview of OpenAPI support in ASP.NET Core API apps.

For examples on testing result types, see the Test documentation.

Because all methods on `Results` return `IResult` in their signature, the compiler automatically infers that as the request delegate return type when returning different results from a single endpoint. `TypedResults` requires the use of `Results<T1, TN>` from such delegates.

The following method compiles because both `Results.Ok` and `Results.NotFound` are declared as returning `IResult`, even though the actual concrete types of the objects returned are different:

```csharp
app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());
```
The following method does not compile, because `TypedResults.Ok` and `TypedResults.NotFound` are declared as returning different types and the compiler won't attempt to infer the best matching type:

```csharp
app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
     await db.Todos.FindAsync(id)
     is Todo todo
        ? TypedResults.Ok(todo)
        : TypedResults.NotFound());
```
To use `TypedResults`, the return type must be fully declared; when the method is asynchronous, the declaration requires wrapping the return type in a `Task<>`. Using `TypedResults` is more verbose, but that's the trade-off for having the type information be statically available and thus capable of self-describing to OpenAPI:

```csharp
app.MapGet("/todoitems/{id}", async Task<Results<Ok<Todo>, NotFound>> (int id, TodoDb db) =>
   await db.Todos.FindAsync(id)
    is Todo todo
       ? TypedResults.Ok(todo)
       : TypedResults.NotFound());
```
> **Note:**
> When using a method group whose only parameter is `HttpContext` (for example, `static async Task<Results<ContentHttpResult, BadRequest>> MyHandler(HttpContext context)`), `app.MapGet` matches both `RequestDelegate` and `Delegate`. Overload resolution selects the `Microsoft.AspNetCore.Http.RequestDelegate` overload, which discards return values and triggers analyzer warning ASP0016. To ensure the result is executed and written to the response, cast the method group to `Delegate` (for example, `app.MapGet("/route", (Delegate)MyHandler)`) or use a lambda.
>
> When using `TypedResults` with multiple return branches, an explicit union return type such as `Results<T1, T2>` (or `Task<Results<T1, T2>>` for async handlers) is required because the compiler cannot infer a common union type.

### Results<TResult1, TResultN>

Use `Results<TResult1, TResultN>` as the endpoint handler return type instead of `IResult` when:

* Multiple `IResult` implementation types are returned from the endpoint handler.
* The static `TypedResult` class is used to create the `IResult` objects.

This alternative is better than returning `IResult` because the generic union types automatically retain the endpoint metadata. And since the `Results<TResult1, TResultN>` union types implement implicit cast operators, the compiler can automatically convert the types specified in the generic arguments to an instance of the union type.

This has the added benefit of providing compile-time checking that a route handler actually only returns the results that it declares it does. Attempting to return a type that isn't declared as one of the generic arguments to `Results<>` results in a compilation error.

Consider the following endpoint, for which a `400 BadRequest` status code is returned when the `orderId` is greater than `999`. Otherwise, it produces a `200 OK` with the expected content.

```csharp
app.MapGet("/orders/{orderId}", IResult (int orderId)
    => orderId > 999 ? TypedResults.BadRequest() : TypedResults.Ok(new Order(orderId)))
    .Produces(400)
    .Produces<Order>();
```
In order to document this endpoint correctly the extension method `Produces` is called. However, since the `TypedResults` helper automatically includes the metadata for the endpoint, you can return the `Results<T1, Tn>` union type instead, as shown in the following code.

```csharp
app.MapGet("/orders/{orderId}", Results<BadRequest, Ok<Order>> (int orderId)
    => orderId > 999 ? TypedResults.BadRequest() : TypedResults.Ok(new Order(orderId)));
```
