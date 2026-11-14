---
title: "Databinding with WPF - EF6 (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/databinding/wpf.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Databinding with WPF - EF6 (part 2 of 2)

## Bind Object to Controls

Add the classes that are defined in the model as data sources for this WPF application.

- Double-click **MainWindow.xaml** in Solution Explorer to open the main form
- From the main menu, select **Project -> Add New Data Source …**
    (in Visual Studio 2010, you need to select **Data -> Add New Data Source…**)
- In the Choose a Data Source Typewindow, select **Object** and click **Next**
- In the Select the Data Objects dialog, unfold the **WPFwithEFSample** two times and select **Category**
    *There is no need to select the **Product** data source, because we will get to it through the **Product**’s property on the **Category** data source*

- Click **Finish.**
- The Data Sources window is opened next to the MainWindow.xaml window
    *If the Data Sources window is not showing up, select **View -> Other Windows-> Data Sources***
- Press the pin icon, so the Data Sources window does not auto hide. You may need to hit the refresh button if the window was already visible.

- Select the **Category** data source and drag it on the form.

The following happened when we dragged this source:

- The **categoryViewSource** resource and the **categoryDataGrid** control were added to XAML
- The DataContext property on the parent Grid element was set to "{StaticResource **categoryViewSource** }". The **categoryViewSource** resource serves as a binding source for the outer\\parent Grid element. The inner Grid elements then inherit the DataContext value from the parent Grid (the categoryDataGrid’s ItemsSource property is set to "{Binding}")

```xml
    <Window.Resources>
        <CollectionViewSource x:Key="categoryViewSource"
                                d:DesignSource="{d:DesignInstance {x:Type local:Category}, CreateList=True}"/>
    </Window.Resources>
    <Grid DataContext="{StaticResource categoryViewSource}">
        <DataGrid x:Name="categoryDataGrid" AutoGenerateColumns="False" EnableRowVirtualization="True"
                    ItemsSource="{Binding}" Margin="13,13,43,191"
                    RowDetailsVisibilityMode="VisibleWhenSelected">
            <DataGrid.Columns>
                <DataGridTextColumn x:Name="categoryIdColumn" Binding="{Binding CategoryId}"
                                    Header="Category Id" Width="SizeToHeader"/>
                <DataGridTextColumn x:Name="nameColumn" Binding="{Binding Name}"
                                    Header="Name" Width="SizeToHeader"/>
            </DataGrid.Columns>
        </DataGrid>
    </Grid>
```

## Adding a Details Grid

Now that we have a grid to display Categories let's add a details grid to display the associated Products.

- Select the **Products** property from under the **Category** data source and drag it on the form.
  - The **categoryProductsViewSource** resource and **productDataGrid** grid are added to XAML
  - The binding path for this resource is set to Products
  - WPF data-binding framework ensures that only Products related to the selected Category show up in **productDataGrid**
- From the Toolbox, drag **Button** on to the form. Set the **Name** property to **buttonSave** and the **Content** property to **Save**.

The form should look similar to this:

## Add Code that Handles Data Interaction

It's time to add some event handlers to the main window.

- In the XAML window, click on the **<Window** element, this selects the main window
- In the **Properties** window choose **Events** at the top right, then double-click the text box to right of the **Loaded** label

- Also add the **Click** event for the **Save** button by double-clicking the Save button in the designer.

This brings you to the code behind for the form, we'll now edit the code to use the ProductContext to perform data access. Update the code for the MainWindow as shown below.

The code declares a long-running instance of **ProductContext**. The **ProductContext** object is used to query and save data to the database. The **Dispose()** on the **ProductContext** instance is then called from the overridden **OnClosing** method. The code comments provide details about what the code does.

```csharp
    using System.Data.Entity;
    using System.Linq;
    using System.Windows;

    namespace WPFwithEFSample
    {
        public partial class MainWindow : Window
        {
            private ProductContext _context = new ProductContext();
            public MainWindow()
            {
                InitializeComponent();
            }

            private void Window_Loaded(object sender, RoutedEventArgs e)
            {
                System.Windows.Data.CollectionViewSource categoryViewSource =
                    ((System.Windows.Data.CollectionViewSource)(this.FindResource("categoryViewSource")));

                // Load is an extension method on IQueryable,
                // defined in the System.Data.Entity namespace.
                // This method enumerates the results of the query,
                // similar to ToList but without creating a list.
                // When used with Linq to Entities this method
                // creates entity objects and adds them to the context.
                _context.Categories.Load();

                // After the data is loaded call the DbSet<T>.Local property
                // to use the DbSet<T> as a binding source.
                categoryViewSource.Source = _context.Categories.Local;
            }

            private void buttonSave_Click(object sender, RoutedEventArgs e)
            {
                // When you delete an object from the related entities collection
                // (in this case Products), the Entity Framework doesn’t mark
                // these child entities as deleted.
                // Instead, it removes the relationship between the parent and the child
                // by setting the parent reference to null.
                // So we manually have to delete the products
                // that have a Category reference set to null.

                // The following code uses LINQ to Objects
                // against the Local collection of Products.
                // The ToList call is required because otherwise the collection will be modified
                // by the Remove call while it is being enumerated.
                // In most other situations you can use LINQ to Objects directly
                // against the Local property without using ToList first.
                foreach (var product in _context.Products.Local.ToList())
                {
                    if (product.Category == null)
                    {
                        _context.Products.Remove(product);
                    }
                }

                _context.SaveChanges();
                // Refresh the grids so the database generated values show up.
                this.categoryDataGrid.Items.Refresh();
                this.productsDataGrid.Items.Refresh();
            }

            protected override void OnClosing(System.ComponentModel.CancelEventArgs e)
            {
                base.OnClosing(e);
                this._context.Dispose();
            }
        }

    }
```

## Test the WPF Application

- Compile and run the application. If you used Code First, then you will see that a **WPFwithEFSample.ProductContext** database is created for you.
- Enter a category name in the top grid and product names in the bottom grid
    *Do not enter anything in ID columns, because the primary key is generated by the database*

- Press the **Save** button to save the data to the database

After the call to DbContext’s **SaveChanges()**, the IDs are populated with the database generated values. Because we called **Refresh()** after **SaveChanges()** the **DataGrid** controls are updated with the new values as well.

## Additional Resources

To learn more about data binding to collections using WPF, see this topic in the WPF documentation.
