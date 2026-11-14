# Constructor class (java.lang.reflect)

```java
public final class Constructor<T> extends Executable
```

{@code Constructor} provides information about, and access to, a single
constructor for a class.

<p>{@code Constructor} permits widening conversions to occur when matching the
actual parameters to newInstance() with the underlying
constructor's formal parameters, but throws an
{@code IllegalArgumentException} if a narrowing conversion would occur.

@param <T> the class in which the constructor is declared

@see Member
@see java.lang.Class
@see java.lang.Class#getConstructors()
@see java.lang.Class#getConstructor(Class[])
@see java.lang.Class#getDeclaredConstructors()

@author      Kenneth Russell
@author      Nakul Saraiya
@since 1.1

## Constructor.setAccessible(boolean)

```java
public void setAccessible(boolean flag)
```

{@inheritDoc}

<p> A {@code SecurityException} is thrown if this object is a
{@code Constructor} object for the class {@code Class} and {@code flag}
is true. </p>

@param flag {@inheritDoc}

@throws InaccessibleObjectException {@inheritDoc}
@throws SecurityException if this is a constructor for {@code java.lang.Class}

## Constructor.getDeclaringClass()

```java
public Class<T> getDeclaringClass()
```

Returns the {@code Class} object representing the class that
declares the constructor represented by this object.

## Constructor.getName()

```java
public String getName()
```

Returns the name of this constructor, as a string.  This is
the binary name of the constructor's declaring class.

## Constructor.getModifiers()

```java
public int getModifiers()
```

{@inheritDoc}
@jls 8.8.3 Constructor Modifiers

## Constructor.getTypeParameters()

```java
public TypeVariable<Constructor<T>>[] getTypeParameters()
```

{@inheritDoc}
@throws GenericSignatureFormatError {@inheritDoc}
@since 1.5

## Constructor.getParameterTypes()

```java
public Class<?>[] getParameterTypes()
```

{@inheritDoc}

## Constructor.getParameterCount()

```java
public int getParameterCount()
```

{@inheritDoc}
@since 1.8

## Constructor.getGenericParameterTypes()

```java
public Type[] getGenericParameterTypes()
```

{@inheritDoc}
@throws GenericSignatureFormatError {@inheritDoc}
@throws TypeNotPresentException {@inheritDoc}
@throws MalformedParameterizedTypeException {@inheritDoc}
@since 1.5

## Constructor.getExceptionTypes()

```java
public Class<?>[] getExceptionTypes()
```

{@inheritDoc}

## Constructor.getGenericExceptionTypes()

```java
public Type[] getGenericExceptionTypes()
```

{@inheritDoc}
@throws GenericSignatureFormatError {@inheritDoc}
@throws TypeNotPresentException {@inheritDoc}
@throws MalformedParameterizedTypeException {@inheritDoc}
@since 1.5

## Constructor.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this {@code Constructor} against the specified object.
Returns true if the objects are the same.  Two {@code Constructor} objects are
the same if they were declared by the same class and have the
same formal parameter types.

## Constructor.hashCode()

```java
public int hashCode()
```

Returns a hashcode for this {@code Constructor}. The hashcode is
the same as the hashcode for the underlying constructor's
declaring class name.

## Constructor.toString()

```java
public String toString()
```

Returns a string describing this {@code Constructor}.  The string is
formatted as the constructor access modifiers, if any,
followed by the fully-qualified name of the declaring class,
followed by a parenthesized, comma-separated list of the
constructor's formal parameter types.  For example:
<pre>{@code
   public java.util.HashMap(int,float)
}</pre>

<p>If the constructor is declared to throw exceptions, the
parameter list is followed by a space, followed by the word
"{@code throws}" followed by a comma-separated list of the
thrown exception types.

<p>The only possible modifiers for constructors are the access
modifiers {@code public}, {@code protected} or
{@code private}.  Only one of these may appear, or none if the
constructor has default (package) access.

@return a string describing this {@code Constructor}
@jls 8.8.3 Constructor Modifiers
@jls 8.9.2 Enum Body Declarations

## Constructor.toGenericString()

```java
public String toGenericString()
```

