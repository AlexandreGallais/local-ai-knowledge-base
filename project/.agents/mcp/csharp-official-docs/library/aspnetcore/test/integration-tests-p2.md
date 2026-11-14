---
title: "Integration tests in ASP.NET Core (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/test/integration-tests.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Integration tests in ASP.NET Core (part 2 of 5)

## Customize WebApplicationFactory

Web host configuration can be created independently of the test classes by inheriting from `Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory`1` to create one or more custom factories:

1. Inherit from `WebApplicationFactory` and override `Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory`1.ConfigureWebHost*`. The `Microsoft.AspNetCore.Hosting.IWebHostBuilder` allows the configuration of the service collection with `IWebHostBuilder.ConfigureServices`

**xunit:**

```csharp
public class CustomWebApplicationFactory<TProgram>
    : WebApplicationFactory<TProgram> where TProgram : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType == 
                    typeof(IDbContextOptionsConfiguration<ApplicationDbContext>));

            services.Remove(dbContextDescriptor);

            var dbConnectionDescriptor = services.SingleOrDefault(
                d => d.ServiceType ==
                    typeof(DbConnection));

            services.Remove(dbConnectionDescriptor);

            // Create open SqliteConnection so EF won't automatically close it.
            services.AddSingleton<DbConnection>(container =>
            {
                var connection = new SqliteConnection("DataSource=:memory:");
                connection.Open();

                return connection;
            });

            services.AddDbContext<ApplicationDbContext>((container, options) =>
            {
                var connection = container.GetRequiredService<DbConnection>();
                options.UseSqlite(connection);
            });
        });

        builder.UseEnvironment("Development");
    }
}
```

**mstest:**

```csharp
public class CustomWebApplicationFactory<TProgram>
    : WebApplicationFactory<TProgram> where TProgram : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType ==
                    typeof(IDbContextOptionsConfiguration<ApplicationDbContext>));

            services.Remove(dbContextDescriptor);

            var dbConnectionDescriptor = services.SingleOrDefault(
                d => d.ServiceType ==
                    typeof(DbConnection));

            services.Remove(dbConnectionDescriptor);

            // Create open SqliteConnection so EF won't automatically close it.
            services.AddSingleton<DbConnection>(container =>
            {
                var connection = new SqliteConnection("DataSource=:memory:");
                connection.Open();

                return connection;
            });

            services.AddDbContext<ApplicationDbContext>((container, options) =>
            {
                var connection = container.GetRequiredService<DbConnection>();
                options.UseSqlite(connection);
            });
        });

        builder.UseEnvironment("Development");
    }
}
```

**nunit:**

```csharp
public class CustomWebApplicationFactory<TProgram>
    : WebApplicationFactory<TProgram> where TProgram : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType ==
                    typeof(IDbContextOptionsConfiguration<ApplicationDbContext>));

            services.Remove(dbContextDescriptor);

            var dbConnectionDescriptor = services.SingleOrDefault(
                d => d.ServiceType ==
                    typeof(DbConnection));

            services.Remove(dbConnectionDescriptor);

            // Create open SqliteConnection so EF won't automatically close it.
            services.AddSingleton<DbConnection>(container =>
            {
                var connection = new SqliteConnection("DataSource=:memory:");
                connection.Open();

                return connection;
            });

            services.AddDbContext<ApplicationDbContext>((container, options) =>
            {
                var connection = container.GetRequiredService<DbConnection>();
                options.UseSqlite(connection);
            });
        });

        builder.UseEnvironment("Development");
    }
}
```

   Database seeding in the sample app is performed by the `InitializeDbForTests` method. The method is described in the Integration tests sample: Test app organization section.

   The SUT's database context is registered in `Program.cs`. The test app's `builder.ConfigureServices` callback is executed *after* the app's `Program.cs` code is executed. To use a different database for the tests than the app's database, the app's database context must be replaced in `builder.ConfigureServices`.

   The sample app finds the service descriptor for the database context and uses the descriptor to remove the service registration. The factory then adds a new `ApplicationDbContext` that uses an in-memory database for the tests..

   To connect to a different database, change the `DbConnection`. To use a SQL Server test database:

   * Reference the `Microsoft.EntityFrameworkCore.SqlServer` NuGet package in the project file.
   * Call `UseInMemoryDatabase`.

