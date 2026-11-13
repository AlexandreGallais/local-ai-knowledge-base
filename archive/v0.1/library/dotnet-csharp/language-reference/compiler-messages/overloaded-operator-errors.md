---
title: "Resolve errors and warnings related to operator declarations and overflow (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/overloaded-operator-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings for operator declarations and overflow

This article covers the following compiler errors and warnings:

- **CS0031**: *Constant value 'value' cannot be converted to a 'type'*
- **CS0056**: *Inconsistent accessibility: return type 'type' is less accessible than operator 'operator'*
- **CS0057**: *Inconsistent accessibility: parameter type 'type' is less accessible than operator 'operator'*
- **CS0215**: *The return type of operator True or False must be bool*
- **CS0216**: *The operator 'operator' requires a matching operator 'missing_operator' to also be defined*
- **CS0217**: *In order to be applicable as a short circuit operator a user-defined logical operator ('operator') must have the same return type as the type of its 2 parameters.*
- **CS0218**: *The type ('type') must contain declarations of operator true and operator false*
- **CS0220**: *The operation overflows at compile time in checked mode*
- **CS0221**: *Constant value 'value' cannot be converted to a 'type' (use 'unchecked' syntax to override)*
- **CS0448**: *The return type for `++` or `--` operator must be the containing type or derived from the containing type*
- **CS0463**: *Evaluation of the decimal constant expression failed with error: 'error'*
- **CS0543**: *'enumeration' : the enumerator value is too large to fit in its type*
- **CS0552**: *'conversion routine' : user defined conversion to/from interface*
- **CS0553**: *'conversion routine' : user defined conversion to/from base class*
- **CS0554**: *'conversion routine' : user defined conversion to/from derived class*
- **CS0555**: *User-defined operator cannot take an object of the enclosing type and convert to an object of the enclosing type*
- **CS0556**: *User-defined conversion must convert to or from the enclosing type*
- **CS0557**: *Duplicate user-defined conversion in type*
- **CS0558**: *User-defined operator must be declared static and public*
- **CS0559**: *The parameter type for `++` or `--` operator must be the containing type*
- **CS0562**: *The parameter of a unary operator must be the containing type*
- **CS0563**: *One of the parameters of a binary operator must be the containing type*
- **CS0564**: *The first operand of an overloaded shift operator must have the same type as the containing type, and the type of the second operand must be int*
- **CS0567**: *Interfaces cannot contain operators*
- **CS0590**: *User-defined operators cannot return void*
- **CS0594**: *Floating-point constant is outside the range of type 'type'*
- **CS0652**: *Comparison to integral constant is useless; the constant is outside the range of type 'type'*
- **CS0659**: *'class' overrides Object.Equals(object o) but does not override Object.GetHashCode()*
- **CS0660**: *Type defines `operator ==` or `operator !=` but does not override `Object.Equals(object o)`*
- **CS0661**: *Type defines `operator ==` or `operator !=` but does not override `Object.GetHashCode()`*
- **CS0715**: *Static classes cannot contain user-defined operators*
- **CS1021**: *Integral constant is too large*
- **CS1037**: *Overloadable operator expected*
- **CS1553**: *Declaration is not valid; use 'modifier operator \<dest-type> (...' instead*
- **CS8930**: *Explicit implementation of a user-defined operator must be declared static*
- **CS8931**: *User-defined conversion in an interface must convert to or from a type parameter on the enclosing type constrained to the enclosing type*
- **CS8778**: *Constant value 'value' may overflow 'type' at runtime (use 'unchecked' syntax to override)*
- **CS8761**: *Operator 'operator' cannot be applied to 'default' and operand of type 'type' because it is a type parameter that is not known to be a reference type*
- **CS8973**: *The operation may overflow at runtime (use 'unchecked' syntax to override)*
- **CS9023**: *Operator cannot be made checked.*
- **CS9024**: *Operator cannot be made unchecked.*
- **CS9025**: *Operator requires a matching non-checked version to also be declared.*
- **CS9027**: *Unexpected keyword 'unchecked'.*
- **CS9308**: *User-defined operator must be declared public.*
- **CS9310**: *The return type for this operator must be void.*
- **CS9311**: *Type does not implement interface member. The type cannot implement member because one of them is not an operator.*
- **CS9312**: *Type cannot override inherited member because one of them is not an operator.*
- **CS9313**: *Overloaded compound assignment operator takes one parameter.*
- **CS9340**: *Operator cannot be applied to operands. The closest inapplicable candidate is shown.*
- **CS9341**: *Operator cannot be applied to operand. The closest inapplicable candidate is shown.*
- **CS9342**: *Operator resolution is ambiguous between the following members.*

