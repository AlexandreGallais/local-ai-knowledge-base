---
title: "NumberFormat class (java.text) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/NumberFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NumberFormat class (java.text) (part 3 of 3)

## NumberFormat.setCurrency(Currency)

```java
public void setCurrency(Currency currency)
```

Sets the currency used by this number format when formatting
currency values. This does not update the minimum or maximum
number of fraction digits used by the number format.

Parameters:

- `currency`: the new currency to be used by this number format

**Implementation requirements:** The default implementation always throws `UnsupportedOperationException`. Subclasses should override this method
if currency formatting is desired.

**Since:** 1.4

Throws:

- `NullPointerException`: if `currency` is `null`
- `UnsupportedOperationException`: if the implementation of this method does not support this operation

## NumberFormat.getRoundingMode()

```java
public RoundingMode getRoundingMode()
```

Gets the `java.math.RoundingMode` used in this NumberFormat.

**Implementation requirements:** The default implementation always throws `UnsupportedOperationException`. Subclasses which handle different
rounding modes should override this method.

**Returns:** The `RoundingMode` used for this NumberFormat.

**See also:** #setRoundingMode(RoundingMode)

**Since:** 1.6

Throws:

- `UnsupportedOperationException`: if the implementation of this method does not support this operation

## NumberFormat.setRoundingMode(RoundingMode)

```java
public void setRoundingMode(RoundingMode roundingMode)
```

Sets the `java.math.RoundingMode` used in this NumberFormat.

Parameters:

- `roundingMode`: The `RoundingMode` to be used

**Implementation requirements:** The default implementation always throws `UnsupportedOperationException`. Subclasses which handle different
rounding modes should override this method.

**See also:** #getRoundingMode()

**Since:** 1.6

Throws:

- `NullPointerException`: if `roundingMode` is `null`
- `UnsupportedOperationException`: if the implementation of this method does not support this operation

## NumberFormat.Field(String)

```java
protected Field(String name)
```

Creates a Field instance with the specified
name.

Parameters:

- `name`: Name of the attribute

## NumberFormat.readResolve()

```java
protected Object readResolve() throws InvalidObjectException
```

Resolves instances being deserialized to the predefined constants.

**Returns:** resolved NumberFormat.Field constant

Throws:

- `InvalidObjectException`: if the constant could not be resolved.

## NumberFormat.INTEGER

```java
public static final Field INTEGER
```

Constant identifying the integer field.

## NumberFormat.FRACTION

```java
public static final Field FRACTION
```

Constant identifying the fraction field.

## NumberFormat.EXPONENT

```java
public static final Field EXPONENT
```

Constant identifying the exponent field.

## NumberFormat.DECIMAL_SEPARATOR

```java
public static final Field DECIMAL_SEPARATOR
```

Constant identifying the decimal separator field.

## NumberFormat.SIGN

```java
public static final Field SIGN
```

Constant identifying the sign field.

## NumberFormat.GROUPING_SEPARATOR

```java
public static final Field GROUPING_SEPARATOR
```

Constant identifying the grouping separator field.

## NumberFormat.EXPONENT_SYMBOL

```java
public static final Field EXPONENT_SYMBOL
```

Constant identifying the exponent symbol field.

## NumberFormat.PERCENT

```java
public static final Field PERCENT
```

Constant identifying the percent field.

## NumberFormat.PERMILLE

```java
public static final Field PERMILLE
```

Constant identifying the permille field.

## NumberFormat.CURRENCY

```java
public static final Field CURRENCY
```

Constant identifying the currency field.

## NumberFormat.EXPONENT_SIGN

```java
public static final Field EXPONENT_SIGN
```

Constant identifying the exponent sign field.

## NumberFormat.PREFIX

```java
public static final Field PREFIX
```

Constant identifying the prefix field.

**Since:** 12

## NumberFormat.SUFFIX

```java
public static final Field SUFFIX
```

Constant identifying the suffix field.

**Since:** 12
