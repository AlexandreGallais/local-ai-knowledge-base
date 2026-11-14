---
title: "Databinding with WPF - EF6 (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/databinding/wpf.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Databinding with WPF

> **Important:**
> **This document is valid for WPF on the .NET Framework only**
>
> This document describes databinding for WPF on the .NET Framework. For new .NET projects, we recommend you use EF Core instead of Entity Framework 6. The documentation for databinding in EF Core is here: Getting Started with WPF.

This step-by-step walkthrough shows how to bind POCO types to WPF controls in a “master-detail" form. The application uses the Entity Framework APIs to populate objects with data from the database, track changes, and persist data to the database.

The model defines two types that participate in one-to-many relationship: **Category** (principal\\master) and **Product** (dependent\\detail). Then, the Visual Studio tools are used to bind the types defined in the model to the WPF controls. The WPF data-binding framework enables navigation between related objects: selecting rows in the master view causes the detail view to update with the corresponding child data.

The screen shots and code listings in this walkthrough are taken from Visual Studio 2013 but you can complete this walkthrough with Visual Studio 2012 or Visual Studio 2010.

## Use the 'Object' Option for Creating WPF Data Sources

With previous version of Entity Framework we used to recommend using the **Database** option when creating a new Data Source based on a model created with the EF Designer. This was because the designer would generate a context that derived from ObjectContext and entity classes that derived from EntityObject. Using the Database option would help you write the best code for interacting with this API surface.

The EF Designers for Visual Studio 2012 and Visual Studio 2013 generate a context that derives from DbContext together with simple POCO entity classes. With Visual Studio 2010 we recommend swapping to a code generation template that uses DbContext as described later in this walkthrough.

When using the DbContext API surface you should use the **Object** option when creating a new Data Source, as shown in this walkthrough.

If needed, you can revert to ObjectContext based code generation for models created with the EF Designer.

## Pre-Requisites

You need to have Visual Studio 2013, Visual Studio 2012 or Visual Studio 2010 installed to complete this walkthrough.

If you are using Visual Studio 2010, you also have to install NuGet. For more information, see Installing NuGet.  

## Create the Application

- Open Visual Studio
- **File -> New -> Project….**
- Select **Windows** in the left pane and **WPFApplication** in the right pane
- Enter **WPFwithEFSample** as the name
- Select **OK**

## Install the Entity Framework NuGet package

- In Solution Explorer, right-click on the **WinFormswithEFSample** project
- Select **Manage NuGet Packages…**
- In the Manage NuGet Packages dialog, Select the **Online** tab and choose the **EntityFramework** package
- Click **Install**
    >**Note:**
    > In addition to the EntityFramework assembly a reference to System.ComponentModel.DataAnnotations is also added. If the project has a reference to System.Data.Entity, then it will be removed when the EntityFramework package is installed. The System.Data.Entity assembly is no longer used for Entity Framework 6 applications.

## Define a Model

In this walkthrough you can chose to implement a model using Code First or the EF Designer. Complete one of the two following sections.

### Option 1: Define a Model using Code First

This section shows how to create a model and its associated database using Code First. Skip to the next section (**Option 2: Define a model using Database First)** if you would rather use Database First to reverse engineer your model from a database using the EF designer

When using Code First development you usually begin by writing .NET Framework classes that define your conceptual (domain) model.

- Add a new class to the **WPFwithEFSample:**
  - Right-click on the project name
  - Select **Add**, then **New Item**
  - Select **Class** and enter **Product** for the class name
- Replace the **Product** class definition with the following code:

```csharp
    namespace WPFwithEFSample
    {
        public class Product
        {
            public int ProductId { get; set; }
            public string Name { get; set; }

            public int CategoryId { get; set; }
            public virtual Category Category { get; set; }
        }
    }
```

- Add a **Category** class with the following definition:

```csharp
    using System.Collections.ObjectModel;

    namespace WPFwithEFSample
    {
        public class Category
        {
            public Category()
            {
                this.Products = new ObservableCollection<Product>();
            }

            public int CategoryId { get; set; }
            public string Name { get; set; }

            public virtual ObservableCollection<Product> Products { get; private set; }
        }
    }
```

The **Products** property on the **Category** class and **Category** property on the **Product** class are navigation properties. In Entity Framework, navigation properties provide a way to navigate a relationship between two entity types.

In addition to defining entities, you need to define a class that derives from DbContext and exposes DbSet<TEntity> properties. The DbSet<TEntity> properties let the context know which types you want to include in the model.

An instance of the DbContext derived type manages the entity objects during run time, which includes populating objects with data from a database, change tracking, and persisting data to the database.

- Add a new **ProductContext** class to the project with the following definition:

```csharp
    using System.Data.Entity;

    namespace WPFwithEFSample
    {
        public class ProductContext : DbContext
        {
            public DbSet<Category> Categories { get; set; }
            public DbSet<Product> Products { get; set; }
        }
    }
```

Compile the project.

### Option 2: Define a model using Database First

This section shows how to use Database First to reverse engineer your model from a database using the EF designer. If you completed the previous section (**Option 1: Define a model using Code First)**, then skip this section and go straight to the **Lazy Loading** section.

