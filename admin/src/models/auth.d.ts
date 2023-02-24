
type SignInType = {
    email: string;
    password: string;
}

type AuthType = {
    email: string;
    id: string;
    is_active: true;
    item: []
    user_information: {}
    user_internal_information: {}
};

type AuthContextType = {
    auth: AuthType | null;
    authLoading: boolean;
    removeAuth: () => void;
    getMeForce: () => Promise<any>;
};