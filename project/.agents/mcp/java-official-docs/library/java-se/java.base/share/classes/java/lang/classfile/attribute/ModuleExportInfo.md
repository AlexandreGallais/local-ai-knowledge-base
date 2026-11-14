# ModuleExportInfo interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleExportInfo permits UnboundAttribute.UnboundModuleExportInfo
```

Models a single "exports" declaration in the {@link ModuleAttribute}.

@see ModuleAttribute#exports()
@see ModuleDescriptor.Exports
@jvms 4.7.25 The {@code Module} Attribute
@since 24

## ModuleExportInfo.exportedPackage()

```java
PackageEntry exportedPackage()
```

{@return the exported package}

@see ModuleDescriptor.Exports#source()

## ModuleExportInfo.exportsFlagsMask()

```java
int exportsFlagsMask()
```

{@return the flags associated with this export declaration, as a bit mask}
It is in the range of unsigned short, {@code [0, 0xFFFF]}.

@see ModuleDescriptor.Exports#modifiers()
@see AccessFlag.Location#MODULE_EXPORTS

## ModuleExportInfo.exportsFlags()

```java
default Set<AccessFlag> exportsFlags()
```

{@return the flags associated with this export declaration, as a set of
flag enums}

@throws IllegalArgumentException if the flags mask has any undefined bit set
@see ModuleDescriptor.Exports#accessFlags()
@see AccessFlag.Location#MODULE_EXPORTS

## ModuleExportInfo.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

{@return whether the export declaration has the specified access flag set}

@param flag the access flag
@see AccessFlag.Location#MODULE_EXPORTS

## ModuleExportInfo.exportsTo()

```java
List<ModuleEntry> exportsTo()
```

{@return the list of modules to which this package is exported, or empty
if this is an unqualified export}

@see ModuleDescriptor.Exports#isQualified()
@see ModuleDescriptor.Exports#targets()

## ModuleExportInfo.of(PackageEntry, int, List<ModuleEntry>)

```java
static ModuleExportInfo of(PackageEntry exports, int exportFlags, List<ModuleEntry> exportsTo)
```

{@return a module export description}

@param exports the exported package
@param exportFlags the export flags, as a bitmask
@param exportsTo the modules to which this package is exported, or empty
       if this is an unqualified export

## ModuleExportInfo.of(PackageEntry, Collection<AccessFlag>, List<ModuleEntry>)

```java
static ModuleExportInfo of(PackageEntry exports, Collection<AccessFlag> exportFlags, List<ModuleEntry> exportsTo)
```

{@return a module export description}

@param exports the exported package
@param exportFlags the export flags
@param exportsTo the modules to which this package is exported, or empty
       if this is an unqualified export
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_EXPORTS} location

## ModuleExportInfo.of(PackageEntry, int, ModuleEntry...)

```java
static ModuleExportInfo of(PackageEntry exports, int exportFlags, ModuleEntry... exportsTo)
```

{@return a module export description}

@param exports the exported package
@param exportFlags the export flags, as a bitmask
@param exportsTo the modules to which this package is exported, or empty
       if this is an unqualified export

## ModuleExportInfo.of(PackageEntry, Collection<AccessFlag>, ModuleEntry...)

```java
static ModuleExportInfo of(PackageEntry exports, Collection<AccessFlag> exportFlags, ModuleEntry... exportsTo)
```

{@return a module export description}

@param exports the exported package
@param exportFlags the export flags
@param exportsTo the modules to which this package is exported, or empty
       if this is an unqualified export
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_EXPORTS} location

## ModuleExportInfo.of(PackageDesc, int, List<ModuleDesc>)

```java
static ModuleExportInfo of(PackageDesc exports, int exportFlags, List<ModuleDesc> exportsTo)
```

{@return a module export description}

@param exports the exported package
@param exportFlags the export flags, as a bitmask
@param exportsTo the modules to which this package is exported, or empty
       if this is an unqualified export

## ModuleExportInfo.of(PackageDesc, Collection<AccessFlag>, List<ModuleDesc>)

```java
static ModuleExportInfo of(PackageDesc exports, Collection<AccessFlag> exportFlags, List<ModuleDesc> exportsTo)
```

{@return a module export description}

@param exports the exported package
@param exportFlags the export flags
@param exportsTo the modules to which this package is exported, or empty
       if this is an unqualified export
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_EXPORTS} location

## ModuleExportInfo.of(PackageDesc, int, ModuleDesc...)

```java
static ModuleExportInfo of(PackageDesc exports, int exportFlags, ModuleDesc... exportsTo)
```

{@return a module export description}

@param exports the exported package
@param exportFlags the export flags, as a bitmask
@param exportsTo the modules to which this package is exported, or empty
       if this is an unqualified export

## ModuleExportInfo.of(PackageDesc, Collection<AccessFlag>, ModuleDesc...)

```java
static ModuleExportInfo of(PackageDesc exports, Collection<AccessFlag> exportFlags, ModuleDesc... exportsTo)
```

{@return a module export description}

@param exports the exported package
@param exportFlags the export flags
@param exportsTo the modules to which this package is exported, or empty
       if this is an unqualified export
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_EXPORTS} location