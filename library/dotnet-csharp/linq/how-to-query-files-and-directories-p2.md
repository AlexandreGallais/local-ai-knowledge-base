---
title: "Use LINQ to query files and directories (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/linq/how-to-query-files-and-directories.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Use LINQ to query files and directories (part 2 of 2)

## How to compare the contents of two folders

This example demonstrates three ways to compare two file listings:

- By querying for a Boolean value that specifies whether the two file lists are identical.
- By querying for the intersection to retrieve the files that are in both folders.
- By querying for the set difference to retrieve the files that are in one folder but not the other.

The techniques shown here can be adapted to compare sequences of objects of any type.

The `FileComparer` class shown here demonstrates how to use a custom comparer class together with the Standard Query Operators. The class isn't intended for use in real-world scenarios. It just uses the name and length in bytes of each file to determine whether the contents of each folder are identical or not. In a real-world scenario, you should modify this comparer to perform a more rigorous equality check.

```csharp
// This implementation defines a very simple comparison
// between two FileInfo objects. It only compares the name
// of the files being compared and their length in bytes.
class FileCompare : IEqualityComparer<FileInfo>
{
    public bool Equals(FileInfo? f1, FileInfo? f2)
    {
        return (f1?.Name == f2?.Name &&
                f1?.Length == f2?.Length);
    }

    // Return a hash that reflects the comparison criteria. According to the
    // rules for IEqualityComparer<T>, if Equals is true, then the hash codes must
    // also be equal. Because equality as defined here is a simple value equality, not
    // reference identity, it is possible that two or more objects will produce the same
    // hash code.
    public int GetHashCode(FileInfo fi)
    {
        string s = $"{fi.Name}{fi.Length}";
        return s.GetHashCode();
    }
}

public static void CompareDirectories()
{
    string pathA = """C:\Program Files\dotnet\sdk\8.0.104""";
    string pathB = """C:\Program Files\dotnet\sdk\8.0.204""";

    DirectoryInfo dir1 = new DirectoryInfo(pathA);
    DirectoryInfo dir2 = new DirectoryInfo(pathB);

    IEnumerable<FileInfo> list1 = dir1.GetFiles("*.*", SearchOption.AllDirectories);
    IEnumerable<FileInfo> list2 = dir2.GetFiles("*.*", SearchOption.AllDirectories);

    //A custom file comparer defined below
    FileCompare myFileCompare = new FileCompare();

    // This query determines whether the two folders contain
    // identical file lists, based on the custom file comparer
    // that is defined in the FileCompare class.
    // The query executes immediately because it returns a bool.
    bool areIdentical = list1.SequenceEqual(list2, myFileCompare);

    if (areIdentical == true)
    {
        Console.WriteLine("the two folders are the same");
    }
    else
    {
        Console.WriteLine("The two folders are not the same");
    }

    // Find the common files. It produces a sequence and doesn't
    // execute until the foreach statement.
    var queryCommonFiles = list1.Intersect(list2, myFileCompare);

    if (queryCommonFiles.Any())
    {
        Console.WriteLine($"The following files are in both folders (total number = {queryCommonFiles.Count()}):");
        foreach (var v in queryCommonFiles.Take(10))
        {
            Console.WriteLine(v.Name); //shows which items end up in result list
        }
    }
    else
    {
        Console.WriteLine("There are no common files in the two folders.");
    }

    // Find the set difference between the two folders.
    var queryList1Only = (from file in list1
                          select file)
                          .Except(list2, myFileCompare);

    Console.WriteLine();
    Console.WriteLine($"The following files are in list1 but not list2 (total number = {queryList1Only.Count()}):");
    foreach (var v in queryList1Only.Take(10))
    {
        Console.WriteLine(v.FullName);
    }

    var queryList2Only = (from file in list2
                          select file)
                          .Except(list1, myFileCompare);

    Console.WriteLine();
    Console.WriteLine($"The following files are in list2 but not list1 (total number = {queryList2Only.Count()}:");
    foreach (var v in queryList2Only.Take(10))
    {
        Console.WriteLine(v.FullName);
    }
}
```
## How to reorder the fields of a delimited file

A comma-separated value (CSV) file is a text file that is often used to store spreadsheet data or other tabular data represented by rows and columns. By using the `System.String.Split*` method to separate the fields, it's easy to query and manipulate CSV files using LINQ. In fact, the same technique can be used to reorder the parts of any structured line of text; it isn't limited to CSV files.

In the following example, assume that the three columns represent students' "family name," "first name", and "ID." The fields are in alphabetical order based on the students' family names. The query produces a new sequence in which the ID column appears first, followed by a second column that combines the student's first name and family name. The lines are reordered according to the ID field. The results are saved into a new file and the original data isn't modified. The following text shows the contents of the *spreadsheet1.csv* file used in the following example:

