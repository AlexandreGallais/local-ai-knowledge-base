// Evaluates OpenCode 2.2.7 permissions and policies the way the tag v2.2.7 documents them:
// a policy "tool.use" that matches "<action>:<resource>" denies for good; otherwise the last
// matching permission rule wins, and "ask" applies when no rule matches.
export type Effect = 'allow' | 'ask' | 'deny';

export interface Rule {
  action: string;
  resource: string;
  effect: Effect;
}

export interface RuleConfig {
  permissions?: Rule[];
  policies?: Rule[];
}

function toRegExp(pattern: string): RegExp {
  const body = [...pattern]
    .map((character) => {
      if (character === '*') {
        return '.*';
      }
      if (character === '?') {
        return '.';
      }
      return character.replaceAll(/[$()+.[\\\]^{|}]/g, '\\$&');
    })
    .join('');

  return new RegExp(`^${body}$`, 's');
}

// "*" matches any text, "/" included; a pattern ending with " *" also matches the bare command.
export function matches(pattern: string, value: string): boolean {
  if (pattern.endsWith(' *') && value === pattern.slice(0, -2)) {
    return true;
  }
  return toRegExp(pattern).test(value);
}

export function evaluate(config: RuleConfig, action: string, resource: string): Effect {
  const denied = (config.policies ?? []).some((policy) => policy.action === 'tool.use' && policy.effect === 'deny' && matches(policy.resource, `${action}:${resource}`));

  if (denied) {
    return 'deny';
  }
  const rule = (config.permissions ?? []).findLast((item) => matches(item.action, action) && matches(item.resource, resource));

  return rule?.effect ?? 'ask';
}
