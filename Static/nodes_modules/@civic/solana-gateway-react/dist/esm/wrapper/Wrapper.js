import React from 'react';
import SVGClose from './SVGClose';
import SVGLoading from './SVGLoading';
import {
    TESTID_IFRAME_CLOSE_BTN
} from '../constants';
const containerStyle = {
    background: 'rgba(0,0,0,0.5)',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    /* flex position the iframe container */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};
/* Critical that this container has no overflow scroll all scrolling will be handled by content inside the iframe */
const containerContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '526px',
    width: '100%',
    maxHeight: '100',
    background: '#fff',
    borderRadius: '4px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
};
const containerButtonStyle = {
    top: '5px',
    right: '5px',
    padding: '10px',
    background: 'transparent',
    border: 'none',
    borderRadius: '25px',
    height: '50px',
    width: '50px',
    cursor: 'pointer',
};
const headerStyle = {
    height: '80px',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px 4px 0 0',
    borderBottom: '1px solid #ddd',
    position: 'relative',
};
const logoStyle = {
    maxHeight: '40px',
    maxWidth: '100%',
    height: 'auto',
    width: 'auto',
};
const DefaultWrapper = ({
    children = null,
    onClose,
    logo,
    loaded = false
}) => {
    return (React.createElement("div", {
            style: Object.assign(Object.assign({}, containerStyle), {
                position: 'fixed',
                flexDirection: 'column',
                zIndex: 999
            })
        },
        React.createElement("div", {
                style: Object.assign(Object.assign({}, containerContentStyle), {
                    flexDirection: 'column',
                    position: 'relative'
                })
            },
            logo && (React.createElement("header", {
                    style: Object.assign(Object.assign({}, headerStyle), {
                        position: 'relative'
                    })
                },
                React.createElement("img", {
                    style: logoStyle,
                    src: logo,
                    alt: "logo"
                }))), !loaded && React.createElement(SVGLoading, null),
            React.createElement("button", {
                    "data-testid": TESTID_IFRAME_CLOSE_BTN,
                    type: "button",
                    onClick: onClose,
                    style: Object.assign(Object.assign({}, containerButtonStyle), {
                        display: loaded ? 'block' : 'none',
                        position: 'absolute'
                    })
                },
                React.createElement(SVGClose, null)),
            children)));
};
// eslint-disable-next-line import/prefer-default-export
export const Wrapper = ({
    wrapper,
    onClose,
    children = null,
    logo,
    loaded = false,
}) => {
    if (wrapper) {
        const WrapperComp = wrapper;
        return (React.createElement(WrapperComp, null,
            loaded && (React.createElement("button", {
                    type: "button",
                    onClick: onClose,
                    style: Object.assign(Object.assign({}, containerButtonStyle), {
                        display: loaded ? 'block' : 'none',
                        position: 'absolute'
                    })
                },
                React.createElement(SVGClose, null))),
            children));
    }
    return (React.createElement(DefaultWrapper, {
        onClose: onClose,
        logo: logo,
        loaded: loaded
    }, children));
};