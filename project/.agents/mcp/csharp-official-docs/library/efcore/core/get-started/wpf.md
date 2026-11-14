---
title: "Get Started with WPF - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/get-started/wpf.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Getting Started with WPF

This step-by-step walkthrough shows how to bind POCO types to WPF controls in a "main-detail" form. The application uses the Entity Framework APIs to populate objects with data from the database, track changes, and persist data to the database.

The model defines two types that participate in one-to-many relationship: **Category** (principal\\main) and **Product** (dependent\\detail). The WPF data-binding framework enables navigation between related objects: selecting rows in the master view causes the detail view to update with the corresponding child data.

The screen shots and code listings in this walkthrough are taken from Visual Studio 2019 16.6.5.

> **Tip:**
> You can view this article's sample on GitHub.

## Pre-requisites

You need to have Visual Studio 2019 16.3 or later installed with the **.NET desktop workload** selected to complete this walkthrough. For more information about installing the latest version of Visual Studio, see Install Visual Studio.

## Create the application

1. Open Visual Studio
2. On the start window, choose **Create new project**.
3. Search for "WPF," choose **WPF App (.NET)** and then choose **Next**.
4. At the next screen, give the project a name, for example, **GetStartedWPF**, and choose **Create.**

## Install the Entity Framework NuGet packages

1. Right-click on the solution and choose **Manage NuGet Packages for Solution...**

1. Type `entityframeworkcore.sqlite` in the search box.
1. Select the **Microsoft.EntityFrameworkCore.Sqlite** package.
1. Check the project in the right pane and click **Install**

1. Repeat the steps to search for `entityframeworkcore.proxies` and install **Microsoft.EntityFrameworkCore.Proxies**.

> **Note:**
> When you installed the Sqlite package, it automatically pulled down the related **Microsoft.EntityFrameworkCore** base package. The **Microsoft.EntityFrameworkCore.Proxies** package provides support for "lazy-loading" data. This means when you have entities with child entities, only the parents are fetched on the initial load. The proxies detect when an attempt to access the child entities is made and automatically loads them on demand.

## Define a model

In this walkthrough you will implement a model using "code first." This means that EF Core will create the database tables and schema based on the C# classes you define.

Add a new class. Give it the name: `Product.cs` and populate it like this:

**`Product.cs`**

```csharp
﻿namespace GetStartedWPF
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

Next, add a class named `Category.cs` and populate it with the following code:

**`Category.cs`**

```csharp
﻿using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace GetStartedWPF
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Product>
            Products
        { get; private set; } =
            new ObservableCollection<Product>();
    }
}
```

The **Products** property on the **Category** class and **Category** property on the **Product** class are navigation properties. In Entity Framework, navigation properties provide a way to navigate a relationship between two entity types.

In addition to defining entities, you need to define a class that derives from DbContext and exposes DbSet<TEntity> properties. The DbSet<TEntity> properties let the context know which types you want to include in the model.

An instance of the DbContext derived type manages the entity objects during run time, which includes populating objects with data from a database, change tracking, and persisting data to the database.

Add a new `ProductContext.cs` class to the project with the following definition:

**`ProductContext.cs`**

```csharp
﻿using Microsoft.EntityFrameworkCore;

