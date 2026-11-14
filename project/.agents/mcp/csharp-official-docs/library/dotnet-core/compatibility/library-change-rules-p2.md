---
title: ".NET API changes that affect compatibility (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/library-change-rules.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET API changes that affect compatibility (part 2 of 3)

## Modifications to the public contract

Changes in this category modify the public surface area of a type. Most of the changes in this category are disallowed since they violate *backwards compatibility* (the ability of an application that was developed with a previous version of an API to execute without recompilation on a later version).

### Types

- ✔️ **ALLOWED: Removing an interface implementation from a type when the interface is already implemented by a base type**

- ❓ **REQUIRES JUDGMENT: Adding a new interface implementation to a type**

  This is an acceptable change because it does not adversely affect existing clients. Any changes to the type must work within the boundaries of acceptable changes defined here for the new implementation to remain acceptable. Extreme caution is necessary when adding interfaces that directly affect the ability of a designer or serializer to generate code or data that cannot be consumed down-level. An example is the `System.Runtime.Serialization.ISerializable` interface.

- ❓ **REQUIRES JUDGMENT: Introducing a new base class**

  A type can be introduced into a hierarchy between two existing types if it doesn't introduce any new abstract members or change the semantics or behavior of existing types. For example, in .NET Framework 2.0, the `System.Data.Common.DbConnection` class became a new base class for `System.Data.SqlClient.SqlConnection`, which had previously derived directly from `System.ComponentModel.Component`.

- ✔️ **ALLOWED: Moving a type from one assembly to another**

  The *old* assembly must be marked with the `System.Runtime.CompilerServices.TypeForwardedToAttribute` that points to the new assembly.

- ✔️ **ALLOWED: Changing a struct type to a `readonly struct` type**

  Changing a `readonly struct` type to a `struct` type is not allowed.

- ✔️ **ALLOWED: Adding the sealed or abstract keyword to a type when there are no *accessible* (public or protected) constructors**

- ✔️ **ALLOWED: Expanding the visibility of a type**

- ❌ **DISALLOWED: Changing the namespace or name of a type**

- ❌ **DISALLOWED: Renaming or removing a public type**

  This breaks all code that uses the renamed or removed type.

  > **Note:**
  > In rare cases, .NET may remove a public API. For more information, see API removal in .NET. For information about .NET's support policy, see .NET Support Policy.

- ❌ **DISALLOWED: Changing the underlying type of an enumeration**

   This is a compile-time and behavioral breaking change as well as a binary breaking change that can make attribute arguments unparsable.

- ❌ **DISALLOWED: Sealing a type that was previously unsealed**

- ❌ **DISALLOWED: Adding an interface to the set of base types of an interface**

   If an interface implements an interface that it previously did not implement, all types that implemented the original version of the interface are broken.

- ❓ **REQUIRES JUDGMENT: Removing a class from the set of base classes or an interface from the set of implemented interfaces**

  There is one exception to the rule for interface removal: you can add the implementation of an interface that derives from the removed interface. For example, you can remove `System.IDisposable` if the type or interface now implements `System.ComponentModel.IComponent`, which implements `System.IDisposable`.

- ❌ **DISALLOWED: Changing a `readonly struct` type to a struct type**

  The change of a `struct` type to a `readonly struct` type is allowed, however.

- ❌ **DISALLOWED: Changing a struct type to a `ref struct` type, and vice versa**

- ❌ **DISALLOWED: Reducing the visibility of a type**

   However, increasing the visibility of a type is allowed.

### Members

- ✔️ **ALLOWED: Expanding the visibility of a member that is not virtual**

- ✔️ **ALLOWED: Adding an abstract member to a public type that has no *accessible* (public or protected) constructors, or the type is sealed**

  However, adding an abstract member to a type that has accessible (public or protected) constructors and is not `sealed` is not allowed.

- ✔️ **ALLOWED: Restricting the visibility of a protected member when the type has no accessible (public or protected) constructors, or the type is sealed**

- ✔️ **ALLOWED: Moving a member into a class higher in the hierarchy than the type from which it was removed**

- ✔️ **ALLOWED: Adding or removing an override**

  Introducing an override might cause previous consumers to skip over the override when calling base.

