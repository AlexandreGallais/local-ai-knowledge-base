---
title: "MethodHandles class (java.lang.invoke) (part 1 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke)

```java
public final class MethodHandles
```

This class consists exclusively of static methods that operate on or return
method handles. They fall into several categories:

- Lookup methods which help create method handles for methods and fields.

- Combinator methods, which combine or transform pre-existing method handles into new ones.

- Other factory methods to create method handles that emulate other common JVM operations or control flow patterns.

A lookup, combinator, or factory method will fail and throw an
`IllegalArgumentException` if the created method handle's type
would have too many parameters.

**Since:** 1.7

## MethodHandles.lookup()

```java
public static Lookup lookup()
```

Returns a lookup object with
full capabilities to emulate all supported bytecode behaviors of the caller.
These capabilities include full privilege access to the caller.
Factory methods on the lookup object can create
direct method handles
for any member that the caller has access to via bytecodes,
including protected and private fields and methods.
This lookup object is created by the original lookup class
and has the ORIGINAL bit set.
This lookup object is a *capability* which may be delegated to trusted agents.
Do not store it in place where untrusted code can access it.

This method is caller sensitive, which means that it may return different
values to different callers.
In cases where `MethodHandles.lookup` is called from a context where
there is no caller frame on the stack (e.g. when called directly
from a JNI attached thread), `IllegalCallerException` is thrown.
To obtain a lookup object in such a context, use an auxiliary class that will
implicitly be identified as the caller, or use `MethodHandles.publicLookup()`
to obtain a low-privileged lookup instead.

**Returns:** a lookup object for the caller of this method, with
original and
full privilege access.

Throws:

- `IllegalCallerException`: if there is no caller frame on the stack.

## MethodHandles.publicLookup()

```java
public static Lookup publicLookup()
```

Returns a lookup object which is trusted minimally.
The lookup has the `UNCONDITIONAL` mode.
It can only be used to create method handles to public members of
public classes in packages that are exported unconditionally.

As a matter of pure convention, the lookup class
of this lookup object will be `java.lang.Object`.

**API note:** The use of Object is conventional, and because the lookup modes are
limited, there is no special access provided to the internals of Object, its package
or its module.  This public lookup object or other lookup object with
`UNCONDITIONAL` mode assumes readability. Consequently, the lookup class
is not used to determine the lookup context.

*Discussion:*
The lookup class can be changed to any other class `C` using an expression of the form
publicLookup().in(C.class).
Also, it cannot access
caller sensitive methods.

**Returns:** a lookup object which is trusted minimally

## MethodHandles.privateLookupIn(Class<?>, Lookup)

```java
public static Lookup privateLookupIn(Class<?> targetClass, Lookup caller) throws IllegalAccessException
```

Returns a lookup object on a target class to emulate all supported
bytecode behaviors, including private access.
The returned lookup object can provide access to classes in modules and packages,
and members of those classes, outside the normal rules of Java access control,
instead conforming to the more permissive rules for modular *deep reflection*.

A caller, specified as a `Lookup` object, in module `M1` is
allowed to do deep reflection on module `M2` and package of the target class
if and only if all of the following conditions are `true`:

- The caller lookup object must have full privilege access.  Specifically:

- The caller lookup object must have the MODULE lookup mode.
        (This is because otherwise there would be no way to ensure the original lookup
        creator was a member of any particular module, and so any subsequent checks
        for readability and qualified exports would become ineffective.)

- The caller lookup object must have PRIVATE access.
        (This is because an application intending to share intra-module access
        using MODULE alone will inadvertently also share
        deep reflection to its own module.)

- The target class must be a proper class, not a primitive or array class.
(Thus, `M2` is well-defined.)

- If the caller module `M1` differs from
the target module `M2` then both of the following must be true:

- `M1` reads `M2`.

- `M2` opens the package
        containing the target class to at least `M1`.

If any of the above checks is violated, this method fails with an
exception.

Otherwise, if `M1` and `M2` are the same module, this method
returns a `Lookup` on `targetClass` with
full privilege access
with `null` previous lookup class.

Otherwise, `M1` and `M2` are two different modules.  This method
returns a `Lookup` on `targetClass` that records
the lookup class of the caller as the new previous lookup class with
`PRIVATE` access but no `MODULE` access.

