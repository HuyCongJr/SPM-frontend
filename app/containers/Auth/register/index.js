import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import * as yup from 'yup';

import {
  Container,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormFeedback,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import Alert from 'reactstrap/es/Alert';
import messages from './messages';
import Widget from '../../../components/Widget/Widget';
import Footer from '../../Layout/Footer';
import SubmitButton from '../../../components/button/SubmitButton';
import { registerUser } from '../../../libs/apis/auth.api';
import useMyForm from '../../../libs/hooks/useMyForm';
import FormError from '../../../components/Form/FormError';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid Email')
    .required('This field is required.'),
  password: yup.string().required('This field is required.'),
  displayName: yup.string().required('This field is required.'),
});

export function RegisterPage() {
  const {
    register,
    errors,
    onSubmit,
    formState,
    state: { isLoading, errors: serverErrors, resp },
  } = useMyForm({
    validationSchema: schema,
    api: registerUser,
  });

  const formEls = useMemo(
    () => (
      <>
        <form onSubmit={onSubmit} noValidate>
          <FormGroup className="mt">
            <Label for="displayName">
              Your name<span className="text-danger">*</span>
            </Label>
            <InputGroup className="input-group-no-border">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="la la-user text-white" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                invalid={!!errors.displayName}
                id="displayName"
                className="input-transparent pl-3"
                type="displayName"
                innerRef={register}
                name="displayName"
                placeholder="Display Name"
              />
              <FormFeedback>
                {errors.displayName && errors.displayName.message}
              </FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup className="mt">
            <Label for="email">
              Email<span className="text-danger">*</span>
            </Label>
            <InputGroup className="input-group-no-border">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="la la-envelope text-white" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                invalid={!!errors.email}
                id="email"
                className="input-transparent pl-3"
                type="email"
                innerRef={register}
                name="email"
                placeholder="Email"
              />
              <FormFeedback>
                {errors.email && errors.email.message}
              </FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="password">
              Password<span className="text-danger">*</span>
            </Label>
            <InputGroup className="input-group-no-border">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="la la-lock text-white" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                invalid={!!errors.password}
                id="password"
                className="input-transparent pl-3"
                type="password"
                innerRef={register}
                required
                name="password"
                placeholder="Password"
              />
              <FormFeedback>
                {errors.password && errors.password.message}
              </FormFeedback>
            </InputGroup>
          </FormGroup>
          <div className="bg-widget auth-widget-footer">
            <SubmitButton
              type="submit"
              color="danger"
              className="auth-btn text-white"
              size="sm"
              disabled={!(formState.isValid && formState.isDirty)}
              isLoading={isLoading}
              style={{ color: '#fff' }}
            >
              <FormattedMessage {...messages.registerButton} />
            </SubmitButton>
            <p className="widget-auth-info m-4">
              If you had account, &nbsp;
              <Link to="/">login here</Link>
            </p>
          </div>
        </form>
      </>
    ),
    [onSubmit, errors, register, formState, isLoading],
  );

  return (
    <div>
      <Helmet>
        <title>REGISTER</title>
        <meta name="description" content="Description of Register" />
      </Helmet>
      <div className="auth-page d-flex align-items-center">
        <Container>
          <Widget
            className="widget-auth mx-auto"
            title={
              <h3 className="mt-0">
                <FormattedMessage {...messages.header} />
              </h3>
            }
          >
            {resp ? (
              <Alert color="info" className="mt-2">
                Register succeed link has been send to your email. Please check
                your mailbox.
              </Alert>
            ) : (
              <>
                <p className="widget-auth-info">Use your email to register.</p>
                <FormError
                  className="mt-3"
                  errors={serverErrors}
                  item={item => [item]}
                />
                {formEls}
              </>
            )}
          </Widget>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default RegisterPage;