# AbstractConstantGroup class (java.lang.invoke)

```java
/*non-public*/ abstract class AbstractConstantGroup implements ConstantGroup
```

Utility class for implementing ConstantGroup.

## AbstractConstantGroup.size

```java
protected final int size
```

The size of this constant group, set permanently by the constructor.

## AbstractConstantGroup.toString()

```java
public String toString()
```

Produce a string using the non-resolving list view,
where unresolved elements are presented as asterisks.
@return {@code this.asList("*").toString()}