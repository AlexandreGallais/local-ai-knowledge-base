---
title: "Test gRPC services in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/grpc/test-services.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Test gRPC services in ASP.NET Core

By: James Newton-King

Testing is an important aspect of building stable and maintainable software. This article discusses how to test ASP.NET Core gRPC services.

There are three common approaches for testing gRPC services:

* **Unit testing**: Test gRPC services directly from a unit testing library.
* **Integration testing**: The gRPC app is hosted in `Microsoft.AspNetCore.TestHost.TestServer`, an in-memory test server from the `Microsoft.AspNetCore.TestHost` package. gRPC services are tested by calling them using a gRPC client from a unit testing library.
* **Manual testing**: Test gRPC servers with ad hoc calls. For information about how to use command-line and UI tooling with gRPC services, see Test gRPC services with gRPCurl and gRPCui in ASP.NET Core.

In unit testing, only the gRPC service is involved. Dependencies injected into the service must be mocked. In integration testing, the gRPC service and its auxiliary infrastructure are part of the test. This includes app startup, dependency injection, routing and authentication, and authorization.

## Example testable service

To demonstrate service tests, review the following service in the sample app.

View or download sample code (how to download)

The `TesterService` returns greetings using gRPC's four method types.

```csharp
public class TesterService : Tester.TesterBase
{
    private readonly IGreeter _greeter;

    public TesterService(IGreeter greeter)
    {
        _greeter = greeter;
    }

    public override Task<HelloReply> SayHelloUnary(HelloRequest request,
        ServerCallContext context)
    {
        var message = _greeter.Greet(request.Name);
        return Task.FromResult(new HelloReply { Message = message });
    }

    public override async Task SayHelloServerStreaming(HelloRequest request,
        IServerStreamWriter<HelloReply> responseStream, ServerCallContext context)
    {
        var i = 0;
        while (!context.CancellationToken.IsCancellationRequested)
        {
            var message = _greeter.Greet($"{request.Name} {++i}");
            await responseStream.WriteAsync(new HelloReply { Message = message });

            await Task.Delay(1000);
        }
    }

    public override async Task<HelloReply> SayHelloClientStreaming(
        IAsyncStreamReader<HelloRequest> requestStream, ServerCallContext context)
    {
        var names = new List<string>();

        await foreach (var request in requestStream.ReadAllAsync())
        {
            names.Add(request.Name);
        }

        var message = _greeter.Greet(string.Join(", ", names));
        return new HelloReply { Message = message };
    }

    public override async Task SayHelloBidirectionalStreaming(
        IAsyncStreamReader<HelloRequest> requestStream,
        IServerStreamWriter<HelloReply> responseStream,
        ServerCallContext context)
    {
        await foreach (var request in requestStream.ReadAllAsync())
        {
            await responseStream.WriteAsync(
                new HelloReply { Message = _greeter.Greet(request.Name) });
        }
    }
}
```

The preceding gRPC service:

* Follows the Explicit Dependencies Principle.
* Expects dependency injection (DI) to provide an instance of `IGreeter`.
* Can be tested with a mocked `IGreeter` service using a mock object framework, such as Moq. A *mocked object* is a fabricated object with a predetermined set of property and method behaviors used for testing. For more information, see Integration tests in ASP.NET Core.

## Unit test gRPC services

A unit test library can directly test gRPC services by calling its methods. Unit tests test a gRPC service in isolation.

```csharp
[Fact]
public async Task SayHelloUnaryTest()
{
    // Arrange
    var mockGreeter = new Mock<IGreeter>();
    mockGreeter.Setup(
        m => m.Greet(It.IsAny<string>())).Returns((string s) => $"Hello {s}");
    var service = new TesterService(mockGreeter.Object);

    // Act
    var response = await service.SayHelloUnary(
        new HelloRequest { Name = "Joe" }, TestServerCallContext.Create());

    // Assert
    mockGreeter.Verify(v => v.Greet("Joe"));
    Assert.Equal("Hello Joe", response.Message);
}
```

The preceding unit test:

