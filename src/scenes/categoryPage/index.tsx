import FlexBox from "../../components/FlexBox";
import {useParams} from "react-router-dom";
import SubjectList from "../../components/SubjectList";
import {useEffect, useState} from "react";
import {Subject} from "../../models/Subject";

function CategoryPage() {
    const params = useParams()
    const [subjects, setSubjects] = useState<Array<Subject>>([])
    useEffect(() => {
        (() => {
            switch (params.category) {
                case 'knowledge':
                    setSubjects([
                        {
                            title: "iPhone 9",
                            comments: 94
                        },
                        {
                            title: "iPhone X",
                            comments: 34
                        },
                        {
                            title: "Samsung Universe 9",
                            comments: 36
                        },
                        {
                            title: "OPPOF19",
                            comments: 123
                        },
                        {
                            title: "Huawei P30",
                            comments: 32
                        },
                        {
                            title: "MacBook Pro",
                            comments: 83
                        },
                        {
                            title: "Samsung Galaxy Book",
                            comments: 50
                        },
                        {
                            title: "Microsoft Surface Laptop 4",
                            comments: 68
                        },
                        {
                            title: "Infinix INBOOK",
                            comments: 96
                        },
                        {
                            title: "iPhone 9",
                            comments: 94
                        },
                        {
                            title: "iPhone X",
                            comments: 34
                        },
                        {
                            title: "Samsung Universe 9",
                            comments: 36
                        },
                        {
                            title: "OPPOF19",
                            comments: 123
                        },
                        {
                            title: "Huawei P30",
                            comments: 32
                        },
                        {
                            title: "MacBook Pro",
                            comments: 83
                        },
                        {
                            title: "Samsung Galaxy Book",
                            comments: 50
                        },
                        {
                            title: "Microsoft Surface Laptop 4",
                            comments: 68
                        },
                        {
                            title: "Infinix INBOOK",
                            comments: 96
                        },])
                    break
                case 'place':
                    setSubjects([
                        {
                            title: "HP Pavilion 15-DK1056WM",
                            comments: 89
                        },
                        {
                            title: "perfume Oil",
                            comments: 65
                        },
                        {
                            title: "Brown Perfume",
                            comments: 52
                        },
                        {
                            title: "Fog Scent Xpressio Perfume",
                            comments: 61
                        },
                        {
                            title: "Non-Alcoholic Concentrated Perfume Oil",
                            comments: 114
                        },
                        {
                            title: "Eau De Perfume Spray",
                            comments: 105
                        },
                        {
                            title: "Hyaluronic Acid Serum",
                            comments: 110
                        },
                        {
                            title: "Tree Oil 30ml",
                            comments: 78
                        },
                        {
                            title: "Oil Free Moisturizer 100ml",
                            comments: 88
                        },
                        {
                            title: "Skin Beauty Serum.",
                            comments: 54
                        },
                        {
                            title: "Freckle Treatment Cream- 15gm",
                            comments: 140
                        },
                        {
                            title: "- Daal Masoor 500 grams",
                            comments: 133
                        },
                        {
                            title: "Elbow Macaroni - 400 gm",
                            comments: 146
                        },
                    ])
                    break
                case 'donation':
                    setSubjects([
                        {
                            title: "Orange Essence Food Flavou",
                            comments: 26
                        },
                        {
                            title: "cereals muesli fruit nuts",
                            comments: 113
                        },
                        {
                            title: "Gulab Powder 50 Gram",
                            comments: 47
                        },
                        {
                            title: "Plant Hanger For Home",
                            comments: 131
                        },
                        {
                            title: "Flying Wooden Bird",
                            comments: 17
                        },
                        {
                            title: "3D Embellishment Art Lamp",
                            comments: 54
                        },
                        {
                            title: "Handcraft Chinese style",
                            comments: 7
                        },
                        {
                            title: "Key Holder",
                            comments: 54
                        }
                    ])
                    break
            }
        })()
    }, [params])
    return (
        <FlexBox>
            <SubjectList subjects={subjects}/>
        </FlexBox>
    )
}

export default CategoryPage