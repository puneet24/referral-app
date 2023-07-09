import MenuIcon from '@mui/icons-material/Menu';
import { Alert, CircularProgress, Container, Link, Snackbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from './Pages/Home';
import { Logout } from './Pages/Logout';
import { NotFoundPage } from './Pages/NotFoundPage';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { fetchUser } from './service';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [{ label: 'Signup', path: '/signup' }, { label: 'Login', path: '/signin' }];
const authenticatedNavItems = [{ label: 'Logout', path: '/logout' }]

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [globalSnack, setGlobalSnack] = useState<any>({});
  const navigate = useNavigate()
  const location = useLocation();

  const showRegistrationSuccess = () => {
    setRegistrationSuccess(true);
  }

  const getUser = async () => {
    const user = await fetchUser();
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getUser()
  }, [location.pathname])

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Referral App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Link href={item.path} underline="none">
              {item.label}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  if (isLoading) {
    return <CircularProgress></CircularProgress>
  }

  if (user && location.pathname !== '/') {
    navigate('');
  }

  if (!user && location.pathname === '/') {
    navigate('signup')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Referral App
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {(user ? authenticatedNavItems : navItems).map((item) => (
              <Link color={'white'} margin={1} href={item.path} underline="none">
                {item.label}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }} style={{ marginTop: 0 }}>
        <Toolbar />

      </Box>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={registrationSuccess} autoHideDuration={6000} onClose={() => { setRegistrationSuccess(false) }}>
        <Alert onClose={() => { setRegistrationSuccess(false) }} severity="success" sx={{ width: '100%' }}>
          Registration is successful!
        </Alert>
      </Snackbar>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={globalSnack.open} autoHideDuration={6000} onClose={() => { setGlobalSnack({ ...globalSnack, open: false, message: '' }) }}>
        <Alert onClose={() => { setGlobalSnack({ ...globalSnack, open: false, message: '' }) }} severity={globalSnack.error ? "error" : "success"} sx={{ width: '100%' }}>
          {globalSnack.message}
        </Alert>
      </Snackbar>

      <Container style={{ marginTop: 50 }}>
        <Routes>
          <Route path="/" element={<HomePage setGlobalSnack={setGlobalSnack} />} />
          <Route path="/signup" element={<SignUp showRegistrationSuccess={showRegistrationSuccess} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>

    </Box>
  );
}