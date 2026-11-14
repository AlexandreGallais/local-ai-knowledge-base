---
title: "stackalloc expression - Allocate variable storage on the stack instead of the heap (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/stackalloc.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# stackalloc expression (C# reference)

A `stackalloc` expression allocates a block of memory on the stack. A stack-allocated memory block created during the method execution is automatically discarded when that method returns. You can't explicitly free the memory allocated by `stackalloc`. A stack-allocated memory block isn't subject to garbage collection and doesn't need to be pinned by a `fixed` statement.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

You can assign the result of a `stackalloc` expression to a variable of one of the following types:

- `System.Span`1` or `System.ReadOnlySpan`1`, as the following example shows:

```csharp
﻿namespace operators;

public static class StackallocOperator
{
    public static void Examples()
    {
        StackallocInNestedExpressions();
    }

    private static void AssignToPointer()
    {
        unsafe
        {
            int length = 3;
            int* numbers = stackalloc int[length];
            for (var i = 0; i < length; i++)
            {
                numbers[i] = i;
            }
        }
    }

    private static void AssignToSpan()
    {
        int length = 3;
        Span<int> numbers = stackalloc int[length];
        for (var i = 0; i < length; i++)
        {
            numbers[i] = i;
        }
    }

    private static void AsExpression()
    {
        int length = 1000;
        Span<byte> buffer = length >= 0 && length <= 1024 ? stackalloc byte[length] : new byte[length];
    }

    private static void StackallocInit()
    {
        Span<int> first = stackalloc int[3] { 1, 2, 3 };
        Span<int> second = stackalloc int[] { 1, 2, 3 };
        ReadOnlySpan<int> third = stackalloc[] { 1, 2, 3 };

        // Using collection expressions:
        Span<int> fourth = [1, 2, 3];
        ReadOnlySpan<int> fifth = [1, 2, 3];
    }

    private static void StackallocInNestedExpressions()
    {
        Span<int> numbers = stackalloc[] { 1, 2, 3, 4, 5, 6 };
        var ind = numbers.IndexOfAny(stackalloc[] { 2, 4, 6, 8 });
        Console.WriteLine(ind);  // output: 1

        Span<int> numbers2 = [1, 2, 3, 4, 5, 6];
        var ind2 = numbers2.IndexOfAny([2, 4, 6, 8]);
        Console.WriteLine(ind2);  // output: 1
    }

    private static void LimitStackAllocatedMemory(int inputLength)
    {
        const int MaxStackLimit = 1024;
        Span<byte> buffer = inputLength >= 0 && inputLength <= MaxStackLimit ? stackalloc byte[inputLength] : new byte[inputLength];
    }
}
```
  > **Caution:**
  > This pattern applies a cap only to the `stackalloc` branch of the expression. If the application requires a cap on the `new T[...]` branch of the expression (e.g., to avoid unwanted creation of a one billion-element array), the caller must perform that length check separately.

  You don't need to use an unsafe context when you assign a stack-allocated memory block to a `System.Span`1` or `System.ReadOnlySpan`1` variable.

  When you work with those types, you can use a `stackalloc` expression in conditional or assignment expressions, as the following example shows:

```csharp
﻿namespace operators;

public static class StackallocOperator
{
    public static void Examples()
    {
        StackallocInNestedExpressions();
    }

    private static void AssignToPointer()
    {
        unsafe
        {
            int length = 3;
            int* numbers = stackalloc int[length];
            for (var i = 0; i < length; i++)
            {
                numbers[i] = i;
            }
        }
    }

    private static void AssignToSpan()
    {
        int length = 3;
        Span<int> numbers = stackalloc int[length];
        for (var i = 0; i < length; i++)
        {
            numbers[i] = i;
        }
    }

    private static void AsExpression()
    {
        int length = 1000;
        Span<byte> buffer = length >= 0 && length <= 1024 ? stackalloc byte[length] : new byte[length];
    }

    private static void StackallocInit()
    {
        Span<int> first = stackalloc int[3] { 1, 2, 3 };
        Span<int> second = stackalloc int[] { 1, 2, 3 };
        ReadOnlySpan<int> third = stackalloc[] { 1, 2, 3 };

        // Using collection expressions:
        Span<int> fourth = [1, 2, 3];
        ReadOnlySpan<int> fifth = [1, 2, 3];
    }

    private static void StackallocInNestedExpressions()
    {
        Span<int> numbers = stackalloc[] { 1, 2, 3, 4, 5, 6 };
        var ind = numbers.IndexOfAny(stackalloc[] { 2, 4, 6, 8 });
        Console.WriteLine(ind);  // output: 1

        Span<int> numbers2 = [1, 2, 3, 4, 5, 6];
        var ind2 = numbers2.IndexOfAny([2, 4, 6, 8]);
        Console.WriteLine(ind2);  // output: 1
    }

    private static void LimitStackAllocatedMemory(int inputLength)
    {
        const int MaxStackLimit = 1024;
        Span<byte> buffer = inputLength >= 0 && inputLength <= MaxStackLimit ? stackalloc byte[inputLength] : new byte[inputLength];
    }
}
```
  You can use a `stackalloc` expression or a collection expression inside other expressions whenever a `System.Span`1` or `System.ReadOnlySpan`1` variable is allowed, as the following example shows:

