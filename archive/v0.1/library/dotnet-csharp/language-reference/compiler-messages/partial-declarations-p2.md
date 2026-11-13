---
title: "Compiler Errors on partial type and member declarations (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/partial-declarations.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Compiler Errors on partial type and member declarations (part 2 of 2)

## Partial methods

- **CS0501**: *'member function' must declare a body because it is not marked `abstract`, `extern`, or `partial`*
- **CS0755**: *Both partial method declarations must be extension methods or neither may be an extension method.*
- **CS0756**: *A partial method may not have multiple defining declarations.*
- **CS0757**: *A partial method may not have multiple implementing declarations.*
- **CS0759**: *No defining declaration found for implementing declaration of partial method.*
- **CS0761**: *Partial method declarations of `method<T>` have inconsistent type parameter constraints.*
- **CS0762**: *Cannot create delegate from method because it is a partial method without an implementing declaration*
- **CS1067**: *Partial declarations must have the same type parameter names and variance modifiers in the same order.*
- **CS8796**: *Partial method must have accessibility modifiers because it has a non-void return type.*
- **CS8795**: *Partial member must have an implementation part because it has accessibility modifiers.*
- **CS8797**: *Partial method  must have accessibility modifiers because it has '`out`' parameters.*
- **CS8798**: *Partial method must have accessibility modifiers because it has a '`virtual`', '`override`', '`sealed`', '`new`', or '`extern`' modifier.*
- **CS8817**: *Both partial method declarations must have the same return type.*

These errors occur when your partial method declarations violate the rules for partial methods.

- Add the `partial` modifier to the method declaration, or provide a method body, because methods without implementations must be marked as `abstract`, `extern`, or `partial` (**CS0501**).
- Ensure both declarations include or omit the extension method syntax (`this` modifier on the first parameter) consistently, because mixing extension and non-extension declarations creates incompatible method signatures (**CS0755**).
- Remove duplicate defining declarations (the declarations without method bodies), because each partial method can have only one definition (**CS0756**).
- Remove duplicate implementing declarations (the declarations with method bodies), because each partial method can have only one implementation (**CS0757**).
- Add a corresponding defining declaration for each implementing declaration, because every partial method with a body must have a matching signature declaration without a body (**CS0759**).
- Ensure type parameter constraints match across both declarations, because inconsistent constraints create ambiguity about which types are valid for the generic method (**CS0761**).
- Provide an implementing declaration before creating a delegate from the method, because delegates require a concrete method implementation to reference (**CS0762**).
- For generic partial methods, ensure both declarations use the same type parameter names and variance modifiers in the same order, because mismatched generic signatures create incompatible method declarations (**CS1067**).
- Add explicit accessibility modifiers (such as `public`, `private`, `protected`, or `internal`) when the method returns a non-`void` type, because non-void partial methods must have defined accessibility to be callable from other code (**CS8796**).
- Provide an implementing declaration when accessibility modifiers are specified, because accessible partial methods must have implementations to be invoked (**CS8795**).
- Add explicit accessibility modifiers when the method has `out` parameters, because methods with out parameters must have defined accessibility to be callable (**CS8797**).
- Add explicit accessibility modifiers when using `virtual`, `override`, `sealed`, `new`, or `extern` modifiers, because these modifiers affect method visibility and require explicit accessibility specification (**CS8798**).
- Ensure both declarations specify the same return type, because different return types create incompatible method signatures (**CS8817**).

## Partial properties

- **CS9248**: *Partial property must have an implementation part.*
- **CS9249**: *Partial property must have a definition part.*
- **CS9250**: *A partial property may not have multiple defining declarations, and cannot be an auto-property.*
- **CS9251**: *A partial property may not have multiple implementing declarations*
- **CS9252**: *Property accessor must be implemented because it is declared on the definition part*
- **CS9253**: *Property accessor does not implement any accessor declared on the definition part*
- **CS9254**: *Property accessor must match the definition part*
- **CS9255**: *Both partial property declarations must have the same type.*
- **CS9257**: *Both partial property declarations must be required or neither may be required*

Your partial property or indexer declaration can cause the compiler to emit the following warning:

- **CS9256**: *Partial property declarations have signature differences.*

These errors and warnings occur when your partial property or indexer declarations violate the rules for partial properties.

- Provide an implementing declaration for each partial property defining declaration, because partial properties require both parts to be complete (**CS9248**).
- Provide a defining declaration for each partial property implementing declaration, because every implementation must have a corresponding definition (**CS9249**).
- Remove duplicate defining declarations and avoid using auto-property syntax in the implementing declaration, because each partial property can have only one definition and the implementation must include explicit accessor bodies (**CS9250**).
- Remove duplicate implementing declarations, because each partial property can have only one implementation (**CS9251**).
- Implement all accessors declared in the defining declaration, because the implementing declaration must provide bodies for every accessor (get, set, or init) specified in the definition (**CS9252**).
- Remove accessors from the implementing declaration that weren't declared in the defining declaration, because you can only implement accessors that were declared in the definition part (**CS9253**).
- Ensure accessor signatures match between both declarations, including the accessor type (get, set, or init) and any modifiers, because inconsistent accessor definitions create incompatible property declarations (**CS9254**).
- Ensure both declarations specify the same property type, because different types create incompatible property signatures (**CS9255**).
- Ensure both declarations include or omit the `required` modifier consistently, because mixing required and non-required declarations creates ambiguity about whether the property must be initialized (**CS9257**).
- Review and correct any signature mismatches between the declaring and implementing declarations, because differences in accessibility modifiers, return types, or parameter lists (for indexers) can cause unexpected behavior (**CS9256**).

## Partial events and constructors

- **CS9279**: *Partial event cannot have initializer.*
- **CS9280**: *Only the implementing declaration of a partial constructor can have an initializer.*

You declared an initializer on the defining declaration of a partial constructor or on a partial event declaration. Remove the initializer.
