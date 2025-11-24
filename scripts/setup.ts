import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
} as const;

type Color = typeof colors[keyof typeof colors];

function log(message: string, color: Color = colors.reset): void {
  console.log(`${color}${message}${colors.reset}`);
}

function exec(command: string, description: string): boolean {
  try {
    log(`\n${description}`, colors.blue);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log(`❌ Error: ${description}`, colors.red);
    return false;
  }
}

function createFile(filePath: string, content: string, description: string): boolean {
  try {
    log(`\n${description}`, colors.blue);
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    log(`❌ Error creating ${filePath}`, colors.red);
    return false;
  }
}

// Main setup process
log('🚀 Starting project setup...', colors.cyan);

// Install main dependencies
exec('npm install', '📦 Installing dependencies...');

// Install development dependencies
exec(
  'npm install --save-dev commitizen cz-conventional-changelog standard-version @commitlint/config-conventional @commitlint/cli husky tsx',
  '🔧 Installing development dependencies...'
);

// Initialize Commitizen
exec(
  'npx commitizen init cz-conventional-changelog --save-dev --save-exact --force',
  '✨ Setting up Commitizen...'
);

// Initialize Husky
exec('npx husky init', '🐺 Setting up Husky...');

// Create commit-msg hook
log('\n🪝 Creating Git hooks...', colors.blue);
const huskyDir = path.join('.husky');
const commitMsgPath = path.join(huskyDir, 'commit-msg');

// Ensure .husky directory exists
if (!fs.existsSync(huskyDir)) {
  fs.mkdirSync(huskyDir, { recursive: true });
}

const commitMsgHook = 'npx --no -- commitlint --edit $1';
createFile(commitMsgPath, commitMsgHook, '');

// Make commit-msg executable (Unix-like systems)
if (process.platform !== 'win32') {
  try {
    fs.chmodSync(commitMsgPath, 0o755);
  } catch (error) {
    // Ignore chmod errors on Windows
  }
}

// Create commitlint.config.ts
const commitlintConfig = `export default {
  extends: ['@commitlint/config-conventional']
};
`;
createFile('commitlint.config.ts', commitlintConfig, '📝 Creating commitlint.config.ts...');

// Create .versionrc.json
const versionrc = `{
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
`;
createFile('.versionrc.json', versionrc, '📝 Creating .versionrc.json...');

// Success message
log('\n✅ Setup completed successfully!', colors.green);
log('\n📚 Next steps:', colors.blue);
console.log('  1. Use \'npm run commit\' to make standardized commits');
console.log('  2. Use \'npm run release\' to create versions and changelog');
console.log('  3. Use \'git push --follow-tags origin main\' to push everything');
log('\n💡 Tip: Try \'npm run commit\' now to see Commitizen in action!', colors.yellow);