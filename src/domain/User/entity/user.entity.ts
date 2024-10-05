export type UserProp = {
    id: string;
    name: string;
    email: string;
    password: string
}

export class User {
    private constructor(private props: UserProp){}
    
    public static create({ name, email, password }: Omit<UserProp, 'id'>){
        return new User({
            id: crypto.randomUUID().toString(),
            name,
            email,
            password
        })
    }

    public with(updateProps: Partial<UserProp>): User{
        return new User({
            ...this.props, // Mantém as propiedades que já foram passadas
            ...updateProps // Atualiza as novas propiedades.
        })
    }

    public getId(){
        return this.props.id
    }

    public getName(){
        return this.props.name
    }

    public getEmail(){
        return this.props.email
    }

    public getPassword(){
        return this.props.password
    }
}