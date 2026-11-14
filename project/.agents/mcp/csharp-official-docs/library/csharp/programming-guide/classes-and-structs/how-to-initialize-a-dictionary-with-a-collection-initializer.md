---
title: "How to initialize a dictionary with a collection initializer"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/classes-and-structs/how-to-initialize-a-dictionary-with-a-collection-initializer.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to initialize a dictionary with a collection initializer (C# Programming Guide)

A `System.Collections.Generic.Dictionary`2` contains a collection of key/value pairs. Its `System.Collections.Generic.Dictionary`2.Add*` method takes two parameters, one for the key and one for the value. One way to initialize a `System.Collections.Generic.Dictionary`2`, or any collection whose `Add` method takes multiple parameters, is to enclose each set of parameters in braces as shown in the following example. Another option is to use an index initializer, also shown in the following example.

> **Note:**
> The major difference between these two ways of initializing the collection is how duplicated keys are handled, for example:
>
> ```csharp
> { 111, new StudentName { FirstName="Sachin", LastName="Karnik", ID=211 } },
> { 111, new StudentName { FirstName="Dina", LastName="Salimzianova", ID=317 } },
>  ```
>
> `System.Collections.Generic.Dictionary`2.Add*` method throws `System.ArgumentException`: `'An item with the same key has already been added. Key: 111'`,
> while the second part of example, the public read / write indexer method, quietly overwrites the already existing entry with the same key.

## Example

In the following code example, a `System.Collections.Generic.Dictionary`2` is initialized with instances of type `StudentName`. The first initialization uses the `Add` method with two arguments. The compiler generates a call to `Add` for each of the pairs of `int` keys and `StudentName` values. The second uses a public read / write indexer method of the `Dictionary` class:

```csharp
﻿namespace object_collection_initializers;

public class HowToDictionaryInitializer
{
    class StudentName
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int ID { get; set; }
    }

    public static void Main()
    {
        var students = new Dictionary<int, StudentName>()
        {
            { 111, new StudentName { FirstName="Sachin", LastName="Karnik", ID=211 } },
            { 112, new StudentName { FirstName="Dina", LastName="Salimzianova", ID=317 } },
            { 113, new StudentName { FirstName="Andy", LastName="Ruth", ID=198 } }
        };

        foreach(var index in Enumerable.Range(111, 3))
        {
            Console.WriteLine($"Student {index} is {students[index].FirstName} {students[index].LastName}");
        }
        Console.WriteLine();		

        var students2 = new Dictionary<int, StudentName>()
        {
            [111] = new StudentName { FirstName="Sachin", LastName="Karnik", ID=211 },
            [112] = new StudentName { FirstName="Dina", LastName="Salimzianova", ID=317 } ,
            [113] = new StudentName { FirstName="Andy", LastName="Ruth", ID=198 }
        };

        foreach (var index in Enumerable.Range(111, 3))
        {
            Console.WriteLine($"Student {index} is {students2[index].FirstName} {students2[index].LastName}");
        }
    }
}
```
Note the two pairs of braces in each element of the collection in the first declaration. The innermost braces enclose the object initializer for the `StudentName`, and the outermost braces enclose the initializer for the key/value pair to be added to the `students` `System.Collections.Generic.Dictionary`2`. Finally, the whole collection initializer for the dictionary is enclosed in braces. In the second initialization, the left side of the assignment is the key and the right side is the value, using an object initializer for `StudentName`.

## Use AI to generate test data for dictionary collections

You can use AI tools, such as GitHub Copilot, to quickly generate dictionary test data and validation scenarios in your C# projects.

Here's an example prompt you can use in Visual Studio Copilot Chat.

```copilot-prompt
Generate data collections for tests to create a separate Dictionary<int, Student> containing 10 valid Student records and 5 invalid records.
- Valid records should have realistic Name and Grade values.
- Invalid records should include cases such as missing Name, Grade < 0, or Grade > 100.
- This dictionary should be used only for testing purposes and not modify existing production code.
- Generate test code that utilizes this test data for validation scenarios.
- Call test method to run the test.
```

Review Copilot's suggestions before applying them.

For more information about GitHub Copilot, see GitHub's FAQs.

## See also

- Object and Collection Initializers
