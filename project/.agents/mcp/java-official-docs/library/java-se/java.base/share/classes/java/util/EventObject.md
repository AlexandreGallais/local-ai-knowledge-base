---
title: "EventObject class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/EventObject.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EventObject class (java.util)

```java
public class EventObject implements java.io.Serializable
```

The root class from which all event state objects shall be derived.

All Events are constructed with a reference to the object, the "source",
that is logically deemed to be the object upon which the Event in question
initially occurred upon.

**Since:** 1.1

## EventObject.source

```java
protected transient Object source
```

The object on which the Event initially occurred.

## EventObject.EventObject(Object)

```java
public EventObject(Object source)
```

Constructs a prototypical Event.

Parameters:

- `source`: the object on which the Event initially occurred

Throws:

- `IllegalArgumentException`: if source is null

## EventObject.getSource()

```java
public Object getSource()
```

The object on which the Event initially occurred.

**Returns:** the object on which the Event initially occurred

## EventObject.toString()

```java
public String toString()
```

Returns a String representation of this EventObject.

**Returns:** a String representation of this EventObject
