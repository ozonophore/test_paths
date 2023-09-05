import * as React from 'react';
import { styled } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { closeSidebar } from '../utils';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DynamicFeedRoundedIcon from '@mui/icons-material/DynamicFeedRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListSubheader from '@mui/joy/ListSubheader';
import { Link, useLocation } from 'react-router-dom';

interface IMenuItem {
    id: string,
    title: string
    icon: React.JSX.Element
    href?: string
    menu?: IMenuItem[]
}

const menu = [
    {
        id: "menu_0",
        title: "Главная",
        icon: <HomeRoundedIcon/>,
        href: "/"
    }, {
        id: "menu_1",
        title: "Dashboard",
        icon: <DashboardRoundedIcon/>,
        href: "dashboard"
    }, {
        id: "menu_2",
        title: "Справочники",
        icon: <DynamicFeedRoundedIcon/>,
        menu: [
            {
                id: "menu_2_1",
                title: "Кластеры",
                icon: <DeviceHubRoundedIcon/>,
                href: "clusters"
            }
        ]
    }, {
        id: "menu_3",
        title: "Отчеты",
        icon: <FolderRoundedIcon/>,
        menu: [
            {
                id: "menu_3_1",
                title: "Заказы за день",
                icon: <ShoppingCartIcon/>,
                href: "order-by-day"
            }
        ]
    }
]

const Dropdown = styled('i')(({theme}) => ({
    color: theme.vars.palette.text.tertiary,
}));

export default function Sidebar() {

    const { state } = useLocation();
    const { selected } = !state ? { selected: "menu_0" } : state
    function renderMenu(menu: IMenuItem[]): React.JSX.Element[] {

        return (menu.map((item: IMenuItem) => (
                <ListItem key={item.id} nested={!!item.menu}>
                    {!!(item.href) && <ListItemButton
                        to={item.href}
                        state={{ selected: item.id }}
                        selected={ item.id === selected }
                        style={{
                            color: (item.id === selected) ? '#0052cc' : ''
                        }}
                        component={Link}>
                        <ListItemDecorator>
                            {item.icon}
                        </ListItemDecorator>
                        <ListItemContent>
                            {item.title}
                        </ListItemContent>
                    </ListItemButton>}
                    {!(item.href) && <ListSubheader>
                        <ListItemDecorator>
                            {item.icon}
                        </ListItemDecorator>
                        <ListItemContent>{item.title}</ListItemContent>
                    </ListSubheader>}
                    {!!(item.menu) && <List>
                        {renderMenu(item.menu)}
                    </List>}
                </ListItem>
            ))
        )
    }

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: {
                    xs: 'fixed',
                    md: 'sticky',
                },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 1.5,
                py: 3,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '224px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '256px',
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',

                    opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <List
                    size="sm"
                    sx={{
                        '--ListItem-radius': '6px',
                        '--List-gap': '4px',
                        '--List-nestedInsetStart': '20px',
                    }}
                >
                    {renderMenu(menu)}
                </List>
            </Box>
            <Divider/>
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <Avatar variant="outlined" src="/static/images/avatar/3.jpg"/>
                <Box sx={{minWidth: 0, flex: 1}}>
                    <Typography fontSize="sm" fontWeight="lg">
                        Неизвесный пользователь
                    </Typography>
                    <Typography level="body-xs"></Typography>
                </Box>
                <IconButton
                    component={Link}
                    to="/logout"
                    variant="plain"
                    color="neutral">
                    <i data-feather="log-out"/>
                </IconButton>
            </Box>
        </Sheet>
    );
}
