---
title: "Compiler Errors on property declarations (part 2 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/property-declaration-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Compiler Errors on property declarations (part 2 of 3)

## Field-backed properties

- **CS9258**: *In this language version, the '`field`' keyword binds to a synthesized backing field for the property. To avoid generating a synthesized backing field, and to refer to the existing member, use '`this.field`' or '`@field`' instead.*
- **CS9263**: *A partial property cannot have an initializer on both the definition and implementation.*
- **CS9264**: *Non-nullable property 'property' must contain a non-null value when exiting constructor. Consider adding the 'required' modifier, or declaring the property as nullable, or safely handling the case where '`field`' is null in the '`get`' accessor.*
- **CS9266**: *The 'accessor' accessor of property 'property' should use '`field`' because the other accessor is using it.*
- **CS9273**: *In this language version, '`field`' is a keyword within a property accessor. Rename the variable or use the identifier '`@field`' instead.*

To correct field-backed property errors, apply one of the following changes based on the specific diagnostic:

- Rename any variable named `field` to a different identifier, or use the `@field` escape syntax to refer to your variable (**CS9258**, **CS9273**). This correction is necessary because `field` is a contextual keyword within property accessors in C# 13 and later, where it refers to the compiler-synthesized backing field. If you want to access an existing member named `field` instead of the synthesized backing field, qualify it with `this.field` to disambiguate the reference.
- Remove the initializer from either the partial property definition or the implementation, keeping only one (**CS9263**). This correction is required because allowing initializers in both locations would create ambiguity about which value should be used and could lead to the backing field being initialized twice with potentially different values.
- Add the `[field: MaybeNull, AllowNull]` attributes to the property declaration to indicate that the backing field should be treated as nullable (**CS9264**). This correction aligns the nullability expectations between the property type and the compiler-synthesized backing field, resolving the mismatch where the property is declared as non-nullable but the `field` keyword usage suggests it could be null. Alternatively, change the property type to nullable, add the `required` modifier to ensure initialization, or initialize the property in the constructor.
- Consistently use either the `field` keyword in both accessors or use an explicit backing field in both accessors (**CS9266**). This correction prevents potential bugs where one accessor modifies the compiler-synthesized backing field while the other accessor modifies a different storage location, leading to inconsistent property behavior.

For more information, see field keyword and Partial properties.

## Readonly properties

- **CS0200**: *Property or indexer 'property' cannot be assigned to -- it is read only*
- **CS8341**: *Auto-implemented instance properties in readonly structs must be readonly.*
- **CS8657**: *Static member 'member' cannot be marked 'readonly'.*
- **CS8658**: *Auto-implemented 'set' accessor 'accessor' cannot be marked 'readonly'.*
- **CS8659**: *Auto-implemented property 'property' cannot be marked 'readonly' because it has a 'set' accessor.*
- **CS8660**: *Cannot specify 'readonly' modifiers on both property or indexer 'property' and its accessor. Remove one of them.*
- **CS8661**: *Cannot specify 'readonly' modifiers on both accessors of property or indexer 'property'. Instead, put a 'readonly' modifier on the property itself.*
- **CS8664**: *'property': 'readonly' can only be used on accessors if the property or indexer has both a get and a set accessor*

To correct readonly property errors, apply one of the following changes based on the specific diagnostic:

- Add a `set` or `init` accessor to the property to make it writable (**CS0200**). This correction is necessary because properties without set accessors are read-only and can only be assigned in the declaring type's constructor or field initializer. If you need the property to be set during object initialization but immutable afterward, use an `init` accessor instead of a `set` accessor. If the property should remain read-only, move the assignment into the constructor where initialization is permitted, or reconsider whether the assignment is necessary at all.
- Mark auto-implemented instance properties as `readonly` when you declare them within a `readonly struct` (**CS8341**). This correction enforces the immutability contract of the containing struct, ensuring that all instance members respect the `readonly` guarantee. If the property needs to be mutable, either remove the `readonly` modifier from the struct declaration or implement the property with an explicit backing field and accessor bodies that don't modify instance state.
- Remove the `readonly` modifier from static property or accessor declarations (**CS8657**). This correction is required because the `readonly` modifier only applies to instance members of structs to indicate they don't modify instance state, and static members don't have instance state to protect. If you need a read-only static property, simply omit the `set` accessor rather than using the `readonly` modifier.
- Remove the `readonly` modifier from auto-implemented `set` accessors, or apply it to the `get` accessor only (**CS8658**). This correction is necessary because `set` accessors inherently modify state, which contradicts the purpose of the `readonly` modifier that guarantees no modification of instance state. If you need a property that can be set during initialization but is read-only afterward, use an `init` accessor instead of a `set` accessor.
- Remove the `readonly` modifier from the property declaration when the property has a `set` accessor (**CS8659**). This correction is required because properties with `set` accessors can modify instance state, which violates the `readonly` guarantee. If you need initialization-time setting only, replace the `set` accessor with an `init` accessor, or remove the `set` accessor entirely to make the property truly read-only.
- Place the `readonly` modifier either on the property declaration or on individual accessors, but not both (**CS8660**, **CS8661**). This correction prevents redundant modifier declarations that could create confusion about which modifier takes precedence. If you want to mark specific accessors as `readonly`, remove the modifier from the property declaration and place it only on the accessors. Alternatively, if all accessors should be `readonly`, mark the property itself rather than individual accessors.
- Ensure both `get` and `set` accessors are present when marking individual accessors as `readonly` (**CS8664**). This correction is necessary because the `readonly` modifier on individual accessors distinguishes between accessors that modify state and those that don't, which only makes sense when both accessor types exist. If the property has only a `get` accessor, mark the entire property as `readonly` instead of the individual accessor.

