import {
    GatewayTokenActionCreatorImplementation
} from './gatewayToken.actionCreator';
// eslint-disable-next-line import/prefer-default-export
export const gatewayTokenActionCreator = (dependencies) => {
    return GatewayTokenActionCreatorImplementation(dependencies);
};