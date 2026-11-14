---
title: "ClassHierarchyResolver interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassHierarchyResolver.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassHierarchyResolver interface (java.lang.classfile)

```java
public interface ClassHierarchyResolver
```

Provides class hierarchy information for stack maps generation and verification.
A class hierarchy resolver must be able to process all classes and interfaces
encountered during these workloads.

**See also:** ClassFile.ClassHierarchyResolverOption

**See also:** StackMapTableAttribute

**jvms:** 4.10.1.2 Verification Type System

**Since:** 24

## ClassHierarchyResolver.defaultResolver()

```java
static ClassHierarchyResolver defaultResolver()
```

This default instance cannot load classes from other class loaders, such
as the caller's class loader; it also loads the system classes if they
are not yet loaded, which makes it unsuitable for instrumentation.

## ClassHierarchyResolver.getClassInfo(ClassDesc)

```java
ClassHierarchyInfo getClassInfo(ClassDesc classDesc)
```

This method is called by the Class-File API to obtain the hierarchy
information of a class or interface; users should not call this method.
The symbolic descriptor passed by the Class-File API always represents
a class or interface.

Parameters:

- `classDesc`: descriptor of the class

Throws:

- `IllegalArgumentException`: if a class shouldn't be queried for hierarchy, such as when it is inaccessible

## ClassHierarchyResolver.ofClass(ClassDesc)

```java
static ClassHierarchyInfo ofClass(ClassDesc superClass)
```

Indicates that a class is a declared class, with the specific given super class.

Parameters:

- `superClass`: descriptor of the super class, may be `null`

**Returns:** the info indicating the super class

**See also:** Superclass

## ClassHierarchyResolver.ofInterface()

```java
static ClassHierarchyInfo ofInterface()
```

Indicates that a class is an interface.

**Returns:** the info indicating an interface

## ClassHierarchyResolver.orElse(ClassHierarchyResolver)

```java
default ClassHierarchyResolver orElse(ClassHierarchyResolver other)
```

Chains this `ClassHierarchyResolver` with another to be consulted
if this resolver does not know about the specified class.

Parameters:

- `other`: the other resolver

**Implementation requirements:** The default implementation returns resolver implemented to query `other` resolver in case this resolver returns `null`.

**Returns:** the chained resolver

## ClassHierarchyResolver.cached(Supplier<Map<ClassDesc, ClassHierarchyInfo>>)

```java
default ClassHierarchyResolver cached(Supplier<Map<ClassDesc, ClassHierarchyInfo>> cacheFactory)
```

The returned resolver will not update if
the query results from this resolver changed over time.  The thread
safety of the returned resolver depends on the thread safety of the map
returned by the `cacheFactory`.

Parameters:

- `cacheFactory`: the factory for the cache

**Implementation requirements:** The default implementation returns a resolver holding an instance of the
cache map provided by the `cacheFactory`.  It looks up in the cache
map, or if a class name has not yet been queried, queries this resolver
and caches the result, including a `null` that indicates unknown
class names.  The cache map may refuse `null` keys and values.

## ClassHierarchyResolver.cached()

```java
default ClassHierarchyResolver cached()
```

The returned resolver will not update if
the query results from this resolver changed over time.  The returned
resolver is not thread-safe.

**Implementation requirements:** The default implementation calls `cached(Supplier)` with
          `HashMap` supplier as `cacheFactory`.

## ClassHierarchyResolver.ofResourceParsing(Function<ClassDesc, InputStream>)

```java
static ClassHierarchyResolver ofResourceParsing(Function<ClassDesc, InputStream> classStreamResolver)
```

The
mapping function should return `null` if it cannot provide a
`class` file for a class name.  Any `IOException` from the
provided input stream is rethrown as an `UncheckedIOException`
in `getClassInfo(ClassDesc)`.

Parameters:

- `classStreamResolver`: maps class descriptors to `class` file input streams

## ClassHierarchyResolver.ofResourceParsing(ClassLoader)

```java
static ClassHierarchyResolver ofResourceParsing(ClassLoader loader)
```

Parameters:

- `loader`: the class loader, to find class files

## ClassHierarchyResolver.of(Collection<ClassDesc>, Map<ClassDesc, ClassDesc>)

```java
static ClassHierarchyResolver of(Collection<ClassDesc> interfaces, Map<ClassDesc, ClassDesc> classToSuperClass)
```

Parameters:

- `interfaces`: a collection of classes known to be interfaces
- `classToSuperClass`: a map from classes to their super classes

## ClassHierarchyResolver.ofClassLoading(ClassLoader)

```java
static ClassHierarchyResolver ofClassLoading(ClassLoader loader)
```

Parameters:

- `loader`: the class loader

## ClassHierarchyResolver.ofClassLoading(MethodHandles.Lookup)

```java
static ClassHierarchyResolver ofClassLoading(MethodHandles.Lookup lookup)
```

If the class resolved is inaccessible to the given
lookup, `getClassInfo(ClassDesc)` throws `IllegalArgumentException` instead of returning `null`.

Parameters:

- `lookup`: the lookup, must be able to access classes to resolve
