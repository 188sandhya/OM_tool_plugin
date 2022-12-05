import { GitCfgPage } from './config/Git';
import { CicdCfgPage } from './config/CICD';
import { SonarqubeCfgPage } from './config/SonarQube';
import { JiraCfgPage } from './config/Jira';

import { AppPlugin } from '@grafana/data';

import { css } from 'emotion';
import '@emotion/core';

import { loadPluginCss } from './grafana';
import { Config } from './config/Config';
import { OmaConfig } from './components/types';
import { RootPage } from './RootPage';
import { configWrapper } from './config/ConfigPageWrapper';

loadPluginCss({
  dark: 'plugins/grafana-eb-app/styles/dark.css',
  light: 'plugins/grafana-eb-app/styles/light.css',
});

const iconClassName = (iconName: string) =>
  `fa fa-${iconName} ${css`
    margin-right: 8px;
  `}`;

export const plugin = new AppPlugin<OmaConfig>()
  .setRootPage(RootPage)
  .addConfigPage({
    title: 'Config',
    icon: 'gicon gicon-cog',
    body: configWrapper(Config),
    id: 'config',
  })
  .addConfigPage({
    title: 'Git',
    icon: iconClassName('git'),
    body: configWrapper(GitCfgPage),
    id: 'git',
  })
  .addConfigPage({
    title: 'Jenkins',
    icon: iconClassName('retweet'),
    body: configWrapper(CicdCfgPage),
    id: 'cicd',
  })
  .addConfigPage({
    title: 'Jira',
    icon: iconClassName('comments'),
    body: configWrapper(JiraCfgPage),
    id: 'jira',
  })
  .addConfigPage({
    title: 'SonarQube',
    icon: iconClassName('bullseye'),
    body: configWrapper(SonarqubeCfgPage),
    id: 'sonar',
  });
