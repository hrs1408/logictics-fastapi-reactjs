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
import { MdDeleteOutline } from 'react-icons/md'
import { Divider, ListItemText, MenuItem, MenuList, Modal } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../Input'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import toast from 'react-hot-toast'
import { object, string } from 'yup'
import { useCreateUser, useUserById } from '../../services/UserService'

interface Data {
  id: number
  position: string
  type_user: string
  work_address: string
  email: string
  fullname: string
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
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'fullname',
    numeric: false,
    disablePadding: false,
    label: 'Tên đầy đủ',
  },
  {
    id: 'work_address',
    numeric: false,
    disablePadding: false,
    label: 'Địa chỉ làm việc',
  },
  {
    id: 'type_user',
    numeric: false,
    disablePadding: false,
    label: 'Phân quyền',
  },
  {
    id: 'position',
    numeric: false,
    disablePadding: false,
    label: 'Vị trí làm việc',
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
            align={headCell.numeric ? 'right' : 'left'}
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
          Users
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

function createData(user: UserType): Data {
  return {
    id: user.id as number,
    fullname: user.userInformation?.fullname,
    position: user.userInternalInformation?.position,
    work_address: user.userInternalInformation?.workAddress,
    email: user.email,
    type_user: user.typeUser,
  }
}

interface listUser {
  listUser: UserType[]
}

const EnhancedTable: React.FC<listUser> = ({ listUser }) => {
  const rows = listUser.map(user => createData(user))
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('position')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
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
      const newSelected = rows.map(n => n.email)
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
      <ContextMenuTableComponent {...contextMenuPayload} />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
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
                  const isItemSelected = isSelected(row.email)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onContextMenu={(
                        e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
                      ) => {
                        e.preventDefault()
                        const selectedItem = rows.find(
                          item => item.email === row.email
                        )
                        setContextMenuPayload({
                          x: e.pageX,
                          y: e.pageY,
                          close: false,
                          selectedItem,
                        })
                      }}
                      onClick={event => handleClick(event, String(row.id))}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
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
                      >
                        {row.email}
                      </TableCell>
                      <TableCell align="right">{row.fullname}</TableCell>
                      <TableCell align="right">{row.work_address}</TableCell>
                      <TableCell align="right">{row.type_user}</TableCell>
                      <TableCell align="right">
                        {row.position || 'Nhân viên'}
                      </TableCell>
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

export default EnhancedTable

const CreateUserSchema = object().shape({
  fullName: string().required('Vui lòng nhập họ tên'),
  password: string().required('Vui lòng nhập mật khẩu'),
  workAddress: string().required('Vui lòng nhập địa chỉ'),
  position: string().default(''),
  email: string().required('Vui lòng nhập email'),
  phone: string().required('Vui lòng nhập số điện thoại'),
  typeUser: string().required('Vui lòng chọn quyền'),
})

const ContextMenuTableComponent = ({
  x,
  y,
  close,
  selectedItem,
}: ContextType<Data>) => {
  const [open, setOpen] = React.useState(false)

  const { data: user } = useUserById(Number(selectedItem?.id))

  const { mutateAsync: createUserAsync } = useCreateUser()

  const methods = useForm<CreateUserType>({
    resolver: yupResolver(CreateUserSchema),
    defaultValues: {
      typeUser: 'USER',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods

  const onSubmit = (data: CreateUserType) => {
    createUserAsync(data)
      .then(() => {
        toast.success('User Created')
        reset()
        setTimeout(() => {
          setOpen(!open)
        }, 1000)
      })
      .finally(() => {})
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className={'flex flex-col'}>
                <p className={'text-2xl font-bold'}>Update User</p>
                <div className={'w-full grid grid-cols-2 gap-4 mt-4'}>
                  <Input label={'Full name'} type={'text'} name="fullName" />
                  <Input label={'Phone number'} type={'text'} name="phone" />
                  <Input label={'Email'} type={'text'} name="email" />
                  <Input label={'Password'} type={'password'} name="password" />
                  <div className={'flex flex-col '}>
                    <label className={'font-bold'}>Role</label>
                    <select
                      {...register('typeUser')}
                      className={
                        'w-full px-4 py-3 mt-2 border rounded-md outline-none'
                      }
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="USER">User</option>
                      <option value="STAFF">Staff</option>
                    </select>
                  </div>
                  <Input label={'Address'} type={'text'} name="workAddress" />
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
                    Update
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
                    Cancel
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
          <MenuItem
            onClick={e => {
              console.log(e)
            }}
          >
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={e => {
              console.log(e)
            }}
          >
            <ListItemText>Change Password</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={e => {
              console.log(e)
            }}
          >
            <ListItemText>Copy Id</ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    </>
  )
}
