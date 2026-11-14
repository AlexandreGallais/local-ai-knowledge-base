---
title: "Unsafe code, pointers to data, and function pointers (part 3 of 5)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/unsafe-code.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Unsafe code, pointers to data, and function pointers (part 3 of 5)

### Fixed-size buffers

Arrays are reference types, so in safe code, a struct field that's an array stores only a reference to the array's elements, not the elements themselves. The size of the following `struct` doesn't depend on the number of elements in the array, because `pathName` is a reference:

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
To store the array's contents inside the struct itself, use the `fixed` keyword to declare a *fixed-size buffer*. The `fixed` keyword requires an `unsafe` context. Fixed-size buffers are useful when you write methods that interoperate with data sources from other languages or platforms. A fixed-size buffer can take any attributes or modifiers that are allowed for regular struct members. The only restriction is that the array type must be `bool`, `byte`, `char`, `short`, `int`, `long`, `sbyte`, `ushort`, `uint`, `ulong`, `float`, or `double`:

```csharp
private fixed char name[30];
```

In the following example, the `fixedBuffer` array has a fixed size. You use a `fixed` statement to get a pointer to the first element, then access the elements of the array through that pointer. The `fixed` statement pins the `fixedBuffer` instance field to a specific location in memory:

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
The size of the 128 element `char` array is 256 bytes. Fixed-size char buffers always take 2 bytes per character, regardless of the encoding. This array size is the same even when char buffers are marshaled to API methods or structs with `CharSet = CharSet.Auto` or `CharSet = CharSet.Ansi`. For more information, see `System.Runtime.InteropServices.CharSet`.

The preceding example demonstrates accessing `fixed` fields without pinning. Another common fixed-size array is the bool array. The elements in a `bool` array are always 1 byte in size. `bool` arrays aren't appropriate for creating bit arrays or buffers.

Fixed-size buffers are compiled with the `System.Runtime.CompilerServices.UnsafeValueTypeAttribute`, which instructs the common language runtime (CLR) that a type contains an unmanaged array that can potentially overflow. Memory allocated by using stackalloc also automatically enables buffer overrun detection features in the CLR. The preceding example shows how a fixed-size buffer could exist in an `unsafe struct`.

```csharp
internal unsafe struct Buffer
{
    public fixed char fixedBuffer[128];
}
```

The compiler-generated C# for `Buffer` is attributed as follows:

```csharp
internal struct Buffer
{
    [StructLayout(LayoutKind.Sequential, Size = 256)]
    [CompilerGenerated]
    [UnsafeValueType]
    public struct <fixedBuffer>e__FixedBuffer
    {
        public char FixedElementField;
    }

    [FixedBuffer(typeof(char), 128)]
    public <fixedBuffer>e__FixedBuffer fixedBuffer;
}
```

Fixed-size buffers differ from regular arrays in the following ways:

- You can only use them in an `unsafe` context.
- They can only be instance fields of structs.
- They're always vectors, or one-dimensional arrays.
- The declaration must include the length, such as `fixed char id[8]`. You can't use `fixed char id[]`.
