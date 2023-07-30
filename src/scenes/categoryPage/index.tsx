import FlexBox from "../../components/FlexBox";
import {useParams} from "react-router-dom";
import SubjectList from "../../components/SubjectList";
import {useState} from "react";
import {Box, Button, Slide, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {SubjectForm} from "./SubjectForm";
import {useSubjectState} from "../../state/subject";

function CategoryPage() {
    const {category} = useParams() as { category: string }
    const [slideIn, setSlideIn] = useState(false)
    const subjectState = useSubjectState()
    const onSubmit = (values: {title: string}) => {
        const nextId = subjectState.cachedSubject.hasOwnProperty(category) ? subjectState.cachedSubject[category].length : 0
        subjectState.addCachedSubject(category, {id: nextId, comments: 0, ...values})
        setSlideIn(false)
    }

    return (
        <Box>
            <FlexBox justifyContent="space-between" mb={2}>
                <Typography textTransform="capitalize" variant="h5">{category}</Typography>
                <Button variant="outlined" startIcon={<AddIcon/>} onClick={() => setSlideIn(true)}>
                    Créer un nouveau sujet
                </Button>
            </FlexBox>
            {!slideIn && (<SubjectList category={category}/>)}
            <Slide direction="up" in={slideIn} mountOnEnter unmountOnExit>
                <Box width="100%">
                    <SubjectForm setSlideIn={setSlideIn} category={category} onSubmit={onSubmit}/>
                </Box>
            </Slide>
        </Box>
    )
}

export default CategoryPage