import FlexBox from "../../components/FlexBox";
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
        <FlexBox
            ref={element}
            id="sideRight"
            sx={
                {
                    ...(isNonMobileScreen || isMenuRightToggled
                        ? {boxShadow: '0 30px 10px rgb(76, 192, 196)', transform: 'translateX(0)'}
                        : {transform: 'translateX(150px)'}),
                    ...styles.container
                }
            }>
            <Box width="100%">
                <Typography>Rightbar</Typography>
            </Box>
        </FlexBox>
    )
};

const styles = {
    container: {
        position: 'fixed',
        width: '150px',
        height: '100%',
        right: 0,
        justifyContent: 'right',
        transition: 'transform .3s',
        zIndex: 9,
    }
}

export default RightBar;