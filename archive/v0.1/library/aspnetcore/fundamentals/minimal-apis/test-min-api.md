---
title: "Test Minimal API apps"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/minimal-apis/test-min-api.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Unit and integration tests in Minimal API apps

-->
-->

By Fiyaz Bin Hasan, and Rick Anderson

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

The sample code on GitHub provides an example of unit and integration tests on a Minimal API app.

## Unit test IResult implementation types

The following example shows how to unit test minimal route handlers that return `Microsoft.AspNetCore.Http.IResult` using the xUnit testing framework. The external database is replaced with an in-memory database during testing, the implementation of the `MockDb` can be found in the sample code.

Public `Microsoft.AspNetCore.Http.IResult` implementation types in the `Microsoft.AspNetCore.Http.HttpResults` namespace can be used to unit test minimal route handlers when using named methods instead of lambdas.

The following code uses the `Microsoft.AspNetCore.Http.HttpResults.NotFound`1` class:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/UnitTests/TodoInMemoryTests.cs._
The following code uses the `Microsoft.AspNetCore.Http.HttpResults.Ok`1` class:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/UnitTests/TodoInMemoryTests.cs._
In the previous examples, the result is cast to a concrete type because the endpoint under test can return multiple types (a `Microsoft.AspNetCore.Http.HttpResults.NotFound`1` or `Microsoft.AspNetCore.Http.HttpResults.Ok`1`) result.
However, if the endpoint returns a single `Microsoft.AspNetCore.Http.TypedResults` type, then the result is automatically inferred to that type and no casting is required.

The following code uses the `Microsoft.AspNetCore.Http.TypedResults.Ok*` class, and the value's type is a collection of `Todo`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/UnitTests/TodoInMemoryTests.cs._
## Related content

* Basic <example-value> tests is not a .NET repository but was written by a member of the .NET team. It provides examples of basic <example-value> testing.
* View or download sample code
* Authentication and authorization in Minimal APIs
* Use port tunneling Visual Studio to debug web APIs
* Test controller logic in ASP.NET Core
* Razor Pages unit tests in ASP.NET Core
