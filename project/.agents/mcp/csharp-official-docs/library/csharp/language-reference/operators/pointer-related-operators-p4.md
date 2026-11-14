---
title: "Pointer related operators - access memory and dereference memory locations (part 4 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/pointer-related-operators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Pointer related operators - access memory and dereference memory locations (part 4 of 4)

### Pointer increment and decrement

The `++` increment operator adds 1 to its pointer operand. The `--` decrement operator subtracts 1 from its pointer operand.

Both operators support two forms: postfix (`p++` and `p--`) and prefix (`++p` and `--p`). The result of `p++` and `p--` is the value of `p` *before* the operation. The result of `++p` and `--p` is the value of `p` *after* the operation.

The following example demonstrates the behavior of both postfix and prefix increment operators:

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
## Pointer comparison operators

You can use the `==`, `!=`, `<`, `>`, `<=`, and `>=` operators to compare operands of any pointer type, including `void*`. These operators compare the addresses given by the two operands as if they're unsigned integers.

For information about the behavior of those operators for operands of other types, see the Equality operators and Comparison operators articles.

## Operator precedence

The following list orders pointer related operators in groups starting from the highest precedence to the lowest:

- (Primary) operators: postfix increment `x++` and decrement `x--` operators and the `->` and `[]` operators.
- (Unary) operators: prefix increment `++x` and decrement `--x` operators and the address-of `&` and indirection `*` operators.
- (Additive) operators: binary `+` and `-` operators.
- (Relational and type-testing) operators: comparison `<`, `>`, `<=`, and `>=` operators.
- (Equality) operators: `==` and `!=` operators.

Use parentheses, `()`, to change the order of evaluation imposed by operator precedence.

For the complete list of C# operators ordered by precedence level, see the Operator precedence section of the C# operators article.

## Operator overloading

You can't overload the pointer-related operators `&`, `*`, `->`, and `[]` in a user-defined type.

## C# language specification

For more information, see the following sections of the C# language specification:

- Fixed and moveable variables
- The address-of operator
- Pointer indirection
- Pointer member access
- Pointer element access
- Pointer arithmetic
- Pointer increment and decrement
- Pointer comparison

## See also

- C# operators and expressions
- Unsafe code, pointer types, and function pointers
- unsafe keyword
- fixed statement
- stackalloc expression
- sizeof operator
