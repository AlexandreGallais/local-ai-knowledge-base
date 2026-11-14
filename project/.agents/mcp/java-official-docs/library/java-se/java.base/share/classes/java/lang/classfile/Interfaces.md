# Interfaces interface (java.lang.classfile)

```java
public sealed interface Interfaces extends ClassElement permits InterfacesImpl
```

Models the interfaces (JVMS {@jvms 4.1}) of a class.  An {@code Interfaces}
appears at most once in a {@link ClassModel}: if it does not appear, the
class has no interfaces, which is equivalent to an {@code Interfaces} whose
{@link #interfaces()} returns an empty list.  A {@link ClassBuilder} sets
the interfaces to an empty list if the interfaces is not supplied.

@see ClassModel#interfaces()
@see ClassBuilder#withInterfaces
@jvms 4.1 The {@code ClassFile} Structure
@since 24

## Interfaces.interfaces()

```java
List<ClassEntry> interfaces()
```

{@return the interfaces of this class, may be empty}

## Interfaces.of(List<ClassEntry>)

```java
static Interfaces of(List<ClassEntry> interfaces)
```

{@return an {@linkplain Interfaces} element}
@param interfaces the interfaces

## Interfaces.of(ClassEntry...)

```java
static Interfaces of(ClassEntry... interfaces)
```

{@return an {@linkplain Interfaces} element}
@param interfaces the interfaces

## Interfaces.ofSymbols(List<ClassDesc>)

```java
static Interfaces ofSymbols(List<ClassDesc> interfaces)
```

{@return an {@linkplain Interfaces} element}
@param interfaces the interfaces
@throws IllegalArgumentException if any of {@code interfaces} is primitive

## Interfaces.ofSymbols(ClassDesc...)

```java
static Interfaces ofSymbols(ClassDesc... interfaces)
```

{@return an {@linkplain Interfaces} element}
@param interfaces the interfaces
@throws IllegalArgumentException if any of {@code interfaces} is primitive