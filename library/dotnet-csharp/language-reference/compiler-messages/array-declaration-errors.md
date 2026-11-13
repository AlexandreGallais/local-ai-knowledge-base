---
title: "Resolve errors and warnings related to array, collection, and stack allocation expressions (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/array-declaration-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings in array, collection, and stack allocation expressions

This article covers the following compiler errors and warnings:

- **CS0022**: *Wrong number of indices inside [], expected 'number'*
- **CS0178**: *Invalid rank specifier: expected '`,`' or '`]`'*
- **CS0248**: *Cannot create an array with a negative size*
- **CS0251**: *Indexing an array with a negative index (array indices always start at zero)*
- **CS0270**: *Array size cannot be specified in a variable declaration (try initializing with a '`new`' expression)*
- **CS0611**: *Array elements cannot be of type*
- **CS0623**: *Array initializers can only be used in a variable or field initializer. Try using a new expression instead.*
- **CS0650**: *Bad array declarator: To declare a managed array the rank specifier precedes the variable's identifier. To declare a fixed size buffer field, use the fixed keyword before the field type.*
- **CS0719**: *Array elements cannot be of static type*
- **CS0747**: *Invalid initializer member declarator.*
- **CS0820**: *Cannot assign array initializer to an implicitly typed local*
- **CS0826**: *No best type found for implicitly typed array.*
- **CS0846**: *A nested array initializer is expected*
- **CS1062**: *The best overloaded Add method for the collection initializer element is obsolete.*
- **CS1063**: *The best overloaded Add method for the collection initializer element is obsolete.*
- **CS1064**: *The best overloaded Add method for the collection initializer element is obsolete.*
- **CS1552**: *Array type specifier, `[]`, must appear before parameter name*
- **CS1586**: *Array creation must have array size or array initializer*
- **CS1920**: *Element initializer cannot be empty.*
- **CS1921**: *The best overloaded method match has wrong signature for the initializer element. The initializable `Add` must be an accessible instance method.*
- **CS1922**: *Cannot initialize type 'type' with a collection initializer because it does not implement 'System.Collections.IEnumerable'*
- **CS1925**: *Cannot initialize object of type 'type' with a collection initializer.*
- **CS1950**: *The best overloaded Add method for the collection initializer has some invalid arguments.*
- **CS1954**: *The best overloaded method match for the collection initializer element cannot be used. Collection initializer '`Add`' methods cannot have `ref` or `out` parameters.*
- **CS3007**: *Overloaded method 'method' differing only by unnamed array types is not CLS-compliant*
- **CS3016**: *Arrays as attribute arguments is not CLS-compliant*
- **CS8346**: *Conversion of a stackalloc expression of type 'element type' to type 'target type' is not possible.*
- **CS8353**: *A result of a stackalloc expression of type 'span type' cannot be used in this context because it may be exposed outside of the containing method*
- **CS8381**: *"Invalid rank specifier: expected ']'*
- **CS9174**: *Cannot initialize type with a collection literal because the type is not constructible.*
- **CS9176**: *There is no target type for the collection literal.*
- **CS9185**: *The CollectionBuilderAttribute builder type must be a non-generic class or struct.*
- **CS9186**: *The CollectionBuilderAttribute method name is invalid.*
- **CS9187**: *Could not find an accessible 'method-name' method with the expected signature: a static method whose last parameter is a `ReadOnlySpan<T>` for 'element type' and return type 'collection-type'.*
- **CS9188**: *'collection-type' has a CollectionBuilderAttribute but no element type.*
- **CS9203**: *A collection expression of this type cannot be used in this context because it may be exposed outside of the current scope.*
- **CS9208**: *Collection expression of type 'collection-type' may incur unexpected heap allocations. Consider explicitly creating an array, then converting to 'collection-type' to make the allocation explicit.*
- **CS9209**: *Collection expression of type 'collection-type' may incur unexpected heap allocations due to the use of '`..`' spreads. Consider explicitly creating an array, then converting to 'collection-type' to make the allocation explicit.*
- **CS9210**: *This version of `System.Collections.Immutable.ImmutableArray`1`cannot be used with collection expressions.*
- **CS9212**: *Spread operator '`..`' cannot operate on variables of type 'type' because 'type' does not contain a public instance or extension definition for 'member'*
- **CS9213**: *Collection expression target 'type' has no element type.*
- **CS9214**: *Collection expression type must have an applicable constructor that can be called with no arguments.*
- **CS9215**: *Collection expression type 'type' must have an instance or extension method 'Add' that can be called with a single argument.*
- **CS9221**: *The type 'type' may not be a ref struct or a type parameter allowing ref structs in order to use it as parameter 'parameter' in the generic type or method 'member'*
- **CS9222**: *Collection initializer results in an infinite chain of instantiations of collection 'type'.*
- **CS9332**: *Cannot use '..' spread operator in the filter expression of a catch clause.*
- **CS9354**: *'with(...)' element must be the first element*
- **CS9355**: *'with(...)' elements are not supported for type 'type'*
- **CS9356**: *'with(...)' element arguments cannot be dynamic*
- **CS9357**: *'with(...)' element for a read-only interface must be empty if present*
- **CS9358**: *Element type of this collection may not be a ref struct or a type parameter allowing ref structs*
- **CS9359**: *No overload for method 'method' takes number 'with(...)' element arguments*

## Invalid array element access

- **CS0022**: *Wrong number of indices inside [], expected 'number'*
- **CS0251**: *Indexing an array with a negative index (array indices always start at zero)*

To access array elements correctly, follow these indexing rules. For more information, see Arrays.

- Specify the same number of indices as declared dimensions (**CS0022**). A one-dimensional array needs one index; a three-dimensional array needs three indices.
- Use only non-negative integers for array indices (**CS0251**). Array indices always start at zero.

## Invalid collection initializer

- **CS0747**: *Invalid initializer member declarator.*
- **CS1062**: *The best overloaded Add method for the collection initializer element is obsolete.*
- **CS1063**: *The best overloaded Add method for the collection initializer element is obsolete.*
- **CS1064**: *The best overloaded Add method for the collection initializer element is obsolete.*
- **CS1920**: *Element initializer cannot be empty.*
- **CS1921**: *The best overloaded method match has wrong signature for the initializer element. The initializable `Add` must be an accessible instance method.*
- **CS1922**: *Cannot initialize type 'type' with a collection initializer because it does not implement 'System.Collections.IEnumerable'*
- **CS1950**: *The best overloaded Add method for the collection initializer has some invalid arguments.*
- **CS1954**: *The best overloaded method match for the collection initializer element cannot be used. Collection initializer '`Add`' methods cannot have `ref` or `out` parameters.*
- **CS9174**: *Cannot initialize type with a collection literal because the type is not constructible.*
- **CS9176**: *There is no target type for the collection literal.*
- **CS9203**: *A collection expression of this type cannot be used in this context because it may be exposed outside of the current scope.*
- **CS9208**: *Collection expression of type 'collection-type' may incur unexpected heap allocations. Consider explicitly creating an array, then converting to 'collection-type' to make the allocation explicit.*
- **CS9209**: *Collection expression of type 'collection-type' may incur unexpected heap allocations due to the use of '`..`' spreads. Consider explicitly creating an array, then converting to 'collection-type' to make the allocation explicit.*
- **CS9210**: *This version of `System.Collections.Immutable.ImmutableArray`1` can't be used with collection expressions.*
- **CS9212**: *Spread operator '`..`' cannot operate on variables of type 'type' because 'type' does not contain a public instance or extension definition for 'member'*
- **CS9213**: *Collection expression target 'type' has no element type.*
- **CS9214**: *Collection expression type must have an applicable constructor that can be called with no arguments.*
- **CS9215**: *Collection expression type 'type' must have an instance or extension method 'Add' that can be called with a single argument.*
- **CS9222**: *Collection initializer results in an infinite chain of instantiations of collection 'type'.*
- **CS9332**: *Cannot use '..' spread operator in the filter expression of a catch clause.*

