import React from 'react';
import styled, {
    keyframes
} from 'styled-components';
const svgLoadingStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
};
const shimmer = keyframes `
  0% {
    transform: translate(-320px, 0);
  }

  to {
    transform: translate(320px, 0);
  }
`;
const Shimmer = styled.path `
  animation: 1s linear infinite both ${shimmer};
`;
export default function SVGLoading() {
    return (React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision",
            viewBox: "0 0 320 16",
            "white-space": "pre",
            height: "26",
            width: "100%",
            style: Object.assign(Object.assign({}, svgLoadingStyle), {
                position: 'absolute'
            })
        },
        React.createElement("defs", null,
            React.createElement("linearGradient", {
                    id: "Gradient-0",
                    x2: "320",
                    y1: "15",
                    y2: "15",
                    gradientUnits: "userSpaceOnUse"
                },
                React.createElement("stop", {
                    offset: "0",
                    stopColor: "#ffffff"
                }),
                React.createElement("stop", {
                    offset: ".511",
                    stopColor: "#9A9DA6"
                }),
                React.createElement("stop", {
                    offset: "1",
                    stopColor: "#ffffff"
                }))),
        React.createElement("path", {
            id: "rect",
            fill: "#f6f7f8",
            d: "M0 0h320v16H0z"
        }),
        React.createElement(Shimmer, {
            id: "shimmer",
            fill: "url(#Gradient-0)",
            d: "M0 0h320v16H0z",
            transform: "translate(-320)"
        })));
}