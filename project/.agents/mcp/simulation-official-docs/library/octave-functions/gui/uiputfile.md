# uiputfile

```octave
function [retfile, retpath, retindex] = uiputfile (varargin)
```

@deftypefn  {} {[@var{fname}, @var{fpath}, @var{fltidx}] =} uiputfile ()
@deftypefnx {} {[@var{fname}, @var{fpath}, @var{fltidx}] =} uiputfile (@var{flt})
@deftypefnx {} {[@var{fname}, @var{fpath}, @var{fltidx}] =} uiputfile (@var{flt}, @var{dialog_name})
@deftypefnx {} {[@var{fname}, @var{fpath}, @var{fltidx}] =} uiputfile (@var{flt}, @var{dialog_name}, @var{default_file})
Open a GUI dialog for selecting a file.

@var{flt} contains a (list of) file filter string(s) in one of the following
formats:

@table @asis
@item @qcode{"/path/to/filename.ext"}
If a filename is given the file extension is extracted and used as filter.
In addition the path is selected as current path in the dialog and the
filename is selected as default file.  Example:
@code{uiputfile ("myfcn.m")}

@item @qcode{"*.ext"}
A single file extension.
Example: @code{uiputfile ("*.ext")}

@item @code{@{"*.ext", "My Description"@}}
A 2-column cell array containing the file extension in the 1st column and
a brief description in the 2nd column.  Example:
@code{uiputfile (@{"*.ext","My Description";"*.xyz", "XYZ-Format"@})}
@end table

The filter string can also contain a semicolon separated list of filter
extensions.  Example:
@code{uiputfile (@{"*.gif;*.png;*.jpg", "Supported Picture Formats"@})}

@var{dialog_name} can be used to customize the dialog title.
If @var{default_file} is given it is preselected in the GUI dialog.
If, in addition, a path is given it is also used as current path.

@var{fname} and @var{fpath} return the chosen name and path, respectively.
@var{fltidx} is the index in the list of filter extensions @var{flt} that
was selected.

@seealso{uigetfile, uigetdir}
@end deftypefn
