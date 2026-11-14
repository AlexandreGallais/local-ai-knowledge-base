---
title: "Module class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Module.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Module class (java.lang)

```java
public final class Module implements AnnotatedElement
```

Represents a run-time module, either named or unnamed.

 Named modules have a name and are constructed by the
Java Virtual Machine when a graph of modules is defined to the Java virtual
machine to create a module layer.

 An unnamed module does not have a name. There is an unnamed module for
each ClassLoader, obtained by invoking its getUnnamedModule method. All types that are
not in a named module are members of their defining class loader's unnamed
module.

 The package names that are parameters or returned by methods defined in
this class are the fully-qualified names of the packages as defined in
section  of *The Java Language Specification*, for
example, `"java.lang"`.

 Unless otherwise specified, passing a `null` argument to a method
in this class causes a NullPointerException to
be thrown.

**Since:** 9

**See also:** Class#getModule()

**JLS:** 7.7 Module Declarations

## Module.isNamed()

```java
public boolean isNamed()
```

Returns `true` if this module is a named module.

**Returns:** `true` if this is a named module

**See also:** ClassLoader#getUnnamedModule()

**JLS:** 7.7.5 Unnamed Modules

## Module.getName()

```java
public String getName()
```

Returns the module name or `null` if this module is an unnamed
module.

**Returns:** The module name

## Module.getClassLoader()

```java
public ClassLoader getClassLoader()
```

Returns the `ClassLoader` for this module.

**Returns:** The class loader for this module

## Module.getDescriptor()

```java
public ModuleDescriptor getDescriptor()
```

Returns the module descriptor for this module or `null` if this
module is an unnamed module.

**Returns:** The module descriptor for this module

## Module.getLayer()

```java
public ModuleLayer getLayer()
```

Returns the module layer that contains this module or `null` if
this module is not in a module layer.

A module layer contains named modules and therefore this method always
returns `null` when invoked on an unnamed module.

 Dynamic modules are
named modules that are generated at runtime. A dynamic module may or may
not be in a module layer.

**Returns:** The module layer that contains this module

**See also:** java.lang.reflect.Proxy

## Module.isNativeAccessEnabled()

```java
public boolean isNativeAccessEnabled()
```

Returns `true` if this module can access
*restricted* methods.

**Returns:** `true` if this module can access *restricted* methods.

**Since:** 22

## Module.canRead(Module)

```java
public boolean canRead(Module other)
```

Indicates if this module reads the given module. This method returns
`true` if invoked to test if this module reads itself. It also
returns `true` if invoked on an unnamed module (as unnamed
modules read all modules).

Parameters:

- `other`: The other module

**Returns:** `true` if this module reads `other`

**See also:** #addReads(Module)

## Module.addReads(Module)

```java
public Module addReads(Module other)
```

If the caller's module is this module then update this module to read
the given module.

This method is a no-op if `other` is this module (all modules read
themselves), this module is an unnamed module (as unnamed modules read
all modules), or this module already reads `other`.

Parameters:

- `other`: The other module

**Implementation note:** *Read edges* added by this method are *weak* and
do not prevent `other` from being GC'ed when this module is
strongly reachable.

**Returns:** this module

**See also:** #canRead

Throws:

- `IllegalCallerException`: If this is a named module and the caller's module is not this module

## Module.isExported(String, Module)

```java
public boolean isExported(String pn, Module other)
```

Returns `true` if this module exports the given package to at
least the given module.

 This method returns `true` if invoked to test if a package in
this module is exported to itself. It always returns `true` when
invoked on an unnamed module. A package that is open to
the given module is considered exported to that module at run-time and
so this method returns `true` if the package is open to the given
module.

 This method does not check if the given module reads this module.

Parameters:

- `pn`: The package name
- `other`: The other module

**Returns:** `true` if this module exports the package to at least the
        given module

**See also:** ModuleDescriptor#exports()

**See also:** #addExports(String,Module)

## Module.isOpen(String, Module)

