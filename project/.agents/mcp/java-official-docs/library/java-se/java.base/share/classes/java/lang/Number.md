# Number class (java.lang)

```java
public abstract class Number implements java.io.Serializable
```

The abstract class {@code Number} is the superclass of platform
classes representing numeric values that are convertible to the
primitive types {@code byte}, {@code double}, {@code float}, {@code
int}, {@code long}, and {@code short}.

The specific semantics of the conversion from the numeric value of
a particular {@code Number} implementation to a given primitive
type is defined by the {@code Number} implementation in question.

For platform classes, the conversion is often analogous to a
narrowing primitive conversion or a widening primitive conversion
as defined in <cite>The Java Language Specification</cite>
for converting between primitive types.  Therefore, conversions may
lose information about the overall magnitude of a numeric value, may
lose precision, and may even return a result of a different sign
than the input.

See the documentation of a given {@code Number} implementation for
conversion details.

@author      Lee Boynton
@author      Arthur van Hoff
@jls 5.1.2 Widening Primitive Conversion
@jls 5.1.3 Narrowing Primitive Conversion
@since   1.0

## Number.Number()

```java
public Number()
```

Constructor for subclasses to call.

## Number.intValue()

```java
public abstract int intValue()
```

Returns the value of the specified number as an {@code int}.

@return  the numeric value represented by this object after conversion
         to type {@code int}.

## Number.longValue()

```java
public abstract long longValue()
```

Returns the value of the specified number as a {@code long}.

@return  the numeric value represented by this object after conversion
         to type {@code long}.

## Number.floatValue()

```java
public abstract float floatValue()
```

Returns the value of the specified number as a {@code float}.

@return  the numeric value represented by this object after conversion
         to type {@code float}.

## Number.doubleValue()

```java
public abstract double doubleValue()
```

Returns the value of the specified number as a {@code double}.

@return  the numeric value represented by this object after conversion
         to type {@code double}.

## Number.byteValue()

```java
public byte byteValue()
```

Returns the value of the specified number as a {@code byte}.

@implSpec
The default implementation returns the result of {@link #intValue} cast
to a {@code byte}.

@return  the numeric value represented by this object after conversion
         to type {@code byte}.
@since   1.1

## Number.shortValue()

```java
public short shortValue()
```

Returns the value of the specified number as a {@code short}.

@implSpec
The default implementation returns the result of {@link #intValue} cast
to a {@code short}.

@return  the numeric value represented by this object after conversion
         to type {@code short}.
@since   1.1