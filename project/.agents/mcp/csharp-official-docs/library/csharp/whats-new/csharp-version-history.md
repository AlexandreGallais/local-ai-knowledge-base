---
title: "The history of C# (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/whats-new/csharp-version-history.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The history of C\#

This article provides a history of each major release of the C# language. The C# team is continuing to innovate and add new features. Detailed language feature status, including features considered for upcoming releases can be found on the dotnet/roslyn repository on GitHub. To find when a particular feature was added to the language, consult the C# version history file in the `dotnet/csharplang` repository on GitHub.

> **Important:**
> The C# language relies on types and methods in what the C# specification defines as a *standard library* for some of the features. The .NET platform delivers those types and methods in a number of packages. One example is exception processing. Every `throw` statement or expression is checked to ensure the object being thrown is derived from `System.Exception`. Similarly, every `catch` is checked to ensure that the type being caught is derived from `System.Exception`. Each version may add new requirements. To use the latest language features in older environments, you may need to install specific libraries. These dependencies are documented in the page for each specific version. You can learn more about the relationships between language and library for background on this dependency.

## C# version 15

*Released November 2026*

C# 15 includes the following new features:

- Collection expression arguments
- Union types
- Closed hierarchies
- Extension indexers
- Labeled `break` and `continue`
- Non-virtual static interface members on older runtimes
- Memory safety (preview feature)

## C# version 14

*Released November 2025*

C# 14 includes the following new features:

- Extension members
- Null-conditional assignment
- `nameof` supports unbound generic types
- More implicit conversions for `Span<T>` and `ReadOnlySpan<T>`
- Modifiers on simple lambda parameters
- `field` backed properties
- `partial` events and constructors
- user-defined compound assignment operators

## C# version 13

*Released November 2024*

C# 13 includes the following new features:

- `params` collections: the `params` modifier isn't limited to array types. You can now use `params` with any recognized collection type, including `Span<T>`, and interface types.
- New `lock` type and semantics: If the target of a `lock` statement is a `System.Threading.Lock`, compiler generates code to use the `System.Threading.Lock.EnterScope` method to enter an exclusive scope. The `ref struct` returned from that supports the `Dispose()` pattern to exit the exclusive scope.
- New escape sequence - `\e`: You can use `\e` as a character literal escape sequence for the `ESCAPE` character, Unicode `U+001B`.
- Small optimizations to overload resolution involving method groups.
- Implicit indexer access in object initializers: The implicit "from the end" index operator, `^`, is now allowed in an object initializer expression.
- You can use `ref` locals and `unsafe` contexts in iterators and async methods.
- You can use `ref struct` types to implement interfaces.
- You can allow `ref struct` types as arguments for type parameters in generics.
- Partial properties and indexers are now allowed in `partial` types.
- Overload resolution priority allows library authors to designate one overload as better than others.

## C# version 12

*Released November 2023*

The following features were added in C# 12:

- Primary constructors - Declare constructor parameters on any `class` or `struct` type. Only record types synthesize public properties for those parameters. See the primary constructors tutorial for examples.
- Collection expressions - Create collections with square brackets and use the spread element, `..e`, to include elements from other collections. See also §12.8.25 Collection expressions.
- Inline arrays - Declare an array of fixed size in a `struct` type.
- Optional parameters in lambda expressions - Define default values for lambda parameters with the same syntax and rules as methods and local functions.
- `ref readonly` parameters - Express that an API expects a variable passed by readonly reference. See the `ref readonly` parameters feature specification for migration and compatibility details.
- Alias any type - Create aliases for tuple, array, and pointer types, not just named types. See §14.6.2 Using alias directives and the alias any type refactoring walkthrough.
- Experimental attribute - Mark types, methods, or assemblies with `System.Diagnostics.CodeAnalysis.ExperimentalAttribute` so the compiler warns callers about experimental APIs. See the feature specification for details.

C# 12 shipped with the .NET 8 SDK. For supported target frameworks and language version configuration, see C# language versioning.

