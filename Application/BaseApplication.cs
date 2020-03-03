using System;
using Repository;
using Repository.Core;
using Repository.Interface;

namespace Application
{
    public class BaseApplication<T> where T : BaseEntity
    {
        protected IRepository<T> rep;

        public BaseApplication(IRepository<T> re)
        {
            rep = re;
        }
        public void SaveChange(){
            rep.Save();
        }
    }
}
