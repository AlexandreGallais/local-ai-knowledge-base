---
title: "Resolve errors and warnings related to generic type parameters and type arguments. (part 2 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/generic-type-parameters-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to generic type parameters and type arguments. (part 2 of 3)

## Constraint declaration and ordering

- **CS0401**: *The `new()` constraint must be the last restrictive constraint specified.*
- **CS0406**: *The class type constraint 'constraint' must come before any other constraints.*
- **CS0409**: *A constraint clause has already been specified for type parameter 'type parameter'. All of the constraints for a type parameter must be specified in a single where clause.*
- **CS0449**: *The `class`, `struct`, `unmanaged`, `notnull`, and `default` constraints cannot be combined or duplicated, and must be specified first in the constraints list.*
- **CS0450**: *Type Parameter: cannot specify both a constraint class and the `class` or `struct` constraint.*
- **CS0451**: *The `new()` constraint cannot be used with the `struct` constraint.*
- **CS8375**: *The 'new()' constraint cannot be used with the 'unmanaged' constraint.*
- **CS8380**: *'type': cannot specify both a constraint class and the 'unmanaged' constraint.*
- **CS9011**: *Keyword `delegate` cannot be used as a constraint. Did you mean `System.Delegate`?*

Constraints on type parameters must follow a specific order: primary constraints (`class`, `struct`, `unmanaged`, `notnull`, or `default`) come first, then a class type constraint, followed by interface constraints, and finally the `new()` constructor constraint. Some constraints are mutually exclusive and can't be combined. All constraints for a single type parameter must appear in a single `where` clause.

- Place the `new()` constraint at the end of the constraint list (**CS0401**). The `new()` constraint must appear after all other constraints. For example, change `where T : new(), IDisposable` to `where T : IDisposable, new()`.
- Place the class type constraint before interface constraints (**CS0406**). When you constrain a type parameter to a specific base class along with interfaces, the class must appear first. For example, change `where T : IDisposable, MyBaseClass` to `where T : MyBaseClass, IDisposable`.
- Combine all constraints for a type parameter into a single `where` clause (**CS0409**). You can't use multiple `where` clauses for the same type parameter. Merge them into one clause: change `where T : I where T : new()` to `where T : I, new()`. Multiple `where` clauses are only valid when they target different type parameters.
- Place primary constraints first and don't combine mutually exclusive constraints (**CS0449**). You can specify at most one of `class`, `struct`, `unmanaged`, `notnull`, or `default`, and it must appear first in the constraint list. The `class` and `struct` constraints are mutually exclusive, as are `class` and `unmanaged`.
- Don't combine a specific class constraint with `class`, `struct`, or `unmanaged` (**CS0450**, **CS8380**). If a type parameter is constrained to a specific class type, it's implicitly a reference type, which contradicts the `struct` or `unmanaged` constraint. Remove either the class constraint or the primary constraint.
- Don't combine `new()` with `struct` or `unmanaged` (**CS0451**, **CS8375**). All value types implicitly have a public parameterless constructor, so the `new()` constraint is redundant when combined with `struct`. The same applies to `unmanaged`, which implies `struct`. Remove the `new()` constraint.
- Replace `delegate` with `System.Delegate` in constraint clauses (**CS9011**). The `delegate` keyword is used for declaring delegate types, not as a constraint. To constrain a type parameter to delegate types, use `System.Delegate` as the constraint type.

For more information, see Constraints on type parameters.

## Valid constraint types

- **CS0405**: *Duplicate constraint for type parameter.*
- **CS0701**: *'identifier' is not a valid constraint. A type used as a constraint must be an interface, a non-sealed class or a type parameter.*
- **CS0702**: *Constraint cannot be special class.*
- **CS0703**: *Inconsistent accessibility: constraint type is less accessible than declaration.*
- **CS0706**: *Invalid constraint type. A type used as a constraint must be an interface, a non-sealed class or a type parameter.*
- **CS0717**: *Static class: static classes cannot be used as constraints.*
- **CS3024**: *Constraint type 'type' is not CLS-compliant.*

A constraint must be an interface, a non-sealed class, or a type parameter. Certain types are invalid as constraints due to their special meaning in the .NET type system or because they can't be inherited.

