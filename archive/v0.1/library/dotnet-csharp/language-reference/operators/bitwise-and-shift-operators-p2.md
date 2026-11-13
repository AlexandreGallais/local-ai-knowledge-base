---
title: "Bitwise and shift operators - perform boolean (AND, NOT, OR, XOR) and shift operations on individual bits in integral types (part 2 of 8)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/bitwise-and-shift-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Bitwise and shift operators - perform boolean (AND, NOT, OR, XOR) and shift operations on individual bits in integral types (part 2 of 8)

## Left-shift operator \<\<

The `<<` operator shifts its left-hand operand to the left by the number of bits specified by its right-hand operand. For more information about how the right-hand operand defines the shift count, see the Shift count of the shift operators section.

The left-shift operation discards the high-order bits that fall outside the range of the result type. It sets the low-order empty bit positions to zero, as the following example shows:

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
        // Shifted byte: 1111000100000000
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
        Console.WriteLine($"{Convert.ToString(b, toBase: 2)}");  // output: 1111000100000000

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
Because the shift operators are defined only for the `int`, `uint`, `long`, and `ulong` types, the result of an operation always contains at least 32 bits. If the left-hand operand uses another integral type (`sbyte`, `byte`, `short`, `ushort`, or `char`), the operation converts its value to the `int` type, as the following example shows:

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
        // Shifted byte: 1111000100000000
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
        Console.WriteLine($"{Convert.ToString(b, toBase: 2)}");  // output: 1111000100000000

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