* Mocks `IGreeter` using Moq.
* Executes the `SayHelloUnary` method with a request message and a `ServerCallContext`. All service methods have a `ServerCallContext` argument. In this test, the type is provided using the `TestServerCallContext.Create()` helper method. This helper method is included in the sample code.
* Makes assertions:
  * Verifies the request name is passed to `IGreeter`.
  * The service returns the expected reply message.

### Unit test `HttpContext` in gRPC methods

gRPC methods can access a request's `Microsoft.AspNetCore.Http.HttpContext` using the `ServerCallContext.GetHttpContext` extension method. To unit test a method that uses `HttpContext`, the context must be configured in test setup. If `Microsoft.AspNetCore.Http.HttpContext` isn't configured then `GetHttpContext` returns `null`.

To configure a `HttpContext` during test setup, create a new instance and add it to `ServerCallContext.UserState` collection using the `__HttpContext` key.

```csharp
var httpContext = new DefaultHttpContext();

var serverCallContext = TestServerCallContext.Create();
serverCallContext.UserState["__HttpContext"] = httpContext;
```

Execute service methods with this call context to use the configured `HttpContext` instance.

## Integration test gRPC services

Integration tests evaluate an app's components on a broader level than unit tests. The gRPC app is hosted in `Microsoft.AspNetCore.TestHost.TestServer`, an in-memory test server from the `Microsoft.AspNetCore.TestHost` package.

A unit test library starts the gRPC app and then gRPC services are tested using the gRPC client.

The sample code contains infrastructure to make integration testing possible:

  * The `GrpcTestFixture<TStartup>` class configures the ASP.NET Core host and starts the gRPC app in an in-memory test server.
  * The `IntegrationTestBase` class is the base type that integration tests inherit from. It contains the fixture state and APIs for creating a gRPC client to call the gRPC app.

```csharp
[Fact]
public async Task SayHelloUnaryTest()
{
    // Arrange
    var client = new Tester.TesterClient(Channel);

    // Act
    var response = await client.SayHelloUnaryAsync(new HelloRequest { Name = "Joe" });

    // Assert
    Assert.Equal("Hello Joe", response.Message);
}
```

The preceding integration test:

* Creates a gRPC client using the channel provided by `IntegrationTestBase`. This type is included in the sample code.
* Calls the `SayHelloUnary` method using the gRPC client.
* Asserts the service returns the expected reply message.

### Inject mock dependencies

Use `ConfigureWebHost` on the fixture to override dependencies. Overriding dependencies is useful when an external dependency is unavailable in the test environment. For example, an app that uses an external payment gateway shouldn't call the external dependency when executing tests. Instead, use a mock gateway for the test.

```csharp
public MockedGreeterServiceTests(GrpcTestFixture<Startup> fixture,
    ITestOutputHelper outputHelper) : base(fixture, outputHelper)
{
    var mockGreeter = new Mock<IGreeter>();
    mockGreeter.Setup(
        m => m.Greet(It.IsAny<string>())).Returns((string s) =>
        {
            if (string.IsNullOrEmpty(s))
            {
                throw new ArgumentException("Name not provided.");
            }
            return $"Test {s}";
        });

    Fixture.ConfigureWebHost(builder =>
    {
        builder.ConfigureServices(
            services => services.AddSingleton(mockGreeter.Object));
    });
}

[Fact]
public async Task SayHelloUnaryTest_MockGreeter_Success()
{
    // Arrange
    var client = new Tester.TesterClient(Channel);

    // Act
    var response = await client.SayHelloUnaryAsync(
        new HelloRequest { Name = "Joe" });

    // Assert
    Assert.Equal("Test Joe", response.Message);
}
```

The preceding integration test:

* In the test class's (`MockedGreeterServiceTests`) constructor:
  * Mocks `IGreeter` using Moq.
  * Overrides the `IGreeter` registered with dependency injection using `ConfigureWebHost`.
* Calls the `SayHelloUnary` method using the gRPC client.
* Asserts the expected reply message based on the mock `IGreeter` instance.

## Related content

* Test gRPC services with gRPCurl and gRPCui in ASP.NET Core
* Mock gRPC client in tests
