# Modifier class (java.lang.reflect)

```java
public final class Modifier
```

The Modifier class provides {@code static} methods and
constants to decode class and member access modifiers.  The sets of
modifiers are represented as integers with distinct bit positions
representing different modifiers.  The values for the constants
representing the modifiers are taken from the tables in sections
{@jvms 4.1}, {@jvms 4.4}, {@jvms 4.5}, and {@jvms 4.7} of
<cite>The Java Virtual Machine Specification</cite>.

@apiNote
Not all modifiers that are syntactic Java language modifiers are
represented in this class, only those modifiers that <em>also</em>
have a corresponding JVM {@linkplain AccessFlag access flag} are
included. In particular the {@code default} method modifier (JLS
{@jls 9.4.3}) and the {@code sealed} and {@code non-sealed} class
(JLS {@jls 8.1.1.2}) and interface (JLS {@jls 9.1.1.4}) modifiers
are <em>not</em> represented in this class.

@see Class#getModifiers()
@see Member#getModifiers()

@author Nakul Saraiya
@author Kenneth Russell
@since 1.1

## Modifier.isPublic(int)

```java
public static boolean isPublic(int mod)
```

Return {@code true} if the integer argument includes the
{@code public} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code public} modifier; {@code false} otherwise.

## Modifier.isPrivate(int)

```java
public static boolean isPrivate(int mod)
```

Return {@code true} if the integer argument includes the
{@code private} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code private} modifier; {@code false} otherwise.

## Modifier.isProtected(int)

```java
public static boolean isProtected(int mod)
```

Return {@code true} if the integer argument includes the
{@code protected} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code protected} modifier; {@code false} otherwise.

## Modifier.isStatic(int)

```java
public static boolean isStatic(int mod)
```

Return {@code true} if the integer argument includes the
{@code static} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code static} modifier; {@code false} otherwise.

## Modifier.isFinal(int)

```java
public static boolean isFinal(int mod)
```

Return {@code true} if the integer argument includes the
{@code final} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code final} modifier; {@code false} otherwise.

## Modifier.isSynchronized(int)

```java
public static boolean isSynchronized(int mod)
```

Return {@code true} if the integer argument includes the
{@code synchronized} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code synchronized} modifier; {@code false} otherwise.

## Modifier.isVolatile(int)

```java
public static boolean isVolatile(int mod)
```

Return {@code true} if the integer argument includes the
{@code volatile} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code volatile} modifier; {@code false} otherwise.

## Modifier.isTransient(int)

```java
public static boolean isTransient(int mod)
```

Return {@code true} if the integer argument includes the
{@code transient} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code transient} modifier; {@code false} otherwise.

## Modifier.isNative(int)

```java
public static boolean isNative(int mod)
```

Return {@code true} if the integer argument includes the
{@code native} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code native} modifier; {@code false} otherwise.

## Modifier.isInterface(int)

```java
public static boolean isInterface(int mod)
```

Return {@code true} if the integer argument includes the
{@code interface} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code interface} modifier; {@code false} otherwise.

## Modifier.isAbstract(int)

```java
public static boolean isAbstract(int mod)
```

Return {@code true} if the integer argument includes the
{@code abstract} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code abstract} modifier; {@code false} otherwise.

## Modifier.isStrict(int)

```java
public static boolean isStrict(int mod)
```

Return {@code true} if the integer argument includes the
{@code strictfp} modifier, {@code false} otherwise.

@param   mod a set of modifiers
@return {@code true} if {@code mod} includes the
{@code strictfp} modifier; {@code false} otherwise.

## Modifier.toString(int)

```java
public static String toString(int mod)
```

Return a string describing the access modifier flags in
the specified modifier. For example:
<blockquote><pre>
   public final synchronized strictfp
</pre></blockquote>
The modifier names are returned in an order consistent with the
suggested modifier orderings given in sections 8.1.1, 8.3.1, 8.4.3, 8.8.3, and 9.1.1 of
<cite>The Java Language Specification</cite>.
The full modifier ordering used by this method is:
<blockquote> {@code
public protected private abstract static final transient
volatile synchronized native strictfp
interface } </blockquote>

The {@code interface} modifier discussed in this class is
not a true modifier in the Java language and it appears after
all other modifiers listed by this method.  This method may
return a string of modifiers that are not valid modifiers of a
Java entity; in other words, no checking is done on the
possible validity of the combination of modifiers represented
by the input.

