---
title: "ModuleDescriptor class (java.lang.module) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/module/ModuleDescriptor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleDescriptor class (java.lang.module) (part 3 of 3)

## ModuleDescriptor.version(String)

```java
public Builder version(String vs)
```

Sets the module version.

Parameters:

- `vs`: The version string to parse

**Returns:** This builder

**See also:** Version#parse(String)

Throws:

- `IllegalArgumentException`: If `vs` is `null` or cannot be parsed as a version string

## ModuleDescriptor.mainClass(String)

```java
public Builder mainClass(String mc)
```

Sets the module main class. The package for the main class is added
to the module if not already added. In other words, this method is
equivalent to first invoking this builder's packages method to add the package name of the main class.

Parameters:

- `mc`: The module main class

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If `mainClass` is `null` or not a qualified name of a class in a named package

## ModuleDescriptor.build()

```java
public ModuleDescriptor build()
```

Builds and returns a `ModuleDescriptor` from its components.

 The module will require "`java.base`" even if the dependence
has not been declared (the exception is when building a module named
"`java.base`" as it cannot require itself). The dependence on
"`java.base`" will have the MANDATED
modifier if the dependence was not declared.

**Returns:** The module descriptor

## ModuleDescriptor.compareTo(ModuleDescriptor)

```java
public int compareTo(ModuleDescriptor that)
```

Compares this module descriptor to another.

 Two `ModuleDescriptor` objects are compared by comparing their
module names lexicographically. Where the module names are equal then the
module versions are compared. When comparing the module versions then a
module descriptor with a version is considered to succeed a module
descriptor that does not have a version. If both versions are unparseable then the raw version strings are compared lexicographically. Where the module names
are equal and the versions are equal (or not present in both), then the
set of modifiers are compared. Sets of modifiers are compared by comparing
a *binary value* computed for each set. If a modifier is present
in the set then the bit at the position of its ordinal is `1`
in the binary value, otherwise `0`. If the two set of modifiers
are also equal then the other components of the module descriptors are
compared in a manner that is consistent with `equals`.

Parameters:

- `that`: The module descriptor to compare

**Returns:** A negative integer, zero, or a positive integer if this module
        descriptor is less than, equal to, or greater than the given
        module descriptor

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this module descriptor for equality with the given object.

 If the given object is not a `ModuleDescriptor` then this
method returns `false`. Two module descriptors are equal if each
of their corresponding components is equal.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `ob`: the object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is a module
         descriptor that is equal to this module descriptor

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this module descriptor.

 The hash code is based upon the components of the module descriptor,
and satisfies the general contract of the Object.hashCode method.

**Returns:** The hash-code value for this module descriptor

## ModuleDescriptor.toString()

```java
public String toString()
```

Returns a string describing the module.

**Returns:** A string describing the module

## ModuleDescriptor.newModule(String, Set<Modifier>)

```java
public static Builder newModule(String name, Set<Modifier> ms)
```

Instantiates a builder to build a module descriptor.

Parameters:

- `name`: The module name
- `ms`: The set of module modifiers

**Returns:** A new builder

Throws:

- `IllegalArgumentException`: If the module name is `null` or is not a legal module name, or the set of modifiers contains AUTOMATIC with other modifiers

## ModuleDescriptor.newModule(String)

```java
public static Builder newModule(String name)
```

Instantiates a builder to build a module descriptor for a *normal*
module. This method is equivalent to invoking newModule with an empty set of modifiers.

Parameters:

- `name`: The module name

**Returns:** A new builder

Throws:

- `IllegalArgumentException`: If the module name is `null` or is not a legal module name

## ModuleDescriptor.newOpenModule(String)

```java
public static Builder newOpenModule(String name)
```

Instantiates a builder to build a module descriptor for an open module.
This method is equivalent to invoking newModule with the OPEN modifier.

 The builder for an open module cannot be used to declare any open
packages.

Parameters:

- `name`: The module name

**Returns:** A new builder that builds an open module

Throws:

- `IllegalArgumentException`: If the module name is `null` or is not a legal module name

## ModuleDescriptor.newAutomaticModule(String)

```java
public static Builder newAutomaticModule(String name)
```

Instantiates a builder to build a module descriptor for an automatic
module. This method is equivalent to invoking newModule with the AUTOMATIC
modifier.

 The builder for an automatic module cannot be used to declare module
or service dependences. It also cannot be used to declare any exported
or open packages.

Parameters:

- `name`: The module name

