# ModuleRequireInfo interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleRequireInfo permits UnboundAttribute.UnboundModuleRequiresInfo
```

Models a single "requires" declaration in the {@link ModuleAttribute}.

@see ModuleAttribute#requires()
@see ModuleDescriptor#requires()
@jvms 4.7.25 The {@code Module} Attribute
@since 24

## ModuleRequireInfo.requires()

```java
ModuleEntry requires()
```

{@return The module on which the current module depends}

## ModuleRequireInfo.requiresFlagsMask()

```java
int requiresFlagsMask()
```

{@return the flags associated with this require declaration, as a bit mask}
It is in the range of unsigned short, {@code [0, 0xFFFF]}.

@see ModuleDescriptor.Requires#modifiers()
@see AccessFlag.Location#MODULE_REQUIRES

## ModuleRequireInfo.requiresFlags()

```java
default Set<AccessFlag> requiresFlags()
```

{@return the flags associated with this require declaration, as a set of
flag enums}

@throws IllegalArgumentException if the flags mask has any undefined bit set
@see ModuleDescriptor.Requires#accessFlags()
@see AccessFlag.Location#MODULE_REQUIRES

## ModuleRequireInfo.requiresVersion()

```java
Optional<Utf8Entry> requiresVersion()
```

{@return the required version of the required module, if present}

@see ModuleDescriptor.Requires#rawCompiledVersion()

## ModuleRequireInfo.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

{@return whether the specific access flag is set}

@param flag the access flag
@see AccessFlag.Location#MODULE_REQUIRES

## ModuleRequireInfo.of(ModuleEntry, int, Utf8Entry)

```java
static ModuleRequireInfo of(ModuleEntry requires, int requiresFlags, Utf8Entry requiresVersion)
```

{@return a module requirement description}

@param requires the required module
@param requiresFlags the require-specific flags
@param requiresVersion the required version, may be {@code null}

## ModuleRequireInfo.of(ModuleEntry, Collection<AccessFlag>, Utf8Entry)

```java
static ModuleRequireInfo of(ModuleEntry requires, Collection<AccessFlag> requiresFlags, Utf8Entry requiresVersion)
```

{@return a module requirement description}

@param requires the required module
@param requiresFlags the require-specific flags
@param requiresVersion the required version, may be {@code null}
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_REQUIRES} location

## ModuleRequireInfo.of(ModuleDesc, int, String)

```java
static ModuleRequireInfo of(ModuleDesc requires, int requiresFlags, String requiresVersion)
```

{@return a module requirement description}

@param requires the required module
@param requiresFlags the require-specific flags
@param requiresVersion the required version, may be {@code null}

## ModuleRequireInfo.of(ModuleDesc, Collection<AccessFlag>, String)

```java
static ModuleRequireInfo of(ModuleDesc requires, Collection<AccessFlag> requiresFlags, String requiresVersion)
```

{@return a module requirement description}

@param requires the required module
@param requiresFlags the require-specific flags
@param requiresVersion the required version, may be {@code null}
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_REQUIRES} location