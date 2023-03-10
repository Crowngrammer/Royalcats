import React from 'react';
import styled from 'styled-components';
import {
    useGateway
} from '../gateway/GatewayContext';
import {
    getButtonText,
    getIcon,
    isDisabled
} from './IdentityButton.utils';
const Button = styled.button `
  width: 180px;
  background-color: #282c34;
  outline: none;
  border: 1px solid #434343;
  height: 50px;
  line-height: 20px;
  cursor: pointer;
  position: relative;
  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
  &:active {
    top: 1px;
  }
  &:disabled:active {
    top: 0px;
  }
`;
const buttonTitleStyle = {
    color: 'white',
    fontSize: '16px',
    paddingLeft: '20px',
};
const buttonStyleLight = {
    background: '#fff',
    border: '1px solid #ccc',
};
const buttonTitleStyleLight = {
    color: '#666666',
};
export var ButtonMode;
(function(ButtonMode) {
    ButtonMode[ButtonMode["LIGHT"] = 0] = "LIGHT";
    ButtonMode[ButtonMode["DARK"] = 1] = "DARK";
})(ButtonMode || (ButtonMode = {}));
const IdentityButton = ({
    mode = ButtonMode.DARK
}) => {
    const {
        requestGatewayToken,
        gatewayStatus
    } = useGateway();
    return (React.createElement(Button, {
            onClick: requestGatewayToken,
            type: "button",
            disabled: isDisabled(gatewayStatus),
            style: mode === ButtonMode.LIGHT ? Object.assign({}, buttonStyleLight) : {}
        },
        getIcon(gatewayStatus),
        React.createElement("span", {
            style: mode === ButtonMode.LIGHT ? Object.assign(Object.assign({}, buttonTitleStyle), buttonTitleStyleLight) : buttonTitleStyle
        }, getButtonText(gatewayStatus))));
};
export default IdentityButton;