---
title: "Resolve errors and warnings related to generic type parameters and type arguments. (part 1 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/generic-type-parameters-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to generic type parameters and generic type arguments

This article covers the following compiler errors:

- **CS0080**: *Constraints are not allowed on non-generic declarations.*
- **CS0081**: *Type parameter declaration must be an identifier not a type.*
- **CS0224**: *A method with vararg cannot be generic, be in a generic type, or have a params parameter.*
- **CS0304**: *Cannot create an instance of the variable type because it does not have the `new()` constraint.*
- **CS0305**: *Using the generic type requires N type arguments.*
- **CS0306**: *The type may not be used as a type argument.*
- **CS0307**: *The 'identifier' cannot be used with type arguments.*
- **CS0308**: *The non-generic type-or-method cannot be used with type arguments.*
- **CS0310**: *The type must be a non-abstract type with a public parameterless constructor in order to use it as parameter in the generic type or method.*
- **CS0311**: *The type cannot be used as type parameter `T` in the generic type or method. There is no implicit reference conversion from 'type1' to 'type2'.*
- **CS0312**: *The type 'type1' cannot be used as type parameter in the generic type or method. The nullable type 'type1' does not satisfy the constraint of 'constraint'.*
- **CS0313**: *The type 'type1' cannot be used as type parameter in the generic type or method. The nullable type 'type1' does not satisfy the constraint of 'constraint'. Nullable types can not satisfy any interface constraints.*
- **CS0314**: *The type cannot be used as type parameter in the generic type or method. There is no boxing conversion or type parameter conversion from 'type' to 'constraint'.*
- **CS0315**: *The type cannot be used as type parameter `T` in the generic type or method. There is no boxing conversion from 'type' to 'constraint'.*
- **CS0401**: *The `new()` constraint must be the last restrictive constraint specified.*
- **CS0403**: *Cannot convert null to type parameter because it could be a non-nullable value type. Consider using `default(T)` instead.*
- **CS0405**: *Duplicate constraint for type parameter.*
- **CS0406**: *The class type constraint 'constraint' must come before any other constraints.*
- **CS0409**: *A constraint clause has already been specified for type parameter 'type parameter'. All of the constraints for a type parameter must be specified in a single where clause.*
- **CS0411**: *The type arguments for method 'method' cannot be inferred from the usage. Try specifying the type arguments explicitly.*
- **CS0412**: *Parameter: a parameter, local variable, or local function cannot have the same name as a method type parameter.*
- **CS0413**: *The type parameter cannot be used with the `as` operator because it does not have a class type constraint nor a `class` constraint.*
- **CS0417**: *Identifier: cannot provide arguments when creating an instance of a variable type.*
- **CS0449**: *The `class`, `struct`, `unmanaged`, `notnull`, and `default` constraints cannot be combined or duplicated, and must be specified first in the constraints list.*
- **CS0450**: *Type Parameter: cannot specify both a constraint class and the `class` or `struct` constraint.*
- **CS0451**: *The `new()` constraint cannot be used with the `struct` constraint.*
- **CS0452**: *The type 'type name' must be a reference type in order to use it as parameter 'parameter name' in the generic type or method 'generic'.*
- **CS0453**: *The type 'type name' must be a non-nullable value type in order to use it as parameter 'parameter name' in the generic type or method 'generic'.*
- **CS0454**: *Circular constraint dependency involving Type Parameter 1 and Type Parameter 2.*
- **CS0455**: *Type parameter inherits conflicting constraints 'constraint1' and 'constraint2'.*
- **CS0456**: *Type parameter 'type parameter 1' has the 'struct' constraint so 'type parameter 1' cannot be used as a constraint for 'type parameter 2'.*
- **CS0693**: *Type parameter 'type parameter' has the same name as the type parameter from outer type 'type'.*
- **CS0694**: *Type parameter has the same name as the containing type, or method.*
- **CS0695**: *'type' cannot implement both 'interface1' and 'interface2' because they may unify for some type parameter substitutions.*
- **CS0698**: *A generic type cannot derive from type because it is an attribute class.*
- **CS0699**: *'generic' does not define type parameter 'identifier'.*
- **CS0701**: *'identifier' is not a valid constraint. A type used as a constraint must be an interface, a non-sealed class or a type parameter.*
- **CS0702**: *Constraint cannot be special class.*
- **CS0703**: *Inconsistent accessibility: constraint type is less accessible than declaration.*
- **CS0704**: *Cannot do non-virtual member lookup in 'type' because it is a type parameter.*
- **CS0706**: *Invalid constraint type. A type used as a constraint must be an interface, a non-sealed class or a type parameter.*
- **CS0717**: *Static class: static classes cannot be used as constraints.*
- **CS0718**: *'type': static types cannot be used as type arguments.*
- **CS1720**: *Expression will always cause a System.NullReferenceException because the default value of 'generic type' is null.*
- **CS1763**: *'parameter' is of type 'type'. A default parameter value of a reference type other than string can only be initialized with null.*
- **CS1948**: *The range variable 'name' cannot have the same name as a method type parameter.*
- **CS1960**: *Invalid variance modifier. Only interface and delegate type parameters can be specified as variant.*
- **CS1961**: *Invalid variance: The type parameter must be covariantly valid on 'type'. 'type parameter' is contravariant.*
- **CS3024**: *Constraint type 'type' is not CLS-compliant.*
- **CS7002**: *Unexpected use of a generic name.*
- **CS8322**: *Cannot pass <example-value> with dynamic type to generic local function with inferred type arguments.*
- **CS8375**: *The 'new()' constraint cannot be used with the 'unmanaged' constraint.*
- **CS8377**: *The type 'type' must be a non-nullable value type, along with all fields at any level of nesting, in order to use it as parameter 'parameter' in the generic type or method 'generic'.*
- **CS8379**: *Type parameter 'type parameter 1' has the 'unmanaged' constraint so 'type parameter 1' cannot be used as a constraint for 'type parameter 2'.*
- **CS8380**: *'type': cannot specify both a constraint class and the 'unmanaged' constraint.*
- **CS8387**: *Type parameter 'type parameter' has the same name as the type parameter from outer method 'method'.*
- **CS8389**: *Omitting the type argument is not allowed in the current context.*
- **CS8427**: *Enums, classes, and structures cannot be declared in an interface that has an 'in' or 'out' type parameter.*
- **CS8665**: *Method 'method' specifies a 'class' constraint for type parameter 'type parameter', but corresponding type parameter 'type parameter' of overridden or explicitly implemented method 'method' is not a reference type.*
- **CS8666**: *Method 'method' specifies a 'struct' constraint for type parameter 'type parameter', but corresponding type parameter 'type parameter' of overridden or explicitly implemented method 'method' is not a non-nullable value type.*
- **CS8822**: *Method 'method' specifies a 'default' constraint for type parameter 'type parameter', but corresponding type parameter 'type parameter' of overridden or explicitly implemented method 'method' is constrained to a reference type or a value type.*
- **CS8823**: *The 'default' constraint is valid on override and explicit interface implementation methods only.*
- **CS8893**: *'type' is not a valid calling convention type for 'UnmanagedCallersOnly'.*
- **CS8894**: *Cannot use 'type' as a parameter or return type on a method attributed with 'UnmanagedCallersOnly'.*
- **CS8895**: *Methods attributed with 'UnmanagedCallersOnly' cannot have generic type parameters and cannot be declared in a generic type.*
- **CS8896**: *'UnmanagedCallersOnly' can only be applied to ordinary static non-abstract, non-virtual methods or static local functions.*
- **CS9011**: *Keyword `delegate` cannot be used as a constraint. Did you mean `System.Delegate`?*
- **CS9012**: *Unexpected keyword `record`. Did you mean `record struct` or `record class`?*
- **CS9338**: *Inconsistent accessibility: type is less accessible than class.*

