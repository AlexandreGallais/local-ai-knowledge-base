---
title: "Errors and warnings associated with `ref struct` types"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/ref-struct-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Errors and warnings associated with `ref struct` types

- **CS8343**: *`ref structs` cannot implement interfaces*
- **CS8344**: *`foreach` statement cannot operate on enumerators in async or iterator methods because type is a `ref struct` or a type parameter that allows `ref struct`.*
- **CS8345**: *Field or auto-implemented property cannot be of type unless it is an instance member of a `ref struct`.*
- **CS9048**: *The `scoped` modifier can be used for refs and `ref struct` values only.*
- **CS9050**: *A `ref` field cannot refer to a `ref struct`.*
- **CS9059**: *A ref field can only be declared in a ref struct.*
- **CS9241**: *'ref struct' is already specified.*
- **CS9242**: *The 'allows' constraint clause must be the last constraint specified.*
- **CS9243**: *Cannot allow ref structs for a type parameter known from other constraints to be a class.*
- **CS9244**: *The type may not be a `ref struct` or a type parameter allowing ref structs in order to use it as parameter in the generic type or method.*
- **CS9245**: *Type cannot implement interface member for `ref struct` type.*
- **CS9246**: *A non-virtual instance interface member cannot be accessed on a type parameter that allows ref struct.*
- **CS9247**: *foreach statement cannot operate on enumerators of type because it is a type parameter that allows ref struct and it is not known at compile time to implement `IDisposable`.*
- **CS9267**: *Element type of an iterator may not be a ref struct or a type parameter allowing ref structs*

## ref safety violations

- **CS8345**: *Field or auto-implemented property cannot be of type unless it is an instance member of a `ref struct`.*
- **CS9048**: *The `scoped` modifier can be used for refs and `ref struct` values only.*
- **CS9050**: *A `ref` field cannot refer to a `ref struct`.*
- **CS9059**: *A `ref` field can only be declared in a `ref struct`.*

A `ref struct` type can include `ref` fields. Other types aren't allowed `ref` fields. The compiler enforces restrictions on the declarations and use of `ref struct` types to enforce ref safety rules on instances of any `ref struct` type:

- Only `ref struct` types can contain automatically implemented `ref` properties.
- Only `ref struct` types or `ref` variables can have the `scoped` modifier.
- A `ref` field can be declared only in a `ref struct` type.
- A `ref` field can't refer to a `ref struct` type/

Violating any of these rules produces one of the listed errors. If you intended to use that language feature, convert the type to a `ref struct`. Otherwise, remove the disallowed construct.

## ref struct interface implementations

- **CS8343**: *`ref structs` cannot implement interfaces*
- **CS8344**: *`foreach` statement cannot operate on enumerators in async or iterator methods because type is a `ref struct` or a type parameter that allows `ref struct`.*
- **CS9241**: *'ref struct' is already specified.*
- **CS9242**: *The 'allows' constraint clause must be the last constraint specified.*
- **CS9243**: *Cannot allow ref structs for a type parameter known from other constraints to be a class.*
- **CS9244**: *The type may not be a `ref struct` or a type parameter allowing ref structs in order to use it as parameter in the generic type or method.*
- **CS9245**: *Type cannot implement interface member for `ref struct` type.*
- **CS9246**: *A non-virtual instance interface member cannot be accessed on a type parameter that allows ref struct.*
- **CS9247**: *foreach statement cannot operate on enumerators of type because it is a type parameter that allows ref struct and it is not known at compile time to implement `IDisposable`.*
- **CS9267**: *Element type of an iterator may not be a ref struct or a type parameter allowing ref structs*

Prior to C# 13, `ref struct` types can't implement interfaces; the compiler generates *CS8343*. Beginning with C# 13, `ref struct` types can implement interfaces, subject to the following rules:

- A `ref struct` can't be converted to an instance of an interface it implements. This restriction includes the implicit conversion when you use a `ref struct` type as an argument when the parameter is an interface type. The conversion results in a boxing conversion, which violates ref safety.
- A `ref struct` that implements an interface *must* implement all interface members. The `ref struct` must implement members where the interface includes a default implementation.

Beginning with C# 13, a `ref struct` can be used as a type argument for a generic type parameter, if and only if the generic type parameter has the `allows ref struct` anti-constraint. When you use the `allows ref struct` anti-constraint you must follow these rules:

- A `ref struct` is used as a type argument, the type parameter *must* have the `allows ref struct` anti-constraint.- The `allows ref struct` anti-constraint must be last in the `where` clause for that parameter
- Uses of instances the type parameter must obey ref safety rules.
- A `ref struct` or a type argument that can be a `ref struct` type can't be used as the element type for an iterator method.
