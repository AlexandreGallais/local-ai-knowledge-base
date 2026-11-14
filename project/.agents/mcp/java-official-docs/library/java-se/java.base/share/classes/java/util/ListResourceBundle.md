# ListResourceBundle class (java.util)

```java
public abstract class ListResourceBundle extends ResourceBundle
```

{@code ListResourceBundle} is an abstract subclass of
{@code ResourceBundle} that manages resources for a locale
in a convenient and easy to use list. See {@code ResourceBundle} for
more information about resource bundles in general.

<P>
Subclasses must override {@code getContents} and provide an array,
where each item in the array is a pair of objects.
The first element of each pair is the key, which must be a
{@code String}, and the second element is the value associated with
that key.

<p>
The following <a id="sample">example</a> shows two members of a resource
bundle family with the base name "MyResources".
"MyResources" is the default member of the bundle family, and
"MyResources_fr" is the French member.
These members are based on {@code ListResourceBundle}
(a related {@linkplain PropertyResourceBundle##sample example} shows
how you can add a bundle to this family that's based on a properties file).
The keys in this example are of the form "s1" etc. The actual
keys are entirely up to your choice, so long as they are the same as
the keys you use in your program to retrieve the objects from the bundle.
Keys are case-sensitive.
{@snippet lang=java :

public class MyResources extends ListResourceBundle {
    protected Object[][] getContents() {
        return new Object[][] {
        // LOCALIZE THIS
            {"s1", "The disk \"{1}\" contains {0}."},  // MessageFormat pattern
            {"s2", "1"},                               // location of {0} in pattern
            {"s3", "My Disk"},                         // sample disk name
            {"s4", "no files"},                        // first ChoiceFormat choice
            {"s5", "one file"},                        // second ChoiceFormat choice
            {"s6", "{0,number} files"},                // third ChoiceFormat choice
            {"s7", "3 Mar 96"},                        // sample date
            {"s8", new Dimension(1,5)}                 // real object, not just string
        // END OF MATERIAL TO LOCALIZE
        };
    }
}

public class MyResources_fr extends ListResourceBundle {
    protected Object[][] getContents() {
        return new Object[][] {
        // LOCALIZE THIS
            {"s1", "Le disque \"{1}\" {0}."},          // MessageFormat pattern
            {"s2", "1"},                               // location of {0} in pattern
            {"s3", "Mon disque"},                      // sample disk name
            {"s4", "ne contient pas de fichiers"},     // first ChoiceFormat choice
            {"s5", "contient un fichier"},             // second ChoiceFormat choice
            {"s6", "contient {0,number} fichiers"},    // third ChoiceFormat choice
            {"s7", "3 mars 1996"},                     // sample date
            {"s8", new Dimension(1,3)}                 // real object, not just string
        // END OF MATERIAL TO LOCALIZE
        };
    }
}
}

<p>
The implementation of a {@code ListResourceBundle} subclass must be thread-safe
if it's simultaneously used by multiple threads. The default implementations
of the methods in this class are thread-safe.

@see ResourceBundle
@see PropertyResourceBundle
@since 1.1

## ListResourceBundle.ListResourceBundle()

```java
public ListResourceBundle()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## ListResourceBundle.getKeys()

```java
public Enumeration<String> getKeys()
```

Returns an {@code Enumeration} of the keys contained in
this {@code ResourceBundle} and its parent bundles.

@return an {@code Enumeration} of the keys contained in
        this {@code ResourceBundle} and its parent bundles.
@see #keySet()

## ListResourceBundle.handleKeySet()

```java
protected Set<String> handleKeySet()
```

Returns a {@code Set} of the keys contained
<em>only</em> in this {@code ResourceBundle}.

@return a {@code Set} of the keys contained only in this
        {@code ResourceBundle}
@since 1.6
@see #keySet()

## ListResourceBundle.getContents()

```java
protected abstract Object[][] getContents()
```

Returns an array in which each item is a pair of objects in an
{@code Object} array. The first element of each pair is
the key, which must be a {@code String}, and the second
element is the value associated with that key.  See the class
description for details.

@return an array of an {@code Object} array representing a
key-value pair.