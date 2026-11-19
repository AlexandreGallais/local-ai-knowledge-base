"""Checks one skill folder against the rules of the skill catalogue (build guide, sections 5.4 to 5.11).

The same checks and messages as check-skill.ts, for a machine without Node. Python 3.9 or later,
standard library only.
    python3 .agents/skills/skill-template/scripts/check_skill.py <skill-folder> [<skill-folder>...]
Prints one line per finding, then "N findings."; exits 1 when there is any finding.
"""

import os
import re
import sys

MAX_LINES = 500
MAX_GUARDRAIL_LINES = 60
MAX_DESCRIPTION = 1024
MAX_NAME = 64
CORE_RULE_WINDOW = 10
NAME = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
REQUIRED_SECTIONS = [
    "Stop and ask the human if",
    "Common mistakes",
    "Definition of done",
]
NATURES = [
    "guardrail",
    "process",
    "reference",
    "tooling",
    "template",
]
LOADS = [
    "always",
    "auto",
    "manual",
    "auto+manual",
]
MODES = [
    "R",
    "A",
    "B",
    "C",
    "D",
    "R+B",
    "R+C",
    "R+D",
]
BRIEF_SECTIONS = [
    "Final frontmatter (do not change)",
    "Goal",
    "Questions the skill must answer",
    "Where to look (files, commands, people)",
    "Required sections",
    "Acceptance tests",
    "Human input required (yes/no, what)",
]
SEED_SECTIONS = [
    "Final frontmatter (do not change)",
    "Family template",
    "Topics checklist",
    "Known pitfalls to confirm or drop",
    "MCP servers and example queries",
]
FILL = re.compile(r"<!-- FILL: what=[^;]+; find=[^;]+; verify=.+ -->")
FRENCH = re.compile(r"\b(?:le|la|les|des|une|est|pour|avec|dans|qui|pas|cette|sont|sur|aux)\b", re.IGNORECASE)
WEB = re.compile(r"\b(?:search|look up|browse) (?:on |in )?the (?:web|internet)\b|\bgoogle it\b", re.IGNORECASE)
KEY_LINE = re.compile(r"^(\s*)([A-Za-z_][\w-]*):(?:\s+(.*))?$")


def unquote(value):
    trimmed = value.strip()
    if re.match(r"^([\"']).*\1$", trimmed):
        return trimmed[1:-1]
    return trimmed


def read_header(lines):
    """Top-level "key: value" lines and one level of nesting ("metadata.id"), or None."""
    if not lines or lines[0] != "---":
        return None
    try:
        end = lines.index("---", 1)
    except ValueError:
        return None
    fields = {}
    parent = ""
    for line in lines[1:end]:
        match = KEY_LINE.match(line)
        if match is None:
            continue
        nested = match.group(1) != ""
        key = f"{parent}.{match.group(2)}" if nested else match.group(2)
        value = match.group(3) or ""
        fields[key] = unquote(value)
        if not nested:
            parent = match.group(2) if value.strip() == "" else ""
    return {
        "fields": fields,
        "body_start": end + 1,
    }


def sections_of(lines):
    """Each line with its H2 section, and whether it sits in a fenced code block."""
    fence = ""
    section = ""
    result = []
    for text in lines:
        trimmed = text.strip()
        opening = re.match(r"^(`{3,}|~{3,})", trimmed)
        in_code = fence != ""
        if in_code and trimmed.startswith(fence) and trimmed[len(fence) :].strip() == "":
            fence = ""
        elif not in_code and opening is not None:
            fence = opening.group(1)
            in_code = True
        elif not in_code and re.match(r"^##\s+", trimmed):
            section = re.sub(r"^##\s+", "", trimmed)
        result.append({
            "text": text,
            "section": section,
            "in_code": in_code,
        })
    return result


def prose(lines):
    return "\n".join(re.sub(r"`[^`]*`", " ", line["text"]) for line in sections_of(lines) if not line["in_code"])


