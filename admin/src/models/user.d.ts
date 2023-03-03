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