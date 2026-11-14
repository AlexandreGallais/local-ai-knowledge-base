---
title: "SerializedLambda class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/SerializedLambda.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SerializedLambda class (java.lang.invoke)

```java
public final class SerializedLambda implements Serializable
```

Serialized form of a lambda expression.  The properties of this class
represent the information that is present at the lambda factory site, including
static metafactory arguments such as the identity of the primary functional
interface method and the identity of the implementation method, as well as
dynamic metafactory arguments such as values captured from the lexical scope
at the time of lambda capture.

Implementors of serializable lambdas, such as compilers or language
runtime libraries, are expected to ensure that instances deserialize properly.
One means to do so is to ensure that the `writeReplace` method returns
an instance of `SerializedLambda`, rather than allowing default
serialization to proceed.

`SerializedLambda` has a `readResolve` method that looks for
a (possibly private) static method called
`$deserializeLambda$(SerializedLambda)` in the capturing class, invokes
that with itself as the first argument, and returns the result.  Lambda classes
implementing `$deserializeLambda$` are responsible for validating
that the properties of the `SerializedLambda` are consistent with a
lambda actually captured by that class.

The identity of a function object produced by deserializing the serialized
form is unpredictable, and therefore identity-sensitive operations (such as
reference equality, object locking, and `System.identityHashCode()`) may
produce different results in different implementations, or even upon
different deserializations in the same implementation.

**See also:** LambdaMetafactory

**Since:** 1.8

## SerializedLambda.SerializedLambda(Class<?>, String, String, String, int, String, String, String, String, Object[])

```java
public SerializedLambda(Class<?> capturingClass, String functionalInterfaceClass, String functionalInterfaceMethodName, String functionalInterfaceMethodSignature, int implMethodKind, String implClass, String implMethodName, String implMethodSignature, String instantiatedMethodType, Object[] capturedArgs)
```

Create a `SerializedLambda` from the low-level information present
at the lambda factory site.

Parameters:

- `capturingClass`: The class in which the lambda expression appears
- `functionalInterfaceClass`: Name, in slash-delimited form, of static type of the returned lambda object
- `functionalInterfaceMethodName`: Name of the functional interface method for the present at the lambda factory site
- `functionalInterfaceMethodSignature`: Signature of the functional interface method present at the lambda factory site
- `implMethodKind`: Method handle kind for the implementation method
- `implClass`: Name, in slash-delimited form, for the class holding the implementation method
- `implMethodName`: Name of the implementation method
- `implMethodSignature`: Signature of the implementation method
- `instantiatedMethodType`: The signature of the primary functional interface method after type variables are substituted with their instantiation from the capture site
- `capturedArgs`: The dynamic arguments to the lambda factory site, which represent variables captured by the lambda

## SerializedLambda.getCapturingClass()

```java
public String getCapturingClass()
```

Get the name of the class that captured this lambda.

**Returns:** the name of the class that captured this lambda

## SerializedLambda.getFunctionalInterfaceClass()

```java
public String getFunctionalInterfaceClass()
```

Get the name of the invoked type to which this
lambda has been converted

**Returns:** the name of the functional interface class to which
this lambda has been converted

## SerializedLambda.getFunctionalInterfaceMethodName()

```java
public String getFunctionalInterfaceMethodName()
```

Get the name of the primary method for the functional interface
to which this lambda has been converted.

**Returns:** the name of the primary methods of the functional interface

## SerializedLambda.getFunctionalInterfaceMethodSignature()

```java
public String getFunctionalInterfaceMethodSignature()
```

Get the signature of the primary method for the functional
interface to which this lambda has been converted.

**Returns:** the signature of the primary method of the functional
interface

## SerializedLambda.getImplClass()

```java
public String getImplClass()
```

Get the name of the class containing the implementation
method.

**Returns:** the name of the class containing the implementation
method

## SerializedLambda.getImplMethodName()

```java
public String getImplMethodName()
```

Get the name of the implementation method.

**Returns:** the name of the implementation method

## SerializedLambda.getImplMethodSignature()

```java
public String getImplMethodSignature()
```

Get the signature of the implementation method.

**Returns:** the signature of the implementation method

## SerializedLambda.getImplMethodKind()

```java
public int getImplMethodKind()
```

Get the method handle kind (see `MethodHandleInfo`) of
the implementation method.

**Returns:** the method handle kind of the implementation method

## SerializedLambda.getInstantiatedMethodType()

```java
public final String getInstantiatedMethodType()
```

Get the signature of the primary functional interface method
after type variables are substituted with their instantiation
from the capture site.

**Returns:** the signature of the primary functional interface method
after type variable processing

## SerializedLambda.getCapturedArgCount()

```java
public int getCapturedArgCount()
```

Get the count of dynamic arguments to the lambda capture site.

**Returns:** the count of dynamic arguments to the lambda capture site

## SerializedLambda.getCapturedArg(int)

```java
public Object getCapturedArg(int i)
```

Get a dynamic argument to the lambda capture site.

Parameters:

- `i`: the argument to capture

**Returns:** a dynamic argument to the lambda capture site
