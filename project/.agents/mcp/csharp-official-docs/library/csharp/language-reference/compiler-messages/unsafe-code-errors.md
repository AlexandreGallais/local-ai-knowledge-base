---
title: "Resolve errors and warnings related to using unsafe code (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/unsafe-code-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors and warnings in unsafe code constructs

This article covers the following compiler diagnostics:

- **CS0193**: *The \* or -> operator must be applied to a pointer*
- **CS0196**: *A pointer must be indexed by only one value*
- **CS0208**: *Cannot take the address of, get the size of, or declare a pointer to a managed type ('type')*
- **CS0209**: *The type of a local declared in a `fixed` statement must be a pointer type*
- **CS0210**: *You must provide an initializer in a `fixed` or `using` statement declaration*
- **CS0211**: *Cannot take the address of the given expression*
- **CS0212**: *You can only take the address of an unfixed expression inside of a `fixed` statement initializer*
- **CS0213**: *You cannot use the `fixed` statement to take the address of an already fixed expression*
- **CS0214**: *Pointers and fixed size buffers may only be used in an unsafe context*
- **CS0227**: *Unsafe code may only appear if compiling with `/unsafe`*
- **CS0233**: *'identifier' does not have a predefined size, therefore sizeof can only be used in an unsafe context*
- **CS0242**: *The operation in question is undefined on void pointers*
- **CS0244**: *Neither '`is`' nor '`as`' is valid on pointer types*
- **CS0254**: *The right hand side of a fixed statement assignment may not be a cast expression*
- **CS0459**: *Cannot take the address of a read-only local variable*
- **CS0821**: *Implicitly-typed local variables cannot be fixed*
- **CS1641**: *A fixed size buffer field must have the array size specifier after the field name*
- **CS1642**: *Fixed size buffer fields may only be members of structs*
- **CS1656**: *Cannot assign to 'variable' because it is a 'read-only variable type'*
- **CS1663**: *Fixed size buffer type must be one of the following: `bool`, `byte`, `short`, `int`, `long`, `char`, `sbyte`, `ushort`, `uint`, `ulong`, `float` or `double`*
- **CS1664**: *Fixed size buffer of length 'length' and type 'type' is too big*
- **CS1665**: *Fixed size buffers must have a length greater than zero*
- **CS1666**: *You cannot use fixed size buffers contained in unfixed expressions. Try using the fixed statement.*
- **CS1708**: *Fixed size buffers can only be accessed through locals or fields*
- **CS1716**: *Do not use '`System.Runtime.CompilerServices.FixedBuffer`' attribute. Use the 'fixed' field modifier instead.*
- **CS1919**: *Unsafe type 'type name' cannot be used in object creation*
- **CS4004**: *Cannot `await` in an unsafe context*
- **CS7092**: *A fixed buffer may only have one dimension.*
- **CS8372**: *Do not use '`System.Runtime.CompilerServices.FixedBuffer`' attribute on a property*
- **CS8385**: *The given expression cannot be used in a fixed statement*
- **CS8500**: *This takes the address of, gets the size of, or declares a pointer to a managed type ('type')*
- **CS8812**: *Cannot convert &method group 'method' to non-function pointer type 'type'.*
- **CS9049**: *A fixed field must not be a ref field.*
- **CS9123**: *The '`&`' operator should not be used on parameters or local variables in async methods.*
- **CS9360**: *This operation may only be used in an unsafe context*
- **CS9361**: *`stackalloc` expression without an initializer inside `SkipLocalsInit` may only be used in an unsafe context*
- **CS9362**: *'member' must be used in an unsafe context because it is marked as '`unsafe`'*
- **CS9363**: *'member' must be used in an unsafe context because it has pointers in its signature*
- **CS9364**: *Unsafe member 'member' cannot override safe member 'member'*
- **CS9365**: *Unsafe member 'member' cannot implicitly implement safe member 'member'*
- **CS9366**: *Unsafe member 'member' cannot implement safe member 'member'*
- **CS9367**: *`RequiresUnsafeAttribute` cannot be applied to this symbol.*
- **CS9368**: *`RequiresUnsafeAttribute` is only valid under the updated memory safety rules.*
- **CS9376**: *An unsafe context is required for constructor 'constructor' marked as '`unsafe`' to satisfy the '`new()`' constraint of type parameter 'type parameter' in 'generic type or method'*
- **CS9377**: *The '`unsafe`' modifier does not have any effect here under the current memory safety rules.*
- **CS9379**: *Do not use '`RequiresUnsafeAttribute`' in source; use the '`unsafe`' modifier instead.*
- **CS9388**: *The '`safe`' and '`unsafe`' modifiers cannot be used together.*
- **CS9389**: *'`extern`' member must be marked '`unsafe`' or '`safe`'.*
- **CS9390**: *Both partial member declarations must be marked '`safe`' or neither may be marked '`safe`'*
- **CS9392**: *Field in a type with explicit or extended layout, nonzero packing size, or nonzero size must be marked '`unsafe`' or '`safe`'.*
- **CS9396**: *Cannot specify '`unsafe`' or '`safe`' modifiers on both property or indexer 'property' and its accessor. Remove one of them.*
- **CS9397**: *Cannot specify the same '`unsafe`' or '`safe`' modifier on all accessors of property or indexer 'property'. Instead, put that modifier on the property itself.*
- **CS9398**: *Cannot await in context of a '`fixed`' statement*
- **CS9401**: *Unsafe or safe declaration modifiers may only appear if compiling with /unsafe.*

