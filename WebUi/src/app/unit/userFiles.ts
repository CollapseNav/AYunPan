/*
 * @Author: CollapseNav
 * @Date: 2020-03-06 21:26:27
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-21 15:02:30
 * @Description:
 */
export enum FileTypes {
  image,
  zip,
  video,
  sound,
  doc,
  folder,
}

export const FileType = {
  image: 'jpg,png,jpeg',
  zip: 'rar,zip,7z',
  video: 'mp4,mkv,rmvb,rm,avi',
  sound: 'mp3,flac',
  doc: 'doc,docx,md,txt,pdf',
  folder: 'folder',
}

export class UserFile {
  constructor(
    public id: string,
    public fileName: string,
    public fileExt: string,
    public fileTypes: FileTypes,
    public fileSize: string,
    public addDate: string,
    public isShared: string,
    public isDeleted: string,
    public fileContains: UserFile[] = null,
  ) { }
}
