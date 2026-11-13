---
title: "Resolve errors and warnings related to interface implementation. (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/interface-implementation-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to members that implement an interface

This article covers the following compiler errors:

- **CS0071**: *An explicit interface implementation of an event must use event accessor syntax.*
- **CS0106**: *The modifier is not valid for this item.*
- **CS0277**: *Member does not implement interface member because it is not public.*
- **CS0425**: *The constraints for type parameter of method must match the constraints for type parameter of interface method. Consider using an explicit interface implementation instead.*
- **CS0460**: *Constraints for override and explicit interface implementation methods are inherited from the base method, so they cannot be specified directly, except for either a 'class', or a 'struct' constraint.*
- **CS0470**: *Method cannot implement interface accessor for type. Use an explicit interface implementation.*
- **CS0473**: *Explicit interface implementation 'method name' matches more than one interface member. Which interface member is actually chosen is implementation-dependent. Consider using a non-explicit implementation instead.*
- **CS0531**: *Interface members cannot have a definition.*
- **CS0535**: *Member does not implement interface member.*
- **CS0538**: *Member in explicit interface declaration is not an interface.*
- **CS0539**: *Member in explicit interface declaration is not found among members of the interface that can be implemented*.
- **CS0540**: *Containing type does not implement interface member.*
- **CS0541**: *Explicit interface declaration can only be declared in a class, record, struct or interface.*
- **CS0550**: *Member adds an accessor not found in interface member.*
- **CS0551**: *Explicit interface implementation is missing an accessor.*
- **CS0630**: *Member cannot implement interface member because it has an __arglist parameter.*
- **CS0686**: *Accessor cannot implement interface member. Use an explicit interface implementation.*
- **CS0736**: *Member does not implement instance interface member. It cannot implement the interface member because it is static.*
- **CS0737**: *Member does not implement interface member. It cannot implement an interface member because it is not public.*
- **CS0738**: *Member does not implement interface member. It cannot because it does not have the matching return type.*
- **CS8646**: *'member' is explicitly implemented more than once.*
- **CS8705**: *Interface member does not have a most specific implementation. Neither member is most specific.*
- **CS8854**: *Member does not implement interface member.*
- **CS9333**: *Parameter type must match implemented member.*
- **CS9334**: *Return type must match implemented member.*

## Interface declaration and syntax

The following errors relate to proper syntax and structure when declaring explicit interface implementations:

- **CS0071**: *An explicit interface implementation of an event must use event accessor syntax.*
- **CS0106**: *The modifier is not valid for this item.*
- **CS0531**: *Interface members cannot have a definition.*
- **CS0538**: *Member in explicit interface declaration is not an interface.*
- **CS0541**: *Explicit interface declaration can only be declared in a class, record, struct or interface.*

You can correct these errors using the following techniques:

- You must manually provide `add` and `remove` event accessors when explicitly implementing an interface event (**CS0071**). The compiler doesn't automatically generate these accessors for explicit interface implementations, so you must define them explicitly to specify how the event is stored and managed.
- Remove the `public` modifier from explicit interface implementations (**CS0106**). Explicit interface implementations are implicitly public when accessed through the interface type, making the `public` keyword redundant and not allowed in this context.
- Remove the `abstract` modifier from explicit interface implementations (**CS0106**). Explicit interface implementations provide the actual implementation and can't be marked as abstract because they can't be overridden in derived classes.
- Remove the method body from interface member declarations, or move the implementation to a class or struct that implements the interface (**CS0531**). Before C# 8.0, interface members can't contain implementations; starting with C# 8.0, you can provide default interface methods using specific syntax.
- Verify that the type specified in the explicit interface declaration is an actual interface type (**CS0538**). Only interface types can be used in explicit interface implementation syntax; attempting to use a class or other non-interface type violates the explicit implementation rules.
- Move explicit interface declarations into a class or struct that declares the interface in its base list (**CS0541**). Explicit interface implementations must appear within the body of a class or struct type and can't be declared at the namespace level or in other contexts.

For more information, see Interfaces, Explicit Interface Implementation, and How to implement interface events.

## Return types and signatures

The following errors occur when the implementing method's signature doesn't match the interface member declaration:

- **CS0738**: *Member does not implement interface member. It cannot because it does not have the matching return type.*
- **CS8854**: *Member does not implement interface member.*
- **CS9333**: *Parameter type must match implemented member.*
- **CS9334**: *Return type must match implemented member.*

You can correct these errors using the following techniques:

- Change the return type of the implementing method to exactly match the return type declared in the interface member (**CS0738**, **CS9334**). The signature of the implementation must match the interface declaration precisely because the method signature is part of the contract that determines which interface member is being implemented.
- Ensure that parameter types in the implementing method exactly match the parameter types declared in the interface member (**CS9333**). Each parameter must have the identical type in the same position as specified in the interface declaration, as parameter types are fundamental components of the method signature that the compiler uses to match implementations to interface members.
- Add an `init` accessor to the implementing property when the interface property declares an `init` setter (**CS8854**). The `init` keyword allows property initialization during object construction while preventing modification afterward, and the implementing property must provide this same initialization-only behavior to satisfy the interface contract.

For more information, see Interfaces, Properties, and Init-only setters.

## Missing or incomplete implementations

The following errors occur when a class fails to fully implement an interface or implements members that don't match the interface contract:

