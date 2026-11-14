# Parameter class (java.lang.reflect)

```java
public final class Parameter implements AnnotatedElement
```

Information about method parameters.

A {@code Parameter} provides information about method parameters,
including its name and modifiers.  It also provides an alternate
means of obtaining attributes for the parameter.

@since 1.8

## Parameter.equals(Object)

```java
public boolean equals(Object obj)
```

Compares based on the executable and the index.

@param obj The object to compare.
@return Whether or not this is equal to the argument.

## Parameter.hashCode()

```java
public int hashCode()
```

Returns a hash code based on the executable's hash code and the
index.

@return A hash code based on the executable's hash code.

## Parameter.isNamePresent()

```java
public boolean isNamePresent()
```

Returns true if the parameter has a name according to the class
file; returns false otherwise. Whether a parameter has a name
is determined by the {@literal MethodParameters} attribute of
the method which declares the parameter.

@return true if and only if the parameter has a name according
to the class file.

## Parameter.toString()

```java
public String toString()
```

Returns a string describing this parameter.  The format is the
modifiers for the parameter, if any, in canonical order as
recommended by <cite>The Java Language
Specification</cite>, followed by the fully-qualified type of
the parameter (excluding the last [] if the parameter is
variable arity), followed by "..." if the parameter is variable
arity, followed by a space, followed by the name of the
parameter.

@return A string representation of the parameter and associated
information.

## Parameter.getDeclaringExecutable()

```java
public Executable getDeclaringExecutable()
```

{@return the {@code Executable} declaring this parameter}

## Parameter.getModifiers()

```java
public int getModifiers()
```

{@return the Java language {@linkplain Modifier modifiers} for
the parameter represented by this object}

@jls 8.4.1 Formal Parameters
@see <a
href="{@docRoot}/java.base/java/lang/reflect/package-summary.html#LanguageJvmModel">Java
programming language and JVM modeling in core reflection</a>

## Parameter.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

{@return an unmodifiable set of the {@linkplain AccessFlag
access flags} for the parameter represented by this object,
possibly empty}

@see #getModifiers()
@jvms 4.7.24 The MethodParameters Attribute
@since 20

## Parameter.getName()

```java
public String getName()
```

Returns the name of the parameter.  If the parameter's name is
{@linkplain #isNamePresent() present}, then this method returns
the name provided by the class file. Otherwise, this method
synthesizes a name of the form argN, where N is the index of
the parameter in the descriptor of the method which declares
the parameter.

@return The name of the parameter, either provided by the class
        file or synthesized if the class file does not provide
        a name.

## Parameter.getParameterizedType()

```java
public Type getParameterizedType()
```

Returns a {@code Type} object that identifies the parameterized
type for the parameter represented by this {@code Parameter}
object.

@return a {@code Type} object identifying the parameterized
type of the parameter represented by this object

## Parameter.getType()

```java
public Class<?> getType()
```

Returns a {@code Class} object that identifies the
declared type for the parameter represented by this
{@code Parameter} object.

@return a {@code Class} object identifying the declared
type of the parameter represented by this object

## Parameter.getAnnotatedType()

```java
public AnnotatedType getAnnotatedType()
```

Returns an AnnotatedType object that represents the use of a type to
specify the type of the formal parameter represented by this Parameter.

@return an {@code AnnotatedType} object representing the use of a type
        to specify the type of the formal parameter represented by this
        Parameter

## Parameter.isImplicit()

```java
public boolean isImplicit()
```

Returns {@code true} if this parameter is implicitly declared
in source code; returns {@code false} otherwise.

@return true if and only if this parameter is implicitly
declared as defined by <cite>The Java Language
Specification</cite>.

## Parameter.isSynthetic()

```java
public boolean isSynthetic()
```

Returns {@code true} if this parameter is neither implicitly
nor explicitly declared in source code; returns {@code false}
otherwise.

@return true if and only if this parameter is a synthetic
construct as defined by
<cite>The Java Language Specification</cite>.
@jls 13.1 The Form of a Binary
@see <a
href="{@docRoot}/java.base/java/lang/reflect/package-summary.html#LanguageJvmModel">Java
programming language and JVM modeling in core reflection</a>

## Parameter.isVarArgs()

```java
public boolean isVarArgs()
```

Returns {@code true} if this parameter represents a variable
argument list; returns {@code false} otherwise.

@return {@code true} if an only if this parameter represents a
variable argument list.

## Parameter.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

{@inheritDoc}
<p>Note that any annotation returned by this method is a
declaration annotation.
@throws NullPointerException {@inheritDoc}

## Parameter.getAnnotationsByType(Class<T>)

```java
public <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass)
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.

@throws NullPointerException {@inheritDoc}

## Parameter.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.

## Parameter.getDeclaredAnnotation(Class<T>)

```java
public <T extends Annotation> T getDeclaredAnnotation(Class<T> annotationClass)
```

{@inheritDoc}
<p>Note that any annotation returned by this method is a
declaration annotation.

@throws NullPointerException {@inheritDoc}

## Parameter.getDeclaredAnnotationsByType(Class<T>)

```java
public <T extends Annotation> T[] getDeclaredAnnotationsByType(Class<T> annotationClass)
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.

@throws NullPointerException {@inheritDoc}

## Parameter.getAnnotations()

```java
public Annotation[] getAnnotations()
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.