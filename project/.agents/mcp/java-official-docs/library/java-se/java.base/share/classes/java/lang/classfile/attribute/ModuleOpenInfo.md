# ModuleOpenInfo interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleOpenInfo permits UnboundAttribute.UnboundModuleOpenInfo
```

Models a single "opens" declaration in the {@link ModuleAttribute}.

@apiNote
Opening a package to another module allows that other module to gain
the same full privilege access as members in this module.  See {@link
MethodHandles#privateLookupIn} for more details.

@see ModuleAttribute#exports()
@see ModuleDescriptor.Opens
@jvms 4.7.25 The {@code Module} Attribute
@since 24

## ModuleOpenInfo.openedPackage()

```java
PackageEntry openedPackage()
```

{@return the package being opened}

@see ModuleDescriptor.Opens#source()

## ModuleOpenInfo.opensFlagsMask()

```java
int opensFlagsMask()
```

{@return the flags associated with this open declaration, as a bit mask}
It is in the range of unsigned short, {@code [0, 0xFFFF]}.

@see ModuleDescriptor.Opens#modifiers()
@see AccessFlag.Location#MODULE_OPENS

## ModuleOpenInfo.opensFlags()

```java
default Set<AccessFlag> opensFlags()
```

{@return the flags associated with this open declaration, as a set of
flag enums}

@throws IllegalArgumentException if the flags mask has any undefined bit set
@see ModuleDescriptor.Opens#accessFlags()
@see AccessFlag.Location#MODULE_OPENS

## ModuleOpenInfo.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

{@return whether the open declaration has the specified access flag set}

@param flag the access flag
@see AccessFlag.Location#MODULE_OPENS

## ModuleOpenInfo.opensTo()

```java
List<ModuleEntry> opensTo()
```

{@return the modules to which this package is opened, or empty if this
is an unqualified open}

@see ModuleDescriptor.Opens#isQualified()
@see ModuleDescriptor.Opens#targets()

## ModuleOpenInfo.of(PackageEntry, int, List<ModuleEntry>)

```java
static ModuleOpenInfo of(PackageEntry opens, int opensFlags, List<ModuleEntry> opensTo)
```

{@return a module open description}

@param opens the package to open
@param opensFlags the open flags
@param opensTo the modules to which this package is opened, or empty if
              this is an unqualified open

## ModuleOpenInfo.of(PackageEntry, Collection<AccessFlag>, List<ModuleEntry>)

```java
static ModuleOpenInfo of(PackageEntry opens, Collection<AccessFlag> opensFlags, List<ModuleEntry> opensTo)
```

{@return a module open description}

@param opens the package to open
@param opensFlags the open flags
@param opensTo the modules to which this package is opened, or empty if
              this is an unqualified open
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_OPENS} location

## ModuleOpenInfo.of(PackageEntry, int, ModuleEntry...)

```java
static ModuleOpenInfo of(PackageEntry opens, int opensFlags, ModuleEntry... opensTo)
```

{@return a module open description}

@param opens the package to open
@param opensFlags the open flags
@param opensTo the modules to which this package is opened, or empty if
              this is an unqualified open

## ModuleOpenInfo.of(PackageEntry, Collection<AccessFlag>, ModuleEntry...)

```java
static ModuleOpenInfo of(PackageEntry opens, Collection<AccessFlag> opensFlags, ModuleEntry... opensTo)
```

{@return a module open description}

@param opens the package to open
@param opensFlags the open flags
@param opensTo the modules to which this package is opened, or empty if
              this is an unqualified open
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_OPENS} location

## ModuleOpenInfo.of(PackageDesc, int, List<ModuleDesc>)

```java
static ModuleOpenInfo of(PackageDesc opens, int opensFlags, List<ModuleDesc> opensTo)
```

{@return a module open description}
@param opens the package to open
@param opensFlags the open flags
@param opensTo the modules to which this package is opened, if it is a
               qualified open, or empty

## ModuleOpenInfo.of(PackageDesc, Collection<AccessFlag>, List<ModuleDesc>)

```java
static ModuleOpenInfo of(PackageDesc opens, Collection<AccessFlag> opensFlags, List<ModuleDesc> opensTo)
```

{@return a module open description}
@param opens the package to open
@param opensFlags the open flags
@param opensTo the modules to which this package is opened, if it is a
              qualified open, or empty
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_OPENS} location

## ModuleOpenInfo.of(PackageDesc, int, ModuleDesc...)

```java
static ModuleOpenInfo of(PackageDesc opens, int opensFlags, ModuleDesc... opensTo)
```

{@return a module open description}
@param opens the package to open
@param opensFlags the open flags
@param opensTo the packages to which this package is opened, or empty if
              this is an unqualified open

## ModuleOpenInfo.of(PackageDesc, Collection<AccessFlag>, ModuleDesc...)

```java
static ModuleOpenInfo of(PackageDesc opens, Collection<AccessFlag> opensFlags, ModuleDesc... opensTo)
```

{@return a module open description}
@param opens the package to open
@param opensFlags the open flags
@param opensTo the packages to which this package is opened, or empty if
              this is an unqualified open
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_OPENS} location