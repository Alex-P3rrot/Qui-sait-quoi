import {Box, List, ListItemButton, Slide, Typography, useMediaQuery} from "@mui/material";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {matchPath, PathMatch, useNavigate} from "react-router-dom";
import {useSubjectState} from "../../state/subject";
import {Subject} from "../../models/Subject";
import {useNavbarState} from "../../state/navbar";
import {useOutsideEvent} from "../../hooks/outsideEvent";

type matchedPathType = PathMatch<"category" | "subjectId"> | null

const RightBar = () => {
    const subjectStore = useSubjectState()
    const navbarState = useNavbarState()
    const navigate = useNavigate()
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
    const isMenuRightToggled = navbarState.isMenuRightToggled
    const element: MutableRefObject<HTMLElement | undefined> = useRef()
    useOutsideEvent(element, () => navbarState.setIsMenuRightToggled(false))
    const matchedPath = matchPath({path: '/category/:category/subject/:subjectId'}, window.location.pathname) as matchedPathType
    const [category, setCategory] = useState<string | undefined>()
    const [slideIn, setSlideIn] = useState<boolean>(false)
    const otherSubjects = useRef<Subject[] | undefined>()

    useEffect(() => {
        (() => {
            if (matchedPath) {
                const category = matchedPath.params.category as string
                setCategory(category)
                otherSubjects.current = subjectStore.cachedSubject[category]
            }
            setSlideIn(matchedPath != null && Object.keys(matchedPath.params).includes('subjectId'))
        })()
    }, [matchedPath])

    return (
        <Box component="aside"
             className={!isNonMobileScreen ? 'bg-gradient' : ''}
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
                            {otherSubjects.current && (
                                otherSubjects.current.map((subject, index) => (
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