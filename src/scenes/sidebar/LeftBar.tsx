import FlexBox from "../../components/FlexBox";
import {Avatar, Box, IconButton, Tooltip, Typography, useMediaQuery} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {NavigationState} from "../../state/types/NavigationState";
import {useOutsideEvent} from "../../hooks/outsideEvent";
import {setIsMenuLeftToggled} from "../../state/navigation";
import {MutableRefObject, useRef} from "react";
import {AuthState} from "../../state/types/AuthState";
import {User} from "../../models/User";
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";

const LeftBar = () => {
    const navigate = useNavigate()
    const user: User | null = useSelector(({authState}: { authState: AuthState }) => authState.user)
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
    const isMenuLeftToggled = useSelector(({navigationState}: {
        navigationState: NavigationState
    }) => navigationState.isMenuLeftToggled)
    const element: MutableRefObject<HTMLElement | undefined> = useRef()
    const dispatch = useDispatch()

    useOutsideEvent(element, () => dispatch(setIsMenuLeftToggled(false)))

    return (
        <FlexBox
            ref={element}
            id="sideLeft"
            sx={
                {
                    ...(isNonMobileScreen || isMenuLeftToggled
                        ? {boxShadow: '0 0 10px rgb(161 173 170)', transform: 'translateX(0)'}
                        : {transform: 'translateX(-150px)'}),
                    ...styles.container
                }
            }>
            <Box width="100%" textAlign="center">
                {user
                    ? (
                        <Avatar alt={user.username} src={user.picture ? user.picture : 'https://xsgames.co/randomusers/avatar.php?g=female'}/>
                    )
                    : (
                        <Tooltip title="Login">
                            <IconButton onClick={() => navigate('/login')}>
                                <LoginIcon/>
                            </IconButton>
                        </Tooltip>
                    )
                }
            </Box>
        </FlexBox>
    )
};

const styles = {
    container: {
        position: 'fixed',
        width: '150px',
        height: '100%',
        left: 0,
        paddingX: 1,
        transition: 'transform .3s',
        zIndex: 9
    }
}

export default LeftBar;