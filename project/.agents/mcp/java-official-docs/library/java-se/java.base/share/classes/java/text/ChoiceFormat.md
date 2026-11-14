# ChoiceFormat class (java.text)

```java
public class ChoiceFormat extends NumberFormat
```

{@code ChoiceFormat} is a concrete subclass of {@code NumberFormat} that
allows you to attach a format to a range of numbers.
It is generally used in a {@link MessageFormat} for handling plurals.
The choice is specified with an ascending list of doubles, where each item
specifies a half-open interval up to the next item:
<blockquote>
<pre>
X matches j if and only if limit[j] &le; X &lt; limit[j+1]
</pre>
</blockquote>
If there is no match, then either the first or last index is used, depending
on whether the number (X) is too low or too high.  If the limit array is not
in ascending order, the results of formatting will be incorrect.  ChoiceFormat
also accepts <code>&#92;u221E</code> as equivalent to infinity(INF).

<p>
<strong>Note:</strong>
{@code ChoiceFormat} differs from the other {@code Format}
classes in that you create a {@code ChoiceFormat} object with a
constructor (not with a {@code getInstance} style factory
method). The factory methods aren't necessary because {@code ChoiceFormat}
doesn't require any complex setup for a given locale. In fact,
{@code ChoiceFormat} doesn't implement any locale specific behavior.

<h2><a id="patterns">Patterns</a></h2>
A {@code ChoiceFormat} pattern has the following syntax:
<blockquote>
<dl>
<dt><i>Pattern:</i>
<dd>SubPattern *("|" SubPattern)
</dl>

<dl>
<dt><i>SubPattern:</i>
<dd>Limit Relation Format
<dd><sub>Note: Each additional SubPattern must have an ascending Limit-Relation interval</sub></dd>
</dl>

<dl>
<dt><i>Limit:</i>
<dd>Number / "&infin;" / "-&infin;"
</dl>

<dl>
<dt><i>Number:</i>
<dd>["-"] *(Digit) 1*(Decimal / Digit) *(Digit) [Exponent]
</dl>

<dl>
<dt><i>Decimal:</i>
<dd>1*(Digit ".") / 1*("." Digit)
</dl>

<dl>
<dt><i>Digit:</i>
<dd>0 - 9
</dl>

<dl>
<dt><i>Exponent:</i>
<dd>*(Digit) Digit ExponentSymbol Digit *(Digit)
</dl>

<dl>
<dt><i>ExponentSymbol:</i>
<dd>"e" / "E"
</dl>

<dl>
<dt><i>Relation:</i>
<dd>"#" / "&lt;" / "&le;"
</dl>

<dl>
<dt><i>Format:</i>
<dd>Any characters except the special pattern character '|'
</dl>

</blockquote>

<i>Note:The relation &le; is not equivalent to &lt;&equals;</i>

<p> To use a reserved special pattern character within a <i>Format</i> pattern,
it must be single quoted. For example, {@code new ChoiceFormat("1#'|'foo'|'").format(1)}
returns {@code "|foo|"}.
Use two single quotes in a row to produce a literal single quote. For example,
{@code new ChoiceFormat("1# ''one'' ").format(1)} returns {@code " 'one' "}.

<h2>Usage Information</h2>

<p>
A {@code ChoiceFormat} can be constructed using either an array of formats
and an array of limits or a string pattern. When constructing with
format and limit arrays, the length of these arrays must be the same.

For example,
<ul>
<li>
    <em>limits</em> = {1,2,3,4,5,6,7}<br>
    <em>formats</em> = {"Sun","Mon","Tue","Wed","Thur","Fri","Sat"}
<li>
    <em>limits</em> = {0, 1, ChoiceFormat.nextDouble(1)}<br>
    <em>formats</em> = {"no files", "one file", "many files"}<br>
    ({@code nextDouble} can be used to get the next higher double, to
    make the half-open interval.)
</ul>

