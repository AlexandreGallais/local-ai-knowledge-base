---
title: "Unsafe code best practices - .NET (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/unsafe-code/best-practices.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Unsafe code best practices - .NET (part 4 of 4)

## 16. Passing contiguous data as pointers + lengths (or relying on zero-termination)

Avoid defining APIs that accept unmanaged or managed pointers to contiguous data. Instead, use `Span<T>` or `ReadOnlySpan<T>`:

```csharp
// Poor API designs:
void Consume(ref byte data, int length);
void Consume(byte* data, int length);
void Consume(byte* data); // zero-terminated
void Consume(ref byte data); // zero-terminated

// Better API designs:
void Consume(Span<byte> data);
void Consume(Memory<byte> data);
void Consume(byte[] data);
void Consume(byte[] data, int offset, int length);
```

Zero-termination is particularly risky because not all buffers are zero-terminated, and reading past any zero-terminator
can lead to information disclosure, data corruption, or process termination via an access violation.

### Recommendations

1. ❌ DON'T expose methods whose arguments are pointer types (unmanaged pointers `T*` or managed pointers `ref T`) when those arguments are intended to represent buffers. Use safe buffer types like `Span<T>` or `ReadOnlySpan<T>` instead.
2. ❌ DON'T use implicit contracts for byref arguments, such as requiring all callers to allocate the input on the stack. If such a contract is necessary, consider using ref struct instead.
3. ❌ DON'T assume buffers are zero-terminated unless the scenario explicitly documents that this is a valid assumption. For example, even though .NET guarantees that `string` instances and `"..."u8` literals are null-terminated, the same does not hold of other buffer types like `ReadOnlySpan<char>` or `char[]`.

    ```csharp
    unsafe void NullTerminationExamples(string str, ReadOnlySpan<char> span, char[] array)
    {
        Debug.Assert(str is not null);
        Debug.Assert(array is not null);

        fixed (char* pStr = str)
        {
            // OK: Strings are always guaranteed to have a null terminator.
            // This will assign the value '\0' to the variable 'ch'.
            char ch = pStr[str.Length];
        }

        fixed (char* pSpan = span)
        {
            // INCORRECT: Spans aren't guaranteed to be null-terminated.
            // This could throw, assign garbage data to 'ch', or cause an AV and crash.
            char ch = pSpan[span.Length];
        }
        
        fixed (char* pArray = array)
        {
            // INCORRECT: Arrays aren't guaranteed to be null-terminated.
            // This could throw, assign garbage data to 'ch', or cause an AV and crash.
            char ch = pArray[array.Length];
        }
    }
    ```

4. ❌ DON'T pass a pinned `Span<char>` or `ReadOnlySpan<char>` across a p/invoke boundary unless you have also passed an explicit length argument. Otherwise, the code on the other side of the p/invoke boundary might improperly believe the buffer is null-terminated.

```csharp
unsafe static extern void SomePInvokeMethod(char* pwszData);

unsafe void IncorrectPInvokeExample(ReadOnlySpan<char> data)
{
    fixed (char* pData = data)
    {
        // INCORRECT: Since 'data' is a span and is not guaranteed to be null-terminated,
        // the receiver might attempt to keep reading beyond the end of the buffer,
        // resulting in undefined behavior.
        SomePInvokeMethod(pData);
    }
}
```

To resolve this, use an alternative p/invoke signature that accepts _both_ the data pointer _and_ the length if possible. Otherwise, if the receiver has no way of accepting a separate length argument, ensure the original data is converted to a `string` before pinning it and passing it across the p/invoke boundary.

```csharp
unsafe static extern void SomePInvokeMethod(char* pwszData);
unsafe static extern void SomePInvokeMethodWhichTakesLength(char* pwszData, uint cchData);

unsafe void CorrectPInvokeExample(ReadOnlySpan<char> data)
{
    fixed (char* pData = data)
    {
        // OK: Since the receiver accepts an explicit length argument, they're signaling
        // to us that they don't expect the pointer to point to a null-terminated buffer.
        SomePInvokeMethodWhichTakesLength(pData, (uint)data.Length);
    }
    
    // Alternatively, if the receiver doesn't accept an explicit length argument, use
    // ReadOnlySpan<T>.ToString to convert the data to a null-terminated string before
    // pinning it and sending it across the p/invoke boundary.
    
    fixed (char* pStr = data.ToString())
    {
        // OK: Strings are guaranteed to be null-terminated.
        SomePInvokeMethod(pStr);
    }
}
```

