import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Subject} from "../../models/Subject";
import {Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {SubjectState} from "../../state/types/SubjectState";
import {setSelected} from "../../state/subject";
import FlexBox from "../../components/FlexBox";

function SubjectPage() {
    const {category, subjectId} = useParams() as { category: string, subjectId: string }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        (() => {
            dispatch(setSelected({category, subjectId}))
        })()
    }, [subjectId])
    const subject = useSelector(({subjectState}: { subjectState: SubjectState }) => subjectState.selected) as Subject

    return (
        <FlexBox flexDirection="column">
            <Button onClick={() => navigate(`/category/${category}`)}>Retour</Button>
            {subject
                ? <Typography>{subject.title}</Typography>
                : <Typography>Loading...</Typography>
            }
        </FlexBox>
    )
}

export default SubjectPage