```java
public boolean isOpen(String pn, Module other)
```

Returns `true` if this module has *opened* a package to at
least the given module.

 This method returns `true` if invoked to test if a package in
this module is open to itself. It returns `true` when invoked on an
open module with a package in the module.
It always returns `true` when invoked on an unnamed module.

 This method does not check if the given module reads this module.

Parameters:

- `pn`: The package name
- `other`: The other module

**API note:** A package `p` opened to module `M` allows code in
`M` do deep reflection on all types in the package.
Further, if `M` reads this module, it can obtain a
Lookup object that is allowed to
define classes
in package `p`.

**Returns:** `true` if this module has *opened* the package
        to at least the given module

**See also:** ModuleDescriptor#opens()

**See also:** #addOpens(String,Module)

**See also:** java.lang.reflect.AccessibleObject#setAccessible(boolean)

**See also:** java.lang.invoke.MethodHandles#privateLookupIn

## Module.isExported(String)

```java
public boolean isExported(String pn)
```

Returns `true` if this module exports the given package
unconditionally.

 This method always returns `true` when invoked on an unnamed
module. A package that is opened unconditionally
is considered exported unconditionally at run-time and so this method
returns `true` if the package is opened unconditionally.

 This method does not check if the given module reads this module.

Parameters:

- `pn`: The package name

**Returns:** `true` if this module exports the package unconditionally

**See also:** ModuleDescriptor#exports()

## Module.isOpen(String)

```java
public boolean isOpen(String pn)
```

Returns `true` if this module has *opened* a package
unconditionally.

 This method always returns `true` when invoked on an unnamed
module. Additionally, it always returns `true` when invoked on an
open module with a package in the
module.

 This method does not check if the given module reads this module.

Parameters:

- `pn`: The package name

**API note:** A package `p` opened to module `M` allows code in
`M` do deep reflection on all types in the package.
Further, if `M` reads this module, it can obtain a
Lookup object that is allowed to
define classes
in package `p`.

**Returns:** `true` if this module has *opened* the package
        unconditionally

**See also:** ModuleDescriptor#opens()

**See also:** java.lang.reflect.AccessibleObject#setAccessible(boolean)

**See also:** java.lang.invoke.MethodHandles#privateLookupIn

## Module.addExports(String, Module)

```java
public Module addExports(String pn, Module other)
```

If the caller's module is this module then update this module to export
the given package to the given module.

 This method has no effect if the package is already exported (or
*open*) to the given module.

Parameters:

- `pn`: The package name
- `other`: The module

**API note:** As specified in section  of the *The Java
Virtual Machine Specification *, if an attempt to resolve a
symbolic reference fails because of a linkage error, then subsequent
attempts to resolve the reference always fail with the same error that
was thrown as a result of the initial resolution attempt.

**Returns:** this module

**jvms:** 5.4.3 Resolution

**See also:** #isExported(String,Module)

Throws:

- `IllegalArgumentException`: If `pn` is `null`, or this is a named module and the package `pn` is not a package in this module
- `IllegalCallerException`: If this is a named module and the caller's module is not this module

## Module.addOpens(String, Module)

```java
public Module addOpens(String pn, Module other)
```

If this module has *opened* a package to at least the caller
module then update this module to open the package to the given module.
Opening a package with this method allows all types in the package,
and all their members, not just public types and their public members,
to be reflected on by the given module when using APIs that support
private access or a way to bypass or suppress default Java language
access control checks.

 This method has no effect if the package is already *open*
to the given module.

Parameters:

- `pn`: The package name
- `other`: The module

**API note:** This method can be used for cases where a *consumer
module* uses a qualified opens to open a package to an *API
module* but where the reflective access to the members of classes in
the consumer module is delegated to code in another module. Code in the
API module can use this method to open the package in the consumer module
to the other module.

**Returns:** this module

**See also:** #isOpen(String,Module)

**See also:** java.lang.reflect.AccessibleObject#setAccessible(boolean)

**See also:** java.lang.invoke.MethodHandles#privateLookupIn

