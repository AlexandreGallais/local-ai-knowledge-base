---
title: "The array reference type (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/arrays.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Arrays

You can store multiple variables of the same type in an array data structure. You declare an array by specifying the type of its elements. If you want the array to store elements of any type, specify `object` as its type. In the unified type system of C#, all types, predefined and user-defined, reference types and value types, inherit directly or indirectly from `System.Object`.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

```csharp
type[] arrayName;
```

An array is a reference type, so the array can be a nullable reference type. The element types might be reference types, so you can declare an array to hold nullable reference types. The following example declarations show the different syntax used to declare the nullability of the array or the elements:

```csharp
type?[] arrayName; // non nullable array of nullable element types.
type[]? arrayName; // nullable array of non-nullable element types.
type?[]? arrayName; // nullable array of nullable element types.
```

Uninitialized elements in an array are set to the default value for that type:

```csharp
int[] numbers = new int[10]; // All values are 0
string[] messages = new string[10]; // All values are null.
```

> **Important:**
> In the preceding example, even though the type is `string[]`, an array of non-nullable strings, the default value for each element is null. The best way to initialize an array to non-null values is to use a collection expressions.

An array has the following properties:

- An array can be single-dimensional, multidimensional, or jagged.
- The number of dimensions is set when you declare an array variable. You establish the length of each dimension when you create the array instance. You can't change these values during the lifetime of the instance.
- A jagged array is an array of arrays, and each member array has the default value of `null`.
- Arrays are zero indexed: an array with `n` elements is indexed from `0` to `n-1`.
- Array elements can be of any type, including an array type.
- Array types are reference types derived from the abstract base type `System.Array`. All arrays implement `System.Collections.IList` and `System.Collections.IEnumerable`. You can use the foreach statement to iterate through an array. Single-dimensional arrays also implement `System.Collections.Generic.IList`1` and `System.Collections.Generic.IEnumerable`1`.

You can initialize the elements of an array to known values when you create the array. You can use a collection expression to initialize arrays and other collection types. Elements that you don't initialize are set to the default value. The default value is the 0-bit pattern. All reference types (including non-nullable types) have the value `null`. All value types have the 0-bit patterns. That means the `System.Nullable`1.HasValue` property is `false` and the `System.Nullable`1.Value` property is undefined. In the .NET implementation, the `Value` property throws an exception.

The following example creates single-dimensional, multidimensional, and jagged arrays:

```csharp
// Declare a single-dimensional array of 5 integers.
int[] array1 = new int[5];

// Declare and set array element values.
int[] array2 = [1, 2, 3, 4, 5, 6];

// Declare a two dimensional array.
int[,] multiDimensionalArray1 = new int[2, 3];

// Declare and set array element values.
int[,] multiDimensionalArray2 = { { 1, 2, 3 }, { 4, 5, 6 } };

// Declare a jagged array.
int[][] jaggedArray = new int[6][];

// Set the values of the first array in the jagged array structure.
jaggedArray[0] = [1, 2, 3, 4];
```
## Single-dimensional arrays

A *single-dimensional array* is a sequence of like elements. You access an element through its *index*. The *index* is the element's ordinal position in the sequence. The first element in the array is at index `0`. You create a single-dimensional array by using the new operator and specifying the array element type and the number of elements. The following example declares and initializes single-dimensional arrays:

```csharp
int[] array = new int[5];
string[] weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

Console.WriteLine(weekDays[0]);
Console.WriteLine(weekDays[1]);
Console.WriteLine(weekDays[2]);
Console.WriteLine(weekDays[3]);
Console.WriteLine(weekDays[4]);
Console.WriteLine(weekDays[5]);
Console.WriteLine(weekDays[6]);

/*Output:
Sun
Mon
Tue
Wed
Thu
Fri
Sat
*/
```
The first declaration declares an uninitialized array of five integers, from `array[0]` to `array[4]`. The elements of the array are initialized to the default value of the element type, `0` for integers. The second declaration declares an array of strings and initializes all seven values of that array. A series of `Console.WriteLine` statements prints all the elements of the `weekDay` array. For single-dimensional arrays, the `foreach` statement processes elements in increasing index order, starting with index 0 and ending with index `Length - 1`.

For more information about indices, see the Explore indexes and ranges article.

### Pass single-dimensional arrays as arguments

You can pass an initialized single-dimensional array to a method. In the following example, an array of strings is initialized and passed as an argument to a `DisplayArray` method for strings. The method displays the elements of the array. Next, the `ChangeArray` method reverses the array elements, and then the `ChangeArrayElements` method modifies the first three elements of the array. After each method returns, the `DisplayArray` method shows that passing an array by value doesn't prevent changes to the array elements.

```csharp
﻿class ArrayExample
{
    static void DisplayArray(string[] arr) => Console.WriteLine(string.Join(" ", arr));

    // Change the array by reversing its elements.
    static void ChangeArray(string[] arr) => Array.Reverse(arr);

    static void ChangeArrayElements(string[] arr)
    {
        // Change the value of the first three array elements.
        arr[0] = "Mon";
        arr[1] = "Wed";
        arr[2] = "Fri";
    }

    static void Main()
    {
        // Declare and initialize an array.
        string[] weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        // Display the array elements.
        DisplayArray(weekDays);
        Console.WriteLine();

        // Reverse the array.
        ChangeArray(weekDays);
        // Display the array again to verify that it stays reversed.
        Console.WriteLine("Array weekDays after the call to ChangeArray:");
        DisplayArray(weekDays);
        Console.WriteLine();

        // Assign new values to individual array elements.
        ChangeArrayElements(weekDays);
        // Display the array again to verify that it has changed.
        Console.WriteLine("Array weekDays after the call to ChangeArrayElements:");
        DisplayArray(weekDays);
    }
}
// The example displays the following output:
//         Sun Mon Tue Wed Thu Fri Sat
//
//        Array weekDays after the call to ChangeArray:
//        Sat Fri Thu Wed Tue Mon Sun
//
//        Array weekDays after the call to ChangeArrayElements:
//        Mon Wed Fri Wed Tue Mon Sun
```
