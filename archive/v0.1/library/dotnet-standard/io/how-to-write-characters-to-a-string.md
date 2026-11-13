---
title: "How to: Write characters to a string"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-write-characters-to-a-string.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Write characters to a string

The following code examples write characters synchronously or asynchronously from a character array into a string.

## Example: Write characters synchronously in a console app

 The following example uses a `System.IO.StringWriter` to write five characters synchronously to a `System.Text.StringBuilder` object.

 ```csharp
using System;
using System.IO;
using System.Text;

public class CharsToStr
{
    public static void Main()
    {
        StringBuilder sb = new StringBuilder("Start with a string and add from ");
        char[] b = { 'c', 'h', 'a', 'r', '.', ' ', 'B', 'u', 't', ' ', 'n', 'o', 't', ' ', 'a', 'l', 'l' };

        using (StringWriter sw = new StringWriter(sb))
        {
            // Write five characters from the array into the StringBuilder.
            sw.Write(b, 0, 5);
            Console.WriteLine(sb);
        }
    }
}
// The example has the following output:
//
// Start with a string and add from char.
```

## Example: Write characters asynchronously in a WPF app

 The next example is the code behind a WPF app. On window load, the example asynchronously reads all characters from a `System.Windows.Controls.TextBox` control and stores them in an array. It then asynchronously writes each letter or white-space character to a separate line of a `System.Windows.Controls.TextBlock` control.

 ```csharp
﻿using System;
using System.Text;
using System.Windows;
using System.IO;

namespace StringReaderWriter
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            char[] charsRead = new char[UserInput.Text.Length];
            using (StringReader reader = new StringReader(UserInput.Text))
            {
                await reader.ReadAsync(charsRead, 0, UserInput.Text.Length);
            }

            StringBuilder reformattedText = new StringBuilder();
            using (StringWriter writer = new StringWriter(reformattedText))
            {
                foreach (char c in charsRead)
                {
                    if (char.IsLetter(c) || char.IsWhiteSpace(c))
                    {
                        await writer.WriteLineAsync(char.ToLower(c));
                    }
                }
            }
            Result.Text = reformattedText.ToString();
        }
    }
}
```

## See also

- `System.IO.StringWriter`
- `System.IO.StringWriter.Write*`
- `System.Text.StringBuilder`
- File and stream I/O
- Asynchronous file I/O
- How to: Enumerate directories and files
- How to: Read and write to a newly created data file
- How to: Open and append to a log file
- How to: Read text from a file
- How to: Write text to a file
- How to: Read characters from a string
