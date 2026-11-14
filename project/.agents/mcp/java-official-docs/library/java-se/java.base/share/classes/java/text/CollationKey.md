---
title: "CollationKey class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/CollationKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CollationKey class (java.text)

```java
public abstract class CollationKey <example-value> Comparable<CollationKey>
```

A `CollationKey` represents a `String` under the
rules of a specific `Collator` object. Comparing two
`CollationKey`s returns the relative order of the
`String`s they represent. Using `CollationKey`s
to compare `String`s is generally faster than using
`Collator.compare`. Thus, when the `String`s
must be compared multiple times, for example when sorting a list
of `String`s. It's more efficient to use `CollationKey`s.

You can not create `CollationKey`s directly. Rather,
generate them by calling `Collator.getCollationKey`.
You can only compare `CollationKey`s generated from
the same `Collator` object.

Generating a `CollationKey` for a `String`
involves examining the entire `String`
and converting it to series of bits that can be compared bitwise. This
allows fast comparisons once the keys are generated. The cost of generating
keys is recouped in faster comparisons when `String`s need
to be compared many times. On the other hand, the result of a comparison
is often determined by the first couple of characters of each `String`.
`Collator.compare` examines only as many characters as it needs which
allows it to be faster when doing single comparisons.

The following example shows how `CollationKey`s might be used
to sort a list of `String`s.

**See also:** Collator

**See also:** RuleBasedCollator

**Since:** 1.1

## CollationKey.compareTo(CollationKey)

```java
public abstract int compareTo(CollationKey <example-value>)
```

Compare this CollationKey to the target CollationKey. The collation rules of the
Collator object which created these keys are applied. **Note:**
CollationKeys created by different Collators can not be compared.

Parameters:

- `target`: target CollationKey

**Returns:** Returns an integer value. Value is less than zero if this is less
than target, value is zero if this and target are equal and value is greater than
zero if this is greater than target.

**See also:** java.text.Collator#compare

## CollationKey.getSourceString()

```java
public String getSourceString()
```

Returns the String that this CollationKey represents.

**Returns:** the source string of this CollationKey

## CollationKey.toByteArray()

```java
public abstract byte[] toByteArray()
```

Converts the CollationKey to a sequence of bits. If two CollationKeys
could be legitimately compared, then one could compare the byte arrays
for each of those keys to obtain the same result.  Byte arrays are
organized most significant byte first.

**Returns:** a byte array representation of the CollationKey

## CollationKey.CollationKey(String)

```java
protected CollationKey(String source)
```

CollationKey constructor.

Parameters:

- `source`: the source string

**Since:** 1.6

Throws:

- `NullPointerException`: if `source` is null
