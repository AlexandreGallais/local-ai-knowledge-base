---
title: "Write your own extensions to LINQ (part 3 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/linq/how-to-extend-linq.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Write your own extensions to LINQ (part 3 of 3)

```csharp
﻿using Custom.Linq.Extensions;

Console.WriteLine("MedianUsage");
MedianUsage();
Console.WriteLine();
Console.WriteLine("OverloadUsage");
OverloadUsage();
Console.WriteLine();
Console.WriteLine("GenericUsage");
GenericUsage();
Console.WriteLine();
Console.WriteLine("SequenceUsage");
SequenceUsage();

static void MedianUsage()
{
    double[] numbers = [1.9, 2, 8, 4, 5.7, 6, 7.2, 0];
    var query = numbers.Median();

    Console.WriteLine($"double: Median = {query}");
    // This code produces the following output:
    //     double: Median = 4.85
}
static void OverloadUsage()
{
    double[] numbers1 = [1.9, 2, 8, 4, 5.7, 6, 7.2, 0];
    var query1 = numbers1.Median();

    Console.WriteLine($"double: Median = {query1}");

    int[] numbers2 = [1, 2, 3, 4, 5];
    var query2 = numbers2.Median();

    Console.WriteLine($"int: Median = {query2}");
    // This code produces the following output:
    //     double: Median = 4.85
    //     int: Median = 3
}

static void GenericUsage()
{
    int[] numbers3 = [1, 2, 3, 4, 5];

    /*
        You can use the num => num lambda expression as a parameter for the Median method
        so that the compiler will implicitly convert its value to double.
        If there is no implicit conversion, the compiler will display an error message.
    */
    var query3 = numbers3.Median(num => num);

    Console.WriteLine($"int: Median = {query3}");

    string[] numbers4 = ["one", "two", "three", "four", "five"];

    // With the generic overload, you can also use numeric properties of objects.
    var query4 = numbers4.Median(str => str.Length);

    Console.WriteLine($"string: Median = {query4}");
    // This code produces the following output:
    //     int: Median = 3
    //     string: Median = 4
}

static void SequenceUsage()
{
    string[] strings = ["a", "b", "c", "d", "e"];

    var query5 = strings.AlternateElements();

    foreach (var element in query5)
    {
        Console.WriteLine(element);
    }
    // This code produces the following output:
    //     a
    //     c
    //     e
}
```
Extend the `System.Collections.Generic.IEnumerable`1` interface with a custom query method that returns a *sequence of values*. In this case, the method must return a collection of type `System.Collections.Generic.IEnumerable`1`. Such methods can be used to apply filters or data transforms to a sequence of values.

The following example shows how to create an extension method named `AlternateElements` that returns every other element in a collection, starting from the first element.

```csharp
﻿namespace Custom.Linq.Extensions;

public static class EnumerableExtension
{
    public static double Median(this IEnumerable<double>? source)
    {
        if (source is null || !source.Any())
        {
            throw new InvalidOperationException("Cannot compute median for a null or empty set.");
        }

        var sortedList =
            source.OrderBy(number => number).ToList();

        int itemIndex = sortedList.Count / 2;

        if (sortedList.Count % 2 == 0)
        {
            // Even number of items.
            return (sortedList[itemIndex] + sortedList[itemIndex - 1]) / 2;
        }
        else
        {
            // Odd number of items.
            return sortedList[itemIndex];
        }
    }
}

public static class OtherExtensions
{
    // int overload
    public static double Median(this IEnumerable<int> source) =>
        (from number in source select (double)number).Median();

    // generic overload
    public static double Median<T>(
        this IEnumerable<T> numbers, Func<T, double> selector) =>
        (from num in numbers select selector(num)).Median();

    // Extension method for the IEnumerable<T> interface.
    // The method returns every other element of a sequence.
    public static IEnumerable<T> AlternateElements<T>(this IEnumerable<T> source)
    {
        int index = 0;
        foreach (T element in source)
        {
            if (index % 2 == 0)
            {
                yield return element;
            }

            index++;
        }
    }
}
```
Call this extension method for any enumerable collection just as you would call other methods from the `System.Collections.Generic.IEnumerable`1` interface, as shown in the following code:

```csharp
﻿using Custom.Linq.Extensions;

