import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import useMyForm from '../../../libs/hooks/useMyForm';
import FormError from '../../../components/Form/FormError';
import FormGroup from '../../../components/Form/FormGroup';
import SubmitButton from '../../../components/button/SubmitButton';
import { getClientId } from '../../../libs/utils/storage';
import { SURVEY_ROOT_PATH } from '../constants';

const schema = Yup.object().shape({
  code: Yup.string().required('This field is required.'),
});

const VerifyCodeForm = ({ surveyId, target }) => {
  const history = useHistory();
  const clientId = getClientId();
  const {
    register,
    errors,
    onSubmit,
    formState: { isDirty, isValid },
    state: { isLoading, errors: serverErrors },
  } = useMyForm({
    validationSchema: schema,
    api: formData =>
      new Promise(resolve => {
        const base64String = btoa(
          `${surveyId}|${clientId}|${target}|${formData.code}`,
        );
        resolve(history.push(`${SURVEY_ROOT_PATH}/${base64String}`));
      }),
  });

  return (
    <>
      <div className="alert alert-success" role="alert">
        <p className="mb-0">The code has been sent to your mail box !</p>
      </div>
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        {serverErrors && serverErrors.length ? (
          <FormError errors={serverErrors} />
        ) : null}
        <FormGroup
          name="code"
          type="text"
          error={errors.code}
          register={register}
          placeholder="Input Code"
          iconLeft={<i className="fa fa-code" />}
        />
        <SubmitButton
          isLoading={isLoading}
          disabled={!isDirty || !isValid}
          color="primary"
        />
      </Form>
    </>
  );
};

VerifyCodeForm.propTypes = {
  surveyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  target: PropTypes.string.isRequired,
};

export default VerifyCodeForm;
