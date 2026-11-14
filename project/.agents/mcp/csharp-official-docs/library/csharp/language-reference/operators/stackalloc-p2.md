---
title: "stackalloc expression - Allocate variable storage on the stack instead of the heap (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/stackalloc.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# stackalloc expression - Allocate variable storage on the stack instead of the heap (part 2 of 2)

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
In expression `stackalloc T[E]`, `T` must be an unmanaged type and `E` must evaluate to a non-negative int value. When you use the collection expression syntax to initialize the span, the compiler can use stack-allocated storage for a span if it doesn't violate ref safety.

## Security

Using `stackalloc` automatically turns on buffer overrun detection features in the common language runtime (CLR). If the runtime detects a buffer overrun, it terminates the process as quickly as possible to reduce the chance that malicious code runs.

## C# language specification

For more information, see the Stack allocation section of the C# language specification.

## See also

- C# operators and expressions
- Pointer related operators
- Pointer types
- Memory and span-related types
- Dos and Don'ts of stackalloc
