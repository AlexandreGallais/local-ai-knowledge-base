---
title: "The array reference type (part 2 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/builtin-types/arrays.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The array reference type (part 2 of 3)

## Multidimensional arrays

Arrays can have more than one dimension. For example, the following declarations create four arrays. Two arrays have two dimensions. Two arrays have three dimensions. The first two declarations declare the length of each dimension, but don't initialize the values of the array. The second two declarations use an initializer to set the values of each element in the multidimensional array.

```csharp
int[,] array2DDeclaration = new int[4, 2];

int[,,] array3DDeclaration = new int[4, 2, 3];

// Two-dimensional array.
int[,] array2DInitialization =  { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };
// Three-dimensional array.
int[,,] array3D = new int[,,] { { { 1, 2, 3 }, { 4,   5,  6 } },
                                { { 7, 8, 9 }, { 10, 11, 12 } } };

// Accessing array elements.
System.Console.WriteLine(array2DInitialization[0, 0]);
System.Console.WriteLine(array2DInitialization[0, 1]);
System.Console.WriteLine(array2DInitialization[1, 0]);
System.Console.WriteLine(array2DInitialization[1, 1]);

System.Console.WriteLine(array2DInitialization[3, 0]);
System.Console.WriteLine(array2DInitialization[3, 1]);
// Output:
// 1
// 2
// 3
// 4
// 7
// 8

System.Console.WriteLine(array3D[1, 0, 1]);
System.Console.WriteLine(array3D[1, 1, 2]);
// Output:
// 8
// 12

// Getting the total count of elements or the length of a given dimension.
var allLength = array3D.Length;
var total = 1;
for (int i = 0; i < array3D.Rank; i++)
{
    total *= array3D.GetLength(i);
}
System.Console.WriteLine($"{allLength} equals {total}");
// Output:
// 12 equals 12
```
For multidimensional arrays, traversal increments the indices of the rightmost dimension first, then the next left dimension, and so on, to the leftmost index. The following example enumerates both a 2D and a 3D array:

```csharp
int[,] numbers2D = { { 9, 99 }, { 3, 33 }, { 5, 55 } };

foreach (int i in numbers2D)
{
    System.Console.Write($"{i} ");
}
// Output: 9 99 3 33 5 55

int[,,] array3D = new int[,,] { { { 1, 2, 3 }, { 4,   5,  6 } },
                        { { 7, 8, 9 }, { 10, 11, 12 } } };
foreach (int i in array3D)
{
    System.Console.Write($"{i} ");
}
// Output: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
```
In a 2D array, you can think of the left index as the *row* and the right index as the *column*.

However, with multidimensional arrays, using a nested for loop gives you more control over the order in which you process the array elements:

```csharp
int[,,] array3D = new int[,,] { { { 1, 2, 3 }, { 4,   5,  6 } },
                        { { 7, 8, 9 }, { 10, 11, 12 } } };

for (int i = 0; i < array3D.GetLength(0); i++)
{
    for (int j = 0; j < array3D.GetLength(1); j++)
    {
        for (int k = 0; k < array3D.GetLength(2); k++)
        {
            System.Console.Write($"{array3D[i, j, k]} ");
        }
        System.Console.WriteLine();
    }
    System.Console.WriteLine();
}
// Output (including blank lines):
// 1 2 3
// 4 5 6
//
// 7 8 9
// 10 11 12
//
```
### Pass <example-value> arrays as arguments

Pass an initialized multidimensional array to a method the same way you pass a one-dimensional array. The following code shows a partial declaration of a print method that accepts a two-dimensional array as its argument. You can initialize and pass a new array in one step, as shown in the following example. In the following example, a two-dimensional array of integers is initialized and passed to the `Print2DArray` method. The method displays the elements of the array.

