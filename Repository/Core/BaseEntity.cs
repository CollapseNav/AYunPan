using System;
using System.ComponentModel.DataAnnotations;

namespace Repository.Core
{
    [Serializable]
    public class BaseEntity
    {
        [Key, MaxLength(40), Required]
        public string Id { get; set; }

        [DataType(DataType.DateTime), Required]
        public DateTime? CreateDate { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? DeleteDate { get; set; }

        [MaxLength(40)]
        public string ChangedBy { get; set; }

        [Required]
        public int? IsDeleted { get; set; }
    }
}
