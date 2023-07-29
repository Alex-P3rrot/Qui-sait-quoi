import {
    Avatar,
    Box,
    Divider,
    List,
    ListItemButton,
    Typography,
    useMediaQuery
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {NavigationState} from "../../state/types/NavigationState";
import {useOutsideEvent} from "../../hooks/outsideEvent";
import {setIsMenuLeftToggled} from "../../state/navigation";
import {MutableRefObject, useRef} from "react";
import {AuthState} from "../../state/types/AuthState";
import {User} from "../../models/User";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";
import WindowIcon from '@mui/icons-material/Window';
import PlaceIcon from '@mui/icons-material/Place';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HailOutlinedIcon from '@mui/icons-material/HailOutlined';

const LeftBar = () => {
    const navigate = useNavigate()
    const user: User | null = useSelector(({authState}: { authState: AuthState }) => authState.user)
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
    const isMenuLeftToggled = useSelector(({navigationState}: {
        navigationState: NavigationState
    }) => navigationState.isMenuLeftToggled)
    const element: MutableRefObject<HTMLElement | undefined> = useRef()
    const dispatch = useDispatch()
    useOutsideEvent(element, () => dispatch(setIsMenuLeftToggled(false)))

    return (
        <Box component="aside"
             className={!isNonMobileScreen ? 'bg-gradient' : ''}
             ref={element}
             id="sideLeft"
             sx={
                 {
                     ...(isNonMobileScreen || isMenuLeftToggled
                         ? {boxShadow: '0 0 10px rgb(161 173 170)', transform: 'translateX(0)'}
                         : {transform: 'translateX(-180px)'}),
                     ...styles.container
                 }
             }>
            <Box width="100%" color="#585858">
                <List>
                    <ListItemButton onClick={() => navigate('/')}>
                        <WindowIcon/>&nbsp;
                        <Typography>Home</Typography>
                    </ListItemButton>
                    <Divider sx={{marginY: 2}}/>
                    {user
                        ? (
                            <Avatar alt={user.username}
                                    src={user.picture ? user.picture : 'https://xsgames.co/randomusers/avatar.php?g=female'}/>
                        )
                        : (
                            <ListItemButton onClick={() => navigate('/login')}>
                                <LoginIcon/>&nbsp;
                                <Typography>Login</Typography>
                            </ListItemButton>
                        )
                    }
                    <Divider sx={{marginY: 2}}/>
                    <Typography sx={{mb: 2, ml: 2, textDecoration: 'underline'}}>Categories</Typography>
                    <ListItemButton onClick={() => navigate('/category/knowledge')}>
                        <TravelExploreIcon/>&nbsp;
                        <Typography>Savoir faire</Typography>
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/category/place')}>
                        <PlaceIcon/>&nbsp;
                        <Typography>Lieux</Typography>
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/category/donation')}>
                        <VolunteerActivismIcon/>&nbsp;
                        <Typography>Dons</Typography>
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/category/found')}>
                        <HailOutlinedIcon/>&nbsp;
                        <Typography>Objets trouvé</Typography>
                    </ListItemButton>
                </List>
            </Box>
        </Box>
    )
};

const styles = {
    container: {
        position: 'fixed',
        width: '180px',
        height: '100%',
        left: 0,
        paddingX: 1,
        transition: 'transform .3s',
        zIndex: 9
    }
}

export default LeftBar;