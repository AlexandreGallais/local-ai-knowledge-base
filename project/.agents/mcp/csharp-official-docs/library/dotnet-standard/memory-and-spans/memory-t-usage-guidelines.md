---
title: "Memory<T> and Span<T> usage guidelines (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/memory-and-spans/memory-t-usage-guidelines.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Memory\<T> and Span\<T> usage guidelines

.NET includes a number of types that represent an arbitrary contiguous region of memory. `System.Span`1` and `System.ReadOnlySpan`1` are lightweight memory buffers that wrap references to managed or unmanaged memory. Because these types can only be stored on the stack, they're unsuitable for scenarios such as asynchronous method calls. To address this problem, .NET 2.1 added some additional types, including `System.Memory`1`, `System.ReadOnlyMemory`1`, `System.Buffers.IMemoryOwner`1`, and `System.Buffers.MemoryPool`1`. Like `System.Span`1`, `System.Memory`1` and its related types can be backed by both managed and unmanaged memory. Unlike `System.Span`1`, `System.Memory`1` can be stored on the managed heap.

Both `System.Span`1` and `System.Memory`1` are wrappers over buffers of structured data that can be used in pipelines. That is, they're designed so that some or all of the data can be efficiently passed to components in the pipeline, which can process them and optionally modify the buffer. Because `System.Memory`1` and its related types can be accessed by multiple components or by multiple threads, it's important to follow some standard usage guidelines to produce robust code.

## Owners, consumers, and lifetime management

Buffers can be passed around between APIs and can sometimes be accessed from multiple threads, so be aware of how a buffer's lifetime is managed. There are three core concepts:

- **Ownership**. The owner of a buffer instance is responsible for lifetime management, including destroying the buffer when it's no longer in use. All buffers have a single owner. Generally the owner is the component that created the buffer or that received the buffer from a factory. Ownership can also be transferred; **Component-A** can relinquish control of the buffer to **Component-B**, at which point **Component-A** may no longer use the buffer, and **Component-B** becomes responsible for destroying the buffer when it's no longer in use.

- **Consumption**. The consumer of a buffer instance is allowed to use the buffer instance by reading from it and possibly writing to it. Buffers can have one consumer at a time unless some external synchronization mechanism is provided. The active consumer of a buffer isn't necessarily the buffer's owner.
- **Lease**. The lease is the length of time that a particular component is allowed to be the consumer of the buffer.

The following pseudo-code example illustrates these three concepts. `Buffer` in the pseudo-code represents a `System.Memory`1` or `System.Span`1` buffer of type `System.Char`. The `Main` method instantiates the buffer, calls the `WriteInt32ToBuffer` method to write the string representation of an integer to the buffer, and then calls the `DisplayBufferToConsole` method to display the value of the buffer.

```csharp
using System;

class Program
{
    // Write 'value' as a human-readable string to the output buffer.
    void WriteInt32ToBuffer(int value, Buffer buffer);

    // Display the contents of the buffer to the console.
    void DisplayBufferToConsole(Buffer buffer);

    // Application code
    static void Main()
    {
        var buffer = CreateBuffer();
        try
        {
            int value = Int32.Parse(Console.ReadLine());
            WriteInt32ToBuffer(value, buffer);
            DisplayBufferToConsole(buffer);
        }
        finally
        {
            buffer.Destroy();
        }
    }
}
```

The `Main` method creates the buffer and so is its owner. Therefore, `Main` is responsible for destroying the buffer when it's no longer in use. The pseudo-code illustrates this by calling a `Destroy` method on the buffer. (Neither `System.Memory`1` nor `System.Span`1` actually has a `Destroy` method. You'll see actual code examples later in this article.)

The buffer has two consumers, `WriteInt32ToBuffer` and `DisplayBufferToConsole`. There is only one consumer at a time (first `WriteInt32ToBuffer`, then `DisplayBufferToConsole`), and neither of the consumers owns the buffer. Note also that "consumer" in this context doesn't imply a read-only view of the buffer; consumers can modify the buffer's contents, as `WriteInt32ToBuffer` does, if given a read/write view of the buffer.

The `WriteInt32ToBuffer` method has a lease on (can consume) the buffer between the start of the method call and the time the method returns. Similarly, `DisplayBufferToConsole` has a lease on the buffer while it's executing, and the lease is released when the method unwinds. (There is no API for lease management; a "lease" is a conceptual matter.)

## Memory\<T> and the owner/consumer model

As the Owners, consumers, and lifetime management section notes, a buffer always has an owner. .NET supports two ownership models:

- A model that supports single ownership. A buffer has a single owner for its entire lifetime.
- A model that supports ownership transfer. Ownership of a buffer can be transferred from its original owner (its creator) to another component, which then becomes responsible for the buffer's lifetime management. That owner can in turn transfer ownership to another component, and so on.

