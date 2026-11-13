---
title: "Errors and warnings associated with reference parameter modifiers (part 2 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/ref-modifiers-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Errors and warnings associated with reference parameter modifiers (part 2 of 3)

## Reference variable restrictions

The following errors and warnings indicate that you can't use a reference variable in a particular context:

- **CS0631**:  *`ref` and `out` are not valid in this context*
- **CS0767**:  *Cannot inherit interface with the specified type parameters because it causes method to contain overloads which differ only on `ref` and `out`*
- **CS1623**:  *Iterators cannot have `ref`, `in` or `out` parameters*
- **CS1741**:  *A `ref` or `out` parameter cannot have a default value*
- **CS1939**:  *Cannot pass the range variable as an `out` or `ref` parameter*
- **CS1988**:  *Async methods cannot have `ref`, `in` or `out` parameters*
- **CS7084**:  *A Windows Runtime event may not be passed as an `out` or `ref` parameter.*
- **CS8196**:  *Reference to an implicitly-typed `out` variable is not permitted in the same argument list.*
- **CS8325**:  *'await' cannot be used in an expression containing a `ref` conditional operator*
- **CS8326**:  *Both conditional operator values must be ref values or neither may be a ref value*
- **CS8327**:  *The expression must be of correct type to match the alternative ref value*
- **CS8337**:  *The first parameter of a '`ref`' extension method must be a value type or a generic type constrained to struct.*
- **CS8338**:  *The first '`in`' or '`ref readonly`' parameter of the extension method must be a concrete (non-generic) value type.*
- **CS8977**:  *Cannot use '`ref`', '`in`', or '`out`' in the signature of a method attributed with 'UnmanagedCallersOnly'.*
- **CS8986**: *The 'scoped' modifier of parameter 'parameter' doesn't match target 'target'.*
- **CS8987**: *The 'scoped' modifier of parameter 'parameter' doesn't match overridden or implemented member.*
- **CS9072**:  *A deconstruction variable cannot be declared as a ref local*
- **CS9073**: *The 'scoped' modifier of parameter 'parameter' doesn't match target 'target'.*
- **CS9074**: *The 'scoped' modifier of parameter 'parameter' doesn't match overridden or implemented member.*
- **CS9104**:  *A `using` statement resource of type cannot be used in async methods or async lambda expressions.*
- **CS9196**:  *Reference kind modifier of parameter doesn't match the corresponding parameter in overridden or implemented member.*
- **CS9197**:  *Reference kind modifier of parameter doesn't match the corresponding parameter in hidden member.*
- **CS9198**:  *Reference kind modifier of parameter doesn't match the corresponding parameter in target.*
- **CS9199**:  *A `ref readonly` parameter cannot have the Out attribute.*
- **CS9200**:  *A default value is specified for `ref readonly` parameter, but `ref readonly` should be used only for references. Consider declaring the parameter as `in`.*
- **CS9201**:  *Ref field should be ref-assigned before use.*
- **CS9265**: *Field is never ref-assigned to, and will always have its default value (null reference)*

To correct these errors and warnings:

- Remove reference parameters from indexers. Indexers provide array-like access syntax, and the compiler can't guarantee safe lifetime tracking for references passed through indexer accessors (**CS0631**, **CS1623**).
- Remove reference parameters from iterator methods. Iterators execute code lazily across multiple calls using state machines, and the compiler can't ensure referenced variables remain valid across `yield return` boundaries where execution is suspended and resumed (**CS1623**).
- Remove reference parameters from async methods. Async methods might suspend execution at `await` points and resume on different threads, making it impossible to guarantee that referenced variables remain valid and accessible throughout the method's execution (**CS1988**).
- Avoid using await expressions inside ref conditional expressions. The `await` operation might suspend execution and invalidate the references being selected by the conditional operator, leading to potential use of invalidated references when execution resumes (**CS8325**).
- Ensure both branches of a ref conditional operator return references or neither returns a reference, and when both are references they must be the same type. The conditional operator must produce a consistent result type that can be safely used by the calling code regardless of which branch is selected (**CS8326**, **CS8327**).
- Remove default values from `ref` and `out` parameters. Reference parameters must always be provided at the call site to establish the required aliasing relationship between the parameter and an existing variable, making default values semantically meaningless (**CS1741**).
- Avoid declaring an implicitly typed `out` variable in an argument list that also references that same variable. The compiler must infer the variable's type from the method signature while simultaneously validating uses of that variable within the same expression, creating a circular dependency (**CS8196**).
- Don't pass LINQ query range variables as reference parameters. Range variables are compiler-generated iteration variables whose lifetime is managed by the query execution model and don't have stable memory locations that can be safely referenced (**CS1939**).
- Use regular value variables instead of ref locals when deconstructing objects. Deconstruction creates new variables to receive the deconstructed values and reference variables would attempt to alias these temporary values rather than store them independently (**CS9072**).
- Avoid implementing multiple interfaces where methods differ only by `ref` versus `out` modifiers on parameters. The C# language specification treats these as distinct signatures but doesn't provide a way to disambiguate which implementation to call since both `ref` and `out` share the same calling syntax at implementation boundaries (**CS0767**).
- Remove reference parameters from methods decorated with `System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute`. These methods are callable from unmanaged code that doesn't understand C#'s reference safety rules and can't guarantee proper lifetime management of referenced variables across the managed/unmanaged boundary (**CS8977**).
- Use the `ref` modifier on extension method first parameters only for value types or generic types constrained to value types. Reference types are already passed by reference at the CLR level and adding `ref` would create a reference to a reference, while value type extensions with `ref` enable mutation of the extended instance (**CS8337**, **CS8338**).
- Don't pass Windows Runtime events as reference parameters. These events follow the Windows Runtime type system, which has different lifetime and threading semantics than .NET references and doesn't support the aliasing behavior required by C# reference parameters (**CS7084**).
- Remove the `System.Runtime.InteropServices.OutAttribute` from `ref readonly` parameters. This attribute is designed for marshaling semantics in platform invoke scenarios where the parameter direction is outbound only, which conflicts with `ref readonly`'s guarantee that the parameter references existing data that won't be reassigned (**CS9199**).
- Ensure all `ref` fields in a type are assigned either in field initializers or in all constructor code paths before the constructor completes. Uninitialized ref fields would contain invalid references that could lead to memory corruption if accessed (**CS9201**, **CS9265**).
- Match the `scoped` characteristic of every parameter between a lambda or method and its target delegate (**CS8986**, **CS9073**), and between an override or implementation and the corresponding member (**CS8987**, **CS9074**). The mismatch is an error when both signatures use the current C# 11 ref-safety rules; otherwise, it's a compatibility warning.
- Match the reference kind modifiers (`ref`, `in`, `out`, `ref readonly`) between a method and its overridden base method or implemented interface method. The reference modifier is part of the method signature contract that derived types must honor to maintain substitutability and caller expectations (**CS9196**, **CS9197**, **CS9198**).
- Declare parameters as `in` rather than `ref readonly` when providing default values. `ref readonly` is designed for scenarios where the caller passes a reference to an existing variable, whereas `in` parameters can accept both references and temporary copies of values, making default values meaningful (**CS9200**).

