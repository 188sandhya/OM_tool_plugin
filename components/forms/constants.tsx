export const PAGE_ID_ADD_HAPPINESS_METRIC = 'add_happiness_metric';
export const PAGE_ID_EDIT_HAPPINESS_METRIC = 'edit_happiness_metric';
export const PAGE_ID_REGISTER_FEEDBACK_AND_SATISFACTION = 'register_feedback_and_satisfaction';

export const URL_ROOT = '/a/grafana-eb-app';

// other
export const URL_ADD_HAPPINESS_METRIC = () => `${URL_ROOT}/?page=${PAGE_ID_ADD_HAPPINESS_METRIC}`;
export const URL_REGISTER_FEEDBACK_AND_SATISFACTION = () =>
  `${URL_ROOT}/?page=${PAGE_ID_REGISTER_FEEDBACK_AND_SATISFACTION}`;
