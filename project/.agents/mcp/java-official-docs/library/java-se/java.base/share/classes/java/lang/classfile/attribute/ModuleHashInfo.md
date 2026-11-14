# ModuleHashInfo interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleHashInfo permits UnboundAttribute.UnboundModuleHashInfo
```

Models hash information for a single module in the {@link ModuleHashesAttribute}.

@see ModuleHashesAttribute#hashes()
@since 24

## ModuleHashInfo.moduleName()

```java
ModuleEntry moduleName()
```

{@return the name of the related module}

## ModuleHashInfo.hash()

```java
byte[] hash()
```

{@return the hash of the related module}

## ModuleHashInfo.of(ModuleEntry, byte[])

```java
static ModuleHashInfo of(ModuleEntry moduleName, byte[] hash)
```

{@return a module hash description}
@param moduleName the module name
@param hash the hash value

## ModuleHashInfo.of(ModuleDesc, byte[])

```java
static ModuleHashInfo of(ModuleDesc moduleDesc, byte[] hash)
```

{@return a module hash description}
@param moduleDesc the module name
@param hash the hash value