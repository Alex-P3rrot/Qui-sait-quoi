import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Subject} from "../../models/Subject";
import {Typography} from "@mui/material";

const data: Array<Subject> = [
    {
        id: 0,
        title: "iPhone 9",
        comments: 94
    },
    {
        id: 1,
        title: "iPhone X",
        comments: 34
    },
    {
        id: 2,
        title: "Samsung Universe 9",
        comments: 36
    },
    {
        id: 3,
        title: "OPPOF19",
        comments: 123
    },
    {
        id: 4,
        title: "Huawei P30",
        comments: 32
    },
    {
        id: 5,
        title: "MacBook Pro",
        comments: 83
    },
    {
        id: 6,
        title: "Samsung Galaxy Book",
        comments: 50
    },
    {
        id: 7,
        title: "Microsoft Surface Laptop 4",
        comments: 68
    },
    {
        id: 8,
        title: "Infinix INBOOK",
        comments: 96
    },
    {
        id: 9,
        title: "iPhone 9",
        comments: 94
    },
    {
        id: 10,
        title: "iPhone X",
        comments: 34
    },
    {
        id: 11,
        title: "Samsung Universe 9",
        comments: 36
    },
    {
        id: 12,
        title: "OPPOF19",
        comments: 123
    },
    {
        id: 13,
        title: "Huawei P30",
        comments: 32
    },
    {
        id: 14,
        title: "MacBook Pro",
        comments: 83
    },
    {
        id: 15,
        title: "Samsung Galaxy Book",
        comments: 50
    },
    {
        id: 16,
        title: "Microsoft Surface Laptop 4",
        comments: 68
    },
    {
        id: 17,
        title: "Infinix INBOOK",
        comments: 96
    },]

function SubjectPage() {
    const {subjectId} = useParams<{ subjectId: string }>()
    const [subject, setSubject] = useState<Subject>()
    useEffect(() => {
        (() => {
            if (subjectId) {
               setSubject(data.find(el => el.id === Number(subjectId)))
            }
        })()
    }, [subjectId])

    return (
        <>
            { subject != undefined
                ? <Typography>{subject.title}</Typography>
                : <Typography>Loading...</Typography>
            }
        </>
    )
}

export default SubjectPage