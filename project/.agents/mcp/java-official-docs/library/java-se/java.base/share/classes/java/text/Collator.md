---
title: "Collator class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/Collator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collator class (java.text)

```java
public abstract class Collator implements java.util.Comparator<Object>, Cloneable
```

The `Collator` class performs locale-sensitive
`String` comparison. You use this class to build
searching and sorting routines for natural language text.

`Collator` is an abstract base class. Subclasses
implement specific collation strategies. One subclass,
`RuleBasedCollator`, is currently provided with
the Java Platform and is applicable to a wide set of languages. Other
subclasses may be created to handle more specialized needs.

Like other locale-sensitive classes, you can use the static
factory method, `getInstance`, to obtain the appropriate
`Collator` object for a given locale. You will only need
to look at the subclasses of `Collator` if you need
to understand the details of a particular collation strategy or
if you need to modify that strategy.

The following example shows how to compare two strings using
the `Collator` for the default locale.

You can set a `Collator`'s *strength* property
to determine the level of difference considered significant in
comparisons. Four strengths are provided: `PRIMARY`,
`SECONDARY`, `TERTIARY`, and `IDENTICAL`.
The exact assignment of strengths to language features is
locale dependent.  For example, in Czech, "e" and "f" are considered
primary differences, while "e" and "ě" are secondary differences,
"e" and "E" are tertiary differences and "e" and "e" are identical.
The following shows how both case and accents could be ignored for
US English.

For comparing `String`s exactly once, the `compare`
method provides the best performance. When sorting a list of
`String`s however, it is generally necessary to compare each
`String` multiple times. In this case, `CollationKey`s
provide better performance. The `CollationKey` class converts
a `String` to a series of bits that can be compared bitwise
against other `CollationKey`s. A `CollationKey` is
created by a `Collator` object for a given `String`.

**API note:** `CollationKey`s from different
`Collator`s can not be compared. See the class description
for `CollationKey`
for an example using `CollationKey`s.

**See also:** RuleBasedCollator

**See also:** CollationKey

**See also:** CollationElementIterator

**See also:** Locale

**Since:** 1.1

## Collator.PRIMARY

```java
public static final int PRIMARY
```

Collator strength value.  When set, only PRIMARY differences are
considered significant during comparison. The assignment of strengths
to language features is locale dependent. A common example is for
different base letters ("a" vs "b") to be considered a PRIMARY difference.

**See also:** java.text.Collator#setStrength

**See also:** java.text.Collator#getStrength

## Collator.SECONDARY

```java
public static final int SECONDARY
```

Collator strength value.  When set, only SECONDARY and above differences are
considered significant during comparison. The assignment of strengths
to language features is locale dependent. A common example is for
different accented forms of the same base letter ("a" vs "ä" (U+00E9)) to be
considered a SECONDARY difference.

**See also:** java.text.Collator#setStrength

**See also:** java.text.Collator#getStrength

## Collator.TERTIARY

```java
public static final int TERTIARY
```

Collator strength value.  When set, only TERTIARY and above differences are
considered significant during comparison. The assignment of strengths
to language features is locale dependent. A common example is for
case differences ("a" vs "A") to be considered a TERTIARY difference.

**See also:** java.text.Collator#setStrength

**See also:** java.text.Collator#getStrength

## Collator.IDENTICAL

```java
public static final int IDENTICAL
```

Collator strength value.  When set, all differences are
considered significant during comparison. The assignment of strengths
to language features is locale dependent. A common example is for control
characters ("\u0001" vs "\u0002") to be considered equal at the
PRIMARY, SECONDARY, and TERTIARY levels but different at the IDENTICAL
level.  Additionally, differences between pre-composed accents such as
"\u00C0" (A-grave) and combining accents such as "A\u0300"
(A, combining-grave) will be considered significant at the IDENTICAL
level if decomposition is set to NO_DECOMPOSITION.

## Collator.NO_DECOMPOSITION

```java
public static final int NO_DECOMPOSITION
```

Decomposition mode value. With NO_DECOMPOSITION
set, accented characters will not be decomposed for collation. This
setting provides the fastest collation but
will only produce correct results for languages that do not use accents.

**See also:** java.text.Collator#getDecomposition

**See also:** java.text.Collator#setDecomposition

## Collator.CANONICAL_DECOMPOSITION

```java
public static final int CANONICAL_DECOMPOSITION
```

