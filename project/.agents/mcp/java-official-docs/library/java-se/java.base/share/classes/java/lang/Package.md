---
title: "Package class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Package.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Package class (java.lang)

```java
public final class Package extends NamedPackage implements java.lang.reflect.AnnotatedElement
```

Represents metadata about a run-time package associated with a class loader.
Metadata includes annotations, versioning, and sealing.

Annotations for the run-time package are read from `package-info.class`
at the same code source as classes in the run-time package.

The set of classes that make up the run-time package may implement a
particular specification. The specification title, version, and vendor
(indicating the owner/maintainer of the specification) can be provided
when the `Package` is defined. An application can ask if the
`Package` is compatible with a particular specification version
by using the Package.isCompatibleWith(String)
method. In addition, information about the actual classes that make up the
run-time package can be provided when the `Package` is defined.
This information consists of an implementation title, version, and vendor
(indicating the supplier of the classes).

A `Package` may be explicitly defined with
the String, String, String, String, String, String, URL) method.
The caller supplies the specification and implementation titles, versions, and
vendors. The caller also indicates whether the package is
sealed.
If a `Package` is not explicitly defined for a run-time package when
a class in that run-time package is defined, then a `Package` is
automatically defined by the class's defining class loader, as follows.

A `Package` automatically defined for classes in a named module has
the following properties:

- The name of the package is derived from the binary names
    of the classes. Since classes in a named module must be in a named package,
    the derived name is never empty.

- The package is sealed with the module location as the code source, if known.

- The specification and implementation titles, versions, and vendors
    are unspecified.

- Any annotations on the package are read from `package-info.class`
    as specified above.

A `Package` automatically defined for classes in an unnamed module
has the following properties:

- The name of the package is either `""` (for classes in an unnamed package)
    or derived from the binary names of the classes
    (for classes in a named package).

- The package is not sealed.

- The specification and implementation titles, versions, and vendors
    are unspecified.

- Any annotations on the package are read from `package-info.class`
    as specified above.

A `Package` can be obtained with the Package.getPackage(String) and ClassLoader.getDefinedPackage(String) methods.
Every `Package` defined by a class loader can be obtained
with the Package.getPackages() and
`ClassLoader.getDefinedPackages` methods.

**Implementation note:** The builtin class loaders
do not explicitly define `Package` objects for packages in
*named modules*.  Instead those packages are automatically defined
and have no specification and implementation versioning information.

**jvms:** 5.3 Creation and Loading

**See also:** The JAR File Specification: Package Sealing

**See also:** ClassLoader#definePackage(String, String, String, String, String, String, String, URL)

**Since:** 1.2

## Package.getName()

```java
public String getName()
```

Return the name of this package.

**Returns:** The fully-qualified name of this package as defined in section  of
         *The Java Language Specification*,
         for example, `java.lang`

## Package.getSpecificationTitle()

```java
public String getSpecificationTitle()
```

Return the title of the specification that this package implements.

**Returns:** the specification title, `null` is returned if it is not known.

## Package.getSpecificationVersion()

```java
public String getSpecificationVersion()
```

Returns the version number of the specification
that this package implements.
This version string must be a sequence of non-negative decimal
integers separated by "."'s and may have leading zeros.
When version strings are compared the most significant
numbers are compared.

Specification version numbers use a syntax that consists of non-negative
decimal integers separated by periods ".", for example "2.0" or
"1.2.3.4.5.6.7".  This allows an extensible number to be used to represent
major, minor, micro, etc. versions.  The version specification is described
by the following formal grammar:

*SpecificationVersion:*
*Digits RefinedVersionopt*

*RefinedVersion:*
`.` *Digits*
`.` *Digits RefinedVersion*

*Digits:*
*Digit*
*Digits*

*Digit:*
any character for which `Character.isDigit` returns `true`,
e.g. 0, 1, 2, ...

**Returns:** the specification version, `null` is returned if it is not known.

## Package.getSpecificationVendor()

```java
public String getSpecificationVendor()
```

Return the name of the organization, vendor,
or company that owns and maintains the specification
of the classes that implement this package.

**Returns:** the specification vendor, `null` is returned if it is not known.

## Package.getImplementationTitle()

```java
public String getImplementationTitle()
```

Return the title of this package.

**Returns:** the title of the implementation, `null` is returned if it is not known.

## Package.getImplementationVersion()

```java
public String getImplementationVersion()
```

Return the version of this implementation. It consists of any string
assigned by the vendor of this implementation and does
not have any particular syntax specified or expected by the Java
runtime. It may be compared for equality with other
package version strings used for this implementation
by this vendor for this package.

**Returns:** the version of the implementation, `null` is returned if it is not known.

## Package.getImplementationVendor()

```java
public String getImplementationVendor()
```

Returns the vendor that implemented this package, `null`
is returned if it is not known.

**Returns:** the vendor that implemented this package, `null`
is returned if it is not known.

## Package.isSealed()

```java
public boolean isSealed()
```

Returns true if this package is sealed.

