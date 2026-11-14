# JapaneseEra class (java.time.chrono)

```java
public final class JapaneseEra implements Era, Serializable
```

An era in the Japanese Imperial calendar system.
<p>
The Japanese government defines the official name and start date of
each era. Eras are consecutive and their date ranges do not overlap,
so the end date of one era is always the day before the start date
of the next era.
<p>
The Java SE Platform supports all eras defined by the Japanese government,
beginning with the Meiji era. Each era is identified in the Platform by an
integer value and a name. The {@link #of(int)} and {@link #valueOf(String)}
methods may be used to obtain a singleton instance of {@code JapaneseEra}
for each era. The {@link #values()} method returns the singleton instances
of all supported eras.
<p>
For convenience, this class declares a number of public static final fields
that refer to singleton instances returned by the {@link #values()} method.

@apiNote
The fields declared in this class may evolve over time, in line with the
results of the {@link #values()} method. However, there is not necessarily
a 1:1 correspondence between the fields and the singleton instances.

@apiNote
The Japanese government may announce a new era and define its start
date but not its official name. In this scenario, the singleton instance
that represents the new era may return a name that is not stable until
the official name is defined. Developers should exercise caution when
relying on the name returned by any singleton instance that does not
correspond to a public static final field.

@implSpec
This class is immutable and thread-safe.

@since 1.8

## JapaneseEra.MEIJI

```java
public static final JapaneseEra MEIJI
```

The singleton instance for the 'Meiji' era (1868-01-01 - 1912-07-29)
which has the value -1.

## JapaneseEra.TAISHO

```java
public static final JapaneseEra TAISHO
```

The singleton instance for the 'Taisho' era (1912-07-30 - 1926-12-24)
which has the value 0.

## JapaneseEra.SHOWA

```java
public static final JapaneseEra SHOWA
```

The singleton instance for the 'Showa' era (1926-12-25 - 1989-01-07)
which has the value 1.

## JapaneseEra.HEISEI

```java
public static final JapaneseEra HEISEI
```

The singleton instance for the 'Heisei' era (1989-01-08 - 2019-04-30)
which has the value 2.

## JapaneseEra.REIWA

```java
public static final JapaneseEra REIWA
```

The singleton instance for the 'Reiwa' era (2019-05-01 - )
which has the value 3. The end date of this era is not specified, unless
the Japanese Government defines it.

@since 13

## JapaneseEra.of(int)

```java
public static JapaneseEra of(int japaneseEra)
```

Obtains an instance of {@code JapaneseEra} from an {@code int} value.
<ul>
<li>The value {@code 1} is associated with the 'Showa' era, because
it contains 1970-01-01 (ISO calendar system).</li>
<li>The values {@code -1} and {@code 0} are associated with two earlier
eras, Meiji and Taisho, respectively.</li>
<li>A value greater than {@code 1} is associated with a later era,
beginning with Heisei ({@code 2}).</li>
</ul>
<p>
Every instance of {@code JapaneseEra} that is returned from the {@link #values()}
method has an int value (available via {@link Era#getValue()} which is
accepted by this method.

@param japaneseEra  the era to represent
@return the {@code JapaneseEra} singleton, not null
@throws DateTimeException if the value is invalid

## JapaneseEra.valueOf(String)

```java
public static JapaneseEra valueOf(String japaneseEra)
```

Returns the {@code JapaneseEra} with the name.
<p>
The string must match exactly the name of the era.
(Extraneous whitespace characters are not permitted.)
<p>
Valid era names are the names of eras returned from {@link #values()}.

@param japaneseEra  the japaneseEra name; non-null
@return the {@code JapaneseEra} singleton, never null
@throws IllegalArgumentException if there is not JapaneseEra with the specified name

## JapaneseEra.values()

```java
public static JapaneseEra[] values()
```

Returns an array of JapaneseEras. The array may contain eras defined
by the Japanese government beyond the known era singletons.

<p>
This method may be used to iterate over the JapaneseEras as follows:
<pre>
for (JapaneseEra c : JapaneseEra.values())
    System.out.println(c);
</pre>

@return an array of JapaneseEras

## JapaneseEra.getDisplayName(TextStyle, Locale)

```java
public String getDisplayName(TextStyle style, Locale locale)
```

{@inheritDoc}

@param style {@inheritDoc}
@param locale {@inheritDoc}

## JapaneseEra.getValue()

```java
public int getValue()
```

Gets the numeric era {@code int} value.
<p>
The {@link #SHOWA} era that contains 1970-01-01 (ISO calendar system) has the value 1.
Later eras are numbered from 2 ({@link #HEISEI}).
Earlier eras are numbered 0 ({@link #TAISHO}), -1 ({@link #MEIJI})).

@return the era value

## JapaneseEra.range(TemporalField)

```java
public ValueRange range(TemporalField field)
```

Gets the range of valid values for the specified field.
<p>
The range object expresses the minimum and maximum valid values for a field.
This era is used to enhance the accuracy of the returned range.
If it is not possible to return the range, because the field is not supported
or for some other reason, an exception is thrown.
<p>
If the field is a {@link ChronoField} then the query is implemented here.
The {@code ERA} field returns the range.
All other {@code ChronoField} instances will throw an {@code UnsupportedTemporalTypeException}.
<p>
If the field is not a {@code ChronoField}, then the result of this method
is obtained by invoking {@code TemporalField.rangeRefinedBy(TemporalAccessor)}
passing {@code this} as the argument.
Whether the range can be obtained is determined by the field.
<p>
The range of valid Japanese eras can change over time due to the nature
of the Japanese calendar system.

@param field  the field to query the range for, not null
@return the range of valid values for the field, not null
@throws DateTimeException if the range for the field cannot be obtained
@throws UnsupportedTemporalTypeException if the unit is not supported