export namespace UserDto {
  export class Create {
    name: string;
    job: string;
  }

  export class Update {
    id: number;
    name: string;
    job: string;
  }
}
