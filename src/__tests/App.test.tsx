import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';

test('Render homepage', () => {
    render(
        <App/>
    );
    const linkElement = screen.getByText(/homePage/i);
    expect(linkElement).toBeInTheDocument();
});
