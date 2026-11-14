# AccessibleObject class (java.lang.reflect)

```java
public class AccessibleObject implements AnnotatedElement
```

The {@code AccessibleObject} class is the base class for {@code Field},
{@code Method}, and {@code Constructor} objects (known as <em>reflected
objects</em>). It provides the ability to flag a reflected object as
suppressing checks for Java language access control when it is used. This
permits sophisticated applications with sufficient privilege, such as Java
Object Serialization or other persistence mechanisms, to manipulate objects
in a manner that would normally be prohibited.

<p> Java language access control prevents use of private members outside
their top-level class; package access members outside their package; protected members
outside their package or subclasses; and public members outside their
module unless they are declared in an {@link Module#isExported(String,Module)
exported} package and the user {@link Module#canRead reads} their module. By
default, Java language access control is enforced (with one variation) when
{@code Field}s, {@code Method}s, or {@code Constructor}s are used to get or
set fields, to invoke methods, or to create and initialize new instances of
classes, respectively. Every reflected object checks that the code using it
is in an appropriate class, package, or module. The check when invoked by
<a href="{@docRoot}/../specs/jni/index.html">JNI code</a> with no Java
class on the stack only succeeds if the member and the declaring class are
public, and the class is in a package that is exported to all modules. </p>

<p> The one variation from Java language access control is that the checks
by reflected objects assume readability. That is, the module containing
the use of a reflected object is assumed to read the module in which
the underlying field, method, or constructor is declared. </p>

<p> Whether the checks for Java language access control can be suppressed
(and thus, whether access can be enabled) depends on whether the reflected
object corresponds to a member in an exported or open package
(see {@link #setAccessible(boolean)}). </p>

@spec jni/index.html Java Native Interface Specification
@jls 6.6 Access Control
@since 1.2

## AccessibleObject.setAccessible(AccessibleObject[], boolean)

```java
public static void setAccessible(AccessibleObject[] array, boolean flag)
```

Convenience method to set the {@code accessible} flag for an
array of reflected objects.

<p> This method may be used to enable access to all reflected objects in
the array when access to each reflected object can be enabled as
specified by {@link #setAccessible(boolean) setAccessible(boolean)}. </p>

<p>A {@code SecurityException} is thrown if any of the elements of
the input {@code array} is a {@link java.lang.reflect.Constructor}
object for the class {@code java.lang.Class} and {@code flag} is true.

@param array the array of AccessibleObjects
@param flag  the new value for the {@code accessible} flag
             in each object
@throws InaccessibleObjectException if access cannot be enabled for all
        objects in the array
@throws SecurityException if an element in the array is a constructor for {@code
        java.lang.Class}

## AccessibleObject.setAccessible(boolean)

```java
public void setAccessible(boolean flag)
```

Set the {@code accessible} flag for this reflected object to
the indicated boolean value.  A value of {@code true} indicates that
the reflected object should suppress checks for Java language access
control when it is used. A value of {@code false} indicates that
the reflected object should enforce checks for Java language access
control when it is used, with the variation noted in the class description.

<p> This method may be used by a caller in class {@code C} to enable
access to a {@link Member member} of {@link Member#getDeclaringClass()
declaring class} {@code D} if any of the following hold: </p>

<ul>
    <li> {@code C} and {@code D} are in the same module. </li>

    <li> The member is {@code public} and {@code D} is {@code public} in
    a package that the module containing {@code D} {@link
    Module#isExported(String,Module) exports} to at least the module
    containing {@code C}. </li>

    <li> The member is {@code protected} {@code static}, {@code D} is
    {@code public} in a package that the module containing {@code D}
    exports to at least the module containing {@code C}, and {@code C}
    is a subclass of {@code D}. </li>

    <li> {@code D} is in a package that the module containing {@code D}
    {@link Module#isOpen(String,Module) opens} to at least the module
    containing {@code C}.
    All packages in unnamed and open modules are open to all modules and
    so this method always succeeds when {@code D} is in an unnamed or
    open module. </li>
</ul>

<p> This method may be used by <a href="{@docRoot}/../specs/jni/index.html">JNI code</a>
with no caller class on the stack to enable access to a {@link Member member}
of {@link Member#getDeclaringClass() declaring class} {@code D} if and only if:
<ul>
    <li> The member is {@code public} and {@code D} is {@code public} in
    a package that the module containing {@code D} {@link
    Module#isExported(String,Module) exports} unconditionally. </li>
</ul>

<p> This method cannot be used to enable access to private members,
members with default (package) access, protected instance members, or
protected constructors when the declaring class is in a different module
to the caller and the package containing the declaring class is not open
to the caller's module. </p>

<p> This method cannot be used to enable {@linkplain Field#set <em>write</em>}
access to a <em>non-modifiable</em> final field.  The following fields
are non-modifiable:
<ul>
<li>static final fields declared in any class or interface</li>
<li>final fields declared in a {@linkplain Class#isHidden() hidden class}</li>
<li>final fields declared in a {@linkplain Class#isRecord() record}</li>
</ul>
<p> The {@code accessible} flag when {@code true} suppresses Java language access
control checks to only enable {@linkplain Field#get <em>read</em>} access to
these non-modifiable final fields.

@param flag the new value for the {@code accessible} flag
@throws InaccessibleObjectException if access cannot be enabled

@spec jni/index.html Java Native Interface Specification
@see #trySetAccessible
@see java.lang.invoke.MethodHandles#privateLookupIn

## AccessibleObject.trySetAccessible()

```java
public final boolean trySetAccessible()
```

Set the {@code accessible} flag for this reflected object to {@code true}
if possible. This method sets the {@code accessible} flag, as if by
invoking {@link #setAccessible(boolean) setAccessible(true)}, and returns
the possibly-updated value for the {@code accessible} flag. If access
cannot be enabled, i.e. the checks or Java language access control cannot
be suppressed, this method returns {@code false} (as opposed to {@code
setAccessible(true)} throwing {@code InaccessibleObjectException} when
it fails).

<p> This method is a no-op if the {@code accessible} flag for
this reflected object is {@code true}.

<p> For example, a caller can invoke {@code trySetAccessible}
on a {@code Method} object for a private instance method
{@code p.T::privateMethod} to suppress the checks for Java language access
control when the {@code Method} is invoked.
If {@code p.T} class is in a different module to the caller and
package {@code p} is open to at least the caller's module,
the code below successfully sets the {@code accessible} flag
to {@code true}.

<pre>
{@code
    p.T obj = ....;  // instance of p.T
    :
    Method m = p.T.class.getDeclaredMethod("privateMethod");
    if (m.trySetAccessible()) {
        m.invoke(obj);
    } else {
        // package p is not opened to the caller to access private member of T
        ...
    }
}</pre>

<p> If this method is invoked by <a href="{@docRoot}/../specs/jni/index.html">JNI code</a>
with no caller class on the stack, the {@code accessible} flag can
only be set if the member and the declaring class are public, and
the class is in a package that is exported unconditionally. </p>

@return {@code true} if the {@code accessible} flag is set to {@code true};
        {@code false} if access cannot be enabled.

@spec jni/index.html Java Native Interface Specification
@since 9
@see java.lang.invoke.MethodHandles#privateLookupIn

## AccessibleObject.isAccessible()

```java
public boolean isAccessible()
```

Get the value of the {@code accessible} flag for this reflected object.

@return the value of the object's {@code accessible} flag

@deprecated
This method is deprecated because its name hints that it checks
if the reflected object is accessible when it actually indicates
if the checks for Java language access control are suppressed.
This method may return {@code false} on a reflected object that is
accessible to the caller. To test if this reflected object is accessible,
it should use {@link #canAccess(Object)}.

## AccessibleObject.canAccess(Object)

```java
public final boolean canAccess(Object obj)
```

Test if the caller can access this reflected object. If this reflected
object corresponds to an instance method or field then this method tests
if the caller can access the given {@code obj} with the reflected object.
For instance methods or fields then the {@code obj} argument must be an
instance of the {@link Member#getDeclaringClass() declaring class}. For
static members and constructors then {@code obj} must be {@code null}.

<p> This method returns {@code true} if the {@code accessible} flag
is set to {@code true}, i.e. the checks for Java language access control
are suppressed, or if the caller can access the member as
specified in <cite>The Java Language Specification</cite>,
with the variation noted in the class description.
If this method is invoked by <a href="{@docRoot}/../specs/jni/index.html">JNI code</a>
with no caller class on the stack, this method returns {@code true}
if the member and the declaring class are public, and the class is in
a package that is exported unconditionally. </p>

@param obj an instance object of the declaring class of this reflected
           object if it is an instance method or field

@return {@code true} if the caller can access this reflected object.

@throws IllegalArgumentException
        <ul>
        <li> if this reflected object is a static member or constructor and
             the given {@code obj} is non-{@code null}, or </li>
        <li> if this reflected object is an instance method or field
             and the given {@code obj} is {@code null} or of type
             that is not a subclass of the {@link Member#getDeclaringClass()
             declaring class} of the member.</li>
        </ul>

@spec jni/index.html Java Native Interface Specification
@since 9
@jls 6.6 Access Control
@see #trySetAccessible
@see #setAccessible(boolean)

## AccessibleObject.AccessibleObject()

```java
protected AccessibleObject()
```

Constructor: only used by the Java Virtual Machine.

## AccessibleObject.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

{@inheritDoc}

<p> Note that any annotation returned by this method is a
declaration annotation.

@implSpec
The default implementation throws {@link
UnsupportedOperationException}; subclasses should override this method.

@throws NullPointerException {@inheritDoc}
@since 1.5

## AccessibleObject.isAnnotationPresent(Class<? extends Annotation>)

```java
public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass)
```

{@inheritDoc}

@throws NullPointerException {@inheritDoc}
@since 1.5

## AccessibleObject.getAnnotationsByType(Class<T>)

```java
public <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass)
```

{@inheritDoc}

<p> Note that any annotations returned by this method are
declaration annotations.

@implSpec
The default implementation throws {@link
UnsupportedOperationException}; subclasses should override this method.

@throws NullPointerException {@inheritDoc}
@since 1.8

## AccessibleObject.getAnnotations()

```java
public Annotation[] getAnnotations()
```

{@inheritDoc}

<p> Note that any annotations returned by this method are
declaration annotations.

@since 1.5

## AccessibleObject.getDeclaredAnnotation(Class<T>)

```java
public <T extends Annotation> T getDeclaredAnnotation(Class<T> annotationClass)
```

{@inheritDoc}

<p> Note that any annotation returned by this method is a
declaration annotation.

@throws NullPointerException {@inheritDoc}
@since 1.8

## AccessibleObject.getDeclaredAnnotationsByType(Class<T>)

```java
public <T extends Annotation> T[] getDeclaredAnnotationsByType(Class<T> annotationClass)
```

{@inheritDoc}

<p> Note that any annotations returned by this method are
declaration annotations.

@throws NullPointerException {@inheritDoc}
@since 1.8

## AccessibleObject.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

{@inheritDoc}

<p> Note that any annotations returned by this method are
declaration annotations.

@implSpec
The default implementation throws {@link
UnsupportedOperationException}; subclasses should override this method.

@since 1.5