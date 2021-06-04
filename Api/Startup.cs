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
using Microsoft.OpenApi.Models;
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
                options.AddPolicy("any",
                    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });
            services.AddControllers().AddControllersAsServices();
            services.AddDbContext<BaseContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("SQlite"));
            });

            services.AddSwaggerGen(
                options =>
                {
                    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Educational API", Version = "v1" });
                    options.DocInclusionPredicate((docName, description) => true);
                    DirectoryInfo d = new DirectoryInfo(AppContext.BaseDirectory);
                    FileInfo[] files = d.GetFiles("*.xml");
                    foreach (var item in files)
                    {
                        options.IncludeXmlComments(item.FullName, true);
                    }
                    options.AddSecurityDefinition("token", new OpenApiSecurityScheme
                    {
                        Description = "JWT授权(数据将在请求头中进行传输) 在下方输入Bearer {token} 即可，注意两者之间有空格",
                        Name = "Authorization",//jwt默认的参数名称
                        In = ParameterLocation.Header,//jwt默认存放Authorization信息的位置(请求头中)
                        Type = SecuritySchemeType.ApiKey
                    });

                    options.AddSecurityRequirement(new OpenApiSecurityRequirement {
                        { new OpenApiSecurityScheme{
                            Reference = new OpenApiReference(){
                                Id = "token",
                                Type = ReferenceType.SecurityScheme } },
                                Array.Empty<string>() } });
                }
            );

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

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Educational API");
            });
            string filepath = Configuration.GetSection("FileStore").Get<string>();
            string curpath = Directory.GetCurrentDirectory();

            app.UseAuthentication();
            app.UseRouting();
            app.UseCors("Base");
            app.UseAuthorization();

            if (!Directory.Exists($"{Directory.GetCurrentDirectory()}/{filepath}"))
                Directory.CreateDirectory($"{Directory.GetCurrentDirectory()}/{filepath}");

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider($"{Directory.GetCurrentDirectory()}/{filepath}"),
                RequestPath = new PathString("/staticfiles")
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
