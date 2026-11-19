---
name: data-formats-cli
description: "Reads and edits JSON, YAML, TOML, XML and CSV from the command line (jq, yq, xmllint) and parses them robustly in code. Use when extracting a field from a JSON or YAML file or API output, changing a value in a config file, validating XML, or when a parser fails on a data file."
metadata:
  id: DEV-11
  stars: "3"
  nature: reference
  mode: B
  wave: V2
  load: auto
---

# Data formats on the command line

**Core rule:** read and change structured files with a parser (jq, yq, xmllint, a library), never with sed on their text.

## Procedure

1. Pick the tool from the table for the format.
   - Check: the tool is installed (`command -v jq yq xmllint`).
2. Read the value first, then change it: preview, then write.
   - Check: the preview prints the expected value.
3. Validate the file after the change.
   - Check: the validation command exits 0.

| Need | Command |
| --- | --- |
| JSON field | `jq -r '.dependencies.lodash' package.json` |
| JSON change, in place via a temp file | `jq '.version = "1.2.0"' f.json > /tmp/f.json && mv /tmp/f.json f.json` |
| JSON validity | `jq empty f.json` |
| YAML field | `yq '.stages' .gitlab-ci.yml` |
| YAML change | `yq -i '.variables.FOO = "bar"' file.yml` |
| XML query | `xmllint --xpath '//version/text()' pom.xml` |
| XML validity | `xmllint --noout file.xml` |
| CSV column | `python3 -c "import csv,sys; [print(r['name']) for r in csv.DictReader(open(sys.argv[1]))]" f.csv` |
| TOML read | `python3 -c "import tomllib,sys; print(tomllib.load(open(sys.argv[1],'rb'))['package']['version'])" Cargo.toml` |

## This installation

<!-- FILL: what=which yq is installed (Go yq or Python yq, different syntax); find=yq --version; verify=yq '.a' on a sample file with a: 1 prints 1 -->

<!-- FILL: what=availability of jq and xmllint; find=command -v jq xmllint; verify=jq --version and xmllint --version print versions -->

## Stop and ask the human if

- A file mixes formats or holds comments that the tool would drop (YAML comments, JSON with comments).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "sed is enough for one value." | Quoting, nesting and duplicates break it. Use a parser. |
| "`jq ... > f.json` in place." | The redirection empties the file first. Write to a temp file. |

## Definition of done

- [ ] Values read and changed with a parser; file validated afterwards.

## Local completion checklist

- [ ] yq flavour
- [ ] jq and xmllint
