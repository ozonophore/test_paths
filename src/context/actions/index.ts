import { IAction } from '../index';

const FirstSidebarActive = (index: number) : IAction => {
    return {
        type: "FIRST_MENU_SET_ACTIVE",
        payload: index
    }
}

const SecondSidebarActive = (index: number) : IAction => {
    return {
        type: "SECOND_MENU_SET_ACTIVE",
        payload: index
    }
}

export {
    FirstSidebarActive,
    SecondSidebarActive
}