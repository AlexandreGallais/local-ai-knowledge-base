---
title: "ClassLoader class (java.lang) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ClassLoader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassLoader class (java.lang) (part 4 of 4)

## ClassLoader.definePackage(String, String, String, String, String, String, String, URL)

```java
protected Package definePackage(String name, String specTitle, String specVersion, String specVendor, String implTitle, String implVersion, String implVendor, URL sealBase)
```

Defines a package by name in this `ClassLoader`.

Package names must be unique within a class loader and
cannot be redefined or changed once created.

If a class loader wishes to define a package with specific properties,
such as version information, then the class loader should call this
`definePackage` method before calling `defineClass`.
Otherwise, the
byte[], int, int, ProtectionDomain) defineClass
method will define a package in this class loader corresponding to the package
of the newly defined class; the properties of this defined package are
specified by `Package`.

Parameters:

- `name`: The package name
- `specTitle`: The specification title
- `specVersion`: The specification version
- `specVendor`: The specification vendor
- `implTitle`: The implementation title
- `implVersion`: The implementation version
- `implVendor`: The implementation vendor
- `sealBase`: If not `null`, then this package is sealed with respect to the given code source URL object. Otherwise, the package is not sealed.

**API note:** A class loader that wishes to define a package for classes in a JAR
typically uses the specification and implementation titles, versions, and
vendors from the JAR's manifest. If the package is specified as
sealed in the JAR's manifest,
the `URL` of the JAR file is typically used as the `sealBase`.
If classes of package `'p'` defined by this class loader
are loaded from multiple JARs, the `Package` object may contain
different information depending on the first class of package `'p'`
defined and which JAR's manifest is read first to explicitly define
package `'p'`.

 It is strongly recommended that a class loader does not call this
method to explicitly define packages in *named modules*; instead,
the package will be automatically defined when a class is byte[], int, int, ProtectionDomain) being defined.
If it is desirable to define `Package` explicitly, it should ensure
that all packages in a named module are defined with the properties
specified by `Package`.  Otherwise, some `Package` objects
in a named module may be for example sealed with different seal base.

**Returns:** The newly defined `Package` object

**Since:** 1.2

**jvms:** 5.3 Creation and Loading

**See also:** The JAR File Specification: Package Sealing

Throws:

- `NullPointerException`: if `name` is `null`.
- `IllegalArgumentException`: if a package of the given `name` is already defined by this class loader

## ClassLoader.getDefinedPackage(String)

```java
public final Package getDefinedPackage(String name)
```

Returns a `Package` of the given name that
has been defined by this class loader.

Parameters:

- `name`: The package name

**Returns:** The `Package` of the given name that has been defined
        by this class loader, or `null` if not found

**jvms:** 5.3 Creation and Loading

**Since:** 9

Throws:

- `NullPointerException`: if `name` is `null`.

## ClassLoader.getDefinedPackages()

```java
public final Package[] getDefinedPackages()
```

Returns all of the `Package`s that have been defined by
this class loader.  The returned array has no duplicated `Package`s
of the same name.

**API note:** This method returns an array rather than a `Set` or `Stream`
         for consistency with the existing `getPackages` method.

**Returns:** The array of `Package` objects that have been defined by
        this class loader; or a zero length array if no package has been
        defined by this class loader.

**jvms:** 5.3 Creation and Loading

**Since:** 9

## ClassLoader.getPackage(String)

```java
protected Package getPackage(String name)
```

Finds a package by name in this class loader and its ancestors.

If this class loader defines a `Package` of the given name,
the `Package` is returned. Otherwise, the ancestors of
this class loader are searched recursively (parent by parent)
for a `Package` of the given name.

Parameters:

- `name`: The package name

**API note:** The platform class loader
may delegate to the application class loader but the application class
loader is not its ancestor.  When invoked on the platform class loader,
this method  will not find packages defined to the application
class loader.

**Returns:** The `Package` of the given name that has been defined by
        this class loader or its ancestors, or `null` if not found.

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

**See also:** ClassLoader#getDefinedPackage(String)

**Since:** 1.2

Throws:

- `NullPointerException`: if `name` is `null`.

