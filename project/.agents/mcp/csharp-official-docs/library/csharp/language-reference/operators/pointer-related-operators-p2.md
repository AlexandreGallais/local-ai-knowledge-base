---
title: "Pointer related operators - access memory and dereference memory locations (part 2 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/pointer-related-operators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Pointer related operators - access memory and dereference memory locations (part 2 of 4)

## Pointer indirection operator *

The unary pointer indirection operator `*` accesses the variable to which its operand points. It's also known as the dereference operator. The operand of the `*` operator must be of a pointer type.

```csharp
﻿namespace operators;

public static class PointerOperators
{
    public static void Examples()
    {
        AddressOf();
        PointerIndirection();
        PointerMemberAccessExample.Main();
        PointerElementAccess();
        PointerAddition();
        PointerSubtraction();
        Increment();
    }

    private static void AddressOf()
    {
        unsafe
        {
            int number = 27;
            int* pointerToNumber = &number;

            Console.WriteLine($"Value of the variable: {number}");
            Console.WriteLine($"Address of the variable: {(long)pointerToNumber:X}");
        }
        // Output is similar to:
        // Value of the variable: 27
        // Address of the variable: 6C1457DBD4
    }

    private static void AddressOfFixed()
    {
        unsafe
        {
            byte[] bytes = { 1, 2, 3 };
            fixed (byte* pointerToFirst = &bytes[0])
            {
                // The address stored in pointerToFirst
                // is valid only inside this fixed statement block.
            }
        }
    }

    private static void PointerIndirection()
    {
        unsafe
        {
            char letter = 'A';
            char* pointerToLetter = &letter;
            Console.WriteLine($"Value of the `letter` variable: {letter}");
            Console.WriteLine($"Address of the `letter` variable: {(long)pointerToLetter:X}");

            *pointerToLetter = 'Z';
            Console.WriteLine($"Value of the `letter` variable after update: {letter}");
        }
        // Output is similar to:
        // Value of the `letter` variable: A
        // Address of the `letter` variable: DCB977DDF4
        // Value of the `letter` variable after update: Z
    }

    public struct Coords
    {
        public int X;
        public int Y;
        public override string ToString() => $"({X}, {Y})";
    }

    public class PointerMemberAccessExample
    {
        public static unsafe void Main()
        {
            Coords coords;
            Coords* p = &coords;
            p->X = 3;
            p->Y = 4;
            Console.WriteLine(p->ToString());  // output: (3, 4)
        }
    }

    private static void PointerElementAccess()
    {
        unsafe
        {
            char* pointerToChars = stackalloc char[123];

            for (int i = 65; i < 123; i++)
            {
                pointerToChars[i] = (char)i;
            }

            Console.Write("Uppercase letters: ");
            for (int i = 65; i < 91; i++)
            {
                Console.Write(pointerToChars[i]);
            }
        }
        // Output:
        // Uppercase letters: ABCDEFGHIJKLMNOPQRSTUVWXYZ
        Console.WriteLine();
    }

    private static void PointerAddition()
    {
        unsafe
        {
            const int Count = 3;
            int[] numbers = new int[Count] { 10, 20, 30 };
            fixed (int* pointerToFirst = &numbers[0])
            {
                int* pointerToLast = pointerToFirst + (Count - 1);

                Console.WriteLine($"Value {*pointerToFirst} at address {(long)pointerToFirst}");
                Console.WriteLine($"Value {*pointerToLast} at address {(long)pointerToLast}");
            }
        }
        // Output is similar to:
        // Value 10 at address 1818345918136
        // Value 30 at address 1818345918144
    }

    private static void PointerSubtraction()
    {
        unsafe
        {
            int* numbers = stackalloc int[] { 0, 1, 2, 3, 4, 5 };
            int* p1 = &numbers[1];
            int* p2 = &numbers[5];
            Console.WriteLine(p2 - p1);  // output: 4
        }
    }

    private static void Increment()
    {
        unsafe
        {
            int* numbers = stackalloc int[] { 0, 1, 2 };
            int* p1 = &numbers[0];
            int* p2 = p1;
            Console.WriteLine($"Before operation: p1 - {(long)p1}, p2 - {(long)p2}");
            Console.WriteLine($"Postfix increment of p1: {(long)(p1++)}");
            Console.WriteLine($"Prefix increment of p2: {(long)(++p2)}");
            Console.WriteLine($"After operation: p1 - {(long)p1}, p2 - {(long)p2}");
        }
        // Output is similar to
        // Before operation: p1 - 816489946512, p2 - 816489946512
        // Postfix increment of p1: 816489946512
        // Prefix increment of p2: 816489946516
        // After operation: p1 - 816489946516, p2 - 816489946516
    }
}
```
You can't apply the `*` operator to an expression of type `void*`.

