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

<p>Implementors of serializable lambdas, such as compilers or language
runtime libraries, are expected to ensure that instances deserialize properly.
One means to do so is to ensure that the {@code writeReplace} method returns
an instance of {@code SerializedLambda}, rather than allowing default
serialization to proceed.

<p>{@code SerializedLambda} has a {@code readResolve} method that looks for
a (possibly private) static method called
{@code $deserializeLambda$(SerializedLambda)} in the capturing class, invokes
that with itself as the first argument, and returns the result.  Lambda classes
implementing {@code $deserializeLambda$} are responsible for validating
that the properties of the {@code SerializedLambda} are consistent with a
lambda actually captured by that class.

<p>The identity of a function object produced by deserializing the serialized
form is unpredictable, and therefore identity-sensitive operations (such as
reference equality, object locking, and {@code System.identityHashCode()}) may
produce different results in different implementations, or even upon
different deserializations in the same implementation.

@see LambdaMetafactory
@since 1.8

## SerializedLambda.SerializedLambda(Class<?>, String, String, String, int, String, String, String, String, Object[])

```java
public SerializedLambda(Class<?> capturingClass, String functionalInterfaceClass, String functionalInterfaceMethodName, String functionalInterfaceMethodSignature, int implMethodKind, String implClass, String implMethodName, String implMethodSignature, String instantiatedMethodType, Object[] capturedArgs)
```

Create a {@code SerializedLambda} from the low-level information present
at the lambda factory site.

@param capturingClass The class in which the lambda expression appears
@param functionalInterfaceClass Name, in slash-delimited form, of static
                                type of the returned lambda object
@param functionalInterfaceMethodName Name of the functional interface
                                     method for the present at the
                                     lambda factory site
@param functionalInterfaceMethodSignature Signature of the functional
                                          interface method present at
                                          the lambda factory site
@param implMethodKind Method handle kind for the implementation method
@param implClass Name, in slash-delimited form, for the class holding
                 the implementation method
@param implMethodName Name of the implementation method
@param implMethodSignature Signature of the implementation method
@param instantiatedMethodType The signature of the primary functional
                              interface method after type variables
                              are substituted with their instantiation
                              from the capture site
@param capturedArgs The dynamic arguments to the lambda factory site,
                    which represent variables captured by
                    the lambda

## SerializedLambda.getCapturingClass()

```java
public String getCapturingClass()
```

Get the name of the class that captured this lambda.
@return the name of the class that captured this lambda

## SerializedLambda.getFunctionalInterfaceClass()

```java
public String getFunctionalInterfaceClass()
```

Get the name of the invoked type to which this
lambda has been converted
@return the name of the functional interface class to which
this lambda has been converted

## SerializedLambda.getFunctionalInterfaceMethodName()

```java
public String getFunctionalInterfaceMethodName()
```

Get the name of the primary method for the functional interface
to which this lambda has been converted.
@return the name of the primary methods of the functional interface

## SerializedLambda.getFunctionalInterfaceMethodSignature()

```java
public String getFunctionalInterfaceMethodSignature()
```

Get the signature of the primary method for the functional
interface to which this lambda has been converted.
@return the signature of the primary method of the functional
interface

## SerializedLambda.getImplClass()

```java
public String getImplClass()
```

Get the name of the class containing the implementation
method.
@return the name of the class containing the implementation
method

## SerializedLambda.getImplMethodName()

```java
public String getImplMethodName()
```

Get the name of the implementation method.
@return the name of the implementation method

## SerializedLambda.getImplMethodSignature()

```java
public String getImplMethodSignature()
```

Get the signature of the implementation method.
@return the signature of the implementation method

## SerializedLambda.getImplMethodKind()

```java
public int getImplMethodKind()
```

Get the method handle kind (see {@link MethodHandleInfo}) of
the implementation method.
@return the method handle kind of the implementation method

## SerializedLambda.getInstantiatedMethodType()

```java
public final String getInstantiatedMethodType()
```

Get the signature of the primary functional interface method
after type variables are substituted with their instantiation
from the capture site.
@return the signature of the primary functional interface method
after type variable processing

## SerializedLambda.getCapturedArgCount()

```java
public int getCapturedArgCount()
```

Get the count of dynamic arguments to the lambda capture site.
@return the count of dynamic arguments to the lambda capture site

## SerializedLambda.getCapturedArg(int)

```java
public Object getCapturedArg(int i)
```

Get a dynamic argument to the lambda capture site.
@param i the argument to capture
@return a dynamic argument to the lambda capture site