## Type parameter declaration and naming

- **CS0080**: *Constraints are not allowed on non-generic declarations.*
- **CS0081**: *Type parameter declaration must be an identifier not a type.*
- **CS0412**: *Parameter: a parameter, local variable, or local function cannot have the same name as a method type parameter.*
- **CS0693**: *Type parameter 'type parameter' has the same name as the type parameter from outer type 'type'.*
- **CS0694**: *Type parameter has the same name as the containing type, or method.*
- **CS0699**: *'generic' does not define type parameter 'identifier'.*
- **CS1948**: *The range variable 'name' cannot have the same name as a method type parameter.*
- **CS8387**: *Type parameter 'type parameter' has the same name as the type parameter from outer method 'method'.*
- **CS9012**: *Unexpected keyword `record`. Did you mean `record struct` or `record class`?*

These errors relate to how you declare and name type parameters in generic types and methods. Type parameter names must be valid identifiers, must not conflict with other identifiers in scope, and must appear in the declaration's type parameter list.

- Remove the constraint clause from non-generic declarations (**CS0080**). The `where` clause can only be used on generic types and methods that declare type parameters. If you need to apply constraints, first add type parameters to your type or method declaration.
- Replace actual type names with identifiers in type parameter declarations (**CS0081**). You must declare type parameters using identifiers (like `T`, `TKey`, or `TValue`) rather than concrete types (like `int` or `string`). The purpose of a type parameter is to serve as a placeholder that the compiler substitutes with actual types when the generic type or method is used.
- Rename type parameters, local variables, parameters, or range variables to avoid naming conflicts (**CS0412**, **CS0694**, **CS1948**). Type parameter names can't shadow identifiers in the same scope, and they can't match the name of the containing type or method. LINQ range variables also can't reuse a method's type parameter name. Such conflicts create ambiguity about which identifier is being referenced.
- Use a different name for inner type parameters that shadow outer ones (**CS0693**, **CS8387**). When a generic member (such as a method or nested type) is inside a generic class or method, the inner type parameter isn't necessarily the same as the outer one. Giving them the same name creates confusion about which type parameter is being referenced. Use a distinct name for the inner type parameter.
- Ensure all type parameters in constraint clauses are declared in the type parameter list (**CS0699**). A `where` clause can only reference type parameters that appear in the generic declaration. If the name in the `where` clause doesn't match any declared type parameter, check for typos or misspellings.
- Use the correct record declaration syntax (**CS9012**). When declaring a record type, you must use either `record class` or `record struct` (or just `record` for a reference type). The `record` keyword alone can't appear in positions where the compiler expects a different declaration syntax.

For more information, see Generic Type Parameters and Generics.
