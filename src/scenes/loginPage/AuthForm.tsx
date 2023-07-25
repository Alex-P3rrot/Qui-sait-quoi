import {date, object, string} from "yup";
import {Form, FormikBag, FormikErrors, FormikProps, FormikValues, withFormik} from "formik";
import {Box, Button, TextField, Typography} from "@mui/material";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FlexBox from "../../components/FlexBox";
import {formValuesInterface} from "./formValuesInterface";
import {DatePicker} from "@mui/x-date-pickers";
import moment from "moment/moment";
import {MutableRefObject, useRef, useState} from "react";

interface OtherProps {
    pageType: string,
    setPageType: Function,
    isNonMobileScreen: boolean,
}

let loginSchema = object({
    username: string().required(),
    password: string().required()
})
let registerSchema = object({
    username: string().min(2).required(),
    password: string().required(),
    email: string().email().required(),
    birthdate: date().min(new Date(1930, 0, 1)).required(),
    picture: string().nullable(),
    location: string().nullable()
})

async function login(values: FormikValues) {
    console.log(values)
}

async function register(values: FormikValues) {
    console.log(values)
}

const FormContent = (props: OtherProps & FormikProps<formValuesInterface>) => {
    let preview: MutableRefObject<string> = useRef('')
    const {
        pageType,
        isNonMobileScreen,
        setPageType,
        touched,
        errors,
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        isSubmitting
    } = props

    return (
        <Form>
            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": {gridColumn: isNonMobileScreen ? undefined : "span 4"},
                }}>
                {pageType === 'register' && (
                    <>
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{gridColumn: "span 4"}}/>
                        <TextField
                            label="Location"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            name="location"
                            error={Boolean(touched.location) && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                            sx={{gridColumn: "span 2"}}/>
                        <DatePicker
                            disableFuture
                            label="Birthdate"
                            sx={{gridColumn: "span 2"}}
                            onChange={async (value: string | null): Promise<void | FormikErrors<any>> => {
                                if (value) {
                                    await setFieldValue("birthdate", moment(value))
                                } else {
                                    await setFieldValue("birthdate", null)
                                }
                            }}
                            slotProps={{
                                textField: {
                                    onBlur: handleBlur,
                                    value: values.birthdate,
                                    error: (Boolean(touched.birthdate) && Boolean(errors.birthdate)),
                                    helperText: (touched.birthdate && errors.birthdate),
                                },
                            }}/>
                        <Box gridColumn="span 1" borderRadius="5px" p="1rem">
                            <Dropzone
                                multiple={false}
                                onDrop={async (acceptedFiles) => {
                                    preview.current = URL.createObjectURL(acceptedFiles[0])
                                    await setFieldValue("picture", acceptedFiles[0])
                                }}>
                                {({getRootProps, getInputProps}) => (
                                    <Box {...getRootProps()} p="1rem"
                                         sx={{border: '1px dashed', "&:hover": {cursor: "pointer"}}}>
                                        <input {...getInputProps()} />
                                        {!values.picture
                                            ? (<Typography>Add Picture Here</Typography>)
                                            : (
                                                <FlexBox flexDirection="column">
                                                    <Box component="img" src={preview.current} height={150} width={150}
                                                         marginBottom={2}/>
                                                    <FlexBox justifyContent="space-between" pr={2}>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon/>
                                                    </FlexBox>
                                                </FlexBox>
                                            )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>
                        <Box gridColumn="span 3"></Box>
                    </>
                )}
                <TextField
                    label="Username"
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="username"
                    autoComplete="username"
                    error={Boolean(touched.username) && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    sx={{gridColumn: "span 2"}}/>
                <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    autoComplete="current-password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{gridColumn: "span 2"}}
                />
                {/*</Box>*/}

                {/*/!* BUTTONS *!/*/}
                <Box sx={{gridColumn: "2/4"}}>
                    <Button
                        fullWidth
                        disabled={isSubmitting}
                        type="submit"
                        sx={{m: "2rem 0", p: "1rem", border: '1px solid'}}>
                        {pageType === "login" ? "LOGIN" : "REGISTER"}
                    </Button>
                    <Typography
                        onClick={() => {
                            setPageType(pageType === 'login' ? "register" : "login")
                        }}
                        sx={{
                            textDecoration: "underline",
                            paddingBottom: 1,
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}>
                        {pageType === 'login'
                            ? "Don't have an account? Sign Up here."
                            : "Already have an account? Login here."}
                    </Typography>
                </Box>
            </Box>
        </Form>
    )
}

export const AuthForm = withFormik<OtherProps, formValuesInterface>({
    mapPropsToValues: props => {
        return {
            username: '',
            password: '',
            email: '',
            birthdate: null,
            picture: null,
            location: ''
        }
    },
    validationSchema: (props: OtherProps) => {
        return props.pageType === 'login' ? loginSchema : registerSchema
    },
    handleSubmit: async (values, bag: FormikBag<OtherProps, formValuesInterface>) => {
        if (bag.props.pageType === 'login') await login(values)
        if (bag.props.pageType === 'register') await register(values)
    }
})(FormContent)