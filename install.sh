#!/bin/bash
# Symlink claude-config repo files into ~/.claude/
# Usage: ./install.sh

set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
CLAUDE_DIR="$HOME/.claude"

echo "Installing claude-config from $REPO_DIR -> $CLAUDE_DIR"

# Directories to symlink
DIRS=(agents commands contexts scripts)

for dir in "${DIRS[@]}"; do
  if [ -d "$REPO_DIR/$dir" ]; then
    if [ -e "$CLAUDE_DIR/$dir" ] && [ ! -L "$CLAUDE_DIR/$dir" ]; then
      echo "  Backing up existing $CLAUDE_DIR/$dir -> $CLAUDE_DIR/$dir.bak"
      mv "$CLAUDE_DIR/$dir" "$CLAUDE_DIR/$dir.bak"
    fi
    ln -sfn "$REPO_DIR/$dir" "$CLAUDE_DIR/$dir"
    echo "  Linked $dir/"
  fi
done

# Individual files to symlink
FILES=(settings.json package.json)

for file in "${FILES[@]}"; do
  if [ -f "$REPO_DIR/$file" ]; then
    if [ -e "$CLAUDE_DIR/$file" ] && [ ! -L "$CLAUDE_DIR/$file" ]; then
      echo "  Backing up existing $CLAUDE_DIR/$file -> $CLAUDE_DIR/$file.bak"
      mv "$CLAUDE_DIR/$file" "$CLAUDE_DIR/$file.bak"
    fi
    ln -sfn "$REPO_DIR/$file" "$CLAUDE_DIR/$file"
    echo "  Linked $file"
  fi
done

echo "Done! Claude Code config is now managed by this repo."