## Operator signature requirements

- **CS0448**: *The return type for `++` or `--` operator must be the containing type or derived from the containing type.*
- **CS0559**: *The parameter type for `++` or `--` operator must be the containing type.*
- **CS0562**: *The parameter of a unary operator must be the containing type.*
- **CS0563**: *One of the parameters of a binary operator must be the containing type.*
- **CS0564**: *The first operand of an overloaded shift operator must have the same type as the containing type, and the type of the second operand must be int.*
- **CS0567**: *Interfaces can't contain operators.*
- **CS0590**: *User-defined operators can't return void.*
- **CS9310**: *The return type for this operator must be void.*
- **CS9340**: *Operator cannot be applied to operands. The closest inapplicable candidate is shown.*
- **CS9341**: *Operator cannot be applied to operand. The closest inapplicable candidate is shown.*
- **CS9342**: *Operator resolution is ambiguous between the following members.*
- **CS8761**: *Operator 'operator' cannot be applied to 'default' and operand of type 'type' because it is a type parameter that is not known to be a reference type*

Each operator type has specific parameter and return type requirements defined by the language specification. For the full rules on which operators can be overloaded, see Operator overloading and Operators in the C# specification.

- Change the return type of `++` or `--` operators to the containing type or a type derived from it (**CS0448**). The language requires that increment and decrement operators return a value compatible with the containing type so the result can be assigned back to the same variable.
- Change the parameter of `++` or `--` operators to the containing type (**CS0559**). Increment and decrement operators must operate on instances of their own type.
- Change the parameter of a unary operator to the containing type (**CS0562**). Unary operators must accept an operand of the type that declares them.
- Ensure at least one parameter of a binary operator is the containing type (**CS0563**). Binary operators must involve the declaring type so the compiler can resolve them through that type.
- Change the first parameter of a shift operator to the containing type and the second parameter to `int` (**CS0564**). The language defines shift operators with a specific signature: the type being shifted and an integer shift amount.
- Move operator declarations out of interfaces and into classes or structs (**CS0567**). Traditional (non-static abstract) operator declarations aren't permitted in interfaces. For static abstract operators in interfaces, see Static abstract and virtual interface member errors.
- Change the return type of the operator to a non-void type (**CS0590**). Most user-defined operators must return a value. The exception is compound assignment operators, which require a `void` return type (**CS9310**).
- Correct the parameter types or add missing operator overloads so the compiler can find a matching operator for the operand types used at the call site (**CS9340**, **CS9341**). When no applicable operator exists, the compiler shows the closest candidate to help diagnose the mismatch.
- Add explicit casts at the call site, or provide more specific overloads to eliminate ambiguity when multiple operator overloads match equally well (**CS9342**).
- Add a `class`, `struct`, or other type constraint to the type parameter so the compiler can determine the applicable operators for the `default` expression (**CS8761**). When a type parameter is unconstrained, the compiler can't determine whether `default` represents `null` (for reference types) or a zeroed value type, making binary operator resolution ambiguous. Alternatively, avoid using `default` directly in binary expressions with unconstrained generic types.

> **Important:**
> The signature requirements for static binary operators and the corresponding instance compound assignment operators are different. Make sure the signature matches the declaration you want.

## Operator declaration requirements

