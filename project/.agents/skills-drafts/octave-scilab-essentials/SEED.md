# SEED: octave-scilab-essentials  (SCI-01, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: octave-scilab-essentials
description: "Uses Octave and Scilab as free equivalents of Matlab - syntax, differences with Matlab, running scripts in a Podman container. Use when reading or writing .m or .sce files, porting a Matlab script, or running numerical scripts with Octave or Scilab."
metadata:
  id: SCI-01
  stars: "3"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed Octave and Scilab versions, on the host or in an image.
- [ ] Running a script non-interactively (octave --no-gui --eval, scilab -nwni -f).
- [ ] Main syntax differences with Matlab per tool.
- [ ] Packages available offline.

## Known pitfalls to confirm or drop

- Octave-only syntax (++, !=, double quotes) that Matlab rejects, if the code must stay compatible.
- Scilab syntax differs much more from Matlab than Octave does.

## MCP servers and example queries

- simulation-official-docs: octave ode45, scilab lsim, scilab Matlab-Scilab equivalents
