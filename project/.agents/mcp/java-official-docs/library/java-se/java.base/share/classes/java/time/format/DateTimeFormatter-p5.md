---
title: "DateTimeFormatter class (java.time.format) (part 5 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/DateTimeFormatter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateTimeFormatter class (java.time.format) (part 5 of 5)

## DateTimeFormatter.parse(CharSequence, ParsePosition)

```java
public TemporalAccessor parse(CharSequence text, ParsePosition position)
```

Parses the text using this formatter, providing control over the text position.

This parses the text without requiring the parse to start from the beginning
of the string or finish at the end.
The result of this method is `TemporalAccessor` which has been resolved,
applying basic <example-value> checks to help ensure a valid date-time.

The text will be parsed from the specified start `ParsePosition`.
The entire length of the text does not have to be parsed, the `ParsePosition`
will be updated with the index at the end of parsing.

The operation of this method is slightly different to similar methods using
`ParsePosition` on `java.text.Format`. That class will return
errors using the error index on the `ParsePosition`. By contrast, this
method will throw a `DateTimeParseException` if an error occurs, with
the exception containing the error index.
This change in behavior is necessary due to the increased complexity of
parsing and resolving dates/times in this API.

If the formatter parses the same field more than once with different values,
the result will be an error.

Parameters:

- `text`: the text to parse, not null
- `position`: the position to parse from, updated with length parsed and the index of any error, not null

**Returns:** the parsed temporal object, not null

Throws:

- `DateTimeParseException`: if unable to parse the requested result
- `IndexOutOfBoundsException`: if the position is invalid

## DateTimeFormatter.parse(CharSequence, TemporalQuery<T>)

```java
public <T> T parse(CharSequence text, TemporalQuery<T> query)
```

Fully parses the text producing an object of the specified type.

Most applications should use this method for parsing.
It parses the entire text to produce the required date-time.
The query is typically a method reference to a `from(TemporalAccessor)` method.
For example:

```java
 LocalDateTime dt = parser.parse(str, LocalDateTime::from);
```

If the parse completes without reading the entire length of the text,
or a problem occurs during parsing or merging, then an exception is thrown.

Parameters:

- `<T>`: the type of the parsed date-time
- `text`: the text to parse, not null
- `query`: the query defining the type to parse to, not null

**Returns:** the parsed date-time, not null

Throws:

- `DateTimeParseException`: if unable to parse the requested result

## DateTimeFormatter.parseBest(CharSequence, TemporalQuery<?>...)

```java
public TemporalAccessor parseBest(CharSequence text, TemporalQuery<?>... queries)
```

Fully parses the text producing an object of one of the specified types.

This parse method is convenient for use when the parser can handle optional elements.
For example, a pattern of 'uuuu-MM-dd HH.mm[ VV]' can be fully parsed to a `ZonedDateTime`,
or partially parsed to a `LocalDateTime`.
The queries must be specified in order, starting from the best matching full-parse option
and ending with the worst matching minimal parse option.
The query is typically a method reference to a `from(TemporalAccessor)` method.

The result is associated with the first type that successfully parses.
Normally, applications will use `instanceof` to check the result.
For example:

```java
 TemporalAccessor dt = parser.parseBest(str, ZonedDateTime::from, LocalDateTime::from);
 if (dt instanceof ZonedDateTime) {
  ...
 } else {
  ...
```

If the parse completes without reading the entire length of the text,
or a problem occurs during parsing or merging, then an exception is thrown.

Parameters:

- `text`: the text to parse, not null
- `queries`: the queries defining the types to attempt to parse to, must implement `TemporalAccessor`, not null

**Returns:** the parsed date-time, not null

Throws:

- `IllegalArgumentException`: if less than 2 types are specified
- `DateTimeParseException`: if unable to parse the requested result

## DateTimeFormatter.parseUnresolved(CharSequence, ParsePosition)

```java
public TemporalAccessor parseUnresolved(CharSequence text, ParsePosition position)
```

Parses the text using this formatter, without resolving the result, intended
for advanced use cases.

Parsing is implemented as a two-phase operation.
First, the text is parsed using the layout defined by the formatter, producing
a `Map` of field to value, a `ZoneId` and a `Chronology`.
Second, the parsed data is *resolved*, by validating, combining and
simplifying the various fields into more useful ones.
This method performs the parsing stage but not the resolving stage.

The result of this method is `TemporalAccessor` which represents the
data as seen in the input. Values are not validated, thus parsing a date string
of '2012-00-65' would result in a temporal with three fields - year of '2012',
month of '0' and day-of-month of '65'.

The text will be parsed from the specified start `ParsePosition`.
The entire length of the text does not have to be parsed, the `ParsePosition`
will be updated with the index at the end of parsing.

Errors are returned using the error index field of the `ParsePosition`
instead of `DateTimeParseException`.
The returned error index will be set to an index indicative of the error.
Callers must check for errors before using the result.

If the formatter parses the same field more than once with different values,
the result will be an error.

This method is intended for advanced use cases that need access to the
internal state during parsing. Typical application code should use
TemporalQuery) or the parse method on the target type.

Parameters:

- `text`: the text to parse, not null
- `position`: the position to parse from, updated with length parsed and the index of any error, not null

**Returns:** the parsed text, null if the parse results in an error

Throws:

- `DateTimeException`: if some problem occurs during parsing
- `IndexOutOfBoundsException`: if the position is invalid

## DateTimeFormatter.toFormat()

```java
public Format toFormat()
```

Returns this formatter as a `java.text.Format` instance.

The returned `Format` instance will format any `TemporalAccessor`
and parses to a resolved `TemporalAccessor`.

Exceptions will follow the definitions of `Format`, see those methods
for details about `IllegalArgumentException` during formatting and
`ParseException` or null during parsing.
The format does not support attributing of the returned format string.

**Returns:** this formatter as a classic format instance, not null

## DateTimeFormatter.toFormat(TemporalQuery<?>)

```java
public Format toFormat(TemporalQuery<?> parseQuery)
```

Returns this formatter as a `java.text.Format` instance that will
parse using the specified query.

The returned `Format` instance will format any `TemporalAccessor`
and parses to the type specified.
The type must be one that is supported by `parse`.

Exceptions will follow the definitions of `Format`, see those methods
for details about `IllegalArgumentException` during formatting and
`ParseException` or null during parsing.
The format does not support attributing of the returned format string.

Parameters:

- `parseQuery`: the query defining the type to parse to, not null

**Returns:** this formatter as a classic format instance, not null

## DateTimeFormatter.toString()

```java
public String toString()
```

Returns a description of the underlying formatters.

**Returns:** a description of this formatter, not null

## DateTimeFormatter.ClassicFormat(DateTimeFormatter, TemporalQuery<?>)

```java
public ClassicFormat(DateTimeFormatter formatter, TemporalQuery<?> parseType)
```

Constructor.
