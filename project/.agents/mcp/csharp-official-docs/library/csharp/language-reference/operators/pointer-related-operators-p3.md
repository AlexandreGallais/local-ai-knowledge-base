---
title: "Pointer related operators - access memory and dereference memory locations (part 3 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/pointer-related-operators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Pointer related operators - access memory and dereference memory locations (part 3 of 4)

## Pointer arithmetic operators

You can perform the following arithmetic operations with pointers:

- Add or subtract an integral value to or from a pointer
- Subtract two pointers
- Increment or decrement a pointer

You can't perform those operations with pointers of type `void*`.

For information about supported arithmetic operations by using numeric types, see Arithmetic operators.

### Add or subtract an integral value to or from a pointer

For a pointer `p` of type `T*` and an expression `n` of a type implicitly convertible to `int`, `uint`, `long`, or `ulong`, addition and subtraction work as follows:

- Both `p + n` and `n + p` give you a pointer of type `T*`. You get this pointer by adding `n * sizeof(T)` to the address that `p` points to.
- The `p - n` expression gives you a pointer of type `T*`. You get this pointer by subtracting `n * sizeof(T)` from the address that `p` points to.

The `sizeof` operator gets the size of a type in bytes.

The following example shows how to use the `+` operator with a pointer:

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
### Pointer subtraction

For two pointers `p1` and `p2` of type `T*`, the expression `p1 - p2` gives you the difference between the addresses that `p1` and `p2` point to, divided by `sizeof(T)`. The result is of type `long`. In other words, `p1 - p2` is calculated as `((long)(p1) - (long)(p2)) / sizeof(T)`.

The following example shows pointer subtraction:

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
