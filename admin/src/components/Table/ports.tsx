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
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { visuallyHidden } from '@mui/utils'
import { BiFilter } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'
import {
  Divider,
  LinearProgress,
  ListItemText,
  MenuItem,
  MenuList,
  Modal,
} from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../Input'
import {
  useDeletePort,
  useGetPortById,
  useUpdatePort,
} from '../../services/PortService'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreatePortSchema } from '../../pages/Ports'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

interface Data {
  id: string
  name: string
  code: string
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
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Tên kho hàng',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Mã kho hàng',
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
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props

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
          Ports
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <MdDeleteOutline />
          </IconButton>
        </Tooltip>
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

function createData(port: PortType): Data {
  return {
    id: port.id,
    name: port.name,
    code: port.code,
  }
}

interface listPort {
  listPort: PortType[]
  isLoading?: boolean
}

const EnhancedPortTable: React.FC<listPort> = ({
  listPort,
  isLoading = false,
}) => {
  const rows = listPort.map(port => createData(port))
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [contextMenuPayload, setContextMenuPayload] = useState<
    ContextType<Data>
  >({
    x: 0,
    y: 0,
    close: true,
    selectedItem: undefined,
  })

  // region Handle
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
      const newSelected = rows.map(n => n.name)
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

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
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
  // endregion

  return (
    <Box sx={{ width: '100%' }}>
      <ContextMenuTableComponent {...contextMenuPayload} />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        {isLoading && <LinearProgress />}
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
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name)
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
                        onClick={event => handleClick(event, row.name)}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.code}</TableCell>
                    </TableRow>
                  )
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
    </Box>
  )
}

export default EnhancedPortTable

const ContextMenuTableComponent = ({
  x,
  y,
  close,
  selectedItem,
}: ContextType<Data>) => {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)

  const methods = useForm<CreatePortType>({
    resolver: yupResolver(CreatePortSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods

  const { mutateAsync: updatePortAsync } = useUpdatePort()
  const { mutateAsync: deletePortAsync } = useDeletePort()
  const { data: port } = useGetPortById(selectedItem?.id)

  useEffect(() => {
    if (port) {
      setValue('name', port?.data?.name)
    }
  }, [port])

  const onUpdate = async (data: CreatePortType) => {
    updatePortAsync({ ...data, id: port?.data!.id! }).then(res => {
      toast.success('Cập nhật thành công')
      queryClient.invalidateQueries('GET_PORTS')
      setOpen(!open)
    })
  }

  const onDelete = () => {
    deletePortAsync(port?.data!.id!).then(res => {
      toast.success('Xóa thành công')
      queryClient.invalidateQueries('GET_PORTS')
    })
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(!open)
        }}
      >
        <div
          className={
            'w-1/2  p-8 bg-white rounded shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          }
        >
          <FormProvider {...methods}>
            <div className="flex w-full">
              {Object.keys(errors).length > 0 && (
                <div className="p-4 rounded shadow bg-red-400 text-white my-4 w-full">
                  {Object.keys(errors).length > 0 && (
                    <div>
                      <ul>
                        {Object.entries(errors).map(([name, error]) => (
                          <li key={name}>{error.message}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit(onUpdate)}>
              <div className={'flex flex-col'}>
                <p className={'text-2xl font-bold'}>Thêm kho hàng</p>
                <div className={'w-full grid grid-cols-1 gap-4 mt-4'}>
                  <Input label={'Tên kho hàng'} type={'text'} name={'name'} />
                </div>
                <div
                  className={'flex items-center mt-8 gap-2 justify-end w-full'}
                >
                  <button
                    className={
                      'bg-yellow-400 px-4 py-2 rounded shadow hover:opacity-80 transition'
                    }
                    type={'submit'}
                  >
                    Thêm
                  </button>
                  <button
                    className={
                      'bg-gray-400 px-4 py-2 rounded shadow hover:opacity-80 transition'
                    }
                    type="reset"
                    onClick={() => {
                      setOpen(!open)
                    }}
                  >
                    Hủy bỏ
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </Modal>
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
          <MenuItem
            onClick={e => {
              setOpen(true)
            }}
          >
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={e => onDelete()}>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={e => {
              navigator.clipboard.writeText(port?.data?.code!)
            }}
          >
            <ListItemText>Copy mã kho hàng</ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    </>
  )
}
