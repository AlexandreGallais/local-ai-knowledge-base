# ClassHierarchyResolver interface (java.lang.classfile)

```java
public interface ClassHierarchyResolver
```

Provides class hierarchy information for {@linkplain StackMapsOption stack
maps generation} and {@linkplain ClassFile#verify(byte[]) verification}.
A class hierarchy resolver must be able to process all classes and interfaces
encountered during these workloads.

@see ClassFile.ClassHierarchyResolverOption
@see StackMapTableAttribute
@jvms 4.10.1.2 Verification Type System
@since 24

## ClassHierarchyResolver.defaultResolver()

```java
static ClassHierarchyResolver defaultResolver()
```

{@return the default instance of {@code ClassHierarchyResolver} that
gets {@link ClassHierarchyInfo} from system class loader with reflection}
This default instance cannot load classes from other class loaders, such
as the caller's class loader; it also loads the system classes if they
are not yet loaded, which makes it unsuitable for instrumentation.

## ClassHierarchyResolver.getClassInfo(ClassDesc)

```java
ClassHierarchyInfo getClassInfo(ClassDesc classDesc)
```

{@return the {@code ClassHierarchyInfo} for a given class name, or {@code
null} if the name is unknown to the resolver}
<p>
This method is called by the Class-File API to obtain the hierarchy
information of a class or interface; users should not call this method.
The symbolic descriptor passed by the Class-File API always represents
a class or interface.

@param classDesc descriptor of the class
@throws IllegalArgumentException if a class shouldn't be queried for
        hierarchy, such as when it is inaccessible

## ClassHierarchyResolver.ofClass(ClassDesc)

```java
static ClassHierarchyInfo ofClass(ClassDesc superClass)
```

Indicates that a class is a declared class, with the specific given super class.

@param superClass descriptor of the super class, may be {@code null}
@return the info indicating the super class
@see Superclass

## ClassHierarchyResolver.ofInterface()

```java
static ClassHierarchyInfo ofInterface()
```

Indicates that a class is an interface.

@return the info indicating an interface

## ClassHierarchyResolver.orElse(ClassHierarchyResolver)

```java
default ClassHierarchyResolver orElse(ClassHierarchyResolver other)
```

Chains this {@code ClassHierarchyResolver} with another to be consulted
if this resolver does not know about the specified class.

@implSpec
The default implementation returns resolver implemented to query {@code
other} resolver in case this resolver returns {@code null}.

@param other the other resolver
@return the chained resolver

## ClassHierarchyResolver.cached(Supplier<Map<ClassDesc, ClassHierarchyInfo>>)

```java
default ClassHierarchyResolver cached(Supplier<Map<ClassDesc, ClassHierarchyInfo>> cacheFactory)
```

{@return a {@code ClassHierarchyResolver} that caches class hierarchy
information from this resolver}  The returned resolver will not update if
the query results from this resolver changed over time.  The thread
safety of the returned resolver depends on the thread safety of the map
returned by the {@code cacheFactory}.

@implSpec
The default implementation returns a resolver holding an instance of the
cache map provided by the {@code cacheFactory}.  It looks up in the cache
map, or if a class name has not yet been queried, queries this resolver
and caches the result, including a {@code null} that indicates unknown
class names.  The cache map may refuse {@code null} keys and values.

@param cacheFactory the factory for the cache

## ClassHierarchyResolver.cached()

```java
default ClassHierarchyResolver cached()
```

{@return a {@code ClassHierarchyResolver} that caches class hierarchy
information from this resolver}  The returned resolver will not update if
the query results from this resolver changed over time.  The returned
resolver is not thread-safe.
{@snippet file="PackageSnippets.java" region="lookup-class-hierarchy-resolver"}

@implSpec The default implementation calls {@link #cached(Supplier)} with
          {@link HashMap} supplier as {@code cacheFactory}.

## ClassHierarchyResolver.ofResourceParsing(Function<ClassDesc, InputStream>)

```java
static ClassHierarchyResolver ofResourceParsing(Function<ClassDesc, InputStream> classStreamResolver)
```

{@return a {@code ClassHierarchyResolver} that extracts class hierarchy
information from {@code class} files returned by a mapping function}  The
mapping function should return {@code null} if it cannot provide a
{@code class} file for a class name.  Any {@link IOException} from the
provided input stream is rethrown as an {@link UncheckedIOException}
in {@link #getClassInfo(ClassDesc)}.

@param classStreamResolver maps class descriptors to {@code class} file input streams

## ClassHierarchyResolver.ofResourceParsing(ClassLoader)

```java
static ClassHierarchyResolver ofResourceParsing(ClassLoader loader)
```

{@return a {@code ClassHierarchyResolver} that extracts class hierarchy
information from {@code class} files located by a class loader}

@param loader the class loader, to find class files

## ClassHierarchyResolver.of(Collection<ClassDesc>, Map<ClassDesc, ClassDesc>)

```java
static ClassHierarchyResolver of(Collection<ClassDesc> interfaces, Map<ClassDesc, ClassDesc> classToSuperClass)
```

{@return a {@code ClassHierarchyResolver} that extracts class hierarchy
information from collections of class hierarchy metadata}

@param interfaces a collection of classes known to be interfaces
@param classToSuperClass a map from classes to their super classes

## ClassHierarchyResolver.ofClassLoading(ClassLoader)

```java
static ClassHierarchyResolver ofClassLoading(ClassLoader loader)
```

{@return a {@code ClassHierarchyResolver} that extracts class hierarchy
information via classes loaded by a class loader with reflection}

@param loader the class loader

## ClassHierarchyResolver.ofClassLoading(MethodHandles.Lookup)

```java
static ClassHierarchyResolver ofClassLoading(MethodHandles.Lookup lookup)
```

{@return a {@code ClassHierarchyResolver} that extracts class hierarchy
information via classes accessible to a {@link MethodHandles.Lookup}
with reflection} If the class resolved is inaccessible to the given
lookup, {@link #getClassInfo(ClassDesc)} throws {@link
IllegalArgumentException} instead of returning {@code null}.

@param lookup the lookup, must be able to access classes to resolve