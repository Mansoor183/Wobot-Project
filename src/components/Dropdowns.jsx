import React, { useContext, useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, InputLabel, IconButton, InputAdornment } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { fetchCameras } from '../API/ApiCall';
import { FilterContext } from '../Contexts/FilterContext';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';

const Dropdowns = () => {

    const {locationFilter, setLocationFilter, statusFilter, setStatusFilter } = useContext(FilterContext);
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [mainData, setMainData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCameras();
            setMainData(data);
        }
        fetchData();
    },[]);

    const uniqueLocations = [
        ...new Map(mainData.map(item => [item.location, item])).values()
    ];


    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        setLocationFilter(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setStatusFilter(event.target.value);
    };

    const clearAllFilter = () => {
        setLocationFilter('');
        setLocation('');
        setStatusFilter('');
        setLocation('');
    }

    return (
    <div style={{display:'flex', justifyContent: 'space-between', paddingLeft: '1%', marginRight: '1%'}}>
        <div style={{ display: 'flex', gap: '10px' }}>
        {/* Location Dropdown */}
        <FormControl variant="outlined" size="small" style={{width: 198}}>
            <InputLabel>Location</InputLabel>
            <Select
            value={location}
            onChange={handleLocationChange}
            label="Location"
            startAdornment={
                <InputAdornment position="start">
                    <LocationOnIcon />
                </InputAdornment>
            }
            >
                {
                    uniqueLocations.map((loc, index) => (
                        <MenuItem key={index} value={loc.location}>
                            {loc.location}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>

        {/* Status Dropdown */}
        <FormControl variant="outlined" size="small" style={{width: 148}}>
            <InputLabel>Status</InputLabel>
            <Select
            value={status}
            onChange={handleStatusChange}
            label="Status"
            startAdornment={
                <InputAdornment position="start">
                    <RssFeedIcon />
                </InputAdornment>
            }
            >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
        </FormControl>
        </div>
        {(locationFilter || statusFilter) && <FilterAltOffOutlinedIcon style={{cursor: 'pointer'}} onClick={clearAllFilter} />}
    </div>
    );
}

export default Dropdowns
