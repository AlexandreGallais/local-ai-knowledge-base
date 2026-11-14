# LineNumberInfo interface (java.lang.classfile.attribute)

```java
public sealed interface LineNumberInfo permits UnboundAttribute.UnboundLineNumberInfo
```

Models a single line number entry in the {@link LineNumberTableAttribute}.

@see LineNumberTableAttribute#lineNumbers()
@see LineNumber
@since 24

## LineNumberInfo.startPc()

```java
int startPc()
```

{@return the index into the code array at which the code for this line
begins}

## LineNumberInfo.lineNumber()

```java
int lineNumber()
```

{@return the line number within the original source file}

## LineNumberInfo.of(int, int)

```java
public static LineNumberInfo of(int startPc, int lineNumber)
```

{@return a line number description}

@apiNote
The created entry cannot be written to a {@link CodeBuilder}.  Call
{@link CodeBuilder#lineNumber CodeBuilder::lineNumber} in the correct
order instead.

@param startPc the starting index of the code array for this line
@param lineNumber the line number within the original source file