To create valid collection initializers, follow these rules. For more information, see Collection expressions.

- Don't mix property initialization with element addition in the same initializer (**CS0747**).
- Include at least one element in collection initializers with braces (**CS1920**).
- If the type represents a collection, ensure it implements `System.Collections.IEnumerable` (**CS1922**).
- If the type doesn't represent a collection, use an object initializer instead of a collection initializer (**CS1922**).
- If you can't modify a collection type that doesn't implement `System.Collections.IEnumerable`, initialize its elements by using constructors or other methods (**CS1922**).
- Use collection initializers only with collection types (**CS1925**).
- Verify the `Add` method is accessible, takes one parameter matching the element type, and doesn't use `ref` or `out` modifiers (**CS1921**, **CS1954**).
- Resolve ambiguous `Add` method overloads (**CS1950**).
- Provide an explicit target type for collection expressions when the compiler can't infer it (**CS9176**, **CS9213**).
- Ensure the collection type is constructible with a parameterless constructor (**CS9174**, **CS9214**).
- Don't use `ref struct` types in collection expressions that may violate ref safety (**CS9203**).
- Update to a compatible runtime version for `ImmutableArray` collection expressions (**CS9210**).
- Implement enumeration patterns (like `GetEnumerator`) for spread operator support (**CS9212**).
- Avoid circular dependencies in collection initialization (**CS9222**).
- Don't use the spread operator in catch clause filter expressions (**CS9332**).

