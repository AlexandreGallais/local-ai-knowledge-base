# menu

```octave
function choice = menu (title, varargin)
```

@deftypefn  {} {@var{choice} =} menu (@var{title}, @var{opt1}, @dots{})
@deftypefnx {} {@var{choice} =} menu (@var{title}, @{@var{opt1}, @dots{}@})
Display a menu with heading @var{title} and options @var{opt1}, @dots{},
and wait for user input.

If the GUI is running, the menu is displayed graphically using
@code{listdlg}.  Otherwise, the title and menu options are printed on the
console.

@var{title} is a string and the options may be input as individual strings
or as a cell array of strings.

The return value @var{choice} is the number of the option selected by the
user counting from 1.  If the user aborts the dialog or makes an invalid
selection then 0 is returned.

This function is useful for interactive programs.  There is no limit to the
number of options that may be passed in, but it may be confusing to present
more than will fit easily on one screen.
@seealso{input, listdlg}
@end deftypefn
