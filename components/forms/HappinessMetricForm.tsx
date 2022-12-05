import React, { PureComponent } from 'react';
import { Form } from '../Grafana/Form/Form';
import { Row } from '../Grafana/Form/Row';
import { HappinessMetric, Id } from '../types';
import { getISODate } from '../../containers/common';

import { contextSrv } from '../../grafana';

interface Props {
  editMode?: boolean;
  metric?: HappinessMetric;
  onSubmitSuccess: () => void;
  onSubmitFail: (err: Error) => void;
  onSubmit: (metric: HappinessMetric) => Promise<Id>;
}

interface State extends HappinessMetric {}

export class HappinessMetricForm extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = this.props.metric || this.getCleanState();

    this.handleHappinessChange = this.handleHappinessChange.bind(this);
    this.handleSafetyChange = this.handleSafetyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getCleanState(): HappinessMetric {
    return {
      id: 0,
      orgId: contextSrv.user.orgId,
      userId: contextSrv.user.id,
      happiness: 0,
      safety: 0,
      date: getISODate(null),
      enabled: true,
    };
  }

  handleHappinessChange(event: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({
      happiness: parseInt(event.currentTarget.value, 10),
    });
  }

  handleSafetyChange(event: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({
      safety: parseInt(event.currentTarget.value, 10),
    });
  }

  handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  handleSubmit() {
    const data = {
      orgId: this.state.orgId,
      userId: this.state.userId,
      happiness: this.state.happiness,
      safety: this.state.safety,
      date: this.state.date,
      enabled: this.state.enabled,
    };

    this.createMetric(data);
  }

  createMetric(metric: HappinessMetric) {
    this.props
      .onSubmit(metric)
      .then(() => {
        this.props.onSubmitSuccess();
        this.resetState();
      })
      .catch((err) => {
        this.props.onSubmitFail(err);
      });
  }

  resetState() {
    this.setState(this.getCleanState());
  }

  render() {
    const { happiness, safety } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} editMode={this.props.editMode}>
        <Row label="Happiness" tooltip={<div>Rate your happiness, 1: extremely unhappy, 10: extremely happy </div>}>
          <input
            name="happiness"
            type="number"
            className="gf-form-input"
            value={happiness}
            min="1"
            max="10"
            step="1"
            required
            onChange={this.handleHappinessChange}
            onFocus={this.handleFocus}
          />
        </Row>

        <Row label="Safety" tooltip={<div>Rate your safety, 1: extremely unsafe, 10: extremely safe </div>}>
          <input
            name="safety"
            type="number"
            className="gf-form-input"
            value={safety}
            min="1"
            max="10"
            step="1"
            required
            onChange={this.handleSafetyChange}
            onFocus={this.handleFocus}
          />
        </Row>
      </Form>
    );
  }
}
