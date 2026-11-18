# listdlg

```octave
function [sel, ok] = listdlg (varargin)
```

@deftypefn {} {[@var{sel}, @var{ok}] =} listdlg (@var{key}, @var{value}, @dots{})
Return user inputs from a list dialog box in a vector of selection indices
(@var{sel}) and a flag indicating how the user closed the dialog box
(@var{ok}).

The indices in @var{sel} are 1-based.

The value of @var{ok} is 1 if the user closed the box with the OK button,
otherwise it is 0 and @var{sel} is empty.

Input arguments are specified in form of @var{key}, @var{value} pairs.
The @qcode{"ListString"} argument pair @strong{must} be specified.

Valid @var{key} and @var{value} pairs are:

@table @asis
@item @qcode{"ListString"}
a cell array of strings specifying the items to list in the dialog.

@item @qcode{"SelectionMode"}
can be either @qcode{"Single"} (only one item may be selected at a time) or
@qcode{"Multiple"} (default).

@item @qcode{"ListSize"}
a two-element vector @code{[@var{width}, @var{height}]} specifying the size
of the list field in pixels.  The default is [160, 300].

@item @qcode{"InitialValue"}
a vector containing 1-based indices of elements which will be pre-selected
when the list dialog is first displayed.
The default is 1 (first item).

@item @qcode{"Name"}
a string to be used as the dialog caption.  Default is "".

@item @qcode{"PromptString"}
a cell array of strings to be displayed above the list of items.
Default is @{@}.

@item @qcode{"OKString"}
a string used to label the OK button.  Default is @qcode{"OK"}.

@item @qcode{"CancelString"}
a string used to label the Cancel button.  Default is @qcode{"Cancel"}.
@end table

Example:

@example
@group
my_options = @{"An item", "another", "yet another"@};
[sel, ok] = listdlg ("ListString", my_options,
                     "SelectionMode", "Multiple");
if (ok == 1)
  disp ("You selected:");
  for i = 1:numel (sel)
    disp (sprintf ("\t%s", my_options@{sel(i)@}));
  endfor
else
  disp ("You cancelled.");
endif
@end group
@end example

@seealso{menu, errordlg, helpdlg, inputdlg, msgbox, questdlg, warndlg}
@end deftypefn
