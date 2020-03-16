using System.Collections.Generic;

namespace Application.Core {
    public enum EFileType {
        image,
        zip,
        video,
        sound,
        doc,
        folder,
    }

    public class FileType {
        private readonly static List<string> FileFilter = new List<string> {
            "jpg,png,jpeg",
            "rar,zip,7z",
            "mp4,mkv,rmvb,rm,avi",
            "mp3,flac",
            "doc,docx,md,txt,pdf,pptx,ppt",
            "folder"
        };

        public static EFileType ValueMapToType (string value) {
            return (EFileType) System.Enum.Parse (typeof (EFileType), value);
        }

        public static EFileType ExtMapToType (string ext) {
            var index = FileFilter.FindIndex (item => item.Contains (ext));
            return ValueMapToType (index.ToString ());
        }
    }
}