## 17. String mutations

Strings in C# are immutable by design, and any attempt to mutate them using unsafe code can lead to undefined behavior. Example:

```csharp
string s = "Hello";
fixed (char* p = s)
{
    p[0] = '_';
}
Console.WriteLine("Hello"); // prints "_ello" instead of "Hello"
```

Modifying an interned string (*most* string literals are) will change the value for all other uses. Even without string interning, writing into a newly created string should be replaced with the safer `String.Create` API:

```csharp
// Bad:
string s = new string('\n', 4); // non-interned string
fixed (char* p = s)
{
    // Copy data into the newly created string
}

// Good:
string s = string.Create(4, state, (chr, state) =>
{
    // Copy data into the newly created string
});
```

### Recommendations

1. ❌ DON'T mutate strings. Use the `String.Create` API to create a new string if complex copying logic is needed. Otherwise, use `.ToString()`, `StringBuilder`, `new string(...)`, or string interpolation syntax.

## 18. Raw IL code (for example, System.Reflection.Emit and Mono.Cecil)

Emitting raw IL (either via `System.Reflection.Emit`, third-party libraries such as `Mono.Cecil`,
or writing IL code directly) by definition bypasses all memory safety guarantees C# provides.
Avoid using such techniques unless absolutely necessary.

### Recommendations

1. ❌ DON'T emit raw IL code as it comes with no guiderails and it makes it easy to introduce type safety and other issues. Like other dynamic code generation techniques, emitting raw IL is also not AOT-friendly if it's not done at the build time.
2. ✔️ DO use Source Generators instead, if possible.
3. ✔️ DO prefer \[UnsafeAccessor\] instead of emitting raw IL for writing low overhead serialization code for private members if the need arises.
4. ✔️ DO file an API proposal against dotnet/runtime if some API is missing and you're forced to use raw IL code instead.
5. ✔️ DO use `ilverify` or similar tools to validate the emitted IL code if you must use raw IL.

## 19. Uninitialized locals `[SkipLocalsInit]` and `Unsafe.SkipInit`

`[SkipLocalsInit]` was introduced in .NET 5.0 to allow the JIT to skip zeroing local variables in methods, either on a per-method basis or module-wide. This feature was often used to help the JIT eliminate redundant zero initializations, such as those for `stackalloc`. However, it can lead to undefined behavior if locals are not explicitly initialized before use. With recent improvements in the JIT's ability to eliminate zero-initializations and perform vectorization, the need for `[SkipLocalsInit]` and `Unsafe.SkipInit` has significantly decreased.

### Recommendations

1. ❌ DON'T use `[SkipLocalsInit]` and `Unsafe.SkipInit` if no performance benefits in hot code are observed or you're not sure about the risks they introduce.
2. ✔️ DO code defensively when using APIs like `GC.AllocateUninitializedArray` and `ArrayPool<T>.Shared.Rent`, which can similarly return uninitialized buffers.

## 20. `ArrayPool<T>.Shared` and similar pooling APIs

`ArrayPool<T>.Shared` is a shared pool of arrays used to reduce GC pressure in hot code. It's often utilized for
allocating temporary buffers for I/O operations or other short-lived scenarios. While the API is straightforward
and doesn't inherently contain unsafe features, it can lead to use-after-free bugs in C#. Example:

```csharp
var buffer = ArrayPool<byte>.Shared.Rent(1024);
_buffer = buffer; // buffer object escapes the scope
Use(buffer);
ArrayPool<byte>.Shared.Return(buffer);
```

Any use of `_buffer` after the `Return` call is a use-after-free bug. This minimal example is easy to spot,
but the bug becomes harder to detect when `Rent` and `Return` are in different scopes or methods.

### Recommendations

1. ✔️ DO keep matched calls to `Rent` and `Return` within the same method if possible to narrow the scope of potential bugs.
2. ❌ DON'T use a `try-finally` pattern in order to call `Return` in the `finally` block unless you are confident the failed logic has finished using the buffer. It's better to abandon the buffer rather than risk a use-after-free bug due to an unexpected early `Return`.
3. ✔️ DO be aware that similar issues may arise with other pooling APIs or patterns, such as `Microsoft.Extensions.ObjectPool.ObjectPool`1`.

## 21. `bool` <-> `int` conversions

While ECMA-335 standard defines a Boolean as 0-255 where `true` is any non-zero value, it's better to avoid any explicit conversions between integers and Booleans in order to avoid introducing "denormalized" values as anything other than 0 or 1 likely leads to unreliable behavior.

```csharp
// Bad:
bool b = Unsafe.As<int, bool>(ref someInteger);
int i = Unsafe.As<bool, int>(ref someBool);

