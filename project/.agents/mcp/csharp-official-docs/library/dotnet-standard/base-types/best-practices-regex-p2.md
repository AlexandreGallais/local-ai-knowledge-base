---
title: "Best Practices for Regular Expressions in .NET (part 2 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/best-practices-regex.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Best Practices for Regular Expressions in .NET (part 2 of 5)

## Handle object instantiation appropriately

At the heart of .NET's regular expression object model is the `System.Text.RegularExpressions.Regex` class, which represents the regular expression engine. Often, the single greatest factor that affects regular expression performance is the way in which the `System.Text.RegularExpressions.Regex` engine is used. Defining a regular expression involves tightly coupling the regular expression engine with a regular expression pattern. That coupling process is expensive, whether it involves instantiating a `System.Text.RegularExpressions.Regex` object by passing its constructor a regular expression pattern or calling a static method by passing it the regular expression pattern and the string to be analyzed.

> **Note:**
> For a detailed discussion of the performance implications of using interpreted and compiled regular expressions, see the blog post Optimizing Regular Expression Performance, Part II: Taking Charge of Backtracking.

You can couple the regular expression engine with a particular regular expression pattern and then use the engine to match the text in several ways:

- You can call a static pattern-matching method, such as `System.Text.RegularExpressions.Regex.Match(System.String,System.String)`. This method doesn't require instantiation of a regular expression object.

- You can instantiate a `System.Text.RegularExpressions.Regex` object and call an instance pattern-matching method of an interpreted regular expression, which is the default method for binding the regular expression engine to a regular expression pattern. It results when a `System.Text.RegularExpressions.Regex` object is instantiated without an `options` argument that includes the `System.Text.RegularExpressions.RegexOptions.Compiled` flag.

- You can instantiate a `System.Text.RegularExpressions.Regex` object and call an instance pattern-matching method of a source-generated regular expression. This technique is recommended in most cases. To do so, place the `System.Text.RegularExpressions.GeneratedRegexAttribute` attribute on a partial method that returns `Regex`.

- You can instantiate a `System.Text.RegularExpressions.Regex` object and call an instance pattern-matching method of a compiled regular expression. Regular expression objects represent compiled patterns when a `System.Text.RegularExpressions.Regex` object is instantiated with an `options` argument that includes the `System.Text.RegularExpressions.RegexOptions.Compiled` flag.

The particular way in which you call regular expression matching methods can affect your application's performance. The following sections discuss when to use static method calls, source-generated regular expressions, interpreted regular expressions, and compiled regular expressions to improve your application's performance.

> **Important:**
> The form of the method call (static, interpreted, source-generated, compiled) affects performance if the same regular expression is used repeatedly in method calls, or if an application makes extensive use of regular expression objects.

### Static regular expressions

Static regular expression methods are recommended as an alternative to repeatedly instantiating a regular expression object with the same regular expression. Unlike regular expression patterns used by regular expression objects, either the operation codes (opcodes) or the compiled common intermediate language (CIL) from patterns used in static method calls is cached internally by the regular expression engine.

For example, an event handler frequently calls another method to validate user input. This example is reflected in the following code, in which a `System.Windows.Forms.Button` control's `System.Windows.Forms.Control.Click` event is used to call a method named `IsValidCurrency`, which checks whether the user has entered a currency symbol followed by at least one decimal digit.

```csharp
﻿using System.Windows.Forms;
using System.Drawing;
using System;
using System.Text.RegularExpressions;

public class RegexLib
{
   public static bool IsValidCurrency(string currencyValue)
   {
      string pattern = @"\p{Sc}+\s*\d+";
      Regex currencyRegex = new Regex(pattern);
      return currencyRegex.IsMatch(currencyValue);
   }
}

public class CurrencyForm : Form
{
   Button OKButton;
   TextBox sourceCurrency;
   Label status;

   public CurrencyForm()
   {
      sourceCurrency = new TextBox();
      sourceCurrency.Location = new Point(25, 50);
      sourceCurrency.Size = new Size(100, 25);
      sourceCurrency.Text = String.Empty;
      sourceCurrency.TextChanged += new System.EventHandler(this.sourceCurrency_TextChanged);
      this.Controls.Add(sourceCurrency);

      OKButton = new Button();
      OKButton.Location = new Point(100, 150);
      OKButton.Size = new Size(75, 25);
      OKButton.Text = "OK";
      OKButton.Click += new System.EventHandler(this.OKButton_Click);
      this.Controls.Add(OKButton);
      this.AcceptButton = OKButton;

      status = new Label();
      status.Location = new Point(0, this.Height - 55);
      status.Size = new Size(this.Width, 25);
      status.BorderStyle = BorderStyle.Fixed3D;
      status.Anchor = AnchorStyles.Bottom;
      this.Controls.Add(status);
   }

   public static void Main()
   {
      Form frm = new CurrencyForm();
      Application.Run(frm);
   }

   private void PerformConversion() {}

   public void sourceCurrency_TextChanged(object sender, EventArgs e)
   {
      status.Text = "";
   }

   public void OKButton_Click(object sender, EventArgs e)
   {
      if (!String.IsNullOrEmpty(sourceCurrency.Text))
         if (RegexLib.IsValidCurrency(sourceCurrency.Text))
            PerformConversion();
         else
            status.Text = "The source currency value is invalid.";
   }
}
```

