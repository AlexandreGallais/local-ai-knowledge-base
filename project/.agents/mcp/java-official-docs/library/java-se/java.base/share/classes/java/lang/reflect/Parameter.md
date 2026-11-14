---
title: "Parameter class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Parameter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Parameter class (java.lang.reflect)

```java
public final class Parameter implements AnnotatedElement
```

Information about method parameters.

A `Parameter` provides information about method parameters,
including its name and modifiers.  It also provides an alternate
means of obtaining attributes for the parameter.

**Since:** 1.8

## Parameter.equals(Object)

```java
public boolean equals(Object obj)
```

Compares based on the executable and the index.

Parameters:

- `obj`: The object to compare.

**Returns:** Whether or not this is equal to the argument.

## Parameter.hashCode()

```java
public int hashCode()
```

Returns a hash code based on the executable's hash code and the
index.

**Returns:** A hash code based on the executable's hash code.

## Parameter.isNamePresent()

```java
public boolean isNamePresent()
```

Returns true if the parameter has a name according to the class
file; returns false otherwise. Whether a parameter has a name
is determined by the MethodParameters attribute of
the method which declares the parameter.

**Returns:** true if and only if the parameter has a name according
to the class file.

## Parameter.toString()

```java
public String toString()
```

Returns a string describing this parameter.  The format is the
modifiers for the parameter, if any, in canonical order as
recommended by *The Java Language
Specification*, followed by the fully-qualified type of
the parameter (excluding the last [] if the parameter is
variable arity), followed by "..." if the parameter is variable
arity, followed by a space, followed by the name of the
parameter.

**Returns:** A string representation of the parameter and associated
information.

## Parameter.getDeclaringExecutable()

```java
public Executable getDeclaringExecutable()
```

## Parameter.getModifiers()

```java
public int getModifiers()
```

**JLS:** 8.4.1 Formal Parameters

**See also:** Java
programming language and JVM modeling in core reflection

## Parameter.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

**See also:** #getModifiers()

**jvms:** 4.7.24 The MethodParameters Attribute

**Since:** 20

## Parameter.getName()

```java
public String getName()
```

Returns the name of the parameter.  If the parameter's name is
present, then this method returns
the name provided by the class file. Otherwise, this method
synthesizes a name of the form argN, where N is the index of
the parameter in the descriptor of the method which declares
the parameter.

**Returns:** The name of the parameter, either provided by the class
        file or synthesized if the class file does not provide
        a name.

## Parameter.getParameterizedType()

```java
public Type getParameterizedType()
```

Returns a `Type` object that identifies the parameterized
type for the parameter represented by this `Parameter`
object.

**Returns:** a `Type` object identifying the parameterized
type of the parameter represented by this object

## Parameter.getType()

```java
public Class<?> getType()
```

Returns a `Class` object that identifies the
declared type for the parameter represented by this
`Parameter` object.

**Returns:** a `Class` object identifying the declared
type of the parameter represented by this object

## Parameter.getAnnotatedType()

```java
public AnnotatedType getAnnotatedType()
```

Returns an AnnotatedType object that represents the use of a type to
specify the type of the formal parameter represented by this Parameter.

**Returns:** an `AnnotatedType` object representing the use of a type
        to specify the type of the formal parameter represented by this
        Parameter

## Parameter.isImplicit()

```java
public boolean isImplicit()
```

Returns `true` if this parameter is implicitly declared
in source code; returns `false` otherwise.

**Returns:** true if and only if this parameter is implicitly
declared as defined by *The Java Language
Specification*.

## Parameter.isSynthetic()

```java
public boolean isSynthetic()
```

Returns `true` if this parameter is neither implicitly
nor explicitly declared in source code; returns `false`
otherwise.

**Returns:** true if and only if this parameter is a synthetic
construct as defined by
*The Java Language Specification*.

**JLS:** 13.1 The Form of a Binary

**See also:** Java
programming language and JVM modeling in core reflection

## Parameter.isVarArgs()

```java
public boolean isVarArgs()
```

Returns `true` if this parameter represents a variable
argument list; returns `false` otherwise.

**Returns:** `true` if an only if this parameter represents a
variable argument list.

## Parameter.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

(inherited documentation)

Note that any annotation returned by this method is a
declaration annotation.

Throws:

- `NullPointerException`: (inherited documentation)

## Parameter.getAnnotationsByType(Class<T>)

```java
public <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass)
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

Throws:

- `NullPointerException`: (inherited documentation)

## Parameter.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

## Parameter.getDeclaredAnnotation(Class<T>)

```java
public <T extends Annotation> T getDeclaredAnnotation(Class<T> annotationClass)
```

(inherited documentation)

Note that any annotation returned by this method is a
declaration annotation.

Throws:

- `NullPointerException`: (inherited documentation)

## Parameter.getDeclaredAnnotationsByType(Class<T>)

```java
public <T extends Annotation> T[] getDeclaredAnnotationsByType(Class<T> annotationClass)
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

Throws:

- `NullPointerException`: (inherited documentation)

## Parameter.getAnnotations()

```java
public Annotation[] getAnnotations()
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.
