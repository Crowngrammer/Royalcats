/* eslint-disable no-console */
/* eslint-disable global-require */
export {
    GatewayStatus
}
from './types';
export {
    IdentityButton,
    getTokenDescription,
    ButtonMode
}
from './button';
// These will be moved into the Solana Project once we add another chain implementation
export {
    default as Badge
}
from './solana/badge';
export {
    SolanaGatewayProvider as GatewayProvider, useSolanaGateway as useGateway
}
from './solana';
try {
    const packageJson = require('../../package.json');
    if (packageJson)
        console.log(`${packageJson.name} version ${packageJson.version}`);
} catch (error) {
    console.error('Error retrieving version from ../../package.json');
}