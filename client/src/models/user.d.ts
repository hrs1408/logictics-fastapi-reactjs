type UserTypes = {
    id: number;
    email: string;
    typeUser: string;
    userInformation: UserInformationTypes;
    userInternalInformation: UserInternalInformationTypes;
}

type UserInformationTypes = {
    id: number;
    fullname: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    userId: number;
}

type UserInternalInformationTypes = {
    id: number;
    workAddress: string;
    position: string;
    userId: number;
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