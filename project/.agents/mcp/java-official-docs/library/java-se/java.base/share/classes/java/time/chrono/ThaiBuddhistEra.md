# ThaiBuddhistEra enum (java.time.chrono)

```java
public enum ThaiBuddhistEra implements Era
```

An era in the Thai Buddhist calendar system.
<p>
The Thai Buddhist calendar system has two eras.
The current era, for years from 1 onwards, is known as the 'Buddhist' era.
All previous years, zero or earlier in the proleptic count or one and greater
in the year-of-era count, are part of the 'Before Buddhist' era.

<table class="striped" style="text-align:left">
<caption style="display:none">Buddhist years and eras</caption>
<thead>
<tr>
<th scope="col">year-of-era</th>
<th scope="col">era</th>
<th scope="col">proleptic-year</th>
<th scope="col">ISO proleptic-year</th>
</tr>
</thead>
<tbody>
<tr>
<td>2</td><td>BE</td><th scope="row">2</th><td>-542</td>
</tr>
<tr>
<td>1</td><td>BE</td><th scope="row">1</th><td>-543</td>
</tr>
<tr>
<td>1</td><td>BEFORE_BE</td><th scope="row">0</th><td>-544</td>
</tr>
<tr>
<td>2</td><td>BEFORE_BE</td><th scope="row">-1</th><td>-545</td>
</tr>
</tbody>
</table>
<p>
<b>Do not use {@code ordinal()} to obtain the numeric representation of {@code ThaiBuddhistEra}.
Use {@code getValue()} instead.</b>

@implSpec
This is an immutable and thread-safe enum.

@since 1.8

## ThaiBuddhistEra.of(int)

```java
public static ThaiBuddhistEra of(int thaiBuddhistEra)
```

Obtains an instance of {@code ThaiBuddhistEra} from an {@code int} value.
<p>
{@code ThaiBuddhistEra} is an enum representing the Thai Buddhist eras of BEFORE_BE/BE.
This factory allows the enum to be obtained from the {@code int} value.

@param thaiBuddhistEra  the era to represent, from 0 to 1
@return the BuddhistEra singleton, never null
@throws DateTimeException if the era is invalid

## ThaiBuddhistEra.getValue()

```java
public int getValue()
```

Gets the numeric era {@code int} value.
<p>
The era BEFORE_BE has the value 0, while the era BE has the value 1.

@return the era value, from 0 (BEFORE_BE) to 1 (BE)

## ThaiBuddhistEra.getDisplayName(TextStyle, Locale)

```java
public String getDisplayName(TextStyle style, Locale locale)
```

{@inheritDoc}

@param style {@inheritDoc}
@param locale {@inheritDoc}