
type SignInType = {
    email: string;
    password: string;
}

type SignUpType = {
    email: string;
    full_name: string;
    password: string;
    confirm_password: string,
    phone: stringh,
    address: string,
    type_user: string
}

type AuthType = {
    id: string;
    email: string;
    is_active: true;
    type_user: string;
    user_information: {};
};

type AuthContextType = {
    auth: AuthType | null;
    authLoading: boolean;
    removeAuth: () => void;
    getMeForce: () => Promise<any>;
};