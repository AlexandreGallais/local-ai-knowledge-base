---
title: "Resolve errors and warnings related to using unsafe code (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/unsafe-code-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to using unsafe code (part 2 of 2)

## Unsafe context requirements

- **CS0214**: *Pointers and fixed size buffers may only be used in an unsafe context*
- **CS0227**: *Unsafe code may only appear if compiling with /unsafe*
- **CS0244**: *Neither '`is`' nor '`as`' is valid on pointer types*
- **CS1919**: *Unsafe type 'type name' cannot be used in object creation*
- **CS4004**: *Cannot `await` in an unsafe context*
- **CS9123**: *The '`&`' operator should not be used on parameters or local variables in async methods*
- **CS9360**: *This operation may only be used in an unsafe context*
- **CS9361**: *`stackalloc` expression without an initializer inside `SkipLocalsInit` may only be used in an unsafe context*
- **CS9362**: *'member' must be used in an unsafe context because it is marked as '`unsafe`'*
- **CS9363**: *'member' must be used in an unsafe context because it has pointers in its signature*
- **CS9376**: *An unsafe context is required for constructor 'constructor' marked as '`unsafe`' to satisfy the '`new()`' constraint of type parameter 'type parameter' in 'generic type or method'*
- **CS9398**: *Cannot await in context of a '`fixed`' statement*
- **CS9401**: *Unsafe or safe declaration modifiers may only appear if compiling with /unsafe.*

These diagnostics occur when you use unsafe code constructs without the required `unsafe` context, or when you attempt operations that aren't allowed with unsafe types. For more information, see Unsafe code and pointers and the `unsafe` keyword.

- Mark methods, types, or code blocks that use pointers or fixed-size buffers with the `unsafe` keyword (**CS0214**). The compiler requires an explicit unsafe context for any code that works with pointer types or fixed-size buffer fields.
- Enable the **AllowUnsafeBlocks** compiler option in your project settings (**CS0227**). Without this option, the compiler rejects all `unsafe` blocks even if the code is otherwise correct.
- Enable **AllowUnsafeBlocks** for `unsafe` and `safe` declaration modifiers (**CS9401**). Set `<AllowUnsafeBlocks>true</AllowUnsafeBlocks>` in your project file even if the declaration's body contains no unsafe operation or you haven't enabled the updated memory safety rules. Enable the same option for an `unsafe` block that produces **CS0227**.
- Don't use the `is` or `as` operators with pointer types (**CS0244**). These type-testing operators aren't valid for pointers because pointers don't participate in the type hierarchy.
- Don't use the `new` operator to create pointer type instances (**CS1919**). To create objects in unmanaged memory, use interop to call native methods that return pointers.
- Treat **CS4004** as legacy guidance. In C# 14 and earlier, `await` inside an unsafe context isn't allowed. Under the C# 15 preview memory safety changes, `await` is allowed in an unsafe context, so this blanket restriction no longer describes the current rule.
- Don't use the address-of operator (`&`) on parameters or local variables in async methods (**CS9123**). The variable might not exist on the stack when the async operation resumes after a suspension point.
- Mark operations that involve unsafe constructs (such as pointer dereferencing, address-of, or `sizeof` on unmanaged types) with the `unsafe` keyword (**CS9360**). Under C# 15's updated memory safety rules, the compiler identifies individual operations that require an unsafe context.
- Use the `unsafe` keyword for `stackalloc` expressions without initializers when the `SkipLocalsInit` attribute is applied (**CS9361**). Without an initializer, the stack-allocated memory contains uninitialized data, which is an unsafe operation.
- Use an `unsafe` context when calling members marked `unsafe` (**CS9362**), or members with pointers in their signatures (**CS9363**). Under the updated memory safety model, the compiler reports CS9362 for members that explicitly propagate the safety obligation to the caller and CS9363 for legacy compatibility cases where the signature itself contains pointers.
- Use an `unsafe` context for generic type or method instantiations when a type argument's parameterless constructor is marked `unsafe` (**CS9376**). Apply this fix for both `new()` and `struct` constraints, even if no constructor call appears at the use site. Check type arguments on extension blocks and generic extension methods as well.
- Move `await` outside the body or initializer of a `fixed` statement (**CS9398**). The C# 15 preview allows `await` in an unsafe context, but the pinning lifetime of a `fixed` statement still can't span an async suspension point. Await the operation before entering `fixed`, or exit the `fixed` statement before awaiting.

