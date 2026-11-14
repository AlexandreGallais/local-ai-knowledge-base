---
title: "StringJoiner class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/StringJoiner.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StringJoiner class (java.util)

```java
public final class StringJoiner
```

`StringJoiner` is used to construct a sequence of characters separated
by a delimiter and optionally starting with a supplied prefix
and ending with a supplied suffix.

Prior to adding something to the `StringJoiner`, its
`sj.toString()` method will, by default, return `prefix + suffix`.
However, if the `setEmptyValue` method is called, the `emptyValue`
supplied will be returned instead. This can be used, for example, when
creating a string using set notation to indicate an empty set, i.e.
`"{}"`, where the `prefix` is `"{"`, the
`suffix` is `"}"` and nothing has been added to the
`StringJoiner`.

**API note:** The String `"[George:Sally:Fred]"` may be constructed as follows:

```java
StringJoiner sj = new StringJoiner(":", "[", "]");
sj.add("George").add("Sally").add("Fred");
String desiredString = sj.toString();
```

A `StringJoiner` may be employed to create formatted output from a
`java.util.stream.Stream` using
`java.util.stream.Collectors.joining(CharSequence)`. For example:

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4);
String commaSeparatedNumbers = numbers.stream()
    .map(i -> i.toString())
    .collect(Collectors.joining(", "));
```

**See also:** java.util.stream.Collectors#joining(CharSequence)

**See also:** java.util.stream.Collectors#joining(CharSequence, CharSequence, CharSequence)

**Since:** 1.8

## StringJoiner.StringJoiner(CharSequence)

```java
public StringJoiner(CharSequence delimiter)
```

Constructs a `StringJoiner` with no characters in it, with no
`prefix` or `suffix`, and a copy of the supplied
`delimiter`.
If no characters are added to the `StringJoiner` and methods
accessing the value of it are invoked, it will not return a
`prefix` or `suffix` (or properties thereof) in the result,
unless `setEmptyValue` has first been called.

Parameters:

- `delimiter`: the sequence of characters to be used between each element added to the `StringJoiner` value

Throws:

- `NullPointerException`: if `delimiter` is `null`

## StringJoiner.StringJoiner(CharSequence, CharSequence, CharSequence)

```java
public StringJoiner(CharSequence delimiter, CharSequence prefix, CharSequence suffix)
```

Constructs a `StringJoiner` with no characters in it using copies
of the supplied `prefix`, `delimiter` and `suffix`.
If no characters are added to the `StringJoiner` and methods
accessing the string value of it are invoked, it will return the
`prefix + suffix` (or properties thereof) in the result, unless
`setEmptyValue` has first been called.

Parameters:

- `delimiter`: the sequence of characters to be used between each element added to the `StringJoiner`
- `prefix`: the sequence of characters to be used at the beginning
- `suffix`: the sequence of characters to be used at the end

Throws:

- `NullPointerException`: if `prefix`, `delimiter`, or `suffix` is `null`

## StringJoiner.setEmptyValue(CharSequence)

```java
public StringJoiner setEmptyValue(CharSequence emptyValue)
```

Sets the sequence of characters to be used when determining the string
representation of this `StringJoiner` and no elements have been
added yet, that is, when it is empty.  A copy of the `emptyValue`
parameter is made for this purpose. Note that once an add method has been
called, the `StringJoiner` is no longer considered empty, even if
the element(s) added correspond to the empty `String`.

Parameters:

- `emptyValue`: the characters to return as the value of an empty `StringJoiner`

**Returns:** this `StringJoiner` itself so the calls may be chained

Throws:

- `NullPointerException`: when the `emptyValue` parameter is `null`

## StringJoiner.toString()

```java
public String toString()
```

Returns the current value, consisting of the `prefix`, the values
added so far separated by the `delimiter`, and the `suffix`,
unless no elements have been added in which case, the
`prefix + suffix` or the `emptyValue` characters are returned.

**Returns:** the string representation of this `StringJoiner`

## StringJoiner.add(CharSequence)

```java
public StringJoiner add(CharSequence newElement)
```

Adds a copy of the given `CharSequence` value as the next
element of the `StringJoiner` value. If `newElement` is
`null`, then `"null"` is added.

Parameters:

- `newElement`: The element to add

**Returns:** a reference to this `StringJoiner`

## StringJoiner.merge(StringJoiner)

```java
public StringJoiner merge(StringJoiner other)
```

Adds the contents of the given `StringJoiner` without prefix and
suffix as the next element if it is non-empty. If the given `StringJoiner` is empty, the call has no effect.

A `StringJoiner` is empty if add()
has never been called, and if `merge()` has never been called
with a non-empty `StringJoiner` argument.

If the other `StringJoiner` is using a different delimiter,
then elements from the other `StringJoiner` are concatenated with
that delimiter and the result is appended to this `StringJoiner`
as a single element.

Parameters:

- `other`: The `StringJoiner` whose contents should be merged into this one

**Returns:** This `StringJoiner`

Throws:

- `NullPointerException`: if the other `StringJoiner` is null

## StringJoiner.length()

```java
public int length()
```

Returns the length of the `String` representation
of this `StringJoiner`. Note that if
no add methods have been called, then the length of the `String`
representation (either `prefix + suffix` or `emptyValue`)
will be returned. The value should be equivalent to
`toString().length()`.

**Returns:** the length of the current value of `StringJoiner`
