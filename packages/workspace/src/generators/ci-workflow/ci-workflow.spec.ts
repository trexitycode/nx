import {
  NxJsonConfiguration,
  readJson,
  Tree,
  updateJson,
  writeJson,
} from '@nrwl/devkit';
import { createTreeWithEmptyV1Workspace } from '@nrwl/devkit/testing';
import { ciWorkflowGenerator } from './ci-workflow';

describe('lib', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyV1Workspace();
  });

  it('should generate github CI config', async () => {
    setNxCloud(tree);
    await ciWorkflowGenerator(tree, { ci: 'github' });

    expect(tree.read('.github/workflows/ci.yml', 'utf-8')).toMatchSnapshot();
  });

  it('should generate circleci CI config', async () => {
    setNxCloud(tree);
    await ciWorkflowGenerator(tree, { ci: 'circleci' });

    expect(tree.read('.circleci/config.yml', 'utf-8')).toMatchSnapshot();
  });

  it('should generate azure CI config', async () => {
    setNxCloud(tree);
    await ciWorkflowGenerator(tree, { ci: 'azure' });

    expect(tree.read('azure-pipelines.yml', 'utf-8')).toMatchSnapshot();
  });

  it('should generate github CI config with custom name', async () => {
    setNxCloud(tree);
    await ciWorkflowGenerator(tree, {
      ci: 'github',
      name: 'My custom-workflow',
    });

    expect(
      tree.read('.github/workflows/my-custom-workflow.yml', 'utf-8')
    ).toMatchSnapshot();
  });

  it('should generate bitbucket pipelines config', async () => {
    setNxCloud(tree);
    await ciWorkflowGenerator(tree, { ci: 'bitbucket-pipelines' });

    expect(tree.read('bitbucket-pipelines.yml', 'utf-8')).toMatchSnapshot();
  });

  it('should prefix nx.json affected defaultBase with origin/ if ci is bitbucket-pipelines', async () => {
    setNxCloud(tree);

    const nxJson = readJson(tree, 'nx.json');
    nxJson.affected.defaultBase = 'my-branch';
    writeJson(tree, 'nx.json', nxJson);

    await ciWorkflowGenerator(tree, { ci: 'bitbucket-pipelines' });

    expect(readJson(tree, 'nx.json').affected.defaultBase).toEqual(
      'origin/my-branch'
    );
  });

  it('should generate gitlab config', async () => {
    setNxCloud(tree);
    await ciWorkflowGenerator(tree, { ci: 'gitlab' });

    expect(tree.read('.gitlab-ci.yml', 'utf-8')).toMatchSnapshot();
  });

  it('should throw error is nx cloud is not set', async () => {
    await expect(
      ciWorkflowGenerator(tree, {
        ci: 'github',
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});

function setNxCloud(tree: Tree) {
  updateJson<NxJsonConfiguration>(tree, 'nx.json', (json) => {
    return {
      ...json,
      tasksRunnerOptions: {
        default: {
          runner: '@nrwl/nx-cloud',
        },
      },
    };
  });
}