### Interceptors

Interceptors debuted as an experimental preview feature with C# 12. An *interceptor* is a method that substitutes for a call to another method at compile time. The interceptor identifies the source locations of the calls it intercepts. Source generators can use interceptors to replace calls in existing source code, rather than only add code to a compilation.

> **Warning:**
> The C# 12 interceptors preview was subject to breaking changes or removal and wasn't recommended for production or released applications.
>
> The preview required the user project to specify `<InterceptorsPreviewNamespaces>`, a list of namespaces allowed to contain interceptors. For example: `<InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);Microsoft.AspNetCore.Http.Generated;MyLibrary.Generated</InterceptorsPreviewNamespaces>`.

For compiler requirements and updates to the feature, see the interceptors feature specification.

## C# version 11

*Released November 2022*

The following features were added in C# 11:

- Raw string literals.
- Generic math support.
- Generic attributes.
- UTF-8 string literals.
- Newlines in string interpolation expressions.
- List patterns.
- File-local types.
- Required members.
- Auto-default structs.
- Pattern match `Span<char>` on a constant `string`.
- Extended `nameof` scope.
- The `nint` and `uint` keywords alias `System.IntPtr` and `System.UIntPtr``System.UIntPtr`, respectively.
- `ref` fields and `scoped ref`
- Improved method group conversion to delegate.
- Warning wave 7

C# 11 introduces *generic math* and several features that support that goal. You can write numeric algorithms once for all number types. There's more features to make working with `struct` types easier, like required members and auto-default structs. Working with strings gets easier with Raw string literals, newline in string interpolations, and UTF-8 string literals. Features like file local types enable source generators to be simpler. Finally, list patterns add more support for pattern matching.

## C# version 10

*Released November 2021*

C# 10 adds the following features and enhancements to the C# language:

- Record structs
- Improvements of structure types
- Interpolated string handlers
- `global using` directives
- File-scoped namespace declaration
- Extended property patterns
- Lambda expressions can have a natural type, where the compiler can infer a delegate type from the lambda expression or method group.
- Lambda expressions can declare a return type when the compiler can't infer it.
- Attributes can be applied to lambda expressions.
- In C# 10, `const` strings can be initialized using string interpolation if all the placeholders are themselves constant strings.
- In C# 10, you can add the `sealed` modifier when you override `ToString` in a record type.
- Warnings for definite assignment and null-state analysis are more accurate.
- Allow both assignment and declaration in the same deconstruction.
- Allow `AsyncMethodBuilder` attribute on methods
- CallerArgumentExpression attribute
- C# 10 supports a new format for the `#line` pragma.

C# 10 continues work on themes of removing ceremony, separating data from algorithms, and improved performance for the .NET Runtime.

Many of the features mean you type less code to express the same concepts. *Record structs* synthesize many of the same methods that *record classes* do. Structs and anonymous types support *with expressions*. *Global using directives* and *file scoped namespace declarations* mean you express dependencies and namespace organization more clearly. *Lambda improvements* make it easier to declare lambda expressions where they're used. New property patterns and deconstruction improvements create more concise code.

The new interpolated string handlers and `AsyncMethodBuilder` behavior can improve performance. These language features were applied in the .NET Runtime to achieve performance improvements in .NET 6.

C# 10 also marks more of a shift to the yearly cadence for .NET releases. Because not every feature can be completed in a yearly timeframe, you can try a couple of "preview" features in C# 10. Both *generic attributes* and *static abstract members in interfaces* can be used, but these preview features might change before their final release.

## C# version 9

*Released November 2020*

C# 9 was released with .NET 5. It's the default language version for any assembly that targets the .NET 5 release. It contains the following new and enhanced features:

- Records
- Init only setters
- Top-level statements
- Pattern matching enhancements: relational patterns and logical patterns
- Performance and interop
  - Native sized integers
  - Function pointers
  - Suppress emitting localsinit flag
  - Module initializers
  - New features for partial methods
