---
title: "Method class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Method.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Method class (java.lang.reflect)

```java
public final class Method extends Executable
```

A `Method` provides information about, and access to, a single method
on a class or interface.  The reflected method may be a class method
or an instance method (including an abstract method).

A `Method` permits widening conversions to occur when matching the
actual parameters to invoke with the underlying method's formal
parameters, but it throws an `IllegalArgumentException` if a
narrowing conversion would occur.

**See also:** Member

**See also:** java.lang.Class

**See also:** java.lang.Class#getMethods()

**See also:** java.lang.Class#getMethod(String, Class[])

**See also:** java.lang.Class#getDeclaredMethods()

**See also:** java.lang.Class#getDeclaredMethod(String, Class[])

**Since:** 1.1

## Method.setAccessible(boolean)

```java
public void setAccessible(boolean flag)
```

Throws:

- `InaccessibleObjectException`: (inherited documentation)

## Method.getDeclaringClass()

```java
public Class<?> getDeclaringClass()
```

Returns the `Class` object representing the class or interface
that declares the method represented by this object.

## Method.getName()

```java
public String getName()
```

Returns the name of the method represented by this `Method`
object, as a `String`.

## Method.getModifiers()

```java
public int getModifiers()
```

(inherited documentation)

**JLS:** 8.4.3 Method Modifiers

## Method.getTypeParameters()

```java
public TypeVariable<Method>[] getTypeParameters()
```

(inherited documentation)

**Since:** 1.5

**JLS:** 8.4.4 Generic Methods

Throws:

- `GenericSignatureFormatError`: (inherited documentation)

## Method.getReturnType()

```java
public Class<?> getReturnType()
```

Returns a `Class` object that represents the formal return type
of the method represented by this `Method` object.

**Returns:** the return type for the method this object represents

## Method.getGenericReturnType()

```java
public Type getGenericReturnType()
```

Returns a `Type` object that represents the formal return
type of the method represented by this `Method` object.

If the return type is a parameterized type,
the `Type` object returned must accurately reflect
the actual type arguments used in the source code.

If the return type is a type variable or a parameterized type, it
is created. Otherwise, it is resolved.

**Returns:** a `Type` object that represents the formal return
    type of the underlying  method

**Since:** 1.5

Throws:

- `GenericSignatureFormatError`: if the generic method signature does not conform to the format specified in *The Java Virtual Machine Specification*
- `TypeNotPresentException`: if the underlying method's return type refers to a non-existent class or interface declaration
- `MalformedParameterizedTypeException`: if the underlying method's return type refers to a parameterized type that cannot be instantiated for any reason

## Method.getParameterTypes()

```java
public Class<?>[] getParameterTypes()
```

(inherited documentation)

## Method.getParameterCount()

```java
public int getParameterCount()
```

(inherited documentation)

**Since:** 1.8

## Method.getGenericParameterTypes()

```java
public Type[] getGenericParameterTypes()
```

(inherited documentation)

**Since:** 1.5

Throws:

- `GenericSignatureFormatError`: (inherited documentation)
- `TypeNotPresentException`: (inherited documentation)
- `MalformedParameterizedTypeException`: (inherited documentation)

## Method.getExceptionTypes()

```java
public Class<?>[] getExceptionTypes()
```

(inherited documentation)

## Method.getGenericExceptionTypes()

```java
public Type[] getGenericExceptionTypes()
```

(inherited documentation)

**Since:** 1.5

Throws:

- `GenericSignatureFormatError`: (inherited documentation)
- `TypeNotPresentException`: (inherited documentation)
- `MalformedParameterizedTypeException`: (inherited documentation)

## Method.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this `Method` against the specified object.  Returns
true if the objects are the same.  Two `Methods` are the same if
they were declared by the same class and have the same name
and formal parameter types and return type.

## Method.hashCode()

```java
public int hashCode()
```

Returns a hashcode for this `Method`.  The hashcode is computed
as the exclusive-or of the hashcodes for the underlying
method's declaring class name and the method's name.

## Method.toString()

```java
public String toString()
```

Returns a string describing this `Method`.  The string is
formatted as the method access modifiers, if any, followed by
the method return type, followed by a space, followed by the
class declaring the method, followed by a period, followed by
the method name, followed by a parenthesized, comma-separated
list of the method's formal parameter types. If the method
throws checked exceptions, the parameter list is followed by a
space, followed by the word "`throws`" followed by a
comma-separated list of the thrown exception types.
For example:

```java
   public boolean java.lang.Object.equals(java.lang.Object)
```

The access modifiers are placed in canonical order as
specified by "The Java Language Specification".  This is
`public`, `protected` or `private` first,
and then other modifiers in the following order:
`abstract`, `default`, `static`, `final`,
`synchronized`, `native`, `strictfp`.

**Returns:** a string describing this `Method`

**JLS:** 8.4.3 Method Modifiers

**JLS:** 9.4 Method Declarations

**JLS:** 9.6.1 Annotation Interface Elements

## Method.toGenericString()

```java
public String toGenericString()
```

Returns a string describing this `Method`, including type
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
"`*Type*[]`", it is denoted as
"`*Type*...`".

A space is used to separate access modifiers from one another
and from the type parameters or return type.  If there are no
type parameters, the type parameter list is elided; if the type
parameter list is present, a space separates the list from the
class name.  If the method is declared to throw exceptions, the
parameter list is followed by a space, followed by the word
"`throws`" followed by a comma-separated list of the generic
thrown exception types.

The access modifiers are placed in canonical order as
specified by "The Java Language Specification".  This is
`public`, `protected` or `private` first,
and then other modifiers in the following order:
`abstract`, `default`, `static`, `final`,
`synchronized`, `native`, `strictfp`.