namespace GetStartedWPF
{
    public class ProductContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnConfiguring(
            DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(
                "Data Source=products.db");
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
```

* The `DbSet` informs EF Core what C# entities should be mapped to the database.
* There are a variety of ways to configure the EF Core `DbContext`. You can read about them in: Configuring a DbContext.
* This example uses the `OnConfiguring` override to specify a Sqlite data file.
* The `UseLazyLoadingProxies` call tells EF Core to implement lazy-loading, so child entities are automatically loaded when accessed from the parent.

Press **CTRL+SHIFT+B** or navigate to **Build > Build Solution** to compile the project.

> **Tip:**
> Learn about the different was to keep your database and EF Core models in sync: Managing Database Schemas.

## Lazy loading

The **Products** property on the **Category** class and **Category** property on the **Product** class are navigation properties. In Entity Framework Core, navigation properties provide a way to navigate a relationship between two entity types.

EF Core gives you an option of loading related entities from the database automatically the first time you access the navigation property. With this type of loading (called lazy loading), be aware that the first time you access each navigation property a separate query will be executed against the database if the contents are not already in the context.

When using "Plain Old C# Object" (POCO) entity types, EF Core achieves lazy loading by creating instances of derived proxy types during runtime and then overriding virtual properties in your classes to add the loading hook. To get lazy loading of related objects, you must declare navigation property getters as **public** and **virtual** (**Overridable** in Visual Basic), and your class must not be **sealed** (**NotOverridable** in Visual Basic). When using Database First, navigation properties are automatically made virtual to enable lazy loading.

## Bind object to controls

Add the classes that are defined in the model as data sources for this WPF application.

1. Double-click **MainWindow.xaml** in Solution Explorer to open the main form
1. Choose the **XAML** tab to edit the XAML.
1. Immediately after the opening `Window` tag, add the following sources to connect to the EF Core entities.

    ```xaml
<Window x:Class="GetStartedWPF.MainWindow"
       xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
       xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
       xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
       xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
       xmlns:local="clr-namespace:GetStartedWPF"
       mc:Ignorable="d"
       Title="MainWindow" Height="450" Width="800" Loaded="Window_Loaded">
   <Window.Resources>
       <CollectionViewSource x:Key="categoryViewSource"/>
       <CollectionViewSource x:Key="categoryProductsViewSource" 
                             Source="{Binding Products, Source={StaticResource categoryViewSource}}"/>
   </Window.Resources>
```

1. This sets up source for the "parent" categories, and second source for the "detail" products.
1. Next, add the following markup to your XAML after the opening `Grid` tag.

    ```xaml
<DataGrid x:Name="categoryDataGrid" AutoGenerateColumns="False" 
          EnableRowVirtualization="True" 
          ItemsSource="{Binding Source={StaticResource categoryViewSource}}" 
          Margin="13,13,43,229" RowDetailsVisibilityMode="VisibleWhenSelected">
    <DataGrid.Columns>
        <DataGridTextColumn Binding="{Binding CategoryId}"
                            Header="Category Id" Width="SizeToHeader"
                            IsReadOnly="True"/>
        <DataGridTextColumn Binding="{Binding Name}" Header="Name" 
                            Width="*"/>
    </DataGrid.Columns>
</DataGrid>
```

1. Note that the `CategoryId` is set to `ReadOnly` because it is assigned by the database and cannot be changed.

## Adding a details grid

Now that the grid exists to display categories, the details grid can be added to show products. Add this inside the
`Grid` element, after the categories `DataGrid` element.

**`MainWindow.xaml`**

```xaml
<DataGrid x:Name="productsDataGrid" AutoGenerateColumns="False" 
          EnableRowVirtualization="True" 
          ItemsSource="{Binding Source={StaticResource categoryProductsViewSource}}" 
          Margin="13,205,43,108" RowDetailsVisibilityMode="VisibleWhenSelected" 
          RenderTransformOrigin="0.488,0.251">
    <DataGrid.Columns>
        <DataGridTextColumn Binding="{Binding CategoryId}" 
                            Header="Category Id" Width="SizeToHeader"
                            IsReadOnly="True"/>
        <DataGridTextColumn Binding="{Binding ProductId}" Header="Product Id" 
                            Width="SizeToHeader" IsReadOnly="True"/>
        <DataGridTextColumn Binding="{Binding Name}" Header="Name" Width="*"/>
    </DataGrid.Columns>
</DataGrid>
```

Finally, add a `Save` button and wire in the click event to `Button_Click`.

```xaml
<Button Content="Save" HorizontalAlignment="Center" Margin="0,240,0,0" 
        Click="Button_Click" Height="20" Width="123"/>
```

Your design view should look like this:

## Add code that handles data interaction

It's time to add some event handlers to the main window.

1. In the XAML window, click on the **<Window>** element, to select the main window.
1. In the **Properties** window choose **Events** at the top right, then double-click the text box to right of the **Loaded** label.

This brings you to the code behind for the form, we'll now edit the code to use the `ProductContext` to perform data access. Update the code as shown below.

The code declares a long-running instance of `ProductContext`. The `ProductContext` object is used to query and save data to the database. The `Dispose()` method on the `ProductContext` instance is then called from the overridden `OnClosing` method. The code comments explain what each step does.

**`MainWindow.xaml.cs`**

```csharp
﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Windows;
using System.Windows.Data;

namespace GetStartedWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly ProductContext _context =
            new ProductContext();

        private CollectionViewSource categoryViewSource;

        public MainWindow()
        {
            InitializeComponent();
            categoryViewSource =
                (CollectionViewSource)FindResource(nameof(categoryViewSource));
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            // this is for demo purposes only, to make it easier
            // to get up and running
            _context.Database.EnsureCreated();

            // load the entities into EF Core
            _context.Categories.Load();

            // bind to the source
            categoryViewSource.Source =
                _context.Categories.Local.ToObservableCollection();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            // all changes are automatically tracked, including
            // deletes!
            _context.SaveChanges();

            // this forces the grid to refresh to latest values
            categoryDataGrid.Items.Refresh();
            productsDataGrid.Items.Refresh();
        }

        protected override void OnClosing(CancelEventArgs e)
        {
            // clean up database connections
            _context.Dispose();
            base.OnClosing(e);
        }
    }
}
```

> **Note:**
> The code uses a call to `EnsureCreated()` to build the database on the first run. This is acceptable for demos, but in production apps you should look at migrations to manage your schema. The code also executes synchronously because it uses a local SQLite database. For production scenarios that typically involve a remote server, consider using the asynchronous versions of the `Load` and `SaveChanges` methods.

## Test the WPF application

Compile and run the application by pressing **F5** or choosing **Debug > Start Debugging**. The database should be automatically created with a file named `products.db`. Enter a category name and hit enter, then add products to the lower grid. Click save and watch the grid refresh with the database provided ids. Highlight a row and hit **Delete** to remove the row. The entity will be deleted when you click **Save**.

## Property change notification

This example relies on four steps to synchronize the entities with the UI.

1. The initial call `_context.Categories.Load()` loads the categories data.
1. The lazy-loading proxies load the dependent products data.
1. EF Core's built-in change tracking makes the necessary modifications to entities, including insertions and deletions, when `_context.SaveChanges()` is called.
1. The calls to `DataGridView.Items.Refresh()` force a reload with the newly generated ids.

This works for our getting started sample, but you may require additional code for other scenarios. WPF controls render the UI by reading the fields and properties on your entities. When you edit a value in the user interface (UI), that value is passed to your entity. When you change the value of a property directly on your entity, such as loading it from the database, WPF will not immediately reflect the changes in the UI. The rendering engine must be notified of the changes. The project did this by manually calling `Refresh()`. An easy way to automate this notification is by implementing the INotifyPropertyChanged interface. WPF components will automatically detect the interface and register for change events. The entity is responsible for raising these events.

> **Tip:**
> To learn more about how to handle changes, read: How to implement property change notification.

## Next steps

Learn more about Configuring a DbContext.