```csharp
﻿namespace operators;

public static class StackallocOperator
{
    public static void Examples()
    {
        StackallocInNestedExpressions();
    }

    private static void AssignToPointer()
    {
        unsafe
        {
            int length = 3;
            int* numbers = stackalloc int[length];
            for (var i = 0; i < length; i++)
            {
                numbers[i] = i;
            }
        }
    }

    private static void AssignToSpan()
    {
        int length = 3;
        Span<int> numbers = stackalloc int[length];
        for (var i = 0; i < length; i++)
        {
            numbers[i] = i;
        }
    }

    private static void AsExpression()
    {
        int length = 1000;
        Span<byte> buffer = length >= 0 && length <= 1024 ? stackalloc byte[length] : new byte[length];
    }

    private static void StackallocInit()
    {
        Span<int> first = stackalloc int[3] { 1, 2, 3 };
        Span<int> second = stackalloc int[] { 1, 2, 3 };
        ReadOnlySpan<int> third = stackalloc[] { 1, 2, 3 };

        // Using collection expressions:
        Span<int> fourth = [1, 2, 3];
        ReadOnlySpan<int> fifth = [1, 2, 3];
    }

    private static void StackallocInNestedExpressions()
    {
        Span<int> numbers = stackalloc[] { 1, 2, 3, 4, 5, 6 };
        var ind = numbers.IndexOfAny(stackalloc[] { 2, 4, 6, 8 });
        Console.WriteLine(ind);  // output: 1

        Span<int> numbers2 = [1, 2, 3, 4, 5, 6];
        var ind2 = numbers2.IndexOfAny([2, 4, 6, 8]);
        Console.WriteLine(ind2);  // output: 1
    }

    private static void LimitStackAllocatedMemory(int inputLength)
    {
        const int MaxStackLimit = 1024;
        Span<byte> buffer = inputLength >= 0 && inputLength <= MaxStackLimit ? stackalloc byte[inputLength] : new byte[inputLength];
    }
}
```
  > **Note:**
  > Use `System.Span`1` or `System.ReadOnlySpan`1` types to work with stack-allocated memory whenever possible.

- A pointer type, as the following example shows:

```csharp
﻿namespace operators;

public static class StackallocOperator
{
    public static void Examples()
    {
        StackallocInNestedExpressions();
    }

    private static void AssignToPointer()
    {
        unsafe
        {
            int length = 3;
            int* numbers = stackalloc int[length];
            for (var i = 0; i < length; i++)
            {
                numbers[i] = i;
            }
        }
    }

    private static void AssignToSpan()
    {
        int length = 3;
        Span<int> numbers = stackalloc int[length];
        for (var i = 0; i < length; i++)
        {
            numbers[i] = i;
        }
    }

    private static void AsExpression()
    {
        int length = 1000;
        Span<byte> buffer = length >= 0 && length <= 1024 ? stackalloc byte[length] : new byte[length];
    }

    private static void StackallocInit()
    {
        Span<int> first = stackalloc int[3] { 1, 2, 3 };
        Span<int> second = stackalloc int[] { 1, 2, 3 };
        ReadOnlySpan<int> third = stackalloc[] { 1, 2, 3 };

        // Using collection expressions:
        Span<int> fourth = [1, 2, 3];
        ReadOnlySpan<int> fifth = [1, 2, 3];
    }

    private static void StackallocInNestedExpressions()
    {
        Span<int> numbers = stackalloc[] { 1, 2, 3, 4, 5, 6 };
        var ind = numbers.IndexOfAny(stackalloc[] { 2, 4, 6, 8 });
        Console.WriteLine(ind);  // output: 1

        Span<int> numbers2 = [1, 2, 3, 4, 5, 6];
        var ind2 = numbers2.IndexOfAny([2, 4, 6, 8]);
        Console.WriteLine(ind2);  // output: 1
    }

    private static void LimitStackAllocatedMemory(int inputLength)
    {
        const int MaxStackLimit = 1024;
        Span<byte> buffer = inputLength >= 0 && inputLength <= MaxStackLimit ? stackalloc byte[inputLength] : new byte[inputLength];
    }
}
```
  You must use an `unsafe` context when you work with pointer types.

  > **Note:**
  > The memory safety preview feature available in C# 15 lets you convert a `stackalloc` expression to a pointer outside an `unsafe` context. Operations that access the allocated memory through the pointer still require an `unsafe` context.

  For pointer types, you can use a `stackalloc` expression only in a local variable declaration to initialize the variable.

