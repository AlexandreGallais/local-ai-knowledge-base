---
title: "How to use indexed properties in COM interop programming"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/advanced-topics/interop/how-to-use-indexed-properties-in-com-interop-programming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to use indexed properties in COM interop programming

Indexed properties work together with other features in C#, such as named and optional arguments, a new type (dynamic), and embedded type information, to enhance Microsoft Office programming.

> **Important:**
> VSTO (Visual Studio Tools for Office) relies on the .NET Framework. COM add-ins can also be written with the .NET Framework. Office Add-ins cannot be created with .NET Core and .NET 5+, the latest versions of .NET. This is because .NET Core/.NET 5+ cannot work together with .NET Framework in the same process and may lead to add-in load failures. You can continue to use .NET Framework to write VSTO and COM add-ins for Office. Microsoft will not be updating VSTO or the COM add-in platform to use .NET Core or .NET 5+. You can take advantage of .NET Core and .NET 5+, including ASP.NET Core, to create the server side of Office Web Add-ins.

In earlier versions of C#, methods are accessible as properties only if the `get` method has no parameters and the `set` method has one and only one value parameter. However, not all COM properties meet those restrictions. For example, the Excel `Microsoft.Office.Interop.Excel.Range.Range*` property has a `get` accessor that requires a parameter for the name of the range. In the past, because you couldn't access the `Range` property directly, you had to use the `get_Range` method instead, as shown in the following example.

```csharp
﻿// Snippets 5000 Note:  
// The container used for building our samples doesn't include the Office assemblies.
// This sample will generate a few errors in the CI build. Those are expected,
// so the build passes.
//
// If you update this sample, make sure to build it locally.
// Then, make sure no new errors are added.

// You must add a reference to Microsoft.Office.Interop.Excel to run
// this example.
using System;
using Excel = Microsoft.Office.Interop.Excel;

namespace IndexedProperties
{
    class Program
    {
        static void Main(string[] args)
        {
            CSharp2010();
        }

        static void CSharp2010()
        {
            var excelApp = new Excel.Application();
            excelApp.Workbooks.Add();
            excelApp.Visible = true;

            Excel.Range targetRange = excelApp.Range["A1"];
            targetRange.Value = "Name";
        }

        static void CSharp2008()
        {
            var excelApp = new Excel.Application();
            excelApp.Workbooks.Add(Type.Missing);
            excelApp.Visible = true;

            Excel.Range targetRange = excelApp.get_Range("A1", Type.Missing);
            targetRange.set_Value(Type.Missing, "Name");
            // Or
            //targetRange.Value2 = "Name";
        }
    }
}

namespace IndexedPieces
{
    class Pieces
    {
        public void Snippets2008()
        {
            // Visual C# 2008 and earlier.
            var excelApp = new Excel.Application();
            // . . .
            Excel.Range targetRange = excelApp.get_Range("A1", Type.Missing);

        }

        public void Snippets2010()
        {
            // Visual C# 2010.
            var excelApp = new Excel.Application();
            // . . .
            Excel.Range targetRange = excelApp.Range["A1"];

            // Visual C# 2010.
            targetRange.Value = "Name";
        }
    }
}
```
Indexed properties enable you to write the following instead:

```csharp
﻿// Snippets 5000 Note:  
// The container used for building our samples doesn't include the Office assemblies.
// This sample will generate a few errors in the CI build. Those are expected,
// so the build passes.
//
// If you update this sample, make sure to build it locally.
// Then, make sure no new errors are added.

// You must add a reference to Microsoft.Office.Interop.Excel to run
// this example.
using System;
using Excel = Microsoft.Office.Interop.Excel;

namespace IndexedProperties
{
    class Program
    {
        static void Main(string[] args)
        {
            CSharp2010();
        }

        static void CSharp2010()
        {
            var excelApp = new Excel.Application();
            excelApp.Workbooks.Add();
            excelApp.Visible = true;

            Excel.Range targetRange = excelApp.Range["A1"];
            targetRange.Value = "Name";
        }

        static void CSharp2008()
        {
            var excelApp = new Excel.Application();
            excelApp.Workbooks.Add(Type.Missing);
            excelApp.Visible = true;

            Excel.Range targetRange = excelApp.get_Range("A1", Type.Missing);
            targetRange.set_Value(Type.Missing, "Name");
            // Or
            //targetRange.Value2 = "Name";
        }
    }
}

namespace IndexedPieces
{
    class Pieces
    {
        public void Snippets2008()
        {
            // Visual C# 2008 and earlier.
            var excelApp = new Excel.Application();
            // . . .
            Excel.Range targetRange = excelApp.get_Range("A1", Type.Missing);

        }

        public void Snippets2010()
        {
            // Visual C# 2010.
            var excelApp = new Excel.Application();
            // . . .
            Excel.Range targetRange = excelApp.Range["A1"];

            // Visual C# 2010.
            targetRange.Value = "Name";
        }
    }
}
```
The previous example also uses the optional arguments feature, which enables you to omit `Type.Missing`.

