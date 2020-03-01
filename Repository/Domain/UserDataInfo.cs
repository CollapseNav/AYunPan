using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Core;

namespace Repository.Domain
{
    [Table("UserDataInfo"), Serializable]
    public class UserDataInfo : BaseEntity
    {
        [MaxLength(50), Required]
        public string UserAccount { get; set; }

        [MinLength(4), MaxLength(20), Required]
        public string UserName { get; set; }

        [MinLength(6), MaxLength(20), Required]
        public string PassWord { get; set; }

        [MaxLength(10)]
        public string UserType { get; set; }

        [MaxLength(200), Required]
        public string FolderPath { get; set; }

        public string Gender { get; set; }

        public int Age { get; set; }

        [EmailAddress, MaxLength(50)]
        public string EmailAddress { get; set; }

        [Phone, MaxLength(40)]
        public string Phone { get; set; }

        [MaxLength(233)]
        public string Remark { get; set; }

        [MaxLength(64)]
        public string Cap { get; set; }

        [MaxLength(64)]
        public string Stored { get; set; }

        public virtual ICollection<FileInfo> UserFiles { get; set; }
    }
}