## Pointer operations and dereferencing

- **CS0193**: *The `*` or `->` operator must be applied to a pointer*
- **CS0196**: *A pointer must be indexed by only one value*
- **CS0242**: *The operation in question is undefined on void pointers*

To use pointer operations correctly, follow the rules for dereferencing, indexing, and arithmetic operations. For more information, see Pointer types and Function pointers.

- Apply the `*` or `->` operator only to data pointers (**CS0193**). Don't use these operators with nonpointer types or function pointers. Unlike in C/C++, you can't dereference function pointers in C#.
- Index pointers with only one value (**CS0196**). Pointers don't support multidimensional indexing.
- Avoid operations that are undefined on void pointers (**CS0242**). For example, don't increment a void pointer because the compiler doesn't know the size of the data being pointed to.

## Pointer types and managed types

- **CS0208**: *Cannot take the address of, get the size of, or declare a pointer to a managed type ('type')*
- **CS0233**: *'identifier' does not have a predefined size, therefore sizeof can only be used in an unsafe context*
- **CS8500**: *This takes the address of, gets the size of, or declares a pointer to a managed type ('type')*

To work with pointers and the `sizeof` operator correctly, use unmanaged types and proper contexts. For more information, see Unmanaged types and the `sizeof` operator.

- Use pointers only with unmanaged types (**CS0208**). Don't take the address of, get the size of, or declare pointers to managed types. Managed types include reference types and structs that contain reference type fields or properties.
- Use the `sizeof` operator within an `unsafe` context when working with types whose size isn't a compile-time constant (**CS0233**).
- Avoid taking the address of, getting the size of, or declaring a pointer to a managed type (**CS8500**). This warning (level 4) fires when the compiler detects pointer operations on managed types. A managed type is any reference type, or any struct that contains a reference type as a field or property. For more information, see Unmanaged types.

## Fixed statement usage

- **CS0209**: *The type of a local declared in a fixed statement must be a pointer type*
- **CS0210**: *You must provide an initializer in a fixed or `using` statement declaration*
- **CS0211**: *Cannot take the address of the given expression*
- **CS0212**: *You can only take the address of an unfixed expression inside of a fixed statement initializer*
- **CS0213**: *You cannot use the fixed statement to take the address of an already fixed expression*
- **CS0254**: *The right hand side of a fixed statement assignment may not be a cast expression*
- **CS0459**: *Cannot take the address of a read-only local variable*
- **CS0821**: *Implicitly-typed local variables cannot be fixed*
- **CS1656**: *Cannot assign to 'variable' because it is a 'read-only variable type'*
- **CS8385**: *The given expression cannot be used in a fixed statement*

These errors occur when you use the `fixed` statement incorrectly. The `fixed` statement prevents the garbage collector from relocating a movable variable and declares a pointer to that variable. For more information, see Unsafe code and pointers.

To use the `fixed` statement correctly:

- Declare the variable as a pointer type (**CS0209**).
- Provide an initializer in the `fixed` statement declaration (**CS0210**).
- Take the address only of valid expressions: fields, local variables, and pointer indirection (**CS0211**). Don't take the address of computed expressions like the sum of two variables.
- Use the address-of operator on unfixed expressions only within the `fixed` statement initializer (**CS0212**).
- Don't use a `fixed` statement on already-fixed expressions (**CS0213**). Local variables and parameters in an `unsafe` method are already fixed on the stack.
- Don't use cast expressions on the right side of a `fixed` statement assignment (**CS0254**).
- Don't take the address of read-only local variables (**CS0459**). Variables in `foreach` loops, `using` statements, and `fixed` statements are read-only. This error is no longer produced by current versions of the compiler.
- Use explicit types instead of `var` in `fixed` statements (**CS0821**).
- Don't assign to variables in read-only contexts like `foreach` loops, `using` statements, or `fixed` statements (**CS1656**).
- Use only expressions that support pinning in a `fixed` statement (**CS8385**). The expression must be an addressable variable, a string, or a type that implements a suitable `GetPinnableReference` method.
