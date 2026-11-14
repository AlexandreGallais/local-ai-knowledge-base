# LocalVariableInfo interface (java.lang.classfile.attribute)

```java
public sealed interface LocalVariableInfo permits UnboundAttribute.UnboundLocalVariableInfo, BoundLocalVariable
```

Models a single local variable in the {@link LocalVariableTableAttribute}.

@see LocalVariableTableAttribute#localVariables()
@see LocalVariable
@jvms 4.7.13 The {@code LocalVaribleTable} Attribute
@since 24

## LocalVariableInfo.startPc()

```java
int startPc()
```

{@return the index into the code array, inclusive, at which the scope of
this variable begins}

## LocalVariableInfo.length()

```java
int length()
```

{@return the length of the region of the code array in which this
variable is in scope}

## LocalVariableInfo.name()

```java
Utf8Entry name()
```

{@return the name of the local variable}

## LocalVariableInfo.type()

```java
Utf8Entry type()
```

{@return the field descriptor string of the local variable}

## LocalVariableInfo.typeSymbol()

```java
default ClassDesc typeSymbol()
```

{@return the field descriptor of the local variable}

## LocalVariableInfo.slot()

```java
int slot()
```

{@return the index into the local variable array of the current frame
which holds this local variable}