```csharp
class TestArraysClass
{
    public static void DeclareArrays()
    {
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
    }

    public static void SingleDimensionalArrays()
    {
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
    }

    public static void MultiDimensionalArrays()
    {
        int[,] array2DDeclaration = new int[4, 2];

        int[,,] array3DDeclaration = new int[4, 2, 3];

        // Two-dimensional array.
        int[,] array2DInitialization =  { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };
        // Three-dimensional array.
        int[,,] array3D = new int[,,] { { { 1, 2, 3 }, { 4,   5,  6 } },
                                        { { 7, 8, 9 }, { 10, 11, 12 } } };

        // Accessing array elements.
        System.Console.WriteLine(array2DInitialization[0, 0]);
        System.Console.WriteLine(array2DInitialization[0, 1]);
        System.Console.WriteLine(array2DInitialization[1, 0]);
        System.Console.WriteLine(array2DInitialization[1, 1]);

        System.Console.WriteLine(array2DInitialization[3, 0]);
        System.Console.WriteLine(array2DInitialization[3, 1]);
        // Output:
        // 1
        // 2
        // 3
        // 4
        // 7
        // 8

        System.Console.WriteLine(array3D[1, 0, 1]);
        System.Console.WriteLine(array3D[1, 1, 2]);
        // Output:
        // 8
        // 12

        // Getting the total count of elements or the length of a given dimension.
        var allLength = array3D.Length;
        var total = 1;
        for (int i = 0; i < array3D.Rank; i++)
        {
            total *= array3D.GetLength(i);
        }
        System.Console.WriteLine($"{allLength} equals {total}");
        // Output:
        // 12 equals 12
    }

    //< MultiDimensionParameter>
    static void Print2DArray(int[,] arr)
    {
        // Display the array elements.
        for (int i = 0; i < arr.GetLength(0); i++)
        {
            for (int j = 0; j < arr.GetLength(1); j++)
            {
                System.Console.WriteLine($"Element({i},{j})={arr[i,j]}");
            }
        }
    }
    static void ExampleUsage()
    {
        // Pass the array as an argument.
        Print2DArray(new int[,] { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } });
    }
    /* Output:
        Element(0,0)=1
        Element(0,1)=2
        Element(1,0)=3
        Element(1,1)=4
        Element(2,0)=5
        Element(2,1)=6
        Element(3,0)=7
        Element(3,1)=8
    */

    public static void ForEachMultiDim()
    {
        int[,] numbers2D = { { 9, 99 }, { 3, 33 }, { 5, 55 } };

        foreach (int i in numbers2D)
        {
            System.Console.Write($"{i} ");
        }
        // Output: 9 99 3 33 5 55

        int[,,] array3D = new int[,,] { { { 1, 2, 3 }, { 4,   5,  6 } },
                                { { 7, 8, 9 }, { 10, 11, 12 } } };
        foreach (int i in array3D)
        {
            System.Console.Write($"{i} ");
        }
        // Output: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12

    }

    public static void ForMultiDimension()
    {
        int[,,] array3D = new int[,,] { { { 1, 2, 3 }, { 4,   5,  6 } },
                                { { 7, 8, 9 }, { 10, 11, 12 } } };

        for (int i = 0; i < array3D.GetLength(0); i++)
        {
            for (int j = 0; j < array3D.GetLength(1); j++)
            {
                for (int k = 0; k < array3D.GetLength(2); k++)
                {
                    System.Console.Write($"{array3D[i, j, k]} ");
                }
                System.Console.WriteLine();
            }
            System.Console.WriteLine();
        }
        // Output (including blank lines):
        // 1 2 3
        // 4 5 6
        //
        // 7 8 9
        // 10 11 12
        //
    }

    public static void JaggedArrayDeclaration()
    {
        int[][] jaggedArray = new int[3][];

        jaggedArray[0] = [1, 3, 5, 7, 9];
        jaggedArray[1] = [0, 2, 4, 6];
        jaggedArray[2] = [11, 22];

        int[][] jaggedArray2 =
        [
            [1, 3, 5, 7, 9],
            [0, 2, 4, 6],
            [11, 22]
        ];

        // Assign 77 to the second element ([1]) of the first array ([0]):
        jaggedArray2[0][1] = 77;

        // Assign 88 to the second element ([1]) of the third array ([2]):
        jaggedArray2[2][1] = 88;

        int[][,] jaggedArray3 =
        [
            new int[,] { {1,3}, {5,7} },
            new int[,] { {0,2}, {4,6}, {8,10} },
            new int[,] { {11,22}, {99,88}, {0,9} }
        ];

        Console.Write("{0}", jaggedArray3[0][1, 0]);
        Console.WriteLine(jaggedArray3.Length);
    }

    public static void DifferentSizeJagged()
    {
        // Declare the array of two elements.
        int[][] arr = new int[2][];

        // Initialize the elements.
        arr[0] = [1, 3, 5, 7, 9];
        arr[1] = [2, 4, 6, 8];

        // Display the array elements.
        for (int i = 0; i < arr.Length; i++)
        {
            System.Console.Write("Element({0}): ", i);

            for (int j = 0; j < arr[i].Length; j++)
            {
                System.Console.Write("{0}{1}", arr[i][j], j == (arr[i].Length - 1) ? "" : " ");
            }
            System.Console.WriteLine();
        }
        /* Output:
            Element(0): 1 3 5 7 9
            Element(1): 2 4 6 8
        */
    }

    public static void ArraysWithLINQ()
    {
        int[] a = new[] { 1, 10, 100, 1000 }; // int[]

        // Accessing array
        Console.WriteLine("First element: " + a[0]);
        Console.WriteLine("Second element: " + a[1]);
        Console.WriteLine("Third element: " + a[2]);
        Console.WriteLine("Fourth element: " + a[3]);
        /* Outputs
        First element: 1
        Second element: 10
        Third element: 100
        Fourth element: 1000
        */

        var b = new[] { "hello", null, "world" }; // string[]

        // Accessing elements of an array using 'string.Join' method
        Console.WriteLine(string.Join(" ", b));
        /* Output
        hello  world
        */

        // single-dimension jagged array
        int[][] c =
        [
            [1,2,3,4],
            [5,6,7,8]
        ];
        // Looping through the outer array
        for (int k = 0; k < c.Length; k++)
        {
            // Looping through each inner array
            for (int j = 0; j < c[k].Length; j++)
            {
                // Accessing each element and printing it to the console
                Console.WriteLine($"Element at c[{k}][{j}] is: {c[k][j]}");
            }
        }
        /* Outputs
        Element at c[0][0] is: 1
        Element at c[0][1] is: 2
        Element at c[0][2] is: 3
        Element at c[0][3] is: 4
        Element at c[1][0] is: 5
        Element at c[1][1] is: 6
        Element at c[1][2] is: 7
        Element at c[1][3] is: 8
        */

        // jagged array of strings
        string[][] d =
        [
            ["Luca", "Mads", "Luke", "Dinesh"],
            ["Karen", "Suma", "Frances"]
        ];

        // Looping through the outer array
        int i = 0;
        foreach (var subArray in d)
        {
            // Looping through each inner array
            int j = 0;
            foreach (var element in subArray)
            {
                // Accessing each element and printing it to the console
                Console.WriteLine($"Element at d[{i}][{j}] is: {element}");
                j++;
            }
            i++;
        }
        /* Outputs
        Element at d[0][0] is: Luca
        Element at d[0][1] is: Mads
        Element at d[0][2] is: Luke
        Element at d[0][3] is: Dinesh
        Element at d[1][0] is: Karen
        Element at d[1][1] is: Suma
        Element at d[1][2] is: Frances
        */
    }

    public static void Init()
    {
        var contacts = new[]
        {
            new
            {
                Name = "Eugene Zabokritski",
                PhoneNumbers = new[] { "206-555-0108", "425-555-0001" }
            },
            new
            {
                Name = "Hanying Feng",
                PhoneNumbers = new[] { "650-555-0199" }
            }
        };
    }
}
```
## Jagged arrays

