---
title: "StringBuilder class (part 1 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder class

Namespace: `System.Text`

```csharp
public sealed class StringBuilder : System.Runtime.Serialization.ISerializable
```

Represents a mutable string of characters. This class cannot be inherited.

The `StringBuilder` class represents a string-like object whose value is a mutable sequence of characters.

#### StringBuilder versus String type

Although `StringBuilder` and `String` both represent sequences of characters, they are implemented differently. `String` is an immutable type. That is, each operation that appears to modify a `String` object actually creates a new string.

For example, the call to the `String.Concat` method in the following C# example appears to change the value of a string variable named `value`. In fact, the `String.Concat` method returns a `value` object that has a different value and address from the `value` object that was passed to the method. Note that the example must be compiled using the `/unsafe` compiler option.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/immutability2.cs._

For routines that perform extensive string manipulation (such as apps that modify a string numerous times in a loop), modifying a string repeatedly can exert a significant performance penalty. The alternative is to use `StringBuilder`, which is a mutable string class. Mutability means that once an instance of the class has been created, it can be modified by appending, removing, replacing, or inserting characters.

> **Important:**
> Although the `StringBuilder` class generally offers better performance than the `String` class, you should not automatically replace `String` with `StringBuilder` whenever you want to manipulate strings. Performance depends on the size of the string, the amount of memory to be allocated for the new string, the system on which your code is executing, and the type of operation. You should be prepared to test your code to determine whether `StringBuilder` actually offers a significant performance improvement.

Consider using the `String` class under these conditions:

- When the number of changes that your code will make to a string is small. In these cases, `StringBuilder` might offer negligible or no performance improvement over `String`.
- When you perform a fixed number of concatenation operations, particularly with string literals. In this case, the compiler might combine the concatenation operations into a single operation.
- When you have to perform extensive search operations while you are building your string. The `StringBuilder` class lacks search methods such as `IndexOf` or `StartsWith`. You'll have to convert the `StringBuilder` object to a `String` for these operations, and this can negate the performance benefit from using `StringBuilder`. For more information, see the Search the text in a StringBuilder object section.

Consider using the `StringBuilder` class under these conditions:

- When you expect your code to make an unknown number of changes to a string at design time (for example, when you use a loop to concatenate a random number of strings that contain user input).
- When you expect your code to make a significant number of changes to a string.

#### How StringBuilder works

The `Length` property indicates the number of characters the `StringBuilder` object currently contains. If you add characters to the `StringBuilder` object, its length increases until it equals the size of the `Capacity` property, which defines the number of characters that the object can contain. If the number of added characters causes the length of the `StringBuilder` object to exceed its current capacity, new memory is allocated, the value of the `Capacity` property is doubled, new characters are added to the `StringBuilder` object, and its `Length` property is adjusted. Additional memory for the `StringBuilder` object is allocated dynamically until it reaches the value defined by the `MaxCapacity` property. When the maximum capacity is reached, no further memory can be allocated for the `StringBuilder` object, and trying to add characters or expand it beyond its maximum capacity throws either an `ArgumentOutOfRangeException` or an `OutOfMemoryException` exception.

The following example illustrates how a `StringBuilder` object allocates new memory and increases its capacity dynamically as the string assigned to the object expands. The code creates a `StringBuilder` object by calling its default (parameterless) constructor. The default capacity of this object is 16 characters, and its maximum capacity is more than 2 billion characters. Appending the string "This is a sentence." results in a new memory allocation because the string length (19 characters) exceeds the default capacity of the `StringBuilder` object. The capacity of the object doubles to 32 characters, the new string is added, and the length of the object now equals 19 characters. The code then appends the string "This is an additional sentence." to the value of the `StringBuilder` object 11 times. Whenever the append operation causes the length of the `StringBuilder` object to exceed its capacity, its existing capacity is doubled and the `StringBuilder.Append` operation succeeds.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/default1.cs._

#### Memory allocation

The default capacity of a `StringBuilder` object is 16 characters, and its default maximum capacity is `MaxValue`. These default values are used if you call the `%23ctor` and `%23ctor` constructors.

You can explicitly define the initial capacity of a `StringBuilder` object in the following ways:

