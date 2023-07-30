import {List, ListItemButton, Typography, useMediaQuery} from "@mui/material";
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSubjectState} from "../state/subject";

function SubjectList(props: { category: string }) {
    const subjectStore = useSubjectState()
    const navigate = useNavigate()
    const {category} = props
    useEffect(() => {
        (async () => {
            // if (!subjectStore.cachedSubject.hasOwnProperty(category)) {
                // const response = await fetch('https://dummyjson.com/products?limit=10&skip=10&select=id,title,price')
                // const result = await response.json()
                // subjectStore.addCachedSubject(category, result.products)
            // }
        })()
    }, [category])
    const subjects = subjectStore.cachedSubject[category]
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
            {subjects && subjects.length > 0
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