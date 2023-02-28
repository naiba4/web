import {Tab} from "@mui/material";
import React from "react";
import FavoriteInfoTab from "./components/tabs/FavoriteInfoTab";

export default class FavoritesTabList {
    state = {
        tabs: null,
        tabList: [],
        defaultTab: 'favInfo',
        graphWidth: 600
    };

    create() {
        let tabs = {};
        let list = [];

        tabs.Info = <FavoriteInfoTab key='favInfo' width={this.state.graphWidth}/>;

        list = list.concat(Object.keys(tabs).map((item, index) =>
            <Tab value={tabs[item].key + ''} label={item} key={'tab:' + item}/>));

        this.state.tabList = list;
        this.state.tabs = tabs;

        return this.state;
    }
}