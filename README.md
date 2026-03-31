# Claude Code Config

Minimal, language-agnostic global configuration for Claude Code.

## Structure

- `settings.json` — Global settings (hooks, permissions, plugins, statusline)
- `agents/` — Custom agents (code-reviewer, security-reviewer, planner)
- `commands/` — Slash commands (code-review, plan)
- `contexts/` — Context profiles (dev, research, review)
- `scripts/` — Utility scripts (context-bar statusline)
- `package.json` — Module type config

## Installation

1. Clone the repo:

```bash
git clone git@github.com:<your-user>/claude-config.git
cd claude-config
```

2. Run the install script:

```bash
./install.sh
```

This creates symlinks from `~/.claude/` to this repo, so changes here are immediately reflected. Existing files are backed up with a `.bak` suffix.

## Updating

Since everything is symlinked, just `git pull` — changes are applied immediately.
