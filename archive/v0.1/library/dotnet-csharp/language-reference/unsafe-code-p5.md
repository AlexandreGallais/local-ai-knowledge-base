---
title: "Unsafe code, pointers to data, and function pointers (part 5 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/unsafe-code.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Unsafe code, pointers to data, and function pointers (part 5 of 5)

## The updated memory safety model (preview)

> **Important:**
> The updated memory safety model is a preview feature in C# 15 and .NET 11. For activation instructions, see Enable the updated memory safety rules. For the full design, see the memory safety feature specification.

The updated model separates two things the original model treats as one: the *existence* of pointer code and the *propagation* of safety obligations to callers. Marking a member `unsafe` no longer just permits pointers in its body; it makes the member *requires-unsafe*, so every caller must either propagate that obligation or discharge it behind a validated, safe-callable boundary. To support that separation, the model also narrows the unsafe context: the existence of a pointer isn't unsafe, only the operations that access memory the runtime doesn't manage. The narrowing lets you hold, pass, and return pointers in safe code, while `unsafe` marks the operations and members that can actually violate memory safety.

### Requires-unsafe members

In the original model, the `unsafe` modifier on a member only allows pointers in the member's signature and body. It doesn't inform callers about safety. The updated model gives the modifier meaning for callers. When you mark a member `unsafe`, the compiler treats it as *requires-unsafe*: every caller must invoke it from an `unsafe` context, and the obligation to audit safety moves to that caller.

The `unsafe` modifier on a member signature no longer establishes an unsafe context for the body. The two roles split:

- The `unsafe` modifier on the signature propagates the obligation to callers.
- An inner `unsafe` block scopes the operations that access unmanaged memory.

In the following preview example, `ReadInt32` is requires-unsafe. The signature carries the `unsafe` modifier, and an inner `unsafe` block wraps the dereference:

```csharp
// Preview: requires the updated-memory-safety-rules feature.
public static unsafe int ReadInt32(byte* source)
{
    unsafe
    {
        return *(int*)source;
    }
}
```

A caller wraps the call in its own `unsafe` block:

```csharp
// Preview
unsafe
{
    int value = ReadInt32(buffer);
}
```

The updated model also tightens a few related rules:

- The `unsafe` modifier produces an error on a type declaration, a static constructor, and a finalizer, because the modifier has no caller to inform.
- Delegates can't be `unsafe`, because a delegate is type-shaped.
- A type whose parameterless constructor is `unsafe` can't satisfy a `new()` or `struct` constraint in a declaration, such as a base type or field type. In an expression, it can satisfy the constraint inside an unsafe context, for example `unsafe { var box = new Box<NativeResource>(); }` when `Box<T>` has a `new()` constraint and `NativeResource` has a requires-unsafe constructor. This check applies to generic type and method instantiations, including extension-block and extension-method type arguments. An unsafe block can satisfy the requirement at an expression use, but it doesn't fix an invalid base-type, field-type, or alias declaration elsewhere. For declaration-specific fixes, see CS9376.

### Operations that require an unsafe context

Operations that access the pointed-to memory require an `unsafe` context:

- Pointer indirection (`*p`), pointer member access (`p->member`), and pointer element access (`p[i]`).
- Function pointer invocation.
- Element access on a fixed-size buffer.

The following example pins an array without an `unsafe` context but dereferences the pointer inside one:

```csharp
public static int ReadValue(int[] numbers)
{
    fixed (int* first = numbers)
    {
        // Dereferencing a pointer accesses unmanaged memory, so it still
        // requires an unsafe context.
        unsafe
        {
            return *first;
        }
    }
}
```
### Relaxed operations

Operations that don't access pointed-to memory no longer require an `unsafe` context:

- Declaring a pointer type and taking the address of a variable with the `&` operator.
- The `fixed` statement that pins a variable.
- Converting a `stackalloc` expression to a pointer.
- The `sizeof` operator applied to any unmanaged type.

The following example creates and pins pointers without an `unsafe` context:

