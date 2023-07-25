import {buildStore} from "./utils";
import {Provider} from "react-redux";
import {render, screen} from "@testing-library/react";
import LoginPage from "../scenes/loginPage";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {AuthForm} from "../scenes/loginPage/AuthForm";

test('Render login form', () => {
    const store = buildStore()
    render(
        <Provider store={store}>
            <LoginPage/>
        </Provider>
    )
    const buttonElement: HTMLButtonElement = screen.getByText(/Don't have an account\? Sign Up here./i);
    expect(buttonElement).toBeInTheDocument();
})

test('Toggle form to register', async () => {
    const store = buildStore()
    render(
        <Provider store={store}>
            <LoginPage/>
        </Provider>
    )
    const toggleFormBtn: HTMLButtonElement = screen.getByText(/Don't have an account\? Sign Up here./i)

    function triggerClickToggleFormBtn() {
        userEvent.click(toggleFormBtn)
    }

    await act((): void => triggerClickToggleFormBtn())
    expect(await screen.findByText('REGISTER')).toBeInTheDocument();
})

test('Check required input form register', async () => {
    render(
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <AuthForm pageType={'register'} setPageType={() => console.log()} isNonMobileScreen={true}/>
        </LocalizationProvider>
    )
    const btnSendForm: HTMLButtonElement = await screen.findByText('REGISTER')
    function triggerClickBtnSendForm () {
        userEvent.click(btnSendForm)
    }
    await act((): void => triggerClickBtnSendForm())
    expect(await screen.findByText('email is a required field')).toBeInTheDocument()
    expect(await screen.findByText('birthdate is a required field')).toBeInTheDocument()
    expect(await screen.findByText('username is a required field')).toBeInTheDocument()
    expect(await screen.findByText('password is a required field')).toBeInTheDocument()
})