An inefficient implementation of the `IsValidCurrency` method is shown in the following example:

> **Note:**
> Each method call reinstantiates a `System.Text.RegularExpressions.Regex` object with the same pattern. This, in turn, means that the regular expression pattern must be recompiled each time the method is called.

```csharp
﻿using System.Windows.Forms;
using System.Drawing;
using System;
using System.Text.RegularExpressions;

public class RegexLib
{
   public static bool IsValidCurrency(string currencyValue)
   {
      string pattern = @"\p{Sc}+\s*\d+";
      Regex currencyRegex = new Regex(pattern);
      return currencyRegex.IsMatch(currencyValue);
   }
}

public class CurrencyForm : Form
{
   Button OKButton;
   TextBox sourceCurrency;
   Label status;

   public CurrencyForm()
   {
      sourceCurrency = new TextBox();
      sourceCurrency.Location = new Point(25, 50);
      sourceCurrency.Size = new Size(100, 25);
      sourceCurrency.Text = String.Empty;
      sourceCurrency.TextChanged += new System.EventHandler(this.sourceCurrency_TextChanged);
      this.Controls.Add(sourceCurrency);

      OKButton = new Button();
      OKButton.Location = new Point(100, 150);
      OKButton.Size = new Size(75, 25);
      OKButton.Text = "OK";
      OKButton.Click += new System.EventHandler(this.OKButton_Click);
      this.Controls.Add(OKButton);
      this.AcceptButton = OKButton;

      status = new Label();
      status.Location = new Point(0, this.Height - 55);
      status.Size = new Size(this.Width, 25);
      status.BorderStyle = BorderStyle.Fixed3D;
      status.Anchor = AnchorStyles.Bottom;
      this.Controls.Add(status);
   }

   public static void Main()
   {
      Form frm = new CurrencyForm();
      Application.Run(frm);
   }

   private void PerformConversion() {}

   public void sourceCurrency_TextChanged(object sender, EventArgs e)
   {
      status.Text = "";
   }

   public void OKButton_Click(object sender, EventArgs e)
   {
      if (!String.IsNullOrEmpty(sourceCurrency.Text))
         if (RegexLib.IsValidCurrency(sourceCurrency.Text))
            PerformConversion();
         else
            status.Text = "The source currency value is invalid.";
   }
}
```

You should replace the preceding inefficient code with a call to the static `System.Text.RegularExpressions.Regex.IsMatch(System.String,System.String)` method. This approach eliminates the need to instantiate a `System.Text.RegularExpressions.Regex` object each time you want to call a pattern-matching method, and enables the regular expression engine to retrieve a compiled version of the regular expression from its cache.

```csharp
﻿using System.Windows.Forms;
using System.Drawing;

using System;
using System.Text.RegularExpressions;

public class RegexLib2
{
   public static bool IsValidCurrency(string currencyValue)
   {
      string pattern = @"\p{Sc}+\s*\d+";
      return Regex.IsMatch(currencyValue, pattern);
   }
}

public class CurrencyForm2 : Form
{
   Button OKButton;
   TextBox sourceCurrency;
   Label status;

   public CurrencyForm2()
   {
      sourceCurrency = new TextBox();
      sourceCurrency.Location = new Point(25, 50);
      sourceCurrency.Size = new Size(100, 25);
      sourceCurrency.Text = String.Empty;
      sourceCurrency.TextChanged += new System.EventHandler(this.sourceCurrency_TextChanged);
      this.Controls.Add(sourceCurrency);

      OKButton = new Button();
      OKButton.Location = new Point(100, 150);
      OKButton.Size = new Size(75, 25);
      OKButton.Text = "OK";
      OKButton.Click += new System.EventHandler(this.OKButton_Click);
      this.Controls.Add(OKButton);
      this.AcceptButton = OKButton;

      status = new Label();
      status.Location = new Point(0, this.Height - 55);
      status.Size = new Size(this.Width, 25);
      status.BorderStyle = BorderStyle.Fixed3D;
      status.Anchor = AnchorStyles.Bottom;
      this.Controls.Add(status);
   }

   public static void Main()
   {
      Form frm = new CurrencyForm2();
      Application.Run(frm);
   }

   private void PerformConversion() {}

   public void sourceCurrency_TextChanged(object sender, EventArgs e)
   {
      status.Text = "";
   }

   public void OKButton_Click(object sender, EventArgs e)
   {
      if (!String.IsNullOrEmpty(sourceCurrency.Text))
         if (RegexLib2.IsValidCurrency(sourceCurrency.Text))
            PerformConversion();
         else
            status.Text = "The source currency value is invalid.";
   }
}
```

By default, the last 15 most recently used static regular expression patterns are cached. For applications that require a larger number of cached static regular expressions, the size of the cache can be adjusted by setting the `System.Text.RegularExpressions.Regex.CacheSize` property.

The regular expression `\p{Sc}+\s*\d+` that's used in this example verifies that the input string has a currency symbol and at least one decimal digit. The pattern is defined as shown in the following table:

| Pattern   | Description                                                              |
|-----------|--------------------------------------------------------------------------|
| `\p{Sc}+` | Matches one or more characters in the Unicode Symbol, Currency category. |
| `\s*`     | Matches zero or more white-space characters.                             |
| `\d+`     | Matches one or more decimal digits.                                      |
