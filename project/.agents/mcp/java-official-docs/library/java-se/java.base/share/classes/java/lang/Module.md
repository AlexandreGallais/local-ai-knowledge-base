# Module class (java.lang)

```java
public final class Module implements AnnotatedElement
```

Represents a run-time module, either {@link #isNamed() named} or unnamed.

<p> Named modules have a {@link #getName() name} and are constructed by the
Java Virtual Machine when a graph of modules is defined to the Java virtual
machine to create a {@linkplain ModuleLayer module layer}. </p>

<p> An unnamed module does not have a name. There is an unnamed module for
each {@link ClassLoader ClassLoader}, obtained by invoking its {@link
ClassLoader#getUnnamedModule() getUnnamedModule} method. All types that are
not in a named module are members of their defining class loader's unnamed
module. </p>

<p> The package names that are parameters or returned by methods defined in
this class are the fully-qualified names of the packages as defined in
section {@jls 6.5.3} of <cite>The Java Language Specification</cite>, for
example, {@code "java.lang"}. </p>

<p> Unless otherwise specified, passing a {@code null} argument to a method
in this class causes a {@link NullPointerException NullPointerException} to
be thrown. </p>

@since 9
@see Class#getModule()
@jls 7.7 Module Declarations

## Module.isNamed()

```java
public boolean isNamed()
```

Returns {@code true} if this module is a named module.

@return {@code true} if this is a named module

@see ClassLoader#getUnnamedModule()
@jls 7.7.5 Unnamed Modules

## Module.getName()

```java
public String getName()
```

Returns the module name or {@code null} if this module is an unnamed
module.

@return The module name

## Module.getClassLoader()

```java
public ClassLoader getClassLoader()
```

Returns the {@code ClassLoader} for this module.

@return The class loader for this module

## Module.getDescriptor()

```java
public ModuleDescriptor getDescriptor()
```

Returns the module descriptor for this module or {@code null} if this
module is an unnamed module.

@return The module descriptor for this module

## Module.getLayer()

```java
public ModuleLayer getLayer()
```

Returns the module layer that contains this module or {@code null} if
this module is not in a module layer.

A module layer contains named modules and therefore this method always
returns {@code null} when invoked on an unnamed module.

<p> <a href="reflect/Proxy.html#dynamicmodule">Dynamic modules</a> are
named modules that are generated at runtime. A dynamic module may or may
not be in a module layer. </p>

@return The module layer that contains this module

@see java.lang.reflect.Proxy

## Module.isNativeAccessEnabled()

```java
public boolean isNativeAccessEnabled()
```

Returns {@code true} if this module can access
<a href="{@docRoot}/java.base/java/lang/doc-files/RestrictedMethods.html#restricted"><em>restricted</em></a> methods.

@return {@code true} if this module can access <em>restricted</em> methods.
@since 22

## Module.canRead(Module)

```java
public boolean canRead(Module other)
```

Indicates if this module reads the given module. This method returns
{@code true} if invoked to test if this module reads itself. It also
returns {@code true} if invoked on an unnamed module (as unnamed
modules read all modules).

@param  other
        The other module

@return {@code true} if this module reads {@code other}

@see #addReads(Module)

## Module.addReads(Module)

```java
public Module addReads(Module other)
```

If the caller's module is this module then update this module to read
the given module.

This method is a no-op if {@code other} is this module (all modules read
themselves), this module is an unnamed module (as unnamed modules read
all modules), or this module already reads {@code other}.

@implNote <em>Read edges</em> added by this method are <em>weak</em> and
do not prevent {@code other} from being GC'ed when this module is
strongly reachable.

@param  other
        The other module

@return this module

@throws IllegalCallerException
        If this is a named module and the caller's module is not this
        module

@see #canRead

## Module.isExported(String, Module)

```java
public boolean isExported(String pn, Module other)
```

Returns {@code true} if this module exports the given package to at
least the given module.

<p> This method returns {@code true} if invoked to test if a package in
this module is exported to itself. It always returns {@code true} when
invoked on an unnamed module. A package that is {@link #isOpen open} to
the given module is considered exported to that module at run-time and
so this method returns {@code true} if the package is open to the given
module. </p>

<p> This method does not check if the given module reads this module. </p>

@param  pn
        The package name
@param  other
        The other module

@return {@code true} if this module exports the package to at least the
        given module

@see ModuleDescriptor#exports()
@see #addExports(String,Module)

## Module.isOpen(String, Module)

```java
public boolean isOpen(String pn, Module other)
```

Returns {@code true} if this module has <em>opened</em> a package to at
least the given module.

<p> This method returns {@code true} if invoked to test if a package in
this module is open to itself. It returns {@code true} when invoked on an
{@link ModuleDescriptor#isOpen open} module with a package in the module.
It always returns {@code true} when invoked on an unnamed module. </p>

<p> This method does not check if the given module reads this module. </p>

@apiNote A package {@code p} opened to module {@code M} allows code in
{@code M} do {@linkplain java.lang.reflect.AccessibleObject#setAccessible(boolean)
deep reflection} on all types in the package.
Further, if {@code M} reads this module, it can obtain a
{@link java.lang.invoke.MethodHandles.Lookup Lookup} object that is allowed to
{@link java.lang.invoke.MethodHandles.Lookup#defineClass(byte[]) define classes}
in package {@code p}.

@param  pn
        The package name
@param  other
        The other module

@return {@code true} if this module has <em>opened</em> the package
        to at least the given module

@see ModuleDescriptor#opens()
@see #addOpens(String,Module)
@see java.lang.reflect.AccessibleObject#setAccessible(boolean)
@see java.lang.invoke.MethodHandles#privateLookupIn

## Module.isExported(String)

```java
public boolean isExported(String pn)
```

Returns {@code true} if this module exports the given package
unconditionally.

<p> This method always returns {@code true} when invoked on an unnamed
module. A package that is {@link #isOpen(String) opened} unconditionally
is considered exported unconditionally at run-time and so this method
returns {@code true} if the package is opened unconditionally. </p>

<p> This method does not check if the given module reads this module. </p>

@param  pn
        The package name

@return {@code true} if this module exports the package unconditionally

@see ModuleDescriptor#exports()

## Module.isOpen(String)

```java
public boolean isOpen(String pn)
```

Returns {@code true} if this module has <em>opened</em> a package
unconditionally.

<p> This method always returns {@code true} when invoked on an unnamed
module. Additionally, it always returns {@code true} when invoked on an
{@link ModuleDescriptor#isOpen open} module with a package in the
module. </p>

<p> This method does not check if the given module reads this module. </p>

@apiNote A package {@code p} opened to module {@code M} allows code in
{@code M} do {@linkplain java.lang.reflect.AccessibleObject#setAccessible(boolean)
deep reflection} on all types in the package.
Further, if {@code M} reads this module, it can obtain a
{@link java.lang.invoke.MethodHandles.Lookup Lookup} object that is allowed to
{@link java.lang.invoke.MethodHandles.Lookup#defineClass(byte[]) define classes}
in package {@code p}.

@param  pn
        The package name

@return {@code true} if this module has <em>opened</em> the package
        unconditionally

@see ModuleDescriptor#opens()
@see java.lang.reflect.AccessibleObject#setAccessible(boolean)
@see java.lang.invoke.MethodHandles#privateLookupIn

## Module.addExports(String, Module)

```java
public Module addExports(String pn, Module other)
```

If the caller's module is this module then update this module to export
the given package to the given module.

<p> This method has no effect if the package is already exported (or
<em>open</em>) to the given module. </p>

@apiNote As specified in section {@jvms 5.4.3} of the <cite>The Java
Virtual Machine Specification </cite>, if an attempt to resolve a
symbolic reference fails because of a linkage error, then subsequent
attempts to resolve the reference always fail with the same error that
was thrown as a result of the initial resolution attempt.

@param  pn
        The package name
@param  other
        The module

@return this module

@throws IllegalArgumentException
        If {@code pn} is {@code null}, or this is a named module and the
        package {@code pn} is not a package in this module
@throws IllegalCallerException
        If this is a named module and the caller's module is not this
        module

@jvms 5.4.3 Resolution
@see #isExported(String,Module)

## Module.addOpens(String, Module)

```java
public Module addOpens(String pn, Module other)
```

If this module has <em>opened</em> a package to at least the caller
module then update this module to open the package to the given module.
Opening a package with this method allows all types in the package,
and all their members, not just public types and their public members,
to be reflected on by the given module when using APIs that support
private access or a way to bypass or suppress default Java language
access control checks.

<p> This method has no effect if the package is already <em>open</em>
to the given module. </p>

@apiNote This method can be used for cases where a <em>consumer
module</em> uses a qualified opens to open a package to an <em>API
module</em> but where the reflective access to the members of classes in
the consumer module is delegated to code in another module. Code in the
API module can use this method to open the package in the consumer module
to the other module.

@param  pn
        The package name
@param  other
        The module

@return this module

@throws IllegalArgumentException
        If {@code pn} is {@code null}, or this is a named module and the
        package {@code pn} is not a package in this module
@throws IllegalCallerException
        If this is a named module and this module has not opened the
        package to at least the caller's module

@see #isOpen(String,Module)
@see java.lang.reflect.AccessibleObject#setAccessible(boolean)
@see java.lang.invoke.MethodHandles#privateLookupIn

## Module.addUses(Class<?>)

```java
public Module addUses(Class<?> service)
```

If the caller's module is this module then update this module to add a
service dependence on the given service type. This method is intended
for use by frameworks that invoke {@link java.util.ServiceLoader
ServiceLoader} on behalf of other modules or where the framework is
passed a reference to the service type by other code. This method is
a no-op when invoked on an unnamed module or an automatic module.

<p> This method does not cause {@link Configuration#resolveAndBind
resolveAndBind} to be re-run. </p>

@param  service
        The service type

@return this module

@throws IllegalCallerException
        If this is a named module and the caller's module is not this
        module

@see #canUse(Class)
@see ModuleDescriptor#uses()

## Module.canUse(Class<?>)

```java
public boolean canUse(Class<?> service)
```

Indicates if this module has a service dependence on the given service
type. This method always returns {@code true} when invoked on an unnamed
module or an automatic module.

@param  service
        The service type

@return {@code true} if this module uses service type {@code st}

@see #addUses(Class)

## Module.getPackages()

```java
public Set<String> getPackages()
```

Returns the set of package names for the packages in this module.

<p> For named modules, the returned set contains an element for each
package in the module. </p>

<p> For unnamed modules, the returned set contains an element for
each package that {@link ClassLoader#getDefinedPackages() has been defined}
in the unnamed module.</p>

@return the set of the package names of the packages in this module

## Module.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

{@inheritDoc}
This method returns {@code null} when invoked on an unnamed module.

<p> Note that any annotation returned by this method is a
declaration annotation.

## Module.getAnnotations()

```java
public Annotation[] getAnnotations()
```

{@inheritDoc}
This method returns an empty array when invoked on an unnamed module.

<p> Note that any annotations returned by this method are
declaration annotations.

## Module.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

{@inheritDoc}
This method returns an empty array when invoked on an unnamed module.

<p> Note that any annotations returned by this method are
declaration annotations.

## Module.getResourceAsStream(String)

```java
public InputStream getResourceAsStream(String name) throws IOException
```

Returns an input stream for reading a resource in this module.
The {@code name} parameter is a {@code '/'}-separated path name that
identifies the resource. As with {@link Class#getResourceAsStream
Class.getResourceAsStream}, this method delegates to the module's class
loader {@link ClassLoader#findResource(String,String)
findResource(String,String)} method, invoking it with the module name
(or {@code null} when the module is unnamed) and the name of the
resource. If the resource name has a leading slash then it is dropped
before delegation.

<p> A resource in a named module may be <em>encapsulated</em> so that
it cannot be located by code in other modules. Whether a resource can be
located or not is determined as follows: </p>

<ul>
    <li> If the resource name ends with  "{@code .class}" then it is not
    encapsulated. </li>

    <li> A <em>package name</em> is derived from the resource name. If
    the package name is a {@linkplain #getPackages() package} in the
    module then the resource can only be located by the caller of this
    method when the package is {@linkplain #isOpen(String,Module) open}
    to at least the caller's module. If the resource is not in a
    package in the module then the resource is not encapsulated. </li>
</ul>

<p> In the above, the <em>package name</em> for a resource is derived
from the subsequence of characters that precedes the last {@code '/'} in
the name and then replacing each {@code '/'} character in the subsequence
with {@code '.'}. A leading slash is ignored when deriving the package
name. As an example, the package name derived for a resource named
"{@code a/b/c/foo.properties}" is "{@code a.b.c}". A resource name
with the name "{@code META-INF/MANIFEST.MF}" is never encapsulated
because "{@code META-INF}" is not a legal package name. </p>

<p> This method returns {@code null} if the resource is not in this module
or the resource is encapsulated and cannot be located by the caller. </p>

@param  name
        The resource name

@return An input stream for reading the resource or {@code null}

@throws IOException
        If an I/O error occurs

@see Class#getResourceAsStream(String)

## Module.toString()

```java
public String toString()
```

Returns the string representation of this module. For a named module,
the representation is the string {@code "module"}, followed by a space,
and then the module name. For an unnamed module, the representation is
the string {@code "unnamed module"}, followed by a space, and then an
implementation specific string that identifies the unnamed module.

@return The string representation of this module