```txt
Adams,Terry,120
Fakhouri,Fadi,116
Feng,Hanying,117
Garcia,Cesar,114
Garcia,Debra,115
Garcia,Hugo,118
Mortensen,Sven,113
O'Donnell,Claire,112
Omelchenko,Svetlana,111
Tucker,Lance,119
Tucker,Michael,122
Zabokritski,Eugene,121
```
The following code reads the source file and rearranges each column in the CSV file to rearrange the order of the columns:

```csharp
string[] lines = File.ReadAllLines("spreadsheet1.csv");

// Create the query. Put field 2 first, then
// reverse and combine fields 0 and 1 from the old field
IEnumerable<string> query = from line in lines
                            let fields = line.Split(',')
                            orderby fields[2]
                            select $"{fields[2]}, {fields[1]} {fields[0]}";

File.WriteAllLines("spreadsheet2.csv", query.ToArray());

/* Output to spreadsheet2.csv:
111, Svetlana Omelchenko
112, Claire O'Donnell
113, Sven Mortensen
114, Cesar Garcia
115, Debra Garcia
116, Fadi Fakhouri
117, Hanying Feng
118, Hugo Garcia
119, Lance Tucker
120, Terry Adams
121, Eugene Zabokritski
122, Michael Tucker
*/
```
## How to split a file into many files by using groups

This example shows one way to merge the contents of two files and then create a set of new files that organize the data in a new way. The query uses the contents of two files. The following text shows the contents of the first file, *names1.txt*:

```txt
Bankov, Peter
Holm, Michael
Garcia, Hugo
Potra, Cristina
Noriega, Fabricio
Aw, Kam Foo
Beebe, Ann
Toyoshima, Tim
Guy, Wey Yuan
Garcia, Debra
```
The second file, *names2.txt*, contains a different set of names, some of which are in common with the first set:

```txt
Liu, Jinghao
Bankov, Peter
Holm, Michael
Garcia, Hugo
Beebe, Ann
Gilchrist, Beth
Myrcha, Jacek
Giakoumakis, Leo
McLin, Nkenge
El Yassir, Mehdi
```
The following code queries both files, takes the union of both files, then writes a new file for each group, defined by the first letter of the family name:

```csharp
string[] fileA = File.ReadAllLines("names1.txt");
string[] fileB = File.ReadAllLines("names2.txt");

// Concatenate and remove duplicate names
var mergeQuery = fileA.Union(fileB);

// Group the names by the first letter in the last name.
var groupQuery = from name in mergeQuery
                 let n = name.Split(',')[0]
                 group name by n[0] into g
                 orderby g.Key
                 select g;

foreach (var g in groupQuery)
{
    string fileName = $"testFile_{g.Key}.txt";

    Console.WriteLine(g.Key);

    using StreamWriter sw = new StreamWriter(fileName);
    foreach (var item in g)
    {
        sw.WriteLine(item);
        // Output to console for example purposes.
        Console.WriteLine($"   {item}");
    }
}
/* Output:
    A
       Aw, Kam Foo
    B
       Bankov, Peter
       Beebe, Ann
    E
       El Yassir, Mehdi
    G
       Garcia, Hugo
       Guy, Wey Yuan
       Garcia, Debra
       Gilchrist, Beth
       Giakoumakis, Leo
    H
       Holm, Michael
    L
       Liu, Jinghao
    M
       Myrcha, Jacek
       McLin, Nkenge
    N
       Noriega, Fabricio
    P
       Potra, Cristina
    T
       Toyoshima, Tim
 */
```
## How to join content from dissimilar files

This example shows how to join data from two comma-delimited files that share a common value that is used as a matching key. This technique can be useful if you have to combine data from two spreadsheets, or from a spreadsheet and from a file that has another format, into a new file. You can modify the example to work with any kind of structured text.

The following text shows the contents of *scores.csv*. The file represents spreadsheet data. Column 1 is the student's ID, and columns 2 through 5 are test scores.

```txt
111, 97, 92, 81, 60
112, 75, 84, 91, 39
113, 88, 94, 65, 91
114, 97, 89, 85, 82
115, 35, 72, 91, 70
116, 99, 86, 90, 94
117, 93, 92, 80, 87
118, 92, 90, 83, 78
119, 68, 79, 88, 92
120, 99, 82, 81, 79
121, 96, 85, 91, 60
122, 94, 92, 91, 91
```
The following text shows the contents of *names.csv*. The file represents a spreadsheet that contains the student's family name, first name, and student ID.

