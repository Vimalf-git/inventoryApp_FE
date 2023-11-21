import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { tableProductData } from './TableDataContext';
import ApiService from '../../common/ApiService';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const headCells = [
  {
    id: 'Sale',
    numeric: false,
    disablePadding: true,
    label: 'Sale',
  }, {
    id: 'ProductName',
    numeric: false,
    disablePadding: true,
    label: 'ProductName',
  },
  {
    id: 'ProductCode',
    numeric: false,
    disablePadding: false,
    label: 'ProductCode',
  },
  {
    id: 'Category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'Quantity',
    numeric: false,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'Price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'Edit',
    numeric: false,
    disablePadding: false,
    label: 'Edit',
  },
  {
    id: 'Delete',
    numeric: false,
    disablePadding: false,
    label: 'Delete',
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Product List
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {

  const { rows = [], setRows, getProduct } = React.useContext(tableProductData);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.checkboxId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const delteProduct = async (index, customerId) => {
    console.log(customerId);
    const getRowsData = [...rows];
    getRowsData.splice(index, 1);
    setRows(getRowsData)
    await ApiService.delete(`/deleteproduct/${customerId}`);
    getProduct()
  }
  const [toggleAlert, setToggle] = React.useState(false)
  const [qty, setQty] = React.useState(0);
  const [curQty, setCurQty] = React.useState(0);
  const [errorQty, setErrorQty] = React.useState("");
  const [rowData, setRowData] = React.useState();
  const saled = async () => {
    try {
      if (parseInt(qty) > 0 && parseInt(qty) <= parseInt(curQty)) {
        const token = sessionStorage.getItem('token');
        const email = jwtDecode(token).email;
        console.log("enter");
        setToggle(prev => !prev);
        setErrorQty("")

        const res = await ApiService.post('/saleslistadd', {
          id: rowData.id,
          email: email,
          productName: rowData.productName,
          category: rowData.category,
          quantity: qty,
          price: rowData.price
        })
        getProduct()
      } else {
        setErrorQty("please sale based on your quantity")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate();
  return (
    <>
      {
        toggleAlert ?
          <Alert icon={false} sx={{
            position: 'absolute', top: '5rem', zIndex: 1, display: 'flex',
            justifyContent: 'center', alignItems: 'center', width: '25rem', height: '10rem'
          }}>
            <TextField sx={{ m: 1, width: '85%' }} onChange={(e) => { setQty(e.target.value) }}
            />
            <Button variant='contained' sx={{ display: 'flex', m: '1rem' }}

              onClick={() => saled()}
            >saled</Button>

            {errorQty ? <Typography color={'red'}>{errorQty}</Typography> : ""}
          </Alert>
          : <></>
      }
      <Box sx={{ width: '87%' }}>

        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row.checkboxId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      key={row.checkboxId}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>
                        <Button variant='outlined' color='secondary'
                          onClick={() => {
                            setToggle(prev => !prev), setCurQty(row.quantity),
                              setRowData(row)
                          }}
                          disabled={row.quantity == 0 ? true : false}
                        >
                          Sale</Button>
                      </TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                      >
                        {row.productName}
                      </TableCell>
                      <TableCell >{row.ProductCode}</TableCell>
                      <TableCell >{row.category}</TableCell>
                      <TableCell align="left">{row.quantity}</TableCell>
                      <TableCell align="left">{`RS-${row.price}`}</TableCell>
                      <TableCell >
                        <Button variant='contained'
                          onClick={() => { navigate(`/editproduct/${row.id}`) }}
                        ><span>
                            <EditIcon />
                          </span></Button>
                      </TableCell>

                      <TableCell>
                        <Button variant='outlined' color='error'
                          onClick={() => delteProduct(index, row.id)}
                        >
                          <span>
                            <DeleteIcon />
                          </span>
                        </Button>
                      </TableCell>

                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </>

  );
}

