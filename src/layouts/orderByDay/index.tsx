import * as React from 'react';
import { Fragment, useState } from 'react';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Box from '@mui/joy/Box';
import OrderTable from './OrderTable';
import Input from '@mui/joy/Input';
import moment from 'moment/moment';

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import IconButton from '@mui/joy/IconButton';
import { OrdersService } from '@client';

export function OrderByDay() {
    const [date, setDate] = useState(moment().format("yyyy-MM-DD"))

    const handleOnDownloadExcel = () => {
        OrdersService.getOrdersReport()
            .catch(reson => console.error(reson))
            .then(value => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(value as Blob);
                link.download = 'file.txt';
                link.click();
            })
    }

    return (
        <Fragment>
            <Box
                sx={{
                    display: 'flex',
                    my: 1,
                    gap: 1,
                    flexDirection: {xs: 'column', sm: 'row'},
                    alignItems: {xs: 'start', sm: 'center'},
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}
            >
                <Typography level="h3">Заказы на день</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        my: 1,
                        gap: 2,
                        flexDirection: {xs: 'column', sm: 'row'},
                        alignItems: {xs: 'start', sm: 'center'},
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    <Input
                        type="date"
                        size="sm"
                        defaultValue={date}
                        onChange={(event) => setDate(event.target.value)}
                        error={!moment(date).isValid()}
                    ></Input>

                    <IconButton variant='outlined' size="sm">
                        <PlayArrowRoundedIcon/>
                    </IconButton>

                    <Button
                        color="primary"
                        startDecorator={<DownloadRoundedIcon/>}
                        size="sm"
                        onClick={handleOnDownloadExcel}
                    >
                        Скачать Excel
                    </Button>
                </Box>
            </Box>
            <OrderTable/>
        </Fragment>
    )
}