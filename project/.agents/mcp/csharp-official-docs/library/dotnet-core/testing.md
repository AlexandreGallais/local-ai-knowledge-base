---
title: "Testing in .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Testing in .NET

This article introduces the concept of testing and illustrates how different kinds of tests can be used to validate code. Various tools are available for testing .NET applications, such as the .NET CLI or Integrated Development Environments (IDEs).

## Test types

Automated tests are a great way to ensure that the application code does what its authors intend. This article covers unit tests, integration tests, and load tests.

### Unit tests

A *unit test* is a test that exercises individual software components or methods, also known as a "unit of work." Unit tests should only test code within the developer's control. They don't test infrastructure concerns. Infrastructure concerns include interacting with databases, file systems, and network resources.

For more information on creating unit tests, see Testing tools.

### Integration tests

An *integration test* differs from a unit test in that it exercises two or more software components' ability to function together, also known as their "integration." These tests operate on a broader spectrum of the system under test, whereas unit tests focus on individual components. Often, integration tests do include infrastructure concerns.

### Load tests

A *load test* aims to determine whether or not a system can handle a specified load. For example, the number of concurrent users using an application and the app's ability to handle interactions responsively. For more information on load testing of web applications, see ASP.NET Core load/stress testing.

## Test considerations

Keep in mind there are best practices for writing tests. For example, Test Driven Development (TDD) is when you write a unit test before the code it's meant to check. TDD is like creating an outline for a book before you write it. The unit test helps developers write simpler, readable, and efficient code.

## Testing tools

When running tests in .NET, there are two components involved: the test platform and the test framework.

### Test platforms

The test platform is the engine that runs tests and communicates with tools such as IDEs and CLI.

Use Test platforms overview to understand the differences between VSTest and Microsoft.Testing.Platform (MTP), and choose the best platform for your scenario.

For migration guidance, see Migrate from VSTest to MTP.

### Test frameworks

The test framework is built on top of the test platform. It defines the set of attributes and APIs that are available to you, as a test author. It's usually powered by a test adapter, which acts as a communication layer between the test framework and the test platform. The popular test frameworks are MSTest, NUnit, TUnit, and xUnit.net.

#### MSTest

MSTest is the Microsoft test framework for all .NET languages. It's extensible and works with .NET CLI, Visual Studio, Visual Studio Code, and Rider. It supports both VSTest and MTP.

For more information, see the following resources:

- Run tests with MSTest
- Get started with C#
- Get started with F#
- Get started with Visual Basic

#### NUnit

NUnit is a unit-testing framework for all .NET languages. Initially, NUnit was ported from JUnit, and the current production release has been rewritten with many new features and support for a wide range of .NET platforms. It's a project of the .NET Foundation. It supports both VSTest and MTP.

For more information, see the following resources:

- MTP support in NUnit (NUnit runner)
- Unit testing with C#
- Unit testing with F#
- Unit testing with Visual Basic

#### TUnit

TUnit is a testing framework for .NET that's built entirely on top of MTP and doesn't support VSTest. In C#, it discovers tests at compile time by using source generation, which also makes it compatible with Native AOT.

For more information, see the following resources:

- TUnit official documentation
- Unit testing with C#
- Unit testing with F#
- Unit testing with Visual Basic

#### xUnit.net

xUnit.net is a free, open-source, community-focused unit testing tool for .NET. The original inventor of NUnit v2 wrote xUnit.net. xUnit.net is the latest technology for unit testing .NET apps. It also works with ReSharper, CodeRush, and TestDriven.NET. xUnit.net is a project of the .NET Foundation and operates under its code of conduct. It supports both VSTest and MTP.

For more information, see the following resources:

- MTP support in xUnit.net v3
- Unit testing with C#
- Unit testing with F#
- Unit testing with Visual Basic

## Running tests

### .NET CLI

You can run unit tests from all test projects in a solution using the .NET CLI with the dotnet test command. The .NET CLI exposes most of the functionality that Integrated Development Environments (IDEs) make available through user interfaces. The .NET CLI is cross-platform and available to use as part of continuous integration and delivery pipelines. The .NET CLI is used with scripted processes to automate common tasks.

### IDE

Whether you're using Visual Studio, Visual Studio Code, or Rider, there are graphical user interfaces for testing functionality. There are more features available to IDEs than the CLI, for example, Live Unit Testing. For more information, see Including and excluding tests with Visual Studio.

## See also

For more information, see the following articles:

- Unit testing best practices with .NET
- Integration tests in ASP.NET Core
- Running selective unit tests
- Use code coverage for unit testing
