---
title: "Integration tests in ASP.NET Core (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/test/integration-tests.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Integration tests in ASP.NET Core

By Jos van der Til, Martin Costello, and Javier Calvarro Nelson.

Integration tests ensure that an app's components function correctly at a level that includes the app's supporting infrastructure, such as the database, file system, and network. ASP.NET Core supports integration tests using a unit test framework with a test web host and an in-memory test server.

This article assumes a basic <example-value> of unit tests. If unfamiliar with test concepts, see the Testing in .NET article and its linked content.

View or download sample code (how to download)

> **Note:**
> The downloadable sample project is implemented using xUnit. If you choose **MSTest** or **NUnit** using the test framework selector above, the corresponding test patterns and syntax are demonstrated in the article's code examples.

The sample app is a Razor Pages app and assumes a basic <example-value> of Razor Pages. If you're unfamiliar with Razor Pages, see the following articles:

* Introduction to Razor Pages
* Get started with Razor Pages
* Razor Pages unit tests

**For testing SPAs**, we recommend a tool such as Playwright for .NET, which can automate a browser.

## Introduction to integration tests

Integration tests evaluate an app's components on a broader level than unit tests. Unit tests are used to test isolated software components, such as individual class methods. Integration tests confirm that two or more app components work together to produce an expected result, possibly including every component required to fully process a request.

These broader tests are used to test the app's infrastructure and whole framework, often including the following components:

* Database
* File system
* Network appliances
* Request-response pipeline

Unit tests use fabricated components, known as *fakes* or *mock objects*, in place of infrastructure components.

In contrast to unit tests, integration tests:

* Use the actual components that the app uses in production.
* Require more code and data processing.
* Take longer to run.

Therefore, limit the use of integration tests to the most important infrastructure scenarios. If a behavior can be tested using either a unit test or an integration test, choose the unit test.

In discussions of integration tests, the tested project is frequently called the ***System Under Test***, or "**SUT**" for short. "SUT" is used throughout this article to refer to the ASP.NET Core app being tested.

***Don't write integration tests for every permutation*** of data and file access with databases and file systems. Regardless of how many places across an app interact with databases and file systems, a focused set of read, write, update, and delete integration tests are usually capable of adequately testing database and file system components. Use unit tests for routine tests of method logic that interact with these components. In unit tests, the use of infrastructure fakes or mocks result in faster test execution.

## ASP.NET Core integration tests

Integration tests in ASP.NET Core require the following:

* A test project is used to contain and execute the tests. The test project has a reference to the SUT.
* The test project creates a test web host for the SUT and uses a test server client to handle requests and responses with the SUT.
* A test runner is used to execute the tests and report the test results.

Integration tests follow a sequence of events that include the usual *Arrange*, *Act*, and *Assert* test steps:

1. The SUT's web host is configured.
1. A test server client is created to submit requests to the app.
1. The *Arrange* test step is executed: The test app prepares a request.
1. The *Act* test step is executed: The client submits the request and receives the response.
1. The *Assert* test step is executed: The *actual* response is validated as a *pass* or *fail* based on an *expected* response.
1. The process continues until all of the tests are executed.
1. The test results are reported.

Usually, the test web host is configured differently than the app's normal web host for the test runs. For example, a different database or different app settings might be used for the tests.

Infrastructure components, such as the test web host and in-memory test server (`Microsoft.AspNetCore.TestHost.TestServer`), are provided or managed by the Microsoft.AspNetCore.Mvc.Testing package. Use of this package streamlines test creation and execution.

The `Microsoft.AspNetCore.Mvc.Testing` package handles the following tasks:

* Copies the dependencies file (`.deps`) from the SUT into the test project's `bin` directory.
* Sets the content root to the SUT's project root so that static files and pages/views are found when the tests are executed.
* Provides the WebApplicationFactory class to streamline bootstrapping the SUT with `TestServer`.

The unit tests documentation describes how to set up a test project and test runner, along with detailed instructions on how to run tests and recommendations for how to name tests and test classes.

**Separate unit tests from integration tests into different projects**. Separating the tests:

* Helps ensure that infrastructure testing components aren't accidentally included in the unit tests.
* Allows control over which set of tests are run.

There's virtually no difference between the configuration for tests of Razor Pages apps and MVC apps. The only difference is in how the tests are named. In a Razor Pages app, tests of page endpoints are usually named after the page model class (for example, `IndexPageTests` to test component integration for the Index page). In an MVC app, tests are usually organized by controller classes and named after the controllers they test (for example, `HomeControllerTests` to test component integration for the Home controller).

