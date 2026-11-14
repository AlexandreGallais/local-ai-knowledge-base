# BoundMethodHandle class (java.lang.invoke)

```java
/*non-public*/ abstract non-sealed class BoundMethodHandle extends MethodHandle
```

The flavor of method handle which emulates an invoke instruction
on a predetermined argument.  The JVM dispatches to the correct method
when the handle is created, not when it is invoked.

All bound arguments are encapsulated in dedicated species.

## BoundMethodHandle.speciesData()

```java
/*non-public*/ abstract BoundMethodHandle.SpeciesData speciesData()
```

Return the {@link BoundMethodHandle.SpeciesData} instance representing this BMH species. All subclasses must provide a
static field containing this value, and they must accordingly implement this method.

## BoundMethodHandle.fieldCount()

```java
/*non-public*/ final int fieldCount()
```

Return the number of fields in this BMH.  Equivalent to speciesData().fieldCount().