---
title: "Memory<T> and Span<T> usage guidelines (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/memory-and-spans/memory-t-usage-guidelines.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Memory<T> and Span<T> usage guidelines (part 2 of 3)

## Usage guidelines

Because a memory block is owned but is intended to be passed to multiple components, some of which might operate upon a particular memory block simultaneously, it's important to establish guidelines for using both `System.Memory`1` and `System.Span`1`. Guidelines are necessary because it's possible for a component to:

- Retain a reference to a memory block after its owner has released it.
- Operate on a buffer at the same time that another component is operating on it, in the process corrupting the data in the buffer.

While the stack-allocated nature of `System.Span`1` optimizes performance and makes `System.Span`1` the preferred type for operating on a memory block, it also subjects `System.Span`1` to some major restrictions. It's important to know when to use a `System.Span`1` and when to use `System.Memory`1`.

The following are our recommendations for successfully using `System.Memory`1` and its related types. Guidance that applies to `System.Memory`1` and `System.Span`1` also applies to `System.ReadOnlyMemory`1` and `System.ReadOnlySpan`1` unless noted otherwise.

- Rule #1: For a synchronous API, use `Span<T>` instead of `Memory<T>` as a parameter if possible
- Rule #2: Use `ReadOnlySpan<T>` or `ReadOnlyMemory<T>` if the buffer should be read-only
- Rule #3: If your method accepts `Memory<T>` and returns `void`, you must not use the `Memory<T>` instance after your method returns
- Rule #4: If your method accepts a `Memory<T>` and returns a Task, you must not use the `Memory<T>` instance after the Task transitions to a terminal state
- Rule #5: If your constructor accepts `Memory<T>` as a parameter, instance methods on the constructed object are assumed to be consumers of the `Memory<T>` instance
- Rule #6: If you have a settable `Memory<T>`-typed property (or an equivalent instance method) on your type, instance methods on that object are assumed to be consumers of the `Memory<T>` instance
- Rule #7: If you have an `IMemoryOwner<T>` reference, you must at some point dispose of it or transfer its ownership (but not both)
- Rule #8: If you have an `IMemoryOwner<T>` parameter in your API surface, you are accepting ownership of that instance
- Rule #9: If you're wrapping a synchronous P/Invoke method, your API should accept `Span<T>` as a parameter
- Rule #10: If you're wrapping an asynchronous p/invoke method, your API should accept `Memory<T>` as a parameter

### Rule #1: For a synchronous API, use Span\<T> instead of Memory\<T> as a parameter if possible

`System.Span`1` is more versatile than `System.Memory`1` and can represent a wider variety of contiguous memory buffers. `System.Span`1` also offers better performance than `System.Memory`1`. Finally, you can use the `System.Memory`1.Span` property to convert a `System.Memory`1` instance to a `System.Span`1`, although Span\<T>-to-Memory\<T> conversion isn't possible. So if your callers happen to have a `System.Memory`1` instance, they'll be able to call your methods with `System.Span`1` parameters anyway.

Using a parameter of type `System.Span`1` instead of type `System.Memory`1` also helps you write a correct consuming method implementation. You'll automatically get compile-time checks to ensure that you're not attempting to access the buffer beyond your method's lease (more on this later).

Sometimes, you'll have to use a `System.Memory`1` parameter instead of a `System.Span`1` parameter, even if you're fully synchronous. Perhaps an API that you depend on accepts only `System.Memory`1` arguments. This is fine, but be aware of the tradeoffs involved when using `System.Memory`1` synchronously.

### Rule #2: Use ReadOnlySpan\<T> or ReadOnlyMemory\<T> if the buffer should be read-only

In the earlier examples, the `DisplayBufferToConsole` method only reads from the buffer; it doesn't modify the contents of the buffer. The method signature should be changed to the following.

```csharp
void DisplayBufferToConsole(ReadOnlyMemory<char> buffer);
```

In fact, if you combine this rule and Rule #1, we can do even better and rewrite the method signature as follows:

```csharp
void DisplayBufferToConsole(ReadOnlySpan<char> buffer);
```

The `DisplayBufferToConsole` method now works with virtually every buffer type imaginable: `T[]`, storage allocated with stackalloc, and so on. You can even pass a `System.String` directly into it! For more information, see GitHub issue dotnet/docs #25551.