```csharp
public static void CreatePointer()
{
    int value = 42;
    // Creating a pointer doesn't require an unsafe context.
    int* pointer = &value;
    int** pointerToPointer = &pointer;
}
```
```csharp
public static void PinArray(int[] numbers)
{
    // The fixed statement no longer requires an unsafe context.
    fixed (int* first = numbers)
    {
        int* current = first;
    }
}
```
These relaxations apply whenever you compile with the `preview` language version, whether or not an assembly opts in to the updated memory safety rules.

### Unsafe expressions

An `unsafe` expression, `unsafe(expression)`, creates an unsafe context for evaluating a single expression. It's useful in situations where an `unsafe` block can't appear syntactically, such as a field initializer, a constructor initializer, or the `when` clause of a `catch` clause. The unsafe context ends at the closing parenthesis, so it doesn't extend to the rest of the containing statement.

The following example dereferences a pointer inside a field initializer, a position that can't contain an `unsafe` block:

```csharp
// A field initializer can't contain an unsafe block, but it can contain an
// unsafe expression. The unsafe context ends at the closing parenthesis.
public static readonly int Signature = unsafe(ReadSignature());

private static unsafe int ReadSignature()
{
    int rawValue = 0x1234;
    int* pointer = &rawValue;
    return *pointer;
}
```
An `unsafe` expression also lets you scope the unsafe context around one operand of `await`, instead of wrapping the whole `await` expression in an `unsafe` block. The `await` itself stays outside the unsafe context; only the call that produces the awaited task runs inside it:

```csharp
public static async Task<int> ReadSignatureAsync()
{
    // The unsafe expression scopes the unsafe context to the call that
    // produces the task. The 'await' itself stays outside that context.
    return await unsafe(ReadSignatureCoreAsync());
}

private static unsafe Task<int> ReadSignatureCoreAsync()
{
    int rawValue = 0x1234;
    int* pointer = &rawValue;
    return Task.FromResult(*pointer);
}
```
Like other unsafe code, an `unsafe` expression requires the **AllowUnsafeBlocks** compiler option, and it requires the `preview` language version.

### Discharge requires-unsafe obligations

A member that calls a requires-unsafe operation has two choices: propagate the obligation or discharge it.

- **Propagate**: Mark your own member `unsafe`. The obligation passes to your callers. Use propagation when you can't fully validate the obligation yourself.
- **Discharge**: Leave your member's signature safe. Validate the obligation inside the member, usually with runtime guards, then perform the unsafe operation in an inner `unsafe` block. A member that contains an inner `unsafe` block but doesn't mark its own signature `unsafe` is an *unsafe boundary*: it turns unsafe code into a safe-callable surface.

The following preview mockup validates its input with a guard, pins a managed array, and reads through the pointer. Callers don't need an `unsafe` context, because the method discharges the obligation:

```csharp
// Preview
public static int SumBytes(byte[] source)
{
    ArgumentNullException.ThrowIfNull(source);

    fixed (byte* first = source)
    {
        unsafe
        {
            // SAFETY: the null check and source.Length bound every read to the pinned array.
            int total = 0;
            for (int i = 0; i < source.Length; i++)
            {
                total += first[i];
            }

            return total;
        }
    }
}
```

The null check and the array length rule out the inputs that would let a read run past the buffer, so the dereference inside the `unsafe` block is sound. The method leaves no residual obligation, so it exposes a safe-callable signature.

### Safety documentation

A *requires-unsafe* member should document what the caller must guarantee. The updated model encourages two complementary comment styles:

- A `/// <safety>` documentation block above the signature states the formal contract: the conditions a caller must satisfy. An analyzer can flag a *requires-unsafe* member that's missing one.
- A `// SAFETY:` comment inside an `unsafe` block records why the operation is sound at that spot, for the developers and auditors who read the body.

The following preview example shows both styles on a *requires-unsafe* `ReadByte` method:

```csharp
// Preview
/// <summary>Reads a single byte from unmanaged memory.</summary>
/// <safety>
/// The sum of <paramref name="ptr"/> and <paramref name="offset"/> must address a byte
/// the caller is permitted to read.
/// </safety>
public static unsafe byte ReadByte(IntPtr ptr, int offset)
{
    byte* address = (byte*)ptr;
    unsafe
    {
        // SAFETY: relies on the caller obligation stated in the <safety> block.
        return address[offset];
    }
}
```

