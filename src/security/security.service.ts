import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityService {
  create() {
    return 'This action adds a new security';
  }

  findAll() {
    return `This action returns all security`;
  }

  findOne(id: number) {
    return `This action returns a #${id} security`;
  }

  update(id: number) {
    return `This action updates a #${id} security`;
  }

  remove(id: number) {
    return `This action removes a #${id} security`;
  }
}
