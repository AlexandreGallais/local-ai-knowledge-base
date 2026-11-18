# inputdlg

```octave
function cstr = inputdlg (prompt, varargin)
```

@deftypefn  {} {@var{cstr} =} inputdlg (@var{prompt})
@deftypefnx {} {@var{cstr} =} inputdlg (@var{prompt}, @var{title})
@deftypefnx {} {@var{cstr} =} inputdlg (@var{prompt}, @var{title}, @var{rowscols})
@deftypefnx {} {@var{cstr} =} inputdlg (@var{prompt}, @var{title}, @var{rowscols}, @var{defaults})
@deftypefnx {} {@var{cstr} =} inputdlg (@var{prompt}, @var{title}, @var{rowscols}, @var{defaults}, @var{options})
Return user input from a multi-textfield dialog box.

Inputs:

@table @var
@item prompt
A cell array with strings labeling each text field.  This input is required.

@item title
String to use for the caption of the dialog.  The default is
@qcode{"Input Dialog"}.

@item rowscols
Specifies the size of the text fields and can take four forms:

@enumerate
@item a scalar value which defines the number of rows used for each text
field.

@item a row or column vector with the number of elements matching the number
of prompts.  Each element defines the number of rows used for the
corresponding text field.

@item a 1x2 row vector which defines the number of rows and the number of
columns used for all text fields.

@item an Mx2 matrix which defines the individual number of rows and columns
used for each text field.  In the matrix, each row describes a single text
field.  The first column specifies the number of input rows to use and the
second column specifies the text field width.
@end enumerate

@item defaults
A list of default values to place in each text field.  It must be a cell
array of strings with the same size as @var{prompt}.

@item options
Not supported, only for @sc{matlab} compatibility.
@end table

Output:
The output is a cell array of strings with each element being the text that
was entered by the user.  An empty cell array is returned if the dialog was
closed by the Cancel button.

Example:

@example
@group
prompt = @{"Width", "Height", "Depth"@};
defaults = @{"1.10", "2.20", "3.30"@};
rowscols = [1,10; 2,20; 3,30];
dims = inputdlg (prompt, "Enter Box Dimensions", ...
                 rowscols, defaults);
@end group
@end example

@seealso{errordlg, helpdlg, listdlg, msgbox, questdlg, warndlg}
@end deftypefn
