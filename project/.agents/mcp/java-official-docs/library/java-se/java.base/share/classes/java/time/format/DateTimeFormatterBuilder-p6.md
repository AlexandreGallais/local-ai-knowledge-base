---
title: "DateTimeFormatterBuilder class (java.time.format) (part 6 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/DateTimeFormatterBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateTimeFormatterBuilder class (java.time.format) (part 6 of 6)

## DateTimeFormatterBuilder.optionalStart()

```java
public DateTimeFormatterBuilder optionalStart()
```

Mark the start of an optional section.

The output of formatting can include optional sections, which may be nested.
An optional section is started by calling this method and ended by calling
`optionalEnd()` or by ending the build process.

All elements in the optional section are treated as optional.
During formatting, the section is only output if data is available in the
`TemporalAccessor` for all the elements in the section.
During parsing, the whole section may be missing from the parsed string.

For example, consider a builder setup as
`builder.appendValue(HOUR_OF_DAY,2).optionalStart().appendValue(MINUTE_OF_HOUR,2)`.
The optional section ends automatically at the end of the builder.
During formatting, the minute will only be output if its value can be obtained from the date-time.
During parsing, the input will be successfully parsed whether the minute is present or not.

**Returns:** this, for chaining, not null

## DateTimeFormatterBuilder.optionalEnd()

```java
public DateTimeFormatterBuilder optionalEnd()
```

Ends an optional section.

The output of formatting can include optional sections, which may be nested.
An optional section is started by calling `optionalStart()` and ended
using this method (or at the end of the builder).

Calling this method without having previously called `optionalStart`
will throw an exception.
Calling this method immediately after calling `optionalStart` has no effect
on the formatter other than ending the (empty) optional section.

All elements in the optional section are treated as optional.
During formatting, the section is only output if data is available in the
`TemporalAccessor` for all the elements in the section.
During parsing, the whole section may be missing from the parsed string.

For example, consider a builder setup as
`builder.appendValue(HOUR_OF_DAY,2).optionalStart().appendValue(MINUTE_OF_HOUR,2).optionalEnd()`.
During formatting, the minute will only be output if its value can be obtained from the date-time.
During parsing, the input will be successfully parsed whether the minute is present or not.

**Returns:** this, for chaining, not null

Throws:

- `IllegalStateException`: if there was no previous call to `optionalStart`

## DateTimeFormatterBuilder.toFormatter()

```java
public DateTimeFormatter toFormatter()
```

Completes this builder by creating the `DateTimeFormatter`
using the default locale.

This will create a formatter with the default FORMAT locale.
Numbers will be printed and parsed using the standard DecimalStyle.
The resolver style will be SMART.

Calling this method will end any open optional sections by repeatedly
calling `optionalEnd()` before creating the formatter.

This builder can still be used after creating the formatter if desired,
although the state may have been changed by calls to `optionalEnd`.

**Returns:** the created formatter, not null

## DateTimeFormatterBuilder.toFormatter(Locale)

```java
public DateTimeFormatter toFormatter(Locale locale)
```

Completes this builder by creating the `DateTimeFormatter`
using the specified locale.

This will create a formatter with the specified locale.
Numbers will be printed and parsed using the standard DecimalStyle.
The resolver style will be SMART.

Calling this method will end any open optional sections by repeatedly
calling `optionalEnd()` before creating the formatter.

This builder can still be used after creating the formatter if desired,
although the state may have been changed by calls to `optionalEnd`.

Parameters:

- `locale`: the locale to use for formatting, not null

**Returns:** the created formatter, not null

## DateTimeFormatterBuilder.withOptional(boolean)

```java
public CompositePrinterParser withOptional(boolean optional)
```

Returns a copy of this printer-parser with the optional flag changed.

Parameters:

- `optional`: the optional flag to set in the copy

**Returns:** the new printer-parser, not null

## DateTimeFormatterBuilder.NumberPrinterParser(TemporalField, int, int, SignStyle, int)

```java
protected NumberPrinterParser(TemporalField field, int minWidth, int maxWidth, SignStyle signStyle, int subsequentWidth)
```

Constructor.

Parameters:

- `field`: the field to format, not null
- `minWidth`: the minimum field width, from 1 to 19
- `maxWidth`: the maximum field width, from minWidth to 19
- `signStyle`: the positive/negative sign style, not null
- `subsequentWidth`: the width of subsequent non-negative numbers, 0 or greater, -1 if fixed width due to active adjacent parsing

## DateTimeFormatterBuilder.parse(DateTimeParseContext, CharSequence, int)

```java
public int parse(DateTimeParseContext context, CharSequence text, int position)
```

This implementation looks for the longest matching string.
For example, parsing Etc/GMT-2 will return Etc/GMC-2 rather than just
Etc/GMC although both are valid.

## DateTimeFormatterBuilder.newTree(DateTimeParseContext)

```java
public static PrefixTree newTree(DateTimeParseContext context)
```

Creates a new prefix parsing tree based on parse context.

Parameters:

- `context`: the parse context

**Returns:** the tree, not null

## DateTimeFormatterBuilder.newTree(Set<String>, DateTimeParseContext)

```java
public static PrefixTree newTree(Set<String> keys, DateTimeParseContext context)
```

Creates a new prefix parsing tree.

Parameters:

- `keys`: a set of strings to build the prefix parsing tree, not null
- `context`: the parse context

**Returns:** the tree, not null

## DateTimeFormatterBuilder.copyTree()

```java
public PrefixTree copyTree()
```

Clone a copy of this tree

## DateTimeFormatterBuilder.add(String, String, int)

```java
public boolean add(String k, String v, int t)
```

Adds a pair of {key, value} into the prefix tree.

Parameters:

- `k`: the key, not null
- `v`: the value, not null

**Returns:** true if the pair is added successfully

## DateTimeFormatterBuilder.match(CharSequence, int, int)

```java
public PrefixTree match(CharSequence text, int off, int end)
```

Match text with the prefix tree.

Parameters:

- `text`: the input text to parse, not null
- `off`: the offset position to start parsing at
- `end`: the end position to stop parsing

**Returns:** the resulting tree, or null if no match found.

## DateTimeFormatterBuilder.match(CharSequence, ParsePosition)

```java
public PrefixTree match(CharSequence text, ParsePosition pos)
```

Match text with the prefix tree.

Parameters:

- `text`: the input text to parse, not null
- `pos`: the position to start parsing at, from 0 to the text length. Upon return, position will be updated to the new parse position, or unchanged, if no match found.

**Returns:** the resulting tree, or null if no match found.