def split(text):
    return text.replace("\r\n", "\n").rstrip().split("\n")


def missing_sections(wanted, present):
    return [f"missing ## {section} section" for section in wanted if section not in present]


def language_findings(text, lines):
    findings = []
    if len(FRENCH.findall(prose(lines))) >= 5:
        findings.append("write the skill in English")
    if WEB.search(text):
        findings.append("never ask to search the web")
    return findings


def name_findings(folder_name, name, description, load):
    manual = f"Manual: run only when the user explicitly asks for /{name}."
    findings = []
    if name != folder_name:
        findings.append(f'name "{name}" differs from the folder "{folder_name}"')
    if not (NAME.match(name) and len(name) <= MAX_NAME):
        findings.append(f"name must use lowercase letters, digits and single hyphens, {MAX_NAME} characters at most")
    if description == "":
        findings.append("missing description")
    if len(description) > MAX_DESCRIPTION:
        findings.append(f"description has {len(description)} characters; {MAX_DESCRIPTION} at most")
    if load == "manual" and not description.startswith(manual):
        findings.append(f'a manual skill\'s description starts with "{manual}"')
    if load != "manual" and "Use when" not in description:
        findings.append('description must say "Use when ..." with its triggers')
    return findings


def metadata_findings(fields):
    findings = []
    if fields.get("metadata.id", "") == "":
        findings.append("missing metadata.id (the catalogue ID)")
    for key, allowed in (("nature", NATURES), ("load", LOADS), ("mode", MODES)):
        value = fields.get(f"metadata.{key}", "")
        if value not in allowed:
            findings.append(f'metadata.{key} "{value}" is not one of {", ".join(allowed)}')
    return findings


def header_findings(folder_name, header):
    fields = header["fields"]
    load = fields.get("metadata.load", "")
    return name_findings(folder_name, fields.get("name", ""), fields.get("description", ""), load) + metadata_findings(fields)


def procedure_findings(lines):
    procedure = [line for line in sections_of(lines) if line["section"] == "Procedure" and not line["in_code"]]
    steps = len([line for line in procedure if re.match(r"^\d+\.\s", line["text"])])
    checks = len([line for line in procedure if re.match(r"^\s+- Check:", line["text"])])
    if steps > checks:
        return [f'{steps} steps in ## Procedure but {checks} "- Check:" lines; every step needs its check']
    return []


def files_in(folder):
    return sorted(os.listdir(folder)) if os.path.isdir(folder) else []


def source_findings(folder, mode):
    if mode.startswith("R") and not os.path.exists(os.path.join(folder, "references", "SOURCE.md")):
        return ["mode R needs references/SOURCE.md"]
    return []


def body_findings(text, header):
    """The body of a finished skill: core rule, size, procedure checks, leftovers."""
    lines = split(text)
    body = lines[header["body_start"] :]
    core_window = [line for line in body if line.strip() != ""][:CORE_RULE_WINDOW]
    guardrail = header["fields"].get("metadata.nature", "") == "guardrail"
    findings = missing_sections(REQUIRED_SECTIONS, {line["section"] for line in sections_of(body)})
    if not any(line.startswith("**Core rule:**") for line in core_window):
        findings.append(f'the "**Core rule:**" line must be in the first {CORE_RULE_WINDOW} lines of the body')
    if len(lines) > MAX_LINES:
        findings.append(f"{len(lines)} lines; {MAX_LINES} at most")
    if guardrail and len(lines) > MAX_GUARDRAIL_LINES:
        findings.append(f"{len(lines)} lines; a guardrail has {MAX_GUARDRAIL_LINES} at most")
    findings += procedure_findings(body)
    if "<!-- FILL" in text:
        findings.append("FILL marker left: a finished skill has none")
    if re.search(r"\bTODO\b", prose(body)):
        findings.append("TODO left in the prose of a finished skill")
    return findings


