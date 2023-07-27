import {Box, List, ListItemButton, Slide, Typography, useMediaQuery} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {NavigationState} from "../../state/types/NavigationState";
import {useOutsideEvent} from "../../hooks/outsideEvent";
import {setIsMenuRightToggled} from "../../state/navigation";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {matchPath, useNavigate} from "react-router-dom";
import {SubjectState} from "../../state/types/SubjectState";

const RightBar = () => {
    const navigate = useNavigate()
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
    const isMenuRightToggled = useSelector(({navigationState}: {
        navigationState: NavigationState
    }) => navigationState.isMenuRightToggled)
    const element: MutableRefObject<HTMLElement | undefined> = useRef()
    const dispatch = useDispatch()
    useOutsideEvent(element, () => dispatch(setIsMenuRightToggled(false)))
    const matchedPath = matchPath({path: '/category/:category/subject/:subjectId'}, window.location.pathname)
    const [category, setCategory] = useState<string | undefined>()
    const [slideIn, setSlideIn] = useState<boolean>(false)
    const otherSubjects = useSelector(({subjectState}: {subjectState: SubjectState}) => subjectState.selectedList)

    useEffect(() => {
        (() => {
            if (matchedPath) setCategory(matchedPath.params.category)
            setSlideIn(matchedPath != null && Object.keys(matchedPath.params).includes('subjectId'))
        })()
    }, [matchedPath])

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
                <Slide direction="down" in={slideIn} mountOnEnter unmountOnExit>
                    <Box>
                        <Typography variant="h6" sx={{textAlign: 'center'}}>Autres sujets</Typography>
                        <List>
                            {otherSubjects && (
                                otherSubjects.map((subject, index) => (
                                    <ListItemButton key={index}
                                                    onClick={() => navigate(`/category/${category}/subject/${subject.id}`)}>
                                        {subject.title}
                                    </ListItemButton>
                                ))
                            )}
                        </List>
                    </Box>
                </Slide>
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