For **CS9376** in an expression, put the generic method call, generic object creation, or extension-member access inside an `unsafe` block. For a generic base type, field type, or `using` alias, fix the declaration itself; don't wrap a later use or rely on an `unsafe` member modifier, which propagates an obligation to callers rather than establishing an unsafe context. For a declaration that can't provide the required context, use a type with a safe parameterless constructor or redesign the generic API, for example to accept a factory instead of requiring `new()`.

## Unsafe member safety contracts

- **CS9364**: *Unsafe member 'member' cannot override safe member 'member'*
- **CS9365**: *Unsafe member 'member' cannot implicitly implement safe member 'member'*
- **CS9366**: *Unsafe member 'member' cannot implement safe member 'member'*
- **CS9367**: *`RequiresUnsafeAttribute` cannot be applied to this symbol.*
- **CS9368**: *`RequiresUnsafeAttribute` is only valid under the updated memory safety rules.*
- **CS9377**: *The '`unsafe`' modifier does not have any effect here under the current memory safety rules.*
- **CS9379**: *Do not use '`RequiresUnsafeAttribute`' in source; use the '`unsafe`' modifier instead.*
- **CS9388**: *The '`safe`' and '`unsafe`' modifiers cannot be used together.*
- **CS9389**: *'`extern`' member must be marked '`unsafe`' or '`safe`'.*
- **CS9390**: *Both partial member declarations must be marked '`safe`' or neither may be marked '`safe`'*
- **CS9396**: *Cannot specify '`unsafe`' or '`safe`' modifiers on both property or indexer 'property' and its accessor. Remove one of them.*
- **CS9397**: *Cannot specify the same '`unsafe`' or '`safe`' modifier on all accessors of property or indexer 'property'. Instead, put that modifier on the property itself.*

These diagnostics enforce the C# 15 safety contract rules for members marked as unsafe. The compiler ensures that unsafe members don't violate the safety expectations established by base classes and interfaces. For more information, see Unsafe code and pointers and the `unsafe` keyword.

- Don't override a safe base member with an unsafe member (**CS9364**). An override must preserve the safety contract of the base member. If the base member is safe, the override must also be safe. Remove the `unsafe` modifier or `RequiresUnsafeAttribute` from the overriding member, or mark the base member as unsafe.
- Don't implicitly implement a safe interface member with an unsafe member (**CS9365**). When a type implicitly implements an interface member, callers through the interface expect a safe operation. Remove the unsafe designation from the implementing member, or use explicit interface implementation.
- Don't explicitly implement a safe interface member with an unsafe member (**CS9366**). Even with explicit implementation, the safety contract of the interface member must be preserved.
- Apply `RequiresUnsafeAttribute` only to supported symbol types (**CS9367**). This attribute can be applied to methods, properties, events, constructors, and types, but not all symbol kinds support it.
- Enable the updated memory safety rules to use `RequiresUnsafeAttribute` (**CS9368**). This attribute is part of C# 15's refined memory safety model and isn't recognized under legacy rules. Ensure your project targets a language version that supports the updated rules.
- Remove the `unsafe` modifier when it has no effect (**CS9377**). Under the current memory safety rules, certain contexts don't require or benefit from the `unsafe` modifier. The compiler warns when the modifier is meaningless so you can clean up unnecessary annotations.
- Use the `unsafe` modifier directly on the member declaration instead of applying `RequiresUnsafeAttribute` in source (**CS9379**). The attribute is intended for metadata representation only; in source code, the `unsafe` keyword is the correct mechanism.
- Choose either `safe` or `unsafe` for a declaration, not both (**CS9388**). The `safe` modifier marks the declaration as not requires-unsafe; it isn't limited to `extern` members.
- Mark every `extern` member as either `unsafe` or `safe` (**CS9389**). Under the updated memory safety rules, extern members must explicitly declare their safety contract because the compiler can't verify the implementation.
- Ensure both partial member declarations agree on the `safe` modifier (**CS9390**). If one partial declaration is marked `safe`, the other must also be marked `safe` to maintain a consistent safety contract.
- Put `unsafe` or `safe` on either the property or indexer, or on an accessor, but not both (**CS9396**). If the property sets the contract for all accessors, place the modifier on the property itself. If only one accessor differs, put the modifier on that accessor and leave the property unmodified.
- If every accessor of a property or indexer would have the same `unsafe` or `safe` modifier, move that modifier to the property or indexer declaration (**CS9397**). Use accessor modifiers only when the accessors intentionally differ.