- **CS0558**: *User-defined operator must be declared static and public.*
- **CS0715**: *Static classes can't contain user-defined operators.*
- **CS1037**: *Overloadable operator expected.*
- **CS1553**: *Declaration isn't valid; use 'modifier operator \<dest-type\> (...' instead.*
- **CS9308**: *User-defined operator must be declared public.*

The language requires specific modifiers and syntax for operator declarations. For the full rules, see Operator overloading and User-defined conversion operators.

- Add both the `static` and `public` modifiers to the operator declaration (**CS0558**, **CS9308**). The C# language requires all user-defined operators to be both static and public so they're accessible and callable without an instance.
- Move the operator declaration from a static class into a non-static class or struct (**CS0715**). Static classes can't have instances, so user-defined operators—which operate on instances of their containing type—aren't meaningful in static classes.
- Replace the invalid operator symbol with a valid overloadable operator (**CS1037**). Only specific operators defined by the language can be overloaded.
- Correct the syntax to follow the required conversion operator form: `public static implicit operator <dest-type>( parameter)` or `public static explicit operator <dest-type>( parameter)` (**CS1553**). The compiler expects conversion operators to follow a specific declaration pattern.

For errors related to explicit interface implementations of operators in static abstract interfaces, see Static abstract and virtual interface member errors.

## Inconsistent accessibility

- **CS0056**: *Inconsistent accessibility: return type 'type' is less accessible than operator 'operator'.*
- **CS0057**: *Inconsistent accessibility: parameter type 'type' is less accessible than operator 'operator'.*

All types used in a public operator's signature must be at least as accessible as the operator itself. For the full rules, see Access Modifiers and Accessibility constraints in the C# specification.

- Change the return type to a type that's at least as accessible as the operator, or reduce the accessibility of the operator to match the return type (**CS0056**). A `public` operator can't expose a less-accessible type through its return value because callers outside the assembly wouldn't be able to use the result.
- Change the parameter type to a type that's at least as accessible as the operator, or reduce the accessibility of the operator to match the parameter type (**CS0057**). A `public` operator can't require a less-accessible type as a parameter because callers outside the assembly wouldn't be able to provide the argument.

## User-defined conversion restrictions

- **CS0552**: *User-defined conversion to/from interface.*
- **CS0553**: *User-defined conversion to/from base class.*
- **CS0554**: *User-defined conversion to/from derived class.*
- **CS0555**: *User-defined operator can't take an object of the enclosing type and convert to an object of the enclosing type.*
- **CS0556**: *User-defined conversion must convert to or from the enclosing type.*
- **CS0557**: *Duplicate user-defined conversion in type.*

The C# language restricts which types can participate in user-defined conversions. For the full rules, see User-defined conversion operators and Conversion operators in the C# specification.

- Remove the conversion operator that converts to or from an interface type (**CS0552**). The language prohibits user-defined conversions involving interface types because the type system handles interface conversions through reference conversions and boxing. Use explicit interface implementations or helper methods instead.
- Remove the conversion operator that converts to or from a base class (**CS0553**). Conversions between a type and its base class already exist through implicit reference conversions (upcast) and explicit reference conversions (downcast), so a user-defined conversion would create ambiguity.
- Remove the conversion operator that converts to or from a derived class (**CS0554**). Like base class conversions, conversions between a type and its derived types are built into the language through inheritance, and user-defined conversions would conflict with them.
- Remove the conversion operator that converts the enclosing type to itself (**CS0555**). Every type already has an implicit identity conversion to itself, so a user-defined conversion from a type to the same type is redundant and not permitted.
- Change one of the types in the conversion operator so that either the source or destination type is the enclosing type (**CS0556**). A user-defined conversion must involve the type that declares it—you can't define a conversion between two unrelated external types in a third type.
- Remove the duplicate conversion operator, or change one of the duplicate operators so the source and destination types differ from the other (**CS0557**). A type can declare only one implicit and one explicit conversion for any given pair of source and destination types.
