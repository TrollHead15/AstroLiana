#!/usr/bin/env node

/**
 * Test script to demonstrate MCP server functionality
 */

const MCPServer = require('./mcp-server');

console.log('═══════════════════════════════════════════════════════════');
console.log('  MCP Server Test - AstroLiana Project Context');
console.log('═══════════════════════════════════════════════════════════\n');

const server = new MCPServer();

// Test 1: Get project name
console.log('📋 Test 1: Get Project Name');
console.log('Query: getContext("project.name")');
console.log('Result:', server.getContext('project.name'));
console.log();

// Test 2: Get framework
console.log('📋 Test 2: Get Framework');
console.log('Query: getContext("techStack.framework")');
console.log('Result:', server.getContext('techStack.framework'));
console.log();

// Test 3: Get primary color
console.log('📋 Test 3: Get Primary Color');
console.log('Query: getContext("designSystem.colors.primary")');
console.log('Result:', server.getContext('designSystem.colors.primary'));
console.log();

// Test 4: Get all colors
console.log('📋 Test 4: Get All Colors');
console.log('Query: getContext("designSystem.colors")');
console.log('Result:', JSON.stringify(server.getContext('designSystem.colors'), null, 2));
console.log();

// Test 5: Get typography
console.log('📋 Test 5: Get Typography');
console.log('Query: getContext("designSystem.typography")');
const typography = server.getContext('designSystem.typography');
console.log('Headings Font:', typography.headings.fontFamily);
console.log('Body Font:', typography.body.fontFamily);
console.log();

// Test 6: Get integrations
console.log('📋 Test 6: Get Integrations');
console.log('Query: getContext("techStack.integrations")');
const integrations = server.getContext('techStack.integrations');
console.log('Email:', integrations.email);
console.log('Messaging:', integrations.messaging);
console.log('Analytics:', integrations.analytics);
console.log('Maps:', integrations.maps);
console.log();

// Test 7: Get accessibility standard
console.log('📋 Test 7: Get Accessibility Standard');
console.log('Query: getContext("accessibility.standard")');
console.log('Result:', server.getContext('accessibility.standard'));
console.log();

// Test 8: Get performance targets
console.log('📋 Test 8: Get Performance Targets');
console.log('Query: getContext("performance.targets.lighthouse")');
const lighthouseTargets = server.getContext('performance.targets.lighthouse');
console.log('Performance:', lighthouseTargets.performance);
console.log('Accessibility:', lighthouseTargets.accessibility);
console.log('Best Practices:', lighthouseTargets.bestPractices);
console.log('SEO:', lighthouseTargets.seo);
console.log();

// Test 9: Get component standards
console.log('📋 Test 9: Get React Component Standards');
console.log('Query: getContext("codingStandards.react.components")');
const componentStandards = server.getContext('codingStandards.react.components');
console.log('Style:', componentStandards.style);
console.log('Default Export:', componentStandards.defaultExport);
console.log();

// Test 10: Get complete context summary
console.log('📋 Test 10: Context Summary');
const fullContext = server.getContext();
console.log('Total context sections:', Object.keys(fullContext).length);
console.log('Available sections:', Object.keys(fullContext).join(', '));
console.log();

console.log('═══════════════════════════════════════════════════════════');
console.log('✅ All tests completed successfully!');
console.log('═══════════════════════════════════════════════════════════');
