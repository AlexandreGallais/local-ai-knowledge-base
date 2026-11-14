# Method class (java.lang.reflect)

```java
public final class Method extends Executable
```

A {@code Method} provides information about, and access to, a single method
on a class or interface.  The reflected method may be a class method
or an instance method (including an abstract method).

<p>A {@code Method} permits widening conversions to occur when matching the
actual parameters to invoke with the underlying method's formal
parameters, but it throws an {@code IllegalArgumentException} if a
narrowing conversion would occur.

@see Member
@see java.lang.Class
@see java.lang.Class#getMethods()
@see java.lang.Class#getMethod(String, Class[])
@see java.lang.Class#getDeclaredMethods()
@see java.lang.Class#getDeclaredMethod(String, Class[])

@author Kenneth Russell
@author Nakul Saraiya
@since 1.1

## Method.setAccessible(boolean)

```java
public void setAccessible(boolean flag)
```

@throws InaccessibleObjectException {@inheritDoc}

## Method.getDeclaringClass()

```java
public Class<?> getDeclaringClass()
```

Returns the {@code Class} object representing the class or interface
that declares the method represented by this object.

## Method.getName()

```java
public String getName()
```

Returns the name of the method represented by this {@code Method}
object, as a {@code String}.

## Method.getModifiers()

```java
public int getModifiers()
```

{@inheritDoc}
@jls 8.4.3 Method Modifiers

## Method.getTypeParameters()

```java
public TypeVariable<Method>[] getTypeParameters()
```

{@inheritDoc}
@throws GenericSignatureFormatError {@inheritDoc}
@since 1.5
@jls 8.4.4 Generic Methods

## Method.getReturnType()

```java
public Class<?> getReturnType()
```

Returns a {@code Class} object that represents the formal return type
of the method represented by this {@code Method} object.

@return the return type for the method this object represents

## Method.getGenericReturnType()

```java
public Type getGenericReturnType()
```

Returns a {@code Type} object that represents the formal return
type of the method represented by this {@code Method} object.

<p>If the return type is a parameterized type,
the {@code Type} object returned must accurately reflect
the actual type arguments used in the source code.

<p>If the return type is a type variable or a parameterized type, it
is created. Otherwise, it is resolved.

@return  a {@code Type} object that represents the formal return
    type of the underlying  method
@throws GenericSignatureFormatError
    if the generic method signature does not conform to the format
    specified in
    <cite>The Java Virtual Machine Specification</cite>
@throws TypeNotPresentException if the underlying method's
    return type refers to a non-existent class or interface declaration
@throws MalformedParameterizedTypeException if the
    underlying method's return type refers to a parameterized
    type that cannot be instantiated for any reason
@since 1.5

## Method.getParameterTypes()

```java
public Class<?>[] getParameterTypes()
```

{@inheritDoc}

## Method.getParameterCount()

```java
public int getParameterCount()
```

{@inheritDoc}
@since 1.8

## Method.getGenericParameterTypes()

```java
public Type[] getGenericParameterTypes()
```

{@inheritDoc}
@throws GenericSignatureFormatError {@inheritDoc}
@throws TypeNotPresentException {@inheritDoc}
@throws MalformedParameterizedTypeException {@inheritDoc}
@since 1.5

## Method.getExceptionTypes()

```java
public Class<?>[] getExceptionTypes()
```

{@inheritDoc}

## Method.getGenericExceptionTypes()

```java
public Type[] getGenericExceptionTypes()
```

{@inheritDoc}
@throws GenericSignatureFormatError {@inheritDoc}
@throws TypeNotPresentException {@inheritDoc}
@throws MalformedParameterizedTypeException {@inheritDoc}
@since 1.5

## Method.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this {@code Method} against the specified object.  Returns
true if the objects are the same.  Two {@code Methods} are the same if
they were declared by the same class and have the same name
and formal parameter types and return type.

## Method.hashCode()

```java
public int hashCode()
```

Returns a hashcode for this {@code Method}.  The hashcode is computed
as the exclusive-or of the hashcodes for the underlying
method's declaring class name and the method's name.

## Method.toString()

```java
public String toString()
```