**Returns:** A new builder that builds an automatic module

**See also:** ModuleFinder#of(Path[])

Throws:

- `IllegalArgumentException`: If the module name is `null` or is not a legal module name

## ModuleDescriptor.read(InputStream, Supplier<Set<String>>)

```java
public static ModuleDescriptor read(InputStream in, Supplier<Set<String>> packageFinder) throws IOException
```

Reads the binary form of a module declaration from an input stream
as a module descriptor.

 If the descriptor encoded in the input stream does not indicate a
set of packages in the module then the `packageFinder` will be
invoked. The set of packages that the `packageFinder` returns
must include all the packages that the module exports, opens, as well
as the packages of the service implementations that the module provides,
and the package of the main class (if the module has a main class). If
the `packageFinder` throws an `UncheckedIOException` then
`IOException` cause will be re-thrown.

 If there are bytes following the module descriptor then it is
implementation specific as to whether those bytes are read, ignored,
or reported as an `InvalidModuleDescriptorException`. If this
method fails with an `InvalidModuleDescriptorException` or `IOException` then it may do so after some, but not all, bytes have
been read from the input stream. It is strongly recommended that the
stream be promptly closed and discarded if an exception occurs.

Parameters:

- `in`: The input stream
- `packageFinder`: A supplier that can produce the set of packages

**API note:** The `packageFinder` parameter is for use when reading
module descriptors from legacy module-artifact formats that do not
record the set of packages in the descriptor itself.

**Returns:** The module descriptor

Throws:

- `InvalidModuleDescriptorException`: If an invalid module descriptor is detected or the set of packages returned by the `packageFinder` does not include all of the packages obtained from the module descriptor
- `IOException`: If an I/O error occurs reading from the input stream or `UncheckedIOException` is thrown by the package finder

## ModuleDescriptor.read(InputStream)

```java
public static ModuleDescriptor read(InputStream in) throws IOException
```

Reads the binary form of a module declaration from an input stream as a
module descriptor. This method works exactly as specified by the 2-arg
read method with the exception that
a package finder is not used to find additional packages when the
module descriptor read from the stream does not indicate the set of
packages.

Parameters:

- `in`: The input stream

**Returns:** The module descriptor

Throws:

- `InvalidModuleDescriptorException`: If an invalid module descriptor is detected
- `IOException`: If an I/O error occurs reading from the input stream

## ModuleDescriptor.read(ByteBuffer, Supplier<Set<String>>)

```java
public static ModuleDescriptor read(ByteBuffer bb, Supplier<Set<String>> packageFinder)
```

Reads the binary form of a module declaration from a byte buffer
as a module descriptor.

 If the descriptor encoded in the byte buffer does not indicate a
set of packages in the module then the `packageFinder` will be
invoked. The set of packages that the `packageFinder` returns
must include all the packages that the module exports, opens, as well
as the packages of the service implementations that the module provides,
and the package of the main class (if the module has a main class). If
the `packageFinder` throws an `UncheckedIOException` then
`IOException` cause will be re-thrown.

 The module descriptor is read from the buffer starting at index
`p`, where `p` is the buffer's position when this method is invoked. Upon return the buffer's position
will be equal to `p + n` where `n` is the number of bytes
read from the buffer.

 If there are bytes following the module descriptor then it is
implementation specific as to whether those bytes are read, ignored,
or reported as an `InvalidModuleDescriptorException`. If this
method fails with an `InvalidModuleDescriptorException` then it
may do so after some, but not all, bytes have been read.

Parameters:

- `bb`: The byte buffer
- `packageFinder`: A supplier that can produce the set of packages

**API note:** The `packageFinder` parameter is for use when reading
module descriptors from legacy module-artifact formats that do not
record the set of packages in the descriptor itself.

**Returns:** The module descriptor

Throws:

- `InvalidModuleDescriptorException`: If an invalid module descriptor is detected or the set of packages returned by the `packageFinder` does not include all of the packages obtained from the module descriptor

## ModuleDescriptor.read(ByteBuffer)

```java
public static ModuleDescriptor read(ByteBuffer bb)
```

Reads the binary form of a module declaration from a byte buffer as a
module descriptor. This method works exactly as specified by the 2-arg
read method with the exception that a
package finder is not used to find additional packages when the module
descriptor encoded in the buffer does not indicate the set of packages.

Parameters:

- `bb`: The byte buffer

**Returns:** The module descriptor

Throws:

- `InvalidModuleDescriptorException`: If an invalid module descriptor is detected
