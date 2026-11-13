---
title: "Resolve errors and warnings related to indexer and element access"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/indexer-access-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to indexer and element access

This article covers the following compiler errors and warnings:

- **CS0021**: *Cannot apply indexing with [] to an expression of type 'type'*
- **CS0154**: *The property or indexer 'indexer' cannot be used in this context because it lacks the get accessor*
- **CS0271**: *The property or indexer 'indexer' cannot be used in this context because the get accessor is inaccessible*
- **CS0272**: *The property or indexer 'indexer' cannot be used in this context because the set accessor is inaccessible*
- **CS0856**: *Indexed property 'indexer' has non-optional arguments which must be provided*
- **CS0857**: *Indexed property 'indexer' must have all arguments optional*
- **CS1545**: *Property, indexer, or event 'member' is not supported by the language; try directly calling accessor methods 'method' or 'method'*
- **CS1546**: *Property, indexer, or event 'member' is not supported by the language; try directly calling accessor method 'method'*
- **CS8428**: *Invocation of implicit Index Indexer cannot name the argument.*
- **CS8429**: *Invocation of implicit Range Indexer cannot name the argument.*

These diagnostics cover element access expressions such as `value[index]`, explicit indexers, indexed properties imported from metadata or COM interop, and the implicit `Index` and `Range` indexers used by the `^` and `..` operators.

## Indexing non-indexable types

- **CS0021**: *Cannot apply indexing with [] to an expression of type 'type'*

Use `[]` only with arrays, pointer types, or types that define an applicable indexer. If the type should support element access, add an indexer declaration to the type. Otherwise, call the member that retrieves the element, or convert the value to a type that supports indexing before using `[]`.

## Accessor availability and accessibility

- **CS0154**: *The property or indexer 'indexer' cannot be used in this context because it lacks the get accessor*
- **CS0271**: *The property or indexer 'indexer' cannot be used in this context because the get accessor is inaccessible*
- **CS0272**: *The property or indexer 'indexer' cannot be used in this context because the set accessor is inaccessible*

Reading an indexer requires an accessible `get` accessor. Writing an indexer requires an accessible `set` or `init` accessor. Add the missing accessor, change the accessor accessibility, or use the indexer only in contexts where the required accessor is available.

## Indexed properties from COM and interop

- **CS0856**: *Indexed property 'indexer' has non-optional arguments which must be provided*
- **CS0857**: *Indexed property 'indexer' must have all arguments optional*
- **CS1545**: *Property, indexer, or event 'member' is not supported by the language; try directly calling accessor methods 'method' or 'method'*
- **CS1546**: *Property, indexer, or event 'member' is not supported by the language; try directly calling accessor method 'method'*

Some metadata patterns, especially from COM or other .NET languages, expose indexed properties that C# can't bind with ordinary property or indexer syntax. Supply all required indexed property arguments when the metadata requires them (**CS0856**). When C# requires indexed property arguments to be optional, change the imported member or wrapper so all arguments are optional (**CS0857**).

For unsupported imported properties, indexers, or events, call the generated accessor method directly from C# source when the accessor itself is callable (**CS1545**, **CS1546**). For example, call `get_Prop(arguments)` or `set_Prop(arguments, value)` instead of using property syntax when the member can't be represented directly in C#.

## Implicit index and range indexers

- **CS8428**: *Invocation of implicit Index Indexer cannot name the argument.*
- **CS8429**: *Invocation of implicit Range Indexer cannot name the argument.*

The compiler can synthesize an indexer for the index from end (`^`) and range (`..`) operators when a type has the required `Length` or `Count` member, an `int` indexer, or a compatible `Slice` method. Calls to those implicit `Index` or `Range` indexers must use positional arguments. Remove the argument name from the invocation and pass the `Index` or `Range` value positionally (**CS8428**, **CS8429**).

## Related diagnostics

- For more information about array indexing and rank, see Resolve errors and warnings related to array and collection declarations and initializations in C# compiler messages.
- For more information about argument lists, see Errors and warnings for parameter / argument mismatches in C# compiler messages.
- For more information about overload resolution for indexers and element access, see Fix errors that involve overload resolution in C# compiler messages.
- For more information about read-only and init-only properties, see Compiler Errors on property declarations in C# compiler messages.
- For more information about dynamic binding, see Resolve errors related to dynamic binding and the dynamic type in C# compiler messages.
- For more information about indexer access in expression trees, see Some expressions are prohibited in expression trees in C# compiler messages.
- For more information about inline array element access, see Resolve errors related to inline arrays in C# compiler messages.