- By calling any of the `StringBuilder` constructors that includes a `capacity` parameter when you create the object.
- By explicitly assigning a new value to the `Capacity` property to expand an existing `StringBuilder` object. (The property throws an exception if the new capacity is less than the existing capacity or greater than the `StringBuilder` object's maximum capacity.)
- By calling the `StringBuilder.EnsureCapacity` method with the new capacity. The new capacity must not be greater than the `StringBuilder` object's maximum capacity. However, unlike an assignment to the `Capacity` property, `StringBuilder.EnsureCapacity` does not throw an exception if the desired new capacity is less than the existing capacity. In this case, the method call has no effect.

If the length of the string assigned to the `StringBuilder` object in the constructor call exceeds either the default capacity or the specified capacity, the `Capacity` property is set to the length of the string specified with the `value` parameter.

You can explicitly define the maximum capacity of a `StringBuilder` object by calling the `%23ctor` constructor. You can't change the maximum capacity by assigning a new value to the `MaxCapacity` property, because it is read-only.

As the previous section shows, whenever the existing capacity is inadequate, additional memory is allocated and the capacity of a `StringBuilder` object doubles up to the value defined by the `MaxCapacity` property.

In general, the default capacity and maximum capacity are adequate for most apps. You might consider setting these values under the following conditions:

- If the eventual size of the `StringBuilder` object is likely to grow exceedingly large, typically in excess of several megabytes. In this case, there might be some performance benefit from setting the initial `Capacity` property to a significantly high value to eliminate the need for too many memory reallocations.
- If your code is running on a system with limited memory. In this case, you might consider setting the `MaxCapacity` property to less than `MaxValue` if your code is handling large strings that might cause it to execute in a memory-constrained environment.

#### Instantiate a StringBuilder object

You instantiate a `StringBuilder` object by calling one of its six overloaded class constructors, which are listed in the following table. Three of the constructors instantiate a `StringBuilder` object whose value is an empty string, but set its `Capacity` and `MaxCapacity` values differently. The remaining three constructors define a `StringBuilder` object that has a specific string value and capacity. Two of the three constructors use the default maximum capacity of `MaxValue`, whereas the third allows you to set the maximum capacity.

| Constructor | String value | Capacity | Maximum capacity |
|-------------|--------------|----------|------------------|
|`%23ctor`|`Empty`|16|`MaxValue`|
|`%23ctor`|`Empty`|Defined by the `capacity` parameter|`MaxValue`|
|`%23ctor`|`Empty`|Defined by the `capacity` parameter|Defined by the `maxCapacity` parameter|
|`%23ctor`|Defined by the `value` parameter|16 or `value`. `Length`, whichever is greater|`MaxValue`|
|`%23ctor`|Defined by the `value` parameter|Defined by the `capacity` parameter or `value`. `Length`, whichever is greater.|`MaxValue`|
|`%23ctor`|Defined by `value`. `String.Substring`(`startIndex`, `length`)|Defined by the `capacity` parameter or `value`. `Length`, whichever is greater.|`MaxValue`|

The following example uses three of these constructor overloads to instantiate `StringBuilder` objects.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/instantiate1.cs._

#### Call StringBuilder methods

Most of the methods that modify the string in a `StringBuilder` instance return a reference to that same instance. This enables you to call `StringBuilder` methods in two ways:

- You can make individual method calls and ignore the return value, as the following example does.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/call1.cs._

- You can make a series of method calls in a single statement. This can be convenient if you want to write a single statement that chains successive operations. The following example consolidates three method calls from the previous example into a single line of code.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/call2.cs._

#### Perform StringBuilder operations

You can use the methods of the `StringBuilder` class to iterate, add, delete, or modify characters in a `StringBuilder` object.

#### Iterate StringBuilder characters

You can access the characters in a `StringBuilder` object by using the `StringBuilder.Chars` property. In C#, `StringBuilder.Chars` is an indexer; in Visual Basic, it is the default property of the `StringBuilder` class. This enables you to set or retrieve individual characters by using their index only, without explicitly referencing the `Chars` property. Characters in a `StringBuilder` object begin at index 0 (zero) and continue to index `Length` - 1.

The following example illustrates the `Chars` property. It appends ten random numbers to a `StringBuilder` object, and then iterates each character. If the character's Unicode category is `DecimalDigitNumber`, it decreases the number by 1 (or changes the number to 9 if its value is 0). The example displays the contents of the `StringBuilder` object both before and after the values of individual characters were changed.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/chars1.cs._

#### Add text to a StringBuilder object

The `StringBuilder` class includes the following methods for expanding the contents of a `StringBuilder` object:

- The `StringBuilder.Append` method appends a string, a substring, a character array, a portion of a character array, a single character repeated multiple times, or the string representation of a primitive data type to a `StringBuilder` object.

- The `StringBuilder.AppendLine` method appends a line terminator or a string along with a line terminator to a `StringBuilder` object.

- The `StringBuilder.AppendFormat` method appends a composite format string to a `StringBuilder` object. The string representations of objects included in the result string can reflect the formatting conventions of the current system culture or a specified culture.

- The `StringBuilder.Insert` method inserts a string, a substring, multiple repetitions of a string, a character array, a portion of a character array, or the string representation of a primitive data type at a specified position in the `StringBuilder` object. The position is defined by a zero-based index.

The following example uses the `StringBuilder.Append`, `StringBuilder.AppendLine`, `StringBuilder.AppendFormat`, and `StringBuilder.Insert` methods to expand the text of a `StringBuilder` object.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/expand1.cs._

#### Delete text from a StringBuilder object

The `StringBuilder` class includes methods that can reduce the size of the current `StringBuilder` instance. The `StringBuilder.Clear` method removes all characters and sets the `Length` property to zero. The `StringBuilder.Remove` method deletes a specified number of characters starting at a particular index position. In addition, you can remove characters from the end of a `StringBuilder` object by setting its `Length` property to a value that is less than the length of the current instance.

The following example removes some of the text from a `StringBuilder` object, displays its resulting capacity, maximum capacity, and length property values, and then calls the `StringBuilder.Clear` method to remove all the characters from the `StringBuilder` object.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/delete1.cs._

#### Modify the text in a StringBuilder object

The `StringBuilder.Replace` method replaces all occurrences of a character or a string in the entire `StringBuilder` object or in a particular character range. The following example uses the `StringBuilder.Replace` method to replace all exclamation points (!) with question marks (?) in the `StringBuilder` object.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/replace1.cs._

#### Search the text in a StringBuilder object

The `StringBuilder` class does not include methods similar to the `String.Contains`, `String.IndexOf`, and `String.StartsWith` methods provided by the `String` class, which allow you to search the object for a particular character or a substring. Determining the presence or starting character position of a substring requires that you search a `String` value by using either a string search method or a regular expression method. There are four ways to implement such searches, as the following table shows.