#### Create an Existing Database

Typically when you are targeting an existing database it will already be created, but for this walkthrough we need to create a database to access.

The database server that is installed with Visual Studio is different depending on the version of Visual Studio you have installed:

- If you are using Visual Studio 2010 you'll be creating a SQL Express database.
- If you are using Visual Studio 2012 then you'll be creating a LocalDB database.

Let's go ahead and generate the database.

- **View -> Server Explorer**
- Right click on **Data Connections -> Add Connection…**
- If you haven’t connected to a database from Server Explorer before you’ll need to select Microsoft SQL Server as the data source

- Connect to either LocalDB or SQL Express, depending on which one you have installed, and enter **Products** as the database name

- Select **OK** and you will be asked if you want to create a new database, select **Yes**

- The new database will now appear in Server Explorer, right-click on it and select **New Query**
- Copy the following SQL into the new query, then right-click on the query and select **Execute**

```sql
    CREATE TABLE [dbo].[Categories] (
        [CategoryId] [int] NOT NULL IDENTITY,
        [Name] [nvarchar](max),
        CONSTRAINT [PK_dbo.Categories] PRIMARY KEY ([CategoryId])
    )

    CREATE TABLE [dbo].[Products] (
        [ProductId] [int] NOT NULL IDENTITY,
        [Name] [nvarchar](max),
        [CategoryId] [int] NOT NULL,
        CONSTRAINT [PK_dbo.Products] PRIMARY KEY ([ProductId])
    )

    CREATE INDEX [IX_CategoryId] ON [dbo].[Products]([CategoryId])

    ALTER TABLE [dbo].[Products] ADD CONSTRAINT [FK_dbo.Products_dbo.Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories] ([CategoryId]) ON DELETE CASCADE
```

#### Reverse Engineer Model

We’re going to make use of Entity Framework Designer, which is included as part of Visual Studio, to create our model.

- **Project -> Add New Item…**
- Select **Data** from the left menu and then **ADO.NET Entity Data Model**
- Enter **ProductModel** as the name and click **OK**
- This launches the **Entity Data Model Wizard**
- Select **Generate from Database** and click **Next**

- Select the connection to the database you created in the first section, enter **ProductContext** as the name of the connection string and click **Next**

- Click the checkbox next to ‘Tables’ to import all tables and click ‘Finish’

Once the reverse engineer process completes the new model is added to your project and opened up for you to view in the Entity Framework Designer. An App.config file has also been added to your project with the connection details for the database.

#### Additional Steps in Visual Studio 2010

If you are working in Visual Studio 2010 then you will need to update the EF designer to use EF6 code generation.

- Right-click on an empty spot of your model in the EF Designer and select **Add Code Generation Item…**
- Select **Online Templates** from the left menu and search for **DbContext**
- Select the **EF 6.x DbContext Generator for C\#,** enter **ProductsModel** as the name and click Add

#### Updating code generation for data binding

EF generates code from your model using T4 templates. The templates shipped with Visual Studio or downloaded from the Visual Studio gallery are intended for general purpose use. This means that the entities generated from these templates have simple ICollection<T> properties. However, when doing data binding using WPF it is desirable to use **ObservableCollection** for collection properties so that WPF can keep track of changes made to the collections. To this end we will to modify the templates to use ObservableCollection.

- Open the **Solution Explorer** and find **ProductModel.edmx** file
- Find the **ProductModel.tt** file which will be nested under the ProductModel.edmx file

- Double-click on the ProductModel.tt file to open it in the Visual Studio editor
- Find and replace the two occurrences of “**ICollection**” with “**ObservableCollection**”. These are located approximately at lines 296 and 484.
- Find and replace the first occurrence of “**HashSet**” with “**ObservableCollection**”. This occurrence is located approximately at line 50. **Do not** replace the second occurrence of HashSet found later in the code.
- Find and replace the only occurrence of “**System.Collections.Generic**” with “**System.Collections.ObjectModel**”. This is located approximately at line 424.
- Save the ProductModel.tt file. This should cause the code for entities to be regenerated. If the code does not regenerate automatically, then right click on ProductModel.tt and choose “Run Custom Tool”.

If you now open the Category.cs file (which is nested under ProductModel.tt) then you should see that the Products collection has the type **ObservableCollection<Product>**.

Compile the project.

## Lazy Loading

The **Products** property on the **Category** class and **Category** property on the **Product** class are navigation properties. In Entity Framework, navigation properties provide a way to navigate a relationship between two entity types.

EF gives you an option of loading related entities from the database automatically the first time you access the navigation property. With this type of loading (called lazy loading), be aware that the first time you access each navigation property a separate query will be executed against the database if the contents are not already in the context.

When using POCO entity types, EF achieves lazy loading by creating instances of derived proxy types during runtime and then overriding virtual properties in your classes to add the loading hook. To get lazy loading of related objects, you must declare navigation property getters as **public** and **virtual** (**Overridable** in Visual Basic), and your class must not be **sealed** (**NotOverridable** in Visual Basic). When using Database First navigation properties are automatically made virtual to enable lazy loading. In the Code First section we chose to make the navigation properties virtual for the same reason.
