---
title: "Reliable gRPC services with deadlines and cancellation"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/grpc/deadlines-cancellation.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Reliable gRPC services with deadlines and cancellation

-->
-->

By James Newton-King

Deadlines and cancellation are features used by gRPC clients to abort in-progress calls. This article discusses why deadlines and cancellation are important, and how to use them in .NET gRPC apps.

## Deadlines

A deadline allows a gRPC client to specify how long it will wait for a call to complete. When a deadline is exceeded, the call is canceled. Setting a deadline is important because it provides an upper limit on how long a call can run for. It stops misbehaving services from running forever and exhausting server resources. Deadlines are a useful tool for building reliable apps and should be configured.

Deadline configuration:

* A deadline is configured using `CallOptions.Deadline` when a call is made.
* There is no default deadline value. gRPC calls aren't time limited unless a deadline is specified.
* A deadline is the UTC time of when the deadline is exceeded. For example, `DateTime.UtcNow.AddSeconds(5)` is a deadline of 5 seconds from now.
* If a past or current time is used then the call immediately exceeds the deadline.
* The deadline is sent with the gRPC call to the service and is independently tracked by both the client and the service. It is possible that a gRPC call completes on one machine, but by the time the response has returned to the client the deadline has been exceeded.

If a deadline is exceeded, the client and service have different behavior:

* The client immediately aborts the underlying HTTP request and throws a `DeadlineExceeded` error. The client app can choose to catch the error and display a timeout message to the user.
* On the server, the executing HTTP request is aborted and ServerCallContext.CancellationToken is raised. Although the HTTP request is aborted, the gRPC call continues to run on the server until the method completes. It's important that the cancellation token is passed to async methods so they are cancelled along with the call. For example, passing a cancellation token to async database queries and HTTP requests. Passing a cancellation token <example-value> the canceled call to complete quickly on the server and free up resources for other calls.

Configure `CallOptions.Deadline` to set a deadline for a gRPC call:

```csharp
var client = new Greet.GreeterClient(channel);

try
{
    var response = await client.SayHelloAsync(
        new HelloRequest { Name = "World" },
        deadline: DateTime.UtcNow.AddSeconds(5));
    
    // Greeting: Hello World
    Console.WriteLine("Greeting: " + response.Message);
}
catch (RpcException ex) when (ex.StatusCode == StatusCode.DeadlineExceeded)
{
    Console.WriteLine("Greeting timeout.");
}
```

Using `ServerCallContext.CancellationToken` in a gRPC service:

```csharp
public override async Task<HelloReply> SayHello(HelloRequest request,
    ServerCallContext context)
{
    var user = await _databaseContext.GetUserAsync(request.Name,
        context.CancellationToken);

    return new HelloReply { Message = "Hello " + user.DisplayName };
}
```

### Deadlines and retries

When a gRPC call is configured with retry fault handling and a deadline, the deadline tracks time across all retries for a gRPC call. If the deadline is exceeded, a gRPC call immediately aborts the underlying HTTP request, skips any remaining retries, and throws a `DeadlineExceeded` error.

### Propagating deadlines

When a gRPC call is made from an executing gRPC service, the deadline should be propagated. For example:

1. Client app calls `FrontendService.GetUser` with a deadline.
2. `FrontendService` calls `UserService.GetUser`. The deadline specified by the client should be specified with the new gRPC call.
3. `UserService.GetUser` receives the deadline. It correctly times-out if the client app's deadline is exceeded.

The call context provides the deadline with `ServerCallContext.Deadline`:

```csharp
public override async Task<UserResponse> GetUser(UserRequest request,
    ServerCallContext context)
{
    var client = new User.UserServiceClient(_channel);
    var response = await client.GetUserAsync(
        new UserRequest { Id = request.Id },
        deadline: context.Deadline);

    return response;
}
```

Manually propagating deadlines can be cumbersome. The deadline needs to be passed to every call, and it's easy to accidentally miss. An automatic solution is available with gRPC client factory. Specifying `EnableCallContextPropagation`:

* Automatically propagates the deadline and cancellation token to child calls.
* Doesn't propagate the deadline if the child call specifies a smaller deadline. For example, a propagated deadline of 10 seconds isn't used if a child call specifies a new deadline of 5 seconds using `CallOptions.Deadline`. When multiple deadlines are available, the smallest deadline is used.
* Is an excellent way of ensuring that complex, nested gRPC scenarios always propagate the deadline and cancellation.

```csharp
services
    .AddGrpcClient<User.UserServiceClient>(o =>
    {
        o.Address = new Uri("https://localhost:5001");
    })
    .EnableCallContextPropagation();
```

For more information, see gRPC client factory integration in .NET.

## Cancellation

Cancellation allows a gRPC client to cancel long running calls that are no longer needed. For example, a gRPC call that streams realtime updates is started when the user visits a page on a website. The stream should be canceled when the user navigates away from the page.

A gRPC call can be canceled in the client by passing a cancellation token with CallOptions.CancellationToken or calling `Dispose` on the call.

```csharp
private AsyncServerStreamingCall<HelloReply> _call;

public void StartStream()
{
    _call = client.SayHellos(new HelloRequest { Name = "World" });

    // Read response in background task.
    _ = Task.Run(async () =>
    {
        await foreach (var response in _call.ResponseStream.ReadAllAsync())
        {
            Console.WriteLine("Greeting: " + response.Message);
        }
    });
}

public void StopStream()
{
    _call.Dispose();
}
```

gRPC services that can be cancelled should:
* Pass `ServerCallContext.CancellationToken` to async methods. Canceling async methods allows the call on the server to complete quickly.
* Propagate the cancellation token to child calls. Propagating the cancellation token <example-value> that child calls are canceled with their parent. gRPC client factory and `EnableCallContextPropagation()` automatically propagates the cancellation token.

## Related content

* Call gRPC services with the .NET client
* gRPC client factory integration in .NET
