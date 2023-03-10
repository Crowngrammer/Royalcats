import React, {
    useContext,
    useEffect,
    useReducer,
    useState,
    useCallback
} from 'react';
import IframeResizer from 'iframe-resizer-react';
import {
    GatewayStatus,
    TokenIssuanceState,
    CivicPassIssuanceStatus,
    RefreshTokenState,
} from '../types';
import logger from '../logger';
import {
    Wrapper
} from '../wrapper/Wrapper';
import {
    IFRAME_ID,
    TESTID_IFRAME,
    TESTID_WRAPPER,
    TESTID_WRAPPER_CONTAINER
} from '../constants';
import {
    DEFAULT_GATEKEEPER_STAGE,
    getCivicPassEndpoint
} from '../config';
import {
    getGatekeeperEndpoint
} from '../solana/config';
import GatekeeperClient from '../utils/gatekeeperClient';
import reducer from '../useReducer';
import useUserInteraction from '../useHooks/useUserInteraction';
import useOrchestration from '../useHooks/useOrchestration';
import useCivicPass from '../useHooks/useCivicPass';
import useWalletHooks from '../useHooks/useWalletHooks';
const GatewayContext = React.createContext({
    requestGatewayToken: async () => {},
    gatewayStatus: GatewayStatus.NOT_REQUESTED,
    stage: DEFAULT_GATEKEEPER_STAGE,
});
const redirectUrlFromWindow = () => encodeURIComponent(window.location.href.split('?')[0]);
export const GatewayProvider = ({
    children = null,
    wallet,
    chainImplementation,
    wrapper,
    logo,
    stage = 'prod',
    redirectUrl,
    gatekeeperNetwork,
    options = {
        autoShowModal: true
    },
}) => {
    const gatekeeperNetworkAddress = gatekeeperNetwork;
    const [state, dispatch] = useReducer(reducer, {
        options,
        gatewayStatus: GatewayStatus.UNKNOWN,
        tokenRequested: false,
        iframeMinimized: false,
        firstTokenCheck: true,
        renderIframe: false,
        powoFinished: false,
        refreshInProgress: false,
        walletPowoInProgress: false,
        walletAddress: wallet === null || wallet === void 0 ? void 0 : wallet.publicKey,
        iframeSrcUrl: undefined,
        stage,
        redirectUrl: redirectUrl || redirectUrlFromWindow(),
        tokenIssuanceState: TokenIssuanceState.NOT_REQUESTED,
        refreshTokenState: RefreshTokenState.NOT_REQUIRED,
        civicPass: {
            status: CivicPassIssuanceStatus.NOT_REQUESTED,
            iframeMinimized: false,
            renderIframe: false,
        },
        gatekeeperNetworkAddress,
        chainType: chainImplementation.chainType,
    });
    const {
        gatewayStatus,
        iframeMinimized,
        renderIframe,
        gatewayToken,
        iframeSrcUrl
    } = state;
    useWalletHooks(wallet, state, dispatch); // need to handle wallet connect and disconnect first
    // ensure the state is updated with any changes to input props
    useEffect(() => {
        dispatch({
            type: 'updateStateWithProps',
            redirectUrl: redirectUrl || redirectUrlFromWindow(),
            stage,
            walletAddress: wallet === null || wallet === void 0 ? void 0 : wallet.publicKey,
            gatekeeperNetworkAddress,
        });
    }, [redirectUrl, stage, wallet, gatekeeperNetworkAddress]);
    const clusterName = chainImplementation.httpConfig.queryParams.network;
    const gatekeeperEndpoint = getGatekeeperEndpoint(stage);
    const gatekeeperClient = useCallback(() => {
        if (!gatekeeperNetworkAddress) {
            throw new Error('No gatekeeper network passed in.');
        }
        return new GatekeeperClient({
            baseUrl: gatekeeperEndpoint,
            stage,
            queryParams: {
                network: clusterName,
                gatekeeperNetworkAddress
            },
        });
    }, [stage, gatekeeperEndpoint, gatekeeperNetworkAddress, clusterName]);
    // listen and act on events from the compliance iframe
    useCivicPass({
        wallet
    }, state, dispatch);
    // this hook implements the main business logic and handles requesting and refreshing gateway tokens
    useOrchestration({
        wallet,
        chainImplementation,
        stage,
        gatekeeperClient
    }, state, dispatch);
    // requestGatewayToken is the only user-triggered event handled by the component
    // the compliance iframe user interaction is handled using events triggered from the iframe
    const {
        requestGatewayToken
    } = useUserInteraction({
        wallet
    }, state, dispatch);
    const civicPassSrcUrl = getCivicPassEndpoint(stage);
    /**
     * manage local state for display of the close button ui relative to iframe loading
     */
    const [iframeLoaded, setIframeLoaded] = useState(false);
    useEffect(() => {
        logger.info('GatewayContext gatewayStatus', GatewayStatus[gatewayStatus]);
    }, [gatewayStatus]);
    /**
     * Reset the iFrame when removing the iFrame from the DOM
     */
    useEffect(() => {
        if (!renderIframe) {
            setIframeLoaded(false);
        }
    }, [renderIframe]);
    return (React.createElement(GatewayContext.Provider, {
            value: {
                requestGatewayToken,
                gatewayStatus,
                gatewayToken: gatewayStatus === GatewayStatus.ACTIVE ? gatewayToken : undefined,
                stage,
                civicPassSrcUrl,
            }
        },
        children,
        renderIframe && (React.createElement("div", {
                "data-testid": TESTID_WRAPPER_CONTAINER,
                hidden: iframeMinimized
            },
            React.createElement(Wrapper, {
                    "data-testid": TESTID_WRAPPER,
                    onClose: () => dispatch({
                        type: 'civicPass_close'
                    }),
                    wrapper: wrapper,
                    logo: logo,
                    loaded: iframeLoaded
                },
                React.createElement(IframeResizer, {
                    "data-testid": TESTID_IFRAME,
                    src: iframeSrcUrl,
                    id: IFRAME_ID,
                    style: {
                        width: '1px',
                        minWidth: '100%',
                        border: 'none',
                        height: '26px',
                        transition: 'height 0.25s ease',
                    },
                    heightCalculationMethod: "min",
                    checkOrigin: false,
                    onLoad: () => setIframeLoaded(true),
                    inPageLinks: true,
                    allow: "camera",
                    allowFullScreen: true,
                    frameBorder: "0"
                }))))));
};
export const useGateway = () => useContext(GatewayContext);