The `/// <safety>` block tells you the contract. The contract belongs in the documentation where every caller and reviewer sees it.

### Unsafe fields

Use the `unsafe` modifier for a field when its declared type doesn't express contracts that the enclosing type maintains and other code depends on. The unsafety exists in the gap between what the type system sees and what the type promises. The modifier forces every write to the field into an `unsafe` block, which keeps the writes reviewable in one place.

The clearest case is a field that holds a native pointer. The pointer doesn't declare how many bytes it addresses as a `System.Span`1` does, so the containing type maintains that information itself:

```csharp
// Preview
public class NativeBuffer
{
    /// <safety>
    /// Null, or points to a buffer of Length bytes.
    /// </safety>
    private unsafe byte* _pointer;

    public int Length { get; }

    public byte ReadAt(int index)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(index);
        ArgumentOutOfRangeException.ThrowIfGreaterThanOrEqual(index, Length);
        unsafe
        {
            // SAFETY: the bounds checks confine the read to the buffer that _pointer addresses.
            return _pointer[index];
        }
    }
}
```

A `readonly unsafe` field pairs the contract with a built-in guard: `unsafe` names the invariant, and `readonly` prevents a write that could break it after construction. Marking a property or an event `unsafe` doesn't make its backing field *requires-unsafe*.

Under the updated rules, mark every instance field in a type with explicit or extended layout either `safe` or `unsafe`. These types are marked with `System.Runtime.InteropServices.StructLayoutAttribute` set to `LayoutKind.Explicit`, or with `System.Runtime.InteropServices.ExtendedLayoutAttribute`. Apply the same modifiers to instance fields in types with nonzero `StructLayoutAttribute.Pack` or `StructLayoutAttribute.Size`, even with sequential or auto layout. Unspecified or zero values don't trigger the additional requirement by themselves. Static and constant fields are exempt. Annotate the owning property or event for synthesized backing fields.

For the diagnostic and fixes for implicitly generated storage, see CS9392: Field layout safety.

### The safe keyword

The updated model adds a `safe` contextual keyword that attests a declaration is sound where the compiler requires you to make the choice explicit.

Ordinary declarations are safe by default, so they don't require a `safe` modifier. Because `unsafe` code should be rare, most codebases use `safe` only where the default would otherwise be unsafe or the compiler requires an explicit choice. The modifier marks a declaration as not requires-unsafe; it doesn't establish a safe lexical context or cancel an enclosing unsafe context. You can't combine `safe` and `unsafe` on the same declaration. In newer compilers, both `unsafe` and `safe` declaration modifiers require the **AllowUnsafeBlocks** option, independently of the updated-rules enforcement opt-in. Without it, declaration modifiers produce **CS9401**, while unsafe blocks continue to produce **CS0227**. Roslyn documents the modifier check as introduced in Visual Studio 2026 version 18.13, after .NET 11.0.100. The .NET 11 compiler doesn't require this option for `safe` and uses CS0227 for `unsafe` declaration modifiers. See Unsafe context requirements for details. The memory safety model itself remains a preview feature.

An `extern` member calls into native code, so the compiler can't classify its safety. Under the updated model, you mark every `extern` declaration, including a `LibraryImport` partial method, either `safe` or `unsafe`:

```csharp
// Preview
[LibraryImport("libc")]
internal static safe partial int getpid();

[LibraryImport("libc", StringMarshalling = StringMarshalling.Utf8)]
internal static unsafe partial nint strlen(byte* str);
```

`getpid` takes no parameters and returns a primitive, so the author attests that the call is safe and callers use it without ceremony. `strlen` takes a raw pointer that the native code dereferences, so the declaration is `unsafe` and propagates the obligation to callers. Omitting both modifiers is an error, which forces you to make the safety decision. A field in a type with explicit or extended layout uses the same rule.

## C# language specification

For more information, see the Unsafe code chapter of the C# language specification.

For the design of the updated memory safety model, see the memory safety feature specification.

## See also

- Unsafe code best practices
