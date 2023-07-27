import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Subject} from "../../models/Subject";
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {SubjectState} from "../../state/types/SubjectState";
import {setSelected} from "../../state/subject";

function SubjectPage() {
    const {category, subjectId} = useParams() as { category: string, subjectId: string }
    const dispatch = useDispatch()
    useEffect(() => {
        (() => {
            dispatch(setSelected({category, subjectId}))
        })()
    }, [subjectId])
    const subject = useSelector(({subjectState}: { subjectState: SubjectState }) => subjectState.selected) as Subject

    return (
        <>
            {subject
                ? <Typography>{subject.title}</Typography>
                : <Typography>Loading...</Typography>
            }
        </>
    )
}

export default SubjectPage