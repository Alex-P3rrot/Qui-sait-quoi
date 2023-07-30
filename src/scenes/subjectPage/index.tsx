import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Subject} from "../../models/Subject";
import {Button, Typography} from "@mui/material";
import FlexBox from "../../components/FlexBox";
import {useSubjectState} from "../../state/subject";

function SubjectPage() {
    const {category, subjectId} = useParams() as { category: string, subjectId: string }
    const subjectState = useSubjectState()
    const navigate = useNavigate()
    const [subject, setSubject] = useState<Subject|undefined>()
    useEffect(() => {
        (() => setSubject(subjectState.cachedSubject[category].find(el => el.id === Number(subjectId))))()
    }, [subjectId])

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