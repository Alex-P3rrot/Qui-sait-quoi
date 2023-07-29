import {Form, FormikBag, FormikProps, withFormik} from "formik";
import {object, string} from "yup";
import {Button, TextField} from "@mui/material";

const FormContent = (props: OtherProps & FormikProps<{ title: string }>) => {
    const {
        handleBlur,
        handleChange,
        values,
        touched,
        errors,
        setSlideIn
    } = props

    return (
        <Form>
            <TextField
                label="Titre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={Boolean(touched.title) && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{width: '100%'}}/>
                <Button variant="outlined" onClick={() => setSlideIn(false)} sx={{mt: 4}}>Annuler</Button>
                <Button variant="outlined" type="submit" sx={{mt: 4, float:'right'}}>Enregistrer</Button>
        </Form>
    )
}

type OtherProps = {
    setSlideIn: Function,
    category: string,
    onSubmit: Function
}

export const SubjectForm = withFormik<OtherProps, { title: string }>({
    mapPropsToValues: () => {
        return {
            title: ''
        }
    },
    validationSchema: () => {
        return object({
            title: string().min(10).required()
        })
    },
    handleSubmit: async (values, formikBag: FormikBag<OtherProps, { title: string }>) => {
        formikBag.props.onSubmit(values)
    }
})(FormContent)