import { Controller } from '@nestjs/common';
import { CoreController } from '../../core/core.controller';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController extends CoreController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