Indexed properties enable you to write the following code.

```csharp
﻿// Snippets 5000 Note:  
// The container used for building our samples doesn't include the Office assemblies.
// This sample will generate a few errors in the CI build. Those are expected,
// so the build passes.
//
// If you update this sample, make sure to build it locally.
// Then, make sure no new errors are added.

// You must add a reference to Microsoft.Office.Interop.Excel to run
// this example.
using System;
using Excel = Microsoft.Office.Interop.Excel;

namespace IndexedProperties
{
    class Program
    {
        static void Main(string[] args)
        {
            CSharp2010();
        }

        static void CSharp2010()
        {
            var excelApp = new Excel.Application();
            excelApp.Workbooks.Add();
            excelApp.Visible = true;

            Excel.Range targetRange = excelApp.Range["A1"];
            targetRange.Value = "Name";
        }

        static void CSharp2008()
        {
            var excelApp = new Excel.Application();
            excelApp.Workbooks.Add(Type.Missing);
            excelApp.Visible = true;

            Excel.Range targetRange = excelApp.get_Range("A1", Type.Missing);
            targetRange.set_Value(Type.Missing, "Name");
            // Or
            //targetRange.Value2 = "Name";
        }
    }
}

namespace IndexedPieces
{
    class Pieces
    {
        public void Snippets2008()
        {
            // Visual C# 2008 and earlier.
            var excelApp = new Excel.Application();
            // . . .
            Excel.Range targetRange = excelApp.get_Range("A1", Type.Missing);

        }

        public void Snippets2010()
        {
            // Visual C# 2010.
            var excelApp = new Excel.Application();
            // . . .
            Excel.Range targetRange = excelApp.Range["A1"];

            // Visual C# 2010.
            targetRange.Value = "Name";
        }
    }
}
```
You can't create indexed properties of your own. The feature only supports consumption of existing indexed properties.

## Example

The following code shows a complete example. For more information about how to set up a project that accesses the Office API, see How to access Office interop objects by using C# features.

```csharp
﻿// Snippets 5000 Note:  
// The container used for building our samples doesn't include the Office assemblies.
// This sample will generate a few errors in the CI build. Those are expected,
// so the build passes.
//
// If you update this sample, make sure to build it locally.
// Then, make sure no new errors are added.

// You must add a reference to Microsoft.Office.Interop.Excel to run
// this example.
using System;
using Excel = Microsoft.Office.Interop.Excel;

namespace IndexedProperties
{
    class Program
    {
        static void Main(string[] args)
        {
            CSharp2010();
        }

        static void CSharp2010()
        {
            var excelApp = new Excel.Application();
            excelApp.Workbooks.Add();
            excelApp.Visible = true;

            Excel.Range targetRange = excelApp.Range["A1"];
            targetRange.Value = "Name";
        }

        static void CSharp2008()
        {
            var excelApp = new Excel.Application();
            excelApp.Workbooks.Add(Type.Missing);
            excelApp.Visible = true;

            Excel.Range targetRange = excelApp.get_Range("A1", Type.Missing);
            targetRange.set_Value(Type.Missing, "Name");
            // Or
            //targetRange.Value2 = "Name";
        }
    }
}

namespace IndexedPieces
{
    class Pieces
    {
        public void Snippets2008()
        {
            // Visual C# 2008 and earlier.
            var excelApp = new Excel.Application();
            // . . .
            Excel.Range targetRange = excelApp.get_Range("A1", Type.Missing);

        }

        public void Snippets2010()
        {
            // Visual C# 2010.
            var excelApp = new Excel.Application();
            // . . .
            Excel.Range targetRange = excelApp.Range["A1"];

            // Visual C# 2010.
            targetRange.Value = "Name";
        }
    }
}
```
## See also

- Named and Optional Arguments
- dynamic
- Using Type dynamic
