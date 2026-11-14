---
title: "Errors and warnings associated with reference parameter modifiers (part 3 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/ref-modifiers-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Errors and warnings associated with reference parameter modifiers (part 3 of 3)

## Writable reference variables require a writable referent

A writable reference variable requires that the referent is also writable. The following errors indicate that the variable isn't writable:

- **CS0192**:  *A `readonly` field cannot be used as a `ref` or `out` value (except in a constructor)*
- **CS0199**:  *A `static readonly` field cannot be used as a `ref` or `out` value (except in a static constructor)*
- **CS1605**:  *Cannot use variable as a `ref` or `out` value because it is read-only*
- **CS1649**:  *Members of a `readonly` field cannot be used as a `ref` or `out` value (except in a constructor)*
- **CS1651**:  *Fields of a `static readonly` field cannot be used as a `ref` or `out` value (except in a static constructor)*
- **CS1655**:  *Cannot use fields of type as a `ref` or `out` value*
- **CS1657**:  *Cannot use variable as a `ref` or `out` value*
- **CS8329**:  *Cannot use variable as a `ref` or `out` value because it is a readonly variable*
- **CS8330**:  *Members of variable cannot be used as a `ref` or `out` value because it is a readonly variable*
- **CS8331**:  *Cannot assign to variable or use it as the right hand side of a `ref` assignment because it is a readonly variable*
- **CS8332**:  *Cannot assign to a member of variable or use it as the right hand side of a `ref` assignment because it is a readonly variable*

To correct these errors:

- Copy the value from a readonly field to a local variable and pass the local variable as a `ref` or `out` parameter. Readonly fields are immutable after initialization (except within constructors) and allowing writable references to them would violate the immutability guarantee that readonly provides (**CS0192**, **CS0199**, **CS1649**, **CS1651**).
- Use `ref readonly` or `in` parameters instead of `ref` or `out` when you need to pass <example-value> variables, iteration variables, or other non-writable values by reference. These modifiers indicate that the method will only read the referenced value without attempting to modify it. That aligns with the immutability constraints of the original variable (**CS1605**, **CS1655**, **CS1657**, **CS8329**).
- Copy members of readonly variables to local variables before passing them as writable references. Even though the member itself might not be declared as readonly, it's accessed through a readonly path (via a readonly field, `in` parameter, or `ref readonly` local), and the compiler enforces transitivity of readonly-ness to prevent indirect mutation of readonly data (**CS8330**, **CS8332**).
- Avoid writable ref assignments to readonly variables, foreach iteration variables, using statement resources, or fixed statement variables. These variables have special lifetime semantics managed by the compiler. The variable is automatically finalized or disposed at the end of its scope. External references create dangling references after disposal (**CS8331**).

For more information about readonly semantics and reference parameters, see readonly keyword, in parameter modifier, ref readonly, and the C# Language Specification.