Returns a string describing this {@code Constructor},
including type parameters.  The string is formatted as the
constructor access modifiers, if any, followed by an
angle-bracketed comma separated list of the constructor's type
parameters, if any, including  informative bounds of the
type parameters, if any, followed by the fully-qualified name of the
declaring class, followed by a parenthesized, comma-separated
list of the constructor's generic formal parameter types.

If this constructor was declared to take a variable number of
arguments, instead of denoting the last parameter as
"<code><i>Type</i>[]</code>", it is denoted as
"<code><i>Type</i>...</code>".

A space is used to separate access modifiers from one another
and from the type parameters or class name.  If there are no
type parameters, the type parameter list is elided; if the type
parameter list is present, a space separates the list from the
class name.  If the constructor is declared to throw
exceptions, the parameter list is followed by a space, followed
by the word "{@code throws}" followed by a
comma-separated list of the generic thrown exception types.

<p>The only possible modifiers for constructors are the access
modifiers {@code public}, {@code protected} or
{@code private}.  Only one of these may appear, or none if the
constructor has default (package) access.

@return a string describing this {@code Constructor},
include type parameters

@since 1.5
@jls 8.8.3 Constructor Modifiers
@jls 8.9.2 Enum Body Declarations

## Constructor.newInstance(Object ...)

```java
public T newInstance(Object ... initargs) throws InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException
```

Uses the constructor represented by this {@code Constructor} object to
create and initialize a new instance of the constructor's
declaring class, with the specified initialization parameters.
Individual parameters are automatically unwrapped to match
primitive formal parameters, and both primitive and reference
parameters are subject to method invocation conversions as necessary.

<p>If the number of formal parameters required by the underlying constructor
is 0, the supplied {@code initargs} array may be of length 0 or null.

<p>If the constructor's declaring class is an inner class in a
non-static context, the first argument to the constructor needs
to be the enclosing instance; see section {@jls 15.9.3} of
<cite>The Java Language Specification</cite>.

<p>If the required access and argument checks succeed and the
instantiation will proceed, the constructor's declaring class
is initialized if it has not already been initialized.

<p>If the constructor completes normally, returns the newly
created and initialized instance.

@param initargs array of objects to be passed as arguments to
the constructor call; values of primitive types are wrapped in
a wrapper object of the appropriate type (e.g. a {@code float}
in a {@link java.lang.Float Float})

@return a new object created by calling the constructor
this object represents

@throws    IllegalAccessException    if this {@code Constructor} object
             is enforcing Java language access control and the underlying
             constructor is inaccessible.
@throws    IllegalArgumentException  if the number of actual
             and formal parameters differ; if an unwrapping
             conversion for primitive arguments fails; or if,
             after possible unwrapping, a parameter value
             cannot be converted to the corresponding formal
             parameter type by a method invocation conversion; if
             this constructor pertains to an enum class.
@throws    InstantiationException    if the class that declares the
             underlying constructor represents an abstract class.
@throws    InvocationTargetException if the underlying constructor
             throws an exception.
@throws    ExceptionInInitializerError if the initialization provoked
             by this method fails.

## Constructor.isVarArgs()

```java
public boolean isVarArgs()
```

{@inheritDoc}
@since 1.5
@jls 8.4.1 Formal Parameters

## Constructor.isSynthetic()

```java
public boolean isSynthetic()
```

{@inheritDoc}
@jls 13.1 The Form of a Binary
@jvms 4.6 Methods
@since 1.5
@see <a
href="{@docRoot}/java.base/java/lang/reflect/package-summary.html#LanguageJvmModel">Java
programming language and JVM modeling in core reflection</a>

## Constructor.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

{@inheritDoc}

@throws NullPointerException  {@inheritDoc}
@since 1.5

## Constructor.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

{@inheritDoc}
@since 1.5

## Constructor.getParameterAnnotations()

```java
public Annotation[][] getParameterAnnotations()
```

{@inheritDoc}
@since 1.5

## Constructor.getAnnotatedReturnType()

```java
public AnnotatedType getAnnotatedReturnType()
```

{@inheritDoc}
@since 1.8

## Constructor.getAnnotatedReceiverType()

```java
public AnnotatedType getAnnotatedReceiverType()
```

{@inheritDoc}
@since 1.8