Returns a string describing this {@code Method}.  The string is
formatted as the method access modifiers, if any, followed by
the method return type, followed by a space, followed by the
class declaring the method, followed by a period, followed by
the method name, followed by a parenthesized, comma-separated
list of the method's formal parameter types. If the method
throws checked exceptions, the parameter list is followed by a
space, followed by the word "{@code throws}" followed by a
comma-separated list of the thrown exception types.
For example:
<pre>
   public boolean java.lang.Object.equals(java.lang.Object)
</pre>

<p>The access modifiers are placed in canonical order as
specified by "The Java Language Specification".  This is
{@code public}, {@code protected} or {@code private} first,
and then other modifiers in the following order:
{@code abstract}, {@code default}, {@code static}, {@code final},
{@code synchronized}, {@code native}, {@code strictfp}.

@return a string describing this {@code Method}

@jls 8.4.3 Method Modifiers
@jls 9.4 Method Declarations
@jls 9.6.1 Annotation Interface Elements

## Method.toGenericString()

```java
public String toGenericString()
```

Returns a string describing this {@code Method}, including type
parameters.  The string is formatted as the method access
modifiers, if any, followed by an angle-bracketed
comma-separated list of the method's type parameters, if any,
including informative bounds of the type parameters, if any,
followed by the method's generic return type, followed by a
space, followed by the class declaring the method, followed by
a period, followed by the method name, followed by a
parenthesized, comma-separated list of the method's generic
formal parameter types.

If this method was declared to take a variable number of
arguments, instead of denoting the last parameter as
"<code><i>Type</i>[]</code>", it is denoted as
"<code><i>Type</i>...</code>".

A space is used to separate access modifiers from one another
and from the type parameters or return type.  If there are no
type parameters, the type parameter list is elided; if the type
parameter list is present, a space separates the list from the
class name.  If the method is declared to throw exceptions, the
parameter list is followed by a space, followed by the word
"{@code throws}" followed by a comma-separated list of the generic
thrown exception types.

<p>The access modifiers are placed in canonical order as
specified by "The Java Language Specification".  This is
{@code public}, {@code protected} or {@code private} first,
and then other modifiers in the following order:
{@code abstract}, {@code default}, {@code static}, {@code final},
{@code synchronized}, {@code native}, {@code strictfp}.

@return a string describing this {@code Method},
include type parameters

@since 1.5

@jls 8.4.3 Method Modifiers
@jls 9.4 Method Declarations
@jls 9.6.1 Annotation Interface Elements

## Method.invoke(Object, Object...)

```java
public Object invoke(Object obj, Object... args) throws IllegalAccessException, InvocationTargetException
```

Invokes the underlying method represented by this {@code Method}
object, on the specified object with the specified parameters.
Individual parameters are automatically unwrapped to match
primitive formal parameters, and both primitive and reference
parameters are subject to method invocation conversions as
necessary.

<p>If the underlying method is static, then the specified {@code obj}
argument is ignored. It may be null.

<p>If the number of formal parameters required by the underlying method is
0, the supplied {@code args} array may be of length 0 or null.

<p>If the underlying method is an instance method, it is invoked
using dynamic method lookup as documented in The Java Language
Specification, section {@jls 15.12.4.4}; in particular,
overriding based on the runtime type of the target object may occur.

<p>If the underlying method is static, the class that declared
the method is initialized if it has not already been initialized.

<p>If the method completes normally, the value it returns is
returned to the caller of invoke; if the value has a primitive
type, it is first appropriately wrapped in an object. However,
if the value has the type of an array of a primitive type, the
elements of the array are <i>not</i> wrapped in objects; in
other words, an array of primitive type is returned.  If the
underlying method return type is void, the invocation returns
null.

@param obj  the object the underlying method is invoked from
@param args the arguments used for the method call
@return the result of dispatching the method represented by
this object on {@code obj} with parameters
{@code args}

@throws    IllegalAccessException    if this {@code Method} object
             is enforcing Java language access control and the underlying
             method is inaccessible.
@throws    IllegalArgumentException  if the method is an
             instance method and the specified object argument
             is not an instance of the class or interface
             declaring the underlying method (or of a subclass
             or implementor thereof); if the number of actual
             and formal parameters differ; if an unwrapping
             conversion for primitive arguments fails; or if,
             after possible unwrapping, a parameter value
             cannot be converted to the corresponding formal
             parameter type by a method invocation conversion.