**API note:** Package sealing
has no relationship with sealed classes or interfaces.
Package sealing is specific to JAR files defined for classes in an unnamed module.
See the Package class specification for details
how a `Package` is defined as sealed package.

**Returns:** true if the package is sealed, false otherwise

## Package.isSealed(URL)

```java
public boolean isSealed(URL url)
```

Returns true if this package is sealed with respect to the specified
code source `url`.

Parameters:

- `url`: the code source URL

**API note:** Package sealing
has no relationship with sealed classes or interfaces.
Package sealing is specific to JAR files defined for classes in an unnamed module.
See the Package class specification for details
how a `Package` is defined as sealed package.

**Returns:** true if this package is sealed with respect to the given `url`

## Package.isCompatibleWith(String)

```java
public boolean isCompatibleWith(String desired) throws NumberFormatException
```

Compare this package's specification version with a
desired version. It returns true if
this packages specification version number is greater than or equal
to the desired version number.

Version numbers are compared by sequentially comparing corresponding
components of the desired and specification strings.
Each component is converted as a decimal integer and the values
compared.
If the specification value is greater than the desired
value true is returned. If the value is less false is returned.
If the values are equal the period is skipped and the next pair of
components is compared.

Parameters:

- `desired`: the version string of the desired version.

**Returns:** true if this package's version number is greater
        than or equal to the desired version number

Throws:

- `NumberFormatException`: if the current version is not known or the desired or current version is not of the correct dotted form.

## Package.getPackage(String)

```java
public static Package getPackage(String name)
```

Finds a package by name in the caller's class loader and its
ancestors.

If the caller's class loader defines a `Package` of the given name,
the `Package` is returned. Otherwise, the ancestors of the
caller's class loader are searched recursively (parent by parent)
for a `Package` of the given name.

Calling this method is equivalent to calling `ClassLoader.getPackage`
on a `ClassLoader` instance which is the caller's class loader.

Parameters:

- `name`: A package name, such as "`java.lang`".

**Returns:** The `Package` of the given name defined by the caller's
        class loader or its ancestors, or `null` if not found.

**Deprecated:** If multiple class loaders delegate to each other and define classes
with the same package name, and one such loader relies on the lookup
behavior of `getPackage` to return a `Package` from
a parent loader, then the properties exposed by the `Package`
may not be as expected in the rest of the program.
For example, the `Package` will only expose annotations from the
`package-info.class` file defined by the parent loader, even if
annotations exist in a `package-info.class` file defined by
a child loader.  A more robust approach is to use the
`ClassLoader.getDefinedPackage` method which returns
a `Package` for the specified class loader.

**See also:** ClassLoader#getDefinedPackage

Throws:

- `NullPointerException`: if `name` is `null`.

## Package.getPackages()

```java
public static Package[] getPackages()
```

Returns all of the `Package`s defined by the caller's class loader
and its ancestors.  The returned array may contain more than one
`Package` object of the same package name, each defined by
a different class loader in the class loader hierarchy.

Calling this method is equivalent to calling `ClassLoader.getPackages`
on a `ClassLoader` instance which is the caller's class loader.

**Returns:** The array of `Package` objects defined by this
         class loader and its ancestors

**See also:** ClassLoader#getDefinedPackages

## Package.hashCode()

```java
public int hashCode()
```

Return the hash code computed from the package name.

**Returns:** the hash code computed from the package name.

## Package.toString()

```java
public String toString()
```

Returns the string representation of this Package.
Its value is the string "package " and the package name.
If the package title is defined it is appended.
If the package version is defined it is appended.

**Returns:** the string representation of the package.

## Package.getAnnotation(Class)

```java
public <A extends Annotation> A getAnnotation(Class<A> annotationClass)
```

(inherited documentation)

Note that any annotation returned by this method is a
declaration annotation.

**Since:** 1.5

Throws:

- `NullPointerException`: (inherited documentation)

## Package.isAnnotationPresent(Class<? extends Annotation>)

```java
public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass)
```

(inherited documentation)

**Since:** 1.5

Throws:

- `NullPointerException`: (inherited documentation)

## Package.getAnnotationsByType(Class)

```java
public <A extends Annotation> A[] getAnnotationsByType(Class<A> annotationClass)
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

**Since:** 1.8

Throws:

- `NullPointerException`: (inherited documentation)

## Package.getAnnotations()

```java
public Annotation[] getAnnotations()
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

**Since:** 1.5

## Package.getDeclaredAnnotation(Class)

```java
public <A extends Annotation> A getDeclaredAnnotation(Class<A> annotationClass)
```

(inherited documentation)

Note that any annotation returned by this method is a
declaration annotation.

**Since:** 1.8

Throws:

- `NullPointerException`: (inherited documentation)

## Package.getDeclaredAnnotationsByType(Class)

```java
public <A extends Annotation> A[] getDeclaredAnnotationsByType(Class<A> annotationClass)
```

**Since:** 1.8

Throws:

- `NullPointerException`: (inherited documentation)

## Package.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

**Since:** 1.5
