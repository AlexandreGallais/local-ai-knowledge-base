---
title: "Resolve errors related to constructor declarations and module initializers (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/constructor-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors related to constructor declarations and module initializers (part 2 of 2)

## Records and copy constructors

- **CS8867**: *No accessible copy constructor found in base type.*
- **CS8868**: *A copy constructor in a record must call a copy constructor of the base, or a parameterless object constructor if the record inherits from object.*
- **CS8878**: *A copy constructor must be public or protected because the record is not sealed.*
- **CS8910**: *The primary constructor conflicts with the synthesized copy constructor.*

In a derived record type, your explicit copy constructor must call the base type's copy constructor by using the `: this()` initializer. If the record directly inherits from `System.Object`, it can call the parameterless object constructor instead (**CS8868**).

Records include a compiler-synthesized copy constructor. You can write an explicit copy constructor, but it must meet specific requirements. The compiler generates errors when record copy constructors violate these requirements:

- The base type must have an accessible copy constructor. All `record` types have a copy constructor. Ensure the base type is a `record`, or add an accessible copy constructor to it (**CS8867**).
- In a derived record type, your explicit copy constructor must call the base type's copy constructor by using the `: base()` initializer. If the record directly inherits from `System.Object`, it can call the parameterless object constructor instead (**CS8868**).
- Copy constructors must be `public` or `protected` unless the record type is `sealed`. Add the appropriate access modifier to the copy constructor (**CS8878**).
- If your explicit copy constructor has the same signature as the synthesized copy constructor, the definitions conflict. Remove your explicit copy constructor or modify its signature (**CS8910**).

## Module initializer declarations

- **CS8813**: *A module initializer must be an ordinary member method.*
- **CS8814**: *Module initializer method 'method' must be accessible at the module level.*
- **CS8815**: *Module initializer method 'method' must be static, and non-virtual, must have no parameters, and must return 'void'.*
- **CS8816**: *Module initializer method 'method' must not be generic and must not be contained in a generic type.*
- **CS8900**: *Module initializer cannot be attributed with 'UnmanagedCallersOnly'.*
- **CS8901**: *'method' is attributed with 'UnmanagedCallersOnly' and cannot be called directly. Obtain a function pointer to this method.*
- **CS8902**: *'method' is attributed with 'UnmanagedCallersOnly' and cannot be converted to a delegate type. Obtain a function pointer to this method.*

These errors enforce the requirements for methods marked with `System.Runtime.CompilerServices.ModuleInitializerAttribute`. Module initializers run automatically when an assembly is first loaded, before any other code in the module executes. For the full rules, see Module initializers.

To correct these errors, apply one of the following changes based on the specific diagnostic:

- Ensure the method marked with `[ModuleInitializer]` is an ordinary method, not a property accessor, event accessor, local function, lambda, constructor, destructor, or operator (**CS8813**). The compiler can only treat an ordinary method declaration as a valid target for module initializer infrastructure.
- Make the module initializer method and all its containing types `internal` or `public` so the method is accessible outside the top-level type (**CS8814**). The runtime needs to call the method from generated module-level code, which requires accessibility at the module level.
- Declare the module initializer method as `static`, non-virtual, with no parameters, and with a `void` return type (**CS8815**). The runtime calls module initializers without any arguments and discards the result, so the method signature must match these constraints exactly.
- Remove generic type parameters from the module initializer method and move the method out of any generic containing type (**CS8816**). The runtime can't determine which type arguments to supply when invoking the initializer, so generic methods and methods in generic types aren't permitted.
- Remove the `System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute` from the module initializer method (**CS8900**). Module initializers are called by managed runtime infrastructure, so they can't be restricted to unmanaged callers only.
- Obtain a function pointer instead of calling a method marked with `[UnmanagedCallersOnly]` directly (**CS8901**). Methods attributed with `System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute` can't be called from managed code. Use the `&` operator to get a function pointer (`delegate* unmanaged<...>`) in an `unsafe` context, and pass the pointer to unmanaged code. If your project doesn't already allow unsafe code, enable `AllowUnsafeBlocks`.
- Obtain a function pointer instead of converting a method marked with `[UnmanagedCallersOnly]` to a delegate type (**CS8902**). Methods attributed with `System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute` can't be represented as managed delegates because the calling convention is incompatible. Use function pointers (`delegate* unmanaged<...>`) in an `unsafe` context instead. If your project doesn't already allow unsafe code, enable `AllowUnsafeBlocks`.

For more information, see `System.Runtime.CompilerServices.ModuleInitializerAttribute` and `System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute`.

## Primary constructor declaration

Primary constructors declare parameters directly in the type declaration. The compiler synthesizes a field to store a primary constructor parameter when you use it in members or field initializers.

### Constructor chaining

- **CS8861**: *Unexpected argument list.*
- **CS8862**: *A constructor declared in a type with parameter list must have 'this' constructor initializer.*
- **CS9122**: *Unexpected parameter list.*
- **CS9343**: *Cannot pass arguments to the base type without a parameter list on the type declaration.*

When a type has a primary constructor, all other explicitly declared constructors must chain to it by using `: this(...)`.

To fix these errors, try the following suggestions:

