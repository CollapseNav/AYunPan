using System;
using System.Collections.Generic;
using System.Linq;
using Application.Core;
using Application.Core.BaseRequestData;
using Application.RequestData;
using Application.ResponseData;
using Repository.Domain;
using Repository.Interface;
namespace Application {
    public class UserFileApplication : BaseApplication<FileInfo> {

        public UserFileApplication (IRepository<FileInfo> re) : base (re) { }

        public void AddFile (FileInfo file) {
            // 就……一个简单的 add 操作
            // 大概需要多做点什么事情
            // 但仔细想想现在还是不管了
            rep.Add (file);
        }

        public FileInfo GetFile (IRequestFindData<FileInfo> data) => rep.FindSingle (data.GetWhereExpression ());

        /// <summary>
        /// 大概还需要多加点什么东西
        /// </summary>
        public string UpdateFileInfo (IRequestEditData<FileInfo> data) {
            try {
                rep.Update (data.GetWhereExpression (), data.GetConvertExpressions ());
            } catch (Exception ex) {
                return ex.Message;
            }
            return "Success";
        }
        public List<ResUserFiles> GetFilesWithoutFolder (IRequestFindPageData<FileInfo> data, out int total) {
            List<ResUserFiles> list = new List<ResUserFiles> ();
            var rawlist = rep.FindPage (out total, data.GetPageIndex (), data.GetPageSize (), data.GetIsAsc (), data.GetWhereExpression (), k => k.Id).ToList ();
            foreach (var item in rawlist) {
                list.Add (new ResUserFiles (item));
            }
            return list;
        }

        /// <summary>
        /// 获取用户的所有文件
        /// 带目录结构的那种
        /// 性能大概很差
        /// 后续再来改进吧
        /// </summary>
        public ResUserFiles GetFiles (IRequestFindData<FileInfo> data) {
            // 首先获取该用户所有文件
            var filelist = rep.FindAll (data.GetWhereExpression ()).ToList ();
            // 有关于目录结构，最重要的大概就是搞清楚每个文件的 "所属"
            Dictionary<string, ResUserFiles> folderlist = new Dictionary<string, ResUserFiles> ();
            // 筛出所有的 "文件夹"
            foreach (var item in filelist.Where (model => FileType.ValueMapToType (model.FileType) == EFileType.folder)) {
                // 将文件夹的 path 作为 key ，该 key 与该文件夹下文件的 MapPath 相同
                folderlist.Add (item.FilePath, new ResUserFiles (item));
            }

            // 循环遍历所有的文件(非文件夹的那种)
            foreach (var item in filelist.Where (model => FileType.ValueMapToType (model.FileType) != EFileType.folder)) {
                if (folderlist[item.MapPath].FileContains == null) {
                    folderlist[item.MapPath].FileContains = new List<ResUserFiles> ();
                }
                // 直接使用文件的 MapPath 查找自己的所属文件夹
                folderlist[item.MapPath].FileContains.Add (new ResUserFiles (item));
            }
            // 最终 "拼接" 所有文件夹
            foreach (var item in folderlist) {
                // 排除用户的 root 文件夹
                if (item.Key.LastIndexOf ('/' + item.Value.FileName) > 0) {
                    folderlist[item.Key.Substring (0, item.Key.LastIndexOf ('/' + item.Value.FileName))].FileContains.Add (item.Value);
                }
            }
            if (folderlist.Count < 1)
                return null;
            return folderlist.First ().Value;
        }
    }
}