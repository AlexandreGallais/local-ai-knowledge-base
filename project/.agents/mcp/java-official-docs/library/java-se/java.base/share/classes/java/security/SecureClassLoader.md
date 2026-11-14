# SecureClassLoader class (java.security)

```java
public class SecureClassLoader extends ClassLoader
```

This class extends {@code ClassLoader} with additional support for defining
classes with an associated code source and permissions.

@apiNote
Permissions cannot be used for controlling access to resources
as the Security Manager is no longer supported.

@author  Li Gong
@author  Roland Schemers
@since 1.2

## SecureClassLoader.SecureClassLoader(ClassLoader)

```java
protected SecureClassLoader(ClassLoader parent)
```

Creates a new {@code SecureClassLoader} using the specified parent
class loader for delegation.

@apiNote If {@code parent} is specified as {@code null} (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See {@linkplain ClassLoader##builtinLoaders Run-time Built-in Class Loaders}
for information on the bootstrap class loader and other built-in class loaders.

@param parent the parent ClassLoader, can be {@code null} for the bootstrap
              class loader

## SecureClassLoader.SecureClassLoader()

```java
protected SecureClassLoader()
```

Creates a new {@code SecureClassLoader} using the
{@linkplain ClassLoader#getSystemClassLoader() system class loader as the parent}.

## SecureClassLoader.SecureClassLoader(String, ClassLoader)

```java
protected SecureClassLoader(String name, ClassLoader parent)
```

Creates a new {@code SecureClassLoader} of the specified name and
using the specified parent class loader for delegation.

@apiNote If {@code parent} is specified as {@code null} (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See {@linkplain ClassLoader##builtinLoaders Run-time Built-in Class Loaders}
for information on the bootstrap class loader and other built-in class loaders.

@param name class loader name; or {@code null} if not named
@param parent the parent class loader, can be {@code null} for the bootstrap
              class loader

@throws IllegalArgumentException if the given name is empty.

@since 9

## SecureClassLoader.defineClass(String, byte[], int, int, CodeSource)

```java
protected final Class<?> defineClass(String name, byte[] b, int off, int len, CodeSource cs)
```

Converts an array of bytes into an instance of class {@code Class},
with an optional CodeSource. Before the
class can be used it must be resolved.
<p>
If a non-null CodeSource is supplied a ProtectionDomain is
constructed and associated with the class being defined.

@param      name the expected name of the class, or {@code null}
                 if not known, using '.' and not '/' as the separator
                 and without a trailing ".class" suffix.
@param      b    the bytes that make up the class data. The bytes in
            positions {@code off} through {@code off+len-1}
            should have the format of a valid class file as defined by
            <cite>The Java Virtual Machine Specification</cite>.
@param      off  the start offset in {@code b} of the class data
@param      len  the length of the class data
@param      cs   the associated CodeSource, or {@code null} if none
@return the {@code Class} object created from the data,
        and optional CodeSource.
@throws     ClassFormatError if the data did not contain a valid class
@throws     IndexOutOfBoundsException if either {@code off} or
            {@code len} is negative, or if
            {@code off+len} is greater than {@code b.length}.

@throws     SecurityException if an attempt is made to add this class
            to a package that contains classes that were signed by
            a different set of certificates than this class, or if
            the class name begins with "java.".

## SecureClassLoader.defineClass(String, java.nio.ByteBuffer, CodeSource)

```java
protected final Class<?> defineClass(String name, java.nio.ByteBuffer b, CodeSource cs)
```

Converts a {@link java.nio.ByteBuffer ByteBuffer}
into an instance of class {@code Class}, with an optional CodeSource.
Before the class can be used it must be resolved.
<p>
If a non-null CodeSource is supplied a ProtectionDomain is
constructed and associated with the class being defined.

@param      name the expected name of the class, or {@code null}
                 if not known, using '.' and not '/' as the separator
                 and without a trailing ".class" suffix.
@param      b    the bytes that make up the class data.  The bytes from positions
                 {@code b.position()} through {@code b.position() + b.limit() -1}
                 should have the format of a valid class file as defined by
                 <cite>The Java Virtual Machine Specification</cite>.
@param      cs   the associated CodeSource, or {@code null} if none
@return the {@code Class} object created from the data,
        and optional CodeSource.
@throws     ClassFormatError if the data did not contain a valid class
@throws     SecurityException if an attempt is made to add this class
            to a package that contains classes that were signed by
            a different set of certificates than this class, or if
            the class name begins with "java.".

@since  1.5

## SecureClassLoader.getPermissions(CodeSource)

```java
protected PermissionCollection getPermissions(CodeSource codesource)
```

Returns the permissions for the given CodeSource object.
<p>
This method is invoked by the defineClass method which takes
a CodeSource as an argument when it is constructing the
ProtectionDomain for the class being defined.

@param codesource the codesource.

@return the permissions for the codesource.