2. Use the custom `CustomWebApplicationFactory` in test classes. The following example uses the factory in the `IndexPageTests` class:

**xunit:**

```csharp
public class IndexPageTests :
    IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly CustomWebApplicationFactory<Program>
        _factory;

    public IndexPageTests(
        CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
    }
```

**mstest:**

```csharp
[TestClass]
public class IndexPageTests
{
    private static HttpClient _client;
    private static CustomWebApplicationFactory<Program>
        _factory;

    [ClassInitialize]
    public static void AssemblyInitialize(TestContext _)
    {
        _factory = new CustomWebApplicationFactory<Program>();
        _client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
    }

    [ClassCleanup(ClassCleanupBehavior.EndOfClass)]
    public static void AssemblyCleanup(TestContext _)
    {
        _factory.Dispose();
    }
```

**nunit:**

```csharp
public class IndexPageTests
{

    private HttpClient _client;
    private CustomWebApplicationFactory<Program>
        _factory;

    [SetUp]
    public void SetUp()
    {
        _factory = new CustomWebApplicationFactory<Program>();
        _client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
    }

    [TearDown]
    public void TearDown()
    {
        _factory.Dispose();
        _client.Dispose();
    }
```

   The sample app's client is configured to prevent the `HttpClient` from following redirects. As explained later in the Mock authentication section, this permits tests to check the result of the app's first response. The first response is a redirect in many of these tests with a `Location` header.

3. A typical test uses the `HttpClient` and helper methods to process the request and the response:

**xunit:**

```csharp
[Fact]
public async Task Post_DeleteAllMessagesHandler_ReturnsRedirectToRoot()
{
    // Arrange
    var defaultPage = await _client.GetAsync("/");
    var content = await HtmlHelpers.GetDocumentAsync(defaultPage);

    //Act
    var response = await _client.SendAsync(
        (IHtmlFormElement)content.QuerySelector("form[id='messages']"),
        (IHtmlButtonElement)content.QuerySelector("button[id='deleteAllBtn']"));

    // Assert
    Assert.Equal(HttpStatusCode.OK, defaultPage.StatusCode);
    Assert.Equal(HttpStatusCode.Redirect, response.StatusCode);
    Assert.Equal("/", response.Headers.Location.OriginalString);
}
```

**mstest:**

```csharp
[TestMethod]
public async Task Post_DeleteAllMessagesHandler_ReturnsRedirectToRoot()
{
    // Arrange
    var defaultPage = await _client.GetAsync("/");
    var content = await HtmlHelpers.GetDocumentAsync(defaultPage);

    //Act
    var response = await _client.SendAsync(
        (IHtmlFormElement)content.QuerySelector("form[id='messages']"),
        (IHtmlButtonElement)content.QuerySelector("button[id='deleteAllBtn']"));

    // Assert
    Assert.AreEqual(HttpStatusCode.OK, defaultPage.StatusCode);
    Assert.AreEqual(HttpStatusCode.Redirect, response.StatusCode);
    Assert.AreEqual("/", response.Headers.Location.OriginalString);
}
```

**nunit:**

```csharp
[Test]
public async Task Post_DeleteAllMessagesHandler_ReturnsRedirectToRoot()
{
    // Arrange
    var defaultPage = await _client.GetAsync("/");
    var content = await HtmlHelpers.GetDocumentAsync(defaultPage);

    //Act
    var response = await _client.SendAsync(
        (IHtmlFormElement)content.QuerySelector("form[id='messages']"),
        (IHtmlButtonElement)content.QuerySelector("button[id='deleteAllBtn']"));

    // Assert
    Assert.That(defaultPage.StatusCode, Is.EqualTo(HttpStatusCode.OK));
    Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Redirect));
    Assert.That(response.Headers.Location.OriginalString, Is.EqualTo("/"));
}
```

Any POST request to the SUT must satisfy the antiforgery check that's automatically made by the app's data protection antiforgery system. In order to arrange for a test's POST request, the test app must:

1. Make a request for the page.
1. Parse the antiforgery cookie and request validation token from the response.
1. Make the POST request with the antiforgery cookie and request validation token in place.

