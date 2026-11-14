# AccessFlag enum (java.lang.reflect)

```java
public enum AccessFlag
```

Represents a JVM access or module-related flag on a runtime member,
such as a {@linkplain Class class}, {@linkplain Field field}, or
{@linkplain Executable method}.

<P>JVM access and module-related flags are related to, but distinct
from Java language {@linkplain Modifier modifiers}. Some modifiers
and access flags have a one-to-one correspondence, such as {@code
public}. In other cases, some language-level modifiers do
<em>not</em> have an access flag, such as {@code sealed} (JVMS
{@jvms 4.7.31}) and some access flags have no corresponding
modifier, such as {@linkplain #SYNTHETIC synthetic}.

<p>The values for the constants representing the access and module
flags are taken from sections of <cite>The Java Virtual Machine
Specification</cite> including {@jvms 4.1} (class access and
property modifiers), {@jvms 4.5} (field access and property flags),
{@jvms 4.6} (method access and property flags), {@jvms 4.7.6}
(nested class access and property flags), {@jvms 4.7.24} (method
parameters), and {@jvms 4.7.25} (module flags and requires,
exports, and opens flags).

<p>The {@linkplain #mask() mask} values for the different access
flags are <em>not</em> distinct. Flags are defined for different
kinds of JVM structures and the same bit position has different
meanings in different contexts. For example, {@code 0x0000_0040}
indicates a {@link #VOLATILE volatile} field but a {@linkplain
#BRIDGE bridge method}; {@code 0x0000_0080} indicates a {@link
#TRANSIENT transient} field but a {@linkplain #VARARGS variable
arity (varargs)} method.

@implSpec
The access flag constants are ordered by non-decreasing mask
value; that is the mask value of a constant is greater than or
equal to the mask value of an immediate neighbor to its (syntactic)
left. If new constants are added, this property will be
maintained. That implies new constants will not necessarily be
added at the end of the existing list.

@apiNote
The JVM class file format has a {@linkplain ClassFileFormatVersion new version} defined for each new
{@linkplain Runtime.Version#feature() feature release}. A new class
file version may define new access flags or retire old ones. {@code
AccessFlag} is intended to model the set of access flags across
class file format versions. The range of versions an access flag is
recognized is not explicitly indicated in this API. See the current
<cite>The Java Virtual Machine Specification</cite> for
details. Unless otherwise indicated, access flags can be assumed to
be recognized in the {@linkplain Runtime#version() current
version}.

@see java.lang.reflect.Modifier
@see java.lang.module.ModuleDescriptor.Modifier
@see java.lang.module.ModuleDescriptor.Requires.Modifier
@see java.lang.module.ModuleDescriptor.Exports.Modifier
@see java.lang.module.ModuleDescriptor.Opens.Modifier
@see java.compiler/javax.lang.model.element.Modifier
@since 20

## AccessFlag.mask()

```java
public int mask()
```

{@return the corresponding mask for the access flag}  The mask has
exactly one bit set and is in the range of {@code char}.

## AccessFlag.sourceModifier()

```java
public boolean sourceModifier()
```

{@return whether or not this flag has a directly corresponding
modifier in the Java programming language}

## AccessFlag.locations()

```java
public Set<Location> locations()
```

{@return locations this flag can be applied to in the current class file
format version}
<p>
This method returns an empty set if this flag is not defined in
the current class file format version.

## AccessFlag.locations(ClassFileFormatVersion)

```java
public Set<Location> locations(ClassFileFormatVersion cffv)
```

{@return locations this flag can be applied to in the given class file
format version}
<p>
This method returns an empty set if this flag is not defined in
the given {@code cffv}.

@param cffv the class file format version to use
@throws NullPointerException if the parameter is {@code null}

## AccessFlag.maskToAccessFlags(int, Location)

```java
public static Set<AccessFlag> maskToAccessFlags(int mask, Location location)
```

{@return an unmodifiable set of access flags for the given mask value
appropriate for the location in the current class file format version}

@param mask bit mask of access flags
@param location context to interpret mask value
@throws IllegalArgumentException if the mask contains bit
positions not defined for the location in the current class file format
@throws NullPointerException if {@code location} is {@code null}

## AccessFlag.maskToAccessFlags(int, Location, ClassFileFormatVersion)

```java
public static Set<AccessFlag> maskToAccessFlags(int mask, Location location, ClassFileFormatVersion cffv)
```

{@return an unmodifiable set of access flags for the given mask value
appropriate for the location in the given class file format version}

@param mask bit mask of access flags
@param location context to interpret mask value
@param cffv the class file format to interpret mask value
@throws IllegalArgumentException if the mask contains bit
positions not defined for the location in the given class file format
@throws NullPointerException if {@code location} or {@code cffv} is {@code null}
@since 25

## AccessFlag.flagsMask()

```java
public int flagsMask()
```

{@return the union of masks of all access flags defined for
this location in the current class file format version}
<p>
This method returns {@code 0} if this location does not exist in
the current class file format version.

@since 25

## AccessFlag.flagsMask(ClassFileFormatVersion)

```java
public int flagsMask(ClassFileFormatVersion cffv)
```

{@return the union of masks of all access flags defined for
this location in the given class file format version}
<p>
This method returns {@code 0} if this location does not exist in
the given {@code cffv}.

@param cffv the class file format version
@throws NullPointerException if {@code cffv} is {@code null}
@since 25

## AccessFlag.flags()

```java
public Set<AccessFlag> flags()
```

{@return the set of access flags defined for this location in the
current class file format version}  The set is immutable.
<p>
This method returns an empty set if this location does not exist
in the current class file format version.

@since 25

## AccessFlag.flags(ClassFileFormatVersion)

```java
public Set<AccessFlag> flags(ClassFileFormatVersion cffv)
```

{@return the set of access flags defined for this location in the
given class file format version}  The set is immutable.
<p>
This method returns an empty set if this location does not exist
in the given {@code cffv}.

@param cffv the class file format version
@throws NullPointerException if {@code cffv} is {@code null}
@since 25