---
title: "BigDecimal class (java.math) (part 6 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/math/BigDecimal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BigDecimal class (java.math) (part 6 of 6)

## BigDecimal.ulp()

```java
public BigDecimal ulp()
```

Returns the size of an ulp, a unit in the last place, of this
`BigDecimal`.  An ulp of a nonzero `BigDecimal`
value is the positive distance between this value and the
`BigDecimal` value next larger in magnitude with the
same number of digits.  An ulp of a zero value is numerically
equal to 1 with the scale of `this`.  The result is
stored with the same scale as `this` so the result
for zero and nonzero values is equal to `[1, this.scale()]`.

**Returns:** the size of an ulp of `this`

**Since:** 1.5
