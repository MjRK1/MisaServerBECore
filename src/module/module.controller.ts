import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleConfig } from '../types/Module/module';
import { Public } from '../decorators/isPublic.decorator';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Public()
  @Get()
  getModules(): ModuleConfig[] {
    return this.moduleService.getModules();
  }

  @Public()
  @Post('enable')
  enableModule(@Body() { name } : {name: string}) {
    return this.moduleService.enableModule(name);
  }
}
