import React from 'react';

import Select, { Props as ReactSelectProps } from 'react-select';
import Creatable, { CreatableProps as ReactCreatableSelectProps } from 'react-select/creatable';
import { useTheme } from '@grafana/ui';
import { OptionProps } from 'react-select/src/components/Option';
import { getStyles, itemClass, descriptionClass } from '../config/Common';

import { css, cx } from 'emotion';

function CustomOptionWrapper<T>(renderOption: RenderOption<T>) {
  return function CustomOption<T>(props: OptionProps<T>) {
    const theme = useTheme();
    const styles = getStyles(theme);
    const { isFocused, innerProps } = props;

    const description = renderOption.getOptionDescription?.(props.data);
    const warning = renderOption.getOptionWarning?.(props.data);
    const icon = renderOption.getOptionIcon?.(props.data);

    return (
      <div className={cx(styles.option, isFocused && styles.optionFocused)} {...innerProps}>
        {icon && (
          <div
            className={css`
              width: 16px;
              margin-right: 10px;
            `}
          >
            <i className={`fa fa-${icon}`} />
          </div>
        )}

        <div className={itemClass}>
          <span>{props.label}</span>
          <div className={descriptionClass}> {description} </div>
        </div>
        <span>
          {warning && (
            <div
              className={css`
                display: inline-block;
              `}
            >
              {warning}
            </div>
          )}
        </span>
      </div>
    );
  };
}

interface RenderOption<T> {
  getOptionDescription?: (option: T) => string;
  getOptionIcon?: (option: T) => string;
  getOptionWarning?: (option: T) => React.ReactNode;
}
type CommonProps<T> = ReactCreatableSelectProps<T> &
  ReactSelectProps<T> &
  RenderOption<T> & { allowCustomValue?: boolean };

function SelectComponent<T>(props: CommonProps<T>) {
  return props.allowCustomValue ? <Creatable<T> {...props} /> : <Select<T> {...props} />;
}

function getStringValue<T>(option: T, fn?: (option: T) => string): string {
  if (fn) {
    return fn(option);
  }

  if (typeof option === 'string') {
    return option;
  }

  return '';
}

export function ReactSelect<T>(props: CommonProps<T>) {
  const theme = useTheme();
  const colors = theme.colors;
  const borderColor = colors.formInputBorder;
  const multiValueContainerBg = theme.colors.bg2;
  const valueColor = theme.colors.text;
  const menuShadowColor = theme.colors.dropdownShadow;

  return (
    <SelectComponent<T>
      {...props}
      getOptionLabel={(option) => getStringValue(option, props.getOptionLabel)}
      getOptionValue={(option) => getStringValue(option, props.getOptionValue)}
      components={{
        Option: CustomOptionWrapper(props),
        ...props.components,
      }}
      styles={{
        menuPortal: ({ position, width }: any) => ({
          position,
          width,
          zIndex: theme.zIndex.dropdown,
        }),
        //These are required for the menu positioning to function
        menu: ({ top, bottom, position }: any) => ({
          top,
          bottom,
          position,
          marginBottom: !!bottom ? '10px' : '0',
          minWidth: '100%',
          zIndex: theme.zIndex.dropdown,

          backgroundColor: theme.colors.dropdownBg,
        }),
        menuList: (provided: any) => ({
          ...provided,
          backgroundColor: theme.colors.formInputBg,
          boxShadow: `0px 4px 4px ${menuShadowColor}`,
        }),
        container: (provided: any) => ({
          ...provided,
          position: 'relative',
          width: '100%',
        }),
        control: (p: any, state: any) => ({
          boxShadow:
            state.isFocused && `0 0 0 2px ${theme.colors.bodyBg}, 0 0 0px 4px ${theme.colors.formFocusOutline}`,
          width: '100%',
          borderRadius: '2px',
          backgroundColor: colors.formInputBg,
          lineHeight: theme.typography.lineHeight.md,
          fontSize: theme.typography.size.md,
          color: colors.formInputText,
          border: `1px solid ${borderColor}`,
          padding: '0px 0px 0px 8px',
          minHeight: '32px',
          height: 'auto',
          flexFlow: 'row wrap',
          maxWidth: '100%',
          '-webkit-box-align': 'center',
          alignItems: 'center',
          cursor: 'default',
          display: 'flex',
          '-webkit-box-pack': 'justify',
          justifyContent: 'space-between',
          position: 'relative',
          boxSizing: 'border-box',
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          opacity: state.isDisabled ? 0.5 : 1,
        }),
        input: (provided: any) => ({
          ...provided,
          color: colors.formInputText,
        }),
        singleValue: (provided: any) => ({
          ...provided,
          color: valueColor,
        }),
        multiValue: (provided: any) => ({
          ...provided,
          backgroundColor: multiValueContainerBg,
        }),
        multiValueLabel: (provided: any) => ({
          ...provided,
          color: valueColor,
        }),
        multiValueRemove: (provided: any) => ({
          marginTop: '3px',
        }),
      }}
    />
  );
}
