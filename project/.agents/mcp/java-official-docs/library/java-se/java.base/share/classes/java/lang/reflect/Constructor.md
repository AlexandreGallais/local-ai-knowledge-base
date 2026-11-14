---
title: "Constructor class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Constructor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Constructor class (java.lang.reflect)

```java
public final class Constructor<T> extends Executable
```

`Constructor` provides information about, and access to, a single
constructor for a class.

`Constructor` permits widening conversions to occur when matching the
actual parameters to newInstance() with the underlying
constructor's formal parameters, but throws an
`IllegalArgumentException` if a narrowing conversion would occur.

Parameters:

- `<T>`: the class in which the constructor is declared

**See also:** Member

**See also:** java.lang.Class

**See also:** java.lang.Class#getConstructors()

**See also:** java.lang.Class#getConstructor(Class[])

**See also:** java.lang.Class#getDeclaredConstructors()

**Since:** 1.1

## Constructor.setAccessible(boolean)

```java
public void setAccessible(boolean flag)
```

(inherited documentation)

 A `SecurityException` is thrown if this object is a
`Constructor` object for the class `Class` and `flag`
is true.

Parameters:

- `flag`: (inherited documentation)

Throws:

- `InaccessibleObjectException`: (inherited documentation)
- `SecurityException`: if this is a constructor for `java.lang.Class`

## Constructor.getDeclaringClass()

```java
public Class<T> getDeclaringClass()
```

Returns the `Class` object representing the class that
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

(inherited documentation)

**JLS:** 8.8.3 Constructor Modifiers

## Constructor.getTypeParameters()

```java
public TypeVariable<Constructor<T>>[] getTypeParameters()
```

(inherited documentation)

**Since:** 1.5

Throws:

- `GenericSignatureFormatError`: (inherited documentation)

## Constructor.getParameterTypes()

```java
public Class<?>[] getParameterTypes()
```

(inherited documentation)

## Constructor.getParameterCount()

```java
public int getParameterCount()
```

(inherited documentation)

**Since:** 1.8

## Constructor.getGenericParameterTypes()

```java
public Type[] getGenericParameterTypes()
```

(inherited documentation)

**Since:** 1.5

Throws:

- `GenericSignatureFormatError`: (inherited documentation)
- `TypeNotPresentException`: (inherited documentation)
- `MalformedParameterizedTypeException`: (inherited documentation)

## Constructor.getExceptionTypes()

```java
public Class<?>[] getExceptionTypes()
```

(inherited documentation)

## Constructor.getGenericExceptionTypes()

```java
public Type[] getGenericExceptionTypes()
```

(inherited documentation)

**Since:** 1.5

Throws:

- `GenericSignatureFormatError`: (inherited documentation)
- `TypeNotPresentException`: (inherited documentation)
- `MalformedParameterizedTypeException`: (inherited documentation)

## Constructor.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this `Constructor` against the specified object.
Returns true if the objects are the same.  Two `Constructor` objects are
the same if they were declared by the same class and have the
same formal parameter types.

## Constructor.hashCode()

```java
public int hashCode()
```

Returns a hashcode for this `Constructor`. The hashcode is
the same as the hashcode for the underlying constructor's
declaring class name.

## Constructor.toString()

```java
public String toString()
```

Returns a string describing this `Constructor`.  The string is
formatted as the constructor access modifiers, if any,
followed by the fully-qualified name of the declaring class,
followed by a parenthesized, comma-separated list of the
constructor's formal parameter types.  For example:

```java
   public java.util.HashMap(int,float)
```

If the constructor is declared to throw exceptions, the
parameter list is followed by a space, followed by the word
"`throws`" followed by a comma-separated list of the
thrown exception types.

The only possible modifiers for constructors are the access
modifiers `public`, `protected` or
`private`.  Only one of these may appear, or none if the
constructor has default (package) access.

**Returns:** a string describing this `Constructor`

**JLS:** 8.8.3 Constructor Modifiers

**JLS:** 8.9.2 Enum Body Declarations

## Constructor.toGenericString()

