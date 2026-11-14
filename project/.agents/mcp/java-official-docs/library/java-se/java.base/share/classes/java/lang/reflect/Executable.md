---
title: "Executable class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Executable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Executable class (java.lang.reflect)

```java
public abstract sealed class Executable extends AccessibleObject implements Member, GenericDeclaration permits Constructor, Method
```

A shared superclass for the common functionality of `Method`
and `Constructor`.

**sealedGraph:**

**Since:** 1.8

## Executable.getDeclaringClass()

```java
public abstract Class<?> getDeclaringClass()
```

Returns the `Class` object representing the class or interface
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

**See also:** #accessFlags

## Executable.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

**See also:** #getModifiers()

**jvms:** 4.6 Methods

**Since:** 20

## Executable.getTypeParameters()

```java
public abstract TypeVariable<?>[] getTypeParameters()
```

Returns an array of `TypeVariable` objects that represent the
type variables declared by the generic declaration represented by this
`GenericDeclaration` object, in declaration order.  Returns an
array of length 0 if the underlying generic declaration declares no type
variables.

**Returns:** an array of `TypeVariable` objects that represent
    the type variables declared by this generic declaration

Throws:

- `GenericSignatureFormatError`: if the generic signature of this generic declaration does not conform to the format specified in *The Java Virtual Machine Specification*

## Executable.getParameterTypes()

```java
public abstract Class<?>[] getParameterTypes()
```

Returns an array of `Class` objects that represent the formal
parameter types, in declaration order, of the executable
represented by this object.  Returns an array of length
0 if the underlying executable takes no parameters.
Note that the constructors of some inner classes
may have an implicitly declared parameter in addition to explicitly
declared ones.
Also note that compact constructors of a record class may have
implicitly declared parameters.

**Returns:** the parameter types for the executable this object
represents

## Executable.getParameterCount()

```java
public abstract int getParameterCount()
```

Returns the number of formal parameters (whether explicitly
declared or implicitly declared or neither) for the executable
represented by this object.

**Returns:** The number of formal parameters for the executable this
object represents

## Executable.getGenericParameterTypes()

```java
public Type[] getGenericParameterTypes()
```

Returns an array of `Type` objects that represent the
formal parameter types, in declaration order, of the executable
represented by this object. An array of length 0 is returned if the
underlying executable takes no parameters.  Note that the
constructors of some inner classes may have an implicitly
declared parameter in addition to explicitly declared ones.
Compact constructors of a record class may also have
implicitly declared parameters,
but they are a special case and thus considered as if they had
been explicitly declared in the source.
Finally note that as a modeling artifact, the number of returned parameters can differ
depending on whether or not generic information is present. If
generic information is present, parameters explicitly
present in the source or parameters of compact constructors
of a record class will be returned.
Note that parameters of compact constructors of a record class are a special case,
as they are not explicitly present in the source, and its type will be returned
regardless of the parameters being
implicitly declared or not.
If generic information is not present, implicit and synthetic parameters may be
returned as well.

If a formal parameter type is a parameterized type,
the `Type` object returned for it must accurately reflect
the actual type arguments used in the source code. This assertion also
applies to the parameters of compact constructors of a record class,
independently of them being
implicitly declared or not.

If a formal parameter type is a type variable or a parameterized
type, it is created. Otherwise, it is resolved.

**Returns:** an array of `Type`s that represent the formal
    parameter types of the underlying executable, in declaration order

Throws:

- `GenericSignatureFormatError`: if the generic method signature does not conform to the format specified in *The Java Virtual Machine Specification*
- `TypeNotPresentException`: if any of the parameter types of the underlying executable refers to a non-existent type declaration
- `MalformedParameterizedTypeException`: if any of the underlying executable's parameter types refer to a parameterized type that cannot be instantiated for any reason

## Executable.getParameters()

```java
public Parameter[] getParameters()
```

An array of length 0 is returned if the executable
has no parameters.

The parameters of the underlying executable do not necessarily
have unique names, or names that are legal identifiers in the
Java programming language (JLS ).

Throws:

- `MalformedParametersException`: if the class file contains a MethodParameters attribute that is improperly formatted.

## Executable.getExceptionTypes()

```java
public abstract Class<?>[] getExceptionTypes()
```

Returns an array of `Class` objects that represent the
types of exceptions declared to be thrown by the underlying
executable represented by this object.  Returns an array of
length 0 if the executable declares no exceptions in its `throws` clause.

**Returns:** the exception types declared as being thrown by the
executable this object represents

## Executable.getGenericExceptionTypes()

```java
public Type[] getGenericExceptionTypes()
```

Returns an array of `Type` objects that represent the
exceptions declared to be thrown by this executable object.
Returns an array of length 0 if the underlying executable declares
no exceptions in its `throws` clause.

If an exception type is a type variable or a parameterized
type, it is created. Otherwise, it is resolved.

**Returns:** an array of Types that represent the exception types
    thrown by the underlying executable

Throws:

