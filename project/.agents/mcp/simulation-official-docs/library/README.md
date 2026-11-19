# Official documentation library

The official documentation of the tools, at a pinned version, as its authors wrote it: each file is
copied unchanged, in its own format. An API reference that lives in the comments of the source code
is taken from those comments. `<tool>.index.md` lists the files of each tool. The AI searches them
with the tools of the brick, then reads one section.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # every file indexed, every license and notice
```

## Tools

| Tool | Documentation | Version | License | Size |
| --- | --- | --- | --- | --- |
| [modelica-spec](modelica-spec.index.md) | Modelica Language Specification: the LaTeX source of each chapter | 3.7 | CC-BY-SA-4.0 | 27 files, 1.2 MB |
| [fmi](fmi.index.md) | Functional Mock-up Interface (FMI) 3.0: the AsciiDoc source of the standard (model exchange, co-simulation, scheduled execution) | 3.0.2 | CC-BY-SA-4.0 | 27 files, 0.4 MB |
| [ssp](ssp.index.md) | System Structure and Parameterization (SSP) 2.0: the AsciiDoc source of the standard | 2.0.1 | CC-BY-SA-4.0 | 11 files, 0.1 MB |
| [octave-manual](octave-manual.index.md) | GNU Octave manual: the Texinfo source of each chapter | 11.3 | LicenseRef-GNU-permission-notice | 51 files, 0.9 MB |
| [octave-functions](octave-functions.index.md) | GNU Octave functions: the Texinfo help of each function file, which the manual calls with @DOCSTRING | 11.3 | GPL-3.0-or-later | 889 files, 1.3 MB |
| [scilab-help](scilab-help.index.md) | Scilab and Xcos: the help of every function and block (linear systems, control, signal processing, ODE solvers, optimization, Xcos palettes, FMU import), and the conversion of each MATLAB function to Scilab (m2sci) | 2027.0 | GPL-2.0-only | 2488 files, 16.1 MB |
| [modelica-standard-library](modelica-standard-library.index.md) | The Modelica Standard Library 4.1: the documentation of each package, model, block and connector (Fluid, Thermal, Electrical, Mechanics, Blocks, StateGraph, Media, Magnetic, Math, Units...), taken from its Documentation annotations, and the Modelica language reference by keyword | 4.1 | BSD-3-Clause | 2380 files, 4.9 MB |
| [openmodelica](openmodelica.index.md) | OpenModelica User's Guide: OMEdit, OMShell, scripting (OMC API), simulation flags and solvers, FMI import and export, debugging, optimization, Python and Julia interfaces | 1.27 | CC-BY-4.0 | 38 files, 0.4 MB |
| [fmpy](fmpy.index.md) | FMPy: simulating, validating and inspecting FMUs from Python (command line, GUI, web app, Python API) | 0.3.32 | BSD-2-Clause | 6 files, 0.0 MB |
| [python-control](python-control.index.md) | python-control: the Control Systems Library for Python (transfer functions, state space, time and frequency responses, lsim, step, bode, root locus, LQR, Kalman, MATLAB compatibility module) | 0.10 | BSD-3-Clause | 54 files, 0.3 MB |
| [scipy](scipy.index.md) | SciPy user guide: integration and ODE solvers (solve_ivp, odeint), signal processing (filters, LTI systems), optimization, interpolation, linear algebra, FFT, statistics, spatial algorithms | 1.18 | BSD-3-Clause | 181 files, 1.1 MB |
| [simpy](simpy.index.md) | SimPy: discrete-event simulation in Python (processes, events, resources, the environment, real-time simulation), its guides, examples and API reference | 4.1 | MIT | 42 files, 0.1 MB |
