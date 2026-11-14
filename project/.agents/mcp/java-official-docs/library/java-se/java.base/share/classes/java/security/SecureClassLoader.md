---
title: "SecureClassLoader class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/SecureClassLoader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SecureClassLoader class (java.security)

```java
public class SecureClassLoader extends ClassLoader
```

This class extends `ClassLoader` with additional support for defining
classes with an associated code source and permissions.

**API note:** Permissions cannot be used for controlling access to resources
as the Security Manager is no longer supported.

**Since:** 1.2

## SecureClassLoader.SecureClassLoader(ClassLoader)

```java
protected SecureClassLoader(ClassLoader parent)
```

Creates a new `SecureClassLoader` using the specified parent
class loader for delegation.

Parameters:

- `parent`: the parent ClassLoader, can be `null` for the bootstrap class loader

**API note:** If `parent` is specified as `null` (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See Run-time Built-in Class Loaders
for information on the bootstrap class loader and other built-in class loaders.

## SecureClassLoader.SecureClassLoader()

```java
protected SecureClassLoader()
```

Creates a new `SecureClassLoader` using the
system class loader as the parent.

## SecureClassLoader.SecureClassLoader(String, ClassLoader)

```java
protected SecureClassLoader(String name, ClassLoader parent)
```

Creates a new `SecureClassLoader` of the specified name and
using the specified parent class loader for delegation.

Parameters:

- `name`: class loader name; or `null` if not named
- `parent`: the parent class loader, can be `null` for the bootstrap class loader

**API note:** If `parent` is specified as `null` (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See Run-time Built-in Class Loaders
for information on the bootstrap class loader and other built-in class loaders.

**Since:** 9

Throws:

- `IllegalArgumentException`: if the given name is empty.

## SecureClassLoader.defineClass(String, byte[], int, int, CodeSource)

```java
protected final Class<?> defineClass(String name, byte[] b, int off, int len, CodeSource cs)
```

Converts an array of bytes into an instance of class `Class`,
with an optional CodeSource. Before the
class can be used it must be resolved.

If a non-null CodeSource is supplied a ProtectionDomain is
constructed and associated with the class being defined.

Parameters:

- `name`: the expected name of the class, or `null` if not known, using '.' and not '/' as the separator and without a trailing ".class" suffix.
- `b`: the bytes that make up the class data. The bytes in positions `off` through `off+len-1` should have the format of a valid class file as defined by *The Java Virtual Machine Specification*.
- `off`: the start offset in `b` of the class data
- `len`: the length of the class data
- `cs`: the associated CodeSource, or `null` if none

**Returns:** the `Class` object created from the data,
        and optional CodeSource.

Throws:

- `ClassFormatError`: if the data did not contain a valid class
- `IndexOutOfBoundsException`: if either `off` or `len` is negative, or if `off+len` is greater than `b.length`.
- `SecurityException`: if an attempt is made to add this class to a package that contains classes that were signed by a different set of certificates than this class, or if the class name begins with "java.".

## SecureClassLoader.defineClass(String, java.nio.ByteBuffer, CodeSource)

```java
protected final Class<?> defineClass(String name, java.nio.ByteBuffer b, CodeSource cs)
```

Converts a ByteBuffer
into an instance of class `Class`, with an optional CodeSource.
Before the class can be used it must be resolved.

If a non-null CodeSource is supplied a ProtectionDomain is
constructed and associated with the class being defined.

Parameters:

- `name`: the expected name of the class, or `null` if not known, using '.' and not '/' as the separator and without a trailing ".class" suffix.
- `b`: the bytes that make up the class data. The bytes from positions `b.position()` through `b.position() + b.limit() -1` should have the format of a valid class file as defined by *The Java Virtual Machine Specification*.
- `cs`: the associated CodeSource, or `null` if none

**Returns:** the `Class` object created from the data,
        and optional CodeSource.

**Since:** 1.5

Throws:

- `ClassFormatError`: if the data did not contain a valid class
- `SecurityException`: if an attempt is made to add this class to a package that contains classes that were signed by a different set of certificates than this class, or if the class name begins with "java.".

## SecureClassLoader.getPermissions(CodeSource)

```java
protected PermissionCollection getPermissions(CodeSource codesource)
```

Returns the permissions for the given CodeSource object.

This method is invoked by the defineClass method which takes
a CodeSource as an argument when it is constructing the
ProtectionDomain for the class being defined.

Parameters:

- `codesource`: the codesource.

**Returns:** the permissions for the codesource.
