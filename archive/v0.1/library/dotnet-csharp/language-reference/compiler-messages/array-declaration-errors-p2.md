---
title: "Resolve errors and warnings related to array, collection, and stack allocation expressions (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/array-declaration-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to array, collection, and stack allocation expressions (part 2 of 2)

## Stack allocation errors

These errors indicate an invalid target conversion, lifetime, or rank and size syntax for a `stackalloc` expression.

### Invalid stack allocation target conversion

- **CS8346**: *Conversion of a stackalloc expression of type 'element type' to type 'target type' is not possible.*

A `stackalloc` expression has built-in conversions to a compatible `Span<T>` or `ReadOnlySpan<T>`. Its built-in pointer conversion is available when the expression directly initializes a local variable whose type is a pointer type or `var`. A later assignment to a pointer, or a pointer cast around the expression, produces CS8346. These restrictions apply to the built-in conversions; an applicable user-defined conversion from the pointer form can make another target type valid. The diagnostic also occurs when the span element type isn't compatible, the target is a scalar or another impermissible type, or the expression is used in a nonlocal context.

The following examples generate CS8346:

```csharp
unsafe class Example
{
    private static int* field = stackalloc int[3];

    public static void Main()
    {
        Span<int> wrongElementType = stackalloc short[3];
        double scalar = stackalloc int[3];
        Span<int> explicitCast = (Span<int>)stackalloc short[3];
        Span<int> pointerCastToSpan = (int*)stackalloc int[3];
        int* pointerCastToPointer = (int*)stackalloc int[3];
        var pointerCastWithVar = (int*)stackalloc int[3];
    }
}
```

Select a compatible `Span<T>`, `ReadOnlySpan<T>`, or pointer target. A compatible span cast is permitted; remove or change only casts whose target isn't compatible with the stack allocation element type. For a pointer result, put the `stackalloc` expression directly in the local variable declaration initializer. Keep the allocation local instead of using it in a field, property, or another invalid nonlocal context. In stable C#, the pointer declaration requires an unsafe context. In C# 15 preview, the pointer conversion can be permitted outside an unsafe context; see the updated memory safety model for current preview guidance. Operations that access memory through the pointer remain unsafe.

```csharp
unsafe class Example
{
    public static void Main()
    {
        Span<int> stackSpan = stackalloc int[3];
        short* stackPointer = stackalloc short[3];
        var inferredPointer = stackalloc int[3];
    }
}
```

An applicable user-defined conversion from the pointer form is a separate conversion path from the built-in pointer conversions. The following example compiles in C# 14 with unsafe code enabled:

```csharp
unsafe struct Example
{
    public static implicit operator Example(int* value) => new();
}

unsafe class Program
{
    public static void Main()
    {
        Example value = stackalloc int[3];
    }
}
```

### Escape and lifetime restrictions

- **CS8353**: *A result of a stackalloc expression of type 'span type' cannot be used in this context because it may be exposed outside of the containing method*

Stack-allocated memory is valid only while the containing method is running. Keep the resulting pointer or span within that method. Don't store it in a field, return it, or use it in another context where it can outlive the method.

For more information about escape scopes and related diagnostics, see Errors and warnings related to ref safety.

### Invalid rank or size syntax

- **CS8381**: *"Invalid rank specifier: expected ']'*

A `stackalloc` expression allocates a one-dimensional block of memory. When you omit the element type, use empty brackets followed by an initializer, such as `stackalloc[] { 1, 2, 3 }`. To specify a size, put the element type before the size, such as `stackalloc int[3]`. Remove commas, extra rank specifiers, and other invalid tokens before the closing `]`.

## Invalid element type

- **CS0611**: *Array elements cannot be of type 'type'*
- **CS0719**: *Array elements cannot be of static type*
- **CS0820**: *Cannot assign array initializer to an implicitly typed local*
- **CS0826**: *No best type found for implicitly typed array*

