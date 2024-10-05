import { User, UserProp } from "../entity"


export interface UserGateway {
    save(user: User): Promise<UserProp> // Se der algum erro no save, trocar para void
    list(): Promise<User[]>
}