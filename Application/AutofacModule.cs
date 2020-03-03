using Autofac;

namespace Application
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // builder.RegisterType(typeof(BaseRepository<>)).As(typeof(IRepository<>));

            //注册app层
            builder.RegisterAssemblyTypes(System.Reflection.Assembly.GetExecutingAssembly()).Where(t => t.Name.EndsWith("Application"));
        }
    }
}