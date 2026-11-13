---
title: "Best practices for writing unit tests (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-best-practices.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best practices for writing unit tests (part 2 of 2)

## Best practices

There are several important best practices to follow when writing unit tests. The following sections provide examples that show how to apply the best practices to your code.

### Avoid infrastructure dependencies

Try not to introduce dependencies on infrastructure when writing unit tests. The dependencies make the tests slow and brittle and should be reserved for integration tests. You can avoid these dependencies in your application by following the Explicit Dependencies Principle and by using .NET dependency injection. You can also keep your unit tests in a separate project from your integration tests. This approach ensures your unit test project doesn't have references to or dependencies on infrastructure packages.

### Follow test naming standards

The name of your test should consist of three parts:

- Name of the method being tested
- Scenario under which the method is being tested
- Expected behavior when the scenario is invoked

To document the expected behavior of the code under test, use descriptive, consistent test names. Each name specifies how the code should behave in a particular scenario, while the test verifies that behavior. Clear names help you understand the expected behavior from the test suite without inspecting the code under test. When a test fails, its name helps you identify which scenario didn't meet your expectations.

**Original code**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/before/StringCalculatorTests.cs._

**Apply best practice**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/after/StringCalculatorTests.cs._

### Arrange your tests

The "Arrange, Act, Assert" pattern is a common approach for writing unit tests. As the name implies, the pattern consists of three main tasks:

- **Arrange** your objects, create, and configure them as necessary
- **Act** on an object
- **Assert** that something is as expected

When you follow the pattern, you can clearly separate what is being tested from the Arrange and Assert tasks. The pattern also helps to reduce the opportunity for assertions to intermix with code in the Act task.

Readability is one of the most important aspects when writing a unit test. Separating each pattern action within the test clearly highlights the dependencies required to call your code, how your code is called, and what you're trying to assert. While it might be possible to combine some steps and reduce the size of your test, the overall goal is to make the test as readable as possible.

**Original code**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/before/StringCalculatorTests.cs._

**Apply best practice**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/after/StringCalculatorTests.cs._

### Write minimally passing tests

The input for a unit test should be the simplest information needed to verify the behavior you're currently testing. The minimalist approach helps tests become more resilient to future changes in the codebase and focus on verifying the behavior over the implementation.

Tests that include more information than required to pass the current test have a higher chance of introducing errors into the test and can make the intent of the test less clear. When writing tests, you want to focus on the behavior. Setting extra properties on models or using nonzero values when not required, only detracts from what you're trying to confirm.

**Original code**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/before/StringCalculatorTests.cs._

**Apply best practice**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/after/StringCalculatorTests.cs._

### Avoid magic strings

*Magic strings* are string values hard-coded directly in your unit tests without any code extra comment or context. These values make your code less readable and harder to maintain. Magic strings can cause confusion to the reader of your tests. If a string looks out of the ordinary, they might wonder why a certain value was chosen for a parameter or return value. This type of string value might lead them to take a closer look at the implementation details, rather than focus on the test.

> **Tip:**
> Make your goal to express as much intent as possible in your unit test code. Rather than using magic strings, assign any hard-coded values to constants.

**Original code**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/before/StringCalculatorTests.cs._

**Apply best practice**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/after/StringCalculatorTests.cs._

### Avoid coding logic in unit tests

When you write your unit tests, avoid manual string concatenation, logical conditions, such as `if`, `while`, `for`, and `switch`, and other conditions. If you include logic in your test suite, the chance of introducing bugs increases dramatically. The last place you want to find a bug is within your test suite. You should have a high level of confidence that your tests work, otherwise, you can't trust them. Tests that you don't trust, don't provide any value. When a test fails, you want to have a sense that something is wrong with your code and that it can't be ignored.

> **Tip:**
> If adding logic in your test seems unavoidable, consider splitting the test into two or more different tests to limit the logic requirements.

**Original code**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/before/StringCalculatorTests.cs._

**Apply best practice**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/after/StringCalculatorTests.cs._

### Use helper methods instead of Setup and Teardown

To keep test-specific setup visible, create the objects you need in each test method or call a helper method from the test. Prefer this approach over `Setup` and `Teardown` attributes when tests have different setup requirements:

- Each test shows the setup it requires.
- Each test creates only the objects and state it needs.
- Changes to common setup code don't affect tests that don't use it.

Per-test setup methods run before every test in their scope, even when a test doesn't need all of the setup. As tests acquire different requirements, a common setup method can create unnecessary objects or hide which state a particular test depends on.

Common per-test setup can still be appropriate when every test in a class needs the same initialization. For example, MSTest creates a new test-class instance for each test, including each data row, so constructor initialization runs separately for each test. For synchronous initialization, prefer the constructor. Use `TestInitialize` when you need asynchronous initialization or timeout support. For details, see MSTest lifecycle.

> **Note:**
> The `SetUp` and `TearDown` attributes are removed in xUnit version 2.x and later.

**Original code**

**Apply best practice**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/before/StringCalculatorTests.cs._

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/after/StringCalculatorTests.cs._

