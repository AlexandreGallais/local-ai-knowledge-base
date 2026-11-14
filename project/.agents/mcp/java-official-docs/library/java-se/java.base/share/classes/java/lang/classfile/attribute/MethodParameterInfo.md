# MethodParameterInfo interface (java.lang.classfile.attribute)

```java
public sealed interface MethodParameterInfo permits UnboundAttribute.UnboundMethodParameterInfo
```

Models a single method parameter in the {@link MethodParametersAttribute}.

@see MethodParametersAttribute#parameters()
@see Parameter
@jvms 4.7.24 The {@code MethodParameters} Attribute
@since 24

## MethodParameterInfo.name()

```java
Optional<Utf8Entry> name()
```

{@return the parameter name, if it has one}

@see Parameter#getName()
@see Parameter#isNamePresent()

## MethodParameterInfo.flagsMask()

```java
int flagsMask()
```

{@return the access flags, as a bit mask}  It is in the range of unsigned
short, {@code [0, 0xFFFF]}.

@see Parameter#getModifiers()
@see AccessFlag.Location#METHOD_PARAMETER

## MethodParameterInfo.flags()

```java
default Set<AccessFlag> flags()
```

{@return the access flags, as a set of flag enums}

@throws IllegalArgumentException if the flags mask has any undefined bit set
@see Parameter#accessFlags()
@see AccessFlag.Location#METHOD_PARAMETER

## MethodParameterInfo.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

{@return whether the method parameter has a specific flag set}
@param flag the method parameter flag
@see AccessFlag.Location#METHOD_PARAMETER

## MethodParameterInfo.of(Optional<Utf8Entry>, int)

```java
static MethodParameterInfo of(Optional<Utf8Entry> name, int flags)
```

{@return a method parameter description}
@param name the method parameter name, may be empty
@param flags the method parameter access flags

## MethodParameterInfo.of(Optional<String>, AccessFlag...)

```java
static MethodParameterInfo of(Optional<String> name, AccessFlag... flags)
```

{@return a method parameter description}
@param name the method parameter name, may be empty
@param flags the method parameter access flags
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#METHOD_PARAMETER} location

## MethodParameterInfo.ofParameter(Optional<String>, int)

```java
static MethodParameterInfo ofParameter(Optional<String> name, int flags)
```

{@return a method parameter description}
@param name the method parameter name, may be empty
@param flags the method parameter access flags