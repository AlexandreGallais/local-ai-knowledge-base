---
title: "Compiler Errors on partial type and member declarations (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/partial-declarations.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Errors and warnings related to `partial` type and `partial` member declarations

You can encounter the following errors related to `partial` type and `partial` member declarations:

- **CS0260**: *Missing partial modifier on declaration of type; another partial declaration of this type exists*
- **CS0261**: *Partial declarations of type must be all classes, all structs, or all interfaces*
- **CS0262**: *Partial declarations of type have conflicting accessibility modifiers*
- **CS0263**: *Partial declarations of type must not specify different base classes*
- **CS0264**: *Partial declarations of type must have the same type parameter names in the same order*
- **CS0265**: *Partial declarations of type have inconsistent constraints for type parameter 'type parameter'*
- **CS0267**: *The '`partial`' modifier can only appear immediately before '`class`', '`record`', '`struct`', '`interface`', or a method or property return type.*
- **CS0282**: *There is no defined ordering between fields in multiple declarations of partial class or struct 'type'. To specify an ordering, all instance fields must be in the same declaration.*
- **CS0501**: *'member function' must declare a body because it is not marked `abstract`, `extern`, or `partial`*
- **CS0750**: *A partial member cannot have the '`abstract`' modifier.*
- **CS0751**: *A partial member must be declared in a partial `class` or partial `struct`*
- **CS0754**: *A partial member may not explicitly implement an interface method.*
- **CS0755**: *Both partial method declarations must be extension methods or neither may be an extension method.*
- **CS0756**: *A partial method may not have multiple defining declarations.*
- **CS0757**: *A partial method may not have multiple implementing declarations.*
- **CS0759**: *No defining declaration found for implementing declaration of partial method.*
- **CS0761**: *Partial method declarations of `method<T>` have inconsistent type parameter constraints.*
- **CS0762**: *Cannot create delegate from method because it is a partial method without an implementing declaration*
- **CS0763**: *Both partial method declarations must be `static` or neither may be `static`.*
- **CS0764**: *Both partial method declarations must be `unsafe` or neither may be `unsafe`*
- **CS1067**: *Partial declarations must have the same type parameter names and variance modifiers in the same order.*
- **CS8142**: *Both partial member declarations must use the same tuple element names.*
- **CS8663**: *Both partial member declarations must be readonly or neither may be readonly*
- **CS8796**: *Partial method must have accessibility modifiers because it has a non-void return type.*
- **CS8795**: *Partial member must have an implementation part because it has accessibility modifiers.*
- **CS8797**: *Partial method  must have accessibility modifiers because it has '`out`' parameters.*
- **CS8798**: *Partial method must have accessibility modifiers because it has a '`virtual`', '`override`', '`sealed`', '`new`', or '`extern`' modifier.*
- **CS8799**: *Both partial member declarations must have identical accessibility modifiers.*
- **CS8800**: *Both partial member declarations must have identical combinations of `virtual`, `override`, `sealed`, and `new` modifiers.*
- **CS8817**: *Both partial method declarations must have the same return type.*
- **CS8818**: *Partial member declarations must have matching `ref` return values.*
- **CS8863**: *Only a single partial type declaration may have a parameter list*
- **CS8988**: *The `scoped` modifier of parameter doesn't match partial definition.*
- **CS9248**: *Partial property must have an implementation part.*
- **CS9249**: *Partial property must have a definition part.*
- **CS9250**: *A partial property may not have multiple defining declarations, and cannot be an auto-property.*
- **CS9251**: *A partial property may not have multiple implementing declarations*
- **CS9252**: *Property accessor must be implemented because it is declared on the definition part*
- **CS9253**: *Property accessor does not implement any accessor declared on the definition part*
- **CS9254**: *Property accessor must match the definition part*
- **CS9255**: *Both partial property declarations must have the same type.*
- **CS9256**: *Partial property declarations have signature differences.*
- **CS9257**: *Both partial property declarations must be required or neither may be required*
- **CS9275**: *Partial member  must have an implementation part.*
- **CS9276**: *Partial member  must have a definition part.*
- **CS9277**: *Partial member may not have multiple defining declarations.*
- **CS9278**: *Partial member may not have multiple implementing declarations.*
- **CS9279**: *Partial event cannot have initializer.*
- **CS9280**: *Only the implementing declaration of a partial constructor can have an initializer.*

The following sections explain the cause and fixes for these errors and warnings.

## Partial types

- **CS0260**: *Missing partial modifier on declaration of type; another partial declaration of this type exists*
- **CS0261**: *Partial declarations of type must be all classes, all structs, or all interfaces*
- **CS0262**: *Partial declarations of type have conflicting accessibility modifiers*
- **CS0263**: *Partial declarations of type must not specify different base classes*
- **CS0264**: *Partial declarations of type must have the same type parameter names in the same order*
- **CS0265**: *Partial declarations of type have inconsistent constraints for type parameter 'type parameter'*
- **CS0267**: *The '`partial`' modifier can only appear immediately before '`class`', '`record`', '`struct`', '`interface`', or a method or property return type.*
- **CS8863**: *Only a single partial type declaration may have a parameter list*

