---
title: "Best practices for writing unit tests (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/unit-testing-best-practices.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Unit testing best practices for .NET

There are numerous benefits of writing unit tests. They help with regression, provide documentation, and facilitate good design. But when unit tests are hard to read and brittle, they can wreak havoc on your code base. This article describes some best practices for designing unit tests to support your .NET Core and .NET Standard projects. You learn techniques to keep your tests resilient and easy to understand.

The code examples use the xUnit.net test framework, which provides the `[Fact]` and `[Theory]` attributes and the `Assert` class. For an introduction to xUnit.net, see Unit testing C# in .NET using dotnet test and xUnit. The best practices also apply to other .NET test frameworks.

By John Reese with special thanks to Roy Osherove

## Benefits of unit testing

The following sections describe several reasons to write unit tests for your .NET Core and .NET Standard projects.

### Less time performing functional tests

Functional tests are expensive. They typically involve opening the application and performing a series of steps that you (or someone else) must follow in order to validate the expected behavior. These steps might not always be known to the tester. They have to reach out to someone more knowledgeable in the area to carry out the test. Testing itself can take seconds for trivial changes, or minutes for larger changes. Lastly, this process must be repeated for every change that you make in the system. Unit tests, on the other hand, take milliseconds, can be run at the press of a button, and don't necessarily require any knowledge of the system at large. The test runner determines whether the test passes or fails, not the individual.

### Protection against regression

Regression defects are errors that are introduced when a change is made to the application. It's common for testers to not only test their new feature but also test features that existed beforehand to verify that existing features still function as expected. With unit testing, you can rerun your entire suite of tests after every build or even after you change a line of code. This approach helps to increase confidence that your new code doesn't break existing functionality.

### Executable documentation

It might not always be obvious what a particular method does or how it behaves given a certain input. You might ask yourself: _How does this method behave if I pass it a blank string or null?_ When you have a suite of well-named unit tests, each test should clearly explain the expected output for a given input. In addition, the test should be able to verify that it actually works.

### Less coupled code

When code is tightly coupled, it can be difficult to unit test. Without creating unit tests for the code that you're writing, coupling might be less apparent. Writing tests for your code naturally decouples your code because it's more difficult to test otherwise.

## Characteristics of good unit tests

There are several important characteristics that define a good unit test:

- **Fast**: It's not uncommon for mature projects to have thousands of unit tests. Unit tests should take little time to run. Milliseconds.
- **Isolated**: Unit tests are standalone, can run in isolation, and have no dependencies on any outside factors, such as a file system or database.
- **Repeatable**: Running a unit test should be consistent with its results. The test always returns the same result if you don't change anything in between runs.
- **Self-Checking**: The test should automatically detect if it passed or failed without any human interaction.
- **Timely**: A unit test shouldn't take a disproportionately long time to write compared to the code being tested. If you discover that testing the code takes a large amount of time compared to writing the code, consider a more testable design.

## Code coverage and code quality

A high code coverage percentage is often associated with a higher quality of code. However, the measurement itself *can't* determine the quality of code. Setting an overly ambitious code coverage percentage goal can be counterproductive. Consider a complex project with thousands of conditional branches, and suppose you set a goal of 95% code coverage. Currently, the project maintains 90% code coverage. The amount of time it takes to account for all of the edge cases in the remaining 5% can be a massive undertaking, and the value proposition quickly diminishes.

A high code coverage percentage isn't an indicator of success, and it doesn't imply high code quality. It just represents the amount of code covered by unit tests. For more information, see unit testing code coverage.

## Unit testing terminology

Several terms are used frequently in the context of unit testing: *fake*, *mock*, and *stub*. Unfortunately, these terms can be misapplied, so it's important to understand the correct usage.

> **Note:**
> Testing literature and tools use the terms *fake*, *stub*, and *mock* inconsistently. The following definitions represent common .NET usage where a test double can both return values and verify interactions. In classic xUnit and test double literature (for example, Fowler and Meszaros), those sources use these words more narrowly: a *stub* provides data, a *mock* verifies interactions, and a *fake* is a working alternative implementation.

- **Fake**: A fake is a generic term that can be used to describe either a stub or a mock object. Whether the object is a stub or a mock depends on the context in which the object is used. In other words, a fake can be a stub or a mock.

- **Mock**: A mock object is a fake object in the system that decides whether or not a unit test passes or fails. A mock begins as a fake and remains a fake until it enters an `Assert` operation.

- **Stub**: A stub is a controllable replacement for an existing dependency (or collaborator) in the system. By using a stub, you can test your code without dealing with the dependency directly. By default, a stub begins as a fake.

Consider the following code:

```csharp
var mockOrder = new MockOrder();
var purchase = new Purchase(mockOrder);

purchase.ValidateOrders();

Assert.True(purchase.CanBeShipped);
```

This code shows a stub referred to as a mock. But in this scenario, the stub is truly a stub. The purpose of the code is to pass the order as a means to instantiate the `Purchase` (the system under test) object. The class name `MockOrder` is misleading because the order is a stub and not a mock.

The following code shows a more accurate design:

```csharp
var stubOrder = new FakeOrder();
var purchase = new Purchase(stubOrder);

purchase.ValidateOrders();

Assert.True(purchase.CanBeShipped);
```

When the class is renamed to `FakeOrder`, the class is more generic. The class can be used as a mock or a stub, according to the requirements of the test case. In the first example, the `FakeOrder` class is used as a stub, and it isn't used during the `Assert` operation. The code passes the `FakeOrder` class to the `Purchase` class just to satisfy the requirements of the constructor.

To use the class as a mock, you can update the code:

```csharp
var mockOrder = new FakeOrder();
var purchase = new Purchase(mockOrder);

purchase.ValidateOrders();

Assert.True(mockOrder.Validated);
```

In this design, the code checks a property on the fake (asserting against it), and therefore, the `mockOrder` class is a mock.

> **Important:**
> It's important to implement the terminology correctly. If you call your stubs "mocks," other developers are going to make false assumptions about your intent.

The main thing to remember about mocks versus stubs is that mocks are just like stubs, except for the `Assert` process. You run `Assert` operations against a mock object, but not against a stub.
