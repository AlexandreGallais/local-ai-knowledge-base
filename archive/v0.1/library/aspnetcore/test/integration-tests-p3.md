---
title: "Integration tests in ASP.NET Core (part 3 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/test/integration-tests.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Integration tests in ASP.NET Core (part 3 of 5)

## Customize the client with WithWebHostBuilder

When additional configuration is required within a test method, `Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory`1.WithWebHostBuilder*` creates a new `WebApplicationFactory` with an `Microsoft.AspNetCore.Hosting.IWebHostBuilder` that is further customized by configuration.

The sample code calls `WithWebHostBuilder` to replace configured services with test stubs. For more information and example usage, see Inject mock services in this article.

The `Post_DeleteMessageHandler_ReturnsRedirectToRoot` test method of the sample app demonstrates the use of `WithWebHostBuilder`. This test performs a record delete in the database by triggering a form submission in the SUT.

Because another test in the `IndexPageTests` class performs an operation that deletes all of the records in the database and may run before the `Post_DeleteMessageHandler_ReturnsRedirectToRoot` method, the database is reseeded in this test method to ensure that a record is present for the SUT to delete. Selecting the first delete button of the `messages` form in the SUT is simulated in the request to the SUT:

**xunit:**

```csharp
[Fact]
public async Task Post_DeleteMessageHandler_ReturnsRedirectToRoot()
{
    // Arrange
    using (var scope = _factory.Services.CreateScope())
    {
        var scopedServices = scope.ServiceProvider;
        var db = scopedServices.GetRequiredService<ApplicationDbContext>();

        Utilities.ReinitializeDbForTests(db);
    }

    var defaultPage = await _client.GetAsync("/");
    var content = await HtmlHelpers.GetDocumentAsync(defaultPage);

    //Act
    var response = await _client.SendAsync(
        (IHtmlFormElement)content.QuerySelector("form[id='messages']"),
        (IHtmlButtonElement)content.QuerySelector("form[id='messages']")
            .QuerySelector("div[class='panel-body']")
            .QuerySelector("button"));

    // Assert
    Assert.Equal(HttpStatusCode.OK, defaultPage.StatusCode);
    Assert.Equal(HttpStatusCode.Redirect, response.StatusCode);
    Assert.Equal("/", response.Headers.Location.OriginalString);
}
```

**mstest:**

```csharp
[TestMethod]
public async Task Post_DeleteMessageHandler_ReturnsRedirectToRoot()
{
    // Arrange
    using (var scope = _factory.Services.CreateScope())
    {
        var scopedServices = scope.ServiceProvider;
        var db = scopedServices.GetRequiredService<ApplicationDbContext>();

        Utilities.ReinitializeDbForTests(db);
    }

    var defaultPage = await _client.GetAsync("/");
    var content = await HtmlHelpers.GetDocumentAsync(defaultPage);

    //Act
    var response = await _client.SendAsync(
        (IHtmlFormElement)content.QuerySelector("form[id='messages']"),
        (IHtmlButtonElement)content.QuerySelector("form[id='messages']")
            .QuerySelector("div[class='panel-body']")
            .QuerySelector("button"));

    // Assert
    Assert.AreEqual(HttpStatusCode.OK, defaultPage.StatusCode);
    Assert.AreEqual(HttpStatusCode.Redirect, response.StatusCode);
    Assert.AreEqual("/", response.Headers.Location.OriginalString);
}
```

**nunit:**

```csharp
[Test]
public async Task Post_DeleteMessageHandler_ReturnsRedirectToRoot()
{
    // Arrange
    using (var scope = _factory.Services.CreateScope())
    {
        var scopedServices = scope.ServiceProvider;
        var db = scopedServices.GetRequiredService<ApplicationDbContext>();

        Utilities.ReinitializeDbForTests(db);
    }

    var defaultPage = await _client.GetAsync("/");
    var content = await HtmlHelpers.GetDocumentAsync(defaultPage);

    //Act
    var response = await _client.SendAsync(
        (IHtmlFormElement)content.QuerySelector("form[id='messages']"),
        (IHtmlButtonElement)content.QuerySelector("form[id='messages']")
            .QuerySelector("div[class='panel-body']")
            .QuerySelector("button"));

    // Assert
    Assert.That(defaultPage.StatusCode, Is.EqualTo(HttpStatusCode.OK));
    Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Redirect));
    Assert.That(response.Headers.Location.OriginalString, Is.EqualTo("/"));
}
```

## Client options

See the `Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactoryClientOptions` page for defaults and available options when creating `HttpClient` instances.

Create the `WebApplicationFactoryClientOptions` class and pass it to the `Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory`1.CreateClient` method:

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

**_NOTE:_** To avoid HTTPS redirection warnings in logs when using HTTPS redirection middleware, set `BaseAddress = new Uri("https://localhost")`

## Inject mock services

