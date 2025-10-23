#!/usr/bin/env node

/**
 * Interactive MCP Demo - AstroLiana Project
 * Demonstrates various use cases for the MCP server
 */

const MCPServer = require('./mcp-server');

const server = new MCPServer();

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║       MCP Server Demo - AstroLiana Project Context        ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Demo 1: New Developer Onboarding
console.log('🎯 Demo 1: New Developer Onboarding\n');
console.log('As a new developer, I need to know:');
console.log('─'.repeat(60));

const projectName = server.getContext('project.name');
const framework = server.getContext('techStack.framework');
const language = server.getContext('techStack.language');
const styling = server.getContext('techStack.styling.primary');

console.log(`📦 Project: ${projectName}`);
console.log(`⚡ Framework: ${framework}`);
console.log(`📝 Language: ${language}`);
console.log(`🎨 Styling: ${styling}`);
console.log();

// Demo 2: Design System Integration
console.log('🎯 Demo 2: Design System Integration\n');
console.log('Creating a new button component:');
console.log('─'.repeat(60));

const colors = server.getContext('designSystem.colors');
const typography = server.getContext('designSystem.typography.headings');

console.log(`Primary Color: ${colors.primary}`);
console.log(`Accent Color: ${colors.accent}`);
console.log(`Font Family: ${typography.fontFamily}`);
console.log(`Font Weights: ${typography.weights.join(', ')}`);
console.log();

// Demo 3: Component Standards
console.log('🎯 Demo 3: Component Development Standards\n');
console.log('Following React component best practices:');
console.log('─'.repeat(60));

const componentStyle = server.getContext('codingStandards.react.components.style');
const exportStyle = server.getContext('codingStandards.react.components.defaultExport');
const naming = server.getContext('codingStandards.naming.components');

console.log(`Style: ${componentStyle}`);
console.log(`Export: ${exportStyle}`);
console.log(`Naming: ${naming}`);
console.log();

// Demo 4: Form Development
console.log('🎯 Demo 4: Form Development\n');
console.log('Setting up a form:');
console.log('─'.repeat(60));

const formLibrary = server.getContext('techStack.forms.library');
const validation = server.getContext('techStack.forms.validation');

console.log(`Form Library: ${formLibrary}`);
console.log(`Validation: ${validation}`);
console.log();

// Demo 5: Accessibility Requirements
console.log('🎯 Demo 5: Accessibility Compliance\n');
console.log('Ensuring accessibility:');
console.log('─'.repeat(60));

const a11yStandard = server.getContext('accessibility.standard');
const a11yRequirements = server.getContext('accessibility.requirements');

console.log(`Standard: ${a11yStandard}`);
console.log(`Requirements:`);
Object.entries(a11yRequirements).forEach(([key, value]) => {
  console.log(`  • ${key}: ${value}`);
});
console.log();

// Demo 6: Performance Targets
console.log('🎯 Demo 6: Performance Optimization\n');
console.log('Meeting performance targets:');
console.log('─'.repeat(60));

const lighthouse = server.getContext('performance.targets.lighthouse');
const webVitals = server.getContext('performance.targets.coreWebVitals');

console.log(`Lighthouse Scores:`);
Object.entries(lighthouse).forEach(([key, value]) => {
  console.log(`  • ${key}: ${value}`);
});

console.log(`\nCore Web Vitals:`);
Object.entries(webVitals).forEach(([key, value]) => {
  console.log(`  • ${key}: ${value}`);
});
console.log();

// Demo 7: Architecture Patterns
console.log('🎯 Demo 7: Architecture Information\n');
console.log('Understanding project structure:');
console.log('─'.repeat(60));

const pattern = server.getContext('architecture.pattern');
const structure = server.getContext('architecture.structure');

console.log(`Pattern: ${pattern}`);
console.log(`\nDirectory Structure:`);
Object.entries(structure).forEach(([dir, desc]) => {
  console.log(`  📁 ${dir}: ${desc}`);
});
console.log();

// Demo 8: Git Workflow
console.log('🎯 Demo 8: Git Commit Standards\n');
console.log('Following commit conventions:');
console.log('─'.repeat(60));

const branching = server.getContext('git.branching');
const commits = server.getContext('git.commits');
const examples = server.getContext('git.examples');

console.log(`Branching: ${branching}`);
console.log(`Format: ${commits}`);
console.log(`\nExamples:`);
examples.slice(0, 3).forEach(example => {
  console.log(`  • ${example}`);
});
console.log();

// Demo 9: Integration Info
console.log('🎯 Demo 9: Third-Party Integrations\n');
console.log('Available integrations:');
console.log('─'.repeat(60));

const integrations = server.getContext('techStack.integrations');

console.log(`📧 Email: ${integrations.email}`);
console.log(`💬 Messaging: ${integrations.messaging}`);
console.log(`📊 Analytics: ${integrations.analytics.join(', ')}`);
console.log(`🗺️  Maps: ${integrations.maps}`);
console.log();

// Demo 10: Complete Context Query
console.log('🎯 Demo 10: Full Context Summary\n');
console.log('All available context sections:');
console.log('─'.repeat(60));

const fullContext = server.getContext();
const sections = Object.keys(fullContext);

sections.forEach((section, index) => {
  console.log(`${index + 1}. ${section}`);
});

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║                  ✅ Demo Complete!                          ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('💡 Usage Examples:');
console.log('  const server = new MCPServer();');
console.log('  server.getContext("project.name")');
console.log('  server.getContext("designSystem.colors.primary")');
console.log('  server.getContext("techStack.framework")');
console.log('\n📚 Documentation: See .context7/ directory\n');
