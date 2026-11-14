---
title: "JapaneseEra class (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/JapaneseEra.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# JapaneseEra class (java.time.chrono)

```java
public final class JapaneseEra implements Era, Serializable
```

An era in the Japanese Imperial calendar system.

The Japanese government defines the official name and start date of
each era. Eras are consecutive and their date ranges do not overlap,
so the end date of one era is always the day before the start date
of the next era.

The Java SE Platform supports all eras defined by the Japanese government,
beginning with the Meiji era. Each era is identified in the Platform by an
integer value and a name. The `of(int)` and `valueOf(String)`
methods may be used to obtain a singleton instance of `JapaneseEra`
for each era. The `values()` method returns the singleton instances
of all supported eras.

For convenience, this class declares a number of public static final fields
that refer to singleton instances returned by the `values()` method.

**API note:** The fields declared in this class may evolve over time, in line with the
results of the `values()` method. However, there is not necessarily
a 1:1 correspondence between the fields and the singleton instances.

**API note:** The Japanese government may announce a new era and define its start
date but not its official name. In this scenario, the singleton instance
that represents the new era may return a name that is not stable until
the official name is defined. Developers should exercise caution when
relying on the name returned by any singleton instance that does not
correspond to a public static final field.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## JapaneseEra.MEIJI

```java
public static final JapaneseEra MEIJI
```

The singleton instance for the 'Meiji' era (1868-01-01 - 1912-07-29)
which has the value -1.

## JapaneseEra.TAISHO

```java
public static final JapaneseEra TAISHO
```

The singleton instance for the 'Taisho' era (1912-07-30 - 1926-12-24)
which has the value 0.

## JapaneseEra.SHOWA

```java
public static final JapaneseEra SHOWA
```

The singleton instance for the 'Showa' era (1926-12-25 - 1989-01-07)
which has the value 1.

## JapaneseEra.HEISEI

```java
public static final JapaneseEra HEISEI
```

The singleton instance for the 'Heisei' era (1989-01-08 - 2019-04-30)
which has the value 2.

## JapaneseEra.REIWA

```java
public static final JapaneseEra REIWA
```

The singleton instance for the 'Reiwa' era (2019-05-01 - )
which has the value 3. The end date of this era is not specified, unless
the Japanese Government defines it.

**Since:** 13

## JapaneseEra.of(int)

```java
public static JapaneseEra of(int japaneseEra)
```

Obtains an instance of `JapaneseEra` from an `int` value.

- The value `1` is associated with the 'Showa' era, because
it contains 1970-01-01 (ISO calendar system).

- The values `-1` and `0` are associated with two earlier
eras, Meiji and Taisho, respectively.

- A value greater than `1` is associated with a later era,
beginning with Heisei (`2`).

Every instance of `JapaneseEra` that is returned from the `values()`
method has an int value (available via `Era.getValue()` which is
accepted by this method.

Parameters:

- `japaneseEra`: the era to represent

**Returns:** the `JapaneseEra` singleton, not null

Throws:

- `DateTimeException`: if the value is invalid

## JapaneseEra.valueOf(String)

```java
public static JapaneseEra valueOf(String japaneseEra)
```

Returns the `JapaneseEra` with the name.

The string must match exactly the name of the era.
(Extraneous whitespace characters are not permitted.)

Valid era names are the names of eras returned from `values()`.

Parameters:

- `japaneseEra`: the japaneseEra name; non-null

**Returns:** the `JapaneseEra` singleton, never null

Throws:

- `IllegalArgumentException`: if there is not JapaneseEra with the specified name

## JapaneseEra.values()

```java
public static JapaneseEra[] values()
```

Returns an array of JapaneseEras. The array may contain eras defined
by the Japanese government beyond the known era singletons.

This method may be used to iterate over the JapaneseEras as follows:

```java
for (JapaneseEra c : JapaneseEra.values())
    System.out.println(c);
```

**Returns:** an array of JapaneseEras

## JapaneseEra.getDisplayName(TextStyle, Locale)

```java
public String getDisplayName(TextStyle style, Locale locale)
```

(inherited documentation)

Parameters:

- `style`: (inherited documentation)
- `locale`: (inherited documentation)

## JapaneseEra.getValue()

```java
public int getValue()
```

Gets the numeric era `int` value.

The `SHOWA` era that contains 1970-01-01 (ISO calendar system) has the value 1.
Later eras are numbered from 2 (`HEISEI`).
Earlier eras are numbered 0 (`TAISHO`), -1 (`MEIJI`)).

**Returns:** the era value

## JapaneseEra.range(TemporalField)

```java
public ValueRange range(TemporalField field)
```

Gets the range of valid values for the specified field.

The range object expresses the minimum and maximum valid values for a field.
This era is used to enhance the accuracy of the returned range.
If it is not possible to return the range, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The `ERA` field returns the range.
All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.rangeRefinedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the range can be obtained is determined by the field.

The range of valid Japanese eras can change over time due to the nature
of the Japanese calendar system.

Parameters:

- `field`: the field to query the range for, not null

**Returns:** the range of valid values for the field, not null

Throws:

- `DateTimeException`: if the range for the field cannot be obtained
- `UnsupportedTemporalTypeException`: if the unit is not supported