Your partial type declaration can cause the compiler to emit the following warning:

- **CS0282**: *There is no defined ordering between fields in multiple declarations of partial `class` or `struct` 'type'. To specify an ordering, all instance fields must be in the same declaration.*

These errors occur when your partial type declarations violate the rules for partial types.

- Add the `partial` modifier to all declarations of the type, because once you split a type across multiple declarations, every part must include the keyword (**CS0260**).
- Ensure all declarations use the same type keyword, because mixing `class`, `struct`, `record`, and `interface` in different parts of the same type isn't allowed (**CS0261**). You should ensure consistent access modifiers across all declarations, such as making all parts `public` or all parts `internal`, because conflicting accessibility on different declarations creates ambiguity about the type's intended visibility (**CS0262**).
- Verify that all declarations specify the same base class, because a type can inherit from only one base class, so multiple different base classes conflict (**CS0263**).
- For generic partial types, ensure all declarations list the same type parameters in the same order, because the type parameter names must match exactly across all parts (**CS0264**).
- Verify that constraints on type parameters remain consistent across all declarations, because inconsistent constraints would create ambiguity about what types can be used for the type parameters (**CS0265**).
- Place the `partial` keyword immediately before the type keyword (`class`, `record`, `struct`, or `interface`), because the language syntax requires this specific ordering (**CS0267**).
- Declare a primary constructor on only one partial declaration, because multiple primary constructors would conflict about which constructor parameters and initialization logic to use (**CS8863**).

When you declare fields in multiple files for a partial struct type, you should consolidate all field declarations into a single file if the memory layout order matters, because the compiler can't guarantee a specific ordering when fields are split across multiple files (**CS0282**). Alternatively, if the layout order doesn't matter, you can apply the `System.Runtime.InteropServices.StructLayoutAttribute` with the `System.Runtime.InteropServices.LayoutKind.Auto` value to allow the runtime to optimize the layout automatically.

## Partial members

- **CS0750**: *A partial member cannot have the '`abstract`' modifier.*
- **CS0751**: *A partial member must be declared in a partial `class` or partial `struct`*
- **CS0754**: *A partial member may not explicitly implement an interface method.*
- **CS0763**: *Both partial method declarations must be `static` or neither may be `static`.*
- **CS0764**: *Both partial method declarations must be `unsafe` or neither may be `unsafe`*
- **CS8142**: *Both partial member declarations must use the same tuple element names.*
- **CS8663**: *Both partial member declarations must be readonly or neither may be readonly*
- **CS8799**: *Both partial member declarations must have identical accessibility modifiers.*
- **CS8800**: *Both partial member declarations must have identical combinations of `virtual`, `override`, `sealed`, and `new` modifiers.*
- **CS8818**: *Partial member declarations must have matching `ref` return values.*
- **CS8988**: *The `scoped` modifier of parameter doesn't match partial definition.*
- **CS9275**: *Partial member  must have an implementation part.*
- **CS9276**: *Partial member  must have a definition part.*
- **CS9277**: *Partial member may not have multiple defining declarations.*
- **CS9278**: *Partial member may not have multiple implementing declarations.*

These errors occur when your partial member declarations violate the rules for partial methods, properties, indexers, and events.

- Remove the `abstract` modifier from partial members, because abstract members require derived classes to provide implementations. This requirement conflicts with the partial member pattern where the implementation is provided in the implementing declaration (**CS0750**).
- Declare partial members within a type that includes the `partial` modifier, because partial members can only exist in partial types (**CS0751**).
- Remove explicit interface implementations from partial members, because the two-part declaration pattern isn't compatible with explicit interface implementation syntax (**CS0754**).
- Include or omit the `static` modifier consistently in both declarations, because mixing static and instance members would create ambiguity about how the member is invoked (**CS0763**).
- Include or omit the `unsafe` modifier consistently in both declarations, because inconsistent unsafe contexts could create safety issues or compilation errors (**CS0764**).
- Use identical tuple element names in both declarations, because different names would create confusion about which names are available in consuming code (**CS8142**).
- Include or omit the `readonly` modifier consistently in both declarations, because mixing readonly and non-readonly declarations creates ambiguity about whether the member can modify instance state (**CS8663**).
- Use identical accessibility modifiers (such as `public`, `private`, `protected`, or `internal`) on both declarations, because different accessibility levels would conflict about the member's visibility (**CS8799**).
- Apply the same combination of `virtual`, `override`, `sealed`, and `new` modifiers to both declarations, because these modifiers control inheritance and polymorphism behavior that must be consistent (**CS8800**).
- Use matching `ref` return modifiers in both declarations, because inconsistent return-by-reference behavior would create type safety issues (**CS8818**).
- Apply the `scoped` modifier consistently to parameters in both declarations, because this modifier controls the lifetime of ref parameters and must match to ensure memory safety (**CS8988**).
- Provide an implementing declaration for every partial member that has a defining declaration, because partial members require both parts to be complete (**CS9275**, **CS9276**).
- Ensure each partial member has exactly one defining declaration and one implementing declaration, because multiple declarations would create ambiguity about which definition or implementation to use (**CS9277**, **CS9278**).
