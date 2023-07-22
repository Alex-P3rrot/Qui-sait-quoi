import FlexBox from "../../components/FlexBox";
import {Box, Typography, useMediaQuery} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {NavigationState} from "../../state/types/NavigationState";
import {useOutsideEvent} from "../../hooks/outsideEvent";
import {setIsMenuLeftToggled} from "../../state/navigation";
import {MutableRefObject, useRef} from "react";

const LeftBar = () => {
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
                        ? {boxShadow: '0 30px 10px rgb(60, 211, 173)', transform: 'translateX(0)'}
                        : {transform: 'translateX(-150px)'}),
                    ...styles.container
                }
            }>
            <Box width="100%">
                <Typography>Leftbar</Typography>
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