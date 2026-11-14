---
title: "ModuleDescriptor class (java.lang.module) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/module/ModuleDescriptor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleDescriptor class (java.lang.module)

```java
public final class ModuleDescriptor implements Comparable<ModuleDescriptor>
```

A module descriptor.

 A module descriptor describes a named module and defines methods to
obtain each of its components. The module descriptor for a named module
in the Java virtual machine is obtained by invoking the Module's getDescriptor method. Module descriptors can also be created using the
`ModuleDescriptor.Builder` class or by reading the binary form of a
module declaration (`module-info.class`) using the read methods defined here.

 A module descriptor describes a *normal*, open, or automatic
module. *Normal* modules and open modules describe their dependences, exported-packages, the services
that they use or provide, and other
components. *Normal* modules may open specific
packages. The module descriptor for an open module does not declare any
open packages (its `opens` method returns an empty set) but when
instantiated in the Java virtual machine then it is treated as if all
packages are open. The module descriptor for an automatic module does not
declare any dependences (except for the mandatory dependency on `java.base`), and does not declare any exported or open packages. Automatic
modules receive special treatment during resolution so that they read all
other modules in the configuration. When an automatic module is instantiated
in the Java virtual machine then it reads every unnamed module and is
treated as if all packages are exported and open.

 `ModuleDescriptor` objects are immutable and safe for use by
multiple concurrent threads.

**See also:** java.lang.Module

**Since:** 9

## ModuleDescriptor.modifiers()

```java
public Set<Modifier> modifiers()
```

Returns the set of modifiers.

**Returns:** A possibly-empty unmodifiable set of modifiers

## ModuleDescriptor.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

Returns the set of the module requires flags.

**Returns:** A possibly-empty unmodifiable set of requires flags

**See also:** #modifiers()

**jvms:** 4.7.25 The Module Attribute

**Since:** 20

## ModuleDescriptor.name()

```java
public String name()
```

Return the module name.

**Returns:** The module name

## ModuleDescriptor.compiledVersion()

```java
public Optional<Version> compiledVersion()
```

Returns the version of the module if recorded at compile-time.

**Returns:** The version of the module if recorded at compile-time,
        or an empty `Optional` if no version was recorded or
        the version string recorded is unparseable

## ModuleDescriptor.rawCompiledVersion()

```java
public Optional<String> rawCompiledVersion()
```

Returns the string with the possibly-unparseable version of the module
if recorded at compile-time.

**Returns:** The string containing the version of the module if recorded
        at compile-time, or an empty `Optional` if no version
        was recorded

**See also:** #compiledVersion()

## ModuleDescriptor.compareTo(Requires)

```java
public int compareTo(Requires that)
```

Compares this module dependence to another.

 Two `Requires` objects are compared by comparing their
module names lexicographically. Where the module names are equal
then the sets of modifiers are compared in the same way that
module modifiers are compared (see ModuleDescriptor.compareTo). Where the module names are equal and
the set of modifiers are equal then the version of the modules
recorded at compile-time are compared. When comparing the versions
recorded at compile-time then a dependence that has a recorded
version is considered to succeed a dependence that does not have a
recorded version. If both recorded versions are unparseable then the raw version strings are compared
lexicographically.

Parameters:

- `that`: The module dependence to compare

**Returns:** A negative integer, zero, or a positive integer if this module
        dependence is less than, equal to, or greater than the given
        module dependence

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this module dependence for equality with the given object.

 If the given object is not a `Requires` then this method
returns `false`. Two module dependence objects are equal if
the module names are equal, set of modifiers are equal, and the
compiled version of both modules is equal or not recorded for
both modules.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `ob`: the object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is a module
         dependence that is equal to this module dependence

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this module dependence.

 The hash code is based upon the module name, modifiers, and the
module version if recorded at compile time. It satisfies the general
contract of the Object.hashCode method.

**Returns:** The hash-code value for this module dependence

## ModuleDescriptor.toString()

```java
public String toString()
```

Returns a string describing this module dependence.

**Returns:** A string describing this module dependence

## ModuleDescriptor.modifiers()

```java
public Set<Modifier> modifiers()
```

Returns the set of modifiers.

**Returns:** A possibly-empty unmodifiable set of modifiers

## ModuleDescriptor.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

Returns the set of the module export flags for this module descriptor.

**Returns:** A possibly-empty unmodifiable set of export flags

**See also:** #modifiers()

**jvms:** 4.7.25 The Module Attribute

**Since:** 20

## ModuleDescriptor.isQualified()

```java
public boolean isQualified()
```

Returns `true` if this is a qualified export.

**Returns:** `true` if this is a qualified export

## ModuleDescriptor.source()

```java
public String source()
```

Returns the package name.

**Returns:** The package name

## ModuleDescriptor.targets()

```java
public Set<String> targets()
```

For a qualified export, returns the non-empty and immutable set
of the module names to which the package is exported. For an
unqualified export, returns an empty set.

**Returns:** The set of target module names or for an unqualified
        export, an empty set

## ModuleDescriptor.compareTo(Exports)

```java
public int compareTo(Exports that)
```

Compares this module export to another.

 Two `Exports` objects are compared by comparing the package
names lexicographically. Where the packages names are equal then the
sets of modifiers are compared in the same way that module modifiers
are compared (see ModuleDescriptor.compareTo). Where the package names are equal and
the set of modifiers are equal then the set of target modules are
compared. This is done by sorting the names of the target modules
in ascending order, and according to their natural ordering, and then
comparing the corresponding elements lexicographically. Where the
sets differ in size, and the larger set contains all elements of the
smaller set, then the larger set is considered to succeed the smaller
set.