You use the `System.Buffers.IMemoryOwner`1` interface to explicitly manage the ownership of a buffer. `System.Buffers.IMemoryOwner`1` supports both ownership models. The component that has an `System.Buffers.IMemoryOwner`1` reference owns the buffer. The following example uses an `System.Buffers.IMemoryOwner`1` instance to reflect the ownership of a `System.Memory`1` buffer.

```csharp
﻿using System;
using System.Buffers;

class Example
{
    static void Main()
    {
        IMemoryOwner<char> owner = MemoryPool<char>.Shared.Rent();

        Console.Write("Enter a number: ");
        try
        {
            string? s = Console.ReadLine();

            if (s is null)
                return;

            var value = Int32.Parse(s);

            var memory = owner.Memory;

            WriteInt32ToBuffer(value, memory);

            DisplayBufferToConsole(owner.Memory.Slice(0, value.ToString().Length));
        }
        catch (FormatException)
        {
            Console.WriteLine("You did not enter a valid number.");
        }
        catch (OverflowException)
        {
            Console.WriteLine($"You entered a number less than {Int32.MinValue:N0} or greater than {Int32.MaxValue:N0}.");
        }
        finally
        {
            owner?.Dispose();
        }
    }

    static void WriteInt32ToBuffer(int value, Memory<char> buffer)
    {
        var strValue = value.ToString();

        var span = buffer.Span;
        for (int ctr = 0; ctr < strValue.Length; ctr++)
            span[ctr] = strValue[ctr];
    }

    static void DisplayBufferToConsole(Memory<char> buffer) =>
        Console.WriteLine($"Contents of the buffer: '{buffer}'");
}
```
You can also write this example with the `using` statement:

```csharp
﻿using System;
using System.Buffers;

class Example
{
    static void Main()
    {
        using (IMemoryOwner<char> owner = MemoryPool<char>.Shared.Rent())
        {
            Console.Write("Enter a number: ");
            try
            {
                string? s = Console.ReadLine();

                if (s is null)
                    return;

                var value = Int32.Parse(s);

                var memory = owner.Memory;
                WriteInt32ToBuffer(value, memory);
                DisplayBufferToConsole(memory.Slice(0, value.ToString().Length));
            }
            catch (FormatException)
            {
                Console.WriteLine("You did not enter a valid number.");
            }
            catch (OverflowException)
            {
                Console.WriteLine($"You entered a number less than {Int32.MinValue:N0} or greater than {Int32.MaxValue:N0}.");
            }
        }
    }

    static void WriteInt32ToBuffer(int value, Memory<char> buffer)
    {
        var strValue = value.ToString();

        var span = buffer.Slice(0, strValue.Length).Span;
        strValue.AsSpan().CopyTo(span);
    }

    static void DisplayBufferToConsole(Memory<char> buffer) =>
        Console.WriteLine($"Contents of the buffer: '{buffer}'");
}
```
In this code:

- The `Main` method holds the reference to the `System.Buffers.IMemoryOwner`1` instance, so the `Main` method is the owner of the buffer.
- The `WriteInt32ToBuffer` and `DisplayBufferToConsole` methods accept `System.Memory`1` as a public API. Therefore, they are consumers of the buffer. These methods consume the buffer one at a time.

Although the `WriteInt32ToBuffer` method is intended to write a value to the buffer, the `DisplayBufferToConsole` method isn't intended to. To reflect this, it could have accepted an argument of type `System.ReadOnlyMemory`1`. For more information on `System.ReadOnlyMemory`1`, see Rule #2: Use ReadOnlySpan\<T> or ReadOnlyMemory\<T> if the buffer should be read-only.

### "Ownerless" Memory\<T> instances

You can create a `System.Memory`1` instance without using `System.Buffers.IMemoryOwner`1`. In this case, ownership of the buffer is implicit rather than explicit, and only the single-owner model is supported. You can do this by:

- Calling one of the  `System.Memory`1` constructors directly, passing in a `T[]`, as the following example does.
- Calling the String.AsMemory) extension method to produce a `ReadOnlyMemory<char>` instance.

```csharp
﻿using System;

class Example
{
    static void Main()
    {
        Memory<char> memory = new char[64];

        Console.Write("Enter a number: ");
        string? s = Console.ReadLine();

        if (s is null)
            return;

	    var value = Int32.Parse(s);

        WriteInt32ToBuffer(value, memory);
        DisplayBufferToConsole(memory);
    }

    static void WriteInt32ToBuffer(int value, Memory<char> buffer)
    {
        var strValue = value.ToString();
        strValue.AsSpan().CopyTo(buffer.Slice(0, strValue.Length).Span);
    }

    static void DisplayBufferToConsole(Memory<char> buffer) =>
        Console.WriteLine($"Contents of the buffer: '{buffer}'");
}
```
The method that initially creates the `System.Memory`1` instance is the implicit owner of the buffer. Ownership cannot be transferred to any other component because there is no `System.Buffers.IMemoryOwner`1` instance to facilitate the transfer. (As an alternative, you can also imagine that the runtime's garbage collector owns the buffer, and all methods just consume the buffer.)
