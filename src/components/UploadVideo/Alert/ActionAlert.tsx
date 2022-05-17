import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import { AlertMessageProps, DataAnalysis } from '../types';
type AlertProps = {
  toggleShowAlert: (() => void)
  analysisData: DataAnalysis
  alertMessage: AlertMessageProps
}

const ActionAlert = ({ toggleShowAlert, alertMessage, analysisData }: AlertProps) => {
  return (
    <Alert variant={alertMessage.variant} onClose={toggleShowAlert} dismissible>
      <Alert.Heading>{alertMessage.heading}</Alert.Heading>
      <p>{alertMessage.body}</p>
      {alertMessage.variant === 'success' &&
      <div className="d-flex justify-content-end">
        <Link to={`/analysis/${analysisData.videoId}`} state={{ analysisData }}>
          <Button onClick={toggleShowAlert} variant="outline-success">Lets go!</Button>
        </Link>
      </div>}
    </Alert>
  );
};

export default ActionAlert;
