import FlexBox from "../../components/FlexBox";
import {useParams} from "react-router-dom";
import SubjectList from "../../components/SubjectList";
import {useState} from "react";
import {Box, Button, Slide, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {SubjectForm} from "./SubjectForm";
import {useDispatch} from "react-redux";
import {addSubject} from "../../state/subject";

function CategoryPage() {
    const {category} = useParams() as { category: string }
    const [slideIn, setSlideIn] = useState(false)
    const dispatch = useDispatch()
    const onSubmit = (values: {title: string}) => {
        dispatch(addSubject({subject: values, category: category}))
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