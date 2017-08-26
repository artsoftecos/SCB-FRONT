import { TypeRoles } from './type-roles.enum'
export class User {
    public name: string;
    public email: string;
    public role: TypeRoles;

    constructor(obj?: any) {
        if (obj) {
            this.name = obj.name;
            this.email = obj.email;
            this.role = obj.role;
        }
    }
}