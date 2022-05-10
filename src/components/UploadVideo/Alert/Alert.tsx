import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { AlertMessageProps } from '../types';
type AlertProps = {
  toggleShowAlert: (() => void),
  alertMessage: AlertMessageProps
}

const ActionAlert = ({ toggleShowAlert, alertMessage }: AlertProps) => {
  return (
    <Alert variant={alertMessage.variant} onClose={toggleShowAlert} dismissible>
      <Alert.Heading>{alertMessage.heading}</Alert.Heading>
      <p>{alertMessage.body}</p>
      {alertMessage.variant === 'success' && <div className="d-flex justify-content-end">
        <Button onClick={toggleShowAlert} variant="outline-success"> {/* TODO redirect to analysis page on click*/}
            Lets go!
        </Button>
      </div>}
    </Alert>
  );
};

export default ActionAlert;