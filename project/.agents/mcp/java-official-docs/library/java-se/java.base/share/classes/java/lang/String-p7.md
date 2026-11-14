---
title: "String class (java.lang) (part 7 of 7)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/String.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# String class (java.lang) (part 7 of 7)

## String.intern()

```java
public native String intern()
```

Returns a canonical representation for the string object.

A pool of strings, initially empty, is maintained privately by the
class `String`.

When the intern method is invoked, if the pool already contains a
string equal to this `String` object as determined by
the `equals(Object)` method, then the string from the pool is
returned. Otherwise, this `String` object is added to the
pool and a reference to this `String` object is returned.

It follows that for any two strings `s` and `t`,
`s.intern() == t.intern()` is `true`
if and only if `s.equals(t)` is `true`.

All literal strings and string-valued constant expressions are
interned. String literals are defined in section  of the
*The Java Language Specification*.

**Returns:** a string that has the same contents as this string, but is
         guaranteed to be from a pool of unique strings.

## String.repeat(int)

```java
public String repeat(int count)
```

Returns a string whose value is the concatenation of this
string repeated `count` times.

If this string is empty or count is zero then the empty
string is returned.

Parameters:

- `count`: number of times to repeat

**Returns:** A string composed of this string repeated
         `count` times or the empty string if this
         string is empty or count is zero

**Since:** 11

Throws:

- `IllegalArgumentException`: if the `count` is negative.

## String.describeConstable()

```java
public Optional<String> describeConstable()
```

Returns an `Optional` containing the nominal descriptor for this
instance, which is the instance itself.

**Returns:** an `Optional` describing the `String` instance

**Since:** 12

## String.resolveConstantDesc(MethodHandles.Lookup)

```java
public String resolveConstantDesc(MethodHandles.Lookup lookup)
```

Resolves this instance as a `ConstantDesc`, the result of which is
the instance itself.

Parameters:

- `lookup`: ignored

**Returns:** the `String` instance

**Since:** 12