```txt
Omelchenko,Svetlana,111
O'Donnell,Claire,112
Mortensen,Sven,113
Garcia,Cesar,114
Garcia,Debra,115
Fakhouri,Fadi,116
Feng,Hanying,117
Garcia,Hugo,118
Tucker,Lance,119
Adams,Terry,120
Zabokritski,Eugene,121
Tucker,Michael,122
```
Join content from dissimilar files that contain related information. File *names.csv* contains the student name plus an ID number. File *scores.csv* contains the ID and a set of four test scores. The following query joins the scores to the student names by using ID as a matching key. The code is shown in the following example:

```csharp
string[] names = File.ReadAllLines(@"names.csv");
string[] scores = File.ReadAllLines(@"scores.csv");

var scoreQuery = from name in names
                  let nameFields = name.Split(',')
                  from id in scores
                  let scoreFields = id.Split(',')
                  where Convert.ToInt32(nameFields[2]) == Convert.ToInt32(scoreFields[0])
                  select $"{nameFields[0]},{scoreFields[1]},{scoreFields[2]},{scoreFields[3]},{scoreFields[4]}";

Console.WriteLine("\r\nMerge two spreadsheets:");
foreach (string item in scoreQuery)
{
    Console.WriteLine(item);
}
Console.WriteLine($"{scoreQuery.Count()} total names in list");
/* Output:
Merge two spreadsheets:
Omelchenko, 97, 92, 81, 60
O'Donnell, 75, 84, 91, 39
Mortensen, 88, 94, 65, 91
Garcia, 97, 89, 85, 82
Garcia, 35, 72, 91, 70
Fakhouri, 99, 86, 90, 94
Feng, 93, 92, 80, 87
Garcia, 92, 90, 83, 78
Tucker, 68, 79, 88, 92
Adams, 99, 82, 81, 79
Zabokritski, 96, 85, 91, 60
Tucker, 94, 92, 91, 91
12 total names in list
 */
```
## How to compute column values in a CSV text file

This example shows how to perform aggregate computations such as Sum, Average, Min, and Max on the columns of a .csv file. The example principles that are shown here can be applied to other types of structured text.

The following text shows the contents of *scores.csv*. Assume that the first column represents a student ID, and subsequent columns represent scores from four exams.

```txt
111, 97, 92, 81, 60
112, 75, 84, 91, 39
113, 88, 94, 65, 91
114, 97, 89, 85, 82
115, 35, 72, 91, 70
116, 99, 86, 90, 94
117, 93, 92, 80, 87
118, 92, 90, 83, 78
119, 68, 79, 88, 92
120, 99, 82, 81, 79
121, 96, 85, 91, 60
122, 94, 92, 91, 91
```
The following text shows how to use the `System.String.Split*` method to convert each line of text into an array. Each array element represents a column. Finally, the text in each column is converted to its numeric representation.

```csharp
public static class SumColumns
{
    public static void ProcessColumns(string filePath, string seperator)
    {
        // Divide each exam into a group
        var exams = from line in MatrixFrom(filePath, seperator)
                    from score in line

                    // Identify the column number
                    let colNumber = Array.FindIndex(line, t => ReferenceEquals(score, t))

                    // The first column is the student ID, not the exam score
                    // so it needs to be excluded
                    where colNumber > 0

                    // Convert the score from string to int
                    // Group by column number, i.e. one group per exam
                    group double.Parse(score) by colNumber into g
                    select new
                    {
                        Title = $"Exam#{g.Key}",
                        Min = g.Min(),
                        Max = g.Max(),
                        Avg = Math.Round(g.Average(), 2),
                        Total = g.Sum()
                    };

        foreach (var exam in exams)
        {
            Console.WriteLine($"{exam.Title}\t"
            + $"Average:{exam.Avg,6}\t"
            + $"High Score:{exam.Max,3}\t"
            + $"Low Score:{exam.Min,3}\t"
            + $"Total:{exam.Total,5}");
        }
    }

    // Transform the file content to an IEnumerable of string arrays
    // like a matrix
    private static IEnumerable<string[]> MatrixFrom(string filePath, string seperator)
    {
        using StreamReader reader = File.OpenText(filePath);

        for (string? line = reader.ReadLine(); line is not null; line = reader.ReadLine())
        {
            yield return line.Split(seperator, StringSplitOptions.TrimEntries);
        }
    }
}

// Output:
// Exam#1  Average: 86.08  High Score: 99  Low Score: 35   Total: 1033
// Exam#2  Average: 86.42  High Score: 94  Low Score: 72   Total: 1037
// Exam#3  Average: 84.75  High Score: 91  Low Score: 65   Total: 1017
// Exam#4  Average: 76.92  High Score: 94  Low Score: 39   Total:  923
```
If your file is a tab-separated file, just update the argument in the `SumColumns.ProcessColumns` method to `\t`.
