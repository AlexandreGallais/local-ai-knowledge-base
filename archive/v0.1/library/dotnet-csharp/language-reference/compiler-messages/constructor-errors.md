---
title: "Resolve errors related to constructor declarations and module initializers (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/constructor-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings for constructor declarations and module initializers

This article covers the following compiler errors:

- **CS0132**: *'constructor': a static constructor must be parameterless.*
- **CS0514**: *static constructor cannot have an explicit 'this' or 'base' constructor call.*
- **CS0515**: *access modifiers are not allowed on static constructors.*
- **CS0516**: *Constructor 'constructor' cannot call itself.*
- **CS0517**: *'class' has no base class and cannot call a base constructor.*
- **CS0522**: *structs cannot call base class constructors.*
- **CS0526**: *Interfaces cannot contain instance constructors.*
- **CS0568**: *Structs cannot contain explicit parameterless constructors.*
- **CS0573**: *'field declaration': cannot have instance field initializers in structs.*
- **CS0710**: *Static classes cannot have instance constructors.*
- **CS0768**: *Constructor cannot call itself through another constructor.*
- **CS1018**: *Keyword 'this' or 'base' expected.*
- **CS8054**: *Enums cannot contain explicit parameterless constructors.*
- **CS8091**: *cannot be extern and have a constructor initializer.*
- **CS8358**: *Cannot use attribute constructor because it has 'in' or 'ref readonly' parameters.*
- **CS8760**: *'event': extern event cannot have initializer.*
- **CS8813**: *A module initializer must be an ordinary member method*
- **CS8814**: *Module initializer method 'method' must be accessible at the module level*
- **CS8815**: *Module initializer method 'method' must be static, and non-virtual, must have no parameters, and must return 'void'*
- **CS8816**: *Module initializer method 'method' must not be generic and must not be contained in a generic type*
- **CS8861**: *Unexpected argument list.*
- **CS8862**: *A constructor declared in a type with parameter list must have 'this' constructor initializer.*
- **CS8867**: *No accessible copy constructor found in base type '{0}'.*
- **CS8868**: *A copy constructor in a record must call a copy constructor of the base, or a parameterless object constructor if the record inherits from object.*
- **CS8878**: *A copy constructor '{0}' must be public or protected because the record is not sealed.*
- **CS8900**: *Module initializer cannot be attributed with 'UnmanagedCallersOnly'.*
- **CS8901**: *'method' is attributed with 'UnmanagedCallersOnly' and cannot be called directly. Obtain a function pointer to this method.*
- **CS8902**: *'method' is attributed with 'UnmanagedCallersOnly' and cannot be converted to a delegate type. Obtain a function pointer to this method.*
- **CS8910**: *The primary constructor conflicts with the synthesized copy constructor.*
- **CS8958**: *The parameterless struct constructor must be 'public'.*
- **CS8982**: *A constructor declared in a 'struct' with parameter list must have a 'this' initializer that calls the primary constructor or an explicitly declared constructor.*
- **CS8983**: *A 'struct' with field initializers must include an explicitly declared constructor.*
- **CS9105**: *Cannot use primary constructor parameter in this context.*
- **CS9106**: *Identifier is ambiguous between type and parameter in this context.*
- **CS9108**: *Cannot use parameter that has ref-like type inside an anonymous method, lambda expression, query expression, or local function.*
- **CS9109**: *Cannot use `ref`, `out`, or `in` primary constructor parameter inside an instance member.*
- **CS9110**: *Cannot use primary constructor parameter that has ref-like type inside an instance member.*
- **CS9111**: *Anonymous methods, lambda expressions, query expressions, and local functions inside an instance member of a struct cannot access primary constructor parameter.*
- **CS9112**: *Anonymous methods, lambda expressions, query expressions, and local functions inside a struct cannot access primary constructor parameter also used inside an instance member.*
- **CS9114**: *A primary constructor parameter of a readonly type cannot be assigned to (except in init-only setter of the type or a variable initializer).*
- **CS9115**: *A primary constructor parameter of a readonly type cannot be returned by writable reference.*
- **CS9116**: *A primary constructor parameter of a readonly type cannot be used as a ref or out value (except in init-only setter of the type or a variable initializer).*
- **CS9117**: *Members of primary constructor parameter of a readonly type cannot be modified (except in init-only setter of the type or a variable initializer).*
- **CS9118**: *Members of primary constructor parameter of a readonly type cannot be returned by writable reference.*
- **CS9119**: *Members of primary constructor parameter of a readonly type cannot be used as a `ref` or `out` value (except in init-only setter of the type or a variable initializer).*
- **CS9120**: *Cannot return primary constructor parameter by reference.*
- **CS9121**: *Struct primary constructor parameter of type causes a cycle in the struct layout.*
- **CS9122**: *Unexpected parameter list.*
- **CS9136**: *Cannot use primary constructor parameter of type inside an instance member.*
- **CS9343**: *Cannot pass <example-value> to the base type without a parameter list on the type declaration.*

