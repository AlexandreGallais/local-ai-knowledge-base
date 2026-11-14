---
title: "TimeZone class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/TimeZone.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TimeZone class (java.util) (part 2 of 2)

## TimeZone.getAvailableIDs(int)

```java
public static String[] getAvailableIDs(int rawOffset)
```

Gets the available IDs according to the given time zone offset in milliseconds.

Parameters:

- `rawOffset`: the given time zone GMT offset in milliseconds.

**API note:** Consider using `availableIDs(int)` which returns
a stream of the available time zone IDs according to the given offset.

**Returns:** an array of IDs, where the time zone for that ID has
the specified GMT offset. For example, "America/Phoenix" and "America/Denver"
both have GMT-07:00, but differ in daylight saving behavior.

**See also:** #getRawOffset()

**See also:** #availableIDs(int)

## TimeZone.getAvailableIDs()

```java
public static String[] getAvailableIDs()
```

**API note:** Consider using `availableIDs()` which returns
a stream of the available time zone IDs.

**See also:** #availableIDs()

## TimeZone.availableIDs(int)

```java
public static Stream<String> availableIDs(int rawOffset)
```

Gets the available IDs according to the given time zone offset in milliseconds.

Parameters:

- `rawOffset`: the given time zone GMT offset in milliseconds.

**Implementation note:** Unlike `getAvailableIDs(int)`, this method does
not create a copy of the `TimeZone` IDs array.

**Returns:** a stream of IDs, where the time zone for that ID has
the specified GMT offset. For example, "America/Phoenix" and "America/Denver"
both have GMT-07:00, but differ in daylight saving behavior.

**See also:** #getRawOffset()

**See also:** #getAvailableIDs(int)

**Since:** 25

## TimeZone.availableIDs()

```java
public static Stream<String> availableIDs()
```

**Implementation note:** Unlike `getAvailableIDs()`, this method does
not create a copy of the `TimeZone` IDs array.

**Since:** 25

**See also:** #getAvailableIDs()

## TimeZone.getDefault()

```java
public static TimeZone getDefault()
```

Gets the default `TimeZone` of the Java virtual machine. If the
cached default `TimeZone` is available, its clone is returned.
Otherwise, the method takes the following steps to determine the default
time zone.

- Use the `user.timezone` property value as the default
time zone ID if it's available.

- Detect the platform time zone ID. The source of the
platform time zone and ID mapping may vary with implementation.

- Use `GMT` as the last resort if the given or detected
time zone ID is unknown.

The default `TimeZone` created from the ID is cached,
and its clone is returned. The `user.timezone` property
value is set to the ID upon return.

**Returns:** the default `TimeZone`

**See also:** #setDefault(TimeZone)

## TimeZone.setDefault(TimeZone)

```java
public static void setDefault(TimeZone zone)
```

Sets the `TimeZone` that is returned by the `getDefault`
method. `zone` is cached. If `zone` is null, the cached
default `TimeZone` is cleared. This method doesn't change the value
of the `user.timezone` property.

Parameters:

- `zone`: the new default `TimeZone`, or null

**See also:** #getDefault

## TimeZone.hasSameRules(TimeZone)

```java
public boolean hasSameRules(TimeZone other)
```

Returns true if this zone has the same rule and offset as another zone.
That is, if this zone differs only in ID, if at all.  Returns false
if the other zone is null.

Parameters:

- `other`: the `TimeZone` object to be compared with

**Returns:** true if the other zone is not null and is the same as this one,
with the possible exception of the ID

**Since:** 1.2

## TimeZone.clone()

```java
public Object clone()
```

Creates a copy of this `TimeZone`.

**Returns:** a clone of this `TimeZone`
