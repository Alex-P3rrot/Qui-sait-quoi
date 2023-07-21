import FlexBox from "../../components/FlexBox";

const RightBar = () => {
    return (
        <FlexBox id="sideRight" sx={{...styles.container}}>
            RightBar
        </FlexBox>
    )
};

const styles = {
    container: {
        position: 'fixed',
        width: '150px',
        height: '100%',
        right: 0,
        justifyContent: 'right',
        paddingX: 1,
    }
}

export default RightBar;