# Official documentation of simulation

1. When your memory of Modelica, FMI, SSP, Octave, Scilab, Xcos or of a simulation library is not sure, look it up with the `simulation-official-docs` server: `search_docs`, then `read_doc` on one section.
2. It holds the Modelica language specification and the Modelica Standard Library, the OpenModelica User's Guide, the FMI 3.0 and SSP 2.0 standards, FMPy, the GNU Octave manual and functions, the help of Scilab and Xcos, python-control, the SciPy user guide and SimPy.
3. Search a function of FMI by its name, as `fmi3DoStep`; a class of the Modelica Standard Library by its full name, as `Modelica.Fluid.Pipes`; a function of Octave, Scilab, python-control or SciPy by its name, as `ode45`, `lsim` or `solve_ivp`.
4. Octave and Scilab are close to MATLAB, Xcos to Simulink, the Modelica Standard Library to Simscape, `Modelica.StateGraph` to Stateflow: none is the same. Say so when you explain MATLAB or Simulink from them; the help of Scilab (`m2sci`) gives the Scilab equivalent of each MATLAB function.
5. MATLAB, Simulink, Simscape and Stateflow are not in the base: their documentation is not free. Say so; never invent their API.
6. Read one section at a time. Never read the folder `.agents/mcp/simulation-official-docs/library/` by hand.
