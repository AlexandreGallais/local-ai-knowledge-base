---
id: dotnet-testing-integration-tests
title: .NET integration tests
topic: dotnet-testing
summary: Test an ASP.NET Core API, a database, the clock, HttpClient and SignalR without network, with WebApplicationFactory and FakeTimeProvider.
tool: dotnet
version: "11"
checked: 2026-11-13
sources: [S26, S27, S28, S29, S32]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# .NET integration tests

Contents: 1. An API · 2. A database · 3. The clock · 4. HttpClient and SignalR · Sources

## 1. An API (WebApplicationFactory)

- Package `Microsoft.AspNetCore.Mvc.Testing`; test project in `Sdk="Microsoft.NET.Sdk.Web"`. [S26]
- `WebApplicationFactory<Program>` as a class fixture; `CreateClient()` gives an `HttpClient` on the in-memory server.
- Replace a service for one test: `WithWebHostBuilder`, then `ConfigureTestServices`.
- The default environment is `Development`.

```csharp
public sealed class ValvesApiTests(WebApplicationFactory<Program> factory) : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    public async Task Get_returns_the_valve()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/valves/V-101", TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
```

## 2. A database (EF Core in tests)

| Option | Use it |
| --- | --- |
| The real database engine, in a container | First choice |
| A repository interface with a fake | When a double is needed |
| SQLite in memory, connection kept open | When neither is possible |
| EF Core in-memory provider | Never: fewer queries, no transactions, no raw SQL |
| A mocked `DbSet` | Never |

[S27]

- SQLite in memory: open one `SqliteConnection("DataSource=:memory:")`, keep it open for the test, and register the context with `UseSqlite(connection)`. In `WebApplicationFactory`, remove the existing context options first. [S26]
- A container (Testcontainers) needs a container engine and the database image already on the workstation: ask before you add it. [S29]

## 3. The clock (FakeTimeProvider)

- Package `Microsoft.Extensions.TimeProvider.Testing`, namespace `Microsoft.Extensions.Time.Testing`. [S28]
- `new FakeTimeProvider()` starts at 2000-01-01 UTC; `Advance(TimeSpan)` moves time without waiting; `SetUtcNow` never goes back.
- `Task.Delay(delay, timeProvider)` ends only after an `Advance` that covers the delay.
- In dependency injection: `services.AddSingleton<TimeProvider>(fakeTime)`. Never mix `TimeProvider.System` and the fake in one test.

```csharp
var time = new FakeTimeProvider(new DateTimeOffset(2026, 1, 1, 0, 0, 0, TimeSpan.Zero));
var valve = new MotorValve(time, travelTime: TimeSpan.FromSeconds(10));

valve.Open();
time.Advance(TimeSpan.FromSeconds(10));

Assert.True(valve.IsOpen);
```

## 4. HttpClient and SignalR

- `HttpClient`: give it a handler written for the test, with no package.

```csharp
sealed class StubHandler(HttpStatusCode status, string body) : HttpMessageHandler
{
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken) =>
        Task.FromResult(new HttpResponseMessage(status) { Content = new StringContent(body) });
}

var client = new HttpClient(new StubHandler(HttpStatusCode.OK, "{\"isOpen\":true}")) { BaseAddress = new Uri("http://test") };
```

- SignalR: connect a `HubConnection` to the in-memory server with `options.HttpMessageHandlerFactory = _ => server.CreateHandler()`; for WebSockets, also `options.WebSocketFactory` with `server.CreateWebSocketClient()`. [S32]

## Sources

- [S26] Microsoft, "Integration tests in ASP.NET Core", Microsoft Learn, 2026-10-23, <https://learn.microsoft.com/aspnet/core/test/integration-tests>, read 2026-11-13, CC BY 4.0, summarized.
- [S27] Microsoft, "Choosing a testing strategy", EF Core docs, updated 2023-01-30, <https://learn.microsoft.com/ef/core/testing/choosing-a-testing-strategy>, read 2026-11-13, CC BY 4.0, summarized.
- [S28] Microsoft, "Testing with FakeTimeProvider", Microsoft Learn, updated 2026-03-02, <https://learn.microsoft.com/dotnet/core/extensions/timeprovider-testing>, read 2026-11-13, CC BY 4.0, summarized.
- [S29] Testcontainers, "Testcontainers for .NET", <https://dotnet.testcontainers.org/>, read 2026-11-13, summarized.
- [S32] dotnet/aspnetcore, SignalR functional tests of the repository, <https://github.com/dotnet/aspnetcore>, read 2026-11-13, MIT, summarized.
