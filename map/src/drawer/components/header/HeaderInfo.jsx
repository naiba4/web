import { Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../../context/AppContext';
import SearchInfo from './SearchInfo';

export default function HeaderInfo({ leftDrawerWidth }) {
    const ctx = useContext(AppContext);

    const [text, setText] = useState([]);

    useEffect(() => {
        if (
            ctx.headerText.tracks.text === '' &&
            ctx.headerText.weather.text === '' &&
            ctx.headerText.search.text === '' &&
            ctx.headerText.route.text === ''
        ) {
            setText(ctx.headerText.welcome.text);
        } else {
            setText(
                ctx.headerText.search.text +
                    ' ' +
                    ctx.headerText.weather.text +
                    ' ' +
                    ctx.headerText.route.text +
                    ' ' +
                    ctx.headerText.tracks.text
            );
        }
    }, [ctx.headerText, ctx.setHeaderText]);

    return (
        <Box sx={{ ml: `${leftDrawerWidth}px` }}>
            <SearchInfo />
            <Typography sx={{ display: 'inline', fontSize: 14 }} color="inherit">
                {text}
            </Typography>
        </Box>
    );
}
