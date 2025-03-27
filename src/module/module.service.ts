import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import * as fs from 'node:fs';
import { ModuleConfig, ModulesFile } from '../types/Module/module';
import * as path from 'node:path';
import { URL } from '../helpers/env';
import { exec } from 'child_process';


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
      console.log('Modules loaded:', this.modules);
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
    console.log(this.modules, name);
    if (module) {
      module.enabled = true;
      this.saveConfig();
      this.updateNginx();
    }
  }

  disableModule(name: string) {
    const module = this.modules?.find(m => m.name === name);
    if (module) {
      module.enabled = false;
      this.saveConfig();
      this.updateNginx();
    }
  }

  private updateNginx() {
    try {
      const config = this.modules
        .filter(m => m.enabled)
        .map(m => `location /api/${m.name} proxy_pass http://${m.services.backend.host}:${m.services.backend.port}`)
        .join('/n');

      const nginxConfig = `
      server {
        listen 443 ssl;
        server_name ${URL};

        ssl_certificate /etc/nginx/ssl/nginx.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx.key;

        location / {
                proxy_pass http://127.0.0.1:5000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
      }
    `;
      fs.writeFileSync('/etc/nginx/sites-available/api.misaserver.ru', nginxConfig);
      console.log('privet');
      exec('systemctl restart nginx', (err) => {
        // if (err) console.error('Ошибка при обновлении Nginx:', err);
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
