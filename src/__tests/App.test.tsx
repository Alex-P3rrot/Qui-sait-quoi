import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import {Provider} from "react-redux";
import {buildStore} from "./utils";

test('Render homepage', () => {
  const store = buildStore()
  render(
      <Provider store={store}>
        <App />
      </Provider>
  );
  const linkElement = screen.getByText(/homePage/i);
  expect(linkElement).toBeInTheDocument();
});
