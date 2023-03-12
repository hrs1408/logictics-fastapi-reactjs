import * as React from 'react'
import { useEffect, useState } from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { visuallyHidden } from '@mui/utils'
import { BiFilter } from 'react-icons/bi'
import { MdDeleteOutline, MdEdit } from 'react-icons/md'
import { useQueryClient } from 'react-query'
import { Divider, ListItemText, Menu, MenuItem, MenuList } from '@mui/material'
import {
  useDeleteInvoice,
  useUpdateStatusInvoices,
} from '../../services/InvoiceService'
import toast from 'react-hot-toast'

interface Data {
  id: number
  senderFullName: string
  senderProvince: string
  receiverFullName: string
  receiverProvince: string
  payment: string
  cod: string
  status: string
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'senderFullName',
    numeric: false,
    disablePadding: true,
    label: 'Tên người gửi',
  },
  {
    id: 'receiverFullName',
    numeric: false,
    disablePadding: false,
    label: 'Tên người nhận',
  },
  {
    id: 'senderProvince',
    numeric: false,
    disablePadding: false,
    label: 'Thành phố người nhận',
  },
  {
    id: 'receiverProvince',
    numeric: false,
    disablePadding: false,
    label: 'Thành phố người gửi',
  },
  {
    id: 'payment',
    numeric: false,
    disablePadding: false,
    label: 'Thanh toán',
  },
  {
    id: 'cod',
    numeric: false,
    disablePadding: false,
    label: 'COD',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái',
  },
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
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
  )
}

interface EnhancedTableToolbarProps {
  numSelected: number
  selected: readonly string[]
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, selected } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const queryClient = useQueryClient()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { mutateAsync: updateStatusInvoicesAsync } = useUpdateStatusInvoices()

  const onChangeStatus = (status: Invoice['status']) => {
    let data: InvoicesUpdateStatusPayload = {
      invoices: selected.map(id => ({
        invoiceId: id,
        status,
      })),
    }
    updateStatusInvoicesAsync(data)
      .then(res => {
        toast.success('Cập nhật thành công')
      })
      .finally(() => {
        queryClient.invalidateQueries('GET_INVOICES')
        setAnchorEl(null)
      })
  }
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Đơn hàng
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton>
              <MdDeleteOutline />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <>
              <IconButton onClick={handleClick}>
                <MdEdit />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={e => onChangeStatus('ACCEPTED')}>
                  ACCEPTED
                </MenuItem>
                <MenuItem onClick={e => onChangeStatus('REFUSE')}>
                  REFUSE
                </MenuItem>
                <MenuItem onClick={e => onChangeStatus('PENDING')}>
                  PENDING
                </MenuItem>
              </Menu>
            </>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <BiFilter />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

function createData(invoice: InvoiceTableType): Data {
  return {
    id: invoice.id,
    senderFullName: invoice.senderFullName,
    senderProvince: invoice.senderProvince,
    receiverFullName: invoice.receiverFullName,
    receiverProvince: invoice.receiverProvince,
    payment: invoice.payment,
    cod: invoice.cod,
    status: invoice.status,
  }
}

interface ListInvoice {
  listInvoice: InvoiceTableType[]
}

const EnhancedInvoiceTable: React.FC<ListInvoice> = ({ listInvoice }) => {
  const rows = listInvoice.map(invoice => createData(invoice))
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('senderFullName')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [contextMenuPayload, setContextMenuPayload] = useState<
    ContextType<Data>
  >({
    x: 0,
    y: 0,
    close: true,
    selectedItem: undefined,
  })
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map(n => String(n.id))
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  useEffect(() => {
    const closeContextMenu = () => {
      setContextMenuPayload({
        x: 0,
        y: 0,
        close: true,
        selectedItem: undefined,
      })
    }
    window.addEventListener('click', closeContextMenu)
    return () => window.removeEventListener('click', closeContextMenu)
  }, [])
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <ContextMenuTableComponent {...contextMenuPayload} />
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
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
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(String(row.id))
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      onContextMenu={(
                        e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
                      ) => {
                        e.preventDefault()
                        const selectedItem = rows.find(
                          item => item.id === row.id
                        )
                        setContextMenuPayload({
                          x: e.pageX,
                          y: e.pageY,
                          close: false,
                          selectedItem: selectedItem,
                        })
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={event => handleClick(event, String(row.id))}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        onClick={event => handleClick(event, String(row.id))}
                      >
                        {row.senderFullName}
                      </TableCell>
                      <TableCell align="left">{row.receiverFullName}</TableCell>
                      <TableCell align="left">{row.senderProvince}</TableCell>
                      <TableCell align="left">{row.receiverProvince}</TableCell>
                      <TableCell align="left">{row.payment}</TableCell>
                      <TableCell align="left">{row.cod}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
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
    </Box>
  )
}

export default EnhancedInvoiceTable

const ContextMenuTableComponent = ({
  x,
  y,
  close,
  selectedItem,
}: ContextType<Data>) => {
  const queryClient = useQueryClient()

  const [open, setOpen] = React.useState(false)

  const { mutateAsync: updateStatusInvoicesAsync } = useUpdateStatusInvoices()
  const { mutateAsync: deleteInvoicesAsync } = useDeleteInvoice()

  const onChangeStatus = (status: Invoice['status']) => {
    let data: InvoicesUpdateStatusPayload = {
      invoices: [
        {
          invoiceId: String(selectedItem?.id),
          status,
        },
      ],
    }
    updateStatusInvoicesAsync(data)
      .then(res => {
        toast.success('Cập nhật thành công')
      })
      .finally(() => {
        queryClient.invalidateQueries('GET_INVOICES')
      })
  }
  const onDelete = () => {
    deleteInvoicesAsync(String(selectedItem?.id))
      .then(res => {
        toast.success('Xóa thành công')
      })
      .finally(() => {
        queryClient.invalidateQueries('GET_INVOICES')
      })
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: y,
          left: x,
          zIndex: 1000,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
          display: close ? 'none' : 'block',
        }}
      >
        <MenuList>
          <MenuItem onClick={e => onDelete()}>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={e => onChangeStatus('ACCEPTED')}>
            <ListItemText>Change To ACCEPTED</ListItemText>
          </MenuItem>
          <MenuItem onClick={e => onChangeStatus('REFUSE')}>
            <ListItemText>Change To REFUSE</ListItemText>
          </MenuItem>
          <MenuItem onClick={e => onChangeStatus('PENDING')}>
            <ListItemText>Change To PENDING</ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    </>
  )
}