- Add a `: this(...)` initializer that passes appropriate arguments to the primary constructor, because all explicitly declared constructors must chain to the primary constructor (**CS8862**).
- Remove an argument list from an implemented interface or from the base-type list of a struct or interface. Only a class declaration with a parameter list can pass arguments to a base class in the base-type list (**CS8861**).
- Add a parameter list to the derived type declaration before passing arguments to the base class, for example `class Derived(int value) : Base(value) { }` (**CS9343**). The base class must have a matching constructor, but it doesn't need a primary constructor.
- Remove a primary constructor parameter list from an `interface` declaration, because interfaces can't have primary constructors (**CS9122**).

### Parameter usage in base constructor calls

- **CS9105**: *Cannot use primary constructor parameter in this context.*
- **CS9106**: *Identifier is ambiguous between type and parameter in this context.*

You can only use primary constructor parameters in the base constructor call if you pass them as part of the primary constructor declaration.

To fix these errors, try the following suggestions:

- Move the parameter usage to the type declaration's base clause instead of using it in an explicitly declared constructor's `: base()` call, because primary constructor parameters can only appear in the base clause of the type declaration (**CS9105**).
- Rename either the type or the parameter when a type and a primary constructor parameter share the same name, because the reference becomes ambiguous (**CS9106**).

### Ref-like type parameters

- **CS9108**: *Cannot use parameter that has ref-like type inside an anonymous method, lambda expression, query expression, or local function.*
- **CS9109**: *Cannot use `ref`, `out`, or `in` primary constructor parameter inside an instance member.*
- **CS9110**: *Cannot use primary constructor parameter that has ref-like type inside an instance member.*
- **CS9136**: *Cannot use primary constructor parameter of type inside an instance member.*

To address these errors:

- Primary constructor parameters of `ref struct` type have restrictions on where you can use them. Move the parameter access out of lambda expressions, query expressions, or local functions (**CS9108**). In types that aren't `ref struct`, access `ref struct` parameters only in field initializers or the constructor body, not in instance members (**CS9110**, **CS9136**).
- For `ref struct` types, you can't use primary constructor parameters with `in`, `ref`, or `out` modifiers in instance methods or property accessors. Copy the parameter value to a field in the constructor and use that field in instance members instead (**CS9109**).

### Struct type restrictions

- **CS9111**: *Anonymous methods, lambda expressions, query expressions, and local functions inside an instance member of a struct cannot access primary constructor parameter.*
- **CS9112**: *Anonymous methods, lambda expressions, query expressions, and local functions inside a struct cannot access primary constructor parameter also used inside an instance member.*
- **CS9120**: *Cannot return primary constructor parameter by reference.*
- **CS9121**: *Struct primary constructor parameter of type causes a cycle in the struct layout.*

To address these errors:

- In struct types, you can't capture primary constructor parameters in lambda expressions, query expressions, or local functions inside instance members. Copy the parameter to a local variable or field before using it in these contexts (**CS9111**, **CS9112**).
- You can't return primary constructor parameters by reference in struct types. Store the value in a field and return that field by reference if needed (**CS9120**).
- Ensure that a primary constructor parameter's type doesn't create a cycle in the struct layout. A struct can't contain a field of its own type either directly or indirectly (**CS9121**).

### Readonly struct restrictions

- **CS9114**: *A primary constructor parameter of a readonly type cannot be assigned to (except in init-only setter of the type or a variable initializer).*
- **CS9115**: *A primary constructor parameter of a readonly type cannot be returned by writable reference.*
- **CS9116**: *A primary constructor parameter of a readonly type cannot be used as a `ref` or `out` value (except in init-only setter of the type or a variable initializer).*
- **CS9117**: *Members of primary constructor parameter of a readonly type cannot be modified (except in init-only setter of the type or a variable initializer).*
- **CS9118**: *Members of primary constructor parameter of a readonly type cannot be returned by writable reference.*
- **CS9119**: *Members of primary constructor parameter of a readonly type cannot be used as a `ref` or `out` value (except in init-only setter of the type or a variable initializer).*

To address these errors:

- In `readonly struct` types, you can't modify primary constructor parameters and their members outside of init-only setters or variable initializers. Move assignments to field initializers or init-only property setters (**CS9114**, **CS9117**).
- You can't return primary constructor parameters and their members by writable reference in `readonly struct` types. Return by `readonly ref` or by value instead (**CS9115**, **CS9118**).
- You can't pass primary constructor parameters and their members as `ref` or `out` arguments in `readonly struct` types. Pass them by value or as `in` arguments instead (**CS9116**, **CS9119**).

### Warnings for captured and shadowed parameters

- **CS9107**: *Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.*
- **CS9113**: *Parameter is unread.*
- **CS9124**: *Parameter is captured into the state of the enclosing type and its value is also used to initialize a field, property, or event.*
- **CS9179**: *Primary constructor parameter is shadowed by a member from base.*

The following warnings indicate potential problems with how you store or access primary constructor parameters:

- You might store a parameter twice if you both pass it to the base constructor and access it in the derived type. You might have one copy in the base class and another in the derived class. Consider whether you need both copies, or restructure your code to avoid the duplication (**CS9107**).
- You don't need a primary constructor parameter if you never read it. Remove unused parameters from the primary constructor declaration (**CS9113**).
- You might store a parameter twice if you both capture it in the enclosing type and use it to initialize a field, property, or event. Consider using the captured parameter directly instead of initializing a separate member (**CS9124**).
- A base type member shadows a primary constructor parameter when both have the same name. Rename the parameter to avoid confusion (**CS9179**).
