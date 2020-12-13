export const REACT_SELECT_OPTION_CUSTOM_STYLE = {
  option: (provided, state) => {
    let color = 'white';
    let background = 'transparent';
    if (state.isDisabled) {
      color = '#798892';
    } else if (state.isFocused || state.isSelected) {
      background = '#1870DC';
    }
    return {
      ...provided,
      color,
      backgroundColor: background,
    };
  },
  menuPortal: provided => ({
    ...provided,
    container: {
      background: '#040620',
    },
  }),
};

export const EDITOR_TYPE = {
  NORMAL: 1,
  EMAIL: 2,
};
