# Executable class (java.lang.reflect)

```java
public abstract sealed class Executable extends AccessibleObject implements Member, GenericDeclaration permits Constructor, Method
```

A shared superclass for the common functionality of {@link Method}
and {@link Constructor}.

@sealedGraph
@since 1.8

## Executable.getDeclaringClass()

```java
public abstract Class<?> getDeclaringClass()
```

Returns the {@code Class} object representing the class or interface
that declares the executable represented by this object.

## Executable.getName()

```java
public abstract String getName()
```

Returns the name of the executable represented by this object.

## Executable.getModifiers()

```java
public abstract int getModifiers()
```

{@return the Java language {@linkplain Modifier modifiers} for
the executable represented by this object}
@see #accessFlags

## Executable.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

{@return an unmodifiable set of the {@linkplain AccessFlag
access flags} for the executable represented by this object,
possibly empty}

@see #getModifiers()
@jvms 4.6 Methods
@since 20

## Executable.getTypeParameters()

```java
public abstract TypeVariable<?>[] getTypeParameters()
```

Returns an array of {@code TypeVariable} objects that represent the
type variables declared by the generic declaration represented by this
{@code GenericDeclaration} object, in declaration order.  Returns an
array of length 0 if the underlying generic declaration declares no type
variables.

@return an array of {@code TypeVariable} objects that represent
    the type variables declared by this generic declaration
@throws GenericSignatureFormatError if the generic
    signature of this generic declaration does not conform to
    the format specified in
    <cite>The Java Virtual Machine Specification</cite>

## Executable.getParameterTypes()

```java
public abstract Class<?>[] getParameterTypes()
```

Returns an array of {@code Class} objects that represent the formal
parameter types, in declaration order, of the executable
represented by this object.  Returns an array of length
0 if the underlying executable takes no parameters.
Note that the constructors of some inner classes
may have an {@linkplain java.compiler/javax.lang.model.util.Elements.Origin#MANDATED
implicitly declared} parameter in addition to explicitly
declared ones.
Also note that compact constructors of a record class may have
{@linkplain java.compiler/javax.lang.model.util.Elements.Origin#MANDATED
implicitly declared} parameters.

@return the parameter types for the executable this object
represents

## Executable.getParameterCount()

```java
public abstract int getParameterCount()
```

Returns the number of formal parameters (whether explicitly
declared or implicitly declared or neither) for the executable
represented by this object.

@return The number of formal parameters for the executable this
object represents

## Executable.getGenericParameterTypes()

```java
public Type[] getGenericParameterTypes()
```

Returns an array of {@code Type} objects that represent the
formal parameter types, in declaration order, of the executable
represented by this object. An array of length 0 is returned if the
underlying executable takes no parameters.  Note that the
constructors of some inner classes may have an implicitly
declared parameter in addition to explicitly declared ones.
Compact constructors of a record class may also have
{@linkplain java.compiler/javax.lang.model.util.Elements.Origin#MANDATED
implicitly declared} parameters,
but they are a special case and thus considered as if they had
been explicitly declared in the source.
Finally note that as a {@link java.lang.reflect##LanguageJvmModel
modeling artifact}, the number of returned parameters can differ
depending on whether or not generic information is present. If
generic information is present, parameters explicitly
present in the source or parameters of compact constructors
of a record class will be returned.
Note that parameters of compact constructors of a record class are a special case,
as they are not explicitly present in the source, and its type will be returned
regardless of the parameters being
{@linkplain java.compiler/javax.lang.model.util.Elements.Origin#MANDATED
implicitly declared} or not.
If generic information is not present, implicit and synthetic parameters may be
returned as well.

<p>If a formal parameter type is a parameterized type,
the {@code Type} object returned for it must accurately reflect
the actual type arguments used in the source code. This assertion also
applies to the parameters of compact constructors of a record class,
independently of them being
{@linkplain java.compiler/javax.lang.model.util.Elements.Origin#MANDATED
implicitly declared} or not.

<p>If a formal parameter type is a type variable or a parameterized
type, it is created. Otherwise, it is resolved.

@return an array of {@code Type}s that represent the formal
    parameter types of the underlying executable, in declaration order
@throws GenericSignatureFormatError
    if the generic method signature does not conform to the format
    specified in
    <cite>The Java Virtual Machine Specification</cite>
@throws TypeNotPresentException if any of the parameter
    types of the underlying executable refers to a non-existent type
    declaration
@throws MalformedParameterizedTypeException if any of
    the underlying executable's parameter types refer to a parameterized
    type that cannot be instantiated for any reason

## Executable.getParameters()

```java
public Parameter[] getParameters()
```

{@return an array of {@code Parameter} objects representing
all the parameters to the underlying executable represented by
this object} An array of length 0 is returned if the executable
has no parameters.

<p>The parameters of the underlying executable do not necessarily
have unique names, or names that are legal identifiers in the
Java programming language (JLS {@jls 3.8}).

@throws MalformedParametersException if the class file contains
a MethodParameters attribute that is improperly formatted.

## Executable.getExceptionTypes()

```java
public abstract Class<?>[] getExceptionTypes()
```

Returns an array of {@code Class} objects that represent the
types of exceptions declared to be thrown by the underlying
executable represented by this object.  Returns an array of
length 0 if the executable declares no exceptions in its {@code
throws} clause.

@return the exception types declared as being thrown by the
executable this object represents

## Executable.getGenericExceptionTypes()

```java
public Type[] getGenericExceptionTypes()
```

Returns an array of {@code Type} objects that represent the
exceptions declared to be thrown by this executable object.
Returns an array of length 0 if the underlying executable declares
no exceptions in its {@code throws} clause.