Decomposition mode value. With CANONICAL_DECOMPOSITION
set, characters that are canonical variants according to Unicode
standard will be decomposed for collation. This should be used to get
correct collation of accented characters.

CANONICAL_DECOMPOSITION corresponds to Normalization Form D as
described in
Unicode
Standard Annex #15: Unicode Normalization Forms.

**See also:** java.text.Collator#getDecomposition

**See also:** java.text.Collator#setDecomposition

## Collator.FULL_DECOMPOSITION

```java
public static final int FULL_DECOMPOSITION
```

Decomposition mode value. With FULL_DECOMPOSITION
set, both Unicode canonical variants and Unicode compatibility variants
will be decomposed for collation.  This causes not only accented
characters to be collated, but also characters that have special formats
to be collated with their norminal form. For example, the half-width and
full-width ASCII and Katakana characters are then collated together.
FULL_DECOMPOSITION is the most complete and therefore the slowest
decomposition mode.

FULL_DECOMPOSITION corresponds to Normalization Form KD as
described in
Unicode
Standard Annex #15: Unicode Normalization Forms.

**See also:** java.text.Collator#getDecomposition

**See also:** java.text.Collator#setDecomposition

## Collator.getInstance()

```java
public static synchronized Collator getInstance()
```

Gets the Collator for the current default locale.
The default locale is determined by `Locale.getDefault()`.

**Returns:** the Collator for the default locale.(for example, en_US)

**See also:** java.util.Locale#getDefault

## Collator.getInstance(Locale)

```java
public static Collator getInstance(Locale desiredLocale)
```

Gets the Collator for the desired locale. If the desired locale
has the "`ks`" and/or the "`kk`"

Unicode collation settings, this method will call `setStrength(int)`
and/or `setDecomposition(int)` on the created instance, if the specified
Unicode collation settings are recognized based on the following mappings:

Strength/Decomposition mappings

BCP 47 values for strength (ks)
    Collator constants for strength

level1
    PRIMARY
level2
    SECONDARY
level3
    TERTIARY*
identic
    IDENTICAL

BCP 47 values for normalization (kk)
    Collator constants for decomposition

true
    CANONICAL_DECOMPOSITION
false
    NO_DECOMPOSITION*

Asterisk (*) denotes the default value.
If the specified setting value is not recognized, the strength and/or
decomposition is not overridden, as if there were no BCP 47 collation
options in the desired locale.

Parameters:

- `desiredLocale`: the desired locale.

**API note:** Implementations of `Collator` class may produce
different instances based on the "`co`"

Unicode collation identifier in the `desiredLocale`.
For example:

may return a `Collator` instance with the Swedish traditional sorting, which
gives 'v' and 'w' the same sorting order, while the `Collator` instance
for the Swedish locale without "co" identifier distinguishes 'v' and 'w'.

**Returns:** the Collator for the desired locale.

**See also:** java.util.Locale

**See also:** java.util.ResourceBundle

## Collator.compare(String, String)

```java
public abstract int compare(String source, String target)
```

Compares the source string to the target string according to the
collation rules for this Collator.  Returns an integer less than,
equal to or greater than zero depending on whether the source String is
less than, equal to or greater than the target string.  See the Collator
class description for an example of use.

For a one time comparison, this method has the best performance. If a
given String will be involved in multiple comparisons, CollationKey.compareTo
has the best performance. See the Collator class description for an example
using CollationKeys.

Parameters:

- `source`: the source string.
- `target`: the target string.

**Returns:** Returns an integer value. Value is less than zero if source is less than
target, value is zero if source and target are equal, value is greater than zero
if source is greater than target.

**See also:** java.text.CollationKey

**See also:** java.text.Collator#getCollationKey

## Collator.compare(Object, Object)

```java
public int compare(Object o1, Object o2)
```

Compares its two arguments for order.  Returns a negative integer,
zero, or a positive integer as the first argument is less than, equal
to, or greater than the second.

This implementation merely returns
 `compare((String)o1, (String)o2)`.

**Returns:** a negative integer, zero, or a positive integer as the
        first argument is less than, equal to, or greater than the
        second.

**See also:** java.util.Comparator

**Since:** 1.2

Throws:

- `ClassCastException`: the arguments cannot be cast to Strings.

## Collator.getCollationKey(String)

```java
public abstract CollationKey getCollationKey(String source)
```