### Rule #3: If your method accepts Memory\<T> and returns `void`, you must not use the Memory\<T> instance after your method returns

This relates to the "lease" concept mentioned earlier. A void-returning method's lease on the `System.Memory`1` instance begins when the method is entered, and it ends when the method exits. Consider the following example, which calls `Log` in a loop based on input from the console.

```csharp
using System;
using System.Buffers;

public class Example
{
    // implementation provided by third party
    static extern void Log(ReadOnlyMemory<char> message);

    // user code
    public static void Main()
    {
        using (var owner = MemoryPool<char>.Shared.Rent())
        {
            var memory = owner.Memory;
            var span = memory.Span;
            while (true)
            {
                string? s = Console.ReadLine();

                if (s is null)
                    return;

                int value = Int32.Parse(s);
                if (value < 0)
                    return;

                int numCharsWritten = ToBuffer(value, span);
                Log(memory.Slice(0, numCharsWritten));
            }
        }
    }

    private static int ToBuffer(int value, Span<char> span)
    {
        string strValue = value.ToString();
        int length = strValue.Length;
        strValue.AsSpan().CopyTo(span.Slice(0, length));
        return length;
    }
}

// Possible implementation of Log:
    // private static void Log(ReadOnlyMemory<char> message)
    // {
    //     Console.WriteLine(message);
    // }
```
If `Log` is a fully synchronous method, this code will behave as expected because there is only one active consumer of the memory instance at any given time.
But imagine instead that `Log` has this implementation.

```csharp
// !!! INCORRECT IMPLEMENTATION !!!
static void Log(ReadOnlyMemory<char> message)
{
    // Run in background so that we don't block the main thread while performing IO.
    Task.Run(() =>
    {
        StreamWriter sw = File.AppendText(@".\input-numbers.dat");
        sw.WriteLine(message);
    });
}
```

In this implementation, `Log` violates its lease because it still attempts to use the `System.Memory`1` instance in the background after the original method has returned. The `Main` method could mutate the buffer while `Log` attempts to read from it, which could result in data corruption.

There are several ways to resolve this:

- The `Log` method can return a `System.Threading.Tasks.Task` instead of `void`, as the following implementation of the `Log` method does.

```csharp
// An acceptable implementation.
static Task Log(ReadOnlyMemory<char> message)
{
    // Run in the background so that we don't block the main thread while performing IO.
    return Task.Run(() => {
        StreamWriter sw = File.AppendText(@".\input-numbers.dat");
        sw.WriteLine(message);
        sw.Flush();
    });
}
```
- `Log` can instead be implemented as follows:

```csharp
// An acceptable implementation.
static void Log(ReadOnlyMemory<char> message)
{
    string defensiveCopy = message.ToString();
    // Run in the background so that we don't block the main thread while performing IO.
    Task.Run(() =>
    {
        StreamWriter sw = File.AppendText(@".\input-numbers.dat");
        sw.WriteLine(defensiveCopy);
        sw.Flush();
    });
}
```
### Rule #4: If your method accepts a Memory\<T> and returns a Task, you must not use the Memory\<T> instance after the Task transitions to a terminal state

This is just the async variant of Rule #3. The `Log` method from the earlier example can be written as follows to comply with this rule:

```csharp
// An acceptable implementation.
static Task Log(ReadOnlyMemory<char> message)
{
    // Run in the background so that we don't block the main thread while performing IO.
    return Task.Run(() => {
        StreamWriter sw = File.AppendText(@".\input-numbers.dat");
        sw.WriteLine(message);
        sw.Flush();
    });
}
```
Here, "terminal state" means that the task transitions to a completed, faulted, or canceled state. In other words, "terminal state" means "anything that would cause await to throw or to continue execution."

This guidance applies to methods that return `System.Threading.Tasks.Task`, `System.Threading.Tasks.Task`1`, `System.Threading.Tasks.ValueTask`1`, or any similar type.

### Rule #5: If your constructor accepts Memory\<T> as a parameter, instance methods on the constructed object are assumed to be consumers of the Memory\<T> instance

Consider the following example:

```csharp
class OddValueExtractor
{
    public OddValueExtractor(ReadOnlyMemory<int> input);
    public bool TryReadNextOddValue(out int value);
}

