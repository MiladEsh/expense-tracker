namespace ExpensiveInnit.WebApi.Models;

public class Expense
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }

    public DateOnly Date { get; set; }
    public Expense() { }
    public Expense(int id, string description, decimal amount, DateOnly date)
    {
        Id = id;
        Description = description;
        Amount = amount;
        Date = date;
    }
}
