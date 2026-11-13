---
title: "MSTest assertions (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-mstest-writing-tests-assertions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTest assertions (part 2 of 2)

## The `CollectionAssert` class

Use the `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert` class to compare collections of objects, or to verify the state of a collection.

> **Warning:**
> The `CollectionAssert` class is likely to be deprecated in a future release. It's maintained primarily for backward compatibility and isn't recommended for new code. When an equivalent method exists on `Assert` (such as `Assert.Contains`, `Assert.DoesNotContain`, or `Assert.HasCount`), use `Assert` for better discoverability.

Available APIs are:

- `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.AllItemsAreInstancesOfType*`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.AllItemsAreNotNull*`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.AllItemsAreUnique*`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.AreEqual*`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.AreEquivalent*`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.AreNotEqual*`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.AreNotEquivalent*`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.Contains*`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.DoesNotContain*`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.IsNotSubsetOf*`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.IsSubsetOf*`

## Create custom assertions with `Assert.That`

The built-in assertion methods don't cover every scenario. To extend the assertion infrastructure with your own checks, MSTest exposes the `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.That` singleton property as an extensibility hook. You add custom assertions as C# extension methods on the `Assert` instance type, and callers invoke them with the familiar `Assert.That.MyAssertion(...)` syntax.

For better discoverability, organize project-wide assertions in a dedicated static class. Custom assertions reached through `Assert.That` show up alongside the built-in methods in IntelliSense, so consumers don't have to remember a separate helper type.

### Author a custom assertion

Add an extension method that targets the `Assert` type and throws `Microsoft.VisualStudio.TestTools.UnitTesting.AssertFailedException` when the condition fails:

```csharp
using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

public static class CustomAssertExtensions
{
    public static void IsPrime(this Assert assert, int value)
    {
        if (value < 2 || Enumerable.Range(2, (int)Math.Sqrt(value) - 1).Any(i => value % i == 0))
        {
            throw new AssertFailedException($"Assert.That.IsPrime failed. Value <{value}> is not a prime number.");
        }
    }
}
```

### Use a custom assertion

After you import the namespace that contains your extension methods, call your custom assertion through `Assert.That`:

```csharp
[TestMethod]
public void Compute_ReturnsPrime()
{
    int result = _calculator.NextPrime(10);
    Assert.That.IsPrime(result);
}
```

### Extension hooks on `StringAssert` and `CollectionAssert`

The `Microsoft.VisualStudio.TestTools.UnitTesting.StringAssert.That` and `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert.That` properties expose the same singleton pattern for backward compatibility. For new custom assertions, always target `Assert.That`. Otherwise, your helpers inherit the same discoverability problems as the legacy classes, and they'll need migration if `StringAssert` and `CollectionAssert` are deprecated.

### `Assert.That` property versus `Assert.That(...)` method

> **Note:**
> Don't confuse the `Assert.That` singleton *property*—used as an extensibility hook—with the `Assert.That(() => condition)` *method* added in MSTest 3.8. The latter accepts a Boolean expression and produces detailed failure messages by analyzing the expression tree (for example, `Assert.That(() => order.Total > 0)`). The two APIs share a name but serve different purposes.

## Best practices

- **Use specific assertions**: Prefer `AreEqual` over `IsTrue(a == b)` for better failure messages.

- **Include descriptive messages**: Help identify failures quickly with clear assertion messages.

- **Test one thing at a time**: Each test method should verify a single behavior.

- **Use `Throws`/`ThrowsExactly` for exceptions**: In MSTest v3.8+, prefer `Assert.Throws`, `Assert.ThrowsExactly`, and their async counterparts (`ThrowsAsync`, `ThrowsExactlyAsync`) over the `ExpectedException` attribute.

- **Prefer `Assert` over `StringAssert`/`CollectionAssert`**: For better discoverability and consistency, use the `Assert` class. The `StringAssert` and `CollectionAssert` classes are likely to be deprecated in a future release.

- **Extend `Assert.That` for custom assertions**: For consistent discoverability, add custom assertions as extension methods on `Assert` and invoke them through `Assert.That`. Don't target `StringAssert.That` or `CollectionAssert.That` in new code.

## Related analyzers

The following analyzers help ensure proper usage of assertions:

- MSTEST0006 - Avoid `ExpectedException` attribute, use `Assert.Throws` methods instead.
- MSTEST0017 - Assertion arguments should be passed in the correct order.
- MSTEST0023 - Do not negate boolean assertions.
- MSTEST0025 - Prefer `Assert.Fail` over always-false conditions.
- MSTEST0026 - Assertion arguments should avoid conditional access.
- MSTEST0032 - Review always-true assert conditions.
- MSTEST0037 - Use proper assert methods.
- MSTEST0038 - Avoid `Assert.AreSame` with value types.
- MSTEST0039 - Use newer `Assert.Throws` methods.
- MSTEST0040 - Avoid using asserts in async void context.
- MSTEST0046 - Use `Assert` instead of `StringAssert`.
- MSTEST0051 - `Assert.Throws` should contain a single statement.
- MSTEST0053 - Avoid `Assert` format parameters.
- MSTEST0058 - Avoid asserts in catch blocks.

## See also

- Write tests in MSTest
- Data-driven testing
- TestContext class
- MSTest analyzers