In addition, this article covers the following warnings:

- **CS0824**: *Constructor 'name' is marked external.*
- **CS9107**: *Parameter is captured into the state of the enclosing type and its value is also passed to the base constructor. The value might be captured by the base class as well.*
- **CS9113**: *Parameter is unread.*
- **CS9124**: *Parameter is captured into the state of the enclosing type and its value is also used to initialize a field, property, or event.*
- **CS9179**: *Primary constructor parameter is shadowed by a member from base*
- **CS9018**: *Auto-implemented property is read before being explicitly assigned, causing a preceding implicit assignment of 'default'.*
- **CS9019**: *Field is read before being explicitly assigned, causing a preceding implicit assignment of 'default'.*
- **CS9020**: *The 'this' object is read before all of its fields are assigned, causing preceding implicit assignments of 'default' to non-explicitly assigned fields.*
- **CS9021**: *Control is returned to caller before auto-implemented property is explicitly assigned, causing a preceding implicit assignment of 'default'.*
- **CS9022**: *Control is returned to caller before field is explicitly assigned, causing a preceding implicit assignment of 'default'.*

## Static constructors

- **CS0132**: *'constructor': a static constructor must be parameterless.*
- **CS0514**: *Static constructor cannot have an explicit 'this' or 'base' constructor call.*
- **CS0515**: *Access modifiers are not allowed on static constructors.*

Static constructors initialize static data for a type. For more information, see Static constructors.

To correct these errors, ensure your static constructor declaration follows these rules:

- Remove any parameters from the static constructor declaration, because a static constructor must be parameterless (**CS0132**). If you need to pass <example-value> values, consider using static fields or properties that you set before the static constructor runs.
- Remove any access modifiers such as `public`, `protected`, `private`, or `internal` from the static constructor, because the runtime controls when the static constructor executes and access modifiers aren't meaningful (**CS0515**).
- Remove any `: base()` or `: this()` constructor initializer calls from the static constructor, because static constructors can't chain to other constructors (**CS0514**). The runtime automatically invokes the base class static constructor if one exists.

## Constructor declaration

- **CS0526**: *Interfaces cannot contain instance constructors.*
- **CS0710**: *Static classes cannot have instance constructors.*
- **CS8054**: *Enums cannot contain explicit parameterless constructors.*
- **CS8358**: *Cannot use attribute constructor because it has 'in' or 'ref readonly' parameters.*
- **CS8091**: *A constructor cannot be extern and have a constructor initializer.*
- **CS8760**: *'event': extern event cannot have initializer.*

You can declare constructors only in `class` and `struct` types, including `record class` and `record struct` types. For more information, see Instance constructors.

To fix these errors, try the following suggestions:

- Move the constructor to a `class` or `struct` type, because you can't declare constructors in `interface` or `enum` types (**CS0526**, **CS8054**). Interfaces define contracts but don't provide initialization logic, and enum types have their values defined at compile time.
- Remove instance constructors from static classes, because static classes can't be instantiated and therefore can't have instance constructors (**CS0710**). If you need initialization logic, use a static constructor instead.
- Change `in` or `ref readonly` parameters to pass-by-value parameters in attribute constructors, because attribute constructors don't support `in` or `ref readonly` parameter modifiers (**CS8358**). The runtime instantiates attributes by using reflection, which doesn't support the `in` or `ref readonly` modifier.
- Remove the `: base()` or `: this()` constructor initializer from an `extern` constructor, because extern constructors can't chain to other constructors (**CS8091**). The implementation of an extern constructor is provided externally, so constructor chaining isn't possible.
- Remove the initializer from an `extern` event declaration (**CS8760**). Extern events have their add and remove accessors provided by external code, so a field initializer in the source has no effect and isn't permitted by the compiler.