```csharp
// More tests...
```

```csharp
// More tests...
```

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/before/StringCalculatorTests.cs._

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/after/StringCalculatorTests.cs._

### Avoid multiple Act tasks

When you write your tests, try to include only one Act task per test. Some common approaches for implementing a single Act task include creating a separate test for each Act or using parameterized tests. There are several benefits to using a single Act task for each test:

- You can easily discern which Act task is failing if the test fails.
- You can ensure the test is focused on just a single case.
- You gain a clear picture as to why your tests are failing.

Multiple Act tasks need to be individually asserted, and you can't guarantee that all Assert tasks execute. In most unit testing frameworks, after an Assert task fails in a unit test, all subsequent tests are automatically considered as failing. The process can be confusing because some working functionality might be interpreted as failing.

**Original code**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/before/StringCalculatorTests.cs._

**Apply best practice**

_Code sample not included: ../../../samples/snippets/core/testing/unit-testing-best-practices/csharp/after/StringCalculatorTests.cs._

### Validate private methods with public methods

In most cases, you don't need to test a private method in your code. Private methods are an implementation detail and never exist in isolation. At some point in the development process, you introduce a public-facing method to call the private method as part of its implementation. When you write your unit tests, what you care about is the end result of the public method that calls into the private one.

Consider the following code scenario:

```csharp
public string ParseLogLine(string input)
{
    var sanitizedInput = TrimInput(input);
    return sanitizedInput;
}

private string TrimInput(string input)
{
    return input.Trim();
}
```

In terms of testing, your first reaction might be to write a test for the `TrimInput` method to ensure it works as expected. However, it's possible the `ParseLogLine` method manipulates the `sanitizedInput` object in a way you don't expect. The unknown behavior might render your test against the `TrimInput` method useless.

A better test in this scenario is to verify the public-facing `ParseLogLine` method:

```csharp
public void ParseLogLine_StartsAndEndsWithSpace_ReturnsTrimmedResult()
{
    var parser = new Parser();

    var result = parser.ParseLogLine(" a ");

    Assert.Equals("a", result);
}
```

When you encounter a private method, locate the public method that calls the private method, and write your tests against the public method. Just because a private method returns an expected result, doesn't mean the system that eventually calls the private method uses the result correctly.

### Handle stub static references with seams

One principle of a unit test is that it must have full control of the system under test. However, this principle can be problematic when production code includes calls to static references (for example, `DateTime.Now`).

Examine the following code scenario:

```csharp
public int GetDiscountedPrice(int price)
{
    if (DateTime.Now.DayOfWeek == DayOfWeek.Tuesday)
    {
        return price / 2;
    }
    else
    {
        return price;
    }
}
```

Can you write a unit test for this code? You might try running an Assert task on the `price`:

```csharp
public void GetDiscountedPrice_NotTuesday_ReturnsFullPrice()
{
    var priceCalculator = new PriceCalculator();

    var actual = priceCalculator.GetDiscountedPrice(2);

    Assert.Equals(2, actual)
}

public void GetDiscountedPrice_OnTuesday_ReturnsHalfPrice()
{
    var priceCalculator = new PriceCalculator();

    var actual = priceCalculator.GetDiscountedPrice(2);

    Assert.Equals(1, actual);
}
```

Unfortunately, you quickly realize there are some problems with your test:

- If the test suite runs on Tuesday, the second test passes, but the first test fails.
- If the test suite runs on any other day, the first test passes, but the second test fails.

To solve these problems, you need to introduce a *seam* into your production code. One approach is to wrap the code that you need to control in an interface and have the production code depend on that interface:

```csharp
public interface IDateTimeProvider
{
    DayOfWeek DayOfWeek();
}

public int GetDiscountedPrice(int price, IDateTimeProvider dateTimeProvider)
{
    if (dateTimeProvider.DayOfWeek() == DayOfWeek.Tuesday)
    {
        return price / 2;
    }
    else
    {
        return price;
    }
}
```

You also need to write a new version of your test suite:

```csharp
public void GetDiscountedPrice_NotTuesday_ReturnsFullPrice()
{
    var priceCalculator = new PriceCalculator();
    var dateTimeProviderStub = new Mock<IDateTimeProvider>();
    dateTimeProviderStub.Setup(dtp => dtp.DayOfWeek()).Returns(DayOfWeek.Monday);

    var actual = priceCalculator.GetDiscountedPrice(2, dateTimeProviderStub);

    Assert.Equals(2, actual);
}

public void GetDiscountedPrice_OnTuesday_ReturnsHalfPrice()
{
    var priceCalculator = new PriceCalculator();
    var dateTimeProviderStub = new Mock<IDateTimeProvider>();
    dateTimeProviderStub.Setup(dtp => dtp.DayOfWeek()).Returns(DayOfWeek.Tuesday);

    var actual = priceCalculator.GetDiscountedPrice(2, dateTimeProviderStub);

    Assert.Equals(1, actual);
}
```

Now the test suite has full control over the `DateTime.Now` value, and can stub any value when calling into the method.

## Related links

- Unit testing code coverage