<p>If an exception type is a type variable or a parameterized
type, it is created. Otherwise, it is resolved.

@return an array of Types that represent the exception types
    thrown by the underlying executable
@throws GenericSignatureFormatError
    if the generic method signature does not conform to the format
    specified in
    <cite>The Java Virtual Machine Specification</cite>
@throws TypeNotPresentException if the underlying executable's
    {@code throws} clause refers to a non-existent type declaration
@throws MalformedParameterizedTypeException if
    the underlying executable's {@code throws} clause refers to a
    parameterized type that cannot be instantiated for any reason

## Executable.toGenericString()

```java
public abstract String toGenericString()
```

{@return a string describing this {@code Executable}, including
any type parameters}

## Executable.isVarArgs()

```java
public boolean isVarArgs()
```

{@return {@code true} if this executable was declared to take a
variable number of arguments; returns {@code false} otherwise}

## Executable.isSynthetic()

```java
public boolean isSynthetic()
```

Returns {@code true} if this executable is a synthetic
construct; returns {@code false} otherwise.

@return true if and only if this executable is a synthetic
construct as defined by
<cite>The Java Language Specification</cite>.
@jls 13.1 The Form of a Binary
@jvms 4.6 Methods

## Executable.getParameterAnnotations()

```java
public abstract Annotation[][] getParameterAnnotations()
```

Returns an array of arrays of {@code Annotation}s that
represent the annotations on the formal parameters, in
declaration order, of the {@code Executable} represented by
this object.  Synthetic and mandated parameters (see
explanation below), such as the outer "this" parameter to an
inner class constructor will be represented in the returned
array.  If the executable has no parameters (meaning no formal,
no synthetic, and no mandated parameters), a zero-length array
will be returned.  If the {@code Executable} has one or more
parameters, a nested array of length zero is returned for each
parameter with no annotations. The annotation objects contained
in the returned arrays are serializable.  The caller of this
method is free to modify the returned arrays; it will have no
effect on the arrays returned to other callers.

A compiler may add extra parameters that are implicitly
declared in source ("mandated"), as well as parameters that
are neither implicitly nor explicitly declared in source
("synthetic") to the parameter list for a method.  See {@link
java.lang.reflect.Parameter} for more information.

<p>Note that any annotations returned by this method are
declaration annotations.

@see java.lang.reflect.Parameter
@see java.lang.reflect.Parameter#getAnnotations
@return an array of arrays that represent the annotations on
   the formal and implicit parameters, in declaration order, of
   the executable represented by this object

## Executable.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

{@inheritDoc}
@throws NullPointerException  {@inheritDoc}

## Executable.getAnnotationsByType(Class<T>)

```java
public <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass)
```

{@inheritDoc}

@throws NullPointerException {@inheritDoc}

## Executable.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

{@inheritDoc}

## Executable.getAnnotatedReturnType()

```java
public abstract AnnotatedType getAnnotatedReturnType()
```

Returns an {@code AnnotatedType} object that represents the use of a type to
specify the return type of the method/constructor represented by this
Executable.

If this {@code Executable} object represents a constructor, the {@code
AnnotatedType} object represents the type of the constructed object.

If this {@code Executable} object represents a method, the {@code
AnnotatedType} object represents the use of a type to specify the return
type of the method.

@return an object representing the return type of the method
or constructor represented by this {@code Executable}

## Executable.getAnnotatedReceiverType()

```java
public AnnotatedType getAnnotatedReceiverType()
```

Returns an {@code AnnotatedType} object that represents the use of a
type to specify the receiver type of the method/constructor represented
by this {@code Executable} object.

The receiver type of a method/constructor is available only if the
method/constructor has a receiver parameter (JLS {@jls 8.4.1}). If this {@code
Executable} object <em>represents an instance method or represents a
constructor of an inner member class</em>, and the
method/constructor <em>either</em> has no receiver parameter or has a
receiver parameter with no annotations on its type, then the return
value is an {@code AnnotatedType} object representing an element with no
annotations.

If this {@code Executable} object represents a static method or
represents a constructor of a top level, static member, local, or
anonymous class, then the return value is null.

@return an object representing the receiver type of the method or
constructor represented by this {@code Executable} or {@code null} if
this {@code Executable} can not have a receiver parameter

@jls 8.4 Method Declarations
@jls 8.4.1 Formal Parameters
@jls 8.8 Constructor Declarations

## Executable.getAnnotatedParameterTypes()

```java
public AnnotatedType[] getAnnotatedParameterTypes()
```

Returns an array of {@code AnnotatedType} objects that represent the use
of types to specify formal parameter types of the method/constructor
represented by this Executable. The order of the objects in the array
corresponds to the order of the formal parameter types in the
declaration of the method/constructor.

Returns an array of length 0 if the method/constructor declares no
parameters.
Note that the constructors of some inner classes
may have an
{@linkplain java.compiler/javax.lang.model.util.Elements.Origin#MANDATED
implicitly declared} parameter in addition to explicitly declared ones.
Also note that compact constructors of a record class may have
{@linkplain java.compiler/javax.lang.model.util.Elements.Origin#MANDATED
implicitly declared} parameters.

@return an array of objects representing the types of the
formal parameters of the method or constructor represented by this
{@code Executable}

## Executable.getAnnotatedExceptionTypes()

```java
public AnnotatedType[] getAnnotatedExceptionTypes()
```

Returns an array of {@code AnnotatedType} objects that represent the use
of types to specify the declared exceptions of the method/constructor
represented by this Executable. The order of the objects in the array
corresponds to the order of the exception types in the declaration of
the method/constructor.

Returns an array of length 0 if the method/constructor declares no
exceptions.

@return an array of objects representing the declared
exceptions of the method or constructor represented by this {@code
Executable}