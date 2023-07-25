import {Box, Typography, useMediaQuery} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {NavigationState} from "../../state/types/NavigationState";
import {useOutsideEvent} from "../../hooks/outsideEvent";
import {setIsMenuRightToggled} from "../../state/navigation";
import {MutableRefObject, useRef} from "react";

const RightBar = () => {
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
    const isMenuRightToggled = useSelector(({navigationState}: {
        navigationState: NavigationState
    }) => navigationState.isMenuRightToggled)
    const element: MutableRefObject<HTMLElement | undefined> = useRef()
    const dispatch = useDispatch()

    useOutsideEvent(element, () => dispatch(setIsMenuRightToggled(false)))

    return (
        <Box component="aside"
             ref={element}
             id="sideRight"
             sx={
                 {
                     ...(isNonMobileScreen || isMenuRightToggled
                         ? {boxShadow: '0 0 10px rgb(161 173 170)', transform: 'translateX(0)'}
                         : {transform: 'translateX(180px)'}),
                     ...styles.container
                 }
             }>
            <Box width="100%">
                <Typography>Rightbar</Typography>
            </Box>
        </Box>
    )
};

const styles = {
    container: {
        position: 'fixed',
        width: '180px',
        height: '100%',
        right: 0,
        justifyContent: 'right',
        transition: 'transform .3s',
        zIndex: 9,
    }
}

export default RightBar;