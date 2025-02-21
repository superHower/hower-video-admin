import BaseService from './../base.service';

export class VideoService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/admin/video', postData);
  }
  static async batchDeleteByIdListApi(postData) {
    return BaseService.post('/admin/video/delete', postData);
  }
  static async deleteByIdApi(id) {
    return BaseService.delete(`/admin/video/${id}`);
  }
  static async batchStatusByIdListApi(postData) {
    return BaseService.post('/admin/video/batchStatus', postData);
  }
  static async modifyByIdApi(id, param) {
    return BaseService.put(`/admin/video/${id}`, param);
  }
  static async getPageApi(queryOption) {
    return BaseService.get('/admin/video', queryOption);
  }
  // 评论
  static async getCommentPageApi(queryOption) {
    return BaseService.get('/admin/video/comment', queryOption);
  }
  static async batchDeleteCommentByIdListApi(postData) {
    return BaseService.post('/admin/video/comment/delete', postData);
  }
}
