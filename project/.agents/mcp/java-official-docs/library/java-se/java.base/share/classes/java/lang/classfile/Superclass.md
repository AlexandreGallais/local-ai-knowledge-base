# Superclass interface (java.lang.classfile)

```java
public sealed interface Superclass extends ClassElement permits SuperclassImpl
```

Models the superclass (JVMS {@jvms 4.1}) of a class.  A {@code Superclass}
appears at most once in a {@link ClassModel}: it must be absent for
{@linkplain ClassModel#isModuleInfo() module descriptors} or the {@link
Object} class, and must be present otherwise.  A {@link ClassBuilder} sets
the {@link Object} class as the superclass if the superclass is not supplied
and the class to build is required to have a superclass.
<p>
All {@linkplain ClassFile#ACC_INTERFACE interfaces} have {@link Object} as
their superclass.

@see ClassModel#superclass()
@see ClassBuilder#withSuperclass
@jvms 4.1 The {@code ClassFile} Structure
@since 24

## Superclass.superclassEntry()

```java
ClassEntry superclassEntry()
```

{@return the superclass}

## Superclass.of(ClassEntry)

```java
static Superclass of(ClassEntry superclassEntry)
```

{@return a {@linkplain Superclass} element}

@param superclassEntry the superclass