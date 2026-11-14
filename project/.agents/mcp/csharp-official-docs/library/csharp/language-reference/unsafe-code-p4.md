---
title: "Unsafe code, pointers to data, and function pointers (part 4 of 5)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/unsafe-code.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Unsafe code, pointers to data, and function pointers (part 4 of 5)

### Function pointers

C# provides `delegate` types to define safe function pointer objects. Invoking a delegate involves instantiating a type derived from `System.Delegate` and making a virtual method call to its `Invoke` method. This virtual call uses the `callvirt` IL instruction. In performance critical code paths, using the `calli` IL instruction is more efficient.

You can define a function pointer by using the `delegate*` syntax. The compiler calls the function by using the `calli` instruction rather than instantiating a `delegate` object and calling `Invoke`. The following code declares two methods that use a `delegate` or a `delegate*` to combine two objects of the same type. The first method uses a `System.Func`3` delegate type. The second method uses a `delegate*` declaration with the same parameters and return type:

```csharp
﻿namespace UnsafeCodePointers;

public class FunctionPointers
{
    public static void PointerExamples()
    {
        int sum = Combine((x, y) => x + y, 3, 4);
        Console.WriteLine(sum);

        Console.WriteLine();

        int product = 0;
        unsafe
        {
            static int localMultiply(int x, int y) => x * y;
            product = UnsafeCombine(&localMultiply, 3, 4);
        }
        Console.WriteLine(product);
    }

    public static T Combine<T>(Func<T, T, T> combinator, T left, T right) => 
        combinator(left, right);

    public static unsafe T UnsafeCombine<T>(delegate*<T, T, T> combinator, T left, T right) => 
        combinator(left, right);

