---
title: "Some expressions are prohibited in expression trees. Learn which expressions aren't allowed"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/expression-tree-restrictions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings generated from expressions prohibited in expression trees

This article covers the following compiler errors:

- **CS0765** - *Partial methods with only a defining declaration or removed conditional methods cannot be used in expression trees.*
- **CS0831** - *An expression tree may not contain a base access.*
- **CS0832** - *An expression tree may not contain an assignment operator*
- **CS0834** - *A lambda expression with a statement body cannot be converted to an expression tree.*
- **CS0835** - *Cannot convert lambda to an expression tree whose type argument 'type' is not a delegate type.*
- **CS0838** - *An expression tree may not contain a multidimensional array initializer.*
- **CS0845** - *An expression tree lambda may not contain a coalescing operator with a null or default literal left-hand side.*
- **CS0853** - *An expression tree may not contain a named argument specification.*
- **CS0854** - *An expression tree may not contain a call or invocation that uses optional arguments.*
- **CS0855** - *An expression tree may not contain an indexed property.*
- **CS1944** - *An expression tree may not contain an unsafe pointer operation.*
- **CS1945** - *An expression tree may not contain an anonymous method expression.*
- **CS1946** - *An anonymous method expression cannot be converted to an expression tree.*
- **CS1951** - *An expression tree lambda may not contain a `ref`, `in` or `out` parameter.*
- **CS1952** - *An expression tree lambda may not contain a method with variable arguments.*
- **CS1963** - *An expression tree may not contain a dynamic operation.*
- **CS1989** - *Async lambda expressions cannot be converted to expression trees.*
- **CS2037** - *An expression tree lambda may not contain a COM call with ref omitted on arguments.*
- **CS7053** - *An expression tree may not contain "feature".*
- **CS8072** - *An expression tree lambda may not contain a null propagating operator.*
- **CS8074** - *An expression tree lambda may not contain a dictionary initializer.*
- **CS8075** - *An extension `Add` method is not supported for a collection initializer in an expression lambda.*
- **CS8110** - *An expression tree may not contain a reference to a local function.*
- **CS8122** - *An expression tree may not contain an '`is`' pattern-matching operator.*
- **CS8143** - *An expression tree may not contain a tuple literal.*
- **CS8144** - *An expression tree may not contain a tuple conversion.*
- **CS8153** - *An expression tree lambda may not contain a call to a method, property, or indexer that returns by reference.*
- **CS8155** - *Lambda expressions that return by reference cannot be converted to expression trees.*
- **CS8188** - *An expression tree may not contain a throw-expression.*
- **CS8198** - *An expression tree may not contain an out argument variable declaration.*
- **CS8207** - *An expression tree may not contain a discard.*
- **CS8382** - *An expression tree may not contain a tuple `==` or `!=` operator.*
- **CS8514** - *An expression tree may not contain a switch expression.*
- **CS8640** - *Expression tree cannot contain value of ref struct or restricted type.*
- **CS8642** - *An expression tree may not contain a null coalescing assignment.*
- **CS8790** - *An expression tree may not contain a pattern `System.Index` or `System.Range` indexer access.*
- **CS8791** - *An expression tree may not contain a from-end index ('`^`') expression.*
- **CS8792** - *An expression tree may not contain a range ('`..`') expression.*
- **CS8810** - *'`&`' on method groups cannot be used in expression trees.*
- **CS8849** - *An expression tree may not contain a `with`-expression.*
- **CS8927** - *An expression tree may not contain an access of static virtual or abstract interface member.*
- **CS8952** - *An expression tree may not contain an interpolated string handler conversion.*
- **CS8972** - *A lambda expression with attributes cannot be converted to an expression tree.*
- **CS9170** - *An expression tree may not contain an inline array access or conversion.*
- **CS9175** - *An expression tree may not contain a collection expression.*
- **CS9226** - *An expression tree may not contain an expanded form of non-array params collection parameter.*
- **CS9296** - *An expression tree may not contain an extension property or indexer access*.
- **CS9307** - *An expression tree may not contain a named argument specification out of position*.
- **CS9369** - *An expression tree may not contain a union conversion.*

## Expression tree restrictions

All of the errors in the preceding list indicate you used a C# expression type that isn't allowed in an expression tree. In most cases, the prohibited expressions represent syntax introduced after C# 3.0. These expressions are prohibited because allowing them would create a breaking change in all libraries that parse expression trees. All libraries would need to be enhanced to parse new C# expressions if newer constructs were allowed.

The following expressions are prohibited:

- Invocations of partial methods that don't have an implementing declaration.
- Invocations of conditional methods that have been removed.
- Invocations of local functions.
- `async` lambda expressions.
- Using `base` to directly call a virtual method declared in a base class.
- assignment operations.
- statement lambdas.
- multi-dimensional array initializers. Instead, create and initialize a multi-dimensional array outside of the expression tree.
- `dynamic` operations.
- pattern matching expressions.
- Tuple literals and many tuple operations, such as equality comparisons.
- `throw` expressions.
- discard (`_`) declarations.
- The index and range operators.
- Non-destructive mutation using `with` expressions.
- Declaring or accessing inline arrays.
- Including collection expressions.
- Union conversions.
- The null propagating and null coalescing operators.
- `ref struct` types, such as `System.Span`1` and `System.ReadOnlySpan`1`.
- `in`, `out`, and `ref` parameters, including `out` variable declarations.
- `ref` returns.
- Calls to methods that return by `ref`.
- Accessing static abstract interface members.
- Inline arrays.
- The `params` modifier on anything other than single-dimensional arrays.

Other restrictions are:

- Can't access extension properties and indexers as extensions.
- Can't apply attributes to the lambda expression, its parameters, or return.
- The lambda expression must be convertible to a type derived from `System.Linq.Expressions.Expression` whose type parameter is a delegate type.
- Restricted named and optional parameters. The expression can't call a method specifying named arguments, and it can't use the default value of an optional parameter.
- Can't use Dictionary initializers or extension `Add` methods.
- The target expression must be a lambda expression. Constants and variables aren't allowed, but a lambda expression that returns a constant or variable is.
- Unsafe pointer operations aren't allowed.
- COM calls must include `ref` on arguments; it can't be implied.
- The unsupported `__arglist` keyword.