<p>
Below is an example of constructing a ChoiceFormat with arrays to format
and parse values:
{@snippet lang=java :
double[] limits = {1,2,3,4,5,6,7};
String[] dayOfWeekNames = {"Sun","Mon","Tue","Wed","Thur","Fri","Sat"};
ChoiceFormat form = new ChoiceFormat(limits, dayOfWeekNames);
ParsePosition status = new ParsePosition(0);
for (double i = 0.0; i <= 8.0; ++i) {
    status.setIndex(0);
    System.out.println(i + " -> " + form.format(i) + " -> "
                             + form.parse(form.format(i),status));
}
}

<p>Below is an example of constructing a ChoiceFormat with a String pattern:
{@snippet lang=java :
ChoiceFormat fmt = new ChoiceFormat(
     "-1#is negative| 0#is zero or fraction | 1#is one |1.0<is 1+ |2#is two |2<is more than 2.");

System.out.println(fmt.format(Double.NEGATIVE_INFINITY)); // outputs "is negative"
System.out.println(fmt.format(-1.0)); // outputs "is negative"
System.out.println(fmt.format(0)); // outputs "is zero or fraction"
System.out.println(fmt.format(0.9)); // outputs "is zero or fraction"
System.out.println(fmt.format(1)); // outputs "is one"
System.out.println(fmt.format(1.5)); // outputs "is 1+"
System.out.println(fmt.format(2)); // outputs "is two"
System.out.println(fmt.format(2.1)); // outputs "is more than 2."
System.out.println(fmt.format(Double.NaN)); // outputs "is negative"
System.out.println(fmt.format(Double.POSITIVE_INFINITY)); // outputs "is more than 2."
}

<p>
For more sophisticated patterns, {@code ChoiceFormat} can be used with
{@link MessageFormat} to produce accurate forms for singular and plural:
{@snippet lang=java :
MessageFormat msgFmt = new MessageFormat("The disk \"{0}\" contains {1}.");
double[] fileLimits = {0,1,2};
String[] filePart = {"no files","one file","{1,number} files"};
ChoiceFormat fileChoices = new ChoiceFormat(fileLimits, filePart);
msgFmt.setFormatByArgumentIndex(1, fileChoices);
Object[] args = {"MyDisk", 1273};
System.out.println(msgFmt.format(args));
}
The output with different values for {@code fileCount}:
<blockquote><pre>
The disk "MyDisk" contains no files.
The disk "MyDisk" contains one file.
The disk "MyDisk" contains 1,273 files.
</pre></blockquote>
See {@link MessageFormat##pattern_caveats MessageFormat} for caveats regarding
{@code MessageFormat} patterns within a {@code ChoiceFormat} pattern.

<h2><a id="synchronization">Synchronization</a></h2>

<p>
Choice formats are not synchronized.
It is recommended to create separate format instances for each thread.
If multiple threads access a format concurrently, it must be synchronized
externally.

@apiNote A subclass could perform more consistent pattern validation by
throwing an {@code IllegalArgumentException} for all incorrect cases.
See the {@code Implementation Note} for this implementation's behavior regarding
incorrect patterns.
<p>This class inherits instance methods from {@code NumberFormat} it does
not utilize; a subclass could override and throw {@code
UnsupportedOperationException} for such methods.
@implNote Given an incorrect pattern, this implementation may either
throw an exception or succeed and discard the incorrect portion. A {@code
NumberFormatException} is thrown if a {@code limit} can not be
parsed as a numeric value and an {@code IllegalArgumentException} is thrown
if a {@code SubPattern} is missing, or the intervals are not ascending.
Discarding the incorrect portion may result in a ChoiceFormat with
empty {@code limits} and {@code formats}.


@see          DecimalFormat
@see          MessageFormat
@author       Mark Davis
@since 1.1

## ChoiceFormat.applyPattern(String)

```java
public void applyPattern(String newPattern)
```

Apply the given pattern to this ChoiceFormat object. The syntax and error
related caveats for the ChoiceFormat pattern can be found in the
{@linkplain ##patterns Patterns} section. Unlike {@link #setChoices(double[],
String[])}, this method will throw an {@code IllegalArgumentException} if
the {@code limits} are not in ascending order.