- **CS0535**: *Member does not implement interface member.*
- **CS0550**: *Member adds an accessor not found in interface member.*
- **CS0551**: *Explicit interface implementation is missing an accessor.*

You can correct these errors using the following techniques:

- Provide an implementation for every member declared in the interface, or declare the type as `abstract` (**CS0535**). Each member must be implemented to satisfy the interface requirements.
- Remove any accessors from the implementing property that aren't declared in the interface property (**CS0550**). The implementing property can only include the accessors explicitly declared in the interface definition, ensuring that the implementation doesn't add functionality beyond what the interface contract specifies.
- Add all required accessors to the explicit interface implementation to match the interface declaration (**CS0551**). Each accessor declared in the interface must have a corresponding accessor in the implementation with matching signatures, as the implementation must fulfill the complete accessor contract defined by the interface.

For more information, see Interfaces and Properties.

## Member matching and resolution

The following errors occur when attempting to implement interface members that don't exist in the interface or when the containing type doesn't declare the interface:

- **CS0539**: *Member in explicit interface declaration is not found among members of the interface that can be implemented*.
- **CS0540**: *Containing type does not implement interface member.*

You can correct these errors using the following techniques:

- Verify that the member name and signature in the explicit interface implementation exactly match a member declared in the interface, or remove the incorrect implementation (**CS0539**). The member you're attempting to implement must actually exist in the interface definition with matching name, return type, and parameter types, as explicit interface implementation requires precise correspondence with the interface contract.
- Add the interface to the class's or struct's base list, or remove the explicit interface implementation (**CS0540**). A type can only explicitly implement members of interfaces that it declares in its inheritance list, so the implementing type must establish the interface relationship before it can provide explicit implementations.

For more information, see Interfaces and Explicit Interface Implementation.

## Generic type constraints

The following errors occur when implementing generic interface methods with type parameter constraints:

- **CS0425**: *The constraints for type parameter of method must match the constraints for type parameter of interface method. Consider using an explicit interface implementation instead.*
- **CS0460**: *Constraints for override and explicit interface implementation methods are inherited from the base method, so they cannot be specified directly, except for either a 'class', or a 'struct' constraint.*

You can correct these errors using the following techniques:

- Ensure the `where` clause in the implementing method is identical to the interface method declaration, or matches the semantic meaning of the constraints (**CS0425**). The type parameter constraints in the implementation must match those defined in the interface or base method.
- Remove explicit constraint declarations from override and explicit interface implementation methods (**CS0460**). The override method inherits its constraints automatically from the base or interface method, so redeclaring them is redundant and not permitted except for specific cases allowed in C# 8 and later.
- Apply the `default` constraint to resolve ambiguities with nullable reference types in override and explicit interface implementations when using C# 9 or later (**CS0460**). This exception to the constraint inheritance rule allows you to explicitly specify the default constraint to disambiguate nullable annotation contexts.
- Explicitly specify `where T : class` or `where T : struct` constraints on override and explicit interface implementation methods when using C# 8 or later to enable nullable reference type annotations (**CS0460**). These specific constraints are permitted to support nullable reference type analysis on type parameters that are constrained to reference or value types.

For more information, see Constraints on type parameters, Interfaces, and Nullable reference types.

## Method visibility and modifiers

The following errors occur when implementing interface methods with incorrect accessibility or modifiers:

- **CS0736**: *Member does not implement instance interface member. It cannot implement the interface member because it is static.*
- **CS0737**: *Member does not implement interface member. It cannot implement an interface member because it is not public.*

You can correct these errors using the following techniques:

- Remove the `static` modifier from the method declaration that implements the interface member (**CS0736**). Before C# 10, interface members are instance members, not static members.
- Add the `public` access modifier to the method that implements the interface member (**CS0737**). All interface members are implicitly `public` because interfaces define a contract for public behavior, so the implementing method must also have public accessibility to be accessible through the interface reference.

For more information, see Interfaces and Access Modifiers.

## Accessor implementation and conflicts

The following errors occur when implementing interface properties or events with accessor methods that have visibility issues or naming conflicts:

- **CS0277**: *Member does not implement interface member because it is not public.*
- **CS0470**: *Method cannot implement interface accessor for type. Use an explicit interface implementation.*
- **CS0686**: *Accessor cannot implement interface member. Use an explicit interface implementation.*

You can correct these errors using the following techniques:

- Remove any access modifiers from property accessors that restrict visibility to less visible than `public`, or add the `public` modifier if it's missing (**CS0277**). All interface members are implicitly `public`, so the implementing accessor must also have public accessibility to satisfy the interface contract and be accessible through the interface type.
- Replace methods with accessor-like names (such as `get_PropertyName`) with proper property syntax using explicit interface implementation (**CS0470**). The compiler generates accessor methods internally for properties, and attempting to manually create methods with these reserved names conflicts with the property implementation mechanism.
- Use explicit interface implementation syntax to resolve naming conflicts when the interface contains method names that match the auto-generated accessor methods (**CS0686**). The compiler automatically generates methods like `get_Property` and `set_Property` for properties, and `add_Event` and `remove_Event` for events, so if an interface declares methods with these exact names, explicit implementation is required to disambiguate between the interface method and the compiler-generated accessor.

For more information, see Interfaces, Properties, and Events.
