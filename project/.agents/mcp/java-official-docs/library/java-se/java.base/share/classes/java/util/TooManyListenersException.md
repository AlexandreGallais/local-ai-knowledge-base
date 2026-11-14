---
title: "TooManyListenersException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/TooManyListenersException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TooManyListenersException class (java.util)

```java
public class TooManyListenersException extends Exception
```

The `TooManyListenersException` Exception is used as part of
the Java Event model to annotate and implement a unicast special case of
a multicast Event Source.

The presence of a "throws TooManyListenersException" clause on any given
concrete implementation of the normally multicast "void addXyzEventListener"
event listener registration pattern is used to annotate that interface as
implementing a unicast Listener special case, that is, that one and only
one Listener may be registered on the particular event listener source
concurrently.

**See also:** java.util.EventObject

**See also:** java.util.EventListener

**Since:** 1.1

## TooManyListenersException.TooManyListenersException()

```java
public TooManyListenersException()
```

Constructs a TooManyListenersException with no detail message.
A detail message is a String that describes this particular exception.

## TooManyListenersException.TooManyListenersException(String)

```java
public TooManyListenersException(String s)
```

Constructs a TooManyListenersException with the specified detail message.
A detail message is a String that describes this particular exception.

Parameters:

- `s`: the detail message