- `GenericSignatureFormatError`: if the generic method signature does not conform to the format specified in *The Java Virtual Machine Specification*
- `TypeNotPresentException`: if the underlying executable's `throws` clause refers to a non-existent type declaration
- `MalformedParameterizedTypeException`: if the underlying executable's `throws` clause refers to a parameterized type that cannot be instantiated for any reason

## Executable.toGenericString()

```java
public abstract String toGenericString()
```

## Executable.isVarArgs()

```java
public boolean isVarArgs()
```

## Executable.isSynthetic()

```java
public boolean isSynthetic()
```

Returns `true` if this executable is a synthetic
construct; returns `false` otherwise.

**Returns:** true if and only if this executable is a synthetic
construct as defined by
*The Java Language Specification*.

**JLS:** 13.1 The Form of a Binary

**jvms:** 4.6 Methods

## Executable.getParameterAnnotations()

```java
public abstract Annotation[][] getParameterAnnotations()
```

Returns an array of arrays of `Annotation`s that
represent the annotations on the formal parameters, in
declaration order, of the `Executable` represented by
this object.  Synthetic and mandated parameters (see
explanation below), such as the outer "this" parameter to an
inner class constructor will be represented in the returned
array.  If the executable has no parameters (meaning no formal,
no synthetic, and no mandated parameters), a zero-length array
will be returned.  If the `Executable` has one or more
parameters, a nested array of length zero is returned for each
parameter with no annotations. The annotation objects contained
in the returned arrays are serializable.  The caller of this
method is free to modify the returned arrays; it will have no
effect on the arrays returned to other callers.

A compiler may add extra parameters that are implicitly
declared in source ("mandated"), as well as parameters that
are neither implicitly nor explicitly declared in source
("synthetic") to the parameter list for a method.  See `java.lang.reflect.Parameter` for more information.

Note that any annotations returned by this method are
declaration annotations.

**See also:** java.lang.reflect.Parameter

**See also:** java.lang.reflect.Parameter#getAnnotations

**Returns:** an array of arrays that represent the annotations on
   the formal and implicit parameters, in declaration order, of
   the executable represented by this object

## Executable.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

(inherited documentation)

Throws:

- `NullPointerException`: (inherited documentation)

## Executable.getAnnotationsByType(Class<T>)

```java
public <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass)
```

(inherited documentation)

Throws:

- `NullPointerException`: (inherited documentation)

## Executable.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

(inherited documentation)

## Executable.getAnnotatedReturnType()

```java
public abstract AnnotatedType getAnnotatedReturnType()
```

Returns an `AnnotatedType` object that represents the use of a type to
specify the return type of the method/constructor represented by this
Executable.

If this `Executable` object represents a constructor, the `AnnotatedType` object represents the type of the constructed object.

If this `Executable` object represents a method, the `AnnotatedType` object represents the use of a type to specify the return
type of the method.

**Returns:** an object representing the return type of the method
or constructor represented by this `Executable`

## Executable.getAnnotatedReceiverType()

```java
public AnnotatedType getAnnotatedReceiverType()
```

Returns an `AnnotatedType` object that represents the use of a
type to specify the receiver type of the method/constructor represented
by this `Executable` object.

The receiver type of a method/constructor is available only if the
method/constructor has a receiver parameter (JLS ). If this `Executable` object *represents an instance method or represents a
constructor of an inner member class*, and the
method/constructor *either* has no receiver parameter or has a
receiver parameter with no annotations on its type, then the return
value is an `AnnotatedType` object representing an element with no
annotations.

If this `Executable` object represents a static method or
represents a constructor of a top level, static member, local, or
anonymous class, then the return value is null.

**Returns:** an object representing the receiver type of the method or
constructor represented by this `Executable` or `null` if
this `Executable` can not have a receiver parameter

**JLS:** 8.4 Method Declarations

**JLS:** 8.4.1 Formal Parameters

**JLS:** 8.8 Constructor Declarations

## Executable.getAnnotatedParameterTypes()

```java
public AnnotatedType[] getAnnotatedParameterTypes()
```

Returns an array of `AnnotatedType` objects that represent the use
of types to specify formal parameter types of the method/constructor
represented by this Executable. The order of the objects in the array
corresponds to the order of the formal parameter types in the
declaration of the method/constructor.

Returns an array of length 0 if the method/constructor declares no
parameters.
Note that the constructors of some inner classes
may have an
implicitly declared parameter in addition to explicitly declared ones.
Also note that compact constructors of a record class may have
implicitly declared parameters.

**Returns:** an array of objects representing the types of the
formal parameters of the method or constructor represented by this
`Executable`

## Executable.getAnnotatedExceptionTypes()

```java
public AnnotatedType[] getAnnotatedExceptionTypes()
```

Returns an array of `AnnotatedType` objects that represent the use
of types to specify the declared exceptions of the method/constructor
represented by this Executable. The order of the objects in the array
corresponds to the order of the exception types in the declaration of
the method/constructor.

Returns an array of length 0 if the method/constructor declares no
exceptions.

**Returns:** an array of objects representing the declared
exceptions of the method or constructor represented by this `Executable`
