using Microsoft.EntityFrameworkCore;
using ExpensiveInnit.WebApi.Data;
using ExpensiveInnit.WebApi.Converters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=expensive.db"));

builder.Services.AddControllers()
 .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
        options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseCors(policy =>
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.MapControllers();

app.Run();