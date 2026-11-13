---
title: "How to: Read characters from a string"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-read-characters-from-a-string.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Read characters from a string

The following code examples show how to read characters synchronously or asynchronously from a string.

## Example: Read characters synchronously

 This example reads 13 characters synchronously from a string, stores them in an array, and displays them. The example then reads the rest of the characters in the string, stores them in the array starting at the sixth element, and displays the contents of the array.

 ```csharp
using System;
using System.IO;

public class CharsFromStr
{
    public static void Main()
    {
        string str = "Some number of characters";
        char[] b = new char[str.Length];

        using (StringReader sr = new StringReader(str))
        {
            // Read 13 characters from the string into the array.
            sr.Read(b, 0, 13);
            Console.WriteLine(b);

            // Read the rest of the string starting at the current string position.
            // Put in the array starting at the 6th array member.
            sr.Read(b, 5, str.Length - 13);
            Console.WriteLine(b);
        }
    }
}
// The example has the following output:
//
// Some number o
// Some f characters
```

## Example: Read characters asynchronously

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

- `System.IO.StringReader`
- `System.IO.StringReader.Read*`
- Asynchronous file I/O
- How to: Create a directory listing
- How to: Read and write to a newly created data file
- How to: Open and append to a log file
- How to: Read text from a file
- How to: Write text to a file
- How to: Write characters to a string
- File and stream I/O
