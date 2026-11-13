---
title: "Resolve errors and warnings related to generic type parameters and type arguments. (part 3 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/generic-type-parameters-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to generic type parameters and type arguments. (part 3 of 3)

## Constructor constraints

- **CS0304**: *Cannot create an instance of the variable type because it does not have the `new()` constraint.*
- **CS0310**: *The type must be a non-abstract type with a public parameterless constructor in order to use it as parameter in the generic type or method.*
- **CS0417**: *Identifier: cannot provide arguments when creating an instance of a variable type.*

These errors relate to the `new()` constraint and instantiating type parameters with the `new` operator.

- Add the `new()` constraint to type parameters that you need to instantiate (**CS0304**). When you use `new T()` inside a generic type or method, the compiler must guarantee that any type argument has a parameterless constructor. The `new()` constraint provides this guarantee.
- Ensure type arguments have public parameterless constructors (**CS0310**). When a type parameter has the `new()` constraint, any concrete type used as a type argument must be non-abstract and must provide a public parameterless constructor. Types with only private, protected, or parameterized constructors can't satisfy the `new()` constraint.
- Remove constructor arguments when instantiating type parameters (**CS0417**). The `new()` constraint only guarantees a parameterless constructor. You can't pass <example-value> to `new T(arguments)`. If you need to construct instances with specific arguments, consider using a factory pattern or an interface constraint that defines the construction behavior.

For more information, see Constraints on type parameters and the `new()` constraint.

## Type argument count and usage

- **CS0224**: *A method with vararg cannot be generic, be in a generic type, or have a params parameter.*
- **CS0305**: *Using the generic type requires N type arguments.*
- **CS0306**: *The type may not be used as a type argument.*
- **CS0307**: *The 'identifier' cannot be used with type arguments.*
- **CS0308**: *The non-generic type-or-method cannot be used with type arguments.*
- **CS7002**: *Unexpected use of a generic name.*
- **CS8389**: *Omitting the type argument is not allowed in the current context.*

These errors relate to providing the correct number and type of arguments to generic types and methods.

- Remove generic type parameters or containing generic type declarations from methods that use `__arglist` (**CS0224**). The `__arglist` keyword is incompatible with generics because the runtime mechanisms for handling variable argument lists conflict with the type substitution required for generic type parameters.
- Supply the exact number of type arguments specified in the generic declaration (**CS0305**). Each generic type parameter in the definition must have a corresponding type argument when the generic type is instantiated.
- Use only valid types as type arguments (**CS0306**). Pointer types (such as `int*` or `char*`) can't be used as type arguments because generic types require managed types that the garbage collector can track.
- Remove type argument syntax from non-generic constructs (**CS0307**, **CS0308**). Type arguments enclosed in angle brackets can only be applied to generic types and methods that declare type parameters. Ensure you imported the namespace that contains the generic version of the type.
- Remove type parameters from declarations that don't support generics (**CS7002**). Some constructs, such as enums, can't be generic. If you need a generic container for enum values, consider using a generic class or struct instead.
- Provide all required type arguments explicitly (**CS8389**). In some contexts, such as using the `typeof` operator or creating delegates, you must provide all type arguments and can't omit them. For example, use `typeof(List<int>)` rather than attempting to omit the type argument.

For more information, see Generic Type Parameters and Generics.

## Type argument inference

- **CS0411**: *The type arguments for method 'method' cannot be inferred from the usage. Try specifying the type arguments explicitly.*

This error occurs when you call a generic method without explicitly providing the type arguments and the compiler can't infer which type arguments you intend. The compiler infers type arguments from the types of the method arguments you pass at the call site.

- Specify the type arguments explicitly in angle brackets (**CS0411**). If the compiler can't determine the type arguments from the method arguments, provide them directly. For example, change `G()` to `G<int>()`. This error commonly occurs when a generic method has no parameters from which to infer the type, or when a `null` argument is passed and the compiler can't determine the intended type.

For more information, see Generic Methods.

## Type parameter variance

- **CS1960**: *Invalid variance modifier. Only interface and delegate type parameters can be specified as variant.*
- **CS1961**: *Invalid variance: The type parameter must be covariantly valid on 'type'. 'type parameter' is contravariant.*
- **CS8427**: *Enums, classes, and structures cannot be declared in an interface that has an 'in' or 'out' type parameter.*

Variance modifiers (`in` for contravariance, `out` for covariance) control how you can use type parameters in interface and delegate declarations. Only interfaces and delegates support variance. A covariant (`out`) type parameter can only appear in output positions (return types), while a contravariant (`in`) type parameter can only appear in input positions (parameter types).

- Use variance modifiers only on interface and delegate type parameters (**CS1960**). Classes, structs, and other type declarations don't support variance modifiers. Only `interface` and `delegate` declarations can use `in` or `out` on their type parameters.
- Use `out` (covariant) for type parameters that only appear in return types, and `in` (contravariant) for type parameters that only appear in parameter types (**CS1961**). If the type parameter must appear in both input and output positions, remove the variance modifier.
- Don't declare enums, classes, or structures inside a variant interface (**CS8427**). Nested type declarations inside an interface that has `in` or `out` type parameters aren't allowed because they could violate the variance safety rules. Move the nested type outside the interface declaration.