Transforms the String into a series of bits that can be compared bitwise
to other CollationKeys. CollationKeys provide better performance than
Collator.compare when Strings are involved in multiple comparisons.
See the Collator class description for an example using CollationKeys.

Parameters:

- `source`: the string to be transformed into a collation key.

**Returns:** the CollationKey for the given String based on this Collator's collation
rules. If the source String is null, a null CollationKey is returned.

**See also:** java.text.CollationKey

**See also:** java.text.Collator#compare

## Collator.equals(String, String)

```java
public boolean equals(String source, String target)
```

Convenience method for comparing the equality of two strings based on
this Collator's collation rules.

Parameters:

- `source`: the source string to be compared with.
- `target`: the target string to be compared with.

**Returns:** true if the strings are equal according to the collation
rules.  false, otherwise.

**See also:** java.text.Collator#compare

## Collator.getStrength()

```java
public synchronized int getStrength()
```

Returns this Collator's strength property.  The strength property determines
the minimum level of difference considered significant during comparison.
See the Collator class description for an example of use.

**Returns:** this Collator's current strength property.

**See also:** java.text.Collator#setStrength

**See also:** java.text.Collator#PRIMARY

**See also:** java.text.Collator#SECONDARY

**See also:** java.text.Collator#TERTIARY

**See also:** java.text.Collator#IDENTICAL

## Collator.setStrength(int)

```java
public synchronized void setStrength(int newStrength)
```

Sets this Collator's strength property.  The strength property determines
the minimum level of difference considered significant during comparison.
See the Collator class description for an example of use.

Parameters:

- `newStrength`: the new strength value.

**See also:** java.text.Collator#getStrength

**See also:** java.text.Collator#PRIMARY

**See also:** java.text.Collator#SECONDARY

**See also:** java.text.Collator#TERTIARY

**See also:** java.text.Collator#IDENTICAL

Throws:

- `IllegalArgumentException`: If the new strength value is not one of PRIMARY, SECONDARY, TERTIARY or IDENTICAL.

## Collator.getDecomposition()

```java
public synchronized int getDecomposition()
```

Get the decomposition mode of this Collator. Decomposition mode
determines how Unicode composed characters are handled. Adjusting
decomposition mode allows the user to select between faster and more
complete collation behavior.

The three values for decomposition mode are:

- NO_DECOMPOSITION,

- CANONICAL_DECOMPOSITION

- FULL_DECOMPOSITION.

See the documentation for these three constants for a description
of their meaning.

**Returns:** the decomposition mode

**See also:** java.text.Collator#setDecomposition

**See also:** java.text.Collator#NO_DECOMPOSITION

**See also:** java.text.Collator#CANONICAL_DECOMPOSITION

**See also:** java.text.Collator#FULL_DECOMPOSITION

## Collator.setDecomposition(int)

```java
public synchronized void setDecomposition(int decompositionMode)
```

Set the decomposition mode of this Collator. See getDecomposition
for a description of decomposition mode.

Parameters:

- `decompositionMode`: the new decomposition mode.

**See also:** java.text.Collator#getDecomposition

**See also:** java.text.Collator#NO_DECOMPOSITION

**See also:** java.text.Collator#CANONICAL_DECOMPOSITION

**See also:** java.text.Collator#FULL_DECOMPOSITION

Throws:

- `IllegalArgumentException`: If the given value is not a valid decomposition mode.

## Collator.getAvailableLocales()

```java
public static synchronized Locale[] getAvailableLocales()
```

Returns an array of all locales for which the
`getInstance` methods of this class can return
localized instances.
The returned array represents the union of locales supported
by the Java runtime and by installed
CollatorProvider implementations.
At a minimum, the returned array must contain a `Locale` instance equal to
Locale.ROOT and a `Locale` instance equal to
Locale.US.

**Returns:** An array of locales for which localized
        `Collator` instances are available.

## Collator.clone()

```java
public Object clone()
```

Overrides Cloneable

## Collator.equals(Object)

```java
public boolean equals(Object that)
```

Compares the equality of two Collators.

Parameters:

- `that`: the Collator to be compared with this.

**Returns:** true if this Collator is the same as that Collator;
false otherwise.

## Collator.hashCode()

```java
public abstract int hashCode()
```

Generates the hash code for this Collator.

## Collator.Collator()

```java
protected Collator()
```

Default constructor.  This constructor is
protected so subclasses can get access to it. Users typically create
a Collator sub-class by calling the factory method getInstance.

**See also:** java.text.Collator#getInstance
