---
title: "ObjectInputFilter interface (java.io) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectInputFilter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectInputFilter interface (java.io) (part 2 of 2)

## ObjectInputFilter.depth()

```java
long depth()
```

The current depth.
The depth starts at `1` and increases for each nested object and
decrements when each nested object returns.

**Returns:** the current depth

## ObjectInputFilter.references()

```java
long references()
```

The current number of object references.

**Returns:** the non-negative current number of object references

## ObjectInputFilter.streamBytes()

```java
long streamBytes()
```

The current number of bytes consumed.

**Implementation requirements:** `streamBytes` is implementation specific
and may not be directly related to the object in the stream
that caused the callback.

**Returns:** the non-negative current number of bytes consumed

## ObjectInputFilter.REJECTED

```java
UNDECIDED, /** * The status is allowed. */ ALLOWED, /** * The status is rejected. */ REJECTED
```

The status is undecided, not allowed and not rejected.

## ObjectInputFilter.REJECTED

```java
ALLOWED, /** * The status is rejected. */ REJECTED
```

The status is allowed.

## ObjectInputFilter.REJECTED

```java
REJECTED
```

The status is rejected.

## ObjectInputFilter.getSerialFilter()

```java
public static ObjectInputFilter getSerialFilter()
```

Returns the static JVM-wide deserialization filter or `null` if not configured.

**Returns:** the static JVM-wide deserialization filter or `null` if not configured

Throws:

- `IllegalStateException`: if the initialization of the filter from the system property `jdk.serialFilter` or the security property `jdk.serialFilter` fails.

## ObjectInputFilter.setSerialFilter(ObjectInputFilter)

```java
public static void setSerialFilter(ObjectInputFilter filter)
```

Set the static JVM-wide filter if it has not already been configured or set.

Parameters:

- `filter`: the deserialization filter to set as the JVM-wide filter; not null

Throws:

- `IllegalStateException`: if the filter has already been set or the initialization of the filter from the system property `jdk.serialFilter` or the security property `jdk.serialFilter` fails.

## ObjectInputFilter.getSerialFilterFactory()

```java
public static BinaryOperator<ObjectInputFilter> getSerialFilterFactory()
```

Returns the JVM-wide deserialization filter factory.
If the filter factory has been set it is returned,
otherwise, a builtin deserialization filter factory is returned.
The filter factory provides a filter for every ObjectInputStream when invoked from
ObjectInputStream constructors
and when a stream-specific filter is set with
setObjectInputFilter.

**Implementation requirements:** The builtin deserialization filter factory provides the
static JVM-wide filter when invoked from
ObjectInputStream constructors.
When invoked to set the stream-specific filter the requested filter replaces the static JVM-wide filter,
unless it has already been set.
The builtin deserialization filter factory implements the behavior of earlier versions of
setting the initial filter in the `ObjectInputStream` constructor and
`ObjectInputStream.setObjectInputFilter`.

**Returns:** the JVM-wide deserialization filter factory; non-null

**Since:** 17

Throws:

- `IllegalStateException`: if the filter factory initialization is incomplete

## ObjectInputFilter.setSerialFilterFactory(BinaryOperator<ObjectInputFilter>)

```java
public static void setSerialFilterFactory(BinaryOperator<ObjectInputFilter> filterFactory)
```

Set the JVM-wide deserialization filter factory.
The filter factory can be configured exactly once with one of:
setting the `jdk.serialFilterFactory` property on the command line,
setting the `jdk.serialFilterFactory` property in the `java.security.Security`
file, or using this `setSerialFilterFactory` method.
The filter factory can be set only before any `ObjectInputStream` has been
created to avoid any inconsistency in which filter factory is being used.

The JVM-wide filter factory is invoked when an ObjectInputStream
is constructed and when the
stream-specific filter is set.
The parameters are the current filter and a requested filter and it
returns the filter to be used for the stream.
If the current filter is `non-null`, the filter factory must return a
`non-null` filter; this is to prevent unintentional disabling of filtering
after it has been enabled.
The factory determines the filter to be used for `ObjectInputStream` streams based
on its inputs, any other filters, context, or state that is available.
The factory may throw runtime exceptions to signal incorrect use or invalid parameters.
See the filter models for examples of composition and delegation.

Parameters:

- `filterFactory`: the deserialization filter factory to set as the JVM-wide filter factory; not null

**Since:** 17

Throws:

- `IllegalStateException`: if the builtin deserialization filter factory has already been replaced or any instance of `ObjectInputStream` has been created.

## ObjectInputFilter.createFilter(String)

```java
public static ObjectInputFilter createFilter(String pattern)
```

Returns an ObjectInputFilter from a string of patterns.

Patterns are separated by ";" (semicolon). Whitespace is significant and
is considered part of the pattern.
If a pattern includes an equals assignment, "`=`" it sets a limit.
If a limit appears more than once the last value is used.

- maxdepth=`value` - the maximum depth of a graph

- maxrefs=`value`  - the maximum number of internal references

- maxbytes=`value` - the maximum number of bytes in the input stream

- maxarray=`value` - the maximum array length allowed

Other patterns match or reject class or package name
as returned from Class.getName() and
if an optional module name is present
class.getModule().getName().
Note that for arrays the element type is used in the pattern,
not the array type.

- If the pattern starts with "!", the class is rejected if the remaining pattern is matched;
    otherwise the class is allowed if the pattern matches.

