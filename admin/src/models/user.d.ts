type UserType = {
  id: number
  email: string
  typeUser: string
  userInformation?: userInformation
  userInternalInformation?: userInternalInformation
}

type UserInformationType = {
  fullname: string
  phoneNumber: string
  dateOfBirth: string
  address: string
  id: number
  userId: number
}

type UserInternalInformationType = {
  workAddress: string
  position: string
  id: number
  userId: number
}

type CreateUserType = {
  fullName: string
  password: string
  workAddress: string
  position: string
  email: string
  phone: string
  typeUser: 'ADMIN' | 'STAFF' | 'USER'
}
