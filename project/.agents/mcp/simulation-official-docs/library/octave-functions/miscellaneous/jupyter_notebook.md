# jupyter_notebook

```octave
function obj = jupyter_notebook (notebook_filename, options)
```

@deftypefn  {} {@var{notebook} =} jupyter_notebook (@var{notebook_filename})
@deftypefnx {} {@var{notebook} =} jupyter_notebook (@var{notebook_filename}, @var{options})

Run and fill the Jupyter Notebook in file @var{notebook_filename} from
within GNU Octave.

Both text and graphical Octave outputs are supported.

This class has a public property @code{notebook} which is a structure
representing the JSON-decoded Jupyter Notebook.  This property is
intentionally public to enable advanced notebook manipulations.

Note: Jupyter Notebook versions (@code{nbformat}) lower than 4.0 are not
supported.

The optional second argument @var{options} is a struct with fields:

@itemize @bullet
@item
@code{tmpdir} to set the temporary working directory.
@end itemize

@code{%plot} magic is supported with the following settings:

@itemize @bullet
@item
"@code{%plot -f <format>}" or "@code{%plot --format <format>}": specifies
the image storage format.  Supported formats are:

@itemize @minus
@item
PNG (default)

@item SVG
(Note: If SVG images do not appear in the notebook, it is most likely
related to Jupyter Notebook security mechanisms and explicitly "trusting"
them will be necessary).

@item
JPG
@end itemize

@item
"@code{%plot -r <number>}" or "@code{%plot --resolution <number>}":
specifies the image resolution.

@item
"@code{%plot -w <number>}" or "@code{%plot --width <number>}":
specifies the image width.

@item
"@code{%plot -h <number>}" or "@code{%plot --height <number>}":
specifies the image height.
@end itemize

Examples:

@example
@group
## Run all cells and generate the filled notebook

## Instantiate an object from a notebook file
notebook = jupyter_notebook ("myNotebook.ipynb");
## Run the code and embed the results in the @code{notebook} property
notebook.run_all ();
## Generate a new notebook by overwriting the original notebook
notebook.generate_notebook ("myNotebook.ipynb");
@end group

@group
## Run just the second cell and generate the filled notebook

## Instantiate an object from a notebook file
notebook = jupyter_notebook ("myNotebook.ipynb");
## Run the code and embed the results in the @code{notebook} property
notebook.run (2)
## Generate a new notebook in a new file
notebook.generate_notebook ("myNewNotebook.ipynb");
@end group

@group
## Generate an Octave script from a notebook

## Instantiate an object from a notebook file
notebook = jupyter_notebook ("myNotebook.ipynb");
## Generate the Octave script
notebook.generate_octave_script ("jup_script.m");
@end group
@end example

@seealso{jsondecode, jsonencode}
@end deftypefn