// Good:
bool b = (byte)someInteger != 0;
int i = someBool ? 1 : 0;
```

The JIT present in earlier .NET runtimes did not fully optimize the safe version of this logic, resulting in developers using unsafe constructs to convert between `bool` and `int` in performance-sensitive code paths. This is no longer the case, and modern .NET JITs are able to optimize the safe version effectively.

### Recommendations

1. ❌ DON'T write "branchless" conversions between integers and Booleans using unsafe code.
2. ✔️ DO use ternary operators (or other branching logic) instead. Modern .NET JITs will optimize them effectively.
3. ❌ DON'T read `bool` using unsafe APIs such as `Unsafe.ReadUnaligned` or `MemoryMarshal.Cast` if you don't trust the input. Consider using ternary operators or equality comparisons instead:

```csharp
// Bad:
bool b = Unsafe.ReadUnaligned<bool>(ref byteData);

// Good:
bool b = byteData[0] != 0;

// Bad:
ReadOnlySpan<byte> byteSpan = ReadDataFromNetwork();
bool[] boolArray = MemoryMarshal.Cast<byte, bool>(byteSpan).ToArray();

// Good:
ReadOnlySpan<byte> byteSpan = ReadDataFromNetwork();
bool[] boolArray = new bool[byteSpan];
for (int i = 0; i < byteSpan.Length; i++) { boolArray[i] = byteSpan[i] != 0; }
```

For more information, see Binary (de)serialization of structs with paddings or non-blittable members.

## 22. Interop

While most of the suggestions in this document apply to interop scenarios as well, it is recommended to follow the Native interoperability best practices guide. Additionally, consider using auto-generated interop wrappers like CsWin32 and CsWinRT. This minimizes the need for you to write manual interop code and reduces the risk of introducing memory safety issues.

## 23. Thread safety

Memory safety and thread safety are orthogonal concepts. Code can be memory safe yet still contain data races, torn reads, or visibility bugs; conversely, code can be thread safe while still invoking undefined behavior through unsafe memory manipulation. For broader guidance, see Managed threading best practices and .NET Memory Model.

## 24. Unsafe code around SIMD/Vectorization

See Vectorization guidelines for more details.
In the context of the unsafe code it's important to keep in mind:

* SIMD operations have complex requirements to provide atomicity guarantees (sometimes, they don't provide them at all).
* Most SIMD Load/Store APIs don't provide bounds checks.

## 25. Fuzz testing

Fuzz testing (or "fuzzing") is an automated software testing technique that involves providing invalid, unexpected, or random data as inputs to a computer program. It provides a way to detect memory safety issues in code that may have gaps in test coverage. You can use tools like SharpFuzz to set up fuzz testing for .NET code.

## 26. Compiler warnings

Generally, the C# compiler doesn't provide extensive support such as warnings and analyzers around incorrect unsafe code usage. However, there are some existing warnings that can help detect potential issues and should not be ignored or suppressed without careful consideration. Some examples include:

```csharp
nint ptr = 0;
unsafe
{
    int local = 0;
    ptr = (nint)(&local);
}
await Task.Delay(100);

// ptr is used here
```

This code produces warning CS9123 ("The '&' operator should not be used on parameters or local variables in async methods"), which implies the code is likely incorrect.

### Recommendations

1. ✔️ DO pay attention to compiler warnings and fix the underlying issues instead of suppressing them.
2. ❌ DON'T assume that the absence of compiler warnings implies the code is correct. The C# compiler has limited to no support for detecting incorrect unsafe code usage.

## References

* Unsafe code, pointer types, and function pointers.
* Unsafe code, language specification.
* What Every CLR Developer Must Know Before Writing Code for advanced topics around the CoreCLR and the GC internals.
* Native interoperability best practices.
* Managed threading best practices.
* Best practices for exceptions.
* Vectorization guidelines
* .NET Memory Model
* ECMA-335
* ECMA-335 augments
