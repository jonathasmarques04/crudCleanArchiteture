import { User, UserGateway } from "../../../domain/User";
import { UseCase } from "../../useCase";

export type CreateUserInputDto = {
    name: string;
    email: string;
    password: string
}

export type CreateUserOutputDto = {
    id: string
}

export class CreateUserUseCase implements UseCase<CreateUserInputDto, CreateUserOutputDto>{
    private constructor(private readonly userGateway: UserGateway){}

    public create(userGateway: UserGateway){
        return new CreateUserUseCase(userGateway)
    }

    public async execute({ name, email, password }: CreateUserInputDto): Promise<CreateUserOutputDto>{
        const user = User.create({
            name: name,
            email: email,
            password: password
        })

        await this.userGateway.save(user)

        const userOutput = this.userPresentOutput(user)

        return userOutput
    }

    private userPresentOutput(user: User): CreateUserOutputDto{
        const userOutput: CreateUserOutputDto = {
            id: user.getId()
        }

        return userOutput
    }
}