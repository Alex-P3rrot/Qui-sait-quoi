import {Box, styled} from "@mui/material";
import {ColorPartial} from "@mui/material/styles/createPalette";

const FlexBox = styled(Box)(({theme}) => ({
    display: 'flex',
    // backgroundColor: (theme.palette.primary as ColorPartial)[800]

})) as typeof Box;

export default FlexBox;