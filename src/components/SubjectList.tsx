import {List, ListItemButton, Typography} from "@mui/material";
import {Subject} from "../models/Subject";
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import {useNavigate} from "react-router-dom";

function SubjectList(props: { category: string, subjects: Array<Subject> }) {
    const navigate = useNavigate()
    const {category, subjects} = props
    return (
        <List sx={{width: '100%'}}>
            {subjects.length > 0 ?
                subjects.map((subject, index) => (
                    <ListItemButton key={index}
                        onClick={() => navigate(`/category/${category}/subject/${subject.id}`, {replace: true})}
                        sx={styles.listItemBtn}>
                        <Typography>{subject.title}</Typography>
                        <Typography sx={{display: 'flex'}}><TextsmsOutlinedIcon/>&nbsp;{subject.comments}</Typography>
                    </ListItemButton>
                ))
                : null
            }
        </List>
    )
}

const styles = {
    listItemBtn: {
        marginY: 2,
        marginX: 10,
        border: '1px solid rgba(0 0 0 / .1)',
        display: 'flex',
        justifyContent: 'space-between'
    }
}

export default SubjectList