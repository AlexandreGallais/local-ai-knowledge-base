---
title: "Integration tests in ASP.NET Core (part 5 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/test/integration-tests.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Integration tests in ASP.NET Core (part 5 of 5)

## Disposal of objects

**xunit:**

After the tests of the `IClassFixture` implementation are executed, `Microsoft.AspNetCore.TestHost.TestServer` and `System.Net.Http.HttpClient` are disposed when xUnit disposes of the `WebApplicationFactory`. If objects instantiated by the developer require disposal, dispose of them in the `IClassFixture` implementation. For more information, see Implementing a Dispose method.

**mstest:**

After the tests of the `TestClass` are executed, `Microsoft.AspNetCore.TestHost.TestServer` and `System.Net.Http.HttpClient` are disposed when MSTest disposes of the `WebApplicationFactory` in the `ClassCleanup` method. If objects instantiated by the developer require disposal, dispose of them in the `ClassCleanup` method. For more information, see Implementing a Dispose method.

**nunit:**

After the tests of the test class are executed, `Microsoft.AspNetCore.TestHost.TestServer` and `System.Net.Http.HttpClient` are disposed when NUnit disposes of the `WebApplicationFactory` in the `TearDown` method. If objects instantiated by the developer require disposal, dispose of them in the `TearDown` method. For more information, see Implementing a Dispose method.

## Integration tests sample

The sample app is composed of two apps:

| App | Project directory | Description |
|--|--|--|
| Message app (the SUT) | `src/RazorPagesProject` | Allows a user to add, delete one, delete all, and analyze messages. |
| Test app | `tests/RazorPagesProject.Tests` | Used to integration test the SUT. |

The tests can be run using the built-in test features of an IDE, such as Visual Studio. If using Visual Studio Code or the command line, execute the following command at a command prompt in the `tests/RazorPagesProject.Tests` directory:

```console
dotnet test
```

### Message app (SUT) organization

The SUT is a Razor Pages message system with the following characteristics:

* The Index page of the app (`Pages/Index.cshtml` and `Pages/Index.cshtml.cs`) provides a UI and page model methods to control the addition, deletion, and analysis of messages (average words per message).
* A message is described by the `Message` class (`Data/Message.cs`) with two properties: `Id` (key) and `Text` (message). The `Text` property is required and limited to 200 characters.
* Messages are stored using Entity Framework's in-memory database&#8224;.
* The app contains a data access layer (DAL) in its database context class, `AppDbContext` (`Data/AppDbContext.cs`).
* If the database is empty on app startup, the message store is initialized with three messages.
* The app includes a `/SecurePage` that can only be accessed by an authenticated user.

&#8224;The EF article, Test with InMemory, explains how to use an in-memory database for tests with MSTest. This topic uses the xUnit test framework. Test concepts and test implementations across different test frameworks are similar but not identical.

Although the app doesn't use the repository pattern and isn't an effective example of the Unit of Work (UoW) pattern, Razor Pages supports these patterns of development. For more information, see Designing the infrastructure persistence layer and Test controller logic (the sample implements the repository pattern).

### Test app organization

The test app is a console app inside the `tests/RazorPagesProject.Tests` directory.

| Test app directory | Description |
|--|--|
| `AuthTests` | Contains test methods for:Accessing a secure page by an unauthenticated user.Accessing a secure page by an authenticated user with a mock `Microsoft.AspNetCore.Authentication.AuthenticationHandler`1`.Obtaining a GitHub user profile and checking the profile's user login. |
| `BasicTests` | Contains a test method for routing and content type. |
| `IntegrationTests` | Contains the integration tests for the Index page using custom `WebApplicationFactory` class. |
| `Helpers/Utilities` | `Utilities.cs` contains the `InitializeDbForTests` method used to seed the database with test data.`HtmlHelpers.cs` provides a method to return an AngleSharp `IHtmlDocument` for use by the test methods.`HttpClientExtensions.cs` provide overloads for `SendAsync` to submit requests to the SUT. |

The test framework is xUnit. Integration tests are conducted using the `Microsoft.AspNetCore.TestHost`, which includes the `Microsoft.AspNetCore.TestHost.TestServer`. Because the `Microsoft.AspNetCore.Mvc.Testing` package is used to configure the test host and test server, the `TestHost` and `TestServer` packages don't require direct package references in the test app's project file or developer configuration in the test app.

Integration tests usually require a small dataset in the database prior to the test execution. For example, a delete test calls for a database record deletion, so the database must have at least one record for the delete request to succeed.

The sample app seeds the database with three messages in `Utilities.cs` that tests can use when they execute:

_Code sample not included: ~/../AspNetCore.Docs.Samples/test/integration-tests/10.x/IntegrationTestsSample/tests/RazorPagesProject.Tests/Helpers/Utilities.cs._

The SUT's database context is registered in `Program.cs`. The test app's `builder.ConfigureServices` callback is executed *after* the app's `Program.cs` code is executed. To use a different database for the tests, the app's database context must be replaced in `builder.ConfigureServices`. For more information, see the Customize WebApplicationFactory section.

## Related content

* Unit tests
* Razor Pages unit tests in ASP.NET Core
* ASP.NET Core middleware
* Test controller logic in ASP.NET Core
* Basic tests for authentication middleware
