import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfoEntity } from '../entity/info';
import { CoolFile } from '@cool-midway/file';
import { v1 as uuid } from 'uuid';

/**
 * 用户信息
 */
@Provide()
export class UserInfoService extends BaseService {
  @InjectEntityModel(UserInfoEntity)
  userInfoEntity: Repository<UserInfoEntity>;

  @Inject()
  file: CoolFile;

  /**
   * 获取用户信息
   * @param id
   * @returns
   */
  async person(id) {
    return await this.userInfoEntity.findOneBy({ id });
  }

  async updatePerson(id, param) {
    try {
      const info = await this.person(id);
      // 修改了头像要重新处理
      if (param.avatarUrl && info.avatarUrl != param.avatarUrl) {
        param.avatarUrl = await this.file.downAndUpload(
          param.avatarUrl,
          uuid() + '.png'
        );
      }
      return await this.userInfoEntity.update({ id }, param);
    } catch (err) {
      throw new CoolCommException('更新失败，参数错误或者手机号已存在');
    }
  }
  // 注册
  async register(param) {
    try {
      param.avatarUrl = await this.file.downAndUpload(
        param.avatarUrl,
        uuid() + '.png'
      );
      return await this.userInfoEntity.save(param);
    } catch (err) {
      throw new CoolCommException('注册失败，参数错误或者手机号, 用户名已存在');
    }
  }
  // 修改密码
  async updatePassword(id, oldPassword, newPassword) {
    const info = await this.person(id);
    if (info.password !== oldPassword) {
      throw new CoolCommException('旧密码错误');
    }
    return await this.userInfoEntity.update({ id }, { password: newPassword });
  }
}