- ✔️ **ALLOWED: Adding a constructor to a class, along with a parameterless constructor if the class previously had no constructors**

   However, adding a constructor to a class that previously had no constructors *without* adding the parameterless constructor is not allowed.

- ✔️ **ALLOWED: Changing a member from abstract to virtual**

- ✔️ **ALLOWED: Changing from a `ref readonly` to a `ref` return value (except for virtual methods or interfaces)**

- ✔️ **ALLOWED: Removing readonly from a field, unless the static type of the field is a mutable value type**

- ✔️ **ALLOWED: Calling a new event that wasn't previously defined**

- ❓ **REQUIRES JUDGMENT: Adding a new instance field to a type**

   This change impacts serialization.

- ❌ **DISALLOWED: Renaming or removing a public member or parameter**

   This breaks all code that uses the renamed or removed member, or parameter.

   This includes removing or renaming a getter or setter from a property, as well as renaming or removing enumeration members.

- ❓ **REQUIRES JUDGMENT: Adding a member to an interface**

  While it's a breaking change in the sense that it raises your minimum .NET version to .NET Core 3.0 (C# 8.0), which is when default interface members (DIMs) were introduced, adding a static, non-abstract, non-virtual member to an interface is allowed.

  If you provide an implementation, adding a new member to an existing interface won't necessarily result in compile failures in downstream assemblies. However, not all languages support DIMs. Also, in some scenarios, the runtime can't decide which default interface member to invoke. Beginning with C# 13, `ref struct` types can implement interfaces, but they can't be boxed or converted to an interface type. Therefore, a `ref struct` type must provide an explicit implementation for every instance interface member—it can't use the default implementation provided by the interface. Adding a default instance member to an interface that a `ref struct` implements requires the `ref struct` to add a corresponding implementation, which is a source breaking change. For these reasons, use judgment when adding a member to an existing interface.

  > **Note:**
  > If your interface is implemented by `ref struct` types (possible in C# 13 and later), adding any default instance member to the interface is a source breaking change for those callers. The `ref struct` must provide an explicit implementation of the new member; it can't fall back to the default implementation.

- ❌ **DISALLOWED: Changing the value of a public constant or enumeration member**

- ❌ **DISALLOWED: Changing the type of a property, field, parameter, or return value**

- ❌ **DISALLOWED: Adding, removing, or changing the order of parameters**

- ❌ **DISALLOWED: Adding or removing the in, out, or ref keyword from a parameter**

- ✔️ **ALLOWED: Changing a `ref` parameter to `ref readonly`**

  Changing a parameter from `ref` to `ref readonly` is source compatible for existing call sites that pass <example-value> with the `ref` modifier—those calls continue to compile without any change. Unlike changing `ref` to `in`, a `ref readonly` parameter doesn't silently allow callers to pass <example-value> (non-variables); the compiler issues a warning if the argument isn't a variable. Existing `ref` call sites remain valid.

- ❌ **DISALLOWED: Changing an `in` parameter to `ref readonly`**

  Call sites that pass `in` arguments without the `in` modifier (which the compiler allows for `in` parameters) will receive a warning when the parameter changes to `ref readonly`, because `ref readonly` requires the argument to be passed by reference. Callers that treat warnings as errors will experience a source breaking change.

- ❌ **DISALLOWED: Renaming a parameter (including changing its case)**

  This is considered breaking for two reasons:

  - It breaks late-bound scenarios such as the late binding feature in Visual Basic and dynamic in C#.

  - It breaks source compatibility when developers use named arguments.

- ❌ **DISALLOWED: Changing from a `ref` return value to a `ref readonly` return value**

- ❌️ **DISALLOWED: Changing from a `ref readonly` to a `ref` return value on a virtual method or interface**

- ❌ **DISALLOWED: Adding or removing abstract from a member**

- ❌ **DISALLOWED: Removing the virtual keyword from a member**

- ❌ **DISALLOWED: Adding the virtual keyword to a member**

  While this often is not a breaking change because the C# compiler tends to emit callvirt Intermediate Language (IL) instructions to call non-virtual methods (`callvirt` performs a null check, while a normal call doesn't), this behavior is not invariable for several reasons:

  - C# is not the only language that .NET targets.
  - The C# compiler increasingly tries to optimize `callvirt` to a normal call whenever the target method is non-virtual and is probably not null (such as a method accessed through the ?. null propagation operator).

  Making a method virtual means that the consumer code would often end up calling it non-virtually.

- ❌ **DISALLOWED: Making a virtual member abstract**

  A virtual member provides a method implementation that *can be* overridden by a derived class. An abstract member provides no implementation and *must be* overridden.

- ❌ **DISALLOWED: Adding the sealed keyword to an interface member**

  Adding `sealed` to a default interface member will make it non-virtual, preventing a derived type's implementation of that member from being called.

- ❌ **DISALLOWED: Adding an abstract member to a public type that has accessible (public or protected) constructors and that is not sealed**

- ❌ **DISALLOWED: Adding or removing the static keyword from a member**

- ❌ **DISALLOWED: Adding an overload that precludes an existing overload and defines a different behavior**

  This breaks existing clients that were bound to the previous overload. For example, if a class has a single version of a method that accepts a `System.UInt32`, an existing consumer will successfully bind to that overload when passing a `System.Int32` value. However, if you add an overload that accepts an `System.Int32`, when recompiling or using late-binding, the compiler now binds to the new overload. If different behavior results, this can be a breaking change.

- ❓ **REQUIRES JUDGMENT: Adding `System.Runtime.CompilerServices.OverloadResolutionPriorityAttribute` to an existing overload or changing its priority value**

  The `System.Runtime.CompilerServices.OverloadResolutionPriorityAttribute` affects overload resolution at the source level: callers that recompile might resolve to a different overload than before. The intended use is to add the attribute to a new, better overload so the compiler prefers it over existing ones. Adding it to an existing overload or changing the priority value on an already-attributed overload can be a source breaking change because callers that recompile might change behavior.

- ✔️ **ALLOWED: Adding the `allows ref struct` anti-constraint to a generic type parameter**

  Adding `allows ref struct` expands what types can be used as type arguments by permitting `ref struct` types. Existing callers using non-`ref struct` type arguments aren't affected. The generic method or type must follow ref safety rules for all instances of that type parameter.

- ❌ **DISALLOWED: Removing the `allows ref struct` anti-constraint from a generic type parameter**

  Removing `allows ref struct` restricts which types callers can use as type arguments. Any caller that passes a `ref struct` as a type argument will no longer compile.

- ❌ **DISALLOWED: Adding a constructor to a class that previously had no constructor without adding the parameterless constructor**

- ❌️ **DISALLOWED: Adding readonly to a field**

- ❌ **DISALLOWED: Reducing the visibility of a member**

   This includes reducing the visibility of a protected member when there are *accessible* (`public` or `protected`) constructors and the type is *not* sealed. If this is not the case, reducing the visibility of a protected member is allowed.

   Increasing the visibility of a member is allowed.

- ❌ **DISALLOWED: Changing the type of a member**

   The return value of a method or the type of a property or field cannot be modified. For example, the signature of a method that returns an `System.Object` cannot be changed to return a `System.String`, or vice versa.

- ❌ **DISALLOWED: Adding an instance field to a struct that has no nonpublic fields**

  If a struct has only public fields or has no fields at all, callers can declare locals of that struct type without calling the struct's constructor or first initializing the local to `default(T)`, so long as all public fields are set on the struct before first use. Adding any new fields - public or nonpublic - to such a struct is a source breaking change for these callers, as the compiler will now require the additional fields to be initialized.

  Additionally, adding any new fields - public or nonpublic - to a struct with no fields or only public fields is a binary breaking change to callers that have applied `[SkipLocalsInit]` to their code. Since the compiler wasn't aware of these fields at compile time, it could emit IL that doesn't fully initialize the struct, leading to the struct being created from uninitialized stack data.

  If a struct has any nonpublic fields, the compiler already enforces initialization via the constructor or `default(T)`, and adding new instance fields is not a breaking change.

- ❌ **DISALLOWED: Firing an existing event when it was never fired before**
