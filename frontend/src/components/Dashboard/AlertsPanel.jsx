import React from 'react';

const AlertsPanel = () => {
    //Future: pull this from API or props
    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-6">
            <p className="font-semibold">Heads up!</p>
            <p>Some locations are low on products. Check the red text below to take action.</p>
        </div>
    );
};

export default AlertsPanel;