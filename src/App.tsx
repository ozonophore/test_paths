import * as React from 'react';
import { Fragment } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
// icons
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import useScript from './useScript';
import ColorSchemeToggle from './components/ColorSchemeToggle';
import Header from './components/Header';
import { useController } from './context';
import Sidebar from './components/Sidebar';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Cluster } from './layouts/dictionary/cluster';
import Dashboard from './layouts/dashboard';
import Home from './layouts/home';
import LoginPage from './layouts/LoginPage';
import { OrderByDay } from './layouts/orderByDay';

const useEnhancedEffect =
    typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function Layout() {
    return (<Fragment>
        <Sidebar/>
        <Box
            component="main"
            className="MainContent"
            sx={{
                px: {
                    xs: 2,
                    md: 6,
                },
                pt: {
                    xs: 'calc(12px + var(--Header-height))',
                    sm: 'calc(12px + var(--Header-height))',
                    md: 3,
                },
                pb: {
                    xs: 2,
                    sm: 2,
                    md: 3,
                },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100dvh',
                gap: 1,
            }}
        >
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Breadcrumbs
                    size="sm"
                    aria-label="breadcrumbs"
                    separator={<ChevronRightRoundedIcon fontSize="small"/>}
                >

                </Breadcrumbs>
                <ColorSchemeToggle
                    sx={{ml: 'auto', display: {xs: 'none', md: 'inline-flex'}}}
                />
            </Box>
            <Outlet/>
        </Box>
    </Fragment>)
}

export default function App() {
    const status = useScript(`https://unpkg.com/feather-icons`);
    const {state} = useController()
    const {activeIndex, activeSubIndex, data} = state.menu
    const menu = data[activeIndex]

    const subMenu = menu.subMenu?.filter(item => item.index === activeSubIndex)[0]

    useEnhancedEffect(() => {
        // Feather icon setup: https://github.com/feathericons/feather#4-replace
        // @ts-ignore
        if (typeof feather !== 'undefined') {
            // @ts-ignore
            feather.replace();
        }
    }, [status]);

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline/>
            <Box sx={{display: 'flex', minHeight: '100dvh'}}>
                <Header/>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="clusters" element={<Cluster/>}/>
                        <Route path="order-by-day" element={<OrderByDay/>}/>
                    </Route>
                    <Route path="*" element={<LoginPage/>}/>
                </Routes>
            </Box>
        </CssVarsProvider>
    );
}
