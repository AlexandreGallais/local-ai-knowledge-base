# ExactConversionsSupport class (java.lang.runtime)

```java
public final class ExactConversionsSupport
```

A testing conversion of a value is exact if it yields a result without loss
of information or throwing an exception. Otherwise, it is inexact. Some
conversions are always exact regardless of the value. These conversions are
said to be unconditionally exact.
<p>
For example, a conversion from {@code int} to {@code byte} for the value 10
is exact because the result, 10, is the same as the original value. In
contrast, if the {@code int} variable {@code i} stores the value 1000 then a
narrowing primitive conversion to {@code byte} will yield the result -24.
Loss of information has occurred: both the magnitude and the sign of the
result are different than those of the original value. As such, a conversion
from {@code int} to {@code byte} for the value 1000 is inexact. Finally a
widening primitive conversion from {@code byte} to {@code int} is
unconditionally exact because it will always succeed with no loss of
information about the magnitude of the numeric value.
<p>
The methods in this class provide the run-time support for the exactness
checks of testing conversions from a primitive type to primitive type. These
methods may be used, for example, by Java compiler implementations to
implement checks for {@code instanceof} and pattern matching runtime
implementations. Unconditionally exact testing conversions do not require a
corresponding action at run time and, for this reason, methods corresponding
to these exactness checks are omitted here.
<p>
The run time conversion checks examine whether loss of information would
occur if a testing conversion would be to be applied. In those cases where a
floating-point primitive type is involved, and the value of the testing
conversion is either signed zero, signed infinity or {@code NaN}, these
methods comply with the following:

<ul>
<li>Converting a floating-point negative zero to an integer type is considered
  inexact.</li>
<li>Converting a floating-point {@code NaN} or infinity to an integer type is
  considered inexact.</li>
<li>Converting a floating-point {@code NaN} or infinity or signed zero to another
  floating-point type is considered exact.</li>
</ul>

@jls 5.7.1 Exact Testing Conversions
@jls 5.7.2 Unconditionally Exact Testing Conversions
@jls 15.20.2 The instanceof Operator

@implNote Some exactness checks describe a test which can be redirected
safely through one of the existing methods. Those are omitted too (i.e.,
{@code byte} to {@code char} can be redirected  to
{@link ExactConversionsSupport#isIntToCharExact(int)}, {@code short} to
{@code byte} can be redirected to
{@link ExactConversionsSupport#isIntToByteExact(int)} and similarly for
{@code short} to {@code char}, {@code char} to {@code byte} and {@code char}
to {@code short} to the corresponding methods that take an {@code int}).

@since 23

## ExactConversionsSupport.isIntToByteExact(int)

```java
public static boolean isIntToByteExact(int n)
```

Exactness method from int to byte
@param n value
@return true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isIntToShortExact(int)

```java
public static boolean isIntToShortExact(int n)
```

Exactness method from int to short
@param n value
@return true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isIntToCharExact(int)

```java
public static boolean isIntToCharExact(int n)
```

Exactness method from int to char
@param n value
@return true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isIntToFloatExact(int)

```java
public static boolean isIntToFloatExact(int n)
```

Exactness method from int to float
@param n value
@return true if and only if the passed value can be converted exactly to the target type

@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isLongToByteExact(long)

```java
public static boolean isLongToByteExact(long n)
```

Exactness method from long to byte
@param n value
@return true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isLongToShortExact(long)

```java
public static boolean isLongToShortExact(long n)
```

Exactness method from long to short
@param n value
@return true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isLongToCharExact(long)

```java
public static boolean isLongToCharExact(long n)
```

Exactness method from long to char
@param n value
@return true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isLongToIntExact(long)

```java
public static boolean isLongToIntExact(long n)
```

Exactness method from long to int
@param n value
@return true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isLongToFloatExact(long)

```java
public static boolean isLongToFloatExact(long n)
```

Exactness method from long to float
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isLongToDoubleExact(long)

```java
public static boolean isLongToDoubleExact(long n)
```

Exactness method from long to double
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isFloatToByteExact(float)

```java
public static boolean isFloatToByteExact(float n)
```

Exactness method from float to byte
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isFloatToShortExact(float)

```java
public static boolean isFloatToShortExact(float n)
```

Exactness method from float to short
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isFloatToCharExact(float)

```java
public static boolean isFloatToCharExact(float n)
```

Exactness method from float to char
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isFloatToIntExact(float)

```java
public static boolean isFloatToIntExact(float n)
```

Exactness method from float to int
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isFloatToLongExact(float)

```java
public static boolean isFloatToLongExact(float n)
```

Exactness method from float to long
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isDoubleToByteExact(double)

```java
public static boolean isDoubleToByteExact(double n)
```

Exactness method from double to byte
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isDoubleToShortExact(double)

```java
public static boolean isDoubleToShortExact(double n)
```

Exactness method from double to short
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isDoubleToCharExact(double)

```java
public static boolean isDoubleToCharExact(double n)
```

Exactness method from double to char
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isDoubleToIntExact(double)

```java
public static boolean isDoubleToIntExact(double n)
```

Exactness method from double to int
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isDoubleToLongExact(double)

```java
public static boolean isDoubleToLongExact(double n)
```

Exactness method from double to long
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.

## ExactConversionsSupport.isDoubleToFloatExact(double)

```java
public static boolean isDoubleToFloatExact(double n)
```

Exactness method from double to float
@param n value
@return true if and only if the passed value can be converted exactly to the target type
@implSpec relies on the notion of representation equivalence defined in the
specification of the {@linkplain Double} class.