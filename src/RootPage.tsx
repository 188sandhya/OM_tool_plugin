import React, { PureComponent } from 'react';
import { AppRootProps, NavModelItem, KeyValue, NavModel, NavModelBreadcrumb } from '@grafana/data';
import { OmaConfig, HappinessMetric, Org } from './components/types';

import { contextSrv } from './grafana';
import { getISODate, grafanaFetch } from './containers/common';
import { CRUISER_HAPPINESS_METRIC_URL } from './api/config';

import {
  PAGE_ID_EDIT_HAPPINESS_METRIC,
  URL_REGISTER_FEEDBACK_AND_SATISFACTION,
  PAGE_ID_ADD_HAPPINESS_METRIC,
} from './components/Forms/constants';
import { Spinner } from '@grafana/ui';
import Feedback from './containers/Feedback';
import { AddHappinessMetric } from './containers/AddHappinessMetric';
import { EditHappinessMetric } from './containers/EditHappinessMetric';
import { setOrgId } from './config/Common';

interface Props extends AppRootProps<OmaConfig> {}

interface Params {
  happinessMetric?: HappinessMetric;
}

interface State extends Params {
  org: Org;
  page?: Page;
}

interface Page {
  id: string;
  navModel: (params: Params) => NavModelBreadcrumb;
  getComponent: (state: State, props: Props) => React.ReactNode;
  getBreadcrumb: (params: Params) => NavModelBreadcrumb[];
}

// other
const PAGE_REGISTER_FEEDBACK_AND_SATISFACTION: Page = {
  id: 'register_feedback_and_satisfaction',
  navModel: (params) => ({
    title: 'Register Feedback and Satisfaction',
    url: URL_REGISTER_FEEDBACK_AND_SATISFACTION(),
  }),
  getComponent: function feedbackComponent(state) {
    return <Feedback feedbackDate={new Date(getISODate(null))} />;
  },
  getBreadcrumb: (params) => [{ title: 'Team Metrics', url: '/d/team-metrics' }],
};

const PAGE_ADD_HAPPINESS_METRIC: Page = {
  id: PAGE_ID_ADD_HAPPINESS_METRIC,
  getBreadcrumb: (params) => [
    {
      title: PAGE_REGISTER_FEEDBACK_AND_SATISFACTION.navModel(params).title,
      url: PAGE_REGISTER_FEEDBACK_AND_SATISFACTION.navModel(params).url,
    },
  ],
  navModel: () => ({ title: 'Add Happiness Metric' }),
  getComponent: function addHappinessMetricComponent() {
    return <AddHappinessMetric />;
  },
};

const PAGE_EDIT_HAPPINESS_METRIC: Page = {
  id: PAGE_ID_EDIT_HAPPINESS_METRIC,
  getBreadcrumb: (params) => [
    {
      title: PAGE_REGISTER_FEEDBACK_AND_SATISFACTION.navModel(params).title,
      url: PAGE_REGISTER_FEEDBACK_AND_SATISFACTION.navModel(params).url,
    },
  ],
  navModel: () => ({ title: 'Edit Happiness Metric' }),
  getComponent: function editHappinessMetricComponent(state) {
    return <EditHappinessMetric metric={state.happinessMetric!} />;
  },
};

export class RootPage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { orgId, orgName } = contextSrv.user;
    this.state = {
      org: { id: orgId, name: orgName },
    };
  }

  async componentDidMount() {
    setOrgId(this.props.query.orgId);
    await this.updateNav();
  }

  async componentDidUpdate(prevProps: Props) {
    setOrgId(this.props.query.orgId);
    if (this.props.query !== prevProps.query) {
      if (this.props.query.page !== prevProps.query.page) {
        await this.updateNav();
      }
    }
  }

  updateNav = async () => {
    const navModel = await this.getNavModel(this.props.query);
    this.props.onNavChanged(navModel);
  };

  getPage = (query: KeyValue<any>): Page => {
    switch (query['page']) {
      case PAGE_REGISTER_FEEDBACK_AND_SATISFACTION.id: {
        return PAGE_REGISTER_FEEDBACK_AND_SATISFACTION;
      }

      case PAGE_ADD_HAPPINESS_METRIC.id: {
        return PAGE_ADD_HAPPINESS_METRIC;
      }

      case PAGE_EDIT_HAPPINESS_METRIC.id: {
        return PAGE_EDIT_HAPPINESS_METRIC;
      }

      default:
        return PAGE_REGISTER_FEEDBACK_AND_SATISFACTION;
    }
  };

  fetchHappinessMetric = (id: number) =>
    grafanaFetch<any>(CRUISER_HAPPINESS_METRIC_URL(id)) as Promise<HappinessMetric>;

  getNavModel = async (query: KeyValue<any>): Promise<NavModel> => {
    const { meta } = this.props;

    let happinessMetric: HappinessMetric | undefined;

    let page = this.getPage(query);

    let happinessMetricId = query['happinessMetricId'];
    if (happinessMetricId) {
      happinessMetric = await this.fetchHappinessMetric(happinessMetricId);
    }

    const params: Params = { happinessMetric: happinessMetric };

    const node: NavModelItem = {
      text: page.navModel(params).title,
      img: meta.info.logos.large,
      subTitle: 'OMA Tool',
      breadcrumbs: page.getBreadcrumb(params),
    };

    this.setState({
      ...this.state,
      happinessMetric: happinessMetric,

      page: page,
    });

    return {
      node: { ...node, text: '' },
      main: node,
    };
  };

  render() {
    return (this.state.page && this.state.page.getComponent(this.state, this.props)) || <Spinner />;
  }
}