The resulting `Lookup` object has no `ORIGINAL` access.

Parameters:

- `targetClass`: the target class
- `caller`: the caller lookup object

**API note:** The `Lookup` object returned by this method is allowed to
define classes in the runtime package
of `targetClass`. Extreme caution should be taken when opening a package
to another module as such defined classes have the same full privilege
access as other members in `targetClass`'s module.

**Returns:** a lookup object for the target class, with private access

**Since:** 9

**See also:** Lookup#dropLookupMode

**See also:** Cross-module lookups

Throws:

- `IllegalArgumentException`: if `targetClass` is a primitive type or void or array class
- `NullPointerException`: if `targetClass` or `caller` is `null`
- `IllegalAccessException`: if any of the other access checks specified above fails

## MethodHandles.classData(Lookup, String, Class<T>)

```java
public static <T> T classData(Lookup caller, String name, Class<T> type) throws IllegalAccessException
```

Returns the *class data* associated with the lookup class
of the given `caller` lookup object, or `null`.

 A hidden class with class data can be created by calling
Object, boolean, Lookup.ClassOption...) Lookup::defineHiddenClassWithClassData.
This method will cause the static class initializer of the lookup
class of the given `caller` lookup object be executed if
it has not been initialized.

 A hidden class created by boolean, Lookup.ClassOption...) Lookup::defineHiddenClass and non-hidden classes have no class data.
`null` is returned if this method is called on the lookup object
on these classes.

 The lookup modes for this lookup
must have original access
in order to retrieve the class data.

Parameters:

- `<T>`: the type to cast the class data object to
- `caller`: the lookup context describing the class performing the operation (normally stacked by the JVM)
- `name`: must be `ConstantDescs.DEFAULT_NAME` (`"_"`)
- `type`: the type of the class data

**API note:** This method can be called as a bootstrap method for a dynamically computed
constant.  A framework can create a hidden class with class data, for
example that can be `Class` or `MethodHandle` object.
The class data is accessible only to the lookup object
created by the original caller but inaccessible to other members
in the same nest.  If a framework passes security sensitive objects
to a hidden class via class data, it is recommended to load the value
of class data as a dynamically computed constant instead of storing
the class data in private static field(s) which are accessible to
other nestmates.

**Returns:** the value of the class data if present in the lookup class;
otherwise `null`

**See also:** Lookup#defineHiddenClassWithClassData(byte[], Object, boolean, Lookup.ClassOption...)

**See also:** MethodHandles#classDataAt(Lookup, String, Class, int)

**Since:** 16

**jvms:** 5.5 Initialization

Throws:

- `IllegalArgumentException`: if name is not `"_"`
- `IllegalAccessException`: if the lookup context does not have original access
- `ClassCastException`: if the class data cannot be converted to the given `type`
- `NullPointerException`: if `caller` or `type` argument is `null`

## MethodHandles.classDataAt(Lookup, String, Class<T>, int)

```java
public static <T> T classDataAt(Lookup caller, String name, Class<T> type, int index) throws IllegalAccessException
```

Returns the element at the specified index in the
String, Class) class data,
if the class data associated with the lookup class
of the given `caller` lookup object is a `List`.
If the class data is not present in this lookup class, this method
returns `null`.

 A hidden class with class data can be created by calling
Object, boolean, Lookup.ClassOption...) Lookup::defineHiddenClassWithClassData.
This method will cause the static class initializer of the lookup
class of the given `caller` lookup object be executed if
it has not been initialized.

 A hidden class created by boolean, Lookup.ClassOption...) Lookup::defineHiddenClass and non-hidden classes have no class data.
`null` is returned if this method is called on the lookup object
on these classes.

 The lookup modes for this lookup
must have original access
in order to retrieve the class data.

Parameters:

- `<T>`: the type to cast the result object to
- `caller`: the lookup context describing the class performing the operation (normally stacked by the JVM)
- `name`: must be `java.lang.constant.ConstantDescs.DEFAULT_NAME` (`"_"`)
- `type`: the type of the element at the given index in the class data
- `index`: index of the element in the class data

