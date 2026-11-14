---
title: "Member access and null-conditional operators and expressions: (part 5 of 8)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/member-access-operators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Member access and null-conditional operators and expressions: (part 5 of 8)

## Null-conditional operators `?.` and `?[]`

A null-conditional operator applies a member access (`?.`) or element access (`?[]`) operation to its operand only if that operand evaluates to non-null. Otherwise, it returns `null`. In other words:

- If `a` evaluates to `null`, the result of `a?.x` or `a?[x]` is `null`.
- If `a` evaluates to non-null, the result of `a?.x` or `a?[x]` is the same as the result of `a.x` or `a[x]`, respectively.

  > **Note:**
  > If `a.x` or `a[x]` throws an exception, `a?.x` or `a?[x]` throws the same exception for non-null `a`. For example, if `a` is a non-null array instance and `x` is outside the bounds of `a`, `a?[x]` throws an `System.IndexOutOfRangeException`.

The null-conditional operators are short-circuiting. That is, if one operation in a chain of conditional member or element access operations returns `null`, the rest of the chain doesn't execute. In the following example, `B` isn't evaluated if `A` evaluates to `null` and `C` isn't evaluated if `A` or `B` evaluates to `null`:

```csharp
A?.B?.Do(C);
A?.B?[C];
```

If `A` might be null but `B` and `C` wouldn't be null if A isn't null, you only need to apply the null-conditional operator to `A`:

```csharp
A?.B.C();
```

In the preceding example, `B` isn't evaluated and `C()` isn't called if `A` is null. However, if the chained member access is interrupted, for example by parentheses as in `(A?.B).C()`, short-circuiting doesn't happen.

The following examples demonstrate the usage of the `?.` and `?[]` operators:

```csharp
double SumNumbers(List<double[]> setsOfNumbers, int indexOfSetToSum)
{
    return setsOfNumbers?[indexOfSetToSum]?.Sum() ?? double.NaN;
}

var sum1 = SumNumbers(null, 0);
Console.WriteLine(sum1);  // output: NaN

List<double[]?> numberSets =
[
    [1.0, 2.0, 3.0],
    null
];

var sum2 = SumNumbers(numberSets, 0);
Console.WriteLine(sum2);  // output: 6

var sum3 = SumNumbers(numberSets, 1);
Console.WriteLine(sum3);  // output: NaN
```
```csharp
﻿namespace MemberAccessOperators2;

public static class NullConditionalShortCircuiting
{
    public static void Main()
    {
        Person? person = null;
        person?.Name.Write(); // no output: Write() is not called due to short-circuit.
        try
        {
            (person?.Name).Write();
        }
        catch (NullReferenceException)
        {
            Console.WriteLine("NullReferenceException");
        }; // output: NullReferenceException
    }
}

public class Person
{
    public required FullName Name { get; set; }
}

public class FullName
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public void Write() => Console.WriteLine($"{FirstName} {LastName}");
}
```
The first preceding example also uses the null-coalescing operator `??` to specify an alternative expression to evaluate in case the result of a null-conditional operation is `null`.

If `a.x` or `a[x]` is of a non-nullable value type `T`, `a?.x` or `a?[x]` is of the corresponding nullable value type `T?`. If you need an expression of type `T`, apply the null-coalescing operator `??` to a null-conditional expression, as the following example shows:

