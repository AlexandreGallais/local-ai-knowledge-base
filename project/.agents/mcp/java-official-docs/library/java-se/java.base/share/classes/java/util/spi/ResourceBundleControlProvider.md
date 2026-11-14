---
title: "ResourceBundleControlProvider interface (java.util.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/spi/ResourceBundleControlProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ResourceBundleControlProvider interface (java.util.spi)

```java
public interface ResourceBundleControlProvider
```

An interface for service providers that provide implementations of `java.util.ResourceBundle.Control`. The default resource bundle loading
behavior of the `ResourceBundle.getBundle` factory methods that take
no `java.util.ResourceBundle.Control` instance can be modified with `ResourceBundleControlProvider` implementations.

Provider implementations are loaded from the application's class path
using `java.util.ServiceLoader` at the first invocation of the
`ResourceBundle.getBundle` factory method that takes no
`java.util.ResourceBundle.Control` instance.

All `ResourceBundleControlProvider`s are ignored in named modules.

**Since:** 1.8

**See also:** ResourceBundle#getBundle(String, java.util.Locale, ClassLoader, ResourceBundle.Control)
     ResourceBundle.getBundle

**See also:** java.util.ServiceLoader#load(Class)

## ResourceBundleControlProvider.getControl(String)

```java
public ResourceBundle.Control getControl(String baseName)
```

Returns a `ResourceBundle.Control` instance that is used
to handle resource bundle loading for the given `baseName`. This method must return `null` if the given
`baseName` isn't handled by this provider.

Parameters:

- `baseName`: the base name of the resource bundle

**Returns:** a `ResourceBundle.Control` instance,
        or `null` if the given `baseName` is not
        applicable to this provider.

Throws:

- `NullPointerException`: if `baseName` is `null`