The binary `*` operator computes the product of its numeric operands.

## Pointer member access operator `->`

The `->` operator combines pointer indirection and member access. If `x` is a pointer of type `T*` and `y` is an accessible member of type `T`, an expression of the form

```csharp
x->y
```

is equivalent to

```csharp
(*x).y
```

The following example demonstrates the usage of the `->` operator:

```csharp
﻿namespace operators;

public static class PointerOperators
{
    public static void Examples()
    {
        AddressOf();
        PointerIndirection();
        PointerMemberAccessExample.Main();
        PointerElementAccess();
        PointerAddition();
        PointerSubtraction();
        Increment();
    }

    private static void AddressOf()
    {
        unsafe
        {
            int number = 27;
            int* pointerToNumber = &number;

            Console.WriteLine($"Value of the variable: {number}");
            Console.WriteLine($"Address of the variable: {(long)pointerToNumber:X}");
        }
        // Output is similar to:
        // Value of the variable: 27
        // Address of the variable: 6C1457DBD4
    }

    private static void AddressOfFixed()
    {
        unsafe
        {
            byte[] bytes = { 1, 2, 3 };
            fixed (byte* pointerToFirst = &bytes[0])
            {
                // The address stored in pointerToFirst
                // is valid only inside this fixed statement block.
            }
        }
    }

    private static void PointerIndirection()
    {
        unsafe
        {
            char letter = 'A';
            char* pointerToLetter = &letter;
            Console.WriteLine($"Value of the `letter` variable: {letter}");
            Console.WriteLine($"Address of the `letter` variable: {(long)pointerToLetter:X}");

            *pointerToLetter = 'Z';
            Console.WriteLine($"Value of the `letter` variable after update: {letter}");
        }
        // Output is similar to:
        // Value of the `letter` variable: A
        // Address of the `letter` variable: DCB977DDF4
        // Value of the `letter` variable after update: Z
    }

    public struct Coords
    {
        public int X;
        public int Y;
        public override string ToString() => $"({X}, {Y})";
    }

    public class PointerMemberAccessExample
    {
        public static unsafe void Main()
        {
            Coords coords;
            Coords* p = &coords;
            p->X = 3;
            p->Y = 4;
            Console.WriteLine(p->ToString());  // output: (3, 4)
        }
    }

    private static void PointerElementAccess()
    {
        unsafe
        {
            char* pointerToChars = stackalloc char[123];

            for (int i = 65; i < 123; i++)
            {
                pointerToChars[i] = (char)i;
            }

            Console.Write("Uppercase letters: ");
            for (int i = 65; i < 91; i++)
            {
                Console.Write(pointerToChars[i]);
            }
        }
        // Output:
        // Uppercase letters: ABCDEFGHIJKLMNOPQRSTUVWXYZ
        Console.WriteLine();
    }

    private static void PointerAddition()
    {
        unsafe
        {
            const int Count = 3;
            int[] numbers = new int[Count] { 10, 20, 30 };
            fixed (int* pointerToFirst = &numbers[0])
            {
                int* pointerToLast = pointerToFirst + (Count - 1);

                Console.WriteLine($"Value {*pointerToFirst} at address {(long)pointerToFirst}");
                Console.WriteLine($"Value {*pointerToLast} at address {(long)pointerToLast}");
            }
        }
        // Output is similar to:
        // Value 10 at address 1818345918136
        // Value 30 at address 1818345918144
    }

    private static void PointerSubtraction()
    {
        unsafe
        {
            int* numbers = stackalloc int[] { 0, 1, 2, 3, 4, 5 };
            int* p1 = &numbers[1];
            int* p2 = &numbers[5];
            Console.WriteLine(p2 - p1);  // output: 4
        }
    }

    private static void Increment()
    {
        unsafe
        {
            int* numbers = stackalloc int[] { 0, 1, 2 };
            int* p1 = &numbers[0];
            int* p2 = p1;
            Console.WriteLine($"Before operation: p1 - {(long)p1}, p2 - {(long)p2}");
            Console.WriteLine($"Postfix increment of p1: {(long)(p1++)}");
            Console.WriteLine($"Prefix increment of p2: {(long)(++p2)}");
            Console.WriteLine($"After operation: p1 - {(long)p1}, p2 - {(long)p2}");
        }
        // Output is similar to
        // Before operation: p1 - 816489946512, p2 - 816489946512
        // Postfix increment of p1: 816489946512
        // Prefix increment of p2: 816489946516
        // After operation: p1 - 816489946516, p2 - 816489946516
    }
}
```
You can't use the `->` operator on an expression of type `void*`.

## Pointer element access operator `[]`

