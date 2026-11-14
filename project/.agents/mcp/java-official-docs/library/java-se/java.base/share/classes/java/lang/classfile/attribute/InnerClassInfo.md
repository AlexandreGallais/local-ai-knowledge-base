# InnerClassInfo interface (java.lang.classfile.attribute)

```java
public sealed interface InnerClassInfo permits UnboundAttribute.UnboundInnerClassInfo
```

Models a single entry in the {@link InnerClassesAttribute}.

@see InnerClassesAttribute#classes()
@jvms 4.7.6 The {@code InnerClasses} Attribute
@since 24

## InnerClassInfo.innerClass()

```java
ClassEntry innerClass()
```

{@return the nested class described by this entry}

## InnerClassInfo.outerClass()

```java
Optional<ClassEntry> outerClass()
```

{@return the class or interface of which this class is a member, if it is
a member of a class or interface}  This may be empty if this class is
local or anonymous.

@see Class#getDeclaringClass()

## InnerClassInfo.innerName()

```java
Optional<Utf8Entry> innerName()
```

{@return the simple name of this class, or empty if this class is anonymous}

@see Class#getSimpleName()

## InnerClassInfo.flagsMask()

```java
int flagsMask()
```

{@return a bit mask of flags denoting access permissions and properties
of the inner class}  It is in the range of unsigned short, {@code [0,
0xFFFF]}.

@see Class#getModifiers()
@see AccessFlag.Location#INNER_CLASS

## InnerClassInfo.flags()

```java
default Set<AccessFlag> flags()
```

{@return a set of flag enums denoting access permissions and properties
of the nested class}

@throws IllegalArgumentException if the flags mask has any undefined bit set
@see Class#accessFlags()
@see AccessFlag.Location#INNER_CLASS

## InnerClassInfo.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

{@return whether a specific access flag is set}

@param flag the access flag
@see AccessFlag.Location#INNER_CLASS

## InnerClassInfo.of(ClassEntry, Optional<ClassEntry>, Optional<Utf8Entry>, int)

```java
static InnerClassInfo of(ClassEntry innerClass, Optional<ClassEntry> outerClass, Optional<Utf8Entry> innerName, int flags)
```

{@return a nested class description}
@param innerClass the nested class being described
@param outerClass the class that has the nested class as a member, if it exists
@param innerName the simple name of the nested class, if it is not anonymous
@param flags the inner class access flags

## InnerClassInfo.of(ClassDesc, Optional<ClassDesc>, Optional<String>, int)

```java
static InnerClassInfo of(ClassDesc innerClass, Optional<ClassDesc> outerClass, Optional<String> innerName, int flags)
```

{@return a nested class description}
@param innerClass the nested class being described
@param outerClass the class that has the nested class as a member, if it exists
@param innerName the simple name of the nested class, if it is not anonymous
@param flags the inner class access flags
@throws IllegalArgumentException if {@code innerClass} or {@code outerClass} represents a primitive type

## InnerClassInfo.of(ClassDesc, Optional<ClassDesc>, Optional<String>, AccessFlag...)

```java
static InnerClassInfo of(ClassDesc innerClass, Optional<ClassDesc> outerClass, Optional<String> innerName, AccessFlag... flags)
```

{@return a nested class description}
@param innerClass the nested class being described
@param outerClass the class that has the nested class as a member, if it exists
@param innerName the name of the nested class, if it is not anonymous
@param flags the inner class access flags
@throws IllegalArgumentException if {@code innerClass} or {@code outerClass}
        represents a primitive type, or if any flag cannot be applied to
        the {@link AccessFlag.Location#INNER_CLASS} location