The amount of memory available on the stack is limited. If you allocate too much memory on the stack, a `System.StackOverflowException` is thrown. To avoid that exception, follow these rules:

- Limit the amount of memory you allocate by using `stackalloc`. For example, if the intended buffer size is below a certain limit, allocate the memory on the stack. Otherwise, use an array of the required length, as the following code shows:

```csharp
﻿namespace operators;

public static class StackallocOperator
{
    public static void Examples()
    {
        StackallocInNestedExpressions();
    }

    private static void AssignToPointer()
    {
        unsafe
        {
            int length = 3;
            int* numbers = stackalloc int[length];
            for (var i = 0; i < length; i++)
            {
                numbers[i] = i;
            }
        }
    }

    private static void AssignToSpan()
    {
        int length = 3;
        Span<int> numbers = stackalloc int[length];
        for (var i = 0; i < length; i++)
        {
            numbers[i] = i;
        }
    }

    private static void AsExpression()
    {
        int length = 1000;
        Span<byte> buffer = length >= 0 && length <= 1024 ? stackalloc byte[length] : new byte[length];
    }

    private static void StackallocInit()
    {
        Span<int> first = stackalloc int[3] { 1, 2, 3 };
        Span<int> second = stackalloc int[] { 1, 2, 3 };
        ReadOnlySpan<int> third = stackalloc[] { 1, 2, 3 };

        // Using collection expressions:
        Span<int> fourth = [1, 2, 3];
        ReadOnlySpan<int> fifth = [1, 2, 3];
    }

    private static void StackallocInNestedExpressions()
    {
        Span<int> numbers = stackalloc[] { 1, 2, 3, 4, 5, 6 };
        var ind = numbers.IndexOfAny(stackalloc[] { 2, 4, 6, 8 });
        Console.WriteLine(ind);  // output: 1

        Span<int> numbers2 = [1, 2, 3, 4, 5, 6];
        var ind2 = numbers2.IndexOfAny([2, 4, 6, 8]);
        Console.WriteLine(ind2);  // output: 1
    }

    private static void LimitStackAllocatedMemory(int inputLength)
    {
        const int MaxStackLimit = 1024;
        Span<byte> buffer = inputLength >= 0 && inputLength <= MaxStackLimit ? stackalloc byte[inputLength] : new byte[inputLength];
    }
}
```
  > **Note:**
  > Because the amount of memory available on the stack depends on the environment in which the code runs, be conservative when you define the actual limit value.

- Avoid using `stackalloc` inside loops. Allocate the memory block outside a loop and reuse it inside the loop.

- Do not provide negative lengths to the `stackalloc` operator. If the length is derived from user input, ensure that the call site _both_ forbids negative values _and_ caps the maximum allowed value, as shown in the above examples. A negative length passed to `new T[...]` will result in a catchable `System.OverflowException` rather than a fatal StackOverflowException.

The content of the newly allocated memory is undefined. You should initialize it before it's used, either with a `stackalloc` initializer or a method like `System.Span`1.Clear*`.

> **Important:**
> Not initializing memory allocated by `stackalloc` is an important difference from the `new` operator. Memory allocated by using the `new` operator is initialized to the 0 bit pattern.

You can use array initializer syntax to define the content of the newly allocated memory. The following example demonstrates various ways to do that:
