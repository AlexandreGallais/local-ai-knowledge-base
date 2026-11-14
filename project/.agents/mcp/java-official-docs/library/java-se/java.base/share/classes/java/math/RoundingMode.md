# RoundingMode enum (java.math)

```java
public enum RoundingMode
```

Specifies a <i>rounding policy</i> for numerical operations capable
of discarding precision. Each rounding mode indicates how the least
significant returned digit of a rounded result is to be calculated.
If fewer digits are returned than the digits needed to represent
the exact numerical result, the discarded digits will be referred
to as the <i>discarded fraction</i> regardless the digits'
contribution to the value of the number.  In other words,
considered as a numerical value, the discarded fraction could have
an absolute value greater than one.

<p>More generally, a rounding policy defines a mapping from the
real numbers to a subset of representable values. In the case of
{@link BigDecimal}, the representable values are a function of the
{@linkplain MathContext#getPrecision() precision} being used in the
computation. Assuming the mathematical result is within the
exponent range of {@code BigDecimal}, the mathematical result will
be exactly representable in the result precision or will fall
between two adjacent representable values. In the case of falling
between two representable values, the rounding policy determines
which of those two bracketing values is the result. For in-range
real numbers, for a given set of representable values, a rounding
policy maps a continuous segment of the real number line to a
single representable value where the real number numerically equal
to a representable value is mapped to that value.

<p>Each rounding mode description includes a table listing how
different two-digit decimal values would round to a one digit
decimal value under the rounding mode in question.  The result
column in the tables could be gotten by creating a
{@code BigDecimal} number with the specified value, forming a
{@link MathContext} object with the proper settings
({@code precision} set to {@code 1}, and the
{@code roundingMode} set to the rounding mode in question), and
calling {@link BigDecimal#round round} on this number with the
proper {@code MathContext}.  A summary table showing the results
of these rounding operations for all rounding modes appears below.

<table class="striped">
<caption><b>Summary of Rounding Operations Under Different Rounding Modes</b></caption>
<thead>
<tr><th scope="col" rowspan="2">Input Number</th><th scope="col"colspan=8>Result of rounding input to one digit with the given
                          rounding mode</th>
<tr style="vertical-align:top">
                              <th>{@code UP}</th>
                                          <th>{@code DOWN}</th>
                                                       <th>{@code CEILING}</th>
                                                                      <th>{@code FLOOR}</th>
                                                                                   <th>{@code HALF_UP}</th>
                                                                                                  <th>{@code HALF_DOWN}</th>
                                                                                                                   <th>{@code HALF_EVEN}</th>
                                                                                                                                    <th>{@code UNNECESSARY}</th>
</thead>
<tbody style="text-align:right">

<tr><th scope="row">5.5</th>  <td>6</td>  <td>5</td>    <td>6</td>    <td>5</td>  <td>6</td>      <td>5</td>       <td>6</td>       <td>throw {@code ArithmeticException}</td>
<tr><th scope="row">2.5</th>  <td>3</td>  <td>2</td>    <td>3</td>    <td>2</td>  <td>3</td>      <td>2</td>       <td>2</td>       <td>throw {@code ArithmeticException}</td>
<tr><th scope="row">1.6</th>  <td>2</td>  <td>1</td>    <td>2</td>    <td>1</td>  <td>2</td>      <td>2</td>       <td>2</td>       <td>throw {@code ArithmeticException}</td>
<tr><th scope="row">1.1</th>  <td>2</td>  <td>1</td>    <td>2</td>    <td>1</td>  <td>1</td>      <td>1</td>       <td>1</td>       <td>throw {@code ArithmeticException}</td>
<tr><th scope="row">1.0</th>  <td>1</td>  <td>1</td>    <td>1</td>    <td>1</td>  <td>1</td>      <td>1</td>       <td>1</td>       <td>1</td>
<tr><th scope="row">-1.0</th> <td>-1</td> <td>-1</td>   <td>-1</td>   <td>-1</td> <td>-1</td>     <td>-1</td>      <td>-1</td>      <td>-1</td>
<tr><th scope="row">-1.1</th> <td>-2</td> <td>-1</td>   <td>-1</td>   <td>-2</td> <td>-1</td>     <td>-1</td>      <td>-1</td>      <td>throw {@code ArithmeticException}</td>
<tr><th scope="row">-1.6</th> <td>-2</td> <td>-1</td>   <td>-1</td>   <td>-2</td> <td>-2</td>     <td>-2</td>      <td>-2</td>      <td>throw {@code ArithmeticException}</td>
<tr><th scope="row">-2.5</th> <td>-3</td> <td>-2</td>   <td>-2</td>   <td>-3</td> <td>-3</td>     <td>-2</td>      <td>-2</td>      <td>throw {@code ArithmeticException}</td>
<tr><th scope="row">-5.5</th> <td>-6</td> <td>-5</td>   <td>-5</td>   <td>-6</td> <td>-6</td>     <td>-5</td>      <td>-6</td>      <td>throw {@code ArithmeticException}</td>
</tbody>
</table>


<p>This {@code enum} is intended to replace the integer-based
enumeration of rounding mode constants in {@link BigDecimal}
({@link BigDecimal#ROUND_UP}, {@link BigDecimal#ROUND_DOWN},
etc. ).

@apiNote
Five of the rounding modes declared in this class correspond to
rounding-direction attributes defined in the <cite>IEEE Standard
for Floating-Point Arithmetic</cite>. Where present,
this correspondence will be noted in the documentation of the
particular constant.

@see BigDecimal
@see MathContext
@spec https://standards.ieee.org/ieee/754/6210/
      IEEE Standard for Floating-Point Arithmetic
@jls 15.4 Floating-point Expressions

@author  Josh Bloch
@author  Mike Cowlishaw
@author  Joseph D. Darcy
@since 1.5

## RoundingMode.valueOf(int)

```java
public static RoundingMode valueOf(int rm)
```

Returns the {@code RoundingMode} object corresponding to a
legacy integer rounding mode constant in {@link BigDecimal}.

@param  rm legacy integer rounding mode to convert
@return {@code RoundingMode} corresponding to the given integer.
@throws IllegalArgumentException integer is out of range