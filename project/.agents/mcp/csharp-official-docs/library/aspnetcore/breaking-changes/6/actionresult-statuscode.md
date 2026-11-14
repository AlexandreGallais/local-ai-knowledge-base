---
title: "Breaking change: ActionResult<T> sets StatusCode to 200"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/6/actionresult-statuscode.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ActionResult\<T> sets StatusCode to 200

When returning a `T` in an MVC/API controller action that declares the return type as `Microsoft.AspNetCore.Mvc.ActionResult`1`, the `Microsoft.AspNetCore.Mvc.ObjectResult.StatusCode` is always set to 200, except when the `T` is a `Microsoft.AspNetCore.Mvc.ProblemDetails`.

This change can cause unexpected behavior in some scenarios where you set the status code manually, since previously the `Microsoft.AspNetCore.Mvc.ObjectResult.StatusCode` was `null`. Also, an action filter could be affected by this change if it expects a null value instead of 200.

## Version introduced

ASP.NET Core 6.0

## Previous behavior

Previously, a controller's action that returns `T` and sets `Response.StatusCode` manually generated the specified response status code. For example, the following controller's action will generate a `202 Accepted` response.

```csharp
// Generates a 202 Accepted response
public ActionResult<Model> Get()
{
    Response.StatusCode = StatusCodes.Status202Accepted;
    return new Model();
}
```

## New behavior

Now, the same controller's action that returns `T` and sets `Response.StatusCode` manually always generates a `200 OK` response.

```csharp
// Generates a 200 OK response
public ActionResult<Model> Get()
{
    Response.StatusCode = StatusCodes.Status202Accepted;
    return new Model();
}
```

## Type of breaking change

This change can affect source compatibility.

## Reason for change

Returning a status code of `200 OK` is documented since ASP.NET Core 3.1. However, it keeps `Microsoft.AspNetCore.Mvc.ObjectResult.StatusCode` as `null` and eventually generates a `200 OK` response only because it's the default. Since the default internal behavior could change, we decided to avoid relying on the default and to explicitly set `Microsoft.AspNetCore.Mvc.ObjectResult.StatusCode` to the expected `200 OK`.

## Recommended action

If your code sets the status code manually and is broken by this change, you'll need to change your controller action. For example, the following code snippet sets a status code of 202 and is broken by this change.

```csharp
public ActionResult<Model> Get()
{
    Response.StatusCode = StatusCodes.Status202Accepted;
    return new Model();
}
```

To retain the desired behavior of a 202 status code, the following code snippets show some options.

```csharp
public ActionResult<Model> Get()
{
   return Accepted(new Model());
}

// or

public ActionResult<Model> Get()
{
   return StatusCode(StatusCodes.Status202Accepted, new Model());
}

// or

public Model Get()
{
   Response.StatusCode = StatusCodes.Status202Accepted;
   return new Model();
}
```

## Affected APIs

- MVC/API controller actions

## See also

- ActionResult\<T> type
