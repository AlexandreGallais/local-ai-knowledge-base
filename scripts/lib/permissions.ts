// Evaluates the permissions of an OpenCode 2.2.7 agent as the notes of the base describe them: the
// rules of the common config, then the rules of the agent; the last matching rule wins; "ask" when no
// rule matches; a matching policy of the common config denies whatever the rules say.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseJsonc } from './jsonc.ts';
import { parseHeader } from './markdown.ts';

export interface Rule {
  action: string;
  resource: string;
  effect: string;
}

export interface Config {
  rules: Rule[];
  policies: Rule[];
}

// As Wildcard.match of OpenCode 2.2.7 (packages/core/src/util/wildcard.ts): "*" is any text, "?" one
// character, and a final " *" is optional, so "git status *" also matches "git status".
export function wildcard(pattern: string, value: string): boolean {
  const escaped = pattern
    .replaceAll(/[.+^${}()|[\]\\]/g, '\\$&')
    .replaceAll('*', '.*')
    .replaceAll('?', '.');
  const source = escaped.endsWith(' .*') ? `${escaped.slice(0, -3)}( .*)?` : escaped;

  return new RegExp(`^${source}$`, 's').test(value);
}

// The commands of one shell line, as OpenCode checks them: each part between "&&", "||", "|" and ";"
// on its own. A simple split, enough for the tests: no quotes nor sub-shells.
export function shellCommands(line: string): string[] {
  return line
    .split(/&&|\|\||\||;/)
    .map((part) => part.trim())
    .filter((part) => part !== '');
}

export function readCommonConfig(opencode: string): Config {
  const config = parseJsonc(readFileSync(join(opencode, 'opencode.jsonc'), 'utf8')) as {
    permissions?: Rule[];
    policies?: Rule[];
  };

  return {
    rules: config.permissions ?? [],
    policies: config.policies ?? [],
  };
}

export function readAgentRules(text: string): Rule[] {
  return (parseHeader(text)?.lists.get('permissions') ?? []).map((rule) => ({
    action: rule.get('action') ?? '',
    resource: rule.get('resource') ?? '',
    effect: rule.get('effect') ?? '',
  }));
}

// The effect of one tool call: "allow", "ask" or "deny". For a policy, the tool and its input are
// joined as "tool:input", as in the common config.
export function evaluate(config: Config, agentRules: readonly Rule[], action: string, resource: string): string {
  const isDeniedByPolicy = config.policies.some((policy) => policy.effect === 'deny' && wildcard(policy.resource, `${action}:${resource}`));
  const rules = [
    ...config.rules,
    ...agentRules,
  ];
  const last = rules.findLast((rule) => wildcard(rule.action, action) && wildcard(rule.resource, resource));

  return isDeniedByPolicy ? 'deny' : last?.effect ?? 'ask';
}

// The effect of a whole shell line: denied when one of its commands is denied, asked when one asks.
export function evaluateShell(config: Config, agentRules: readonly Rule[], line: string): string {
  const effects = shellCommands(line).map((command) => evaluate(config, agentRules, 'shell', command));

  if (effects.includes('deny')) {
    return 'deny';
  }
  return effects.includes('ask') ? 'ask' : 'allow';
}
