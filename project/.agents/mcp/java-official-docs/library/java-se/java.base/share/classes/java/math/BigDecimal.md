# BigDecimal class (java.math)

```java
public class BigDecimal extends Number implements Comparable<BigDecimal>
```

Immutable, arbitrary-precision signed decimal numbers.  A {@code
BigDecimal} consists of an arbitrary precision integer
<i>{@linkplain unscaledValue() unscaled value}</i> and a 32-bit
integer <i>{@linkplain scale() scale}</i>.  If the
scale is zero or positive, the scale is the number of digits to
the right of the decimal point.  If the scale is negative, the
unscaled value of the number is multiplied by ten to the power of
the negation of the scale.  The value of the number represented by
the {@code BigDecimal} is therefore
<code>(unscaledValue &times; 10<sup>-scale</sup>)</code>.

<p>The {@code BigDecimal} class provides operations for
arithmetic, scale manipulation, rounding, comparison, hashing, and
format conversion.  The {@link #toString} method provides a
canonical representation of a {@code BigDecimal}.

<p>The {@code BigDecimal} class gives its user complete control
over rounding behavior.  If no rounding mode is specified and the
exact result cannot be represented, an {@code ArithmeticException}
is thrown; otherwise, calculations can be carried out to a chosen
precision and rounding mode by supplying an appropriate {@link
MathContext} object to the operation.  In either case, eight
<em>rounding modes</em> are provided for the control of rounding.
Using the integer fields in this class (such as {@link
#ROUND_HALF_UP}) to represent rounding mode is deprecated; the
enumeration values of the {@code RoundingMode} {@code enum}, (such
as {@link RoundingMode#HALF_UP}) should be used instead.

<p>When a {@code MathContext} object is supplied with a precision
setting of 0 (for example, {@link MathContext#UNLIMITED}),
arithmetic operations are exact, as are the arithmetic methods
which take no {@code MathContext} object. As a corollary of
computing the exact result, the rounding mode setting of a {@code
MathContext} object with a precision setting of 0 is not used and
thus irrelevant.  In the case of divide, the exact quotient could
have an infinitely long decimal expansion; for example, 1 divided
by 3.  If the quotient has a nonterminating decimal expansion and
the operation is specified to return an exact result, an {@code
ArithmeticException} is thrown.  Otherwise, the exact result of the
division is returned, as done for other operations.

<p>When the precision setting is not 0, the rules of {@code
BigDecimal} arithmetic are broadly compatible with selected modes
of operation of the arithmetic defined in ANSI X3.274-1996 and ANSI
X3.274-1996/AM 1-2000 (section 7.4).  Unlike those standards,
{@code BigDecimal} includes many rounding modes.  Any conflicts
between these ANSI standards and the {@code BigDecimal}
specification are resolved in favor of {@code BigDecimal}.

<p>Since the same numerical value can have different
representations (with different scales), the rules of arithmetic
and rounding must specify both the numerical result and the scale
used in the result's representation.

The different representations of the same numerical value are
called members of the same <i>cohort</i>. The {@linkplain
compareTo(BigDecimal) natural order} of {@code BigDecimal}
considers members of the same cohort to be equal to each other. In
contrast, the {@link equals equals} method requires both the
numerical value and representation to be the same for equality to
hold. The results of methods like {@link #scale()} and {@link
#unscaledValue()} will differ for numerically equal values with
different representations.

<p>In general the rounding modes and precision setting determine
how operations return results with a limited number of digits when
the exact result has more digits (perhaps infinitely many in the
case of division and square root) than the number of digits returned.

First, the total number of digits to return is specified by the
{@code MathContext}'s {@code precision} setting; this determines
the result's <i>precision</i>.  The digit count starts from the
leftmost nonzero digit of the exact result.  The rounding mode
determines how any discarded trailing digits affect the returned
result.

<p>For all arithmetic operators, the operation is carried out as
though an exact intermediate result were first calculated and then
rounded to the number of digits specified by the precision setting
(if necessary), using the selected rounding mode.  If the exact
result is not returned, some digit positions of the exact result
are discarded.  When rounding increases the magnitude of the
returned result, it is possible for a new digit position to be
created by a carry propagating to a leading {@literal "9"} digit.
For example, rounding the value 999.9 to three digits rounding up
would be numerically equal to one thousand, represented as
100&times;10<sup>1</sup>.  In such cases, the new {@literal "1"} is
the leading digit position of the returned result.

<p>For methods and constructors with a {@code MathContext}
parameter, if the result is inexact but the rounding mode is {@link
RoundingMode#UNNECESSARY UNNECESSARY}, an {@code
ArithmeticException} will be thrown.

<p>Besides a logical exact result, each arithmetic operation has a
preferred scale for representing a result.  The preferred
scale for each operation is listed in the table below.

<table class="striped" style="text-align:left">
<caption>Preferred Scales for Results of Arithmetic Operations
</caption>
<thead>
<tr><th scope="col">Operation</th><th scope="col">Preferred Scale of Result</th></tr>
</thead>
<tbody>
<tr><th scope="row">Add</th><td>max(addend.scale(), augend.scale())</td>
<tr><th scope="row">Subtract</th><td>max(minuend.scale(), subtrahend.scale())</td>
<tr><th scope="row">Multiply</th><td>multiplier.scale() + multiplicand.scale()</td>
<tr><th scope="row">Divide</th><td>dividend.scale() - divisor.scale()</td>
<tr><th scope="row">Square root</th><td>radicand.scale()/2</td>
</tbody>
</table>

These scales are the ones used by the methods which return exact
arithmetic results; except that an exact divide may have to use a
larger scale since the exact result may have more digits.  For
example, {@code 1/32} is {@code 0.03125}.

<p>Before rounding, the scale of the logical exact intermediate
result is the preferred scale for that operation.  If the exact
numerical result cannot be represented in {@code precision}
digits, rounding selects the set of digits to return and the scale
of the result is reduced from the scale of the intermediate result
to the least scale which can represent the {@code precision}
digits actually returned.  If the exact result can be represented
with at most {@code precision} digits, the representation
of the result with the scale closest to the preferred scale is
returned.  In particular, an exactly representable quotient may be
represented in fewer than {@code precision} digits by removing
trailing zeros and decreasing the scale.  For example, rounding to
three digits using the {@linkplain RoundingMode#FLOOR floor}
rounding mode, <br>

{@code 19/100 = 0.19   // integer=19,  scale=2} <br>

but<br>

{@code 21/110 = 0.190  // integer=190, scale=3} <br>

<p>Note that for add, subtract, and multiply, the reduction in
scale will equal the number of digit positions of the exact result
which are discarded. If the rounding causes a carry propagation to
create a new high-order digit position, an additional digit of the
result is discarded than when no new digit position is created.

<p>Other methods may have slightly different rounding semantics.
For example, the result of the {@code pow} method using the
{@linkplain #pow(int, MathContext) specified algorithm} can
occasionally differ from the rounded mathematical result by more
than one unit in the last place, one <i>{@linkplain #ulp() ulp}</i>.

<p>Two types of operations are provided for manipulating the scale
of a {@code BigDecimal}: scaling/rounding operations and decimal
point motion operations.  Scaling/rounding operations ({@link
#setScale setScale} and {@link #round round}) return a
{@code BigDecimal} whose value is approximately (or exactly) equal
to that of the operand, but whose scale or precision is the
specified value; that is, they increase or decrease the precision
of the stored number with minimal effect on its value.  Decimal
point motion operations ({@link #movePointLeft movePointLeft} and
{@link #movePointRight movePointRight}) return a
{@code BigDecimal} created from the operand by moving the decimal
point a specified distance in the specified direction.

<p>As a 32-bit integer, the set of values for the scale is large,
but bounded. If the scale of a result would exceed the range of a
32-bit integer, either by overflow or underflow, the operation may
throw an {@code ArithmeticException}.

<p>For the sake of brevity and clarity, pseudo-code is used
throughout the descriptions of {@code BigDecimal} methods.  The
pseudo-code expression {@code (i + j)} is shorthand for "a
{@code BigDecimal} whose value is that of the {@code BigDecimal}
{@code i} added to that of the {@code BigDecimal}
{@code j}." The pseudo-code expression {@code (i == j)} is
shorthand for "{@code true} if and only if the
{@code BigDecimal} {@code i} represents the same value as the
{@code BigDecimal} {@code j}." Other pseudo-code expressions
are interpreted similarly.  Square brackets are used to represent
the particular {@code BigInteger} and scale pair defining a
{@code BigDecimal} value; for example [19, 2] is the
{@code BigDecimal} numerically equal to 0.19 having a scale of 2.

<p>All methods and constructors for this class throw
{@code NullPointerException} when passed a {@code null} object
reference for any input parameter.

@apiNote Care should be exercised if {@code BigDecimal} objects are
used as keys in a {@link java.util.SortedMap SortedMap} or elements
in a {@link java.util.SortedSet SortedSet} since {@code
BigDecimal}'s <i>{@linkplain compareTo(BigDecimal) natural
ordering}</i> is <em>inconsistent with equals</em>.  See {@link
Comparable}, {@link java.util.SortedMap} or {@link
java.util.SortedSet} for more information.

<h2>Relation to IEEE 754 Decimal Arithmetic</h2>

Starting with its 2008 revision, the <cite>IEEE 754 Standard for
Floating-point Arithmetic</cite> has covered decimal formats and
operations. While there are broad similarities in the decimal
arithmetic defined by IEEE 754 and by this class, there are notable
differences as well. The fundamental similarity shared by {@code
BigDecimal} and IEEE 754 decimal arithmetic is the conceptual
operation of computing the mathematical infinitely precise real
number value of an operation and then mapping that real number to a
representable decimal floating-point value under a <em>rounding
policy</em>. The rounding policy is called a {@linkplain
RoundingMode rounding mode} for {@code BigDecimal} and called a
rounding-direction attribute in IEEE 754-2019. When the exact value
is not representable, the rounding policy determines which of the
two representable decimal values bracketing the exact value is
selected as the computed result. The notion of a <em>preferred
scale/preferred exponent</em> is also shared by both systems.

<p>For differences, IEEE 754 includes several kinds of values not
modeled by {@code BigDecimal} including negative zero, signed
infinities, and NaN (not-a-number). IEEE 754 defines formats, which
are parameterized by base (binary or decimal), number of digits of
precision, and exponent range. A format determines the set of
representable values. Most operations accept as input one or more
values of a given format and produce a result in the same format.
A {@code BigDecimal}'s {@linkplain scale() scale} is equivalent to
negating an IEEE 754 value's exponent. {@code BigDecimal} values do
not have a format in the same sense; all values have the same
possible range of scale/exponent and the {@linkplain
unscaledValue() unscaled value} has arbitrary precision. Instead,
for the {@code BigDecimal} operations taking a {@code MathContext}
parameter, if the {@code MathContext} has a nonzero precision, the
set of possible representable values for the result is determined
by the precision of the {@code MathContext} argument. For example
in {@code BigDecimal}, if a nonzero three-digit number and a
nonzero four-digit number are multiplied together in the context of
a {@code MathContext} object having a precision of three, the
result will have three digits (assuming no overflow or underflow,
etc.).

<p>The rounding policies implemented by {@code BigDecimal}
operations indicated by {@linkplain RoundingMode rounding modes}
are a proper superset of the IEEE 754 rounding-direction
attributes.

<p>{@code BigDecimal} arithmetic will most resemble IEEE 754
decimal arithmetic if a {@code MathContext} corresponding to an
IEEE 754 decimal format, such as {@linkplain MathContext#DECIMAL64
decimal64} or {@linkplain MathContext#DECIMAL128 decimal128} is
used to round all starting values and intermediate operations. The
numerical values computed can differ if the exponent range of the
IEEE 754 format being approximated is exceeded since a {@code
MathContext} does not constrain the scale of {@code BigDecimal}
results. Operations that would generate a NaN or exact infinity,
such as dividing by zero, throw an {@code ArithmeticException} in
{@code BigDecimal} arithmetic.

<h2><a id=algorithmicComplexity>Algorithmic Complexity</a></h2>

Operations on {@code BigDecimal} values have a range of algorithmic
complexities; in general, those complexities are a function of both
the size of the unscaled value as well as the size of the
scale. For example, an {@linkplain BigDecimal#multiply(BigDecimal)
exact multiply} of two {@code BigDecimal} values is subject to the
same {@linkplain BigInteger##algorithmicComplexity complexity
constraints} as {@code BigInteger} multiply of the unscaled
values. In contrast, a {@code BigDecimal} value with a compact
representation like {@code new BigDecimal(1E-1000000000)} has a
{@link toPlainString} result with over one billion characters.

<p>Operations may also allocate and compute on intermediate
results, potentially those allocations may be as large as in
proportion to the running time of the algorithm.

<p>Users of {@code BigDecimal} concerned with bounding the running
time or space of operations can screen out {@code BigDecimal}
values with unscaled values or scales above a chosen magnitude.

@see BigInteger
@see MathContext
@see RoundingMode
@see java.util.SortedMap
@see java.util.SortedSet
@spec https://standards.ieee.org/ieee/754/6210/
      IEEE Standard for Floating-Point Arithmetic

@author  Josh Bloch
@author  Mike Cowlishaw
@author  Joseph D. Darcy
@author  Sergey V. Kuksenko
@since 1.1

## BigDecimal.ZERO

```java
public static final BigDecimal ZERO
```

The value 0, with a scale of 0.

@since  1.5

## BigDecimal.ONE

```java
public static final BigDecimal ONE
```

The value 1, with a scale of 0.

@since  1.5

## BigDecimal.TWO

```java
public static final BigDecimal TWO
```

The value 2, with a scale of 0.

@since  19

## BigDecimal.TEN

```java
public static final BigDecimal TEN
```

The value 10, with a scale of 0.

@since  1.5

## BigDecimal.BigDecimal(char[], int, int)

```java
public BigDecimal(char[] in, int offset, int len)
```

Translates a character array representation of a
{@code BigDecimal} into a {@code BigDecimal}, accepting the
same sequence of characters as the {@link #BigDecimal(String)}
constructor, while allowing a sub-array to be specified.

@implNote If the sequence of characters is already available
within a character array, using this constructor is faster than
converting the {@code char} array to string and using the
{@code BigDecimal(String)} constructor.

@param  in {@code char} array that is the source of characters.
@param  offset first character in the array to inspect.
@param  len number of characters to consider.
@throws NumberFormatException if {@code in} is not a valid
        representation of a {@code BigDecimal} or the defined subarray
        is not wholly within {@code in}.
@since  1.5

## BigDecimal.BigDecimal(char[], int, int, MathContext)

```java
public BigDecimal(char[] in, int offset, int len, MathContext mc)
```

Translates a character array representation of a
{@code BigDecimal} into a {@code BigDecimal}, accepting the
same sequence of characters as the {@link #BigDecimal(String)}
constructor, while allowing a sub-array to be specified and
with rounding according to the context settings.

@implNote If the sequence of characters is already available
within a character array, using this constructor is faster than
converting the {@code char} array to string and using the
{@code BigDecimal(String)} constructor.

@param  in {@code char} array that is the source of characters.
@param  offset first character in the array to inspect.
@param  len number of characters to consider.
@param  mc the context to use.
@throws NumberFormatException if {@code in} is not a valid
        representation of a {@code BigDecimal} or the defined subarray
        is not wholly within {@code in}.
@since  1.5

## BigDecimal.BigDecimal(char[])

```java
public BigDecimal(char[] in)
```

Translates a character array representation of a
{@code BigDecimal} into a {@code BigDecimal}, accepting the
same sequence of characters as the {@link #BigDecimal(String)}
constructor.

@implNote If the sequence of characters is already available
as a character array, using this constructor is faster than
converting the {@code char} array to string and using the
{@code BigDecimal(String)} constructor.

@param in {@code char} array that is the source of characters.
@throws NumberFormatException if {@code in} is not a valid
        representation of a {@code BigDecimal}.
@since  1.5

## BigDecimal.BigDecimal(char[], MathContext)

```java
public BigDecimal(char[] in, MathContext mc)
```

Translates a character array representation of a
{@code BigDecimal} into a {@code BigDecimal}, accepting the
same sequence of characters as the {@link #BigDecimal(String)}
constructor and with rounding according to the context
settings.

@implNote If the sequence of characters is already available
as a character array, using this constructor is faster than
converting the {@code char} array to string and using the
{@code BigDecimal(String)} constructor.

@param  in {@code char} array that is the source of characters.
@param  mc the context to use.
@throws NumberFormatException if {@code in} is not a valid
        representation of a {@code BigDecimal}.
@since  1.5

## BigDecimal.BigDecimal(String)

```java
public BigDecimal(String val)
```

Translates the string representation of a {@code BigDecimal}
into a {@code BigDecimal}.  The string representation consists
of an optional sign, {@code '+'} (<code> '&#92;u002B'</code>) or
{@code '-'} (<code>'&#92;u002D'</code>), followed by a sequence of
zero or more decimal digits ("the integer"), optionally
followed by a fraction, optionally followed by an exponent.

<p>The fraction consists of a decimal point followed by zero
or more decimal digits.  The string must contain at least one
digit in either the integer or the fraction.  The number formed
by the sign, the integer and the fraction is referred to as the
<i>significand</i>.

<p>The exponent consists of the character {@code 'e'}
(<code>'&#92;u0065'</code>) or {@code 'E'} (<code>'&#92;u0045'</code>)
followed by one or more decimal digits.

<p>More formally, the strings this constructor accepts are
described by the following grammar:
<blockquote>
<dl>
<dt><i>BigDecimalString:</i>
<dd><i>Sign<sub>opt</sub> Significand Exponent<sub>opt</sub></i>
<dt><i>Sign:</i>
<dd>{@code +}
<dd>{@code -}
<dt><i>Significand:</i>
<dd><i>IntegerPart</i> {@code .} <i>FractionPart<sub>opt</sub></i>
<dd>{@code .} <i>FractionPart</i>
<dd><i>IntegerPart</i>
<dt><i>IntegerPart:</i>
<dd><i>Digits</i>
<dt><i>FractionPart:</i>
<dd><i>Digits</i>
<dt><i>Exponent:</i>
<dd><i>ExponentIndicator SignedInteger</i>
<dt><i>ExponentIndicator:</i>
<dd>{@code e}
<dd>{@code E}
<dt><i>SignedInteger:</i>
<dd><i>Sign<sub>opt</sub> Digits</i>
<dt><i>Digits:</i>
<dd><i>Digit</i>
<dd><i>Digits Digit</i>
<dt><i>Digit:</i>
<dd>any character for which {@link Character#isDigit}
returns {@code true}, including 0, 1, 2 ...
</dl>
</blockquote>

<p>The scale of the returned {@code BigDecimal} will be the
number of digits in the fraction, or zero if the string
contains no decimal point, subject to adjustment for any
exponent; if the string contains an exponent, the exponent is
subtracted from the scale.  The value of the resulting scale
must lie between {@code Integer.MIN_VALUE} and
{@code Integer.MAX_VALUE}, inclusive.

<p>The character-to-digit mapping is provided by {@link
java.lang.Character#digit} set to convert to radix 10.  The
String may not contain any extraneous characters (whitespace,
for example).

<p><b>Examples:</b><br>
The value of the returned {@code BigDecimal} is equal to
<i>significand</i> &times; 10<sup>&nbsp;<i>exponent</i></sup>.
For each string on the left, the resulting representation
[{@code BigInteger}, {@code scale}] is shown on the right.
<pre>
"0"            [0,0]
"0.00"         [0,2]
"123"          [123,0]
"-123"         [-123,0]
"1.23E3"       [123,-1]
"1.23E+3"      [123,-1]
"12.3E+7"      [123,-6]
"12.0"         [120,1]
"12.3"         [123,1]
"0.00123"      [123,5]
"-1.23E-12"    [-123,14]
"1234.5E-4"    [12345,5]
"0E+7"         [0,-7]
"-0"           [0,0]
</pre>

@apiNote For values other than {@code float} and
{@code double} NaN and &plusmn;Infinity, this constructor is
compatible with the values returned by {@link Float#toString}
and {@link Double#toString}.  This is generally the preferred
way to convert a {@code float} or {@code double} into a
BigDecimal, as it doesn't suffer from the unpredictability of
the {@link #BigDecimal(double)} constructor.

@param val String representation of {@code BigDecimal}.

@throws NumberFormatException if {@code val} is not a valid
        representation of a {@code BigDecimal}.

## BigDecimal.BigDecimal(String, MathContext)

```java
public BigDecimal(String val, MathContext mc)
```

Translates the string representation of a {@code BigDecimal}
into a {@code BigDecimal}, accepting the same strings as the
{@link #BigDecimal(String)} constructor, with rounding
according to the context settings.

@param  val string representation of a {@code BigDecimal}.
@param  mc the context to use.
@throws NumberFormatException if {@code val} is not a valid
        representation of a BigDecimal.
@since  1.5

## BigDecimal.BigDecimal(double)

```java
public BigDecimal(double val)
```

Translates a {@code double} into a {@code BigDecimal} which
is the exact decimal representation of the {@code double}'s
binary floating-point value.  The scale of the returned
{@code BigDecimal} is the smallest value such that
<code>(10<sup>scale</sup> &times; val)</code> is an integer.
<p>
<b>Notes:</b>
<ol>
<li>
The results of this constructor can be somewhat unpredictable.
One might assume that writing {@code new BigDecimal(0.1)} in
Java creates a {@code BigDecimal} which is exactly equal to
0.1 (an unscaled value of 1, with a scale of 1), but it is
actually equal to
0.1000000000000000055511151231257827021181583404541015625.
This is because 0.1 cannot be represented exactly as a
{@code double} (or, for that matter, as a binary fraction of
any finite length).  Thus, the value that is being passed
<em>in</em> to the constructor is not exactly equal to 0.1,
appearances notwithstanding.

<li>
The {@code String} constructor, on the other hand, is
perfectly predictable: writing {@code new BigDecimal("0.1")}
creates a {@code BigDecimal} which is <em>exactly</em> equal to
0.1, as one would expect.  Therefore, it is generally
recommended that the {@linkplain #BigDecimal(String)
String constructor} be used in preference to this one.

<li>
When a {@code double} must be used as a source for a
{@code BigDecimal}, note that this constructor provides an
exact conversion; it does not give the same result as
converting the {@code double} to a {@code String} using the
{@link Double#toString(double)} method and then using the
{@link #BigDecimal(String)} constructor.  To get that result,
use the {@code static} {@link #valueOf(double)} method.
</ol>

@param val {@code double} value to be converted to
       {@code BigDecimal}.
@throws NumberFormatException if {@code val} is infinite or NaN.

## BigDecimal.BigDecimal(double, MathContext)

```java
public BigDecimal(double val, MathContext mc)
```

Translates a {@code double} into a {@code BigDecimal}, with
rounding according to the context settings.  The scale of the
{@code BigDecimal} is the smallest value such that
<code>(10<sup>scale</sup> &times; val)</code> is an integer.

<p>The results of this constructor can be somewhat unpredictable
and its use is generally not recommended; see the notes under
the {@link #BigDecimal(double)} constructor.

@param  val {@code double} value to be converted to
        {@code BigDecimal}.
@param  mc the context to use.
@throws NumberFormatException if {@code val} is infinite or NaN.
@since  1.5

## BigDecimal.BigDecimal(BigInteger)

```java
public BigDecimal(BigInteger val)
```

Translates a {@code BigInteger} into a {@code BigDecimal}.
The scale of the {@code BigDecimal} is zero.

@param val {@code BigInteger} value to be converted to
           {@code BigDecimal}.

## BigDecimal.BigDecimal(BigInteger, MathContext)

```java
public BigDecimal(BigInteger val, MathContext mc)
```

Translates a {@code BigInteger} into a {@code BigDecimal}
rounding according to the context settings.  The scale of the
{@code BigDecimal} is zero.

@param val {@code BigInteger} value to be converted to
           {@code BigDecimal}.
@param  mc the context to use.
@since  1.5

## BigDecimal.BigDecimal(BigInteger, int)

```java
public BigDecimal(BigInteger unscaledVal, int scale)
```

Translates a {@code BigInteger} unscaled value and an
{@code int} scale into a {@code BigDecimal}.  The value of
the {@code BigDecimal} is
<code>(unscaledVal &times; 10<sup>-scale</sup>)</code>.

@param unscaledVal unscaled value of the {@code BigDecimal}.
@param scale scale of the {@code BigDecimal}.

## BigDecimal.BigDecimal(BigInteger, int, MathContext)

```java
public BigDecimal(BigInteger unscaledVal, int scale, MathContext mc)
```

Translates a {@code BigInteger} unscaled value and an
{@code int} scale into a {@code BigDecimal}, with rounding
according to the context settings.  The value of the
{@code BigDecimal} is <code>(unscaledVal &times;
10<sup>-scale</sup>)</code>, rounded according to the
{@code precision} and rounding mode settings.

@param  unscaledVal unscaled value of the {@code BigDecimal}.
@param  scale scale of the {@code BigDecimal}.
@param  mc the context to use.
@since  1.5

## BigDecimal.BigDecimal(int)

```java
public BigDecimal(int val)
```

Translates an {@code int} into a {@code BigDecimal}.  The
scale of the {@code BigDecimal} is zero.

@param val {@code int} value to be converted to
           {@code BigDecimal}.
@since  1.5

## BigDecimal.BigDecimal(int, MathContext)

```java
public BigDecimal(int val, MathContext mc)
```

Translates an {@code int} into a {@code BigDecimal}, with
rounding according to the context settings.  The scale of the
{@code BigDecimal}, before any rounding, is zero.

@param  val {@code int} value to be converted to {@code BigDecimal}.
@param  mc the context to use.
@since  1.5

## BigDecimal.BigDecimal(long)

```java
public BigDecimal(long val)
```

Translates a {@code long} into a {@code BigDecimal}.  The
scale of the {@code BigDecimal} is zero.

@param val {@code long} value to be converted to {@code BigDecimal}.
@since  1.5

## BigDecimal.BigDecimal(long, MathContext)

```java
public BigDecimal(long val, MathContext mc)
```

Translates a {@code long} into a {@code BigDecimal}, with
rounding according to the context settings.  The scale of the
{@code BigDecimal}, before any rounding, is zero.

@param  val {@code long} value to be converted to {@code BigDecimal}.
@param  mc the context to use.
@since  1.5

## BigDecimal.valueOf(long, int)

```java
public static BigDecimal valueOf(long unscaledVal, int scale)
```

Translates a {@code long} unscaled value and an
{@code int} scale into a {@code BigDecimal}.

@apiNote This static factory method is provided in preference
to a ({@code long}, {@code int}) constructor because it allows
for reuse of frequently used {@code BigDecimal} values.

@param unscaledVal unscaled value of the {@code BigDecimal}.
@param scale scale of the {@code BigDecimal}.
@return a {@code BigDecimal} whose value is
        <code>(unscaledVal &times; 10<sup>-scale</sup>)</code>.

## BigDecimal.valueOf(long)

```java
public static BigDecimal valueOf(long val)
```

Translates a {@code long} value into a {@code BigDecimal}
with a scale of zero.

@apiNote This static factory method is provided in preference
to a ({@code long}) constructor because it allows for reuse of
frequently used {@code BigDecimal} values.

@param val value of the {@code BigDecimal}.
@return a {@code BigDecimal} whose value is {@code val}.

## BigDecimal.valueOf(double)

```java
public static BigDecimal valueOf(double val)
```

Translates a {@code double} into a {@code BigDecimal}, using
the {@code double}'s canonical string representation provided
by the {@link Double#toString(double)} method.

@apiNote This is generally the preferred way to convert a
{@code double} (or {@code float}) into a {@code BigDecimal}, as
the value returned is equal to that resulting from constructing
a {@code BigDecimal} from the result of using {@link
Double#toString(double)}.

@param  val {@code double} to convert to a {@code BigDecimal}.
@return a {@code BigDecimal} whose value is equal to or approximately
        equal to the value of {@code val}.
@throws NumberFormatException if {@code val} is infinite or NaN.
@since  1.5

## BigDecimal.add(BigDecimal)

```java
public BigDecimal add(BigDecimal augend)
```

Returns a {@code BigDecimal} whose value is {@code (this +
augend)}, and whose scale is {@code max(this.scale(),
augend.scale())}.

@param  augend value to be added to this {@code BigDecimal}.
@return {@code this + augend}

## BigDecimal.add(BigDecimal, MathContext)

```java
public BigDecimal add(BigDecimal augend, MathContext mc)
```

Returns a {@code BigDecimal} whose value is {@code (this + augend)},
with rounding according to the context settings.

If either number is zero and the precision setting is nonzero then
the other number, rounded if necessary, is used as the result.

@param  augend value to be added to this {@code BigDecimal}.
@param  mc the context to use.
@return {@code this + augend}, rounded as necessary.
@since  1.5

## BigDecimal.subtract(BigDecimal)

```java
public BigDecimal subtract(BigDecimal subtrahend)
```

Returns a {@code BigDecimal} whose value is {@code (this -
subtrahend)}, and whose scale is {@code max(this.scale(),
subtrahend.scale())}.

@param  subtrahend value to be subtracted from this {@code BigDecimal}.
@return {@code this - subtrahend}

## BigDecimal.subtract(BigDecimal, MathContext)

```java
public BigDecimal subtract(BigDecimal subtrahend, MathContext mc)
```

Returns a {@code BigDecimal} whose value is {@code (this - subtrahend)},
with rounding according to the context settings.

If {@code subtrahend} is zero then this, rounded if necessary, is used as the
result.  If this is zero then the result is {@code subtrahend.negate(mc)}.

@param  subtrahend value to be subtracted from this {@code BigDecimal}.
@param  mc the context to use.
@return {@code this - subtrahend}, rounded as necessary.
@since  1.5

## BigDecimal.multiply(BigDecimal)

```java
public BigDecimal multiply(BigDecimal multiplicand)
```

Returns a {@code BigDecimal} whose value is <code>(this &times;
multiplicand)</code>, and whose scale is {@code (this.scale() +
multiplicand.scale())}.

@param  multiplicand value to be multiplied by this {@code BigDecimal}.
@return {@code this * multiplicand}

## BigDecimal.multiply(BigDecimal, MathContext)

```java
public BigDecimal multiply(BigDecimal multiplicand, MathContext mc)
```

Returns a {@code BigDecimal} whose value is <code>(this &times;
multiplicand)</code>, with rounding according to the context settings.

@param  multiplicand value to be multiplied by this {@code BigDecimal}.
@param  mc the context to use.
@return {@code this * multiplicand}, rounded as necessary.
@since  1.5

## BigDecimal.divide(BigDecimal, int, int)

```java
public BigDecimal divide(BigDecimal divisor, int scale, int roundingMode)
```

Returns a {@code BigDecimal} whose value is {@code (this /
divisor)}, and whose scale is as specified.  If rounding must
be performed to generate a result with the specified scale, the
specified rounding mode is applied.

@deprecated The method {@link #divide(BigDecimal, int, RoundingMode)}
should be used in preference to this legacy method.

@param  divisor value by which this {@code BigDecimal} is to be divided.
@param  scale scale of the {@code BigDecimal} quotient to be returned.
@param  roundingMode rounding mode to apply.
@return {@code this / divisor}
@throws ArithmeticException if {@code divisor} is zero,
        {@code roundingMode==ROUND_UNNECESSARY} and
        the specified scale is insufficient to represent the result
        of the division exactly.
@throws IllegalArgumentException if {@code roundingMode} does not
        represent a valid rounding mode.
@see    #ROUND_UP
@see    #ROUND_DOWN
@see    #ROUND_CEILING
@see    #ROUND_FLOOR
@see    #ROUND_HALF_UP
@see    #ROUND_HALF_DOWN
@see    #ROUND_HALF_EVEN
@see    #ROUND_UNNECESSARY

## BigDecimal.divide(BigDecimal, int, RoundingMode)

```java
public BigDecimal divide(BigDecimal divisor, int scale, RoundingMode roundingMode)
```

Returns a {@code BigDecimal} whose value is {@code (this /
divisor)}, and whose scale is as specified.  If rounding must
be performed to generate a result with the specified scale, the
specified rounding mode is applied.

@param  divisor value by which this {@code BigDecimal} is to be divided.
@param  scale scale of the {@code BigDecimal} quotient to be returned.
@param  roundingMode rounding mode to apply.
@return {@code this / divisor}
@throws ArithmeticException if {@code divisor} is zero,
        {@code roundingMode==RoundingMode.UNNECESSARY} and
        the specified scale is insufficient to represent the result
        of the division exactly.
@since 1.5

## BigDecimal.divide(BigDecimal, int)

```java
public BigDecimal divide(BigDecimal divisor, int roundingMode)
```

Returns a {@code BigDecimal} whose value is {@code (this /
divisor)}, and whose scale is {@code this.scale()}.  If
rounding must be performed to generate a result with the given
scale, the specified rounding mode is applied.

@deprecated The method {@link #divide(BigDecimal, RoundingMode)}
should be used in preference to this legacy method.

@param  divisor value by which this {@code BigDecimal} is to be divided.
@param  roundingMode rounding mode to apply.
@return {@code this / divisor}
@throws ArithmeticException if {@code divisor==0}, or
        {@code roundingMode==ROUND_UNNECESSARY} and
        {@code this.scale()} is insufficient to represent the result
        of the division exactly.
@throws IllegalArgumentException if {@code roundingMode} does not
        represent a valid rounding mode.
@see    #ROUND_UP
@see    #ROUND_DOWN
@see    #ROUND_CEILING
@see    #ROUND_FLOOR
@see    #ROUND_HALF_UP
@see    #ROUND_HALF_DOWN
@see    #ROUND_HALF_EVEN
@see    #ROUND_UNNECESSARY

## BigDecimal.divide(BigDecimal, RoundingMode)

```java
public BigDecimal divide(BigDecimal divisor, RoundingMode roundingMode)
```

Returns a {@code BigDecimal} whose value is {@code (this /
divisor)}, and whose scale is {@code this.scale()}.  If
rounding must be performed to generate a result with the given
scale, the specified rounding mode is applied.

@param  divisor value by which this {@code BigDecimal} is to be divided.
@param  roundingMode rounding mode to apply.
@return {@code this / divisor}
@throws ArithmeticException if {@code divisor==0}, or
        {@code roundingMode==RoundingMode.UNNECESSARY} and
        {@code this.scale()} is insufficient to represent the result
        of the division exactly.
@since 1.5

## BigDecimal.divide(BigDecimal)

```java
public BigDecimal divide(BigDecimal divisor)
```

Returns a {@code BigDecimal} whose value is {@code (this /
divisor)}, and whose preferred scale is {@code (this.scale() -
divisor.scale())}; if the exact quotient cannot be
represented (because it has a non-terminating decimal
expansion) an {@code ArithmeticException} is thrown.

@param  divisor value by which this {@code BigDecimal} is to be divided.
@throws ArithmeticException if the exact quotient does not have a
        terminating decimal expansion, including dividing by zero
@return {@code this / divisor}
@since 1.5
@author Joseph D. Darcy

## BigDecimal.divide(BigDecimal, MathContext)

```java
public BigDecimal divide(BigDecimal divisor, MathContext mc)
```

Returns a {@code BigDecimal} whose value is {@code (this /
divisor)}, with rounding according to the context settings.

@param  divisor value by which this {@code BigDecimal} is to be divided.
@param  mc the context to use.
@return {@code this / divisor}, rounded as necessary.
@throws ArithmeticException if the result is inexact but the
        rounding mode is {@code UNNECESSARY} or
        {@code mc.precision == 0} and the quotient has a
        non-terminating decimal expansion, including dividing by zero
@since  1.5

## BigDecimal.divideToIntegralValue(BigDecimal)

```java
public BigDecimal divideToIntegralValue(BigDecimal divisor)
```

Returns a {@code BigDecimal} whose value is the integer part
of the quotient {@code (this / divisor)} rounded down.  The
preferred scale of the result is {@code (this.scale() -
divisor.scale())}.

@param  divisor value by which this {@code BigDecimal} is to be divided.
@return The integer part of {@code this / divisor}.
@throws ArithmeticException if {@code divisor==0}
@since  1.5

## BigDecimal.divideToIntegralValue(BigDecimal, MathContext)

```java
public BigDecimal divideToIntegralValue(BigDecimal divisor, MathContext mc)
```

Returns a {@code BigDecimal} whose value is the integer part
of {@code (this / divisor)}.  Since the integer part of the
exact quotient does not depend on the rounding mode, the
rounding mode does not affect the values returned by this
method.  The preferred scale of the result is
{@code (this.scale() - divisor.scale())}.  An
{@code ArithmeticException} is thrown if the integer part of
the exact quotient needs more than {@code mc.precision}
digits.

@param  divisor value by which this {@code BigDecimal} is to be divided.
@param  mc the context to use.
@return The integer part of {@code this / divisor}.
@throws ArithmeticException if {@code divisor==0}
@throws ArithmeticException if {@code mc.precision} {@literal >} 0 and the result
        requires a precision of more than {@code mc.precision} digits.
@since  1.5
@author Joseph D. Darcy

## BigDecimal.remainder(BigDecimal)

```java
public BigDecimal remainder(BigDecimal divisor)
```

Returns a {@code BigDecimal} whose value is {@code (this % divisor)}.

<p>The remainder is given by
{@code this.subtract(this.divideToIntegralValue(divisor).multiply(divisor))}.
Note that this is <em>not</em> the modulo operation (the result can be
negative).

@param  divisor value by which this {@code BigDecimal} is to be divided.
@return {@code this % divisor}.
@throws ArithmeticException if {@code divisor==0}
@since  1.5

## BigDecimal.remainder(BigDecimal, MathContext)

```java
public BigDecimal remainder(BigDecimal divisor, MathContext mc)
```

Returns a {@code BigDecimal} whose value is {@code (this %
divisor)}, with rounding according to the context settings.
The {@code MathContext} settings affect the implicit divide
used to compute the remainder.  The remainder computation
itself is by definition exact.  Therefore, the remainder may
contain more than {@code mc.getPrecision()} digits.

<p>The remainder is given by
{@code this.subtract(this.divideToIntegralValue(divisor,
mc).multiply(divisor))}.  Note that this is not the modulo
operation (the result can be negative).

@param  divisor value by which this {@code BigDecimal} is to be divided.
@param  mc the context to use.
@return {@code this % divisor}, rounded as necessary.
@throws ArithmeticException if {@code divisor==0}
@throws ArithmeticException if the result is inexact but the
        rounding mode is {@code UNNECESSARY}, or {@code mc.precision}
        {@literal >} 0 and the result of {@code this.divideToIntegralValue(divisor)} would
        require a precision of more than {@code mc.precision} digits.
@see    #divideToIntegralValue(java.math.BigDecimal, java.math.MathContext)
@since  1.5

## BigDecimal.divideAndRemainder(BigDecimal)

```java
public BigDecimal[] divideAndRemainder(BigDecimal divisor)
```

Returns a two-element {@code BigDecimal} array containing the
result of {@code divideToIntegralValue} followed by the result of
{@code remainder} on the two operands.

<p>Note that if both the integer quotient and remainder are
needed, this method is faster than using the
{@code divideToIntegralValue} and {@code remainder} methods
separately because the division need only be carried out once.

@param  divisor value by which this {@code BigDecimal} is to be divided,
        and the remainder computed.
@return a two element {@code BigDecimal} array: the quotient
        (the result of {@code divideToIntegralValue}) is the initial element
        and the remainder is the final element.
@throws ArithmeticException if {@code divisor==0}
@see    #divideToIntegralValue(java.math.BigDecimal, java.math.MathContext)
@see    #remainder(java.math.BigDecimal, java.math.MathContext)
@since  1.5

## BigDecimal.divideAndRemainder(BigDecimal, MathContext)

```java
public BigDecimal[] divideAndRemainder(BigDecimal divisor, MathContext mc)
```

Returns a two-element {@code BigDecimal} array containing the
result of {@code divideToIntegralValue} followed by the result of
{@code remainder} on the two operands calculated with rounding
according to the context settings.

<p>Note that if both the integer quotient and remainder are
needed, this method is faster than using the
{@code divideToIntegralValue} and {@code remainder} methods
separately because the division need only be carried out once.

@param  divisor value by which this {@code BigDecimal} is to be divided,
        and the remainder computed.
@param  mc the context to use.
@return a two element {@code BigDecimal} array: the quotient
        (the result of {@code divideToIntegralValue}) is the
        initial element and the remainder is the final element.
@throws ArithmeticException if {@code divisor==0}
@throws ArithmeticException if the result is inexact but the
        rounding mode is {@code UNNECESSARY}, or {@code mc.precision}
        {@literal >} 0 and the result of {@code this.divideToIntegralValue(divisor)} would
        require a precision of more than {@code mc.precision} digits.
@see    #divideToIntegralValue(java.math.BigDecimal, java.math.MathContext)
@see    #remainder(java.math.BigDecimal, java.math.MathContext)
@since  1.5

## BigDecimal.sqrt(MathContext)

```java
public BigDecimal sqrt(MathContext mc)
```

Returns an approximation to the square root of {@code this}
with rounding according to the context settings.

<p>The preferred scale of the returned result is equal to
{@code this.scale()/2}. The value of the returned result is
always within one ulp of the exact decimal value for the
precision in question.  If the rounding mode is {@link
RoundingMode#HALF_UP HALF_UP}, {@link RoundingMode#HALF_DOWN
HALF_DOWN}, or {@link RoundingMode#HALF_EVEN HALF_EVEN}, the
result is within one half an ulp of the exact decimal value.

<p>Special case:
<ul>
<li> The square root of a number numerically equal to {@code
ZERO} is numerically equal to {@code ZERO} with a preferred
scale according to the general rule above. In particular, for
{@code ZERO}, {@code ZERO.sqrt(mc).equals(ZERO)} is true with
any {@code MathContext} as an argument.
</ul>

@param mc the context to use.
@return the square root of {@code this}.
@throws ArithmeticException if {@code this} is less than zero.
@throws ArithmeticException if an exact result is requested
({@code mc.getPrecision()==0}) and there is no finite decimal
expansion of the exact result
@throws ArithmeticException if
{@code (mc.getRoundingMode()==RoundingMode.UNNECESSARY}) and
the exact result cannot fit in {@code mc.getPrecision()}
digits.
@see BigInteger#sqrt()
@since  9

## BigDecimal.pow(int)

```java
public BigDecimal pow(int n)
```

Returns a {@code BigDecimal} whose value is
<code>(this<sup>n</sup>)</code>, The power is computed exactly, to
unlimited precision.

<p>The parameter {@code n} must be in the range 0 through
999999999, inclusive.  {@code ZERO.pow(0)} returns {@link
#ONE}.

Note that future releases may expand the allowable exponent
range of this method.

@param  n power to raise this {@code BigDecimal} to.
@return <code>this<sup>n</sup></code>
@throws ArithmeticException if {@code n} is out of range.
@since  1.5

## BigDecimal.pow(int, MathContext)

```java
public BigDecimal pow(int n, MathContext mc)
```

Returns a {@code BigDecimal} whose value is
<code>(this<sup>n</sup>)</code>.  The current implementation uses
the core algorithm defined in ANSI standard X3.274-1996 with
rounding according to the context settings.  In general, the
returned numerical value is within two ulps of the exact
numerical value for the chosen precision.  Note that future
releases may use a different algorithm with a decreased
allowable error bound and increased allowable exponent range.

<p>The X3.274-1996 algorithm is:

<ul>
<li> An {@code ArithmeticException} exception is thrown if
 <ul>
   <li>{@code abs(n) > 999999999}
   <li>{@code mc.precision == 0} and {@code n < 0}
   <li>{@code mc.precision > 0} and {@code n} has more than
   {@code mc.precision} decimal digits
 </ul>

<li> if {@code n} is zero, {@link #ONE} is returned even if
{@code this} is zero, otherwise
<ul>
  <li> if {@code n} is positive, the result is calculated via
  the repeated squaring technique into a single accumulator.
  The individual multiplications with the accumulator use the
  same math context settings as in {@code mc} except for a
  precision increased to {@code mc.precision + elength + 1}
  where {@code elength} is the number of decimal digits in
  {@code n}.

  <li> if {@code n} is negative, the result is calculated as if
  {@code n} were positive; this value is then divided into one
  using the working precision specified above.

  <li> The final value from either the positive or negative case
  is then rounded to the destination precision.
  </ul>
</ul>

@param  n power to raise this {@code BigDecimal} to.
@param  mc the context to use.
@return <code>this<sup>n</sup></code> using the ANSI standard X3.274-1996
        algorithm
@throws ArithmeticException if the result is inexact but the
        rounding mode is {@code UNNECESSARY}, or {@code n} is out
        of range.
@since  1.5

## BigDecimal.abs()

```java
public BigDecimal abs()
```

Returns a {@code BigDecimal} whose value is the absolute value
of this {@code BigDecimal}, and whose scale is
{@code this.scale()}.

@return {@code abs(this)}

## BigDecimal.abs(MathContext)

```java
public BigDecimal abs(MathContext mc)
```

Returns a {@code BigDecimal} whose value is the absolute value
of this {@code BigDecimal}, with rounding according to the
context settings.

@param mc the context to use.
@return {@code abs(this)}, rounded as necessary.
@since 1.5

## BigDecimal.negate()

```java
public BigDecimal negate()
```

Returns a {@code BigDecimal} whose value is {@code (-this)},
and whose scale is {@code this.scale()}.

@return {@code -this}.

## BigDecimal.negate(MathContext)

```java
public BigDecimal negate(MathContext mc)
```

Returns a {@code BigDecimal} whose value is {@code (-this)},
with rounding according to the context settings.

@param mc the context to use.
@return {@code -this}, rounded as necessary.
@since  1.5

## BigDecimal.plus()

```java
public BigDecimal plus()
```

Returns a {@code BigDecimal} whose value is {@code (+this)}, and whose
scale is {@code this.scale()}.

<p>This method, which simply returns this {@code BigDecimal}
is included for symmetry with the unary minus method {@link
#negate()}.

@return {@code this}.
@see #negate()
@since  1.5

## BigDecimal.plus(MathContext)

```java
public BigDecimal plus(MathContext mc)
```

Returns a {@code BigDecimal} whose value is {@code (+this)},
with rounding according to the context settings.

<p>The effect of this method is identical to that of the {@link
#round(MathContext)} method.

@param mc the context to use.
@return {@code this}, rounded as necessary.  A zero result will
        have a scale of 0.
@see    #round(MathContext)
@since  1.5

## BigDecimal.signum()

```java
public int signum()
```

Returns the signum function of this {@code BigDecimal}.

@return -1, 0, or 1 as the value of this {@code BigDecimal}
        is negative, zero, or positive.

## BigDecimal.scale()

```java
public int scale()
```

Returns the <i>scale</i> of this {@code BigDecimal}.  If zero
or positive, the scale is the number of digits to the right of
the decimal point.  If negative, the unscaled value of the
number is multiplied by ten to the power of the negation of the
scale.  For example, a scale of {@code -3} means the unscaled
value is multiplied by 1000.

@return the scale of this {@code BigDecimal}.

## BigDecimal.precision()

```java
public int precision()
```

Returns the <i>precision</i> of this {@code BigDecimal}.  (The
precision is the number of digits in the unscaled value.)

<p>The precision of a zero value is 1.

@return the precision of this {@code BigDecimal}.
@since  1.5

## BigDecimal.unscaledValue()

```java
public BigInteger unscaledValue()
```

Returns a {@code BigInteger} whose value is the <i>unscaled
value</i> of this {@code BigDecimal}.  (Computes <code>(this *
10<sup>this.scale()</sup>)</code>.)

@return the unscaled value of this {@code BigDecimal}.
@since  1.2

## BigDecimal.ROUND_UP

```java
public static final int ROUND_UP
```

Rounding mode to round away from zero.  Always increments the
digit prior to a nonzero discarded fraction.  Note that this rounding
mode never decreases the magnitude of the calculated value.

@deprecated Use {@link RoundingMode#UP} instead.

## BigDecimal.ROUND_DOWN

```java
public static final int ROUND_DOWN
```

Rounding mode to round towards zero.  Never increments the digit
prior to a discarded fraction (i.e., truncates).  Note that this
rounding mode never increases the magnitude of the calculated value.

@deprecated Use {@link RoundingMode#DOWN} instead.

## BigDecimal.ROUND_CEILING

```java
public static final int ROUND_CEILING
```

Rounding mode to round towards positive infinity.  If the
{@code BigDecimal} is positive, behaves as for
{@code ROUND_UP}; if negative, behaves as for
{@code ROUND_DOWN}.  Note that this rounding mode never
decreases the calculated value.

@deprecated Use {@link RoundingMode#CEILING} instead.

## BigDecimal.ROUND_FLOOR

```java
public static final int ROUND_FLOOR
```

Rounding mode to round towards negative infinity.  If the
{@code BigDecimal} is positive, behave as for
{@code ROUND_DOWN}; if negative, behave as for
{@code ROUND_UP}.  Note that this rounding mode never
increases the calculated value.

@deprecated Use {@link RoundingMode#FLOOR} instead.

## BigDecimal.ROUND_HALF_UP

```java
public static final int ROUND_HALF_UP
```

Rounding mode to round towards {@literal "nearest neighbor"}
unless both neighbors are equidistant, in which case round up.
Behaves as for {@code ROUND_UP} if the discarded fraction is
&ge; 0.5; otherwise, behaves as for {@code ROUND_DOWN}.  Note
that this is the rounding mode that most of us were taught in
grade school.

@deprecated Use {@link RoundingMode#HALF_UP} instead.

## BigDecimal.ROUND_HALF_DOWN

```java
public static final int ROUND_HALF_DOWN
```

Rounding mode to round towards {@literal "nearest neighbor"}
unless both neighbors are equidistant, in which case round
down.  Behaves as for {@code ROUND_UP} if the discarded
fraction is {@literal >} 0.5; otherwise, behaves as for
{@code ROUND_DOWN}.

@deprecated Use {@link RoundingMode#HALF_DOWN} instead.

## BigDecimal.ROUND_HALF_EVEN

```java
public static final int ROUND_HALF_EVEN
```

Rounding mode to round towards the {@literal "nearest neighbor"}
unless both neighbors are equidistant, in which case, round
towards the even neighbor.  Behaves as for
{@code ROUND_HALF_UP} if the digit to the left of the
discarded fraction is odd; behaves as for
{@code ROUND_HALF_DOWN} if it's even.  Note that this is the
rounding mode that minimizes cumulative error when applied
repeatedly over a sequence of calculations.

@deprecated Use {@link RoundingMode#HALF_EVEN} instead.

## BigDecimal.ROUND_UNNECESSARY

```java
public static final int ROUND_UNNECESSARY
```

Rounding mode to assert that the requested operation has an exact
result, hence no rounding is necessary.  If this rounding mode is
specified on an operation that yields an inexact result, an
{@code ArithmeticException} is thrown.

@deprecated Use {@link RoundingMode#UNNECESSARY} instead.

## BigDecimal.round(MathContext)

```java
public BigDecimal round(MathContext mc)
```

Returns a {@code BigDecimal} rounded according to the
{@code MathContext} settings.  If the precision setting is 0 then
no rounding takes place.

<p>The effect of this method is identical to that of the
{@link #plus(MathContext)} method.

@param mc the context to use.
@return a {@code BigDecimal} rounded according to the
        {@code MathContext} settings.
@see    #plus(MathContext)
@since  1.5

## BigDecimal.setScale(int, RoundingMode)

```java
public BigDecimal setScale(int newScale, RoundingMode roundingMode)
```

Returns a {@code BigDecimal} whose scale is the specified
value, and whose unscaled value is determined by multiplying or
dividing this {@code BigDecimal}'s unscaled value by the
appropriate power of ten to maintain its overall value.  If the
scale is reduced by the operation, the unscaled value must be
divided (rather than multiplied), and the value may be changed;
in this case, the specified rounding mode is applied to the
division.

@apiNote Since BigDecimal objects are immutable, calls of
this method do <em>not</em> result in the original object being
modified, contrary to the usual convention of having methods
named <code>set<i>X</i></code> mutate field <i>{@code X}</i>.
Instead, {@code setScale} returns an object with the proper
scale; the returned object may or may not be newly allocated.

@param  newScale scale of the {@code BigDecimal} value to be returned.
@param  roundingMode The rounding mode to apply.
@return a {@code BigDecimal} whose scale is the specified value,
        and whose unscaled value is determined by multiplying or
        dividing this {@code BigDecimal}'s unscaled value by the
        appropriate power of ten to maintain its overall value.
@throws ArithmeticException if {@code roundingMode==UNNECESSARY}
        and the specified scaling operation would require
        rounding.
@see    RoundingMode
@since  1.5

## BigDecimal.setScale(int, int)

```java
public BigDecimal setScale(int newScale, int roundingMode)
```

Returns a {@code BigDecimal} whose scale is the specified
value, and whose unscaled value is determined by multiplying or
dividing this {@code BigDecimal}'s unscaled value by the
appropriate power of ten to maintain its overall value.  If the
scale is reduced by the operation, the unscaled value must be
divided (rather than multiplied), and the value may be changed;
in this case, the specified rounding mode is applied to the
division.

@apiNote Since BigDecimal objects are immutable, calls of
this method do <em>not</em> result in the original object being
modified, contrary to the usual convention of having methods
named <code>set<i>X</i></code> mutate field <i>{@code X}</i>.
Instead, {@code setScale} returns an object with the proper
scale; the returned object may or may not be newly allocated.

@deprecated The method {@link #setScale(int, RoundingMode)} should
be used in preference to this legacy method.

@param  newScale scale of the {@code BigDecimal} value to be returned.
@param  roundingMode The rounding mode to apply.
@return a {@code BigDecimal} whose scale is the specified value,
        and whose unscaled value is determined by multiplying or
        dividing this {@code BigDecimal}'s unscaled value by the
        appropriate power of ten to maintain its overall value.
@throws ArithmeticException if {@code roundingMode==ROUND_UNNECESSARY}
        and the specified scaling operation would require
        rounding.
@throws IllegalArgumentException if {@code roundingMode} does not
        represent a valid rounding mode.
@see    #ROUND_UP
@see    #ROUND_DOWN
@see    #ROUND_CEILING
@see    #ROUND_FLOOR
@see    #ROUND_HALF_UP
@see    #ROUND_HALF_DOWN
@see    #ROUND_HALF_EVEN
@see    #ROUND_UNNECESSARY

## BigDecimal.setScale(int)

```java
public BigDecimal setScale(int newScale)
```

Returns a {@code BigDecimal} whose scale is the specified
value, and whose value is numerically equal to this
{@code BigDecimal}'s.  Throws an {@code ArithmeticException}
if this is not possible.

<p>This call is typically used to increase the scale, in which
case it is guaranteed that there exists a {@code BigDecimal}
of the specified scale and the correct value.  The call can
also be used to reduce the scale if the caller knows that the
{@code BigDecimal} has sufficiently many zeros at the end of
its fractional part (i.e., factors of ten in its integer value)
to allow for the rescaling without changing its value.

<p>This method returns the same result as the two-argument
versions of {@code setScale}, but saves the caller the trouble
of specifying a rounding mode in cases where it is irrelevant.

@apiNote Since {@code BigDecimal} objects are immutable,
calls of this method do <em>not</em> result in the original
object being modified, contrary to the usual convention of
having methods named <code>set<i>X</i></code> mutate field
<i>{@code X}</i>.  Instead, {@code setScale} returns an
object with the proper scale; the returned object may or may
not be newly allocated.

@param  newScale scale of the {@code BigDecimal} value to be returned.
@return a {@code BigDecimal} whose scale is the specified value, and
        whose unscaled value is determined by multiplying or dividing
        this {@code BigDecimal}'s unscaled value by the appropriate
        power of ten to maintain its overall value.
@throws ArithmeticException if the specified scaling operation would
        require rounding.
@see    #setScale(int, int)
@see    #setScale(int, RoundingMode)

## BigDecimal.movePointLeft(int)

```java
public BigDecimal movePointLeft(int n)
```

Returns a {@code BigDecimal} which is equivalent to this one
with the decimal point moved {@code n} places to the left.  If
{@code n} is non-negative, the call merely adds {@code n} to
the scale.  If {@code n} is negative, the call is equivalent
to {@code movePointRight(-n)}.  The {@code BigDecimal}
returned by this call has value <code>(this &times;
10<sup>-n</sup>)</code> and scale {@code max(this.scale()+n,
0)}.

@param  n number of places to move the decimal point to the left.
@return a {@code BigDecimal} which is equivalent to this one with the
        decimal point moved {@code n} places to the left.
@throws ArithmeticException if scale overflows.

## BigDecimal.movePointRight(int)

```java
public BigDecimal movePointRight(int n)
```

Returns a {@code BigDecimal} which is equivalent to this one
with the decimal point moved {@code n} places to the right.
If {@code n} is non-negative, the call merely subtracts
{@code n} from the scale.  If {@code n} is negative, the call
is equivalent to {@code movePointLeft(-n)}.  The
{@code BigDecimal} returned by this call has value <code>(this
&times; 10<sup>n</sup>)</code> and scale {@code max(this.scale()-n,
0)}.

@param  n number of places to move the decimal point to the right.
@return a {@code BigDecimal} which is equivalent to this one
        with the decimal point moved {@code n} places to the right.
@throws ArithmeticException if scale overflows.

## BigDecimal.scaleByPowerOfTen(int)

```java
public BigDecimal scaleByPowerOfTen(int n)
```

Returns a BigDecimal whose numerical value is equal to
({@code this} * 10<sup>n</sup>).  The scale of
the result is {@code (this.scale() - n)}.

@param n the exponent power of ten to scale by
@return a BigDecimal whose numerical value is equal to
({@code this} * 10<sup>n</sup>)
@throws ArithmeticException if the scale would be
        outside the range of a 32-bit integer.

@since 1.5

## BigDecimal.stripTrailingZeros()

```java
public BigDecimal stripTrailingZeros()
```

Returns a {@code BigDecimal} which is numerically equal to
this one but with any trailing zeros removed from the
representation.  For example, stripping the trailing zeros from
the {@code BigDecimal} value {@code 600.0}, which has
[{@code BigInteger}, {@code scale}] components equal to
[6000, 1], yields {@code 6E2} with [{@code BigInteger},
{@code scale}] components equal to [6, -2].  If
this BigDecimal is numerically equal to zero, then
{@code BigDecimal.ZERO} is returned.

@return a numerically equal {@code BigDecimal} with any
trailing zeros removed.
@throws ArithmeticException if scale overflows.
@since 1.5

## BigDecimal.compareTo(BigDecimal)

```java
public int compareTo(BigDecimal val)
```

Compares this {@code BigDecimal} numerically with the specified
{@code BigDecimal}.  Two {@code BigDecimal} objects that are
equal in value but have a different scale (like 2.0 and 2.00)
are considered equal by this method. Such values are in the
same <i>cohort</i>.

This method is provided in preference to individual methods for
each of the six boolean comparison operators ({@literal <}, ==,
{@literal >}, {@literal >=}, !=, {@literal <=}).  The suggested
idiom for performing these comparisons is: {@code
(x.compareTo(y)} &lt;<i>op</i>&gt; {@code 0)}, where
&lt;<i>op</i>&gt; is one of the six comparison operators.

@apiNote
Note: this class has a natural ordering that is inconsistent with equals.
The behavior of comparing the result of this method for
equality to 0 is analogous to checking the {@linkplain
Double##fpNumericalEq numerical equality} of {@code double} values.

@param  val {@code BigDecimal} to which this {@code BigDecimal} is
        to be compared.
@return -1, 0, or 1 as this {@code BigDecimal} is numerically
         less than, equal to, or greater than {@code val}.

## BigDecimal.equals(Object)

```java
public boolean equals(Object x)
```

Compares this {@code BigDecimal} with the specified {@code
Object} for equality.  Unlike {@link #compareTo(BigDecimal)
compareTo}, this method considers two {@code BigDecimal}
objects equal only if they are equal in value and
scale. Therefore 2.0 is not equal to 2.00 when compared by this
method since the former has [{@code BigInteger}, {@code scale}]
components equal to [20, 1] while the latter has components
equal to [200, 2].

@apiNote
One example that shows how 2.0 and 2.00 are <em>not</em>
substitutable for each other under some arithmetic operations
are the two expressions:<br>
{@code new BigDecimal("2.0" ).divide(BigDecimal.valueOf(3),
HALF_UP)} which evaluates to 0.7 and <br>
{@code new BigDecimal("2.00").divide(BigDecimal.valueOf(3),
HALF_UP)} which evaluates to 0.67.
The behavior of this method is analogous to checking the
{@linkplain Double##repEquivalence representation equivalence}
of {@code double} values.

@param  x {@code Object} to which this {@code BigDecimal} is
        to be compared.
@return {@code true} if and only if the specified {@code Object} is a
        {@code BigDecimal} whose value and scale are equal to this
        {@code BigDecimal}'s.
@see    #compareTo(java.math.BigDecimal)
@see    #hashCode

## BigDecimal.min(BigDecimal)

```java
public BigDecimal min(BigDecimal val)
```

Returns the minimum of this {@code BigDecimal} and
{@code val}.

@param  val value with which the minimum is to be computed.
@return the {@code BigDecimal} whose value is the lesser of this
        {@code BigDecimal} and {@code val}.  If they are equal,
        as defined by the {@link #compareTo(BigDecimal) compareTo}
        method, {@code this} is returned.
@see    #compareTo(java.math.BigDecimal)

## BigDecimal.max(BigDecimal)

```java
public BigDecimal max(BigDecimal val)
```

Returns the maximum of this {@code BigDecimal} and {@code val}.

@param  val value with which the maximum is to be computed.
@return the {@code BigDecimal} whose value is the greater of this
        {@code BigDecimal} and {@code val}.  If they are equal,
        as defined by the {@link #compareTo(BigDecimal) compareTo}
        method, {@code this} is returned.
@see    #compareTo(java.math.BigDecimal)

## BigDecimal.hashCode()

```java
public int hashCode()
```

Returns the hash code for this {@code BigDecimal}.
The hash code is computed as a function of the {@linkplain
unscaledValue() unscaled value} and the {@linkplain scale()
scale} of this {@code BigDecimal}.

@apiNote
Two {@code BigDecimal} objects that are numerically equal but
differ in scale (like 2.0 and 2.00) will generally <em>not</em>
have the same hash code.

@return hash code for this {@code BigDecimal}.
@see #equals(Object)

## BigDecimal.toString()

```java
public String toString()
```

Returns the string representation of this {@code BigDecimal},
using scientific notation if an exponent is needed.

<p>A standard canonical string form of the {@code BigDecimal}
is created as though by the following steps: first, the
absolute value of the unscaled value of the {@code BigDecimal}
is converted to a string in base ten using the characters
{@code '0'} through {@code '9'} with no leading zeros (except
if its value is zero, in which case a single {@code '0'}
character is used).

<p>Next, an <i>adjusted exponent</i> is calculated; this is the
negated scale, plus the number of characters in the converted
unscaled value, less one.  That is,
{@code -scale+(ulength-1)}, where {@code ulength} is the
length of the absolute value of the unscaled value in decimal
digits (its <i>precision</i>).

<p>If the scale is greater than or equal to zero and the
adjusted exponent is greater than or equal to {@code -6}, the
number will be converted to a character form without using
exponential notation.  In this case, if the scale is zero then
no decimal point is added and if the scale is positive a
decimal point will be inserted with the scale specifying the
number of characters to the right of the decimal point.
{@code '0'} characters are added to the left of the converted
unscaled value as necessary.  If no character precedes the
decimal point after this insertion then a conventional
{@code '0'} character is prefixed.

<p>Otherwise (that is, if the scale is negative, or the
adjusted exponent is less than {@code -6}), the number will be
converted to a character form using exponential notation.  In
this case, if the converted {@code BigInteger} has more than
one digit a decimal point is inserted after the first digit.
An exponent in character form is then suffixed to the converted
unscaled value (perhaps with inserted decimal point); this
comprises the letter {@code 'E'} followed immediately by the
adjusted exponent converted to a character form.  The latter is
in base ten, using the characters {@code '0'} through
{@code '9'} with no leading zeros, and is always prefixed by a
sign character {@code '-'} (<code>'&#92;u002D'</code>) if the
adjusted exponent is negative, {@code '+'}
(<code>'&#92;u002B'</code>) otherwise).

<p>Finally, the entire string is prefixed by a minus sign
character {@code '-'} (<code>'&#92;u002D'</code>) if the unscaled
value is less than zero.  No sign character is prefixed if the
unscaled value is zero or positive.

<p><b>Examples:</b>
<p>For each representation [<i>unscaled value</i>, <i>scale</i>]
on the left, the resulting string is shown on the right.
<pre>
[123,0]      "123"
[-123,0]     "-123"
[123,-1]     "1.23E+3"
[123,-3]     "1.23E+5"
[123,1]      "12.3"
[123,5]      "0.00123"
[123,10]     "1.23E-8"
[-123,12]    "-1.23E-10"
</pre>

<b>Notes:</b>
<ol>

<li>There is a one-to-one mapping between the distinguishable
{@code BigDecimal} values and the result of this conversion.
That is, every distinguishable {@code BigDecimal} value
(unscaled value and scale) has a unique string representation
as a result of using {@code toString}.  If that string
representation is converted back to a {@code BigDecimal} using
the {@link #BigDecimal(String)} constructor, then the original
value will be recovered.

<li>The string produced for a given number is always the same;
it is not affected by locale.  This means that it can be used
as a canonical string representation for exchanging decimal
data, or as a key for a Hashtable, etc.  Locale-sensitive
number formatting and parsing is handled by the {@link
java.text.NumberFormat} class and its subclasses.

<li>The {@link #toEngineeringString} method may be used for
presenting numbers with exponents in engineering notation, and the
{@link #setScale(int,RoundingMode) setScale} method may be used for
rounding a {@code BigDecimal} so it has a known number of digits after
the decimal point.

<li>The digit-to-character mapping provided by
{@code Character.forDigit} is used.

</ol>

@return string representation of this {@code BigDecimal}.
@see    Character#forDigit
@see    #BigDecimal(java.lang.String)

## BigDecimal.toEngineeringString()

```java
public String toEngineeringString()
```

Returns a string representation of this {@code BigDecimal},
using engineering notation if an exponent is needed.

<p>Returns a string that represents the {@code BigDecimal} as
described in the {@link #toString()} method, except that if
exponential notation is used, the power of ten is adjusted to
be a multiple of three (engineering notation) such that the
integer part of nonzero values will be in the range 1 through
999.  If exponential notation is used for zero values, a
decimal point and one or two fractional zero digits are used so
that the scale of the zero value is preserved.  Note that
unlike the output of {@link #toString()}, the output of this
method is <em>not</em> guaranteed to recover the same [integer,
scale] pair of this {@code BigDecimal} if the output string is
converting back to a {@code BigDecimal} using the {@linkplain
#BigDecimal(String) string constructor}.  The result of this method meets
the weaker constraint of always producing a numerically equal
result from applying the string constructor to the method's output.

@return string representation of this {@code BigDecimal}, using
        engineering notation if an exponent is needed.
@since  1.5

## BigDecimal.toPlainString()

```java
public String toPlainString()
```

Returns a string representation of this {@code BigDecimal}
without an exponent field.  For values with a positive scale,
the number of digits to the right of the decimal point is used
to indicate scale.  For values with a zero or negative scale,
the resulting string is generated as if the value were
converted to a numerically equal value with zero scale and as
if all the trailing zeros of the zero scale value were present
in the result.

The entire string is prefixed by a minus sign character '-'
(<code>'&#92;u002D'</code>) if the unscaled value is less than
zero. No sign character is prefixed if the unscaled value is
zero or positive.

Note that if the result of this method is passed to the
{@linkplain #BigDecimal(String) string constructor}, only the
numerical value of this {@code BigDecimal} will necessarily be
recovered; the representation of the new {@code BigDecimal}
may have a different scale.  In particular, if this
{@code BigDecimal} has a negative scale, the string resulting
from this method will have a scale of zero when processed by
the string constructor.

(This method behaves analogously to the {@code toString}
method in 1.4 and earlier releases.)

@return a string representation of this {@code BigDecimal}
without an exponent field.
@since 1.5
@see #toString()
@see #toEngineeringString()

## BigDecimal.toBigInteger()

```java
public BigInteger toBigInteger()
```

Converts this {@code BigDecimal} to a {@code BigInteger}.
This conversion is analogous to the
<i>narrowing primitive conversion</i> from {@code double} to
{@code long} as defined in
<cite>The Java Language Specification</cite>:
any fractional part of this
{@code BigDecimal} will be discarded.  Note that this
conversion can lose information about the precision of the
{@code BigDecimal} value.
<p>
To have an exception thrown if the conversion is inexact (in
other words if a nonzero fractional part is discarded), use the
{@link #toBigIntegerExact()} method.

@return this {@code BigDecimal} converted to a {@code BigInteger}.
@jls 5.1.3 Narrowing Primitive Conversion

## BigDecimal.toBigIntegerExact()

```java
public BigInteger toBigIntegerExact()
```

Converts this {@code BigDecimal} to a {@code BigInteger},
checking for lost information.  An exception is thrown if this
{@code BigDecimal} has a nonzero fractional part.

@return this {@code BigDecimal} converted to a {@code BigInteger}.
@throws ArithmeticException if {@code this} has a nonzero
        fractional part.
@since  1.5

## BigDecimal.longValue()

```java
public long longValue()
```

Converts this {@code BigDecimal} to a {@code long}.
This conversion is analogous to the
<i>narrowing primitive conversion</i> from {@code double} to
{@code short} as defined in
<cite>The Java Language Specification</cite>:
any fractional part of this
{@code BigDecimal} will be discarded, and if the resulting
"{@code BigInteger}" is too big to fit in a
{@code long}, only the low-order 64 bits are returned.
Note that this conversion can lose information about the
overall magnitude and precision of this {@code BigDecimal} value as well
as return a result with the opposite sign.

@return this {@code BigDecimal} converted to a {@code long}.
@jls 5.1.3 Narrowing Primitive Conversion

## BigDecimal.longValueExact()

```java
public long longValueExact()
```

Converts this {@code BigDecimal} to a {@code long}, checking
for lost information.  If this {@code BigDecimal} has a
nonzero fractional part or is out of the possible range for a
{@code long} result then an {@code ArithmeticException} is
thrown.

@return this {@code BigDecimal} converted to a {@code long}.
@throws ArithmeticException if {@code this} has a nonzero
        fractional part, or will not fit in a {@code long}.
@since  1.5

## BigDecimal.intValue()

```java
public int intValue()
```

Converts this {@code BigDecimal} to an {@code int}.
This conversion is analogous to the
<i>narrowing primitive conversion</i> from {@code double} to
{@code short} as defined in
<cite>The Java Language Specification</cite>:
any fractional part of this
{@code BigDecimal} will be discarded, and if the resulting
"{@code BigInteger}" is too big to fit in an
{@code int}, only the low-order 32 bits are returned.
Note that this conversion can lose information about the
overall magnitude and precision of this {@code BigDecimal}
value as well as return a result with the opposite sign.

@return this {@code BigDecimal} converted to an {@code int}.
@jls 5.1.3 Narrowing Primitive Conversion

## BigDecimal.intValueExact()

```java
public int intValueExact()
```

Converts this {@code BigDecimal} to an {@code int}, checking
for lost information.  If this {@code BigDecimal} has a
nonzero fractional part or is out of the possible range for an
{@code int} result then an {@code ArithmeticException} is
thrown.

@return this {@code BigDecimal} converted to an {@code int}.
@throws ArithmeticException if {@code this} has a nonzero
        fractional part, or will not fit in an {@code int}.
@since  1.5

## BigDecimal.shortValueExact()

```java
public short shortValueExact()
```

Converts this {@code BigDecimal} to a {@code short}, checking
for lost information.  If this {@code BigDecimal} has a
nonzero fractional part or is out of the possible range for a
{@code short} result then an {@code ArithmeticException} is
thrown.

@return this {@code BigDecimal} converted to a {@code short}.
@throws ArithmeticException if {@code this} has a nonzero
        fractional part, or will not fit in a {@code short}.
@since  1.5

## BigDecimal.byteValueExact()

```java
public byte byteValueExact()
```

Converts this {@code BigDecimal} to a {@code byte}, checking
for lost information.  If this {@code BigDecimal} has a
nonzero fractional part or is out of the possible range for a
{@code byte} result then an {@code ArithmeticException} is
thrown.

@return this {@code BigDecimal} converted to a {@code byte}.
@throws ArithmeticException if {@code this} has a nonzero
        fractional part, or will not fit in a {@code byte}.
@since  1.5

## BigDecimal.floatValue()

```java
public float floatValue()
```

Converts this {@code BigDecimal} to a {@code float}.
This conversion is similar to the
<i>narrowing primitive conversion</i> from {@code double} to
{@code float} as defined in
<cite>The Java Language Specification</cite>:
if this {@code BigDecimal} has too great a
magnitude to represent as a {@code float}, it will be
converted to {@link Float#NEGATIVE_INFINITY} or {@link
Float#POSITIVE_INFINITY} as appropriate.  Note that even when
the return value is finite, this conversion can lose
information about the precision of the {@code BigDecimal}
value.

@return this {@code BigDecimal} converted to a {@code float}.
@jls 5.1.3 Narrowing Primitive Conversion

## BigDecimal.doubleValue()

```java
public double doubleValue()
```

Converts this {@code BigDecimal} to a {@code double}.
This conversion is similar to the
<i>narrowing primitive conversion</i> from {@code double} to
{@code float} as defined in
<cite>The Java Language Specification</cite>:
if this {@code BigDecimal} has too great a
magnitude represent as a {@code double}, it will be
converted to {@link Double#NEGATIVE_INFINITY} or {@link
Double#POSITIVE_INFINITY} as appropriate.  Note that even when
the return value is finite, this conversion can lose
information about the precision of the {@code BigDecimal}
value.

@return this {@code BigDecimal} converted to a {@code double}.
@jls 5.1.3 Narrowing Primitive Conversion

## BigDecimal.ulp()

```java
public BigDecimal ulp()
```

Returns the size of an ulp, a unit in the last place, of this
{@code BigDecimal}.  An ulp of a nonzero {@code BigDecimal}
value is the positive distance between this value and the
{@code BigDecimal} value next larger in magnitude with the
same number of digits.  An ulp of a zero value is numerically
equal to 1 with the scale of {@code this}.  The result is
stored with the same scale as {@code this} so the result
for zero and nonzero values is equal to {@code [1,
this.scale()]}.

@return the size of an ulp of {@code this}
@since 1.5