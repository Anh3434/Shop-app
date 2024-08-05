import {
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsDate
} from 'class-validator';

export class LoginDTO {
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    role_id: number;

    constructor(data: any) {
        this.phone = data.phone;
        this.password = data.password;
        this.role_id = data.role_id;
    }
}