## ClassLoader.getPackages()

```java
protected Package[] getPackages()
```

Returns all of the `Package`s that have been defined by
this class loader and its ancestors.  The returned array may contain
more than one `Package` object of the same package name, each
defined by a different class loader in the class loader hierarchy.

**API note:** The platform class loader
may delegate to the application class loader. In other words,
packages in modules defined to the application class loader may be
visible to the platform class loader.  On the other hand,
the application class loader is not its ancestor and hence
when invoked on the platform class loader, this method will not
return any packages defined to the application class loader.

**Returns:** The array of `Package` objects that have been defined by
         this class loader and its ancestors

**See also:** ClassLoader#getDefinedPackages()

**Since:** 1.2

## ClassLoader.findLibrary(String)

```java
protected String findLibrary(String libname)
```

Returns the absolute path name of a native library.  The VM invokes this
method to locate the native libraries that belong to classes loaded with
this class loader. If this method returns `null`, the VM
searches the library along the path specified as the
"`java.library.path`" property.

Parameters:

- `libname`: The library name

**Returns:** The absolute path of the native library

**See also:** System#loadLibrary(String)

**See also:** System#mapLibraryName(String)

**Since:** 1.2

## ClassLoader.setDefaultAssertionStatus(boolean)

```java
public void setDefaultAssertionStatus(boolean enabled)
```

Sets the default assertion status for this class loader.  This setting
determines whether classes loaded by this class loader and initialized
in the future will have assertions enabled or disabled by default.
This setting may be overridden on a per-package or per-class basis by
invoking boolean) or boolean).

Parameters:

- `enabled`: `true` if classes loaded by this class loader will henceforth have assertions enabled by default, `false` if they will have assertions disabled by default.

**Since:** 1.4

## ClassLoader.setPackageAssertionStatus(String, boolean)

```java
public void setPackageAssertionStatus(String packageName, boolean enabled)
```

Sets the package default assertion status for the named package.  The
package default assertion status determines the assertion status for
classes initialized in the future that belong to the named package or
any of its "subpackages".

 A subpackage of a package named p is any package whose name begins
with "`p.`".  For example, `javax.swing.text` is a
subpackage of `javax.swing`, and both `java.util` and
`java.lang.reflect` are subpackages of `java`.

 In the event that multiple package defaults apply to a given class,
the package default pertaining to the most specific package takes
precedence over the others.  For example, if `javax.lang` and
`javax.lang.reflect` both have package defaults associated with
them, the latter package default applies to classes in
`javax.lang.reflect`.

 Package defaults take precedence over the class loader's default
assertion status, and may be overridden on a per-class basis by invoking
boolean).

Parameters:

- `packageName`: The name of the package whose package default assertion status is to be set. A `null` value indicates the unnamed package that is "current" (see section  of *The Java Language Specification*.)
- `enabled`: `true` if classes loaded by this classloader and belonging to the named package or any of its subpackages will have assertions enabled by default, `false` if they will have assertions disabled by default.

**Since:** 1.4

## ClassLoader.setClassAssertionStatus(String, boolean)

```java
public void setClassAssertionStatus(String className, boolean enabled)
```

Sets the desired assertion status for the named top-level class in this
class loader and any nested classes contained therein.  This setting
takes precedence over the class loader's default assertion status, and
over any applicable per-package default.  This method has no effect if
the named class has already been initialized.  (Once a class is
initialized, its assertion status cannot change.)

 If the named class is not a top-level class, this invocation will
have no effect on the actual assertion status of any class.

Parameters:

- `className`: The fully qualified class name of the top-level class whose assertion status is to be set.
- `enabled`: `true` if the named class is to have assertions enabled when (and if) it is initialized, `false` if the class is to have assertions disabled.

**Since:** 1.4

## ClassLoader.clearAssertionStatus()

```java
public void clearAssertionStatus()
```

Sets the default assertion status for this class loader to
`false` and discards any package defaults or class assertion
status settings associated with the class loader.  This method is
provided so that class loaders can be made to ignore any command line or
persistent assertion status settings and "start with a clean slate."

**Since:** 1.4