The following warning can be generated for constructor declarations:

- **CS0824**: *Constructor is marked external.*

When a constructor is marked `extern`, the compiler can't verify that an implementation exists. To suppress this warning, either provide a non-extern implementation or ensure the external implementation is correctly linked.

## Constructors in struct types

- **CS0568**: *Structs cannot contain explicit parameterless constructors.*
- **CS0573**: *'field declaration': cannot have instance field initializers in structs.*
- **CS8958**: *The parameterless struct constructor must be 'public'.*
- **CS8982**: *A constructor declared in a 'struct' with parameter list must have a 'this' initializer that calls the primary constructor or an explicitly declared constructor.*
- **CS8983**: *A 'struct' with field initializers must include an explicitly declared constructor.*

Struct types have specific rules for constructors and field initialization. For more information, see the Struct initialization and default values section of the Structure types article.

To fix these errors, try the following suggestions:

- Upgrade to C# 10 or later if you encounter **CS0568** or **CS0573**, because these errors occur only in older versions of C#. Modern C# allows explicit parameterless constructors and field initializers in structs.
- Add the `public` access modifier to any parameterless struct constructor, because parameterless struct constructors must be public to ensure the `default` expression and array allocation can properly initialize struct instances (**CS8958**).
- Add a `: this(...)` initializer to explicitly declared constructors in a struct that has a primary constructor, because all non-parameterless constructors must chain to the primary constructor or another explicitly declared constructor to ensure consistent initialization (**CS8982**).
- Declare an explicit constructor when your struct uses field initializers, because the compiler requires an explicit constructor to ensure field initializers are invoked (**CS8983**). This constructor can be a parameterless constructor with an empty body.

The following warnings indicate that a field or property isn't explicitly assigned before being read or before control returns to the caller:

- **CS9018**: *Auto-implemented property is read before being explicitly assigned, causing a preceding implicit assignment of 'default'.*
- **CS9019**: *Field is read before being explicitly assigned, causing a preceding implicit assignment of 'default'.*
- **CS9020**: *The 'this' object is read before all of its fields are assigned, causing preceding implicit assignments of 'default' to non-explicitly assigned fields.*
- **CS9021**: *Control is returned to caller before auto-implemented property is explicitly assigned, causing a preceding implicit assignment of 'default'.*
- **CS9022**: *Control is returned to caller before field is explicitly assigned, causing a preceding implicit assignment of 'default'.*

To silence these warnings, explicitly assign all fields and auto-implemented properties before reading them or before control returns from the constructor (**CS9018**, **CS9019**, **CS9020**, **CS9021**, **CS9022**). When unassigned members are read, the compiler implicitly assigns `default` to them, which might not be the intended behavior.

## Constructor calls with `base` and `this`

- **CS0516**: *Constructor cannot call itself.*
- **CS0517**: *'class' has no base class and cannot call a base constructor.*
- **CS0522**: *Structs cannot call base class constructors.*
- **CS0768**: *Constructor cannot call itself through another constructor.*
- **CS1018**: *Keyword 'this' or 'base' expected.*

By using constructor initializers, one constructor can call another constructor by using `: this()` or `: base()`. For more information, see Using constructors.

To fix these errors, try the following suggestions:

- Break any circular constructor call chains, because a constructor can't call itself either directly or indirectly through another constructor (**CS0516**, **CS0768**). Make sure that constructor chaining eventually ends at a constructor that doesn't call another constructor in the same type.
- Remove the `: base()` initializer from constructors in struct types or from constructors in `System.Object`, because these types don't have a base class constructor to call (**CS0517**, **CS0522**). Struct types implicitly inherit from `System.ValueType`, but you can't explicitly call its constructor.
- Complete the constructor initializer or remove the colon (`:`) from the constructor declaration, because when a colon follows a constructor signature, the compiler expects either `this()` or `base()` (**CS1018**). Either add the appropriate constructor call or remove the colon entirely if no chaining is intended.
