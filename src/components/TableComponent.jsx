import React, { useContext } from 'react'
import { Button, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Dropdowns from './Dropdowns'
import { BlockImg, CloudImg, DeviceImg, WarningImg } from '../assets/svg'
import { FilterContext } from '../Contexts/FilterContext'
import { SearchContext } from '../Contexts/SearchContext'
import { fetchCameras } from '../API/ApiCall'


  const columns = [
    {
      field: 'name',
      headerName: 'NAME',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center'}}>
          {/* Online/Offline */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: params.row.current_status === 'Online' ? 'green' : 'red',
              marginRight: 8,
            }}
          ></div>
          {/* Name */}
          <span>{params.value}</span>
          {/* Warning symbol if exists */}
          {params.row.hasWarning && (
            <span style={{ marginLeft: 6, marginTop: 6}}><WarningImg/></span>
          )}
        </div>
      ),
    },
    {
      field: 'health',
      headerName: 'HEALTH',
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const health = params.row.health || {};
        const renderIconWithProgress = (label) => {
          let color;
          switch (health[label]) {
            case 'A':
              color = '#029262';
              break;
            case 'B':
              color = '#FF7E17';
              break;
            case 'C':
              color = '#FF7E17';
              break;
            case 'D':
              color = '#ff8080';
              break;
            case 'E':
              color = '#ff3333';
              break;
            case 'F':
              color = '#ff3333';
              break;
            default:
              color = '#A0A0A0';
              break;
          }
          return (
            <div style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
              {label === 'cloud' && <CloudImg />}
              {label === 'device' && <DeviceImg />}
              <div
                style={{
                  position: 'relative',
                  width: 20,
                  height: 20,
                  padding: 3,
                  borderRadius: '50%',
                  border: `3px solid ${color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 5
                }}
              >
                {(health[label]) ? health[label] : '-'}
              </div>
            </div>
          );
        };
    
        return (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
            {renderIconWithProgress('cloud')}
            {renderIconWithProgress('device')}
          </div>
        );
      },
    },
      { field: 'location', headerName: 'LOCATION', sortable: false, flex: 1},
      { field: 'recorder', headerName: 'RECORDER', sortable: false, flex: 1},
      {
        field: 'tasks',
        headerName: 'TASKS',
        sortable: false,
        flex: 1,
        renderCell: (params) => (
            <div>
                <span>{params.value}</span>
                <span>{params.value > 1  ? ' Tasks' : ' Task'}</span>
            </div>
        ),
      },
      {
        field: 'status',
        headerName: 'STATUS',
        sortable: false,
        flex: 1,
        renderCell: (params) => (
            <Button
                variant="contained"
                size="small"
                style={{
                    backgroundColor: params.value === 'Active' ? 'rgba(2, 146, 98, 0.1)' : '#F0F0F0',
                    color: params.value === 'Active' ? '#029262' : '#545454',
                    textTransform: 'none',
                    boxShadow: 'none'
                }}
            >
                {params.value}
            </Button>
        ),
      },
    
      { field: 'actions',
        headerName: 'ACTIONS',
        sortable: false,
        flex: 1,
        renderCell: () => (
          <BlockImg />
        )
      },
    ];
  
  const paginationModel = { page: 0, pageSize: 10 };

const TableComponent = () => {

  const { locationFilter, statusFilter } = useContext(FilterContext);
  const { search } = useContext(SearchContext);


    const [cameraList, setCameraList] = React.useState([]);
    React.useEffect(() => {
      const a = async () => {
        const data = await fetchCameras();
        setCameraList(data);
      }
      a();
    },[]);


    const processedCameraList = cameraList
      .filter((camera) => {
        return (
          (!search ||  camera.name.toLowerCase().includes(search.toLowerCase())) &&
          (!locationFilter || camera.location === locationFilter) &&
          (!statusFilter || camera.status === statusFilter)
        );
      })
      .map(camera => {
      const processedCamera = { ...camera };
      
      const replaceEmptyStrings = (obj) => {
        Object.keys(obj).forEach(key => {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            replaceEmptyStrings(obj[key]);
          } else if (obj[key] === '') {
            obj[key] = 'N/A';
          }
        });
        return obj;
      };
    
      return replaceEmptyStrings(processedCamera);
    });


  return (
    <>
      <Paper sx={{ width: '100%', marginTop: '1%', paddingTop: '1%' }}>
        <Dropdowns/>
        <DataGrid
          rows={processedCameraList}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }} />
      </Paper>
    </>
  )
}

export default TableComponent
