---
title: ".NET 8 breaking change: Enumerable.Sum throws new OverflowException for some inputs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/8.0/enumerable-sum.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Enumerable.Sum throws new OverflowException for some inputs

.NET 8 adds support for vectorization in the `System.Linq.Enumerable.Sum*` methods where applicable. As a side-effect of that change, the vectorized implementation can change the order in which the different elements are added. While this shouldn't change the final result in successful runs, it can result in unexpected `System.OverflowException` exceptions for certain sets of pathological inputs.

## Previous behavior

Consider the following code:

```csharp
Test(GetEnumerable1());           // Non-vectorizable
Test(GetEnumerable1().ToArray()); // Vectorizable
Test(GetEnumerable2());           // Non-vectorizable
Test(GetEnumerable2().ToArray()); // Vectorizable

static IEnumerable<int> GetEnumerable1()
{
    for (int i = 0; i < 32; ++i)
    {
        yield return 1_000_000_000;
        yield return -1_000_000_000;
    }
}

static IEnumerable<int> GetEnumerable2()
{
    for (int i = 0; i < 32; ++i)
    {
        yield return 100_000_000;
    }
    for (int i = 0; i < 32; ++i)
    {
        yield return -100_000_000;
    }
}

static void Test(IEnumerable<int> input)
{
    try
    {
        Console.WriteLine(input.Sum());
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.GetType().Name);
    }
}
```

Prior to this change, the preceding code printed the following output:

```txt
0
0
OverflowException
OverflowException
```

## New behavior

Starting in .NET 8, the code snippet from the Previous behavior section prints the following output:

```txt
0
OverflowException
OverflowException
0
```

## Version introduced

.NET 8 Preview 7

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made to take advantage of vectorization in LINQ APIs.

## Recommended action

If your code is impacted by the change, you can either:

- Disable vectorization altogether in your application by setting the `DOTNET_EnableHWIntrinsic` environment variable to 0.
- Write a custom `Sum` method that doesn't use vectorization:

  ```csharp
  static int Sum(IEnumerable<int> values)
  {
      int acc = 0;
      foreach (int value in values)
      {
          checked { acc += value; }
      }
      return acc;
  }
  ```

## Affected APIs

- `System.Linq.Enumerable.Sum*`
