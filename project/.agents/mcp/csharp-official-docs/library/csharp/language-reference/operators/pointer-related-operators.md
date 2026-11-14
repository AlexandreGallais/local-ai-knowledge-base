---
title: "Pointer related operators - access memory and dereference memory locations (part 1 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/pointer-related-operators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Pointer related operators - take the address of variables, dereference storage locations, and access memory locations

The pointer operators enable you to take the address of a variable (`&`), dereference a pointer (`*`), compare pointer values, and add or subtract pointers and integers.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Use the following operators to work with pointers:

- Unary `&` (address-of) operator: to get the address of a variable
- Unary `*` (pointer indirection) operator: to get the variable pointed to by a pointer
- The `->` (member access) and `[]` (element access) operators
- Arithmetic operators `+`, `-`, `++`, and `--`
- Comparison operators `==`, `!=`, `<`, `>`, `<=`, and `>=`

For information about pointer types, see Pointer types.

> **Note:**
> Most operations with pointers require an unsafe context, and you must compile unsafe code with the **AllowUnsafeBlocks** compiler option.
> The memory safety preview feature available in C# 15 lets you use the address-of `&` operator outside an `unsafe` context. Even when enabled, the pointer indirection, member access, and element access operators that read or write the pointed-to memory still require an `unsafe` context.

##  Address-of operator &

The unary `&` operator returns the address of its operand:

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
The operand of the `&` operator must be a fixed variable. *Fixed* variables are variables that reside in storage locations the garbage collector doesn't affect. In the preceding example, the local variable `number` is a fixed variable because it resides on the stack. Variables that reside in storage locations the garbage collector can affect (for example, relocate) are called *movable* variables. Object fields and array elements are examples of movable variables. You can get the address of a movable variable if you "fix", or "pin", it by using a `fixed` statement. The obtained address is valid only inside the block of a `fixed` statement. The following example shows how to use a `fixed` statement and the `&` operator:

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
You can't get the address of a constant or a value.

For more information about fixed and movable variables, see the Fixed and moveable variables section of the C# language specification.

The binary `&` operator computes the logical AND of its Boolean operands or the bitwise logical AND of its integral operands.
