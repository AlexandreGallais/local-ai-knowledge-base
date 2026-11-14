---
title: "Create a .NET class library (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tutorials/create-class-library.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Create a .NET class library (part 2 of 2)

## Add a console app to the solution

Add a console application that uses the class library. The app will prompt the user to enter a string and report whether the string begins with an uppercase character.

**visualstudio:**

1. Add a new .NET console application named **ShowCase** to the solution.

   1. Right-click on the solution in **Solution Explorer** and select **Add** > **New Project**.

   1. On the **Add a new project** page, enter **console** in the search box. Choose **C#** or **Visual Basic** from the Language list, and then choose **All platforms** from the Platform list.

   1. Choose the **Console App** template, and then choose **Next**.

   1. On the **Configure your new project** page, enter **ShowCase** in the **Project name** box. Then choose **Next**.

   1. On the **Additional information** page, select **.NET 10** in the **Framework** box. Then choose **Create**.

1. In the code window for the *Program.cs* or *Program.vb* file, replace all of the code with the following code.

```csharp
﻿using System;
using UtilityLibraries;

int row = 0;

do
{
    if (row == 0 || row >= 25)
        ResetConsole();

    string? input = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(input)) break;
    Console.WriteLine($"Input: {input} {"Begins with uppercase? ",30}: " +
                      $"{(input.StartsWithUpper() ? "Yes" : "No")}{Environment.NewLine}");
    row += 3;
} while (true);
return;

// Declare a ResetConsole local method
void ResetConsole()
{
    if (row > 0)
    {
        Console.WriteLine("Press any key to continue...");
        Console.ReadKey();
    }
    Console.Clear();
    Console.WriteLine($"{Environment.NewLine}Press <Enter> only to exit; otherwise, enter a string and press <Enter>:{Environment.NewLine}");
    row = 3;
}
```
```vb
﻿Imports UtilityLibraries

Module Program
    Dim row As Integer = 0

    Sub Main()
        Do
            If row = 0 OrElse row >= 25 Then ResetConsole()

            Dim input As String = Console.ReadLine()
            If String.IsNullOrEmpty(input) Then Return

            Console.WriteLine($"Input: {input} {"Begins with uppercase? ",30}: " +
                              $"{If(input.StartsWithUpper(), "Yes", "No")} {Environment.NewLine}")
            row += 3
        Loop While True
    End Sub

    Private Sub ResetConsole()
        If row > 0 Then
            Console.WriteLine("Press any key to continue...")
            Console.ReadKey()
        End If   
        Console.Clear()
        Console.WriteLine($"{Environment.NewLine}Press <Enter> only to exit; otherwise, enter a string and press <Enter>:{Environment.NewLine}")
        row = 3  
    End Sub
End Module
```
   The code uses the `row` variable to maintain a count of the number of rows of data written to the console window. Whenever it's greater than or equal to 25, the code clears the console window and displays a message to the user.

   The program prompts the user to enter a string. It indicates whether the string starts with an uppercase character. If the user presses the `Enter` key <example-value> entering a string, the application ends, and the console window closes.

**vscode:**

1. Right-click the solution in **Solution Explorer** and select **New Project**, or in the Command Palette select **.NET: New Project**.

1. Select **Console App**.

1. Give it the name **ShowCase**, select the default directory and select **Create Project**.

1. Open *ShowCase/Program.cs* and replace all of the code with the following code.

```csharp
﻿using System;
using UtilityLibraries;

int row = 0;

do
{
    if (row == 0 || row >= 25)
        ResetConsole();

    string? input = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(input)) break;
    Console.WriteLine($"Input: {input} {"Begins with uppercase? ",30}: " +
                      $"{(input.StartsWithUpper() ? "Yes" : "No")}{Environment.NewLine}");
    row += 3;
} while (true);
return;

// Declare a ResetConsole local method
void ResetConsole()
{
    if (row > 0)
    {
        Console.WriteLine("Press any key to continue...");
        Console.ReadKey();
    }
    Console.Clear();
    Console.WriteLine($"{Environment.NewLine}Press <Enter> only to exit; otherwise, enter a string and press <Enter>:{Environment.NewLine}");
    row = 3;
}
```
   The code uses the `row` variable to maintain a count of the number of rows of data written to the console window. Whenever it's greater than or equal to 25, the code clears the console window and displays a message to the user.

   The program prompts the user to enter a string. It indicates whether the string starts with an uppercase character. If the user presses the `Enter` key <example-value> entering a string, the application ends, and the console window closes.

1. Save your changes.

**codespaces:**

1. Navigate back to the tutorials folder and create a new console app:

   ```bash
   cd ..
   dotnet new console -n ShowCase
   ```

