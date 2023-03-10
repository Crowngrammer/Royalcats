import * as React from 'react';
/**
 * @ignore - internal component.
 */

var ListContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
    ListContext.displayName = 'ListContext';
}

export default ListContext;