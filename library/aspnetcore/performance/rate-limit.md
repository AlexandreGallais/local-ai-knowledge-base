---
title: "Rate limiting middleware in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/rate-limit.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Rate limiting middleware in ASP.NET Core

By Arvin Kahbazi, Maarten Balliauw, and Rick Anderson

The `Microsoft.AspNetCore.RateLimiting` middleware provides rate limiting middleware. Apps configure rate limiting policies and then attach the policies to endpoints. Apps using rate limiting should be carefully load tested and reviewed before deploying. See Testing endpoints with rate limiting in this article for more information.

For an introduction to rate limiting, see Rate limiting middleware.

## Why use rate limiting

Rate limiting can be used for managing the flow of incoming requests to an app. Key <example-value> to implement rate limiting:

* **Preventing Abuse**: Rate limiting helps protect an app from abuse by limiting the number of requests a user or client can make in a given time period. This protection is particularly important for public APIs.
* **Ensuring Fair Usage**: By setting limits that prevent users from monopolizing the system, you ensure that all users have fair access to resources.
* **Protecting Resources**: Rate limiting helps prevent server overload by controlling the number of requests that can be processed. It protects the backend resources from being overwhelmed.
* **Enhancing Security**: It can mitigate the risk of Denial of Service (DoS) attacks by limiting the rate at which requests are processed. It makes it harder for attackers to flood a system.
* **Improving Performance**: By controlling the rate of incoming requests, you can maintain optimal performance and responsiveness of an app, ensuring a better user experience.
* **Cost Management**: For services that incur costs based on usage, rate limiting can help manage and predict expenses by controlling the volume of requests processed.

Implementing rate limiting in an ASP.NET Core app can help maintain stability, security, and performance. The result is a reliable and efficient service for all users.

## Prevent DDoS attacks

While rate limiting can help mitigate the risk of Denial of Service (DoS) attacks by limiting the rate at which requests are processed, it's not a comprehensive solution for Distributed Denial of Service (DDoS) attacks. DDoS attacks involve multiple systems overwhelming an app with a flood of requests, making it difficult to handle with rate limiting alone.

For robust DDoS protection, consider using a commercial DDoS protection service. These services offer advanced features such as:

* **Traffic analysis**: Continuous monitoring and analysis of incoming traffic to detect and mitigate DDoS attacks in real time.
* **Scalability**: The ability to handle large-scale attacks by distributing traffic across multiple servers and data centers.
* **Automated mitigation**: Automated response mechanisms to quickly block malicious traffic without manual intervention.
* **Global network**: A global network of servers to absorb and mitigate attacks closer to the source.
* **Constant updates**: Commercial services continuously track and update their protection mechanisms to adapt to new and evolving threats.

When using a cloud hosting service, DDoS protection is usually available as part of the hosting solution, such as Azure Web Application Firewall, AWS Shield or Google Cloud Armor. Dedicated protections are available as Web Application Firewalls (WAF) or as part of a CDN solution such as Cloudflare or Akamai Kona Site Defender

Implementing a commercial DDoS protection service in conjunction with rate limiting can provide a comprehensive defense strategy, ensuring the stability, security, and performance of an app.

## Rate limiting with multiple app instances

The rate limiting middleware keeps its counters in memory in each app instance. When an app runs on multiple instances, such as behind a load balancer or after scaling out, each instance enforces its limits separately. The effective limit is the configured limit multiplied by the number of instances. For example, a policy that allows 100 requests per minute allows up to 300 requests per minute across three instances. This also applies to a global limiter: it covers all requests to one instance, not to the whole app. To enforce one limit across all instances, apply rate limiting at a shared layer, such as an API gateway, or write a custom rate limiter that stores its counters in a shared store.

## Use rate-limiting middleware

The example in this section describes its policy as applying "globally," but the rate limiting behavior applies only to the app's instance. For more information, see the Rate limiting with multiple app instances section.

The following steps show how to use the rate limiting middleware in an ASP.NET Core app:

1. Configure rate limiting services.

  In the `Program.cs` file, configure the rate limiting services by adding the appropriate rate limiting policies. Define policies as either global or named policies. The following example permits 10 requests per minute by user (identity) or globally:

  ```csharp
  builder.Services.AddRateLimiter(options =>
  {
      options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
          RateLimitPartition.GetFixedWindowLimiter(
              partitionKey: httpContext.User.Identity?.Name ?? httpContext.Request.Headers.Host.ToString(),
              factory: partition => new FixedWindowRateLimiterOptions
              {
                  AutoReplenishment = true,
                  PermitLimit = 10,
                  QueueLimit = 0,
                  Window = TimeSpan.FromMinutes(1)
              }));
  });
  ```

  Named policies need to be explicitly applied to the pages or endpoints. The following example adds a fixed window limiter policy named `"fixed"` which you add to an endpoint later:

  ```csharp
  var builder = WebApplication.CreateBuilder(args);
  
  builder.Services.AddRateLimiter(options =>
  {
      options.AddFixedWindowLimiter("fixed", opt =>
      {
          opt.PermitLimit = 4;
          opt.Window = TimeSpan.FromSeconds(12);
          opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
          opt.QueueLimit = 2;
      });
  });
  
  var app = builder.Build();
  ```

  The global limiter applies to all endpoints automatically when you configure it via options.GlobalLimiter.

2. Enable rate limiting middleware

   In the `Program.cs` file, enable the rate limiting middleware by calling UseRateLimiter:

  ```csharp
  app.UseRouting();
  
  app.UseRateLimiter();
  
  app.UseEndpoints(endpoints =>
  {
      endpoints.MapControllers();
  });
  
  app.Run();
  ```

### Apply rate limiting policies to endpoints or pages

#### Apply rate limiting to Web API endpoints

Apply a named policy to the endpoint or group, for example:

```csharp

app.MapGet("/api/resource", () => "This endpoint is rate limited")
   .RequireRateLimiting("fixed"); // Apply specific policy to an endpoint

```

#### Apply rate limiting to MVC controllers

 Apply the configured rate limiting policies to specific endpoints or globally. For example, to apply the "fixed" policy to all controller endpoints:

```csharp
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers().RequireRateLimiting("fixed");
});

```

#### Apply rate limiting to server-side Blazor apps

To set rate limiting for all of the app's routable Razor components, specify `Microsoft.AspNetCore.Builder.RateLimiterEndpointConventionBuilderExtensions.RequireRateLimiting*` with the rate limiting policy name on the `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*` call in the `Program` file. In the following example, the rate limiting policy named "`policy`" is applied:

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .RequireRateLimiting("policy");
```

To set a policy for a single routable Razor component or a folder of components via an imports file (`_Imports.razor`), apply the `[EnableRateLimiting]` attribute with the policy name. In the following example, the rate limiting policy named "`override`" is applied. The policy replaces any policies currently applied to the endpoint. The global limiter still runs on the endpoint with this attribute applied.

```razor
@page "/counter"
@using Microsoft.AspNetCore.RateLimiting
@attribute [EnableRateLimiting("override")]

<h1>Counter</h1>
```

Apply the `[EnableRateLimiting]` attribute only to a routable component or a folder of components via an imports file if `Microsoft.AspNetCore.Builder.RateLimiterEndpointConventionBuilderExtensions.RequireRateLimiting*` is ***not*** called on `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*`.

Use the `[DisableRateLimiting]` attribute to disable rate limiting for a routable component or a folder of components via an imports file.
