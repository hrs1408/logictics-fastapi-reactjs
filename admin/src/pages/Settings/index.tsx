import SearchBar from '../../components/SearchBar'
import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { Box, Tab, Tabs } from '@mui/material'
import './settings.scss'
import Input from '../../components/Input'
import { useEffectOnce } from 'usehooks-ts'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUpdateUser } from '../../services/UserService'

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const UpdateUserSchema = object().shape({
  fullname: string(),
  phoneNumber: string(),
  dateOfBirth: string(),
  address: string(),
})

const UpdatePasswordSchema = object().shape({
  newPassword: string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      'Password must contain at least 1 uppercase, 1 lowercase, 1 number'
    ),
  confirmPassword: string().test(
    'passwords-match',
    'Passwords must match',
    function (value) {
      return this.parent.newPassword === value
    }
  ),
})

const Settings = () => {
  // region Tab
  const [tabValue, setTabValue] = React.useState(0)

  const [setTab, setSetTab] = React.useState(true)

  useEffectOnce(() => {
    window.addEventListener('resize', resizeScreen)
    return () => {
      window.removeEventListener('resize', resizeScreen)
    }
  })

  const resizeScreen = () => {
    if (window.innerWidth < 1024) {
      setSetTab(false)
    } else {
      setSetTab(true)
    }
  }
  // endregion

  // region Update Info
  const { mutateAsync: updateUserAsync } = useUpdateUser()

  const methodUpdateInfo = useForm<UpdateUserType>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {},
  })

  const {
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorInfo },
  } = methodUpdateInfo

  const onSubmit = (data: UpdateUserType) => {
    updateUserAsync({ ...data })
      .then(res => {
        console.log(
          '%c >> 🚀 res',
          'background:#000; padding:2px 8px; border-radius:1rem; color:white',
          res
        )
      })
      .finally(() => {})
  }
  // endregion

  // region Update Password
  const methodUpdatePassword = useForm<UpdatePasswordType>({
    resolver: yupResolver(UpdatePasswordSchema),
    defaultValues: {},
  })

  const {
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorPassword },
  } = methodUpdatePassword

  const onSubmitPassword = (data: UpdatePasswordType) => {
    console.log(
      '%c >> 🚀 data',
      'background:#000; padding:2px 8px; border-radius:1rem; color:white',
      data
    )
  }

  // endregion

  return (
    <AdminLayout>
      <div className="settings w-full h-screen">
        <SearchBar />
        <div className="setting-tab mt-2 flex gap-4">
          <div
            className={`${
              setTab ? 'flex gap-4' : 'flex flex-col gap-4'
            } mt-4 w-full`}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tabValue}
              onChange={(e, v) => setTabValue(v)}
              aria-label="Vertical tabs example"
              sx={{ width: '20%' }}
            >
              <Tab
                label="Change information"
                {...a11yProps(0)}
                sx={
                  setTab
                    ? {
                        backgroundColor: '#fff',
                        marginBottom: 1,
                        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                        '&.Mui-selected': {
                          backgroundColor: '#FCD804',
                          color: '#020202',
                          borderRadius: 1,
                        },
                      }
                    : { padding: 0, fontSize: 12, borderRadius: 2 }
                }
              />
              <Tab
                label="change password"
                {...a11yProps(1)}
                sx={
                  setTab
                    ? {
                        backgroundColor: '#fff',
                        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                        '&.Mui-selected': {
                          backgroundColor: '#FCD804',
                          color: '#020202',
                          borderRadius: 1,
                        },
                      }
                    : { padding: 0, fontSize: 12, borderRadius: 2 }
                }
              />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <FormProvider {...methodUpdateInfo}>
                <div>
                  {Object.keys(errorInfo).length > 0 && (
                    <div className="p-4 rounded shadow bg-red-400 text-white my-4">
                      {Object.keys(errorInfo).length > 0 && (
                        <div>
                          <ul>
                            {Object.entries(errorInfo).map(([name, error]) => (
                              <li key={name}>{error.message}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <form onSubmit={handleSubmitUpdateInfo(onSubmit)}>
                  <div className={'px-10 py-8 bg-white rounded w-full shadow'}>
                    <p className={'text-lg font-bold'}>
                      Change the account information
                    </p>
                    <div className={'grid grid-cols-2 mt-6 gap-4'}>
                      <div className={'flex flex-col gap-4'}>
                        <div className={'flex flex-col gap-2'}>
                          <Input label={'Full Name'} name="fullname" />
                        </div>
                      </div>
                      <div className={'flex flex-col gap-4'}>
                        <div className={'flex flex-col gap-2'}>
                          <Input label={'Phone Number'} name="phoneNumber" />
                        </div>
                      </div>
                      <div className={'flex flex-col gap-4'}>
                        <div className={'flex flex-col gap-2'}>
                          <Input label={'Address'} name="address" />
                        </div>
                      </div>
                      <div className={'flex flex-col gap-4'}>
                        <div className={'flex flex-col gap-2'}>
                          <Input
                            label={'Date Of Birth'}
                            type={'date'}
                            name="dateOfBirth"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={'mt-4'}>
                      <button
                        type={'submit'}
                        className={'bg-yellow-400 px-4 py-2 rounded w-full'}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <FormProvider {...methodUpdatePassword}>
                <div>
                  {Object.keys(errorPassword).length > 0 && (
                    <div className="p-4 rounded shadow bg-red-400 text-white my-4">
                      {Object.keys(errorPassword).length > 0 && (
                        <div>
                          <ul>
                            {Object.entries(errorPassword).map(
                              ([name, error]) => (
                                <li key={name}>{error.message}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <form onSubmit={handleSubmitUpdatePassword(onSubmitPassword)}>
                  <div className={'px-10 py-8 bg-white rounded w-full shadow'}>
                    <p className={'text-lg font-bold'}>Change the password</p>
                    <div className={'mt-6'}>
                      <div className={'flex flex-col gap-4'}>
                        <div className={'flex flex-col gap-2'}>
                          <Input
                            label={'New Password'}
                            type={'password'}
                            name="newPassword"
                          />
                        </div>
                      </div>
                      <div className={'flex flex-col gap-4'}>
                        <div className={'flex flex-col gap-2'}>
                          <Input
                            label={'Re-enter New Password'}
                            type={'password'}
                            name="confirmPassword"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={'mt-4'}>
                      <button
                        type={'submit'}
                        className={'bg-yellow-400 px-4 py-2 rounded w-full'}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </TabPanel>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Settings

// region TabPanel Component
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={'w-full'}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}
// endregion