def folder_findings(folder, text):
    findings = [f"{name} left in a finished skill" for name in files_in(folder) if name in ("BRIEF.md", "SEED.md")]
    references = files_in(os.path.join(folder, "references"))
    findings += [f"references/{name} is never cited in SKILL.md" for name in references if name != "SOURCE.md" and f"references/{name}" not in text]
    return findings


def check_finished(folder):
    """A finished skill, in .agents/skills/<name>/."""
    path = os.path.join(folder, "SKILL.md")
    if not os.path.exists(path):
        return ["missing SKILL.md"]
    with open(path, encoding="utf-8") as handle:
        text = handle.read()
    header = read_header(split(text))
    if header is None:
        return ["missing YAML header between --- lines"]
    return (header_findings(os.path.basename(os.path.normpath(folder)), header) + body_findings(text, header) + source_findings(folder, header["fields"].get("metadata.mode", "")) + folder_findings(folder, text) + language_findings(text, split(text)))


def headings_of(text):
    return {line[3:].strip() for line in text.split("\n") if line.startswith("## ")}


def brief_or_seed_findings(folder, text, word):
    """A brief (mode C) or a seed (mode D): its title line, its sections and the final frontmatter."""
    lines = split(text)
    findings = []
    if not lines[0].startswith(f"# {word}: "):
        findings.append(f'a {word.lower()} starts with "# {word}: <name>"')
    findings += missing_sections(BRIEF_SECTIONS if word == "BRIEF" else SEED_SECTIONS, headings_of(text))
    if f"name: {os.path.basename(os.path.normpath(folder))}" not in text:
        findings.append("the final frontmatter must give the name of the folder")
    return findings + language_findings(text, lines)


def skeleton_findings(folder, text):
    """A skeleton (mode B): the final header, well-formed FILL markers and the local completion checklist."""
    lines = split(text)
    header = read_header(lines)
    headings = headings_of(text)
    markers = [line for line in lines if "<!-- FILL" in line]
    if header is None:
        findings = ["missing YAML header between --- lines"]
    else:
        findings = header_findings(os.path.basename(os.path.normpath(folder)), header)
    if not markers:
        findings.append("a skeleton holds at least one FILL marker")
    findings += [f"malformed FILL marker: {line.strip()}" for line in markers if not FILL.search(line)]
    if "Local completion checklist" not in headings:
        findings.append("missing ## Local completion checklist section")
    findings += missing_sections(REQUIRED_SECTIONS, headings)
    findings += source_findings(folder, header["fields"].get("metadata.mode", "") if header else "")
    return findings + language_findings(text, lines)


def check_draft(folder):
    """A draft, in .agents/skills-drafts/<name>/: a skeleton, a brief or a seed."""
    files = files_in(folder)
    kinds = [name for name in ("SKILL.md", "BRIEF.md", "SEED.md") if name in files]
    if len(kinds) != 1:
        return [f"a draft holds exactly one of SKILL.md, BRIEF.md or SEED.md; found {len(kinds)}"]
    with open(os.path.join(folder, kinds[0]), encoding="utf-8") as handle:
        text = handle.read()
    if kinds[0] == "SKILL.md":
        return skeleton_findings(folder, text)
    return brief_or_seed_findings(folder, text, "BRIEF" if kinds[0] == "BRIEF.md" else "SEED")


def check_folder(folder):
    parent = os.path.basename(os.path.dirname(os.path.abspath(folder)))
    return check_draft(folder) if parent == "skills-drafts" else check_finished(folder)


def main():
    folders = sys.argv[1:]
    if not folders:
        print("Usage: python3 check_skill.py <skill-folder> [<skill-folder>...]")
        return 2
    count = 0
    for folder in folders:
        for problem in check_folder(folder):
            print(f"{folder}: {problem}")
            count += 1
    print(f"{count} findings.")
    return 0 if count == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