For more information about where reference variables are allowed, see Method parameters, Iterators, Asynchronous programming patterns, and the C# Language Specification.

## `unscoped ref` restrictions

You can't use the `unscoped` qualifier on `ref` parameters in some locations:

- **CS9063**: *UnscopedRefAttribute cannot be applied to this parameter because it is unscoped by default.*
- **CS9066**: *UnscopedRefAttribute cannot be applied to parameters that have a 'scoped' modifier.*
- **CS9101**:  *UnscopedRefAttribute can only be applied to struct instance or virtual interface methods and properties, and cannot be applied to constructors or init-only members.*
- **CS9102**:  *UnscopedRefAttribute cannot be applied to an interface implementation because implemented member doesn't have this attribute.*

To correct these errors:

- Remove `System.Diagnostics.CodeAnalysis.UnscopedRefAttribute` from a parameter that's already unscoped by default (**CS9063**).
- Remove either the `scoped` modifier or `System.Diagnostics.CodeAnalysis.UnscopedRefAttribute` so the parameter has one consistent lifetime contract (**CS9066**).
- Remove the `unscoped` modifier or the `System.Diagnostics.CodeAnalysis.UnscopedRefAttribute` attribute from struct constructors and init-only members. These members have special initialization semantics where the compiler must ensure that any references don't outlive the initialization phase, and allowing unscoped references would violate the guarantee that initialization completes before the struct becomes fully accessible (**CS9101**).
- Remove the `unscoped` modifier from interface implementation methods when the corresponding interface method doesn't have it. The unscoped characteristic affects the method's contract regarding reference lifetime guarantees, and implementations must maintain the same contract as the interface they're implementing to ensure callers can rely on consistent lifetime behavior regardless of which implementation is invoked (**CS9102**).

For more information about scoped and unscoped references, see Method parameters and Safe context constraint in the C# language specification.

## Reference variables require a referent

You must supply a variable as an argument to a reference parameter, reference return, or ref local assignment:

- **CS0206**:  *A non ref-returning property or indexer may not be used as an `out` or `ref` value*
- **CS1510**:  *A `ref` or `out` value must be an assignable variable*

Warnings:

- **CS9191**:  *The `ref` modifier for argument corresponding to `in` parameter is equivalent to `in`. Consider using `in` instead.*
- **CS9192**:  *Argument should be passed with `ref` or `in` keyword.*
- **CS9193**:  *Argument should be a variable because it is passed to a `ref readonly` parameter*
- **CS9195**:  *Argument should be passed with the `in` keyword*

To correct these errors:

- Store the result of a property or indexer access in a local variable before passing it as a reference parameter. Properties and indexers are methods that return values rather than providing direct access to storage locations, and reference parameters require an actual variable with a stable memory location that can be aliased (**CS0206**, **CS1510**).
- Use the `in` modifier instead of `ref` when passing arguments to `in` parameters. While `ref` technically works due to backward compatibility, the `in` modifier more clearly expresses the intent that the argument is read-only and can be passed more efficiently as a reference without copying (**CS9191**, **CS9195**).
- Add the appropriate reference modifier (`ref`, `in`, or `ref readonly`) when passing arguments to parameters that expect references. Omitting the modifier might cause the compiler to create a temporary copy of the value, which is inefficient and can lead to unexpected behavior if the calling code expects modifications to be reflected in the original variable (**CS9192**, **CS9193**).

For more information about reference parameters and passing variables by reference, see Method parameters, ref keyword, and the C# Language Specification.
