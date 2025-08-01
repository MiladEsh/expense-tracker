using Microsoft.EntityFrameworkCore;
using ExpensiveInnit.WebApi.Models;

namespace ExpensiveInnit.WebApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Expense> Expenses => Set<Expense>();
}