@param newPattern a pattern string
@throws    NullPointerException if {@code newPattern}
           is {@code null}
@throws    IllegalArgumentException if {@code newPattern}
           violates the pattern syntax
@see #ChoiceFormat(String)

## ChoiceFormat.toPattern()

```java
public String toPattern()
```

{@return a pattern {@code string} that represents the {@code limits} and
{@code formats} of this ChoiceFormat object}

The {@code string} returned is not guaranteed to be the same input
{@code string} passed to either {@link #applyPattern(String)} or
{@link #ChoiceFormat(String)}.

@see #applyPattern(String)

## ChoiceFormat.ChoiceFormat(String)

```java
public ChoiceFormat(String newPattern)
```

Constructs a ChoiceFormat with limits and corresponding formats
based on the pattern. The syntax and error related caveats for the
ChoiceFormat pattern can be found in the {@linkplain ##patterns Patterns}
section. Unlike {@link #ChoiceFormat(double[], String[])}, this constructor will
throw an {@code IllegalArgumentException} if the {@code limits} are not
in ascending order.

@param newPattern the new pattern string
@throws    NullPointerException if {@code newPattern} is
           {@code null}
@throws    IllegalArgumentException if {@code newPattern}
           violates the pattern syntax
@see #applyPattern

## ChoiceFormat.ChoiceFormat(double[], String[])

```java
public ChoiceFormat(double[] limits, String[] formats)
```

Constructs with the limits and the corresponding formats.

@param limits limits in ascending order
@param formats corresponding format strings
@throws    NullPointerException if {@code limits} or {@code formats}
           is {@code null}
@throws    IllegalArgumentException if the length of {@code limits}
           and {@code formats} are not equal
@see #setChoices

## ChoiceFormat.setChoices(double[], String[])

```java
public void setChoices(double[] limits, String[] formats)
```

Set the choices to be used in formatting.

@param limits contains the top value that you want
parsed with that format, and should be in ascending sorted order. When
formatting X, the choice will be the i, where
limit[i] &le; X {@literal <} limit[i+1].
If the limit array is not in ascending order, the results of formatting
will be incorrect.
@param formats are the formats you want to use for each limit.
@throws    NullPointerException if {@code limits} or
           {@code formats} is {@code null}
@throws    IllegalArgumentException if the length of {@code limits}
           and {@code formats} are not equal

## ChoiceFormat.getLimits()

```java
public double[] getLimits()
```

{@return the limits of this ChoiceFormat}

## ChoiceFormat.getFormats()

```java
public Object[] getFormats()
```

{@return the formats of this ChoiceFormat}

## ChoiceFormat.format(long, StringBuffer, FieldPosition)

```java
public StringBuffer format(long number, StringBuffer toAppendTo, FieldPosition status)
```

Specialization of format. This method really calls
{@link #format(double, StringBuffer, FieldPosition)}.
Thus, the range of longs that are supported is only equal to
the range that can be stored by double. This will never be
a practical limitation.

@param number number to be formatted and substituted.
@param toAppendTo where text is appended.
@param status ignore no useful status is returned.
@throws    ArrayIndexOutOfBoundsException if either the {@code limits}
           or {@code formats} of this ChoiceFormat are empty
@throws    NullPointerException if {@code toAppendTo}
           is {@code null}

## ChoiceFormat.format(double, StringBuffer, FieldPosition)

```java
public StringBuffer format(double number, StringBuffer toAppendTo, FieldPosition status)
```

Returns pattern with formatted double.

@param number number to be formatted and substituted.
@param toAppendTo where text is appended.
@param status ignore no useful status is returned.
@throws    ArrayIndexOutOfBoundsException if either the {@code limits}
           or {@code formats} of this ChoiceFormat are empty
@throws    NullPointerException if {@code toAppendTo}
           is {@code null}

## ChoiceFormat.parse(String, ParsePosition)

```java
public Number parse(String text, ParsePosition status)
```

Parses the input text starting at the index given by the {@code ParsePosition}
as a {@code Double}. The value returned is the {@code limit} corresponding
to the {@code format} that is the longest substring of the input text.
Matching is done in ascending order, when multiple {@code format}s match
the text equivalently in strength, the first matching {@code limit} is
returned. If there is no match, {@code Double.NaN} is returned.
<p>
For example,
{@snippet lang=java :
var fmt = new ChoiceFormat("0#foo|1#bar|2#baz");
fmt.parse("baz", new ParsePosition(0)); // returns 2.0
fmt.parse("quux", new ParsePosition(0)); // returns NaN
}

@param text the source text.
@param status an input-output parameter.  On input, the
status.index field indicates the first character of the
source text that should be parsed.  On exit, if no error
occurred, status.index is set to the first unparsed character
in the source text.  On exit, if an error did occur,
status.index is unchanged and status.errorIndex is set to the
first index of the character that caused the parse to fail.
@return A Number which represents the {@code limit} corresponding to the
{@code format} parsed, or {@code Double.NaN} if the parse fails.
@throws    NullPointerException if {@code status} is {@code null}
           or if {@code text} is {@code null} and the list of
           choice strings is not empty.

## ChoiceFormat.isStrict()

```java
public boolean isStrict()
```

@since 23

## ChoiceFormat.setStrict(boolean)

```java
public void setStrict(boolean strict)
```

@since 23

## ChoiceFormat.nextDouble(double)

```java
public static final double nextDouble (double d)
```

Finds the least double greater than {@code d}.
If {@code NaN}, returns same value.
<p>Used to make half-open intervals.

@implNote This is equivalent to calling
{@link Math#nextUp(double) Math.nextUp(d)}

@param d the reference value
@return the least double value greater than {@code d}
@see #previousDouble

## ChoiceFormat.nextDouble(double, boolean)

```java
public static double nextDouble (double d, boolean positive)
```

Finds the least double greater than {@code d} (if {@code positive} is
{@code true}), or the greatest double less than {@code d} (if
{@code positive} is {@code false}).
If {@code NaN}, returns same value.

@implNote This is equivalent to calling
{@code positive ? Math.nextUp(d) : Math.nextDown(d)}

@param d        the reference value
@param positive {@code true} if the least double is desired;
                {@code false} otherwise
@return the least or greater double value

## ChoiceFormat.previousDouble(double)

```java
public static final double previousDouble (double d)
```

Finds the greatest double less than {@code d}.
If {@code NaN}, returns same value.

@implNote This is equivalent to calling
{@link Math#nextDown(double) Math.nextDown(d)}

@param d the reference value
@return the greatest double value less than {@code d}
@see #nextDouble

## ChoiceFormat.clone()

```java
public Object clone()
```

Overrides Cloneable

## ChoiceFormat.hashCode()

```java
public int hashCode()
```

{@return the hash code for this {@code ChoiceFormat}}

@implSpec This method calculates the hash code value using the values returned by
{@link #getFormats()} and {@link #getLimits()}.
@see Object#hashCode()

## ChoiceFormat.toString()

```java
public String toString()
```

{@return a string identifying this {@code ChoiceFormat}, for debugging}

## ChoiceFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this {@code ChoiceFormat} for equality.
Returns true if the object is also a {@code ChoiceFormat} and the
two formats would format any value the same.

@implSpec This method performs an equality check with a notion of class
identity based on {@code getClass()}, rather than {@code instanceof}.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.
@param  obj object to be compared for equality
@return {@code true} if the specified object is equal to this {@code ChoiceFormat}
@see Object#equals(Object)