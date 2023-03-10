// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {
    GatewayStatus
} from '../types';
import {
    IconLogo
} from './IconLogo';
import {
    IconError
} from './IconError';
import {
    IconLoading
} from './IconLoading';
import {
    IconSuccess
} from './IconSuccess';
import {
    IconWarning
} from './IconWarning';
const buttonIconStyle = {
    width: '25px',
    height: '25px',
    fill: '#3AB03E',
    position: 'absolute',
    left: '15px',
    top: '10px',
};
const Icon = {
    LOGO: React.createElement(IconLogo, {
        style: buttonIconStyle
    }),
    ERROR: React.createElement(IconError, {
        style: buttonIconStyle
    }),
    SPINNER: React.createElement(IconLoading, {
        style: buttonIconStyle
    }),
    SUCCESS: React.createElement(IconSuccess, {
        style: buttonIconStyle
    }),
    WARNING: React.createElement(IconWarning, {
        style: buttonIconStyle
    }),
};
// eslint-disable-next-line import/prefer-default-export
export const getIcon = (status) => {
    switch (status) {
        case GatewayStatus.IN_REVIEW:
        case GatewayStatus.CHECKING:
        case GatewayStatus.COLLECTING_USER_INFORMATION:
            return Icon.SPINNER;
        case GatewayStatus.ACTIVE:
            return Icon.LOGO;
        case GatewayStatus.REFRESH_TOKEN_REQUIRED:
        case GatewayStatus.FROZEN:
        case GatewayStatus.REJECTED:
        case GatewayStatus.REVOKED:
        case GatewayStatus.FAILED:
        case GatewayStatus.LOCATION_NOT_SUPPORTED:
            return Icon.WARNING;
        case GatewayStatus.ERROR:
            return Icon.ERROR;
        default:
            return Icon.LOGO;
    }
};
export const getButtonText = (status) => {
    switch (status) {
        case GatewayStatus.IN_REVIEW:
            return 'Reviewing';
        case GatewayStatus.CHECKING:
        case GatewayStatus.COLLECTING_USER_INFORMATION:
            return 'Collecting';
        case GatewayStatus.ACTIVE:
            return 'Active';
        case GatewayStatus.FROZEN:
        case GatewayStatus.REJECTED:
        case GatewayStatus.REVOKED:
        case GatewayStatus.FAILED:
            return 'Attention';
        case GatewayStatus.ERROR:
            return 'Error';
        case GatewayStatus.PROOF_OF_WALLET_OWNERSHIP:
            return 'Confirm';
        case GatewayStatus.LOCATION_NOT_SUPPORTED:
            return 'Not supported';
        default:
            return 'Identity';
    }
};
export const isDisabled = (state) => {
    return state === GatewayStatus.CHECKING;
};
export const getTokenDescription = (status) => {
    switch (status) {
        case GatewayStatus.CHECKING:
            return 'The blockchain is being queried to find an existing Civic Pass.';
        case GatewayStatus.NOT_REQUESTED:
            return 'A Civic Pass has not been requested.';
        case GatewayStatus.COLLECTING_USER_INFORMATION:
            return 'The information required for the issuance of your Civic Pass is being collected.';
        case GatewayStatus.IN_REVIEW:
            return 'Your Civic Pass is pending review.';
        case GatewayStatus.FAILED:
            return 'An error occurred while issuing your Civic Pass.';
        case GatewayStatus.REJECTED:
            return 'Your Civic Pass request was rejected';
        case GatewayStatus.REVOKED:
            return 'Your Civic Pass has been revoked. Please contact support.';
        case GatewayStatus.FROZEN:
            return 'Your Civic Pass has been frozen. Please contact support.';
        case GatewayStatus.ACTIVE:
            return 'Your Civic Pass is currently active.';
        case GatewayStatus.ERROR:
            return 'Something went wrong, please try again.';
        case GatewayStatus.PROOF_OF_WALLET_OWNERSHIP:
            return 'Please confirm wallet ownership by tapping on the button again';
        case GatewayStatus.LOCATION_NOT_SUPPORTED:
            return 'Your location is not supported at this time';
        default:
            return 'Your Civic Pass is in an unknown state.';
    }
};