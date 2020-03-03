using System;
using Repository;
using Repository.Core;
using Repository.Interface;

namespace Application
{
    public interface IApplication<T> where T : BaseEntity
    {
        void SaveChange();
    }
}