**API note:** This method can be called as a bootstrap method for a dynamically computed
constant.  A framework can create a hidden class with class data, for
example that can be `List.of(o1, o2, o3....)` containing more than
one object and use this method to load one element at a specific index.
The class data is accessible only to the lookup object
created by the original caller but inaccessible to other members
in the same nest.  If a framework passes security sensitive objects
to a hidden class via class data, it is recommended to load the value
of class data as a dynamically computed constant instead of storing
the class data in private static field(s) which are accessible to other
nestmates.

**Returns:** the element at the given index in the class data
if the class data is present; otherwise `null`

**Since:** 16

**See also:** #classData(Lookup, String, Class)

**See also:** Lookup#defineHiddenClassWithClassData(byte[], Object, boolean, Lookup.ClassOption...)

Throws:

- `IllegalArgumentException`: if name is not `"_"`
- `IllegalAccessException`: if the lookup context does not have original access
- `ClassCastException`: if the class data cannot be converted to `List` or the element at the specified index cannot be converted to the given type
- `IndexOutOfBoundsException`: if the index is out of range
- `NullPointerException`: if `caller` or `type` argument is `null`; or if unboxing operation fails because the element at the given index is `null`

## MethodHandles.reflectAs(Class<T>, MethodHandle)

```java
public static <T extends Member> T reflectAs(Class<T> expected, MethodHandle target)
```

Performs an unchecked "crack" of a
direct method handle.
The result is as if the user had obtained a lookup object capable enough
to crack the target method handle, called
Lookup.revealDirect
on the target to obtain its symbolic reference, and then called
MethodHandleInfo.reflectAs
to resolve the symbolic reference to a member.

Parameters:

- `<T>`: the desired type of the result, either `Member` or a subtype
- `expected`: a class object representing the desired result type `T`
- `target`: a direct method handle to crack into symbolic reference components

**Returns:** a reference to the method, constructor, or field object

**Since:** 1.8

Throws:

- `NullPointerException`: if either argument is `null`
- `IllegalArgumentException`: if the target is not a direct method handle
- `ClassCastException`: if the member is not of the expected type

## MethodHandles.PUBLIC

```java
public static final int PUBLIC
```

A single-bit mask representing `public` access,
 which may contribute to the result of lookupModes.
 The value, `0x01`, happens to be the same as the value of the
 `public` modifier bit.

 A `Lookup` with this lookup mode performs cross-module access check
 with respect to the lookup class and
 previous lookup class if present.

## MethodHandles.PRIVATE

```java
public static final int PRIVATE
```

A single-bit mask representing `private` access,
 which may contribute to the result of lookupModes.
 The value, `0x02`, happens to be the same as the value of the
 `private` modifier bit.

## MethodHandles.PROTECTED

```java
public static final int PROTECTED
```

A single-bit mask representing `protected` access,
 which may contribute to the result of lookupModes.
 The value, `0x04`, happens to be the same as the value of the
 `protected` modifier bit.

## MethodHandles.PACKAGE

```java
public static final int PACKAGE
```

A single-bit mask representing `package` access (default access),
 which may contribute to the result of lookupModes.
 The value is `0x08`, which does not correspond meaningfully to
 any particular modifier bit.

## MethodHandles.MODULE

```java
public static final int MODULE
```

A single-bit mask representing `module` access,
 which may contribute to the result of lookupModes.
 The value is `0x10`, which does not correspond meaningfully to
 any particular modifier bit.
 In conjunction with the `PUBLIC` modifier bit, a `Lookup`
 with this lookup mode can access all public types in the module of the
 lookup class and public types in packages exported by other modules
 to the module of the lookup class.

 If this lookup mode is set, the previous lookup class is always `null`.

**Since:** 9

## MethodHandles.UNCONDITIONAL

```java
public static final int UNCONDITIONAL
```

A single-bit mask representing `unconditional` access
 which may contribute to the result of lookupModes.
 The value is `0x20`, which does not correspond meaningfully to
 any particular modifier bit.
 A `Lookup` with this lookup mode assumes readability.
 This lookup mode can access all public members of public types
 of all modules when the type is in a package that is exported unconditionally.

 If this lookup mode is set, the previous lookup class is always `null`.

**Since:** 9

**See also:** #publicLookup()
