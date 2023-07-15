export namespace UserDto {
  export class Create {
    email: string;
    name: string;
    password: string;
  }

  export class Update {
    id: number;
    email: string;
    name: string;
    password: string;
  }
}
