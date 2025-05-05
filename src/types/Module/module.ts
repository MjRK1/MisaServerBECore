export interface ModuleConfig {
  name: string;
  img?: string | null;
  repo?: string;
  basePath: string;
  services: {
    backend: { host: string, port: number },
    frontend?: { host: string, port: number}
  },
  enabled: boolean
}

export interface ModulesFile {
  modules: ModuleConfig[];
}
