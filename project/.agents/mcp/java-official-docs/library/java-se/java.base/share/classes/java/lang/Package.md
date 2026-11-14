# Package class (java.lang)

```java
public final class Package extends NamedPackage implements java.lang.reflect.AnnotatedElement
```

Represents metadata about a run-time package associated with a class loader.
Metadata includes annotations, versioning, and sealing.
<p>
Annotations for the run-time package are read from {@code package-info.class}
at the same code source as classes in the run-time package.
<p>
The set of classes that make up the run-time package may implement a
particular specification. The specification title, version, and vendor
(indicating the owner/maintainer of the specification) can be provided
when the {@code Package} is defined. An application can ask if the
{@code Package} is compatible with a particular specification version
by using the {@link #isCompatibleWith Package.isCompatibleWith(String)}
method. In addition, information about the actual classes that make up the
run-time package can be provided when the {@code Package} is defined.
This information consists of an implementation title, version, and vendor
(indicating the supplier of the classes).
<p>
A {@code Package} may be explicitly defined with
the {@link ClassLoader#definePackage(String, String, String, String,
String, String, String, URL)} method.
The caller supplies the specification and implementation titles, versions, and
vendors. The caller also indicates whether the package is
{@linkplain java.util.jar.Attributes.Name#SEALED sealed}.
If a {@code Package} is not explicitly defined for a run-time package when
a class in that run-time package is defined, then a {@code Package} is
automatically defined by the class's defining class loader, as follows.
<p>
A {@code Package} automatically defined for classes in a named module has
the following properties:
<ul>
<li>The name of the package is derived from the {@linkplain Class#getName() binary names}
    of the classes. Since classes in a named module must be in a named package,
    the derived name is never empty.</li>
<li>The package is sealed with the {@linkplain java.lang.module.ModuleReference#location()
    module location} as the code source, if known.</li>
<li>The specification and implementation titles, versions, and vendors
    are unspecified.</li>
<li>Any annotations on the package are read from {@code package-info.class}
    as specified above.</li>
</ul>
<p>
A {@code Package} automatically defined for classes in an unnamed module
has the following properties:
<ul>
<li>The name of the package is either {@code ""} (for classes in an unnamed package)
    or derived from the {@linkplain Class#getName() binary names} of the classes
    (for classes in a named package).</li>
<li>The package is not sealed.</li>
<li>The specification and implementation titles, versions, and vendors
    are unspecified.</li>
<li>Any annotations on the package are read from {@code package-info.class}
    as specified above.</li>
</ul>

<p>
A {@code Package} can be obtained with the {@link Package#getPackage
Package.getPackage(String)} and {@link ClassLoader#getDefinedPackage
ClassLoader.getDefinedPackage(String)} methods.
Every {@code Package} defined by a class loader can be obtained
with the {@link Package#getPackages Package.getPackages()} and
{@link ClassLoader#getDefinedPackages} methods.

@implNote
The <a href="ClassLoader.html#builtinLoaders">builtin class loaders</a>
do not explicitly define {@code Package} objects for packages in
<em>named modules</em>.  Instead those packages are automatically defined
and have no specification and implementation versioning information.

@jvms 5.3 Creation and Loading
@see <a href="{@docRoot}/../specs/jar/jar.html#package-sealing">
The JAR File Specification: Package Sealing</a>
@see ClassLoader#definePackage(String, String, String, String, String, String, String, URL)

@since 1.2

## Package.getName()

```java
public String getName()
```

Return the name of this package.

@return  The fully-qualified name of this package as defined in section {@jls 6.5.3} of
         <cite>The Java Language Specification</cite>,
         for example, {@code java.lang}

## Package.getSpecificationTitle()

```java
public String getSpecificationTitle()
```

Return the title of the specification that this package implements.
@return the specification title, {@code null} is returned if it is not known.

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


<p>Specification version numbers use a syntax that consists of non-negative
decimal integers separated by periods ".", for example "2.0" or
"1.2.3.4.5.6.7".  This allows an extensible number to be used to represent
major, minor, micro, etc. versions.  The version specification is described
by the following formal grammar:
<blockquote>
<dl>
<dt><i>SpecificationVersion:</i>
<dd><i>Digits RefinedVersion<sub>opt</sub></i>

<dt><i>RefinedVersion:</i>
<dd>{@code .} <i>Digits</i>
<dd>{@code .} <i>Digits RefinedVersion</i>

<dt><i>Digits:</i>
<dd><i>Digit</i>
<dd><i>Digits</i>

<dt><i>Digit:</i>
<dd>any character for which {@link Character#isDigit} returns {@code true},
e.g. 0, 1, 2, ...
</dl>
</blockquote>

@return the specification version, {@code null} is returned if it is not known.

## Package.getSpecificationVendor()

```java
public String getSpecificationVendor()
```

Return the name of the organization, vendor,
or company that owns and maintains the specification
of the classes that implement this package.
@return the specification vendor, {@code null} is returned if it is not known.

## Package.getImplementationTitle()

```java
public String getImplementationTitle()
```

Return the title of this package.
@return the title of the implementation, {@code null} is returned if it is not known.

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
@return the version of the implementation, {@code null} is returned if it is not known.

## Package.getImplementationVendor()

```java
public String getImplementationVendor()
```

Returns the vendor that implemented this package, {@code null}
is returned if it is not known.
@return the vendor that implemented this package, {@code null}
is returned if it is not known.

## Package.isSealed()

```java
public boolean isSealed()
```

Returns true if this package is sealed.

@apiNote
<a href="{@docRoot}/../specs/jar/jar.html#package-sealing">Package sealing</a>
has no relationship with {@linkplain Class#isSealed() sealed classes or interfaces}.
Package sealing is specific to JAR files defined for classes in an unnamed module.
See the {@link Package Package} class specification for details
how a {@code Package} is defined as sealed package.

@return true if the package is sealed, false otherwise

## Package.isSealed(URL)

```java
public boolean isSealed(URL url)
```

Returns true if this package is sealed with respect to the specified
code source {@code url}.

@apiNote
<a href="{@docRoot}/../specs/jar/jar.html#package-sealing">Package sealing</a>
has no relationship with {@linkplain Class#isSealed() sealed classes or interfaces}.
Package sealing is specific to JAR files defined for classes in an unnamed module.
See the {@link Package Package} class specification for details
how a {@code Package} is defined as sealed package.

@param  url the code source URL
@return true if this package is sealed with respect to the given {@code url}

## Package.isCompatibleWith(String)

```java
public boolean isCompatibleWith(String desired) throws NumberFormatException
```

Compare this package's specification version with a
desired version. It returns true if
this packages specification version number is greater than or equal
to the desired version number. <p>

Version numbers are compared by sequentially comparing corresponding
components of the desired and specification strings.
Each component is converted as a decimal integer and the values
compared.
If the specification value is greater than the desired
value true is returned. If the value is less false is returned.
If the values are equal the period is skipped and the next pair of
components is compared.

@param  desired the version string of the desired version.
@return true if this package's version number is greater
        than or equal to the desired version number

@throws NumberFormatException if the current version is not known or
        the desired or current version is not of the correct dotted form.

## Package.getPackage(String)

```java
public static Package getPackage(String name)
```

Finds a package by name in the caller's class loader and its
ancestors.
<p>
If the caller's class loader defines a {@code Package} of the given name,
the {@code Package} is returned. Otherwise, the ancestors of the
caller's class loader are searched recursively (parent by parent)
for a {@code Package} of the given name.
<p>
Calling this method is equivalent to calling {@link ClassLoader#getPackage}
on a {@code ClassLoader} instance which is the caller's class loader.

@param name A package name, such as "{@code java.lang}".
@return The {@code Package} of the given name defined by the caller's
        class loader or its ancestors, or {@code null} if not found.

@throws NullPointerException
        if {@code name} is {@code null}.

@deprecated
If multiple class loaders delegate to each other and define classes
with the same package name, and one such loader relies on the lookup
behavior of {@code getPackage} to return a {@code Package} from
a parent loader, then the properties exposed by the {@code Package}
may not be as expected in the rest of the program.
For example, the {@code Package} will only expose annotations from the
{@code package-info.class} file defined by the parent loader, even if
annotations exist in a {@code package-info.class} file defined by
a child loader.  A more robust approach is to use the
{@link ClassLoader#getDefinedPackage} method which returns
a {@code Package} for the specified class loader.

@see ClassLoader#getDefinedPackage

## Package.getPackages()

```java
public static Package[] getPackages()
```

Returns all of the {@code Package}s defined by the caller's class loader
and its ancestors.  The returned array may contain more than one
{@code Package} object of the same package name, each defined by
a different class loader in the class loader hierarchy.
<p>
Calling this method is equivalent to calling {@link ClassLoader#getPackages}
on a {@code ClassLoader} instance which is the caller's class loader.

@return  The array of {@code Package} objects defined by this
         class loader and its ancestors

@see ClassLoader#getDefinedPackages

## Package.hashCode()

```java
public int hashCode()
```

Return the hash code computed from the package name.
@return the hash code computed from the package name.

## Package.toString()

```java
public String toString()
```

Returns the string representation of this Package.
Its value is the string "package " and the package name.
If the package title is defined it is appended.
If the package version is defined it is appended.
@return the string representation of the package.

## Package.getAnnotation(Class<A>)

```java
public <A extends Annotation> A getAnnotation(Class<A> annotationClass)
```

{@inheritDoc}
<p>Note that any annotation returned by this method is a
declaration annotation.

@throws NullPointerException {@inheritDoc}
@since 1.5

## Package.isAnnotationPresent(Class<? extends Annotation>)

```java
public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass)
```

{@inheritDoc}
@throws NullPointerException {@inheritDoc}
@since 1.5

## Package.getAnnotationsByType(Class<A>)

```java
public <A extends Annotation> A[] getAnnotationsByType(Class<A> annotationClass)
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.

@throws NullPointerException {@inheritDoc}
@since 1.8

## Package.getAnnotations()

```java
public Annotation[] getAnnotations()
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.
@since 1.5

## Package.getDeclaredAnnotation(Class<A>)

```java
public <A extends Annotation> A getDeclaredAnnotation(Class<A> annotationClass)
```

{@inheritDoc}
<p>Note that any annotation returned by this method is a
declaration annotation.

@throws NullPointerException {@inheritDoc}
@since 1.8

## Package.getDeclaredAnnotationsByType(Class<A>)

```java
public <A extends Annotation> A[] getDeclaredAnnotationsByType(Class<A> annotationClass)
```

@throws NullPointerException {@inheritDoc}
@since 1.8

## Package.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.
@since 1.5