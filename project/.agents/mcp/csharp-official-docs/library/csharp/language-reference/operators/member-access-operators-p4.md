---
title: "Member access and null-conditional operators and expressions: (part 4 of 8)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/member-access-operators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Member access and null-conditional operators and expressions: (part 4 of 8)

## Indexer operator []

Square brackets, `[]`, typically access array, indexer, or pointer elements. Square brackets also enclose a collection expression.

### Array access

The following example demonstrates how to access array elements:

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
If an array index is outside the bounds of the corresponding dimension of an array, the runtime throws an `System.IndexOutOfRangeException`.

As the preceding example shows, you also use square brackets when you declare an array type or instantiate an array instance.

For more information about arrays, see Arrays.

### Indexer access

The following example uses the .NET `System.Collections.Generic.Dictionary`2` type to demonstrate indexer access:

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
Indexers allow you to index instances of a user-defined type in a similar way as array indexing. Unlike array indices, which must be integer, you can declare the indexer parameters to be of any type.

For more information about indexers, see Indexers.

### Other usages of []

For information about pointer element access, see the Pointer element access operator [] section of the Pointer related operators article. For information about collection expressions, see the collection expressions article.

You also use square brackets to specify attributes:

```csharp
[System.Diagnostics.Conditional("DEBUG")]
void TraceMethod() {}
```

Use square brackets to designate list patterns for use in pattern matching or testing.

```csharp
arr is ([1, 2, ..])
//Specifies that an array starts with (1, 2)
```
