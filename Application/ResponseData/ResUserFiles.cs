using System.Collections.Generic;
using Application.Core;
using Repository.Domain;

namespace Application.ResponseData {
    public class ResUserFiles {
        public string Id { get; set; }
        public string FileName { get; set; }
        public string FileExt { get; set; }
        public EFileType FileTypes { get; set; }
        public string FileSize { get; set; }
        public string AddDate { get; set; }
        public string IsShared { get; set; }
        public string IsDeleted { get; set; }
        public List<ResUserFiles> FileContains { get; set; }

        public ResUserFiles (FileInfo file) {
            Id = file.Id;
            var extindex = file.FileName.LastIndexOf ('.');
            FileName = file.FileName.Substring (0, extindex > 0 ? extindex : file.FileName.Length);
            FileExt = file.FileName.Split (".") [ ^ 1];
            FileTypes = FileType.ValueMapToType (file.FileType);
            FileSize = file.FileSize;
            AddDate = file.CreateDate.ToString ();
            IsShared = file.Shared.ToString ();
            IsDeleted = file.IsDeleted.ToString ();
            FileContains = null;
        }
    }
}