Throws:

- `IllegalArgumentException`: If `pn` is `null`, or this is a named module and the package `pn` is not a package in this module
- `IllegalCallerException`: If this is a named module and this module has not opened the package to at least the caller's module

## Module.addUses(Class<?>)

```java
public Module addUses(Class<?> service)
```

If the caller's module is this module then update this module to add a
service dependence on the given service type. This method is intended
for use by frameworks that invoke ServiceLoader on behalf of other modules or where the framework is
passed a reference to the service type by other code. This method is
a no-op when invoked on an unnamed module or an automatic module.

 This method does not cause resolveAndBind to be re-run.

Parameters:

- `service`: The service type

**Returns:** this module

**See also:** #canUse(Class)

**See also:** ModuleDescriptor#uses()

Throws:

- `IllegalCallerException`: If this is a named module and the caller's module is not this module

## Module.canUse(Class<?>)

```java
public boolean canUse(Class<?> service)
```

Indicates if this module has a service dependence on the given service
type. This method always returns `true` when invoked on an unnamed
module or an automatic module.

Parameters:

- `service`: The service type

**Returns:** `true` if this module uses service type `st`

**See also:** #addUses(Class)

## Module.getPackages()

```java
public Set<String> getPackages()
```

Returns the set of package names for the packages in this module.

 For named modules, the returned set contains an element for each
package in the module.

 For unnamed modules, the returned set contains an element for
each package that has been defined
in the unnamed module.

**Returns:** the set of the package names of the packages in this module

## Module.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

(inherited documentation)
This method returns `null` when invoked on an unnamed module.

 Note that any annotation returned by this method is a
declaration annotation.

## Module.getAnnotations()

```java
public Annotation[] getAnnotations()
```

(inherited documentation)
This method returns an empty array when invoked on an unnamed module.

 Note that any annotations returned by this method are
declaration annotations.

## Module.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

(inherited documentation)
This method returns an empty array when invoked on an unnamed module.

 Note that any annotations returned by this method are
declaration annotations.

## Module.getResourceAsStream(String)

```java
public InputStream getResourceAsStream(String name) throws IOException
```

Returns an input stream for reading a resource in this module.
The `name` parameter is a `'/'`-separated path name that
identifies the resource. As with Class.getResourceAsStream, this method delegates to the module's class
loader findResource(String,String) method, invoking it with the module name
(or `null` when the module is unnamed) and the name of the
resource. If the resource name has a leading slash then it is dropped
before delegation.

 A resource in a named module may be *encapsulated* so that
it cannot be located by code in other modules. Whether a resource can be
located or not is determined as follows:

-  If the resource name ends with  "`.class`" then it is not
    encapsulated.

-  A *package name* is derived from the resource name. If
    the package name is a package in the
    module then the resource can only be located by the caller of this
    method when the package is open
    to at least the caller's module. If the resource is not in a
    package in the module then the resource is not encapsulated.

 In the above, the *package name* for a resource is derived
from the subsequence of characters that precedes the last `'/'` in
the name and then replacing each `'/'` character in the subsequence
with `'.'`. A leading slash is ignored when deriving the package
name. As an example, the package name derived for a resource named
"`a/b/c/foo.properties`" is "`a.b.c`". A resource name
with the name "`META-INF/MANIFEST.MF`" is never encapsulated
because "`META-INF`" is not a legal package name.

 This method returns `null` if the resource is not in this module
or the resource is encapsulated and cannot be located by the caller.

Parameters:

- `name`: The resource name

**Returns:** An input stream for reading the resource or `null`

**See also:** Class#getResourceAsStream(String)

Throws:

- `IOException`: If an I/O error occurs

## Module.toString()

```java
public String toString()
```

Returns the string representation of this module. For a named module,
the representation is the string `"module"`, followed by a space,
and then the module name. For an unnamed module, the representation is
the string `"unnamed module"`, followed by a space, and then an
implementation specific string that identifies the unnamed module.

**Returns:** The string representation of this module