Services can be overridden in a test with a call to `Microsoft.AspNetCore.TestHost.WebHostBuilderExtensions.ConfigureTestServices*` on the host builder. To scope the overridden services to the test itself, the `Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory`1.WithWebHostBuilder*` method is used to retrieve a host builder. This can be seen in the following tests:

* Get_QuoteService_ProvidesQuoteInPage
* Get_GithubProfilePageCanGetAGithubUser
* Get_SecurePageIsReturnedForAnAuthenticatedUser

The sample SUT includes a scoped service that returns a quote. The quote is embedded in a hidden field on the Index page when the Index page is requested.

`Services/IQuoteService.cs`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/test/integration-tests/10.x/IntegrationTestsSample/src/RazorPagesProject/Services/IQuoteService.cs._

`Services/QuoteService.cs`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/test/integration-tests/10.x/IntegrationTestsSample/src/RazorPagesProject/Services/QuoteService.cs._

`Program.cs`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/test/integration-tests/10.x/IntegrationTestsSample/src/RazorPagesProject/Program.cs._

`Pages/Index.cshtml.cs`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/test/integration-tests/10.x/IntegrationTestsSample/src/RazorPagesProject/Pages/Index.cshtml.cs._

`Pages/Index.cs`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/test/integration-tests/10.x/IntegrationTestsSample/src/RazorPagesProject/Pages/Index.cshtml._

The following markup is generated when the SUT app is run:

```html
<input id="quote" type="hidden" value="Come on, Sarah. We&#x27;ve an appointment in
    London, and we&#x27;re already 30,000 years late.">
```

To test the service and quote injection in an integration test, a mock service is injected into the SUT by the test. The mock service replaces the app's `QuoteService` with a service provided by the test app, called `TestQuoteService`:

`IntegrationTests.IndexPageTests.cs`:

**xunit:**

```csharp
// Quote ©1975 BBC: The Doctor (Tom Baker); Pyramids of Mars
// https://www.bbc.co.uk/programmes/p00pys55
public class TestQuoteService : IQuoteService
{
    public Task<string> GenerateQuote()
    {
        return Task.FromResult(
            "Something's interfering with time, Mr. Scarman, " +
            "and time is my business.");
    }
}
```

**mstest:**

```csharp
// Quote ©1975 BBC: The Doctor (Tom Baker); Pyramids of Mars
// https://www.bbc.co.uk/programmes/p00pys55
public class TestQuoteService : IQuoteService
{
    public Task<string> GenerateQuote()
    {
        return Task.FromResult(
            "Something's interfering with time, Mr. Scarman, " +
            "and time is my business.");
    }
}
```

**nunit:**

```csharp
// Quote ©1975 BBC: The Doctor (Tom Baker); Pyramids of Mars
// https://www.bbc.co.uk/programmes/p00pys55
public class TestQuoteService : IQuoteService
{
    public Task<string> GenerateQuote()
    {
        return Task.FromResult(
            "Something's interfering with time, Mr. Scarman, " +
            "and time is my business.");
    }
}
```

`ConfigureTestServices` is called, and the scoped service is registered:

**xunit:**

```csharp
[Fact]
public async Task Get_QuoteService_ProvidesQuoteInPage()
{
    // Arrange
    var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                services.AddScoped<IQuoteService, TestQuoteService>();
            });
        })
        .CreateClient();

    //Act
    var defaultPage = await client.GetAsync("/");
    var content = await HtmlHelpers.GetDocumentAsync(defaultPage);
    var quoteElement = content.QuerySelector("#quote");

    // Assert
    Assert.Equal("Something's interfering with time, Mr. Scarman, " +
        "and time is my business.", quoteElement.Attributes["value"].Value);
}
```

**mstest:**

```csharp
[TestMethod]
public async Task Get_QuoteService_ProvidesQuoteInPage()
{
    // Arrange
    var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                services.AddScoped<IQuoteService, TestQuoteService>();
            });
        })
        .CreateClient();

    //Act
    var defaultPage = await client.GetAsync("/");
    var content = await HtmlHelpers.GetDocumentAsync(defaultPage);
    var quoteElement = content.QuerySelector("#quote");

    // Assert
    Assert.AreEqual("Something's interfering with time, Mr. Scarman, " +
        "and time is my business.", quoteElement.Attributes["value"].Value);
}
```

**nunit:**

```csharp
[Test]
public async Task Get_QuoteService_ProvidesQuoteInPage()
{
    // Arrange
    var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                services.AddScoped<IQuoteService, TestQuoteService>();
            });
        })
        .CreateClient();

    //Act
    var defaultPage = await client.GetAsync("/");
    var content = await HtmlHelpers.GetDocumentAsync(defaultPage);
    var quoteElement = content.QuerySelector("#quote");

    // Assert
    Assert.That(quoteElement.Attributes["value"].Value, Is.EqualTo(
        "Something's interfering with time, Mr. Scarman, " +
        "and time is my business."));
}
```

The markup produced during the test's execution reflects the quote text supplied by `TestQuoteService`, thus the assertion passes:

```html
<input id="quote" type="hidden" value="Something&#x27;s interfering with time,
    Mr. Scarman, and time is my business.">
```
