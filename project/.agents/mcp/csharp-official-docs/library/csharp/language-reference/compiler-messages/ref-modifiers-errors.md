---
title: "Errors and warnings associated with reference parameter modifiers (part 1 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/ref-modifiers-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Errors and warnings associated with reference parameters, variables, and returns

You might see the following errors and warnings when you work with reference variables:

- **CS0192**: *A `readonly` field cannot be used as a `ref` or `out` value (except in a constructor)*
- **CS0199**: *A `static readonly` field cannot be used as a `ref` or `out` value (except in a static constructor)*
- **CS0206**: *A non ref-returning property or indexer may not be used as an `out` or `ref` value*
- **CS0631**: *`ref` and `out` are not valid in this context*
- **CS0767**: *Cannot inherit interface with the specified type parameters because it causes method to contain overloads which differ only on `ref` and `out`*
- **CS1510**: *A `ref` or `out` value must be an assignable variable*
- **CS1605**: *Cannot use variable as a `ref` or `out` value because it is read-only*
- **CS1623**: *Iterators cannot have `ref`, `in` or `out` parameters*
- **CS1649**: *Members of a `readonly` field cannot be used as a `ref` or `out` value (except in a constructor)*
- **CS1651**: *Fields of a static readonly field cannot be used as a `ref` or `out` value (except in a static constructor)*
- **CS1655**: *Cannot use fields of type as a `ref` or `out` value*
- **CS1657**: *Cannot use variable as a `ref` or `out` value*
- **CS1741**: *A `ref` or `out` parameter cannot have a default value*
- **CS1939**: *Cannot pass the range variable as an `out` or `ref` parameter*
- **CS1988**: *Async methods cannot have `ref`, `in` or `out` parameters*
- **CS7084**: *A Windows Runtime event may not be passed as an `out` or `ref` parameter.*
- **CS8196**: *Reference to an implicitly-typed out variable is not permitted in the same argument list.*
- **CS8325**: *'`await`' cannot be used in an expression containing a `ref` conditional operator*
- **CS8326**: *Both conditional operator values must be ref values or neither may be a ref value*
- **CS8327**: *The expression must be of correct type to match the alternative ref value*
- **CS8328**: *The parameter modifier 'modifier' cannot be used with 'modifier'*
- **CS8329**: *Cannot use variable as a `ref` or `out` value because it is a readonly variable*
- **CS8330**: *Members of variable cannot be used as a `ref` or `out` value because it is a readonly variable*
- **CS8331**: *Cannot assign to variable or use it as the right hand side of a `ref` assignment because it is a readonly variable*
- **CS8332**: *Cannot assign to a member of variable or use it as the right hand side of a `ref` assignment because it is a readonly variable*
- **CS8337**: *The first parameter of a '`ref`' extension method must be a value type or a generic type constrained to struct.*
- **CS8338**: *The first '`in`' or '`ref readonly`' parameter of the extension method must be a concrete (non-generic) value type.*
- **CS8373**: *The left-hand side of a `ref` assignment must be a ref variable.*
- **CS8388**: *An `out` variable cannot be declared as a ref local*
- **CS8977**: *Cannot use '`ref`', '`in`', or '`out`' in the signature of a method attributed with 'UnmanagedCallersOnly'.*
- **CS8986**: *The 'scoped' modifier of parameter 'parameter' doesn't match target 'target'.*
- **CS8987**: *The 'scoped' modifier of parameter 'parameter' doesn't match overridden or implemented member.*
- **CS9061**: *The 'scoped' modifier cannot be used with discard.*
- **CS9062**: *Types and aliases cannot be named 'scoped'.*
- **CS9063**: *UnscopedRefAttribute cannot be applied to this parameter because it is unscoped by default.*
- **CS9065**: *Do not use 'System.Runtime.CompilerServices.ScopedRefAttribute'. Use the 'scoped' keyword instead.*
- **CS9066**: *UnscopedRefAttribute cannot be applied to parameters that have a 'scoped' modifier.*
- **CS9072**: *A deconstruction variable cannot be declared as a ref local*
- **CS9073**: *The 'scoped' modifier of parameter 'parameter' doesn't match target 'target'.*
- **CS9074**: *The 'scoped' modifier of parameter 'parameter' doesn't match overridden or implemented member.*
- **CS9101**: *UnscopedRefAttribute can only be applied to struct or virtual interface instance methods and properties, and cannot be applied to constructors or init-only members.*
- **CS9102**: *UnscopedRefAttribute cannot be applied to an interface implementation  because implemented member doesn't have this attribute.*
- **CS9104**: *A `using` statement resource of type cannot be used in async methods or async lambda expressions.*
- **CS9190**: *`readonly` modifier must be specified after `ref`.*
- **CS9191**: *The `ref` modifier for argument corresponding to `in` parameter is equivalent to `in`. Consider using `in` instead.*
- **CS9192**: *Argument should be passed with `ref` or `in` keyword.*
- **CS9193**: *Argument should be a variable because it is passed to a `ref readonly` parameter*
- **CS9195**: *Argument should be passed with the `in` keyword*
- **CS9196**: *Reference kind modifier of parameter doesn't match the corresponding parameter in overridden or implemented member.*
- **CS9197**: *Reference kind modifier of parameter doesn't match the corresponding parameter in hidden member.*
- **CS9198**: *Reference kind modifier of parameter doesn't match the corresponding parameter in target.*
- **CS9199**: *A `ref readonly` parameter cannot have the Out attribute.*
- **CS9200**: *A default value is specified for `ref readonly` parameter, but `ref readonly` should be used only for references. Consider declaring the parameter as `in`.*
- **CS9201**: *Ref field should be ref-assigned before use.*
- **CS9265**: *Field is never ref-assigned to, and will always have its default value (null reference)*
- **CS9349**: *The 'scoped' modifier cannot come after an 'in', 'out', 'ref' or 'readonly' modifier.*
- **CS9350**: *The 'modifier' modifier cannot immediately follow the 'scoped' modifier.*