    public static unsafe T ManagedCombine<T>(delegate* managed<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T CDeclCombine<T>(delegate* unmanaged[Cdecl]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T StdcallCombine<T>(delegate* unmanaged[Stdcall]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T FastcallCombine<T>(delegate* unmanaged[Fastcall]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T ThiscallCombine<T>(delegate* unmanaged[Thiscall]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T UnmanagedCombine<T>(delegate* unmanaged<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
}
```
The following code shows how you declare a static local function and invoke the `UnsafeCombine` method by using a pointer to that local function:

```csharp
﻿namespace UnsafeCodePointers;

public class FunctionPointers
{
    public static void PointerExamples()
    {
        int sum = Combine((x, y) => x + y, 3, 4);
        Console.WriteLine(sum);

        Console.WriteLine();

        int product = 0;
        unsafe
        {
            static int localMultiply(int x, int y) => x * y;
            product = UnsafeCombine(&localMultiply, 3, 4);
        }
        Console.WriteLine(product);
    }

    public static T Combine<T>(Func<T, T, T> combinator, T left, T right) => 
        combinator(left, right);

    public static unsafe T UnsafeCombine<T>(delegate*<T, T, T> combinator, T left, T right) => 
        combinator(left, right);

    public static unsafe T ManagedCombine<T>(delegate* managed<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T CDeclCombine<T>(delegate* unmanaged[Cdecl]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T StdcallCombine<T>(delegate* unmanaged[Stdcall]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T FastcallCombine<T>(delegate* unmanaged[Fastcall]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T ThiscallCombine<T>(delegate* unmanaged[Thiscall]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T UnmanagedCombine<T>(delegate* unmanaged<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
}
```
The preceding code illustrates several of the rules on the function accessed as a function pointer:

- You can only declare function pointers in an `unsafe` context.
- You can only call methods that take a `delegate*` (or return a `delegate*`) in an `unsafe` context.
- The `&` operator to obtain the address of a function is allowed only on `static` functions. This rule applies to both member functions and local functions.

The syntax has parallels with declaring `delegate` types and using pointers. The `*` suffix on `delegate` indicates the declaration is a *function pointer*. The `&` when assigning a method group to a function pointer indicates the operation takes the address of the method.

You can specify the calling convention for a `delegate*` by using the keywords `managed` and `unmanaged`. In addition, for `unmanaged` function pointers, you can specify the calling convention. The following declarations show examples of each. The first declaration uses the `managed` calling convention, which is the default. The next four use an `unmanaged` calling convention. Each specifies one of the ECMA 335 calling conventions: `Cdecl`, `Stdcall`, `Fastcall`, or `Thiscall`. The last declaration uses the `unmanaged` calling convention, instructing the CLR to pick the default calling convention for the platform. The CLR chooses the calling convention at run time.

```csharp
﻿namespace UnsafeCodePointers;

public class FunctionPointers
{
    public static void PointerExamples()
    {
        int sum = Combine((x, y) => x + y, 3, 4);
        Console.WriteLine(sum);

        Console.WriteLine();

        int product = 0;
        unsafe
        {
            static int localMultiply(int x, int y) => x * y;
            product = UnsafeCombine(&localMultiply, 3, 4);
        }
        Console.WriteLine(product);
    }

    public static T Combine<T>(Func<T, T, T> combinator, T left, T right) => 
        combinator(left, right);

    public static unsafe T UnsafeCombine<T>(delegate*<T, T, T> combinator, T left, T right) => 
        combinator(left, right);

    public static unsafe T ManagedCombine<T>(delegate* managed<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T CDeclCombine<T>(delegate* unmanaged[Cdecl]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T StdcallCombine<T>(delegate* unmanaged[Stdcall]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T FastcallCombine<T>(delegate* unmanaged[Fastcall]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T ThiscallCombine<T>(delegate* unmanaged[Thiscall]<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
    public static unsafe T UnmanagedCombine<T>(delegate* unmanaged<T, T, T> combinator, T left, T right) =>
        combinator(left, right);
}
```
You can learn more about function pointers in the Function pointers section of the C# language specification.

### Example: Use pointers to copy an array of bytes

The following example uses pointers to copy bytes from one array to another.

This example uses the `unsafe` keyword, which enables you to use pointers in the `Copy` method. The `fixed` statement declares pointers to the source and destination arrays. The `fixed` statement *pins* the location of the source and destination arrays in memory so that garbage collection doesn't move the arrays. The `fixed` block pins the memory blocks for the arrays in the scope of the block. Because the `Copy` method in this example uses the `unsafe` keyword, you must compile it by using the **AllowUnsafeBlocks** compiler option.

This example accesses the elements of both arrays by using indices rather than a second unmanaged pointer. The declaration of the `pSource` and `pTarget` pointers pins the arrays.

```csharp
﻿namespace UnsafeCodePointers;

public static class FixedKeywordExamples
{
    public static void Examples()
    {
        PointerTypes();
        AccessEmbeddedArray();
        UnsafeCopyArrays();
    }

    private static void PointerTypes()
    {
        // Normal pointer to an object.
        int[] a = [10, 20, 30, 40, 50];
        // Must be in unsafe code to use interior pointers.
        unsafe
        {
            // Must pin object on heap so that it doesn't move while using interior pointers.
            fixed (int* p = &a[0])
            {
                // p is pinned as well as object, so create another pointer to show incrementing it.
                int* p2 = p;
                Console.WriteLine(*p2);
                // Incrementing p2 bumps the pointer by four bytes due to its type ...
                p2 += 1;
                Console.WriteLine(*p2);
                p2 += 1;
                Console.WriteLine(*p2);
                Console.WriteLine("--------");
                Console.WriteLine(*p);
                // Dereferencing p and incrementing changes the value of a[0] ...
                *p += 1;
                Console.WriteLine(*p);
                *p += 1;
                Console.WriteLine(*p);
            }
        }

        Console.WriteLine("--------");
        Console.WriteLine(a[0]);

        /*
        Output:
        10
        20
        30
        --------
        10
        11
        12
        --------
        12
        */
    }

    public struct PathArray
    {
        public char[] pathName;
        private int reserved;
    }

    internal unsafe struct Buffer
    {
        public fixed char fixedBuffer[128];
    }

    internal unsafe class Example
    {
        public Buffer buffer = default;
    }

    private static void AccessEmbeddedArray()
    {
        var example = new Example();

        unsafe
        {
            // Pin the buffer to a fixed location in memory.
            fixed (char* charPtr = example.buffer.fixedBuffer)
            {
                *charPtr = 'A';
            }
            // Access safely through the index:
            char c = example.buffer.fixedBuffer[0];
            Console.WriteLine(c);

            // Modify through the index:
            example.buffer.fixedBuffer[0] = 'B';
            Console.WriteLine(example.buffer.fixedBuffer[0]);
        }
    }

    static unsafe void Copy(byte[] source, int sourceOffset, byte[] target,
        int targetOffset, int count)
    {
        // If either array is not instantiated, you cannot complete the copy.
        if ((source == null) || (target == null))
        {
            throw new System.ArgumentException("source or target is null");
        }

        // If either offset, or the number of bytes to copy, is negative, you
        // cannot complete the copy.
        if ((sourceOffset < 0) || (targetOffset < 0) || (count < 0))
        {
            throw new System.ArgumentException("offset or bytes to copy is negative");
        }

        // If the number of bytes from the offset to the end of the array is
        // less than the number of bytes you want to copy, you cannot complete
        // the copy.
        if ((source.Length - sourceOffset < count) ||
            (target.Length - targetOffset < count))
        {
            throw new System.ArgumentException("offset to end of array is less than bytes to be copied");
        }

        // The following fixed statement pins the location of the source and
        // target objects in memory so that they will not be moved by garbage
        // collection.
        fixed (byte* pSource = source, pTarget = target)
        {
            // Copy the specified number of bytes from source to target.
            for (int i = 0; i < count; i++)
            {
                pTarget[targetOffset + i] = pSource[sourceOffset + i];
            }
        }
    }

    static void UnsafeCopyArrays()
    {
        // Create two arrays of the same length.
        int length = 100;
        byte[] byteArray1 = new byte[length];
        byte[] byteArray2 = new byte[length];

        // Fill byteArray1 with 0 - 99.
        for (int i = 0; i < length; ++i)
        {
            byteArray1[i] = (byte)i;
        }

        // Display the first 10 elements in byteArray1.
        System.Console.WriteLine("The first 10 elements of the original are:");
        for (int i = 0; i < 10; ++i)
        {
            System.Console.Write(byteArray1[i] + " ");
        }
        System.Console.WriteLine("\n");

        // Copy the contents of byteArray1 to byteArray2.
        Copy(byteArray1, 0, byteArray2, 0, length);

        // Display the first 10 elements in the copy, byteArray2.
        System.Console.WriteLine("The first 10 elements of the copy are:");
        for (int i = 0; i < 10; ++i)
        {
            System.Console.Write(byteArray2[i] + " ");
        }
        System.Console.WriteLine("\n");

        // Copy the contents of the last 10 elements of byteArray1 to the
        // beginning of byteArray2.
        // The offset specifies where the copying begins in the source array.
        int offset = length - 10;
        Copy(byteArray1, offset, byteArray2, 0, length - offset);

        // Display the first 10 elements in the copy, byteArray2.
        System.Console.WriteLine("The first 10 elements of the copy are:");
        for (int i = 0; i < 10; ++i)
        {
            System.Console.Write(byteArray2[i] + " ");
        }
        System.Console.WriteLine("\n");
        /* Output:
            The first 10 elements of the original are:
            0 1 2 3 4 5 6 7 8 9

            The first 10 elements of the copy are:
            0 1 2 3 4 5 6 7 8 9

            The first 10 elements of the copy are:
            90 91 92 93 94 95 96 97 98 99
        */
    }
}
```
