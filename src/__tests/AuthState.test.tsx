import {AuthStateType, useAuthState} from "../state/auth";
import {useEffect} from "react";
import {render} from "@testing-library/react";

function TestComponent({selector, effect}: { selector: (state: AuthStateType) => any, effect: Function }) {
    const item = useAuthState(selector)
    useEffect(() => effect(item), [item])
    return null
}

test('Should return initial value', () => {
    const selector = (state: AuthStateType) => state.user
    const effect = jest.fn()
    render(<TestComponent selector={selector} effect={effect}/>)
    expect(effect).toHaveBeenCalledWith(null)
})

test('Set a user', () => {
    const newUser = {
        id: 1,
        email: "alain@die.fr",
        username: "Alain",
        password: "azeaze",
    }
    const selector = (state: AuthStateType) => ({user: state.user, setUser: state.setUser})
    const effect = jest.fn().mockImplementation((item) => {
        if (!item.user) {
            item.setUser(newUser)
        }
    })
    render(<TestComponent selector={selector} effect={effect}/>)
    expect(effect).toHaveBeenCalledTimes(2)
    expect(effect).toHaveBeenCalledWith(expect.objectContaining({user: newUser}))
})