Parameters:

- `that`: The module export to compare

**Returns:** A negative integer, zero, or a positive integer if this module
        export is less than, equal to, or greater than the given
        export dependence

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this module export.

 The hash code is based upon the modifiers, the package name,
and for a qualified export, the set of modules names to which the
package is exported. It satisfies the general contract of the
Object.hashCode method.

**Returns:** The hash-code value for this module export

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this module export for equality with the given object.

 If the given object is not an `Exports` then this method
returns `false`. Two module exports objects are equal if their
set of modifiers is equal, the package names are equal and the set
of target module names is equal.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `ob`: the object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is a module
         dependence that is equal to this module dependence

## ModuleDescriptor.toString()

```java
public String toString()
```

Returns a string describing the exported package.

**Returns:** A string describing the exported package

## ModuleDescriptor.modifiers()

```java
public Set<Modifier> modifiers()
```

Returns the set of modifiers.

**Returns:** A possibly-empty unmodifiable set of modifiers

## ModuleDescriptor.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

Returns the set of the module opens flags.

**Returns:** A possibly-empty unmodifiable set of opens flags

**See also:** #modifiers()

**jvms:** 4.7.25 The Module Attribute

**Since:** 20

## ModuleDescriptor.isQualified()

```java
public boolean isQualified()
```

Returns `true` if this is a qualified `Opens`.

**Returns:** `true` if this is a qualified `Opens`

## ModuleDescriptor.source()

```java
public String source()
```

Returns the package name.

**Returns:** The package name

## ModuleDescriptor.targets()

```java
public Set<String> targets()
```

For a qualified `Opens`, returns the non-empty and immutable set
of the module names to which the package is open. For an
unqualified `Opens`, returns an empty set.

**Returns:** The set of target module names or for an unqualified
        `Opens`, an empty set

## ModuleDescriptor.compareTo(Opens)

```java
public int compareTo(Opens that)
```

Compares this module `Opens` to another.

 Two `Opens` objects are compared by comparing the package
names lexicographically. Where the packages names are equal then the
sets of modifiers are compared in the same way that module modifiers
are compared (see ModuleDescriptor.compareTo). Where the package names are equal and
the set of modifiers are equal then the set of target modules are
compared. This is done by sorting the names of the target modules
in ascending order, and according to their natural ordering, and then
comparing the corresponding elements lexicographically. Where the
sets differ in size, and the larger set contains all elements of the
smaller set, then the larger set is considered to succeed the smaller
set.

Parameters:

- `that`: The module `Opens` to compare

**Returns:** A negative integer, zero, or a positive integer if this module
        `Opens` is less than, equal to, or greater than the given
        module `Opens`

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this module `Opens`.

 The hash code is based upon the modifiers, the package name,
and for a qualified `Opens`, the set of modules names to which the
package is opened. It satisfies the general contract of the
Object.hashCode method.

**Returns:** The hash-code value for this module `Opens`

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this module `Opens` for equality with the given object.

 If the given object is not an `Opens` then this method
returns `false`. Two `Opens` objects are equal if their
set of modifiers is equal, the package names are equal and the set
of target module names is equal.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `ob`: the object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is a module
         dependence that is equal to this module dependence

## ModuleDescriptor.toString()

```java
public String toString()
```

Returns a string describing the open package.

**Returns:** A string describing the open package

## ModuleDescriptor.service()

```java
public String service()
```

## ModuleDescriptor.providers()

```java
public List<String> providers()
```

Returns the list of the binary names
of the providers or provider factories.

**Returns:** A non-empty and unmodifiable list of the binary names of the providers or provider factories

## ModuleDescriptor.compareTo(Provides)

```java
public int compareTo(Provides that)
```

Compares this `Provides` to another.

 Two `Provides` objects are compared by comparing the
binary name
of the service type lexicographically. Where the
class names are equal then the list of the provider class names are
compared by comparing the corresponding elements of both lists
lexicographically and in sequence. Where the lists differ in size,
`N` is the size of the shorter list, and the first `N`
corresponding elements are equal, then the longer list is considered
to succeed the shorter list.

Parameters:

- `that`: The `Provides` to compare

**Returns:** A negative integer, zero, or a positive integer if this
        `Provides` is less than, equal to, or greater than
        the given `Provides`

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this `Provides`.

 The hash code is based upon the service type and the set of
providers. It satisfies the general contract of the Object.hashCode method.

**Returns:** The hash-code value for this module provides

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this `Provides` for equality with the given object.

 If the given object is not a `Provides` then this method
returns `false`. Two `Provides` objects are equal if the
service type is equal and the list of providers is equal.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `ob`: the object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is a
         `Provides` that is equal to this `Provides`

## ModuleDescriptor.toString()

```java
public String toString()
```

Returns a string describing this `Provides`.

**Returns:** A string describing this `Provides`

## ModuleDescriptor.parse(String)

```java
public static Version parse(String v)
```

Parses the given string as a version string.

Parameters:

- `v`: The string to parse

**Returns:** The resulting `Version`

Throws:

- `IllegalArgumentException`: If `v` is `null`, an empty string, or cannot be parsed as a version string

## ModuleDescriptor.compareTo(Version)

```java
public int compareTo(Version that)
```

Compares this module version to another module version. Module
versions are compared as described in the class description.

Parameters:

- `that`: The module version to compare

**Returns:** A negative integer, zero, or a positive integer as this
        module version is less than, equal to, or greater than the
        given module version
