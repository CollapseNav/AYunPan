using System;
using System.Collections.Generic;
using System.Linq;
using Application.Core;
using Application.RequestData;
using Application.ResponseData;
using Repository.Domain;
using Repository.Interface;
namespace Application {
    public class UserFileApplication : BaseApplication<FileInfo> {

        public UserFileApplication (IRepository<FileInfo> re) : base (re) { }

        public void AddFile (FileInfo file) {
            rep.Add (file);
        }

        public FileInfo GetFileByFileId (string id) => rep.FindSingle (model => model.Id == id);

        public ResUserFiles GetFilesById (string id) {
            var filelist = rep.FindAll (model => model.OwnerId == id).ToList ();
            Dictionary<string, ResUserFiles> folderlist = new Dictionary<string, ResUserFiles> ();
            foreach (var item in filelist.Where (model => FileType.ValueMapToType (model.FileType) == EFileType.folder)) {
                folderlist.Add (item.MapPath + "/" + item.FileName, new ResUserFiles (item));
            }

            foreach (var item in filelist.Where (model => FileType.ValueMapToType (model.FileType) != EFileType.folder)) {
                if (folderlist[item.MapPath].FileContains == null) {
                    folderlist[item.MapPath].FileContains = new List<ResUserFiles> ();
                }
                folderlist[item.MapPath].FileContains.Add (new ResUserFiles (item));
            }

            foreach (var item in folderlist) {
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