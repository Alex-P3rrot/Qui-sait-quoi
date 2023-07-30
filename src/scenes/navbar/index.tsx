import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Box, IconButton, Typography, useMediaQuery} from "@mui/material";
import FlexBox from "../../components/FlexBox";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import {ViewList, ViewSidebar} from "@mui/icons-material";
import {useNavbarState} from "../../state/navbar";

const NavBar = () => {
    const navigate = useNavigate()
    const navbarState = useNavbarState()
    const isMenuLeftToggled = navbarState.isMenuLeftToggled
    const isMenuRightToggled = navbarState.isMenuRightToggled
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')

    useEffect(() => {
        (() => {
            navbarState.setIsMenuLeftToggled(false)
            navbarState.setIsMenuRightToggled(false)
        })()
    }, [isNonMobileScreen])

    return (
        <FlexBox>
            {!isNonMobileScreen && (
                <FlexBox width="100%" height={40} justifyContent="space-between" alignItems="center">
                    <Box visibility={isMenuLeftToggled ? 'hidden' : 'visible'}>
                        <IconButton onClick={() => navbarState.setIsMenuLeftToggled(true)}>
                            <ViewList/>
                        </IconButton>
                    </Box>
                    <Typography onClick={() => navigate('/')} sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}>Home</Typography>
                    <Box visibility={isMenuRightToggled ? 'hidden' : 'visible'}>
                        <IconButton onClick={() => navbarState.setIsMenuRightToggled(true)}>
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