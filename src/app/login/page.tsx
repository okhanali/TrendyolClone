import AuthContainer from '@/components/auth/AuthContainer';
import { FC } from 'react';

const LoginPage: FC = () => {
  return <AuthContainer defaultTab="login" />;
};

export default LoginPage;
