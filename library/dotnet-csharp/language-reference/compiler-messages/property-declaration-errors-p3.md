---
title: "Compiler Errors on property declarations (part 3 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/property-declaration-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Compiler Errors on property declarations (part 3 of 3)

## Required members

- **CS9029**: *Types and aliases cannot be named 'required'.*
- **CS9030**: *'member' must be required because it overrides required member 'member'*
- **CS9031**: *Required member 'member' cannot be hidden by 'member'.*
- **CS9032**: *Required member cannot be less visible or have a setter less visible than the containing type.*
- **CS9033**: *Do not use '`System.Runtime.CompilerServices.RequiredMemberAttribute'`. Use the 'required' keyword on required fields and properties instead.*
- **CS9034**: *Required member must be settable.*
- **CS9035**: *Required member must be set in the object initializer or attribute constructor.*
- **CS9036**: *Required member 'memberName' must be assigned a value, it cannot use a nested member or collection initializer.*
- **CS9037**: *The required members list for 'type' is malformed and cannot be interpreted.*
- **CS9038**: *The required members list for the base type 'type' is malformed and cannot be interpreted. To use this constructor, apply the '`SetsRequiredMembers`' attribute.*
- **CS9039**: *This constructor must add '`SetsRequiredMembers`' because it chains to a constructor that has that attribute.*
- **CS9040**: *Type cannot satisfy the '`new()`' constraint on parameter in the generic type or method because it has required members.*
- **CS9042**: *Required member should not be attributed with '`ObsoleteAttribute`' unless the containing type is obsolete or all constructors are obsolete.*
- **CS9045**: *Required members are not allowed on the top level of a script or submission.*

To correct required member errors, apply one of the following changes based on the specific diagnostic:

- Avoid using `required` as a type or alias name (**CS9029**). This correction is necessary because `required` is a contextual keyword in C# 11 and later, and using it as a type name creates ambiguity in code where the keyword might appear.
- Ensure derived members maintain the `required` modifier when overriding required members (**CS9030**). This correction enforces the contract established by the base class, guaranteeing that all derived types maintain the same initialization requirements. Avoid hiding required members with non-required members in derived classes (**CS9031**), as this action breaks the initialization contract that consumers expect from the base type.
- Make required members at least as visible as their containing type, and ensure property setters are also sufficiently visible (**CS9032**). This correction prevents situations where a type is publicly accessible but its required members can't be initialized from all contexts where the type is constructed.
- Use the `required` keyword instead of manually applying `System.Runtime.CompilerServices.RequiredMemberAttribute` (**CS9033**). This correction ensures the compiler generates the correct metadata and enforces all required member rules, which manual attribute application might not do correctly.
- Ensure required members have set accessors or are otherwise settable (**CS9034**). This correction is necessary because required members must be initialized during object creation, which requires write access. When creating instances, initialize required members directly in object initializers (**CS9035**, **CS9036**). You must assign a value to each required member rather than using nested member initializers or collection initializers, because the required member itself must be set before accessing its properties.
- Apply the `SetsRequiredMembers` attribute to constructors that initialize all required members in their bodies (**CS9038**, **CS9039**). This correction informs the compiler that the constructor fulfills the required member contract, allowing object creation without object initializers. If a constructor chains to another constructor with `SetsRequiredMembers`, it must also have the attribute.
- Avoid using required members in types that must satisfy the `new()` constraint (**CS9040**), as the parameterless constructor can't guarantee required member initialization without an object initializer. Don't mark required members as obsolete unless the containing type or all constructors are obsolete (**CS9042**), to prevent situations where members are required but their use is discouraged. Required members aren't allowed in top-level statements or script contexts (**CS9045**) because these contexts don't support the object initialization syntax needed to set required members.

For more information, see the required modifier reference article and Object and Collection Initializers guide.

## Ref-returning properties

- **CS8145**: *Auto-implemented properties cannot return by reference*
- **CS8147**: *Properties which return by reference cannot have set accessors*

To correct ref-returning property errors, apply one of the following changes based on the specific diagnostic:

- Implement the property explicitly with a backing field and use the `ref` keyword in the `get` accessor's return expression (**CS8145**). This correction is necessary because auto-implemented properties generate a private backing field that the compiler manages internally. Returning a reference to a private field would expose internal storage that callers shouldn't access directly. To create a ref-returning property, declare an explicit field and return it with `=> ref backingField` syntax. Alternatively, if you don't need to return a reference to allow direct modification of the storage, remove the `ref` modifier from the property declaration.
- Remove the `set` accessor from ref-returning properties (**CS8147**). This correction is required because a ref-returning property already provides both read and write access through the returned reference itself. Callers can directly modify the value through the reference without needing a separate setter method. Including a `set` accessor would create two different mechanisms for modifying the same storage, which is redundant and could lead to confusion about which modification path should be used.

For more information, see ref returns and ref locals and Properties.