- Fit and finish features
  - Target-typed `new` expressions
  - `static` anonymous functions
  - Target-typed conditional expressions
  - Covariant return types
  - Extension `GetEnumerator` support for `foreach` loops
  - Lambda discard parameters
  - Attributes on local functions

C# 9 continues three of the themes from previous releases: removing ceremony, separating data from algorithms, and providing more patterns in more places.

Top level statements means your main program is simpler to read. There's less need for ceremony: a namespace, a `Program` class, and `static void Main()` are all unnecessary.

The introduction of `records` provides a concise syntax for reference types that follow value semantics for equality. You use these types to define data containers that typically define minimal behavior. Init-only setters provide the capability for nondestructive mutation (`with` expressions) in records. C# 9 also adds covariant return types so that derived records can override virtual methods and return a type derived from the base method's return type.

The pattern matching capabilities expanded in several ways. Numeric types now support *range patterns*. Patterns can be combined using `and`, `or`, and `not` patterns. Parentheses can be added to clarify more complex patterns:

C# 9 includes new pattern matching improvements:

- ***Type patterns*** match an object matches a particular type
- ***Parenthesized patterns*** enforce or emphasize the precedence of pattern combinations
- ***Conjunctive `and` patterns*** require both patterns to match
- ***Disjunctive `or` patterns*** require either pattern to match
- ***Negated `not` patterns*** require that a pattern doesn't match
- ***Relational patterns*** require the input be less than, greater than, less than or equal, or greater than or equal to a given constant

These patterns enrich the syntax for patterns. One of the most common uses is a new syntax for a null check:

```csharp
if (e is not null)
{
    // ...
}
```

Any of these patterns can be used in any context where patterns are allowed: `is` pattern expressions, `switch` expressions, nested patterns, and the pattern of a `switch` statement's `case` label.

Another set of features supports high-performance computing in C#:

- The `nint` and `nuint` types model the native-size integer types on the target CPU.
- Function pointers provide delegate-like functionality while avoiding the allocations necessary to create a delegate object.
- The `localsinit` instruction can be omitted to save instructions.

### Performance and interop

Another set of improvements supports scenarios where *code generators* add functionality:

- Module initializers are methods that the runtime calls when an assembly loads.
- Partial methods support new accessibly modifiers and non-void return types. In those cases, an implementation must be provided.

### Fit and finish features

C# 9 adds many other small features that improve developer productivity, both writing and reading code:

- Target-type `new` expressions
- `static` anonymous functions
- Target-type conditional expressions
- Extension `GetEnumerator()` support for `foreach` loops
- Lambda expressions can declare discard parameters
- Attributes can be applied to local functions

The C# 9 release continues the work to keep C# a modern, general-purpose programming language. Features continue to support modern workloads and application types.

## C# version 8.0

*Released September 2019*

C# 8.0 is the first major C# release that specifically targets .NET Core. Some features rely on new Common Language Runtime (CLR) capabilities, others on library types added only in .NET Core. C# 8.0 adds the following features and enhancements to the C# language:

- Readonly members
- Default interface members
- Pattern matching enhancements:
  - Switch expressions
  - Property patterns
  - Tuple patterns
  - Positional patterns
- Using declarations
- Static local functions
- Lambda expressions, anonymous methods, and local functions can declare parameters that shadow local variables and parameters from an enclosing scope.
- Disposable ref structs
- Nullable reference types
- Asynchronous streams
- Indices and ranges
- Null-coalescing assignment
- Unmanaged constructed types
- Stackalloc in nested expressions
- Enhancement of interpolated verbatim strings

Default interface members require enhancements in the CLR. Those features were added in the CLR for .NET Core 3.0. Ranges, indexes, and asynchronous streams require new types in the .NET Core 3.0 libraries. Nullable reference types, while implemented in the compiler, is much more useful when libraries are annotated to provide semantic information regarding the null state of arguments and return values. Those annotations are being added in the .NET Core libraries.