For an expression `p` of a pointer type, a pointer element access of the form `p[n]` is evaluated as `*(p + n)`. The value `n` must be of a type implicitly convertible to `int`, `uint`, `long`, or `ulong`. For information about the behavior of the `+` operator with pointers, see the Addition or subtraction of an integral value to or from a pointer section.

The following example demonstrates how to access array elements by using a pointer and the `[]` operator:

```csharp
﻿namespace operators;

public static class PointerOperators
{
    public static void Examples()
    {
        AddressOf();
        PointerIndirection();
        PointerMemberAccessExample.Main();
        PointerElementAccess();
        PointerAddition();
        PointerSubtraction();
        Increment();
    }

    private static void AddressOf()
    {
        unsafe
        {
            int number = 27;
            int* pointerToNumber = &number;

            Console.WriteLine($"Value of the variable: {number}");
            Console.WriteLine($"Address of the variable: {(long)pointerToNumber:X}");
        }
        // Output is similar to:
        // Value of the variable: 27
        // Address of the variable: 6C1457DBD4
    }

    private static void AddressOfFixed()
    {
        unsafe
        {
            byte[] bytes = { 1, 2, 3 };
            fixed (byte* pointerToFirst = &bytes[0])
            {
                // The address stored in pointerToFirst
                // is valid only inside this fixed statement block.
            }
        }
    }

    private static void PointerIndirection()
    {
        unsafe
        {
            char letter = 'A';
            char* pointerToLetter = &letter;
            Console.WriteLine($"Value of the `letter` variable: {letter}");
            Console.WriteLine($"Address of the `letter` variable: {(long)pointerToLetter:X}");

            *pointerToLetter = 'Z';
            Console.WriteLine($"Value of the `letter` variable after update: {letter}");
        }
        // Output is similar to:
        // Value of the `letter` variable: A
        // Address of the `letter` variable: DCB977DDF4
        // Value of the `letter` variable after update: Z
    }

    public struct Coords
    {
        public int X;
        public int Y;
        public override string ToString() => $"({X}, {Y})";
    }

    public class PointerMemberAccessExample
    {
        public static unsafe void Main()
        {
            Coords coords;
            Coords* p = &coords;
            p->X = 3;
            p->Y = 4;
            Console.WriteLine(p->ToString());  // output: (3, 4)
        }
    }

    private static void PointerElementAccess()
    {
        unsafe
        {
            char* pointerToChars = stackalloc char[123];

            for (int i = 65; i < 123; i++)
            {
                pointerToChars[i] = (char)i;
            }

            Console.Write("Uppercase letters: ");
            for (int i = 65; i < 91; i++)
            {
                Console.Write(pointerToChars[i]);
            }
        }
        // Output:
        // Uppercase letters: ABCDEFGHIJKLMNOPQRSTUVWXYZ
        Console.WriteLine();
    }

    private static void PointerAddition()
    {
        unsafe
        {
            const int Count = 3;
            int[] numbers = new int[Count] { 10, 20, 30 };
            fixed (int* pointerToFirst = &numbers[0])
            {
                int* pointerToLast = pointerToFirst + (Count - 1);

                Console.WriteLine($"Value {*pointerToFirst} at address {(long)pointerToFirst}");
                Console.WriteLine($"Value {*pointerToLast} at address {(long)pointerToLast}");
            }
        }
        // Output is similar to:
        // Value 10 at address 1818345918136
        // Value 30 at address 1818345918144
    }

    private static void PointerSubtraction()
    {
        unsafe
        {
            int* numbers = stackalloc int[] { 0, 1, 2, 3, 4, 5 };
            int* p1 = &numbers[1];
            int* p2 = &numbers[5];
            Console.WriteLine(p2 - p1);  // output: 4
        }
    }

    private static void Increment()
    {
        unsafe
        {
            int* numbers = stackalloc int[] { 0, 1, 2 };
            int* p1 = &numbers[0];
            int* p2 = p1;
            Console.WriteLine($"Before operation: p1 - {(long)p1}, p2 - {(long)p2}");
            Console.WriteLine($"Postfix increment of p1: {(long)(p1++)}");
            Console.WriteLine($"Prefix increment of p2: {(long)(++p2)}");
            Console.WriteLine($"After operation: p1 - {(long)p1}, p2 - {(long)p2}");
        }
        // Output is similar to
        // Before operation: p1 - 816489946512, p2 - 816489946512
        // Postfix increment of p1: 816489946512
        // Prefix increment of p2: 816489946516
        // After operation: p1 - 816489946516, p2 - 816489946516
    }
}
```
In the preceding example, a `stackalloc` expression allocates a block of memory on the stack.

> **Note:**
> The pointer element access operator doesn't check for out-of-bounds errors.

You can't use `[]` for pointer element access with an expression of type `void*`.

You can also use the `[]` operator for array element or indexer access.
