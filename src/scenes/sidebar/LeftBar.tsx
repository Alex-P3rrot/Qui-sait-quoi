import FlexBox from "../../components/FlexBox";

const LeftBar = () => {
    return (
        <FlexBox id="sideLeft" sx={styles.container}>
            Leftbar
        </FlexBox>
    )
};

const styles = {
    container: {
        position: 'fixed',
        width: '150px',
        height: '100%',
        left: 0,
        paddingX: 1,
    }
}

export default LeftBar;