using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Core;

namespace Repository.Domain
{
    [Table("FileInfo"), Serializable]
    public class FileInfo : BaseEntity
    {

        [MaxLength(248), Required]
        public string FileName { get; set; }

        [MaxLength(1024), Required]
        public string FilePath { get; set; }

        [MaxLength(10), Required]
        public string FileType { get; set; }

        [MaxLength(20), Required]
        public string FileSize { get; set; }

        // [MaxLength(40)]
        // public string HashCode { get; set; }

        [MaxLength(1024), Required]
        public string MapPath { get; set; }

        [MaxLength(40), Required]
        public string OwnerId { get; set; }

        [MaxLength(40), Required]
        public string OwnerName { get; set; }

        public int Shared { get; set; }
    }
}
