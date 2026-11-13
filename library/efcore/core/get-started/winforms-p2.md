---
title: "Get Started with Windows Forms - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/get-started/winforms.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Get Started with Windows Forms - EF Core (part 2 of 2)

## Populating the Products view

If the application is started at this point, then it should look something like this:

Notice that the categories have been loaded from the database, but the products table remains empty. Also, the **Save** button does not work.

To populate the products table, EF Core needs to load products from the database for the selected category. To achieve this:

1. In the designer for the main form, select the `DataGridView` for categories.
2. In the **Properties** for the `DataGridView`, choose the events (the lightning button), and double click the **SelectionChanged** event.

   This will create stub in the main form code for an event to be fired whenever the category selection changes.

3. Fill in the code for the event:

```csharp
private void dataGridViewCategories_SelectionChanged(object sender, EventArgs e)
{
    if (this.dbContext != null)
    {
        var category = (Category)this.dataGridViewCategories.CurrentRow.DataBoundItem;

        if (category != null)
        {
            this.dbContext.Entry(category).Collection(e => e.Products).Load();
        }
    }
}
```

In this code, if there is an active (non-null) `DbContext` session, then we obtain the `Category` instance bound to the currently selected row of the `DataViewGrid`. (This may be `null` if the final row in the view is selected, which is used to create new categories.) If there is a selected category, then the `DbContext` is instructed to load the products associated with that category. This is done by:

- Getting an `EntityEntry` for the `Category` instance (`dbContext.Entry(category)`)
- Letting EF Core know that we want to operate on the `Products` collection navigation of that `Category` (`.Collection(e => e.Products)`)
- And finally telling EF Core that we want to load that collection of products from the database (`.Load();`)

> **Tip:**
> When `Load` is called, EF Core will only access the database to load the products if they have not already been loaded.

If the application is now run again, then it should load the appropriate products whenever a category is selected:

## Saving changes

Finally, the **Save** button can be connected to EF Core so that any changes made to the products and categories are saved to the database.

1. In the designer for the main form, select the **Save** button.
2. In the **Properties** for the `Button`, choose the events (the lightning button), and double click the **Click** event.

3. Fill in the code for the event:

```csharp
private void buttonSave_Click(object sender, EventArgs e)
{
    this.dbContext!.SaveChanges();

    this.dataGridViewCategories.Refresh();
    this.dataGridViewProducts.Refresh();
}
```

This code calls `SaveChanges` on the `DbContext`, which saves any changes made to the SQLite database. If no changes were made, then this is a no-op, and no database call is made. After saving, the `DataGridView` controls are refreshed. This is because EF Core reads generated primary key values for any new products and categories from the database. Calling `Refresh` updates the display with these generated values.

## The final application

Here is the full code for the main form:

```csharp
using Microsoft.EntityFrameworkCore;

namespace GetStartedWinForms
{
    public partial class MainForm : Form
    {
        private ProductsContext? dbContext;

        public MainForm()
        {
            InitializeComponent();
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);

            this.dbContext = new ProductsContext();

            // Uncomment the line below to start fresh with a new database.
            // this.dbContext.Database.EnsureDeleted();
            this.dbContext.Database.EnsureCreated();

            this.dbContext.Categories.Load();

            this.categoryBindingSource.DataSource = dbContext.Categories.Local.ToBindingList();
        }

        protected override void OnFormClosing(FormClosingEventArgs e)
        {
            base.OnFormClosing(e);

            this.dbContext?.Dispose();
            this.dbContext = null;
        }

        private void dataGridViewCategories_SelectionChanged(object sender, EventArgs e)
        {
            if (this.dbContext != null)
            {
                var category = (Category)this.dataGridViewCategories.CurrentRow.DataBoundItem;

                if (category != null)
                {
                    this.dbContext.Entry(category).Collection(e => e.Products).Load();
                }
            }
        }

        private void buttonSave_Click(object sender, EventArgs e)
        {
            this.dbContext!.SaveChanges();

            this.dataGridViewCategories.Refresh();
            this.dataGridViewProducts.Refresh();
        }
    }
}
```

The application can now be run, and products and categories can be added, deleted, and edited. Notice that if the **Save** button is clicked before closing the application, then any changes made will be stored in the database and re-loaded when the application is re-started. If **Save** is not clicked, then any changes are lost when the application is re-started.

> **Tip:**
> A new category or product can be added to a `DataViewControl` using the empty row at the bottom of the control. A row can be deleted by selecting it and pressing the **Del** key.

**Before saving**

**After saving**

Notice that the primary key values for the added category and products are populated when **Save** is clicked.

## Learn more

- Configuring a DbContext
- Creating and configuring a model
- Managing Database Schemas
- Querying Data
- Change Tracking
- Saving Data
- Databinding with the OOP Windows Forms Designer
