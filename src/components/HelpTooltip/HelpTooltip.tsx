import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';

import { ReactComponent as HelpIcon } from '../../assets/icons/HelpIcon.svg';
import { colors } from '../../colors';

type HelpTooltipProps = {
  header: JSX.Element;
  body: JSX.Element;
  placement: Placement;
}

const HelpTooltip = ({ header, body, placement }: HelpTooltipProps) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={
        <Popover>
          <Popover.Header as="h3">{header}</Popover.Header>
          <Popover.Body>
            {body}
          </Popover.Body>
        </Popover>
      }
    >
      <HelpIcon
        height={20}
        stroke={colors.primaryDarkBlue}
      />
    </OverlayTrigger>
  );
};

export default HelpTooltip;