void PrintAllOddValues(ReadOnlyMemory<int> input)
{
    var extractor = new OddValueExtractor(input);
    while (extractor.TryReadNextOddValue(out int value))
    {
      Console.WriteLine(value);
    }
}
```

Here, the `OddValueExtractor` constructor accepts a `ReadOnlyMemory<int>` as a constructor parameter, so the constructor itself is a consumer of the `ReadOnlyMemory<int>` instance, and all instance methods on the returned value are also consumers of the original `ReadOnlyMemory<int>` instance. This means that `TryReadNextOddValue` consumes the `ReadOnlyMemory<int>` instance, even though the instance isn't passed directly to the `TryReadNextOddValue` method.

### Rule #6: If you have a settable Memory\<T>-typed property (or an equivalent instance method) on your type, instance methods on that object are assumed to be consumers of the Memory\<T> instance

This is really just a variant of Rule #5. This rule exists because property setters or equivalent methods are assumed to capture and persist their inputs, so instance methods on the same object may utilize the captured state.

The following example triggers this rule:

```csharp
class Person
{
    // Settable property.
    public Memory<char> FirstName { get; set; }

    // alternatively, equivalent "setter" method
    public SetFirstName(Memory<char> value);

    // alternatively, a public settable field
    public Memory<char> FirstName;
}
```

### Rule #7: If you have an IMemoryOwner\<T> reference, you must at some point dispose of it or transfer its ownership (but not both)

Since a `System.Memory`1` instance may be backed by either managed or unmanaged memory, the owner must call `Dispose` on `System.Buffers.IMemoryOwner`1` when work performed on the `System.Memory`1` instance is complete. Alternatively, the owner may transfer ownership of the `System.Buffers.IMemoryOwner`1` instance to a different component, at which point the acquiring component becomes responsible for calling `Dispose` at the appropriate time (more on this later).

Failure to call the `Dispose` method on an `System.Buffers.IMemoryOwner`1` instance may lead to unmanaged memory leaks or other performance degradation.

This rule also applies to code that calls factory methods like `System.Buffers.MemoryPool`1.Rent*`. The caller becomes the owner of the returned `System.Buffers.IMemoryOwner`1` and is responsible for disposing of the instance when finished.

### Rule #8: If you have an IMemoryOwner\<T> parameter in your API surface, you are accepting ownership of that instance

Accepting an instance of this type signals that your component intends to take ownership of this instance. Your component becomes responsible for proper disposal according to Rule #7.

Any component that transfers ownership of the `System.Buffers.IMemoryOwner`1` instance to a different component should no longer use that instance after the method call completes.

> **Important:**
> If your constructor accepts `System.Buffers.IMemoryOwner`1` as a parameter, its type should implement `System.IDisposable`, and your `System.IDisposable.Dispose*` method should call `Dispose` on the `System.Buffers.IMemoryOwner`1` object.

### Rule #9: If you're wrapping a synchronous p/invoke method, your API should accept Span\<T> as a parameter

According to Rule #1, `System.Span`1` is generally the correct type to use for synchronous APIs. You can pin `System.Span`1` instances via the `fixed` keyword, as in the following example.

```csharp
using System.Runtime.InteropServices;

[DllImport(...)]
private static extern unsafe int ExportedMethod(byte* pbData, int cbData);

public unsafe int ManagedWrapper(Span<byte> data)
{
    fixed (byte* pbData = &MemoryMarshal.GetReference(data))
    {
        int retVal = ExportedMethod(pbData, data.Length);

        /* error checking retVal goes here */

        return retVal;
    }
}
```

In the previous example, `pbData` can be null if, for example, the input span is empty. If the exported method absolutely requires that `pbData` be non-null, even if `cbData` is 0, the method can be implemented as follows:

```csharp
public unsafe int ManagedWrapper(Span<byte> data)
{
    fixed (byte* pbData = &MemoryMarshal.GetReference(data))
    {
        byte dummy = 0;
        int retVal = ExportedMethod((pbData != null) ? pbData : &dummy, data.Length);

        /* error checking retVal goes here */

        return retVal;
    }
}
```