A jagged array is an array whose elements are arrays, possibly of different sizes. A jagged array is sometimes called an "array of arrays." Its elements are reference types and are initialized to `null`. The following examples show how to declare, initialize, and access jagged arrays. The first example, `jaggedArray`, is declared in one statement. Each contained array is created in subsequent statements. The second example, `jaggedArray2` is declared and initialized in one statement. You can mix jagged and multidimensional arrays. The final example, `jaggedArray3`, is a declaration and initialization of a single-dimensional jagged array that contains three two-dimensional array elements of different sizes.

```csharp
int[][] jaggedArray = new int[3][];

jaggedArray[0] = [1, 3, 5, 7, 9];
jaggedArray[1] = [0, 2, 4, 6];
jaggedArray[2] = [11, 22];

int[][] jaggedArray2 =
[
    [1, 3, 5, 7, 9],
    [0, 2, 4, 6],
    [11, 22]
];

// Assign 77 to the second element ([1]) of the first array ([0]):
jaggedArray2[0][1] = 77;

// Assign 88 to the second element ([1]) of the third array ([2]):
jaggedArray2[2][1] = 88;

int[][,] jaggedArray3 =
[
    new int[,] { {1,3}, {5,7} },
    new int[,] { {0,2}, {4,6}, {8,10} },
    new int[,] { {11,22}, {99,88}, {0,9} }
];

Console.Write("{0}", jaggedArray3[0][1, 0]);
Console.WriteLine(jaggedArray3.Length);
```
You must initialize a jagged array's elements before you can use them. Each of the elements is itself an array. You can also use initializers to fill the array elements with values. When you use initializers, you don't need the array size.

This example builds an array whose elements are themselves arrays. Each one of the array elements has a different size.

```csharp
// Declare the array of two elements.
int[][] arr = new int[2][];

// Initialize the elements.
arr[0] = [1, 3, 5, 7, 9];
arr[1] = [2, 4, 6, 8];

// Display the array elements.
for (int i = 0; i < arr.Length; i++)
{
    System.Console.Write("Element({0}): ", i);

    for (int j = 0; j < arr[i].Length; j++)
    {
        System.Console.Write("{0}{1}", arr[i][j], j == (arr[i].Length - 1) ? "" : " ");
    }
    System.Console.WriteLine();
}
/* Output:
    Element(0): 1 3 5 7 9
    Element(1): 2 4 6 8
*/
```
