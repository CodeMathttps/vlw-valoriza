import { IUserRequest } from "../../domain/Interfaces/IUserRequest"
import { userRepository } from "../../repositories/UserRepository"

class CreateUserService{
  constructor() {
    this.error = new Array<string>();
  }

  error: Array<string>;
  
  validateUserExists = async (email: string) => {
    const user = await userRepository.findOne({where:{
      email: email,
    }});

    if(user){
      this.error.push("User already exists.");
    }
  }

  validadeName = (name: string) => {
    if(!name){
      this.error.push("Name is required.");
    }
  }
  
  validadeEmail = (email: string) => {
    if(!email){
      this.error.push("E-mail is required.");
    }
  }
  
  validate = async (name: string, email: string) => {
    this.validadeName(name);
    this.validadeEmail(email);
    await this.validateUserExists(email);
  }

  async execute({ name, email, admin} : IUserRequest){
    await this.validate(name, email);
    if(this.error.length > 0)
      return this.error;
    
    const user = userRepository.create({
      name, 
      email, 
      admin
    });
    const savedUser = userRepository.save(user);
    
    return savedUser;
  }
}

export { CreateUserService }