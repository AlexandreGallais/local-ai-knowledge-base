---
title: "Unsafe code, pointers to data, and function pointers (part 2 of 5)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/unsafe-code.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Unsafe code, pointers to data, and function pointers (part 2 of 5)

## The original unsafe model

In the original model, the `unsafe` keyword establishes an unsafe context on a type, a member, or a block, and that context unlocks the pointer features described in the following sections. The `unsafe` modifier changes only what the marked code can do; it places no requirement on callers. To compile any of these examples, set the **AllowUnsafeBlocks** compiler option.

### Pointer types

In an unsafe context, a type can be a pointer type, in addition to a value type or a reference type. A pointer type declaration takes one of the following forms:

```csharp
type* identifier;
void* identifier; //allowed but not recommended
```

The type you specify before the `*` in a pointer type is the **referent type**.

Pointer types don't inherit from object, and no conversions exist between pointer types and `object`. Also, boxing and unboxing don't support pointers. However, you can convert between different pointer types and between pointer types and integral types.

When you declare multiple pointers in the same declaration, write the asterisk (`*`) together with the underlying type only. It isn't used as a prefix to each pointer name. For example:

```csharp
int* p1, p2, p3;   // Ok
int *p1, *p2, *p3;   // Invalid in C#
```

The garbage collector doesn't keep track of whether an object is being pointed to by any pointer types. If the referent is an object in the managed heap (including local variables captured by lambda expressions or anonymous delegates), you must pin the object for as long as the pointer is used.

The value of the pointer variable of type `MyType*` is the address of a variable of type `MyType`. The following are examples of pointer type declarations:

- `int* p`: `p` is a pointer to an integer.
- `int** p`: `p` is a pointer to a pointer to an integer.
- `int*[] p`: `p` is a single-dimensional array of pointers to integers.
- `char* p`: `p` is a pointer to a char.
- `void* p`: `p` is a pointer to an unknown type.

You can use the pointer indirection operator `*` to access the contents at the location pointed to by the pointer variable. For example, consider the following declaration:

```csharp
int* myVariable;
```

The expression `*myVariable` denotes the `int` variable found at the address contained in `myVariable`.

There are several examples of pointers in the articles on the `fixed` statement. The following example uses the `unsafe` keyword and the `fixed` statement, and shows how to increment an interior pointer. You can paste this code into the Main function of a console application to run it. These examples must be compiled with the **AllowUnsafeBlocks** compiler option set.

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
You can't apply the indirection operator to a pointer of type `void*`. However, you can use a cast to convert a void pointer to any other pointer type, and vice versa.

A pointer can be `null`. Applying the indirection operator to a null pointer causes an implementation-defined behavior.

Passing pointers between methods can cause undefined behavior. Consider a method that returns a pointer to a local variable through an `in`, `out`, or `ref` parameter or as the function result. If the pointer was set in a fixed block, the variable to which it points might no longer be fixed.

The following table lists the operators and statements that can operate on pointers in an unsafe context:

| Operator/Statement                       | Use                                                            |
|------------------------------------------|----------------------------------------------------------------|
| `*`                                      | Performs pointer indirection.                                  |
| `->`                                     | Accesses a member of a struct through a pointer.               |
| `[]`                                     | Indexes a pointer.                                             |
| `&`                                      | Obtains the address of a variable.                             |
| `++` and `--`                            | Increments and decrements pointers.                            |
| `+` and `-`                              | Performs pointer arithmetic.                                   |
| `==`, `!=`, `<`, `>`, `<=`, and `>=`     | Compares pointers.                                             |
| `stackalloc`  | Allocates memory on the stack.                                 |
| `fixed` statement | Temporarily fixes a variable so that its address can be found. |

For more information about pointer-related operators, see Pointer-related operators.

Any pointer type can be implicitly converted to a `void*` type. Any pointer type can be assigned the value `null`. You can explicitly convert any pointer type to any other pointer type using a cast expression. You can also convert any integral type to a pointer type, or any pointer type to an integral type. These conversions require an explicit cast.

The following example converts an `int*` to a `byte*`. Notice that the pointer points to the lowest addressed byte of the variable. When you successively increment the result, up to the size of `int` (4 bytes), you can display the remaining bytes of the variable.

```csharp
public class ClassConvert
{
    public static void Conversions()
    {
        int number = 1024;

        unsafe
        {
            // Convert to byte:
            byte* p = (byte*)&number;

            System.Console.Write("The 4 bytes of the integer:");

            // Display the 4 bytes of the int variable:
            for (int i = 0 ; i < sizeof(int) ; ++i)
            {
                System.Console.Write(" {0:X2}", *p);
                // Increment the pointer:
                p++;
            }
            System.Console.WriteLine();
            System.Console.WriteLine($"The value of the integer: {number}");

            /* Output:
                The 4 bytes of the integer: 00 04 00 00
                The value of the integer: 1024
            */
        }
    }
}
```