**Returns:** a string describing this `Method`,
include type parameters

**Since:** 1.5

**JLS:** 8.4.3 Method Modifiers

**JLS:** 9.4 Method Declarations

**JLS:** 9.6.1 Annotation Interface Elements

## Method.invoke(Object, Object...)

```java
public Object invoke(Object obj, Object... args) throws IllegalAccessException, InvocationTargetException
```

Invokes the underlying method represented by this `Method`
object, on the specified object with the specified parameters.
Individual parameters are automatically unwrapped to match
primitive formal parameters, and both primitive and reference
parameters are subject to method invocation conversions as
necessary.

If the underlying method is static, then the specified `obj`
argument is ignored. It may be null.

If the number of formal parameters required by the underlying method is
0, the supplied `args` array may be of length 0 or null.

If the underlying method is an instance method, it is invoked
using dynamic method lookup as documented in The Java Language
Specification, section ; in particular,
overriding based on the runtime type of the target object may occur.

If the underlying method is static, the class that declared
the method is initialized if it has not already been initialized.

If the method completes normally, the value it returns is
returned to the caller of invoke; if the value has a primitive
type, it is first appropriately wrapped in an object. However,
if the value has the type of an array of a primitive type, the
elements of the array are *not* wrapped in objects; in
other words, an array of primitive type is returned.  If the
underlying method return type is void, the invocation returns
null.

Parameters:

- `obj`: the object the underlying method is invoked from
- `args`: the arguments used for the method call

**Returns:** the result of dispatching the method represented by
this object on `obj` with parameters
`args`

Throws:

- `IllegalAccessException`: if this `Method` object is enforcing Java language access control and the underlying method is inaccessible.
- `IllegalArgumentException`: if the method is an instance method and the specified object argument is not an instance of the class or interface declaring the underlying method (or of a subclass or implementor thereof); if the number of actual and formal parameters differ; if an unwrapping conversion for primitive arguments fails; or if, after possible unwrapping, a parameter value cannot be converted to the corresponding formal parameter type by a method invocation conversion.
- `InvocationTargetException`: if the underlying method throws an exception.
- `NullPointerException`: if the specified object is null and the method is an instance method.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Method.isBridge()

```java
public boolean isBridge()
```

**API note:** A bridge method is a synthetic method
created by a Java compiler alongside a method originating from
the source code. Bridge methods are used by Java compilers in
various circumstances to span differences in Java programming
language semantics and JVM semantics.

One example use of bridge methods is as a technique for a
Java compiler to support *covariant overrides*, where a
subclass overrides a method and gives the new method a more
specific return type than the method in the superclass.  While
the Java language specification forbids a class declaring two
methods with the same parameter types but a different return
type, the virtual machine does not. A common case where
covariant overrides are used is for a Cloneable class where the clone method inherited from `java.lang.Object` is overridden and declared to return the type
of the class. For example, `Object` declares

```java
protected Object clone() throws CloneNotSupportedException {...}
```

and `EnumSet<E>` declares its language-level covariant override

```java
public EnumSet<E> clone() {...}
```

If this technique was being used, the resulting class file for
`EnumSet` would have two `clone` methods, one
returning `EnumSet<E>` and the second a bridge method
returning `Object`. The bridge method is a JVM-level
override of `Object.clone()`.  The body of the `clone` bridge method calls its non-bridge counterpart and
returns its result.

**Since:** 1.5

**JLS:** 8.4.8.3 Requirements in Overriding and Hiding

**JLS:** 15.12.4.5 Create Frame, Synchronize, Transfer Control

**jvms:** 4.6 Methods

**See also:** Java
programming language and JVM modeling in core reflection

## Method.isVarArgs()

```java
public boolean isVarArgs()
```

(inherited documentation)

**Since:** 1.5

**JLS:** 8.4.1 Formal Parameters

## Method.isSynthetic()

```java
public boolean isSynthetic()
```

(inherited documentation)

**JLS:** 13.1 The Form of a Binary

**jvms:** 4.6 Methods

**See also:** Java
programming language and JVM modeling in core reflection

**Since:** 1.5

## Method.isDefault()

```java
public boolean isDefault()
```

Returns `true` if this method is a default
method; returns `false` otherwise.

A default method is a public non-abstract instance method, that
is, a non-static method with a body, declared in an interface.

**Returns:** true if and only if this method is a default
method as defined by the Java Language Specification.

**Since:** 1.8

**JLS:** 9.4 Method Declarations

## Method.getDefaultValue()

```java
public Object getDefaultValue()
```

Returns the default value for the annotation member represented by
this `Method` instance.  If the member is of a primitive type,
an instance of the corresponding wrapper type is returned. Returns
null if no default is associated with the member, or if the method
instance does not represent a declared member of an annotation type.

**Returns:** the default value for the annotation member represented
    by this `Method` instance.

**Since:** 1.5

**JLS:** 9.6.2 Defaults for Annotation Interface Elements

Throws:

- `TypeNotPresentException`: if the annotation is of type `Class` and no definition can be found for the default class value.

## Method.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

(inherited documentation)

**Since:** 1.5

Throws:

- `NullPointerException`: (inherited documentation)

## Method.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

(inherited documentation)

**Since:** 1.5

## Method.getParameterAnnotations()

```java
public Annotation[][] getParameterAnnotations()
```

(inherited documentation)

**Since:** 1.5

## Method.getAnnotatedReturnType()

```java
public AnnotatedType getAnnotatedReturnType()
```

(inherited documentation)

**Since:** 1.8
