import {createSlice, Slice} from "@reduxjs/toolkit";
import {SubjectState} from "./types/SubjectState";

const initialState: SubjectState = {
    knowledge: [
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
        }
    ],
    place: [
        {
            id: 18,
            title: "HP Pavilion 15-DK1056WM",
            comments: 89
        },
        {
            id: 19,
            title: "perfume Oil",
            comments: 65
        },
        {
            id: 20,
            title: "Brown Perfume",
            comments: 52
        },
        {
            id: 21,
            title: "Fog Scent Xpressio Perfume",
            comments: 61
        },
        {
            id: 22,
            title: "Non-Alcoholic Concentrated Perfume Oil",
            comments: 114
        },
        {
            id: 23,
            title: "Eau De Perfume Spray",
            comments: 105
        },
        {
            id: 24,
            title: "Hyaluronic Acid Serum",
            comments: 110
        },
        {
            id: 25,
            title: "Tree Oil 30ml",
            comments: 78
        },
        {
            id: 26,
            title: "Oil Free Moisturizer 100ml",
            comments: 88
        },
        {
            id: 27,
            title: "Skin Beauty Serum.",
            comments: 54
        },
        {
            id: 28,
            title: "Freckle Treatment Cream- 15gm",
            comments: 140
        },
        {
            id: 29,
            title: "- Daal Masoor 500 grams",
            comments: 133
        },
        {
            id: 30,
            title: "Elbow Macaroni - 400 gm",
            comments: 146
        },
    ],
    donation: [
        {
            id: 31,
            title: "Orange Essence Food Flavou",
            comments: 26
        },
        {
            id: 32,
            title: "cereals muesli fruit nuts",
            comments: 113
        },
        {
            id: 33,
            title: "Gulab Powder 50 Gram",
            comments: 47
        },
        {
            id: 34,
            title: "Plant Hanger For Home",
            comments: 131
        },
        {
            id: 35,
            title: "Flying Wooden Bird",
            comments: 17
        },
        {
            id: 36,
            title: "3D Embellishment Art Lamp",
            comments: 54
        },
        {
            id: 37,
            title: "Handcraft Chinese style",
            comments: 7
        },
        {
            id: 38,
            title: "Key Holder",
            comments: 54
        }
    ],
    selected: null,
    selectedList: null
}

export const subjectSlice: Slice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        addSubject: (state: SubjectState, action) => {
            const category = action.payload.category
            if (state.hasOwnProperty(category)) {
                const group = state[category]
                if (group !== null && Array.isArray(group)) {
                    group.unshift({id: group.length, ...action.payload.subject})
                }
            }
        },
        setSelected: (state: SubjectState, action) => {
            const group = state[action.payload.category]
            if (group !== null && Array.isArray(group)) {
                const selected = group.find(el => el.id === Number(action.payload.subjectId))
                if (selected !== undefined) {
                    state.selected = selected
                }
            }
        },
        setList: (state: SubjectState, action) => {
            const group = state[action.payload.category]
            if (group && Array.isArray(group)) {
                state.selectedList = group
            } else {
                state.selectedList = null
            }
        }
    }
})

export const {addSubject, setSelected, setList} = subjectSlice.actions;

export default subjectSlice.reducer;