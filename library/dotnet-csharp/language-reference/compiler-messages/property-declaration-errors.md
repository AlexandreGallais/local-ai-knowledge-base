---
title: "Compiler Errors on property declarations (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/property-declaration-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Errors and warnings related to property declarations

You can encounter the following errors related to property declarations:

- **CS0200**: *Property or indexer 'property' cannot be assigned to -- it is read only*
- **CS0273**: *The accessibility modifier of the 'accessor' accessor must be more restrictive than the property or indexer 'property'*
- **CS0274**: *Cannot specify accessibility modifiers for both accessors of the property or indexer 'property'*
- **CS0275**: *'accessor': accessibility modifiers may not be used on accessors in an interface*
- **CS0276**: *'property': accessibility modifiers on accessors may only be used if the property or indexer has both a get and a set accessor*
- **CS0442**: *'property': abstract properties cannot have private accessors*
- **CS0544**: *'property': cannot override because 'member' is not a property*
- **CS0545**: *'function' : cannot override because 'property' does not have an overridable get accessor*
- **CS0546**: *'accessor': cannot override because 'property' does not have an overridable set accessor*
- **CS0547**: *'property': property or indexer cannot have void type*
- **CS0548**: *'property': property or indexer must have at least one accessor*
- **CS0571**: *'function' : cannot explicitly call operator or accessor*
- **CS0610**: *Field or property cannot be of type 'type'*
- **CS0840**: *'Property name' must declare a body because it is not marked abstract or extern. Automatically implemented properties must define both get and set accessors.*
- **CS1014**: *A get or set accessor expected*
- **CS1043**: *{ or ; expected*
- **CS1715**: *'type': type must be 'type' to match overridden member 'member'*
- **CS8050**: *Only auto-implemented properties, or properties that use the 'field' keyword, can have initializers.*
- **CS8051**: *Auto-implemented properties must have get accessors.*
- **CS8053**: *Instance properties in interfaces cannot have initializers.*
- **CS8080**: *Auto-implemented properties must override all accessors of the overridden property.*
- **CS8145**: *Auto-implemented properties cannot return by reference*
- **CS8147**: *Properties which return by reference cannot have set accessors*
- **CS8341**: *Auto-implemented instance properties in readonly structs must be readonly.*
- **CS8657**: *Static member 'member' cannot be marked 'readonly'.*
- **CS8658**: *Auto-implemented 'set' accessor 'accessor' cannot be marked 'readonly'.*
- **CS8659**: *Auto-implemented property 'property' cannot be marked 'readonly' because it has a 'set' accessor.*
- **CS8660**: *Cannot specify 'readonly' modifiers on both property or indexer 'property' and its accessor. Remove one of them.*
- **CS8661**: *Cannot specify 'readonly' modifiers on both accessors of property or indexer 'property'. Instead, put a 'readonly' modifier on the property itself.*
- **CS8664**: *'property': 'readonly' can only be used on accessors if the property or indexer has both a get and a set accessor*
- **CS8852**: *Init-only property or indexer 'property' can only be assigned in an object initializer, or on 'this' or 'base' in an instance constructor or an 'init' accessor.*
- **CS8853**: *'member' must match by init-only of overridden member 'member'*
- **CS8855**: *Accessors 'accessor' and 'accessor' should both be init-only or neither*
- **CS8856**: *The 'init' accessor is not valid on static members*
- **CS8903**: *'init' accessors cannot be marked 'readonly'. Mark 'property' readonly instead.*
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
- **CS9258**: *In this language version, the '`field`' keyword binds to a synthesized backing field for the property. To avoid generating a synthesized backing field, and to refer to the existing member, use '`this.field`' or '`@field`' instead.*
- **CS9263**: *A partial property cannot have an initializer on both the definition and implementation.*

The following warnings can be generated for field-backed properties:

- **CS9264**: *Non-nullable property 'property' must contain a non-null value when exiting constructor. Consider adding the 'required' modifier, or declaring the property as nullable, or safely handling the case where '`field`' is null in the '`get`' accessor.*
- **CS9266**: *The 'accessor' accessor of property 'property' should use '`field`' because the other accessor is using it.*
- **CS9273**: *In this language version, '`field`' is a keyword within a property accessor. Rename the variable or use the identifier '`@field`' instead.*

The following sections explain the cause and fixes for these errors and warnings.

## Accessor accessibility

- **CS0273**: *The accessibility modifier of the 'accessor' accessor must be more restrictive than the property or indexer 'property'*
- **CS0274**: *Cannot specify accessibility modifiers for both accessors of the property or indexer 'property'*
- **CS0275**: *'accessor': accessibility modifiers may not be used on accessors in an interface*
- **CS0276**: *'property': accessibility modifiers on accessors may only be used if the property or indexer has both a get and a set accessor*
- **CS0442**: *'property': abstract properties cannot have private accessors*

These errors enforce the rules for access modifiers on property and indexer accessors. For the full rules, see Restricting Accessor Accessibility and Accessors in the C# specification. To correct these errors, apply one of the following changes based on the specific diagnostic:

- Use an access modifier that's more restrictive than the property's declared accessibility (**CS0273**). For example, an `internal` property can have a `private` set accessor, but not a `public` one. The accessor's accessibility must be a proper subset of the property's accessibility.
- Apply an access modifier to only one of the two accessors (**CS0274**). The property declaration itself establishes the default accessibility for both accessors, and only one accessor can differ from that default. Place the access modifier on whichever accessor needs restricted access.
- Remove access modifiers from accessors in interface property declarations (**CS0275**). Interface members define a public contract, and access modifiers on individual accessors aren't permitted. If you need to restrict access, apply the restriction in the implementing class instead.
- Add both a `get` and a `set` accessor to the property before applying an access modifier to either one (**CS0276**). Access modifiers on accessors distinguish one accessor's visibility from the other, which requires both accessors to be present. If the property has only one accessor, remove the access modifier from it.
- Change the access modifier on abstract property accessors from `private` to a less restrictive modifier (**CS0442**). Abstract members must be accessible to derived classes so those classes can provide implementations. Use `protected`, `internal`, or `protected internal` instead of `private`.

For more information, see Restricting Accessor Accessibility and Properties.

## Property declaration syntax

- **CS0547**: *'property': property or indexer cannot have void type*
- **CS0548**: *'property': property or indexer must have at least one accessor*
- **CS0571**: *'function' : cannot explicitly call operator or accessor*
- **CS0610**: *Field or property cannot be of type 'type'*
- **CS0840**: *'Property name' must declare a body because it is not marked abstract or extern. Automatically implemented properties must define both get and set accessors.*
- **CS1014**: *A get or set accessor expected*
- **CS1043**: *{ or ; expected*

These errors enforce the structural requirements of property and indexer declarations. For the full rules, see Properties and the Properties section of the C# specification. To correct these errors, apply one of the following changes based on the specific diagnostic:

- Change the property type from `void` to a valid type (**CS0547**). Properties and indexers represent expressions, and `void` isn't a valid expression type. Choose the appropriate type for the data the property represents.
- Add at least one accessor (`get`, `set`, or `init`) to the property declaration (**CS0548**). A property without any accessors has no way to read or write its value. Include a `get` accessor, a `set` or `init` accessor, or both.
- Access properties using property syntax rather than calling accessor methods directly (**CS0571**). Property accessors compile to methods named `get_PropertyName` and `set_PropertyName`, but invoke these methods through property syntax (`obj.Property` and `obj.Property = value`). The same principle applies to operators. Use operator syntax (`++obj`) rather than calling methods like `op_Increment`.
- Change the field or property type from a restricted type to an allowed type (**CS0610**). Certain types like `System.TypedReference` and `System.ArgIterator` can't be used as fields or properties. These types can still be used as method parameters or local variables.
- For a read-only property, declare a `get`-only auto-implemented property. Otherwise, add both `get` and `set` accessors to auto-implemented property declarations, or provide explicit accessor bodies (**CS0840**). For a property that needs custom logic, use the `field` keyword, added in C# 13 to access the compiler-synthesized backing field in your accessor body. For `abstract` or `extern` properties, remove the accessor bodies because the implementation is provided elsewhere. For `partial` properties, split the declaration and implementation across partial type declarations.
- Ensure the property body contains only valid accessor keywords—`get`, `set`, or `init` (**CS1014**). Property bodies can't contain arbitrary statements or member declarations. Move fields and methods outside the property to the class or struct body.
- Use proper property accessor syntax with braces or expression bodies (**CS1043**). Accessor bodies must use curly braces `{ }`, expression-bodied accessors must use `=>` syntax, and auto-implemented properties must end with a semicolon after the accessor token.

For more information, see Properties, Auto-Implemented Properties, and Using Properties.

## Property overrides

- **CS0544**: *'property': cannot override because 'member' is not a property*
- **CS0545**: *'function' : cannot override because 'property' does not have an overridable get accessor*
- **CS0546**: *'accessor': cannot override because 'property' does not have an overridable set accessor*
- **CS1715**: *'type': type must be 'type' to match overridden member 'member'*
- **CS8080**: *Auto-implemented properties must override all accessors of the overridden property.*

These errors enforce the rules for overriding properties in derived classes. For the full rules, see Inheritance and the Virtual, sealed, override, and abstract accessors section of the C# specification. To correct these errors, apply one of the following changes based on the specific diagnostic:

- Ensure the member you're overriding is a property, not a field or method (**CS0544**). The `override` keyword on a property can only target a `virtual`, `abstract`, or `override` property in a base class. To shadow a non-property member with a property, use the `new` keyword instead of `override`.
- Override only the accessors that exist in the base class property declaration (**CS0545**, **CS0546**). You can't override a property accessor that isn't present or accessible in the base class because there's no virtual method to override. If the base class property has only a `get` accessor, you can't add a `set` accessor through an override. Either add the missing accessor to the base class and mark it `virtual`, or use `new` to hide the base class property with a new property definition.
- Match the type of the overriding property to the type of the overridden member (**CS1715**). Read-only (`get`-only) properties support covariant return types beginning with C# 9, so the override can return a more derived type. However, properties that have a `set` or `init` accessor require an exact type match because the setter accepts values of the declared type. If you need a different type on a property with a setter, change the property type in the derived class to match the base class declaration, or remove the setter and use a covariant return type instead.
- Include all accessors from the base property when overriding with an auto-implemented property (**CS8080**). Auto-implemented properties generate both storage and accessor implementations, so they must override all accessors present in the base class. If the base property has both `get` and `set`, the auto-implemented override must also have both. To override only specific accessors, implement the property with explicit accessor bodies and an explicit backing field instead of using auto-implementation. If the base class property has a `private` accessor, you can't override the property with an auto-implemented property. Use explicit accessor bodies instead.

For more information, see Inheritance, Properties, and Using Properties.
