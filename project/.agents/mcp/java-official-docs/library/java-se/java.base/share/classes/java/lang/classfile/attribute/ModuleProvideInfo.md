# ModuleProvideInfo interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleProvideInfo permits UnboundAttribute.UnboundModuleProvideInfo
```

Models a single "provides" declaration in the {@link ModuleAttribute}.

@see ModuleAttribute#provides()
@see ModuleDescriptor.Provides
@jvms 4.7.25 The {@code Module} Attribute
@since 24

## ModuleProvideInfo.provides()

```java
ClassEntry provides()
```

{@return the service interface representing the provided service}

@see ModuleDescriptor.Provides#service()

## ModuleProvideInfo.providesWith()

```java
List<ClassEntry> providesWith()
```

{@return the classes providing the service implementation}  The list
should not be empty.

@see ModuleDescriptor.Provides#providers()

## ModuleProvideInfo.of(ClassEntry, List<ClassEntry>)

```java
static ModuleProvideInfo of(ClassEntry provides, List<ClassEntry> providesWith)
```

{@return a service provision description}
@param provides the service class interface
@param providesWith the service class implementations, must not be empty

## ModuleProvideInfo.of(ClassEntry, ClassEntry...)

```java
static ModuleProvideInfo of(ClassEntry provides, ClassEntry... providesWith)
```

{@return a service provision description}
@param provides the service class interface
@param providesWith the service class implementations, must not be empty

## ModuleProvideInfo.of(ClassDesc, List<ClassDesc>)

```java
static ModuleProvideInfo of(ClassDesc provides, List<ClassDesc> providesWith)
```

{@return a service provision description}
@param provides the service class interface
@param providesWith the service class implementations, must not be empty
@throws IllegalArgumentException if {@code provides} or any of {@code
        providesWith} represents a primitive type

## ModuleProvideInfo.of(ClassDesc, ClassDesc...)

```java
static ModuleProvideInfo of(ClassDesc provides, ClassDesc... providesWith)
```

{@return a service provision description}
@param provides the service class interface
@param providesWith the service class implementations, must not be empty
@throws IllegalArgumentException if {@code provides} or any of {@code
        providesWith} represents a primitive type