## Field layout safety

- **CS9392**: *Field in a type with explicit or extended layout, nonzero packing size, or nonzero size must be marked '`unsafe`' or '`safe`'.*

Under the updated memory safety rules, mark every instance field in a type with `[StructLayout(LayoutKind.Explicit)]` or `[ExtendedLayout]` as either `safe` or `unsafe`. Apply the same modifiers to instance fields in types whose `StructLayoutAttribute` specifies a nonzero `Pack` or `Size`, even with `LayoutKind.Sequential` or `LayoutKind.Auto`. For example, `[StructLayout(LayoutKind.Sequential, Pack = 1)]` requires an explicit safety choice for each instance field.

Choose `safe` when you can attest that ordinary field access preserves the required invariants. Choose `unsafe` when callers must audit those invariants. For more information, see Unsafe code and pointers and the `safe` keyword.

- For an auto-property, a property that uses `field`, or a field-like event, put the modifier on the owning property or event to cover its synthesized backing field.
- If a captured primary-constructor parameter or a positional record member introduces unannotated storage, replace the implicit storage with an explicitly declared, annotated field or property. A primary-constructor parameter isn't a place to put a `safe` or `unsafe` field modifier.
- If the field doesn't need per-instance storage, change it to a static field or a constant to remove the error. Alternatively, use a computed property or custom event with no backing field.
- Unspecified or zero `Pack` and `Size` values don't trigger the expanded rule by themselves. Explicit or extended layout still requires annotations independently of those values.
- These checks require the updated memory safety rules. Merely setting `LangVersion` to `preview` doesn't enable their enforcement.

## Fixed-size buffers

- **CS1641**: *A fixed size buffer field must have the array size specifier after the field name*
- **CS1642**: *Fixed size buffer fields may only be members of structs*
- **CS1663**: *Fixed size buffer type must be one of the following: `bool`, `byte`, `short`, `int`, `long`, `char`, `sbyte`, `ushort`, `uint`, `ulong`, `float` or `double`*
- **CS1664**: *Fixed size buffer of length 'length' and type 'type' is too big*
- **CS1665**: *Fixed size buffers must have a length greater than zero*
- **CS1666**: *You cannot use fixed size buffers contained in unfixed expressions. Try using the fixed statement.*
- **CS1708**: *Fixed size buffers can only be accessed through locals or fields*
- **CS1716**: *Do not use '`System.Runtime.CompilerServices.FixedBuffer`' attribute. Use the 'fixed' field modifier instead.*
- **CS7092**: *A fixed buffer may only have one dimension.*
- **CS8372**: *Do not use '`System.Runtime.CompilerServices.FixedBuffer`' attribute on a property*
- **CS9049**: *A fixed field must not be a ref field.*

These errors occur when you work with fixed-size buffers. Fixed-size buffers are arrays embedded directly in structs and are primarily used for interop scenarios. For more information, see Fixed-size buffers.

To declare and use fixed-size buffers correctly:

- Specify the array size after the field name using a positive integer constant (**CS1641**, **CS1665**). The total size of the buffer (element count multiplied by element size) must not exceed 2^31 bytes (**CS1664**).
- Declare fixed-size buffers only in structs, not in classes (**CS1642**). Use a regular array if you need the field in a class.
- Use one of the supported element types: `bool`, `byte`, `short`, `int`, `long`, `char`, `sbyte`, `ushort`, `uint`, `ulong`, `float`, or `double` (**CS1663**).
- Use a `fixed` statement to pin the containing struct before accessing the buffer (**CS1666**).
- Access fixed-size buffers only through locals or fields, not through intermediate expressions (**CS1708**).
- Use the `fixed` field modifier instead of the `System.Runtime.CompilerServices.FixedBuffer` attribute (**CS1716**). Don't apply this attribute to properties either (**CS8372**).
- Declare fixed buffers with only one dimension (**CS7092**). Multidimensional fixed buffers aren't supported.
- Don't declare fixed-size buffers as `ref` fields (**CS9049**). Fixed-size buffers must be value fields.

## Function pointers

- **CS8812**: *Cannot convert &method group 'method' to non-function pointer type 'type'.*

To get a function pointer, use the address-of operator with an explicit function pointer type cast. Don't use the address-of operator `&` to assign method groups to `void*` or other non-function pointer types. For more information, see Function pointers.