- If the pattern contains "/", the non-empty prefix up to the "/" is the module name;
    if the module name matches the module name of the class then
    the remaining pattern is matched with the class name.
    If there is no "/", the module name is not compared.

- If the pattern ends with ".**" it matches any class in the package and all subpackages.

- If the pattern ends with ".*" it matches any class in the package.

- If the pattern ends with "*", it matches any class with the pattern as a prefix.

- If the pattern is equal to the class name, it matches.

- Otherwise, the pattern is not matched.

The resulting filter performs the limit checks and then
tries to match the class, if any. If any of the limits are exceeded,
the filter returns Status.REJECTED.
If the class is an array type, the class to be matched is the element type.
Arrays of any number of dimensions are treated the same as the element type.
For example, a pattern of "`!example.Foo`",
rejects creation of any instance or array of `example.Foo`.
The first pattern that matches, working from left to right, determines
the Status.ALLOWED
or Status.REJECTED result.
If the limits are not exceeded and no pattern matches the class,
the result is Status.UNDECIDED.

Parameters:

- `pattern`: the pattern string to parse; not null

**Returns:** a filter to check a class being deserialized;
         `null` if no patterns

Throws:

- `IllegalArgumentException`: if the pattern string is illegal or malformed and cannot be parsed. In particular, if any of the following is true:
-  if a limit is missing the name or the name is not one of "maxdepth", "maxrefs", "maxbytes", or "maxarray"
-  if the value of the limit can not be parsed by Long.parseLong or is negative
-  if the pattern contains "/" and the module name is missing or the remaining pattern is empty
-  if the package is missing for ".*" and ".**"

## ObjectInputFilter.createFilter2(String)

```java
static ObjectInputFilter createFilter2(String pattern)
```

Returns an ObjectInputFilter from a string of patterns that
checks only the length for arrays, not the component type.

Parameters:

- `pattern`: the pattern string to parse; not null

**Returns:** a filter to check a class being deserialized;
         `null` if no patterns

## ObjectInputFilter.createFilter(String, boolean)

```java
static ObjectInputFilter createFilter(String pattern, boolean checkComponentType)
```

Returns an ObjectInputFilter from a string of patterns.

Parameters:

- `pattern`: the pattern string to parse
- `checkComponentType`: true if the filter should check the component type of arrays

**Returns:** a filter to check a class being deserialized;
         `null` if no patterns

Throws:

- `IllegalArgumentException`: if the parameter is malformed if the pattern is missing the name, the long value is not a number or is negative.

## ObjectInputFilter.checkInput(FilterInfo)

```java
public Status checkInput(FilterInfo filterInfo)
```

(inherited documentation)

## ObjectInputFilter.toString()

```java
public String toString()
```

## ObjectInputFilter.checkInput(FilterInfo)

```java
public ObjectInputFilter.Status checkInput(FilterInfo info)
```

Returns a filter that returns `ifTrueStatus` or the `ifFalseStatus`
based on the predicate of the `non-null` class and `UNDECIDED`
if the class is `null`.

Parameters:

- `info`: the FilterInfo

**Returns:** a filter that returns `ifTrueStatus` or the `ifFalseStatus`
         based on the predicate of the `non-null` class and `UNDECIDED`
         if the class is `null`

## ObjectInputFilter.toString()

```java
public String toString()
```

Return a String describing the filter, its predicate, and true and false status values.

**Returns:** a String describing the filter, its predicate, and true and false status values.

## ObjectInputFilter.checkInput(FilterInfo)

```java
public ObjectInputFilter.Status checkInput(FilterInfo info)
```

Returns REJECTED if either of the filters returns REJECTED,
otherwise, ALLOWED if either of the filters returns ALLOWED,
otherwise, returns `UNDECIDED`.

Parameters:

- `info`: the FilterInfo

**Returns:** REJECTED if either of the filters returns REJECTED,
         otherwise, ALLOWED if either of the filters returns ALLOWED,
         otherwise, returns `UNDECIDED`.

## ObjectInputFilter.checkInput(FilterInfo)

```java
public ObjectInputFilter.Status checkInput(FilterInfo info)
```

Apply the filter and return the status if not UNDECIDED and checking a class.
For array classes, re-check the final component type against the filter.
Make an exception for Primitive classes that are implicitly allowed by the pattern based filter.

Parameters:

- `info`: the FilterInfo

**Returns:** the status of applying the filter and checking the class

## ObjectInputFilter.apply(ObjectInputFilter, ObjectInputFilter)

```java
public ObjectInputFilter apply(ObjectInputFilter oldFilter, ObjectInputFilter newFilter)
```

Returns the `ObjectInputFilter` to be used for an ObjectInputStream.

When invoked from the
ObjectInputStream constructors,
the first parameter is `null` and the second parameter is the
static JVM-wide filter;
the value returned is `newFilter`, the static JVM-wide filter.

When invoked from
setObjectInputFilter
to set the stream-specific filter, the value is `newFilter` to replace the
previous filter.

Parameters:

- `oldFilter`: the current filter, may be null
- `newFilter`: a new filter, may be null

**Returns:** an ObjectInputFilter, the new Filter, may be null

## ObjectInputFilter.toString()

```java
public String toString()
```

Returns the class name of this builtin deserialization filter factory.

**Returns:** returns the class name of this builtin deserialization filter factory
