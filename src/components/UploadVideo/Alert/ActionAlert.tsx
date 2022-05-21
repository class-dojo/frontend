import React from 'react';
import { Alert } from 'react-bootstrap';
import { AlertMessageProps } from '../types';

interface AlertProps {
toggleShowAlert: (() => void)
alertMessage: AlertMessageProps
}

const ActionAlert = ({ toggleShowAlert, alertMessage }: AlertProps) => {
  return (
    <Alert style={{width: '100%'}} variant={alertMessage.variant} onClose={toggleShowAlert} dismissible>
      <Alert.Heading>{alertMessage.heading}</Alert.Heading>
      <p>{alertMessage.body}</p>
    </Alert>
  );
};

export default ActionAlert;
