# LocalVariableTypeInfo interface (java.lang.classfile.attribute)

```java
public sealed interface LocalVariableTypeInfo permits UnboundAttribute.UnboundLocalVariableTypeInfo, BoundLocalVariableType
```

Models a single local variable in the {@link LocalVariableTypeTableAttribute}.

@see LocalVariableTypeTableAttribute#localVariableTypes()
@see LocalVariableType
@jvms 4.7.14 The {@code LocalVariableTypeTable} Attribute
@since 24

## LocalVariableTypeInfo.startPc()

```java
int startPc()
```

{@return the index into the code array, inclusive at which the scope of
this variable begins}

## LocalVariableTypeInfo.length()

```java
int length()
```

{@return the length of the region of the code array in which this
variable is in scope}

## LocalVariableTypeInfo.name()

```java
Utf8Entry name()
```

{@return the name of the local variable}

## LocalVariableTypeInfo.signature()

```java
Utf8Entry signature()
```

{@return the field signature string of the local variable}

## LocalVariableTypeInfo.slot()

```java
int slot()
```

{@return the index into the local variable array of the current frame
which holds this local variable}