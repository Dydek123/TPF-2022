import {Entity} from "./entity.model";

export class UserModel extends Entity {
  name: string | null | undefined;
  picture?: string | null | undefined;

  constructor(name: string | null | undefined, picture: string | null | undefined) {
    super();
    this.name = name;
    this.picture = picture;
  }
}
