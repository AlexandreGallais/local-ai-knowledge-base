---
title: "Executors class (java.util.concurrent) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/Executors.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Executors class (java.util.concurrent) (part 2 of 2)

## Executors.callable(PrivilegedAction<?>)

```java
public static Callable<Object> callable(final PrivilegedAction<?> action)
```

Returns a `Callable` object that, when
called, runs the given privileged action and returns its result.

Parameters:

- `action`: the privileged action to run

**Returns:** a callable object

Throws:

- `NullPointerException`: if action null

## Executors.callable(PrivilegedExceptionAction<?>)

```java
public static Callable<Object> callable(final PrivilegedExceptionAction<?> action)
```

Returns a `Callable` object that, when
called, runs the given privileged exception action and returns
its result.

Parameters:

- `action`: the privileged exception action to run

**Returns:** a callable object

Throws:

- `NullPointerException`: if action null

## Executors.privilegedCallable(Callable<T>)

```java
public static <T> Callable<T> privilegedCallable(Callable<T> callable)
```

Returns a `Callable` object that will, when called,
execute the given `callable` and return its result.

Parameters:

- `callable`: the underlying task
- `<T>`: the type of the callable's result

**Returns:** a callable object

**Deprecated:** This method originally returned a `Callable` object
      that when called, executed the given `callable` under the
      current access control context. Access control contexts were
      only useful in conjunction with
      the Security Manager, which is no
      longer supported. There is no replacement for the Security Manager
      or this method.

Throws:

- `NullPointerException`: if callable null

## Executors.privilegedCallableUsingCurrentClassLoader(Callable<T>)

```java
public static <T> Callable<T> privilegedCallableUsingCurrentClassLoader(Callable<T> callable)
```

Returns a `Callable` object that will, when called,
execute the given `callable` with the current context
class loader as the context class loader.

Parameters:

- `callable`: the underlying task
- `<T>`: the type of the callable's result

**Returns:** a callable object

**Deprecated:** This method originally returned a `Callable` object
      that when called, executed the given `callable` under the
      current access control context, with the current context class
      loader as the context class loader. Access control contexts were
      only useful in conjunction with
      the Security Manager, which is no
      longer supported. There is no replacement for the Security Manager
      or this method.

Throws:

- `NullPointerException`: if callable null
