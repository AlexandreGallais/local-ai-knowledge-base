# uigetfile

```octave
function [retfile, retpath, retindex] = uigetfile (varargin)
```

@deftypefn  {} {[@var{fname}, @var{fpath}, @var{fltidx}] =} uigetfile ()
@deftypefnx {} {[@dots{}] =} uigetfile (@var{flt})
@deftypefnx {} {[@dots{}] =} uigetfile (@var{flt}, @var{dialog_name})
@deftypefnx {} {[@dots{}] =} uigetfile (@var{flt}, @var{dialog_name}, @var{default_file})
@deftypefnx {} {[@dots{}] =} uigetfile (@dots{}, "MultiSelect", @var{mode})

Open a GUI dialog for selecting a file and return the filename @var{fname},
the path to this file @var{fpath}, and the filter index @var{fltidx}.

@var{flt} contains a (list of) file filter string(s) in one of the following
formats:

@table @asis
@item @qcode{"/path/to/filename.ext"}
If a filename is given then the file extension is extracted and used as
filter.  In addition, the path is selected as current path in the dialog and
the filename is selected as default file.
Example: @code{uigetfile ("myfcn.m")}

@item A single file extension @qcode{"*.ext"}
Example: @code{uigetfile ("*.ext")}

@item A 2-column cell array
containing a file extension in the first column and a brief description in
the second column.  Example:
@code{uigetfile (@{"*.ext", "My Description";"*.xyz", "XYZ-Format"@})}

The filter string can also contain a semicolon separated list of filter
extensions.  Example:
@code{uigetfile (@{"*.gif;*.png;*.jpg", "Supported Picture Formats"@})}

@item A directory name or path name
If the folder name of path name contains a trailing file separator, the
contents of that folder will be displayed.  If no trailing file separator
is present the parent directory is listed.  The substring to the right of
the rightmost file separator (if any) will be interpreted as a file or
directory name and if that file or directory exists it will be highlighted.
If the path name or directory name is entirely or partly nonexistent, the
current working directory will be displayed.
No filter will be active.
@end table

@var{dialog_name} can be used to customize the dialog title.

If @var{default_file} is given then it will be selected in the GUI dialog.
If, in addition, a path is given it is also used as current path.

Two or more files can be selected when setting the @qcode{"MultiSelect"} key
to @qcode{"on"}.  In that case, @var{fname} is a cell array containing the
files.

The outputs @var{fname} and @var{fpath} are strings returning the chosen
name and path, respectively.  However, if the @samp{Cancel} button is
clicked the outputs are of type double with a value of @code{0}.
@var{fltidx} is the index in the list of filter extensions @var{flt} that
was selected.

@seealso{uiputfile, uigetdir}
@end deftypefn
