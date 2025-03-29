import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'node:fs';
import { ModuleConfig } from '../types/Module/module';
import * as path from 'node:path';


const CONFIG_PATH = path.join(__dirname, '../../../ModulesConfigs/modules.json');


@Injectable()
export class ModuleService implements OnModuleInit {
  private modules: ModuleConfig[] = [];

  constructor() {
    this.loadModuleConfig();
  }

  async onModuleInit() {
    await this.loadModuleConfig();
  }

  private async loadModuleConfig() {
    try {
      const fileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
      const parsedConfig = JSON.parse(fileContents) as ModuleConfig[];
      this.modules = parsedConfig || [];
    } catch (error) {
      this.modules = [];
    }
  }


  private saveConfig() {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(this.modules, null, 2), 'utf8');
  }

  getModules(): ModuleConfig[] {
    return this.modules;
  }

  enableModule(name: string) {
    const module = this.modules?.find(m => m.name === name);
    if (module) {
      module.enabled = true;
      this.saveConfig();
    }
  }

  disableModule(name: string) {
    const module = this.modules?.find(m => m.name === name);
    if (module) {
      module.enabled = false;
      this.saveConfig();
    }
  }
}
