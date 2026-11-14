# ModuleReference class (java.lang.module)

```java
public abstract class ModuleReference
```

A reference to a module's content.

<p> A module reference is a concrete implementation of this class that
implements the abstract methods defined by this class. It contains the
module's descriptor and its location, if known.  It also has the ability to
create a {@link ModuleReader} in order to access the module's content, which
may be inside the Java run-time system itself or in an artifact such as a
modular JAR file.

@see ModuleFinder
@see ModuleReader
@since 9

## ModuleReference.ModuleReference(ModuleDescriptor, URI)

```java
protected ModuleReference(ModuleDescriptor descriptor, URI location)
```

Constructs a new instance of this class.

@param descriptor
       The module descriptor
@param location
       The module location or {@code null} if not known

## ModuleReference.descriptor()

```java
public final ModuleDescriptor descriptor()
```

Returns the module descriptor.

@return The module descriptor

## ModuleReference.location()

```java
public final Optional<URI> location()
```

Returns the location of this module's content, if known.

@return The location or an empty {@code Optional} if not known

## ModuleReference.open()

```java
public abstract ModuleReader open() throws IOException
```

Opens the module content for reading.

@return A {@code ModuleReader} to read the module

@throws IOException
        If an I/O error occurs