1. Open *ShowCase/Program.cs* and replace all of the code with the following code:

```csharp
﻿using System;
using UtilityLibraries;

int row = 0;

do
{
    if (row == 0 || row >= 25)
        ResetConsole();

    string? input = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(input)) break;
    Console.WriteLine($"Input: {input} {"Begins with uppercase? ",30}: " +
                      $"{(input.StartsWithUpper() ? "Yes" : "No")}{Environment.NewLine}");
    row += 3;
} while (true);
return;

// Declare a ResetConsole local method
void ResetConsole()
{
    if (row > 0)
    {
        Console.WriteLine("Press any key to continue...");
        Console.ReadKey();
    }
    Console.Clear();
    Console.WriteLine($"{Environment.NewLine}Press <Enter> only to exit; otherwise, enter a string and press <Enter>:{Environment.NewLine}");
    row = 3;
}
```
   The code uses the `row` variable to maintain a count of the number of rows of data written to the console window. Whenever it's greater than or equal to 25, the code clears the console window and displays a message to the user.

   The program prompts the user to enter a string. It indicates whether the string starts with an uppercase character. If the user presses the `Enter` key <example-value> entering a string, the application ends, and the console window closes.

1. Save your changes.

## Add a project reference

Initially, the new console app project doesn't have access to the class library. To allow it to call methods in the class library, create a project reference to the class library project.

**visualstudio:**

1. In **Solution Explorer**, right-click the `ShowCase` project's **Dependencies** node, and select **Add Project Reference**.

1. In the **Reference Manager** dialog, select the **StringLibrary** project, and select **OK**.

**vscode:**

1. In **Solution Explorer** right click on the **ShowCase** project and select **Add Project Reference**.

1. Select StringLibrary.

> **Tip:**
> Alternatively, add the following to *ShowCase.csproj*:
>
> ```xml
> <ItemGroup>
>   <ProjectReference Include="..\StringLibrary\StringLibrary.csproj" />
> </ItemGroup>
> ```

**codespaces:**

Add a reference to the StringLibrary project from the ShowCase project:

```bash
cd ShowCase
dotnet add reference ../StringLibrary/StringLibrary.csproj
```

## Run the app

**visualstudio:**

1. In **Solution Explorer**, right-click the **ShowCase** project and select **Set as StartUp Project** in the context menu.

1. Press `Ctrl`+`F5` to compile and run the program without debugging.

1. Try out the program by entering strings and pressing `Enter`, then press `Enter` to exit.

**vscode:**

1. Use the top menu bar to select **Run** > **Run without debugging**.

1. Select **C#**.

1. Select **C#: ShowCase**.

   If you get an error that says no C# program is loaded, close the folder that you have open, and open the `ShowCase` folder. Then try running the app again.

1. Try out the program by entering strings and pressing `Enter`, then press `Enter` to exit.

   The terminal output looks like the following example:

   ```output
   Press <Enter> only to exit; otherwise, enter a string and press <Enter>:

   A string that starts with an uppercase letter
   Input: A string that starts with an uppercase letter
   Begins with uppercase? : Yes

   a string that starts with a lowercase letter
   Input: a string that starts with a lowercase letter
   Begins with uppercase? : No
   ```

**codespaces:**

1. Run the ShowCase app:

   ```dotnetcli
   dotnet run
   ```

1. Try out the program by entering strings and pressing `Enter`, then press `Enter` to exit.

   The terminal output looks like the following example:

   ```output
   Press <Enter> only to exit; otherwise, enter a string and press <Enter>:

   A string that starts with an uppercase letter
   Input: A string that starts with an uppercase letter
   Begins with uppercase? : Yes

   a string that starts with a lowercase letter
   Input: a string that starts with a lowercase letter
   Begins with uppercase? : No
   ```

## Additional resources

- Develop libraries with the .NET CLI
- .NET Standard versions and the platforms they support.

**codespaces:**

## Cleanup resources

GitHub automatically deletes your Codespace after 30 days of inactivity. If you plan to explore more tutorials in this series, you can leave your Codespace provisioned. If you're ready to visit the .NET site to download the .NET SDK, you can delete your Codespace. To delete your Codespace, open a browser window and navigate to your Codespaces. You see a list of your codespaces in the window. Select the three dots (`...`) in the entry for the learn tutorial codespace. Then select "Delete".

## Next steps

In this tutorial, you created a class library. In the next tutorial, you learn how to unit test the class library.

> Unit test a .NET class library

Or, you can skip automated unit testing and learn how to share the library by creating a NuGet package:

> Create and publish a package using Visual Studio

Or, learn how to publish a console app. If you publish the console app from the solution you created in this tutorial, the class library goes with it as a *.dll* file.

> Publish a .NET console application
