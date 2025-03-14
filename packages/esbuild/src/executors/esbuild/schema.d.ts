import { AssetGlob } from '@nrwl/workspace/src/utilities/assets';

type Compiler = 'babel' | 'swc';

export interface EsBuildExecutorOptions {
  additionalEntryPoints?: string[];
  assets: AssetGlob[];
  buildableProjectDepsInPackageJsonType?: 'dependencies' | 'peerDependencies';
  deleteOutputPath?: boolean;
  dependenciesFieldType?: boolean;
  esbuildOptions?: Record<string, any>;
  external?: string[];
  format?: Array<'esm' | 'cjs'>;
  main: string;
  metafile?: boolean;
  minify?: boolean;
  outputFileName?: string;
  outputHashing?: 'none' | 'all';
  outputPath: string;
  platform?: 'node' | 'browser' | 'neutral';
  project: string;
  skipTypeCheck?: boolean;
  target?: string;
  thirdParty?: boolean;
  tsConfig: string;
  watch?: boolean;
}

export interface NormalizedEsBuildExecutorOptions
  extends EsBuildExecutorOptions {
  singleEntry: boolean;
  external: string[];
}
