import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Box, IconButton, Typography, useMediaQuery} from "@mui/material";
import {AuthState} from "../../state/types/AuthState";
import FlexBox from "../../components/FlexBox";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import {ViewList, ViewSidebar} from "@mui/icons-material";
import {NavigationState} from "../../state/types/NavigationState";
import {setIsMenuLeftToggled, setIsMenuRightToggled} from "../../state/navigation";

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(({authState}: { authState: AuthState }) => authState.user)
    const isMenuLeftToggled = useSelector(({navigationState}: {
        navigationState: NavigationState
    }) => navigationState.isMenuLeftToggled)
    const isMenuRightToggled = useSelector(({navigationState}: {
        navigationState: NavigationState
    }) => navigationState.isMenuRightToggled)
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')

    useEffect(() => {
        (() => {
            dispatch(setIsMenuLeftToggled(false))
            dispatch(setIsMenuRightToggled(false))
        })()
    }, [isNonMobileScreen])

    return (
        <FlexBox>
            {!isNonMobileScreen && (
                <FlexBox width="100%" height={40} justifyContent="space-between" alignItems="center">
                    <Box visibility={isMenuLeftToggled ? 'hidden' : 'visible'}>
                        <IconButton onClick={() => dispatch(setIsMenuLeftToggled(!isMenuLeftToggled))}>
                            <ViewList/>
                        </IconButton>
                    </Box>
                    <Typography onClick={() => navigate('/')} sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}>Home</Typography>
                    <Box visibility={isMenuRightToggled ? 'hidden' : 'visible'}>
                        <IconButton onClick={() => dispatch(setIsMenuRightToggled(!isMenuRightToggled))}>
                            <ViewSidebar/>
                        </IconButton>
                    </Box>
                </FlexBox>
            )}
            <LeftBar/>
            <RightBar/>
        </FlexBox>
    )
};

export default NavBar;