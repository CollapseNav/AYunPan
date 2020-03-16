using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Core;

namespace Repository.Domain
{
    [Table("SharedFileInfo")]
    public class SharedFileInfo : BaseEntity
    {

        [MaxLength(20)]
        public string OwnerName { get; set; }

        [MaxLength(40)]
        public string FileId { get; set; }
    }
}