For more information, see Covariance and Contravariance in Generics.

## Generic type usage restrictions

- **CS0403**: *Cannot convert null to type parameter because it could be a non-nullable value type. Consider using `default(T)` instead.*
- **CS0413**: *The type parameter cannot be used with the `as` operator because it does not have a class type constraint nor a `class` constraint.*
- **CS0695**: *'type' cannot implement both 'interface1' and 'interface2' because they may unify for some type parameter substitutions.*
- **CS0698**: *A generic type cannot derive from type because it is an attribute class.*
- **CS0704**: *Cannot do non-virtual member lookup in 'type' because it is a type parameter.*
- **CS0718**: *'type': static types cannot be used as type arguments.*
- **CS1720**: *Expression will always cause a System.NullReferenceException because the default value of 'generic type' is null.*
- **CS1763**: *'parameter' is of type 'type'. A default parameter value of a reference type other than string can only be initialized with null.*
- **CS8322**: *Cannot pass <example-value> with dynamic type to generic local function with inferred type arguments.*
- **CS9338**: *Inconsistent accessibility: type is less accessible than class.*

These errors relate to restrictions on how generic types and type parameters can be used in expressions, inheritance, and member access.

- Replace `null` assignments with `default(T)` or add a `class` constraint (**CS0403**). When you assign `null` to an unconstrained type parameter, the compiler can't guarantee the type argument is a reference type. Use `default(T)`, which provides the appropriate default value for any type, or add a `class` constraint if you specifically need reference type semantics.
- Add a `class` or specific type constraint when using the `as` operator (**CS0413**). The `as` operator returns `null` if the conversion fails, but value types can't be `null`. Add a `class` constraint to ensure the type parameter is always a reference type.
- Avoid implementing the same generic interface multiple times with type parameters that could unify (**CS0695**). When a class implements a generic interface multiple times with different type parameters (such as `class G<T1, T2> : I<T1>, I<T2>`), instantiating with the same type for both parameters would create a conflict. Implement the interface only once, or restructure to prevent unification.
- Remove generic type parameters from attribute classes (**CS0698**). This error is no longer produced in current versions of C#, as generic attributes are now supported.
- Use the concrete constraint type instead of the type parameter for nested member access (**CS0704**). You can't access nested types or non-virtual members through a type parameter. Instead of `T.InnerType`, use the known constraint type directly, such as `BaseClass.InnerType`.
- Don't use static types as type arguments (**CS0718**). Static types can't be instantiated and can't be used as generic arguments. Remove the static type from the generic argument.
- Avoid calling instance members on `default(T)` when `T` is constrained to a reference type (**CS1720**). When `T` has a `class` constraint, `default(T)` is `null`, so calling instance members on it always throws a `System.NullReferenceException`. Add a null check before calling members, or restructure the code to avoid using `default(T)` directly.
- Use `null` as the default parameter value for optional parameters whose type is a reference type (**CS1763**). If a generic method has a parameter of type `T` and `T` is a reference type, replace `default(U)` with `null` because optional parameter defaults must be compile-time constants, and `default(T)` doesn't fix that requirement.
- Explicitly specify type arguments when passing dynamic values to generic local functions (**CS8322**). When you pass a `dynamic` argument to a generic local function, the compiler can't infer type arguments. Explicitly specify the type argument or cast the dynamic value.
- Ensure type arguments used in public or protected signatures are at least as accessible as the member (**CS9338**). A public generic member must use type arguments that are publicly accessible. Either make the type argument public, or reduce the accessibility of the member.

For more information, see Constraints on type parameters and default value expressions.

## `UnmanagedCallersOnly` restrictions

- **CS8893**: *'type' is not a valid calling convention type for 'UnmanagedCallersOnly'.*
- **CS8894**: *Cannot use 'type' as a parameter or return type on a method attributed with 'UnmanagedCallersOnly'.*
- **CS8895**: *Methods attributed with 'UnmanagedCallersOnly' cannot have generic type parameters and cannot be declared in a generic type.*
- **CS8896**: *'UnmanagedCallersOnly' can only be applied to ordinary static non-abstract, non-virtual methods or static local functions.*

The `System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute` attribute marks methods that unmanaged code can call. These methods have strict requirements because the runtime must handle the transition between managed and unmanaged calling conventions.

- Use only valid calling convention types in the `UnmanagedCallersOnly` attribute (**CS8893**). The `CallConvs` property of the attribute accepts only recognized calling convention types from the `System.Runtime.CompilerServices` namespace.
- Use only blittable types as parameter and return types (**CS8894**). Methods marked with `UnmanagedCallersOnly` can't use managed types (such as `string` or `object`) as parameter or return types because unmanaged callers can't manage the garbage-collected references.
- Remove generic type parameters from `UnmanagedCallersOnly` methods and don't declare them in generic types (**CS8895**). Unmanaged calling conventions don't support generics because the runtime can't determine the correct calling convention for generic type substitutions.
- Apply `UnmanagedCallersOnly` only to ordinary static, non-abstract, non-virtual methods or static local functions (**CS8896**). Instance methods, abstract methods, and virtual methods can't be marked with `UnmanagedCallersOnly` because unmanaged callers can't perform the dispatch mechanisms these methods require.

For more information, see `System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute`.
