#!/usr/bin/env node

/**
 * MCP Server for AstroLiana Project
 * Provides contextual information about the project structure, tech stack, and coding standards
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '.context7', 'config.json');
const PORT = process.env.MCP_PORT || 3001;

class MCPServer {
  constructor() {
    this.config = this.loadConfig();
    this.context = this.buildContext();
  }

  loadConfig() {
    try {
      const configData = fs.readFileSync(CONFIG_PATH, 'utf8');
      return JSON.parse(configData);
    } catch (error) {
      console.error('Error loading config:', error.message);
      process.exit(1);
    }
  }

  buildContext() {
    return {
      project: this.config.project,
      techStack: this.config.techStack,
      designSystem: this.config.designSystem,
      codingStandards: this.config.codingStandards,
      architecture: this.config.architecture,
      accessibility: this.config.accessibility,
      performance: this.config.performance,
      testing: this.config.testing,
      git: this.config.git,
      documentation: this.config.documentation,
      timestamp: new Date().toISOString()
    };
  }

  getContext(query) {
    if (!query) {
      return this.context;
    }

    const parts = query.split('.');
    let result = this.context;

    for (const part of parts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part];
      } else {
        return null;
      }
    }

    return result;
  }

  start() {
    console.log('🚀 MCP Server for AstroLiana starting...');
    console.log(`📁 Config loaded from: ${CONFIG_PATH}`);
    console.log(`🎯 Project: ${this.config.project.name}`);
    console.log(`✅ Context ready with ${Object.keys(this.context).length} top-level keys`);
    console.log('\n📋 Available context sections:');
    Object.keys(this.context).forEach(key => {
      console.log(`   - ${key}`);
    });
    console.log('\n💡 Use getContext(query) to retrieve specific context');
    console.log('   Example: getContext("techStack.framework")');
  }
}

if (require.main === module) {
  const server = new MCPServer();
  server.start();

  global.mcpServer = server;
  global.getContext = (query) => server.getContext(query);

  console.log('\n🔍 Try: getContext() or getContext("project.name")');
}

module.exports = MCPServer;