@throws    InvocationTargetException if the underlying method
             throws an exception.
@throws    NullPointerException      if the specified object is null
             and the method is an instance method.
@throws    ExceptionInInitializerError if the initialization
provoked by this method fails.

## Method.isBridge()

```java
public boolean isBridge()
```

{@return {@code true} if this method is a bridge
method; returns {@code false} otherwise}

@apiNote
A bridge method is a {@linkplain isSynthetic synthetic} method
created by a Java compiler alongside a method originating from
the source code. Bridge methods are used by Java compilers in
various circumstances to span differences in Java programming
language semantics and JVM semantics.

<p>One example use of bridge methods is as a technique for a
Java compiler to support <i>covariant overrides</i>, where a
subclass overrides a method and gives the new method a more
specific return type than the method in the superclass.  While
the Java language specification forbids a class declaring two
methods with the same parameter types but a different return
type, the virtual machine does not. A common case where
covariant overrides are used is for a {@link
java.lang.Cloneable Cloneable} class where the {@link
Object#clone() clone} method inherited from {@code
java.lang.Object} is overridden and declared to return the type
of the class. For example, {@code Object} declares
<pre>{@code protected Object clone() throws CloneNotSupportedException {...}}</pre>
and {@code EnumSet<E>} declares its language-level {@linkplain
java.util.EnumSet#clone() covariant override}
<pre>{@code public EnumSet<E> clone() {...}}</pre>
If this technique was being used, the resulting class file for
{@code EnumSet} would have two {@code clone} methods, one
returning {@code EnumSet<E>} and the second a bridge method
returning {@code Object}. The bridge method is a JVM-level
override of {@code Object.clone()}.  The body of the {@code
clone} bridge method calls its non-bridge counterpart and
returns its result.
@since 1.5

@jls 8.4.8.3 Requirements in Overriding and Hiding
@jls 15.12.4.5 Create Frame, Synchronize, Transfer Control
@jvms 4.6 Methods
@see <a
href="{@docRoot}/java.base/java/lang/reflect/package-summary.html#LanguageJvmModel">Java
programming language and JVM modeling in core reflection</a>

## Method.isVarArgs()

```java
public boolean isVarArgs()
```

{@inheritDoc}
@since 1.5
@jls 8.4.1 Formal Parameters

## Method.isSynthetic()

```java
public boolean isSynthetic()
```

{@inheritDoc}
@jls 13.1 The Form of a Binary
@jvms 4.6 Methods
@see <a
href="{@docRoot}/java.base/java/lang/reflect/package-summary.html#LanguageJvmModel">Java
programming language and JVM modeling in core reflection</a>
@since 1.5

## Method.isDefault()

```java
public boolean isDefault()
```

Returns {@code true} if this method is a default
method; returns {@code false} otherwise.

A default method is a public non-abstract instance method, that
is, a non-static method with a body, declared in an interface.

@return true if and only if this method is a default
method as defined by the Java Language Specification.
@since 1.8
@jls 9.4 Method Declarations

## Method.getDefaultValue()

```java
public Object getDefaultValue()
```

Returns the default value for the annotation member represented by
this {@code Method} instance.  If the member is of a primitive type,
an instance of the corresponding wrapper type is returned. Returns
null if no default is associated with the member, or if the method
instance does not represent a declared member of an annotation type.

@return the default value for the annotation member represented
    by this {@code Method} instance.
@throws TypeNotPresentException if the annotation is of type
    {@link Class} and no definition can be found for the
    default class value.
@since  1.5
@jls 9.6.2 Defaults for Annotation Interface Elements

## Method.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

{@inheritDoc}
@throws NullPointerException {@inheritDoc}
@since 1.5

## Method.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

{@inheritDoc}
@since 1.5

## Method.getParameterAnnotations()

```java
public Annotation[][] getParameterAnnotations()
```

{@inheritDoc}
@since 1.5

## Method.getAnnotatedReturnType()

```java
public AnnotatedType getAnnotatedReturnType()
```

{@inheritDoc}
@since 1.8