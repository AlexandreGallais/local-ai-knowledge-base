---
title: "Map interface (java.util) (part 5 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Map.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Map interface (java.util) (part 5 of 5)

## Map.(

```java
(
```

Returns an unmodifiable Map containing the entries
of the given Map. The given Map must not be null, and it must not contain any
null keys or values. If the given Map is subsequently modified, the returned
Map will not reflect such modifications.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `map`: a `Map` from which entries are drawn, must be non-null

**Implementation note:** If the given Map is an unmodifiable Map,
calling copyOf will generally not create a copy.

**Returns:** a `Map` containing the entries of the given `Map`

**Since:** 10

Throws:

- `NullPointerException`: if map is null, or if it contains any null keys or values
