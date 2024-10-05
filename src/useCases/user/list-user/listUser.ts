import { User, UserGateway } from "../../../domain/User";
import { UseCase } from "../../useCase";

export type ListUserInputDto = void

export type ListUserOutputDto = {
    user: {
        id: string;
        name: string;
        email: string;
        password: string
    }[]
}

export class ListUserUseCase implements UseCase<ListUserInputDto, ListUserOutputDto>{
    private constructor(private readonly userGateway: UserGateway){}

    public static create(userGateway: UserGateway){
        return new ListUserUseCase(userGateway)
    }

    public async execute(input: void): Promise<ListUserOutputDto> {
        const user = await this.userGateway.list()

        const userOutput = this.presentOutput(user)

        return userOutput
    }

    private presentOutput(product: User[]): ListUserOutputDto {
        return {
            user: product.map((index) => {
                return { 
                    id: index.getId(),
                    name: index.getName(),
                    email: index.getEmail(),
                    password: index.getPassword()
                }
            })
        }
    }
}