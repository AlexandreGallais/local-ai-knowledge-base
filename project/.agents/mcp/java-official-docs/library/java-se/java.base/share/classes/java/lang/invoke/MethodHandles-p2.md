---
title: "MethodHandles class (java.lang.invoke) (part 2 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 2 of 14)

## MethodHandles.ORIGINAL

```java
public static final int ORIGINAL
```

A single-bit mask representing `original` access
 which may contribute to the result of lookupModes.
 The value is `0x40`, which does not correspond meaningfully to
 any particular modifier bit.

 If this lookup mode is set, the `Lookup` object must be
 created by the original lookup class by calling
 `MethodHandles.lookup()` method or by a bootstrap method
 invoked by the VM.  The `Lookup` object with this lookup
 mode has full privilege access.

**Since:** 16

## MethodHandles.lookupClass()

```java
public Class<?> lookupClass()
```

Tells which class is performing the lookup.  It is this class against
 which checks are performed for visibility and access permissions.

 If this lookup object has a previous lookup class,
 access checks are performed against both the lookup class and the previous lookup class.

 The class implies a maximum level of access permission,
 but the permissions may be additionally limited by the bitmask
 lookupModes, which controls whether non-public members
 can be accessed.

**Returns:** the lookup class, on behalf of which this lookup object finds members

**See also:** Cross-module lookups

## MethodHandles.previousLookupClass()

```java
public Class<?> previousLookupClass()
```

Reports a lookup class in another module that this lookup object
was previously teleported from, or `null`.

A `Lookup` object produced by the factory methods, such as the
lookup() and publicLookup() method,
has `null` previous lookup class.
A `Lookup` object has a non-null previous lookup class
when this lookup was teleported from an old lookup class
in one module to a new lookup class in another module.

**Returns:** the lookup class in another module that this lookup object was
        previously teleported from, or `null`

**Since:** 14

**See also:** #in(Class)

**See also:** MethodHandles#privateLookupIn(Class, Lookup)

**See also:** Cross-module lookups

## MethodHandles.lookupModes()

```java
public int lookupModes()
```

Tells which access-protection classes of members this lookup object can produce.
 The result is a bit-mask of the bits
 PUBLIC (0x01),
 PRIVATE (0x02),
 PROTECTED (0x04),
 PACKAGE (0x08),
 MODULE (0x10),
 UNCONDITIONAL (0x20),
 and ORIGINAL (0x40).

 A freshly-created lookup object
 on the caller's class has
 all possible bits set, except `UNCONDITIONAL`.
 A lookup object on a new lookup class
 created from a previous lookup object
 may have some mode bits set to zero.
 Mode bits can also be
 directly cleared.
 Once cleared, mode bits cannot be restored from the downgraded lookup object.
 The purpose of this is to restrict access via the new lookup object,
 so that it can access only names which can be reached by the original
 lookup object, and also by the new lookup class.

**Returns:** the lookup modes, which limit the kinds of access performed by this lookup object

**See also:** #in

**See also:** #dropLookupMode

## MethodHandles.in(Class<?>)

```java
public Lookup in(Class<?> requestedLookupClass)
```

Creates a lookup on the specified new lookup class.
The resulting object will report the specified
class as its own lookupClass.

However, the resulting `Lookup` object is guaranteed
to have no more access capabilities than the original.
In particular, access capabilities can be lost as follows:

- If the new lookup class is different from the old lookup class,
i.e. ORIGINAL access is lost.

- If the new lookup class is in a different module from the old one,
i.e. MODULE access is lost.

- If the new lookup class is in a different package
than the old one, protected and default (package) members will not be accessible,
i.e. PROTECTED and PACKAGE access are lost.

- If the new lookup class is not within the same package member
as the old one, private members will not be accessible, and protected members
will not be accessible by virtue of inheritance,
i.e. PRIVATE access is lost.
(Protected members may continue to be accessible because of package sharing.)

- If the new lookup class is not
accessible to this lookup,
then no members, not even public members, will be accessible
i.e. all access modes are lost.

- If the new lookup class, the old lookup class and the previous lookup class
are all in different modules i.e. teleporting to a third module,
all access modes are lost.

The new previous lookup class is chosen as follows:

- If the new lookup object has UNCONDITIONAL bit,
the new previous lookup class is `null`.

- If the new lookup class is in the same module as the old lookup class,
the new previous lookup class is the old previous lookup class.