For more information, see readonly instance members, init keyword, and Properties.

## Init-only properties

- **CS8852**: *Init-only property or indexer 'property' can only be assigned in an object initializer, or on 'this' or 'base' in an instance constructor or an 'init' accessor.*
- **CS8853**: *'member' must match by init-only of overridden member 'member'*
- **CS8855**: *Accessors 'accessor' and 'accessor' should both be init-only or neither*
- **CS8856**: *The 'init' accessor is not valid on static members*
- **CS8903**: *'init' accessors cannot be marked 'readonly'. Mark 'property' readonly instead.*

These errors enforce the rules for the `init` accessor, which enables immutable object initialization. For the full rules, see init keyword. To correct these errors, apply one of the following changes based on the specific diagnostic:

- Move assignments to init-only properties into an object initializer, a constructor, or an `init` accessor (**CS8852**). Init-only properties can't be assigned after object construction completes. Assign the value in the constructor body, an `init` accessor, or an object initializer expression (`new MyType { Property = value }`). If you need to assign the property after construction, change the `init` accessor to a `set` accessor.
- Match the `init` or `set` accessor kind when overriding a property (**CS8853**). If the base class property uses an `init` accessor, the overriding property must also use `init`. Similarly, if the base uses `set`, the override must use `set`. This consistency ensures that the immutability contract established by the base type is preserved in derived types.
- Use the same accessor kind (`init` or `set`) on both accessors in an explicit interface implementation (**CS8855**). When a type explicitly implements two interfaces that declare the same property, both accessor implementations must agree: either both use `init` or both use `set`.
- Remove the `init` accessor from static property declarations, or change it to a `set` accessor (**CS8856**). The `init` accessor is designed for instance initialization patterns tied to object construction, and static members don't participate in object initialization. Use a `set` accessor for mutable static properties, or remove the setter entirely for read-only static properties.
- Remove the `readonly` modifier from the `init` accessor (**CS8903**). The `readonly` modifier on a struct member guarantees that the member doesn't mutate the struct instance. Because an `init` accessor assigns to instance state, it inherently mutates the struct and can't be marked `readonly`. To make the `get` accessor `readonly`, apply the `readonly` modifier to the `get` accessor only.

For more information, see init keyword and Object and Collection Initializers.

## Property initializers

- **CS8050**: *Only auto-implemented properties, or properties that use the 'field' keyword, can have initializers.*
- **CS8051**: *Auto-implemented properties must have get accessors.*
- **CS8053**: *Instance properties in interfaces cannot have initializers.*

To correct property initializer errors, apply one of the following changes based on the specific diagnostic:

- Convert the property to use auto-implemented syntax by removing the accessor bodies and letting the compiler generate the backing field (**CS8050**). This correction is needed because only properties with compiler-managed storage can have initializers, ensuring the initialization occurs before any accessor logic executes. Alternatively, modify the accessor implementations to use the `field` keyword to access the compiler-synthesized backing field. This approach enables the initializer while maintaining custom accessor logic. If neither approach is suitable, remove the initializer and assign the value in a constructor instead, where you have full control over the initialization sequence.
- Add a `get` accessor to the auto-implemented property to enable reading the initialized value (**CS8051**). This correction is required because initializers set a value that must be retrievable, and a write-only property violates this fundamental expectation of property initialization. If you truly need a write-only property, implement the accessors explicitly with a backing field and assign the field directly in a constructor rather than using a property initializer.
- Remove the initializer from interface property declarations (**CS8053**). This correction is necessary because interfaces define contracts for implementing types rather than providing concrete implementations with initial values. If you need to provide default values, implement the property in a class that implements the interface, or use default interface methods (available in C# 8.0 and later) to supply a default implementation.

For more information, see Properties, Auto-Implemented Properties, and field keyword.
