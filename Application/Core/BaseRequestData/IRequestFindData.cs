using System;
using System.Linq.Expressions;
using Repository.Core;
using Repository.Domain;

namespace Application.Core.BaseRequestData {
    public interface IRequestFindData<T> where T : BaseEntity {
        string Id { get; set; }
        Expression<Func<T, bool>> GetWhereExpression ();
    }
}