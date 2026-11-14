# Math class (java.lang)

```java
public final class Math
```

The class {@code Math} contains methods for performing basic
numeric operations such as the elementary exponential, logarithm,
square root, and trigonometric functions.

<p>Unlike some of the numeric methods of class
{@link java.lang.StrictMath StrictMath}, all implementations of the equivalent
functions of class {@code Math} are not defined to return the
bit-for-bit same results.  This relaxation permits
better-performing implementations where strict reproducibility is
not required.

<p>By default many of the {@code Math} methods simply call
the equivalent method in {@code StrictMath} for their
implementation.  Code generators are encouraged to use
platform-specific native libraries or microprocessor instructions,
where available, to provide higher-performance implementations of
{@code Math} methods.  Such higher-performance
implementations still must conform to the specification for
{@code Math}.

<p>The quality of implementation specifications concern two
properties, accuracy of the returned result and monotonicity of the
method.  Accuracy of the floating-point {@code Math} methods is
measured in terms of <dfn>{@index ulp}s</dfn>, {@index "units in
the last place"}.  For a given floating-point format, an
{@linkplain #ulp(double) ulp} of a specific real number value is
the distance between the two floating-point values bracketing that
numerical value.  When discussing the accuracy of a method as a
whole rather than at a specific argument, the number of ulps cited
is for the worst-case error at any argument.  If a method always
has an error less than 0.5 ulps, the method always returns the
floating-point number nearest the exact result; such a method is
<dfn>correctly rounded</dfn>.  A {@index "correctly rounded"}
method is generally the best a floating-point approximation can be;
however, it is impractical for many floating-point methods to be
correctly rounded.  Instead, for the {@code Math} class, a larger
error bound of 1 or 2 ulps is allowed for certain methods.
Informally, with a 1 ulp error bound, when the exact result is a
representable number, the exact result should be returned as the
computed result; otherwise, either of the two floating-point values
which bracket the exact result may be returned.  For exact results
large in magnitude, one of the endpoints of the bracket may be
infinite.  Besides accuracy at individual arguments, maintaining
proper relations between the method at different arguments is also
important.  Therefore, most methods with more than 0.5 ulp errors
are required to be <dfn>{@index "semi-monotonic"}</dfn>: whenever
the mathematical function is non-decreasing, so is the
floating-point approximation, likewise, whenever the mathematical
function is non-increasing, so is the floating-point approximation.
Not all approximations that have 1 ulp accuracy will automatically
meet the monotonicity requirements.

<p>
The platform uses signed two's complement integer arithmetic with
{@code int} and {@code long} primitive types.  The developer should
choose the primitive type to ensure that arithmetic operations
consistently produce correct results, which in some cases means the
operations will not overflow the range of values of the
computation.  The best practice is to choose the primitive type and
algorithm to avoid overflow. In cases where the size is {@code int}
or {@code long} and overflow errors need to be detected, the
methods whose names end with {@code Exact} throw an {@code
ArithmeticException} when the results overflow.

<h2><a id=Ieee754RecommendedOps>IEEE 754 Recommended
Operations</a></h2>

The 2019 revision of the IEEE 754 floating-point standard includes
a section of recommended operations and the semantics of those
operations if they are included in a programming environment. The
recommended operations present in this class include {@link sin
sin}, {@link cos cos}, {@link tan tan}, {@link asin asin}, {@link
acos acos}, {@link atan atan}, {@link exp exp}, {@link expm1
expm1}, {@link log log}, {@link log10 log10}, {@link log1p log1p},
{@link sinh sinh}, {@link cosh cosh}, {@link tanh tanh}, {@link
hypot hypot}, and {@link pow pow}.  (The {@link sqrt sqrt}
operation is a required part of IEEE 754 from a different section
of the standard.) The special case behavior of the recommended
operations generally follows the guidance of the IEEE 754
standard. However, the {@code pow} method defines different
behavior for some arguments, as noted in its {@linkplain pow
specification}. The IEEE 754 standard defines its operations to be
correctly rounded, which is a more stringent quality of
implementation condition than required for most of the methods in
question that are also included in this class.

@spec https://standards.ieee.org/ieee/754/6210/
      IEEE Standard for Floating-Point Arithmetic

@since   1.0

## Math.E

```java
public static final double E
```

The {@code double} value that is closer than any other to
<i>e</i>, the base of the natural logarithms.

## Math.PI

```java
public static final double PI
```

The {@code double} value that is closer than any other to
<i>pi</i> (&pi;), the ratio of the circumference of a circle to
its diameter.

## Math.TAU

```java
public static final double TAU
```

The {@code double} value that is closer than any other to
<i>tau</i> (&tau;), the ratio of the circumference of a circle
to its radius.

@apiNote
The value of <i>pi</i> is one half that of <i>tau</i>; in other
words, <i>tau</i> is double <i>pi</i> .

@since 19

## Math.sin(double)

```java
public static double sin(double a)
```

Returns the trigonometric sine of an angle.  Special cases:
<ul><li>If the argument is NaN or an infinity, then the
result is NaN.
<li>If the argument is zero, then the result is a zero with the
same sign as the argument.</ul>

<p>The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

@param   a   an angle, in radians.
@return  the sine of the argument.

## Math.cos(double)

```java
public static double cos(double a)
```

Returns the trigonometric cosine of an angle. Special cases:
<ul><li>If the argument is NaN or an infinity, then the
result is NaN.
<li>If the argument is zero, then the result is {@code 1.0}.
</ul>

<p>The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

@param   a   an angle, in radians.
@return  the cosine of the argument.

## Math.tan(double)

```java
public static double tan(double a)
```

Returns the trigonometric tangent of an angle.  Special cases:
<ul><li>If the argument is NaN or an infinity, then the result
is NaN.
<li>If the argument is zero, then the result is a zero with the
same sign as the argument.</ul>

<p>The computed result must be within 1.25 ulps of the exact result.
Results must be semi-monotonic.

@param   a   an angle, in radians.
@return  the tangent of the argument.

## Math.asin(double)

```java
public static double asin(double a)
```

Returns the arc sine of a value; the returned angle is in the
range &minus;<i>pi</i>/2 through <i>pi</i>/2.  Special cases:
<ul><li>If the argument is NaN or its absolute value is greater
than 1, then the result is NaN.
<li>If the argument is zero, then the result is a zero with the
same sign as the argument.</ul>

<p>The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

@param   a   the value whose arc sine is to be returned.
@return  the arc sine of the argument.

## Math.acos(double)

```java
public static double acos(double a)
```

Returns the arc cosine of a value; the returned angle is in the
range 0.0 through <i>pi</i>.  Special case:
<ul><li>If the argument is NaN or its absolute value is greater
than 1, then the result is NaN.
<li>If the argument is {@code 1.0}, the result is positive zero.
</ul>

<p>The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

@param   a   the value whose arc cosine is to be returned.
@return  the arc cosine of the argument.

## Math.atan(double)

```java
public static double atan(double a)
```

Returns the arc tangent of a value; the returned angle is in the
range &minus;<i>pi</i>/2 through <i>pi</i>/2.  Special cases:
<ul><li>If the argument is NaN, then the result is NaN.
<li>If the argument is zero, then the result is a zero with the
same sign as the argument.
<li>If the argument is {@linkplain Double#isInfinite infinite},
then the result is the closest value to <i>pi</i>/2 with the
same sign as the input.
</ul>

<p>The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

@param   a   the value whose arc tangent is to be returned.
@return  the arc tangent of the argument.

## Math.toRadians(double)

```java
public static double toRadians(double angdeg)
```

Converts an angle measured in degrees to an approximately
equivalent angle measured in radians.  The conversion from
degrees to radians is generally inexact.

@param   angdeg   an angle, in degrees
@return  the measurement of the angle {@code angdeg}
         in radians.
@since   1.2

## Math.toDegrees(double)

```java
public static double toDegrees(double angrad)
```

Converts an angle measured in radians to an approximately
equivalent angle measured in degrees.  The conversion from
radians to degrees is generally inexact; users should
<i>not</i> expect {@code cos(toRadians(90.0))} to exactly
equal {@code 0.0}.

@param   angrad   an angle, in radians
@return  the measurement of the angle {@code angrad}
         in degrees.
@since   1.2

## Math.exp(double)

```java
public static double exp(double a)
```

Returns Euler's number <i>e</i> raised to the power of a
{@code double} value.  Special cases:
<ul><li>If the argument is NaN, the result is NaN.
<li>If the argument is positive infinity, then the result is
positive infinity.
<li>If the argument is negative infinity, then the result is
positive zero.
<li>If the argument is zero, then the result is {@code 1.0}.
</ul>

<p>The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

@param   a   the exponent to raise <i>e</i> to.
@return  the value <i>e</i><sup>{@code a}</sup>,
         where <i>e</i> is the base of the natural logarithms.

## Math.log(double)

```java
public static double log(double a)
```

Returns the natural logarithm (base <i>e</i>) of a {@code double}
value.  Special cases:
<ul><li>If the argument is NaN or less than zero, then the result
is NaN.
<li>If the argument is positive infinity, then the result is
positive infinity.
<li>If the argument is positive zero or negative zero, then the
result is negative infinity.
<li>If the argument is {@code 1.0}, then the result is positive
zero.
</ul>

<p>The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

@param   a   a value
@return  the value ln&nbsp;{@code a}, the natural logarithm of
         {@code a}.

## Math.log10(double)

```java
public static double log10(double a)
```

Returns the base 10 logarithm of a {@code double} value.
Special cases:

<ul><li>If the argument is NaN or less than zero, then the result
is NaN.
<li>If the argument is positive infinity, then the result is
positive infinity.
<li>If the argument is positive zero or negative zero, then the
result is negative infinity.
<li>If the argument is equal to 10<sup><i>n</i></sup> for
integer <i>n</i>, then the result is <i>n</i>. In particular,
if the argument is {@code 1.0} (10<sup>0</sup>), then the
result is positive zero.
</ul>

<p>The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

@param   a   a value
@return  the base 10 logarithm of  {@code a}.
@since 1.5

## Math.sqrt(double)

```java
public static double sqrt(double a)
```

Returns the correctly rounded positive square root of a
{@code double} value.
Special cases:
<ul><li>If the argument is NaN or less than zero, then the result
is NaN.
<li>If the argument is positive infinity, then the result is positive
infinity.
<li>If the argument is positive zero or negative zero, then the
result is the same as the argument.</ul>
Otherwise, the result is the {@code double} value closest to
the true mathematical square root of the argument value.

@apiNote
This method corresponds to the squareRoot operation defined in
IEEE 754.

@param   a   a value.
@return  the positive square root of {@code a}.
         If the argument is NaN or less than zero, the result is NaN.

## Math.cbrt(double)

```java
public static double cbrt(double a)
```

Returns the cube root of a {@code double} value.  For
positive finite {@code x}, {@code cbrt(-x) ==
-cbrt(x)}; that is, the cube root of a negative value is
the negative of the cube root of that value's magnitude.

Special cases:

<ul>

<li>If the argument is NaN, then the result is NaN.

<li>If the argument is infinite, then the result is an infinity
with the same sign as the argument.

<li>If the argument is zero, then the result is a zero with the
same sign as the argument.

</ul>

<p>The computed result must be within 1 ulp of the exact result.

@param   a   a value.
@return  the cube root of {@code a}.
@since 1.5

## Math.IEEEremainder(double, double)

```java
public static double IEEEremainder(double f1, double f2)
```

Computes the remainder operation on two arguments as prescribed
by the IEEE 754 standard.
The remainder value is mathematically equal to
<code>f1&nbsp;-&nbsp;f2</code>&nbsp;&times;&nbsp;<i>n</i>,
where <i>n</i> is the mathematical integer closest to the exact
mathematical value of the quotient {@code f1/f2}, and if two
mathematical integers are equally close to {@code f1/f2},
then <i>n</i> is the integer that is even. If the remainder is
zero, its sign is the same as the sign of the first argument.
Special cases:
<ul><li>If either argument is NaN, or the first argument is infinite,
or the second argument is positive zero or negative zero, then the
result is NaN.
<li>If the first argument is finite and the second argument is
infinite, then the result is the same as the first argument.</ul>

@param   f1   the dividend.
@param   f2   the divisor.
@return  the remainder when {@code f1} is divided by
         {@code f2}.

## Math.ceil(double)

```java
public static double ceil(double a)
```

Returns the smallest (closest to negative infinity)
{@code double} value that is greater than or equal to the
argument and is equal to a mathematical integer. Special cases:
<ul><li>If the argument value is already equal to a
mathematical integer, then the result is the same as the
argument.  <li>If the argument is NaN or an infinity or
positive zero or negative zero, then the result is the same as
the argument.  <li>If the argument value is less than zero but
greater than -1.0, then the result is negative zero.</ul> Note
that the value of {@code Math.ceil(x)} is exactly the
value of {@code -Math.floor(-x)}.

@apiNote
This method corresponds to the roundToIntegralTowardPositive
operation defined in IEEE 754.

@param   a   a value.
@return  the smallest (closest to negative infinity)
         floating-point value that is greater than or equal to
         the argument and is equal to a mathematical integer.

## Math.floor(double)

```java
public static double floor(double a)
```

Returns the largest (closest to positive infinity)
{@code double} value that is less than or equal to the
argument and is equal to a mathematical integer. Special cases:
<ul><li>If the argument value is already equal to a
mathematical integer, then the result is the same as the
argument.  <li>If the argument is NaN or an infinity or
positive zero or negative zero, then the result is the same as
the argument.</ul>

@apiNote
This method corresponds to the roundToIntegralTowardNegative
operation defined in IEEE 754.

@param   a   a value.
@return  the largest (closest to positive infinity)
         floating-point value that less than or equal to the argument
         and is equal to a mathematical integer.

## Math.rint(double)

```java
public static double rint(double a)
```

Returns the {@code double} value that is closest in value
to the argument and is equal to a mathematical integer. If two
{@code double} values that are mathematical integers are
equally close, the result is the integer value that is
even. Special cases:
<ul><li>If the argument value is already equal to a mathematical
integer, then the result is the same as the argument.
<li>If the argument is NaN or an infinity or positive zero or negative
zero, then the result is the same as the argument.</ul>

@apiNote
This method corresponds to the roundToIntegralTiesToEven
operation defined in IEEE 754.

@param   a   a {@code double} value.
@return  the closest floating-point value to {@code a} that is
         equal to a mathematical integer.

## Math.atan2(double, double)

```java
public static double atan2(double y, double x)
```

Returns the angle <i>theta</i> from the conversion of rectangular
coordinates ({@code x},&nbsp;{@code y}) to polar
coordinates (r,&nbsp;<i>theta</i>).
This method computes the phase <i>theta</i> by computing an arc tangent
of {@code y/x} in the range of &minus;<i>pi</i> to <i>pi</i>. Special
cases:
<ul><li>If either argument is NaN, then the result is NaN.
<li>If the first argument is positive zero and the second argument
is positive, or the first argument is positive and finite and the
second argument is positive infinity, then the result is positive
zero.
<li>If the first argument is negative zero and the second argument
is positive, or the first argument is negative and finite and the
second argument is positive infinity, then the result is negative zero.
<li>If the first argument is positive zero and the second argument
is negative, or the first argument is positive and finite and the
second argument is negative infinity, then the result is the
{@code double} value closest to <i>pi</i>.
<li>If the first argument is negative zero and the second argument
is negative, or the first argument is negative and finite and the
second argument is negative infinity, then the result is the
{@code double} value closest to -<i>pi</i>.
<li>If the first argument is positive and the second argument is
positive zero or negative zero, or the first argument is positive
infinity and the second argument is finite, then the result is the
{@code double} value closest to <i>pi</i>/2.
<li>If the first argument is negative and the second argument is
positive zero or negative zero, or the first argument is negative
infinity and the second argument is finite, then the result is the
{@code double} value closest to -<i>pi</i>/2.
<li>If both arguments are positive infinity, then the result is the
{@code double} value closest to <i>pi</i>/4.
<li>If the first argument is positive infinity and the second argument
is negative infinity, then the result is the {@code double}
value closest to 3*<i>pi</i>/4.
<li>If the first argument is negative infinity and the second argument
is positive infinity, then the result is the {@code double} value
closest to -<i>pi</i>/4.
<li>If both arguments are negative infinity, then the result is the
{@code double} value closest to -3*<i>pi</i>/4.</ul>

<p>The computed result must be within 2 ulps of the exact result.
Results must be semi-monotonic.

@apiNote
For <i>y</i> with a positive sign and finite nonzero
<i>x</i>, the exact mathematical value of {@code atan2} is
equal to:
<ul>
<li>If <i>x</i> {@literal >} 0, atan(abs(<i>y</i>/<i>x</i>))
<li>If <i>x</i> {@literal <} 0, &pi; - atan(abs(<i>y</i>/<i>x</i>))
</ul>

@param   y   the ordinate coordinate
@param   x   the abscissa coordinate
@return  the <i>theta</i> component of the point
         (<i>r</i>,&nbsp;<i>theta</i>)
         in polar coordinates that corresponds to the point
         (<i>x</i>,&nbsp;<i>y</i>) in Cartesian coordinates.

## Math.pow(double, double)

```java
public static double pow(double a, double b)
```

Returns the value of the first argument raised to the power of the
second argument. Special cases:

<ul><li>If the second argument is positive or negative zero, then the
result is 1.0.
<li>If the second argument is 1.0, then the result is the same as the
first argument.
<li>If the second argument is NaN, then the result is NaN.
<li>If the first argument is NaN and the second argument is nonzero,
then the result is NaN.

<li>If
<ul>
<li>the absolute value of the first argument is greater than 1
and the second argument is positive infinity, or
<li>the absolute value of the first argument is less than 1 and
the second argument is negative infinity,
</ul>
then the result is positive infinity.

<li>If
<ul>
<li>the absolute value of the first argument is greater than 1 and
the second argument is negative infinity, or
<li>the absolute value of the
first argument is less than 1 and the second argument is positive
infinity,
</ul>
then the result is positive zero.

<li>If the absolute value of the first argument equals 1 and the
second argument is infinite, then the result is NaN.

<li>If
<ul>
<li>the first argument is positive zero and the second argument
is greater than zero, or
<li>the first argument is positive infinity and the second
argument is less than zero,
</ul>
then the result is positive zero.

<li>If
<ul>
<li>the first argument is positive zero and the second argument
is less than zero, or
<li>the first argument is positive infinity and the second
argument is greater than zero,
</ul>
then the result is positive infinity.

<li>If
<ul>
<li>the first argument is negative zero and the second argument
is greater than zero but not a finite odd integer, or
<li>the first argument is negative infinity and the second
argument is less than zero but not a finite odd integer,
</ul>
then the result is positive zero.

<li>If
<ul>
<li>the first argument is negative zero and the second argument
is a positive finite odd integer, or
<li>the first argument is negative infinity and the second
argument is a negative finite odd integer,
</ul>
then the result is negative zero.

<li>If
<ul>
<li>the first argument is negative zero and the second argument
is less than zero but not a finite odd integer, or
<li>the first argument is negative infinity and the second
argument is greater than zero but not a finite odd integer,
</ul>
then the result is positive infinity.

<li>If
<ul>
<li>the first argument is negative zero and the second argument
is a negative finite odd integer, or
<li>the first argument is negative infinity and the second
argument is a positive finite odd integer,
</ul>
then the result is negative infinity.

<li>If the first argument is finite and less than zero
<ul>
<li> if the second argument is a finite even integer, the
result is equal to the result of raising the absolute value of
the first argument to the power of the second argument

<li>if the second argument is a finite odd integer, the result
is equal to the negative of the result of raising the absolute
value of the first argument to the power of the second
argument

<li>if the second argument is finite and not an integer, then
the result is NaN.
</ul>

<li>If both arguments are integers, then the result is exactly equal
to the mathematical result of raising the first argument to the power
of the second argument if that result can in fact be represented
exactly as a {@code double} value.</ul>

<p>(In the foregoing descriptions, a floating-point value is
considered to be an integer if and only if it is finite and a
fixed point of the method {@link #ceil ceil} or,
equivalently, a fixed point of the method {@link #floor
floor}. A value is a fixed point of a one-argument
method if and only if the result of applying the method to the
value is equal to the value.)

<p>The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

@apiNote
The special cases definitions of this method differ from the
special case definitions of the IEEE 754 recommended {@code
pow} operation for &plusmn;{@code 1.0} raised to an infinite
power. This method treats such cases as indeterminate and
specifies a NaN is returned. The IEEE 754 specification treats
the infinite power as a large integer (large-magnitude
floating-point numbers are numerically integers, specifically
even integers) and therefore specifies {@code 1.0} be returned.

@param   a   the base.
@param   b   the exponent.
@return  the value {@code a}<sup>{@code b}</sup>.

## Math.round(float)

```java
public static int round(float a)
```

Returns the closest {@code int} to the argument, with ties
rounding to positive infinity.

<p>
Special cases:
<ul><li>If the argument is NaN, the result is 0.
<li>If the argument is negative infinity or any value less than or
equal to the value of {@code Integer.MIN_VALUE}, the result is
equal to the value of {@code Integer.MIN_VALUE}.
<li>If the argument is positive infinity or any value greater than or
equal to the value of {@code Integer.MAX_VALUE}, the result is
equal to the value of {@code Integer.MAX_VALUE}.</ul>

@param   a   a floating-point value to be rounded to an integer.
@return  the value of the argument rounded to the nearest
         {@code int} value.
@see     java.lang.Integer#MAX_VALUE
@see     java.lang.Integer#MIN_VALUE

## Math.round(double)

```java
public static long round(double a)
```

Returns the closest {@code long} to the argument, with ties
rounding to positive infinity.

<p>Special cases:
<ul><li>If the argument is NaN, the result is 0.
<li>If the argument is negative infinity or any value less than or
equal to the value of {@code Long.MIN_VALUE}, the result is
equal to the value of {@code Long.MIN_VALUE}.
<li>If the argument is positive infinity or any value greater than or
equal to the value of {@code Long.MAX_VALUE}, the result is
equal to the value of {@code Long.MAX_VALUE}.</ul>

@param   a   a floating-point value to be rounded to a
         {@code long}.
@return  the value of the argument rounded to the nearest
         {@code long} value.
@see     java.lang.Long#MAX_VALUE
@see     java.lang.Long#MIN_VALUE

## Math.random()

```java
public static double random()
```

Returns a {@code double} value with a positive sign, greater
than or equal to {@code 0.0} and less than {@code 1.0}.
Returned values are chosen pseudorandomly with (approximately)
uniform distribution from that range.

<p>When this method is first called, it creates a single new
pseudorandom-number generator, exactly as if by the expression

<blockquote>{@code new java.util.Random()}</blockquote>

This new pseudorandom-number generator is used thereafter for
all calls to this method and is used nowhere else.

<p>This method is properly synchronized to allow correct use by
more than one thread. However, if many threads need to generate
pseudorandom numbers at a great rate, it may reduce contention
for each thread to have its own pseudorandom-number generator.

@apiNote
As the largest {@code double} value less than {@code 1.0}
is {@code Math.nextDown(1.0)}, a value {@code x} in the closed range
{@code [x1,x2]} where {@code x1<=x2} may be defined by the statements

<blockquote><pre>{@code
double f = Math.random()/Math.nextDown(1.0);
double x = x1*(1.0 - f) + x2*f;
}</pre></blockquote>

@return  a pseudorandom {@code double} greater than or equal
to {@code 0.0} and less than {@code 1.0}.
@see #nextDown(double)
@see Random#nextDouble()

## Math.addExact(int, int)

```java
public static int addExact(int x, int y)
```

Returns the sum of its arguments,
throwing an exception if the result overflows an {@code int}.

@param x the first value
@param y the second value
@return the result
@throws ArithmeticException if the result overflows an int
@since 1.8

## Math.addExact(long, long)

```java
public static long addExact(long x, long y)
```

Returns the sum of its arguments,
throwing an exception if the result overflows a {@code long}.

@param x the first value
@param y the second value
@return the result
@throws ArithmeticException if the result overflows a long
@since 1.8

## Math.subtractExact(int, int)

```java
public static int subtractExact(int x, int y)
```

Returns the difference of the arguments,
throwing an exception if the result overflows an {@code int}.

@param x the first value
@param y the second value to subtract from the first
@return the result
@throws ArithmeticException if the result overflows an int
@since 1.8

## Math.subtractExact(long, long)

```java
public static long subtractExact(long x, long y)
```

Returns the difference of the arguments,
throwing an exception if the result overflows a {@code long}.

@param x the first value
@param y the second value to subtract from the first
@return the result
@throws ArithmeticException if the result overflows a long
@since 1.8

## Math.multiplyExact(int, int)

```java
public static int multiplyExact(int x, int y)
```

Returns the product of the arguments,
throwing an exception if the result overflows an {@code int}.

@param x the first value
@param y the second value
@return the result
@throws ArithmeticException if the result overflows an int
@since 1.8

## Math.multiplyExact(long, int)

```java
public static long multiplyExact(long x, int y)
```

Returns the product of the arguments, throwing an exception if the result
overflows a {@code long}.

@param x the first value
@param y the second value
@return the result
@throws ArithmeticException if the result overflows a long
@since 9

## Math.multiplyExact(long, long)

```java
public static long multiplyExact(long x, long y)
```

Returns the product of the arguments,
throwing an exception if the result overflows a {@code long}.

@param x the first value
@param y the second value
@return the result
@throws ArithmeticException if the result overflows a long
@since 1.8

## Math.divideExact(int, int)

```java
public static int divideExact(int x, int y)
```

Returns the quotient of the arguments, throwing an exception if the
result overflows an {@code int}.  Such overflow occurs in this method if
{@code x} is {@link Integer#MIN_VALUE} and {@code y} is {@code -1}.
In contrast, if {@code Integer.MIN_VALUE / -1} were evaluated directly,
the result would be {@code Integer.MIN_VALUE} and no exception would be
thrown.
<p>
If {@code y} is zero, an {@code ArithmeticException} is thrown
(JLS {@jls 15.17.2}).
<p>
The built-in remainder operator "{@code %}" is a suitable counterpart
both for this method and for the built-in division operator "{@code /}".

@param x the dividend
@param y the divisor
@return the quotient {@code x / y}
@throws ArithmeticException if {@code y} is zero or the quotient
overflows an int
@jls 15.17.2 Division Operator /
@since 18

## Math.divideExact(long, long)

```java
public static long divideExact(long x, long y)
```

Returns the quotient of the arguments, throwing an exception if the
result overflows a {@code long}.  Such overflow occurs in this method if
{@code x} is {@link Long#MIN_VALUE} and {@code y} is {@code -1}.
In contrast, if {@code Long.MIN_VALUE / -1} were evaluated directly,
the result would be {@code Long.MIN_VALUE} and no exception would be
thrown.
<p>
If {@code y} is zero, an {@code ArithmeticException} is thrown
(JLS {@jls 15.17.2}).
<p>
The built-in remainder operator "{@code %}" is a suitable counterpart
both for this method and for the built-in division operator "{@code /}".

@param x the dividend
@param y the divisor
@return the quotient {@code x / y}
@throws ArithmeticException if {@code y} is zero or the quotient
overflows a long
@jls 15.17.2 Division Operator /
@since 18

## Math.floorDivExact(int, int)

```java
public static int floorDivExact(int x, int y)
```

Returns the largest (closest to positive infinity)
{@code int} value that is less than or equal to the algebraic quotient.
This method is identical to {@link #floorDiv(int,int)} except that it
throws an {@code ArithmeticException} when the dividend is
{@linkplain Integer#MIN_VALUE Integer.MIN_VALUE} and the divisor is
{@code -1} instead of ignoring the integer overflow and returning
{@code Integer.MIN_VALUE}.
<p>
The floor modulus method {@link #floorMod(int,int)} is a suitable
counterpart both for this method and for the {@link #floorDiv(int,int)}
method.
<p>
For examples, see {@link #floorDiv(int, int)}.

@param x the dividend
@param y the divisor
@return the largest (closest to positive infinity)
{@code int} value that is less than or equal to the algebraic quotient.
@throws ArithmeticException if the divisor {@code y} is zero, or the
dividend {@code x} is {@code Integer.MIN_VALUE} and the divisor {@code y}
is {@code -1}.
@see #floorDiv(int, int)
@since 18

## Math.floorDivExact(long, long)

```java
public static long floorDivExact(long x, long y)
```

Returns the largest (closest to positive infinity)
{@code long} value that is less than or equal to the algebraic quotient.
This method is identical to {@link #floorDiv(long,long)} except that it
throws an {@code ArithmeticException} when the dividend is
{@linkplain Long#MIN_VALUE Long.MIN_VALUE} and the divisor is
{@code -1} instead of ignoring the integer overflow and returning
{@code Long.MIN_VALUE}.
<p>
The floor modulus method {@link #floorMod(long,long)} is a suitable
counterpart both for this method and for the {@link #floorDiv(long,long)}
method.
<p>
For examples, see {@link #floorDiv(int, int)}.

@param x the dividend
@param y the divisor
@return the largest (closest to positive infinity)
{@code long} value that is less than or equal to the algebraic quotient.
@throws ArithmeticException if the divisor {@code y} is zero, or the
dividend {@code x} is {@code Long.MIN_VALUE} and the divisor {@code y}
is {@code -1}.
@see #floorDiv(long,long)
@since 18

## Math.ceilDivExact(int, int)

```java
public static int ceilDivExact(int x, int y)
```

Returns the smallest (closest to negative infinity)
{@code int} value that is greater than or equal to the algebraic quotient.
This method is identical to {@link #ceilDiv(int,int)} except that it
throws an {@code ArithmeticException} when the dividend is
{@linkplain Integer#MIN_VALUE Integer.MIN_VALUE} and the divisor is
{@code -1} instead of ignoring the integer overflow and returning
{@code Integer.MIN_VALUE}.
<p>
The ceil modulus method {@link #ceilMod(int,int)} is a suitable
counterpart both for this method and for the {@link #ceilDiv(int,int)}
method.
<p>
For examples, see {@link #ceilDiv(int, int)}.

@param x the dividend
@param y the divisor
@return the smallest (closest to negative infinity)
{@code int} value that is greater than or equal to the algebraic quotient.
@throws ArithmeticException if the divisor {@code y} is zero, or the
dividend {@code x} is {@code Integer.MIN_VALUE} and the divisor {@code y}
is {@code -1}.
@see #ceilDiv(int, int)
@since 18

## Math.ceilDivExact(long, long)

```java
public static long ceilDivExact(long x, long y)
```

Returns the smallest (closest to negative infinity)
{@code long} value that is greater than or equal to the algebraic quotient.
This method is identical to {@link #ceilDiv(long,long)} except that it
throws an {@code ArithmeticException} when the dividend is
{@linkplain Long#MIN_VALUE Long.MIN_VALUE} and the divisor is
{@code -1} instead of ignoring the integer overflow and returning
{@code Long.MIN_VALUE}.
<p>
The ceil modulus method {@link #ceilMod(long,long)} is a suitable
counterpart both for this method and for the {@link #ceilDiv(long,long)}
method.
<p>
For examples, see {@link #ceilDiv(int, int)}.

@param x the dividend
@param y the divisor
@return the smallest (closest to negative infinity)
{@code long} value that is greater than or equal to the algebraic quotient.
@throws ArithmeticException if the divisor {@code y} is zero, or the
dividend {@code x} is {@code Long.MIN_VALUE} and the divisor {@code y}
is {@code -1}.
@see #ceilDiv(long,long)
@since 18

## Math.incrementExact(int)

```java
public static int incrementExact(int a)
```

Returns the argument incremented by one, throwing an exception if the
result overflows an {@code int}.
The overflow only occurs for {@linkplain Integer#MAX_VALUE the maximum value}.

@param a the value to increment
@return the result
@throws ArithmeticException if the result overflows an int
@since 1.8

## Math.incrementExact(long)

```java
public static long incrementExact(long a)
```

Returns the argument incremented by one, throwing an exception if the
result overflows a {@code long}.
The overflow only occurs for {@linkplain Long#MAX_VALUE the maximum value}.

@param a the value to increment
@return the result
@throws ArithmeticException if the result overflows a long
@since 1.8

## Math.decrementExact(int)

```java
public static int decrementExact(int a)
```

Returns the argument decremented by one, throwing an exception if the
result overflows an {@code int}.
The overflow only occurs for {@linkplain Integer#MIN_VALUE the minimum value}.

@param a the value to decrement
@return the result
@throws ArithmeticException if the result overflows an int
@since 1.8

## Math.decrementExact(long)

```java
public static long decrementExact(long a)
```

Returns the argument decremented by one, throwing an exception if the
result overflows a {@code long}.
The overflow only occurs for {@linkplain Long#MIN_VALUE the minimum value}.

@param a the value to decrement
@return the result
@throws ArithmeticException if the result overflows a long
@since 1.8

## Math.negateExact(int)

```java
public static int negateExact(int a)
```

Returns the negation of the argument, throwing an exception if the
result overflows an {@code int}.
The overflow only occurs for {@linkplain Integer#MIN_VALUE the minimum value}.

@param a the value to negate
@return the result
@throws ArithmeticException if the result overflows an int
@since 1.8

## Math.negateExact(long)

```java
public static long negateExact(long a)
```

Returns the negation of the argument, throwing an exception if the
result overflows a {@code long}.
The overflow only occurs for {@linkplain Long#MIN_VALUE the minimum value}.

@param a the value to negate
@return the result
@throws ArithmeticException if the result overflows a long
@since 1.8

## Math.toIntExact(long)

```java
public static int toIntExact(long value)
```

Returns the value of the {@code long} argument,
throwing an exception if the value overflows an {@code int}.

@param value the long value
@return the argument as an int
@throws ArithmeticException if the {@code argument} overflows an int
@since 1.8

## Math.multiplyFull(int, int)

```java
public static long multiplyFull(int x, int y)
```

Returns the exact mathematical product of the arguments.

@param x the first value
@param y the second value
@return the result
@since 9

## Math.multiplyHigh(long, long)

```java
public static long multiplyHigh(long x, long y)
```

Returns as a {@code long} the most significant 64 bits of the 128-bit
product of two 64-bit factors.

@param x the first value
@param y the second value
@return the result
@see #unsignedMultiplyHigh
@since 9

## Math.unsignedMultiplyHigh(long, long)

```java
public static long unsignedMultiplyHigh(long x, long y)
```

Returns as a {@code long} the most significant 64 bits of the unsigned
128-bit product of two unsigned 64-bit factors.

@param x the first value
@param y the second value
@return the result
@see #multiplyHigh
@since 18

## Math.floorDiv(int, int)

```java
public static int floorDiv(int x, int y)
```

Returns the largest (closest to positive infinity)
{@code int} value that is less than or equal to the algebraic quotient.
There is one special case: if the dividend is
{@linkplain Integer#MIN_VALUE Integer.MIN_VALUE} and the divisor is {@code -1},
then integer overflow occurs and
the result is equal to {@code Integer.MIN_VALUE}.
<p>
Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
negative infinity (floor) rounding mode.
The floor rounding mode gives different results from truncation
when the exact quotient is not an integer and is negative.
<ul>
  <li>If the signs of the arguments are the same, the results of
      {@code floorDiv} and the {@code /} operator are the same.  <br>
      For example, {@code floorDiv(4, 3) == 1} and {@code (4 / 3) == 1}.</li>
  <li>If the signs of the arguments are different, {@code floorDiv}
      returns the largest integer less than or equal to the quotient
      while the {@code /} operator returns the smallest integer greater
      than or equal to the quotient.
      They differ if and only if the quotient is not an integer.<br>
      For example, {@code floorDiv(-4, 3) == -2},
      whereas {@code (-4 / 3) == -1}.
  </li>
</ul>

@param x the dividend
@param y the divisor
@return the largest (closest to positive infinity)
{@code int} value that is less than or equal to the algebraic quotient.
@throws ArithmeticException if the divisor {@code y} is zero
@see #floorMod(int, int)
@see #floor(double)
@since 1.8

## Math.floorDiv(long, int)

```java
public static long floorDiv(long x, int y)
```

Returns the largest (closest to positive infinity)
{@code long} value that is less than or equal to the algebraic quotient.
There is one special case: if the dividend is
{@linkplain Long#MIN_VALUE Long.MIN_VALUE} and the divisor is {@code -1},
then integer overflow occurs and
the result is equal to {@code Long.MIN_VALUE}.
<p>
Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
negative infinity (floor) rounding mode.
The floor rounding mode gives different results from truncation
when the exact result is not an integer and is negative.
<p>
For examples, see {@link #floorDiv(int, int)}.

@param x the dividend
@param y the divisor
@return the largest (closest to positive infinity)
{@code long} value that is less than or equal to the algebraic quotient.
@throws ArithmeticException if the divisor {@code y} is zero
@see #floorMod(long, int)
@see #floor(double)
@since 9

## Math.floorDiv(long, long)

```java
public static long floorDiv(long x, long y)
```

Returns the largest (closest to positive infinity)
{@code long} value that is less than or equal to the algebraic quotient.
There is one special case: if the dividend is
{@linkplain Long#MIN_VALUE Long.MIN_VALUE} and the divisor is {@code -1},
then integer overflow occurs and
the result is equal to {@code Long.MIN_VALUE}.
<p>
Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
negative infinity (floor) rounding mode.
The floor rounding mode gives different results from truncation
when the exact result is not an integer and is negative.
<p>
For examples, see {@link #floorDiv(int, int)}.

@param x the dividend
@param y the divisor
@return the largest (closest to positive infinity)
{@code long} value that is less than or equal to the algebraic quotient.
@throws ArithmeticException if the divisor {@code y} is zero
@see #floorMod(long, long)
@see #floor(double)
@since 1.8

## Math.floorMod(int, int)

```java
public static int floorMod(int x, int y)
```

Returns the floor modulus of the {@code int} arguments.
<p>
The floor modulus is {@code r = x - (floorDiv(x, y) * y)},
has the same sign as the divisor {@code y} or is zero, and
is in the range of {@code -abs(y) < r < +abs(y)}.

<p>
The relationship between {@code floorDiv} and {@code floorMod} is such that:
<ul>
  <li>{@code floorDiv(x, y) * y + floorMod(x, y) == x}</li>
</ul>
<p>
The difference in values between {@code floorMod} and the {@code %} operator
is due to the difference between {@code floorDiv} and the {@code /}
operator, as detailed in {@linkplain #floorDiv(int, int)}.
<p>
Examples:
<ul>
  <li>Regardless of the signs of the arguments, {@code floorMod}(x, y)
      is zero exactly when {@code x % y} is zero as well.</li>
  <li>If neither {@code floorMod}(x, y) nor {@code x % y} is zero,
      they differ exactly when the signs of the arguments differ.<br>
      <ul>
      <li>{@code floorMod(+4, +3) == +1}; &nbsp; and {@code (+4 % +3) == +1}</li>
      <li>{@code floorMod(-4, -3) == -1}; &nbsp; and {@code (-4 % -3) == -1}</li>
      <li>{@code floorMod(+4, -3) == -2}; &nbsp; and {@code (+4 % -3) == +1}</li>
      <li>{@code floorMod(-4, +3) == +2}; &nbsp; and {@code (-4 % +3) == -1}</li>
      </ul>
  </li>
</ul>

@param x the dividend
@param y the divisor
@return the floor modulus {@code x - (floorDiv(x, y) * y)}
@throws ArithmeticException if the divisor {@code y} is zero
@see #floorDiv(int, int)
@since 1.8

## Math.floorMod(long, int)

```java
public static int floorMod(long x, int y)
```

Returns the floor modulus of the {@code long} and {@code int} arguments.
<p>
The floor modulus is {@code r = x - (floorDiv(x, y) * y)},
has the same sign as the divisor {@code y} or is zero, and
is in the range of {@code -abs(y) < r < +abs(y)}.

<p>
The relationship between {@code floorDiv} and {@code floorMod} is such that:
<ul>
  <li>{@code floorDiv(x, y) * y + floorMod(x, y) == x}</li>
</ul>
<p>
For examples, see {@link #floorMod(int, int)}.

@param x the dividend
@param y the divisor
@return the floor modulus {@code x - (floorDiv(x, y) * y)}
@throws ArithmeticException if the divisor {@code y} is zero
@see #floorDiv(long, int)
@since 9

## Math.floorMod(long, long)

```java
public static long floorMod(long x, long y)
```

Returns the floor modulus of the {@code long} arguments.
<p>
The floor modulus is {@code r = x - (floorDiv(x, y) * y)},
has the same sign as the divisor {@code y} or is zero, and
is in the range of {@code -abs(y) < r < +abs(y)}.

<p>
The relationship between {@code floorDiv} and {@code floorMod} is such that:
<ul>
  <li>{@code floorDiv(x, y) * y + floorMod(x, y) == x}</li>
</ul>
<p>
For examples, see {@link #floorMod(int, int)}.

@param x the dividend
@param y the divisor
@return the floor modulus {@code x - (floorDiv(x, y) * y)}
@throws ArithmeticException if the divisor {@code y} is zero
@see #floorDiv(long, long)
@since 1.8

## Math.ceilDiv(int, int)

```java
public static int ceilDiv(int x, int y)
```

Returns the smallest (closest to negative infinity)
{@code int} value that is greater than or equal to the algebraic quotient.
There is one special case: if the dividend is
{@linkplain Integer#MIN_VALUE Integer.MIN_VALUE} and the divisor is {@code -1},
then integer overflow occurs and
the result is equal to {@code Integer.MIN_VALUE}.
<p>
Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
positive infinity (ceiling) rounding mode.
The ceiling rounding mode gives different results from truncation
when the exact quotient is not an integer and is positive.
<ul>
  <li>If the signs of the arguments are different, the results of
      {@code ceilDiv} and the {@code /} operator are the same.  <br>
      For example, {@code ceilDiv(-4, 3) == -1} and {@code (-4 / 3) == -1}.</li>
  <li>If the signs of the arguments are the same, {@code ceilDiv}
      returns the smallest integer greater than or equal to the quotient
      while the {@code /} operator returns the largest integer less
      than or equal to the quotient.
      They differ if and only if the quotient is not an integer.<br>
      For example, {@code ceilDiv(4, 3) == 2},
      whereas {@code (4 / 3) == 1}.
  </li>
</ul>

@param x the dividend
@param y the divisor
@return the smallest (closest to negative infinity)
{@code int} value that is greater than or equal to the algebraic quotient.
@throws ArithmeticException if the divisor {@code y} is zero
@see #ceilMod(int, int)
@see #ceil(double)
@since 18

## Math.ceilDiv(long, int)

```java
public static long ceilDiv(long x, int y)
```

Returns the smallest (closest to negative infinity)
{@code long} value that is greater than or equal to the algebraic quotient.
There is one special case: if the dividend is
{@linkplain Long#MIN_VALUE Long.MIN_VALUE} and the divisor is {@code -1},
then integer overflow occurs and
the result is equal to {@code Long.MIN_VALUE}.
<p>
Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
positive infinity (ceiling) rounding mode.
The ceiling rounding mode gives different results from truncation
when the exact result is not an integer and is positive.
<p>
For examples, see {@link #ceilDiv(int, int)}.

@param x the dividend
@param y the divisor
@return the smallest (closest to negative infinity)
{@code long} value that is greater than or equal to the algebraic quotient.
@throws ArithmeticException if the divisor {@code y} is zero
@see #ceilMod(int, int)
@see #ceil(double)
@since 18

## Math.ceilDiv(long, long)

```java
public static long ceilDiv(long x, long y)
```

Returns the smallest (closest to negative infinity)
{@code long} value that is greater than or equal to the algebraic quotient.
There is one special case: if the dividend is
{@linkplain Long#MIN_VALUE Long.MIN_VALUE} and the divisor is {@code -1},
then integer overflow occurs and
the result is equal to {@code Long.MIN_VALUE}.
<p>
Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
positive infinity (ceiling) rounding mode.
The ceiling rounding mode gives different results from truncation
when the exact result is not an integer and is positive.
<p>
For examples, see {@link #ceilDiv(int, int)}.

@param x the dividend
@param y the divisor
@return the smallest (closest to negative infinity)
{@code long} value that is greater than or equal to the algebraic quotient.
@throws ArithmeticException if the divisor {@code y} is zero
@see #ceilMod(int, int)
@see #ceil(double)
@since 18

## Math.ceilMod(int, int)

```java
public static int ceilMod(int x, int y)
```

Returns the ceiling modulus of the {@code int} arguments.
<p>
The ceiling modulus is {@code r = x - (ceilDiv(x, y) * y)},
has the opposite sign as the divisor {@code y} or is zero, and
is in the range of {@code -abs(y) < r < +abs(y)}.

<p>
The relationship between {@code ceilDiv} and {@code ceilMod} is such that:
<ul>
  <li>{@code ceilDiv(x, y) * y + ceilMod(x, y) == x}</li>
</ul>
<p>
The difference in values between {@code ceilMod} and the {@code %} operator
is due to the difference between {@code ceilDiv} and the {@code /}
operator, as detailed in {@linkplain #ceilDiv(int, int)}.
<p>
Examples:
<ul>
  <li>Regardless of the signs of the arguments, {@code ceilMod}(x, y)
      is zero exactly when {@code x % y} is zero as well.</li>
  <li>If neither {@code ceilMod}(x, y) nor {@code x % y} is zero,
      they differ exactly when the signs of the arguments are the same.<br>
      <ul>
      <li>{@code ceilMod(+4, +3) == -2}; &nbsp; and {@code (+4 % +3) == +1}</li>
      <li>{@code ceilMod(-4, -3) == +2}; &nbsp; and {@code (-4 % -3) == -1}</li>
      <li>{@code ceilMod(+4, -3) == +1}; &nbsp; and {@code (+4 % -3) == +1}</li>
      <li>{@code ceilMod(-4, +3) == -1}; &nbsp; and {@code (-4 % +3) == -1}</li>
      </ul>
  </li>
</ul>

@param x the dividend
@param y the divisor
@return the ceiling modulus {@code x - (ceilDiv(x, y) * y)}
@throws ArithmeticException if the divisor {@code y} is zero
@see #ceilDiv(int, int)
@since 18

## Math.ceilMod(long, int)

```java
public static int ceilMod(long x, int y)
```

Returns the ceiling modulus of the {@code long} and {@code int} arguments.
<p>
The ceiling modulus is {@code r = x - (ceilDiv(x, y) * y)},
has the opposite sign as the divisor {@code y} or is zero, and
is in the range of {@code -abs(y) < r < +abs(y)}.

<p>
The relationship between {@code ceilDiv} and {@code ceilMod} is such that:
<ul>
  <li>{@code ceilDiv(x, y) * y + ceilMod(x, y) == x}</li>
</ul>
<p>
For examples, see {@link #ceilMod(int, int)}.

@param x the dividend
@param y the divisor
@return the ceiling modulus {@code x - (ceilDiv(x, y) * y)}
@throws ArithmeticException if the divisor {@code y} is zero
@see #ceilDiv(long, int)
@since 18

## Math.ceilMod(long, long)

```java
public static long ceilMod(long x, long y)
```

Returns the ceiling modulus of the {@code long} arguments.
<p>
The ceiling modulus is {@code r = x - (ceilDiv(x, y) * y)},
has the opposite sign as the divisor {@code y} or is zero, and
is in the range of {@code -abs(y) < r < +abs(y)}.

<p>
The relationship between {@code ceilDiv} and {@code ceilMod} is such that:
<ul>
  <li>{@code ceilDiv(x, y) * y + ceilMod(x, y) == x}</li>
</ul>
<p>
For examples, see {@link #ceilMod(int, int)}.

@param x the dividend
@param y the divisor
@return the ceiling modulus {@code x - (ceilDiv(x, y) * y)}
@throws ArithmeticException if the divisor {@code y} is zero
@see #ceilDiv(long, long)
@since 18

## Math.abs(int)

```java
public static int abs(int a)
```

Returns the absolute value of an {@code int} value.
If the argument is not negative, the argument is returned.
If the argument is negative, the negation of the argument is returned.

<p>Note that if the argument is equal to the value of {@link
Integer#MIN_VALUE}, the most negative representable {@code int}
value, the result is that same value, which is negative. In
contrast, the {@link Math#absExact(int)} method throws an
{@code ArithmeticException} for this value.

@param   a   the argument whose absolute value is to be determined
@return  the absolute value of the argument.
@see Math#absExact(int)

## Math.absExact(int)

```java
public static int absExact(int a)
```

Returns the mathematical absolute value of an {@code int} value
if it is exactly representable as an {@code int}, throwing
{@code ArithmeticException} if the result overflows the
positive {@code int} range.

<p>Since the range of two's complement integers is asymmetric
with one additional negative value (JLS {@jls 4.2.1}), the
mathematical absolute value of {@link Integer#MIN_VALUE}
overflows the positive {@code int} range, so an exception is
thrown for that argument.

@param  a  the argument whose absolute value is to be determined
@return the absolute value of the argument, unless overflow occurs
@throws ArithmeticException if the argument is {@link Integer#MIN_VALUE}
@see Math#abs(int)
@since 15

## Math.abs(long)

```java
public static long abs(long a)
```

Returns the absolute value of a {@code long} value.
If the argument is not negative, the argument is returned.
If the argument is negative, the negation of the argument is returned.

<p>Note that if the argument is equal to the value of {@link
Long#MIN_VALUE}, the most negative representable {@code long}
value, the result is that same value, which is negative. In
contrast, the {@link Math#absExact(long)} method throws an
{@code ArithmeticException} for this value.

@param   a   the argument whose absolute value is to be determined
@return  the absolute value of the argument.
@see Math#absExact(long)

## Math.absExact(long)

```java
public static long absExact(long a)
```

Returns the mathematical absolute value of an {@code long} value
if it is exactly representable as an {@code long}, throwing
{@code ArithmeticException} if the result overflows the
positive {@code long} range.

<p>Since the range of two's complement integers is asymmetric
with one additional negative value (JLS {@jls 4.2.1}), the
mathematical absolute value of {@link Long#MIN_VALUE} overflows
the positive {@code long} range, so an exception is thrown for
that argument.

@param  a  the argument whose absolute value is to be determined
@return the absolute value of the argument, unless overflow occurs
@throws ArithmeticException if the argument is {@link Long#MIN_VALUE}
@see Math#abs(long)
@since 15

## Math.abs(float)

```java
public static float abs(float a)
```

Returns the absolute value of a {@code float} value.
If the argument is not negative, the argument is returned.
If the argument is negative, the negation of the argument is returned.
Special cases:
<ul><li>If the argument is positive zero or negative zero, the
result is positive zero.
<li>If the argument is infinite, the result is positive infinity.
<li>If the argument is NaN, the result is NaN.</ul>

@apiNote As implied by the above, one valid implementation of
this method is given by the expression below which computes a
{@code float} with the same exponent and significand as the
argument but with a guaranteed zero sign bit indicating a
positive value:<br>
{@code Float.intBitsToFloat(0x7fffffff & Float.floatToRawIntBits(a))}

@param   a   the argument whose absolute value is to be determined
@return  the absolute value of the argument.

## Math.abs(double)

```java
public static double abs(double a)
```

Returns the absolute value of a {@code double} value.
If the argument is not negative, the argument is returned.
If the argument is negative, the negation of the argument is returned.
Special cases:
<ul><li>If the argument is positive zero or negative zero, the result
is positive zero.
<li>If the argument is infinite, the result is positive infinity.
<li>If the argument is NaN, the result is NaN.</ul>

@apiNote As implied by the above, one valid implementation of
this method is given by the expression below which computes a
{@code double} with the same exponent and significand as the
argument but with a guaranteed zero sign bit indicating a
positive value:<br>
{@code Double.longBitsToDouble((Double.doubleToRawLongBits(a)<<1)>>>1)}

@param   a   the argument whose absolute value is to be determined
@return  the absolute value of the argument.

## Math.max(int, int)

```java
public static int max(int a, int b)
```

Returns the greater of two {@code int} values. That is, the
result is the argument closer to the value of
{@link Integer#MAX_VALUE}. If the arguments have the same value,
the result is that same value.

@param   a   an argument.
@param   b   another argument.
@return  the larger of {@code a} and {@code b}.

## Math.max(long, long)

```java
public static long max(long a, long b)
```

Returns the greater of two {@code long} values. That is, the
result is the argument closer to the value of
{@link Long#MAX_VALUE}. If the arguments have the same value,
the result is that same value.

@param   a   an argument.
@param   b   another argument.
@return  the larger of {@code a} and {@code b}.

## Math.max(float, float)

```java
public static float max(float a, float b)
```

Returns the greater of two {@code float} values.  That is,
the result is the argument closer to positive infinity. If the
arguments have the same value, the result is that same
value. If either value is NaN, then the result is NaN.  Unlike
the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero. If one
argument is positive zero and the other negative zero, the
result is positive zero.

@apiNote
This method corresponds to the maximum operation defined in
IEEE 754.

@param   a   an argument.
@param   b   another argument.
@return  the larger of {@code a} and {@code b}.

## Math.max(double, double)

```java
public static double max(double a, double b)
```

Returns the greater of two {@code double} values.  That
is, the result is the argument closer to positive infinity. If
the arguments have the same value, the result is that same
value. If either value is NaN, then the result is NaN.  Unlike
the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero. If one
argument is positive zero and the other negative zero, the
result is positive zero.

@apiNote
This method corresponds to the maximum operation defined in
IEEE 754.

@param   a   an argument.
@param   b   another argument.
@return  the larger of {@code a} and {@code b}.

## Math.min(int, int)

```java
public static int min(int a, int b)
```

Returns the smaller of two {@code int} values. That is,
the result the argument closer to the value of
{@link Integer#MIN_VALUE}.  If the arguments have the same
value, the result is that same value.

@param   a   an argument.
@param   b   another argument.
@return  the smaller of {@code a} and {@code b}.

## Math.min(long, long)

```java
public static long min(long a, long b)
```

Returns the smaller of two {@code long} values. That is,
the result is the argument closer to the value of
{@link Long#MIN_VALUE}. If the arguments have the same
value, the result is that same value.

@param   a   an argument.
@param   b   another argument.
@return  the smaller of {@code a} and {@code b}.

## Math.min(float, float)

```java
public static float min(float a, float b)
```

Returns the smaller of two {@code float} values.  That is,
the result is the value closer to negative infinity. If the
arguments have the same value, the result is that same
value. If either value is NaN, then the result is NaN.  Unlike
the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero.  If
one argument is positive zero and the other is negative zero,
the result is negative zero.

@apiNote
This method corresponds to the minimum operation defined in
IEEE 754.

@param   a   an argument.
@param   b   another argument.
@return  the smaller of {@code a} and {@code b}.

## Math.min(double, double)

```java
public static double min(double a, double b)
```

Returns the smaller of two {@code double} values.  That
is, the result is the value closer to negative infinity. If the
arguments have the same value, the result is that same
value. If either value is NaN, then the result is NaN.  Unlike
the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero. If one
argument is positive zero and the other is negative zero, the
result is negative zero.

@apiNote
This method corresponds to the minimum operation defined in
IEEE 754.

@param   a   an argument.
@param   b   another argument.
@return  the smaller of {@code a} and {@code b}.

## Math.clamp(long, int, int)

```java
public static int clamp(long value, int min, int max)
```

Clamps the value to fit between min and max. If the value is less
than {@code min}, then {@code min} is returned. If the value is greater
than {@code max}, then {@code max} is returned. Otherwise, the original
value is returned.
<p>
While the original value of type long may not fit into the int type,
the bounds have the int type, so the result always fits the int type.
This allows to use method to safely cast long value to int with
saturation.

@param value value to clamp
@param min minimal allowed value
@param max maximal allowed value
@return a clamped value that fits into {@code min..max} interval
@throws IllegalArgumentException if {@code min > max}

@since 21

## Math.clamp(long, long, long)

```java
public static long clamp(long value, long min, long max)
```

Clamps the value to fit between min and max. If the value is less
than {@code min}, then {@code min} is returned. If the value is greater
than {@code max}, then {@code max} is returned. Otherwise, the original
value is returned.

@param value value to clamp
@param min minimal allowed value
@param max maximal allowed value
@return a clamped value that fits into {@code min..max} interval
@throws IllegalArgumentException if {@code min > max}

@since 21

## Math.clamp(double, double, double)

```java
public static double clamp(double value, double min, double max)
```

Clamps the value to fit between min and max. If the value is less
than {@code min}, then {@code min} is returned. If the value is greater
than {@code max}, then {@code max} is returned. Otherwise, the original
value is returned. If value is NaN, the result is also NaN.
<p>
Unlike the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero.
E.g., {@code clamp(-0.0, 0.0, 1.0)} returns 0.0.

@param value value to clamp
@param min minimal allowed value
@param max maximal allowed value
@return a clamped value that fits into {@code min..max} interval
@throws IllegalArgumentException if either of {@code min} and {@code max}
arguments is NaN, or {@code min > max}, or {@code min} is +0.0, and
{@code max} is -0.0.

@since 21

## Math.clamp(float, float, float)

```java
public static float clamp(float value, float min, float max)
```

Clamps the value to fit between min and max. If the value is less
than {@code min}, then {@code min} is returned. If the value is greater
than {@code max}, then {@code max} is returned. Otherwise, the original
value is returned. If value is NaN, the result is also NaN.
<p>
Unlike the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero.
E.g., {@code clamp(-0.0f, 0.0f, 1.0f)} returns 0.0f.

@param value value to clamp
@param min minimal allowed value
@param max maximal allowed value
@return a clamped value that fits into {@code min..max} interval
@throws IllegalArgumentException if either of {@code min} and {@code max}
arguments is NaN, or {@code min > max}, or {@code min} is +0.0f, and
{@code max} is -0.0f.

@since 21

## Math.fma(double, double, double)

```java
public static double fma(double a, double b, double c)
```

Returns the fused multiply add of the three arguments; that is,
returns the exact product of the first two arguments summed
with the third argument and then rounded once to the nearest
{@code double}.

The rounding is done using the {@linkplain
java.math.RoundingMode#HALF_EVEN round to nearest even
rounding mode}.

In contrast, if {@code a * b + c} is evaluated as a regular
floating-point expression, two rounding errors are involved,
the first for the multiply operation, the second for the
addition operation.

<p>Special cases:
<ul>
<li> If any argument is NaN, the result is NaN.

<li> If one of the first two arguments is infinite and the
other is zero, the result is NaN.

<li> If the exact product of the first two arguments is infinite
(in other words, at least one of the arguments is infinite and
the other is neither zero nor NaN) and the third argument is an
infinity of the opposite sign, the result is NaN.

</ul>

<p>Note that {@code fma(a, 1.0, c)} returns the same
result as ({@code a + c}).  However,
{@code fma(a, b, +0.0)} does <em>not</em> always return the
same result as ({@code a * b}) since
{@code fma(-0.0, +0.0, +0.0)} is {@code +0.0} while
({@code -0.0 * +0.0}) is {@code -0.0}; {@code fma(a, b, -0.0)} is
equivalent to ({@code a * b}) however.

@apiNote This method corresponds to the fusedMultiplyAdd
operation defined in IEEE 754.

@param a a value
@param b a value
@param c a value

@return (<i>a</i>&nbsp;&times;&nbsp;<i>b</i>&nbsp;+&nbsp;<i>c</i>)
computed, as if with unlimited range and precision, and rounded
once to the nearest {@code double} value

@since 9

## Math.fma(float, float, float)

```java
public static float fma(float a, float b, float c)
```

Returns the fused multiply add of the three arguments; that is,
returns the exact product of the first two arguments summed
with the third argument and then rounded once to the nearest
{@code float}.

The rounding is done using the {@linkplain
java.math.RoundingMode#HALF_EVEN round to nearest even
rounding mode}.

In contrast, if {@code a * b + c} is evaluated as a regular
floating-point expression, two rounding errors are involved,
the first for the multiply operation, the second for the
addition operation.

<p>Special cases:
<ul>
<li> If any argument is NaN, the result is NaN.

<li> If one of the first two arguments is infinite and the
other is zero, the result is NaN.

<li> If the exact product of the first two arguments is infinite
(in other words, at least one of the arguments is infinite and
the other is neither zero nor NaN) and the third argument is an
infinity of the opposite sign, the result is NaN.

</ul>

<p>Note that {@code fma(a, 1.0f, c)} returns the same
result as ({@code a + c}).  However,
{@code fma(a, b, +0.0f)} does <em>not</em> always return the
same result as ({@code a * b}) since
{@code fma(-0.0f, +0.0f, +0.0f)} is {@code +0.0f} while
({@code -0.0f * +0.0f}) is {@code -0.0f}; {@code fma(a, b, -0.0f)} is
equivalent to ({@code a * b}) however.

@apiNote This method corresponds to the fusedMultiplyAdd
operation defined in IEEE 754.

@param a a value
@param b a value
@param c a value

@return (<i>a</i>&nbsp;&times;&nbsp;<i>b</i>&nbsp;+&nbsp;<i>c</i>)
computed, as if with unlimited range and precision, and rounded
once to the nearest {@code float} value

@since 9

## Math.ulp(double)

```java
public static double ulp(double d)
```

Returns the size of an ulp of the argument.  An ulp, unit in
the last place, of a {@code double} value is the positive
distance between this floating-point value and the {@code
double} value next larger in magnitude.  Note that for non-NaN
<i>x</i>, <code>ulp(-<i>x</i>) == ulp(<i>x</i>)</code>.

<p>Special Cases:
<ul>
<li> If the argument is NaN, then the result is NaN.
<li> If the argument is positive or negative infinity, then the
result is positive infinity.
<li> If the argument is positive or negative zero, then the result is
{@code Double.MIN_VALUE}.
<li> If the argument is &plusmn;{@code Double.MAX_VALUE}, then
the result is equal to 2<sup>971</sup>.
</ul>

@param d the floating-point value whose ulp is to be returned
@return the size of an ulp of the argument
@author Joseph D. Darcy
@since 1.5

## Math.ulp(float)

```java
public static float ulp(float f)
```

Returns the size of an ulp of the argument.  An ulp, unit in
the last place, of a {@code float} value is the positive
distance between this floating-point value and the {@code
float} value next larger in magnitude.  Note that for non-NaN
<i>x</i>, <code>ulp(-<i>x</i>) == ulp(<i>x</i>)</code>.

<p>Special Cases:
<ul>
<li> If the argument is NaN, then the result is NaN.
<li> If the argument is positive or negative infinity, then the
result is positive infinity.
<li> If the argument is positive or negative zero, then the result is
{@code Float.MIN_VALUE}.
<li> If the argument is &plusmn;{@code Float.MAX_VALUE}, then
the result is equal to 2<sup>104</sup>.
</ul>

@param f the floating-point value whose ulp is to be returned
@return the size of an ulp of the argument
@author Joseph D. Darcy
@since 1.5

## Math.signum(double)

```java
public static double signum(double d)
```

Returns the signum function of the argument; zero if the argument
is zero, 1.0 if the argument is greater than zero, -1.0 if the
argument is less than zero.

<p>Special Cases:
<ul>
<li> If the argument is NaN, then the result is NaN.
<li> If the argument is positive zero or negative zero, then the
     result is the same as the argument.
</ul>

@param d the floating-point value whose signum is to be returned
@return the signum function of the argument
@author Joseph D. Darcy
@since 1.5

## Math.signum(float)

```java
public static float signum(float f)
```

Returns the signum function of the argument; zero if the argument
is zero, 1.0f if the argument is greater than zero, -1.0f if the
argument is less than zero.

<p>Special Cases:
<ul>
<li> If the argument is NaN, then the result is NaN.
<li> If the argument is positive zero or negative zero, then the
     result is the same as the argument.
</ul>

@param f the floating-point value whose signum is to be returned
@return the signum function of the argument
@author Joseph D. Darcy
@since 1.5

## Math.sinh(double)

```java
public static double sinh(double x)
```

Returns the hyperbolic sine of a {@code double} value.
The hyperbolic sine of <i>x</i> is defined to be
(<i>e<sup>x</sup>&nbsp;&minus;&nbsp;e<sup>&minus;x</sup></i>)/2
where <i>e</i> is {@linkplain Math#E Euler's number}.

<p>Special cases:
<ul>

<li>If the argument is NaN, then the result is NaN.

<li>If the argument is infinite, then the result is an infinity
with the same sign as the argument.

<li>If the argument is zero, then the result is a zero with the
same sign as the argument.

</ul>

<p>The computed result must be within 2.5 ulps of the exact result.

@param   x The number whose hyperbolic sine is to be returned.
@return  The hyperbolic sine of {@code x}.
@since 1.5

## Math.cosh(double)

```java
public static double cosh(double x)
```

Returns the hyperbolic cosine of a {@code double} value.
The hyperbolic cosine of <i>x</i> is defined to be
(<i>e<sup>x</sup>&nbsp;+&nbsp;e<sup>&minus;x</sup></i>)/2
where <i>e</i> is {@linkplain Math#E Euler's number}.

<p>Special cases:
<ul>

<li>If the argument is NaN, then the result is NaN.

<li>If the argument is infinite, then the result is positive
infinity.

<li>If the argument is zero, then the result is {@code 1.0}.

</ul>

<p>The computed result must be within 2.5 ulps of the exact result.

@param   x The number whose hyperbolic cosine is to be returned.
@return  The hyperbolic cosine of {@code x}.
@since 1.5

## Math.tanh(double)

```java
public static double tanh(double x)
```

Returns the hyperbolic tangent of a {@code double} value.
The hyperbolic tangent of <i>x</i> is defined to be
(<i>e<sup>x</sup>&nbsp;&minus;&nbsp;e<sup>&minus;x</sup></i>)/(<i>e<sup>x</sup>&nbsp;+&nbsp;e<sup>&minus;x</sup></i>),
in other words, {@linkplain Math#sinh
sinh(<i>x</i>)}/{@linkplain Math#cosh cosh(<i>x</i>)}.  Note
that the absolute value of the exact tanh is always less than
1.

<p>Special cases:
<ul>

<li>If the argument is NaN, then the result is NaN.

<li>If the argument is zero, then the result is a zero with the
same sign as the argument.

<li>If the argument is positive infinity, then the result is
{@code +1.0}.

<li>If the argument is negative infinity, then the result is
{@code -1.0}.

</ul>

<p>The computed result must be within 2.5 ulps of the exact result.
The result of {@code tanh} for any finite input must have
an absolute value less than or equal to 1.  Note that once the
exact result of tanh is within 1/2 of an ulp of the limit value
of &plusmn;1, correctly signed &plusmn;{@code 1.0} should
be returned.

@param   x The number whose hyperbolic tangent is to be returned.
@return  The hyperbolic tangent of {@code x}.
@since 1.5

## Math.hypot(double, double)

```java
public static double hypot(double x, double y)
```

Returns sqrt(<i>x</i><sup>2</sup>&nbsp;+<i>y</i><sup>2</sup>)
without intermediate overflow or underflow.

<p>Special cases:
<ul>

<li> If either argument is infinite, then the result
is positive infinity.

<li> If either argument is NaN and neither argument is infinite,
then the result is NaN.

<li> If both arguments are zero, the result is positive zero.
</ul>

<p>The computed result must be within 1.5 ulps of the exact
result.  If one parameter is held constant, the results must be
semi-monotonic in the other parameter.

@param x a value
@param y a value
@return sqrt(<i>x</i><sup>2</sup>&nbsp;+<i>y</i><sup>2</sup>)
without intermediate overflow or underflow
@since 1.5

## Math.expm1(double)

```java
public static double expm1(double x)
```

Returns <i>e</i><sup>x</sup>&nbsp;&minus;1.  Note that for values of
<i>x</i> near 0, the exact sum of
{@code expm1(x)}&nbsp;+&nbsp;1 is much closer to the true
result of <i>e</i><sup>x</sup> than {@code exp(x)}.

<p>Special cases:
<ul>
<li>If the argument is NaN, the result is NaN.

<li>If the argument is positive infinity, then the result is
positive infinity.

<li>If the argument is negative infinity, then the result is
-1.0.

<li>If the argument is zero, then the result is a zero with the
same sign as the argument.

</ul>

<p>The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.  The result of
{@code expm1} for any finite input must be greater than or
equal to {@code -1.0}.  Note that once the exact result of
<i>e</i><sup>{@code x}</sup>&nbsp;-&nbsp;1 is within 1/2
ulp of the limit value -1, {@code -1.0} should be
returned.

@param   x   the exponent to raise <i>e</i> to in the computation of
             <i>e</i><sup>{@code x}</sup>&nbsp;&minus;1.
@return  the value <i>e</i><sup>{@code x}</sup>&nbsp;-&nbsp;1.
@since 1.5

## Math.log1p(double)

```java
public static double log1p(double x)
```

Returns the natural logarithm of the sum of the argument and 1.
Note that for small values {@code x}, the result of
{@code log1p(x)} is much closer to the true result of ln(1
+ {@code x}) than the floating-point evaluation of
{@code log(1.0+x)}.

<p>Special cases:

<ul>

<li>If the argument is NaN or less than -1, then the result is
NaN.

<li>If the argument is positive infinity, then the result is
positive infinity.

<li>If the argument is negative one, then the result is
negative infinity.

<li>If the argument is zero, then the result is a zero with the
same sign as the argument.

</ul>

<p>The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

@param   x   a value
@return the value ln({@code x}&nbsp;+&nbsp;1), the natural
log of {@code x}&nbsp;+&nbsp;1
@since 1.5

## Math.copySign(double, double)

```java
public static double copySign(double magnitude, double sign)
```

Returns the first floating-point argument with the sign of the
second floating-point argument.  Note that unlike the {@link
StrictMath#copySign(double, double) StrictMath.copySign}
method, this method does not require NaN {@code sign}
arguments to be treated as positive values; implementations are
permitted to treat some NaN arguments as positive and other NaN
arguments as negative to allow greater performance.

@apiNote
This method corresponds to the copySign operation defined in
IEEE 754.

@param magnitude  the parameter providing the magnitude of the result
@param sign   the parameter providing the sign of the result
@return a value with the magnitude of {@code magnitude}
and the sign of {@code sign}.
@since 1.6

## Math.copySign(float, float)

```java
public static float copySign(float magnitude, float sign)
```

Returns the first floating-point argument with the sign of the
second floating-point argument.  Note that unlike the {@link
StrictMath#copySign(float, float) StrictMath.copySign}
method, this method does not require NaN {@code sign}
arguments to be treated as positive values; implementations are
permitted to treat some NaN arguments as positive and other NaN
arguments as negative to allow greater performance.

@apiNote
This method corresponds to the copySign operation defined in
IEEE 754.

@param magnitude  the parameter providing the magnitude of the result
@param sign   the parameter providing the sign of the result
@return a value with the magnitude of {@code magnitude}
and the sign of {@code sign}.
@since 1.6

## Math.getExponent(float)

```java
public static int getExponent(float f)
```

Returns the unbiased exponent used in the representation of a
{@code float}.  Special cases:

<ul>
<li>If the argument is NaN or infinite, then the result is
{@link Float#MAX_EXPONENT} + 1.
<li>If the argument is zero or subnormal, then the result is
{@link Float#MIN_EXPONENT} - 1.
</ul>
@apiNote
This method is analogous to the logB operation defined in IEEE
754, but returns a different value on subnormal arguments.

@param f a {@code float} value
@return the unbiased exponent of the argument
@since 1.6

## Math.getExponent(double)

```java
public static int getExponent(double d)
```

Returns the unbiased exponent used in the representation of a
{@code double}.  Special cases:

<ul>
<li>If the argument is NaN or infinite, then the result is
{@link Double#MAX_EXPONENT} + 1.
<li>If the argument is zero or subnormal, then the result is
{@link Double#MIN_EXPONENT} - 1.
</ul>
@apiNote
This method is analogous to the logB operation defined in IEEE
754, but returns a different value on subnormal arguments.

@param d a {@code double} value
@return the unbiased exponent of the argument
@since 1.6

## Math.nextAfter(double, double)

```java
public static double nextAfter(double start, double direction)
```

Returns the floating-point number adjacent to the first
argument in the direction of the second argument.  If both
arguments compare as equal the second argument is returned.

<p>
Special cases:
<ul>
<li> If either argument is a NaN, then NaN is returned.

<li> If both arguments are signed zeros, {@code direction}
is returned unchanged (as implied by the requirement of
returning the second argument if the arguments compare as
equal).

<li> If {@code start} is
&plusmn;{@link Double#MIN_VALUE} and {@code direction}
has a value such that the result should have a smaller
magnitude, then a zero with the same sign as {@code start}
is returned.

<li> If {@code start} is infinite and
{@code direction} has a value such that the result should
have a smaller magnitude, {@link Double#MAX_VALUE} with the
same sign as {@code start} is returned.

<li> If {@code start} is equal to &plusmn;
{@link Double#MAX_VALUE} and {@code direction} has a
value such that the result should have a larger magnitude, an
infinity with same sign as {@code start} is returned.
</ul>

@param start  starting floating-point value
@param direction value indicating which of
{@code start}'s neighbors or {@code start} should
be returned
@return The floating-point number adjacent to {@code start} in the
direction of {@code direction}.
@since 1.6

## Math.nextAfter(float, double)

```java
public static float nextAfter(float start, double direction)
```

Returns the floating-point number adjacent to the first
argument in the direction of the second argument.  If both
arguments compare as equal a value equivalent to the second argument
is returned.

<p>
Special cases:
<ul>
<li> If either argument is a NaN, then NaN is returned.

<li> If both arguments are signed zeros, a value equivalent
to {@code direction} is returned.

<li> If {@code start} is
&plusmn;{@link Float#MIN_VALUE} and {@code direction}
has a value such that the result should have a smaller
magnitude, then a zero with the same sign as {@code start}
is returned.

<li> If {@code start} is infinite and
{@code direction} has a value such that the result should
have a smaller magnitude, {@link Float#MAX_VALUE} with the
same sign as {@code start} is returned.

<li> If {@code start} is equal to &plusmn;
{@link Float#MAX_VALUE} and {@code direction} has a
value such that the result should have a larger magnitude, an
infinity with same sign as {@code start} is returned.
</ul>

@param start  starting floating-point value
@param direction value indicating which of
{@code start}'s neighbors or {@code start} should
be returned
@return The floating-point number adjacent to {@code start} in the
direction of {@code direction}.
@since 1.6

## Math.nextUp(double)

```java
public static double nextUp(double d)
```

Returns the floating-point value adjacent to {@code d} in
the direction of positive infinity.  This method is
semantically equivalent to {@code nextAfter(d,
Double.POSITIVE_INFINITY)}; however, a {@code nextUp}
implementation may run faster than its equivalent
{@code nextAfter} call.

<p>Special Cases:
<ul>
<li> If the argument is NaN, the result is NaN.

<li> If the argument is positive infinity, the result is
positive infinity.

<li> If the argument is zero, the result is
{@link Double#MIN_VALUE}

</ul>

@apiNote This method corresponds to the nextUp
operation defined in IEEE 754.

@param d starting floating-point value
@return The adjacent floating-point value closer to positive
infinity.
@since 1.6

## Math.nextUp(float)

```java
public static float nextUp(float f)
```

Returns the floating-point value adjacent to {@code f} in
the direction of positive infinity.  This method is
semantically equivalent to {@code nextAfter(f,
Float.POSITIVE_INFINITY)}; however, a {@code nextUp}
implementation may run faster than its equivalent
{@code nextAfter} call.

<p>Special Cases:
<ul>
<li> If the argument is NaN, the result is NaN.

<li> If the argument is positive infinity, the result is
positive infinity.

<li> If the argument is zero, the result is
{@link Float#MIN_VALUE}

</ul>

@apiNote This method corresponds to the nextUp
operation defined in IEEE 754.

@param f starting floating-point value
@return The adjacent floating-point value closer to positive
infinity.
@since 1.6

## Math.nextDown(double)

```java
public static double nextDown(double d)
```

Returns the floating-point value adjacent to {@code d} in
the direction of negative infinity.  This method is
semantically equivalent to {@code nextAfter(d,
Double.NEGATIVE_INFINITY)}; however, a
{@code nextDown} implementation may run faster than its
equivalent {@code nextAfter} call.

<p>Special Cases:
<ul>
<li> If the argument is NaN, the result is NaN.

<li> If the argument is negative infinity, the result is
negative infinity.

<li> If the argument is zero, the result is
{@code -Double.MIN_VALUE}

</ul>

@apiNote This method corresponds to the nextDown
operation defined in IEEE 754.

@param d  starting floating-point value
@return The adjacent floating-point value closer to negative
infinity.
@since 1.8

## Math.nextDown(float)

```java
public static float nextDown(float f)
```

Returns the floating-point value adjacent to {@code f} in
the direction of negative infinity.  This method is
semantically equivalent to {@code nextAfter(f,
Float.NEGATIVE_INFINITY)}; however, a
{@code nextDown} implementation may run faster than its
equivalent {@code nextAfter} call.

<p>Special Cases:
<ul>
<li> If the argument is NaN, the result is NaN.

<li> If the argument is negative infinity, the result is
negative infinity.

<li> If the argument is zero, the result is
{@code -Float.MIN_VALUE}

</ul>

@apiNote This method corresponds to the nextDown
operation defined in IEEE 754.

@param f  starting floating-point value
@return The adjacent floating-point value closer to negative
infinity.
@since 1.8

## Math.scalb(double, int)

```java
public static double scalb(double d, int scaleFactor)
```

Returns {@code d} &times; 2<sup>{@code scaleFactor}</sup>
rounded as if performed by a single correctly rounded
floating-point multiply.  If the exponent of the result is
between {@link Double#MIN_EXPONENT} and {@link
Double#MAX_EXPONENT}, the answer is calculated exactly.  If the
exponent of the result would be larger than {@code
Double.MAX_EXPONENT}, an infinity is returned.  Note that if
the result is subnormal, precision may be lost; that is, when
{@code scalb(x, n)} is subnormal, {@code scalb(scalb(x, n),
-n)} may not equal <i>x</i>.  When the result is non-NaN, the
result has the same sign as {@code d}.

<p>Special cases:
<ul>
<li> If the first argument is NaN, NaN is returned.
<li> If the first argument is infinite, then an infinity of the
same sign is returned.
<li> If the first argument is zero, then a zero of the same
sign is returned.
</ul>

@apiNote This method corresponds to the scaleB operation
defined in IEEE 754.

@param d number to be scaled by a power of two.
@param scaleFactor power of 2 used to scale {@code d}
@return {@code d} &times; 2<sup>{@code scaleFactor}</sup>
@since 1.6

## Math.scalb(float, int)

```java
public static float scalb(float f, int scaleFactor)
```

Returns {@code f} &times; 2<sup>{@code scaleFactor}</sup>
rounded as if performed by a single correctly rounded
floating-point multiply.  If the exponent of the result is
between {@link Float#MIN_EXPONENT} and {@link
Float#MAX_EXPONENT}, the answer is calculated exactly.  If the
exponent of the result would be larger than {@code
Float.MAX_EXPONENT}, an infinity is returned.  Note that if the
result is subnormal, precision may be lost; that is, when
{@code scalb(x, n)} is subnormal, {@code scalb(scalb(x, n),
-n)} may not equal <i>x</i>.  When the result is non-NaN, the
result has the same sign as {@code f}.

<p>Special cases:
<ul>
<li> If the first argument is NaN, NaN is returned.
<li> If the first argument is infinite, then an infinity of the
same sign is returned.
<li> If the first argument is zero, then a zero of the same
sign is returned.
</ul>

@apiNote This method corresponds to the scaleB operation
defined in IEEE 754.

@param f number to be scaled by a power of two.
@param scaleFactor power of 2 used to scale {@code f}
@return {@code f} &times; 2<sup>{@code scaleFactor}</sup>
@since 1.6

## Math.unsignedMultiplyExact(int, int)

```java
public static int unsignedMultiplyExact(int x, int y)
```

Returns the product of the unsigned arguments,
throwing an exception if the result overflows an unsigned {@code int}.

@param x the first unsigned value
@param y the second unsigned value
@return the result
@throws ArithmeticException if the result overflows an unsigned int
@since 25

## Math.unsignedMultiplyExact(long, int)

```java
public static long unsignedMultiplyExact(long x, int y)
```

Returns the product of the unsigned arguments,
throwing an exception if the result overflows an unsigned {@code long}.

@param x the first unsigned value
@param y the second unsigned value
@return the result
@throws ArithmeticException if the result overflows an unsigned long
@since 25

## Math.unsignedMultiplyExact(long, long)

```java
public static long unsignedMultiplyExact(long x, long y)
```

Returns the product of the unsigned arguments,
throwing an exception if the result overflows an unsigned {@code long}.

@param x the first unsigned value
@param y the second unsigned value
@return the result
@throws ArithmeticException if the result overflows an unsigned long
@since 25

## Math.powExact(int, int)

```java
public static int powExact(int x, int n)
```

Returns {@code x} raised to the power of {@code n},
throwing an exception if the result overflows an {@code int}.
When {@code n} is 0, the returned value is 1.

@param x the base.
@param n the exponent.
@return {@code x} raised to the power of {@code n}.
@throws ArithmeticException when {@code n} is negative,
     or when the result overflows an int.
@since 25

## Math.unsignedPowExact(int, int)

```java
public static int unsignedPowExact(int x, int n)
```

Returns unsigned {@code x} raised to the power of {@code n},
throwing an exception if the result overflows an unsigned {@code int}.
When {@code n} is 0, the returned value is 1.

@param x the unsigned base.
@param n the exponent.
@return {@code x} raised to the power of {@code n}.
@throws ArithmeticException when {@code n} is negative,
     or when the result overflows an unsigned int.
@since 25

## Math.powExact(long, int)

```java
public static long powExact(long x, int n)
```

Returns {@code x} raised to the power of {@code n},
throwing an exception if the result overflows a {@code long}.
When {@code n} is 0, the returned value is 1.

@param x the base.
@param n the exponent.
@return {@code x} raised to the power of {@code n}.
@throws ArithmeticException when {@code n} is negative,
     or when the result overflows a long.
@since 25

## Math.unsignedPowExact(long, int)

```java
public static long unsignedPowExact(long x, int n)
```

Returns unsigned {@code x} raised to the power of {@code n},
throwing an exception if the result overflows an unsigned {@code long}.
When {@code n} is 0, the returned value is 1.

@param x the unsigned base.
@param n the exponent.
@return {@code x} raised to the power of {@code n}.
@throws ArithmeticException when {@code n} is negative,
     or when the result overflows an unsigned long.
@since 25