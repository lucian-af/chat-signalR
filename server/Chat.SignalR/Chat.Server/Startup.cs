using Chat.Server.Server;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Chat.Server
{
    public class Startup
    {
        public IConfiguration configuration { get; }

        public Startup(IConfiguration config)
        {
            configuration = config;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
            services.AddCors();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors(c =>
            {
                c.WithOrigins(configuration.GetSection("URL_CORS").Value)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatServer>("/chat");
            });
        }
    }
}
