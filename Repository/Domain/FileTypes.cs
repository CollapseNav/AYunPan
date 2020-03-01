using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Core;

namespace Repository.Domain
{
    [Table("FileType")]
    public class FileTypes : BaseEntity
    {
        [Required, MaxLength(20)]
        public string FileType { get; set; }

        [Required, MaxLength(256)]
        public string FileExts { get; set; }
    }
}