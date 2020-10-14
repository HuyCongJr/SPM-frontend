import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import studentApi from '../../../libs/apis/student/student.api';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from '../../../components/constants';

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.child.name}</span>
  </div>
);

const StudentSelect = ({
  onBlur,
  invalid,
  name,
  placeholder,
  onAdded,
  onChange,
  value,
  ...props
}) => {
  const loadOptions1 = debounce((inputValue, cb) => {
    studentApi
      .search({
        page: 1,
        size: 10,
        filter: {
          search: inputValue,
        },
      })
      .then(resp => cb(resp.rows));
  }, 300);
  return (
    <>
      <InputGroup className={classNames({ 'is-invalid': invalid })} {...props}>
        <AsyncSelect
          aria-labelledby="test"
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={placeholder}
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `Not found any student with search "${inputValue}", try to search another`
              : 'Input and search student'
          }
          loadOptions={loadOptions1}
          styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
          isClearable
          onBlur={onBlur}
          onChange={onChange}
          formatOptionLabel={formatOptionLabel}
          getOptionValue={data => data.id}
          name={name}
          value={value}
        />
      </InputGroup>
    </>
  );
};

StudentSelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  creatable: PropTypes.bool,
};

export default StudentSelect;