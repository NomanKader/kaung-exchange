using Kaung.Helper;
using Kaung.Middleware;
using Kaung.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<EFDBContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("MyDbConnection")));

builder.Services.AddScoped<CustomerServices>();
builder.Services.AddScoped<BuyServices>();
builder.Services.AddScoped<PriceService>();
builder.Services.AddScoped<UserServices>();
builder.Services.AddTransient<EncryptPassword>();
builder.Services.AddTransient<DecryptPassword>();
builder.Services.AddTransient<GenerateToken>();

builder.Services.AddCors(o => o.AddPolicy("Policy", builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
}));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
//app.UseMiddleware<AuthenticationMiddleware>();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
