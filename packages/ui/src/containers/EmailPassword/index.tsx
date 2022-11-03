import classNames from 'classnames';
import { useMemo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { signInWithEmailPassword } from '@/apis/sign-in';
import Button from '@/components/Button';
import ErrorMessage from '@/components/ErrorMessage';
import Input, { PasswordInput } from '@/components/Input';
import TermsOfUse from '@/containers/TermsOfUse';
import type { ErrorHandlers } from '@/hooks/use-api';
import useApi from '@/hooks/use-api';
import useForm from '@/hooks/use-form';
import useTerms from '@/hooks/use-terms';
import { SearchParameters } from '@/types';
import { getSearchParameters } from '@/utils';
import { emailValidation, requiredValidation } from '@/utils/field-validations';

import * as styles from './index.module.scss';

type Props = {
  className?: string;
  // eslint-disable-next-line react/boolean-prop-naming
  autoFocus?: boolean;
};

type FieldState = {
  email: string;
  password: string;
};

const defaultState: FieldState = {
  email: '',
  password: '',
};

const EmailPassword = ({ className, autoFocus }: Props) => {
  const { t } = useTranslation();
  const { termsValidation } = useTerms();

  const [errorMessage, setErrorMessage] = useState<string>();
  const { fieldValue, setFieldValue, register, validateForm } = useForm(defaultState);

  const errorHandlers: ErrorHandlers = useMemo(
    () => ({
      'session.invalid_credentials': (error) => {
        setErrorMessage(error.message);
      },
    }),
    [setErrorMessage]
  );

  const { run: asyncSignInWithEmailPassword } = useApi(signInWithEmailPassword, errorHandlers);

  const onSubmitHandler = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      setErrorMessage(undefined);

      if (!validateForm()) {
        return;
      }

      if (!(await termsValidation())) {
        return;
      }

      const socialToBind = getSearchParameters(location.search, SearchParameters.bindWithSocial);

      void asyncSignInWithEmailPassword(fieldValue.email, fieldValue.password, socialToBind);
    },
    [
      validateForm,
      termsValidation,
      asyncSignInWithEmailPassword,
      fieldValue.email,
      fieldValue.password,
    ]
  );

  return (
    <form className={classNames(styles.form, className)} onSubmit={onSubmitHandler}>
      <Input
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        placeholder={t('input.email')}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        className={styles.inputField}
        {...register('email', emailValidation)}
        onClear={() => {
          setFieldValue((state) => ({ ...state, email: '' }));
        }}
      />
      <PasswordInput
        className={styles.inputField}
        name="password"
        autoComplete="current-password"
        placeholder={t('input.password')}
        {...register('password', (value) => requiredValidation('password', value))}
      />

      {errorMessage && <ErrorMessage className={styles.formErrors}>{errorMessage}</ErrorMessage>}

      <TermsOfUse className={styles.terms} />

      <Button title="action.sign_in" onClick={async () => onSubmitHandler()} />

      <input hidden type="submit" />
    </form>
  );
};

export default EmailPassword;
