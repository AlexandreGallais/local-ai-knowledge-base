# Enum class (java.lang)

```java
public abstract class Enum<E extends Enum<E>> implements Constable, Comparable<E>, Serializable
```

This is the common base class of all Java language enumeration classes.

More information about enums, including descriptions of the
implicitly declared methods synthesized by the compiler, can be
found in section {@jls 8.9} of <cite>The Java Language
Specification</cite>.

Enumeration classes are all serializable and receive special handling
by the serialization mechanism. The serialized representation used
for enum constants cannot be customized. Declarations of methods
and fields that would otherwise interact with serialization are
ignored, including {@code serialVersionUID}; see the
<a href="{@docRoot}/../specs/serialization/index.html"><cite>Java
Object Serialization Specification</cite></a> for details.

<p> Note that when using an enumeration type as the type of a set
or as the type of the keys in a map, specialized and efficient
{@linkplain java.util.EnumSet set} and {@linkplain
java.util.EnumMap map} implementations are available.

@param <E> The type of the enum subclass

@spec serialization/index.html Java Object Serialization Specification
@serial exclude
@author  Josh Bloch
@author  Neal Gafter
@see     Class#getEnumConstants()
@see     java.util.EnumSet
@see     java.util.EnumMap
@jls 8.9 Enum Classes
@jls 8.9.3 Enum Members
@since   1.5

## Enum.name()

```java
public final String name()
```

Returns the name of this enum constant, exactly as declared in its
enum declaration.

<b>Most programmers should use the {@link #toString} method in
preference to this one, as the toString method may return
a more user-friendly name.</b>  This method is designed primarily for
use in specialized situations where correctness depends on getting the
exact name, which will not vary from release to release.

@return the name of this enum constant

## Enum.ordinal()

```java
public final int ordinal()
```

Returns the ordinal of this enumeration constant (its position
in its enum declaration, where the initial constant is assigned
an ordinal of zero).

Most programmers will have no use for this method.  It is
designed for use by sophisticated enum-based data structures, such
as {@link java.util.EnumSet} and {@link java.util.EnumMap}.

@return the ordinal of this enumeration constant

## Enum.Enum(String, int)

```java
protected Enum(String name, int ordinal)
```

Sole constructor.  Programmers cannot invoke this constructor.
It is for use by code emitted by the compiler in response to
enum class declarations.

@param name The name of this enum constant, which is the identifier
              used to declare it.
@param ordinal The ordinal of this enumeration constant (its position
        in the enum declaration, where the initial constant is assigned
        an ordinal of zero).

## Enum.toString()

```java
public String toString()
```

Returns the name of this enum constant, as contained in the
declaration.  This method may be overridden, though it typically
isn't necessary or desirable.  An enum class should override this
method when a more "programmer-friendly" string form exists.

@return the name of this enum constant

## Enum.equals(Object)

```java
public final boolean equals(Object other)
```

Returns true if the specified object is equal to this
enum constant.

@param other the object to be compared for equality with this object.
@return  true if the specified object is equal to this
         enum constant.

## Enum.hashCode()

```java
public final int hashCode()
```

Returns a hash code for this enum constant.

@return a hash code for this enum constant.

## Enum.clone()

```java
protected final Object clone() throws CloneNotSupportedException
```

Throws CloneNotSupportedException.  This guarantees that enums
are never cloned, which is necessary to preserve their "singleton"
status.

@return (never returns)

## Enum.compareTo(E)

```java
public final int compareTo(E o)
```

Compares this enum with the specified object for order.  Returns a
negative integer, zero, or a positive integer as this object is less
than, equal to, or greater than the specified object.

Enum constants are only comparable to other enum constants of the
same enum type.  The natural order implemented by this
method is the order in which the constants are declared.

## Enum.getDeclaringClass()

```java
public final Class<E> getDeclaringClass()
```

Returns the Class object corresponding to this enum constant's
enum type.  Two enum constants e1 and  e2 are of the
same enum type if and only if
  e1.getDeclaringClass() == e2.getDeclaringClass().
(The value returned by this method may differ from the one returned
by the {@link Object#getClass} method for enum constants with
constant-specific class bodies.)

@return the Class object corresponding to this enum constant's
    enum type

## Enum.describeConstable()

```java
public final Optional<EnumDesc<E>> describeConstable()
```

Returns an enum descriptor {@code EnumDesc} for this instance, if one can be
constructed, or an empty {@link Optional} if one cannot be.

@return An {@link Optional} containing the resulting nominal descriptor,
or an empty {@link Optional} if one cannot be constructed.
@since 12

## Enum.valueOf(Class<T>, String)

```java
public static <T extends Enum<T>> T valueOf(Class<T> enumClass, String name)
```

Returns the enum constant of the specified enum class with the
specified name.  The name must match exactly an identifier used
to declare an enum constant in this class.  (Extraneous whitespace
characters are not permitted.)

<p>Note that for a particular enum class {@code T}, the
implicitly declared {@code public static T valueOf(String)}
method on that enum may be used instead of this method to map
from a name to the corresponding enum constant.  All the
constants of an enum class can be obtained by calling the
implicit {@code public static T[] values()} method of that
class.

@param <T> The enum class whose constant is to be returned
@param enumClass the {@code Class} object of the enum class from which
     to return a constant
@param name the name of the constant to return
@return the enum constant of the specified enum class with the
     specified name
@throws IllegalArgumentException if the specified enum class has
        no constant with the specified name, or the specified
        class object does not represent an enum class
@throws NullPointerException if {@code enumClass} or {@code name}
        is null
@since 1.5

## Enum.finalize()

```java
protected final void finalize()
```

enum classes cannot have finalize methods.

@deprecated Finalization has been deprecated for removal.  See
{@link java.lang.Object#finalize} for background information and details
about migration options.

## Enum.of(ClassDesc, String)

```java
public static<E extends Enum<E>> EnumDesc<E> of(ClassDesc enumClass, String constantName)
```

Returns a nominal descriptor for the specified {@code enum} class and name

@param <E> the type of the enum constant
@param enumClass a {@link ClassDesc} describing the {@code enum} class
@param constantName the unqualified name of the enum constant
@return the nominal descriptor
@throws NullPointerException if any argument is null
@jvms 4.2.2 Unqualified Names
@since 12