- Remove duplicate constraints (**CS0405**). Each constraint can only appear once in a constraint clause. If you have `where T : I, I`, remove the duplicate.
- Use only non-sealed types as constraints (**CS0701**). Sealed classes, structs, and enums can't be inherited, so they serve no purpose as constraints. Use an interface that the desired types implement, or use a non-sealed base class.
- Don't use special classes as constraints (**CS0702**). The types `System.Object`, `System.Array`, and `System.ValueType` can't be used as constraints. Every type already derives from `Object`, so constraining to it provides no value. `Array` and `ValueType` are abstract base types that can't be directly inherited. If you need array-like behavior, use `IList<T>` or `IEnumerable<T>` instead.
- Ensure constraint types are at least as accessible as the generic type (**CS0703**). A public generic type can't have constraints using internal types, because external code wouldn't be able to provide valid type arguments. Either make the constraint type public, or reduce the accessibility of the generic type.
- Use only interfaces, non-sealed classes, or type parameters as constraints (**CS0706**). You can't use arrays, sealed classes, structs, enums, or other invalid types as constraints. Consider using an interface that the desired types implement.
- Don't use static classes as constraints (**CS0717**). Static classes can't be extended because they only contain static members. No type can derive from a static class, making it useless as a constraint.
- Use a CLS-compliant type for the type constraint (**CS3024**). When an assembly is marked with `[assembly: CLSCompliant(true)]`, using a non-CLS-compliant type as a generic type constraint could make it impossible for code written in some languages to consume your generic class.

For more information, see Constraints on type parameters.

## Constraint satisfaction and conversions

- **CS0311**: *The type cannot be used as type parameter `T` in the generic type or method. There is no implicit reference conversion from 'type1' to 'type2'.*
- **CS0312**: *The type cannot be used as type parameter in the generic type or method. The nullable type does not satisfy the constraint of 'constraint'.*
- **CS0313**: *The type cannot be used as type parameter in the generic type or method. The nullable type does not satisfy the constraint of 'constraint'. Nullable types can not satisfy any interface constraints.*
- **CS0314**: *The type cannot be used as type parameter in the generic type or method. There is no boxing conversion or type parameter conversion from 'type' to 'constraint'.*
- **CS0315**: *The type cannot be used as type parameter `T` in the generic type or method. There is no boxing conversion from 'type' to 'constraint'.*
- **CS0452**: *The type 'type name' must be a reference type in order to use it as parameter 'parameter name' in the generic type or method 'generic'.*
- **CS0453**: *The type 'type name' must be a non-nullable value type in order to use it as parameter 'parameter name' in the generic type or method 'generic'.*
- **CS8377**: *The type 'type' must be a non-nullable value type, along with all fields at any level of nesting, in order to use it as parameter 'parameter' in the generic type or method 'generic'.*

These errors occur when a type argument doesn't satisfy the constraints declared on a generic type parameter. The type argument must have the correct conversions, inheritance relationships, and structural properties to match all constraints.

- Change the type argument to one that has an implicit reference conversion to the constraint type (**CS0311**). When a type parameter has a constraint like `where T : BaseType`, any type argument must be convertible to `BaseType` through an implicit reference conversion or identity conversion. Implicit numeric conversions (such as from `short` to `int`) don't satisfy generic type parameter constraints.
- Use non-nullable value types or change the constraint type (**CS0312**, **CS0313**). Nullable value types (such as `int?`) are distinct from their underlying value types and don't satisfy the same constraints. Nullable value types can't satisfy interface constraints because the nullable wrapper itself doesn't implement the interface. Use the non-nullable form of the value type as the type argument.
- Repeat the base class's type parameter constraints in any derived class declaration (**CS0314**). When a derived generic class inherits from a constrained base generic class, the derived class must declare the same constraints on its corresponding type parameters.
- Ensure type arguments satisfy reference type or class constraints (**CS0315**). When a type parameter is constrained to a class type, you can't use a value type (struct) as the type argument because there's no boxing conversion that satisfies the constraint relationship. Use a reference type that inherits from or implements the constraint.
- Use a reference type as the type argument when the `class` constraint is specified (**CS0452**). Value types such as `struct` or `int` can't satisfy a `class` constraint. Either change the type argument to a reference type, or remove the `class` constraint if the generic type can work with value types.
- Use a non-nullable value type as the type argument when the `struct` constraint is specified (**CS0453**). Reference types, nullable value types (`int?`), and other non-value types can't satisfy a `struct` constraint. Use a concrete, non-nullable value type such as `int`, `double`, or a user-defined `struct`.
- Use a type whose fields are all unmanaged types when the `unmanaged` constraint is specified (**CS8377**). The `unmanaged` constraint requires a non-nullable value type where every field, at every level of nesting, is also an unmanaged type. Types containing reference-type fields or generic type parameters that aren't known to be unmanaged don't satisfy this constraint.