Console.WriteLine("MedianUsage");
MedianUsage();
Console.WriteLine();
Console.WriteLine("OverloadUsage");
OverloadUsage();
Console.WriteLine();
Console.WriteLine("GenericUsage");
GenericUsage();
Console.WriteLine();
Console.WriteLine("SequenceUsage");
SequenceUsage();

static void MedianUsage()
{
    double[] numbers = [1.9, 2, 8, 4, 5.7, 6, 7.2, 0];
    var query = numbers.Median();

    Console.WriteLine($"double: Median = {query}");
    // This code produces the following output:
    //     double: Median = 4.85
}
static void OverloadUsage()
{
    double[] numbers1 = [1.9, 2, 8, 4, 5.7, 6, 7.2, 0];
    var query1 = numbers1.Median();

    Console.WriteLine($"double: Median = {query1}");

    int[] numbers2 = [1, 2, 3, 4, 5];
    var query2 = numbers2.Median();

    Console.WriteLine($"int: Median = {query2}");
    // This code produces the following output:
    //     double: Median = 4.85
    //     int: Median = 3
}

static void GenericUsage()
{
    int[] numbers3 = [1, 2, 3, 4, 5];

    /*
        You can use the num => num lambda expression as a parameter for the Median method
        so that the compiler will implicitly convert its value to double.
        If there is no implicit conversion, the compiler will display an error message.
    */
    var query3 = numbers3.Median(num => num);

    Console.WriteLine($"int: Median = {query3}");

    string[] numbers4 = ["one", "two", "three", "four", "five"];

    // With the generic overload, you can also use numeric properties of objects.
    var query4 = numbers4.Median(str => str.Length);

    Console.WriteLine($"string: Median = {query4}");
    // This code produces the following output:
    //     int: Median = 3
    //     string: Median = 4
}

static void SequenceUsage()
{
    string[] strings = ["a", "b", "c", "d", "e"];

    var query5 = strings.AlternateElements();

    foreach (var element in query5)
    {
        Console.WriteLine(element);
    }
    // This code produces the following output:
    //     a
    //     c
    //     e
}
```
Each example shown in this article has a different *receiver*. That means you must declare each method in a different extension block that specifies the unique receiver. The following code example shows a single static class with three different extension blocks, each of which contains one of the methods defined in this article:

```csharp
﻿namespace NewExtensionMember;

public static class EnumerableExtension
{
    extension(IEnumerable<double>? source)
    {
        public double Median()
        {
            if (source is null || !source.Any())
            {
                throw new InvalidOperationException("Cannot compute median for a null or empty set.");
            }

            var sortedList =
                source.OrderBy(number => number).ToList();

            int itemIndex = sortedList.Count / 2;

            if (sortedList.Count % 2 == 0)
            {
                // Even number of items.
                return (sortedList[itemIndex] + sortedList[itemIndex - 1]) / 2;
            }
            else
            {
                // Odd number of items.
                return sortedList[itemIndex];
            }
        }
    }

    extension(IEnumerable<int> source)
    {
        public double Median() =>
            (from number in source select (double)number).Median();
    }

    extension<T>(IEnumerable<T> source)
    {
        public double Median(Func<T, double> selector) =>
            (from num in source select selector(num)).Median();

        public IEnumerable<T> AlternateElements()
        {
            int index = 0;
            foreach (T element in source)
            {
                if (index % 2 == 0)
                {
                    yield return element;
                }

                index++;
            }
        }
    }
}
```
The final extension block declares a generic extension block. The type parameter for the receiver is declared on the `extension` itself.

The preceding example declares one extension member in each extension block. In most cases, you create multiple extension members for the same receiver. In those cases, declare the extensions for those members in a single extension block.
