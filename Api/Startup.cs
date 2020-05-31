/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 22:47:05
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-31 18:00:12
 * @Description: 
 */
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Text;
using Application;
using Autofac;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Repository;
using Repository.Interface;

namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var tokeninfo = Configuration.GetSection("tokenInfo").Get<TokenInfo>();
            services.AddSingleton(tokeninfo);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;

                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = false,
                    ValidIssuer = tokeninfo.Issuer,
                    ValidateAudience = true,
                    ValidAudience = tokeninfo.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokeninfo.Secret)),
                    ValidateIssuerSigningKey = true
                };
            });

            services.AddCors(options =>
            {
                options.AddPolicy("Base",
                    builder => builder.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader().AllowAnyMethod().AllowCredentials());
                options.AddPolicy("File",
                    builder => builder.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithExposedHeaders("FileName"));
            });
            services.AddControllers().AddControllersAsServices();
            services.AddDbContext<BaseContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("SQlite"), m => m.MigrationsAssembly("Api"));
            });

            services.AddSwaggerDocument();

            services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
        }
        public void ConfigureContainer(ContainerBuilder builder)
        {
            // Register your own things directly with Autofac, like:
            builder.RegisterModule(new AutofacModule());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            string filepath = Configuration.GetSection("FileStore").Get<string>();
            string curpath = Directory.GetCurrentDirectory();

            app.UseAuthentication();
            app.UseRouting();
            app.UseCors("Base");
            app.UseAuthorization();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider($"{Directory.GetCurrentDirectory()}/{filepath}"),
                RequestPath = new PathString("/staticfiles")
            });
            app.UseOpenApi();
            app.UseSwaggerUi3();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}