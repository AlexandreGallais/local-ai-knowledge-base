# SEED: stack-python  (STK-05, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: stack-python
description: "Works with Python projects the modern way - uv or venv, ruff, pytest, typing, packaging, internal package index. Use when working in a project with pyproject.toml, requirements files or setup.py, creating a virtual environment, installing packages, running pytest, ruff or mypy."
metadata:
  id: STK-05
  stars: "4"
  nature: reference
  mode: R+D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/stack-playbook.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed python3 and uv versions; whether uv is allowed and installed.
- [ ] Creating and activating the environment (uv venv or python3 -m venv) and installing through the internal index.
- [ ] Lockfile in use (uv.lock, requirements with hashes).
- [ ] Lint and format with ruff as configured; type check with mypy or the project's checker.
- [ ] pytest commands: one file, one test, markers.
- [ ] Packaging with pyproject.toml.

## Known pitfalls to confirm or drop

- pip install outside the virtual environment.
- Mixing uv and pip in one environment.
- Upstream recommends ty as type checker; confirm it is installed before using it, else keep the project's checker.

## MCP servers and example queries

- python-official-docs: venv, pyproject.toml, pytest -k, ruff configuration