For more information, see Constraints on type parameters.

## Constraint conflicts and circular dependencies

- **CS0454**: *Circular constraint dependency involving Type Parameter 1 and Type Parameter 2.*
- **CS0455**: *Type parameter inherits conflicting constraints 'constraint1' and 'constraint2'.*
- **CS0456**: *Type parameter 'type parameter 1' has the 'struct' constraint so 'type parameter 1' cannot be used as a constraint for 'type parameter 2'.*
- **CS8379**: *Type parameter 'type parameter 1' has the 'unmanaged' constraint so 'type parameter 1' cannot be used as a constraint for 'type parameter 2'.*

Constraints can't create circular dependencies, and type parameters can't inherit conflicting constraints that are impossible to satisfy simultaneously. Value type constraints (`struct` and `unmanaged`) are implicitly sealed, so they can't be used as constraints on other type parameters.

- Remove circular constraint dependencies (**CS0454**). A type parameter can't directly or indirectly depend on itself through its constraints. For example, `where T : U where U : T` creates a circular dependency. Break the cycle by removing one of the constraints.
- Remove conflicting inherited constraints (**CS0455**). A type parameter can't be constrained to multiple unrelated classes, because C# doesn't support multiple class inheritance. Similarly, it can't be constrained to both `struct` and a class type. Restructure your type hierarchy or remove one of the conflicting constraints.
- Don't use a `struct`-constrained or `unmanaged`-constrained type parameter as a constraint for another type parameter (**CS0456**, **CS8379**). Value type constraints are implicitly sealed, so no other type can derive from them. To resolve this error, put the value type or unmanaged constraint directly on the second type parameter instead of constraining it indirectly through the first type parameter.

For more information, see Constraints on type parameters.

## Override and implementation constraint rules

- **CS8665**: *Method 'method' specifies a 'class' constraint for type parameter 'type parameter', but corresponding type parameter 'type parameter' of overridden or explicitly implemented method 'method' is not a reference type.*
- **CS8666**: *Method 'method' specifies a 'struct' constraint for type parameter 'type parameter', but corresponding type parameter 'type parameter' of overridden or explicitly implemented method 'method' is not a non-nullable value type.*
- **CS8822**: *Method 'method' specifies a 'default' constraint for type parameter 'type parameter', but corresponding type parameter 'type parameter' of overridden or explicitly implemented method 'method' is constrained to a reference type or a value type.*
- **CS8823**: *The 'default' constraint is valid on override and explicit interface implementation methods only.*

When you override a virtual method or explicitly implement an interface method, the constraints on the overriding method's type parameters must be compatible with the base method's constraints. The `default` constraint is a special modifier used only in override and explicit interface implementation scenarios to indicate that a type parameter has neither a `class` nor `struct` constraint.

- Ensure the overriding method's constraints match the base method's constraints (**CS8665**, **CS8666**). An override can't add a `class` constraint if the base method's corresponding type parameter isn't constrained to a reference type. Similarly, it can't add a `struct` constraint if the base method's type parameter isn't constrained to a value type. The override must be compatible with the base declaration.
- Use the `default` constraint only when the base method's type parameter is unconstrained (**CS8822**). The `default` constraint indicates that the type parameter has no `class` or `struct` constraint. You can't apply `default` if the corresponding type parameter of the overridden method already has a `class` or `struct` constraint.
- Use the `default` constraint only on override or explicit interface implementation methods (**CS8823**). The `default` constraint isn't valid on regular method declarations. It exists specifically to disambiguate when overriding a method where the base had an unconstrained type parameter, and you need to indicate that the override also leaves it unconstrained.

For more information, see Constraints on type parameters and the `default` constraint.
