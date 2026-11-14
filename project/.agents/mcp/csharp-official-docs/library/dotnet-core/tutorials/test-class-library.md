---
title: "Test a .NET class library (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tutorials/test-class-library.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tutorial: Test a .NET class library

This tutorial shows how to automate unit testing by adding a test project to a solution.

## Prerequisites

This tutorial works with the solution that you create in Create a .NET class library.

## Create a unit test project

Unit tests provide automated software testing during your development and publishing. MSTest is one of three test frameworks you can choose from. The others are xUnit and nUnit.

**visualstudio:**

1. Start Visual Studio.

1. Open the `ClassLibraryProjects` solution you created in Create a .NET class library.

1. Add a new unit test project named "StringLibraryTest" to the solution.

   1. Right-click on the solution in **Solution Explorer** and select **Add** > **New project**.

   1. On the **Add a new project** page, enter **mstest** in the search box. Choose **C#** or **Visual Basic** from the Language list, and then choose **All platforms** from the Platform list.

   1. Choose the **MSTest Test Project** template, and then choose **Next**.

   1. On the **Configure your new project** page, enter **StringLibraryTest** in the **Project name** box. Then choose **Next**.

   1. On the **Additional information** page, select **.NET 10** in the **Framework** box, select **Microsoft.Testing.Platform** (MTP) for the **Test runner**, and then choose **Create**.

1. Visual Studio creates the project and opens the class file in the code window with the following code. If the language you want to use isn't shown, change the language selector at the top of the page.

   ```csharp
   namespace StringLibraryTest
   {

       [TestClass]
       public sealed class Test1
       {
           [TestMethod]
           public void TestMethod1()
           {
           }
       }
   }
   ```

   ```vb
   Imports Microsoft.VisualStudio.TestTools.UnitTesting

   Namespace StringLibraryTest
       <TestClass>
       Public Class Test1
           <TestMethod>
           Sub TestSub()

           End Sub
       End Class
   End Namespace
   ```

   The source code created by the unit test template does the following:

   - Includes `Microsoft.VisualStudio.TestTools.UnitTesting` in the StringLibraryTest project file in C#, and imports `Microsoft.VisualStudio.TestTools.UnitTesting` in Visual Basic.
   - Applies the `Microsoft.VisualStudio.TestTools.UnitTesting.TestClassAttribute` attribute to the `Test1` class.
   - Applies the `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute` attribute to define `TestMethod1` in C# or `TestSub` in Visual Basic.

   Each method tagged with [TestMethod] in a test class tagged with [TestClass] executes automatically when the unit test runs.

**vscode:**

1. Start Visual Studio Code.

1. Open the `ClassLibraryProjects` solution you created in Create a .NET class library.

1. From **Solution Explorer**, select **New Project**, or from the Command Palette select **.NET: New Project**.

1. Select **MSTest Test Project**, name it "StringLibraryTest", select the default directory, and select **Create Project**.

   The project template creates *StringLibraryTest/Test1.cs* with the following code:

   ```csharp
   namespace StringLibraryTest;

   [TestClass]
   public class Test1
   {
       [TestMethod]
       public void TestMethod1()
       {
       }
   }
   ```

   The source code created by the unit test template does the following:

   - It applies the `Microsoft.VisualStudio.TestTools.UnitTesting.TestClassAttribute` attribute to the `Test1` class.
   - It applies the `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute` attribute to define `TestMethod1`.
   - It imports the `Microsoft.VisualStudio.TestTools.UnitTesting` namespace, which contains the types used for unit testing. The namespace is imported via a `global using` directive in *GlobalUsings.cs*.

   Each method tagged with [TestMethod] in a test class tagged with [TestClass] is run automatically when the unit test is invoked.

**codespaces:**

1. Open the terminal and navigate to the tutorials folder containing the StringLibrary and ShowCase projects.

1. Create a new MSTest test project:

   ```dotnetcli
   dotnet new mstest -n StringLibraryTest
   ```

   The project template creates *StringLibraryTest/Test1.cs* with the following code:

   ```csharp
   namespace StringLibraryTest;

   [TestClass]
   public class Test1
   {
       [TestMethod]
       public void TestMethod1()
       {
       }
   }
   ```

   The source code created by the unit test template does the following:

   - It applies the `Microsoft.VisualStudio.TestTools.UnitTesting.TestClassAttribute` attribute to the `Test1` class.
   - It applies the `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute` attribute to define `TestMethod1`.
   - It imports the `Microsoft.VisualStudio.TestTools.UnitTesting` namespace, which contains the types used for unit testing.

   Each method tagged with [TestMethod] in a test class tagged with [TestClass] is run automatically when the unit test is invoked.

## Add a project reference

For the test project to work with the `StringLibrary` class, add a reference in the `StringLibraryTest` project to the `StringLibrary` project.

**visualstudio:**

1. In **Solution Explorer**, right-click the **Dependencies** node of the **StringLibraryTest** project and select **Add Project Reference** from the context menu.

1. In the **Reference Manager** dialog, select the box next to **StringLibrary**.

1. Select **OK**.

**vscode:**

1. From **Solution Explorer** right click on the 'StringLibraryTest' Project and select **Add Project Reference**.

1. Select "StringLibrary".

**codespaces:**

1. Navigate to the StringLibraryTest folder and add the project reference:

   ```bash
   cd StringLibraryTest
   dotnet add reference ../StringLibrary/StringLibrary.csproj
   ```
