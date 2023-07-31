import {SubjectStateType, useSubjectState} from "../state/subject";
import {useEffect} from "react";
import {Subject} from "../models/Subject";
import {render} from "@testing-library/react";
import {testData} from "../state/subject";

function TestComponent({selector, effect}: { selector: (state: SubjectStateType) => any, effect: Function }) {
    const item = useSubjectState(selector)
    useEffect(() => effect(item), [item])
    return null
}
const testSubject = {id: 1000, title: "Test subject", comments: 0}
const testSubjectArray = [
    {id: 1001, title: "Test subject 1", comments: 0},
    {id: 1002, title: "Test subject 2", comments: 0}
]

test('Should add subject into existing category', () => {
    const category = 'knowledge'
    const selector = (state: SubjectStateType) => ({
        cachedSubject: state.cachedSubject,
        addCachedSubject: state.addCachedSubject
    })
    const effect = jest.fn().mockImplementation((item) => {
        if (!item.cachedSubject[category].find((el: Subject) => el.id === testSubject.id)) {
            item.addCachedSubject(category, testSubject)
        }
    })
    render(<TestComponent selector={selector} effect={effect}/>)
    expect(effect).toHaveBeenCalledTimes(2)
    expect(effect).toHaveBeenCalledWith(expect.objectContaining({
        cachedSubject: {
            knowledge: [
                ...testData[category],
                testSubject,
            ]
        }
    }))
})

test('Should add array of subjects into existing category', () => {
    const category = 'knowledge'
    const selector = (state: SubjectStateType) => ({
        cachedSubject: state.cachedSubject,
        addCachedSubject: state.addCachedSubject
    })
    const effect = jest.fn().mockImplementation((item) => {
        if (
            !item.cachedSubject[category].find((el: Subject) => el.id === testSubjectArray[0].id) &&
            !item.cachedSubject[category].find((el: Subject) => el.id === testSubjectArray[1].id)
        ) {
            item.addCachedSubject(category, testSubjectArray)
        }
    })
    render(<TestComponent selector={selector} effect={effect}/>)
    expect(effect).toHaveBeenCalledTimes(2)
    expect(effect).toHaveBeenCalledWith(expect.objectContaining({
        cachedSubject: {
            knowledge: [
                ...testData[category],
                testSubject,
                ...testSubjectArray,
            ]
        }
    }))
})