To use arrays with correct element types, follow these type restrictions. For more information, see Implicitly typed local variables and best common type.

- Don't use restricted types like `System.TypedReference` and `System.ArgIterator` as array element types (**CS0611**).
- Don't use `static` classes as array element types because you can't create instances (**CS0719**).
- Initialize implicitly typed arrays with a `new` expression (**CS0820**).
- Ensure all elements in an implicitly typed array initializer have a best common type (**CS0826**).

The following examples show how to declare implicitly typed arrays:

```csharp
var implicitType = new[] { 1, 2, 3 };
        
char c = 'c';
short s1 = 0;
short s2 = -0;
short s3 = 1;
short s4 = -1;

// common type is "int"
var commonType = new[] { s1, s2, s3, s4, c, 1 }; 
```
To ensure a best common type, use any of these techniques:

- Give the array an explicit type.
- Give all array elements the same type.
- Provide explicit casts on elements that might be causing the problem.

## Invalid array initializer

- **CS0623**: *Array initializers can only be used in a variable or field initializer. Try using a new expression instead.*
- **CS0846**: *A nested array initializer is expected.*
- **CS1925**: *Cannot initialize object of type 'type' with a collection initializer.*

These errors indicate invalid array initializer syntax. For more information, see Arrays.

To create valid array initializers:

- Use array initializers only in variable or field declarations (**CS0623**). Use a `new` expression in other contexts.
- Balance braces (`{` and `}`) around elements or child arrays (**CS0846**).
- Ensure the initializing expression matches the number of arrays in a jagged array initialization.
- Use collection initializers only with collection types, not with arrays or other types (**CS1925**).

## Invalid collection builder

- **CS9185**: *The CollectionBuilderAttribute builder type must be a non-generic class or struct.*
- **CS9186**: *The `CollectionBuilderAttribute` method name is invalid.*
- **CS9187**: *Could not find an accessible 'method-name' method with the expected signature: a static method whose last parameter is a `ReadOnlySpan<T>` for 'element type' and return type 'collection-type'.*
- **CS9188**: *'collection-type' has a CollectionBuilderAttribute but no element type.*
- **CS9221**: *The type 'type' may not be a ref struct or a type parameter allowing ref structs in order to use it as parameter 'parameter' in the generic type or method 'member'*

To create collection expressions with collection builder attributes correctly, follow these requirements. For more information, see Collection expressions.

- Ensure the target type has an iteration type that supports `foreach` (**CS9188**).
- Don't use generic types as collection builder types (**CS9185**).
- Verify the method name specified in `CollectionBuilderAttribute` is valid (**CS9186**).
- Apply `CollectionBuilderAttribute` only with methods that match the required signature: return the collection type and take a final `ReadOnlySpan<T>` parameter where `T` matches the element type (**CS9187**).
- Use an eligible element type for the builder's `ReadOnlySpan<T>` parameter. It can't be a ref struct or a type parameter that allows ref structs (**CS9221**).

## Common Language Specification warnings

- **CS3007**: *Overloaded method 'method' differing only by unnamed array types is not CLS-compliant*
- **CS3016**: *Arrays as attribute arguments is not CLS-compliant*

To write CLS-compliant code with arrays, follow these guidelines. For more information, see Language independence.

- Don't create overloaded methods that differ only in array element types (**CS3007**).
- Don't use arrays as attribute arguments (**CS3016**).

CS3007 occurs if you have an overloaded method that takes a jagged array and the only difference between the method signatures is the element type of the array. To avoid this error, consider using a rectangular array rather than a jagged array or, if CLS compliance isn't needed, remove the `System.CLSCompliantAttribute` attribute. For more information about CLS compliance, see Language independence and language-independent components.

CS3016 indicates that passing an array to an attribute isn't compliant with the Common Language Specification (CLS). For more information about CLS compliance, see Language independence and language-independent components.
