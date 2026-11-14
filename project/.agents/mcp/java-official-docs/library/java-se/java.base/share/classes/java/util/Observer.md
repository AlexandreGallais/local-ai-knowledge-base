---
title: "Observer interface (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Observer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Observer interface (java.util)

```java
public interface Observer
```

A class can implement the `Observer` interface when it
wants to be informed of changes in observable objects.

**See also:** java.util.Observable

**Since:** 1.0

**Deprecated:** This interface has been deprecated. See the `Observable`
class for further information.

## Observer.update(Observable, Object)

```java
void update(Observable o, Object arg)
```

This method is called whenever the observed object is changed. An
application calls an `Observable` object's
`notifyObservers` method to have all the object's
observers notified of the change.

Parameters:

- `o`: the observable object.
- `arg`: an argument passed to the `notifyObservers` method.
