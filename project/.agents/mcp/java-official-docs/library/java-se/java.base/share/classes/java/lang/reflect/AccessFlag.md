---
title: "AccessFlag enum (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/AccessFlag.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AccessFlag enum (java.lang.reflect)

```java
public enum AccessFlag
```

Represents a JVM access or module-related flag on a runtime member,
such as a class, field, or
method.

JVM access and module-related flags are related to, but distinct
from Java language modifiers. Some modifiers
and access flags have a one-to-one correspondence, such as `public`. In other cases, some language-level modifiers do
*not* have an access flag, such as `sealed` (JVMS
) and some access flags have no corresponding
modifier, such as synthetic.

The values for the constants representing the access and module
flags are taken from sections of *The Java Virtual Machine
Specification* including  (class access and
property modifiers),  (field access and property flags),
 (method access and property flags),
(nested class access and property flags),  (method
parameters), and  (module flags and requires,
exports, and opens flags).

The mask values for the different access
flags are *not* distinct. Flags are defined for different
kinds of JVM structures and the same bit position has different
meanings in different contexts. For example, `0x0000_0040`
indicates a volatile field but a bridge method; `0x0000_0080` indicates a transient field but a variable arity (varargs) method.

**Implementation requirements:** The access flag constants are ordered by non-decreasing mask
value; that is the mask value of a constant is greater than or
equal to the mask value of an immediate neighbor to its (syntactic)
left. If new constants are added, this property will be
maintained. That implies new constants will not necessarily be
added at the end of the existing list.

**API note:** The JVM class file format has a new version defined for each new
feature release. A new class
file version may define new access flags or retire old ones. `AccessFlag` is intended to model the set of access flags across
class file format versions. The range of versions an access flag is
recognized is not explicitly indicated in this API. See the current
*The Java Virtual Machine Specification* for
details. Unless otherwise indicated, access flags can be assumed to
be recognized in the current version.

**See also:** java.lang.reflect.Modifier

**See also:** java.lang.module.ModuleDescriptor.Modifier

**See also:** java.lang.module.ModuleDescriptor.Requires.Modifier

**See also:** java.lang.module.ModuleDescriptor.Exports.Modifier

**See also:** java.lang.module.ModuleDescriptor.Opens.Modifier

**See also:** java.compiler/javax.lang.model.element.Modifier

**Since:** 20

## AccessFlag.mask()

```java
public int mask()
```

The mask has
exactly one bit set and is in the range of `char`.

## AccessFlag.sourceModifier()

```java
public boolean sourceModifier()
```

## AccessFlag.locations()

```java
public Set<Location> locations()
```

This method returns an empty set if this flag is not defined in
the current class file format version.

## AccessFlag.locations(ClassFileFormatVersion)

```java
public Set<Location> locations(ClassFileFormatVersion cffv)
```

This method returns an empty set if this flag is not defined in
the given `cffv`.

Parameters:

- `cffv`: the class file format version to use

Throws:

- `NullPointerException`: if the parameter is `null`

## AccessFlag.maskToAccessFlags(int, Location)

```java
public static Set<AccessFlag> maskToAccessFlags(int mask, Location location)
```

Parameters:

- `mask`: bit mask of access flags
- `location`: context to interpret mask value

Throws:

- `IllegalArgumentException`: if the mask contains bit positions not defined for the location in the current class file format
- `NullPointerException`: if `location` is `null`

## AccessFlag.maskToAccessFlags(int, Location, ClassFileFormatVersion)

```java
public static Set<AccessFlag> maskToAccessFlags(int mask, Location location, ClassFileFormatVersion cffv)
```

Parameters:

- `mask`: bit mask of access flags
- `location`: context to interpret mask value
- `cffv`: the class file format to interpret mask value

**Since:** 25

Throws:

- `IllegalArgumentException`: if the mask contains bit positions not defined for the location in the given class file format
- `NullPointerException`: if `location` or `cffv` is `null`

## AccessFlag.flagsMask()

```java
public int flagsMask()
```

This method returns `0` if this location does not exist in
the current class file format version.

**Since:** 25

## AccessFlag.flagsMask(ClassFileFormatVersion)

```java
public int flagsMask(ClassFileFormatVersion cffv)
```

This method returns `0` if this location does not exist in
the given `cffv`.

Parameters:

- `cffv`: the class file format version

**Since:** 25

Throws:

- `NullPointerException`: if `cffv` is `null`

## AccessFlag.flags()

```java
public Set<AccessFlag> flags()
```

The set is immutable.

This method returns an empty set if this location does not exist
in the current class file format version.

**Since:** 25

## AccessFlag.flags(ClassFileFormatVersion)

```java
public Set<AccessFlag> flags(ClassFileFormatVersion cffv)
```

The set is immutable.

This method returns an empty set if this location does not exist
in the given `cffv`.

Parameters:

- `cffv`: the class file format version

**Since:** 25

Throws:

- `NullPointerException`: if `cffv` is `null`
