import React from 'react';
import { Table } from '../Grafana/Table/Table';
import { Row } from '../Grafana/Table/Row';
import { DeleteButton } from './DeleteButton';
import { HappinessMetric } from '../types';

interface Props {
  metrics: HappinessMetric[];
  onRemoveHappiness: (metricId: number) => Promise<any>;
  onRemoveSuccess: (response: Promise<any>) => void;
}

export const HappinessList: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Table>
      <thead className={'ebTableHeader'}>
        <tr>
          <th>Happiness</th>
          <th>Safety</th>
          <th>Date</th>
          <th className={'buttonColumn'}></th>
        </tr>
      </thead>
      <tbody>
        {props.metrics.map((metric) => {
          if (metric.enabled) {
            return (
              <Row key={metric.id}>
                <td className="link-td text-center" style={{ height: 80 }}>
                  <a href={`/a/grafana-eb-app/?page=edit_happiness_metric&happinessMetricId=${metric.id}`}>
                    <div style={{ fontSize: 56 }}>{metric2Pic(metric.happiness)}</div>
                  </a>
                </td>
                <td className="link-td text-center">
                  <a href={`/a/grafana-eb-app/?page=edit_happiness_metric&happinessMetricId=${metric.id}`}>
                    <div style={{ fontSize: 56 }}>{metric2Pic(metric.safety)}</div>
                  </a>
                </td>
                <td className="link-td text-center">
                  <a href={`/a/grafana-eb-app/?page=edit_happiness_metric&happinessMetricId=${metric.id}`}>
                    {
                      // @ts-ignore
                      new Date(metric.date).toISOString().split('T')[0]
                    }
                  </a>
                </td>
                <td>
                  <DeleteButton
                    onConfirm={() =>
                      props.onRemoveHappiness(metric.id!).then((response) => {
                        props.onRemoveSuccess(response);
                      })
                    }
                    confirmBody={<>The Happiness Metric will be removed</>}
                  />
                </td>
              </Row>
            );
          } else {
            return (
              <Row key={metric.id}>
                <td className="link-td text-center" style={{ height: 80 }}>
                  <div style={{ fontSize: 56 }}>{metric2Pic(metric.happiness)}</div>
                </td>
                <td className="link-td text-center">
                  <div style={{ fontSize: 56 }}>{metric2Pic(metric.safety)}</div>
                </td>
                <td className="link-td text-center">
                  {
                    // @ts-ignore
                    new Date(metric.date).toISOString().split('T')[0]
                  }
                </td>
                <td></td>
              </Row>
            );
          }
        })}
      </tbody>
    </Table>
  );
};

function metric2Pic(metricVal: number): string {
  if (metricVal < 4) {
    return '🙁';
  }

  if (metricVal >= 4 && metricVal <= 6) {
    return '😐';
  }

  return '🙂';
}
