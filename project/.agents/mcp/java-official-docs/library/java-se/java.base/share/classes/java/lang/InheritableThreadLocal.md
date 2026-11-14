---
title: "InheritableThreadLocal class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/InheritableThreadLocal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InheritableThreadLocal class (java.lang)

```java
public class InheritableThreadLocal<T> extends ThreadLocal<T>
```

This class extends `ThreadLocal` to provide inheritance of values
from parent thread to child thread: when a child thread is created, the
child receives initial values for all inheritable thread-local variables
for which the parent has values.  Normally the child's values will be
identical to the parent's; however, the child's value can be made an
arbitrary function of the parent's by overriding the `childValue`
method in this class.

Inheritable thread-local variables are used in preference to
ordinary thread-local variables when the per-thread-attribute being
maintained in the variable (e.g., User ID, Transaction ID) must be
automatically transmitted to any child threads that are created.

Note: During the creation of a new thread, it is
possible to *opt out* of receiving initial values for inheritable
thread-local variables.

Parameters:

- `<T>`: the type of the inheritable thread local's value

**See also:** ThreadLocal

**Since:** 1.2

**See also:** Thread.Builder#inheritInheritableThreadLocals(boolean)

## InheritableThreadLocal.InheritableThreadLocal()

```java
public InheritableThreadLocal()
```

Creates an inheritable thread local variable.

## InheritableThreadLocal.childValue(T)

```java
protected T childValue(T parentValue)
```

Computes the child's initial value for this inheritable thread-local
variable as a function of the parent's value at the time the child
thread is created.  This method is called from within the parent
thread before the child is started.

This method merely returns its input argument, and should be overridden
if a different behavior is desired.

Parameters:

- `parentValue`: the parent thread's value

**Returns:** the child thread's initial value
