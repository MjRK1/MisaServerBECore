import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ModuleService } from './module.service';
import { Response } from 'express';
import { ModuleConfig } from '../types/Module/module';
import { Public } from '../decorators/isPublic.decorator';
import path from 'node:path';
import * as process from 'node:process';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get()
  getModules(): ModuleConfig[] {
    return this.moduleService.getModules();
  }

  @Public()
  @Get('/image/:name')
  getModuleImage(
    @Param('name') name: string,
    @Res() res: Response
  ) {
    const module = this.moduleService.getModuleByName(name);
    if (module.img) {
      res.set({
        'Content-Type': `image/${module.img}`,
        'Content-Disposition': `attachment; filename="${module.img}"`,
      });
      return res.sendFile(path.join(process.cwd(), 'ModulesConfigs/ModulesImages/', module.img));
    }
    return null;
  }

  @Post('enable')
  enableModule(@Body() { name } : {name: string}) {
    return this.moduleService.enableModule(name);
  }
}
