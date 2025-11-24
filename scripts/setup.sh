#!/bin/bash

# Project initialization script
echo "🚀 Starting project setup..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Install main dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Install development dependencies
echo -e "${BLUE}🔧 Installing development dependencies...${NC}"
npm install --save-dev \
  commitizen \
  cz-conventional-changelog \
  standard-version \
  @commitlint/config-conventional \
  @commitlint/cli \
  husky \
  tsx

# Initialize Commitizen
echo -e "${BLUE}✨ Setting up Commitizen...${NC}"
npx commitizen init cz-conventional-changelog --save-dev --save-exact --force

# Initialize Husky
echo -e "${BLUE}🐺 Setting up Husky...${NC}"
npx husky init

# Create commit-msg hook
echo -e "${BLUE}🪝 Creating Git hooks...${NC}"
echo 'npx --no -- commitlint --edit $1' > .husky/commit-msg
chmod +x .husky/commit-msg

# Create commitlint.config.ts
echo -e "${BLUE}📝 Creating commitlint.config.ts...${NC}"
cat > commitlint.config.ts << 'EOF'
export default {
  extends: ['@commitlint/config-conventional']
};
EOF

# Create .versionrc.json
echo -e "${BLUE}📝 Creating .versionrc.json...${NC}"
cat > .versionrc.json << 'EOF'
{
  "types": [
    { "type": "feat", "section": "Features" },
    { "type": "fix", "section": "Bug Fixes" },
    { "type": "chore", "hidden": true },
    { "type": "docs", "section": "Documentation" },
    { "type": "style", "hidden": true },
    { "type": "refactor", "section": "Code Refactoring" },
    { "type": "perf", "section": "Performance Improvements" },
    { "type": "test", "hidden": true }
  ],
  "skip": {
    "bump": false,
    "changelog": false,
    "commit": false,
    "tag": false
  }
}
EOF

echo ""
echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo ""
echo -e "${BLUE}📚 Next steps:${NC}"
echo "  1. Use 'npm run commit' to make standardized commits"
echo "  2. Use 'npm run release' to create versions and changelog"
echo "  3. Use 'git push --follow-tags origin main' to push everything"
echo ""
echo -e "${YELLOW}💡 Tip: Try 'npm run commit' now to see Commitizen in action!${NC}"