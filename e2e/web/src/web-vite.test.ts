import {
  checkFilesDoNotExist,
  checkFilesExist,
  cleanupProject,
  createFile,
  isNotWindows,
  killPorts,
  newProject,
  removeFile,
  runCLI,
  runCLIAsync,
  runCypressTests,
  uniq,
} from '@nrwl/e2e/utils';

describe('Web Components Applications with bundler set as vite', () => {
  beforeEach(() => newProject());
  afterEach(() => cleanupProject());

  it('should be able to generate a web app', async () => {
    const appName = uniq('app');
    runCLI(`generate @nrwl/web:app ${appName} --bundler=vite --no-interactive`);

    const lintResults = runCLI(`lint ${appName}`);
    expect(lintResults).toContain('All files pass linting.');

    runCLI(`build ${appName}`);
    checkFilesExist(`dist/apps/${appName}/index.html`);

    const testResults = await runCLIAsync(`test ${appName}`);

    expect(testResults.combinedOutput).toContain('Tests  2 passed (2)');

    const lintE2eResults = runCLI(`lint ${appName}-e2e`);

    expect(lintE2eResults).toContain('All files pass linting.');

    if (isNotWindows() && runCypressTests()) {
      const e2eResults = runCLI(`e2e ${appName}-e2e --no-watch`);
      expect(e2eResults).toContain('All specs passed!');
      expect(await killPorts()).toBeTruthy();
    }
  }, 500000);

  it('should be able to generate a web app with standaloneConfig', async () => {
    const appName = uniq('app');
    runCLI(
      `generate @nrwl/web:app ${appName} --bundler=vite --no-interactive --standalone-config`
    );

    checkFilesExist(`apps/${appName}/project.json`);

    const lintResults = runCLI(`lint ${appName}`);
    expect(lintResults).toContain('All files pass linting.');
  }, 120000);

  it('should remove previous output before building', async () => {
    const appName = uniq('app');
    const libName = uniq('lib');

    runCLI(`generate @nrwl/web:app ${appName} --bundler=vite --no-interactive`);
    runCLI(
      `generate @nrwl/react:lib ${libName} --bundler=vite --no-interactive --unitTestRunner=vitest`
    );

    createFile(`dist/apps/${appName}/_should_remove.txt`);
    createFile(`dist/libs/${libName}/_should_remove.txt`);
    createFile(`dist/apps/_should_not_remove.txt`);
    checkFilesExist(
      `dist/apps/${appName}/_should_remove.txt`,
      `dist/apps/_should_not_remove.txt`
    );
    runCLI(`build ${appName}`);
    runCLI(`build ${libName}`);
    checkFilesDoNotExist(
      `dist/apps/${appName}/_should_remove.txt`,
      `dist/libs/${libName}/_should_remove.txt`
    );
    checkFilesExist(`dist/apps/_should_not_remove.txt`);
  }, 120000);

  it('should support workspaces w/o workspace config file', async () => {
    removeFile('workspace.json');
    const myapp = uniq('myapp');
    runCLI(`generate @nrwl/web:app ${myapp} --bundler=vite --directory=myDir`);

    runCLI(`build my-dir-${myapp}`);
    expect(() =>
      checkFilesDoNotExist('workspace.json', 'angular.json')
    ).not.toThrow();
  }, 1000000);
});