```csharp
using System.Collections.Generic;

namespace operators;

public static class MemberAccessOperators
{
    public static void Examples()
    {
        TypeMemberAccess();
        Arrays();
        Indexers();
        NullConditional();
        NullConditionalWithNullCoalescing();
        Invocation();
        IndexFromEnd();
        Ranges();
        RangesOptional();
        RangesAllPossible();
    }

    private static void QualifiedName()
    {
        System.Collections.Generic.IEnumerable<int> numbers = [1, 2, 3];
    }

    private static void TypeMemberAccess()
    {
        List<double> constants =
        [
            Math.PI,
            Math.E
        ];
        Console.WriteLine($"{constants.Count} values to show:");
        Console.WriteLine(string.Join(", ", constants));
        // Output:
        // 2 values to show:
        // 3.14159265358979, 2.71828182845905
    }

    private static void Arrays()
    {
        int[] fib = new int[10];
        fib[0] = fib[1] = 1;
        for (int i = 2; i < fib.Length; i++)
        {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        Console.WriteLine(fib[fib.Length - 1]);  // output: 55

        double[,] matrix = new double[2,2];
        matrix[0,0] = 1.0;
        matrix[0,1] = 2.0;
        matrix[1,0] = matrix[1,1] = 3.0;
        var determinant = matrix[0,0] * matrix[1,1] - matrix[1,0] * matrix[0,1];
        Console.WriteLine(determinant);  // output: -3
    }

    private static void Indexers()
    {
        var dict = new Dictionary<string, double>();
        dict["one"] = 1;
        dict["pi"] = Math.PI;
        Console.WriteLine(dict["one"] + dict["pi"]);  // output: 4.14159265358979
    }

    private static void NullConditional()
    {
        double SumNumbers(List<double[]> setsOfNumbers, int indexOfSetToSum)
        {
            return setsOfNumbers?[indexOfSetToSum]?.Sum() ?? double.NaN;
        }

        var sum1 = SumNumbers(null, 0);
        Console.WriteLine(sum1);  // output: NaN

        List<double[]?> numberSets =
        [
            [1.0, 2.0, 3.0],
            null
        ];

        var sum2 = SumNumbers(numberSets, 0);
        Console.WriteLine(sum2);  // output: 6

        var sum3 = SumNumbers(numberSets, 1);
        Console.WriteLine(sum3);  // output: NaN
    }

    private static void NullConditionalWithNullCoalescing()
    {
        int GetSumOfFirstTwoOrDefault(int[]? numbers)
        {
            if ((numbers?.Length ?? 0) < 2)
            {
                return 0;
            }
            return numbers[0] + numbers[1];
        }

        Console.WriteLine(GetSumOfFirstTwoOrDefault(null));  // output: 0
        Console.WriteLine(GetSumOfFirstTwoOrDefault([]));  // output: 0
        Console.WriteLine(GetSumOfFirstTwoOrDefault([3, 4, 5]));  // output: 7
    }

    private static void Invocation()
    {
        Action<int> display = s => Console.WriteLine(s);

        List<int> numbers =
        [
            10,
            17
        ];
        display(numbers.Count);   // output: 2

        numbers.Clear();
        display(numbers.Count);   // output: 0
    }

    private static void IndexFromEnd()
    {
        int[] xs = [0, 10, 20, 30, 40];
        int last = xs[^1];
        Console.WriteLine(last);  // output: 40

        List<string> lines = ["one", "two", "three", "four"];
        string prelast = lines[^2];
        Console.WriteLine(prelast);  // output: three

        string word = "Twenty";
        Index toFirst = ^word.Length;
        char first = word[toFirst];
        Console.WriteLine(first);  // output: T
    }

    private static void Ranges()
    {
        int[] numbers = [0, 10, 20, 30, 40, 50];
        int start = 1;
        int amountToTake = 3;
        int[] subset = numbers[start..(start + amountToTake)];
        Display(subset);  // output: 10 20 30

        int margin = 1;
        int[] inner = numbers[margin..^margin];
        Display(inner);  // output: 10 20 30 40

        string line = "one two three";
        int amountToTakeFromEnd = 5;
        Range endIndices = ^amountToTakeFromEnd..^0;
        string end = line[endIndices];
        Console.WriteLine(end);  // output: three

        void Display<T>(IEnumerable<T> xs) => Console.WriteLine(string.Join(" ", xs));
    }

    private static void RangesOptional()
    {
        int[] numbers = [0, 10, 20, 30, 40, 50];
        int amountToDrop = numbers.Length / 2;

        int[] rightHalf = numbers[amountToDrop..];
        Display(rightHalf);  // output: 30 40 50

        int[] leftHalf = numbers[..^amountToDrop];
        Display(leftHalf);  // output: 0 10 20

        int[] all = numbers[..];
        Display(all);  // output: 0 10 20 30 40 50

        void Display<T>(IEnumerable<T> xs) => Console.WriteLine(string.Join(" ", xs));
    }

    private static void RangesAllPossible()
    {
        int[] oneThroughTen =
        [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ];

        Write(oneThroughTen, ..);
        Write(oneThroughTen, ..3);
        Write(oneThroughTen, 2..);
        Write(oneThroughTen, 3..5);
        Write(oneThroughTen, ^2..);
        Write(oneThroughTen, ..^3);
        Write(oneThroughTen, 3..^4);
        Write(oneThroughTen, ^4..^2);

        static void Write(int[] values, Range range) =>
            Console.WriteLine($"{range}:\t{string.Join(", ", values[range])}");
        // Sample output:
        //      0..^0:      1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        //      0..3:       1, 2, 3
        //      2..^0:      3, 4, 5, 6, 7, 8, 9, 10
        //      3..5:       4, 5
        //      ^2..^0:     9, 10
        //      0..^3:      1, 2, 3, 4, 5, 6, 7
        //      3..^4:      4, 5, 6
        //      ^4..^2:     7, 8
    }
}
```
In the preceding example, if you don't use the `??` operator, `numbers?.Length < 2` evaluates to `false` when `numbers` is `null`.

> **Note:**
> The `?.` operator evaluates its left-hand operand no more than once, guaranteeing that it can't be changed to `null` after being verified as non-null.

Beginning in C# 14, assignment is permissible with a null conditional access expression (`?.` and `?[]`) on reference types. For example, see the following method:

```csharp
person?.FirstName = "Scott";
messages?[5] = "five";
```
The preceding example shows assignment to a property and an indexed element on a reference type that might be null. An important behavior for this assignment is that the expression on the right-hand side of the `=` is evaluated only when the left-hand side is known to be non-null. For example, in the following code, the function `GenerateNextIndex` is called only when the `values` array isn't null. If the `values` array is null, `GenerateNextIndex` isn't called:

```csharp
values?[2] = GenerateNextIndex();
int GenerateNextIndex() => index++;
```
In other words, the preceding code is equivalent to the following code using an `if` statement for the null check:

```csharp
if (values is not null)
{
    values[2] = GenerateNextIndex();
}
```
In addition to assignment, any form of compound assignment, such as `+=` or `-=`, is allowed. However, increment (`++`) and decrement (`--`) aren't allowed.

This enhancement doesn't classify a null conditional expression as a variable. It can't be `ref` assigned, nor can it be assigned to a `ref` variable or passed to a method as a `ref` or `out` argument.

### Thread-safe delegate invocation

Use the `?.` operator to check if a delegate isn't null and invoke it in a thread-safe way (for example, when you raise an event), as the following code shows:

```csharp
PropertyChanged?.Invoke(…)
```

That code is equivalent to the following code:

```csharp
var handler = this.PropertyChanged;
if (handler != null)
{
    handler(…);
}
```

The preceding example is a thread-safe way to ensure that only a non-null `handler` is invoked. Because delegate instances are immutable, no thread can change the object referenced by the `handler` local variable. In particular, if the code executed by another thread unsubscribes from the `PropertyChanged` event and `PropertyChanged` becomes `null` before `handler` is invoked, the object referenced by `handler` remains unaffected.
