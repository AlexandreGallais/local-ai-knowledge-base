---
title: "CollatorProvider class (java.text.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/spi/CollatorProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CollatorProvider class (java.text.spi)

```java
public abstract class CollatorProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide concrete implementations of the
Collator class.

**Since:** 1.6

## CollatorProvider.CollatorProvider()

```java
protected CollatorProvider()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## CollatorProvider.getInstance(Locale)

```java
public abstract Collator getInstance(Locale locale)
```

Returns a new `Collator` instance for the specified locale.

Parameters:

- `locale`: the desired locale.

**Returns:** the `Collator` for the desired locale.

**See also:** java.text.Collator#getInstance(java.util.Locale)

Throws:

- `NullPointerException`: if `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().
