using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpensiveInnit.WebApi.Data;
using ExpensiveInnit.WebApi.Models;

namespace ExpensiveInnit.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ExpensesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Expense>>> GetAll()
        => await _context.Expenses.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Expense>> GetById(int id)
    {
        var expense = await _context.Expenses.FindAsync(id);
        return expense is null ? NotFound() : expense;
    }

    [HttpPost]
    public async Task<ActionResult<Expense>> Create(Expense expense)
    {
        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = expense.Id }, expense);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var expense = await _context.Expenses.FindAsync(id);
        if (expense is null) return NotFound();

        _context.Expenses.Remove(expense);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}