- If the new lookup class is in a different module from the old lookup class,
the new previous lookup class is the old lookup class.

The resulting lookup's capabilities for loading classes
(used during `findClass` invocations)
are determined by the lookup class' loader,
which may change due to this operation.

Parameters:

- `requestedLookupClass`: the desired lookup class for the new lookup object

**Returns:** a lookup object which reports the desired lookup class, or the same object
if there is no change

**See also:** #accessClass(Class)

**See also:** Cross-module lookups

Throws:

- `IllegalArgumentException`: if `requestedLookupClass` is a primitive type or void or array class
- `NullPointerException`: if the argument is null

## MethodHandles.dropLookupMode(int)

```java
public Lookup dropLookupMode(int modeToDrop)
```

Creates a lookup on the same lookup class which this lookup object
finds members, but with a lookup mode that has lost the given lookup mode.
The lookup mode to drop is one of PUBLIC, MODULE, PACKAGE, PROTECTED,
PRIVATE, ORIGINAL, or
UNCONDITIONAL.

 If this lookup is a public lookup,
this lookup has `UNCONDITIONAL` mode set and it has no other mode set.
When dropping `UNCONDITIONAL` on a public lookup then the resulting
lookup has no access.

 If this lookup is not a public lookup, then the following applies
regardless of its lookup modes.
PROTECTED and ORIGINAL are always
dropped and so the resulting lookup mode will never have these access
capabilities. When dropping `PACKAGE`
then the resulting lookup will not have `PACKAGE` or `PRIVATE`
access. When dropping `MODULE` then the resulting lookup will not
have `MODULE`, `PACKAGE`, or `PRIVATE` access.
When dropping `PUBLIC` then the resulting lookup has no access.

Parameters:

- `modeToDrop`: the lookup mode to drop

**API note:** A lookup with `PACKAGE` but not `PRIVATE` mode can safely
delegate non-public access within the package of the lookup class without
conferring  private access.
A lookup with `MODULE` but not
`PACKAGE` mode can safely delegate `PUBLIC` access within
the module of the lookup class without conferring package access.
A lookup with a previous lookup class
(and `PUBLIC` but not `MODULE` mode) can safely delegate access
to public classes accessible to both the module of the lookup class
and the module of the previous lookup class.

**Returns:** a lookup object which lacks the indicated mode, or the same object if there is no change

**See also:** MethodHandles#privateLookupIn

**Since:** 9

Throws:

- `IllegalArgumentException`: if `modeToDrop` is not one of `PUBLIC`, `MODULE`, `PACKAGE`, `PROTECTED`, `PRIVATE`, `ORIGINAL` or `UNCONDITIONAL`

## MethodHandles.defineClass(byte[])

```java
public Class<?> defineClass(byte[] bytes) throws IllegalAccessException
```

Creates and links a class or interface from `bytes`
with the same class loader and in the same runtime package and
protection domain as this lookup's
lookup class as if calling
ClassLoader::defineClass.

 The lookup modes for this lookup must include
PACKAGE access as default (package) members will be
accessible to the class. The `PACKAGE` lookup mode serves to authenticate
that the lookup object was created by a caller in the runtime package (or derived
from a lookup originally created by suitably privileged code to a target class in
the runtime package).

 The `bytes` parameter is the class bytes of a valid class file (as defined
by the *The Java Virtual Machine Specification*) with a class name in the
same package as the lookup class.

 This method does not run the class initializer. The class initializer may
run at a later time, as detailed in section 12.4 of the *The Java Language
Specification*.

Parameters:

- `bytes`: the class bytes

**Returns:** the `Class` object for the class

**Since:** 9

**See also:** MethodHandles#privateLookupIn

**See also:** Lookup#dropLookupMode

**See also:** ClassLoader#defineClass(String,byte[],int,int,ProtectionDomain)

Throws:

- `IllegalAccessException`: if this lookup does not have `PACKAGE` access
- `ClassFormatError`: if `bytes` is not a `ClassFile` structure
- `IllegalArgumentException`: if `bytes` denotes a class in a different package than the lookup class or `bytes` is not a class or interface (`ACC_MODULE` flag is set in the value of the `access_flags` item)
- `VerifyError`: if the newly created class cannot be verified
- `LinkageError`: if the newly created class cannot be linked for any other reason
- `NullPointerException`: if `bytes` is `null`