```java
public String toGenericString()
```

Returns a string describing this `Constructor`,
including type parameters.  The string is formatted as the
constructor access modifiers, if any, followed by an
angle-bracketed comma separated list of the constructor's type
parameters, if any, including  informative bounds of the
type parameters, if any, followed by the fully-qualified name of the
declaring class, followed by a parenthesized, comma-separated
list of the constructor's generic formal parameter types.

If this constructor was declared to take a variable number of
arguments, instead of denoting the last parameter as
"`*Type*[]`", it is denoted as
"`*Type*...`".

A space is used to separate access modifiers from one another
and from the type parameters or class name.  If there are no
type parameters, the type parameter list is elided; if the type
parameter list is present, a space separates the list from the
class name.  If the constructor is declared to throw
exceptions, the parameter list is followed by a space, followed
by the word "`throws`" followed by a
comma-separated list of the generic thrown exception types.

The only possible modifiers for constructors are the access
modifiers `public`, `protected` or
`private`.  Only one of these may appear, or none if the
constructor has default (package) access.

**Returns:** a string describing this `Constructor`,
include type parameters

**Since:** 1.5

**JLS:** 8.8.3 Constructor Modifiers

**JLS:** 8.9.2 Enum Body Declarations

## Constructor.newInstance(Object ...)

```java
public T newInstance(Object ... initargs) throws InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException
```

Uses the constructor represented by this `Constructor` object to
create and initialize a new instance of the constructor's
declaring class, with the specified initialization parameters.
Individual parameters are automatically unwrapped to match
primitive formal parameters, and both primitive and reference
parameters are subject to method invocation conversions as necessary.

If the number of formal parameters required by the underlying constructor
is 0, the supplied `initargs` array may be of length 0 or null.

If the constructor's declaring class is an inner class in a
non-static context, the first argument to the constructor needs
to be the enclosing instance; see section  of
*The Java Language Specification*.

If the required access and argument checks succeed and the
instantiation will proceed, the constructor's declaring class
is initialized if it has not already been initialized.

If the constructor completes normally, returns the newly
created and initialized instance.

Parameters:

- `initargs`: array of objects to be passed as arguments to the constructor call; values of primitive types are wrapped in a wrapper object of the appropriate type (e.g. a `float` in a Float)

**Returns:** a new object created by calling the constructor
this object represents

Throws:

- `IllegalAccessException`: if this `Constructor` object is enforcing Java language access control and the underlying constructor is inaccessible.
- `IllegalArgumentException`: if the number of actual and formal parameters differ; if an unwrapping conversion for primitive arguments fails; or if, after possible unwrapping, a parameter value cannot be converted to the corresponding formal parameter type by a method invocation conversion; if this constructor pertains to an enum class.
- `InstantiationException`: if the class that declares the underlying constructor represents an abstract class.
- `InvocationTargetException`: if the underlying constructor throws an exception.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Constructor.isVarArgs()

```java
public boolean isVarArgs()
```

(inherited documentation)

**Since:** 1.5

**JLS:** 8.4.1 Formal Parameters

## Constructor.isSynthetic()

```java
public boolean isSynthetic()
```

(inherited documentation)

**JLS:** 13.1 The Form of a Binary

**jvms:** 4.6 Methods

**Since:** 1.5

**See also:** Java
programming language and JVM modeling in core reflection

## Constructor.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

(inherited documentation)

**Since:** 1.5

Throws:

- `NullPointerException`: (inherited documentation)

## Constructor.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

(inherited documentation)

**Since:** 1.5

## Constructor.getParameterAnnotations()

```java
public Annotation[][] getParameterAnnotations()
```

(inherited documentation)

**Since:** 1.5

## Constructor.getAnnotatedReturnType()

```java
public AnnotatedType getAnnotatedReturnType()
```

(inherited documentation)

**Since:** 1.8

## Constructor.getAnnotatedReceiverType()

```java
public AnnotatedType getAnnotatedReceiverType()
```

(inherited documentation)

**Since:** 1.8
