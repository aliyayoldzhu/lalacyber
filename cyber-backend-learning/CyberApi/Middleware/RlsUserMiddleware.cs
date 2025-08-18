using System.Security.Claims;
using CyberApi.Data;
using Microsoft.EntityFrameworkCore;

namespace CyberApi.Middleware;

public class RlsUserMiddleware
{
    private readonly RequestDelegate _next;

    public RlsUserMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    // MUST be named InvokeAsync (or Invoke) and be public
    public async Task InvokeAsync(HttpContext context, AppDbContext db)
    {
        // pull the user id from JWT (sub or user_id)
        var sub = context.User.FindFirstValue("sub") ?? context.User.FindFirstValue("user_id");
        if (Guid.TryParse(sub, out var uid))
        {
            // set our session-local variable for RLS
            await db.Database.ExecuteSqlRawAsync("select app.set_user({0})", uid);
        }

        await _next(context);
    }
}