The following example produces CS1922 because `TestClass` doesn't implement `System.Collections.IEnumerable`. The object initializer assigns properties instead of trying to add collection elements:

```csharp
public class Test
{
    public static void Main()
    {
        var invalid = new TestClass { 1, "hello" }; // CS1922
        var valid = new TestClass { MemberA = 1, MemberB = "hello" };
    }
}

public class TestClass
{
    public int MemberA { get; set; }
    public string MemberB { get; set; } = "";
}
```

## Invalid collection expression element type

- **CS9358**: *Element type of this collection may not be a ref struct or a type parameter allowing ref structs*

The collection target doesn't support a `ref struct` element type or a type parameter that allows ref-like types. Use a non-ref-like element type. For generic code, use a type parameter that doesn't allow ref-like types.

## Invalid collection expression arguments

- **CS9354**: *'with(...)' element must be the first element*
- **CS9355**: *'with(...)' elements are not supported for type 'type'*
- **CS9356**: *'with(...)' element arguments cannot be dynamic*
- **CS9357**: *'with(...)' element for a read-only interface must be empty if present*
- **CS9359**: *No overload for method 'method' takes number 'with(...)' element arguments*

For the supported targets and syntax, see Collection expression arguments.

- **CS9354**: The `with(...)` element follows another collection element, or the expression contains more than one `with(...)` element. Move the single `with(...)` element to the first position.
- **CS9355**: The target type doesn't support collection expression arguments, as with arrays and span types. Remove the `with(...)` element, or change the target to a type that supports collection expression arguments.
- **CS9356**: An argument in the `with(...)` element has the compile-time type `dynamic`. Cast or convert each dynamic argument to the intended non-dynamic type.
- **CS9357**: A read-only interface target supports only an empty `with()` element. Remove the arguments, remove the `with()` element, or use a target type that accepts those arguments.
- **CS9359**: No accessible constructor, collection builder method, or supported interface signature accepts the supplied number of `with(...)` arguments. Match the arguments to an applicable constructor or interface signature. For a collection builder, match them to parameters before the final `ReadOnlySpan<T>` parameter, or add a matching overload.

## Invalid array rank

- **CS0178**: *Invalid rank specifier: expected '`,`' or '`]`'*
- **CS0650**: *Bad array declarator: To declare a managed array the rank specifier precedes the variable's identifier. To declare a fixed size buffer field, use the fixed keyword before the field type.*
- **CS1552**: *Array type specifier, `[]`, must appear before parameter name*

To declare arrays correctly, follow the proper syntax order. For more information, see Arrays and the C# Language Specification section on array initializers.

An array declaration consists of these tokens in order:

1. The type of array elements (for example, `int`, `string`, or `SomeClassType`).
2. The array brackets, optionally including commas for multiple dimensions.
3. The variable name.

When specifying array dimensions, you can use:

- A number of elements in braces (`{` and `}`)
- Empty brackets
- One or more commas enclosed in brackets

The following examples show valid array declarations:

```csharp
int[] anArrayOfIntegers;
string[,,] threeDimensionalStringArray;
```
## Invalid array length

- **CS0248**: *Cannot create an array with a negative size*
- **CS0270**: *Array size cannot be specified in a variable declaration (try initializing with a 'new' expression)*
- **CS1586**: *Array creation must have array size or array initializer*

To create arrays with valid lengths, specify the size during initialization, not declaration. For more information, see Arrays.

- Specify array length as part of initialization, not declaration (**CS0270**).
- Use only positive integers for array dimensions (**CS0248**).
- Provide either a size in a `new` expression or an array initializer (**CS1586**).

The following example shows both mechanisms:

```csharp
int[] fiveIntegers = new int[5];
string[] weekDays = { "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" };
```
