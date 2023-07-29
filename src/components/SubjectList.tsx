import {List, ListItemButton, Typography, useMediaQuery} from "@mui/material";
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setList} from "../state/subject";
import {useEffect} from "react";
import {SubjectState} from "../state/types/SubjectState";

function SubjectList(props: { category: string }) {
    const navigate = useNavigate()
    const {category} = props
    const dispatch = useDispatch()
    useEffect(() => {
        (() => dispatch(setList({category})))()
    }, [category])
    const subjects = useSelector(({subjectState}: {subjectState: SubjectState}) => subjectState.selectedList)
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
    const styles = {
        listItemBtn: {
            marginY: 2,
            marginX: isNonMobileScreen ? 10 : 0,
            border: '1px solid rgba(0 0 0 / .1)',
            display: 'flex',
            justifyContent: 'space-between'
        }
    }

    return (
        <List sx={{width: '100%'}}>
            {Array.isArray(subjects) && subjects.length > 0
                ? subjects.map((subject, index) => (
                    <ListItemButton key={index}
                        onClick={() => navigate(`/category/${category}/subject/${subject.id}`, {replace: true})}
                        sx={styles.listItemBtn}>
                        <Typography>{subject.title}</Typography>
                        <Typography sx={{display: 'flex'}}><TextsmsOutlinedIcon/>&nbsp;{subject.comments}</Typography>
                    </ListItemButton>
                ))
                : <Typography>Aucun sujet n'a été créé</Typography>
            }
        </List>
    )
}

export default SubjectList