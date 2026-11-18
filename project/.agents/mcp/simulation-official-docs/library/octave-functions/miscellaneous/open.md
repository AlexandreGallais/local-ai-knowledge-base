# open

```octave
function output = open (file)
```

@deftypefn  {} {} open @var{file}
@deftypefnx {} {@var{output} =} open (@var{file})
Open the file @var{file} in Octave or in an external application based on
the file type as determined by the filename extension.

By default, recognized file types are

@table @code
@item .m
Open file in the editor.  No @var{output} value is returned.

@item  .mat
@itemx octave-workspace
Open the data file with @code{load}.  If no return value @var{output}
is requested, variables are loaded in the base workspace.  Otherwise
@var{output} will be a structure containing loaded data.
@xref{XREFload,,load function}.

@item .ofig
Open the figure with @code{hgload}.
@xref{XREFhgload,,hgload function}.

@item .fig, .ofig
Load the figure

@item .exe
Execute the program (on Windows systems only).  No @var{output} value
is returned.
@end table

Custom file extensions may also be handled if a function @code{openxxx},
where @code{xxx} is the extension, is found in the load path.  The function
must accept the file name as input.  For example, in order to load
@nospell{@qcode{".dat"}} data files in the base workspace, as is done by
default for @qcode{".mat"} files, one may define
@nospell{@qcode{"opendat.m"}} with the following contents:

@example
@group
function retval = opendat (fname)
  evalin ("base", sprintf ("load ('%s');", fname));
endfunction
@end group
@end example

Other file types are opened in the appropriate external application.
@end deftypefn