The `SendAsync` helper extension methods (`Helpers/HttpClientExtensions.cs`) and the `GetDocumentAsync` helper method (`Helpers/HtmlHelpers.cs`) in the sample app use the AngleSharp parser to handle the antiforgery check with the following methods:

* `GetDocumentAsync`: Receives the `System.Net.Http.HttpResponseMessage` and returns an `IHtmlDocument`. `GetDocumentAsync` uses a factory that prepares a *virtual response* based on the original `HttpResponseMessage`. For more information, see the AngleSharp documentation.
* `SendAsync` extension methods for the `HttpClient` compose an `System.Net.Http.HttpRequestMessage` and call `System.Net.Http.HttpClient.SendAsync(System.Net.Http.HttpRequestMessage)` to submit requests to the SUT. Overloads for `SendAsync` accept the HTML form (`IHtmlFormElement`) and the following:
  * Submit button of the form (`IHtmlElement`)
  * Form values collection (`IEnumerable<KeyValuePair<string, string>>`)
  * Submit button (`IHtmlElement`) and form values (`IEnumerable<KeyValuePair<string, string>>`)

AngleSharp is a **third-party parsing library used for demonstration purposes** in this article and the sample app. AngleSharp isn'<example-value>'s request verification token and antiforgery cookie directly. See AngleSharp vs `Application Parts` for antiforgery checks in this article for more information.

The EF-Core in-memory database provider can be used for limited and basic <example-value>, however the ***SQLite provider is the recommended choice for in-memory testing***.

When a test requires a custom middleware, you can use an `Microsoft.AspNetCore.Hosting.IStartupFilter`. For more information, see App startup in ASP.NET Core.

When a test requires a custom service, see the Inject mock services section.

## Customize the `WebApplicationFactory` with test configurations

There are various ways to supply test-specific configurations to the running web application via `WebApplicationFactory`.

1. Using `ConfigureHostConfiguration`: override the `CreateHost` method and call `builder.ConfigureHostConfiguration` as follows:

    ```csharp
    private static readonly KeyValuePair<string, string?>[] s_inMemorySettings = new KeyValuePair<string, string?>[]
    {
        new("TestConfigKey", "TestConfigValue"),
    };

    protected override IHost CreateHost(IHostBuilder builder)
    {
        builder.ConfigureHostConfiguration(builder =>
        {
            builder.AddInMemoryCollection(s_inMemorySettings);
        });
        return base.CreateHost(builder);
    }
    ```

    Using this approach, the configuration source added via `ConfigureHostConfiguration` will be enumerated before the entry point is called, and the configurations will be passed to the entry point via `args`. The actual configuration source isn't preserved.

    > **Important:**
    > Make sure you pass `args` to `WebApplication.CreateBuilder` call. Otherwise, the configurations will not take effect.

2. Using `ConfigureAppConfiguration`: override the `ConfigureWebHost` method and call `builder.ConfigureAppConfiguration` as follows:

    ```csharp
    private static readonly KeyValuePair<string, string?>[] s_inMemorySettings = new KeyValuePair<string, string?>[]
    {
        new("TestConfigKey", "TestConfigValue"),
    };

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        base.ConfigureWebHost(builder);
        builder.ConfigureAppConfiguration(builder =>
        {
            builder.AddInMemoryCollection(s_inMemorySettings);
        });
    }
    ```

    Using this approach, the configuration source added via `ConfigureAppConfiguration` is preserved, but it's only available after the web application is built. If you try to access the configuration before `WebApplicationBuilder.Build` is called, the configurations will not be available.

3. Starting in .NET 11 Preview 7, you can override a new `ConfigureWebApplicationBuilder` method as follows:

    ```csharp
    private static readonly KeyValuePair<string, string?>[] s_inMemorySettings = new KeyValuePair<string, string?>[]
    {
        new("TestConfigKey", "TestConfigValue"),
    };

    protected override void ConfigureWebApplicationBuilder(IHostApplicationBuilder hostApplicationBuilder)
    {
        hostApplicationBuilder.Configuration.AddInMemoryCollection(s_inMemorySettings);
        base.ConfigureWebApplicationBuilder(hostApplicationBuilder);
    }
    ```

    Using this approach, the configuration source added via `ConfigureWebApplicationBuilder` is preserved, and is also available immediately after `WebApplication.CreateBuilder` returns.