Note that to perform such checking for a known kind of entity,
such as a constructor or method, first AND the argument of
{@code toString} with the appropriate mask from a method like
{@link #constructorModifiers} or {@link #methodModifiers}.

@apiNote
To make a high-fidelity representation of the Java source
modifiers of a class or member, source-level modifiers that do
<em>not</em> have a constant in this class should be included
and appear in an order consistent with the full recommended
ordering for that kind of declaration as given in <cite>The
Java Language Specification</cite>. For example, for a
{@linkplain Method#toGenericString() method} the "{@link
Method#isDefault() default}" modifier is ordered immediately
before "{@code static}" (JLS {@jls 9.4}). For a {@linkplain
Class#toGenericString() class object}, the "{@link
Class#isSealed() sealed}" or {@code "non-sealed"} modifier is
ordered immediately after "{@code final}" for a class (JLS
{@jls 8.1.1}) and immediately after "{@code static}" for an
interface (JLS {@jls 9.1.1}).

@param   mod a set of modifiers
@return  a string representation of the set of modifiers
represented by {@code mod}

## Modifier.PUBLIC

```java
public static final int PUBLIC
```

The {@code int} value representing the {@code public}
modifier.
@see AccessFlag#PUBLIC

## Modifier.PRIVATE

```java
public static final int PRIVATE
```

The {@code int} value representing the {@code private}
modifier.
@see AccessFlag#PRIVATE

## Modifier.PROTECTED

```java
public static final int PROTECTED
```

The {@code int} value representing the {@code protected}
modifier.
@see AccessFlag#PROTECTED

## Modifier.STATIC

```java
public static final int STATIC
```

The {@code int} value representing the {@code static}
modifier.
@see AccessFlag#STATIC

## Modifier.FINAL

```java
public static final int FINAL
```

The {@code int} value representing the {@code final}
modifier.
@see AccessFlag#FINAL

## Modifier.SYNCHRONIZED

```java
public static final int SYNCHRONIZED
```

The {@code int} value representing the {@code synchronized}
modifier.
@see AccessFlag#SYNCHRONIZED

## Modifier.VOLATILE

```java
public static final int VOLATILE
```

The {@code int} value representing the {@code volatile}
modifier.
@see AccessFlag#VOLATILE

## Modifier.TRANSIENT

```java
public static final int TRANSIENT
```

The {@code int} value representing the {@code transient}
modifier.
@see AccessFlag#TRANSIENT

## Modifier.NATIVE

```java
public static final int NATIVE
```

The {@code int} value representing the {@code native}
modifier.
@see AccessFlag#NATIVE

## Modifier.INTERFACE

```java
public static final int INTERFACE
```

The {@code int} value representing the {@code interface}
modifier.
@see AccessFlag#INTERFACE

## Modifier.ABSTRACT

```java
public static final int ABSTRACT
```

The {@code int} value representing the {@code abstract}
modifier.
@see AccessFlag#ABSTRACT

## Modifier.STRICT

```java
public static final int STRICT
```

The {@code int} value representing the {@code strictfp}
modifier.
@see AccessFlag#STRICT

## Modifier.classModifiers()

```java
public static int classModifiers()
```

Return an {@code int} value OR-ing together the source language
modifiers that can be applied to a class.
@return an {@code int} value OR-ing together the source language
modifiers that can be applied to a class.

@see AccessFlag.Location#CLASS
@see AccessFlag.Location#INNER_CLASS
@jls 8.1.1 Class Modifiers
@since 1.7

## Modifier.interfaceModifiers()

```java
public static int interfaceModifiers()
```

Return an {@code int} value OR-ing together the source language
modifiers that can be applied to an interface.
@return an {@code int} value OR-ing together the source language
modifiers that can be applied to an interface.

@see AccessFlag.Location#CLASS
@see AccessFlag.Location#INNER_CLASS
@jls 9.1.1 Interface Modifiers
@since 1.7

## Modifier.constructorModifiers()

```java
public static int constructorModifiers()
```

Return an {@code int} value OR-ing together the source language
modifiers that can be applied to a constructor.
@return an {@code int} value OR-ing together the source language
modifiers that can be applied to a constructor.

@see AccessFlag.Location#METHOD
@jls 8.8.3 Constructor Modifiers
@since 1.7

## Modifier.methodModifiers()

```java
public static int methodModifiers()
```

Return an {@code int} value OR-ing together the source language
modifiers that can be applied to a method.
@return an {@code int} value OR-ing together the source language
modifiers that can be applied to a method.

@see AccessFlag.Location#METHOD
@jls 8.4.3 Method Modifiers
@since 1.7

## Modifier.fieldModifiers()

```java
public static int fieldModifiers()
```

Return an {@code int} value OR-ing together the source language
modifiers that can be applied to a field.
@return an {@code int} value OR-ing together the source language
modifiers that can be applied to a field.

@see AccessFlag.Location#FIELD
@jls 8.3.1 Field Modifiers
@since 1.7

## Modifier.parameterModifiers()

```java
public static int parameterModifiers()
```

Return an {@code int} value OR-ing together the source language
modifiers that can be applied to a parameter.
@return an {@code int} value OR-ing together the source language
modifiers that can be applied to a parameter.

@see AccessFlag.Location#METHOD_PARAMETER
@jls 8.4.1 Formal Parameters
@since 1.8