/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 22:47:05
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-03 22:14:10
 * @Description: 
 */
using System.Text;
using Application;
using Autofac;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Repository;
using Repository.Interface;

namespace Api {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddAuthentication (options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer (options => {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;

                options.TokenValidationParameters = new TokenValidationParameters () {
                    ValidateIssuer = true,
                    ValidIssuer = "DotnetTest",
                    ValidateAudience = true,
                    ValidAudience = "AngualrApp",
                    IssuerSigningKey = new SymmetricSecurityKey (Encoding.UTF8.GetBytes ("It's a .net core spa test."))
                };
            });

            services.AddCors (options => {
                options.AddPolicy ("angular",
                    builder => builder.WithOrigins ("http://localhost:4200")
                    .AllowAnyHeader ().AllowAnyMethod ().WithExposedHeaders ());
            });

            services.AddControllers ().AddControllersAsServices ();

            services.AddDbContext<BaseContext> (options => {
                options.UseSqlite (Configuration.GetConnectionString ("SQlite"), m => m.MigrationsAssembly ("Api"));
            });

            services.AddScoped (typeof (IRepository<>), typeof (BaseRepository<>));
        }
        public void ConfigureContainer (ContainerBuilder builder) {
            // Register your own things directly with Autofac, like:
            builder.RegisterModule (new AutofacModule ());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            app.UseStaticFiles ();

            app.UseAuthentication ();

            // app.UseHttpsRedirection ();

            app.UseRouting ();

            app.UseCors ("angular");

            app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
            });
        }
    }
}