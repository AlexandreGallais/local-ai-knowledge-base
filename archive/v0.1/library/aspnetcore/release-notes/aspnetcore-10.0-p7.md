---
title: "What's new in ASP.NET Core in .NET 10 (part 7 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 10 (part 7 of 9)

### Endpoint-specific OpenAPI operation transformers

Endpoint-specific operation transformers enable fine-grained customization of OpenAPI documentation for individual route endpoints. This feature allows developers to tailor Swagger/OpenAPI metadata and descriptions on a per-action or per-route basis, enhancing extensibility for advanced API scenarios.

For implementation details and code samples, see Customize OpenAPI documents.

### Upgrade Microsoft.OpenApi to 2.0.0

The `Microsoft.OpenApi` library used for OpenAPI document generation in ASP.NET Core has been upgraded to version 2.0.0 (GA).

#### Breaking changes in 2.0.0

The following breaking changes were introduced in the preview releases and remain in the GA version. These primarily affect users who implement document, operation, or schema transformers:

* Ephemeral object properties are now in Metadata
* Use HTTP Method Object Instead of Enum

With the update to the GA version, no further breaking changes are expected in OpenAPI document generation.

### OpenAPI Schema Generation Enhancements

#### Model nullable types using oneOf in OpenAPI schema

OpenAPI schema generation for nullable types was improved by using the `oneOf` pattern instead of the nullable property for complex types and collections. The implementation:

- Uses `oneOf` with `null` and the actual type schema for nullable complex types in request and response schemas.
- Detects nullability for parameters, properties, and return types using reflection and `NullabilityInfoContext`.
- Removes null types from componentized schemas to avoid duplication.

#### Fixes and improvements to schema reference resolution

This release improves the handling of JSON schemas for OpenAPI document generation by properly resolving relative JSON schema references (`$ref`) in the root schema document.

#### Include property descriptions as siblings of $ref in OpenAPI schema

Prior to .NET 10, ASP.NET Core discarded descriptions on properties defined with `$ref` in the generated OpenAPI document because OpenAPI v3.0 didn't allow sibling properties alongside `$ref` in schema definitions. OpenAPI 3.1 now lets you include descriptions alongside `$ref`. RC1 adds support for including property descriptions as siblings of `$ref` in the generated OpenAPI schema.

This was a community contribution. Thanks @desjoerd!

#### Add metadata from XML comments on `[AsParameters]` types to OpenAPI schema

OpenAPI schema generation now processes XML comments on properties of `[AsParameters]` parameter classes to extract metadata for documentation.

#### Exclude unknown HTTP methods from OpenAPI

OpenAPI schema generation now excludes unknown HTTP methods from the generated OpenAPI document. Query methods, which are standard HTTP methods but not recognized by OpenAPI, are now gracefully excluded from the generated OpenAPI document.

This was a community contribution. Thanks @martincostello!

#### Improve the description of JSON Patch request bodies

The OpenAPI schema generation for JSON Patch operations now correctly applies the `application/json-patch+json` media type to request bodies that use JSON Patch. This ensures that the generated OpenAPI document accurately reflects the expected media type for JSON Patch operations. In addition, the JSON Patch request body has a detailed schema that describes the structure of the JSON Patch document, including the operations that can be performed.

This was a community contribution. Thanks @martincostello!

#### Use invariant culture for OpenAPI document generation

OpenAPI document generation now uses invariant culture for formatting numbers and dates in the generated OpenAPI document. This ensures that the generated document is consistent and does not vary based on the server's culture settings.

This was a community contribution. Thanks @martincostello!

## Authentication and authorization

### Authentication and authorization metrics

Metrics have been added for certain authentication and authorization events in ASP.NET Core. With this change, you can now obtain metrics for the following events:

* Authentication:
  * Authenticated request duration
  * Challenge count
  * Forbid count
  * Sign in count
  * Sign out count
* Authorization:
  * Count of requests requiring authorization

The following image shows an example of the Authenticated request duration metric in the Aspire dashboard:

For more information, see ASP.NET Core built-in authentication and authorization metrics.

### ASP.NET Core Identity metrics

ASP.NET Core Identity observability has been improved in .NET 10 with metrics. Metrics are counters, histograms, and gauges that provide time-series measurements of system or application behavior.

For example, use the new ASP.NET Core Identity metrics to observe:

* **User management**: New user creations, password <example-value>, and role assignments.
* **Login/session handling**: Login attempts, sign ins, sign outs, and users using two factor authentication.

The new metrics are in the `Microsoft.AspNetCore.Identity` meter:

* `aspnetcore.identity.user.create.duration`
* `aspnetcore.identity.user.update.duration`
* `aspnetcore.identity.user.delete.duration`
* `aspnetcore.identity.user.check_password_attempts`
* `aspnetcore.identity.user.generated_tokens`
* `aspnetcore.identity.user.verify_token_attempts`
* `aspnetcore.identity.sign_in.authenticate.duration`
* `aspnetcore.identity.sign_in.check_password_attempts`
* `aspnetcore.identity.sign_in.sign_ins`
* `aspnetcore.identity.sign_in.sign_outs`
* `aspnetcore.identity.sign_in.two_factor_clients_remembered`
* `aspnetcore.identity.sign_in.two_factor_clients_forgotten`

For more information about using metrics in ASP.NET Core, see ASP.NET Core metrics.

### Avoid cookie login redirects for known API endpoints

By default, unauthenticated and unauthorized requests made to known API endpoints protected by cookie authentication now result in 401 and 403 responses rather than redirecting to a login or access denied URI.

This change was highly requested, because redirecting unauthenticated requests to a login page doesn't usually make sense for API endpoints which typically rely on 401 and 403 status codes rather than HTML redirects to communicate auth failures.

Known API Endpoints are identified using the new `IApiEndpointMetadata` interface, and metadata implementing the new interface has been added automatically to the following:

- `[ApiController]` endpoints
- Minimal API endpoints that read JSON request bodies or write JSON responses
- Endpoints using `TypedResults` return types
- SignalR endpoints

When `IApiEndpointMetadata` is present, the cookie authentication handler now returns appropriate HTTP status codes (401 for unauthenticated requests, 403 for forbidden requests) instead of redirecting.

If you want to prevent this new behavior, and always redirect to the login and access denied URIs for unauthenticated or unauthorized requests regardless of the target endpoint, you can override the `RedirectToLogin` and `RedirectToAccessDenied` events as follows:

```csharp
builder.Services.AddAuthentication()
    .AddCookie(options =>
    {
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.Redirect(context.RedirectUri);
            return Task.CompletedTask;
        };

        options.Events.OnRedirectToAccessDenied = context =>
        {
            context.Response.Redirect(context.RedirectUri);
            return Task.CompletedTask;
        };
    });
```

For more information about this breaking change, see ASP.NET Core breaking changes announcement.