## Test app prerequisites

The test project must:

* Reference the `Microsoft.AspNetCore.Mvc.Testing` package.
* Specify the Web SDK in the project file (`<Project Sdk="Microsoft.NET.Sdk.Web">`).

These prerequisites can be seen in the sample app. Inspect the `tests/RazorPagesProject.Tests/RazorPagesProject.Tests.csproj` file. The sample app uses the xUnit test framework and the AngleSharp parser library, so the sample app also references:

* `AngleSharp`
* `xunit`
* `xunit.runner.visualstudio`

In apps that use `xunit.runner.visualstudio` version 2.4.2 or later, the test project must reference the `Microsoft.NET.Test.Sdk` package.

Entity Framework Core is also used in the tests. See the project file in GitHub.

## SUT environment

If the SUT's environment isn't set, the environment defaults to `Development`.

## Basic tests with the default WebApplicationFactory

`Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory`1` is used to create a `Microsoft.AspNetCore.TestHost.TestServer` for the integration tests. `TEntryPoint` is the entry point class of the SUT, usually `Program.cs`.

Test classes implement a *class fixture* interface (`IClassFixture`) to indicate the class contains tests and provide shared object instances across the tests in the class.

The following test class, `BasicTests`, uses the `WebApplicationFactory` to bootstrap the SUT and provide an `System.Net.Http.HttpClient` to a test method, `Get_EndpointsReturnSuccessAndCorrectContentType`. The method verifies the response status code is successful (200-299) and the `Content-Type` header is `text/html; charset=utf-8` for several app pages.

`Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory`1.CreateClient` creates an instance of `HttpClient` that automatically follows redirects and handles cookies.

**xunit:**

```csharp
public class BasicTests 
    : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public BasicTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Theory]
    [InlineData("/")]
    [InlineData("/Index")]
    [InlineData("/About")]
    [InlineData("/Privacy")]
    [InlineData("/Contact")]
    public async Task Get_EndpointsReturnSuccessAndCorrectContentType(string url)
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync(url);

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.Equal("text/html; charset=utf-8", 
            response.Content.Headers.ContentType.ToString());
    }
}
```

**mstest:**

```csharp
[TestClass]
public class BasicTests
{
    private static CustomWebApplicationFactory<Program> _factory;

    [ClassInitialize]
    public static void AssemblyInitialize(TestContext _)
    {
        _factory = new CustomWebApplicationFactory<Program>();
    }

    [ClassCleanup(ClassCleanupBehavior.EndOfClass)]
    public static void AssemblyCleanup(TestContext _)
    {
        _factory.Dispose();
    }

    [TestMethod]
    [DataRow("/")]
    [DataRow("/Index")]
    [DataRow("/About")]
    [DataRow("/Privacy")]
    [DataRow("/Contact")]
    public async Task Get_EndpointsReturnSuccessAndCorrectContentType(string url)
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync(url);

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.AreEqual("text/html; charset=utf-8",
            response.Content.Headers.ContentType.ToString());
    }
}
```

**nunit:**

```csharp
public class BasicTests
{
    private CustomWebApplicationFactory<Program>
        _factory;

    [SetUp]
    public void SetUp()
    {
        _factory = new CustomWebApplicationFactory<Program>();
    }

    [TearDown]
    public void TearDown()
    {
        _factory.Dispose();
    }

    [DatapointSource]
    public string[] values = ["/", "/Index", "/About", "/Privacy", "/Contact"];

    [Theory]
    public async Task Get_EndpointsReturnSuccessAndCorrectContentType(string url)
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync(url);

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.That(response.Content.Headers.ContentType.ToString(), Is.EqualTo("text/html; charset=utf-8"));
    }
}
```

By default, non-essential cookies aren't preserved across requests when the General Data Protection Regulation consent policy is enabled. To preserve non-essential cookies, such as those used by the TempData provider, mark them as essential in your tests. For instructions on marking a cookie as essential, see Essential cookies.

## AngleSharp vs `Application Parts` for antiforgery checks

This article uses the AngleSharp parser to handle the antiforgery checks by loading pages and parsing the HTML. For testing the endpoints of controller and Razor Pages views at a lower-level, without caring about how they render in the browser, consider using `Application Parts`. The Application Parts approach injects a controller or Razor Page into the app that can be used to make JSON requests to get the required values. For more information, see the blog Integration Testing ASP.NET Core Resources Protected with Antiforgery Using Application Parts and associated GitHub repo by Martin Costello.