These errors and warnings follow these themes:

- ***Incorrect syntax***:  The syntax of your declaration or usage is invalid.
- ***Language constructs where `ref` variables aren't valid***:  Some C# idioms don't allow variables. Usually this restriction exists because ref safety analysis can't be performed reliably.
- ***Value expression used where a reference variable is needed***:  The expression used as a reference variable must be a variable, not a value expression.
- ***Writable reference variables referring to readonly variables***:  A reference to a readonly variable can't be passed by writable reference.

This article uses the term *reference variable* as a general term for a parameter declared with one of the `in`, `ref readonly`, `ref`, or `out` modifiers, or a `ref` local variable, a `ref` field in a `ref struct`, or a `ref` return. A reference variable refers to another variable, called the *referent*.

## Incorrect syntax

These errors indicate that you're using incorrect syntax for reference variables:

- **CS8328**: *The parameter modifier 'modifier' cannot be used with 'modifier'*
- **CS8373**:  *The left-hand side of a `ref` assignment must be a ref variable.*
- **CS8388**:  *An `out` variable cannot be declared as a ref local.*
- **CS9061**: *The 'scoped' modifier cannot be used with discard.*
- **CS9062**: *Types and aliases cannot be named 'scoped'.*
- **CS9065**: *Do not use 'System.Runtime.CompilerServices.ScopedRefAttribute'. Use the 'scoped' keyword instead.*
- **CS9190**:  *`readonly` modifier must be specified after `ref`.*
- **CS9349**: *The 'scoped' modifier cannot come after an 'in', 'out', 'ref' or 'readonly' modifier.*
- **CS9350**: *The 'modifier' modifier cannot immediately follow the 'scoped' modifier.*

To correct these errors:

- Remove or replace one of the incompatible parameter modifiers named in the diagnostic (**CS8328**). Use only one of `ref`, `in`, or `out`; don't combine `params` with a reference-passing modifier; and don't use `out` for an extension receiver. Valid compound forms include `ref readonly` and `scoped` followed by `ref`, `ref readonly`, `in`, or `out`.
- Ensure the left operand of a `= ref` operator is a reference variable rather than a value expression or non-reference local. Ref assignment requires both sides to be reference variables that can create an alias to the same storage location (**CS8373**).
- Use the `ref` keyword instead of `out` when declaring local reference variables. `out` is exclusively a parameter modifier that indicates a method must assign a value before returning, whereas `ref` is the appropriate keyword for creating local variables that alias other storage locations (**CS8388**).
- Remove `scoped` from a discard declaration. A discard doesn't introduce a variable whose lifetime can be restricted (**CS9061**).
- Rename any type or alias named `scoped`, or escape the identifier as `@scoped` when that name must be preserved (**CS9062**).
- Replace an explicit `System.Runtime.CompilerServices.ScopedRefAttribute` on a parameter with the `scoped` modifier (**CS9065**).
- When declaring reference parameters, write the modifier as `ref readonly` rather than `readonly ref`. The C# language specification requires the `ref` keyword to precede the `readonly` modifier in parameter declarations to maintain consistent syntax across all reference parameter types (**CS9190**).
- When you combine `scoped` with a reference modifier, place it immediately before `ref`, `in`, or `out` (**CS9349**, **CS9350**). For a `ref readonly` parameter, use `scoped ref readonly`.
- Remove any other modifier immediately after `scoped`, or move it to a valid position in the parameter declaration (**CS9350**).
For more information about reference variables and their syntax requirements, see reference variables and the C# Language Specification.
