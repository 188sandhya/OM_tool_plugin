import React from 'react';
import { css } from 'emotion';
import Calendar from 'react-calendar/dist/entry.nostyle';
import { GrafanaTheme, GrafanaThemeType } from '@grafana/data';
import { OnChangeDateCallback } from 'react-calendar';
import { Themeable, withTheme } from '@grafana/ui';

interface Props extends Themeable {
  value: Date;
  selectRange: boolean;
  onChange: OnChangeDateCallback;
}

export const UnthemedTimePicker = ({ theme, value, selectRange, onChange }: Props) => {
  return (
    <Calendar
      value={value}
      onChange={onChange}
      selectRange={selectRange}
      next2Label={null}
      prev2Label={null}
      className={getBodyCss(theme)}
      tileClassName={getTitleCss(theme)}
      nextLabel={<span className="fa fa-angle-right" />}
      prevLabel={<span className="fa fa-angle-left" />}
      locale="en"
    />
  );
};

const getTitleCss = (theme: GrafanaTheme) => {
  return css`
      color: ${theme.colors.text}
      background-color: ${getThemeColors(theme).background};
      font-size: ${theme.typography.size.md};
      border: 1px solid transparent;

      &:hover {
        position: relative;
      }
    `;
};

const getBodyCss = (theme: GrafanaTheme) => {
  return css`
    z-index: 1;
    background-color: ${getThemeColors(theme).background};
    width: 100%;

    .react-calendar__navigation__label,
    .react-calendar__navigation__arrow,
    .react-calendar__navigation {
      padding-top: 4px;
      background-color: inherit;
      color: ${theme.colors.text};
      border: 0;
      font-weight: ${theme.typography.weight.semibold};
    }

    .react-calendar__month-view__weekdays {
      background-color: inherit;
      text-align: center;
      color: ${theme.palette.blue77};

      abbr {
        border: 0;
        text-decoration: none;
        cursor: default;
        display: block;
        padding: 4px 0 4px 0;
      }
    }

    .react-calendar__month-view__days {
      background-color: inherit;
    }

    .react-calendar__tile,
    .react-calendar__tile--now {
      margin-bottom: 4px;
      background-color: inherit;
      height: 26px;
    }

    .react-calendar__navigation__label,
    .react-calendar__navigation > button:focus,
    .time-picker-calendar-tile:focus {
      outline: 0;
    }

    .react-calendar__tile--active,
    .react-calendar__tile--active:hover {
      color: ${theme.palette.white};
      font-weight: ${theme.typography.weight.semibold};
      background: ${theme.palette.blue95};
      box-shadow: none;
      border: 0px;
    }

    .react-calendar__tile--rangeEnd,
    .react-calendar__tile--rangeStart {
      padding: 0;
      border: 0px;
      color: ${theme.palette.white};
      font-weight: ${theme.typography.weight.semibold};
      background: ${theme.palette.blue95};

      abbr {
        background-color: ${theme.palette.blue77};
        border-radius: 100px;
        display: block;
        padding-top: 2px;
        height: 26px;
      }
    }

    .react-calendar__tile--rangeStart {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    .react-calendar__tile--rangeEnd {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  `;
};

const getThemeColors = (theme: GrafanaTheme) => {
  return {
    border: selectThemeVariant(
      {
        light: theme.palette.gray4,
        dark: theme.palette.gray25,
      },
      theme.type
    ),
    background: selectThemeVariant(
      {
        dark: theme.palette.dark2,
        light: theme.colors.dropdownBg,
      },
      theme.type
    ),
    shadow: selectThemeVariant(
      {
        light: theme.palette.gray85,
        dark: theme.palette.black,
      },
      theme.type
    ),
    formBackground: selectThemeVariant(
      {
        dark: theme.palette.gray15,
        light: theme.palette.gray98,
      },
      theme.type
    ),
  };
};

const selectThemeVariant = (variants: VariantDescriptor, currentTheme?: GrafanaThemeType) => {
  return variants[currentTheme || GrafanaThemeType.Dark];
};

type VariantDescriptor = { [key in GrafanaThemeType]: string | number };

export const TimePicker = withTheme(UnthemedTimePicker);
TimePicker.displayName = 'TimePicker';
