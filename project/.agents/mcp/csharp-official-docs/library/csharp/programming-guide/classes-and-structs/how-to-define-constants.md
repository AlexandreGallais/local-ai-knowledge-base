---
title: "How to define constants"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/classes-and-structs/how-to-define-constants.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to define constants in C\#

Constants are fields whose values are set at compile time and can never be changed. Use constants to provide meaningful names instead of numeric literals ("magic numbers") for special values.

> **Note:**
> In C# the #define preprocessor directive cannot be used to define constants in the way that is typically used in C and C++.

 To define constant values of integral types (`int`, `byte`, and so on) use an enumerated type. For more information, see enum.

 To define non-integral constants, one approach is to group them in a single static class named `Constants`. This will require that all references to the constants be prefaced with the class name, as shown in the following example.

## Example

 ```csharp
﻿static class Constants
{
    public const double Pi = 3.14159;
    public const int SpeedOfLight = 300000; // km per sec.
}

class Program
{
    static void Main()
    {
        double radius = 5.3;
        double area = Constants.Pi * (radius * radius);
        int secsFromSun = 149476000 / Constants.SpeedOfLight; // in km
        Console.WriteLine(secsFromSun);
    }
}
```  

 The use of the class name qualifier helps ensure that you and others who use the constant understand that it is constant and cannot be modified.

## See also

- The C# type system
