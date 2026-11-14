---
title: "Bitwise and shift operators - perform boolean (AND, NOT, OR, XOR) and shift operations on individual bits in integral types (part 1 of 8)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/bitwise-and-shift-operators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Bitwise and shift operators (C# reference)

The bitwise and shift operators include unary bitwise complement, binary left and right shift, unsigned right shift, and the binary logical AND, OR, and exclusive OR operators. These operators take operands of the integral numeric types or the char type.

- Unary `~` (bitwise complement) operator
- Binary `<<` (left shift), `>>` (right shift), and `>>>` (unsigned right shift) operators
- Binary `&` (logical AND), `|` (logical OR), and `^` (logical exclusive OR) operators

You can use these operators with the `int`, `uint`, `long`, `ulong`, `nint`, and `nuint` types. When both operands are of other integral types (`sbyte`, `byte`, `short`, `ushort`, or `char`), their values are converted to the `int` type, which is also the result type of an operation. When operands are of different integral types, their values are converted to the closest containing integral type. For more information, see the Numeric promotions section of the C# language specification. The compound operators (such as `>>=`) don't convert their arguments to `int` or have the result type as `int`.

The `&`, `|`, and `^` operators also work with operands of the `bool` type. For more information, see Boolean logical operators.

Bitwise and shift operations never cause overflow and produce the same results in checked and unchecked contexts.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## Bitwise complement operator ~

The `~` operator produces a bitwise complement of its operand by reversing each bit:

```csharp
﻿namespace operators;

public static class BitwiseAndShiftOperators
{
    public static void Examples()
    {
        Console.WriteLine("==== ~, &, ^, and | operators");
        BitwiseComplement();
        BitwiseAnd();
        BitwiseXor();
        BitwiseOr();

        Console.WriteLine("==== <<, >>, and >>> operators");
        LeftShift();
        RightShift();
        ShiftCount();
        UnsignedRightShift();

        Console.WriteLine("==== Additional examples");
        CompoundAssignment();
        CompoundAssignmentWithCast();
        Precedence();
    }

    private static void BitwiseComplement()
    {
        uint a = 0b_0000_1111_0000_1111_0000_1111_0000_1100;
        uint b = ~a;
        Console.WriteLine(Convert.ToString(b, toBase: 2));
        // Output:
        // 11110000111100001111000011110011
    }

    private static void BitwiseAnd()
    {
        uint a = 0b_1111_1000;
        uint b = 0b_1001_1101;
        uint c = a & b;
        Console.WriteLine(Convert.ToString(c, toBase: 2));
        // Output:
        // 10011000
    }

    private static void BitwiseXor()
    {
        uint a = 0b_1111_1000;
        uint b = 0b_0001_1100;
        uint c = a ^ b;
        Console.WriteLine(Convert.ToString(c, toBase: 2));
        // Output:
        // 11100100
    }

    private static void BitwiseOr()
    {
        uint a = 0b_1010_0000;
        uint b = 0b_1001_0001;
        uint c = a | b;
        Console.WriteLine(Convert.ToString(c, toBase: 2));
        // Output:
        // 10110001
    }

    private static void LeftShift()
    {
        uint x = 0b_1100_1001_0000_0000_0000_0000_0001_0001;
        Console.WriteLine($"Before: {Convert.ToString(x, toBase: 2)}");

        uint y = x << 4;
        Console.WriteLine($"After:  {Convert.ToString(y, toBase: 2)}");
        // Output:
        // Before: 11001001000000000000000000010001
        // After:  10010000000000000000000100010000

        byte a = 0b_1111_0001;

        var b = a << 8;
        Console.WriteLine(b.GetType());
        Console.WriteLine($"Shifted byte: {Convert.ToString(b, toBase: 2)}");
        // Output:
        // System.Int32
        // Shifted byte: <example-card-number>
    }

    private static void RightShift()
    {
        uint x = 0b_1001;
        Console.WriteLine($"Before: {Convert.ToString(x, toBase: 2), 4}");

        uint y = x >> 2;
        Console.WriteLine($"After:  {Convert.ToString(y, toBase: 2).PadLeft(4, '0'), 4}");
        // Output:
        // Before: 1001
        // After:  0010

        int a = int.MinValue;
        Console.WriteLine($"Before: {Convert.ToString(a, toBase: 2)}");

        int b = a >> 3;
        Console.WriteLine($"After:  {Convert.ToString(b, toBase: 2)}");
        // Output:
        // Before: 10000000000000000000000000000000
        // After:  11110000000000000000000000000000

        uint c = 0b_1000_0000_0000_0000_0000_0000_0000_0000;
        Console.WriteLine($"Before: {Convert.ToString(c, toBase: 2), 32}");

        uint d = c >> 3;
        Console.WriteLine($"After:  {Convert.ToString(d, toBase: 2).PadLeft(32, '0'), 32}");
        // Output:
        // Before: 10000000000000000000000000000000
        // After:  00010000000000000000000000000000
    }

    private static void UnsignedRightShift()
    {
        int x = -8;
        Console.WriteLine($"Before:    {x,11}, hex: {x,8:x}, binary: {Convert.ToString(x, toBase: 2), 32}");

        int y = x >> 2;
        Console.WriteLine($"After  >>: {y,11}, hex: {y,8:x}, binary: {Convert.ToString(y, toBase: 2), 32}");

        int z = x >>> 2;
        Console.WriteLine($"After >>>: {z,11}, hex: {z,8:x}, binary: {Convert.ToString(z, toBase: 2).PadLeft(32, '0'), 32}");
        // Output:
        // Before:             -8, hex: fffffff8, binary: 11111111111111111111111111111000
        // After  >>:          -2, hex: fffffffe, binary: 11111111111111111111111111111110
        // After >>>:  1073741822, hex: 3ffffffe, binary: 00111111111111111111111111111110
    }

    private static void ShiftCount()
    {
        int count1 = 0b_0000_0001;
        int count2 = 0b_1110_0001;

        int a = 0b_0001;
        Console.WriteLine($"{a} << {count1} is {a << count1}; {a} << {count2} is {a << count2}");
        // Output:
        // 1 << 1 is 2; 1 << 225 is 2

        int b = 0b_0100;
        Console.WriteLine($"{b} >> {count1} is {b >> count1}; {b} >> {count2} is {b >> count2}");
        // Output:
        // 4 >> 1 is 2; 4 >> 225 is 2

        int count = -31;
        int c = 0b_0001;
        Console.WriteLine($"{c} << {count} is {c << count}");
        // Output:
        // 1 << -31 is 2
    }

    private static void CompoundAssignment()
    {
        uint INITIAL_VALUE = 0b_1111_1000;
        
        uint a = INITIAL_VALUE;
        a &= 0b_1001_1101; 
        Display(a);  // output: 10011000

        a = INITIAL_VALUE;
        a |= 0b_0011_0001; 
        Display(a);  // output: 11111001

        a = INITIAL_VALUE;
        a ^= 0b_1000_0000;
        Display(a);  // output: 01111000

        a = INITIAL_VALUE;
        a <<= 2;
        Display(a);  // output: 1111100000

        a = INITIAL_VALUE;
        a >>= 4;
        Display(a);  // output: 00001111

        a = INITIAL_VALUE;
        a >>>= 4;
        Display(a);  // output: 00001111

        void Display(uint x) => Console.WriteLine($"{Convert.ToString(x, toBase: 2).PadLeft(8, '0'), 8}");
    }

    private static void CompoundAssignmentWithCast()
    {
        byte x = 0b_1111_0001;

        int b = x << 8;
        Console.WriteLine($"{Convert.ToString(b, toBase: 2)}");  // output: <example-card-number>

        x <<= 8;
        Console.WriteLine(x);  // output: 0
    }

    private static void Precedence()
    {
        uint a = 0b_1101;
        uint b = 0b_1001;
        uint c = 0b_1010;

        uint d1 = a | b & c;
        Display(d1);  // output: 1101

        uint d2 = (a | b) & c;
        Display(d2);  // output: 1000

        void Display(uint x) => Console.WriteLine($"{Convert.ToString(x, toBase: 2), 4}");
    }
}
```
You can also use the `~` symbol to declare finalizers. For more information, see Finalizers.
